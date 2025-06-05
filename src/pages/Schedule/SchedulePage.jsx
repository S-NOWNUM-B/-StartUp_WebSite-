import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './SchedulePage.css'; // Импортируем стили
import Header from '../../components/Header'; // Импортируем компонент Header

function SchedulePage() {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState('calendar'); // 'calendar' или 'table'

  // Пример данных о занятиях
  const classes = [
    {
      id: 1,
      title: 'Введение в программирование',
      time: '10:00 - 11:30',
      room: 'Аудитория 301',
      date: new Date(2024, 2, 20)
    },
    {
      id: 2,
      title: 'Математический анализ',
      time: '13:00 - 14:30',
      room: 'Аудитория 205',
      date: new Date(2024, 2, 20)
    }
  ];

  // Получаем занятия на выбранную дату
  const getClassesForDate = (selectedDate) => {
    return classes.filter(cls => 
      cls.date.toDateString() === selectedDate.toDateString()
    );
  };

  return (
    <div className="schedule-container">
      {/* Заменяем заглушку шапки на компонент Header */}
      <Header />

      <main className="schedule-main-content">
        <h1>Моё расписание</h1>
        <p>Просмотр расписания занятий и важных дат</p>

        {/* Секция с поиском и переключателями вида */}
        <div className="schedule-controls">
          <input type="text" placeholder="Поиск" />
          <button 
            className={view === 'calendar' ? 'active' : ''}
            onClick={() => setView('calendar')}
          >
            Календарь
          </button>
          <button 
            className={view === 'table' ? 'active' : ''}
            onClick={() => setView('table')}
          >
            Таблица
          </button>
        </div>

        {/* Секция с календарем или таблицей расписания */}
        <div className="schedule-view">
          {view === 'calendar' ? (
            <div className="calendar-container">
              <Calendar 
                onChange={setDate} 
                value={date}
                className="custom-calendar"
              />
              <div className="selected-date-classes">
                <h3>Занятия на {date.toLocaleDateString('ru-RU')}</h3>
                {getClassesForDate(date).map(cls => (
                  <div key={cls.id} className="class-item">
                    <h4>{cls.title}</h4>
                    <p>Время: {cls.time}</p>
                    <p>Аудитория: {cls.room}</p>
                  </div>
                ))}
                {getClassesForDate(date).length === 0 && (
                  <p>На этот день занятий не запланировано</p>
                )}
              </div>
            </div>
          ) : (
            <div className="table-view">
              <table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Время</th>
                    <th>Предмет</th>
                    <th>Аудитория</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map(cls => (
                    <tr key={cls.id}>
                      <td>{cls.date.toLocaleDateString('ru-RU')}</td>
                      <td>{cls.time}</td>
                      <td>{cls.title}</td>
                      <td>{cls.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Секция с предстоящими занятиями */}
        <section className="upcoming-classes">
          <h2>Ближайшие занятия</h2>
          {classes.slice(0, 3).map(cls => (
            <div key={cls.id} className="upcoming-class-item">
              <div className="class-time">{cls.time}</div>
              <div className="class-info">
                <h4>{cls.title}</h4>
                <p>{cls.room}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default SchedulePage; 