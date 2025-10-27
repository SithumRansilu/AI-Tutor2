import React, { useState, useMemo } from 'react';
import { pastPapers, uniqueYears, PastPaper } from '../data/pastPapers';
import { syllabus } from '../data/syllabus';
import { PastPaperIcon } from './IconComponents';

const PastPapers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<'physics' | 'maths' | 'all'>('all');
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [viewingPaper, setViewingPaper] = useState<PastPaper | null>(null);
  
  const handleYearChange = (year: number) => {
    setSelectedYears(prev => 
      prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
    );
  };

  const handleTopicChange = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const filteredPapers = useMemo(() => {
    return pastPapers.filter(paper => {
      const searchMatch = paper.title.toLowerCase().includes(searchTerm.toLowerCase());
      const subjectMatch = selectedSubject === 'all' || paper.subject === selectedSubject;
      const yearMatch = selectedYears.length === 0 || selectedYears.includes(paper.year);
      const topicMatch = selectedTopics.length === 0 || selectedTopics.some(topic => paper.topics.includes(topic));
      return searchMatch && subjectMatch && yearMatch && topicMatch;
    });
  }, [searchTerm, selectedSubject, selectedYears, selectedTopics]);

  const topicsForFilter = selectedSubject === 'all' ? [...syllabus.physics, ...syllabus.maths] : syllabus[selectedSubject];

  const handleViewPaper = (paper: PastPaper) => {
    setViewingPaper(paper);
  };

  const handleCloseModal = () => {
    setViewingPaper(null);
  };


  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-100 flex items-center justify-center gap-2">
              <PastPaperIcon /> A/L Past Papers Database
            </h2>
            <p className="text-sm text-gray-400">Search and filter past papers by subject, year, and topic.</p>
          </div>

          {/* Filters */}
          <div className="space-y-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <input
              type="text"
              placeholder="Search papers by title..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Subject Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                <div className="flex rounded-md shadow-sm">
                   <button onClick={() => setSelectedSubject('all')} className={`px-4 py-2 text-sm font-medium ${selectedSubject === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'} rounded-l-md flex-1`}>All</button>
                   <button onClick={() => setSelectedSubject('physics')} className={`px-4 py-2 text-sm font-medium ${selectedSubject === 'physics' ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'} border-x border-gray-600 flex-1`}>Physics</button>
                   <button onClick={() => setSelectedSubject('maths')} className={`px-4 py-2 text-sm font-medium ${selectedSubject === 'maths' ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'} rounded-r-md flex-1`}>Maths</button>
                </div>
              </div>

              {/* Year Filter */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
                 <div className="flex flex-wrap gap-2">
                  {uniqueYears.map(year => (
                    <label key={year} className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-gray-700/50 transition-colors">
                      <input type="checkbox" checked={selectedYears.includes(year)} onChange={() => handleYearChange(year)} className="form-checkbox h-4 w-4 bg-gray-600 border-gray-500 text-blue-500 rounded focus:ring-blue-500" />
                      <span className="text-sm text-gray-300">{year}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
             {/* Topic Filter */}
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Topics</label>
                <div className="max-h-40 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-2 bg-gray-800 rounded-md">
                    {topicsForFilter.map(topic => (
                         <label key={topic} className="flex items-center space-x-2 cursor-pointer p-1.5 rounded-md hover:bg-gray-700/50 transition-colors">
                            <input type="checkbox" checked={selectedTopics.includes(topic)} onChange={() => handleTopicChange(topic)} className="form-checkbox h-4 w-4 bg-gray-600 border-gray-500 text-blue-500 rounded focus:ring-blue-500" />
                            <span className="text-xs text-gray-300">{topic}</span>
                        </label>
                    ))}
                </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {filteredPapers.length > 0 ? (
              filteredPapers.map(paper => (
                <div key={paper.id} className="bg-gray-700/50 p-4 rounded-lg border border-gray-600 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-100">{paper.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${paper.subject === 'physics' ? 'bg-blue-900 text-blue-300' : 'bg-teal-900 text-teal-300'}`}>{paper.subject.charAt(0).toUpperCase() + paper.subject.slice(1)}</span>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-600 text-gray-300">{paper.year}</span>
                      {paper.topics.map(topic => (
                        <span key={topic} className="text-xs font-medium px-2 py-1 rounded-full bg-gray-800 text-gray-400">{topic}</span>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => handleViewPaper(paper)} className="bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors flex-shrink-0">
                    View Paper
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">No past papers found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Modal for viewing paper */}
      {viewingPaper && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity duration-300" 
            onClick={handleCloseModal}
          >
              <div 
                className="bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-gray-700 transform transition-transform duration-300 scale-95 animate-scale-in" 
                onClick={(e) => e.stopPropagation()}
              >
                  <div className="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0">
                      <h3 className="font-semibold text-gray-100">{viewingPaper.title}</h3>
                      <button onClick={handleCloseModal} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
                  </div>
                  <div className="p-6 text-center text-gray-300 overflow-y-auto">
                      <p className="text-lg mb-8">The content of the past paper would be displayed here.</p>
                      <div className="p-8 border-2 border-dashed border-gray-600 rounded-lg bg-gray-900/50">
                          <PastPaperIcon className="w-16 h-16 mx-auto text-gray-500" />
                          <p className="mt-4 text-gray-500">Simulated PDF Content Area</p>
                      </div>
                  </div>
              </div>
              <style>{`
                @keyframes scale-in {
                  from { transform: scale(0.95); opacity: 0; }
                  to { transform: scale(1); opacity: 1; }
                }
                .animate-scale-in { animation: scale-in 0.2s ease-out forwards; }
              `}</style>
          </div>
      )}
    </div>
  );
};

export default PastPapers;