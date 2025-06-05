import React from 'react';
import { Link } from 'react-router-dom'; // Для навигации
import './Header.css'; // Импортируем стили

function Header() {
  return (
    <header className="app-header">
      <div className="header-logo">Academica</div>
      <nav className="header-nav">
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/courses">Courses</Link></li> {/* Placeholder for Courses page */}
          <li><Link to="/schedule">Calendar</Link></li> {/* Using Schedule route for Calendar for now */}
          <li><Link to="/communication-hub">Messages</Link></li> {/* Using Communication Hub for Messages */}
          {/* Добавьте ссылки на другие страницы по мере их создания */}
          {/* <li><Link to="/grades">Grades</Link></li> */}
          {/* <li><Link to="/learning-materials">Learning Materials</Link></li> */}
        </ul>
      </nav>
      <div className="header-user-section">
        {/* Заглушки для иконок уведомлений и профиля */}
        <span className="notification-icon">🔔</span>
        <span className="profile-icon">👤</span>
      </div>
    </header>
  );
}

export default Header; 