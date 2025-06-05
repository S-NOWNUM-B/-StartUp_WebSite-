import React from 'react';
import './CommunicationHubPage.css'; // Импортируем стили
import Header from '../components/Header'; // Импортируем компонент Header

function CommunicationHubPage() {
  return (
    <div className="communication-hub-container">
      {/* Заменяем заглушку шапки на компонент Header */}
      <Header />

      <main className="communication-hub-main-content">
        <h1>Communication Hub</h1>

        {/* Секция с вкладками и содержимым */}
        <div className="communication-sections">
          {/* Вкладки */}
          <div className="communication-tabs">
            <button>Chat</button>
            <button>Discussion Forum</button>
            <button>Request Form</button>
          </div>

          {/* Содержимое выбранной вкладки (пока заглушка для чата) */}
          <div className="tab-content">
            <h2>Chat</h2>
            <div className="chat-area">
              {/* Сообщения чата */}
              <div className="message incoming">Hi everyone, welcome to the course!</div>
              <div className="message outgoing">Hello Dr. Carter, thank you for the warm welcome!</div>
              {/* ... другие сообщения ... */}
            </div>
            {/* Поле ввода сообщения */}
            <div className="message-input-area">
              <input type="text" placeholder="Type your message..." />
              <button>Send</button>
            </div>
          </div>

          {/* Список участников */}
          <aside className="participants-list">
            <h2>Participants</h2>
            {/* Пример участника - будет заполнено данными позже */}
            <div className="participant">
              <div className="participant-avatar"></div>
              <div className="participant-info">
                <p>Dr. Emily Carter</p>
                <p className="role">Instructor</p>
              </div>
            </div>
            {/* ... другие участники ... */}
          </aside>
        </div>
      </main>
    </div>
  );
}

export default CommunicationHubPage; 