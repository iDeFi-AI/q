// Quantum Random Number Generation
OPENQASM 2.0;
include "qelib1.inc";
qreg q[256];
creg c[256];

h q[0];
h q[1];
h q[2];
// ... (initialize remaining qubits)

measure q -> c;
