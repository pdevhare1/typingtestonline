import React from 'react';
import { Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const topLinks = [
    { text: 'Privacy Policy', href: '/privacy-policy' },
    { text: 'Contact', href: '/contactus' },
    { text: 'Terms & Conditions', href: '/termsandconditions' },
    { text: 'Disclaimer', href: '/disclaimer' }
  ];

  // const bottomLinks = [
  //   { text: 'Privacy statement', href: '#' },
  //   { text: 'Disclaimer', href: '#' },
  //   { text: 'Contact / Imprint', href: '#' }
  // ];

  return (
    <footer className="w-full bg-gradient-to-b from-gray-100 to-gray-200 border-t border-gray-300 py-4">
      <div className="max-w-4xl mx-auto px-4">
        {/* Top Links */}
        <div className="flex flex-wrap justify-center gap-2 mb-3">
          {topLinks.map((link, index) => (
            <React.Fragment key={link.text}>
              <a 
                href={link.href}
                className="text-blue-700 hover:text-blue-900 text-sm"
              >
                {link.text}
              </a>
              {index < topLinks.length - 1 && (
                <span className="text-gray-400">|</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bottom Links */}
        {/* <div className="flex flex-wrap justify-center gap-2 mb-4">
          {bottomLinks.map((link, index) => (
            <React.Fragment key={link.text}>
              <a 
                href={link.href}
                className="text-blue-700 hover:text-blue-900 text-sm"
              >
                {link.text}
              </a>
              {index < bottomLinks.length - 1 && (
                <span className="text-gray-400">|</span>
              )}
            </React.Fragment>
          ))}
        </div> */}

        {/* Social Media and Copyright */}
        <div className="flex flex-col items-center gap-3">
          {/* <div className="flex gap-4">
            <a href="#" className="text-blue-700 hover:text-blue-900">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-blue-700 hover:text-blue-900">
              <Twitter size={24} />
            </a>
          </div> */}
          
          <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-600">
            <span>Copyright © Typing Test Online 2025.</span>
            <span>All rights reserved.</span>
            {/* <a href="#" className="text-blue-700 hover:text-blue-900">
              Privacy settings
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;