// Quantum Key Distribution (QKD)
OPENQASM 2.0;
include "qelib1.inc";

qreg alice[1];
qreg bob[1];
creg c[2];

// Alice prepares her qubit
h alice[0];
measure alice[0] -> c[0];

// Bob applies a random basis (for demonstration, we'll use Hadamard)
h bob[0];
measure bob[0] -> c[1];
