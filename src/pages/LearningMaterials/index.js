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
    <div className="container py-4">
      <div className="page-content card">
        <h2 className="mb-3">Учебные материалы</h2>
        <p className="lead text-muted mb-4">Доступные курсы и учебные материалы</p>

        <div className="materials-grid">
          {materials.map((material) => (
            <div key={material.id} className="material-card">
              <div className="material-header d-flex justify-content-between align-items-start mb-3">
                <h3 className="h5 mb-0">{material.title}</h3>
                <span className="material-type badge bg-secondary rounded-pill">{material.type}</span>
              </div>
              <p className="material-description text-break mb-3">{material.description}</p>
              <div className="progress" style={{ height: '8px', marginBottom: '1rem' }}>
                <div
                  className="progress-bar" role="progressbar"
                  style={{ width: `${material.progress}%` }}
                  aria-valuenow={material.progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div className="material-footer d-flex justify-content-between align-items-center">
                <span className="progress-text text-muted">Прогресс: {material.progress}%</span>
                <button className="continue-button btn btn-sm btn-primary">Продолжить</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LearningMaterialsPage; 