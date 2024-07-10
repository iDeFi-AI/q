'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface SectionProps {
  title: string;
  content: string;
  paragraphs?: string[];
  imageUrl?: string;
  imageAlt?: string;
}

const FinancialAdvisorPage: React.FC = () => {
  const [portfolio, setPortfolio] = useState<string>('');
  const [riskAnalysis, setRiskAnalysis] = useState<any>(null);
  const [optimizedPortfolio, setOptimizedPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [rawBlockchainData, setRawBlockchainData] = useState<any>(null);
  const [transformedData, setTransformedData] = useState<any>(null);

  const handleRiskAnalysis = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/quantum_risk_analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ portfolio: JSON.parse(portfolio) }),
      });
      const data = await response.json();
      setRiskAnalysis(data.risk_analysis);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const handlePortfolioOptimization = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/portfolio_optimization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ portfolio: JSON.parse(portfolio) }),
      });
      const data = await response.json();
      setOptimizedPortfolio(data.optimized_portfolio);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const handleFetchRawData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/get_etherscan_data', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('Raw blockchain data:', data); // Log the data to inspect the response
      setRawBlockchainData(data);
      // Simulate transformation of raw data for demonstration
      setTransformedData(transformRawData(data));
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const transformRawData = (data: any) => {
    if (!data) {
      console.error('Invalid raw data:', data);
      return null;
    }

    const transactions = Array.isArray(data) ? data : [data];

    // Implement your transformation logic here
    // This is a simulated transformation
    return {
      address: "0x123...",
      status: "Pass",
      description: "Not Flagged",
      ai_insights: {
        risk_score: 2,
        summary: "This wallet shows regular activity with no significant red flags detected. The transactions involve moderate amounts and typical gas usage, indicating standard usage patterns.",
        recommendations: "Monitor periodically for any changes in transaction patterns or unusual activities."
      },
      transactions: transactions.map((tx: any) => ({
        transactionHash: tx.hash,
        timestamp: new Date(parseInt(tx.timeStamp) * 1000).toISOString(),
        from: tx.from,
        to: tx.to,
        value: `${parseFloat(tx.value) / 1e18} ETH`,
        gasUsed: tx.gasUsed,
        status: tx.isError === "0" ? "Success" : "Failed",
        description: "Regular transaction",
        ai_analysis: {
          type: "Standard Transfer",
          risk_level: "Low",
          notes: "Typical transfer between two addresses with no irregularities."
        }
      }))
    };
  };

  const sections: SectionProps[] = [
    {
      title: 'iDeFi.AI Financial Advisory Insights',
      content: '',
    },
    {
      title: 'Overview of iDeFi.ai',
      content: 'Welcome to iDeFi.ai, where blockchain technology and AI converge to redefine financial advisory services with unparalleled innovation.',
      paragraphs: [
        'Our vision is to transform financial advisory by leveraging the latest in blockchain, AI, and Quantum Technologies to deliver superior insights and security.',
        'Unlike others in the industry, iDeFi.ai goes beyond the conventional methods, offering a comprehensive suite of advanced tools designed to provide actionable and decisionable insights in real-time.',
        'Join us in exploring a new era of financial advisory, where technology empowers smarter investments, secure transactions, and enhanced user experience.',
      ],
    },
    {
      title: 'Our Unique Approach',
      content: 'At iDeFi.ai, our approach is centered on creating a financial ecosystem that prioritizes security, efficiency, and inclusivity, setting us apart from potential competitors',
      paragraphs: [
        "iDeFi.ai combines the power of blockchain and AI to offer deeper insights and advanced security features.",
        " Security: Our AI-driven risk scoring models provide precise assessments, ensuring your investments are protected against potential threats.",
        " Efficiency: By analyzing money flows, we streamline the onboarding process and enhance user experience, making financial management seamless.",
        " Inclusivity: We believe in breaking down barriers and making financial services accessible to everyone, leveraging blockchain's transparency and AI's adaptability.",
      ],
    },
    {
      title: 'Core Services',
      content: 'Our core services include risk scoring, on/off-boarding insights, sentiment analysis, and actionable moments for better financial decision-making.',
      paragraphs: [
        "Risk Scoring: Our AI-driven models provide precise risk assessments to flag potential issues and ensure informed investment decisions.",
        " On/Off Boarding: We analyze money flows to streamline the onboarding process and enhance user experience.",
        " Sentiment Analysis: By monitoring market sentiment, especially around Real-World Assets (RWA), we identify value, growth, and decline trends.",
        " Actionable Moments: Our system triggers alerts for tax consequences, investment opportunities, and other critical financial events.",
        " Other Outcomes: We continuously innovate to provide additional insights and solutions tailored to your financial needs.",
      ],
    },
    {
      title: 'Our Commitment',
      content: 'iDeFi.ai is at the forefront of the financial advisory revolution. Our commitment to user-friendliness, robust security measures, and AI-driven solutions positions us as a leader in the sector.',
      paragraphs: [
        "Being at the forefront means we're driving the transformation of financial advisory services. Our commitment to innovation and excellence is unwavering.",
        " User-friendliness is key. We ensure our platform is accessible to all users, regardless of their technical expertise.",
        " Robust security measures are our foundation. We continually enhance our security protocols to protect your digital assets.",
        " AI-driven solutions are the future. By integrating AI capabilities, we offer unparalleled efficiency and innovation in financial advisory.",
      ],
    },
    {
      title: 'Raw Blockchain Data vs. iDeFi.AI Insights',
      content: 'See how we transform raw blockchain data into actionable insights:',
      paragraphs: [
        "Here's an example of raw blockchain data and how we transform it into a more digestible format for financial advisors.",
      ],
    },
  ];

  return (
    <div className="container mx-auto min-h-screen flex flex-col items-center py-12 px-4 md:px-8 lg:px-16">
      {sections.map((section, index) => (
        <div className="section w-full max-w-4xl mb-8" key={index}>
          <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
          <h4 className="text-lg mb-4">{section.content}</h4>
          {section.paragraphs && (
            <div>
              {section.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
          {section.imageUrl && (
            <div className="image-container mt-4">
              <Image
                layout="responsive"
                objectFit="cover"
                width={200}
                height={300}
                src={section.imageUrl}
                alt={section.imageAlt ?? section.title}
                className="rounded-md"
              />
            </div>
          )}
          {index !== 0 && (
            <hr className="my-8 border-t-2 border-gray-200" />
          )}
        </div>
      ))}
      <div className="section w-full max-w-4xl mb-8">
        <h2 className="text-2xl font-bold mb-4">Raw Blockchain Data vs. Transformed iDeFi.AI Data</h2>
        <button onClick={handleFetchRawData} disabled={loading} className="mt-4 p-2 bg-blue-500 text-white rounded">
          Fetch Data
        </button>
        {rawBlockchainData && transformedData && (
          <div className="comparison-container mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Raw Blockchain Data</h3>
              <pre className="bg-gray-100 p-4 rounded-md text-black text-left overflow-auto">
                {JSON.stringify(rawBlockchainData, null, 2)}
              </pre>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Transformed iDeFi.AI Data</h3>
              <pre className="bg-gray-100 p-4 rounded-md text-black text-left overflow-auto">
                {JSON.stringify(transformedData, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>

      <div className="section w-full max-w-4xl mb-8">
        <h2 className="text-2xl font-bold mb-4">Why Choose iDeFi.AI?</h2>
        <p>
          Our AI-driven insights transform complex blockchain data into actionable recommendations that financial advisors can use to make informed decisions for their clients. Whether it's identifying risk levels, monitoring transaction patterns, or providing tax-related information, iDeFi.AI offers a comprehensive solution that makes understanding blockchain data simple and effective.
        </p>
      </div>

      <div className="section w-full max-w-4xl mb-8">
        <h2 className="text-2xl font-bold mb-4">Quantum Risk Analysis</h2>
        <textarea
          value={portfolio}
          onChange={(e) => setPortfolio(e.target.value)}
          placeholder="Enter portfolio data as JSON array"
          rows={5}
          className="w-full p-2 border rounded"
        />
        <button onClick={handleRiskAnalysis} disabled={loading} className="mt-4 p-2 bg-blue-500 text-white rounded">
          Analyze Risk
        </button>
        {riskAnalysis && (
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-4">Risk Analysis Result</h3>
            <pre className="bg-gray-100 p-4 rounded-md text-left overflow-auto">{JSON.stringify(riskAnalysis, null, 2)}</pre>
          </div>
        )}
      </div>

      <div className="section w-full max-w-4xl mb-8">
        <h2 className="text-2xl font-bold mb-4">Portfolio Optimization</h2>
        <textarea
          value={portfolio}
          onChange={(e) => setPortfolio(e.target.value)}
          placeholder="Enter portfolio data as JSON array"
          rows={5}
          className="w-full p-2 border rounded"
        />
        <button onClick={handlePortfolioOptimization} disabled={loading} className="mt-4 p-2 bg-green-500 text-white rounded">
          Optimize Portfolio
        </button>
        {optimizedPortfolio && (
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-4">Optimized Portfolio</h3>
            <pre className="bg-gray-100 p-4 rounded-md text-left overflow-auto">{JSON.stringify(optimizedPortfolio, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialAdvisorPage;
