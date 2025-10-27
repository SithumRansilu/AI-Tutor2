import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Fix: Corrected typo in ReactDOM.createRoot. It was ReactDOM.create-root.
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);