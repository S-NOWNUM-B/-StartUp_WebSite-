import React, { useState } from 'react';

function AppealsPage() {
  const [activeTab, setActiveTab] = useState('submit'); // submit, my-appeals, history
  const [selectedCategory, setSelectedCategory] = useState('');
  const [appealText, setAppealText] = useState('');
  const [attachments, setAttachments] = useState([]);

  const appealCategories = [
    { id: 'grade', name: 'Пересмотр оценки', description: 'Обжалование выставленной оценки' },
    { id: 'exam', name: 'Пересдача экзамена/зачета', description: 'Запрос на дополнительную пересдачу' },
    { id: 'attendance', name: 'Посещаемость', description: 'Вопросы по учету посещаемости' },
    { id: 'schedule', name: 'Расписание занятий', description: 'Конфликты в расписании' },
    { id: 'teacher', name: 'Действия преподавателя', description: 'Жалоба на действия преподавателя' },
    { id: 'technical', name: 'Технические вопросы', description: 'Проблемы с системой, доступом к материалам' },
    { id: 'other', name: 'Другое', description: 'Иные академические вопросы' }
  ];

  const myAppeals = [
    {
      id: 1,
      category: 'Пересмотр оценки',
      subject: 'Высшая математика',
      description: 'Прошу пересмотреть оценку за экзамен. Считаю, что работа была оценена необъективно.',
      submittedDate: '2025-01-20',
      status: 'reviewing',
      assignedTo: 'Академическая комиссия',
      expectedResponse: '2025-01-27',
      attachments: ['Скан экзаменационной работы.pdf'],
      response: null,
      appeals_id: 'APP-2025-001'
    },
    {
      id: 2,
      category: 'Пересдача экзамена/зачета',
      subject: 'Физика',
      description: 'По уважительной причине (болезнь) не смог сдать экзамен в установленный срок. Прошу назначить дополнительную пересдачу.',
      submittedDate: '2025-01-15',
      status: 'approved',
      assignedTo: 'Деканат',
      expectedResponse: '2025-01-22',
      attachments: ['Справка из больницы.pdf'],
      response: 'Пересдача назначена на 25 января 2025г. в 10:00, ауд. 205',
      appeals_id: 'APP-2025-002'
    },
    {
      id: 3,
      category: 'Технические вопросы',
      subject: 'Система дистанционного обучения',
      description: 'Не могу получить доступ к материалам курса "Базы данных". Система выдает ошибку авторизации.',
      submittedDate: '2025-01-10',
      status: 'resolved',
      assignedTo: 'Техническая поддержка',
      expectedResponse: '2025-01-12',
      attachments: ['Скриншот ошибки.png'],
      response: 'Проблема решена. Доступ восстановлен. Причина: техническая ошибка в системе.',
      appeals_id: 'APP-2025-003'
    }
  ];

  const appealHistory = [
    {
      id: 1,
      category: 'Пересмотр оценки',
      subject: 'Программирование',
      submittedDate: '2024-12-15',
      resolvedDate: '2024-12-22',
      status: 'resolved',
      result: 'Оценка изменена с B на A-',
      appeals_id: 'APP-2024-145'
    },
    {
      id: 2,
      category: 'Расписание занятий',
      subject: 'Конфликт расписания',
      submittedDate: '2024-11-20',
      resolvedDate: '2024-11-25',
      status: 'resolved',
      result: 'Расписание скорректировано, конфликт устранен',
      appeals_id: 'APP-2024-089'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'submitted': return 'info';
      case 'reviewing': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'danger';
      case 'resolved': return 'success';
      case 'pending': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'submitted': return 'Подана';
      case 'reviewing': return 'На рассмотрении';
      case 'approved': return 'Одобрена';
      case 'rejected': return 'Отклонена';
      case 'resolved': return 'Решена';
      case 'pending': return 'Ожидает';
      default: return 'Неизвестно';
    }
  };

  const handleSubmitAppeal = () => {
    if (!selectedCategory || !appealText.trim()) {
      alert('Пожалуйста, выберите категорию и заполните описание обращения.');
      return;
    }
    
    alert(`Апелляция подана успешно!\nКатегория: ${appealCategories.find(cat => cat.id === selectedCategory)?.name}\nВам будет присвоен номер обращения для отслеживания.`);
    
    // Сброс формы
    setSelectedCategory('');
    setAppealText('');
    setAttachments([]);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setAttachments(prev => [...prev, ...files.map(file => file.name)]);
  };

  return (
    <div className="container py-4">
      <div className="page-content card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1">Апелляции</h2>
            <p className="lead text-muted mb-0">Подача обращений и отслеживание статуса</p>
          </div>
        </div>

        {/* Навигационные табы */}
        <ul className="nav nav-pills mb-4">
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'submit' ? 'active' : ''}`}
              onClick={() => setActiveTab('submit')}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Подать апелляцию
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'my-appeals' ? 'active' : ''}`}
              onClick={() => setActiveTab('my-appeals')}
            >
              <i className="bi bi-hourglass-split me-2"></i>
              Мои обращения
              {myAppeals.filter(appeal => appeal.status === 'reviewing' || appeal.status === 'submitted').length > 0 && (
                <span className="badge bg-warning ms-2">
                  {myAppeals.filter(appeal => appeal.status === 'reviewing' || appeal.status === 'submitted').length}
                </span>
              )}
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <i className="bi bi-clock-history me-2"></i>
              История
            </button>
          </li>
        </ul>

        {/* Подача апелляции */}
        {activeTab === 'submit' && (
          <div>
            <h4 className="mb-4">Подача новой апелляции</h4>
            
            <div className="alert alert-info mb-4">
              <i className="bi bi-info-circle me-2"></i>
              <strong>Важно:</strong> Апелляции рассматриваются в порядке поступления. Срок рассмотрения - до 7 рабочих дней. 
              Убедитесь, что все данные указаны корректно.
            </div>

            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Форма обращения</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-4">
                      <label className="form-label">Категория обращения *</label>
                      <select 
                        className="form-select" 
                        value={selectedCategory} 
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        <option value="">Выберите категорию</option>
                        {appealCategories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      {selectedCategory && (
                        <div className="form-text">
                          {appealCategories.find(cat => cat.id === selectedCategory)?.description}
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Подробное описание *</label>
                      <textarea
                        className="form-control"
                        rows="6"
                        placeholder="Опишите подробно суть вашего обращения, укажите все необходимые детали..."
                        value={appealText}
                        onChange={(e) => setAppealText(e.target.value)}
                      ></textarea>
                      <div className="form-text">
                        Минимум 50 символов. Текущая длина: {appealText.length}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Прикрепить файлы</label>
                      <input
                        type="file"
                        className="form-control"
                        multiple
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                        onChange={handleFileUpload}
                      />
                      <div className="form-text">
                        Допустимые форматы: PDF, DOC, DOCX, PNG, JPG. Максимум 5 файлов по 10MB каждый.
                      </div>
                      {attachments.length > 0 && (
                        <div className="mt-2">
                          <small className="text-muted">Прикрепленные файлы:</small>
                          {attachments.map((file, index) => (
                            <div key={index} className="d-flex align-items-center mt-1">
                              <i className="bi bi-file-earmark me-2"></i>
                              <span className="small">{file}</span>
                              <button 
                                className="btn btn-sm btn-outline-danger ms-2"
                                onClick={() => setAttachments(prev => prev.filter((_, i) => i !== index))}
                              >
                                <i className="bi bi-x"></i>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="d-flex justify-content-between">
                      <button 
                        className="btn btn-secondary"
                        onClick={() => {
                          setSelectedCategory('');
                          setAppealText('');
                          setAttachments([]);
                        }}
                      >
                        Очистить форму
                      </button>
                      <button 
                        className="btn btn-primary"
                        onClick={handleSubmitAppeal}
                        disabled={!selectedCategory || appealText.length < 50}
                      >
                        <i className="bi bi-send me-2"></i>
                        Подать апелляцию
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">Категории обращений</h6>
                  </div>
                  <div className="card-body">
                    {appealCategories.map(category => (
                      <div 
                        key={category.id} 
                        className={`p-2 mb-2 border rounded cursor-pointer ${selectedCategory === category.id ? 'border-primary bg-light' : ''}`}
                        onClick={() => setSelectedCategory(category.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="fw-semibold">{category.name}</div>
                        <small className="text-muted">{category.description}</small>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card mt-3">
                  <div className="card-header">
                    <h6 className="mb-0">Полезная информация</h6>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled small">
                      <li className="mb-2">
                        <i className="bi bi-clock text-warning me-2"></i>
                        Срок рассмотрения: до 7 рабочих дней
                      </li>
                      <li className="mb-2">
                        <i className="bi bi-envelope text-info me-2"></i>
                        Уведомления приходят на email
                      </li>
                      <li className="mb-2">
                        <i className="bi bi-file-earmark text-success me-2"></i>
                        Прикрепляйте подтверждающие документы
                      </li>
                      <li>
                        <i className="bi bi-telephone text-primary me-2"></i>
                        Горячая линия: +7 (727) 123-45-67
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Мои обращения */}
        {activeTab === 'my-appeals' && (
          <div>
            <h4 className="mb-3">Мои текущие обращения</h4>
            
            {myAppeals.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-inbox display-1 text-muted"></i>
                <h5 className="mt-3 text-muted">У вас нет активных обращений</h5>
                <p className="text-muted">Перейдите во вкладку "Подать апелляцию" для создания нового обращения</p>
              </div>
            ) : (
              <div className="row">
                {myAppeals.map(appeal => (
                  <div key={appeal.id} className="col-12 mb-4">
                    <div className={`card border-${getStatusColor(appeal.status)}`}>
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <div>
                          <span className="fw-semibold">{appeal.category}</span>
                          {appeal.subject && <span className="text-muted ms-2">• {appeal.subject}</span>}
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className={`badge bg-${getStatusColor(appeal.status)}`}>
                            {getStatusText(appeal.status)}
                          </span>
                          <small className="text-muted">{appeal.appeals_id}</small>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-8">
                            <p className="mb-3">{appeal.description}</p>
                            
                            {appeal.attachments.length > 0 && (
                              <div className="mb-3">
                                <small className="text-muted">Прикрепленные файлы:</small>
                                {appeal.attachments.map((file, index) => (
                                  <div key={index} className="d-flex align-items-center mt-1">
                                    <i className="bi bi-file-earmark me-2"></i>
                                    <a href="#" className="small text-decoration-none">{file}</a>
                                  </div>
                                ))}
                              </div>
                            )}

                            {appeal.response && (
                              <div className="alert alert-success">
                                <strong>Ответ:</strong> {appeal.response}
                              </div>
                            )}
                          </div>
                          
                          <div className="col-md-4">
                            <div className="row text-center">
                              <div className="col-6">
                                <small className="text-muted">Подана:</small>
                                <div className="fw-bold">{appeal.submittedDate}</div>
                              </div>
                              <div className="col-6">
                                <small className="text-muted">Ответ до:</small>
                                <div className="fw-bold">{appeal.expectedResponse}</div>
                              </div>
                            </div>
                            <div className="mt-3">
                              <small className="text-muted">Рассматривает:</small>
                              <div className="fw-bold">{appeal.assignedTo}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* История */}
        {activeTab === 'history' && (
          <div>
            <h4 className="mb-3">История обращений</h4>
            
            {appealHistory.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-clock-history display-1 text-muted"></i>
                <h5 className="mt-3 text-muted">История пуста</h5>
                <p className="text-muted">Здесь будут отображаться ваши завершенные обращения</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Номер</th>
                      <th>Категория</th>
                      <th>Предмет</th>
                      <th>Дата подачи</th>
                      <th>Дата решения</th>
                      <th>Результат</th>
                      <th>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appealHistory.map(record => (
                      <tr key={record.id}>
                        <td className="fw-bold">{record.appeals_id}</td>
                        <td>{record.category}</td>
                        <td>{record.subject}</td>
                        <td>{record.submittedDate}</td>
                        <td>{record.resolvedDate}</td>
                        <td>
                          <span className="badge bg-success">{record.result}</span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary">
                            <i className="bi bi-eye me-1"></i>
                            Подробнее
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Статистика */}
            <div className="row mt-4">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">Статистика обращений</h6>
                  </div>
                  <div className="card-body">
                    <div className="row text-center">
                      <div className="col-4">
                        <div className="h4 text-success">{appealHistory.length}</div>
                        <small className="text-muted">Решено</small>
                      </div>
                      <div className="col-4">
                        <div className="h4 text-warning">{myAppeals.length}</div>
                        <small className="text-muted">В работе</small>
                      </div>
                      <div className="col-4">
                        <div className="h4 text-info">{appealHistory.length + myAppeals.length}</div>
                        <small className="text-muted">Всего</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">Среднее время решения</h6>
                  </div>
                  <div className="card-body text-center">
                    <div className="h4 text-primary">5.2 дня</div>
                    <small className="text-muted">На основе последних обращений</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AppealsPage; 