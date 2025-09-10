import React from 'react';

const Disclaimer = () => {
  const sections = [
    {
      title: "Welcome to TypingTestOnline.in!",
      content: "Our platform is designed to help users improve their typing skills through various online typing tests. We aim to provide a beneficial and enjoyable experience, but it is important that you understand the following disclaimers applicable to your use of the website."
    },
    {
      title: "No Guarantees of Accuracy",
      content: "TypingTestOnline.in provides typing tests and related information \"as is.\" While we strive to ensure the accuracy and reliability of the content and results on our platform, we cannot guarantee that our services will meet your expectations in terms of accuracy, completeness, or applicability to your particular circumstances. Variations in typing test results can occur due to multiple factors, including but not limited to user hardware, internet connection, and individual typing styles."
    },
    {
      title: "Limitation of Liability",
      content: "TypingTestOnline.in, its affiliates, partners, employees, and agents shall not be held liable for any direct, indirect, incidental, or consequential damages or injuries arising from the use or inability to use our services, including, but not limited to, errors, omissions, interruptions, or privacy breaches. This limitation of liability applies to damages caused by any failure of performance, error, omission, interruption, defect, delay in operation or transmission, computer virus, or line failure."
    },
    {
      title: "External Links",
      content: "Our website may contain links to third-party websites or services that are not owned or controlled by TypingTestOnline.in. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. Your access and use of such linked websites, including any goods, services, or information made available on these sites, are solely at your own risk."
    },
    {
      title: "No Professional Advice",
      content: "The content provided on TypingTestOnline.in is for general informational and entertainment purposes only and should not be considered as professional or expert advice. Users should consult appropriate professionals before making any decisions based on the content provided by our platform."
    },
    {
      title: "Indemnity",
      content: "By using TypingTestOnline.in, you agree to indemnify and hold harmless TypingTestOnline.in, its officers, directors, employees, agents, licensors, and suppliers from and against any and all claims, liabilities, damages, losses, or expenses, including reasonable attorneys' fees and costs, due to or arising out of your use of the website, your violation of these terms, or your violation of any rights of another."
    },
    {
      title: "Changes to the Disclaimer",
      content: "TypingTestOnline.in reserves the right to modify this disclaimer at any time without notice. Any changes will be effective immediately upon posting on this page, and continued use of the website following any modifications indicates your acceptance of the new terms."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Disclaimer</h1>
      
      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              {section.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-6">
        <p className="text-gray-600 text-center">
          This disclaimer is intended to clarify the limitations of our liability and the use of our services. 
          Should you have any questions or concerns about this disclaimer, please contact us through our support page.
        </p>
        
        <p className="text-gray-700 font-medium text-center mt-4">
          Thank you for choosing TypingTestOnline.in. We wish you success in your journey to enhance your typing abilities.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;