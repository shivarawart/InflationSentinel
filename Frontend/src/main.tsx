import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'leaflet/dist/leaflet.css';


const root = ReactDOM.createRoot(document.getElementById('root')!);

// Initialize Socket.io connection once


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);