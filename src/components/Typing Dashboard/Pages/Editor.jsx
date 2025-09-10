// import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import EditorJS from '@editorjs/editorjs';
// import Header from '@editorjs/header';
// import List from '@editorjs/list';
// import Table from '@editorjs/table';
// import Quote from '@editorjs/quote';
// import ImageTool from '@editorjs/image';
// import Embed from '@editorjs/embed';

// export default function BlogEditorForm() {
//   const navigate = useNavigate();
//   const editorRef = useRef(null);
//   const editorInstanceRef = useRef(null);

//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('general');
//   const [tags, setTags] = useState('');
//   const [coverImage, setCoverImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [editorInitialized, setEditorInitialized] = useState(false);
//   const [metaTitle, setMetaTitle] = useState(''); // New state for meta title

//   // Initialize EditorJS when component mounts
//   useEffect(() => {
//     // Only initialize editor when the DOM element is available and editor hasn't been initialized yet
//     if (editorRef.current && !editorInstanceRef.current) {
//       // Small timeout to ensure DOM is fully ready
//       const initTimeoutId = setTimeout(() => {
//         try {
//           const editor = new EditorJS({
//             holder: editorRef.current,
//             tools: {
//               header: {
//                 class: Header,
//                 config: {
//                   placeholder: 'Enter a header',
//                   levels: [1, 2, 3, 4, 5, 6],
//                   defaultLevel: 2
//                 }
//               },
//               list: {
//                 class: List,
//                 inlineToolbar: true
//               },
//               table: {
//                 class: Table,
//                 inlineToolbar: true
//               },
//               quote: {
//                 class: Quote,
//                 inlineToolbar: true,
//                 config: {
//                   quotePlaceholder: 'Enter a quote',
//                   captionPlaceholder: 'Quote\'s author'
//                 }
//               },
//               image: {
//                 class: ImageTool,
//                 config: {
//                   uploader: {
//                     uploadByFile(file) {
//                       return new Promise((resolve) => {
//                         const reader = new FileReader();
//                         reader.onload = (e) => {
//                           resolve({
//                             success: 1,
//                             file: {
//                               url: e.target.result
//                             }
//                           });
//                         };
//                         reader.readAsDataURL(file);
//                       });
//                     }
//                   }
//                 }
//               },
//               embed: {
//                 class: Embed,
//                 inlineToolbar: true,
//                 config: {
//                   services: {
//                     youtube: true,
//                     vimeo: true
//                   }
//                 }
//               }
//             },
//             placeholder: 'Write your blog content here...',
//             autofocus: false,
//             data: {}
//           });

//           // Store the editor instance
//           editorInstanceRef.current = editor;

//           // Wait for editor to be ready
//           editor.isReady.then(() => {
//             setEditorInitialized(true);
//             console.log('Editor.js is ready');
//           }).catch(err => {
//             console.error('Editor.js initialization error:', err);
//           });
//         } catch (error) {
//           console.error('Failed to initialize Editor.js:', error);
//         }
//       }, 100); // Small delay to ensure DOM is ready

//       // Cleanup function
//       return () => {
//         clearTimeout(initTimeoutId);
//         // Check if editor exists and has a destroy method before calling it
//         if (editorInstanceRef.current && typeof editorInstanceRef.current.destroy === 'function') {
//           editorInstanceRef.current.destroy();
//         }
//         editorInstanceRef.current = null;
//       };
//     }
//   }, []);

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

//   const saveBlogToLocalStorage = (blogPost, isDraft = false) => {
//     // Get existing blogs from localStorage
//     const existingBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');

//     // Create a new blog object with all necessary fields
//     const newBlog = {
//       id: Date.now().toString(), // Use timestamp as unique ID
//       title: blogPost.title,
//       description: blogPost.description,
//       category: blogPost.category,
//       tags: blogPost.tags,
//       coverImage: blogPost.coverImage ? imagePreview : null, // Save the data URL
//       content: blogPost.content,
//       metaTitle: blogPost.metaTitle, // Add the meta title field
//       published: !isDraft,
//       createdAt: new Date().toISOString()
//     };

//     // Add new blog to existing blogs
//     const updatedBlogs = [newBlog, ...existingBlogs];

//     // Save to localStorage
//     localStorage.setItem('blogs', JSON.stringify(updatedBlogs));

//     return newBlog;
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
//           coverImage,
//           content: editorData,
//           metaTitle // Add meta title to blogPost object
//         };

//         // Save blog post to localStorage
//         saveBlogToLocalStorage(blogPost);

//         alert('Blog post published successfully!');
//         // Navigate to the all blogs page
//         navigate('/all-blogs');

//       } catch (error) {
//         console.error('Failed to save blog post:', error);
//         alert('Failed to save blog post. Please try again.');
//       }
//     } else {
//       console.error('Editor is not initialized');
//       alert('Editor is not initialized. Please try again.');
//     }
//   };

//   const saveDraft = async () => {
//     if (editorInstanceRef.current) {
//       try {
//         await editorInstanceRef.current.isReady;
//         const editorData = await editorInstanceRef.current.save();

