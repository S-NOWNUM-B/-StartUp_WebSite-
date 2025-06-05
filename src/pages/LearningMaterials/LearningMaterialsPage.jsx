import React from 'react';
import './LearningMaterialsPage.css'; // Импортируем стили
import Header from '../../components/Header'; // Импортируем компонент Header

function LearningMaterialsPage() {
  return (
    <div className="learning-materials-container">
      {/* Заменяем заглушку шапки на компонент Header */}
      <Header />

      <main className="learning-materials-main-content">
        <h1>Learning Materials</h1>
        <p>Explore resources for your courses</p>

        {/* Секция с поиском и вкладками */}
        <div className="materials-controls">
          <input type="text" placeholder="Search materials" />
          <div className="materials-tabs">
            <button>All</button>
            <button>Lectures</button>
            <button>Assignments</button>
            <button>Readings</button>
          </div>
        </div>

        {/* Секция с таблицей учебных материалов */}
        <section className="materials-list">
          <h2>Course: Introduction to Psychology</h2>
          {/* Заглушка для таблицы материалов */}
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Пример строки - будет заполнено данными позже */}
              <tr>
                <td>Lecture 1: Foundations of Psychology</td>
                <td>Lecture</td>
                <td>2023-09-05</td>
                <td><button>Download</button></td>
              </tr>
              {/* ... другие строки ... */}
            </tbody>
          </table>
        </section>

      </main>
    </div>
  );
}

export default LearningMaterialsPage; 