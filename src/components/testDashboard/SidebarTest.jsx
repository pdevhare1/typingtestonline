// Sidebar.js
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function SidebarTest() {
  const location = useLocation();
  
  // Navigation items with icons
  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: '📊' },
    { path: '/create', name: 'Create Blog', icon: '✏️' },
    { path: '/blogss', name: 'All Blogs', icon: '📚' }
  ];

  return (
    <div className="w-64 bg-gray-800 text-white h-screen fixed left-0 top-0 shadow-lg">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Blog Admin</h1>
      </div>
      <nav className="mt-6">
        <ul>
          {navItems.map((item) => (
            <li key={item.path} className="mb-2">
              <NavLink 
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default SidebarTest;