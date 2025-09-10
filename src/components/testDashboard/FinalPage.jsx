// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TestLayout from './TestLayout';
import Dashboard from './Dashboard';
import CreateBlog from './CreateBlog';
import AllBlogs from './AllBlogs';

function FinalPage() {
  return (
      <TestLayout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </TestLayout>
  );
}

export default FinalPage;