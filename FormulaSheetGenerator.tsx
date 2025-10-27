import React, { useState, useCallback } from 'react';
import { syllabus } from '../data/syllabus';
import { generateFormulaSheet } from '../services/geminiService';
import { SpinnerIcon, FormulaIcon } from './IconComponents';
import MarkdownRenderer from './MarkdownRenderer';

type Subject = 'physics' | 'maths';

const FormulaSheetGenerator: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [generatedSheet, setGeneratedSheet] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTopicChange = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  const handleSelectAll = () => {
    if (selectedSubject) {
      if (selectedTopics.length === syllabus[selectedSubject].length) {
        setSelectedTopics([]); // Deselect all
      } else {
        setSelectedTopics(syllabus[selectedSubject]); // Select all
      }
    }
  };

  const handleGenerate = useCallback(async () => {
    if (!selectedSubject || selectedTopics.length === 0) {
      setError('Please select a subject and at least one topic.');
      return;
    }
    setError('');
    setIsLoading(true);
    setGeneratedSheet('');
    const response = await generateFormulaSheet(selectedSubject, selectedTopics);
    setGeneratedSheet(response);
    setIsLoading(false);
  }, [selectedSubject, selectedTopics]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-100 flex items-center justify-center gap-2">
              <FormulaIcon /> Personalized Formula Sheet Generator
            </h2>
            <p className="text-sm text-gray-400">Select a subject and topics to generate a custom formula sheet for your A/L revision.</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-center gap-4">
              <button
                onClick={() => { setSelectedSubject('physics'); setSelectedTopics([]); setGeneratedSheet(''); }}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${selectedSubject === 'physics' ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                Physics
              </button>
              <button
                onClick={() => { setSelectedSubject('maths'); setSelectedTopics([]); setGeneratedSheet(''); }}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${selectedSubject === 'maths' ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                Maths
              </button>
            </div>

            {selectedSubject && (
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-200">Select {selectedSubject === 'physics' ? 'Physics' : 'Maths'} Topics:</h3>
                  <button onClick={handleSelectAll} className="text-sm text-blue-400 hover:text-blue-300 font-medium">
                     {selectedTopics.length === syllabus[selectedSubject].length ? 'Deselect All' : 'Select All'}
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {syllabus[selectedSubject].map((topic) => (
                    <label key={topic} className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-gray-700/50 transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedTopics.includes(topic)}
                        onChange={() => handleTopicChange(topic)}
                        className="form-checkbox h-4 w-4 bg-gray-600 border-gray-500 text-blue-500 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-300">{topic}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={isLoading || !selectedSubject || selectedTopics.length === 0}
            className="w-full flex justify-center items-center gap-2 bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading && <SpinnerIcon />}
            {isLoading ? 'Generating...' : 'Generate Formula Sheet'}
          </button>
          
          {error && <p className="text-center text-red-400 mt-2">{error}</p>}
        </div>

        {(isLoading || generatedSheet) && (
          <div className="max-w-3xl mx-auto mt-6">
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold mb-2 text-gray-200">Your Custom Formula Sheet:</h3>
               {isLoading && !generatedSheet ? (
                <div className="flex justify-center items-center p-8">
                    <SpinnerIcon />
                </div>
              ) : (
                <MarkdownRenderer content={generatedSheet} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormulaSheetGenerator;