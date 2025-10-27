import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Message } from '../types';
import { generateTextOnly } from '../services/geminiService';
import { SendIcon, SpinnerIcon } from './IconComponents';
import MarkdownRenderer from './MarkdownRenderer';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      text: "Hello! I'm your A/L Physics and Maths AI Tutor. How can I help you today?",
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const botResponseText = await generateTextOnly(input);

    const botMessage: Message = { id: (Date.now() + 1).toString(), text: botResponseText, sender: 'bot' };
    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  }, [input, isLoading]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.sender === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                AI
              </div>
            )}
            <div
              className={`max-w-sm md:max-w-lg lg:max-w-2xl p-4 rounded-2xl shadow-md ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-700 text-gray-200 rounded-bl-none'
              }`}
            >
              {message.sender === 'bot' ? (
                <MarkdownRenderer content={message.text} />
              ) : (
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3 justify-start">
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                AI
              </div>
              <div className="max-w-xs md:max-w-md lg:max-w-lg p-4 rounded-2xl bg-gray-700 text-gray-200 rounded-bl-none">
                  <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
                  </div>
              </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-gray-800/80 border-t border-gray-700">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask a physics or maths question..."
            className="w-full bg-gray-700 border border-gray-600 rounded-full py-3 pl-4 pr-12 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? <SpinnerIcon /> : <SendIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;