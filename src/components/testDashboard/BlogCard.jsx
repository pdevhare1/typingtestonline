// BlogCard.js
import React from 'react';

export default function BlogCard({ blog, onDelete, onTogglePublish }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex flex-row justify-between items-center mb-2">
        <h3 className="text-lg font-bold">{blog.title}</h3>
        <span className="text-sm text-gray-500">{formatDate(blog.createdAt)}</span>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-3">
        {blog.content}
      </p>
      
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <button 
            className="bg-red-500 px-4 py-2 rounded-lg mr-2"
            onClick={onDelete}
          >
            <span className="text-white">Delete</span>
          </button>
          
          <button 
            className={blog.published ? "bg-orange-500 px-4 py-2 rounded-lg" : "bg-green-500 px-4 py-2 rounded-lg"}
            onClick={onTogglePublish}
          >
            <span className="text-white">{blog.published ? 'Unpublish' : 'Publish'}</span>
          </button>
        </div>
        
        <div className="px-3 py-1 rounded-full bg-gray-200">
          <span className="text-xs text-gray-700">
            {blog.published ? 'Published' : 'Draft'}
          </span>
        </div>
      </div>
    </div>
  );
}