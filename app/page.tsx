'use client'

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle button click
  const handleClick = () => {
    setIsLoading(true); // Set loading state to true
    // Simulate loading delay (replace with actual data fetching or navigation logic)
    setTimeout(() => {
      // Navigate to the home page after loading
      window.location.href = '/home'; // Change '/home' to the actual path of your home page
    }, 2000); // Adjust the delay as needed
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-black relative">
      {/* Background GIF */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <Image
          src="/background.gif" // Replace with the path to your GIF file
          alt="Background GIF"
          layout="fill"
          objectFit="cover"
        />
      </div>
      
      <div className="z-10 flex flex-col items-center">
        {/* Company Logo */}
        <div className="mb-4">
          <Image
            src="/qidefi-ai.png" // Replace with the path to your company logo
            alt="Company Logo"
            width={300} // Adjust width as needed
            height={300} // Adjust height as needed
          />
        </div>

        {/* Company Name */}

        {/* Company Phrase */}
        <h2 className="text-white text-lg mb-6">A New Era of Quantum Applications</h2>

        {/* Enter Button with loading state */}
        <button 
          className="bg-white text-black py-2 px-4 rounded-lg text-lg font-bold hover:bg-gray-200 transition duration-300"
          onClick={handleClick} // Call handleClick function on button click
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? 'Loading...' : 'Enter'}
        </button>
      </div>
    </main>
  )
}
