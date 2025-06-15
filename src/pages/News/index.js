import React, { useState } from 'react';
import './styles.css';

function NewsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedNews, setSelectedNews] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [sortBy, setSortBy] = useState('date'); // date, views, title
  const [viewMode, setViewMode] = useState('grid'); // grid, list

  const [newsData, setNewsData] = useState([
    { 
      id: 1, 
      title: 'Важное объявление о предстоящей сессии', 
      summary: 'Напоминаем о предстоящей сессии. Проверьте расписание экзаменов.',
      content: 'Уважаемые студенты! Напоминаем о предстоящей зимней экзаменационной сессии. Пожалуйста, внимательно проверьте расписание экзаменов и зачетов в личном кабинете. Сессия начинается 15 февраля 2025 года. Убедитесь, что у вас нет академических задолженностей.',
      date: '2025-01-22',
      time: '14:30',
      category: 'academic',
      author: 'Деканат',
      views: 342,
      likes: 28,
      comments: 5,
      image: '📚',
      tags: ['сессия', 'экзамены', 'расписание'],
      priority: 'high',
      pinned: true
    },
    { 
      id: 2, 
      title: 'Открыт набор на новый курс по машинному обучению', 
      summary: 'Регистрация на инновационный курс до конца месяца.',
      content: 'Кафедра информационных технологий объявляет о начале набора на специализированный курс по машинному обучению и искусственному интеллекту. Курс рассчитан на 3 месяца, включает практические проекты с реальными данными. Регистрация открыта до 31 января 2025 года.',
      date: '2025-01-20',
      time: '10:15',
      category: 'educational',
      author: 'Кафедра ИТ',
      views: 156,
      likes: 42,
      comments: 12,
      image: '🤖',
      tags: ['машинное обучение', 'ИТ', 'курсы'],
      priority: 'medium',
      pinned: false
    },
    { 
      id: 3, 
      title: 'Обновление информационной системы университета', 
      summary: 'Плановые технические работы в выходные дни.',
      content: 'В ближайшие выходные (25-26 января) будет проводиться плановое обновление информационной системы университета. Возможны кратковременные перебои в работе электронных сервисов. Приносим извинения за временные неудобства.',
      date: '2025-01-18',
      time: '16:45',
      category: 'technical',
      author: 'IT-отдел',
      views: 89,
      likes: 8,
      comments: 3,
      image: '⚙️',
      tags: ['техработы', 'система', 'обновление'],
      priority: 'low',
      pinned: false
    },
    {
      id: 4,
      title: 'Международная студенческая конференция 2025',
      summary: 'Приглашаем к участию в престижном научном мероприятии.',
      content: 'Университет проводит ежегодную международную студенческую конференцию "Наука и инновации 2025". Мероприятие состоится 15-16 марта в главном корпусе. Принимаются заявки на выступления по направлениям: ИТ, экономика, естественные науки. Победители получат ценные призы и возможность стажировки.',
      date: '2025-01-16',
      time: '12:00',
      category: 'events',
      author: 'Научный отдел',
      views: 234,
      likes: 67,
      comments: 18,
      image: '🏆',
      tags: ['конференция', 'наука', 'международное'],
      priority: 'high',
      pinned: true
    },
    {
      id: 5,
      title: 'Новые стипендиальные программы',
      summary: 'Расширен список доступных стипендий для студентов.',
      content: 'Рады сообщить о запуске новых стипендиальных программ для студентов всех курсов. Добавлены стипендии за академические успехи, научную деятельность и социальную активность. Подача заявок через личный кабинет до 10 февраля.',
      date: '2025-01-15',
      time: '09:30',
      category: 'financial',
      author: 'Стипендиальный отдел',
      views: 445,
      likes: 89,
      comments: 24,
      image: '💰',
      tags: ['стипендии', 'финансы', 'поддержка'],
      priority: 'medium',
      pinned: false
    }
  ]);

  const categories = {
    all: 'Все новости',
    academic: 'Учебные',
    educational: 'Образовательные',
    technical: 'Технические',
    events: 'События',
    financial: 'Финансовые'
  };

  const getCategoryColor = (category) => {
    const colors = {
      academic: 'primary',
      educational: 'success', 
      technical: 'warning',
      events: 'info',
      financial: 'purple'
    };
    return colors[category] || 'secondary';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'danger',
      medium: 'warning', 
      low: 'success'
    };
    return colors[priority] || 'secondary';
  };

  const filteredNews = newsData
    .filter(news => {
      const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           news.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           news.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || news.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'views': return b.views - a.views;
        case 'title': return a.title.localeCompare(b.title);
        case 'date': 
        default: 
          return new Date(b.date) - new Date(a.date);
      }
    });

  const handleLike = (newsId) => {
    setNewsData(prev => prev.map(news => 
      news.id === newsId 
        ? { ...news, likes: news.likes + 1 }
        : news
    ));
  };

  const handleShare = (news) => {
    if (navigator.share) {
      navigator.share({
        title: news.title,
        text: news.summary,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${news.title}\n${window.location.href}`);
      showToast('Ссылка скопирована в буфер обмена', 'success');
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

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getTimeAgo = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'вчера';
    if (diffDays < 7) return `${diffDays} дн. назад`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} нед. назад`;
    return formatDate(dateStr);
  };

  return (
    <div className="page-container">
      {/* Заголовок страницы */}
      <div className="page-header">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="page-title">
              <i className="bi bi-newspaper"></i>
              Новости и объявления
            </h1>
            <p className="page-subtitle">Актуальная информация и важные сообщения</p>
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div className="page-section">
        <div className="section-header">
          <h3 className="section-title">
            <i className="bi bi-graph-up"></i>
            Статистика новостей
          </h3>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{newsData.length}</div>
            <div className="stat-label">Всего новостей</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{newsData.filter(n => n.priority === 'high').length}</div>
            <div className="stat-label">Важные</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{newsData.filter(n => n.pinned).length}</div>
            <div className="stat-label">Закрепленные</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">
              {Math.round(newsData.reduce((sum, n) => sum + n.views, 0) / newsData.length)}
            </div>
            <div className="stat-label">Средние просмотры</div>
          </div>
        </div>
      </div>

      {/* Поиск и фильтры */}
      <div className="page-section">
        <div className="section-header">
          <h3 className="section-title">
            <i className="bi bi-funnel"></i>
            Поиск и фильтры
          </h3>
        </div>
        <div className="row g-3">
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Поиск новостей..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <select 
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {Object.entries(categories).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select 
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">По дате</option>
              <option value="views">По просмотрам</option>
              <option value="title">По названию</option>
            </select>
          </div>
          <div className="col-md-2">
            <div className="btn-group w-100">
              <button 
                className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setViewMode('grid')}
              >
                <i className="bi bi-grid"></i>
              </button>
              <button 
                className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setViewMode('list')}
              >
                <i className="bi bi-list"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Новости */}
      <div className="page-section">
        {viewMode === 'grid' ? (
          <div className="row">
            {filteredNews.map(news => (
              <div key={news.id} className="col-lg-6 mb-4">
                <div className={`content-card h-100 ${news.pinned ? 'border-warning' : ''}`}>
                  {news.pinned && (
                    <div className="alert alert-warning mb-0 rounded-top rounded-0">
                      <i className="bi bi-pin-angle-fill me-2"></i>
                      <strong>Закрепленная новость</strong>
                    </div>
                  )}
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <span style={{ fontSize: '1.5rem' }}>{news.image}</span>
                      <div>
                        <span className={`badge bg-${getCategoryColor(news.category)} me-2`}>
                          {categories[news.category]}
                        </span>
                        <span className={`badge bg-${getPriorityColor(news.priority)}`}>
                          {news.priority === 'high' ? 'Важно' : news.priority === 'medium' ? 'Средний' : 'Обычный'}
                        </span>
                      </div>
                    </div>
                    <small className="text-muted">{getTimeAgo(news.date)}</small>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{news.title}</h5>
                    <p className="card-text">{news.summary}</p>
                    
                    <div className="mt-auto">
                      <div className="d-flex flex-wrap gap-1 mb-3">
                        {news.tags.map(tag => (
                          <span key={tag} className="badge bg-light text-dark">#{tag}</span>
                        ))}
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex gap-3 small text-muted">
                          <span><i className="bi bi-eye me-1"></i>{news.views}</span>
                          <span><i className="bi bi-heart me-1"></i>{news.likes}</span>
                          <span><i className="bi bi-chat me-1"></i>{news.comments}</span>
                        </div>
                        <div className="d-flex gap-2">
                          <button 
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => setSelectedNews(news)}
                          >
                            Читать
                          </button>
                          <button 
                            className="btn btn-outline-success btn-sm"
                            onClick={() => handleLike(news.id)}
                          >
                            <i className="bi bi-heart"></i>
                          </button>
                          <button 
                            className="btn btn-outline-info btn-sm"
                            onClick={() => handleShare(news)}
                          >
                            <i className="bi bi-share"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="list-group">
            {filteredNews.map(news => (
              <div key={news.id} className={`list-group-item ${news.pinned ? 'border-warning' : ''}`}>
                <div className="d-flex justify-content-between align-items-start">
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span style={{ fontSize: '1.2rem' }}>{news.image}</span>
                      <h6 className="mb-0">{news.title}</h6>
                      <span className={`badge bg-${getCategoryColor(news.category)}`}>
                        {categories[news.category]}
                      </span>
                      {news.pinned && <i className="bi bi-pin-angle-fill text-warning"></i>}
                    </div>
                    <p className="mb-2 text-muted">{news.summary}</p>
                    <div className="d-flex gap-1 mb-2">
                      {news.tags.map(tag => (
                        <span key={tag} className="badge bg-light text-dark small">#{tag}</span>
                      ))}
                    </div>
                    <div className="d-flex gap-3 small text-muted">
                      <span><i className="bi bi-eye me-1"></i>{news.views}</span>
                      <span><i className="bi bi-heart me-1"></i>{news.likes}</span>
                      <span><i className="bi bi-calendar me-1"></i>{formatDate(news.date)}</span>
                      <span><i className="bi bi-person me-1"></i>{news.author}</span>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-2 ms-3">
                    <button 
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => setSelectedNews(news)}
                    >
                      Читать
                    </button>
                    <button 
                      className="btn btn-outline-success btn-sm"
                      onClick={() => handleLike(news.id)}
                    >
                      <i className="bi bi-heart"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredNews.length === 0 && (
          <div className="text-center py-5">
            <i className="bi bi-newspaper display-1 text-muted"></i>
            <h5 className="mt-3 text-muted">Новости не найдены</h5>
            <p className="text-muted">Попробуйте изменить параметры поиска или фильтра</p>
          </div>
        )}

        {/* Модальное окно детального просмотра */}
        {selectedNews && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title d-flex align-items-center gap-2">
                    <span style={{ fontSize: '1.5rem' }}>{selectedNews.image}</span>
                    {selectedNews.title}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setSelectedNews(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex gap-2">
                      <span className={`badge bg-${getCategoryColor(selectedNews.category)}`}>
                        {categories[selectedNews.category]}
                      </span>
                      <span className={`badge bg-${getPriorityColor(selectedNews.priority)}`}>
                        {selectedNews.priority === 'high' ? 'Важно' : selectedNews.priority === 'medium' ? 'Средний' : 'Обычный'}
                      </span>
                    </div>
                    <div className="text-muted">
                      <i className="bi bi-calendar me-1"></i>
                      {formatDate(selectedNews.date)} в {selectedNews.time}
                    </div>
                  </div>
                  
                  <p className="lead">{selectedNews.summary}</p>
                  <hr />
                  <div className="text-justify">{selectedNews.content}</div>
                  
                  <hr />
                  <div className="d-flex flex-wrap gap-1 mb-3">
                    {selectedNews.tags.map(tag => (
                      <span key={tag} className="badge bg-light text-dark">#{tag}</span>
                    ))}
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-3 text-muted">
                      <span><i className="bi bi-eye me-1"></i>{selectedNews.views}</span>
                      <span><i className="bi bi-heart me-1"></i>{selectedNews.likes}</span>
                      <span><i className="bi bi-chat me-1"></i>{selectedNews.comments}</span>
                    </div>
                    <div className="text-muted">
                      <i className="bi bi-person-circle me-1"></i>
                      {selectedNews.author}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setSelectedNews(null)}
                  >
                    Закрыть
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-success"
                    onClick={() => handleLike(selectedNews.id)}
                  >
                    <i className="bi bi-heart me-2"></i>
                    Нравится
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => handleShare(selectedNews)}
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

export default NewsPage; 