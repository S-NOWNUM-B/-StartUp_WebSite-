import { useMemo } from 'react';

export interface ScheduleEvent {
  id: string;
  title: string;
  subject: string;
  time: string;
  endTime: string;
  teacher: string;
  room: string;
  type: 'lecture' | 'seminar' | 'lab' | 'exam' | 'consultation' | 'test';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'moved';
  color: string;
  importance: 'high' | 'medium' | 'low';
  attendanceRequired: boolean;
  description?: string;
  materials?: string[];
  homework?: string;
}

export const useScheduleData = (currentDate: Date = new Date()) => {
  const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  // Динамическое недельное расписание
  const getWeekDates = useMemo(() => {
    const startOfWeek = new Date(currentDate);
    const dayOfWeek = startOfWeek.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(currentDate.getDate() + mondayOffset);
    
    const weekDates = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    
    return weekDates;
  }, [currentDate]);

  // Расписание на неделю
  const weekSchedule = useMemo(() => {
    const schedule: Record<string, ScheduleEvent[]> = {};
    
    const weeklyTemplates = {
      1: [ // Понедельник
        { type: 'lecture', subject: 'Математика', title: 'Математический анализ', teacher: 'Иванов А.С.', time: '09:00', endTime: '10:30', room: 'Ауд. 205', color: '#3b82f6', description: 'Дифференциальное исчисление функций одной переменной', materials: ['Учебник стр. 125-150', 'Конспект лекций'], homework: 'Решить задачи №1-15 из задачника' },
        { type: 'lab', subject: 'Программирование', title: 'Программирование на Python', teacher: 'Петров В.М.', time: '10:45', endTime: '12:15', room: 'Ауд. 301', color: '#10b981', description: 'Объектно-ориентированное программирование', materials: ['IDE PyCharm', 'Задания в LMS'], homework: 'Реализовать класс Calculator' },
        { type: 'seminar', subject: 'История', title: 'История Казахстана', teacher: 'Сидорова Е.И.', time: '13:00', endTime: '14:30', room: 'Ауд. 102', color: '#f59e0b', description: 'История Казахстана в XVIII веке', materials: ['Учебник глава 12', 'Исторические документы'], homework: 'Эссе на тему "Развитие казахского ханства"' }
      ],
      2: [ // Вторник
        { type: 'lecture', subject: 'Физика', title: 'Физика', teacher: 'Козлов Д.П.', time: '09:00', endTime: '10:30', room: 'Ауд. 108', color: '#8b5cf6', description: 'Механика. Законы Ньютона', materials: ['Учебник Савельев том 1'], homework: 'Решить задачи из сборника' },
        { type: 'seminar', subject: 'Английский', title: 'Английский язык', teacher: 'Smith J.', time: '10:45', endTime: '12:15', room: 'Ауд. 205', color: '#06b6d4', description: 'Business English. Presentations', materials: ['Oxford Business English'], homework: 'Prepare a 5-minute presentation' }
      ],
      3: [ // Среда
        { type: 'lecture', subject: 'Экономика', title: 'Экономическая теория', teacher: 'Морозова Н.Л.', time: '09:00', endTime: '10:30', room: 'Ауд. 201', color: '#84cc16', description: 'Основы экономической теории', materials: ['Учебник по экономике', 'Лекционные материалы'], homework: 'Изучить главу 3' },
        { type: 'lab', subject: 'Программирование', title: 'Веб-разработка', teacher: 'Черкасов О.Н.', time: '11:00', endTime: '12:30', room: 'Ауд. 312', color: '#0ea5e9', description: 'Создание веб-приложений', materials: ['VS Code', 'Документация MDN'], homework: 'Создать простое веб-приложение' }
      ],
      4: [ // Четверг
        { type: 'lab', subject: 'Программирование', title: 'Базы данных', teacher: 'Соколов И.В.', time: '09:00', endTime: '10:30', room: 'Ауд. 320', color: '#ec4899', description: 'Работа с базами данных', materials: ['SQL справочник', 'PostgreSQL'], homework: 'Выполнить SQL-запросы' },
        { type: 'exam', subject: 'Физика', title: 'Экзамен по физике', teacher: 'Козлов Д.П.', time: '13:00', endTime: '15:00', room: 'Ауд. 108', color: '#ef4444', description: 'Итоговый экзамен по физике', materials: ['Калькулятор', 'Формулы'], homework: 'Повторить все темы' }
      ],
      5: [ // Пятница
        { type: 'lab', subject: 'Программирование', title: 'React & Next.js', teacher: 'Черкасов О.Н.', time: '09:00', endTime: '10:30', room: 'Ауд. 312', color: '#0ea5e9', description: 'Современные фреймворки', materials: ['React документация', 'Next.js гайд'], homework: 'Создать компонент React' },
        { type: 'consultation', subject: 'Математика', title: 'Консультация по математике', teacher: 'Иванов А.С.', time: '14:00', endTime: '15:00', room: 'Ауд. 205', color: '#3b82f6', description: 'Консультация перед экзаменом', materials: ['Сборник задач', 'Конспекты'], homework: 'Подготовить вопросы' }
      ]
    };
    
    getWeekDates.forEach((date, index) => {
      const dayName = dayNames[index];
      const dayOfWeek = date.getDay() === 0 ? 7 : date.getDay();
      const template = weeklyTemplates[dayOfWeek as keyof typeof weeklyTemplates] || [];
      
      const dayEvents: ScheduleEvent[] = template.map((tmpl, tmplIndex) => ({
        id: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${tmplIndex}`,
        title: tmpl.title,
        subject: tmpl.subject,
        time: tmpl.time,
        endTime: tmpl.endTime,
        teacher: tmpl.teacher,
        room: tmpl.room,
        type: tmpl.type as ScheduleEvent['type'],
        status: Math.random() > 0.3 ? 'scheduled' : (Math.random() > 0.5 ? 'completed' : 'in-progress') as ScheduleEvent['status'],
        color: tmpl.color,
        importance: Math.random() > 0.7 ? 'high' : (Math.random() > 0.5 ? 'medium' : 'low') as ScheduleEvent['importance'],
        attendanceRequired: Math.random() > 0.3,
        description: tmpl.description || `Описание занятия: ${tmpl.title}`,
        materials: tmpl.materials || [`Материалы по ${tmpl.subject}`, 'Конспект лекций'],
        homework: tmpl.homework || (Math.random() > 0.5 ? `Домашнее задание по ${tmpl.subject}` : undefined)
      }));
      
      schedule[dayName] = dayEvents;
    });
    
    return schedule;
  }, [getWeekDates]);

  // Получить события сегодня
  const getTodayEvents = useMemo(() => {
    const today = new Date();
    const todayDayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = todayDayNames[today.getDay()];
    return weekSchedule[currentDay] || [];
  }, [weekSchedule]);

  // Получить задачи сегодня (включая дедлайны и подготовку)
  const getTodayTasks = useMemo(() => {
    const todayEvents = getTodayEvents;
    
    // Конвертируем события в задачи + добавляем дедлайны
    const tasks = todayEvents.map(event => ({
      id: event.id,
      title: event.title,
      subject: event.subject,
      time: event.time,
      type: event.type === 'lecture' ? 'lesson' : 
            event.type === 'exam' ? 'exam' : 
            event.type === 'consultation' ? 'meeting' : 'lesson',
      progress: event.status === 'completed' ? 100 : 
               event.status === 'in-progress' ? 50 : 
               Math.floor(Math.random() * 80) + 10
    }));

    // Добавляем дополнительные задачи-дедлайны
    const additionalTasks = [
      { id: 'deadline-1', title: 'Подготовиться к экзамену по математике', subject: 'Математика', time: '12:15', type: 'deadline', progress: 70 },
      { id: 'deadline-2', title: 'Сдать курсовую работу до пятницы', subject: 'Программирование', time: '14:00', type: 'deadline', progress: 30 },
      { id: 'deadline-3', title: 'Встреча с научным руководителем в 14:00', subject: 'Общее', time: '14:00', type: 'meeting', progress: 0 }
    ];

    return [...tasks, ...additionalTasks];
  }, [getTodayEvents]);

  return {
    dayNames,
    monthNames,
    getWeekDates,
    weekSchedule,
    getTodayEvents,
    getTodayTasks
  };
}; 