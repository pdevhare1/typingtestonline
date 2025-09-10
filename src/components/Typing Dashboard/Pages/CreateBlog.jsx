import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from './Editor';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('general');
  const [tags, setTags] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const navigate = useNavigate();
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Create a URL-friendly slug from the meta title or blog title
  const createSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };
  
  const handleSave = (published = false) => {
    if (!title.trim()) {
      alert('Error: Please enter a blog title');
      return;
    }
    
    if (!content.trim()) {
      alert('Error: Please enter blog content');
      return;
    }
    
    // Get existing blogs from localStorage or initialize empty array
    const existingBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    
    const blogSlug = metaTitle ? createSlug(metaTitle) : createSlug(title);
    
    // Create a new blog object
    const newBlog = {
      id: Date.now().toString(),
      title,
      description,
      category,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      coverImage: imagePreview, // Store the data URL
      content,
      published,
      metaTitle: metaTitle || title,
      blogUrl: `/blog/${blogSlug}`,
      createdAt: new Date().toISOString()
    };
    
    // Add new blog to the beginning of the array
    const updatedBlogs = [newBlog, ...existingBlogs];
    
    // Save to localStorage
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    
    alert(`Success: Blog ${published ? 'published' : 'saved as draft'} successfully!`);
    
    // Navigate to blogs page
    navigate('/blogss');
    
    // Reset form
    setTitle('');
    setDescription('');
    setContent('');
    setCategory('general');
    setTags('');
    setMetaTitle('');
    setCoverImage(null);
    setImagePreview(null);
  };
  
  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md my-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Create New Blog Post</h1>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Blog Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Short Description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            placeholder="Enter a short description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="general">General</option>
            <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="travel">Travel</option>
            <option value="food">Food</option>
            <option value="health">Health</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverImage">
            Cover Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="coverImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="mt-2">
              <img 
                src={imagePreview} 
                alt="Cover preview" 
                className="h-40 object-cover rounded" 
              />
            </div>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Blog Content
          </label>
          <Editor value={content} onChange={setContent} />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="metaTitle">
            Meta Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="metaTitle"
            type="text"
            placeholder="Enter custom meta title (optional)"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
          />
          {metaTitle && (
            <p className="text-sm text-gray-600 mt-1">
              Generated URL: /blog/{createSlug(metaTitle)}
            </p>
          )}
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
            Tags (comma separated)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="tags"
            type="text"
            placeholder="tag1, tag2, tag3"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => handleSave(true)}
          >
            Publish Blog Post
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => handleSave(false)}
          >
            Save as Draft
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;