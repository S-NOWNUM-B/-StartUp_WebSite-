import React, { useState, useEffect } from 'react';
import './styles.css';

function SchedulePage() {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Получаем понедельник текущей недели
    const monday = new Date(today);
    monday.setDate(today.getDate() + diff);
    monday.setHours(0, 0, 0, 0);
    return monday;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  // Убрали viewMode - режим просмотра только недельный
  const [showNotifications, setShowNotifications] = useState(true);
  const [notes, setNotes] = useState({});
  const [favorites, setFavorites] = useState(new Set());
  
  // Состояния для быстрых действий
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    enabled: true,
    beforeClass: 15, // минут до занятия
    email: true,
    push: true,
    sound: true
  });

  const scheduleData = [
    {
      id: '1',
      course: 'Высшая математика',
      time: '09:00 - 10:30',
      dayIndex: 1,
      location: 'Ауд. 301',
      instructor: 'Проф. Иванов И.И.',
      type: 'Лекция',
      color: 'primary',
      duration: 90,
      credits: 3,
      group: 'ИС-21-1',
      description: 'Дифференциальное исчисление',
      homework: 'Решить задачи 1-10 стр. 45'
    },
    {
      id: '2',
      course: 'Физика',
      time: '10:45 - 12:15',
      dayIndex: 1,
      location: 'Лаб. 205',
      instructor: 'Доц. Петрова М.В.',
      type: 'Лабораторная',
      color: 'success',
      duration: 90,
      credits: 2,
      group: 'ИС-21-1',
      description: 'Лабораторная работа №3: Изучение колебаний',
      homework: 'Подготовить отчет по лабораторной работе'
    },
    {
      id: '3',
      course: 'История Казахстана',
      time: '13:00 - 14:30',
      dayIndex: 2,
      location: 'Ауд. 402',
      instructor: 'Доц. Сарсенбаев А.К.',
      type: 'Семинар',
      color: 'warning',
      duration: 90,
      credits: 2,
      group: 'ИС-21-1',
      description: 'Казахстан в период средневековья',
      homework: 'Подготовить презентацию по теме'
    },
    {
      id: '4',
      course: 'Программирование (React)',
      time: '14:45 - 16:15',
      dayIndex: 2,
      location: 'Комп. класс 101',
      instructor: 'Доц. Ахметов Б.К.',
      type: 'Практика',
      color: 'info',
      duration: 90,
      credits: 4,
      group: 'ИС-21-1',
      description: 'Создание компонентов React',
      homework: 'Создать компонент ToDo список'
    },
    {
      id: '5',
      course: 'Экономика',
      time: '09:00 - 10:30',
      dayIndex: 3,
      location: 'Ауд. 301',
      instructor: 'Проф. Сидорова Е.А.',
      type: 'Лекция',
      color: 'danger',
      duration: 90,
      credits: 3,
      group: 'ИС-21-1',
      description: 'Макроэкономическая политика',
      homework: 'Изучить главу 8 учебника'
    },
    {
      id: '6',
      course: 'Философия',
      time: '10:45 - 12:15',
      dayIndex: 3,
      location: 'Ауд. 201',
      instructor: 'Доц. Коваль Н.П.',
      type: 'Семинар',
      color: 'secondary',
      duration: 90,
      credits: 2,
      group: 'ИС-21-1',
      description: 'Этика и мораль в современном обществе',
      homework: 'Написать эссе на 500 слов'
    },
    {
      id: '7',
      course: 'Иностранный язык',
      time: '13:00 - 14:30',
      dayIndex: 4,
      location: 'Ауд. 105',
      instructor: 'Лектор Магдеева С.Т.',
      type: 'Практика',
      color: 'purple',
      duration: 90,
      credits: 2,
      group: 'ИС-21-1',
      description: 'Деловая переписка на английском языке',
      homework: 'Выучить новые слова урока 7'
    },
    {
      id: '8',
      course: 'Базы данных',
      time: '14:45 - 16:15',
      dayIndex: 4,
      location: 'Лаб. 206',
      instructor: 'Проф. Султан А.М.',
      type: 'Лабораторная',
      color: 'dark',
      duration: 90,
      credits: 3,
      group: 'ИС-21-1',
      description: 'Проектирование реляционных БД',
      homework: 'Создать ER-диаграмму для проекта'
    },
    {
      id: '9',
      course: 'Физическая культура',
      time: '16:30 - 18:00',
      dayIndex: 5,
      location: 'Спортзал',
      instructor: 'Тренер Камалов Д.С.',
      type: 'Практика',
      color: 'success',
      duration: 90,
      credits: 1,
      group: 'ИС-21-1',
      description: 'Волейбол',
      homework: 'Подготовка к соревнованиям'
    },
    {
      id: '10',
      course: 'Веб-дизайн',
      time: '09:00 - 10:30',
      dayIndex: 5,
      location: 'Комп. класс 102',
      instructor: 'Доц. Нурланова А.Б.',
      type: 'Практика',
      color: 'info',
      duration: 90,
      credits: 3,
      group: 'ИС-21-1',
      description: 'Адаптивная верстка',
      homework: 'Создать адаптивный лендинг'
    },
    {
      id: '11',
      course: 'Системы управления базами данных',
      time: '16:30 - 18:00',
      dayIndex: 1,
      location: 'Комп. класс 103',
      instructor: 'Проф. Жанбосынов К.М.',
      type: 'Лекция',
      color: 'primary',
      duration: 90,
      credits: 3,
      group: 'ИС-21-1',
      description: 'Основы СУБД и SQL',
      homework: 'Изучить синтаксис SQL запросов'
    },
    {
      id: '12',
      course: 'Алгоритмы и структуры данных',
      time: '16:30 - 18:00',
      dayIndex: 2,
      location: 'Ауд. 405',
      instructor: 'Доц. Мукашева С.А.',
      type: 'Семинар',
      color: 'warning',
      duration: 90,
      credits: 4,
      group: 'ИС-21-1',
      description: 'Сортировка и поиск данных',
      homework: 'Реализовать алгоритм быстрой сортировки'
    },
    {
      id: '13',
      course: 'Информационная безопасность',
      time: '16:30 - 18:00',
      dayIndex: 3,
      location: 'Ауд. 508',
      instructor: 'Проф. Токтамысов Б.Н.',
      type: 'Лекция',
      color: 'danger',
      duration: 90,
      credits: 2,
      group: 'ИС-21-1',
      description: 'Криптография и защита данных',
      homework: 'Изучить методы шифрования'
    },
    {
      id: '14',
      course: 'Операционные системы',
      time: '10:45 - 12:15',
      dayIndex: 5,
      location: 'Лаб. 301',
      instructor: 'Доц. Сабитов А.Р.',
      type: 'Лабораторная',
      color: 'success',
      duration: 90,
      credits: 3,
      group: 'ИС-21-1',
      description: 'Работа с Linux командной строкой',
      homework: 'Выполнить практические задания по bash'
    },
    {
      id: '15',
      course: 'Методы математического анализа',
      time: '13:00 - 14:30',
      dayIndex: 5,
      location: 'Ауд. 302',
      instructor: 'Проф. Касымова Н.К.',
      type: 'Лекция',
      color: 'primary',
      duration: 90,
      credits: 4,
      group: 'ИС-21-1',
      description: 'Интегральное исчисление',
      homework: 'Решить задачи на интегрирование'
    },
    {
      id: '16',
      course: 'Факультативный курс по Python',
      time: '10:00 - 11:30',
      dayIndex: 0,
      location: 'Комп. класс 104',
      instructor: 'Ст. преподаватель Айтжанов Е.Б.',
      type: 'Практика',
      color: 'info',
      duration: 90,
      credits: 1,
      group: 'ИС-21-1',
      description: 'Дополнительное изучение Python',
      homework: 'Создать небольшой проект на Python'
    },
    {
      id: '17',
      course: 'Студенческий клуб программистов',
      time: '14:00 - 15:30',
      dayIndex: 6,
      location: 'Конференц-зал',
      instructor: 'Куратор Алимбеков Д.А.',
      type: 'Семинар',
      color: 'warning',
      duration: 90,
      credits: 0,
      group: 'ИС-21-1',
      description: 'Обсуждение проектов и технологий',
      homework: 'Подготовить презентацию проекта'
    }
  ];

  const daysOfWeekNames = [
    'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'
  ];

  const daysOfWeekShort = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  const typeColors = {
    'Лекция': 'primary',
    'Семинар': 'warning', 
    'Практика': 'info',
    'Лабораторная': 'success'
  };

  const subjects = [...new Set(scheduleData.map(item => item.course))];
  const types = [...new Set(scheduleData.map(item => item.type))];

  const getWeekDays = (startOfWeek) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const weekDays = getWeekDays(currentWeekStart);

  const handlePreviousWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeekStart(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeekStart(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Получаем понедельник текущей недели
    const monday = new Date(today);
    monday.setDate(today.getDate() + diff);
    monday.setHours(0, 0, 0, 0);
    setCurrentWeekStart(monday);
  };

  const addNote = (classId, note) => {
    setNotes(prev => ({
      ...prev,
      [classId]: note
    }));
  };

  const toggleFavorite = (classId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(classId)) {
        newFavorites.delete(classId);
      } else {
        newFavorites.add(classId);
      }
      return newFavorites;
    });
  };

  const getFilteredSchedule = () => {
    return scheduleData.filter(item => {
      const searchMatch = searchTerm === '' || 
        item.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
        
      const subjectMatch = selectedSubject === 'all' || item.course === selectedSubject;
      const typeMatch = selectedType === 'all' || item.type === selectedType;
      
      return searchMatch && subjectMatch && typeMatch;
    });
  };

  const getTodayClasses = () => {
    const today = new Date();
    const todayIndex = today.getDay();
    return scheduleData.filter(item => item.dayIndex === todayIndex);
  };

  const getNextClass = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const todayClasses = getTodayClasses();
    
    for (const classItem of todayClasses) {
      const [startTime] = classItem.time.split(' - ');
      const [hours, minutes] = startTime.split(':').map(Number);
      const classTime = hours * 60 + minutes;
      
      if (classTime > currentTime) {
        return classItem;
      }
    }
    return null;
  };

  const getWeekStats = () => {
    const filteredData = getFilteredSchedule();
    const totalClasses = filteredData.length;
    const totalCredits = filteredData.reduce((sum, item) => sum + item.credits, 0);
    const typeStats = {};
    
    types.forEach(type => {
      typeStats[type] = filteredData.filter(item => item.type === type).length;
    });
    
    return { totalClasses, totalCredits, typeStats };
  };

  const nextClass = getNextClass();
  const weekStats = getWeekStats();

  // Функция экспорта в PDF
  const exportToPDF = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    const weekStart = weekDays[0].toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
    const weekEnd = weekDays[6].toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    
    let htmlContent = `
      <html>
        <head>
          <title>Расписание занятий - ${weekStart} - ${weekEnd}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
            .day-section { margin-bottom: 20px; page-break-inside: avoid; }
            .day-header { background: #f8f9fa; padding: 10px; margin-bottom: 10px; font-weight: bold; }
            .class-item { border: 1px solid #dee2e6; margin-bottom: 10px; padding: 10px; border-radius: 5px; }
            .class-title { font-weight: bold; color: #007bff; margin-bottom: 5px; }
            .class-info { margin: 5px 0; font-size: 14px; }
            .no-classes { text-align: center; color: #6c757d; font-style: italic; }
            @media print { body { -webkit-print-color-adjust: exact; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📅 Расписание занятий</h1>
            <h3>${weekStart} - ${weekEnd}</h3>
            <p>Группа: ИС-21-1 • Сгенерировано: ${new Date().toLocaleString('ru-RU')}</p>
          </div>
    `;

    weekDays.forEach((dayDate) => {
      const dayName = daysOfWeekNames[dayDate.getDay()];
      const dayClasses = getFilteredSchedule().filter(item => item.dayIndex === dayDate.getDay());
      
      htmlContent += `
        <div class="day-section">
          <div class="day-header">
            ${dayName}, ${dayDate.toLocaleDateString('ru-RU')} 
            (${dayClasses.length} ${dayClasses.length === 1 ? 'занятие' : dayClasses.length < 5 ? 'занятия' : 'занятий'})
          </div>
      `;

      if (dayClasses.length > 0) {
        dayClasses.sort((a, b) => a.time.localeCompare(b.time)).forEach((item) => {
          htmlContent += `
            <div class="class-item">
              <div class="class-title">${item.course}</div>
              <div class="class-info"><strong>⏰ Время:</strong> ${item.time}</div>
              <div class="class-info"><strong>📍 Аудитория:</strong> ${item.location}</div>
              <div class="class-info"><strong>👨‍🏫 Преподаватель:</strong> ${item.instructor}</div>
              <div class="class-info"><strong>📚 Тип:</strong> ${item.type}</div>
              <div class="class-info"><strong>ℹ️ Описание:</strong> ${item.description}</div>
              ${item.homework ? `<div class="class-info"><strong>📝 Задание:</strong> ${item.homework}</div>` : ''}
            </div>
          `;
        });
      } else {
        htmlContent += '<div class="no-classes">Занятий нет</div>';
      }

      htmlContent += '</div>';
    });

    htmlContent += `
          <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #6c757d;">
            <p>Университетский портал • Расписание занятий</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  // Функция добавления в календарь
  const addToCalendar = () => {
    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//University Portal//Schedule//RU
CALSCALE:GREGORIAN
METHOD:PUBLISH
`;

    const filteredSchedule = getFilteredSchedule();
    
    filteredSchedule.forEach((item) => {
      weekDays.forEach((dayDate) => {
        if (dayDate.getDay() === item.dayIndex) {
          const [startTime, endTime] = item.time.split(' - ');
          const [startHour, startMinute] = startTime.split(':').map(Number);
          const [endHour, endMinute] = endTime.split(':').map(Number);
          
          const startDate = new Date(dayDate);
          startDate.setHours(startHour, startMinute, 0, 0);
          
          const endDate = new Date(dayDate);
          endDate.setHours(endHour, endMinute, 0, 0);
          
          const formatDateTime = (date) => {
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
          };

          icsContent += `BEGIN:VEVENT
UID:${item.id}-${dayDate.getTime()}@university-portal.com
DTSTAMP:${formatDateTime(new Date())}
DTSTART:${formatDateTime(startDate)}
DTEND:${formatDateTime(endDate)}
SUMMARY:${item.course}
DESCRIPTION:Тип: ${item.type}\\nПреподаватель: ${item.instructor}\\nОписание: ${item.description}${item.homework ? `\\nЗадание: ${item.homework}` : ''}
LOCATION:${item.location}
CATEGORIES:Учеба,${item.type}
STATUS:CONFIRMED
TRANSP:OPAQUE
END:VEVENT
`;
        }
      });
    });

    icsContent += 'END:VCALENDAR';
    
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `расписание-${weekDays[0].toLocaleDateString('ru-RU')}.ics`;
    link.click();
    
    // Показываем уведомление об успехе
    const showToast = (message, type = 'success') => {
      const toast = document.createElement('div');
      toast.className = `alert alert-${type} position-fixed`;
      toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
      toast.innerHTML = `
        <i class="bi bi-check-circle-fill me-2"></i>
        ${message}
      `;
      document.body.appendChild(toast);
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 4000);
    };
    
    showToast('Файл календаря загружен! Откройте его в вашем календаре.');
  };

  // Функция сохранения настроек уведомлений
  const saveNotificationSettings = (newSettings) => {
    setNotificationSettings(newSettings);
    localStorage.setItem('scheduleNotificationSettings', JSON.stringify(newSettings));
    setShowNotificationModal(false);
    
    const showToast = (message, type = 'info') => {
      const toast = document.createElement('div');
      toast.className = `alert alert-${type} position-fixed`;
      toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
      toast.innerHTML = `
        <i class="bi bi-bell-fill me-2"></i>
        ${message}
      `;
      document.body.appendChild(toast);
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 3000);
    };
    
    showToast('Настройки уведомлений сохранены!');
  };

  return (
    <div className="container py-4">
      <div className="page-content">
        {/* Заголовок */}
        <div className="mb-4">
          <h2 className="mb-0 text-primary">
            <i className="bi bi-calendar3 me-2"></i>
            Расписание занятий
          </h2>
        </div>

        {/* Уведомление о следующем занятии */}
        {nextClass && showNotifications && (
          <div className="alert alert-info alert-dismissible fade show mb-4">
            <div className="d-flex align-items-center">
              <i className="bi bi-bell-fill me-2"></i>
              <div>
                <strong>Следующее занятие:</strong> {nextClass.course} в {nextClass.time.split(' - ')[0]}
                <br />
                <small>{nextClass.location} • {nextClass.instructor}</small>
              </div>
            </div>
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setShowNotifications(false)}
            ></button>
          </div>
        )}

        <div className="row">
          <div className="col-md-8">
            {/* Фильтры и поиск */}
            <div className="card mb-4">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
          <input
            type="text"
            className="form-control"
                      placeholder="🔍 Поиск по занятиям..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
                  <div className="col-md-3">
                    <select 
                      className="form-select"
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                    >
                      <option value="all">Все предметы</option>
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <select 
                      className="form-select"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                    >
                      <option value="all">Все типы</option>
                      {types.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Навигация по неделям */}
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-outline-primary" onClick={handlePreviousWeek}>
                    <i className="bi bi-chevron-left me-1"></i> Предыдущая
          </button>
                  <div className="text-center">
                    <h5 className="mb-0">
                      {weekDays[0].toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })} - {weekDays[6].toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
          </h5>
                    <small className="text-muted">
                      Неделя {Math.ceil((weekDays[0] - new Date(weekDays[0].getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000))}
                    </small>
                  </div>
                  <div>
                    <button className="btn btn-info me-2" onClick={goToToday}>
                      <i className="bi bi-house-fill me-1"></i> Сегодня
          </button>
          <button className="btn btn-outline-primary" onClick={handleNextWeek}>
                      Следующая <i className="bi bi-chevron-right ms-1"></i>
          </button>
        </div>
                </div>
              </div>
            </div>

            {/* Основное расписание */}
        <div className="schedule-container">
          {weekDays.map((dayDate) => {
            const dayName = daysOfWeekNames[dayDate.getDay()];
            const today = new Date();
                today.setHours(0, 0, 0, 0);
            const isCurrentDay = dayDate.toDateString() === today.toDateString();
                // Расписание повторяется каждую неделю - используем dayIndex для фильтрации
                const dayClasses = getFilteredSchedule().filter(item => item.dayIndex === dayDate.getDay());

            return (
                  <div key={dayDate.toISOString()} className={`card mb-4 ${isCurrentDay ? 'border-primary shadow' : ''}`}>
                <div className={`card-header ${isCurrentDay ? 'bg-primary text-white' : 'bg-light'}`}>
                      <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                          <i className="bi bi-calendar-day me-2"></i>
                          {dayName}
                  </h5>
                        <div className="d-flex align-items-center">
                          <span className={`badge ${isCurrentDay ? 'bg-light text-primary' : 'bg-primary'} me-2`}>
                            {dayDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                          </span>
                          <span className={`badge ${isCurrentDay ? 'bg-light text-primary' : 'bg-secondary'}`}>
                            {dayClasses.length} занятий
                          </span>
                        </div>
                      </div>
                </div>
                <div className="card-body">
                      {dayClasses.length > 0 ? (
                        <div className="row g-3">
                          {dayClasses.map((item) => (
                            <div key={item.id} className="col-12">
                              <div className={`card border-start border-${item.color} border-4 h-100 schedule-item-card`}>
                                <div className="card-body">
                                  <div className="d-flex justify-content-between align-items-start mb-2">
                                    <h6 className="card-title mb-1 text-truncate">
                                      {item.course}
                                    </h6>
                                    <div className="d-flex align-items-center">
                                      <button 
                                        className={`btn btn-sm ${favorites.has(item.id) ? 'btn-warning' : 'btn-outline-warning'} me-2`}
                                        onClick={() => toggleFavorite(item.id)}
                                        title={favorites.has(item.id) ? 'Убрать из избранного' : 'Добавить в избранное'}
                                      >
                                        <i className="bi bi-star-fill"></i>
                                      </button>
                                      <span className={`badge bg-${item.color} d-flex align-items-center justify-content-center`}>
                                        {item.type}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <div className="row g-2 mb-2">
                                    <div className="col-sm-6">
                                      <small className="text-muted d-block">
                                        <i className="bi bi-clock me-1"></i>
                                        {item.time}
                                      </small>
                                    </div>
                                    <div className="col-sm-6">
                                      <small className="text-muted d-block">
                                        <i className="bi bi-geo-alt me-1"></i>
                                        {item.location}
                                      </small>
                                    </div>
                                  </div>
                                  
                                  <p className="mb-2">
                                    <i className="bi bi-person me-1"></i>
                                    <strong>{item.instructor}</strong>
                                  </p>
                                  
                                  <p className="text-muted mb-2 small">
                                    {item.description}
                                  </p>
                                  
                                  {item.homework && (
                                    <div className="alert alert-light py-2 mb-2">
                                      <small>
                                        <i className="bi bi-journal-text me-1"></i>
                                        <strong>Задание:</strong> {item.homework}
                                      </small>
                                    </div>
                                  )}
                                  
                                  {notes[item.id] && (
                                    <div className="alert alert-info py-2 mb-2">
                                      <small>
                                        <i className="bi bi-sticky me-1"></i>
                                        <strong>Заметка:</strong> {notes[item.id]}
                                      </small>
                                    </div>
                                  )}
                                  
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                      <span className="badge bg-light text-dark me-2">
                                        {item.credits} кредитов
                                      </span>
                                      <span className="badge bg-light text-dark">
                                        {item.duration} мин
                                      </span>
                                    </div>
                                    <button 
                                      className="btn btn-sm btn-outline-primary"
                                      onClick={() => {
                                        const note = prompt('Добавить заметку к занятию:', notes[item.id] || '');
                                        if (note !== null) {
                                          addNote(item.id, note);
                                        }
                                      }}
                                    >
                                      <i className="bi bi-sticky"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                  ) : (
                        <div className="text-center py-4">
                          <i className="bi bi-calendar-x display-6 text-muted"></i>
                          <p className="text-muted mt-2">Занятий нет</p>
                        </div>
                  )}
                </div>
              </div>
            );
          })}
            </div>
          </div>

          {/* Боковая панель со статистикой */}
          <div className="col-md-4">
            <div className="sticky-top" style={{top: '20px'}}>
              {/* Статистика недели */}
              <div className="card mb-4">
                <div className="card-header bg-primary text-white">
                  <h6 className="mb-0">
                    <i className="bi bi-graph-up me-2"></i>
                    Статистика недели
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row text-center g-3">
                    <div className="col-6">
                      <div className="border rounded p-2">
                        <h4 className="text-primary mb-0">{weekStats.totalClasses}</h4>
                        <small className="text-muted">Занятий</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="border rounded p-2">
                        <h4 className="text-success mb-0">{weekStats.totalCredits}</h4>
                        <small className="text-muted">Кредитов</small>
                      </div>
                    </div>
                  </div>
                  
                  <hr />
                  
                  <h6 className="mb-3">По типам занятий:</h6>
                  {Object.entries(weekStats.typeStats).map(([type, count]) => (
                    <div key={type} className="d-flex justify-content-between align-items-center mb-2">
                      <span className={`badge bg-${typeColors[type]} d-flex align-items-center justify-content-center`}>{type}</span>
                      <span className="fw-bold">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Быстрая навигация */}
              <div className="card mb-4">
                <div className="card-header bg-info text-white">
                  <h6 className="mb-0">
                    <i className="bi bi-lightning me-2"></i>
                    Быстрые действия
                  </h6>
                </div>
                <div className="card-body">
                  <div className="d-grid gap-2">
                    <button 
                      className="btn btn-outline-primary btn-sm"
                      onClick={exportToPDF}
                      title="Создать PDF версию расписания"
                    >
                      <i className="bi bi-download me-2"></i>
                      Экспорт в PDF
                    </button>
                    <button 
                      className="btn btn-outline-success btn-sm"
                      onClick={addToCalendar}
                      title="Скачать файл для импорта в календарь"
                    >
                      <i className="bi bi-calendar-plus me-2"></i>
                      Добавить в календарь
                    </button>
                    <button 
                      className="btn btn-outline-warning btn-sm"
                      onClick={() => setShowNotificationModal(true)}
                      title="Настроить уведомления о занятиях"
                    >
                      <i className="bi bi-bell me-2"></i>
                      Настроить уведомления
                    </button>
                  </div>
                </div>
              </div>

              {/* Избранные занятия */}
              {favorites.size > 0 && (
                <div className="card">
                  <div className="card-header bg-warning text-dark">
                    <h6 className="mb-0">
                      <i className="bi bi-star-fill me-2"></i>
                      Избранные занятия
                    </h6>
                  </div>
                  <div className="card-body">
                    {Array.from(favorites).map(classId => {
                      const classItem = scheduleData.find(item => item.id === classId);
                      return classItem ? (
                        <div key={classId} className="d-flex justify-content-between align-items-center mb-2">
                          <div>
                            <small className="fw-bold d-block">{classItem.course}</small>
                            <small className="text-muted">{daysOfWeekNames[classItem.dayIndex]}</small>
                          </div>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => toggleFavorite(classId)}
                          >
                            <i className="bi bi-x"></i>
                          </button>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Модальное окно настройки уведомлений */}
        {showNotificationModal && (
          <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    <i className="bi bi-bell-fill text-warning me-2"></i>
                    Настройки уведомлений
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setShowNotificationModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-4">
                    <div className="form-check form-switch">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="enableNotifications"
                        checked={notificationSettings.enabled}
                        onChange={(e) => setNotificationSettings(prev => ({
                          ...prev,
                          enabled: e.target.checked
                        }))}
                      />
                      <label className="form-check-label fw-bold" htmlFor="enableNotifications">
                        Включить уведомления о занятиях
                      </label>
                    </div>
                    <small className="text-muted">
                      Получайте напоминания о предстоящих занятиях
                    </small>
                  </div>

                  {notificationSettings.enabled && (
                    <>
                      <div className="mb-4">
                        <label htmlFor="notificationTime" className="form-label fw-bold">
                          <i className="bi bi-clock me-1"></i>
                          Напомнить за:
                        </label>
                        <select 
                          className="form-select" 
                          id="notificationTime"
                          value={notificationSettings.beforeClass}
                          onChange={(e) => setNotificationSettings(prev => ({
                            ...prev,
                            beforeClass: parseInt(e.target.value)
                          }))}
                        >
                          <option value={5}>5 минут</option>
                          <option value={10}>10 минут</option>
                          <option value={15}>15 минут</option>
                          <option value={30}>30 минут</option>
                          <option value={60}>1 час</option>
                        </select>
                      </div>

                      <div className="mb-4">
                        <label className="form-label fw-bold">
                          <i className="bi bi-send me-1"></i>
                          Способы уведомления:
                        </label>
                        
                        <div className="form-check">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="emailNotifications"
                            checked={notificationSettings.email}
                            onChange={(e) => setNotificationSettings(prev => ({
                              ...prev,
                              email: e.target.checked
                            }))}
                          />
                          <label className="form-check-label" htmlFor="emailNotifications">
                            <i className="bi bi-envelope me-2"></i>
                            Email уведомления
                          </label>
                        </div>

                        <div className="form-check">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="pushNotifications"
                            checked={notificationSettings.push}
                            onChange={(e) => setNotificationSettings(prev => ({
                              ...prev,
                              push: e.target.checked
                            }))}
                          />
                          <label className="form-check-label" htmlFor="pushNotifications">
                            <i className="bi bi-app-indicator me-2"></i>
                            Push уведомления в браузере
                          </label>
                        </div>

                        <div className="form-check">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="soundNotifications"
                            checked={notificationSettings.sound}
                            onChange={(e) => setNotificationSettings(prev => ({
                              ...prev,
                              sound: e.target.checked
                            }))}
                          />
                          <label className="form-check-label" htmlFor="soundNotifications">
                            <i className="bi bi-volume-up me-2"></i>
                            Звуковые уведомления
                          </label>
                        </div>
                      </div>

                      <div className="alert alert-info">
                        <i className="bi bi-info-circle me-2"></i>
                        <strong>Предварительный просмотр:</strong><br />
                        Уведомление о занятии "{nextClass ? nextClass.course : 'Высшая математика'}" 
                        будет отправлено за {notificationSettings.beforeClass} минут до начала
                        {notificationSettings.email && ' на email'}
                        {notificationSettings.push && ' в браузер'}
                        {notificationSettings.sound && ' со звуком'}.
                      </div>
                    </>
                  )}
                </div>
                <div className="modal-footer justify-content-center">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowNotificationModal(false)}
                  >
                    <i className="bi bi-x-circle me-1"></i>
                    Отмена
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => saveNotificationSettings(notificationSettings)}
                  >
                    <i className="bi bi-check-circle me-1"></i>
                    Сохранить настройки
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

export default SchedulePage; 