import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="mb-6">
          At TypingTestOnline.in, your privacy is of utmost importance to us. This Privacy Policy explains how we collect, use, and protect your personal data when you use our services. By accessing or using TypingTestOnline.in, you agree to the terms outlined in this policy.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Data Collection</h2>
        <p className="mb-4">TypingTestOnline.in may collect the following types of information:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <span className="font-semibold">Personal Information:</span> We collect minimal personal information only when voluntarily provided by the user. This may include an email address if you choose to subscribe to any newsletters or updates.
          </li>
          <li>
            <span className="font-semibold">Usage Data:</span> Information on how you use our website, including which pages you visit, the time and date of your visit, and other diagnostic data.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Use of Data</h2>
        <p className="mb-4">The data collected is used for the following purposes:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <span className="font-semibold">Improving Services:</span> To enhance the user experience and optimize our website's content and functionality based on user interaction.
          </li>
          <li>
            <span className="font-semibold">Communication:</span> To send you updates and information regarding changes to our services, if you have subscribed to such updates.
          </li>
          <li>
            <span className="font-semibold">Analysis:</span> To better understand overall trends and to analyze data for the improvement of our services.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Third-Party Services</h2>
        <p className="mb-4">We leverage third-party services which may collect user data:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <span className="font-semibold">Google Analytics:</span> Used for tracking and reporting website traffic, which helps us understand how users interact with our site and identify areas for improvement.
          </li>
          <li>
            <span className="font-semibold">Google Search Console:</span> Offers insights into site performance in search results, aiding in optimization.
          </li>
          <li>
            <span className="font-semibold">Google Ads:</span> May collect data to display personalized advertisements based on your interactions.
          </li>
          <li>
            <span className="font-semibold">Microsoft Clarity:</span> Provides insights into user behavior to optimize site layout and enhance user experience.
          </li>
        </ul>
        <p className="mb-6">These third-party services have their own privacy policies addressing how they handle user data.</p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Data Protection and Security</h2>
        <p className="mb-6">
          We are committed to ensuring your data is secure. To prevent unauthorized access or disclosure, we have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Reporting Security Breaches</h2>
        <p className="mb-6">
          In the event of a security breach, we will promptly notify affected users and report to appropriate authorities as required by applicable laws. Our protocol ensures a swift response to mitigate any possible harm.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Data Retention</h2>
        <p className="mb-6">
          We retain personal data only as long as necessary for the purposes outlined in this policy and legal obligations. Non-personal data may be retained indefinitely.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Your Rights</h2>
        <p className="mb-4">Depending on your location and applicable laws, you may have the following rights:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Access to your personal data.</li>
          <li>Request correction or deletion of your data.</li>
          <li>Object to or restrict processing of your personal data.</li>
          <li>Withdraw consent at any time where processing is based on consent.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Changes to Our Privacy Policy</h2>
        <p className="mb-6">
          TypingTestOnline.in reserves the right to update this Privacy Policy at any time. Any changes will be notified to users via the website or through registered email addresses at least 30 days prior to implementation. Continuous access to or use of our service after changes take effect indicates acceptance of updated policy terms.
        </p>

        <p className="mb-6">
          For any questions or concerns regarding this Privacy Policy, please contact us through our support page.
        </p>

        <p className="mb-6 font-medium">
          Thank you for choosing TypingTestOnline.in to improve your typing skills. We are dedicated to protecting your privacy and enhancing your user experience.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;