import React, { useState } from 'react';

function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState('current'); // current, completed, projects, create
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');

  const currentAssignments = [
    {
      id: 1,
      title: 'Реализация алгоритма сортировки',
      subject: 'Структуры данных',
      description: 'Реализовать алгоритмы быстрой сортировки и сортировки слиянием на Python. Провести анализ временной сложности.',
      type: 'programming',
      deadline: '2025-01-28',
      submittedDate: null,
      priority: 'high',
      status: 'in-progress',
      progress: 65,
      maxScore: 100,
      currentScore: null,
      files: ['sort_algorithms.py', 'analysis.md'],
      submissionMethod: 'github',
      githubRepo: 'https://github.com/student/sorting-algorithms',
      teacher: 'Профессор Петров А.И.',
      requirements: ['Python 3.8+', 'Документация в markdown', 'Unit тесты'],
      estimatedTime: '8 часов',
      difficulty: 'medium'
    },
    {
      id: 2,
      title: 'Отчет по лабораторной работе №3',
      subject: 'Физика',
      description: 'Составить подробный отчет по исследованию колебаний математического маятника.',
      type: 'report',
      deadline: '2025-01-25',
      submittedDate: null,
      priority: 'high',
      status: 'not-started',
      progress: 0,
      maxScore: 50,
      currentScore: null,
      files: [],
      submissionMethod: 'pdf-upload',
      teacher: 'Доцент Сидорова М.В.',
      requirements: ['Формат PDF', 'Объем 8-12 страниц', 'Графики и диаграммы'],
      estimatedTime: '4 часа',
      difficulty: 'easy'
    },
    {
      id: 3,
      title: 'Разработка веб-приложения "Университетский портал"',
      subject: 'Веб-программирование',
      description: 'Создать полнофункциональное веб-приложение с использованием React и Node.js.',
      type: 'project',
      deadline: '2025-02-15',
      submittedDate: null,
      priority: 'medium',
      status: 'in-progress',
      progress: 25,
      maxScore: 200,
      currentScore: null,
      files: ['frontend/', 'backend/', 'documentation.md'],
      submissionMethod: 'demo',
      teacher: 'Ст. преподаватель Иванов И.И.',
      requirements: ['React 18+', 'Node.js backend', 'База данных', 'Презентация'],
      estimatedTime: '40 часов',
      difficulty: 'hard',
      teamWork: true,
      teamMembers: ['Иванов И.И.', 'Петрова А.С.', 'Сидоров М.К.']
    },
    {
      id: 4,
      title: 'Анализ временных рядов',
      subject: 'Статистика',
      description: 'Провести анализ временных рядов биржевых данных, построить прогнозную модель.',
      type: 'analysis',
      deadline: '2025-02-01',
      submittedDate: null,
      priority: 'medium',
      status: 'planning',
      progress: 10,
      maxScore: 80,
      currentScore: null,
      files: ['data.csv'],
      submissionMethod: 'jupyter',
      teacher: 'Профессор Козлова Е.Н.',
      requirements: ['Python/R', 'Jupyter Notebook', 'Визуализация данных'],
      estimatedTime: '12 часов',
      difficulty: 'medium'
    }
  ];

  const completedAssignments = [
    {
      id: 5,
      title: 'Базы данных - ER диаграмма',
      subject: 'Базы данных',
      description: 'Спроектировать и создать ER диаграмму для системы управления университетом.',
      type: 'design',
      deadline: '2025-01-15',
      submittedDate: '2025-01-14',
      priority: 'high',
      status: 'completed',
      progress: 100,
      maxScore: 75,
      currentScore: 68,
      grade: 'B+',
      feedback: 'Хорошая работа! Диаграмма логична, но можно было добавить больше деталей по нормализации.',
      teacher: 'Доцент Морозов В.П.'
    },
    {
      id: 6,
      title: 'Эссе по философии',
      subject: 'Философия',
      description: 'Написать эссе на тему "Влияние технологий на современное общество".',
      type: 'essay',
      deadline: '2025-01-10',
      submittedDate: '2025-01-09',
      priority: 'medium',
      status: 'completed',
      progress: 100,
      maxScore: 60,
      currentScore: 55,
      grade: 'A-',
      feedback: 'Отличное эссе с глубоким анализом темы.',
      teacher: 'Профессор Белова О.С.'
    }
  ];

  const subjects = ['all', 'Структуры данных', 'Физика', 'Веб-программирование', 'Статистика', 'Базы данных', 'Философия'];
  const priorities = ['all', 'high', 'medium', 'low'];

  const getStatusColor = (status) => {
    const statusMap = {
      'not-started': 'secondary',
      'planning': 'info',
      'in-progress': 'warning',
      'completed': 'success',
      'overdue': 'danger',
      'submitted': 'primary'
    };
    return statusMap[status] || 'secondary';
  };

  const getStatusText = (status) => {
    const statusMap = {
      'not-started': 'Не начато',
      'planning': 'Планирование',
      'in-progress': 'В работе',
      'completed': 'Завершено',
      'overdue': 'Просрочено',
      'submitted': 'Отправлено'
    };
    return statusMap[status] || 'Неизвестно';
  };

  const getPriorityColor = (priority) => {
    const priorityMap = {
      'high': 'danger',
      'medium': 'warning',
      'low': 'success'
    };
    return priorityMap[priority] || 'secondary';
  };

  const getPriorityText = (priority) => {
    const priorityMap = {
      'high': 'Высокий',
      'medium': 'Средний',
      'low': 'Низкий'
    };
    return priorityMap[priority] || 'Неизвестно';
  };

  const getTypeIcon = (type) => {
    const typeMap = {
      'programming': 'bi-code-slash',
      'report': 'bi-file-text',
      'project': 'bi-kanban',
      'analysis': 'bi-graph-up',
      'design': 'bi-palette',
      'essay': 'bi-pencil-square'
    };
    return typeMap[type] || 'bi-file';
  };

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getFilteredAssignments = (assignments) => {
    let filtered = assignments;

    if (filterSubject !== 'all') {
      filtered = filtered.filter(assignment => assignment.subject === filterSubject);
    }

    if (filterPriority !== 'all') {
      filtered = filtered.filter(assignment => assignment.priority === filterPriority);
    }

    // Сортировка
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'deadline':
          return new Date(a.deadline) - new Date(b.deadline);
        case 'priority':
          const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'progress':
          return b.progress - a.progress;
        case 'subject':
          return a.subject.localeCompare(b.subject);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const handleStartAssignment = (assignmentId) => {
    alert(`Начата работа над заданием ID: ${assignmentId}`);
  };

  const handleSubmitAssignment = (assignmentId) => {
    alert(`Задание ID: ${assignmentId} отправлено на проверку!`);
  };

  const updateProgress = (assignmentId, newProgress) => {
    alert(`Прогресс задания ID: ${assignmentId} обновлен до ${newProgress}%`);
  };

  return (
    <div className="container py-4">
      <div className="page-content card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1">Задания и проекты</h2>
            <p className="lead text-muted mb-0">Управление учебными заданиями и проектами</p>
          </div>
          <button className="btn btn-primary" onClick={() => setActiveTab('create')}>
            <i className="bi bi-plus-circle me-2"></i>
            Создать задание
          </button>
        </div>

        {/* Статистика */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card text-center border-primary">
              <div className="card-body">
                <div className="h4 text-primary">{currentAssignments.length}</div>
                <small className="text-muted">Текущие задания</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center border-warning">
              <div className="card-body">
                <div className="h4 text-warning">
                  {currentAssignments.filter(a => getDaysUntilDeadline(a.deadline) <= 3).length}
                </div>
                <small className="text-muted">Срочные (до 3 дней)</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center border-success">
              <div className="card-body">
                <div className="h4 text-success">{completedAssignments.length}</div>
                <small className="text-muted">Завершено</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center border-info">
              <div className="card-body">
                <div className="h4 text-info">
                  {Math.round(currentAssignments.reduce((sum, a) => sum + a.progress, 0) / currentAssignments.length || 0)}%
                </div>
                <small className="text-muted">Средний прогресс</small>
              </div>
            </div>
          </div>
        </div>

        {/* Навигационные табы */}
        <ul className="nav nav-pills mb-4">
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'current' ? 'active' : ''}`}
              onClick={() => setActiveTab('current')}
            >
              <i className="bi bi-clock me-2"></i>
              Текущие
              <span className="badge bg-warning ms-2">{currentAssignments.length}</span>
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveTab('completed')}
            >
              <i className="bi bi-check-circle me-2"></i>
              Завершенные
              <span className="badge bg-success ms-2">{completedAssignments.length}</span>
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              <i className="bi bi-kanban me-2"></i>
              Проекты
              <span className="badge bg-info ms-2">
                {currentAssignments.filter(a => a.type === 'project').length}
              </span>
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'create' ? 'active' : ''}`}
              onClick={() => setActiveTab('create')}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Создать
            </button>
          </li>
        </ul>

        {/* Фильтры и сортировка */}
        {(activeTab === 'current' || activeTab === 'completed') && (
          <div className="row mb-4">
            <div className="col-md-3">
              <select 
                className="form-select" 
                value={filterSubject} 
                onChange={(e) => setFilterSubject(e.target.value)}
              >
                <option value="all">Все предметы</option>
                {subjects.slice(1).map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select 
                className="form-select" 
                value={filterPriority} 
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <option value="all">Все приоритеты</option>
                <option value="high">Высокий</option>
                <option value="medium">Средний</option>
                <option value="low">Низкий</option>
              </select>
            </div>
            <div className="col-md-3">
              <select 
                className="form-select" 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="deadline">По дедлайну</option>
                <option value="priority">По приоритету</option>
                <option value="progress">По прогрессу</option>
                <option value="subject">По предмету</option>
              </select>
            </div>
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-search"></i></span>
                <input type="text" className="form-control" placeholder="Поиск заданий..." />
              </div>
            </div>
          </div>
        )}

        {/* Текущие задания */}
        {activeTab === 'current' && (
          <div>
            {getFilteredAssignments(currentAssignments).map(assignment => {
              const daysLeft = getDaysUntilDeadline(assignment.deadline);
              return (
                <div key={assignment.id} className="card mb-4">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <i className={`${getTypeIcon(assignment.type)} me-2 fs-5`}></i>
                      <div>
                        <h5 className="mb-0">{assignment.title}</h5>
                        <small className="text-muted">{assignment.subject} • {assignment.teacher}</small>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <span className={`badge bg-${getPriorityColor(assignment.priority)}`}>
                        {getPriorityText(assignment.priority)}
                      </span>
                      <span className={`badge bg-${getStatusColor(assignment.status)}`}>
                        {getStatusText(assignment.status)}
                      </span>
                      {daysLeft <= 3 && daysLeft >= 0 && (
                        <span className="badge bg-danger">
                          <i className="bi bi-alarm me-1"></i>
                          {daysLeft === 0 ? 'Сегодня!' : `${daysLeft} дн.`}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-8">
                        <p className="mb-3">{assignment.description}</p>
                        
                        {assignment.requirements && (
                          <div className="mb-3">
                            <strong>Требования:</strong>
                            <ul className="list-unstyled ms-3">
                              {assignment.requirements.map((req, index) => (
                                <li key={index}>• {req}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {assignment.teamWork && assignment.teamMembers && (
                          <div className="mb-3">
                            <strong>Команда:</strong>
                            <div className="d-flex gap-2 mt-1">
                              {assignment.teamMembers.map((member, index) => (
                                <span key={index} className="badge bg-info">{member}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="row">
                          <div className="col-6">
                            <strong>Прогресс:</strong>
                            <div className="progress mt-1" style={{ height: '20px' }}>
                              <div 
                                className={`progress-bar bg-${assignment.progress < 50 ? 'danger' : assignment.progress < 80 ? 'warning' : 'success'}`}
                                style={{ width: `${assignment.progress}%` }}
                              >
                                {assignment.progress}%
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <strong>Обновить прогресс:</strong>
                            <input 
                              type="range" 
                              className="form-range mt-1" 
                              min="0" 
                              max="100" 
                              value={assignment.progress}
                              onChange={(e) => updateProgress(assignment.id, e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-4">
                        <div className="card bg-light">
                          <div className="card-body">
                            <div className="row text-center mb-3">
                              <div className="col-6">
                                <div className="h6 text-primary">{assignment.maxScore}</div>
                                <small className="text-muted">Макс. баллов</small>
                              </div>
                              <div className="col-6">
                                <div className="h6 text-info">{assignment.estimatedTime}</div>
                                <small className="text-muted">Время</small>
                              </div>
                            </div>
                            
                            <div className="mb-3">
                              <strong>Дедлайн:</strong>
                              <div className={`${daysLeft <= 3 ? 'text-danger fw-bold' : ''}`}>
                                {new Date(assignment.deadline).toLocaleDateString('ru-RU')}
                                {daysLeft >= 0 && (
                                  <small className="d-block">
                                    ({daysLeft === 0 ? 'Сегодня' : `${daysLeft} дн. осталось`})
                                  </small>
                                )}
                              </div>
                            </div>

                            <div className="mb-3">
                              <strong>Способ сдачи:</strong>
                              <div>{assignment.submissionMethod}</div>
                            </div>

                            {assignment.files && assignment.files.length > 0 && (
                              <div className="mb-3">
                                <strong>Файлы:</strong>
                                {assignment.files.map((file, index) => (
                                  <div key={index} className="d-flex align-items-center mt-1">
                                    <i className="bi bi-file-earmark me-2"></i>
                                    <small>{file}</small>
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="d-grid gap-2">
                              {assignment.status === 'not-started' && (
                                <button 
                                  className="btn btn-success"
                                  onClick={() => handleStartAssignment(assignment.id)}
                                >
                                  <i className="bi bi-play me-2"></i>
                                  Начать
                                </button>
                              )}
                              {assignment.status === 'in-progress' && assignment.progress >= 90 && (
                                <button 
                                  className="btn btn-primary"
                                  onClick={() => handleSubmitAssignment(assignment.id)}
                                >
                                  <i className="bi bi-send me-2"></i>
                                  Отправить
                                </button>
                              )}
                              <button className="btn btn-outline-primary">
                                <i className="bi bi-eye me-2"></i>
                                Подробнее
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Завершенные задания */}
        {activeTab === 'completed' && (
          <div>
            {getFilteredAssignments(completedAssignments).map(assignment => (
              <div key={assignment.id} className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <i className={`${getTypeIcon(assignment.type)} me-2 fs-5`}></i>
                    <div>
                      <h5 className="mb-0">{assignment.title}</h5>
                      <small className="text-muted">{assignment.subject} • {assignment.teacher}</small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-success fs-6">{assignment.grade}</span>
                    <span className="text-muted">{assignment.currentScore}/{assignment.maxScore}</span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                      <p className="mb-3">{assignment.description}</p>
                      {assignment.feedback && (
                        <div className="alert alert-info">
                          <strong>Отзыв преподавателя:</strong><br/>
                          {assignment.feedback}
                        </div>
                      )}
                    </div>
                    <div className="col-md-4">
                      <div className="row text-center">
                        <div className="col-4">
                          <div className="h6 text-success">{assignment.currentScore}</div>
                          <small className="text-muted">Получено</small>
                        </div>
                        <div className="col-4">
                          <div className="h6 text-primary">{assignment.maxScore}</div>
                          <small className="text-muted">Максимум</small>
                        </div>
                        <div className="col-4">
                          <div className="h6 text-info">
                            {Math.round((assignment.currentScore / assignment.maxScore) * 100)}%
                          </div>
                          <small className="text-muted">Процент</small>
                        </div>
                      </div>
                      <div className="mt-3">
                        <strong>Сдано:</strong> {new Date(assignment.submittedDate).toLocaleDateString('ru-RU')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Проекты */}
        {activeTab === 'projects' && (
          <div>
            <h4 className="mb-4">Командные проекты</h4>
            {currentAssignments.filter(a => a.type === 'project').map(project => (
              <div key={project.id} className="card mb-4 border-info">
                <div className="card-header bg-info text-white">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">{project.title}</h5>
                    <span className="badge bg-light text-dark">{project.subject}</span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <p>{project.description}</p>
                      <div className="mb-3">
                        <strong>Команда:</strong>
                        <div className="d-flex gap-2 mt-2">
                          {project.teamMembers.map((member, index) => (
                            <div key={index} className="d-flex align-items-center">
                              <img 
                                src={`https://ui-avatars.com/api/?name=${member}&size=32&background=007bff&color=white`}
                                alt={member}
                                className="rounded-circle me-2"
                                width="32"
                                height="32"
                              />
                              <span className="small">{member}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <strong>Прогресс проекта:</strong>
                        <div className="progress mt-2" style={{ height: '25px' }}>
                          <div 
                            className="progress-bar bg-info"
                            style={{ width: `${project.progress}%` }}
                          >
                            {project.progress}%
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <strong>Дедлайн:</strong><br/>
                          <span className="text-primary">
                            {new Date(project.deadline).toLocaleDateString('ru-RU')}
                          </span>
                        </div>
                        <div className="col-6">
                          <strong>Осталось:</strong><br/>
                          <span className="text-warning">
                            {getDaysUntilDeadline(project.deadline)} дней
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end gap-2 mt-3">
                    <button className="btn btn-outline-info">
                      <i className="bi bi-github me-2"></i>
                      GitHub
                    </button>
                    <button className="btn btn-outline-primary">
                      <i className="bi bi-kanban me-2"></i>
                      Доска задач
                    </button>
                    <button className="btn btn-info">
                      <i className="bi bi-people me-2"></i>
                      Команда
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Создание задания */}
        {activeTab === 'create' && (
          <div>
            <h4 className="mb-4">Создание персонального задания</h4>
            <div className="alert alert-info">
              <i className="bi bi-info-circle me-2"></i>
              Здесь вы можете создавать собственные задачи для самообучения и планирования.
            </div>
            
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Название задания</label>
                      <input type="text" className="form-control" placeholder="Введите название..." />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Предмет</label>
                      <select className="form-select">
                        <option>Выберите предмет</option>
                        {subjects.slice(1).map(subject => (
                          <option key={subject} value={subject}>{subject}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Тип задания</label>
                      <select className="form-select">
                        <option value="programming">Программирование</option>
                        <option value="report">Отчет</option>
                        <option value="project">Проект</option>
                        <option value="analysis">Анализ</option>
                        <option value="design">Дизайн</option>
                        <option value="essay">Эссе</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Приоритет</label>
                      <select className="form-select">
                        <option value="high">Высокий</option>
                        <option value="medium">Средний</option>
                        <option value="low">Низкий</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Дедлайн</label>
                      <input type="datetime-local" className="form-control" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Ожидаемое время (часы)</label>
                      <input type="number" className="form-control" placeholder="Например: 5" />
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Описание</label>
                  <textarea className="form-control" rows="4" placeholder="Подробное описание задания..."></textarea>
                </div>
                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-secondary">Отмена</button>
                  <button className="btn btn-primary">
                    <i className="bi bi-plus-circle me-2"></i>
                    Создать задание
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AssignmentsPage; 