import React, { useState } from 'react';

function AnnouncementsPage() {
  const [filter, setFilter] = useState('all');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [savedAnnouncements, setSavedAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const announcements = [
    {
      id: 1,
      title: 'Изменения в расписании экзаменов',
      content: 'Уважаемые студенты! Обращаем внимание на изменения в расписании зимней экзаменационной сессии.',
      category: 'academic',
      priority: 'high',
      date: '2025-01-22',
      author: 'Деканат',
      views: 156,
      pinned: true
    },
    {
      id: 2,
      title: 'Открытие новой лаборатории ИТ',
      content: 'С 1 февраля открывается новая компьютерная лаборатория с современным оборудованием.',
      category: 'facility',
      priority: 'medium',
      date: '2025-01-20',
      author: 'Администрация',
      views: 89,
      pinned: false
    },
    {
      id: 3,
      title: 'Стипендиальная программа',
      content: 'Объявляется конкурс на получение повышенной академической стипендии.',
      category: 'scholarship',
      priority: 'high',
      date: '2025-01-18',
      author: 'Стипендиальный отдел',
      views: 234,
      pinned: true
    },
    {
      id: 4,
      title: 'Спортивные мероприятия',
      content: 'Приглашаем всех студентов принять участие в зимних спортивных соревнованиях.',
      category: 'sports',
      priority: 'low',
      date: '2025-01-15',
      author: 'Спортивный клуб',
      views: 67,
      pinned: false
    }
  ];

  const categories = {
    all: 'Все',
    academic: 'Учебные',
    facility: 'Инфраструктура',
    scholarship: 'Стипендии',
    sports: 'Спорт',
    events: 'События'
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'secondary';
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'academic': return 'primary';
      case 'facility': return 'success';
      case 'scholarship': return 'warning';
      case 'sports': return 'info';
      default: return 'secondary';
    }
  };

  const handleViewDetails = (announcement) => {
    setSelectedAnnouncement(announcement);
    // Увеличиваем счетчик просмотров
    const updatedAnnouncements = announcements.map(ann => 
      ann.id === announcement.id 
        ? { ...ann, views: ann.views + 1 }
        : ann
    );
    // В реальном приложении здесь был бы запрос к API
  };

  const handleShare = (announcement) => {
    if (navigator.share) {
      navigator.share({
        title: announcement.title,
        text: announcement.content,
        url: window.location.href
      });
    } else {
      const shareText = `${announcement.title}\n${announcement.content}\n${window.location.href}`;
      navigator.clipboard.writeText(shareText).then(() => {
        showToast('Ссылка скопирована в буфер обмена', 'success');
      });
    }
  };

  const handleSave = (announcement) => {
    const isAlreadySaved = savedAnnouncements.some(saved => saved.id === announcement.id);
    
    if (isAlreadySaved) {
      setSavedAnnouncements(prev => prev.filter(saved => saved.id !== announcement.id));
      showToast('Объявление удалено из сохраненных', 'info');
    } else {
      setSavedAnnouncements(prev => [...prev, announcement]);
      showToast('Объявление сохранено', 'success');
    }
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

  const filteredAnnouncements = announcements.filter(ann => {
    const matchesFilter = filter === 'all' || ann.category === filter;
    const matchesSearch = ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ann.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container py-4">
      <div className="page-content card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1">Объявления</h2>
            <p className="lead text-muted mb-0">Официальные уведомления университета</p>
          </div>
          <div className="d-flex gap-2">
            <div className="input-group" style={{ width: '300px' }}>
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Поиск объявлений..."
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
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card text-center border-primary">
              <div className="card-body">
                <div className="h4 text-primary">{announcements.length}</div>
                <small className="text-muted">Всего объявлений</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center border-danger">
              <div className="card-body">
                <div className="h4 text-danger">{announcements.filter(a => a.priority === 'high').length}</div>
                <small className="text-muted">Важные</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center border-warning">
              <div className="card-body">
                <div className="h4 text-warning">{announcements.filter(a => a.pinned).length}</div>
                <small className="text-muted">Закрепленные</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center border-success">
              <div className="card-body">
                <div className="h4 text-success">{savedAnnouncements.length}</div>
                <small className="text-muted">Сохраненные</small>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {filteredAnnouncements.map(announcement => {
            const isAlreadySaved = savedAnnouncements.some(saved => saved.id === announcement.id);
            
            return (
              <div key={announcement.id} className="col-12 mb-4">
                <div className={`card ${announcement.pinned ? 'border-warning' : ''}`}>
                  {announcement.pinned && (
                    <div className="alert alert-warning mb-0 rounded-top rounded-0">
                      <i className="bi bi-pin-angle-fill me-2"></i>
                      <strong>Закрепленное объявление</strong>
                    </div>
                  )}
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                      <h5 className="mb-0">{announcement.title}</h5>
                      <div className="d-flex gap-2">
                        <span className={`badge bg-${getCategoryColor(announcement.category)}`}>
                          {categories[announcement.category]}
                        </span>
                        <span className={`badge bg-${getPriorityColor(announcement.priority)}`}>
                          {announcement.priority === 'high' ? 'Важно' : 
                           announcement.priority === 'medium' ? 'Средний' : 'Обычный'}
                        </span>
                      </div>
                    </div>
                    <div className="text-muted">
                      <i className="bi bi-eye me-1"></i>
                      {announcement.views}
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="mb-3">{announcement.content}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="text-muted">
                        <i className="bi bi-person-circle me-2"></i>
                        {announcement.author}
                      </div>
                      <div className="text-muted">
                        <i className="bi bi-calendar me-2"></i>
                        {new Date(announcement.date).toLocaleDateString('ru-RU')}
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex gap-2">
                        <button 
                          className="btn btn-outline-primary btn-sm" 
                          onClick={() => handleViewDetails(announcement)}
                        >
                          <i className="bi bi-eye me-1"></i>
                          Подробнее
                        </button>
                        <button 
                          className="btn btn-outline-success btn-sm" 
                          onClick={() => handleShare(announcement)}
                        >
                          <i className="bi bi-share me-1"></i>
                          Поделиться
                        </button>
                      </div>
                      <div className="d-flex gap-2">
                        <button 
                          className={`btn btn-sm ${isAlreadySaved ? 'btn-warning' : 'btn-outline-warning'}`}
                          onClick={() => handleSave(announcement)}
                        >
                          <i className={`bi ${isAlreadySaved ? 'bi-bookmark-fill' : 'bi-bookmark'} me-1`}></i>
                          {isAlreadySaved ? 'Сохранено' : 'Сохранить'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-5">
            <i className="bi bi-inbox display-1 text-muted"></i>
            <h5 className="mt-3 text-muted">Нет объявлений в данной категории</h5>
            <p className="text-muted">Попробуйте выбрать другую категорию или изменить поисковый запрос</p>
          </div>
        )}

        {/* Модальное окно детального просмотра */}
        {selectedAnnouncement && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">
                    <i className="bi bi-megaphone me-2"></i>
                    {selectedAnnouncement.title}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close btn-close-white" 
                    onClick={() => setSelectedAnnouncement(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex gap-2">
                      <span className={`badge bg-${getCategoryColor(selectedAnnouncement.category)}`}>
                        {categories[selectedAnnouncement.category]}
                      </span>
                      <span className={`badge bg-${getPriorityColor(selectedAnnouncement.priority)}`}>
                        {selectedAnnouncement.priority === 'high' ? 'Важно' : 
                         selectedAnnouncement.priority === 'medium' ? 'Средний' : 'Обычный'}
                      </span>
                      {selectedAnnouncement.pinned && (
                        <span className="badge bg-warning">
                          <i className="bi bi-pin-angle-fill me-1"></i>
                          Закреплено
                        </span>
                      )}
                    </div>
                    <div className="text-muted">
                      <i className="bi bi-eye me-1"></i>
                      {selectedAnnouncement.views} просмотров
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="lead">{selectedAnnouncement.content}</p>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-6">
                      <h6>Информация об объявлении:</h6>
                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-person-circle me-2 text-primary"></i>
                        <span><strong>Автор:</strong> {selectedAnnouncement.author}</span>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-calendar me-2 text-success"></i>
                        <span><strong>Дата:</strong> {new Date(selectedAnnouncement.date).toLocaleDateString('ru-RU')}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-tag me-2 text-info"></i>
                        <span><strong>Категория:</strong> {categories[selectedAnnouncement.category]}</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h6>Действия:</h6>
                      <div className="d-grid gap-2">
                        <button 
                          className="btn btn-outline-success btn-sm"
                          onClick={() => handleShare(selectedAnnouncement)}
                        >
                          <i className="bi bi-share me-2"></i>
                          Поделиться объявлением
                        </button>
                        <button 
                          className={`btn btn-sm ${savedAnnouncements.some(s => s.id === selectedAnnouncement.id) ? 'btn-warning' : 'btn-outline-warning'}`}
                          onClick={() => handleSave(selectedAnnouncement)}
                        >
                          <i className={`bi ${savedAnnouncements.some(s => s.id === selectedAnnouncement.id) ? 'bi-bookmark-fill' : 'bi-bookmark'} me-2`}></i>
                          {savedAnnouncements.some(s => s.id === selectedAnnouncement.id) ? 'Убрать из сохраненных' : 'Сохранить объявление'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setSelectedAnnouncement(null)}
                  >
                    Закрыть
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => handleShare(selectedAnnouncement)}
                  >
                    <i className="bi bi-share me-2"></i>
                    Поделиться
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

export default AnnouncementsPage; 