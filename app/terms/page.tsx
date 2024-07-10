import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="container mx-auto min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Terms of Service and Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
        <p>
          Welcome to Qalice, the quantum suite for iDeFi.ai. These Terms of Service and Privacy Policy govern your use of our platform and services. By accessing or using Qalice, you agree to be bound by these terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">2. Terms of Service</h2>

        <h3 className="text-xl font-bold mb-2">2.1 Use of the Platform</h3>
        <p>
          You agree to use Qalice in accordance with all applicable laws and regulations. You must not use the platform for any unlawful or fraudulent activities.
        </p>

        <h3 className="text-xl font-bold mb-2">2.2 Account Registration</h3>
        <p>
          To access certain features of Qalice, you may be required to register an account. You must provide accurate and complete information during the registration process and keep your account information up-to-date.
        </p>

        <h3 className="text-xl font-bold mb-2">2.3 User Conduct</h3>
        <p>
          You are responsible for all activities conducted through your account. You agree not to engage in any activity that disrupts or interferes with the platform or the servers and networks connected to Qalice.
        </p>

        <h3 className="text-xl font-bold mb-2">2.4 Intellectual Property</h3>
        <p>
          All content, trademarks, and data on Qalice are the property of iDeFi.ai or its licensors. You may not use any content without prior written permission.
        </p>

        <h3 className="text-xl font-bold mb-2">2.5 Termination</h3>
        <p>
          We reserve the right to suspend or terminate your access to Qalice at our discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users of the platform, us, or third parties.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">3. Privacy Policy</h2>

        <h3 className="text-xl font-bold mb-2">3.1 Data Collection</h3>
        <p>
          We collect personal data that you provide to us, such as your name, email address, and payment information, as well as data generated from your use of Qalice.
        </p>

        <h3 className="text-xl font-bold mb-2">3.2 Use of Data</h3>
        <p>
          We use your personal data to provide and improve our services, communicate with you, process transactions, and for security purposes.
        </p>

        <h3 className="text-xl font-bold mb-2">3.3 Data Sharing</h3>
        <p>
          We do not share your personal data with third parties except as necessary to provide our services, comply with the law, or protect our rights.
        </p>

        <h3 className="text-xl font-bold mb-2">3.4 Data Security</h3>
        <p>
          We implement appropriate security measures to protect your personal data. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee its absolute security.
        </p>

        <h3 className="text-xl font-bold mb-2">3.5 Data Retention</h3>
        <p>
          We retain your personal data for as long as necessary to provide our services and as required by applicable law.
        </p>

        <h3 className="text-xl font-bold mb-2">3.6 Your Rights</h3>
        <p>
          You have the right to access, correct, or delete your personal data. You may also have the right to restrict or object to certain types of processing of your personal data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">4. Changes to Terms</h2>
        <p>
          We may update these Terms of Service and Privacy Policy from time to time. We will notify you of any changes by posting the new terms on Qalice. Your continued use of the platform after the changes take effect constitutes your acceptance of the new terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">5. Contact Us</h2>
        <p>
          If you have any questions about these Terms of Service and Privacy Policy, please contact us at support@qalice.idefi.ai.
        </p>
      </section>
    </div>
  );
};

export default TermsPage;
