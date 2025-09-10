// Layout.js
import React from 'react';
import SidebarTest from './SidebarTest';

function TestLayout({ children }) {
  return (
    <div className="flex">
      <SidebarTest />
      <main className="ml-64 w-full min-h-screen bg-gray-100 p-6">
        {children}
      </main>
    </div>
  );
}

export default TestLayout;