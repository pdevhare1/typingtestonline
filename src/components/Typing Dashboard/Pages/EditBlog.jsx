// // EditBlog.js - Component to edit existing blog posts
// import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import EditorJS from '@editorjs/editorjs';
// import Header from '@editorjs/header';
// import List from '@editorjs/list';
// import Table from '@editorjs/table';
// import Quote from '@editorjs/quote';
// import ImageTool from '@editorjs/image';
// import Embed from '@editorjs/embed';

// export default function EditBlog() {
//   const navigate = useNavigate();
//   const { id } = useParams(); // Get blog ID from URL params
//   const editorRef = useRef(null);
//   const editorInstanceRef = useRef(null);

//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('general');
//   const [tags, setTags] = useState('');
//   const [coverImage, setCoverImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [editorInitialized, setEditorInitialized] = useState(false);
//   const [blogLoaded, setBlogLoaded] = useState(false);

//   // Load existing blog data
//   useEffect(() => {
//     const loadBlogData = () => {
//       try {
//         // Get blogs from localStorage
//         const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');

//         // Find the blog with the matching ID
//         const blog = blogs.find(blog => blog.id === id);

//         if (blog) {
//           // Set form values with existing blog data
//           setTitle(blog.title);
//           setDescription(blog.description || '');
//           setCategory(blog.category || 'general');
//           setTags(Array.isArray(blog.tags) ? blog.tags.join(', ') : '');

//           // Set image preview if there's a cover image
//           if (blog.coverImage) {
//             setImagePreview(blog.coverImage);
//           }

//           // Mark blog as loaded so we can initialize editor with content
//           setBlogLoaded(true);

//           return blog.content; // Return content for editor initialization
//         } else {
//           // Blog not found, redirect to all blogs
//           alert('Blog post not found');
//           navigate('/all-blogs');
//           return null;
//         }
//       } catch (error) {
//         console.error('Failed to load blog data:', error);
//         alert('Failed to load blog data');
//         navigate('/all-blogs');
//         return null;
//       }
//     };

//     loadBlogData();
//   }, [id, navigate]);

//   // Initialize EditorJS when component mounts and blog data is loaded
//   useEffect(() => {
//     if (blogLoaded && editorRef.current && !editorInstanceRef.current) {
//       // Get blogs from localStorage
//       const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');

//       // Find the blog with the matching ID
//       const blog = blogs.find(blog => blog.id === id);

//       if (blog) {
//         initializeEditor(blog.content);
//       }
//     }
//   }, [blogLoaded, id]);

//   // Function to initialize editor with content
//   const initializeEditor = (content) => {
//     // Small timeout to ensure DOM is fully ready
//     const initTimeoutId = setTimeout(() => {
//       try {
//         const editor = new EditorJS({
//           holder: editorRef.current,
//           tools: {
//             header: {
//               class: Header,
//               config: {
//                 placeholder: 'Enter a header',
//                 levels: [1, 2, 3, 4, 5, 6],
//                 defaultLevel: 2
//               }
//             },
//             list: {
//               class: List,
//               inlineToolbar: true
//             },
//             table: {
//               class: Table,
//               inlineToolbar: true
//             },
//             quote: {
//               class: Quote,
//               inlineToolbar: true,
//               config: {
//                 quotePlaceholder: 'Enter a quote',
//                 captionPlaceholder: 'Quote\'s author'
//               }
//             },
//             image: {
//               class: ImageTool,
//               config: {
//                 uploader: {
//                   uploadByFile(file) {
//                     return new Promise((resolve) => {
//                       const reader = new FileReader();
//                       reader.onload = (e) => {
//                         resolve({
//                           success: 1,
//                           file: {
//                             url: e.target.result
//                           }
//                         });
//                       };
//                       reader.readAsDataURL(file);
//                     });
//                   }
//                 }
//               }
//             },
//             embed: {
//               class: Embed,
//               inlineToolbar: true,
//               config: {
//                 services: {
//                   youtube: true,
//                   vimeo: true
//                 }
//               }
//             }
//           },
//           placeholder: 'Write your blog content here...',
//           autofocus: false,
//           data: content || {} // Set initial data if available
//         });

//         // Store the editor instance
//         editorInstanceRef.current = editor;

//         // Wait for editor to be ready
//         editor.isReady.then(() => {
//           setEditorInitialized(true);
//           console.log('Editor.js is ready');
//         }).catch(err => {
//           console.error('Editor.js initialization error:', err);
//         });
//       } catch (error) {
//         console.error('Failed to initialize Editor.js:', error);
//       }
//     }, 100); // Small delay to ensure DOM is ready

