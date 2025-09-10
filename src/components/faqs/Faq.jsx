import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const TypingTestFAQs = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqs = [
    {
      question: "What is this website about?",
      answer: "This website allows users to take a typing test, measure their typing speed and accuracy, and download a detailed test report in PDF format."
    },
    {
      question: "Do I need to create an account to take the test?",
      answer: "No, you can take the test without an account. However, having an account may allow you to save your results and track progress in the future."
    },
    {
      question: "Is the typing test free to use?",
      answer: "Yes, the typing test is completely free."
    },
    {
      question: "How is typing speed measured?",
      answer: "Typing speed is measured in Words Per Minute (WPM), which calculates how many words you type correctly in a minute."
    },
    {
      question: "How is accuracy calculated?",
      answer: "Accuracy is the percentage of correct keystrokes compared to total keystrokes made during the test."
    },
    {
      question: "Can I redo the test?",
      answer: "Yes, you can retake the test as many times as you like to improve your score."
    },
    {
      question: "What happens if I make a mistake while typing?",
      answer: "If you type a wrong character, it will be counted as an incorrect keystroke. You can correct mistakes using the backspace key, but excessive backspacing may affect your score."
    },
    {
      question: "How can I download my test report?",
      answer: "After completing the test, you'll see an option to download your report as a PDF. Click the button to save it to your device."
    }
  ];

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button 
              onClick={() => toggleQuestion(index)}
              className="w-full flex justify-between items-center p-4 text-left 
                         bg-gray-50 hover:bg-gray-100 transition-colors 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span className="font-semibold text-gray-800">{faq.question}</span>
              {openQuestion === index ? (
                <ChevronUp className="text-gray-600" />
              ) : (
                <ChevronDown className="text-gray-600" />
              )}
            </button>
            {openQuestion === index && (
              <div 
                className="p-4 bg-white text-gray-700 
                           animate-fade-in-down"
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypingTestFAQs;