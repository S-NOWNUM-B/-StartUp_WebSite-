import React, { useState } from 'react';
import './styles.css';

function CommunicationHubPage() {
  const [activeTab, setActiveTab] = useState('messages');

  const messages = [
    {
      id: 1,
      sender: 'Преподаватель',
      subject: 'Напоминание о дедлайне',
      content: 'Напоминаю, что завтра последний день сдачи проекта.',
      date: '2024-03-20',
      isRead: false,
    },
    {
      id: 2,
      sender: 'Администрация',
      subject: 'Обновление расписания',
      content: 'В расписание внесены изменения. Пожалуйста, проверьте.',
      date: '2024-03-19',
      isRead: true,
    },
    {
      id: 3,
      sender: 'Одногруппник',
      subject: 'Вопрос по проекту',
      content: 'Привет! Можем обсудить детали проекта?',
      date: '2024-03-18',
      isRead: true,
    },
  ];

  const announcements = [
    {
      id: 1,
      title: 'Важное объявление',
      content: 'В ближайшие выходные будет проводиться обновление системы.',
      date: '2024-03-20',
      priority: 'high',
    },
    {
      id: 2,
      title: 'Новый курс',
      content: 'Открыт набор на новый курс по машинному обучению.',
      date: '2024-03-19',
      priority: 'medium',
    },
  ];

  return (
    <div className="container">
      <div className="page-content">
        <h2>Центр коммуникаций</h2>
        
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            Сообщения
          </button>
          <button
            className={`tab ${activeTab === 'announcements' ? 'active' : ''}`}
            onClick={() => setActiveTab('announcements')}
          >
            Объявления
          </button>
        </div>

        {activeTab === 'messages' && (
          <div className="messages-list">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message-card ${!message.isRead ? 'unread' : ''}`}
              >
                <div className="message-header">
                  <h3>{message.subject}</h3>
                  <span className="message-date">{message.date}</span>
                </div>
                <div className="message-sender">{message.sender}</div>
                <p className="message-content">{message.content}</p>
                <button className="reply-button">Ответить</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="announcements-list">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className={`announcement-card priority-${announcement.priority}`}
              >
                <div className="announcement-header">
                  <h3>{announcement.title}</h3>
                  <span className="announcement-date">{announcement.date}</span>
                </div>
                <p className="announcement-content">{announcement.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CommunicationHubPage; 