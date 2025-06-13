import React, { useState } from 'react';

function EventsPage() {
  const [filter, setFilter] = useState('all');

  const events = [
    {
      id: 1,
      title: 'Конференция "Инновации в образовании"',
      description: 'Международная научная конференция по современным методам обучения.',
      date: '2025-02-15',
      time: '09:00',
      location: 'Главный корпус, актовый зал',
      category: 'academic',
      status: 'upcoming',
      isRegistered: false
    },
    {
      id: 2,
      title: 'День открытых дверей',
      description: 'Презентация факультетов и специальностей для абитуриентов.',
      date: '2025-02-01',
      time: '10:00',
      location: 'Все корпуса',
      category: 'promotional',
      status: 'upcoming',
      isRegistered: true
    },
    {
      id: 3,
      title: 'Спортивный турнир по футболу',
      description: 'Межфакультетский турнир по мини-футболу среди студентов.',
      date: '2025-01-30',
      time: '15:00',
      location: 'Спортивный комплекс',
      category: 'sports',
      status: 'upcoming',
      isRegistered: false
    }
  ];

  const categories = {
    all: 'Все события',
    academic: 'Академические',
    sports: 'Спортивные',
    cultural: 'Культурные',
    promotional: 'Презентационные'
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming': return 'primary';
      case 'completed': return 'secondary';
      default: return 'secondary';
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'academic': return 'primary';
      case 'sports': return 'success';
      case 'cultural': return 'warning';
      case 'promotional': return 'info';
      default: return 'secondary';
    }
  };

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.category === filter);

  return (
    <div className="container py-4">
      <div className="page-content card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1">События</h2>
            <p className="lead text-muted mb-0">Университетские мероприятия и события</p>
          </div>
          <select 
            className="form-select w-auto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {Object.entries(categories).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>

        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card text-center border-primary">
              <div className="card-body">
                <div className="h4 text-primary">{events.length}</div>
                <small className="text-muted">Всего событий</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center border-success">
              <div className="card-body">
                <div className="h4 text-success">{events.filter(e => e.isRegistered).length}</div>
                <small className="text-muted">Зарегистрирован</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center border-warning">
              <div className="card-body">
                <div className="h4 text-warning">{events.filter(e => e.status === 'upcoming').length}</div>
                <small className="text-muted">Предстоящие</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center border-info">
              <div className="card-body">
                <div className="h4 text-info">{events.filter(e => e.category === 'academic').length}</div>
                <small className="text-muted">Академические</small>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {filteredEvents.map(event => (
            <div key={event.id} className="col-lg-6 mb-4">
              <div className={`card h-100 ${event.isRegistered ? 'border-success' : ''}`}>
                {event.isRegistered && (
                  <div className="alert alert-success mb-0 rounded-top rounded-0">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    <strong>Вы зарегистрированы</strong>
                  </div>
                )}
                <div className="card-header d-flex justify-content-between">
                  <span className={`badge bg-${getCategoryColor(event.category)}`}>
                    {categories[event.category]}
                  </span>
                  <span className={`badge bg-${getStatusColor(event.status)}`}>
                    {event.status === 'upcoming' ? 'Предстоящее' : 'Завершено'}
                  </span>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text">{event.description}</p>
                  
                  <div className="row mb-3">
                    <div className="col-6">
                      <small className="text-muted">Дата и время:</small>
                      <div className="fw-bold">{new Date(event.date).toLocaleDateString('ru-RU')}</div>
                      <div className="text-primary">{event.time}</div>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Место:</small>
                      <div className="fw-bold">{event.location}</div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <button className="btn btn-outline-primary btn-sm">
                      <i className="bi bi-eye me-1"></i>
                      Подробнее
                    </button>
                    {event.status === 'upcoming' && !event.isRegistered && (
                      <button className="btn btn-primary btn-sm">
                        <i className="bi bi-person-plus me-1"></i>
                        Регистрация
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventsPage; 