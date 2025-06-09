import React from 'react';
import './styles.css';

function TasksPage() {
  const tasksData = [
    { 
      id: 1, 
      title: 'Курсовая работа', 
      subject: 'Программирование',
      deadline: '2024-04-15',
      status: 'В процессе'
    },
    { 
      id: 2, 
      title: 'Лабораторная работа №3', 
      subject: 'Физика',
      deadline: '2024-03-25',
      status: 'Не начато'
    },
    { 
      id: 3, 
      title: 'Домашнее задание', 
      subject: 'Математика',
      deadline: '2024-03-22',
      status: 'Завершено'
    }
  ];

  return (
    <div className="container py-4">
      <div className="page-content card">
        <div className="page-header">
          <h2 className="mb-3">Учебные задачи</h2>
          <p className="lead text-muted mb-4">Ваши текущие задания и дедлайны</p>
        </div>

        <div className="tasks-list">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Задание</th>
                  <th scope="col">Предмет</th>
                  <th scope="col">Дедлайн</th>
                  <th scope="col">Статус</th>
                </tr>
              </thead>
              <tbody>
                {tasksData.map(item => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.subject}</td>
                    <td>{item.deadline}</td>
                    <td>
                      <span className={`badge rounded-pill status-${item.status.toLowerCase().replace(' ', '-')}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TasksPage; 