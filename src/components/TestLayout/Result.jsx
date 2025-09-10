import React from 'react';
import html2pdf from 'html2pdf.js';
import { Share2, Download } from 'lucide-react';

const TestResults = ({ 
  wpm, 
  cpm, 
  correctChars, 
  incorrectChars, 
  correctWords, 
  incorrectWords, 
  corrections, 
  maxSpeed, 
  duration, 
  isTestComplete,
  accuracy
}) => {
  // Calculate accuracy if not provided
  const calculatedAccuracy = accuracy || Math.round((correctChars / (correctChars + incorrectChars)) * 100) || 0;
  
  const handleShare = () => {
    const text = `I achieved ${wpm} WPM (${cpm} CPM) in the typing test!`;
    if (navigator.share) {
      navigator.share({
        title: 'Typing Test Results',
        text: text,
      }).catch(console.error);
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(text).then(() => {
        alert('Results copied to clipboard!');
      });
    }
  };

  const handleDownload = () => {
    // Create a temporary div to hold our result layout
    const resultElement = document.createElement('div');
    
    // Calculate final accuracy metrics
    const halfCorrectChars = 0; // Add logic for half-correct if needed
    const totalTypedChars = correctChars + incorrectChars + halfCorrectChars;
    
    // Add the result HTML content
    resultElement.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto; font-family: Arial, sans-serif;">
        <!-- Header -->
        <div style="background: linear-gradient(to right, #60A5FA, #3B82F6); padding: 1rem; color: white;">
          <h1 style="font-size: 1.5rem; font-weight: bold; text-align: center;">Typing Test Result</h1>
        </div>

        <!-- Main Score -->
        <div style="padding: 1.5rem; background-color: #F9FAFB; border-bottom: 1px solid #E5E7EB;">
          <div style="text-align: center;">
            <span style="font-size: 2.25rem; font-weight: bold; color: #059669;">${wpm}</span>
            <p style="color: #4B5563; margin-top: 0.5rem;">Words per minute</p>
            <p style="font-size: 1rem; color: #059669; margin-top: 0.5rem;">${cpm} characters per minute</p>
            <p style="font-size: 0.875rem; color: #059669; margin-top: 0.25rem;">${correctChars} correct keystrokes per minute</p>
            <p style="font-size: 0.75rem; color: #6B7280; margin-top: 0.25rem;">(including Shift key and key combinations for accents and special characters)</p>
          </div>
        </div>

        <!-- Summary -->
        <div style="padding: 1rem; background-color: white; border-bottom: 1px solid #E5E7EB; text-align: center;">
          <p>
            Your typing speed is <span style="color: #059669; font-weight: bold;">${wpm}</span> words per minute with
            <span style="color: #059669; font-weight: bold;">${calculatedAccuracy}%</span> accuracy.
          </p>
        </div>

        <!-- Detailed Analysis -->
        <div style="padding: 1.5rem; background-color: white; border-bottom: 1px solid #E5E7EB;">
          <h2 style="font-size: 1.25rem; font-weight: 600; text-align: center; margin-bottom: 1rem;">
            Analysis in detail (${duration} minute${duration > 1 ? 's' : ''})
          </h2>
          <div style="max-width: 28rem; margin: 0 auto;">
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="border-bottom: 1px solid #E5E7EB;">
                  <th style="padding: 0.5rem;"></th>
                  <th style="padding: 0.5rem; color: #059669;">Correct</th>
                  <th style="padding: 0.5rem; color: #EAB308;">Half correct (*)</th>
                  <th style="padding: 0.5rem; color: #DC2626;">Wrong</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid #E5E7EB;">
                  <td style="padding: 0.5rem; font-weight: 600;">Characters:</td>
                  <td style="padding: 0.5rem; text-align: center;">${correctChars}</td>
                  <td style="padding: 0.5rem; text-align: center;">${halfCorrectChars}</td>
                  <td style="padding: 0.5rem; text-align: center;">${incorrectChars}</td>
                </tr>
                <tr>
                  <td style="padding: 0.5rem; font-weight: 600;">Words:</td>
                  <td style="padding: 0.5rem; text-align: center;">${correctWords}</td>
                  <td style="padding: 0.5rem; text-align: center;">0</td>
                  <td style="padding: 0.5rem; text-align: center;">${incorrectWords}</td>
                </tr>
              </tbody>
            </table>
            <p style="font-size: 0.75rem; color: #6B7280; margin-top: 1rem; text-align: center;">
              (*) Half correct = capital letters were not typed correctly ("a" instead of "A")
            </p>
          </div>
          <div style="text-align: center; margin-top: 1rem;">
            <p>You made <span style="font-weight: bold;">${corrections}</span> corrections.</p>
            <p>Your accuracy rate was <span style="font-weight: bold;">${calculatedAccuracy}%</span>.</p>
            <p>Your maximum typing speed was <span style="font-weight: bold;">${Math.round(maxSpeed)}</span> characters per second.</p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: white; padding: 1rem;">
          <table style="width: 100%;">
            <tbody>
              <tr>
                <td style="background-color: #DBEAFE; padding: 0.5rem; width: 33%;">Used keyboard</td>
                <td style="padding: 0.5rem;">Standard keyboard (PC / Notebook)</td>
              </tr>
              <tr>
                <td style="background-color: #DBEAFE; padding: 0.5rem;">Highscore</td>
                <td style="padding: 0.5rem;">${wpm} words per minute with ${calculatedAccuracy}% accuracy</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Configure PDF options
    const opt = {
      margin: 1,
      filename: 'typing-test-result.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Generate PDF
    html2pdf().set(opt).from(resultElement).save();
  };

  // In-app results display
  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6 border border-blue-200">
      <h2 className="text-xl font-bold text-center text-blue-800 mb-4">Your Typing Test Results</h2>
      
      {/* Main results */}
      <div className="bg-blue-50 rounded-lg p-4 text-center mb-6">
        <div className="text-3xl font-bold text-green-600 mb-1">{wpm} WPM</div>
        <div className="text-lg text-gray-600">{cpm} Characters Per Minute</div>
        <div className="text-md text-gray-600 mt-1">{correctChars} Correct Keystrokes Per Minute</div>
        <div className="text-md text-gray-600 mt-2">Accuracy: {calculatedAccuracy}%</div>
      </div>
      
      {/* Detailed statistics */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-gray-700 mb-2">Characters</h3>
          <div className="flex justify-between items-center">
            <span className="text-green-600">Correct: {correctChars}</span>
            <span className="text-red-600">Incorrect: {incorrectChars}</span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-gray-700 mb-2">Words</h3>
          <div className="flex justify-between items-center">
            <span className="text-green-600">Correct: {correctWords}</span>
            <span className="text-red-600">Incorrect: {incorrectWords}</span>
          </div>
        </div>
      </div>
      
      {/* Additional stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <div className="text-sm text-gray-600">Corrections</div>
          <div className="font-bold text-blue-600">{corrections}</div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <div className="text-sm text-gray-600">Max Speed</div>
          <div className="font-bold text-blue-600">{Math.round(maxSpeed)} c/s</div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <div className="text-sm text-gray-600">Test Duration</div>
          <div className="font-bold text-blue-600">{duration} min</div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-center gap-4">
        <button 
          className="bg-green-600 text-white px-6 py-2 rounded flex items-center justify-center hover:bg-green-700"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Results
        </button>

        <button 
          className="bg-purple-600 text-white px-6 py-2 rounded flex items-center justify-center hover:bg-purple-700"
          onClick={handleDownload}
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default TestResults;