import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState({ temp: 22, condition: 'sunny' });
  const [semester, setSemester] = useState({ current: 4, total: 8 });
  const [quickStats, setQuickStats] = useState({
    gpa: 3.8,
    attendance: 94,
    completedTasks: 47,
    totalCredits: 145
  });

  // Обновление времени каждую секунду
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Данные для учебных показателей
  const academicData = [
    {
      icon: 'bi-mortarboard-fill',
      title: 'Средний балл (GPA)',
      value: quickStats.gpa,
      suffix: '/4.0',
      color: 'primary',
      trend: '+0.2',
      description: 'За текущий семестр'
    },
    {
      icon: 'bi-calendar-check-fill',
      title: 'Посещаемость',
      value: quickStats.attendance,
      suffix: '%',
      color: 'success',
      trend: '+2%',
      description: 'В этом месяце'
    },
    {
      icon: 'bi-check-circle-fill',
      title: 'Выполненные задания',
      value: quickStats.completedTasks,
      suffix: '',
      color: 'info',
      trend: '+5',
      description: 'Всего за семестр'
    },
    {
      icon: 'bi-award-fill',
      title: 'Кредиты ECTS',
      value: quickStats.totalCredits,
      suffix: '',
      color: 'warning',
      trend: '+15',
      description: 'Накопленные кредиты'
    }
  ];


  // Данные для быстрых ссылок
  const quickLinks = [
    {
      icon: 'bi-calendar3',
      title: 'Расписание',
      description: 'Ваши занятия и события',
      path: '/schedule',
      color: 'primary'
    },
    {
      icon: 'bi-trophy-fill',
      title: 'Оценки',
      description: 'Текущие результаты',
      path: '/grades',
      color: 'success'
    },
    {
      icon: 'bi-journal-text',
      title: 'Материалы',
      description: 'Учебные материалы',
      path: '/learning-materials',
      color: 'info'
    },
    {
      icon: 'bi-people-fill',
      title: 'Преподаватели',
      description: 'Контакты и информация',
      path: '/teachers',
      color: 'warning'
    },
    {
      icon: 'bi-file-earmark-text',
      title: 'Документы',
      description: 'Справки и заявления',
      path: '/documents',
      color: 'danger'
    },
    {
      icon: 'bi-cash-stack',
      title: 'Финансы',
      description: 'Платежи и стипендии',
      path: '/finance',
      color: 'dark'
    }
  ];

  // Данные уведомлений
  const notifications = [
    {
      id: 1,
      type: 'exam',
      title: 'Экзамен завтра',
      message: 'Математический анализ в 09:00, ауд. 301',
      time: '2 часа назад',
      urgent: true
    },
    {
      id: 2,
      type: 'assignment',
      title: 'Новое задание',
      message: 'Лабораторная работа по React',
      time: '5 часов назад',
      urgent: false
    },
    {
      id: 3,
      type: 'grade',
      title: 'Оценка получена',
      message: 'Отлично за эссе по истории',
      time: '1 день назад',
      urgent: false
    }
  ];

  // Данные предстоящих событий
  const upcomingEvents = [
    {
      id: 1,
      type: 'exam',
      title: 'Экзамен по математике',
      date: 'Завтра',
      time: '09:00',
      location: 'Ауд. 301',
      urgent: true
    },
    {
      id: 2,
      type: 'assignment',
      title: 'Сдача курсовой работы',
      date: '15 июня',
      time: '23:59',
      location: 'Онлайн',
      urgent: false
    },
    {
      id: 3,
      type: 'lecture',
      title: 'Лекция по физике',
      date: 'Понедельник',
      time: '10:45',
      location: 'Лаб. 205',
      urgent: false
    }
  ];

  // Функция для получения иконки по типу события
  const getEventIcon = (type) => {
    switch(type) {
      case 'exam': return 'bi-clipboard-check';
      case 'assignment': return 'bi-file-earmark-check';
      case 'lecture': return 'bi-book';
      default: return 'bi-calendar-event';
    }
  };

  // Функция форматирования времени
  const formatTime = (date) => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Функция форматирования даты
  const formatDate = (date) => {
    return date.toLocaleDateString('ru-RU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="home-page">
    <div className="container">
        
        {/* Заголовок с приветствием и информацией */}
        <div className="hero-section mb-5">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="hero-title">
                Добро пожаловать, <span className="text-primary">Студент!</span>
              </h1>
              <p className="hero-subtitle text-muted">
                {formatDate(currentTime)} • {formatTime(currentTime)}
              </p>
              <p className="hero-description">
                Семестр {semester.current} из {semester.total} • Информационные системы
              </p>
            </div>
            <div className="col-md-4 text-end">
              <div className="weather-widget">
                <div className="weather-icon">
                  <i className={`bi ${weather.condition === 'sunny' ? 'bi-sun-fill' : 'bi-cloud-fill'} text-warning`}></i>
                </div>
                <div className="weather-info">
                  <span className="weather-temp">{weather.temp}°C</span>
                  <small className="weather-desc d-block text-muted">Алматы</small>
                </div>
            </div>
            </div>
          </div>
        </div>

        {/* Статистические карточки */}
        <div className="stats-section mb-5">
          <div className="row g-4">
            {academicData.map((stat, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className={`bi ${stat.icon} text-${stat.color}`}></i>
                  </div>
                  <div className="stat-content">
                    <h3 className="stat-value">
                      {stat.value}<span className="stat-suffix">{stat.suffix}</span>
          </h3>
                    <p className="stat-title">{stat.title}</p>
                    <div className="stat-trend">
                      <span className={`trend-indicator text-${stat.trend.startsWith('+') ? 'success' : 'danger'}`}>
                        <i className={`bi ${stat.trend.startsWith('+') ? 'bi-arrow-up' : 'bi-arrow-down'}`}></i>
                        {stat.trend}
                      </span>
                      <small className="text-muted ms-2">{stat.description}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="row g-4">
          {/* Левая колонка */}
          <div className="col-lg-8">
            
            {/* Быстрые ссылки */}
            <section className="quick-actions-section mb-4">
              <h3 className="section-title mb-4">
                <i className="bi bi-lightning-fill text-warning me-2"></i>
                Быстрые действия
              </h3>
              <div className="row g-3">
                {quickLinks.map((link, index) => (
                  <div key={index} className="col-lg-4 col-md-6">
                    <Link to={link.path} className="quick-action-card">
                      <div className="quick-action-icon">
                        <i className={`bi ${link.icon} text-${link.color}`}></i>
                </div>
                      <div className="quick-action-content">
                        <h5 className="quick-action-title">{link.title}</h5>
                        <p className="quick-action-desc">{link.description}</p>
                      </div>
                      <div className="quick-action-arrow">
                        <i className="bi bi-chevron-right"></i>
                </div>
                    </Link>
                </div>
                ))}
              </div>
            </section>

            {/* Предстоящие события */}
            <section className="events-section">
              <h3 className="section-title mb-4">
                <i className="bi bi-calendar-week text-primary me-2"></i>
                Предстоящие события
              </h3>
              <div className="events-list">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className={`event-card ${event.urgent ? 'urgent' : ''}`}>
                    <div className="event-icon">
                      <i className={`bi ${getEventIcon(event.type)}`}></i>
                    </div>
                    <div className="event-content">
                      <h5 className="event-title">{event.title}</h5>
                      <div className="event-details">
                        <span className="event-date">
                          <i className="bi bi-calendar3 me-1"></i>
                          {event.date} в {event.time}
                        </span>
                        <span className="event-location">
                          <i className="bi bi-geo-alt me-1"></i>
                          {event.location}
                        </span>
                      </div>
                    </div>
                    {event.urgent && (
                      <div className="event-urgent">
                        <i className="bi bi-exclamation-triangle-fill text-danger"></i>
            </div>
          )}
              </div>
            ))}
          </div>
        </section>

          </div>

          {/* Правая колонка */}
          <div className="col-lg-4">
            
            {/* Уведомления */}
            <section className="notifications-section mb-4">
              <h3 className="section-title mb-3">
                <i className="bi bi-bell-fill text-info me-2"></i>
                Уведомления
                <span className="notification-count">{notifications.length}</span>
              </h3>
              <div className="notifications-list">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`notification-item ${notification.urgent ? 'urgent' : ''}`}>
                    <div className="notification-icon">
                      <i className={`bi ${getEventIcon(notification.type)}`}></i>
                    </div>
                    <div className="notification-content">
                      <h6 className="notification-title">{notification.title}</h6>
                      <p className="notification-message">{notification.message}</p>
                      <small className="notification-time text-muted">{notification.time}</small>
                    </div>
                    {notification.urgent && (
                      <div className="notification-indicator">
                        <span className="urgent-dot"></span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Link to="/announcements" className="btn btn-outline-primary btn-sm w-100 mt-3">
                Посмотреть все объявления
              </Link>
            </section>

            {/* Прогресс семестра */}
            <section className="progress-section">
              <h3 className="section-title mb-3">
                <i className="bi bi-graph-up text-success me-2"></i>
                Прогресс семестра
              </h3>
              <div className="progress-card">
                <div className="progress-header">
                  <h4>Семестр {semester.current}</h4>
                  <span className="progress-percentage">65%</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{width: '65%'}}></div>
                </div>
                <div className="progress-details mt-3">
                  <div className="progress-item">
                    <span className="progress-label">Недель пройдено:</span>
                    <span className="progress-value">11 из 17</span>
                  </div>
                  <div className="progress-item">
                    <span className="progress-label">Экзаменов:</span>
                    <span className="progress-value">2 из 6</span>
                  </div>
                  <div className="progress-item">
                    <span className="progress-label">Кредитов получено:</span>
                    <span className="progress-value">15 из 30</span>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}

export default HomePage;