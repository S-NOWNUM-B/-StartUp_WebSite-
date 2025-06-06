import React from 'react';
import './styles.css';

function LearningMaterialsPage() {
  const materials = [
    {
      id: 1,
      title: 'Введение в программирование',
      description: 'Базовые концепции программирования и алгоритмы',
      type: 'Курс',
      progress: 75,
    },
    {
      id: 2,
      title: 'Веб-разработка',
      description: 'HTML, CSS, JavaScript и современные фреймворки',
      type: 'Курс',
      progress: 45,
    },
    {
      id: 3,
      title: 'Базы данных',
      description: 'SQL, NoSQL и проектирование баз данных',
      type: 'Курс',
      progress: 30,
    },
  ];

  return (
    <div className="container">
      <div className="page-content">
        <h2>Учебные материалы</h2>
        <p>Доступные курсы и учебные материалы</p>

        <div className="materials-grid">
          {materials.map((material) => (
            <div key={material.id} className="material-card">
              <div className="material-header">
                <h3>{material.title}</h3>
                <span className="material-type">{material.type}</span>
              </div>
              <p className="material-description">{material.description}</p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${material.progress}%` }}
                ></div>
              </div>
              <div className="material-footer">
                <span className="progress-text">Прогресс: {material.progress}%</span>
                <button className="continue-button">Продолжить</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LearningMaterialsPage; 