//     // Cleanup function
//     return () => {
//       clearTimeout(initTimeoutId);
//       // Check if editor exists and has a destroy method before calling it
//       if (editorInstanceRef.current && typeof editorInstanceRef.current.destroy === 'function') {
//         editorInstanceRef.current.destroy();
//       }
//       editorInstanceRef.current = null;
//     };
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setCoverImage(file);

//       // Create preview URL
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const updateBlogInLocalStorage = async (blogPost) => {
//     // Get existing blogs from localStorage
//     const existingBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');

//     // Find the index of the blog to update
//     const blogIndex = existingBlogs.findIndex(blog => blog.id === id);

//     if (blogIndex === -1) {
//       throw new Error('Blog not found');
//     }

//     // Get the current blog to preserve some values
//     const currentBlog = existingBlogs[blogIndex];

//     // Create an updated blog object
//     const updatedBlog = {
//       ...currentBlog,
//       title: blogPost.title,
//       description: blogPost.description,
//       category: blogPost.category,
//       tags: blogPost.tags,
//       // Only update coverImage if a new one was selected
//       coverImage: imagePreview || currentBlog.coverImage,
//       content: blogPost.content,
//       // Preserve the published status
//       published: currentBlog.published,
//       // Add updated timestamp
//       updatedAt: new Date().toISOString()
//     };

//     // Update the blog in the array
//     existingBlogs[blogIndex] = updatedBlog;

//     // Save to localStorage
//     localStorage.setItem('blogs', JSON.stringify(existingBlogs));

//     return updatedBlog;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (editorInstanceRef.current) {
//       try {
//         // Use isReady promise to ensure editor is fully initialized before saving
//         await editorInstanceRef.current.isReady;
//         const editorData = await editorInstanceRef.current.save();

//         // Create a complete blog post object
//         const blogPost = {
//           title,
//           description,
//           category,
//           tags: tags.split(',').map(tag => tag.trim()),
//           content: editorData
//         };

//         // Update blog post in localStorage
//         await updateBlogInLocalStorage(blogPost);

//         alert('Blog post updated successfully!');
//         // Navigate to the all blogs page
//         navigate('/all-blogs');

//       } catch (error) {
//         console.error('Failed to update blog post:', error);
//         alert('Failed to update blog post. Please try again.');
//       }
//     } else {
//       console.error('Editor is not initialized');
//       alert('Editor is not initialized. Please try again.');
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-gray-50 flex justify-center">
//       <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md my-8">
//         <h1 className="text-2xl font-bold mb-6 text-center">Edit Blog Post</h1>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
//               Blog Title
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="title"
//               type="text"
//               placeholder="Enter blog title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//               Short Description
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="description"
//               type="text"
//               placeholder="Enter a short description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
//               Category
//             </label>
//             <select
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//             >
//               <option value="general">General</option>
//               <option value="technology">Technology</option>
//               <option value="lifestyle">Lifestyle</option>
//               <option value="travel">Travel</option>
//               <option value="food">Food</option>
//               <option value="health">Health</option>
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverImage">
//               Cover Image
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="coverImage"
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//             />
//             {imagePreview && (
//               <div className="mt-2">
//                 <img
//                   src={imagePreview}
//                   alt="Cover preview"
//                   className="h-40 object-cover rounded"
//                 />
//               </div>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Blog Content
//             </label>
//             <div className="border border-gray-300 rounded-lg p-4">
//               <div
//                 id="editorjs-container"
//                 ref={editorRef}
//                 className="min-h-64 bg-white"
//               />
//               {!editorInitialized && (
//                 <div className="flex justify-center items-center h-16 text-gray-500">
//                   Initializing editor...
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
//               Tags (comma separated)
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="tags"
//               type="text"
//               placeholder="tag1, tag2, tag3"
//               value={tags}
//               onChange={(e) => setTags(e.target.value)}
//             />
//           </div>

//           <div className="flex items-center justify-between">
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="submit"
//             >
//               Save Changes
//             </button>
//             <button
//               className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="button"
//               onClick={() => navigate('/all-blogs')}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Table from "@editorjs/table";
import Quote from "@editorjs/quote";
import ImageTool from "@editorjs/image";
import Embed from "@editorjs/embed";

// API base URL - direct API URL without environment variables
const API_URL = "https://api.typingtestonline.in/api";

export default function BlogEditorForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get blog ID from URL parameters
  const editorRef = useRef(null);
  const editorInstanceRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editorInitialized, setEditorInitialized] = useState(false);
  const [metaTitle, setMetaTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [blogData, setBlogData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Check if we're in edit mode
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchBlogData(id);
    }
  }, [id]);

  // Fetch existing blog data for editing
  const fetchBlogData = async (blogId) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Fetching blog data for ID:", blogId);
      const response = await axios.get(`${API_URL}/blogs/${blogId}`);

      if (response.data.success) {
        const blog = response.data.blog;
        setBlogData(blog);

        // Set form fields
        setTitle(blog.title || "");
        setDescription(blog.description || "");
        setCategory(blog.category || "general");
        setMetaTitle(blog.meta_title || "");

        // Set tags
        if (blog.tags && Array.isArray(blog.tags)) {
          setTags(blog.tags.filter((tag) => tag !== null).join(", "));
        }

        // Set cover image preview if exists
        if (blog.cover_image_path) {
          setImagePreview(
            `${API_URL.replace("/api", "")}/${blog.cover_image_path}`
          );
        }

        console.log("Blog data loaded:", blog);
      } else {
        setError("Failed to load blog data");
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      setError("Failed to load blog data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Initialize EditorJS when component mounts
  useEffect(() => {
    // Only initialize editor when the DOM element is available and editor hasn't been initialized yet
    if (editorRef.current && !editorInstanceRef.current) {
      // Small timeout to ensure DOM is fully ready
      const initTimeoutId = setTimeout(() => {
        try {
          // Prepare initial data for editor
          let initialData = {};
          if (isEditMode && blogData && blogData.content) {
            initialData = blogData.content;
          }

          const editor = new EditorJS({
            holder: editorRef.current,
            tools: {
              header: {
                class: Header,
                config: {
                  placeholder: "Enter a header",
                  levels: [1, 2, 3, 4, 5, 6],
                  defaultLevel: 2,
                },
              },
              list: {
                class: List,
                inlineToolbar: true,
              },
              table: {
                class: Table,
                inlineToolbar: true,
              },
              quote: {
                class: Quote,
                inlineToolbar: true,
                config: {
                  quotePlaceholder: "Enter a quote",
                  captionPlaceholder: "Quote's author",
                },
              },
              image: {
                class: ImageTool,
                config: {
                  uploader: {
                    uploadByFile(file) {
                      return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          resolve({
                            success: 1,
                            file: {
                              url: e.target.result,
                            },
                          });
                        };
                        reader.readAsDataURL(file);
                      });
                    },
                  },
                },
              },
              embed: {
                class: Embed,
                inlineToolbar: true,
                config: {
                  services: {
                    youtube: true,
                    vimeo: true,
                  },
                },
              },
            },
            placeholder: "Write your blog content here...",
            autofocus: false,
            data: initialData,
          });

          // Store the editor instance
          editorInstanceRef.current = editor;

          // Wait for editor to be ready
          editor.isReady
            .then(() => {
              setEditorInitialized(true);
              console.log("Editor.js is ready");
            })
            .catch((err) => {
              console.error("Editor.js initialization error:", err);
            });
        } catch (error) {
          console.error("Failed to initialize Editor.js:", error);
        }
      }, 100); // Small delay to ensure DOM is ready

      // Cleanup function
      return () => {
        clearTimeout(initTimeoutId);
        // Check if editor exists and has a destroy method before calling it
        if (
          editorInstanceRef.current &&
          typeof editorInstanceRef.current.destroy === "function"
        ) {
          editorInstanceRef.current.destroy();
        }
        editorInstanceRef.current = null;
      };
    }
  }, [blogData, isEditMode]); // Re-initialize when blog data is loaded in edit mode

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

  // Function to send blog data to the backend
  const sendBlogToServer = async (blogData, isDraft = false) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Create form data for multipart/form-data (for image upload)
      const formData = new FormData();

      // Add all blog data to form data
      formData.append("title", blogData.title);
      formData.append("description", blogData.description || "");
      formData.append("category", blogData.category || "general");
      formData.append("content", JSON.stringify(blogData.content));
      formData.append("metaTitle", blogData.metaTitle || "");
      formData.append("published", !isDraft);

      // Add tags as JSON string
      formData.append("tags", JSON.stringify(blogData.tags));

      // Add cover image if exists
      if (blogData.coverImage) {
        formData.append("coverImage", blogData.coverImage);
      }

      // Determine API endpoint and method based on edit mode
      const url = isEditMode
        ? `${API_URL}/blogs/${id}`
        : `${API_URL}/blogs/create`;
      const method = isEditMode ? "put" : "post";

      // Send data to server and log for debugging
      console.log(`${isEditMode ? "Updating" : "Creating"} blog data:`, {
        url,
        title: blogData.title,
        description: blogData.description,
        category: blogData.category,
        tags: blogData.tags,
        hasImage: !!blogData.coverImage,
      });

      const response = await axios[method](url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error ${isEditMode ? "updating" : "saving"} blog:`, error);
      console.error("Error details:", error.response?.data || error.message);
      setError(
        error.response?.data?.message ||
          `Failed to ${isEditMode ? "update" : "save"} blog. Please try again.`
      );
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      setError("Blog title is required");
      return;
    }

    if (editorInstanceRef.current) {
      try {
        console.log(`Starting blog ${isEditMode ? "update" : "submission"}...`);

        // Use isReady promise to ensure editor is fully initialized before saving
        await editorInstanceRef.current.isReady;
        const editorData = await editorInstanceRef.current.save();

        console.log("Editor data:", editorData);

        // Create a complete blog post object
        const blogPost = {
          title,
          description,
          category,
          tags: tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0),
          coverImage,
          content: editorData,
          metaTitle,
        };

        // Send blog post to server
        const result = await sendBlogToServer(blogPost, false);

        alert(
          `Blog post ${isEditMode ? "updated" : "published"} successfully!`
        );
        console.log(
          `Blog ${isEditMode ? "updated" : "published"} with ID:`,
          result.blogId || id
        );

        // Navigate to the all blogs page
        navigate("/all-blogs");
      } catch (error) {
        console.error(
          `Failed to ${isEditMode ? "update" : "save"} blog post:`,
          error
        );
        alert(
          error?.response?.data?.message ||
            `Failed to ${
              isEditMode ? "update" : "save"
            } blog post. Please try again.`
        );
      }
    } else {
      console.error("Editor is not initialized");
      alert("Editor is not initialized. Please try again.");
    }
  };

  const saveDraft = async () => {
    if (editorInstanceRef.current) {
      try {
        console.log(`Starting draft ${isEditMode ? "update" : "save"}...`);

        await editorInstanceRef.current.isReady;
        const editorData = await editorInstanceRef.current.save();

        const blogPost = {
          title: title || "Untitled Draft",
          description,
          category,
          tags: tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0),
          coverImage,
          content: editorData,
          metaTitle,
        };

        // Save as draft on server
        const result = await sendBlogToServer(blogPost, true);

        alert(`Draft ${isEditMode ? "updated" : "saved"} successfully!`);
        console.log(
          `Draft ${isEditMode ? "updated" : "saved"} with ID:`,
          result.blogId || id
        );

        navigate("/all-blogs");
      } catch (error) {
        console.error(
          `Failed to ${isEditMode ? "update" : "save"} draft:`,
          error
        );
        alert(
          error?.response?.data?.message ||
            `Failed to ${
              isEditMode ? "update" : "save"
            } draft. Please try again.`
        );
      }
    } else {
      console.error("Editor is not initialized");
      alert("Editor is not initialized. Please try again.");
    }
  };

  // Show loading spinner while fetching data in edit mode
  if (isEditMode && loading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md my-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isEditMode ? "Edit Blog Post" : "Create New Blog Post"}
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
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
              <option value="health">Health</option>
              <option value="business">Business</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="coverImage"
            >
              Cover Image{" "}
              {isEditMode &&
                imagePreview &&
                !coverImage &&
                "(Current image will be kept if no new image is selected)"}
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
            <div className="border border-gray-300 rounded-lg p-4">
              <div
                id="editorjs-container"
                ref={editorRef}
                className="min-h-64 bg-white"
              />
              {!editorInitialized && (
                <div className="flex justify-center items-center h-16 text-gray-500">
                  Initializing editor...
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="metaTitle"
            >
              Meta Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="metaTitle"
              type="text"
              placeholder="Enter SEO-friendly title"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="tags"
            >
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
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? isEditMode
                  ? "Updating..."
                  : "Publishing..."
                : isEditMode
                ? "Update Blog Post"
                : "Publish Blog Post"}
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={saveDraft}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : isEditMode
                ? "Update as Draft"
                : "Save as Draft"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
