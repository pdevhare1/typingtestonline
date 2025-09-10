import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // Import Helmet for meta tags
import axios from "axios";

// API base URL - same as BlogCard component
const API_URL = "https://api.typingtestonline.in/api";

const BlogCollectionScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch published blogs when component mounts
  useEffect(() => {
    fetchPublishedBlogs();

    // Listen for blog updates from AllBlogs component
    const handleBlogUpdate = () => {
      console.log(
        "📡 BlogCollection: Received blog update event, refreshing..."
      );
      fetchPublishedBlogs();
    };

    window.addEventListener("blogUpdated", handleBlogUpdate);

    // Cleanup event listener
    return () => {
      window.removeEventListener("blogUpdated", handleBlogUpdate);
    };
  }, []);

  // Dynamic meta data based on search and blog count
  const getMetaData = () => {
    const blogCount = blogs.length;
    const filteredCount = filteredBlogs.length;
    
    let title = "Blog Collection";
    let description = "Discover and read our collection of published blogs";
    
    if (searchTerm) {
      title = `Improve Speed, Accuracy & Skills | typingtestonline.in`;
      description = `Explore our typing blog for expert tips to boost your WPM, improve accuracy, and master keyboard skills. Find articles on effective practice methods, ergonomic setups, and more.`;
    } else if (blogCount > 0) {
      title = `Improve Speed, Accuracy & Skills | typingtestonline.in`;
      description = `Explore our typing blog for expert tips to boost your WPM, improve accuracy, and master keyboard skills. Find articles on effective practice methods, ergonomic setups, and more.`;
    }
    
    return { title, description };
  };

  // Function to fetch only published blogs
  const fetchPublishedBlogs = async () => {
    console.log("🚀 BlogCollection: Fetching published blogs...");
    setLoading(true);
    setError(null);

    try {
      console.log("📡 BlogCollection: Fetching from API...");
      const response = await axios.get(`${API_URL}/blogs/all`);

      if (response.data.success && response.data.blogs) {
        // Filter only published blogs - using same structure as BlogCard
        const publishedBlogs = response.data.blogs.filter(
          (blog) => blog.published === true
        );
        setBlogs(publishedBlogs);
        console.log(
          "✅ BlogCollection: Published blogs loaded from API:",
          publishedBlogs
        );
      } else {
        throw new Error("Invalid response format from API");
      }
    } catch (error) {
      console.warn(
        "⚠️ BlogCollection: Failed to fetch from API, using localStorage fallback"
      );
      console.error("API Error:", error);

      // Fallback to localStorage - same as BlogCard behavior
      const storedBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");
      const publishedBlogs = storedBlogs.filter(
        (blog) => blog.published === true
      );
      setBlogs(publishedBlogs);
      console.log(
        "💾 BlogCollection: Published blogs loaded from localStorage:",
        publishedBlogs
      );

      setError(
        "Could not connect to server. Showing locally stored published blogs."
      );
    } finally {
      setLoading(false);
    }
  };

  // Get proper image URL - same function as BlogCard
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    // If it's already a full URL (data:image or http), return as is
    if (imagePath.startsWith("data:") || imagePath.startsWith("http")) {
      return imagePath;
    }
    // Otherwise, construct the full URL
    return `${API_URL.replace("/api", "")}/${imagePath}`;
  };

  // Format date for display - same as BlogCard
  const formatDate = (dateString) => {
    if (!dateString) return "Recent";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Recent";
    }
  };

  // Get content preview from EditorJS blocks - same logic as BlogCard
  const getContentPreview = (content, maxLength = 150) => {
    if (!content) return "No content available";

    try {
      // Parse content if it's a string
      let parsedContent;
      if (typeof content === "string") {
        parsedContent = JSON.parse(content);
      } else {
        parsedContent = content;
      }

      // Extract text from EditorJS blocks
      if (parsedContent && parsedContent.blocks) {
        const textBlocks = parsedContent.blocks.filter(
          (block) =>
            ["paragraph", "header"].includes(block.type) && block.data.text
        );

        if (textBlocks.length > 0) {
          const fullText = textBlocks.map((block) => block.data.text).join(" ");
          return fullText.length > maxLength
            ? fullText.substring(0, maxLength).trim() + "..."
            : fullText;
        }
      }
    } catch (error) {
      console.warn("Error parsing content:", error);
    }

    // Fallback to description or string content
    if (typeof content === "string") {
      return content.length > maxLength
        ? content.substring(0, maxLength).trim() + "..."
        : content;
    }

    return "No preview available";
  };

  // Filter blogs based on search term - enhanced search
  const filteredBlogs = blogs.filter((blog) => {
    const searchLower = searchTerm.toLowerCase();
    const title = (blog.title || "").toLowerCase();
    const description = (blog.description || "").toLowerCase();
    const category = (blog.category || "").toLowerCase();
    const tags = blog.tags ? blog.tags.join(" ").toLowerCase() : "";

    return (
      title.includes(searchLower) ||
      description.includes(searchLower) ||
      category.includes(searchLower) ||
      tags.includes(searchLower)
    );
  });

  // Handle blog click to navigate to blog details - consistent with BlogCard
  const handleBlogClick = (blog) => {
    // Store the selected blog data for the detail view
    localStorage.setItem("selectedBlog", JSON.stringify(blog));
    navigate(`/blog/${blog.id}`);
  };

  // Handle preview - same as BlogCard
  const handlePreview = (blog) => {
    // Create a new window/tab for preview
    const previewWindow = window.open(
      "",
      "_blank",
      "width=1200,height=800,scrollbars=yes,resizable=yes"
    );

    if (previewWindow) {
      // Generate preview HTML content
      const previewContent = generatePreviewHTML(blog);

      // Write the content to the new window
      previewWindow.document.write(previewContent);
      previewWindow.document.close();

      // Set the title of the new window
      previewWindow.document.title = `Preview: ${blog.title}`;
    } else {
      alert("Please allow popups to view blog preview");
    }
  };

  // Generate HTML content for preview - same as BlogCard
  const generatePreviewHTML = (blog) => {
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

    // Generate content blocks HTML
    const contentHTML = generateContentHTML(parsedContent);

    // Format date
    const formattedDate = blog.created_at
      ? new Date(blog.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "Recently created";

    // Generate tags HTML
    const tagsHTML =
      blog.tags && blog.tags.length > 0
        ? blog.tags
            .filter((tag) => tag !== null && tag !== "")
            .map((tag) => `<span class="blog-tag">#${tag}</span>`)
            .join("")
        : "";

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview: ${blog.title}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8fafc;
          }
          
          .blog-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
          }
          
          .blog-header {
            padding: 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
          }
          
          .blog-title {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          }
          
          .blog-meta {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            flex-wrap: wrap;
            margin-bottom: 1rem;
            font-size: 0.9rem;
            opacity: 0.9;
          }
          
          .blog-cover {
            width: 100%;
            height: 300px;
            object-fit: cover;
            border-radius: 8px;
            margin: 1rem 0;
          }
          
          .blog-description {
            font-size: 1.2rem;
            font-weight: 300;
            margin-bottom: 1rem;
            opacity: 0.9;
          }
          
          .blog-tags {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          
          .blog-tag {
            background-color: rgba(255, 255, 255, 0.2);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.8rem;
            border: 1px solid rgba(255, 255, 255, 0.3);
          }
          
          .blog-content {
            padding: 2rem;
          }
          
          .blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4, .blog-content h5, .blog-content h6 {
            margin-bottom: 1rem;
            color: #1a202c;
          }
          
          .blog-content p {
            margin-bottom: 1rem;
            line-height: 1.8;
            color: #4a5568;
          }
          
          .blog-content img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 1.5rem 0;
          }
        </style>
      </head>
      <body>
        <div class="blog-container">
          <div class="blog-header">
            <h1 class="blog-title">${blog.title}</h1>
            
            <div class="blog-meta">
              <span>📅 ${formattedDate}</span>
              <span>📂 ${blog.category || "General"}</span>
              <span>✅ Published</span>
            </div>
            
            ${
              blog.cover_image_path
                ? `
              <img src="${getImageUrl(blog.cover_image_path)}" alt="${
                    blog.title
                  }" class="blog-cover" />
            `
                : ""
            }
            
            ${
              blog.description
                ? `
              <p class="blog-description">${blog.description}</p>
            `
                : ""
            }
            
            ${
              tagsHTML
                ? `
              <div class="blog-tags">
                ${tagsHTML}
              </div>
            `
                : ""
            }
          </div>
          
          <div class="blog-content">
            ${contentHTML}
          </div>
        </div>
      </body>
      </html>
    `;
  };

  // Generate HTML from EditorJS content blocks - same as BlogCard
  const generateContentHTML = (content) => {
    if (!content || !content.blocks) {
      return '<p style="color: #718096;">No content available</p>';
    }

    return content.blocks
      .map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return `<p>${block.data.text}</p>`;

          case "header":
            const level = block.data.level || 2;
            return `<h${level}>${block.data.text}</h${level}>`;

          case "list":
            const listTag = block.data.style === "ordered" ? "ol" : "ul";
            const items = block.data.items
              .map((item) => `<li>${item}</li>`)
              .join("");
            return `<${listTag}>${items}</${listTag}>`;

          case "quote":
            return `
            <blockquote>
              <p>${block.data.text}</p>
              ${
                block.data.caption ? `<cite>— ${block.data.caption}</cite>` : ""
              }
            </blockquote>
          `;

          case "image":
            return `
            <div>
              <img src="${block.data.file.url}" alt="${
              block.data.caption || "Blog image"
            }" />
              ${
                block.data.caption
                  ? `<p style="text-align: center; font-size: 0.875rem; color: #718096; margin-top: 0.5rem;">${block.data.caption}</p>`
                  : ""
              }
            </div>
          `;

          default:
            return `<p style="color: #718096;">Unsupported content type: ${block.type}</p>`;
        }
      })
      .join("");
  };

  // Get meta data
  const metaData = getMetaData();

  return (
    <>
      {/* Meta Tags using Helmet */}
      <Helmet>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content={metaData.title} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaData.title} />
        <meta name="twitter:description" content={metaData.description} />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Your Blog Name" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={window.location.href} />
        
        {/* Keywords based on blog categories and tags */}
        <meta name="keywords" content={
          blogs.length > 0 
            ? blogs.map(blog => [blog.category, ...(blog.tags || [])]).flat().filter(Boolean).join(", ")
            : "blog, articles, published content"
        } />
      </Helmet>

      <div className="container mx-auto px-4 min-h-screen py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center">
            Blog Collection
          </h1>
          <button
            onClick={fetchPublishedBlogs}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            {loading ? "⏳" : "🔄"} Refresh
          </button>
        </div>

        {/* Error message if API fails */}
        {error && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded">
            <p>⚠️ {error}</p>
          </div>
        )}

        {/* Search Input */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search published blogs by title, description, category, or tags..."
            className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Blog count */}
        {!loading && (
          <div className="text-center mb-6">
            <p className="text-gray-600">
              Showing {filteredBlogs.length} of {blogs.length} published blog
              {blogs.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading published blogs...</p>
          </div>
        ) : (
          <>
            {/* Blog Cards */}
            {filteredBlogs.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border"
                  >
                    {/* Cover Image */}
                    {blog.cover_image_path && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={getImageUrl(blog.cover_image_path)}
                          alt={blog.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.parentElement.style.display = "none";
                          }}
                        />
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          ✅ Published
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDate(blog.created_at)}
                        </span>
                      </div>

                      <h2 className="text-xl font-semibold mb-3 text-gray-800 hover:text-blue-600 transition-colors line-clamp-2">
                        {blog.title || "Untitled Blog"}
                      </h2>

                      {/* Description */}
                      {blog.description && (
                        <p className="text-gray-600 mb-3 text-sm leading-relaxed line-clamp-2">
                          {blog.description}
                        </p>
                      )}

                      {/* Content Preview */}
                      <p className="text-gray-500 mb-4 text-sm leading-relaxed line-clamp-3">
                        {getContentPreview(blog.content)}
                      </p>

                      {/* Category and Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.category && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            📂 {blog.category}
                          </span>
                        )}
                        {blog.tags &&
                          blog.tags.length > 0 &&
                          blog.tags
                            .filter((tag) => tag !== null && tag !== "")
                            .slice(0, 2) // Show only first 2 tags
                            .map((tag, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                        {blog.tags &&
                          blog.tags.filter((tag) => tag !== null && tag !== "")
                            .length > 2 && (
                            <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">
                              +
                              {blog.tags.filter(
                                (tag) => tag !== null && tag !== ""
                              ).length - 2}{" "}
                              more
                            </span>
                          )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => handleBlogClick(blog)}
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm transition-colors"
                        >
                          Read Full Blog →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* No Results Message */
              <div className="text-center text-gray-500 mt-10 bg-white rounded-lg shadow p-8">
                <div className="text-6xl mb-4">{searchTerm ? "🔍" : "📚"}</div>
                <h3 className="text-xl font-semibold mb-2">
                  {searchTerm
                    ? "No blogs found matching your search"
                    : "No published blogs available"}
                </h3>
                <p className="text-gray-400 mb-4">
                  {searchTerm
                    ? "Try adjusting your search terms or browse all blogs."
                    : "Published blogs will appear here once authors publish their posts."}
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default BlogCollectionScreen;