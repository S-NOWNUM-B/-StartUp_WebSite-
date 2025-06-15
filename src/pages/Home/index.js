import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

// Новые компоненты для современного дизайна
const StatCard = ({ icon, title, value, suffix, trend, description, color }) => (
  <div className="modern-stat-card">
    <div className="stat-header">
      <div className={`stat-icon-wrapper ${color}`}>
        <i className={`bi ${icon}`}></i>
      </div>
      <div className="stat-trend">
        <span className={trend.startsWith('+') ? 'trend-up' : 'trend-down'}>
          <i className={`bi ${trend.startsWith('+') ? 'bi-arrow-up' : 'bi-arrow-down'}`}></i>
          {trend}
        </span>
      </div>
    </div>
    <div className="stat-content">
      <div className="stat-value">
        {value}<span className="stat-suffix">{suffix}</span>
      </div>
      <div className="stat-title">{title}</div>
      <div className="stat-description">{description}</div>
    </div>
    <div className="stat-glow"></div>
  </div>
);

const ActionCard = ({ icon, title, description, path, color }) => (
  <Link to={path} className="modern-action-card">
    <div className="action-header">
      <div className={`action-icon-wrapper ${color}`}>
        <i className={`bi ${icon}`}></i>
      </div>
      <div className="action-arrow">
        <i className="bi bi-arrow-right"></i>
      </div>
    </div>
    <div className="action-content">
      <h3 className="action-title">{title}</h3>
      <p className="action-description">{description}</p>
    </div>
    <div className="action-hover-effect"></div>
  </Link>
);

const EventCard = ({ event }) => (
  <div className={`modern-event-card ${event.urgent ? 'urgent' : ''}`}>
    <div className="event-status">
      <div className={`event-indicator ${event.urgent ? 'urgent' : 'normal'}`}></div>
    </div>
    <div className="event-icon-wrapper">
      <i className={`bi ${getEventIcon(event.type)}`}></i>
    </div>
    <div className="event-content">
      <h4 className="event-title">{event.title}</h4>
      <div className="event-details">
        <span className="event-date">
          <i className="bi bi-calendar3"></i>
          {event.date} в {event.time}
        </span>
        <span className="event-location">
          <i className="bi bi-geo-alt"></i>
          {event.location}
        </span>
      </div>
    </div>
    {event.urgent && (
      <div className="urgent-pulse">
        <i className="bi bi-exclamation-triangle-fill"></i>
      </div>
    )}
  </div>
);

const NotificationCard = ({ notification }) => (
  <div className={`modern-notification-card ${notification.urgent ? 'urgent' : ''}`}>
    <div className="notification-icon-wrapper">
      <i className={`bi ${getEventIcon(notification.type)}`}></i>
    </div>
    <div className="notification-content">
      <h5 className="notification-title">{notification.title}</h5>
      <p className="notification-message">{notification.message}</p>
      <span className="notification-time">{notification.time}</span>
    </div>
    {notification.urgent && (
      <div className="notification-urgent-indicator">
        <div className="urgent-dot-pulse"></div>
      </div>
    )}
  </div>
);

const ProgressSection = ({ semester, percentage }) => (
  <div className="modern-progress-section">
    <div className="progress-header">
      <h3>Прогресс Семестра</h3>
      <div className="progress-percentage">{percentage}%</div>
    </div>
    <div className="progress-ring">
      <svg className="progress-ring-svg" width="120" height="120">
        <circle
          className="progress-ring-background"
          stroke="#374151"
          strokeWidth="8"
          fill="transparent"
          r="50"
          cx="60"
          cy="60"
        />
        <circle
          className="progress-ring-progress"
          stroke="#fbbf24"
          strokeWidth="8"
          fill="transparent"
          r="50"
          cx="60"
          cy="60"
          strokeDasharray={`${percentage * 3.14} 314`}
          strokeDashoffset="0"
        />
      </svg>
      <div className="progress-center">
        <span className="semester-number">{semester.current}</span>
        <span className="semester-total">/{semester.total}</span>
      </div>
    </div>
    <div className="progress-details">
      <div className="progress-item">
        <span className="progress-label">Недель пройдено</span>
        <span className="progress-value">11 из 17</span>
      </div>
      <div className="progress-item">
        <span className="progress-label">Экзаменов сдано</span>
        <span className="progress-value">2 из 6</span>
      </div>
      <div className="progress-item">
        <span className="progress-label">Кредитов получено</span>
        <span className="progress-value">15 из 30</span>
      </div>
    </div>
  </div>
);

