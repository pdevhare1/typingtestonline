import React from 'react';

const TermsAndConditions = () => {
  const sections = [
    {
      title: "Welcome",
      content: "Welcome to TypingTestOnline.in. By accessing or using our website, you agree to comply with and be bound by the following Terms & Conditions. Please read this document carefully before using our services. If you do not agree with any part of these terms, you must not use our website."
    },
    {
      title: "Eligibility",
      content: "To use TypingTestOnline.in, you must be at least 13 years of age or have received consent from a parent or guardian to use this website. By accessing our services, you represent and warrant that you meet this age requirement."
    },
    {
      title: "Acceptable Use",
      content: "You agree to use TypingTestOnline.in in accordance with all applicable laws and regulations. You must not:",
      list: [
        "Use the website for any illegal purpose.",
        "Engage in unauthorized framing of or linking to the site.",
        "Interfere with, disrupt, or create an undue burden on the website or the networks or services connected to the site.",
        "Attempt to impersonate another user or person or use the username of another user."
      ]
    },
    {
      title: "Intellectual Property",
      content: "All content, design elements, and technology provided on TypingTestOnline.in are owned by TypingTestOnline.in or its licensors and are protected by copyright, trademark, and other intellectual property laws. Unauthorized use of these materials is prohibited and may result in legal action."
    },
    {
      title: "Limitations of Service",
      content: "While we strive to provide uninterrupted access to TypingTestOnline.in, we cannot guarantee continuous availability. We reserve the right to modify, suspend, or discontinue the website or any service provided without notice at any time."
    },
    {
      title: "User Responsibilities",
      content: "As a user of TypingTestOnline.in, you are responsible for:",
      list: [
        "Providing accurate and current information when using our services.",
        "Maintaining the confidentiality of your username and password.",
        "All activities that occur under your account."
      ]
    },
    {
      title: "Liability Disclaimer",
      content: "TypingTestOnline.in is provided \"as is,\" with all faults, and we expressly disclaim all warranties of any kind, whether express or implied. We do not warrant that our services will be error-free or that any errors will be corrected, and we take no responsibility for any harm that might occur to your system or data arising from your use of our website."
    },
    {
      title: "Indemnity",
      content: "You agree to indemnify, defend, and hold harmless TypingTestOnline.in and its affiliates, partners, employees, and agents from any and all claims, damages, losses, liabilities, costs, or debt arising from your use of the site or violation of these terms."
    },
    {
      title: "Termination",
      content: "We reserve the right to terminate or suspend your access to TypingTestOnline.in without prior notice, if we determine that you have violated these Terms & Conditions or engage in conduct that we deem inappropriate or unlawful."
    },
    {
      title: "Changes to Terms & Conditions",
      content: "TypingTestOnline.in may revise these Terms & Conditions at any time by posting the updated document on the website. We will notify users of any significant changes through the website or via email if you are subscribed. Continued use of the website following the posting of changes will mean you accept those changes."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Terms & Conditions</h1>
      
      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              {section.title}
            </h2>
            <div className="text-gray-600 leading-relaxed">
              <p>{section.content}</p>
              {section.list && (
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  {section.list.map((item, i) => (
                    <li key={i} className="text-gray-600">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-6">
        <p className="text-gray-600 text-center">
          For any questions, clarifications, or disputes regarding these Terms & Conditions, 
          please contact us through our support page.
        </p>
        
        <p className="text-gray-700 font-medium text-center mt-4">
          Thank you for choosing TypingTestOnline.in to assist in your typing skill development. 
          We hope you find our platform beneficial and look forward to supporting your journey to 
          improved typing proficiency.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;