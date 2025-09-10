// // AllBlogs.js - A basic implementation to display blogs with edit functionality
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import BlogCard from './BlogCard';

// export default function AllBlogs() {
//   const navigate = useNavigate();
//   const [blogs, setBlogs] = useState([]);
//   const [filter, setFilter] = useState('all'); // 'all', 'published', 'drafts'

//   useEffect(() => {
//     // Load blogs from localStorage
//     const loadBlogs = () => {
//       const storedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
//       setBlogs(storedBlogs);
//     };

//     loadBlogs();
//   }, []);

//   const handleDeleteBlog = (blogId) => {
//     if (window.confirm('Are you sure you want to delete this blog post?')) {
//       // Filter out the deleted blog
//       const updatedBlogs = blogs.filter(blog => blog.id !== blogId);

//       // Update state and localStorage
//       setBlogs(updatedBlogs);
//       localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
//     }
//   };

//   const handleTogglePublish = (blogId) => {
//     // Find the blog to toggle
//     const updatedBlogs = blogs.map(blog => {
//       if (blog.id === blogId) {
//         return {
//           ...blog,
//           published: !blog.published
//         };
//       }
//       return blog;
//     });

//     // Update state and localStorage
//     setBlogs(updatedBlogs);
//     localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
//   };

//   // Filter blogs based on selected filter
//   const filteredBlogs = blogs.filter(blog => {
//     if (filter === 'all') return true;
//     if (filter === 'published') return blog.published;
//     if (filter === 'drafts') return !blog.published;
//     return true;
//   });

//   return (
//     <div className="w-full min-h-screen bg-gray-50 p-6">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">My Blog Posts</h1>
//           <button
//             onClick={() => navigate('/create-blog')}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Create New Post
//           </button>
//         </div>

//         {/* Filter controls */}
//         <div className="mb-6 flex space-x-2">
//           <button
//             onClick={() => setFilter('all')}
//             className={`px-4 py-2 rounded ${
//               filter === 'all'
//                 ? 'bg-blue-500 text-white'
//                 : 'bg-gray-200 text-gray-700'
//             }`}
//           >
//             All
//           </button>
//           <button
//             onClick={() => setFilter('published')}
//             className={`px-4 py-2 rounded ${
//               filter === 'published'
//                 ? 'bg-blue-500 text-white'
//                 : 'bg-gray-200 text-gray-700'
//             }`}
//           >
//             Published
//           </button>
//           <button
//             onClick={() => setFilter('drafts')}
//             className={`px-4 py-2 rounded ${
//               filter === 'drafts'
//                 ? 'bg-blue-500 text-white'
//                 : 'bg-gray-200 text-gray-700'
//             }`}
//           >
//             Drafts
//           </button>
//         </div>

//         {/* Blog list */}
//         {filteredBlogs.length > 0 ? (
//           <div className="space-y-4">
//             {filteredBlogs.map(blog => (
//               <BlogCard
//                 key={blog.id}
//                 blog={blog}
//                 onDelete={() => handleDeleteBlog(blog.id)}
//                 onTogglePublish={() => handleTogglePublish(blog.id)}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-10">
//             <p className="text-gray-500">
//               {filter === 'all'
//                 ? 'No blog posts yet. Create your first post!'
//                 : filter === 'published'
//                   ? 'No published posts yet.'
//                   : 'No drafts yet.'}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // AllBlogs.js - A basic implementation to display blogs with edit functionality
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import BlogCard from './BlogCard';

// export default function AllBlogs() {
//   const navigate = useNavigate();
//   const [blogs, setBlogs] = useState([]);
//   const [filter, setFilter] = useState('all'); // 'all', 'published', 'drafts'

//   useEffect(() => {
//     // Load blogs from localStorage
//     const loadBlogs = () => {
//       const storedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
//       setBlogs(storedBlogs);
//     };

//     loadBlogs();
//   }, []);

//   const handleDeleteBlog = (blogId) => {
//     if (window.confirm('Are you sure you want to delete this blog post?')) {
//       // Filter out the deleted blog
//       const updatedBlogs = blogs.filter(blog => blog.id !== blogId);

//       // Update state and localStorage
//       setBlogs(updatedBlogs);
//       localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
//     }
//   };

//   const handleTogglePublish = (blogId) => {
//     // Find the blog to toggle
//     const updatedBlogs = blogs.map(blog => {
//       if (blog.id === blogId) {
//         return {
//           ...blog,
//           published: !blog.published
//         };
//       }
//       return blog;
//     });

//     // Update state and localStorage
//     setBlogs(updatedBlogs);
//     localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
//   };

//   // Filter blogs based on selected filter
//   const filteredBlogs = blogs.filter(blog => {
//     if (filter === 'all') return true;
//     if (filter === 'published') return blog.published;
//     if (filter === 'drafts') return !blog.published;
//     return true;
//   });

//   return (
//     <div className="w-full min-h-screen bg-gray-50 p-6">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">My Blog Posts</h1>
//           <button
//             onClick={() => navigate('/create-blog')}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Create New Post
//           </button>
//         </div>

//         {/* Filter controls */}
//         <div className="mb-6 flex space-x-2">
//           <button
//             onClick={() => setFilter('all')}
//             className={`px-4 py-2 rounded ${
//               filter === 'all'
//                 ? 'bg-blue-500 text-white'
//                 : 'bg-gray-200 text-gray-700'
//             }`}
//           >
//             All
//           </button>
//           <button
//             onClick={() => setFilter('published')}
//             className={`px-4 py-2 rounded ${
//               filter === 'published'
//                 ? 'bg-blue-500 text-white'
//                 : 'bg-gray-200 text-gray-700'
//             }`}
//           >
//             Published
//           </button>
//           <button
//             onClick={() => setFilter('drafts')}
//             className={`px-4 py-2 rounded ${
//               filter === 'drafts'
//                 ? 'bg-blue-500 text-white'
//                 : 'bg-gray-200 text-gray-700'
//             }`}
//           >
//             Drafts
//           </button>
//         </div>

