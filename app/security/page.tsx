import React from 'react';
import Link from 'next/link';

const SecurityPage: React.FC = () => {
  const qasmFiles = [
    {
      title: "Quantum Random Number Generation",
      description: "Generate secure random numbers using quantum mechanics, which can be used for cryptographic keys and secure seed phrases.",
      filePath: "/api/qasm_files/random_number_generation.qasm",
    },
    {
      title: "Grover's Algorithm for Cracking a Simple Seed Phrase",
      description: "Showcase how quantum computing can be used to brute-force simple seed phrases, emphasizing the need for quantum-resistant algorithms.",
      filePath: "/api/qasm_files/grovers_algorithm.qasm",
    },
    {
      title: "Quantum Key Distribution (QKD)",
      description: "Example of QKD for secure communication, ensuring that keys exchanged over quantum channels cannot be intercepted without detection.",
      filePath: "/api/qasm_files/qkd.qasm",
    },
    {
      title: "Quantum Algorithm for Unseeding Crypto Wallet Seed Phrases",
      description: "Demonstrate a quantum algorithm designed to unseed or crack seed phrases associated with crypto wallet addresses for educational purposes.",
      filePath: "/api/qasm_files/unseed.qasm",
    },
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Quantum Security in Blockchain</h1>
      <p className="mb-4">
        Quantum computing presents both challenges and opportunities for the financial blockchain space. While it can be used to crack traditional cryptographic methods, it also provides new ways to enhance security. Here are some QASM examples that showcase how quantum computing can be applied to security in blockchain technology.
      </p>
      {qasmFiles.map((file, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-bold mb-2">{file.title}</h2>
          <p className="mb-4">{file.description}</p>
          <Link href={file.filePath} passHref>
            <a className="text-blue-500 underline" target="_blank">
              View QASM File
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SecurityPage;
