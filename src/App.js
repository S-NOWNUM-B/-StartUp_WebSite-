import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import HomePage from './pages/Home';
import SchedulePage from './pages/Schedule';
import GradesPage from './pages/Grades';
import NewsPage from './pages/News';
import TasksPage from './pages/Tasks';
import ProfilePage from './pages/Profile';
import './styles/App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Состояние для боковой панели, по умолчанию открыта

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
      <Router>
        <div className="app">
          {/* Передаем состояние и функцию переключения в Sidebar */}
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          {/* Добавляем класс main-content-shifted в зависимости от состояния сайдбара */}
          <main className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/grades" element={<GradesPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              {/* Добавьте маршруты для новых страниц */}
               <Route path="/academic-calendar" element={<div>Страница Академический календарь</div>} />
               <Route path="/individual-plan" element={<div>Страница Индивидуальный учебный план</div>} />
               <Route path="/learning-materials" element={<div>Страница Электронные учебные материалы</div>} />
               <Route path="/testing" element={<div>Страница Тестирование и экзамены</div>} />
               <Route path="/appeals" element={<div>Страница Апелляции</div>} />
               <Route path="/transcript" element={<div>Страница Транскрипт</div>} />
               <Route path="/teachers" element={<div>Страница Преподаватели</div>} />
               <Route path="/announcements" element={<div>Страница Объявления</div>} />
               <Route path="/events" element={<div>Страница События</div>} />
               <Route path="/notifications" element={<div>Страница Уведомления</div>} />
               <Route path="/settings" element={<div>Страница Настройки</div>} />
               <Route path="/documents" element={<div>Страница Документы</div>} />
               <Route path="/finance" element={<div>Страница Финансы</div>} />

            </Routes>
          </main>
        </div>
      </Router>
  );
}

export default App;