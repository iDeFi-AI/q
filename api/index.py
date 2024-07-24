import os
import logging
import base64
import json
import sys
from flask import Flask, request, jsonify
from qiskit import QuantumCircuit, transpile, IBMQ, execute
from qiskit.visualization import plot_histogram, circuit_drawer
from qiskit.providers.ibmq import least_busy
from qiskit_aer import AerSimulator
import matplotlib.pyplot as plt
from io import BytesIO
import pandas as pd
import requests

# Use a non-GUI backend for Matplotlib
plt.switch_backend('Agg')

app = Flask(__name__)
QASM_DIR = os.path.join(os.path.dirname(__file__), 'qasm_files')
DATA_DIR = os.path.join(os.path.dirname(__file__), 'data_files')

# Debug: Check the Python executable and environment
print("Python executable:", sys.executable)

# Load IBM Quantum account
IBMQ.save_account('25e41bddcb5e8c626e424aa22c649f586f2540899d67f2a1bea408971c982d3187822dfc80c3ccea1c48687dc4730b98c124edfc7570fdb7997c5782de79eb48', overwrite=True)
IBMQ.load_account()

# Set Etherscan API Key and OpenAI API Key
ETHERSCAN_API_KEY = os.getenv('ETHERSCAN_API_KEY', 'QEX6DGCMDRPXRU89FKPUR4BG9AUMCR4FXD')
OPENAI_API_KEY = os.getenv('NEXT_PUBLIC_OPENAI_API_KEY')

# Initialize the quantum memory (quantum mirror)
def initialize_memory():
    memory = QuantumCircuit(1)
    memory.h(0)  # Create a superposition
    return memory

# Store a quantum state in memory
def store_in_memory(memory, state):
    if state == '0':
        pass  # Do nothing, already in |0>
    elif state == '1':
        memory.x(0)  # Flip the qubit to |1>
    elif state == '+':
        memory.h(0)  # Create a superposition state |+>
    elif state == '-':
        memory.x(0)
        memory.h(0)
    return memory

# Retrieve the quantum state from memory
def retrieve_from_memory(memory):
    memory.measure_all()
    return memory

def plot_state_histogram(counts):
    fig, ax = plt.subplots()
    plot_histogram(counts, ax=ax)
    histogram_img = BytesIO()
    plt.savefig(histogram_img, format='png')
    histogram_img.seek(0)
    histogram_base64 = base64.b64encode(histogram_img.getvalue()).decode('utf-8')
    plt.close()
    return histogram_base64

def plot_circuit_diagram(circuit):
    fig, ax = plt.subplots()
    circuit_drawer(circuit, ax=ax, output='mpl')
    circuit_img = BytesIO()
    plt.savefig(circuit_img, format='png')
    circuit_img.seek(0)
    circuit_base64 = base64.b64encode(circuit_img.getvalue()).decode('utf-8')
    plt.close()
    return circuit_base64

def split_base64_string(base64_string, max_length):
    return [base64_string[i:i + max_length] for i in range(0, len(base64_string), max_length)]

def extract_image_metadata(base64_string):
    # Extract metadata from base64 string (e.g., size, dimensions)
    image_data = base64.b64decode(base64_string)
    image_size = len(image_data)
    return f"Image size: {image_size} bytes"

def generate_explanation(risk_scores, histogram_base64, circuit_base64):
    prompt = f"Given the following risk scores from a quantum risk analysis, provide detailed explanations and insights for a financial advisor:\n\n"
    for key, value in risk_scores.items():
        prompt += f"{key.replace('_', ' ').title()}: {value}\n"
    
    histogram_metadata = extract_image_metadata(histogram_base64)
    circuit_metadata = extract_image_metadata(circuit_base64)

    prompt += f"\nExplain the histogram and circuit diagram shown below:\n"
    prompt += f"Histogram Metadata: {histogram_metadata}\n"
    prompt += f"Circuit Diagram Metadata: {circuit_metadata}\n"

    response = requests.post(
        'https://api.openai.com/v1/chat/completions',
        headers={
            'Authorization': f'Bearer {OPENAI_API_KEY}',
            'Content-Type': 'application/json',
        },
        json={
            'model': 'gpt-3.5-turbo-16k',
            'messages': [{'role': 'user', 'content': prompt}],
            'max_tokens': 1000,
            'temperature': 0.5
        }
    )

    if response.status_code != 200:
        raise Exception(f"OpenAI API request failed with status code {response.status_code}")

    result = response.json()
    return result['choices'][0]['message']['content'].strip()

@app.route('/api/generate-explanation', methods=['POST'])
def generate_explanation_endpoint():
    try:
        data = request.get_json()
        risk_scores = data.get('risk_scores')
        histogram_base64 = data.get('histogram_base64')
        circuit_base64 = data.get('circuit_base64')

        if not all([risk_scores, histogram_base64, circuit_base64]):
            return jsonify({'error': 'Missing required parameters'}), 400

        explanation = generate_explanation(risk_scores, histogram_base64, circuit_base64)
        return jsonify({'explanation': explanation})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Endpoint to list QASM files
