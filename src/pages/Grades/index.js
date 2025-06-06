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
    <div className="container">
      <div className="page-content">
        <h2>Ваши оценки</h2>
        <p>Текущая успеваемость по предметам</p>

        <div className="grades-table">
          <table>
            <thead>
              <tr>
                <th>Предмет</th>
                <th>Оценка</th>
              </tr>
            </thead>
            <tbody>
              {gradesData.map(item => (
                <tr key={item.id}>
                  <td>{item.subject}</td>
                  <td className={`grade-${item.grade.toLowerCase()}`}>{item.grade}</td>
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