import React from 'react';
import './GradesPage.css'; // Импортируем стили
import Header from '../components/Header'; // Импортируем компонент Header

function GradesPage() {
  return (
    <div className="grades-container">
      {/* Заменяем заглушку шапки на компонент Header */}
      <Header />

      <main className="grades-main-content">
        <h1>Course Grades</h1>
        <p>View your grades for the current semester.</p>

        {/* Секция с обзором оценок (таблица) */}
        <section className="grades-overview">
          <h2>Grades Overview</h2>
          {/* Заглушка для таблицы оценок */}
          <table>
            <thead>
              <tr>
                <th>Assignment</th>
                <th>Due Date</th>
                <th>Score</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {/* Пример строки - будет заполнено данными позже */}
              <tr>
                <td>Midterm Exam</td>
                <td>Oct 15, 2024</td>
                <td>85/100</td>
                <td>Good effort, focus on time management.</td>
              </tr>
              {/* ... другие строки ... */}
            </tbody>
          </table>
        </section>

        {/* Секция с графиком успеваемости */}
        <section className="performance-graph">
          <h2>Performance Graph</h2>
          {/* Заглушка для графика */}
          <div className="graph-placeholder">График успеваемости</div>
        </section>

        {/* Заглушка для секции уведомлений - как на макете */}
        <aside className="grades-notifications">
          <h2>Notifications</h2>
          {/* Список уведомлений */}
          <div>New Grade Received: Midterm Exam</div>
          <div>New Grade Received: Project 1</div>
          <div>New Grade Received: Final Exam</div>
        </aside>
      </main>
    </div>
  );
}

export default GradesPage; 