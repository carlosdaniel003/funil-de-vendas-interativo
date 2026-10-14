import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Analytics } from '@vercel/analytics/react';
import { SoundProvider } from './features/audio/SoundProvider';
import './styles/global.css';
import './styles/responsive.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Elemento #root não encontrado.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <SoundProvider><App /></SoundProvider>
    <Analytics />
  </React.StrictMode>,
);
