import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function HomePage() {
  const newsData = [
    { id: 1, title: 'Важное объявление', date: '2024-03-20', content: 'Напоминаем о предстоящей сессии. Пожалуйста, проверьте расписание экзаменов.' },
    { id: 2, title: 'Новый курс', date: '2024-03-19', content: 'Открыт набор на новый курс по машинному обучению.' },
  ];

  const tasksData = [
    { id: 1, title: 'Курсовая работа', deadline: '2024-04-15', status: 'В процессе' },
    { id: 2, title: 'Лабораторная работа №3', deadline: '2024-03-25', status: 'Не начато' },
  ];

  return (
    <div className="container py-4">
      <div className="page-content card">
        <section className="quick-links mb-5">
          <h3 className="mb-4">Быстрый доступ</h3>
          <div className="quick-links-grid">
            <div className="quick-link-card">
              <Link to="/schedule">
                <div className="card-icon"><i className="bi bi-calendar-event"></i></div>
                <div className="card-content">
                  <h4>Расписание</h4>
                  <p>Просмотр расписания занятий</p>
                </div>
              </Link>
            </div>
            <div className="quick-link-card">
              <Link to="/grades">
                <div className="card-icon"><i className="bi bi-journal-check"></i></div>
                <div className="card-content">
                  <h4>Оценки</h4>
                  <p>Просмотр успеваемости</p>
                </div>
              </Link>
            </div>
            <div className="quick-link-card">
              <Link to="/news">
                <div className="card-icon"><i className="bi bi-megaphone"></i></div>
                <div className="card-content">
                  <h4>Новости</h4>
                  <p>Актуальные объявления</p>
                </div>
              </Link>
            </div>
            <div className="quick-link-card">
              <Link to="/tasks">
                <div className="card-icon"><i className="bi bi-list-task"></i></div>
                <div className="card-content">
                  <h4>Задачи</h4>
                  <p>Управление учебными задачами</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="latest-news mb-5">
          <h3 className="mb-4">Последние новости</h3>
          <div className="news-list">
            {newsData.map(item => (
              <div key={item.id} className="news-item card">
                <h4 className="news-title">{item.title}</h4>
                <p className="news-date text-muted">{item.date}</p>
                <p className="news-content">{item.content}</p>
                <Link to="/news" className="btn btn-sm btn-outline-primary mt-2">Подробнее</Link>
              </div>
            ))}
          </div>
        </section>

        <section className="upcoming-tasks">
          <h3 className="mb-4">Предстоящие задачи</h3>
          <div className="tasks-list">
            {tasksData.map(item => (
              <div key={item.id} className="task-item card">
                <h4 className="task-title">{item.title}</h4>
                <p className="task-deadline text-muted">Дедлайн: {item.deadline}</p>
                <span className={`badge status-${item.status.toLowerCase().replace(' ', '-')}`}>{item.status}</span>
                <Link to="/tasks" className="btn btn-sm btn-outline-secondary mt-2">Подробнее</Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;