import React, { useState, useCallback } from 'react';
import { generateFromImage } from '../services/geminiService';
import { SpinnerIcon } from './IconComponents';
import MarkdownRenderer from './MarkdownRenderer';

const ImageAnalyzer: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setResult('');
      setError('');
    }
  };

  const handleAnalyze = useCallback(async () => {
    if (!imageFile || !prompt) {
      setError('Please upload an image and enter a question.');
      return;
    }
    setError('');
    setIsLoading(true);
    setResult('');
    const response = await generateFromImage(prompt, imageFile);
    setResult(response);
    setIsLoading(false);
  }, [imageFile, prompt]);
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-100">Image Problem Solver</h2>
            <p className="text-sm text-gray-400">Upload an image of a problem (e.g., a diagram or handwritten question) and ask a question about it.</p>
          </div>

          <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
             <label htmlFor="file-upload" className="cursor-pointer block w-full text-center border-2 border-dashed border-gray-500 rounded-lg p-8 hover:border-blue-500 hover:bg-gray-700 transition-colors">
                 <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                 <p className="text-gray-400">
                    {imageFile ? `Selected: ${imageFile.name}` : "Click to upload an image"}
                 </p>
             </label>
            {imagePreview && (
              <div className="mt-4 flex justify-center">
                <img src={imagePreview} alt="Preview" className="max-h-60 rounded-lg shadow-lg" />
              </div>
            )}
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'What is the value of x in this circuit?' or 'Explain the forces acting on the object.'"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
            rows={3}
          />
          <button
            onClick={handleAnalyze}
            disabled={isLoading || !imageFile || !prompt}
            className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading && <SpinnerIcon />}
            {isLoading ? 'Analyzing...' : 'Analyze Image'}
          </button>
        </div>

        {error && <p className="text-center text-red-400 mt-4">{error}</p>}

        {(isLoading || result) && (
          <div className="max-w-2xl mx-auto mt-6">
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold mb-2 text-gray-200">Analysis Result:</h3>
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

export default ImageAnalyzer;