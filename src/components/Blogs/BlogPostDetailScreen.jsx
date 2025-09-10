// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import blogData from './blogData';
// import DOMPurify from 'dompurify';

// const BlogPostDetailsScreen = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // Find the specific blog post
//   const blog = blogData.find(b => b.id === parseInt(id));

//   // If no blog found, redirect or show error
//   if (!blog) {
//     return (
//       <div className="container mx-auto px-4 py-8 text-center">
//         <h1 className="text-2xl font-bold mb-4">Blog Not Found</h1>
//         <button
//           onClick={() => navigate('/')}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Back to Blogs
//         </button>
//       </div>
//     );
//   }

//   // Sanitize HTML to prevent XSS
//   const sanitizedDescription = DOMPurify.sanitize(blog.description);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-3xl mx-auto">
//         {/* Blog Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
//           <div className="flex justify-between text-gray-600">
//             <span>By {blog.author}</span>
//             <span>{blog.date}</span>
//           </div>
//         </div>

//         {/* Blog Content */}
//         <div
//           className="prose max-w-none"
//           dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
//         />

//         {/* Back Button */}
//         <div className="mt-8 text-center">
//           <button
//             onClick={() => navigate('/')}
//             className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
//           >
//             Back to Blog Collection
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogPostDetailsScreen;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

const API_URL = "https://api.typingtestonline.in/api";

