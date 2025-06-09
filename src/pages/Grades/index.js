import React from 'react';
import './styles.css';

function GradesPage() {
  const gradesData = [
    { id: 1, subject: 'Математика', grade: 'A' },
    { id: 2, subject: 'Физика', grade: 'B+' },
    { id: 3, subject: 'Программирование', grade: 'A-' },
    { id: 4, subject: 'История', grade: 'B' },
  ];

  return (
    <div className="container py-4">
      <div className="page-content card">
        <h2 className="mb-3">Ваши оценки</h2>
        <p className="lead text-muted mb-4">Текущая успеваемость по предметам</p>

        <div className="grades-table table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">Предмет</th>
                <th scope="col">Оценка</th>
              </tr>
            </thead>
            <tbody>
              {gradesData.map(item => (
                <tr key={item.id}>
                  <td>{item.subject}</td>
                  <td>
                    <span className={`badge rounded-pill grade-${item.grade.toLowerCase().replace('+', 'plus').replace('-', 'minus')}`}>
                      {item.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GradesPage; 