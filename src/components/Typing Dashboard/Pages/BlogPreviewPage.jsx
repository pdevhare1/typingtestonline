import React from "react";

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
          <div key={index} className="overflow-x-auto mb-4">
            <table className="min-w-full border-collapse border border-gray-300">
              <tbody>
                {block.data.content.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={rowIndex === 0 ? "bg-gray-100" : ""}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="border border-gray-300 px-4 py-2 text-gray-800"
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

export default function BlogPreview({ blog, onClose }) {
  if (!blog) return null;

  // Get proper image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("data:") || imagePath.startsWith("http")) {
      return imagePath;
    }
    return `${API_URL.replace("/api", "")}/${imagePath}`;
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Blog Preview</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Blog Content */}
        <div className="px-6 py-8">
          {/* Blog Header */}
          <div className="mb-8">
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
              <span className="flex items-center">
                <svg
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {blog.created_at
                  ? formatDate(blog.created_at)
                  : "Recently created"}
              </span>

              <span className="flex items-center">
                <svg
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                {blog.category || "General"}
              </span>

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

            {/* Description */}
            {blog.description && (
              <p className="text-xl text-gray-600 leading-relaxed mb-6 font-light">
                {blog.description}
              </p>
            )}

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {blog.tags
                  .filter((tag) => tag !== null && tag !== "")
                  .map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <hr className="border-gray-200 mb-8" />

          {/* Blog Content */}
          <div className="prose-lg">
            <BlogContentRenderer content={parsedContent} />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
