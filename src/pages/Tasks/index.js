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
    <div className="container">
      <div className="page-content">
        <h2>Учебные задачи</h2>
        <p>Ваши текущие задания и дедлайны</p>

        <div className="tasks-list">
          <table>
            <thead>
              <tr>
                <th>Задание</th>
                <th>Предмет</th>
                <th>Дедлайн</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {tasksData.map(item => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.subject}</td>
                  <td>{item.deadline}</td>
                  <td className={`status-${item.status.toLowerCase().replace(' ', '-')}`}>
                    {item.status}
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

export default TasksPage; 