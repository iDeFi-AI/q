import { openaiApiKey } from "@/constants/env";

interface QuantumAnalysisResult {
  risk_analysis: {
    risk_score: number;
    counts: { [key: string]: number };
  };
}

interface PortfolioOptimizationResult {
  optimized_portfolio: string[];
  counts: { [key: string]: number };
}

// Analyze Quantum Risk
export const analyzeQuantumRisk = async (qasmFile: string): Promise<QuantumAnalysisResult> => {
  try {
    const response = await fetch('/api/quantum_risk_analysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({ qasm_file: qasmFile }),
    });

    if (!response.ok) {
      throw new Error('Quantum risk analysis request failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error analyzing quantum risk:', error);
    throw error;
  }
};

// Optimize Portfolio
export const optimizePortfolio = async (qasmFile: string): Promise<PortfolioOptimizationResult> => {
  try {
    const response = await fetch('/api/portfolio_optimization', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({ qasm_file: qasmFile }),
    });

    if (!response.ok) {
      throw new Error('Portfolio optimization request failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error optimizing portfolio:', error);
    throw error;
  }
};

// Upload Data File
export const uploadDataFile = async (file: File): Promise<{ message: string; qasm_file: string }> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/upload_data', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Data file upload failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading data file:', error);
    throw error;
  }
};

// Compile and Run QASM File
export const compileAndRunQasmFile = async (filename: string, useIbmBackend = false): Promise<any> => {
  try {
    const response = await fetch('/api/compile-and-run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filename, use_ibm_backend: useIbmBackend }),
    });

    if (!response.ok) {
      throw new Error('Compile and run QASM file request failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error compiling and running QASM file:', error);
    throw error;
  }
};

// Get QASM Files
export const getQasmFiles = async (): Promise<string[]> => {
  try {
    const response = await fetch('/api/qasm-files');

    if (!response.ok) {
      throw new Error('QASM files request failed');
    }

    const data = await response.json();
    return data.files;
  } catch (error) {
    console.error('Error fetching QASM files:', error);
    throw error;
  }
};

// Store Quantum State in Memory
export const storeQuantumState = async (state: string): Promise<any> => {
  try {
    const response = await fetch('/api/store', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ state }),
    });

    if (!response.ok) {
      throw new Error('Store quantum state request failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error storing quantum state:', error);
    throw error;
  }
};

// Retrieve Quantum State from Memory
export const retrieveQuantumState = async (): Promise<any> => {
  try {
    const response = await fetch('/api/retrieve');

    if (!response.ok) {
      throw new Error('Retrieve quantum state request failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error retrieving quantum state:', error);
    throw error;
  }
};

// Get Etherscan Data
export const getEtherscanData = async (): Promise<any> => {
  try {
    const response = await fetch('/api/get_etherscan_data');

    if (!response.ok) {
      throw new Error('Etherscan data request failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Etherscan data:', error);
    throw error;
  }
};
