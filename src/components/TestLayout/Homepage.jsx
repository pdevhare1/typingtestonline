import React, { useState, useEffect } from 'react';
import TestResults from '../TestLayout/Result'; // Make sure the path is correct
import { Clock, Settings, Info, RefreshCcw, Share2, Download } from 'lucide-react';
import Faq from '../faqs/Faq';
import AdsCard from '../AdsCard/AdsCard';
import { Helmet } from "react-helmet-async";


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
  
  // New states for tracking typing statistics
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState(0);
  const [corrections, setCorrections] = useState(0);
  const [maxSpeed, setMaxSpeed] = useState(0);
  
  // Modified: Track current line for scrolling display
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  // Number of lines to show at once (visible window)
  const [visibleLines, setVisibleLines] = useState(4);

  const texts = {
    1: {
      normal: [
        "The cat and the dog love to run and play in the yard. They jump over small obstacles and walk around the house, exploring every corner. After a long day of fun, they sleep peacefully under the warm sun. When they wake up, they eat their favorite food and drink water before starting their adventures again. The bird sitting on the tree watches them with curiosity, chirping happily in the bright daylight.",
        "Inside the house, a person sits at a desk with a lamp glowing softly. They read a book about the sun, moon, and stars, learning new things with great interest. As they work on their computer, they type fast, finishing their tasks before the day ends. The clock on the wall shows the passing time, marking the difference between day and night. The room is quiet except for the sound of pages turning.",
        "Outside, a car passes by the door, moving fast down the street. A fish swims in a small pond near the garden, enjoying the cool water. The wind gently moves the leaves of the tree, creating a peaceful atmosphere. The sun begins to set, and the sky turns into a beautiful mix of colors. The stars slowly appear, shining brightly in the dark night.",
        "A little boy walks toward his room, carrying a book in his hands. He sits near his desk, eager to read about time, seasons, and years. The lamp beside him provides a warm glow, making it easier to concentrate. His pet dog sleeps near the door, while the cat jumps onto the wall, watching the surroundings. It is a calm and peaceful night.",
        "Some things in life are good, while others can be bad. A person must work hard during the day and rest at night. Whether one types fast or slow, the effort matters. A house provides shelter, a car offers transport, and books give knowledge. As the night ends and the new day begins, the sun rises again, bringing hope and energy."
      ],
        
      medium: [
        "The morning sun cast long shadows across the garden where flowers bloomed in vibrant colors. Birds hopped between branches, searching for their breakfast as a gentle breeze carried the sweet scent of roses through the air. The dew on the grass sparkled like tiny diamonds, reflecting the golden light of dawn. A butterfly fluttered gracefully over the petals, pausing now and then to drink nectar. In the distance, a soft chirping filled the air, blending harmoniously with the rustling of leaves.The garden was alive with movement and sound, yet there was a certain calmness in the atmosphere. A small squirrel scurried along the wooden fence, pausing briefly to nibble on a nut before disappearing into the bushes. Bees buzzed busily from flower to flower, collecting pollen to take back to their hive. The scent of fresh earth mixed with the floral fragrance, creating an aroma that was both soothing and refreshing. As the sun rose higher, the colors of the garden seemed to grow even more vivid, turning the space into a painter's dream.",
        "Beyond the garden, a narrow stone path led to a small pond surrounded by tall reeds. The surface of the water shimmered under the sunlight, reflecting the soft hues of the sky. A family of ducks glided gracefully across the pond, leaving gentle ripples in their wake. Tiny fish darted beneath the surface, occasionally creating small splashes that disturbed the peaceful water. A dragonfly hovered near the edge, its delicate wings catching the light as it moved.Near the pond, a wooden bench sat beneath a large oak tree, offering a perfect place to rest and enjoy the view. The branches of the tree stretched outward, providing cool shade from the warming sun. A gentle wind rustled through the leaves, causing them to dance and whisper. The sound of trickling water from a nearby fountain added to the tranquility, making the entire setting feel like a hidden paradise. The fresh scent of damp earth and blooming lilies filled the air, making it a perfect morning retreat.",
        "In a corner of the garden, an old wooden table held a neatly arranged assortment of books, a steaming cup of tea, and a notebook filled with handwritten thoughts. A writer sat there, capturing the beauty of the morning in flowing sentences, their fingers moving swiftly across the pages. The soft chirping of birds provided a natural melody, blending seamlessly with the rhythmic scratching of the pen. Occasionally, the writer paused to take a sip of tea, inhaling the soothing aroma of herbs and honey. A gentle breeze ruffled the pages, making the ink dry quickly. The warmth of the sun kissed their skin, filling them with a quiet inspiration. Words flowed effortlessly as they described the golden light filtering through the trees, the sound of bees humming near the lavender, and the rustling of petals swaying in the wind. The garden, with all its colors and scents, had become the perfect muse.",
        "Near the garden's entrance, a wooden gate stood slightly ajar, inviting visitors to step inside and experience its beauty. Ivy climbed the fence, intertwining with delicate white blossoms that released a subtle fragrance. A cat lounged nearby, stretching lazily in a patch of sunlight, its eyes half-closed in contentment. The gentle rustling of leaves overhead added a soothing background sound, blending with the occasional flutter of wings as birds moved between trees. A little girl, wearing a straw hat and holding a watering can, carefully tended to the flowers. She hummed a soft tune as she sprinkled water over the vibrant petals, watching as tiny droplets clung to the leaves. A butterfly landed on her outstretched hand, resting for a brief moment before flying away. The moment was simple yet magical, a perfect harmony between nature and human presence. The garden, alive with color and movement, continued to thrive under the morning sun.",
        "As the morning stretched on, the golden sunlight grew warmer, illuminating every leaf and petal with a gentle glow. The air carried the mingling scents of jasmine, rosemary, and fresh-cut grass. Shadows slowly shifted as the sun climbed higher, casting a new pattern across the garden's landscape. The bees worked tirelessly, the birds sang their cheerful songs, and the soft breeze carried a sense of peace. A soft chime echoed from a distant bell, marking the arrival of noon. The cat rolled over in its sunny spot, yawning as it prepared for an afternoon nap. The little girl finished her watering and sat on the bench, enjoying the calmness around her. The writer, having filled pages with beautiful words, closed their notebook with satisfaction. The morning had been filled with life, warmth, and beauty—a reminder of nature's simple yet profound wonders."
      ],
        
      hard: [
        "In today's rapidly evolving technological landscape, artificial intelligence (AI) has revolutionized various industries; experts predict a 250% growth in AI-related jobs by 2025! Dr. Smith noted, \"The integration of machine learning algorithms has improved efficiency by 87.3%\" during the International Tech Summit.",
        "The company's Q3 financial report indicated a 15.8% increase in revenue, despite market volatility. CEO Jessica Thompson announced, \"We've successfully expanded into 12 new markets!\" while highlighting the challenges of post-pandemic economic recovery (2023-2024).",
        "Environmental scientists have documented a 3.2°C temperature increase in Arctic regions; this concerning trend affects global weather patterns! Research shows that 68.5% of coastal communities may face significant challenges by 2030, requiring $2.4B in infrastructure investments.",
        "The prestigious medical journal published groundbreaking research showing a 42% reduction in treatment time using the new methodology. Dr. Chen explained, \"Our team processed 1,547 patient cases\" while maintaining a 99.8% accuracy rate!",
        "Global supply chain disruptions have impacted 78.3% of businesses worldwide; experts recommend diversifying suppliers across multiple regions. The World Economic Forum (WEF) suggests that companies invest 5-7% of revenue in digital transformation initiatives!"
      ]
    },
    3: {
      normal: [
        "The cat and the dog love to run and play in the yard. They jump over small obstacles and walk around the house, exploring every corner. After a long day of fun, they sleep peacefully under the warm sun. When they wake up, they eat their favorite food and drink water before starting their adventures again. The bird sitting on the tree watches them with curiosity, chirping happily in the bright daylight.",
        "Inside the house, a person sits at a desk with a lamp glowing softly. They read a book about the sun, moon, and stars, learning new things with great interest. As they work on their computer, they type fast, finishing their tasks before the day ends. The clock on the wall shows the passing time, marking the difference between day and night. The room is quiet except for the sound of pages turning.",
        "Outside, a car passes by the door, moving fast down the street. A fish swims in a small pond near the garden, enjoying the cool water. The wind gently moves the leaves of the tree, creating a peaceful atmosphere. The sun begins to set, and the sky turns into a beautiful mix of colors. The stars slowly appear, shining brightly in the dark night.",
        "A little boy walks toward his room, carrying a book in his hands. He sits near his desk, eager to read about time, seasons, and years. The lamp beside him provides a warm glow, making it easier to concentrate. His pet dog sleeps near the door, while the cat jumps onto the wall, watching the surroundings. It is a calm and peaceful night.",
        "Some things in life are good, while others can be bad. A person must work hard during the day and rest at night. Whether one types fast or slow, the effort matters. A house provides shelter, a car offers transport, and books give knowledge. As the night ends and the new day begins, the sun rises again, bringing hope and energy."
      ],
        
      medium: [
        "The morning sun cast long shadows across the garden where flowers bloomed in vibrant colors. Birds hopped between branches, searching for their breakfast as a gentle breeze carried the sweet scent of roses through the air. The dew on the grass sparkled like tiny diamonds, reflecting the golden light of dawn. A butterfly fluttered gracefully over the petals, pausing now and then to drink nectar. In the distance, a soft chirping filled the air, blending harmoniously with the rustling of leaves.The garden was alive with movement and sound, yet there was a certain calmness in the atmosphere. A small squirrel scurried along the wooden fence, pausing briefly to nibble on a nut before disappearing into the bushes. Bees buzzed busily from flower to flower, collecting pollen to take back to their hive. The scent of fresh earth mixed with the floral fragrance, creating an aroma that was both soothing and refreshing. As the sun rose higher, the colors of the garden seemed to grow even more vivid, turning the space into a painter's dream.",
        "Beyond the garden, a narrow stone path led to a small pond surrounded by tall reeds. The surface of the water shimmered under the sunlight, reflecting the soft hues of the sky. A family of ducks glided gracefully across the pond, leaving gentle ripples in their wake. Tiny fish darted beneath the surface, occasionally creating small splashes that disturbed the peaceful water. A dragonfly hovered near the edge, its delicate wings catching the light as it moved.Near the pond, a wooden bench sat beneath a large oak tree, offering a perfect place to rest and enjoy the view. The branches of the tree stretched outward, providing cool shade from the warming sun. A gentle wind rustled through the leaves, causing them to dance and whisper. The sound of trickling water from a nearby fountain added to the tranquility, making the entire setting feel like a hidden paradise. The fresh scent of damp earth and blooming lilies filled the air, making it a perfect morning retreat.",
        "In a corner of the garden, an old wooden table held a neatly arranged assortment of books, a steaming cup of tea, and a notebook filled with handwritten thoughts. A writer sat there, capturing the beauty of the morning in flowing sentences, their fingers moving swiftly across the pages. The soft chirping of birds provided a natural melody, blending seamlessly with the rhythmic scratching of the pen. Occasionally, the writer paused to take a sip of tea, inhaling the soothing aroma of herbs and honey. A gentle breeze ruffled the pages, making the ink dry quickly. The warmth of the sun kissed their skin, filling them with a quiet inspiration. Words flowed effortlessly as they described the golden light filtering through the trees, the sound of bees humming near the lavender, and the rustling of petals swaying in the wind. The garden, with all its colors and scents, had become the perfect muse.",
        "Near the garden's entrance, a wooden gate stood slightly ajar, inviting visitors to step inside and experience its beauty. Ivy climbed the fence, intertwining with delicate white blossoms that released a subtle fragrance. A cat lounged nearby, stretching lazily in a patch of sunlight, its eyes half-closed in contentment. The gentle rustling of leaves overhead added a soothing background sound, blending with the occasional flutter of wings as birds moved between trees. A little girl, wearing a straw hat and holding a watering can, carefully tended to the flowers. She hummed a soft tune as she sprinkled water over the vibrant petals, watching as tiny droplets clung to the leaves. A butterfly landed on her outstretched hand, resting for a brief moment before flying away. The moment was simple yet magical, a perfect harmony between nature and human presence. The garden, alive with color and movement, continued to thrive under the morning sun.",
        "As the morning stretched on, the golden sunlight grew warmer, illuminating every leaf and petal with a gentle glow. The air carried the mingling scents of jasmine, rosemary, and fresh-cut grass. Shadows slowly shifted as the sun climbed higher, casting a new pattern across the garden's landscape. The bees worked tirelessly, the birds sang their cheerful songs, and the soft breeze carried a sense of peace. A soft chime echoed from a distant bell, marking the arrival of noon. The cat rolled over in its sunny spot, yawning as it prepared for an afternoon nap. The little girl finished her watering and sat on the bench, enjoying the calmness around her. The writer, having filled pages with beautiful words, closed their notebook with satisfaction. The morning had been filled with life, warmth, and beauty—a reminder of nature's simple yet profound wonders."
      ],
        
      hard: [
        "In today's rapidly evolving technological landscape, artificial intelligence (AI) has revolutionized various industries; experts predict a 250% growth in AI-related jobs by 2025! Dr. Smith noted, \"The integration of machine learning algorithms has improved efficiency by 87.3%\" during the International Tech Summit.",
        "The company's Q3 financial report indicated a 15.8% increase in revenue, despite market volatility. CEO Jessica Thompson announced, \"We've successfully expanded into 12 new markets!\" while highlighting the challenges of post-pandemic economic recovery (2023-2024).",
        "Environmental scientists have documented a 3.2°C temperature increase in Arctic regions; this concerning trend affects global weather patterns! Research shows that 68.5% of coastal communities may face significant challenges by 2030, requiring $2.4B in infrastructure investments.",
        "The prestigious medical journal published groundbreaking research showing a 42% reduction in treatment time using the new methodology. Dr. Chen explained, \"Our team processed 1,547 patient cases\" while maintaining a 99.8% accuracy rate!",
        "Global supply chain disruptions have impacted 78.3% of businesses worldwide; experts recommend diversifying suppliers across multiple regions. The World Economic Forum (WEF) suggests that companies invest 5-7% of revenue in digital transformation initiatives!"
      ]
    },
    5: {
      normal: [
        "The cat and the dog love to run and play in the yard. They jump over small obstacles and walk around the house, exploring every corner. After a long day of fun, they sleep peacefully under the warm sun. When they wake up, they eat their favorite food and drink water before starting their adventures again. The bird sitting on the tree watches them with curiosity, chirping happily in the bright daylight.",
        "Inside the house, a person sits at a desk with a lamp glowing softly. They read a book about the sun, moon, and stars, learning new things with great interest. As they work on their computer, they type fast, finishing their tasks before the day ends. The clock on the wall shows the passing time, marking the difference between day and night. The room is quiet except for the sound of pages turning.",
        "Outside, a car passes by the door, moving fast down the street. A fish swims in a small pond near the garden, enjoying the cool water. The wind gently moves the leaves of the tree, creating a peaceful atmosphere. The sun begins to set, and the sky turns into a beautiful mix of colors. The stars slowly appear, shining brightly in the dark night.",
        "A little boy walks toward his room, carrying a book in his hands. He sits near his desk, eager to read about time, seasons, and years. The lamp beside him provides a warm glow, making it easier to concentrate. His pet dog sleeps near the door, while the cat jumps onto the wall, watching the surroundings. It is a calm and peaceful night.",
        "Some things in life are good, while others can be bad. A person must work hard during the day and rest at night. Whether one types fast or slow, the effort matters. A house provides shelter, a car offers transport, and books give knowledge. As the night ends and the new day begins, the sun rises again, bringing hope and energy."
      ],
        
      medium: [
        "The morning sun cast long shadows across the garden where flowers bloomed in vibrant colors. Birds hopped between branches, searching for their breakfast as a gentle breeze carried the sweet scent of roses through the air. The dew on the grass sparkled like tiny diamonds, reflecting the golden light of dawn. A butterfly fluttered gracefully over the petals, pausing now and then to drink nectar. In the distance, a soft chirping filled the air, blending harmoniously with the rustling of leaves.The garden was alive with movement and sound, yet there was a certain calmness in the atmosphere. A small squirrel scurried along the wooden fence, pausing briefly to nibble on a nut before disappearing into the bushes. Bees buzzed busily from flower to flower, collecting pollen to take back to their hive. The scent of fresh earth mixed with the floral fragrance, creating an aroma that was both soothing and refreshing. As the sun rose higher, the colors of the garden seemed to grow even more vivid, turning the space into a painter's dream.",
        "Beyond the garden, a narrow stone path led to a small pond surrounded by tall reeds. The surface of the water shimmered under the sunlight, reflecting the soft hues of the sky. A family of ducks glided gracefully across the pond, leaving gentle ripples in their wake. Tiny fish darted beneath the surface, occasionally creating small splashes that disturbed the peaceful water. A dragonfly hovered near the edge, its delicate wings catching the light as it moved.Near the pond, a wooden bench sat beneath a large oak tree, offering a perfect place to rest and enjoy the view. The branches of the tree stretched outward, providing cool shade from the warming sun. A gentle wind rustled through the leaves, causing them to dance and whisper. The sound of trickling water from a nearby fountain added to the tranquility, making the entire setting feel like a hidden paradise. The fresh scent of damp earth and blooming lilies filled the air, making it a perfect morning retreat.",
        "In a corner of the garden, an old wooden table held a neatly arranged assortment of books, a steaming cup of tea, and a notebook filled with handwritten thoughts. A writer sat there, capturing the beauty of the morning in flowing sentences, their fingers moving swiftly across the pages. The soft chirping of birds provided a natural melody, blending seamlessly with the rhythmic scratching of the pen. Occasionally, the writer paused to take a sip of tea, inhaling the soothing aroma of herbs and honey. A gentle breeze ruffled the pages, making the ink dry quickly. The warmth of the sun kissed their skin, filling them with a quiet inspiration. Words flowed effortlessly as they described the golden light filtering through the trees, the sound of bees humming near the lavender, and the rustling of petals swaying in the wind. The garden, with all its colors and scents, had become the perfect muse.",
        "Near the garden's entrance, a wooden gate stood slightly ajar, inviting visitors to step inside and experience its beauty. Ivy climbed the fence, intertwining with delicate white blossoms that released a subtle fragrance. A cat lounged nearby, stretching lazily in a patch of sunlight, its eyes half-closed in contentment. The gentle rustling of leaves overhead added a soothing background sound, blending with the occasional flutter of wings as birds moved between trees. A little girl, wearing a straw hat and holding a watering can, carefully tended to the flowers. She hummed a soft tune as she sprinkled water over the vibrant petals, watching as tiny droplets clung to the leaves. A butterfly landed on her outstretched hand, resting for a brief moment before flying away. The moment was simple yet magical, a perfect harmony between nature and human presence. The garden, alive with color and movement, continued to thrive under the morning sun.",
        "As the morning stretched on, the golden sunlight grew warmer, illuminating every leaf and petal with a gentle glow. The air carried the mingling scents of jasmine, rosemary, and fresh-cut grass. Shadows slowly shifted as the sun climbed higher, casting a new pattern across the garden's landscape. The bees worked tirelessly, the birds sang their cheerful songs, and the soft breeze carried a sense of peace. A soft chime echoed from a distant bell, marking the arrival of noon. The cat rolled over in its sunny spot, yawning as it prepared for an afternoon nap. The little girl finished her watering and sat on the bench, enjoying the calmness around her. The writer, having filled pages with beautiful words, closed their notebook with satisfaction. The morning had been filled with life, warmth, and beauty—a reminder of nature's simple yet profound wonders."
      ],
        
      hard: [
        "In today's rapidly evolving technological landscape, artificial intelligence (AI) has revolutionized various industries; experts predict a 250% growth in AI-related jobs by 2025! Dr. Smith noted, \"The integration of machine learning algorithms has improved efficiency by 87.3%\" during the International Tech Summit.",
        "The company's Q3 financial report indicated a 15.8% increase in revenue, despite market volatility. CEO Jessica Thompson announced, \"We've successfully expanded into 12 new markets!\" while highlighting the challenges of post-pandemic economic recovery (2023-2024).",
        "Environmental scientists have documented a 3.2°C temperature increase in Arctic regions; this concerning trend affects global weather patterns! Research shows that 68.5% of coastal communities may face significant challenges by 2030, requiring $2.4B in infrastructure investments.",
        "The prestigious medical journal published groundbreaking research showing a 42% reduction in treatment time using the new methodology. Dr. Chen explained, \"Our team processed 1,547 patient cases\" while maintaining a 99.8% accuracy rate!",
        "Global supply chain disruptions have impacted 78.3% of businesses worldwide; experts recommend diversifying suppliers across multiple regions. The World Economic Forum (WEF) suggests that companies invest 5-7% of revenue in digital transformation initiatives!"
      ]
    }
  };

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [sampleText, setSampleText] = useState(texts[1]['normal'][0]);
  
  // Split sample text into lines for progressive display
  const splitTextIntoLines = (text) => {
    const lines = [];
    const words = text.split(' ');
    let currentLine = '';
    
    words.forEach(word => {
      if ((currentLine + word).length > 60) {
        lines.push(currentLine.trim());
        currentLine = word + ' ';
      } else {
        currentLine += word + ' ';
      }
    });
    
    if (currentLine.trim()) {
      lines.push(currentLine.trim());
    }
    
    return lines;
  };
  
  // IMPROVED: Get visible portion of text based on typing progress
  const getVisibleText = () => {
    const lines = splitTextIntoLines(sampleText);
    
    // Calculate start line (don't go below 0)
    const startLine = Math.max(0, currentLineIndex);
    
    // Calculate end line (don't exceed total lines)
    const endLine = Math.min(startLine + visibleLines, lines.length);
    
    // Return the visible window of text
    return lines.slice(startLine, endLine).join(' ');
  };
      
  // Function to get random text based on difficulty
  const getRandomText = (duration, difficulty) => {
    const textsForDurationAndDifficulty = texts[duration][difficulty];
    const randomIndex = Math.floor(Math.random() * textsForDurationAndDifficulty.length);
    setCurrentTextIndex(randomIndex);
    return textsForDurationAndDifficulty[randomIndex];
  };
    
  useEffect(() => {
    setSampleText(getRandomText(duration, difficulty));
    // Reset the test when difficulty or duration changes
    setIsActive(false);
    setTypedText('');
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setWpm(0);
    setCpm(0);
    setTimeLeft(duration * 60);
    // Reset stats
    setCorrectChars(0);
    setIncorrectChars(0);
    setCorrectWords(0);
    setIncorrectWords(0);
    setCorrections(0);
    setMaxSpeed(0);
    setVisibleLines(4); // Reset visible lines
    setCurrentLineIndex(0); // Reset current line index
  }, [difficulty, duration]);
          
  // Modify the restart button click handler
  const handleRestart = () => {
    setSampleText(getRandomText(duration, difficulty));
    setTimeLeft(duration * 60);
    setIsActive(false);
    setTypedText('');
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setWpm(0);
    setCpm(0);
    setIsTestComplete(false);
    // Reset stats
    setCorrectChars(0);
    setIncorrectChars(0);
    setCorrectWords(0);
    setIncorrectWords(0);
    setCorrections(0);
    setMaxSpeed(0);
    setVisibleLines(4); // Reset visible lines
    setCurrentLineIndex(0); // Reset current line index
  };
      
  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);
              
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / (duration * 60)) * circumference;
    
  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          // When timer reaches zero, mark test as complete
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
    
  useEffect(() => {
    if (isActive) {
      const elapsedTime = (duration * 60 - timeLeft) / 60; // in minutes
      if (elapsedTime > 0) {
        // Calculate WPM
        const words = typedText.trim().split(/\s+/).length;
        const currentWpm = Math.round(words / elapsedTime);
        setWpm(currentWpm);
        
        // Update max speed if current is higher
        if (currentWpm > maxSpeed) {
          setMaxSpeed(currentWpm);
        }
                
        // Calculate CPM
        const chars = typedText.length;
        const currentCpm = Math.round(chars / elapsedTime);
        setCpm(currentCpm);
      }
    }
  }, [typedText, timeLeft, duration, isActive, maxSpeed]);
      
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
      
  // IMPROVED: Modified to track corrections, character accuracy, and update current line index
  const handleKeyPress = (e) => {
    if (!isActive) {
      setIsActive(true);
    }
                                    
    const typed = e.target.value;
    const prevTyped = typedText;
    setTypedText(typed);
                                    
    const typedWords = typed.split(' ');
    const currentWord = typedWords[typedWords.length - 1];
    
    // Track corrections (backspace usage)
    if (typed.length < prevTyped.length) {
      setCorrections(prev => prev + 1);
    }
    
    // IMPROVED: Calculate current line index based on typing progress
    const lines = splitTextIntoLines(sampleText);
    const words = sampleText.split(' ');
    let wordCount = 0;
    let lineForCurrentWordIndex = 0;
    
    // Find which line contains the current word being typed
    for (let i = 0; i < lines.length; i++) {
      const lineWords = lines[i].split(' ').length;
      if (wordCount + lineWords > typedWords.length - 1) {
        lineForCurrentWordIndex = i;
        break;
      }
      wordCount += lineWords;
    }
    
    // Update current line index to ensure the line being typed is visible
    // We want to show the line being typed plus the next few lines
    // But we also want to ensure the line doesn't jump too frequently
    if (lineForCurrentWordIndex > currentLineIndex + visibleLines - 2) {
      setCurrentLineIndex(lineForCurrentWordIndex - visibleLines + 2);
    } else if (lineForCurrentWordIndex < currentLineIndex) {
      setCurrentLineIndex(lineForCurrentWordIndex);
    }
    
    // Check character accuracy
    let correct = 0;
    let incorrect = 0;
    
    typedWords.forEach((word, wordIndex) => {
      if (wordIndex < words.length) {
        const sampleWord = words[wordIndex];
        for (let i = 0; i < word.length; i++) {
          if (i < sampleWord.length) {
            if (word[i] === sampleWord[i]) {
              correct++;
            } else {
              incorrect++;
            }
          } else {
            incorrect++;
          }
        }
      }
    });
    
    setCorrectChars(correct);
    setIncorrectChars(incorrect);
    
    // Track word accuracy
    let correctWordsCount = 0;
    let incorrectWordsCount = 0;
    
    typedWords.forEach((word, wordIndex) => {
      if (wordIndex < words.length) {
        if (word === words[wordIndex]) {
          correctWordsCount++;
        } else if (word.trim() !== '') {
          incorrectWordsCount++;
        }
      }
    });
    
    setCorrectWords(correctWordsCount);
    setIncorrectWords(incorrectWordsCount);
                                    
    setCurrentWordIndex(typedWords.length - 1);
    setCurrentCharIndex(currentWord.length);
  };
      
  // IMPROVED: Modified to work with the new visible text window
  const getCharClass = (wordIndex, word, charIndex, textOffset) => {
    const typedWords = typedText.split(' ');
    const allWords = sampleText.split(' ');
    
    // Calculate absolute word index in the full text
    const absoluteWordIndex = textOffset + wordIndex;
    
    // Get current word being typed
    const currentTypedWord = typedWords[absoluteWordIndex] || '';
    
    if (absoluteWordIndex < currentWordIndex) {
      // Words already typed
      return typedWords[absoluteWordIndex] === allWords[absoluteWordIndex] 
        ? 'text-green-600' 
        : 'text-red-600 line-through';
    } else if (absoluteWordIndex === currentWordIndex) {
      // Current word being typed
      if (charIndex < currentCharIndex && absoluteWordIndex < typedWords.length) {
        return currentTypedWord[charIndex] === word[charIndex] 
          ? 'text-green-600' 
          : 'text-red-600';
      } else if (charIndex === currentCharIndex) {
        return 'text-orange-500 bg-orange-100';
      }
    }
    return 'text-gray-800';
  };
      
  // Function to handle sharing results
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Typing Test Results',
        text: `I just completed a typing test with ${wpm} WPM and ${cpm} CPM with ${Math.round((correctChars / (correctChars + incorrectChars)) * 100)}% accuracy!`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert(`Copy this text to share:\nI just completed a typing test with ${wpm} WPM and ${cpm} CPM with ${Math.round((correctChars / (correctChars + incorrectChars)) * 100)}% accuracy!`);
    }
  };
      
  // Function to handle downloading results
  const handleDownload = () => {
    const accuracy = Math.round((correctChars / (correctChars + incorrectChars)) * 100) || 0;
    
    const resultsText = `
Typing Test Results
------------------
Date: ${new Date().toLocaleString()}
Duration: ${duration} minute(s)
Difficulty: ${difficulty}

Speed: ${wpm} WPM (Words Per Minute)
Characters: ${cpm} CPM (Characters Per Minute)
Accuracy: ${accuracy}%

Correct Characters: ${correctChars}
Incorrect Characters: ${incorrectChars}
Correct Words: ${correctWords}
Incorrect Words: ${incorrectWords}
Corrections Made: ${corrections}
Maximum Speed: ${maxSpeed} WPM
    `;
    
    const blob = new Blob([resultsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `typing-test-results-${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
        
  // Get visible text for display and calculate word offset
  const visibleText = getVisibleText();
  
  // Calculate the word offset for the visible text window
  const calculateWordOffset = () => {
    const lines = splitTextIntoLines(sampleText);
    let wordCount = 0;
    
    for (let i = 0; i < currentLineIndex; i++) {
      wordCount += lines[i].split(' ').length;
    }
    
    return wordCount;
  };
  
  const wordOffset = calculateWordOffset();
  
  // Then modify your render method to include the TestResults component when the test is complete
  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <Helmet>
      <title> Typing Test Online - Free Speed Typing Test to Master Typing</title>
      <meta name="description" content="Start practising your typing speed with a typing test online WPM checker. Test your typing for 1, 3 and 5 minutes to improve your speed at different levels." />
    </Helmet>
      {/* Options section - Mobile Friendly */}
      <div className="bg-gray-200 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Clock className="w-5 h-5 text-gray-600 mb-2 sm:mb-0" />
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full">
              <span className="text-sm text-center sm:text-left">Duration of the test:</span>
              <div className="flex space-x-1">
                {[1, 3, 5].map((min) => (
                  <button
                    key={min}
                    className={`px-3 py-1 rounded text-sm ${
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
              <span className="text-sm ml-2">minute(s)</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full">
              <span className="text-sm text-center sm:text-left">Select difficulty:</span>
              <div className="flex space-x-1">
                {['normal', 'medium', 'hard'].map((level) => (
                  <button
                    key={level}
                    className={`px-3 py-1 rounded text-sm capitalize ${
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
      </div>
      
      {/* Show main test or results based on completion status */}
      {!isTestComplete ? (
        <div className="flex flex-col md:flex-row gap-6">
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
              {/* Timer and Speed in One Line */}
              <div className="flex justify-between items-center mb-4">
                {/* Timer */}
                <div className="relative w-20 h-20">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r={radius}
                      className="stroke-current text-gray-200"
                      strokeWidth="6"
                      fill="white"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r={radius}
                      className={`stroke-current ${getTimerColor()}`}
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      style={{ transition: 'stroke-dashoffset 1s linear' }}
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <span className={`text-2xl font-bold ${getTimerNumberColor()}`}>{timeLeft}</span>
                    <div className="text-xs text-gray-500">sec</div>
                  </div>
                </div>
                
                {/* Speed Display */}
                <div className="bg-white rounded-lg p-2 shadow-sm w-auto">
                  <div className="flex space-x-4">
                    <div className="text-center">
                      <div className="text-xs text-gray-600">Speed</div>
                      <div className="text-lg font-bold text-blue-600">{wpm} WPM</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-600">Characters</div>
                      <div className="text-lg font-bold text-blue-600">{cpm} CPM</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* IMPROVED: Typing area with scrollable text display */}
              <div className="bg-white border border-gray-300 rounded-lg p-4">
                <div className="font-mono text-base tracking-wide leading-relaxed mb-4 h-40 overflow-hidden">
                  {visibleText.split(' ').map((word, wordIndex) => (
                    <span key={wordIndex} className="px-0.5">
                      {word.split('').map((char, charIndex) => (
                        <span 
                          key={charIndex} 
                          className={getCharClass(wordIndex, word, charIndex, wordOffset)}
                        >
                          {char}
                        </span>
                      ))}
                      {' '}
                    </span>
                  ))}
                </div>
                <textarea
                  className="w-full h-24 p-2 border border-gray-300 rounded"
                  value={typedText}
                  onChange={handleKeyPress}
                  placeholder="Start typing here..."
                />
              </div>
            </div>
          </div>
          
          {/* Ad card - made responsive */}
          {/* <div className="w-full md:w-64">
            <div className="bg-white rounded-lg shadow-lg border-2 border-blue-500 h-full">
              <div className="h-full flex flex-col items-center justify-center p-4">
                <span className="text-gray-500">Advertisement Space</span>
              </div>
            </div>
          </div> */}
        </div>
      ) : (
        /* Show results when test is complete */
        <TestResults 
          wpm={wpm}
          cpm={cpm}
          correctChars={correctChars}
          incorrectChars={incorrectChars}
          correctWords={correctWords}
          incorrectWords={incorrectWords}
          corrections={corrections}
          maxSpeed={maxSpeed}
          duration={duration}
          isTestComplete={isTestComplete}
          accuracy={Math.round((correctChars / (correctChars + incorrectChars)) * 100) || 0}
        />
      )}

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600 mb-4">Note: Typos can be corrected by using the backspace key.</p>
        
        <div className="flex justify-center gap-4">
          <button 
            className="bg-blue-800 text-white px-6 py-2 rounded flex items-center justify-center hover:bg-blue-700"
            onClick={handleRestart}
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Restart
          </button>

          <button 
            className="bg-blue-800 text-white px-6 py-2 rounded flex items-center justify-center hover:bg-blue-700"
            onClick={() => {
              setSampleText(getRandomText(duration, difficulty));
              handleRestart();
            }}
          >
            Change Paragraph
          </button>
        </div>
      </div>

      {/* <AdsCard /> */}
      <Faq />
      {/* <AdsCard /> */}
    </div>
  );
}

export default TypingSpeedTest;