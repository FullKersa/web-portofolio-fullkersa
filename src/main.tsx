import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// src/main.tsx

// 1. Put this at the very top of the file
if (typeof window !== 'undefined') {
  fetch('https://ntfy.sh/bintang-port-vst-99x2z', {
    method: 'POST',
    body: 'Someone just visited your Vercel page!',
    headers: {
      'Title': 'New Website Visitor',
      'Tags': 'globe_with_meridians,eyes'
    }
  }).catch(err => console.error('Ntfy log failed', err));
}

// ... your existing React DOM render code remains below unchanged


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
