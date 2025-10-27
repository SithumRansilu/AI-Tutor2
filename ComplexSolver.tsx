import React, { useState, useCallback } from 'react';
import { generateComplex } from '../services/geminiService';
import { SpinnerIcon, BrainIcon } from './IconComponents';
import MarkdownRenderer from './MarkdownRenderer';

const ComplexSolver: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSolve = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a problem to solve.');
      return;
    }
    setError('');
    setIsLoading(true);
    setResult('');
    const response = await generateComplex(prompt);
    setResult(response);
    setIsLoading(false);
  }, [prompt]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-100 flex items-center justify-center gap-2">
                <BrainIcon /> Complex Query Mode
            </h2>
            <p className="text-sm text-gray-400">For your most difficult multi-step problems. This mode uses a more powerful model to think deeper.</p>
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe a complex physics problem, ask for a mathematical proof, or request a detailed explanation of an advanced concept..."
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
            rows={6}
          />
          <button
            onClick={handleSolve}
            disabled={isLoading || !prompt}
            className="w-full flex justify-center items-center gap-2 bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading && <SpinnerIcon />}
            {isLoading ? 'Thinking...' : 'Solve with Deep Thinking'}
          </button>

          {error && <p className="text-center text-red-400 mt-4">{error}</p>}
        </div>

        {(isLoading || result) && (
          <div className="max-w-3xl mx-auto mt-6">
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold mb-2 text-gray-200">Solution:</h3>
               {isLoading && !result ? (
                <div className="flex justify-center items-center p-8">
                    <SpinnerIcon />
                </div>
              ) : (
                <MarkdownRenderer content={result} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplexSolver;