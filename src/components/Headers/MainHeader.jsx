import React from "react";
import { Link } from "react-router-dom";

const MainHeader = () => {
  return (
    <header className="w-full bg-gradient-to-b from-[#E8EDDF] to-[#CFDBD5] h-24 flex items-center justify-center shadow-m">
      <div className="relative">
        <h1 className="text-4xl font-semibold">
          <Link to="/">
            <span className="text-[#1a2481]">Typing</span>
            <span className="text-[#34a777]"> Test Online</span>
          </Link>
        </h1>
        {/* Add text shadow effect */}
        <div className="absolute -bottom-0 left-0 w-full text-4xl font-semibold text-transparent blur-[1px]">
          <Link to="/">
            <span className="text-[#1a2481]">Typing</span>
            <span className="text-[#34a777]"> Test Online</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
