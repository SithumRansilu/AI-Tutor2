import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-4 px-6 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
          A/L Physics & Maths AI Tutor
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">Your AI Study Partner for Sri Lankan A/L</p>
      </div>
    </header>
  );
};

export default Header;