// AllBlogs.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BlogCard from '../../components/testDashboard/BlogCard';

export default function AllBlogs() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [blogs, setBlogs] = useState([
    {
      id: '1',
      title: 'Getting Started with React Native',
      content: 'React Native is a framework for building mobile applications...',
      published: true,
      createdAt: '2025-04-10T10:30:00Z'
    },
    {
      id: '2',
      title: 'Using Tailwind CSS in React Native',
      content: 'Tailwind CSS can be used in React Native with the right setup...',
      published: false,
      createdAt: '2025-04-12T14:20:00Z'
    }
  ]);
  
  // Handle new blog added from CreateBlog screen
  useEffect(() => {
    if (location.state?.newBlog) {
      setBlogs(currentBlogs => [location.state.newBlog, ...currentBlogs]);
      // Clear the state to prevent duplicate additions
      window.history.replaceState({}, document.title);
    }
  }, [location.state?.newBlog]);
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setBlogs(currentBlogs => currentBlogs.filter(blog => blog.id !== id));
      alert('Blog deleted successfully');
    }
  };
  
  const togglePublish = (id) => {
    setBlogs(currentBlogs => currentBlogs.map(blog => 
      blog.id === id ? { ...blog, published: !blog.published } : blog
    ));
  };
  
  return (
    <div className="flex-1 bg-white p-4">
      <h2 className="text-2xl font-bold mb-6">All Blogs</h2>
      
      {blogs.length === 0 ? (
        <div className="flex-1 flex justify-center items-center">
          <div className="text-center">
            <p className="text-lg text-gray-500">No blogs found</p>
            <button 
              className="mt-4 bg-blue-500 px-4 py-2 rounded-lg"
              onClick={() => navigate('/create')}
            >
              <span className="text-white">Create Your First Blog</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map(blog => (
            <div key={blog.id} className="mb-4">
              <BlogCard
                blog={blog}
                onDelete={() => handleDelete(blog.id)}
                onTogglePublish={() => togglePublish(blog.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}