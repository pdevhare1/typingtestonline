import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import BlogCollectionScreen from '../Blogs/BlogCollectionScreen';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { text: 'Test Your Typing Speed', link: '/' },
    { text: 'Typing Lessons', link: '/blogs' },
    // { text: 'Ranking - Virtual keyboard', link: '#' },
    // { text: 'Support project', link: '#' },
    { text: 'Contact', link: '/contactus' }
    // { text: 'Blog', link: '/blogs' },
    // { text: 'Creat Blog', link: '/createblog' }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full bg-gradient-to-b from-gray-100 to-gray-200 border-t border-b border-gray-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-center h-12">
          <ul className="flex space-x-4">
            {navItems.map((item, index) => (
              <React.Fragment key={item.text}>
                <li>
                  <a 
                    href={item.link} 
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm"
                  >
                    {item.text}
                  </a>
                </li>
                {index < navItems.length - 1 && (
                  <li className="text-gray-400">|</li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center justify-between h-12">
          <span className="text-gray-700 text-sm">Typing Speed</span>
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Items */}
        {isOpen && (
          <div className="md:hidden">
            <ul className="pb-4">
              {navItems.map((item) => (
                <li key={item.text} className="py-2">
                  <a
                    href={item.link}
                    className="block text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;