import Link from 'next/link';

const Info = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 bg-black sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Quantum Suite</h2>
          <p className="mt-2 text-white text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Welcome to QiDEFi.AI
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Revolutionizing finance with cutting-edge quantum technology and artificial intelligence.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <p className="text-white ml-16 text-lg leading-6 font-medium text-gray-900">Quantum Computing</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Leveraging the power of quantum computing to solve complex financial problems and optimize transactions.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-white ml-16 text-lg leading-6 font-medium text-gray-900">AI-Driven Insights</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Harnessing artificial intelligence to provide actionable insights and predictive analytics for smart contract transactions.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-white ml-16 text-lg leading-6 font-medium text-gray-900">Real-time Monitoring</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Real-time monitoring and analysis of on-chain data to ensure security and efficiency in all financial transactions.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4m0 4H8m4 0h4" />
                  </svg>
                </div>
                <p className="text-white ml-16 text-lg leading-6 font-medium text-gray-900">Security and Compliance</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                Ensuring robust security measures and compliance with industry standards to protect user data and transactions.
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-12 text-center">
          <Link href="/home">
            <span className="text-indigo-600 hover:text-indigo-900">Go back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Info;