//         {/* Blog list */}
//         {filteredBlogs.length > 0 ? (
//           <div className="space-y-4">
//             {filteredBlogs.map(blog => (
//               <BlogCard
//                 key={blog.id}
//                 blog={blog}
//                 onDelete={() => handleDeleteBlog(blog.id)}
//                 onTogglePublish={() => handleTogglePublish(blog.id)}
//                 onEdit={() => navigate(`/edit-blog/${blog.id}`)}  // EDIT button handler added
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-10">
//             <p className="text-gray-500">
//               {filter === 'all'
//                 ? 'No blog posts yet. Create your first post!'
//                 : filter === 'published'
//                   ? 'No published posts yet.'
//                   : 'No drafts yet.'}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BlogCard from "./BlogCard";
import BlogPreview from "./BlogPreviewPage";

// API base URL
const API_URL = "https://api.typingtestonline.in/api";

export default function AllBlogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("all"); // 'all', 'published', 'drafts'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load blogs when component mounts
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Function to fetch blogs from backend, with fallback to localStorage
  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);

    try {
      // Try to fetch from API - Updated endpoint to match backend route
      console.log("Fetching blogs from API...");
      const response = await axios.get(`${API_URL}/blogs/all`);

      // The response format from your backend is { success: true, blogs: [...] }
      if (response.data.success && response.data.blogs) {
        setBlogs(response.data.blogs);
        console.log("Blogs loaded from API:", response.data.blogs);

        // Update localStorage as backup
        localStorage.setItem("blogs", JSON.stringify(response.data.blogs));
      } else {
        throw new Error("Invalid response format from API");
      }
    } catch (error) {
      console.warn(
        "Failed to fetch blogs from API, using localStorage instead"
      );
      console.error("API Error:", error);

      // Fallback to localStorage
      const storedBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");
      setBlogs(storedBlogs);
      console.log("Blogs loaded from localStorage:", storedBlogs);

      setError("Could not connect to server. Using local data instead.");
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a blog
  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    try {
      // Try to delete from API first - Updated endpoint to match backend
      await axios.delete(`${API_URL}/blogs/${blogId}`);
      console.log("Blog deleted from API");

      // Update local storage to stay in sync
      const storedBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");
      const updatedBlogs = storedBlogs.filter((blog) => blog.id !== blogId);
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    } catch (error) {
      console.warn(
        "Failed to delete blog from API, falling back to localStorage"
      );

      // Fallback: Update localStorage
      const storedBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");
      const updatedBlogs = storedBlogs.filter((blog) => blog.id !== blogId);
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    }

    // Update state regardless of where it was deleted from
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
  };

  // Function to toggle publish status
  const handleTogglePublish = async (blogId) => {
    // Find the blog to toggle
    const blogToUpdate = blogs.find((blog) => blog.id === blogId);
    if (!blogToUpdate) return;

    const newPublishStatus = !blogToUpdate.published;

    try {
      // Try to update via API first - Using PUT endpoint to match backend
      await axios.put(`${API_URL}/blogs/${blogId}`, {
        published: newPublishStatus,
      });
      console.log(
        `Blog ${newPublishStatus ? "published" : "unpublished"} via API`
      );

      // Update local storage to stay in sync
      const storedBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");
      const updatedStoredBlogs = storedBlogs.map((blog) => {
        if (blog.id === blogId) {
          return { ...blog, published: newPublishStatus };
        }
        return blog;
      });
      localStorage.setItem("blogs", JSON.stringify(updatedStoredBlogs));
    } catch (error) {
      console.warn(
        "Failed to update publish status via API, falling back to localStorage"
      );

      // Fallback: Update in localStorage
      const storedBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");
      const updatedStoredBlogs = storedBlogs.map((blog) => {
        if (blog.id === blogId) {
          return { ...blog, published: newPublishStatus };
        }
        return blog;
      });
      localStorage.setItem("blogs", JSON.stringify(updatedStoredBlogs));
    }

    // Update state regardless of where it was updated
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) => {
        if (blog.id === blogId) {
          return { ...blog, published: newPublishStatus };
        }
        return blog;
      })
    );
  };

  // Filter blogs based on selected filter
  const filteredBlogs = blogs.filter((blog) => {
    if (filter === "all") return true;
    if (filter === "published") return blog.published;
    if (filter === "drafts") return !blog.published;
    return true;
  });

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Blog Posts</h1>
          <button
            onClick={() => navigate("/create-blog")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create New Post
          </button>
        </div>

        {/* Error message if API fails */}
        {error && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Filter controls */}
        <div className="mb-6 flex space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded ${
              filter === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("published")}
            className={`px-4 py-2 rounded ${
              filter === "published"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Published
          </button>
          <button
            onClick={() => setFilter("drafts")}
            className={`px-4 py-2 rounded ${
              filter === "drafts"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Drafts
          </button>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Loading blogs...</p>
          </div>
        ) : /* Blog list */
        filteredBlogs.length > 0 ? (
          <div className="space-y-4">
            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                onDelete={() => handleDeleteBlog(blog.id)}
                onTogglePublish={() => handleTogglePublish(blog.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">
              {filter === "all"
                ? "No blog posts yet. Create your first post!"
                : filter === "published"
                ? "No published posts yet."
                : "No drafts yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
