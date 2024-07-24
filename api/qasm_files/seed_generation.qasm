// Quantum Random Number Generation for Secure Seed Phrase
OPENQASM 2.0;
include "qelib1.inc";

qreg q[8]; // Quantum register for 8-bit random number
creg c[8]; // Classical register for measurement

// Apply Hadamard gates to all qubits to create superposition
h q[0];
h q[1];
h q[2];
h q[3];
h q[4];
h q[5];
h q[6];
h q[7];

// Measure the qubits to obtain a random number
measure q -> c;