// Component to render EditorJS content blocks
const BlogContentRenderer = ({ content }) => {
  if (!content || !content.blocks) {
    return <p className="text-gray-500">No content available</p>;
  }

  const renderBlock = (block, index) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p key={index} className="text-gray-800 leading-relaxed mb-4">
            {block.data.text}
          </p>
        );

      case "header":
        const HeaderTag = `h${block.data.level}`;
        const headerClasses = {
          1: "text-4xl font-bold text-gray-900 mb-6",
          2: "text-3xl font-bold text-gray-900 mb-5",
          3: "text-2xl font-bold text-gray-900 mb-4",
          4: "text-xl font-bold text-gray-800 mb-3",
          5: "text-lg font-bold text-gray-800 mb-3",
          6: "text-base font-bold text-gray-800 mb-2",
        };

        return React.createElement(
          HeaderTag,
          {
            key: index,
            className: headerClasses[block.data.level] || headerClasses[2],
          },
          block.data.text
        );

      case "list":
        const ListTag = block.data.style === "ordered" ? "ol" : "ul";
        const listClass =
          block.data.style === "ordered"
            ? "list-decimal list-inside mb-4 pl-4"
            : "list-disc list-inside mb-4 pl-4";

        return (
          <ListTag key={index} className={listClass}>
            {block.data.items.map((item, itemIndex) => (
              <li key={itemIndex} className="text-gray-800 mb-2">
                {item}
              </li>
            ))}
          </ListTag>
        );

      case "quote":
        return (
          <blockquote
            key={index}
            className="border-l-4 border-blue-500 pl-4 italic text-gray-700 bg-gray-50 p-4 mb-4 rounded"
          >
            <p className="text-lg mb-2">{block.data.text}</p>
            {block.data.caption && (
              <cite className="text-sm text-gray-600">
                — {block.data.caption}
              </cite>
            )}
          </blockquote>
        );

      case "table":
        return (
          <div
            key={index}
            className="overflow-x-auto mb-6 border border-gray-200 rounded-lg shadow-sm"
          >
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-white divide-y divide-gray-200">
                {block.data.content.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={
                      rowIndex === 0 ? "bg-gray-50" : "hover:bg-gray-50"
                    }
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`px-6 py-4 whitespace-nowrap text-sm ${
                          rowIndex === 0
                            ? "font-semibold text-gray-900 bg-gray-50"
                            : "text-gray-800"
                        } border-r border-gray-200 last:border-r-0`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "image":
        return (
          <div key={index} className="mb-6">
            <img
              src={block.data.file.url}
              alt={block.data.caption || "Blog image"}
              className="max-w-full h-auto rounded-lg shadow-md mx-auto"
            />
            {block.data.caption && (
              <p className="text-center text-sm text-gray-600 mt-2 italic">
                {block.data.caption}
              </p>
            )}
          </div>
        );

      case "embed":
        if (block.data.service === "youtube") {
          const videoId = block.data.source.match(
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
          )?.[1];
          if (videoId) {
            return (
              <div key={index} className="mb-6">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={block.data.caption || "YouTube video"}
                    className="w-full h-64 rounded-lg"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
                {block.data.caption && (
                  <p className="text-center text-sm text-gray-600 mt-2 italic">
                    {block.data.caption}
                  </p>
                )}
              </div>
            );
          }
        }
        return (
          <div key={index} className="mb-4 p-4 bg-gray-100 rounded">
            <p className="text-gray-600">
              Embedded content: {block.data.service}
            </p>
            <a
              href={block.data.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {block.data.source}
            </a>
          </div>
        );

      default:
        return (
          <div
            key={index}
            className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400"
          >
            <p className="text-yellow-800">
              Unsupported block type: {block.type}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="prose max-w-none">
      {content.blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
};

const BlogPostDetailsScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBlogData();
  }, [id]);

  const loadBlogData = async () => {
    console.log("🚀 BlogDetails: Loading blog data for ID:", id);
    setLoading(true);
    setError(null);

    try {
      // First, try to get from localStorage (set by BlogCollectionScreen)
      const selectedBlog = localStorage.getItem("selectedBlog");
      if (selectedBlog) {
        const parsedBlog = JSON.parse(selectedBlog);
        if (parsedBlog.id === parseInt(id)) {
          setBlog(parsedBlog);
          setLoading(false);
          console.log(
            "✅ BlogDetails: Blog loaded from localStorage:",
            parsedBlog
          );
          return;
        }
      }

      // If not in localStorage, fetch from API
      console.log("📡 BlogDetails: Fetching from API...");
      const response = await axios.get(`${API_URL}/blogs/all`);

      if (response.data.success && response.data.blogs) {
        const foundBlog = response.data.blogs.find(
          (b) => b.id === parseInt(id)
        );
        if (foundBlog) {
          setBlog(foundBlog);
          console.log("✅ BlogDetails: Blog loaded from API:", foundBlog);
        } else {
          setError("Blog not found");
        }
      } else {
        throw new Error("Invalid response format from API");
      }
    } catch (error) {
      console.warn(
        "⚠️ BlogDetails: Failed to fetch from API, using localStorage fallback"
      );
      console.error("API Error:", error);

      // Fallback to localStorage
      const storedBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");
      const foundBlog = storedBlogs.find((b) => b.id === parseInt(id));

      if (foundBlog) {
        setBlog(foundBlog);
        console.log(
          "💾 BlogDetails: Blog loaded from localStorage fallback:",
          foundBlog
        );
      } else {
        setError("Blog not found");
      }
    } finally {
      setLoading(false);
    }
  };

  // Get proper image URL - same as BlogCollection
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("data:") || imagePath.startsWith("http")) {
      return imagePath;
    }
    return `${API_URL.replace("/api", "")}/${imagePath}`;
  };

  // Format date for display - same as BlogCollection
  const formatDate = (dateString) => {
    if (!dateString) return "Recently created";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Recently created";
    }
  };

  // Generate meta title and description
  const getMetaTitle = () => {
    return blog?.title || "Untitled Blog";
  };

  const getMetaDescription = () => {
    return blog?.description || "Read this interesting blog post";
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-500">Loading blog post...</p>
      </div>
    );
  }

  // Error state
  if (error || !blog) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Blog Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          {error ||
            "The blog post you are looking for does not exist or has been removed."}
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          ← Back to Blog Collection
        </button>
      </div>
    );
  }

  // Parse content if it's a string
  let parsedContent;
  try {
    parsedContent =
      typeof blog.content === "string"
        ? JSON.parse(blog.content)
        : blog.content;
  } catch (error) {
    console.error("Error parsing blog content:", error);
    parsedContent = { blocks: [] };
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Helmet for Meta Tags */}
      <Helmet>
        <title>{getMetaTitle()}</title>
        <meta name="description" content={getMetaDescription()} />
        <meta property="og:title" content={getMetaTitle()} />
        <meta property="og:description" content={getMetaDescription()} />
        <meta property="og:type" content="article" />
        {blog.cover_image_path && (
          <meta property="og:image" content={getImageUrl(blog.cover_image_path)} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getMetaTitle()} />
        <meta name="twitter:description" content={getMetaDescription()} />
        {blog.cover_image_path && (
          <meta name="twitter:image" content={getImageUrl(blog.cover_image_path)} />
        )}
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Blog Content */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Blog Header with Gradient Background */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
              {/* Cover Image */}
              {blog.cover_image_path && (
                <div className="mb-6">
                  <img
                    src={getImageUrl(blog.cover_image_path)}
                    alt={blog.title}
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl font-bold mb-4">
                {blog.title || "Untitled Blog"}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm opacity-90">
                <span className="flex items-center">
                  📅 {formatDate(blog.created_at)}
                </span>

                <span className="flex items-center">
                  📂 {blog.category || "General"}
                </span>

                {blog.published !== undefined && (
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      blog.published
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    {blog.published ? "✅ Published" : "📝 Draft"}
                  </span>
                )}
              </div>

              {/* Description */}
              {blog.description && (
                <p className="text-xl leading-relaxed mb-4 font-light opacity-90">
                  {blog.description}
                </p>
              )}

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {blog.tags
                    .filter((tag) => tag !== null && tag !== "")
                    .map((tag, index) => (
                      <span
                        key={index}
                        className="bg-white bg-opacity-20 text-black text-sm px-3 py-1 rounded-full border border-white border-opacity-30"
                      >
                        #{tag}
                      </span>
                    ))}
                </div>
              )}
            </div>

            {/* Blog Content Body */}
            <div className="px-8 py-8">
              <div className="prose-lg">
                <BlogContentRenderer content={parsedContent} />
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={() => navigate("/blogs")}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              ← Back to Collection
            </button>

            {/* <button
              onClick={() => window.print()}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              🖨️ Print Blog
            </button> */}
          </div>

          {/* Additional Blog Info */}
          <div className="mt-6 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Blog Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <strong>Created:</strong> {formatDate(blog.created_at)}
              </div>
              <div>
                <strong>Category:</strong> {blog.category || "General"}
              </div>
              <div>
                <strong>Status:</strong>{" "}
                {blog.published ? "Published" : "Draft"}
              </div>
              <div>
                <strong>Blog ID:</strong> {blog.id}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetailsScreen;