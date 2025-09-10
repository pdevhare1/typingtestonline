// Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  
  return (
    <div className="flex-1 bg-white p-6">
      <h1 className="text-3xl font-bold text-center mb-10">Blog Dashboard</h1>
      
      <div className="space-y-4">
        <button 
          className="bg-blue-500 p-4 rounded-lg w-full"
          onClick={() => navigate('/create')}
        >
          <span className="text-white text-center text-lg font-semibold">Create Blog</span>
        </button>
        
        <button 
          className="bg-green-500 p-4 rounded-lg w-full"
          onClick={() => navigate('/blogss')}
        >
          <span className="text-white text-center text-lg font-semibold">All Blogs</span>
        </button>
      </div>
    </div>
  );
}