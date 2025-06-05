import React from 'react';
import './SchedulePage.css'; // Импортируем стили
import Header from '../components/Header'; // Импортируем компонент Header

function SchedulePage() {
  return (
    <div className="schedule-container">
      {/* Заменяем заглушку шапки на компонент Header */}
      <Header />

      <main className="schedule-main-content">
        <h1>My Schedule</h1>
        <p>View your class schedule and important dates.</p>

        {/* Секция с поиском и переключателями вида */}
        <div className="schedule-controls">
          <input type="text" placeholder="Search" />
          <button>Calendar View</button>
          <button>Table View</button>
        </div>

        {/* Секция с календарем или таблицей расписания */}
        <div className="schedule-view">
          {/* Здесь будет компонент календаря или таблицы */}
          <p>Здесь будет отображаться расписание.</p>
        </div>

        {/* Секция с предстоящими занятиями */}
        <section className="upcoming-classes">
          <h2>Upcoming Classes</h2>
          {/* Здесь будет список предстоящих занятий */}
          <p>Список занятий...</p>
        </section>
      </main>
    </div>
  );
}

export default SchedulePage; 