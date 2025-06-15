import React, { useState } from 'react';

function EventsPage() {
  const [viewMode, setViewMode] = useState('list'); // list, calendar
  const [filter, setFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationModal, setRegistrationModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Конференция "Инновации в образовании"',
      description: 'Международная научная конференция по современным методам обучения.',
      fullDescription: 'Международная научная конференция "Инновации в образовании" собирает ведущих экспертов, исследователей и практиков в области образования. В программе: пленарные доклады, секционные заседания, мастер-классы, выставка инновационных решений. Обсуждаются актуальные вопросы цифровизации образования, современные педагогические технологии, международный опыт реформ образования.',
      date: '2025-02-15',
      time: '09:00',
      location: 'Главный корпус, актовый зал',
      category: 'academic',
      status: 'upcoming',
      participants: 150,
      maxParticipants: 200,
      organizer: 'Научный отдел',
      price: 'Бесплатно',
      image: '🎓',
      isRegistered: false,
      requirements: ['Студенческий билет', 'Предварительная регистрация'],
      benefits: ['Сертификат участника', 'Материалы конференции', 'Нетворкинг'],
      agenda: [
        { time: '09:00-09:30', activity: 'Регистрация участников' },
        { time: '09:30-10:00', activity: 'Открытие конференции' },
        { time: '10:00-12:00', activity: 'Пленарные доклады' },
        { time: '12:00-13:00', activity: 'Обед' },
        { time: '13:00-15:00', activity: 'Секционные заседания' },
        { time: '15:00-16:00', activity: 'Мастер-классы' }
      ]
    },
    {
      id: 2,
      title: 'День открытых дверей',
      description: 'Презентация факультетов и специальностей для абитуриентов.',
      fullDescription: 'Ежегодный День открытых дверей университета - это уникальная возможность для абитуриентов и их родителей познакомиться с университетом, его факультетами, специальностями и условиями обучения. Программа включает презентации деканов, встречи с преподавателями, экскурсии по лабораториям и общежитиям.',
      date: '2025-02-01',
      time: '10:00',
      location: 'Все корпуса',
      category: 'promotional',
      status: 'upcoming',
      participants: 89,
      maxParticipants: 500,
      organizer: 'Приемная комиссия',
      price: 'Бесплатно',
      image: '🏫',
      isRegistered: true,
      requirements: ['Документ, удостоверяющий личность'],
      benefits: ['Информационные материалы', 'Консультации', 'Экскурсии'],
      agenda: [
        { time: '10:00-10:30', activity: 'Регистрация' },
        { time: '10:30-11:30', activity: 'Общая презентация университета' },
        { time: '11:30-13:00', activity: 'Презентации факультетов' },
        { time: '13:00-14:00', activity: 'Экскурсии по корпусам' },
        { time: '14:00-15:00', activity: 'Индивидуальные консультации' }
      ]
    },
    {
      id: 3,
      title: 'Спортивный турнир по футболу',
      description: 'Межфакультетский турнир по мини-футболу среди студентов.',
      fullDescription: 'Ежегодный межфакультетский турнир по мини-футболу - одно из самых ярких спортивных событий университета. Соревнования проходят в несколько этапов: групповой турнир, плей-офф, финал. Победители получают кубок и призы. Организуется группа поддержки, работает буфет.',
      date: '2025-01-30',
      time: '15:00',
      location: 'Спортивный комплекс',
      category: 'sports',
      status: 'upcoming',
      participants: 64,
      maxParticipants: 64,
      organizer: 'Спортивный клуб',
      price: 'Бесплатно',
      image: '⚽',
      isRegistered: false,
      requirements: ['Спортивная форма', 'Медицинская справка'],
      benefits: ['Призы победителям', 'Спортивное питание', 'Фото-видео съемка'],
      agenda: [
        { time: '15:00-15:30', activity: 'Регистрация команд' },
        { time: '15:30-17:00', activity: 'Групповые игры' },
        { time: '17:00-17:15', activity: 'Перерыв' },
        { time: '17:15-18:30', activity: 'Плей-офф' },
        { time: '18:30-19:00', activity: 'Финал и награждение' }
      ]
    },
    {
      id: 4,
      title: 'Мастер-класс по программированию',
      description: 'Изучение современных фреймворков веб-разработки.',
      fullDescription: 'Практический мастер-класс по современным технологиям веб-разработки. Рассматриваются популярные JavaScript фреймворки: React, Vue.js, Angular. Участники получат практические навыки создания современных веб-приложений. Необходим базовый уровень знания JavaScript.',
      date: '2025-01-25',
      time: '14:00',
      location: 'IT-лаборатория, корпус Б',
      category: 'educational',
      status: 'completed',
      participants: 30,
      maxParticipants: 30,
      organizer: 'Кафедра ИТ',
      price: 'Бесплатно',
      image: '💻',
      isRegistered: true,
      requirements: ['Ноутбук', 'Базовые знания JavaScript'],
      benefits: ['Сертификат', 'Методические материалы', 'Проектная работа'],
      agenda: [
        { time: '14:00-14:15', activity: 'Знакомство и введение' },
        { time: '14:15-15:00', activity: 'Обзор современных фреймворков' },
        { time: '15:00-16:00', activity: 'Практическая работа с React' },
        { time: '16:00-16:15', activity: 'Перерыв' },
        { time: '16:15-17:00', activity: 'Создание проекта' }
      ]
    },
    {
      id: 5,
      title: 'Культурный вечер "Традиции народов"',
      description: 'Презентация культурного наследия разных народов Казахстана.',
      fullDescription: 'Культурный вечер, посвященный многонациональности Казахстана. В программе: выступления творческих коллективов, презентации национальных костюмов, дегустация национальных блюд, мастер-классы по народным ремеслам. Мероприятие направлено на укрепление межнационального согласия и изучение культурного наследия.',
      date: '2025-02-10',
      time: '18:00',
      location: 'Студенческий центр',
      category: 'cultural',
      status: 'upcoming',
      participants: 45,
      maxParticipants: 100,
      organizer: 'Студенческий совет',
      price: 'Бесплатно',
      image: '🎭',
      isRegistered: false,
      requirements: ['Студенческий билет'],
      benefits: ['Культурная программа', 'Угощения', 'Призы в конкурсах'],
      agenda: [
        { time: '18:00-18:30', activity: 'Регистрация и welcome-зона' },
        { time: '18:30-19:00', activity: 'Открытие вечера' },
        { time: '19:00-20:00', activity: 'Концертная программа' },
        { time: '20:00-20:30', activity: 'Мастер-классы' },
        { time: '20:30-21:00', activity: 'Дегустация и общение' }
      ]
    }
  ]);

  const categories = {
    all: 'Все события',
    academic: 'Академические',
    sports: 'Спортивные',
    cultural: 'Культурные',
    educational: 'Образовательные',
    promotional: 'Презентационные'
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming': return 'primary';
      case 'ongoing': return 'success';
      case 'completed': return 'secondary';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'upcoming': return 'Предстоящее';
      case 'ongoing': return 'Идет сейчас';
      case 'completed': return 'Завершено';
      case 'cancelled': return 'Отменено';
      default: return 'Неизвестно';
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'academic': return 'primary';
      case 'sports': return 'success';
      case 'cultural': return 'warning';
      case 'educational': return 'info';
      case 'promotional': return 'purple';
      default: return 'secondary';
    }
  };

  const getDaysUntilEvent = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate);
    const diffTime = event - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === 'all' || event.category === filter;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleRegister = (event) => {
    if (event.participants >= event.maxParticipants) {
      showToast('Извините, все места заняты', 'warning');
      return;
    }
    setRegistrationModal(event);
  };

  const confirmRegistration = (event) => {
    setEvents(prev => prev.map(e => 
      e.id === event.id 
        ? { ...e, isRegistered: true, participants: e.participants + 1 }
        : e
    ));
    setRegistrationModal(null);
    showToast('Регистрация успешно завершена!', 'success');
  };

  const handleUnregister = (event) => {
    setEvents(prev => prev.map(e => 
      e.id === event.id 
        ? { ...e, isRegistered: false, participants: e.participants - 1 }
        : e
    ));
    showToast('Регистрация отменена', 'info');
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
  };

  const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} position-fixed`;
    toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px; animation: slideIn 0.3s ease;';
    toast.innerHTML = `
      <div class="d-flex align-items-center">
        <i class="bi bi-check-circle me-2"></i>
        ${message}
        <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  return (
    <div className="page-container">
      {/* Заголовок страницы */}
      <div className="page-header">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="page-title">
              <i className="bi bi-calendar-event"></i>
              События
            </h1>
            <p className="page-subtitle">Университетские мероприятия и события</p>
          </div>
          <div className="d-flex gap-2">
            <div className="input-group" style={{ width: '300px' }}>
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Поиск событий..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="form-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              {Object.entries(categories).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
            <div className="btn-group">
              <button 
                className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setViewMode('list')}
              >
                <i className="bi bi-list"></i>
              </button>
              <button 
                className={`btn ${viewMode === 'calendar' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setViewMode('calendar')}
              >
                <i className="bi bi-calendar"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div className="page-section">
        <div className="section-header">
          <h3 className="section-title">
            <i className="bi bi-graph-up"></i>
            Статистика событий
          </h3>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{events.filter(e => e.status === 'upcoming').length}</div>
            <div className="stat-label">Предстоящие</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{events.filter(e => e.isRegistered).length}</div>
            <div className="stat-label">Зарегистрирован</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{events.filter(e => e.status === 'completed').length}</div>
            <div className="stat-label">Завершено</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{events.length}</div>
            <div className="stat-label">Всего событий</div>
          </div>
        </div>
      </div>

      {/* События */}
      <div className="page-section">
        {viewMode === 'list' && (
          <div className="grid-2">
            {filteredEvents.map(event => {
              const daysUntil = getDaysUntilEvent(event.date);
              return (
                <div key={event.id} className="content-card">
                  {event.isRegistered && (
                    <div className="alert alert-success mb-0 rounded-top">
                      <i className="bi bi-check-circle-fill me-2"></i>
                      <strong>Вы зарегистрированы</strong>
                    </div>
                  )}
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <span style={{ fontSize: '1.5rem' }}>{event.image}</span>
                      <div className="d-flex gap-2">
                        <span className={`badge bg-${getCategoryColor(event.category)}`}>
                          {categories[event.category]}
                        </span>
                        <span className={`badge bg-${getStatusColor(event.status)}`}>
                          {getStatusText(event.status)}
                        </span>
                      </div>
                    </div>
                    {event.status === 'upcoming' && daysUntil <= 7 && daysUntil >= 0 && (
                      <span className="badge bg-warning">
                        <i className="bi bi-alarm me-1"></i>
                        {daysUntil === 0 ? 'Сегодня!' : `${daysUntil} дн.`}
                      </span>
                    )}
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{event.title}</h5>
                    <p className="card-text">{event.description}</p>
                    
                    <div className="grid-2 mb-3">
                      <div>
                        <small className="text-muted">Дата и время:</small>
                        <div className="fw-bold">
                          {new Date(event.date).toLocaleDateString('ru-RU')}
                        </div>
                        <div className="text-primary">{event.time}</div>
                      </div>
                      <div>
                        <small className="text-muted">Место:</small>
                        <div className="fw-bold">{event.location}</div>
                      </div>
                    </div>

                    <div className="grid-2 mb-3">
                      <div>
                        <small className="text-muted">Участники:</small>
                        <div>
                          <span className="fw-bold">{event.participants}</span>
                          <span className="text-muted">/{event.maxParticipants}</span>
                        </div>
                        <div className="progress mt-1" style={{ height: '5px' }}>
                          <div 
                            className="progress-bar bg-info"
                            style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <small className="text-muted">Организатор:</small>
                        <div className="fw-bold">{event.organizer}</div>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="badge bg-success">{event.price}</span>
                        <div className="d-flex gap-2">
                          <button 
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => handleViewDetails(event)}
                          >
                            <i className="bi bi-eye me-1"></i>
                            Подробнее
                          </button>
                          {event.status === 'upcoming' && (
                            event.isRegistered ? (
                              <button 
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => handleUnregister(event)}
                              >
                                <i className="bi bi-x-circle me-1"></i>
                                Отменить
                              </button>
                            ) : (
                              <button 
                                className="btn btn-primary btn-sm"
                                onClick={() => handleRegister(event)}
                                disabled={event.participants >= event.maxParticipants}
                              >
                                <i className="bi bi-person-plus me-1"></i>
                                {event.participants >= event.maxParticipants ? 'Заполнено' : 'Регистрация'}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {viewMode === 'calendar' && (
          <div className="content-card">
            <div className="card-header">
              <h5 className="mb-0">Календарь событий</h5>
            </div>
            <div className="card-body">
              <div className="text-center py-5">
                <i className="bi bi-calendar4-week display-1 text-muted"></i>
                <h5 className="mt-3 text-muted">Календарный вид</h5>
                <p className="text-muted">Календарный виджет будет добавлен в следующих версиях</p>
                <div className="grid-3 mt-4">
                  {filteredEvents.filter(e => e.status === 'upcoming').map(event => (
                    <div key={event.id} className="content-card">
                      <div className="card-body text-start">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="card-title mb-1">{event.title}</h6>
                          <span className={`badge bg-${getCategoryColor(event.category)}`}>
                            {categories[event.category]}
                          </span>
                        </div>
                        <p className="card-text small text-muted mb-2">{event.description}</p>
                        <div className="small">
                          <div><i className="bi bi-calendar me-1"></i>{new Date(event.date).toLocaleDateString('ru-RU')}</div>
                          <div><i className="bi bi-clock me-1"></i>{event.time}</div>
                          <div><i className="bi bi-geo-alt me-1"></i>{event.location}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {filteredEvents.length === 0 && (
          <div className="text-center py-5">
            <i className="bi bi-calendar-x display-1 text-muted"></i>
            <h5 className="mt-3 text-muted">Нет событий в данной категории</h5>
            <p className="text-muted">Попробуйте выбрать другую категорию или изменить поисковый запрос</p>
          </div>
        )}

        {/* Модальное окно детального просмотра */}
        {selectedEvent && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title d-flex align-items-center gap-2">
                    <span style={{ fontSize: '1.5rem' }}>{selectedEvent.image}</span>
                    {selectedEvent.title}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setSelectedEvent(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="d-flex gap-2 mb-3">
                        <span className={`badge bg-${getCategoryColor(selectedEvent.category)}`}>
                          {categories[selectedEvent.category]}
                        </span>
                        <span className={`badge bg-${getStatusColor(selectedEvent.status)}`}>
                          {getStatusText(selectedEvent.status)}
                        </span>
                        {selectedEvent.isRegistered && (
                          <span className="badge bg-success">
                            <i className="bi bi-check-circle-fill me-1"></i>
                            Зарегистрирован
                          </span>
                        )}
                      </div>
                      
                      <h6>Описание события:</h6>
                      <p className="mb-4">{selectedEvent.fullDescription}</p>
                      
                      <h6>Программа мероприятия:</h6>
                      <div className="list-group mb-4">
                        {selectedEvent.agenda.map((item, index) => (
                          <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                              <strong>{item.time}</strong>
                              <div className="small text-muted">{item.activity}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="row">
                        <div className="col-md-6">
                          <h6>Требования:</h6>
                          <ul className="list-unstyled">
                            {selectedEvent.requirements.map((req, index) => (
                              <li key={index} className="mb-1">
                                <i className="bi bi-check text-success me-2"></i>
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-md-6">
                          <h6>Что получите:</h6>
                          <ul className="list-unstyled">
                            {selectedEvent.benefits.map((benefit, index) => (
                              <li key={index} className="mb-1">
                                <i className="bi bi-gift text-primary me-2"></i>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-4">
                      <div className="card">
                        <div className="card-header">
                          <h6 className="mb-0">Информация о событии</h6>
                        </div>
                        <div className="card-body">
                          <div className="mb-3">
                            <i className="bi bi-calendar text-primary me-2"></i>
                            <strong>Дата:</strong> {new Date(selectedEvent.date).toLocaleDateString('ru-RU')}
                          </div>
                          <div className="mb-3">
                            <i className="bi bi-clock text-success me-2"></i>
                            <strong>Время:</strong> {selectedEvent.time}
                          </div>
                          <div className="mb-3">
                            <i className="bi bi-geo-alt text-info me-2"></i>
                            <strong>Место:</strong> {selectedEvent.location}
                          </div>
                          <div className="mb-3">
                            <i className="bi bi-person-circle text-warning me-2"></i>
                            <strong>Организатор:</strong> {selectedEvent.organizer}
                          </div>
                          <div className="mb-3">
                            <i className="bi bi-currency-dollar text-success me-2"></i>
                            <strong>Стоимость:</strong> {selectedEvent.price}
                          </div>
                          <div className="mb-3">
                            <i className="bi bi-people text-primary me-2"></i>
                            <strong>Участники:</strong> {selectedEvent.participants}/{selectedEvent.maxParticipants}
                            <div className="progress mt-2" style={{ height: '8px' }}>
                              <div 
                                className="progress-bar bg-info"
                                style={{ width: `${(selectedEvent.participants / selectedEvent.maxParticipants) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          {selectedEvent.status === 'upcoming' && (
                            <div className="d-grid gap-2">
                              {selectedEvent.isRegistered ? (
                                <button 
                                  className="btn btn-outline-danger"
                                  onClick={() => {
                                    handleUnregister(selectedEvent);
                                    setSelectedEvent(null);
                                  }}
                                >
                                  <i className="bi bi-x-circle me-2"></i>
                                  Отменить регистрацию
                                </button>
                              ) : (
                                <button 
                                  className="btn btn-primary"
                                  onClick={() => {
                                    setSelectedEvent(null);
                                    handleRegister(selectedEvent);
                                  }}
                                  disabled={selectedEvent.participants >= selectedEvent.maxParticipants}
                                >
                                  <i className="bi bi-person-plus me-2"></i>
                                  {selectedEvent.participants >= selectedEvent.maxParticipants ? 'Места закончились' : 'Зарегистрироваться'}
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setSelectedEvent(null)}
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Модальное окно регистрации */}
        {registrationModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-success text-white">
                  <h5 className="modal-title">
                    <i className="bi bi-person-plus me-2"></i>
                    Регистрация на событие
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close btn-close-white" 
                    onClick={() => setRegistrationModal(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <h6>{registrationModal.title}</h6>
                  <p className="text-muted">{registrationModal.description}</p>
                  
                  <div className="alert alert-info">
                    <i className="bi bi-info-circle me-2"></i>
                    <strong>Дата и время:</strong> {new Date(registrationModal.date).toLocaleDateString('ru-RU')} в {registrationModal.time}
                    <br />
                    <strong>Место:</strong> {registrationModal.location}
                  </div>
                  
                  <h6>Требования для участия:</h6>
                  <ul className="list-unstyled">
                    {registrationModal.requirements.map((req, index) => (
                      <li key={index} className="mb-2">
                        <i className="bi bi-check-circle text-success me-2"></i>
                        {req}
                      </li>
                    ))}
                  </ul>
                  
                  <p className="small text-muted">
                    Нажимая "Зарегистрироваться", вы подтверждаете, что соответствуете всем требованиям и обязуетесь присутствовать на мероприятии.
                  </p>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setRegistrationModal(null)}
                  >
                    Отмена
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-success"
                    onClick={() => confirmRegistration(registrationModal)}
                  >
                    <i className="bi bi-check-circle me-2"></i>
                    Зарегистрироваться
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventsPage; 