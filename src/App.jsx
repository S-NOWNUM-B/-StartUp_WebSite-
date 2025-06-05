import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Импортируем компоненты страниц
import HomePage from './pages/Home/HomePage';
import SchedulePage from './pages/Schedule/SchedulePage';
import GradesPage from './pages/Grades/GradesPage';
import LearningMaterialsPage from './pages/LearningMaterials/LearningMaterialsPage';
import CommunicationHubPage from './pages/CommunicationHub/CommunicationHubPage';
// import AccountPage from './pages/Account/AccountPage';
// ... другие страницы

function App() {
  return (
    <Router>
      <Routes>
        {/* Используем компонент HomePage для главной страницы */}
        <Route path="/" element={<HomePage />} />
        {/* Добавляем маршрут для страницы расписания */}
        <Route path="/schedule" element={<SchedulePage />} />
        {/* Добавляем маршрут для страницы оценок */}
        <Route path="/grades" element={<GradesPage />} />
        {/* Добавляем маршрут для страницы учебных материалов */}
        <Route path="/learning-materials" element={<LearningMaterialsPage />} />
        {/* Добавляем маршрут для страницы центра коммуникаций */}
        <Route path="/communication-hub" element={<CommunicationHubPage />} />
        {/* <Route path="/account" element={<AccountPage />} /> */}
        {/* ... другие маршруты */}
        <Route path="*" element={<div>Страница не найдена</div>} />
      </Routes>
    </Router>
  );
}

export default App; 