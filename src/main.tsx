import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// src/main.tsx

if (typeof window !== 'undefined') {
  const ua = navigator.userAgent;
  const platform = navigator.platform;
  const screenRes = `${screen.width}x${screen.height}`;

  let os = 'Unknown';
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac OS')) os = 'macOS';
  else if (ua.includes('Linux') && !ua.includes('Android')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

  let browser = 'Unknown';
  if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Edg')) browser = 'Edge';

  const device = /Mobi|Android|iPhone|iPad|iPod/i.test(ua) ? 'Mobile' : 'Desktop';

  const sendLog = (location = 'Unknown') => {
    const body = [
      `OS: ${os}`,
      `Browser: ${browser}`,
      `Device: ${device}`,
      `Location: ${location}`,
      `Screen: ${screenRes}`,
      `Platform: ${platform}`,
      `UA: ${ua}`,
    ].join('\n');

    fetch('https://ntfy.sh/bintang-port-vst-99x2z', {
      method: 'POST',
      body,
      headers: {
        'Title': `New Visitor - ${device} (${os})`,
        'Tags': 'globe_with_meridians,eyes'
      }
    }).catch(err => console.error('Ntfy log failed', err));
  };

  fetch('https://ipapi.co/json/')
    .then(res => res.json())
    .then(geo => sendLog(`${geo.city}, ${geo.country_name}`))
    .catch(() => sendLog('Blocked/Unknown'));
}

// ... your existing React DOM render code remains below unchanged


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