@app.route("/api/qasm_files", methods=["GET"])
def list_qasm_files():
    try:
        files = [f for f in os.listdir(QASM_DIR) if f.endswith('.qasm')]
        return jsonify({"files": files})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint to compile and run a QASM file
@app.route("/api/compile-and-run", methods=["POST"])
def compile_and_run():
    data = request.json
    filename = data.get("filename")
    use_ibm_backend = data.get("use_ibm_backend", False)
    try:
        file_path = os.path.join(QASM_DIR, filename)
        if not os.path.exists(file_path):
            return jsonify({"error": f"File {filename} does not exist"}), 404

        with open(file_path, 'r') as file:
            quantum_code = file.read()
        qc = QuantumCircuit.from_qasm_str(quantum_code)
    except Exception as e:
        return jsonify({"error": f"Error reading or parsing QASM file: {str(e)}"}), 400

    try:
        if use_ibm_backend:
            provider = IBMQ.get_provider(hub='ibm-q')
            backend = least_busy(provider.backends(simulator=False))
        else:
            backend = AerSimulator()

        compiled_circuit = transpile(qc, backend)
        if use_ibm_backend:
            job = backend.run(compiled_circuit)
            result = job.result()
        else:
            result = execute(compiled_circuit, backend, shots=1024).result()

        counts = result.get_counts(qc)
        histogram_base64 = plot_state_histogram(counts)
        circuit_base64 = plot_circuit_diagram(qc)

        return jsonify({
            "counts": counts,
            "histogram": histogram_base64,
            "circuit_diagram": circuit_base64
        })
    except Exception as e:
        return jsonify({"error": f"Error during quantum execution: {str(e)}"}), 500

# Endpoint to initialize memory
@app.route("/api/initialize_memory", methods=["POST"])
def api_initialize_memory():
    try:
        memory = initialize_memory()
        return jsonify({"message": "Memory initialized", "memory": memory.qasm()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint to store a quantum state in memory
@app.route("/api/store_in_memory", methods=["POST"])
def api_store_in_memory():
    data = request.json
    state = data.get("state")

    if state not in ['0', '1', '+', '-']:
        return jsonify({"error": "Invalid state. Must be one of '0', '1', '+', '-'"}), 400

    try:
        memory = initialize_memory()
        memory = store_in_memory(memory, state)
        return jsonify({"message": "State stored in memory", "memory": memory.qasm()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint to retrieve the quantum state from memory
@app.route("/api/retrieve_from_memory", methods=["POST"])
def api_retrieve_from_memory():
    try:
        memory = initialize_memory()
        memory = retrieve_from_memory(memory)
        backend = AerSimulator()
        result = execute(memory, backend, shots=1024).result()
        counts = result.get_counts(memory)
        histogram_base64 = plot_state_histogram(counts)
        return jsonify({"counts": counts, "histogram": histogram_base64})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/quantum_risk_analysis", methods=["POST"])
def quantum_risk_analysis():
    data = request.json
    portfolio = data.get("portfolio")

    if not portfolio:
        return jsonify({"error": "Portfolio data is required"}), 400

    try:
        qc = QuantumCircuit(len(portfolio))
        for i in range(len(portfolio)):
            qc.h(i)

        backend = AerSimulator()
        compiled_circuit = transpile(qc, backend)
        result = execute(compiled_circuit, backend, shots=1024).result()
        counts = result.get_counts(qc)
        
        risk_scores = {
            "targeted_attacks": sum(int(k, 2) for k, v in counts.items() if v > 0) % 100,
            "dusting_attacks": sum(int(k, 2) for k, v in counts.items() if v < 10) % 100,
            "draining": sum(int(k, 2) for k, v in counts.items() if 10 <= v < 20) % 100,
            "phishing": sum(int(k, 2) for k, v in counts.items() if 20 <= v < 30) % 100
        }
        
        explanation = generate_explanation(risk_scores, plot_state_histogram(counts), None)

        return jsonify({"risk_analysis": {"risk_scores": risk_scores, "counts": counts, "explanation": explanation}})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Portfolio Optimization Endpoint
@app.route("/api/portfolio_optimization", methods=["POST"])
def portfolio_optimization():
    data = request.json
    portfolio = data.get("portfolio")

    if not portfolio:
        return jsonify({"error": "Portfolio data is required"}), 400

    try:
        qc = QuantumCircuit(len(portfolio))
        for i in range(len(portfolio)):
            qc.h(i)

        backend = AerSimulator()
        compiled_circuit = transpile(qc, backend)
        result = execute(compiled_circuit, backend, shots=1024).result()
        counts = result.get_counts(qc)
        
        optimized_portfolio = sorted(counts.keys())  # Simplified optimization
        
        return jsonify({"optimized_portfolio": optimized_portfolio, "counts": counts})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5328)
