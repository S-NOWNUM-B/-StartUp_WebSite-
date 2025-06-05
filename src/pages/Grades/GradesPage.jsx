import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './GradesPage.css'; // Импортируем стили
import Header from '../../components/Header'; // Импортируем компонент Header

function GradesPage() {
  const [selectedCourse, setSelectedCourse] = useState('all');

  // Пример данных об оценках
  const grades = [
    {
      id: 1,
      assignment: 'Промежуточный экзамен',
      dueDate: '15.10.2024',
      score: '85/100',
      comments: 'Хорошая работа, обратите внимание на управление временем.',
      course: 'Введение в программирование'
    },
    {
      id: 2,
      assignment: 'Проект 1',
      dueDate: '01.10.2024',
      score: '92/100',
      comments: 'Отличная работа!',
      course: 'Введение в программирование'
    },
    {
      id: 3,
      assignment: 'Итоговый экзамен',
      dueDate: '20.12.2024',
      score: '88/100',
      comments: 'Хороший результат.',
      course: 'Математический анализ'
    }
  ];

  // Данные для графика успеваемости
  const performanceData = [
    { name: 'Сент', score: 85 },
    { name: 'Окт', score: 88 },
    { name: 'Нояб', score: 92 },
    { name: 'Дек', score: 90 }
  ];

  // Фильтрация оценок по курсу
  const filteredGrades = selectedCourse === 'all' 
    ? grades 
    : grades.filter(grade => grade.course === selectedCourse);

  return (
    <div className="grades-container">
      {/* Заменяем заглушку шапки на компонент Header */}
      <Header />

      <main className="grades-main-content">
        <h1>Оценки по курсам</h1>
        <p>Просмотр ваших оценок за текущий семестр</p>

        <div className="grades-controls">
          <select 
            value={selectedCourse} 
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="course-select"
          >
            <option value="all">Все курсы</option>
            <option value="Введение в программирование">Введение в программирование</option>
            <option value="Математический анализ">Математический анализ</option>
          </select>
        </div>

        {/* Секция с обзором оценок (таблица) */}
        <section className="grades-overview">
          <h2>Обзор оценок</h2>
          <div className="grades-table-container">
            <table>
              <thead>
                <tr>
                  <th>Задание</th>
                  <th>Срок сдачи</th>
                  <th>Оценка</th>
                  <th>Комментарии</th>
                </tr>
              </thead>
              <tbody>
                {filteredGrades.map(grade => (
                  <tr key={grade.id}>
                    <td>{grade.assignment}</td>
                    <td>{grade.dueDate}</td>
                    <td>{grade.score}</td>
                    <td>{grade.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Секция с графиком успеваемости */}
        <section className="performance-graph">
          <h2>График успеваемости</h2>
          <div className="graph-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#db514c" 
                  strokeWidth={2}
                  dot={{ fill: '#db514c' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Заглушка для секции уведомлений - как на макете */}
        <aside className="grades-notifications">
          <h2>Уведомления</h2>
          <div className="notification-list">
            {grades.map(grade => (
              <div key={grade.id} className="notification-item">
                <div className="notification-icon">📊</div>
                <div className="notification-content">
                  <p>Новая оценка: {grade.assignment}</p>
                  <span className="notification-time">{grade.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}

export default GradesPage; 