//         const blogPost = {
//           title: title || 'Untitled Draft',
//           description,
//           category,
//           tags: tags.split(',').map(tag => tag.trim()),
//           coverImage,
//           content: editorData,
//           metaTitle // Add meta title to blogPost draft object
//         };

//         // Save as draft (published: false)
//         saveBlogToLocalStorage(blogPost, true);

//         alert('Draft saved successfully!');
//         navigate('/all-blogs');

//       } catch (error) {
//         console.error('Failed to save draft:', error);
//         alert('Failed to save draft. Please try again.');
//       }
//     } else {
//       console.error('Editor is not initialized');
//       alert('Editor is not initialized. Please try again.');
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-gray-50 flex justify-center">
//       <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md my-8">
//         <h1 className="text-2xl font-bold mb-6 text-center">Create New Blog Post</h1>

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

//           {/* New Meta Title input field */}
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="metaTitle">
//               Meta Title
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="metaTitle"
//               type="text"
//               placeholder="Enter blog URL"
//               value={metaTitle}
//               onChange={(e) => setMetaTitle(e.target.value)}
//             />
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
//               Publish Blog Post
//             </button>
//             <button
//               className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="button"
//               onClick={saveDraft}
//             >
//               Save as Draft
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import EditorJS from '@editorjs/editorjs';
// import Header from '@editorjs/header';
// import List from '@editorjs/list';
// import Table from '@editorjs/table';
// import Quote from '@editorjs/quote';
// import ImageTool from '@editorjs/image';
// import Embed from '@editorjs/embed';

// // API URL from environment variables
// const API_URL = process.env.REACT_APP_API_URL || 'https://api.typingtestonline.in/api';

// export default function BlogEditorForm() {
//   const navigate = useNavigate();
//   const editorRef = useRef(null);
//   const editorInstanceRef = useRef(null);

//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('general');
//   const [tags, setTags] = useState('');
//   const [coverImage, setCoverImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [editorInitialized, setEditorInitialized] = useState(false);
//   const [metaTitle, setMetaTitle] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState(null);

//   // Initialize EditorJS when component mounts
//   useEffect(() => {
//     let editor = null;

//     const initEditor = async () => {
//       if (!editorRef.current) return;

//       try {
//         // Destroy existing instance if it exists
//         if (editorInstanceRef.current) {
//           await editorInstanceRef.current.isReady;
//           editorInstanceRef.current.destroy();
//           editorInstanceRef.current = null;
//         }

//         // Create new instance
//         editor = new EditorJS({
//           holder: 'editorjs-container',
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
//           data: {}
//         });

//         editorInstanceRef.current = editor;

//         editor.isReady
//           .then(() => {
//             setEditorInitialized(true);
//             console.log('Editor.js is ready');
//           })
//           .catch((error) => {
//             console.error('Editor.js initialization error:', error);
//             setError('Failed to initialize editor. Please refresh the page.');
//           });
//       } catch (error) {
//         console.error('Failed to initialize Editor.js:', error);
//         setError('Failed to initialize editor. Please refresh the page.');
//       }
//     };

//     // Initialize editor with a short delay to ensure DOM is ready
//     const timeoutId = setTimeout(() => {
//       initEditor();
//     }, 100);

//     // Cleanup function
//     return () => {
//       clearTimeout(timeoutId);
//       if (editorInstanceRef.current && typeof editorInstanceRef.current.destroy === 'function') {
//         editorInstanceRef.current.destroy();
//         editorInstanceRef.current = null;
//       }
//     };
//   }, []); // Empty dependency array to run only once

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

//   const saveBlogToDatabase = async (blogPost, isDraft = false) => {
//     try {
//       setIsSubmitting(true);
//       setError(null);

//       // Prepare data for API
//       const blogData = {
//         title: blogPost.title,
//         description: blogPost.description,
//         category: blogPost.category,
//         tags: blogPost.tags,
//         coverImage: imagePreview, // Send base64 image data
//         content: blogPost.content,
//         metaTitle: blogPost.metaTitle,
//         published: !isDraft
//       };

//       // Send to API
//       const response = await fetch(`${API_URL}/blogs`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(blogData),
//         credentials: 'include' // Include cookies if using sessions
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to save blog post');
//       }

//       return await response.json();
//     } catch (error) {
//       console.error('Error saving to database:', error);
//       setError(error.message);
//       throw error;
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Fallback to save in localStorage if API call fails
//   const saveBlogToLocalStorage = (blogPost, isDraft = false) => {
//     // Get existing blogs from localStorage
//     const existingBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');

//     // Create a new blog object with all necessary fields
//     const newBlog = {
//       id: Date.now().toString(), // Use timestamp as unique ID
//       title: blogPost.title,
//       description: blogPost.description,
//       category: blogPost.category,
//       tags: blogPost.tags,
//       coverImage: blogPost.coverImage ? imagePreview : null, // Save the data URL
//       content: blogPost.content,
//       metaTitle: blogPost.metaTitle,
//       published: !isDraft,
//       createdAt: new Date().toISOString()
//     };

