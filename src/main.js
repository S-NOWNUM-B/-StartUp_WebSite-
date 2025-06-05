import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './style.css';

// Удаляем старый код, который напрямую изменял DOM
// document.querySelector('#app').innerHTML = `...`;
// setupCounter(document.querySelector('#counter'));

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
