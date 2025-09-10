// Editor.js
import React from 'react';

export default function Editor({ value, onChange }) {
  // Simple implementation of rich text editor
  const insertBulletPoint = () => {
    onChange(value + '\n• ');
  };
  
  const insertTable = () => {
    const tableTemplate = `
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
`;
    onChange(value + tableTemplate);
  };
  
  const insertHeading = () => {
    onChange(value + '\n## Heading');
  };
  
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
      <div className="flex flex-row bg-gray-200 p-2 border-b border-gray-300">
        <button 
          className="bg-white px-3 py-1 rounded-md mr-2" 
          onClick={insertBulletPoint}
        >
          • Bullet
        </button>
        <button 
          className="bg-white px-3 py-1 rounded-md mr-2" 
          onClick={insertTable}
        >
          Table
        </button>
        <button 
          className="bg-white px-3 py-1 rounded-md" 
          onClick={insertHeading}
        >
          Heading
        </button>
      </div>
      
      <textarea
        className="p-3 min-h-64 text-base w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your blog content here..."
        rows={10}
      />
    </div>
  );
}