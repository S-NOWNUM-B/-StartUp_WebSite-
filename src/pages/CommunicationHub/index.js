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
    <div className="container py-4">
      <div className="page-content card">
        <h2 className="mb-3">Центр коммуникаций</h2>
        
        <div className="tabs nav nav-tabs mb-4">
          <button
            className={`tab nav-link ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            Сообщения
          </button>
          <button
            className={`tab nav-link ${activeTab === 'announcements' ? 'active' : ''}`}
            onClick={() => setActiveTab('announcements')}
          >
            Объявления
          </button>
        </div>

        {activeTab === 'messages' && (
          <div className="messages-list list-group">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message-card list-group-item ${!message.isRead ? 'unread' : ''}`}
              >
                <div className="message-header d-flex justify-content-between align-items-start mb-2">
                  <h3 className="h5 mb-0">{message.subject}</h3>
                  <span className="message-date text-muted">{message.date}</span>
                </div>
                <div className="message-sender text-muted mb-2">{message.sender}</div>
                <p className="message-content text-break mb-3">{message.content}</p>
                <button className="reply-button btn btn-sm btn-secondary">Ответить</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="announcements-list list-group">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className={`announcement-card list-group-item priority-${announcement.priority}`}
              >
                <div className="announcement-header d-flex justify-content-between align-items-start mb-2">
                  <h3 className="h5 mb-0">{announcement.title}</h3>
                  <span className="announcement-date text-muted">{announcement.date}</span>
                </div>
                <p className="announcement-content text-break mb-0">{announcement.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CommunicationHubPage; 