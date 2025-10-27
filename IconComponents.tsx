import React from 'react';

export const ChatIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
  </svg>
);

export const ImageIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
  </svg>
);

export const BrainIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 3.5a5.5 5.5 0 00-5.5 5.5c0 1.258-.112 2.497-.323 3.7C3.58 15.423 4.73 17 6.208 17h7.584c1.477 0 2.628-1.577 2.03-4.3.211-1.203.323-2.442.323-3.7A5.5 5.5 0 0010 3.5zM8.5 14.5a.5.5 0 01-1 0v-2.5a.5.5 0 011 0v2.5zM10 12a.5.5 0 01-1 0V9.5a.5.5 0 011 0V12zm2.5-.5a.5.5 0 01-1 0v-2a.5.5 0 011 0v2zm-5-3.5a.5.5 0 01-1 0v-2a.5.5 0 011 0v2z" />
    <path d="M11 5a1 1 0 10-2 0v.5a1 1 0 102 0V5zM7.5 6.5a1 1 0 10-2 0v.5a1 1 0 102 0v-.5zm5 0a1 1 0 10-2 0v.5a1 1 0 102 0v-.5z" />
  </svg>
);

export const SendIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
  </svg>
);

export const SpinnerIcon: React.FC = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const FormulaIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.5 1a.5.5 0 000 1h9a.5.5 0 000-1h-9zM5 9a.5.5 0 000 1h3a.5.5 0 000-1H5zm0 2a.5.5 0 000 1h5a.5.5 0 000-1H5z" clipRule="evenodd" />
    </svg>
);

// Fix: Add missing PastPaperIcon component
export const PastPaperIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5"} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm2 4a1 1 0 100 2h4a1 1 0 100-2H8zm0 3a1 1 0 100 2h4a1 1 0 100-2H8zm0 3a1 1 0 100 2h4a1 1 0 100-2H8z" clipRule="evenodd" />
    </svg>
);