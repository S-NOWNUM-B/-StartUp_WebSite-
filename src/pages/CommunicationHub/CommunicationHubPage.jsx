import React, { useState } from 'react';
import './CommunicationHubPage.css'; // Импортируем стили
import Header from '../../components/Header'; // Импортируем компонент Header

function CommunicationHubPage() {
  const [activeTab, setActiveTab] = useState('chat');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Привет всем, добро пожаловать на курс!',
      sender: 'Dr. Emily Carter',
      time: '10:00',
      type: 'incoming'
    },
    {
      id: 2,
      text: 'Здравствуйте, доктор Картер, спасибо за приветствие!',
      sender: 'Вы',
      time: '10:02',
      type: 'outgoing'
    }
  ]);

  const [participants] = useState([
    {
      id: 1,
      name: 'Dr. Emily Carter',
      role: 'Преподаватель',
      avatar: null
    },
    {
      id: 2,
      name: 'Александр Петров',
      role: 'Студент',
      avatar: null
    },
    {
      id: 3,
      name: 'Мария Иванова',
      role: 'Студент',
      avatar: null
    }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'Вы',
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      type: 'outgoing'
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <div className="communication-hub-container">
      {/* Заменяем заглушку шапки на компонент Header */}
      <Header />

      <main className="communication-hub-main-content">
        <h1>Центр коммуникаций</h1>

        {/* Секция с вкладками и содержимым */}
        <div className="communication-sections">
          {/* Вкладки */}
          <div className="communication-tabs">
            <button 
              className={activeTab === 'chat' ? 'active' : ''}
              onClick={() => setActiveTab('chat')}
            >
              Чат
            </button>
            <button 
              className={activeTab === 'forum' ? 'active' : ''}
              onClick={() => setActiveTab('forum')}
            >
              Форум обсуждений
            </button>
            <button 
              className={activeTab === 'request' ? 'active' : ''}
              onClick={() => setActiveTab('request')}
            >
              Форма запросов
            </button>
          </div>

          {/* Содержимое выбранной вкладки (пока заглушка для чата) */}
          <div className="tab-content">
            {activeTab === 'chat' && (
              <>
                <h2>Чат</h2>
                <div className="chat-area">
                  {messages.map(msg => (
                    <div key={msg.id} className={`message ${msg.type}`}>
                      <div className="message-header">
                        <span className="message-sender">{msg.sender}</span>
                        <span className="message-time">{msg.time}</span>
                      </div>
                      <div className="message-text">{msg.text}</div>
                    </div>
                  ))}
                </div>
                <form className="message-input-area" onSubmit={handleSendMessage}>
                  <input
                    type="text"
                    placeholder="Введите сообщение..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button type="submit">Отправить</button>
                </form>
              </>
            )}

            {activeTab === 'forum' && (
              <div className="forum-content">
                <h2>Форум обсуждений</h2>
                <p>Здесь будут отображаться темы для обсуждения.</p>
              </div>
            )}

            {activeTab === 'request' && (
              <div className="request-form-content">
                <h2>Форма запросов</h2>
                <p>Здесь будет форма для отправки запросов.</p>
              </div>
            )}
          </div>

          {/* Список участников */}
          <aside className="participants-list">
            <h2>Участники</h2>
            {participants.map(participant => (
              <div key={participant.id} className="participant">
                <div className="participant-avatar"></div>
                <div className="participant-info">
                  <p>{participant.name}</p>
                  <p className="role">{participant.role}</p>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </main>
    </div>
  );
}

export default CommunicationHubPage; 