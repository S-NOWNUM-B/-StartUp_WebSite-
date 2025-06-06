import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function HomePage() {
  return (
    <div className="container">
      <section className="intro">
        <h2>Добро пожаловать в Student Hub!</h2>
        <p>Ваш централизованный портал для управления учебой, отслеживания успеваемости и получения актуальной информации.</p>
      </section>

      <section className="page-section quick-links">
        <h3>Быстрый доступ</h3>
        <div className="quick-links-grid">
          <Link to="/schedule" className="quick-link-card">
            <h4>Расписание</h4>
            <p>Просмотр расписания занятий</p>
          </Link>
          <Link to="/grades" className="quick-link-card">
            <h4>Оценки</h4>
            <p>Просмотр успеваемости</p>
          </Link>
          <Link to="/news" className="quick-link-card">
            <h4>Новости</h4>
            <p>Актуальные объявления</p>
          </Link>
          <Link to="/tasks" className="quick-link-card">
            <h4>Задачи</h4>
            <p>Управление учебными задачами</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;