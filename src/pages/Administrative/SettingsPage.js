import React, { useState } from 'react';

function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile'); // profile, notifications, security, preferences
  const [isLoading, setIsLoading] = useState(false);

  // Состояние для настроек профиля
  const [profileSettings, setProfileSettings] = useState({
    firstName: 'Иван',
    lastName: 'Иванов',
    middleName: 'Иванович',
    email: 'ivan.ivanov@example.com',
    phone: '+7 (777) 123-45-67',
    birthDate: '2003-03-15',
    bio: 'Студент 2 курса факультета информационных технологий, изучаю программную инженерию.',
    socialLinks: {
      github: 'https://github.com/ivanov',
      linkedin: '',
      telegram: '@ivanov_student'
    }
  });

  // Состояние для уведомлений
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: {
      grades: true,
      schedule: true,
      assignments: true,
      announcements: false,
      deadlines: true,
      messages: true
    },
    pushNotifications: {
      enabled: true,
      grades: true,
      schedule: false,
      assignments: true,
      deadlines: true
    },
    smsNotifications: {
      enabled: false,
      emergencyOnly: true
    }
  });

  // Состояние для настроек безопасности
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    sessionTimeout: '30', // minutes
    allowMultipleSessions: true,
    showLastLogin: true
  });

  // Состояние для предпочтений
  const [preferences, setPreferences] = useState({
    language: 'russian',
    theme: 'light',
    timezone: 'Asia/Almaty',
    dateFormat: 'DD.MM.YYYY',
    currency: 'KZT',
    itemsPerPage: '20',
    defaultView: 'grid',
    autoSave: true
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileUpdate = async () => {
    setIsLoading(true);
    // Симуляция API запроса
    setTimeout(() => {
      alert('Профиль успешно обновлен!');
      setIsLoading(false);
    }, 1000);
  };

  const handleNotificationUpdate = () => {
    alert('Настройки уведомлений сохранены!');
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('Пароль должен содержать минимум 8 символов!');
      return;
    }
    alert('Пароль успешно изменен!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleSecurityUpdate = () => {
    alert('Настройки безопасности сохранены!');
  };

  const handlePreferencesUpdate = () => {
    alert('Предпочтения сохранены!');
  };

  const handle2FAToggle = () => {
    if (!securitySettings.twoFactorAuth) {
      // Включение 2FA
      alert('Для включения двухфакторной аутентификации на ваш email будет отправлена ссылка для подтверждения.');
    } else {
      // Отключение 2FA
      const confirmed = window.confirm('Вы уверены, что хотите отключить двухфакторную аутентификацию? Это снизит безопасность вашего аккаунта.');
      if (!confirmed) return;
    }
    
    setSecuritySettings(prev => ({
      ...prev,
      twoFactorAuth: !prev.twoFactorAuth
    }));
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm('ВНИМАНИЕ! Это действие необратимо. Все ваши данные будут удалены безвозвратно. Вы уверены?');
    if (confirmed) {
      const doubleConfirm = window.confirm('Последнее предупреждение! Введите "УДАЛИТЬ" в следующем диалоге для подтверждения.');
      if (doubleConfirm) {
        const typed = prompt('Введите "УДАЛИТЬ" для подтверждения:');
        if (typed === 'УДАЛИТЬ') {
          alert('Запрос на удаление аккаунта отправлен. В течение 7 дней вы можете отменить это действие, обратившись в службу поддержки.');
        }
      }
    }
  };

  return (
    <div className="container py-4">
      <div className="page-content card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1">Настройки</h2>
            <p className="lead text-muted mb-0">Управление профилем и предпочтениями</p>
          </div>
        </div>

        {/* Навигационные табы */}
        <ul className="nav nav-pills mb-4">
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <i className="bi bi-person me-2"></i>
              Профиль
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <i className="bi bi-bell me-2"></i>
              Уведомления
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <i className="bi bi-shield-lock me-2"></i>
              Безопасность
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveTab('preferences')}
            >
              <i className="bi bi-gear me-2"></i>
              Предпочтения
            </button>
          </li>
        </ul>

        {/* Настройки профиля */}
        {activeTab === 'profile' && (
          <div>
            <h4 className="mb-4">Настройки профиля</h4>
            
            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Основная информация</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Имя</label>
                        <input
                          type="text"
                          className="form-control"
                          value={profileSettings.firstName}
                          onChange={(e) => setProfileSettings(prev => ({...prev, firstName: e.target.value}))}
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Фамилия</label>
                        <input
                          type="text"
                          className="form-control"
                          value={profileSettings.lastName}
                          onChange={(e) => setProfileSettings(prev => ({...prev, lastName: e.target.value}))}
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Отчество</label>
                        <input
                          type="text"
                          className="form-control"
                          value={profileSettings.middleName}
                          onChange={(e) => setProfileSettings(prev => ({...prev, middleName: e.target.value}))}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={profileSettings.email}
                          onChange={(e) => setProfileSettings(prev => ({...prev, email: e.target.value}))}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Телефон</label>
                        <input
                          type="tel"
                          className="form-control"
                          value={profileSettings.phone}
                          onChange={(e) => setProfileSettings(prev => ({...prev, phone: e.target.value}))}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Дата рождения</label>
                      <input
                        type="date"
                        className="form-control"
                        value={profileSettings.birthDate}
                        onChange={(e) => setProfileSettings(prev => ({...prev, birthDate: e.target.value}))}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">О себе</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={profileSettings.bio}
                        onChange={(e) => setProfileSettings(prev => ({...prev, bio: e.target.value}))}
                        placeholder="Расскажите немного о себе..."
                      ></textarea>
                    </div>

                    <h6 className="mb-3">Социальные сети</h6>
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label">GitHub</label>
                        <input
                          type="url"
                          className="form-control"
                          placeholder="https://github.com/username"
                          value={profileSettings.socialLinks.github}
                          onChange={(e) => setProfileSettings(prev => ({
                            ...prev,
                            socialLinks: {...prev.socialLinks, github: e.target.value}
                          }))}
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">LinkedIn</label>
                        <input
                          type="url"
                          className="form-control"
                          placeholder="https://linkedin.com/in/username"
                          value={profileSettings.socialLinks.linkedin}
                          onChange={(e) => setProfileSettings(prev => ({
                            ...prev,
                            socialLinks: {...prev.socialLinks, linkedin: e.target.value}
                          }))}
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Telegram</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="@username"
                          value={profileSettings.socialLinks.telegram}
                          onChange={(e) => setProfileSettings(prev => ({
                            ...prev,
                            socialLinks: {...prev.socialLinks, telegram: e.target.value}
                          }))}
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <button 
                        className="btn btn-primary"
                        onClick={handleProfileUpdate}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Сохранение...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-check-lg me-2"></i>
                            Сохранить изменения
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">Фото профиля</h6>
                  </div>
                  <div className="card-body text-center">
                    <div className="mb-3">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${profileSettings.firstName}+${profileSettings.lastName}&size=120&background=007bff&color=white`} 
                        alt="Аватар" 
                        className="rounded-circle"
                        width="120"
                        height="120"
                      />
                    </div>
                    <input type="file" className="form-control mb-3" accept="image/*" />
                    <button className="btn btn-outline-primary btn-sm">
                      <i className="bi bi-camera me-2"></i>
                      Обновить фото
                    </button>
                    <div className="mt-3">
                      <small className="text-muted">
                        Рекомендуемый размер: 400x400px<br/>
                        Максимальный размер: 5MB
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Настройки уведомлений */}
        {activeTab === 'notifications' && (
          <div>
            <h4 className="mb-4">Настройки уведомлений</h4>

            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Email уведомления</h5>
                  </div>
                  <div className="card-body">
                    {Object.entries({
                      grades: 'Оценки',
                      schedule: 'Расписание',
                      assignments: 'Задания',
                      announcements: 'Объявления',
                      deadlines: 'Дедлайны',
                      messages: 'Сообщения'
                    }).map(([key, label]) => (
                      <div key={key} className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={notificationSettings.emailNotifications[key]}
                          onChange={(e) => setNotificationSettings(prev => ({
                            ...prev,
                            emailNotifications: {
                              ...prev.emailNotifications,
                              [key]: e.target.checked
                            }
                          }))}
                        />
                        <label className="form-check-label">{label}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Push уведомления</h5>
                  </div>
                  <div className="card-body">
                    <div className="form-check form-switch mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={notificationSettings.pushNotifications.enabled}
                        onChange={(e) => setNotificationSettings(prev => ({
                          ...prev,
                          pushNotifications: {
                            ...prev.pushNotifications,
                            enabled: e.target.checked
                          }
                        }))}
                      />
                      <label className="form-check-label fw-bold">Включить push уведомления</label>
                    </div>

                    {notificationSettings.pushNotifications.enabled && (
                      <>
                        {Object.entries({
                          grades: 'Оценки',
                          schedule: 'Расписание',
                          assignments: 'Задания',
                          deadlines: 'Дедлайны'
                        }).map(([key, label]) => (
                          <div key={key} className="form-check mb-2">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={notificationSettings.pushNotifications[key]}
                              onChange={(e) => setNotificationSettings(prev => ({
                                ...prev,
                                pushNotifications: {
                                  ...prev.pushNotifications,
                                  [key]: e.target.checked
                                }
                              }))}
                            />
                            <label className="form-check-label">{label}</label>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>

                <div className="card mt-3">
                  <div className="card-header">
                    <h6 className="mb-0">SMS уведомления</h6>
                  </div>
                  <div className="card-body">
                    <div className="form-check form-switch mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={notificationSettings.smsNotifications.enabled}
                        onChange={(e) => setNotificationSettings(prev => ({
                          ...prev,
                          smsNotifications: {
                            ...prev.smsNotifications,
                            enabled: e.target.checked
                          }
                        }))}
                      />
                      <label className="form-check-label">Включить SMS уведомления</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={notificationSettings.smsNotifications.emergencyOnly}
                        onChange={(e) => setNotificationSettings(prev => ({
                          ...prev,
                          smsNotifications: {
                            ...prev.smsNotifications,
                            emergencyOnly: e.target.checked
                          }
                        }))}
                      />
                      <label className="form-check-label">Только экстренные уведомления</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button className="btn btn-primary" onClick={handleNotificationUpdate}>
                <i className="bi bi-check-lg me-2"></i>
                Сохранить настройки
              </button>
            </div>
          </div>
        )}

        {/* Настройки безопасности */}
        {activeTab === 'security' && (
          <div>
            <h4 className="mb-4">Настройки безопасности</h4>

            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Смена пароля</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">Текущий пароль</label>
                      <input
                        type="password"
                        className="form-control"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData(prev => ({...prev, currentPassword: e.target.value}))}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Новый пароль</label>
                      <input
                        type="password"
                        className="form-control"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData(prev => ({...prev, newPassword: e.target.value}))}
                      />
                      <div className="form-text">Минимум 8 символов, включая цифры и спецсимволы</div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Подтвердите пароль</label>
                      <input
                        type="password"
                        className="form-control"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({...prev, confirmPassword: e.target.value}))}
                      />
                    </div>
                    <button className="btn btn-warning" onClick={handlePasswordChange}>
                      <i className="bi bi-key me-2"></i>
                      Изменить пароль
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Дополнительная безопасность</h5>
                  </div>
                  <div className="card-body">
                    <div className="form-check form-switch mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={securitySettings.twoFactorAuth}
                        onChange={handle2FAToggle}
                      />
                      <label className="form-check-label fw-bold">
                        Двухфакторная аутентификация
                        {securitySettings.twoFactorAuth && (
                          <span className="badge bg-success ms-2">Включена</span>
                        )}
                      </label>
                    </div>

                    <div className="form-check form-switch mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={securitySettings.loginNotifications}
                        onChange={(e) => setSecuritySettings(prev => ({
                          ...prev,
                          loginNotifications: e.target.checked
                        }))}
                      />
                      <label className="form-check-label">Уведомления о входе в систему</label>
                    </div>

                    <div className="form-check form-switch mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={securitySettings.allowMultipleSessions}
                        onChange={(e) => setSecuritySettings(prev => ({
                          ...prev,
                          allowMultipleSessions: e.target.checked
                        }))}
                      />
                      <label className="form-check-label">Разрешить множественные сессии</label>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Автоматический выход (минуты)</label>
                      <select
                        className="form-select"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => setSecuritySettings(prev => ({
                          ...prev,
                          sessionTimeout: e.target.value
                        }))}
                      >
                        <option value="15">15 минут</option>
                        <option value="30">30 минут</option>
                        <option value="60">1 час</option>
                        <option value="120">2 часа</option>
                        <option value="0">Никогда</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="card mt-3 border-danger">
                  <div className="card-header bg-danger text-white">
                    <h6 className="mb-0">Опасная зона</h6>
                  </div>
                  <div className="card-body">
                    <p className="text-muted">После удаления аккаунта все данные будут безвозвратно утеряны.</p>
                    <button className="btn btn-outline-danger" onClick={handleDeleteAccount}>
                      <i className="bi bi-trash me-2"></i>
                      Удалить аккаунт
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button className="btn btn-primary" onClick={handleSecurityUpdate}>
                <i className="bi bi-check-lg me-2"></i>
                Сохранить настройки
              </button>
            </div>
          </div>
        )}

        {/* Предпочтения */}
        {activeTab === 'preferences' && (
          <div>
            <h4 className="mb-4">Предпочтения</h4>

            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Внешний вид</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">Язык интерфейса</label>
                      <select
                        className="form-select"
                        value={preferences.language}
                        onChange={(e) => setPreferences(prev => ({...prev, language: e.target.value}))}
                      >
                        <option value="russian">Русский</option>
                        <option value="kazakh">Қазақша</option>
                        <option value="english">English</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Тема</label>
                      <select
                        className="form-select"
                        value={preferences.theme}
                        onChange={(e) => setPreferences(prev => ({...prev, theme: e.target.value}))}
                      >
                        <option value="light">Светлая</option>
                        <option value="dark">Темная</option>
                        <option value="auto">Автоматически</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Элементов на странице</label>
                      <select
                        className="form-select"
                        value={preferences.itemsPerPage}
                        onChange={(e) => setPreferences(prev => ({...prev, itemsPerPage: e.target.value}))}
                      >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Вид по умолчанию</label>
                      <div className="btn-group w-100" role="group">
                        <input
                          type="radio"
                          className="btn-check"
                          name="defaultView"
                          id="gridView"
                          checked={preferences.defaultView === 'grid'}
                          onChange={() => setPreferences(prev => ({...prev, defaultView: 'grid'}))}
                        />
                        <label className="btn btn-outline-primary" htmlFor="gridView">
                          <i className="bi bi-grid me-2"></i>Сетка
                        </label>

                        <input
                          type="radio"
                          className="btn-check"
                          name="defaultView"
                          id="listView"
                          checked={preferences.defaultView === 'list'}
                          onChange={() => setPreferences(prev => ({...prev, defaultView: 'list'}))}
                        />
                        <label className="btn btn-outline-primary" htmlFor="listView">
                          <i className="bi bi-list me-2"></i>Список
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Региональные настройки</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">Часовой пояс</label>
                      <select
                        className="form-select"
                        value={preferences.timezone}
                        onChange={(e) => setPreferences(prev => ({...prev, timezone: e.target.value}))}
                      >
                        <option value="Asia/Almaty">Алматы (UTC+6)</option>
                        <option value="Asia/Astana">Астана (UTC+6)</option>
                        <option value="Europe/Moscow">Москва (UTC+3)</option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Формат даты</label>
                      <select
                        className="form-select"
                        value={preferences.dateFormat}
                        onChange={(e) => setPreferences(prev => ({...prev, dateFormat: e.target.value}))}
                      >
                        <option value="DD.MM.YYYY">ДД.ММ.ГГГГ</option>
                        <option value="MM/DD/YYYY">ММ/ДД/ГГГГ</option>
                        <option value="YYYY-MM-DD">ГГГГ-ММ-ДД</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Валюта</label>
                      <select
                        className="form-select"
                        value={preferences.currency}
                        onChange={(e) => setPreferences(prev => ({...prev, currency: e.target.value}))}
                      >
                        <option value="KZT">Тенге (₸)</option>
                        <option value="RUB">Рубль (₽)</option>
                        <option value="USD">Доллар ($)</option>
                        <option value="EUR">Евро (€)</option>
                      </select>
                    </div>

                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={preferences.autoSave}
                        onChange={(e) => setPreferences(prev => ({...prev, autoSave: e.target.checked}))}
                      />
                      <label className="form-check-label">Автосохранение изменений</label>
                    </div>
                  </div>
                </div>

                <div className="card mt-3">
                  <div className="card-header">
                    <h6 className="mb-0">Статистика использования</h6>
                  </div>
                  <div className="card-body">
                    <div className="row text-center">
                      <div className="col-6">
                        <div className="h5 text-primary">47</div>
                        <small className="text-muted">Дней активности</small>
                      </div>
                      <div className="col-6">
                        <div className="h5 text-success">156</div>
                        <small className="text-muted">Всего входов</small>
                      </div>
                    </div>
                    <hr />
                    <div className="text-center">
                      <small className="text-muted">Последний вход: сегодня в 14:30</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button className="btn btn-primary" onClick={handlePreferencesUpdate}>
                <i className="bi bi-check-lg me-2"></i>
                Сохранить предпочтения
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingsPage; 