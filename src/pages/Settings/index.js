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
    <div className="container">
      <div className="page-content">
        <h2>Настройки</h2>
        <p>Управление настройками вашего аккаунта</p>

        <div className="settings-grid">
          <div className="settings-section">
            <h3>Уведомления</h3>
            <div className="setting-item">
              <div className="setting-info">
                <h4>Включить уведомления</h4>
                <p>Получать уведомления о важных событиях</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={() => handleToggle('notifications')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Email уведомления</h4>
                <p>Получать уведомления на email</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={() => handleToggle('emailNotifications')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3>Внешний вид</h3>
            <div className="setting-item">
              <div className="setting-info">
                <h4>Темная тема</h4>
                <p>Включить темную тему оформления</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={() => handleToggle('darkMode')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3>Язык и время</h3>
            <div className="setting-item">
              <div className="setting-info">
                <h4>Язык интерфейса</h4>
                <p>Выберите предпочитаемый язык</p>
              </div>
              <select
                value={settings.language}
                onChange={(e) => handleSelect('language', e.target.value)}
                className="setting-select"
              >
                <option value="ru">Русский</option>
                <option value="en">English</option>
                <option value="kz">Қазақша</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Часовой пояс</h4>
                <p>Выберите ваш часовой пояс</p>
              </div>
              <select
                value={settings.timezone}
                onChange={(e) => handleSelect('timezone', e.target.value)}
                className="setting-select"
              >
                <option value="Asia/Almaty">Алматы (UTC+6)</option>
                <option value="Asia/Astana">Астана (UTC+6)</option>
                <option value="Europe/Moscow">Москва (UTC+3)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="settings-actions">
          <button className="save-button">Сохранить изменения</button>
          <button className="reset-button">Сбросить настройки</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage; 