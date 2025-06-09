import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import HomePage from './pages/Home';
import SchedulePage from './pages/Schedule';
import GradesPage from './pages/Grades';
import NewsPage from './pages/News';
import TasksPage from './pages/Tasks';
import ProfilePage from './pages/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/global.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (isSidebarOpen) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <Router>
      <div className={`app ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} sidebarRef={sidebarRef} />
        <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <div className="container py-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/grades" element={<GradesPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/academic-calendar" element={<div className="container py-4">Страница Академический календарь</div>} />
              <Route path="/individual-plan" element={<div className="container py-4">Страница Индивидуальный учебный план</div>} />
              <Route path="/learning-materials" element={<div className="container py-4">Страница Электронные учебные материалы</div>} />
              <Route path="/testing" element={<div className="container py-4">Страница Тестирование и экзамены</div>} />
              <Route path="/appeals" element={<div className="container py-4">Страница Апелляции</div>} />
              <Route path="/transcript" element={<div className="container py-4">Страница Транскрипт</div>} />
              <Route path="/teachers" element={<div className="container py-4">Страница Преподаватели</div>} />
              <Route path="/announcements" element={<div className="container py-4">Страница Объявления</div>} />
              <Route path="/events" element={<div className="container py-4">Страница События</div>} />
              <Route path="/notifications" element={<div className="container py-4">Страница Уведомления</div>} />
              <Route path="/settings" element={<div className="container py-4">Страница Настройки</div>} />
              <Route path="/documents" element={<div className="container py-4">Страница Документы</div>} />
              <Route path="/finance" element={<div className="container py-4">Страница Финансы</div>} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;