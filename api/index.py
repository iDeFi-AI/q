import os
import logging
import base64
import json
from flask import Flask, request, jsonify
from qiskit import Aer, QuantumCircuit, transpile, IBMQ, execute
from qiskit.visualization import plot_histogram, circuit_drawer
from qiskit.providers.ibmq import least_busy
import matplotlib.pyplot as plt
from io import BytesIO
import pandas as pd
import requests

app = Flask(__name__)
QASM_DIR = os.path.join(os.path.dirname(__file__), 'qasm_files')
DATA_DIR = os.path.join(os.path.dirname(__file__), 'data_files')

# Load IBM Quantum account
IBMQ.save_account('25e41bddcb5e8c626e424aa22c649f586f2540899d67f2a1bea408971c982d3187822dfc80c3ccea1c48687dc4730b98c124edfc7570fdb7997c5782de79eb48', overwrite=True)
IBMQ.load_account()

# Set Etherscan API Key
ETHERSCAN_API_KEY = os.getenv('ETHERSCAN_API_KEY', 'QEX6DGCMDRPXRU89FKPUR4BG9AUMCR4FXD')

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
        with open(file_path, 'r') as file:
            quantum_code = file.read()
        qc = QuantumCircuit.from_qasm_str(quantum_code)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    if use_ibm_backend:
        provider = IBMQ.get_provider(hub='ibm-q')
        backend = least_busy(provider.backends(simulator=False))
    else:
        backend = Aer.get_backend('qasm_simulator')

    compiled_circuit = transpile(qc, backend)
    if use_ibm_backend:
        job = backend.run(compiled_circuit)
        result = job.result()
    else:
        result = execute(compiled_circuit, backend, shots=1024).result()

    counts = result.get_counts(qc)
    histogram_base64 = plot_state_histogram(counts)

    fig, ax = plt.subplots()
    circuit_drawer(qc, ax=ax, output='mpl')
    circuit_img = BytesIO()
    plt.savefig(circuit_img, format='png')
    circuit_img.seek(0)
    circuit_base64 = base64.b64encode(circuit_img.getvalue()).decode('utf-8')
    plt.close()

    return jsonify({
        "counts": counts,
        "histogram": f"data:image/png;base64,{histogram_base64}",
        "circuit_diagram": f"data:image/png;base64,{circuit_base64}"
    })

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

        backend = Aer.get_backend('qasm_simulator')
        compiled_circuit = transpile(qc, backend)
        result = execute(compiled_circuit, backend, shots=1024).result()
        counts = result.get_counts(qc)
        
        risk_score = sum(counts.values()) % 100  # Simplified risk score calculation
        
        return jsonify({"risk_analysis": {"risk_score": risk_score, "counts": counts}})
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

        backend = Aer.get_backend('qasm_simulator')
        compiled_circuit = transpile(qc, backend)
        result = execute(compiled_circuit, backend, shots=1024).result()
        counts = result.get_counts(qc)
        
        optimized_portfolio = sorted(counts.keys())  # Simplified optimization
        
        return jsonify({"optimized_portfolio": optimized_portfolio, "counts": counts})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5328)
