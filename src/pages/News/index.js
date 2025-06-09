import React from 'react';
import './styles.css';

function NewsPage() {
  const newsData = [
    { 
      id: 1, 
      title: 'Важное объявление', 
      date: '2024-03-20',
      content: 'Напоминаем о предстоящей сессии. Пожалуйста, проверьте расписание экзаменов.'
    },
    { 
      id: 2, 
      title: 'Новый курс', 
      date: '2024-03-19',
      content: 'Открыт набор на новый курс по машинному обучению. Регистрация до конца месяца.'
    },
    { 
      id: 3, 
      title: 'Обновление системы', 
      date: '2024-03-18',
      content: 'В ближайшие выходные будет проводиться обновление системы. Возможны перебои в работе.'
    }
  ];

  return (
    <div className="container py-4">
      <div className="page-content card">
        <h2 className="mb-3">Новости и объявления</h2>
        <p className="lead text-muted mb-4">Актуальная информация и важные сообщения</p>

        <div className="news-list list-group">
          {newsData.map(item => (
            <div key={item.id} className="news-item list-group-item">
              <h3 className="h5 mb-2">{item.title}</h3>
              <div className="news-date text-muted mb-2">{item.date}</div>
              <p className="text-break mb-0">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsPage; 