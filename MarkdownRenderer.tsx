import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-invert max-w-none 
      prose-p:text-gray-300 
      prose-headings:text-gray-100 
      prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-a:underline
      prose-strong:text-gray-100
      prose-blockquote:bg-gray-900/50 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:p-4 prose-blockquote:rounded-r-lg
      prose-li:marker:text-blue-400
      prose-code:bg-gray-800 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm
    ">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({node, ...props}) => <h1 className="text-2xl font-bold my-4" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-xl font-semibold my-3 border-b border-gray-600 pb-2" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-lg font-semibold my-2" {...props} />,
          table: ({node, ...props}) => <div className="overflow-x-auto"><table className="table-auto w-full my-4" {...props} /></div>,
          thead: ({node, ...props}) => <thead className="bg-gray-700" {...props} />,
          th: ({node, ...props}) => <th className="px-4 py-2 border border-gray-600 text-left" {...props} />,
          td: ({node, ...props}) => <td className="px-4 py-2 border border-gray-600" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;