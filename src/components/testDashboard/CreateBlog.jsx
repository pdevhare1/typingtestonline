// CreateBlog.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '../../components/testDashboard/Editor';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  
  const handleSave = () => {
    if (!title.trim()) {
      alert('Error: Please enter a blog title');
      return;
    }
    
    if (!content.trim()) {
      alert('Error: Please enter blog content');
      return;
    }
    
    // In a real app, you would save to a database here
    // For this example, we'll create a new blog object
    const newBlog = {
      id: Date.now().toString(),
      title,
      content,
      published: false,
      createdAt: new Date().toISOString()
    };
    
    // Pass the new blog to AllBlogs page through state
    navigate('/blogss', { state: { newBlog } });
    
    alert('Success: Blog created successfully!');
    
    // Reset form
    setTitle('');
    setContent('');
  };
  
  return (
    <div className="flex-1 bg-white p-4 overflow-auto">
      <h2 className="text-2xl font-bold mb-6">Create New Blog</h2>
      
      <div className="mb-4">
        <label className="text-lg font-semibold mb-2 block">Blog Title</label>
        <input
          className="border border-gray-300 rounded-lg p-3 bg-gray-50 w-full"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      
      <div className="mb-8">
        <label className="text-lg font-semibold mb-2 block">Blog Content</label>
        <Editor value={content} onChange={setContent} />
      </div>
      
      <button
        className="bg-blue-500 p-4 rounded-lg mb-8 w-full"
        onClick={handleSave}
      >
        <span className="text-white text-center text-lg font-semibold">Save Blog</span>
      </button>
    </div>
  );
}