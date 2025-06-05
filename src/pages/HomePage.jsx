import React from 'react';
import './HomePage.css'; // Импортируем стили для главной страницы
import Header from '../components/Header'; // Импортируем компонент Header

function HomePage() {
  return (
    <div className="homepage-container">
      {/* Заменяем заглушку шапки на компонент Header */}
      <Header />

      {/* Основное содержимое страницы */}
      <main className="homepage-main-content">
        <h1>Account</h1>
        <p>Manage your account settings</p>

        {/* Секция с информацией о пользователе */}
        <section className="user-profile-section">
          {/* Заглушка для аватара */}
          <div className="user-avatar"></div>
          <div className="user-info">
            <h2>Sophia Clark</h2>
            <p>sophia.clark@email.com</p>
          </div>
        </section>

        {/* Секция с уведомлениями */}
        <section className="notifications-section">
          <h2>Notifications</h2>
          <div className="notification-setting">
            <p>Course Notifications</p>
            <p className="description">Receive notifications about course updates, announcements, and more.</p>
            {/* Заглушка для переключателя */}
            <div className="toggle-switch">Toggle</div>
          </div>
          <div className="notification-setting">
            <p>System Notifications</p>
            <p className="description">Get notified about important system updates and maintenance.</p>
            {/* Заглушка для переключателя */}
            <div className="toggle-switch">Toggle</div>
          </div>
          <div className="notification-setting">
            <p>Reminder Notifications</p>
            <p className="description">Receive reminders for upcoming deadlines and events.</p>
            {/* Заглушка для переключателя */}
            <div className="toggle-switch">Toggle</div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage; 