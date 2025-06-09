import React from 'react';
import './styles.css';

function SchedulePage() {
  const scheduleData = [
    { id: 1, day: 'Понедельник', time: '9:00 - 10:30', subject: 'Математика', room: '301' },
    { id: 2, day: 'Понедельник', time: '11:00 - 12:30', subject: 'Физика', room: '205' },
    { id: 3, day: 'Вторник', time: '9:00 - 10:30', subject: 'Программирование', room: '401' },
    { id: 4, day: 'Вторник', time: '11:00 - 12:30', subject: 'История', room: '102' },
  ];

  return (
    <div className="container py-4">
      <div className="page-content card">
        <h2 className="mb-3">Расписание занятий</h2>
        <p className="lead text-muted mb-4">Ваше расписание на текущую неделю</p>

        <div className="schedule-table table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">День</th>
                <th scope="col">Время</th>
                <th scope="col">Предмет</th>
                <th scope="col">Аудитория</th>
              </tr>
            </thead>
            <tbody>
              {scheduleData.map(item => (
                <tr key={item.id}>
                  <td>{item.day}</td>
                  <td>{item.time}</td>
                  <td>{item.subject}</td>
                  <td>{item.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SchedulePage; 