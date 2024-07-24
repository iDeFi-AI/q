'use client';

import { useState, useEffect } from 'react';
import { generateQuantumExplanation } from '@/utilities/GenAI';

export default function QApp() {
  const [qasmFiles, setQasmFiles] = useState<string[]>([]);
  const [filename, setFilename] = useState<string>('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchQasmFiles = async () => {
      try {
        const response = await fetch('/api/qasm_files');
        const data = await response.json();
        setQasmFiles(data.files);
      } catch (error) {
        console.error("Error fetching QASM files:", error);
      }
    };
    fetchQasmFiles();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);  // Clear previous result
    try {
      const response = await fetch('/api/compile-and-run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename }),
      });
      const data = await response.json();
      setResult(data);

      if (!data.error) {
        const explanation = await generateQuantumExplanation(
          data.counts,
          data.histogram,
          data.circuit_diagram
        );
        setResult((prevResult: any) => ({ ...prevResult, explanation }));
      }
    } catch (error) {
      console.error("Error running the quantum code:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Run Quantum Program</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <select 
          value={filename} 
          onChange={(e) => setFilename(e.target.value)}
          className="text-black p-2 border rounded mb-4 w-full md:w-1/2"
        >
          <option value="">Select a QASM file</option>
          {qasmFiles.map(file => (
            <option key={file} value={file}>{file}</option>
          ))}
        </select>
        <button 
          type="submit" 
          className="bg-neorange hover:bg-neohover text-white p-2 rounded w-full md:w-1/2"
          disabled={loading}
        >
          {loading ? 'Running...' : 'Run'}
        </button>
      </form>
      {result && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Result:</h2>
          {result.error ? (
            <p className="text-red-500">{result.error}</p>
          ) : (
            <>
              <pre className="bg-gray-100 text-black p-4 rounded mb-4 overflow-x-auto">
                {JSON.stringify(result.counts, null, 2)}
              </pre>
              <h3 className="text-lg font-semibold mb-2">Histogram:</h3>
              {result.histogram && (
                <img 
                  src={`data:image/png;base64,${result.histogram}`} 
                  alt="Histogram" 
                  className="w-full md:w-1/2 mx-auto mb-4"
                />
              )}
              <h3 className="text-lg font-semibold mb-2">Circuit Diagram:</h3>
              {result.circuit_diagram && (
                <img 
                  src={`data:image/png;base64,${result.circuit_diagram}`} 
                  alt="Circuit Diagram" 
                  className="w-full md:w-1/2 mx-auto mb-4"
                />
              )}
              {result.explanation && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Explanation:</h3>
                  <p className="bg-gray-100 text-black p-4 rounded mb-4 overflow-x-auto">
                    {result.explanation}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
