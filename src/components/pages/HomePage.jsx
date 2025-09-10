
import React, { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import { Clock, Settings, Info, RefreshCcw, Share2, Download } from 'lucide-react';
import Faq from '../faqs/Faq';
import AdsCard from '../AdsCard/AdsCard';

const TypingSpeedTest = () => {
  // Add new state for test completion
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [duration, setDuration] = useState(1);
  const [difficulty, setDifficulty] = useState('normal');
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);

  // ... (all existing state variables and functions)
const texts = {
  normal: [
    "Cat dog run play jump walk sleep eat drink read book work type fast slow house car tree bird sun moon star fish door room wall desk lamp time day night year good bad",
    "Che boy ran to his home after school today and he saw his friend playing in park they had fun time together until sun went down sky was blue birds flew high",
    "She likes to read books in her free time at home while sitting near window watching people walk by street is quiet and peaceful during evening hours music plays softly",
    "We went to store buy food for dinner party friends are coming over tonight need make sure have enough plates cups drinks snacks games ready fun evening ahead",
    "My sister writes letters every week sends them family members who live far away keeps touch with everyone shares news about life work friends always stays connected"
  ],
    
  medium: [
    "The morning sun cast long shadows across the garden where flowers bloomed in vibrant colors. Birds hopped between branches, searching for their breakfast as a gentle breeze carried the sweet scent of roses through the air.",
    "Students gathered in the library, surrounded by towering shelves filled with books. The quiet atmosphere was perfect for studying, broken only by the occasional turning of pages and soft whispers between study partners.",
    "Walking along the beach, we collected seashells while waves gently lapped at our feet. The salty air filled our lungs as seagulls circled overhead, calling to each other in the late afternoon light.",
    "The small cafe downtown became our favorite meeting spot every Saturday morning. Steam rose from coffee cups as friends shared stories about their week, laughter mixing with the clinking of spoons against ceramic.",
    "Autumn leaves danced through the park as children played on the swings and slides. Parents watched from nearby benches, enjoying the crisp October weather while dogs chased squirrels across the grass."
  ],
    
  hard: [
    "In today's rapidly evolving technological landscape, artificial intelligence (AI) has revolutionized various industries; experts predict a 250% growth in AI-related jobs by 2025! Dr. Smith noted, \"The integration of machine learning algorithms has improved efficiency by 87.3%\" during the International Tech Summit.",
    "The company's Q3 financial report indicated a 15.8% increase in revenue, despite market volatility. CEO Jessica Thompson announced, \"We've successfully expanded into 12 new markets!\" while highlighting the challenges of post-pandemic economic recovery (2023-2024).",
    "Environmental scientists have documented a 3.2°C temperature increase in Arctic regions; this concerning trend affects global weather patterns! Research shows that 68.5% of coastal communities may face significant challenges by 2030, requiring $2.4B in infrastructure investments.",
    "The prestigious medical journal published groundbreaking research showing a 42% reduction in treatment time using the new methodology. Dr. Chen explained, \"Our team processed 1,547 patient cases\" while maintaining a 99.8% accuracy rate!",
    "Global supply chain disruptions have impacted 78.3% of businesses worldwide; experts recommend diversifying suppliers across multiple regions. The World Economic Forum (WEF) suggests that companies invest 5-7% of revenue in digital transformation initiatives!"
  ]
};

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [sampleText, setSampleText] = useState(texts.normal[0]);
    
  // Function to get random text based on difficulty
  const getRandomText = (difficulty) => {
    const randomIndex = Math.floor(Math.random() * texts[difficulty].length);
    setCurrentTextIndex(randomIndex);
    return texts[difficulty][randomIndex];
  };
  useEffect(() => {
      setSampleText(getRandomText(difficulty));
      // Reset the test when difficulty changes
      setIsActive(false);
      setTypedText('');
      setCurrentWordIndex(0);
      setCurrentCharIndex(0);
      setWpm(0);
      setCpm(0);
      setTimeLeft(duration * 60);
  }, [difficulty]);
      
  // Modify the restart button click handler
  const handleRestart = () => {
    setSampleText(getRandomText(difficulty));
    setTimeLeft(duration * 60);
    setIsActive(false);
    setTypedText('');
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setWpm(0);
    setCpm(0);
  };
  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);
          
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (timeLeft / (duration * 60)) * circumference;
  
  // Calculate typing speed
  useEffect(() => {
    if (isActive) {
      const elapsedTime = (duration * 60 - timeLeft) / 60; // in minutes
      if (elapsedTime > 0) {
                        // Calculate WPM
        const words = typedText.trim().split(/\s+/).length;
        const currentWpm = Math.round(words / elapsedTime);
        setWpm(currentWpm);
                
        // Calculate CPM
        const chars = typedText.length;
        const currentCpm = Math.round(chars / elapsedTime);
        setCpm(currentCpm);
      }
    }
  }, [typedText, timeLeft, duration, isActive]);
  const getTimerColor = () => {
    const percentage = (timeLeft / (duration * 60)) * 100;
    if (percentage > 75) return 'text-green-500';
    if (percentage > 50) return 'text-yellow-500';
    if (percentage > 25) return 'text-orange-500';
    return 'text-red-500';
  };
                
  const getTimerNumberColor = () => {
    const percentage = (timeLeft / (duration * 60)) * 100;
    if (percentage > 75) return 'text-green-700';
    if (percentage > 50) return 'text-yellow-700';
    if (percentage > 25) return 'text-orange-700';
    return 'text-red-700';
  };
  
  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);
  
  const handleKeyPress = (e) => {
    if (!isActive) {
      setIsActive(true);
    }
                                
    const typed = e.target.value;
    setTypedText(typed);
                                
    const typedWords = typed.split(' ');
    const currentWord = typedWords[typedWords.length - 1];
                                
    setCurrentWordIndex(typedWords.length - 1);
    setCurrentCharIndex(currentWord.length);
  };
  
  const getCharClass = (wordIndex, word, charIndex) => {
    const typedWords = typedText.split(' ');
    const currentWord = typedWords[wordIndex] || '';
    const char = word[charIndex];
                            
    if (wordIndex < currentWordIndex) {
      return currentWord === word ? 'text-green-600' : 'text-red-600 line-through';
    } else if (wordIndex === currentWordIndex) {
      if (charIndex < currentCharIndex) {
        return currentWord[charIndex] === char ? 'text-green-600' : 'text-red-600';
      } else if (charIndex === currentCharIndex) {
        return 'text-orange-500 bg-orange-100';
      }
    }
    // ... (rest of the component remains same)
    return 'text-gray-800';
  };
    // Modify timer effect to handle test completion
    useEffect(() => {
      let interval;
      if (isActive && timeLeft > 0) {
        interval = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              setIsTestComplete(true);
              setIsActive(false);
            }
            return prev - 1;
          });
        }, 1000);
      }
      return () => clearInterval(interval);
    }, [isActive, timeLeft]);
  
    // Function to handle sharing results
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
  const resultElement = document.createElement('div');
  
  resultElement.innerHTML = `
    <div style="max-width: 800px; margin: 0 auto; font-family: Arial, sans-serif;">
      <!-- Header -->
      <div style="background: linear-gradient(to right, #60A5FA, #3B82F6); padding: 1rem; color: white;">
        <h1 style="font-size: 1.5rem; font-weight: bold; text-align: center;">Result</h1>
      </div>

      <!-- Main Score -->
      <div style="padding: 1.5rem; background-color: #F9FAFB; border-bottom: 1px solid #E5E7EB;">
        <div style="text-align: center;">
          <span style="font-size: 2.25rem; font-weight: bold; color: #059669;">${cpm}</span>
          <p style="color: #4B5563; margin-top: 0.5rem;">correct keystrokes per minute</p>
          <p style="font-size: 0.75rem; color: #6B7280; margin-top: 0.25rem;">(including Shift key and key combinations for accents and special characters)</p>
        </div>
      </div>

      <!-- Summary -->
      <div style="padding: 1rem; background-color: white; border-bottom: 1px solid #E5E7EB; text-align: center;">
        <p>
          That makes <span style="color: #059669; font-weight: bold;">${cpm}</span> characters and
          <span style="color: #059669; font-weight: bold;">${wpm}</span> words per minute.
        </p>
      </div>

      <!-- Detailed Analysis -->
      <div style="padding: 1.5rem; background-color: white; border-bottom: 1px solid #E5E7EB;">
        <h2 style="font-size: 1.25rem; font-weight: 600; text-align: center; margin-bottom: 1rem;">
          Analysis in detail (${duration} minute)
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
                <td style="padding: 0.5rem; text-align: center;">${typedText.length}</td>
                <td style="padding: 0.5rem; text-align: center;">0</td>
                <td style="padding: 0.5rem; text-align: center;">0</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem; font-weight: 600;">Words:</td>
                <td style="padding: 0.5rem; text-align: center;">${wpm}</td>
                <td style="padding: 0.5rem; text-align: center;">0</td>
                <td style="padding: 0.5rem; text-align: center;">0</td>
              </tr>
            </tbody>
          </table>
          <p style="font-size: 0.75rem; color: #6B7280; margin-top: 1rem; text-align: center;">
            (*) Half correct = capital letters were not typed correctly ("a" instead of "A")
          </p>
        </div>
        <div style="text-align: center; margin-top: 1rem;">
          <p>You did <span style="font-weight: bold;">0</span> corrections.</p>
          <p>Your maximum typing speed was <span style="font-weight: bold;">${Math.round(cpm/60)}</span> characters per second.</p>
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
              <td style="padding: 0.5rem;">${wpm} points</td>
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
 return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      {/* Header section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-blue-800 mb-2">Typing Speed Test</h1>
        <p className="text-gray-600">Find out how many letters and words you can type per minute</p>
      </div>
              {/* Options section */}
              <div className="bg-gray-200 rounded-lg mb-6">
                {/* ... (existing options content) ... */}
                        
                <div className="grid md:grid-cols-2 gap-4 p-4">
                  <div className="flex items-center space-x-4">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <span className="text-sm">Duration of the test:</span>
                    <div className="flex space-x-1">
                      {[1, 3, 5].map((min) => (
                        <button
                          key={min}
                          className={`px-4 py-1 rounded ${
                            duration === min
                              ? 'bg-blue-800 text-white'
                              : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                          }`}
                          onClick={() => {
                            setDuration(min);
                            setIsActive(false);
                            setTypedText('');
                            setCurrentWordIndex(0);
                            setCurrentCharIndex(0);
                            setWpm(0);
                            setCpm(0);
                          }}
                        >
                          {min}
                        </button>
                      ))}
                    </div>
                    <span className="text-sm">minute(s)</span>
                  </div>
                
                  <div className="flex items-center space-x-4">
                    <span className="text-sm">Select difficulty:</span>
                    <div className="flex space-x-1">
                      {['normal', 'medium', 'hard'].map((level) => (
                        <button
                          key={level}
                          className={`px-4 py-1 rounded capitalize ${
                            difficulty === level
                              ? 'bg-blue-800 text-white'
                              : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                          }`}
                          onClick={() => setDifficulty(level)}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Main content area with typing test and ad */}
              <div className="flex gap-6">
                {/* Typing test section */}
                <div className="flex-grow bg-gray-100 rounded-lg p-6">
                  <div className="flex items-center bg-white rounded p-4 mb-4">
                    <Info className="w-5 h-5 text-blue-600 mr-2" />
                    <p className="text-sm text-gray-600">
                      Please typewrite the following text. The countdown will begin to run with your first keystroke.
                      <br />
                      <span className="text-xs">(To enable your keyboard on a tablet, please just tap on the text)</span>
                    </p>
                  </div>
        
                  <div className="relative">
                    {/* Timer and stats */}
                    <div className="absolute left-0 top-0">
                      {/* ... (existing timer and stats content) ... */}
                      <div className="relative w-24 h-24">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r={radius}
                          className="stroke-current text-gray-200"
                          strokeWidth="4"
                          fill="white"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r={radius}
                          className={`stroke-current ${getTimerColor()}`}
                          strokeWidth="4"
                          fill="transparent"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          style={{ transition: 'stroke-dashoffset 1s linear' }}
                        />
                      </svg>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <span className={`text-3xl font-bold ${getTimerNumberColor()}`}>{timeLeft}</span>
                        <div className="text-sm text-gray-500">sec</div>
                      </div>
                    </div>
                    {/* Speed Display */}
                    <div className="mt-4 text-center w-24">
                      <div className="bg-white rounded-lg p-2 shadow-sm">
                        <div className="mb-2">
                          <div className="text-sm text-gray-600">Speed</div>
                          <div className="text-xl font-bold text-blue-600">{wpm} WPM</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Characters</div>
                          <div className="text-lg font-bold text-blue-600">{cpm} CPM</div>
                        </div>
                      </div>
                    </div>
                    </div>
                    {/* Typing area */}
                    <div className="bg-white border border-gray-300 rounded-lg p-8 ml-28">
                      <div className="font-mono text-lg tracking-wide leading-relaxed">
                        {/* ... (existing text content) ... */}
                        {sampleText.split(' ').map((word, wordIndex) => (
                        <span key={wordIndex} className="px-0.5">
                          {word.split('').map((char, charIndex) => (
                            <span key={charIndex} className={getCharClass(wordIndex, word, charIndex)}>
                              {char}
                            </span>
                          ))}
                          {' '}
                        </span>
                      ))}
                      </div>
                      <textarea
                        className="w-full h-24 mt-4 p-2 border border-gray-300 rounded"
                        value={typedText}
                        onChange={handleKeyPress}
                        placeholder="Start typing here..."
                      />
                    </div>
                  </div>
                </div>
        
                {/* Ad card */}
                <div className="w-64">
                  <div className="bg-white rounded-lg shadow-lg border-2 border-blue-500 h-full">
                    <div className="h-full flex flex-col items-center justify-center p-4">
                      <span className="text-gray-500">Advertisement Space</span>
                    </div>
                  </div>
                </div>
              </div>


    <div className="text-center mt-6">
      <p className="text-sm text-gray-600 mb-4">Note: Typos can be corrected by using the backspace key.</p>
      
      <div className="flex justify-center gap-4">
        <button 
          className="bg-blue-800 text-white px-6 py-2 rounded flex items-center justify-center hover:bg-blue-700"
          onClick={() => {
            setTimeLeft(duration * 60);
            setIsActive(false);
            setTypedText('');
            setCurrentWordIndex(0);
            setCurrentCharIndex(0);
            setWpm(0);
            setCpm(0);
            setIsTestComplete(false);
          }}
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Restart
        </button>

        <button 
          className="bg-blue-800 text-white px-6 py-2 rounded flex items-center justify-center hover:bg-blue-700"
          onClick={handleRestart}
        >
          Change Paragraph
        </button>
      </div>

      {/* Results sharing buttons - only show when test is complete */}
      {isTestComplete && (
        <div className="mt-6 flex justify-center gap-4">
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
            Download Results
          </button>
        </div>
      )}
      <AdsCard />
      <Faq />
      <AdsCard />
    </div>
    </div>
  );

}

export default TypingSpeedTest;