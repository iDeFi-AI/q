import { openaiApiKey } from '@/constants/env';

const extractImageMetadata = (base64String: string): string => {
  // Extract metadata from base64 string (e.g., size)
  const imageSize = Math.ceil((base64String.length * 3) / 4);
  return `Image size: ${imageSize} bytes`;
};

export const generateQuantumExplanation = async (
  counts: { [key: string]: number },
  histogramBase64: string,
  circuitBase64: string
): Promise<string> => {
  const histogramMetadata = extractImageMetadata(histogramBase64);
  const circuitMetadata = extractImageMetadata(circuitBase64);

  const prompt = `
    Given the following quantum computation results, provide a detailed explanation for a financial advisor:

    Counts:
    ${JSON.stringify(counts, null, 2)}

    Explain the histogram and circuit diagram shown below:
    Histogram Metadata: ${histogramMetadata}
    Circuit Diagram Metadata: ${circuitMetadata}
  `;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo-16k',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
        temperature: 0.5
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Error details:', errorDetails);
      throw new Error('OpenAI API request failed');
    }

    const responseData = await response.json();
    const explanation = responseData.choices[0].message.content.trim();
    return explanation;
  } catch (error) {
    console.error('Error generating explanation:', error);
    throw error;
  }
};
