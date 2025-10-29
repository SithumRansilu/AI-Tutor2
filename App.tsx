import React, { useState, useCallback } from 'react';
import { AppMode } from './types';
import Chatbot from './components/Chatbot';
import ImageAnalyzer from './components/ImageAnalyzer';
import ComplexSolver from './components/ComplexSolver';
import FormulaSheetGenerator from './components/FormulaSheetGenerator';
import Header from './components/Header';
import { ChatIcon, ImageIcon, BrainIcon, FormulaIcon } from './components/IconComponents';

// Fix: Define NavButton props type and move component outside App to fix type inference issues and improve performance.
type NavButtonProps = {
  activeMode: AppMode;
  targetMode: AppMode;
  onClick: (mode: AppMode) => void;
  children: React.ReactNode;
};

const NavButton = ({
  activeMode,
  targetMode,
  onClick,
  children,
}: NavButtonProps) => {
  const isActive = activeMode === targetMode;
  const baseClasses =
    'flex-1 sm:flex-none sm:w-auto flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900';
  const activeClasses = 'bg-blue-600 text-white shadow-lg';
  const inactiveClasses = 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white';
  return (
    <button
      onClick={() => onClick(targetMode)}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {children}
    </button>
  );
};

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('chatbot');

  const renderContent = useCallback(() => {
    switch (mode) {
      case 'chatbot':
        return <Chatbot />;
      case 'image':
        return <ImageAnalyzer />;
      case 'complex':
        return <ComplexSolver />;
      case 'formula':
        return <FormulaSheetGenerator />;
      default:
        return <Chatbot />;
    }
  }, [mode]);

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-900">
      <Header />
      <main className="flex-1 flex flex-col p-2 sm:p-4 md:p-6 min-h-0">
        <div className="w-full max-w-4xl mx-auto flex flex-col flex-1">
          <nav className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 p-2 mb-4 bg-gray-800/50 rounded-xl border border-gray-700 shadow-md">
            <NavButton activeMode={mode} targetMode="chatbot" onClick={setMode}>
              <ChatIcon />
              <span className="hidden sm:inline">AI Chat Tutor</span>
               <span className="sm:hidden">Chat</span>
            </NavButton>
            <NavButton activeMode={mode} targetMode="image" onClick={setMode}>
              <ImageIcon />
              <span className="hidden sm:inline">Image Problem Solver</span>
               <span className="sm:hidden">Image</span>
            </NavButton>
            <NavButton activeMode={mode} targetMode="complex" onClick={setMode}>
              <BrainIcon />
              <span className="hidden sm:inline">Complex Query Mode</span>
              <span className="sm:hidden">Complex</span>
            </NavButton>
             <NavButton activeMode={mode} targetMode="formula" onClick={setMode}>
              <FormulaIcon />
              <span className="hidden sm:inline">Formula Sheets</span>
              <span className="sm:hidden">Formulas</span>
            </NavButton>
          </nav>
          <div className="flex-1 flex flex-col bg-gray-800 rounded-xl border border-gray-700 shadow-inner min-h-0">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;