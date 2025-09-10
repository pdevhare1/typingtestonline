import React from 'react';

const TypingTestResult = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-4">
        <h1 className="text-2xl font-bold text-center text-white">Result</h1>
      </div>

      {/* Main Score */}
      <div className="p-6 bg-gray-50 border-b">
        <div className="text-center">
          <span className="text-4xl font-bold text-green-600">3</span>
          <p className="text-gray-600 mt-2">correct keystrokes per minute</p>
          <p className="text-xs text-gray-500 mt-1">(including Shift key and key combinations for accents and special characters)</p>
        </div>
      </div>

      {/* Summary */}
      <div className="p-4 bg-white border-b text-center">
        <p>
          That makes <span className="text-green-600 font-bold">3</span> characters and{' '}
          <span className="text-green-600 font-bold">1</span> words per minute.
        </p>
      </div>

      {/* Detailed Analysis */}
      <div className="p-6 bg-white border-b">
        <h2 className="text-xl font-semibold text-center mb-4">Analysis in detail (1 minute)</h2>
        <div className="max-w-md mx-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2"></th>
                <th className="py-2 text-green-600">Correct</th>
                <th className="py-2 text-yellow-500">Half correct (*)</th>
                <th className="py-2 text-red-600">Wrong</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 font-semibold">Characters:</td>
                <td className="py-2 text-center">3</td>
                <td className="py-2 text-center">0</td>
                <td className="py-2 text-center">79</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Words:</td>
                <td className="py-2 text-center">1</td>
                <td className="py-2 text-center">0</td>
                <td className="py-2 text-center">13</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-gray-500 mt-4 text-center">
            (*) Half correct = capital letters were not typed correctly ("a" instead of "A")
          </p>
        </div>
        <div className="text-center mt-4">
          <p>You did <span className="font-bold">0</span> corrections.</p>
          <p>Your maximum typing speed was <span className="font-bold">1</span> characters per second.</p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white p-4">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="bg-blue-100 p-2 w-1/3">Used keyboard</td>
              <td className="p-2">Standard keyboard (PC / Notebook)</td>
            </tr>
            <tr>
              <td className="bg-blue-100 p-2">Highscore</td>
              <td className="p-2">0 points</td>
            </tr>
            <tr>
              <td className="bg-blue-100 p-2">Entry in ranking list</td>
              <td className="p-2">
                <div className="flex items-center gap-2">
                  <label className="mr-2">Name:</label>
                  <input type="text" className="border p-1 rounded" />
                  <button className="bg-blue-800 text-white px-4 py-1 rounded">
                    Inscribe
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TypingTestResult;