//     // Add new blog to existing blogs
//     const updatedBlogs = [newBlog, ...existingBlogs];

//     // Save to localStorage
//     localStorage.setItem('blogs', JSON.stringify(updatedBlogs));

//     return newBlog;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!editorInstanceRef.current) {
//       setError('Editor is not initialized. Please refresh the page.');
//       return;
//     }

//     if (!title.trim()) {
//       setError('Blog title is required');
//       return;
//     }

//     try {
//       // Wait for editor to be ready
//       await editorInstanceRef.current.isReady;
//       const editorData = await editorInstanceRef.current.save();

//       // Create a complete blog post object
//       const blogPost = {
//         title,
//         description,
//         category,
//         tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag), // Filter out empty tags
//         coverImage,
//         content: editorData,
//         metaTitle
//       };

//       try {
//         // First try to save to database
//         await saveBlogToDatabase(blogPost);
//         alert('Blog post published successfully!');
//         navigate('/all-blogs');
//       } catch (error) {
//         console.warn('Saving to database failed, using localStorage as fallback');
//         saveBlogToLocalStorage(blogPost);
//         alert('Database connection failed. Blog saved locally instead.');
//         navigate('/all-blogs');
//       }
//     } catch (error) {
//       console.error('Failed to save blog post:', error);
//       setError('Failed to save blog post. Please try again.');
//     }
//   };

//   const saveDraft = async () => {
//     if (!editorInstanceRef.current) {
//       setError('Editor is not initialized. Please refresh the page.');
//       return;
//     }

//     try {
//       await editorInstanceRef.current.isReady;
//       const editorData = await editorInstanceRef.current.save();

//       const blogPost = {
//         title: title.trim() || 'Untitled Draft',
//         description,
//         category,
//         tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
//         coverImage,
//         content: editorData,
//         metaTitle
//       };

//       try {
//         // First try to save to database as draft
//         await saveBlogToDatabase(blogPost, true);
//         alert('Draft saved successfully!');
//         navigate('/all-blogs');
//       } catch (error) {
//         // If database save fails, save to localStorage as fallback
//         console.warn('Saving to database failed, using localStorage as fallback');
//         saveBlogToLocalStorage(blogPost, true);
//         alert('Database connection failed. Draft saved locally instead.');
//         navigate('/all-blogs');
//       }
//     } catch (error) {
//       console.error('Failed to save draft:', error);
//       setError('Failed to save draft. Please try again.');
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-gray-50 flex justify-center">
//       <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md my-8">
//         <h1 className="text-2xl font-bold mb-6 text-center">Create New Blog Post</h1>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             <p>{error}</p>
//           </div>
//         )}

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

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="metaTitle">
//               Meta Title
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="metaTitle"
//               type="text"
//               placeholder="Enter meta title for SEO"
//               value={metaTitle}
//               onChange={(e) => setMetaTitle(e.target.value)}
//             />
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
//               className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
//               type="submit"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? 'Publishing...' : 'Publish Blog Post'}
//             </button>
//             <button
//               className={`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
//               type="button"
//               onClick={saveDraft}
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? 'Saving...' : 'Save as Draft'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  // Initialize EditorJS when component mounts
  useEffect(() => {
    // Only initialize editor when the DOM element is available and editor hasn't been initialized yet
    if (editorRef.current && !editorInstanceRef.current) {
      // Small timeout to ensure DOM is fully ready
      const initTimeoutId = setTimeout(() => {
        try {
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
            data: {},
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
  }, []);

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

      // Send data to server and log for debugging
      console.log("Sending blog data to server:", {
        url: `${API_URL}/blogs/create`,
        title: blogData.title,
        description: blogData.description,
        category: blogData.category,
        tags: blogData.tags,
        hasImage: !!blogData.coverImage,
      });

      const response = await axios.post(`${API_URL}/blogs/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error saving blog:", error);
      console.error("Error details:", error.response?.data || error.message);
      setError(
        error.response?.data?.message ||
          "Failed to save blog. Please try again."
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
        console.log("Starting blog submission...");

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

        alert("Blog post published successfully!");
        console.log("Blog published with ID:", result.blogId);

        // Navigate to the all blogs page
        navigate("/all-blogs");
      } catch (error) {
        console.error("Failed to save blog post:", error);
        alert(
          error?.response?.data?.message ||
            "Failed to save blog post. Please try again."
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
        console.log("Starting draft save...");

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

        alert("Draft saved successfully!");
        console.log("Draft saved with ID:", result.blogId);

        navigate("/all-blogs");
      } catch (error) {
        console.error("Failed to save draft:", error);
        alert(
          error?.response?.data?.message ||
            "Failed to save draft. Please try again."
        );
      }
    } else {
      console.error("Editor is not initialized");
      alert("Editor is not initialized. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md my-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create New Blog Post
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
              {isSubmitting ? "Publishing..." : "Publish Blog Post"}
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={saveDraft}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save as Draft"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
