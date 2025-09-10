// // BlogCard.js - Modified to open preview in a new page
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function BlogCard({ blog, onDelete, onTogglePublish }) {
//   const navigate = useNavigate();

//   // Format date to be more readable
//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   // Extract preview text from content
//   const getContentPreview = () => {
//     if (typeof blog.content === 'object' && blog.content.blocks) {
//       // Handle EditorJS content structure
//       const textBlocks = blog.content.blocks.filter(block =>
//         ['paragraph', 'header'].includes(block.type)
//       );

//       if (textBlocks.length > 0) {
//         return textBlocks[0].data.text.substring(0, 100) + '...';
//       }
//     }

//     // Fallback if content is a string or has unexpected format
//     if (typeof blog.content === 'string') {
//       return blog.content.substring(0, 100) + '...';
//     }

//     return blog.description || 'No preview available';
//   };

//   // Navigate to preview page
//   const handlePreviewClick = (e) => {
//     e.stopPropagation();
//     navigate(`/preview-blog/${blog.id}`);
//   };

//   return (
//     <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
//       <div className="flex flex-col md:flex-row">
//         {/* Cover image */}
//         {blog.coverImage && (
//           <div className="md:w-1/4">
//             <img
//               src={blog.coverImage}
//               alt={blog.title}
//               className="h-40 w-full object-cover"
//             />
//           </div>
//         )}

//         {/* Content */}
//         <div className={`p-4 ${blog.coverImage ? 'md:w-3/4' : 'w-full'}`}>
//           <div className="flex justify-between items-start">
//             <div>
//               <h3 className="text-lg font-medium text-gray-900">{blog.title}</h3>
//               <p className="text-sm text-gray-500 mt-1">
//                 {formatDate(blog.createdAt)} • {blog.category}
//               </p>
//             </div>
//             <div className="flex items-center">
//               <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                 blog.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
//               }`}>
//                 {blog.published ? 'Published' : 'Draft'}
//               </span>
//             </div>
//           </div>

//           <p className="mt-2 text-sm text-gray-600">{blog.description || getContentPreview()}</p>

//           {/* Tags */}
//           {blog.tags && blog.tags.length > 0 && (
//             <div className="mt-2 flex flex-wrap gap-1">
//               {blog.tags.map((tag, index) => (
//                 <span
//                   key={index}
//                   className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           )}

//           {/* Action buttons */}
//           <div className="mt-4 flex justify-end space-x-2">
//             <button
//               onClick={handlePreviewClick}
//               className="px-3 py-1 text-sm bg-purple-100 text-purple-700 hover:bg-purple-200 rounded"
//             >
//               Preview
//             </button>
//             <button
//               onClick={() => navigate(`/edit-blog/${blog.id}`)}
//               className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-900"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => onTogglePublish(blog.id)}
//               className="px-3 py-1 text-sm text-blue-600 hover:text-blue-900"
//             >
//               {blog.published ? 'Unpublish' : 'Publish'}
//             </button>
//             <button
//               onClick={() => onDelete(blog.id)}
//               className="px-3 py-1 text-sm text-red-600 hover:text-red-900"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://api.typingtestonline.in/api";

export default function BlogCard({
  blog,
  onDelete,
  onTogglePublish,
  onPreview,
}) {
  const navigate = useNavigate();

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get proper image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    // If it's already a full URL (data:image or http), return as is
    if (imagePath.startsWith("data:") || imagePath.startsWith("http")) {
      return imagePath;
    }
    // Otherwise, construct the full URL
    return `${API_URL.replace("/api", "")}/${imagePath}`;
  };

  // Handle preview - opens in new window
  const handlePreview = () => {
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
      // Fallback if popup is blocked - use existing onPreview prop
      if (onPreview) {
        onPreview(blog);
      } else {
        alert("Please allow popups to view blog preview");
      }
    }
  };

  // Generate HTML content for preview
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
          
          .blog-status {
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
          }
          
          .status-published {
            background-color: rgba(34, 197, 94, 0.2);
            color: #16a34a;
            border: 1px solid rgba(34, 197, 94, 0.3);
          }
          
          .status-draft {
            background-color: rgba(251, 191, 36, 0.2);
            color: #d97706;
            border: 1px solid rgba(251, 191, 36, 0.3);
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
          
          .blog-content h1 {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 1.5rem;
            color: #1a202c;
          }
          
          .blog-content h2 {
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 1.25rem;
            color: #1a202c;
          }
          
          .blog-content h3 {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
            color: #2d3748;
          }
          
          .blog-content h4 {
            font-size: 1.25rem;
            font-weight: bold;
            margin-bottom: 0.75rem;
            color: #2d3748;
          }
          
          .blog-content h5 {
            font-size: 1.125rem;
            font-weight: bold;
            margin-bottom: 0.75rem;
            color: #2d3748;
          }
          
          .blog-content h6 {
            font-size: 1rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
            color: #2d3748;
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
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          
          .blog-content ul, .blog-content ol {
            margin-bottom: 1rem;
            padding-left: 1.5rem;
          }
          
          .blog-content li {
            margin-bottom: 0.5rem;
            color: #4a5568;
          }
          
          .blog-content blockquote {
            border-left: 4px solid #667eea;
            padding-left: 1rem;
            margin: 1.5rem 0;
            font-style: italic;
            background-color: #f7fafc;
            padding: 1rem;
            border-radius: 0 8px 8px 0;
          }
          
          .blog-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          
          .blog-content th, .blog-content td {
            padding: 0.75rem;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
          }
          
          .blog-content th {
            background-color: #f7fafc;
            font-weight: 600;
            color: #2d3748;
          }
          
          .blog-content iframe {
            width: 100%;
            height: 300px;
            border-radius: 8px;
            margin: 1.5rem 0;
          }
          
          .image-caption {
            text-align: center;
            font-size: 0.875rem;
            color: #718096;
            margin-top: 0.5rem;
            font-style: italic;
          }
          
          .unsupported-block {
            background-color: #fef3cd;
            border: 1px solid #fbbf24;
            border-radius: 4px;
            padding: 1rem;
            margin: 1rem 0;
            color: #92400e;
          }
          
          @media (max-width: 768px) {
            .blog-container {
              margin: 1rem;
              border-radius: 8px;
            }
            
            .blog-header {
              padding: 1.5rem 1rem;
            }
            
            .blog-title {
              font-size: 2rem;
            }
            
            .blog-content {
              padding: 1.5rem 1rem;
            }
            
            .blog-meta {
              flex-direction: column;
              gap: 0.5rem;
            }
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
              <span class="blog-status ${
                blog.published ? "status-published" : "status-draft"
              }">
                ${blog.published ? "✅ Published" : "📝 Draft"}
              </span>
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

  // Generate HTML from EditorJS content blocks
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

          case "table":
            const rows = block.data.content
              .map((row, rowIndex) => {
                const cells = row.map((cell) => `<td>${cell}</td>`).join("");
                return `<tr>${cells}</tr>`;
              })
              .join("");
            return `<table>${rows}</table>`;

          case "image":
            return `
            <div>
              <img src="${block.data.file.url}" alt="${
              block.data.caption || "Blog image"
            }" />
              ${
                block.data.caption
                  ? `<p class="image-caption">${block.data.caption}</p>`
                  : ""
              }
            </div>
          `;

          case "embed":
            if (block.data.service === "youtube") {
              const videoId = block.data.source.match(
                /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
              )?.[1];
              if (videoId) {
                return `
                <div>
                  <iframe src="https://www.youtube.com/embed/${videoId}" 
                          title="${block.data.caption || "YouTube video"}" 
                          frameborder="0" 
                          allowfullscreen>
                  </iframe>
                  ${
                    block.data.caption
                      ? `<p class="image-caption">${block.data.caption}</p>`
                      : ""
                  }
                </div>
              `;
              }
            }
            return `
            <div class="unsupported-block">
              <p>Embedded content: ${block.data.service}</p>
              <a href="${block.data.source}" target="_blank" rel="noopener noreferrer">${block.data.source}</a>
            </div>
          `;

          default:
            return `
            <div class="unsupported-block">
              <p>Unsupported block type: ${block.type}</p>
            </div>
          `;
        }
      })
      .join("");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Cover image */}
        {blog.cover_image_path && (
          <div className="md:w-1/4 h-48 md:h-auto">
            <img
              src={getImageUrl(blog.cover_image_path)}
              alt={blog.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        )}

        {/* Content */}
        <div className={`p-4 ${blog.cover_image_path ? "md:w-3/4" : "w-full"}`}>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-2">{blog.description}</p>
            </div>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                blog.published
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {blog.published ? "Published" : "Draft"}
            </span>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-2 mt-2 mb-3">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {blog.category || "General"}
            </span>
            {blog.tags &&
              blog.tags.length > 0 &&
              blog.tags
                .filter((tag) => tag !== null && tag !== "") // Filter out null/empty tags
                .map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
          </div>

          {/* Date and actions */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">
              {blog.created_at ? formatDate(blog.created_at) : "Recent"}
            </span>

            <div className="flex space-x-2">
              <button
                onClick={handlePreview}
                className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm transition-colors"
                title="Open preview in new window"
              >
                👁️ Preview
              </button>
              <button
                onClick={() => navigate(`/edit-blog/${blog.id}`)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                ✏️ Edit
              </button>
              <button
                onClick={onTogglePublish}
                className={`px-3 py-1 rounded text-sm ${
                  blog.published
                    ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {blog.published ? "📤 Unpublish" : "📢 Publish"}
              </button>
              <button
                onClick={onDelete}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
