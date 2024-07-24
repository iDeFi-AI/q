// Grover's Algorithm for Cracking a Simple 3-bit Seed Phrase
OPENQASM 2.0;
include "qelib1.inc";

qreg q[3]; // Quantum register for the seed phrase
qreg anc[1]; // Ancilla qubit for marking solutions
creg c[3]; // Classical register for measurement

// Initialize ancilla qubit to |->
h anc[0];
x anc[0];
h anc[0];

// Apply Hadamard gates to all qubits
h q[0];
h q[1];
h q[2];

// Oracle (example for a secret seed phrase "101")
cz q[0], anc[0];
x q[1];
cz q[1], anc[0];
x q[1];
cz q[2], anc[0];

// Diffusion operator
h q[0];
h q[1];
h q[2];
x q[0];
x q[1];
x q[2];
h q[2];
ccx q[0], q[1], q[2];
h q[2];
x q[0];
x q[1];
x q[2];
h q[0];
h q[1];
h q[2];

// Measure the qubits
measure q -> c;