// Вспомогательные функции
const getEventIcon = (type) => {
  switch(type) {
    case 'exam': return 'bi-clipboard-check-fill';
    case 'assignment': return 'bi-file-earmark-check-fill';
    case 'lecture': return 'bi-book-fill';
    case 'grade': return 'bi-star-fill';
    default: return 'bi-calendar-event-fill';
  }
};

function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather] = useState({ temp: 22, condition: 'sunny' });
  const [semester] = useState({ current: 4, total: 8 });
  const [quickStats] = useState({
    gpa: 3.8,
    attendance: 94,
    completedTasks: 47,
    totalCredits: 145
  });

  // Обновление времени
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Данные для статистики
  const academicData = [
    {
      icon: 'bi-mortarboard-fill',
      title: 'Средний Балл (GPA)',
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
      title: 'Выполненные Задания',
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

  // Данные для быстрых действий
  const quickActions = [
    {
      icon: 'bi-calendar3-fill',
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
      icon: 'bi-file-earmark-text-fill',
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
      color: 'secondary'
    }
  ];

  // Уведомления
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

  // События
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

  const formatTime = (date) => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('ru-RU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="modern-home-page">
      <div className="container-fluid">
        
        {/* Hero Section - Новый дизайн */}
        <div className="modern-hero-section">
          <div className="hero-content">
            <div className="hero-main">
              <h1 className="hero-title">
                Добро пожаловать в <span className="brand-text">CampusHub</span>
              </h1>
              <p className="hero-subtitle">
                {formatDate(currentTime)} • {formatTime(currentTime)}
              </p>
              <p className="hero-description">
                Семестр {semester.current} из {semester.total} • Информационные системы
              </p>
            </div>
            <div className="hero-weather">
              <div className="weather-card">
                <div className="weather-icon">
                  <i className={`bi ${weather.condition === 'sunny' ? 'bi-sun-fill' : 'bi-cloud-fill'}`}></i>
                </div>
                <div className="weather-info">
                  <span className="weather-temp">{weather.temp}°C</span>
                  <small className="weather-location">Алматы</small>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-background-effects">
            <div className="hero-gradient"></div>
            <div className="hero-particles"></div>
          </div>
        </div>

        {/* Statistics Section - Новые карточки */}
        <div className="modern-stats-section">
          <div className="row g-4">
            {academicData.map((stat, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <StatCard {...stat} />
              </div>
            ))}
          </div>
        </div>

        <div className="row g-4">
          {/* Левая колонка */}
          <div className="col-lg-8">
            
            {/* Quick Actions - Новый дизайн */}
            <section className="modern-quick-actions">
              <div className="section-header">
                <h2 className="section-title">
                  <i className="bi bi-lightning-fill"></i>
                  Быстрые Действия
                </h2>
              </div>
              <div className="row g-3">
                {quickActions.map((action, index) => (
                  <div key={index} className="col-lg-4 col-md-6">
                    <ActionCard {...action} />
                  </div>
                ))}
              </div>
            </section>

            {/* Events Section - Новый дизайн */}
            <section className="modern-events-section">
              <div className="section-header">
                <h2 className="section-title">
                  <i className="bi bi-calendar-week-fill"></i>
                  Предстоящие События
                </h2>
              </div>
              <div className="events-container">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>

          </div>

          {/* Правая колонка */}
          <div className="col-lg-4">
            
            {/* Notifications - Новый дизайн */}
            <section className="modern-notifications-section">
              <div className="section-header">
                <h2 className="section-title">
                  <i className="bi bi-bell-fill"></i>
                  Уведомления
                  <span className="notification-badge">{notifications.length}</span>
                </h2>
              </div>
              <div className="notifications-container">
                {notifications.map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))}
              </div>
              <Link to="/announcements" className="btn btn-outline-primary w-100 mt-3">
                Все объявления
              </Link>
            </section>

            {/* Progress Section - Новый дизайн */}
            <ProgressSection semester={semester} percentage={65} />

          </div>
        </div>

      </div>
    </div>
  );
}

export default HomePage;