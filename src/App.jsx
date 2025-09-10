// // import './App.css';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Outlet,
// } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useState } from 'react';

// // Public Components
// import MainHeader from "./components/Headers/MainHeader";
// import Header from "./components/Headers/Header";
// import Footer from "./components/Footer/Footer";
// import PrivacyPolicy from "./components/Policies/PrivacyPolicy";
// import Disclaimer from "./components/Policies/Disclaimer";
// import TermsAndConditions from "./components/Policies/TermsAndConditions";
// import HomePage1 from "./components/TestLayout/Homepage";
// import Result from "./components/TestLayout/Result";
// import BlogCollectionScreen from "./components/Blogs/BlogCollectionScreen";
// import BlogPostDetailScreen from "./components/Blogs/BlogPostDetailScreen";
// import ContactUs from "./components/pages/ContactUs";

// // Admin Components
// import SideBar from './components/Typing Dashboard/Sidebar/SideBar';
// import Dashboard from './components/Typing Dashboard/Pages/Dashboard';
// import CreateBlog from './components/Typing Dashboard/Pages/CreateBlog';
// import Editor from './components/Typing Dashboard/Pages/Editor';
// import EditBlog from './components/Typing Dashboard/Pages/EditBlog';
// import BlogCard from './components/Typing Dashboard/Pages/BlogCard';
// import BlogPreview from './components/Typing Dashboard/Pages/BlogPreviewPage';
// import Login from './components/Typing Dashboard/Pages/Login/Login';
// import AllBlogs from './components/Typing Dashboard/Pages/AllBlogs';

// const fetchBlogById = async (id) => {
//   // Placeholder implementation for demonstration
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         id,
//         title: 'Sample Blog Post',
//         content: {
//           blocks: [
//             {
//               type: 'header',
//               data: { text: 'Welcome to this Sample Blog Post', level: 1 }
//             },
//             {
//               type: 'paragraph',
//               data: { text: 'This is a sample blog post to demonstrate the preview functionality.' }
//             },
//             // Add more blocks as needed
//           ]
//         },
//         coverImage: '/api/placeholder/800/400',
//         createdAt: new Date().toISOString(),
//         category: 'Technology',
//         tags: ['React', 'JavaScript', 'Web Development'],
//         published: false
//       });
//     }, 500);
//   });
// };

// // Layout for public pages
// const PublicLayout = () => (
//   <>
//     <MainHeader />
//     <Header />
//     <Outlet />
//     <Footer />
//   </>
// );

// // Admin Layout Component
// const AdminLayout = ({ user, onLogin }) => {
//   const handleDelete = (id) => {
//     console.log('Delete blog with id:', id);
//   };

//   const handleTogglePublish = (id) => {
//     console.log('Toggle publish status for blog with id:', id);
//   };

//   // If user is not logged in, show the login page
//   if (!user) {
//     return <Login onLogin={onLogin} />;
//   }

//   return (
//     <SideBar>
//       <Routes>
//         <Route path="/admin" element={<Dashboard />} />
//         <Route path="/admin/create-blog" element={<Editor />} />
//         <Route path="/admin/all-blogs" element={<AllBlogs />} />
//         <Route path="/admin/edit-blog/:id" element={<EditBlog />} />
//         <Route 
//           path="/admin/preview-blog/:id" 
//           element={<BlogPreview fetchBlogById={fetchBlogById} />} 
//         />
//       </Routes>
//     </SideBar>
//   );
// };

// function App() {
//   const [user, setUser] = useState(null);
  
//   const handleLogin = (userData) => {
//     setUser(userData);
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* Public Layout routes */}
//         <Route element={<PublicLayout />}>
//           <Route path="/" element={<HomePage1 />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/disclaimer" element={<Disclaimer />} />
//           <Route path="/termsandconditions" element={<TermsAndConditions />} />
//           <Route path="/result" element={<Result />} />
//           <Route path="/blogs" element={<BlogCollectionScreen />} />
//           <Route path="/blog/:id" element={<BlogPostDetailScreen />} />
//           <Route path="/contactus" element={<ContactUs />} />
//         </Route>
        
//         {/* Admin Layout routes */}
//         <Route 
//           path="/admin/*" 
//           element={<AdminLayout user={user} onLogin={handleLogin} />} 
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import {
 BrowserRouter as Router,
 Routes,
 Route,
 Outlet,
} from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import "bootstrap/dist/css/bootstrap.min.css";
import MainHeader from "./components/Headers/MainHeader";
import Header from "./components/Headers/Header";
import Footer from "./components/Footer/Footer";
import PrivacyPolicy from "./components/Policies/PrivacyPolicy";
import Disclaimer from "./components/Policies/Disclaimer";
import TermsAndConditions from "./components/Policies/TermsAndConditions";
import HomePage1 from "./components/TestLayout/Homepage";
import Result from "./components/TestLayout/Result";
// import DashboardLayout from "./components/Dashboard/Layout/DashboardLayout";
import BlogCollectionScreen from "./components/Blogs/BlogCollectionScreen";
import BlogPostDetailScreen from "./components/Blogs/BlogPostDetailScreen";
// import BlogCreationScreen from "./components/Blogs/BlogCreationScreen";
import ContactUs from "./components/pages/ContactUs";

// Layout for public pages
const PublicLayout = () => (
 <>
   <MainHeader />
   <Header />
   <Outlet />
   <Footer />
 </>
);

function App() {
 return (
   <HelmetProvider>
     <Router>
       <Routes>
         {/* Layout route wrapping public pages */}
         <Route element={<PublicLayout />}>
           <Route path="/" element={<HomePage1 />} />
           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
           <Route path="/disclaimer" element={<Disclaimer />} />
           <Route path="/termsandconditions" element={<TermsAndConditions />} />
           <Route path="/result" element={<Result />} />
           <Route path="/blogs" element={<BlogCollectionScreen />} />
           <Route path="/blog/:id" element={<BlogPostDetailScreen />} />
           <Route path="/contactus" element={<ContactUs />} />
         </Route>
       </Routes>
     </Router>
   </HelmetProvider>
 );
}

export default App;