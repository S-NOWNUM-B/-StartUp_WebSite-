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
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          <i className="bi bi-person-circle"></i>
          Мой Профиль
        </h1>
        <p className="page-description">
          Управление личной информацией и академическими данными
        </p>
        <div className="d-flex gap-3 mt-3">
          {!isEditing ? (
            <>
              <button 
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
              >
                <i className="bi bi-pencil me-2"></i>
                Редактировать
              </button>
              <button 
                className="btn btn-outline-primary"
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
      <div className="grid grid-4">
        {stats.map((stat, index) => (
          <div key={index} className="section text-center">
            <div className={`h2 text-${stat.color} mb-2`}>
              <i className={`bi ${stat.icon} me-2`}></i>
              {stat.value}{stat.suffix}
            </div>
            <div className="text-secondary fw-semibold">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-3">
        {/* Основная информация */}
        <div className="section">
          <h2 className="section-title">
            <i className="bi bi-person-fill"></i>
            Основная Информация
          </h2>
          <div className="text-center mb-4">
            <img 
              src="https://via.placeholder.com/120x120?text=ИИ" 
              alt="Avatar" 
              className="rounded-circle mb-3"
              style={{ 
                width: '120px', 
                height: '120px', 
                objectFit: 'cover',
                border: '4px solid var(--primary)',
                boxShadow: 'var(--shadow-glow)'
              }}
            />
            <h3 className="text-light mb-1">{userData.name}</h3>
            <p className="text-secondary mb-2">ID: {userData.studentId}</p>
            <span className="badge bg-success mb-3">
              <i className="bi bi-check-circle me-1"></i>
              {userData.status}
            </span>
          </div>

          <div className="grid grid-2 mb-4">
            <div className="text-center">
              <div className="h4 text-primary mb-0">{userData.year}</div>
              <small className="text-secondary">Курс</small>
            </div>
            <div className="text-center">
              <div className="h4 text-success mb-0">{userData.gpa}</div>
              <small className="text-secondary">GPA</small>
            </div>
          </div>

          <div className="space-y-3">
            <div className="d-flex align-items-center">
              <i className="bi bi-envelope text-primary me-3"></i>
              <span className="text-light">{userData.email}</span>
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-telephone text-success me-3"></i>
              <span className="text-light">{userData.phone}</span>
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-geo-alt text-info me-3"></i>
              <span className="text-light">{userData.city}</span>
            </div>
          </div>

          {isEditing && (
            <div className="mt-4">
              <button 
                className="btn btn-outline-warning w-100"
                onClick={() => setShowPasswordChange(true)}
              >
                <i className="bi bi-shield-lock me-2"></i>
                Изменить пароль
              </button>
            </div>
          )}
        </div>

        {/* Детальная информация */}
        <div className="section" style={{ gridColumn: 'span 2' }}>
          <div className="d-flex gap-2 mb-4 overflow-auto">
            {[
              { id: 'personal', icon: 'bi-person', label: 'Личные данные' },
              { id: 'academic', icon: 'bi-mortarboard', label: 'Академическая информация' },
              { id: 'achievements', icon: 'bi-trophy', label: 'Достижения' },
              { id: 'activity', icon: 'bi-clock-history', label: 'История' }
            ].map(tab => (
              <button 
                key={tab.id}
                className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-outline-primary'} flex-shrink-0`}
                onClick={() => setActiveTab(tab.id)}
              >
                <i className={`bi ${tab.icon} me-1`}></i>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Вкладка: Личные данные */}
          {activeTab === 'personal' && (
            <div>
              <h4 className="text-primary mb-3">Основная информация</h4>
              <div className="grid grid-2 mb-4">
                <div className="form-group">
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
                <div className="form-group">
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
                <div className="form-group">
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
                <div className="form-group">
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
              </div>

              <div className="form-group mb-4">
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

              <h4 className="text-primary mb-3">Контактная информация</h4>
              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">Университетская почта</label>
                  <input className="form-control" value={userData.email} readOnly />
                </div>
                <div className="form-group">
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
                <div className="form-group">
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
                <div className="form-group">
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
  );
}

export default ProfilePage; 