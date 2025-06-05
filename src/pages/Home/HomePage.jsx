import React, { useState } from 'react';
import './HomePage.css'; // Импортируем стили
import Header from '../../components/Header'; // Импортируем компонент Header

function HomePage() {
  // Состояние для переключателей уведомлений
  const [notifications, setNotifications] = useState({
    course: true,
    system: false,
    reminder: true
  });

  // Обработчик переключения уведомлений
  const toggleNotification = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Пример данных для новостей
  const universityNews = [
    {
      id: 1,
      title: 'Начало нового семестра',
      summary: 'Уважаемые студенты, напоминаем о начале весеннего семестра... ',
      date: '01.09.2023',
    },
    {
      id: 2,
      title: 'Конференция молодых ученых',
      summary: 'Приглашаем принять участие в ежегодной конференции... ',
      date: '15.10.2023',
    },
    {
      id: 3,
      title: 'Изменения в расписании',
      summary: 'Обратите внимание на обновленное расписание занятий... ',
      date: '20.08.2023',
    },
  ];

  return (
    <div className="homepage-container">
      {/* Заменяем заглушку шапки на компонент Header */}
      <Header />

      {/* Основное содержимое страницы */}
      <main className="homepage-main-content">
        <h1>Главная страница</h1>
        <p>Добро пожаловать на платформу университета!</p>

        {/* Секция новостей */}
        <section className="news-section">
          <h2>Новости университета</h2>
          <div className="news-list">
            {universityNews.map(newsItem => (
              <div key={newsItem.id} className="news-item">
                <h3>{newsItem.title}</h3>
                <p>{newsItem.summary}</p>
                <span className="news-date">{newsItem.date}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Секция виджетов */}
        <section className="widgets-section">
          <h2>Виджеты</h2>
          <div className="widgets-grid">
            {/* Здесь будут располагаться виджеты */}
            <div className="widget-placeholder">Виджет 1</div>
            <div className="widget-placeholder">Виджет 2</div>
            <div className="widget-placeholder">Виджет 3</div>
            {/* Можно добавить больше placeholder-ов или реальных компонентов виджетов */}
          </div>
        </section>

        {/* Секция с информацией о пользователе */}
        <section className="user-profile-section">
          {/* Заглушка для аватара */}
          <div className="user-avatar"></div>
          <div className="user-info">
            <h2>София Кларк</h2>
            <p>sophia.clark@email.com</p>
          </div>
        </section>

        {/* Секция с уведомлениями */}
        <section className="notifications-section">
          <h2>Уведомления</h2>
          <div className="notification-setting">
            <p>Уведомления о курсах</p>
            <p className="description">Получайте уведомления об обновлениях курсов, объявлениях и многом другом.</p>
            <div 
              className={`toggle-switch ${notifications.course ? 'is-on' : ''}`}
              onClick={() => toggleNotification('course')}
            ></div>
          </div>
          <div className="notification-setting">
            <p>Системные уведомления</p>
            <p className="description">Получайте уведомления о важных обновлениях системы и обслуживании.</p>
            <div 
              className={`toggle-switch ${notifications.system ? 'is-on' : ''}`}
              onClick={() => toggleNotification('system')}
            ></div>
          </div>
          <div className="notification-setting">
            <p>Уведомления о напоминаниях</p>
            <p className="description">Получайте напоминания о предстоящих дедлайнах и событиях.</p>
            <div 
              className={`toggle-switch ${notifications.reminder ? 'is-on' : ''}`}
              onClick={() => toggleNotification('reminder')}
            ></div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage; 