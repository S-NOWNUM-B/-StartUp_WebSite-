import React, { useState } from 'react';

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const [userData, setUserData] = useState({
    name: 'Иван Иванов',
    studentId: '2024001',
    faculty: 'Информационные технологии',
    specialization: 'Программная инженерия',
    year: '2',
    group: 'ИС-21-1',
    status: 'Активный',
    email: 'ivan.ivanov@eduspace.edu',
    phone: '+7 (777) 123-45-67',
    personalEmail: 'ivan.personal@gmail.com',
    telegram: '@ivan_ivanov',
    birthDate: '1999-05-15',
    nationality: 'Казахстан',
    city: 'Алматы',
    address: 'ул. Достык, 91, кв. 15',
    emergencyContact: '+7 (777) 987-65-43',
    emergencyContactName: 'Мама - Анна Ивановна',
    entryYear: '2021',
    expectedGraduation: '2025',
    gpa: 3.8,
    totalCredits: 145,
    bio: 'Студент 2 курса, увлекаюсь программированием и искусственным интеллектом.',
    interests: ['Программирование', 'ИИ', 'Спорт', 'Музыка'],
    languages: ['Казахский', 'Русский', 'Английский'],
    github: 'https://github.com/ivan-ivanov',
    linkedin: 'https://linkedin.com/in/ivan-ivanov',
    instagram: '@ivan_ivanov_official'
  });

  const [formData, setFormData] = useState({ ...userData });

  const stats = [
    { icon: 'bi-trophy', label: 'Средний балл', value: userData.gpa, suffix: '/4.0', color: 'primary' },
    { icon: 'bi-calendar-check', label: 'Посещаемость', value: '94', suffix: '%', color: 'success' },
    { icon: 'bi-award', label: 'Кредиты ECTS', value: userData.totalCredits, suffix: '', color: 'info' },
    { icon: 'bi-mortarboard', label: 'Курс', value: userData.year, suffix: '/4', color: 'warning' }
  ];

  const achievements = [
    {
      id: 1,
      title: 'Отличник',
      description: 'GPA выше 3.5 в течение семестра',
      date: '2024-12-15',
      earned: true
    },
    {
      id: 2,
      title: 'Активный участник',
      description: '10+ мероприятий в семестре',
      date: '2024-11-20',
      earned: true
    },
    {
      id: 3,
      title: 'Программист года',
      description: 'Лучший проект по программированию',
      date: '2024-10-10',
      earned: true
    },
    {
      id: 4,
      title: 'Идеальная посещаемость',
      description: '100% посещаемость в течение месяца',
      date: null,
      earned: false
    }
  ];

  const activityHistory = [
    {
      id: 1,
      action: 'Сдал лабораторную работу',
      subject: 'Математический анализ',
      date: '2025-01-22 14:30',
      color: 'success'
    },
    {
      id: 2,
      action: 'Получил оценку',
      subject: 'История Казахстана - Отлично',
      date: '2025-01-21 10:15',
      color: 'warning'
    },
    {
      id: 3,
      action: 'Зарегистрировался на экзамен',
      subject: 'Физика',
      date: '2025-01-20 16:45',
      color: 'primary'
    },
    {
      id: 4,
      action: 'Обновил профиль',
      subject: 'Добавлена контактная информация',
      date: '2025-01-19 09:20',
      color: 'info'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setUserData({ ...formData });
    setIsEditing(false);
    showToast('Профиль успешно обновлен!', 'success');
  };

  const handleCancel = () => {
    setFormData({ ...userData });
    setIsEditing(false);
  };

  const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} position-fixed`;
    toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
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
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('ru-RU');
  };

  const formatDateTime = (dateStr) => {
    return new Date(dateStr).toLocaleString('ru-RU');
  };

  return (
    <div className="container py-4">
      <div className="page-content card">
        
        {/* Заголовок страницы */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1">
              <i className="bi bi-person-circle me-2 text-primary"></i>
              Моя информация
            </h2>
            <p className="lead text-muted mb-0">Управление личным профилем</p>
          </div>
          <div className="d-flex gap-2">
            {!isEditing ? (
              <>
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => setIsEditing(true)}
                >
                  <i className="bi bi-pencil me-2"></i>
                  Редактировать
                </button>
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => showToast('Профиль экспортирован!', 'info')}
                >
                  <i className="bi bi-download me-2"></i>
                  Экспорт
                </button>
              </>
            ) : (
              <>
                <button 
                  className="btn btn-success"
                  onClick={handleSave}
                >
                  <i className="bi bi-check me-2"></i>
                  Сохранить
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  <i className="bi bi-x me-2"></i>
                  Отмена
                </button>
              </>
            )}
          </div>
        </div>

        {/* Статистика */}
        <div className="row mb-4">
          {stats.map((stat, index) => (
            <div key={index} className="col-md-3">
              <div className={`card text-center border-${stat.color}`}>
                <div className="card-body">
                  <div className={`h4 text-${stat.color}`}>
                    {stat.value}{stat.suffix}
                  </div>
                  <small className="text-muted">{stat.label}</small>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          {/* Основная информация слева */}
          <div className="col-lg-4 mb-4">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="bi bi-person me-2"></i>
                  Основная информация
                </h5>
              </div>
              <div className="card-body text-center">
                <img 
                  src="https://via.placeholder.com/120x120?text=ИИ" 
                  alt="Avatar" 
                  className="rounded-circle mb-3"
                  style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                />
                <h4 className="mb-1">{userData.name}</h4>
                <p className="text-muted mb-2">ID: {userData.studentId}</p>
                <span className="badge bg-success mb-3">
                  <i className="bi bi-check-circle me-1"></i>
                  {userData.status}
                </span>
                
                <div className="row text-center mb-3">
                  <div className="col-6">
                    <div className="border-end">
                      <h5 className="text-primary mb-0">{userData.year}</h5>
                      <small className="text-muted">Курс</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <h5 className="text-success mb-0">{userData.gpa}</h5>
                    <small className="text-muted">GPA</small>
                  </div>
                </div>

                <div className="text-start">
                  <div className="mb-2">
                    <i className="bi bi-envelope text-primary me-2"></i>
                    <small>{userData.email}</small>
                  </div>
                  <div className="mb-2">
                    <i className="bi bi-telephone text-success me-2"></i>
                    <small>{userData.phone}</small>
                  </div>
                  <div className="mb-2">
                    <i className="bi bi-geo-alt text-info me-2"></i>
                    <small>{userData.city}</small>
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-3">
                    <button 
                      className="btn btn-outline-warning btn-sm w-100"
                      onClick={() => setShowPasswordChange(true)}
                    >
                      <i className="bi bi-shield-lock me-1"></i>
                      Изменить пароль
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Детальная информация справа */}
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'personal' ? 'active' : ''}`}
                      onClick={() => setActiveTab('personal')}
                    >
                      <i className="bi bi-person me-1"></i>
                      Личные данные
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'academic' ? 'active' : ''}`}
                      onClick={() => setActiveTab('academic')}
                    >
                      <i className="bi bi-mortarboard me-1"></i>
                      Академическая информация
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'achievements' ? 'active' : ''}`}
                      onClick={() => setActiveTab('achievements')}
                    >
                      <i className="bi bi-trophy me-1"></i>
                      Достижения
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'activity' ? 'active' : ''}`}
                      onClick={() => setActiveTab('activity')}
                    >
                      <i className="bi bi-clock-history me-1"></i>
                      История
                    </button>
                  </li>
                </ul>
              </div>

              <div className="card-body">
                {/* Вкладка: Личные данные */}
                {activeTab === 'personal' && (
                  <div>
                    <h6 className="mb-3">Основная информация</h6>
                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <label className="form-label">ФИО</label>
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <input className="form-control" value={userData.name} readOnly />
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Дата рождения</label>
                        {isEditing ? (
                          <input
                            type="date"
                            className="form-control"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <input className="form-control" value={formatDate(userData.birthDate)} readOnly />
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Гражданство</label>
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <input className="form-control" value={userData.nationality} readOnly />
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Город</label>
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <input className="form-control" value={userData.city} readOnly />
                        )}
                      </div>
                      <div className="col-12">
                        <label className="form-label">Адрес</label>
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <input className="form-control" value={userData.address} readOnly />
                        )}
                      </div>
                    </div>

                    <h6 className="mb-3">Контактная информация</h6>
                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <label className="form-label">Университетская почта</label>
                        <input className="form-control" value={userData.email} readOnly />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Личная почта</label>
                        {isEditing ? (
                          <input
                            type="email"
                            className="form-control"
                            name="personalEmail"
                            value={formData.personalEmail}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <input className="form-control" value={userData.personalEmail} readOnly />
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Телефон</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            className="form-control"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <input className="form-control" value={userData.phone} readOnly />
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Telegram</label>
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            name="telegram"
                            value={formData.telegram}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <input className="form-control" value={userData.telegram} readOnly />
                        )}
                      </div>
                    </div>

                    <h6 className="mb-3">Экстренный контакт</h6>
                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <label className="form-label">Контактное лицо</label>
                        {isEditing ? (
                          <input
                            type="text"
                            className="form-control"
                            name="emergencyContactName"
                            value={formData.emergencyContactName}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <input className="form-control" value={userData.emergencyContactName} readOnly />
                        )}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Телефон</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            className="form-control"
                            name="emergencyContact"
                            value={formData.emergencyContact}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <input className="form-control" value={userData.emergencyContact} readOnly />
                        )}
                      </div>
                    </div>

                    <h6 className="mb-3">О себе</h6>
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label">Биография</label>
                        {isEditing ? (
                          <textarea
                            className="form-control"
                            rows="3"
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <textarea className="form-control" rows="3" value={userData.bio} readOnly />
                        )}
                      </div>
                      <div className="col-12">
                        <label className="form-label">Интересы</label>
                        <div className="d-flex flex-wrap gap-2">
                          {userData.interests.map((interest, index) => (
                            <span key={index} className="badge bg-primary">
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="col-12">
                        <label className="form-label">Языки</label>
                        <div className="d-flex flex-wrap gap-2">
                          {userData.languages.map((language, index) => (
                            <span key={index} className="badge bg-info">
                              {language}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Вкладка: Академическая информация */}
                {activeTab === 'academic' && (
                  <div>
                    <div className="row g-4">
                      <div className="col-md-6">
                        <h6 className="mb-3">Учебная информация</h6>
                        <div className="mb-3">
                          <label className="form-label">Факультет</label>
                          <input className="form-control" value={userData.faculty} readOnly />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Специализация</label>
                          <input className="form-control" value={userData.specialization} readOnly />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Группа</label>
                          <input className="form-control" value={userData.group} readOnly />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Курс</label>
                          <input className="form-control" value={`${userData.year} курс`} readOnly />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <h6 className="mb-3">Временные рамки</h6>
                        <div className="mb-3">
                          <label className="form-label">Год поступления</label>
                          <input className="form-control" value={userData.entryYear} readOnly />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Ожидаемый выпуск</label>
                          <input className="form-control" value={userData.expectedGraduation} readOnly />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Статус</label>
                          <div>
                            <span className="badge bg-success">{userData.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Вкладка: Достижения */}
                {activeTab === 'achievements' && (
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h6 className="mb-0">Мои достижения</h6>
                      <span className="badge bg-primary">
                        {achievements.filter(a => a.earned).length} из {achievements.length}
                      </span>
                    </div>
                    
                    <div className="row g-3">
                      {achievements.map((achievement) => (
                        <div key={achievement.id} className="col-md-6">
                          <div className={`card ${achievement.earned ? 'border-success' : 'border-secondary'}`}>
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <h6 className="card-title">
                                  {achievement.title}
                                </h6>
                                {achievement.earned ? (
                                  <i className="bi bi-check-circle-fill text-success"></i>
                                ) : (
                                  <i className="bi bi-lock text-muted"></i>
                                )}
                              </div>
                              <p className="card-text text-muted">{achievement.description}</p>
                              {achievement.earned && achievement.date && (
                                <small className="text-success">
                                  <i className="bi bi-calendar me-1"></i>
                                  Получено: {formatDate(achievement.date)}
                                </small>
                              )}
                              {!achievement.earned && (
                                <small className="text-muted">
                                  Пока не получено
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Вкладка: История активности */}
                {activeTab === 'activity' && (
                  <div>
                    <h6 className="mb-4">Последняя активность</h6>
                    <div className="list-group">
                      {activityHistory.map((activity) => (
                        <div key={activity.id} className="list-group-item">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h6 className="mb-1">{activity.action}</h6>
                              <p className="mb-1 text-muted">{activity.subject}</p>
                              <small className="text-muted">
                                <i className="bi bi-clock me-1"></i>
                                {formatDateTime(activity.date)}
                              </small>
                            </div>
                            <span className={`badge bg-${activity.color}`}>
                              {activity.action.includes('Сдал') ? 'Выполнено' : 
                               activity.action.includes('Получил') ? 'Оценка' :
                               activity.action.includes('Зарегистрировался') ? 'Регистрация' : 'Обновление'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-center mt-4">
                      <button className="btn btn-outline-primary">
                        <i className="bi bi-arrow-down me-2"></i>
                        Показать больше
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Модальное окно изменения пароля */}
        {showPasswordChange && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">
                    <i className="bi bi-shield-lock me-2"></i>
                    Изменение пароля
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close btn-close-white" 
                    onClick={() => setShowPasswordChange(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Текущий пароль</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Введите текущий пароль"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Новый пароль</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Введите новый пароль"
                    />
                    <div className="form-text">Пароль должен содержать минимум 8 символов</div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Подтверждение пароля</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Повторите новый пароль"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowPasswordChange(false)}
                  >
                    Отмена
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => {
                      setShowPasswordChange(false);
                      showToast('Пароль успешно изменен!', 'success');
                    }}
                  >
                    <i className="bi bi-shield-check me-2"></i>
                    Изменить пароль
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

export default ProfilePage; 