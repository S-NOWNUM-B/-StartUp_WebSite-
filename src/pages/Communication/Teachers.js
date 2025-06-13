import React, { useState } from 'react';

function TeachersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  
  // Новые состояния для системы сообщений
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageTeacher, setMessageTeacher] = useState(null);
  const [messageData, setMessageData] = useState({
    subject: '',
    message: '',
    priority: 'normal',
    type: 'question',
    requestConsultation: false,
    consultationDate: '',
    consultationTime: '',
    attachments: []
  });
  const [sentMessages, setSentMessages] = useState([]);

  const teachers = [
    {
      id: 1,
      name: 'Иванов Иван Иванович',
      title: 'Профессор',
      degree: 'Доктор физико-математических наук',
      department: 'Кафедра математики',
      subjects: ['Высшая математика I', 'Высшая математика II', 'Дифференциальные уравнения'],
      email: 'ivanov@eduspace.edu',
      phone: '+7 (727) 111-11-11',
      office: 'Корпус А, ауд. 301',
      consultationHours: [
        { day: 'Понедельник', time: '14:00 - 16:00' },
        { day: 'Среда', time: '10:00 - 12:00' }
      ],
      photo: '👨‍🏫',
      experience: '25 лет',
      achievements: [
        'Лауреат премии "Лучший преподаватель года"',
        'Автор 50+ научных публикаций',
        'Руководитель 15 кандидатских диссертаций'
      ],
      courses: ['Высшая математика', 'Математический анализ', 'Линейная алгебра'],
      rating: 4.8,
      reviewsCount: 156
    },
    {
      id: 2,
      name: 'Петрова Анна Сергеевна',
      title: 'Доцент',
      degree: 'Кандидат физико-математических наук',
      department: 'Кафедра физики',
      subjects: ['Физика I', 'Физика II', 'Физика твердого тела'],
      email: 'petrova@eduspace.edu',
      phone: '+7 (727) 222-22-22',
      office: 'Корпус Б, лаб. 205',
      consultationHours: [
        { day: 'Вторник', time: '15:00 - 17:00' },
        { day: 'Четверг', time: '11:00 - 13:00' }
      ],
      photo: '👩‍🏫',
      experience: '12 лет',
      achievements: [
        'Победитель конкурса "Инновации в образовании"',
        'Автор 20+ научных публикаций',
        'Разработчик интерактивных лабораторных работ'
      ],
      courses: ['Общая физика', 'Квантовая механика', 'Электродинамика'],
      rating: 4.9,
      reviewsCount: 134
    },
    {
      id: 3,
      name: 'Ахметов Бауржан Кайратович',
      title: 'Доцент',
      degree: 'Кандидат технических наук',
      department: 'Кафедра информационных технологий',
      subjects: ['Веб-программирование (React)', 'JavaScript', 'Базы данных'],
      email: 'akhmetov@eduspace.edu',
      phone: '+7 (727) 333-33-33',
      office: 'Корпус IT, комп. класс 101',
      consultationHours: [
        { day: 'Понедельник', time: '16:00 - 18:00' },
        { day: 'Пятница', time: '14:00 - 16:00' }
      ],
      photo: '👨‍💻',
      experience: '8 лет',
      achievements: [
        'Сертифицированный React разработчик',
        'Ментор международных IT проектов',
        'Автор популярного YouTube канала по программированию'
      ],
      courses: ['React.js', 'Node.js', 'MongoDB', 'Full-Stack разработка'],
      rating: 4.7,
      reviewsCount: 189
    },
    {
      id: 4,
      name: 'Сарсенбаев Канат Асылханович',
      title: 'Доцент',
      degree: 'Кандидат исторических наук',
      department: 'Кафедра гуманитарных наук',
      subjects: ['История Казахстана', 'Культурология', 'Политология'],
      email: 'sarsenbayev@eduspace.edu',
      phone: '+7 (727) 444-44-44',
      office: 'Корпус Г, ауд. 402',
      consultationHours: [
        { day: 'Среда', time: '13:00 - 15:00' },
        { day: 'Четверг', time: '09:00 - 11:00' }
      ],
      photo: '👨‍🎓',
      experience: '15 лет',
      achievements: [
        'Автор учебника "История современного Казахстана"',
        'Участник международных научных конференций',
        'Эксперт по истории Центральной Азии'
      ],
      courses: ['История Казахстана', 'Всемирная история', 'Краеведение'],
      rating: 4.6,
      reviewsCount: 78
    },
    {
      id: 5,
      name: 'Сидорова Мария Викторовна',
      title: 'Профессор',
      degree: 'Доктор экономических наук',
      department: 'Кафедра экономики',
      subjects: ['Экономическая теория', 'Макроэкономика', 'Международная экономика'],
      email: 'sidorova@eduspace.edu',
      phone: '+7 (727) 555-55-55',
      office: 'Корпус Э, ауд. 301',
      consultationHours: [
        { day: 'Вторник', time: '10:00 - 12:00' },
        { day: 'Четверг', time: '15:00 - 17:00' }
      ],
      photo: '👩‍💼',
      experience: '20 лет',
      achievements: [
        'Лауреат государственной премии в области образования',
        'Автор 80+ научных публикаций',
        'Консультант Министерства экономики РК'
      ],
      courses: ['Микроэкономика', 'Макроэкономика', 'Эконометрика'],
      rating: 4.8,
      reviewsCount: 203
    }
  ];

  const departments = [...new Set(teachers.map(teacher => teacher.department))];

  const filteredTeachers = teachers.filter(teacher => {
    const nameMatch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     teacher.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
    const departmentMatch = selectedDepartment === 'all' || teacher.department === selectedDepartment;
    
    return nameMatch && departmentMatch;
  });

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="bi bi-star-half text-warning"></i>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="bi bi-star text-warning"></i>);
    }
    
    return stars;
  };

  const handleContactTeacher = (teacher) => {
    setMessageTeacher(teacher);
    setShowMessageModal(true);
    // Сброс формы
    setMessageData({
      subject: '',
      message: '',
      priority: 'normal',
      type: 'question',
      requestConsultation: false,
      consultationDate: '',
      consultationTime: '',
      attachments: []
    });
  };

  const handleSendMessage = () => {
    if (!messageData.subject.trim() || !messageData.message.trim()) {
      alert('Пожалуйста, заполните тему и текст сообщения');
      return;
    }

    const newMessage = {
      id: Date.now(),
      teacher: messageTeacher,
      ...messageData,
      timestamp: new Date().toLocaleString('ru-RU'),
      status: 'sent',
      read: false
    };

    setSentMessages(prev => [...prev, newMessage]);
    setShowMessageModal(false);
    
    // Показываем уведомление об успешной отправке
    showToast(`Сообщение отправлено преподавателю ${messageTeacher.name}`, 'success');
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const fileNames = files.map(file => file.name);
    setMessageData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...fileNames]
    }));
  };

  const removeAttachment = (index) => {
    setMessageData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} position-fixed`;
    toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px; animation: slideIn 0.3s ease;';
    toast.innerHTML = `
      <div class="d-flex align-items-center">
        <i class="bi bi-check-circle me-2"></i>
        ${message}
        <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
      </div>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 5000);
  };

  // Функция для генерации доступных временных слотов
  const getAvailableTimeSlots = () => {
    if (!messageTeacher) return [];
    
    const slots = [];
    messageTeacher.consultationHours.forEach(consultation => {
      const [startTime, endTime] = consultation.time.split(' - ');
      const [startHour] = startTime.split(':');
      const [endHour] = endTime.split(':');
      
      for (let hour = parseInt(startHour); hour < parseInt(endHour); hour++) {
        slots.push(`${hour.toString().padStart(2, '0')}:00`);
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
      }
    });
    
    return [...new Set(slots)].sort();
  };

  return (
    <div className="container py-4">
      <div className="page-content card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1">Преподаватели</h2>
            <p className="lead text-muted mb-0">Информация о преподавателях и расписание консультаций</p>
          </div>
          <div className="d-flex align-items-center gap-3">
            {sentMessages.length > 0 && (
              <div className="d-flex align-items-center">
                <i className="bi bi-envelope-check text-success me-2"></i>
                <span className="badge bg-success">
                  {sentMessages.length} отправлено
                </span>
              </div>
            )}
            <div className="text-muted small">
              <i className="bi bi-people me-1"></i>
              {filteredTeachers.length} из {teachers.length} преподавателей
            </div>
          </div>
        </div>

        {/* Статистика */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card text-center border-primary">
              <div className="card-body">
                <div className="h4 text-primary">{teachers.length}</div>
                <small className="text-muted">Всего преподавателей</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center border-success">
              <div className="card-body">
                <div className="h4 text-success">{departments.length}</div>
                <small className="text-muted">Кафедр</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center border-info">
              <div className="card-body">
                <div className="h4 text-info">
                  {teachers.filter(t => t.title === 'Профессор').length}
                </div>
                <small className="text-muted">Профессоров</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center border-warning">
              <div className="card-body">
                <div className="h4 text-warning">
                  {(teachers.reduce((sum, t) => sum + t.rating, 0) / teachers.length).toFixed(1)}
                </div>
                <small className="text-muted">Средний рейтинг</small>
              </div>
            </div>
          </div>
        </div>

        {/* Поиск и фильтры */}
        <div className="row mb-4">
          <div className="col-md-8">
            <label className="form-label">Поиск:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Поиск по имени преподавателя или предмету..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Кафедра:</label>
            <select 
              className="form-select" 
              value={selectedDepartment} 
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="all">Все кафедры</option>
              {departments.map(department => (
                <option key={department} value={department}>{department}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Список преподавателей */}
        <div className="row">
          {filteredTeachers.map(teacher => (
            <div key={teacher.id} className="col-lg-6 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-start mb-3">
                    <div className="me-3" style={{ fontSize: '3rem' }}>
                      {teacher.photo}
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-1">{teacher.name}</h5>
                      <p className="text-primary mb-1">{teacher.title}</p>
                      <small className="text-muted">{teacher.degree}</small>
                      <div className="mt-2">
                        <span className="badge bg-secondary">{teacher.department}</span>
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="d-flex align-items-center mb-1">
                        {renderStars(teacher.rating)}
                      </div>
                      <small className="text-muted">
                        {teacher.rating} ({teacher.reviewsCount} отзывов)
                      </small>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h6 className="mb-2">Преподаваемые предметы:</h6>
                    <div>
                      {teacher.subjects.map((subject, index) => (
                        <span key={index} className="badge bg-light text-dark me-1 mb-1">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <h6 className="mb-2">Консультации:</h6>
                    {teacher.consultationHours.map((consultation, index) => (
                      <div key={index} className="d-flex justify-content-between">
                        <span>{consultation.day}:</span>
                        <span className="fw-bold">{consultation.time}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mb-3">
                    <div className="row">
                      <div className="col-6">
                        <small className="text-muted">Опыт:</small>
                        <div className="fw-bold">{teacher.experience}</div>
                      </div>
                      <div className="col-6">
                        <small className="text-muted">Кабинет:</small>
                        <div className="fw-bold">{teacher.office}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <small className="text-muted">Контакты:</small>
                    <div>
                      <i className="bi bi-envelope me-1"></i>
                      <small>{teacher.email}</small>
                    </div>
                    <div>
                      <i className="bi bi-telephone me-1"></i>
                      <small>{teacher.phone}</small>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-outline-primary btn-sm flex-grow-1"
                      onClick={() => setSelectedTeacher(teacher)}
                    >
                      <i className="bi bi-info-circle me-1"></i>
                      Подробнее
                    </button>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handleContactTeacher(teacher)}
                    >
                      <i className="bi bi-chat-dots"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTeachers.length === 0 && (
          <div className="text-center py-5">
            <i className="bi bi-person-x display-1 text-muted"></i>
            <h4 className="mt-3 text-muted">Преподаватели не найдены</h4>
            <p className="text-muted">Попробуйте изменить параметры поиска</p>
          </div>
        )}

        {/* Модальное окно с подробной информацией */}
        {selectedTeacher && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selectedTeacher.name}</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setSelectedTeacher(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-3 text-center mb-3">
                      <div style={{ fontSize: '4rem' }}>{selectedTeacher.photo}</div>
                      <h6>{selectedTeacher.title}</h6>
                      <p className="text-muted">{selectedTeacher.degree}</p>
                      <div className="d-flex justify-content-center align-items-center">
                        {renderStars(selectedTeacher.rating)}
                        <span className="ms-2">{selectedTeacher.rating}</span>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="mb-4">
                        <h6>Достижения:</h6>
                        <ul>
                          {selectedTeacher.achievements.map((achievement, index) => (
                            <li key={index}>{achievement}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-4">
                        <h6>Курсы:</h6>
                        <div>
                          {selectedTeacher.courses.map((course, index) => (
                            <span key={index} className="badge bg-primary me-1 mb-1">
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <h6>Контактная информация:</h6>
                          <p>
                            <i className="bi bi-envelope me-2"></i>
                            {selectedTeacher.email}
                          </p>
                          <p>
                            <i className="bi bi-telephone me-2"></i>
                            {selectedTeacher.phone}
                          </p>
                          <p>
                            <i className="bi bi-geo-alt me-2"></i>
                            {selectedTeacher.office}
                          </p>
                        </div>
                        <div className="col-md-6">
                          <h6>Часы консультаций:</h6>
                          {selectedTeacher.consultationHours.map((consultation, index) => (
                            <p key={index}>
                              <strong>{consultation.day}:</strong> {consultation.time}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setSelectedTeacher(null)}
                  >
                    Закрыть
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => handleContactTeacher(selectedTeacher)}
                  >
                    <i className="bi bi-chat-dots me-2"></i>
                    Написать сообщение
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Модальное окно отправки сообщения */}
        {showMessageModal && messageTeacher && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">
                    <i className="bi bi-chat-dots me-2"></i>
                    Написать сообщение - {messageTeacher.name}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close btn-close-white" 
                    onClick={() => setShowMessageModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Тип обращения *</label>
                      <select 
                        className="form-select" 
                        value={messageData.type}
                        onChange={(e) => setMessageData({...messageData, type: e.target.value})}
                      >
                        <option value="question">Вопрос по предмету</option>
                        <option value="consultation">Запрос на консультацию</option>
                        <option value="assignment">Вопрос по заданию</option>
                        <option value="grade">Вопрос по оценке</option>
                        <option value="schedule">Вопрос по расписанию</option>
                        <option value="other">Другое</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Приоритет</label>
                      <select 
                        className="form-select" 
                        value={messageData.priority}
                        onChange={(e) => setMessageData({...messageData, priority: e.target.value})}
                      >
                        <option value="low">Низкий</option>
                        <option value="normal">Обычный</option>
                        <option value="high">Высокий</option>
                        <option value="urgent">Срочный</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Тема сообщения *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Кратко опишите суть вашего обращения"
                      value={messageData.subject}
                      onChange={(e) => setMessageData({...messageData, subject: e.target.value})}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Сообщение *</label>
                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="Подробно опишите ваш вопрос или запрос..."
                      value={messageData.message}
                      onChange={(e) => setMessageData({...messageData, message: e.target.value})}
                    ></textarea>
                    <div className="form-text">
                      Символов: {messageData.message.length} / 1000
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="requestConsultation"
                        checked={messageData.requestConsultation}
                        onChange={(e) => setMessageData({...messageData, requestConsultation: e.target.checked})}
                      />
                      <label className="form-check-label" htmlFor="requestConsultation">
                        Запросить личную консультацию
                      </label>
                    </div>
                  </div>

                  {messageData.requestConsultation && (
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Предпочтительная дата</label>
                        <input
                          type="date"
                          className="form-control"
                          value={messageData.consultationDate}
                          onChange={(e) => setMessageData({...messageData, consultationDate: e.target.value})}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Предпочтительное время</label>
                        <select 
                          className="form-select"
                          value={messageData.consultationTime}
                          onChange={(e) => setMessageData({...messageData, consultationTime: e.target.value})}
                        >
                          <option value="">Выберите время</option>
                          {getAvailableTimeSlots().map(slot => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label">Прикрепить файлы</label>
                    <input
                      type="file"
                      className="form-control"
                      multiple
                      accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                    />
                    <div className="form-text">
                      Максимум 5 файлов. Форматы: PDF, DOC, DOCX, TXT, JPG, PNG
                    </div>
                    
                    {messageData.attachments.length > 0 && (
                      <div className="mt-2">
                        <small className="text-muted">Прикрепленные файлы:</small>
                        {messageData.attachments.map((file, index) => (
                          <div key={index} className="d-flex align-items-center justify-content-between bg-light p-2 mt-1 rounded">
                            <div>
                              <i className="bi bi-file-earmark me-2"></i>
                              <span className="small">{file}</span>
                            </div>
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removeAttachment(index)}
                            >
                              <i className="bi bi-x"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="alert alert-info">
                    <i className="bi bi-info-circle me-2"></i>
                    <strong>Информация:</strong> Преподаватель обычно отвечает в течение 1-2 рабочих дней. 
                    Для срочных вопросов используйте телефон или приходите на консультации.
                  </div>
                </div>

                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowMessageModal(false)}
                  >
                    Отмена
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleSendMessage}
                    disabled={!messageData.subject.trim() || !messageData.message.trim()}
                  >
                    <i className="bi bi-send me-2"></i>
                    Отправить сообщение
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

export default TeachersPage; 