import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Импортируем компоненты страниц
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
// import AccountPage from './pages/AccountPage';
// ... другие страницы

function App() {
  return (
    <Router>
      <Routes>
        {/* Используем компонент HomePage для главной страницы */}
        <Route path="/" element={<HomePage />} />
        {/* Добавляем маршрут для страницы расписания */}
        <Route path="/schedule" element={<SchedulePage />} />
        {/* <Route path="/account" element={<AccountPage />} /> */}
        {/* ... другие маршруты */}
        <Route path="*" element={<div>Страница не найдена</div>} />
      </Routes>
    </Router>
  );
}

export default App; 