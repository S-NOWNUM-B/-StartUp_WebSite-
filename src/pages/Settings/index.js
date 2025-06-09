import React, { useState } from 'react';
import './styles.css';

function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: true,
    darkMode: false,
    language: 'ru',
    timezone: 'Asia/Almaty',
  });

  const handleToggle = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleSelect = (setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  return (
    <div className="container py-4">
      <div className="page-content card">
        <h2 className="mb-3">Настройки</h2>
        <p className="lead text-muted mb-4">Управление настройками вашего аккаунта</p>

        <div className="settings-grid row g-4">
          <div className="col-lg-6">
            <div className="settings-section card h-100">
              <div className="card-body">
                <h3 className="h5 mb-4 border-bottom pb-2">Уведомления</h3>
                <div className="setting-item d-flex justify-content-between align-items-center mb-3">
                  <div className="setting-info me-auto">
                    <h4 className="h6 mb-1">Включить уведомления</h4>
                    <p className="text-muted small mb-0">Получать уведомления о важных событиях</p>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      checked={settings.notifications}
                      onChange={() => handleToggle('notifications')}
                    />
                    <label className="form-check-label visually-hidden">Включить уведомления</label>
                  </div>
                </div>

                <div className="setting-item d-flex justify-content-between align-items-center mb-0">
                  <div className="setting-info me-auto">
                    <h4 className="h6 mb-1">Email уведомления</h4>
                    <p className="text-muted small mb-0">Получать уведомления на email</p>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      checked={settings.emailNotifications}
                      onChange={() => handleToggle('emailNotifications')}
                    />
                    <label className="form-check-label visually-hidden">Email уведомления</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="settings-section card h-100">
              <div className="card-body">
                <h3 className="h5 mb-4 border-bottom pb-2">Внешний вид</h3>
                <div className="setting-item d-flex justify-content-between align-items-center mb-0">
                  <div className="setting-info me-auto">
                    <h4 className="h6 mb-1">Темная тема</h4>
                    <p className="text-muted small mb-0">Включить темную тему оформления</p>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      checked={settings.darkMode}
                      onChange={() => handleToggle('darkMode')}
                    />
                    <label className="form-check-label visually-hidden">Темная тема</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="settings-section card">
              <div className="card-body">
                <h3 className="h5 mb-4 border-bottom pb-2">Язык и время</h3>
                <div className="setting-item d-flex justify-content-between align-items-center mb-3">
                  <div className="setting-info me-auto">
                    <h4 className="h6 mb-1">Язык интерфейса</h4>
                    <p className="text-muted small mb-0">Выберите предпочитаемый язык</p>
                  </div>
                  <select
                    value={settings.language}
                    onChange={(e) => handleSelect('language', e.target.value)}
                    className="form-select setting-select w-auto"
                  >
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                    <option value="kz">Қазақша</option>
                  </select>
                </div>

                <div className="setting-item d-flex justify-content-between align-items-center mb-0">
                  <div className="setting-info me-auto">
                    <h4 className="h6 mb-1">Часовой пояс</h4>
                    <p className="text-muted small mb-0">Выберите ваш часовой пояс</p>
                  </div>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleSelect('timezone', e.target.value)}
                    className="form-select setting-select w-auto"
                  >
                    <option value="Asia/Almaty">Алматы (UTC+6)</option>
                    <option value="Asia/Astana">Астана (UTC+6)</option>
                    <option value="Europe/Moscow">Москва (UTC+3)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-actions d-grid gap-2 d-md-flex justify-content-md-end mt-4">
          <button className="save-button btn btn-primary btn-lg">Сохранить изменения</button>
          <button className="reset-button btn btn-secondary btn-lg">Сбросить настройки</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage; 