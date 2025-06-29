'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useScheduleData, type ScheduleEvent } from '../../hooks/useScheduleData';
import {
  Calendar,
  Clock,
  User,
  MapPin,
  BookOpen,
  Monitor,
  MessageSquare,
  GraduationCap,
  Users,
  FileText,
  Download,
  Bell,
  Plus,
  ChevronLeft,
  ChevronRight,
  X,
  Search,
  Star,
  CheckCircle,
  AlertTriangle,
  Play,
  Target,
  TrendingUp,

  ArrowUpRight,
  CalendarDays,
  TrendingDown,
  Share2,
  Copy,
  Trophy,
  Zap,
  BarChart3,
  HelpCircle
} from 'lucide-react';



interface ScheduleStat {
  id: string;
  title: string;
  value: number | string;
  label: string;
  sublabel: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  icon: React.ReactNode;
  progress?: number;
}

export default function SchedulePageModern() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDayEvents, setSelectedDayEvents] = useState<ScheduleEvent[]>([]);
  const [viewMode, setViewMode] = useState<'week' | 'month'>('month');
  
  // Получаем данные расписания из хука
  const { dayNames, monthNames, getWeekDates, weekSchedule } = useScheduleData(currentDate);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const dayLabels = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
  const weekDayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];



  // Статистика расписания
  const scheduleStats = useMemo(() => {
    if (!mounted) return [];
    
    const allEvents = Object.values(weekSchedule).flat();
    // Используем реальный день недели
    const today = new Date();
    const todayDayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = todayDayNames[today.getDay()];
    const todayEvents = weekSchedule[currentDay] || [];
    
    const completedEvents = allEvents.filter(e => e.status === 'completed');
    const highPriorityEvents = allEvents.filter(e => e.importance === 'high');
    const attendanceRate = allEvents.length > 0 ? Math.round((completedEvents.length / allEvents.length) * 100) : 0;

    const stats: ScheduleStat[] = [
      {
        id: 'today',
        title: 'Сегодня',
        value: todayEvents.length,
        label: 'занятий',
        sublabel: 'на сегодня',
        trend: 'up',
        trendValue: '+2 к вчера',
        color: '#3b82f6',
        gradientFrom: '#3b82f6',
        gradientTo: '#1d4ed8',
        icon: <CalendarDays className="w-5 h-5" />,
        progress: Math.round((todayEvents.filter(e => e.status === 'completed').length / Math.max(todayEvents.length, 1)) * 100)
      },
      {
        id: 'week',
        title: 'Эта неделя',
        value: allEvents.length,
        label: 'занятий',
        sublabel: 'всего запланировано',
        trend: 'stable',
        trendValue: '0 к прошлой неделе',
        color: '#10b981',
        gradientFrom: '#10b981',
        gradientTo: '#059669',
        icon: <Calendar className="w-5 h-5" />,
        progress: Math.round((completedEvents.length / Math.max(allEvents.length, 1)) * 100)
      },
      {
        id: 'priority',
        title: 'Важные',
        value: highPriorityEvents.length,
        label: 'предметов',
        sublabel: 'высокий приоритет',
        trend: 'up',
        trendValue: '+1 предмет',
        color: '#f59e0b',
        gradientFrom: '#f59e0b',
        gradientTo: '#d97706',
        icon: <Star className="w-5 h-5" />,
        progress: Math.round((highPriorityEvents.filter(e => e.status === 'completed').length / Math.max(highPriorityEvents.length, 1)) * 100)
      },
      {
        id: 'attendance',
        title: 'Посещаемость',
        value: `${attendanceRate}%`,
        label: 'процент',
        sublabel: 'за семестр',
        trend: attendanceRate >= 80 ? 'up' : 'stable',
        trendValue: attendanceRate >= 80 ? '+5% к цели' : 'в норме',
        color: attendanceRate >= 80 ? '#10b981' : '#f59e0b',
        gradientFrom: attendanceRate >= 80 ? '#10b981' : '#f59e0b',
        gradientTo: attendanceRate >= 80 ? '#059669' : '#d97706',
        icon: <CheckCircle className="w-5 h-5" />,
        progress: attendanceRate
      }
    ];

    return stats;
  }, [weekSchedule, mounted]);

  // Функция для генерации месячного расписания
  const generateMonthSchedule = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Генерируем расписание для каждого дня месяца
    const monthSchedule: Record<string, ScheduleEvent[]> = {};
    
    // Базовые шаблоны занятий для разных дней недели
    const weeklyTemplates = {
      1: [ // Понедельник
        { type: 'lecture', subject: 'Математика', title: 'Математический анализ', teacher: 'Иванов А.С.', time: '09:00', endTime: '10:30', room: 'Ауд. 205', color: '#3b82f6' },
        { type: 'lab', subject: 'Программирование', title: 'Программирование на Python', teacher: 'Петров В.М.', time: '10:45', endTime: '12:15', room: 'Ауд. 301', color: '#10b981' },
        { type: 'seminar', subject: 'История', title: 'История Казахстана', teacher: 'Сидорова Е.И.', time: '13:00', endTime: '14:30', room: 'Ауд. 102', color: '#f59e0b' }
      ],
      2: [ // Вторник
        { type: 'lecture', subject: 'Физика', title: 'Физика', teacher: 'Козлов Д.П.', time: '09:00', endTime: '10:30', room: 'Ауд. 108', color: '#8b5cf6' },
        { type: 'seminar', subject: 'Английский', title: 'Английский язык', teacher: 'Smith J.', time: '10:45', endTime: '12:15', room: 'Ауд. 205', color: '#06b6d4' }
      ],
      3: [ // Среда
        { type: 'lecture', subject: 'Экономика', title: 'Экономическая теория', teacher: 'Морозова Н.Л.', time: '09:00', endTime: '10:30', room: 'Ауд. 201', color: '#84cc16' },
        { type: 'lab', subject: 'Программирование', title: 'Веб-разработка', teacher: 'Черкасов О.Н.', time: '11:00', endTime: '12:30', room: 'Ауд. 312', color: '#0ea5e9' }
      ],
      4: [ // Четверг
        { type: 'lab', subject: 'Программирование', title: 'Базы данных', teacher: 'Соколов И.В.', time: '09:00', endTime: '10:30', room: 'Ауд. 320', color: '#ec4899' },
        { type: 'seminar', subject: 'Философия', title: 'Философия', teacher: 'Кузнецов М.А.', time: '11:00', endTime: '12:30', room: 'Ауд. 115', color: '#14b8a6' }
      ],
      5: [ // Пятница
        { type: 'lab', subject: 'Программирование', title: 'React & Next.js', teacher: 'Черкасов О.Н.', time: '09:00', endTime: '10:30', room: 'Ауд. 312', color: '#0ea5e9' },
        { type: 'consultation', subject: 'Математика', title: 'Консультация по математике', teacher: 'Иванов А.С.', time: '14:00', endTime: '15:00', room: 'Ауд. 205', color: '#3b82f6' }
      ]
    };
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay(); // 0 = воскресенье, 1 = понедельник, и т.д.
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      // Пропускаем выходные (суббота и воскресенье)
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        monthSchedule[dateKey] = [];
        continue;
      }
      
      const template = weeklyTemplates[dayOfWeek as keyof typeof weeklyTemplates] || [];
      
      // Создаем события для дня
      const dayEvents: ScheduleEvent[] = template.map((tmpl, index) => ({
        id: `${dateKey}-${index}`,
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
        description: `Описание занятия: ${tmpl.title}`,
        materials: [`Материалы по ${tmpl.subject}`, 'Конспект лекций'],
        homework: Math.random() > 0.5 ? `Домашнее задание по ${tmpl.subject}` : undefined
      }));
      
      // Иногда добавляем дополнительные события (экзамены, тесты)
      if (Math.random() > 0.8) {
        dayEvents.push({
          id: `${dateKey}-extra`,
          title: 'Контрольная работа',
          subject: ['Математика', 'Физика', 'Программирование'][Math.floor(Math.random() * 3)],
          time: '15:00',
          endTime: '16:30',
          teacher: 'Экзаменатор',
          room: 'Ауд. ' + (100 + Math.floor(Math.random() * 200)),
          type: 'test',
        status: 'scheduled',
          color: '#ef4444',
        importance: 'high',
          attendanceRequired: true,
          description: 'Контрольная работа по пройденному материалу'
        });
      }
      
      monthSchedule[dateKey] = dayEvents;
    }
    
    return monthSchedule;
  }, [currentDate]);

  // Функция для получения дней месяца в календарной сетке
  const getCalendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Определяем день недели для первого дня месяца (0 = воскресенье, нужно сдвинуть)
    let firstDayOfWeek = firstDay.getDay();
    firstDayOfWeek = firstDayOfWeek === 0 ? 7 : firstDayOfWeek; // Делаем понедельник = 1
    
    const days = [];
    
    // Добавляем пустые дни для выравнивания
    for (let i = 1; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Добавляем дни месяца
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const events = generateMonthSchedule[dateKey] || [];
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate?.toDateString() === date.toDateString();
      
      days.push({
        date,
        day,
        dateKey,
        events,
        isToday,
        isSelected,
        isWeekend: date.getDay() === 0 || date.getDay() === 6
      });
    }
    
    return days;
  }, [currentDate, generateMonthSchedule, selectedDate]);

  // Навигация по месяцам
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  // Навигация по неделям для недельного режима
  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setDate(prev.getDate() - 7);
      } else {
        newDate.setDate(prev.getDate() + 7);
      }
      return newDate;
    });
  };

  const getTypeIcon = (type: ScheduleEvent['type']) => {
    switch (type) {
      case 'lecture': return <BookOpen className="w-4 h-4" />;
      case 'seminar': return <MessageSquare className="w-4 h-4" />;
      case 'lab': return <Monitor className="w-4 h-4" />;
      case 'exam': return <GraduationCap className="w-4 h-4" />;
      case 'consultation': return <Users className="w-4 h-4" />;
      case 'test': return <FileText className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getStatusInfo = (status: ScheduleEvent['status']) => {
    switch (status) {
      case 'scheduled': 
        return { icon: <Clock className="w-3 h-3" />, text: 'Запланировано', color: '#3b82f6' };
      case 'in-progress': 
        return { icon: <Play className="w-3 h-3" />, text: 'Идет сейчас', color: '#10b981' };
      case 'completed': 
        return { icon: <CheckCircle className="w-3 h-3" />, text: 'Завершено', color: '#10b981' };
      case 'cancelled': 
        return { icon: <X className="w-3 h-3" />, text: 'Отменено', color: '#ef4444' };
      case 'moved': 
        return { icon: <AlertTriangle className="w-3 h-3" />, text: 'Перенесено', color: '#f59e0b' };
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-red-500" />;
      case 'stable': return <ArrowUpRight className="w-3 h-3 text-blue-500" />;
    }
  };

  const getUpcomingEvents = () => {
    if (!mounted) return [];
    
    const allEvents = Object.values(weekSchedule).flat();
    const currentTime = new Date();
    
    // Фильтруем события, которые еще не прошли (по статусу)
    const upcomingEvents = allEvents.filter(event => 
      event.status === 'scheduled' || event.status === 'in-progress'
    ).slice(0, 3);
    
    return upcomingEvents.length > 0 ? upcomingEvents : allEvents.slice(0, 3);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  // Функция экспорта расписания на месяц
  const exportSchedule = () => {
    try {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const monthName = monthNames[month];
      
      // Получаем все события месяца
      const allMonthEvents = Object.entries(generateMonthSchedule)
        .filter(([dateKey, events]) => events.length > 0)
        .sort(([dateA], [dateB]) => dateA.localeCompare(dateB));
      
      // Форматируем в текст
      let scheduleText = `РАСПИСАНИЕ НА ${monthName.toUpperCase()} ${year}\n`;
      scheduleText += `Экспортировано: ${new Date().toLocaleString('ru-RU')}\n`;
      scheduleText += '='.repeat(50) + '\n\n';
      
      allMonthEvents.forEach(([dateKey, events]) => {
        const [year, month, day] = dateKey.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        const dayName = date.toLocaleDateString('ru-RU', { weekday: 'long' });
        const dayDate = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
        
        scheduleText += `${dayName.toUpperCase()}, ${dayDate}\n`;
        scheduleText += '-'.repeat(30) + '\n';
        
        events.forEach((event, index) => {
          scheduleText += `${index + 1}. ${event.time} - ${event.endTime}\n`;
          scheduleText += `   ${event.title} (${event.subject})\n`;
          scheduleText += `   Преподаватель: ${event.teacher}\n`;
          scheduleText += `   Аудитория: ${event.room}\n`;
          scheduleText += `   Тип: ${event.type === 'lecture' ? 'Лекция' : 
                                 event.type === 'seminar' ? 'Семинар' : 
                                 event.type === 'lab' ? 'Лабораторная' : 
                                 event.type === 'exam' ? 'Экзамен' : 
                                 event.type === 'consultation' ? 'Консультация' : 'Тест'}\n`;
          if (event.description) {
            scheduleText += `   Описание: ${event.description}\n`;
          }
          scheduleText += '\n';
        });
        
        scheduleText += '\n';
      });
      
      // Добавляем статистику
      scheduleText += 'СТАТИСТИКА МЕСЯЦА\n';
      scheduleText += '='.repeat(20) + '\n';
      scheduleText += `Всего дней с занятиями: ${allMonthEvents.length}\n`;
      scheduleText += `Всего занятий: ${allMonthEvents.reduce((sum, [, events]) => sum + events.length, 0)}\n`;
      
      const eventTypes = allMonthEvents.flatMap(([, events]) => events.map(e => e.type));
      const typeStats = eventTypes.reduce((acc, type) => {
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      Object.entries(typeStats).forEach(([type, count]) => {
        const typeName = type === 'lecture' ? 'Лекции' : 
                        type === 'seminar' ? 'Семинары' : 
                        type === 'lab' ? 'Лабораторные' : 
                        type === 'exam' ? 'Экзамены' : 
                        type === 'consultation' ? 'Консультации' : 'Тесты';
        scheduleText += `${typeName}: ${count}\n`;
      });
      
            // Создаем и скачиваем файл
      const blob = new Blob([scheduleText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Расписание_${monthName}_${year}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // Показываем уведомление об успехе
      alert(`Расписание на ${monthName} ${year} успешно экспортировано!`);
       
    } catch (error) {
      console.error('Ошибка при экспорте расписания:', error);
      alert('Произошла ошибка при экспорте расписания. Попробуйте снова.');
    }
  };



  if (!mounted) {
    return (
      <div className="loading-dashboard">
        <div className="loading-content">
          <div className="loading-spinner-modern">
            <div className="spinner"></div>
          </div>
          <p>Загрузка расписания...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="schedule-compact">
      {/* Заголовок в стиле главной страницы */}
      <div className="schedule-header-compact">
        <div className="header-main">
          <Calendar className="w-6 h-6" />
          <div>
            <h1>Расписание занятий</h1>
            <p>{formatDate(currentTime)} • {formatTime(currentTime)}</p>
          </div>
            </div>
        <div className="header-widget">
          <div className="widget-icon" style={{ color: '#3b82f6' }}>
            <CalendarDays className="w-5 h-5" />
          </div>
          <div className="widget-content">
            <span className="widget-value">{scheduleStats[0].value}</span>
            <span className="widget-label">занятий сегодня</span>
          </div>
          <div className="widget-trend">
            {getTrendIcon('up')}
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="schedule-main-compact">
        {/* Верхний ряд - статистика */}
        <div className="schedule-top-row">
          {/* Статистика расписания */}
      <motion.div 
            className="schedule-stats-compact enhanced"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
      >
            <div className="stats-header">
              <h3>Статистика расписания</h3>
              <p>Обзор учебной активности</p>
            </div>
            <div className="stats-grid-enhanced">
              {scheduleStats.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  className="stat-card-enhanced"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="stat-background" style={{
                    background: `linear-gradient(135deg, ${stat.gradientFrom}15, ${stat.gradientTo}05)`
                  }} />
                  
                  <div className="stat-header-enhanced">
                    <div className="stat-icon-enhanced" style={{ color: stat.color }}>
                      {stat.icon}
            </div>
                    <div className="stat-trend-indicator">
                      {getTrendIcon(stat.trend)}
                  </div>
                            </div>

                  <div className="stat-main-content">
                    <div className="stat-value-enhanced">
                      <span className="value-primary">{stat.value}</span>
                          </div>
                    <div className="stat-labels">
                      <span className="stat-label-enhanced">{stat.title}</span>
                      <span className="stat-sublabel-enhanced">{stat.sublabel}</span>
                            </div>
                  </div>

                  {stat.progress !== undefined && (
                    <div className="stat-progress-section">
                      <div className="progress-bar-enhanced">
                        <motion.div 
                          className="progress-fill-enhanced"
                          style={{ backgroundColor: stat.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                        />
            </div>
                      <div className="progress-details">
                        <span className="progress-percentage">{stat.progress}%</span>
                        <span className="progress-trend">{stat.trendValue}</span>
              </div>
                        </div>
                  )}
                </motion.div>
              ))}
                            </div>
          </motion.div>

          {/* Быстрые действия */}
          <motion.div 
            className="schedule-stats-compact enhanced"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="stats-header">
              <h3>Быстрые действия</h3>
              <p>Полезные инструменты</p>
                          </div>
            <div className="quick-actions-grid-schedule">
              <motion.button 
                className="quick-action-btn-schedule"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={exportSchedule}
                title="Экспортировать расписание текущего месяца в текстовый файл"
              >
                <div className="action-icon-schedule">
                  <Download className="w-5 h-5" />
                        </div>
                <div className="action-content-schedule">
                  <span className="action-title-schedule">Экспорт</span>
                  <span className="action-subtitle-schedule">Расписание</span>
                      </div>
              </motion.button>
              
              <motion.button 
                className="quick-action-btn-schedule"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  try {
                    router.push('/notifications');
                  } catch (error) {
                    console.error('Ошибка при переходе на страницу уведомлений:', error);
                  }
                }}
              >
                <div className="action-icon-schedule">
                  <Bell className="w-5 h-5" />
                  </div>
                <div className="action-content-schedule">
                  <span className="action-title-schedule">Уведомления</span>
                  <span className="action-subtitle-schedule">Центр</span>
                </div>
              </motion.button>
              
              <motion.button 
                className="quick-action-btn-schedule"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  try {
                    router.push('/calendar');
                  } catch (error) {
                    console.error('Ошибка при переходе на страницу событий:', error);
                    alert('Не удалось открыть страницу событий');
                  }
                }}
                title="Перейти на страницу управления событиями"
              >
                <div className="action-icon-schedule">
                  <Plus className="w-5 h-5" />
              </div>
                <div className="action-content-schedule">
                  <span className="action-title-schedule">Добавить</span>
                  <span className="action-subtitle-schedule">Событие</span>
                </div>
              </motion.button>
              
              <motion.button 
                className="quick-action-btn-schedule"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  try {
                    router.push('/feedback');
                  } catch (error) {
                    console.error('Ошибка при переходе на страницу поддержки:', error);
                  }
                }}
              >
                <div className="action-icon-schedule">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div className="action-content-schedule">
                  <span className="action-title-schedule">Поддержка</span>
                  <span className="action-subtitle-schedule">Помощь</span>
                </div>
              </motion.button>
            </div>
        </motion.div>
        </div>

        {/* Расписание - переключатель режимов и календарь */}
          <motion.div
          className="schedule-stats-compact enhanced large-unified"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="stats-header">
            <div className="schedule-header-controls">
              <div className="schedule-title-section">
                <h3>{viewMode === 'month' ? 'Расписание на месяц' : 'Расписание на неделю'}</h3>
                <p>{viewMode === 'month' ? 'Полный обзор месяца' : 'Полный обзор учебной недели'}</p>
              </div>
              
              <div className="view-mode-switcher">
                <button 
                  className={`mode-btn ${viewMode === 'week' ? 'active' : ''}`}
                  onClick={() => setViewMode('week')}
                >
                  Неделя
                </button>
                <button 
                  className={`mode-btn ${viewMode === 'month' ? 'active' : ''}`}
                  onClick={() => setViewMode('month')}
                >
                  Месяц
                </button>
                  </div>
                  </div>
            
            <div className="navigation-controls">
              <button 
                className="nav-btn"
                onClick={() => viewMode === 'month' ? navigateMonth('prev') : navigateWeek('prev')}
              >
                <ChevronLeft className="w-4 h-4" />
                </button>
              <span className="period-title">
                {viewMode === 'month' 
                  ? `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
                  : (() => {
                      const startDate = getWeekDates[0];
                      const endDate = getWeekDates[4];
                      if (startDate && endDate) {
                        const startMonth = monthNames[startDate.getMonth()];
                        const endMonth = monthNames[endDate.getMonth()];
                        if (startDate.getMonth() === endDate.getMonth()) {
                          return `${startDate.getDate()} - ${endDate.getDate()} ${startMonth} ${startDate.getFullYear()}`;
                        } else {
                          return `${startDate.getDate()} ${startMonth} - ${endDate.getDate()} ${endMonth} ${startDate.getFullYear()}`;
                        }
                      }
                      return 'Неделя';
                    })()
                }
              </span>
              <button 
                className="nav-btn"
                onClick={() => viewMode === 'month' ? navigateMonth('next') : navigateWeek('next')}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button 
                className="today-btn"
                onClick={() => setCurrentDate(new Date())}
                title="Перейти к текущему месяцу"
              >
                Сегодня
              </button>
            </div>
          </div>

          {viewMode === 'month' ? (
            /* Месячный календарь */
            <div className="monthly-calendar">
              {/* Заголовки дней недели */}
              <div className="calendar-weekdays">
                {weekDayNames.map(day => (
                  <div key={day} className="calendar-weekday">
                    {day}
                  </div>
              ))}
            </div>
              
              {/* Сетка календаря */}
              <div className="calendar-grid">
                {getCalendarDays.map((dayData, index) => (
                  <motion.div
                    key={index}
                    className={`calendar-day ${dayData ? 
                      `${dayData.isToday ? 'today' : ''} ${dayData.isSelected ? 'selected' : ''} ${dayData.isWeekend ? 'weekend' : ''}` 
                      : 'empty'}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.01 }}
                    whileHover={dayData ? { scale: 1.05 } : undefined}
                    onClick={() => dayData && setSelectedDate(dayData.date)}
                  >
                    {dayData && (
                      <>
                        <div className="calendar-day-header">
                          <span className="calendar-day-number">{dayData.day}</span>
                          {dayData.isToday && <div className="today-dot" />}
                        </div>
                        
                                                 <div className="calendar-day-events">
                           {dayData.events.slice(0, 2).map((event, eventIndex) => (
                             <motion.div
                               key={event.id}
                               className="calendar-event"
                               style={{ backgroundColor: event.color }}
                               initial={{ opacity: 0, scale: 0.8 }}
                               animate={{ opacity: 1, scale: 1 }}
                               transition={{ delay: index * 0.005 + eventIndex * 0.05 }}
                               onClick={(e) => {
                                 e.stopPropagation();
                                 setSelectedEvent(event);
                               }}
                               whileHover={{ scale: 1.02 }}
                             >
                               <span className="event-time-mini">{event.time}</span>
                               <span className="event-title-mini">
                                 {event.title.length > 12 ? event.title.substring(0, 12) + '...' : event.title}
                               </span>
          </motion.div>
                           ))}
                           {dayData.events.length > 2 && (
                             <motion.div 
                               className="more-events"
                               whileHover={{ scale: 1.05 }}
                               onClick={(e) => {
                                 e.stopPropagation();
                                 setSelectedDate(dayData.date);
                                 setSelectedDayEvents(dayData.events);
                               }}
                             >
                               +{dayData.events.length - 2} ещё
                             </motion.div>
                           )}
              </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            /* Недельное расписание */
            <div className="weekly-schedule-layout">
              {dayLabels.map((dayLabel, dayIndex) => {
                const dayName = dayNames[dayIndex];
                const dayEvents = weekSchedule[dayName] || [];
                const weekDate = getWeekDates[dayIndex];
                const isToday = weekDate && weekDate.toDateString() === new Date().toDateString();
                
                return (
          <motion.div 
                    key={dayName}
                    className={`schedule-day-card ${isToday ? 'current-day' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + dayIndex * 0.05 }}
                  >
                    <div className="day-header-schedule">
                      <h4>{dayLabel}</h4>
                      <span className="day-date">{weekDate ? weekDate.getDate() : '-'}</span>
                      {isToday && <div className="today-indicator">Сегодня</div>}
                      </div>
                    
                    <div className="day-events-schedule">
                      {dayEvents.length > 0 ? (
                        dayEvents.map((event, eventIndex) => {
                          const statusInfo = getStatusInfo(event.status);
                return (
                            <motion.div 
                              key={event.id}
                              className="schedule-event-item"
                              style={{ borderLeftColor: event.color }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + dayIndex * 0.05 + eventIndex * 0.02 }}
                              whileHover={{ scale: 1.02, x: 2 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setSelectedEvent(event)}
                            >
                              <div className="event-time-schedule">{event.time}</div>
                              <div className="event-title-schedule">{event.title}</div>
                              <div className="event-room-schedule">{event.room}</div>
                              <div className="event-type-schedule" style={{ color: event.color }}>
                                {getTypeIcon(event.type)}
                    </div>
                              <div className="event-status-schedule" style={{ color: statusInfo.color }}>
                                {statusInfo.icon}
                    </div>
                            </motion.div>
                          );
                        })
                      ) : (
                        <div className="no-events-schedule">Нет занятий</div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
              </div>
          )}
          </motion.div>

        {/* Ближайшие события */}
          <motion.div
          className="schedule-stats-compact enhanced"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            >
          <div className="stats-header">
            <h3>Ближайшие события</h3>
            <p>Что вас ждет сегодня</p>
          </div>
          
          <div className="upcoming-events-schedule">
            {getUpcomingEvents().map((event, index) => {
              const statusInfo = getStatusInfo(event.status);
              return (
                <motion.div 
                  key={event.id}
                  className="upcoming-event-schedule"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="upcoming-time-schedule">
                    <div className="time-text">{event.time}</div>
                    <div className="duration-text">1.5ч</div>
                  </div>
                  
                  <div className="upcoming-type-schedule" style={{ backgroundColor: event.color }}>
                    {getTypeIcon(event.type)}
                  </div>
                  
                  <div className="upcoming-content-schedule">
                    <h4>{event.title}</h4>
                    <div className="upcoming-meta-schedule">
                      <span className="teacher-schedule">{event.teacher}</span>
                      <span className="room-schedule">
                        <MapPin className="w-3 h-3" />
                        {event.room}
                      </span>
                    </div>
                  </div>
                  
                  <div className="upcoming-status-schedule" style={{ color: statusInfo.color }}>
                    <span>{statusInfo.text}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Новое модальное окно события */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div 
            className="modal-backdrop-new"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div 
              className="event-modal-new"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Заголовок */}
              <div className="modal-header-new">
                <div className="modal-type-badge" style={{ backgroundColor: selectedEvent.color }}>
                  {getTypeIcon(selectedEvent.type)}
                </div>
                <div className="modal-title-info">
                  <h2>{selectedEvent.title}</h2>
                  <span className="modal-subject">{selectedEvent.subject}</span>
                </div>
                <motion.button 
                  className="modal-close-new"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedEvent(null)}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Основная информация */}
              <div className="modal-body-new">
                {/* Быстрая информация */}
                <div className="quick-info-section">
                  <div className="info-card time-card">
                    <Clock className="w-5 h-5" />
              <div>
                      <span className="info-label">Время</span>
                      <span className="info-value">{selectedEvent.time} - {selectedEvent.endTime}</span>
              </div>
                </div>
                  
                  <div className="info-card teacher-card">
                    <User className="w-5 h-5" />
                    <div>
                      <span className="info-label">Преподаватель</span>
                      <span className="info-value">{selectedEvent.teacher}</span>
                    </div>
                  </div>

                  <div className="info-card location-card">
                    <MapPin className="w-5 h-5" />
                    <div>
                      <span className="info-label">Аудитория</span>
                      <span className="info-value">{selectedEvent.room}</span>
                      </div>
                      </div>
                  </div>

                {/* Статус и приоритет */}
                <div className="status-section">
                  <div className="status-badge" style={{ backgroundColor: getStatusInfo(selectedEvent.status).color }}>
                    {getStatusInfo(selectedEvent.status).icon}
                    <span>{getStatusInfo(selectedEvent.status).text}</span>
                        </div>
                  
                  {selectedEvent.importance === 'high' && (
                    <div className="priority-badge-high">
                      <Star className="w-4 h-4" />
                      <span>Высокий приоритет</span>
                  </div>
                  )}
                  
                  {selectedEvent.attendanceRequired && (
                    <div className="attendance-badge">
                      <CheckCircle className="w-4 h-4" />
                      <span>Обязательное посещение</span>
                        </div>
                  )}
                        </div>

                {/* Описание */}
                {selectedEvent.description && (
                  <div className="content-section">
                    <h4>О занятии</h4>
                    <p className="description-text">{selectedEvent.description}</p>
                  </div>
                )}

                {/* Материалы */}
                {selectedEvent.materials && selectedEvent.materials.length > 0 && (
                  <div className="content-section">
                    <h4>Материалы для изучения</h4>
                    <div className="materials-list">
                      {selectedEvent.materials.map((material, index) => (
                        <motion.div 
                          key={index}
                          className="material-item"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <FileText className="w-4 h-4" />
                          <span>{material}</span>
                          <motion.button
                            className="material-action"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ArrowUpRight className="w-3 h-3" />
                          </motion.button>
                        </motion.div>
                      ))}
                          </div>
                  </div>
                )}

                {/* Домашнее задание */}
                {selectedEvent.homework && (
                  <div className="content-section">
                    <h4>Домашнее задание</h4>
                    <div className="homework-card">
                      <Target className="w-5 h-5" />
                      <p>{selectedEvent.homework}</p>
                          </div>
                        </div>
                      )}
                  </div>

              {/* Действия */}
              <div className="modal-actions-new">
                <motion.button 
                  className="action-btn secondary-btn"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={async () => {
                    try {
                      if (navigator.clipboard && selectedEvent) {
                        await navigator.clipboard.writeText(`${selectedEvent.title} - ${selectedEvent.time} в ${selectedEvent.room}`);
                        alert('Информация скопирована в буфер обмена');
                      } else {
                        // Fallback для старых браузеров
                        const textArea = document.createElement('textarea');
                        textArea.value = `${selectedEvent.title} - ${selectedEvent.time} в ${selectedEvent.room}`;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);
                        alert('Информация скопирована в буфер обмена');
                      }
                    } catch (error) {
                      console.error('Ошибка при копировании:', error);
                      alert('Не удалось скопировать информацию');
                    }
                  }}
                >
                  <Copy className="w-4 h-4" />
                  <span>Копировать</span>
                </motion.button>
                
                <motion.button 
                  className="action-btn secondary-btn"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={async () => {
                    try {
                      if (navigator.share && selectedEvent) {
                        await navigator.share({
                          title: selectedEvent.title,
                          text: `${selectedEvent.title} - ${selectedEvent.time} в ${selectedEvent.room}`,
                        });
                      } else {
                        // Fallback - копирование в буфер обмена
                        const text = `${selectedEvent.title} - ${selectedEvent.time} в ${selectedEvent.room}`;
                        if (navigator.clipboard) {
                          await navigator.clipboard.writeText(text);
                          alert('Информация скопирована в буфер обмена для дальнейшего использования');
                        } else {
                          alert('Функция "Поделиться" не поддерживается в вашем браузере');
                        }
                      }
                    } catch (error) {
                      console.error('Ошибка при попытке поделиться:', error);
                      // Если sharing не сработал, пробуем копировать
                      try {
                        const text = `${selectedEvent.title} - ${selectedEvent.time} в ${selectedEvent.room}`;
                        await navigator.clipboard.writeText(text);
                        alert('Информация скопирована в буфер обмена');
                      } catch (clipboardError) {
                        alert('Не удалось поделиться информацией');
                      }
                    }
                  }}
                >
                  <Share2 className="w-4 h-4" />
                  <span>Поделиться</span>
                </motion.button>
                
                <motion.button 
                  className="action-btn primary-btn"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedEvent(null)}
                  style={{ backgroundColor: selectedEvent.color }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>В календарь</span>
                </motion.button>
                  </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Модальное окно событий дня */}
      <AnimatePresence>
        {selectedDate && selectedDayEvents.length > 0 && (
          <motion.div 
            className="modal-backdrop-new"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedDate(null);
              setSelectedDayEvents([]);
            }}
          >
            <motion.div 
              className="day-events-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Заголовок модального окна */}
              <div className="modal-header-new">
                <div className="modal-title-info">
                  <h2>Расписание на {selectedDate.toLocaleDateString('ru-RU', { 
                    day: 'numeric', 
                    month: 'long',
                    weekday: 'long'
                  })}</h2>
                  <span className="modal-subject">{selectedDayEvents.length} занятий</span>
                </div>
                <motion.button 
                  className="modal-close-new"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedDate(null);
                    setSelectedDayEvents([]);
                  }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Список событий */}
              <div className="modal-body-new day-events-list">
                {selectedDayEvents.map((event, index) => {
                  const statusInfo = getStatusInfo(event.status);
                  return (
                    <motion.div 
                      key={event.id}
                      className="day-event-item"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      onClick={() => {
                        setSelectedEvent(event);
                        setSelectedDate(null);
                        setSelectedDayEvents([]);
                      }}
                    >
                      <div className="event-type-indicator" style={{ backgroundColor: event.color }}>
                        {getTypeIcon(event.type)}
                      </div>
                      
                      <div className="event-main-info">
                        <div className="event-title-row">
                          <h4>{event.title}</h4>
                          <div className="event-status-indicator" style={{ color: statusInfo.color }}>
                            {statusInfo.icon}
                          </div>
                        </div>
                        <div className="event-details-row">
                          <span className="event-subject">{event.subject}</span>
                          <span className="event-teacher">{event.teacher}</span>
                        </div>
                        <div className="event-meta-row">
                          <span className="event-time-range">
                            <Clock className="w-3 h-3" />
                            {event.time} - {event.endTime}
                          </span>
                          <span className="event-location">
                            <MapPin className="w-3 h-3" />
                            {event.room}
                          </span>
                        </div>
                      </div>
                      
                      <div className="event-importance">
                        {event.importance === 'high' && (
                          <div className="importance-badge high">
                            <Star className="w-3 h-3" />
                          </div>
                        )}
                        {event.attendanceRequired && (
                          <div className="attendance-indicator">
                            <CheckCircle className="w-3 h-3" />
              </div>
              )}
            </div>
          </motion.div>
                  );
                })}
        </div>

              {/* Действия */}
              <div className="modal-actions-new">
                <motion.button 
                  className="action-btn secondary-btn"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedDate(null);
                    setSelectedDayEvents([]);
                  }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Вернуться к календарю</span>
                </motion.button>
                
                <motion.button 
                  className="action-btn primary-btn"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={async () => {
                    try {
                      const dayInfo = selectedDate?.toLocaleDateString('ru-RU', { 
                        day: 'numeric', 
                        month: 'long',
                        weekday: 'long'
                      });
                      const eventsText = selectedDayEvents.map(event => 
                        `${event.time} - ${event.title} (${event.room})`
                      ).join('\n');
                      const fullText = `Расписание на ${dayInfo}:\n\n${eventsText}`;
                      
                      if (navigator.clipboard) {
                        await navigator.clipboard.writeText(fullText);
                        alert('Расписание скопировано в буфер обмена');
                      } else {
                        // Fallback для старых браузеров
                        const textArea = document.createElement('textarea');
                        textArea.value = fullText;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);
                        alert('Расписание скопировано в буфер обмена');
                      }
                      
                      setSelectedDate(null);
                      setSelectedDayEvents([]);
                    } catch (error) {
                      console.error('Ошибка при копировании:', error);
                      alert('Не удалось скопировать расписание');
                    }
                  }}
                >
                  <Copy className="w-4 h-4" />
                  <span>Копировать расписание</span>
                </motion.button>
      </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 