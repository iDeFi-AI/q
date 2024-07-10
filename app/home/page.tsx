import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
  const catchSlogans = [
    "Empowering DeFi with Quantum Computing",
  ];

  return (
    <div className="h-screen flex justify-center items-center bg-black">
      <div className="container mx-auto flex justify-center items-center">
        {/* Left container */}
        <div className="w-2/3 p-8">
          <h1 className="text-4xl mb-6 font-bold text-white">Welcome to QiDeFi.AI</h1>
          {/* Render catch slogans */}
          {catchSlogans.map((slogan, index) => (
            <p key={index} className="text-xl text-white mb-6 text-gray-800">&#8220;{slogan}&#8221;</p> 
          ))}
          {/* Continue button */}
          <Link href="/info" passHref>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-12">Continue</button>
          </Link>
        </div>
        {/* Right container */}
        <div className="w-1/3 flex justify-center items-center">
          {/* GIF image */}
          <Image
            src="/globe.gif"
            alt="quantum"
            width={600}
            height={600}
            layout="responsive"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
