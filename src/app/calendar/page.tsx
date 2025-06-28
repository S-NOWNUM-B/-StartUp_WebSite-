'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  Calendar,
  CalendarDays,
  Clock,
  GraduationCap,
  Trophy,
  Clipboard,
  Star,
  MapPin,
  User,
  Grid3X3,
  List,
  PlusCircle,
  Download,
  Settings,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Eye,
  Bookmark,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle,
  Search,
  Target,
  Zap,
  Shield,
  Users,
  Building,
  Bell,
  Timer,
  ExternalLink,
  Edit3,
  Trash2,
  MoreHorizontal,
  Monitor
} from 'lucide-react';

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  endTime?: string;
  type: 'lecture' | 'exam' | 'deadline' | 'event' | 'meeting' | 'lab' | 'seminar';
  priority: 'high' | 'medium' | 'low';
  description?: string;
  location?: string;
  organizer?: string;
  attendees?: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  isOnline?: boolean;
  hasReminder?: boolean;
}

interface QuickAction {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  badge?: string;
}

export default function CalendarPageCompact() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [mounted, setMounted] = useState(true);

  const events: CalendarEvent[] = [
    { 
      id: 1, 
      title: 'Лекция по математическому анализу', 
      date: '2024-12-25', 
      time: '09:00', 
      endTime: '10:30',
      type: 'lecture', 
      priority: 'medium',
      description: 'Дифференциальные уравнения второго порядка',
      location: 'Аудитория 205',
      organizer: 'Профессор Иванов А.В.',
      attendees: 45,
      status: 'upcoming',
      isOnline: false,
      hasReminder: true
    },
    { 
      id: 2, 
      title: 'Экзамен по физике', 
      date: '2024-12-26', 
      time: '10:00', 
      endTime: '12:00',
      type: 'exam', 
      priority: 'high',
      description: 'Промежуточная аттестация по курсу "Общая физика"',
      location: 'Большая аудитория 101',
      organizer: 'Экзаменационная комиссия',
      attendees: 120,
      status: 'upcoming',
      isOnline: false,
      hasReminder: true
    },
    { 
      id: 3, 
      title: 'Научная конференция студентов', 
      date: '2024-12-27', 
      time: '14:00', 
      endTime: '18:00',
      type: 'event', 
      priority: 'medium',
      description: 'Ежегодная студенческая научная конференция "Молодые исследователи"',
      location: 'Актовый зал',
      organizer: 'Студенческий научный совет',
      attendees: 200,
      status: 'upcoming',
      isOnline: false,
      hasReminder: true
    },
    { 
      id: 4, 
      title: 'Дедлайн курсовой работы', 
      date: '2024-12-28', 
      time: '23:59', 
      type: 'deadline', 
      priority: 'high',
      description: 'Финальная сдача курсовой работы по программированию',
      location: 'Электронная система',
      organizer: 'Кафедра ПИ',
      status: 'upcoming',
      isOnline: true,
      hasReminder: true
    },
    {
      id: 5,
      title: 'Встреча с куратором группы',
      date: '2024-12-24',
      time: '15:30',
      endTime: '16:30',
      type: 'meeting',
      priority: 'low',
      description: 'Плановая встреча группы ПИ-21 с куратором',
      location: 'Кабинет 315',
      organizer: 'Куратор группы',
      attendees: 25,
      status: 'upcoming',
      isOnline: false,
      hasReminder: false
    },
    {
      id: 6,
      title: 'Защита семестровых проектов',
      date: '2024-12-23',
      time: '11:00',
      endTime: '15:00',
      type: 'exam',
      priority: 'high',
      description: 'Публичная защита проектов по курсу "Веб-разработка"',
      location: 'Компьютерный класс 150',
      organizer: 'Преподаватель курса',
      attendees: 30,
      status: 'completed',
      isOnline: false,
      hasReminder: false
    },
    {
      id: 7,
      title: 'Лабораторная работа №5',
      date: '2024-12-30',
      time: '13:00',
      endTime: '16:00',
      type: 'lab',
      priority: 'medium',
      description: 'Исследование алгоритмов сортировки',
      location: 'Лаборатория программирования',
      organizer: 'Ассистент кафедры',
      attendees: 15,
      status: 'upcoming',
      isOnline: false,
      hasReminder: true
    },
    {
      id: 8,
      title: 'Семинар по машинному обучению',
      date: '2024-12-31',
      time: '16:00',
      endTime: '17:30',
      type: 'seminar',
      priority: 'medium',
      description: 'Современные методы глубокого обучения',
      location: 'Онлайн (Zoom)',
      organizer: 'Приглашенный эксперт',
      attendees: 80,
      status: 'upcoming',
      isOnline: true,
      hasReminder: true
    }
  ];

  const categories = [
    { id: 'all', name: 'Все события', count: events.length },
    { id: 'lecture', name: 'Лекции', count: events.filter(e => e.type === 'lecture').length },
    { id: 'exam', name: 'Экзамены', count: events.filter(e => e.type === 'exam').length },
    { id: 'lab', name: 'Лабораторные', count: events.filter(e => e.type === 'lab').length },
    { id: 'seminar', name: 'Семинары', count: events.filter(e => e.type === 'seminar').length },
    { id: 'deadline', name: 'Дедлайны', count: events.filter(e => e.type === 'deadline').length },
    { id: 'event', name: 'Мероприятия', count: events.filter(e => e.type === 'event').length },
    { id: 'meeting', name: 'Встречи', count: events.filter(e => e.type === 'meeting').length }
  ];

  const quickActions: QuickAction[] = useMemo(() => {
    const todayEvents = events.filter(e => new Date(e.date).toDateString() === new Date().toDateString()).length;
    const upcomingEvents = events.filter(e => e.status === 'upcoming').length;
    
    return [
      {
        id: 'create',
        title: 'СОЗДАТЬ',
        icon: <PlusCircle className="w-4 h-4" />,
        description: 'Новое событие',
        color: 'var(--accent-blue)',
        badge: 'NEW'
      },
      {
        id: 'today',
        title: 'СЕГОДНЯ',
        icon: <Clock className="w-4 h-4" />,
        description: 'События дня',
        color: 'var(--accent-green)',
        badge: todayEvents > 0 ? `${todayEvents}` : undefined
      },
      {
        id: 'upcoming',
        title: 'ПРЕДСТОЯЩИЕ',
        icon: <TrendingUp className="w-4 h-4" />,
        description: 'Скоро будут',
        color: '#8b5cf6',
        badge: upcomingEvents > 0 ? `${upcomingEvents}` : undefined
      },
      {
        id: 'export',
        title: 'ЭКСПОРТ',
        icon: <Download className="w-4 h-4" />,
        description: 'Сохранить календарь',
        color: '#6b7280'
      }
    ];
  }, [events]);

  const eventStats = useMemo(() => {
    const totalEvents = events.length;
    const todayEvents = events.filter(e => new Date(e.date).toDateString() === new Date().toDateString()).length;
    const highPriorityEvents = events.filter(e => e.priority === 'high').length;
    const upcomingEvents = events.filter(e => e.status === 'upcoming').length;

    return {
      total: {
        value: totalEvents,
        label: 'Всего событий',
        change: '+4',
        trend: 'up' as const
      },
      today: {
        value: todayEvents,
        label: 'Сегодня',
        change: '+1',
        trend: 'up' as const
      },
      important: {
        value: highPriorityEvents,
        label: 'Важных',
        change: '0',
        trend: 'stable' as const
      },
      upcoming: {
        value: upcomingEvents,
        label: 'Предстоящих',
        change: '+2',
        trend: 'up' as const
      }
    };
  }, [events]);

  const getEventIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'lecture': return <GraduationCap className="w-4 h-4" />;
      case 'exam': return <Clipboard className="w-4 h-4" />;
      case 'lab': return <Search className="w-4 h-4" />;
      case 'seminar': return <Users className="w-4 h-4" />;
      case 'deadline': return <Clock className="w-4 h-4" />;
      case 'event': return <Star className="w-4 h-4" />;
      case 'meeting': return <User className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getEventColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'lecture': return 'var(--accent-blue)';
      case 'exam': return '#ef4444';
      case 'lab': return '#06b6d4';
      case 'seminar': return '#8b5cf6';
      case 'deadline': return '#f59e0b';
      case 'event': return 'var(--accent-green)';
      case 'meeting': return '#ec4899';
      default: return 'var(--accent-blue)';
    }
  };

  const getStatusColor = (status: CalendarEvent['status']) => {
    switch (status) {
      case 'upcoming': return 'var(--accent-blue)';
      case 'ongoing': return 'var(--accent-green)';
      case 'completed': return '#6b7280';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: CalendarEvent['status']) => {
    switch (status) {
      case 'upcoming': return 'Предстоит';
      case 'ongoing': return 'Идёт сейчас';
      case 'completed': return 'Завершено';
      case 'cancelled': return 'Отменено';
      default: return 'Неизвестно';
    }
  };

  const getTypeName = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'lecture': return 'Лекция';
      case 'exam': return 'Экзамен';
      case 'lab': return 'Лабораторная';
      case 'seminar': return 'Семинар';
      case 'deadline': return 'Дедлайн';
      case 'event': return 'Мероприятие';
      case 'meeting': return 'Встреча';
      default: return 'Событие';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down': return <ArrowDownRight className="w-3 h-3 text-red-500" />;
      case 'stable': return <ArrowUpRight className="w-3 h-3 text-blue-500" />;
    }
  };

  const formatTime = (time: string, endTime?: string) => {
    if (endTime) {
      return `${time} - ${endTime}`;
    }
    return time;
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Преобразуем так, чтобы понедельник был 0
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelectedDate = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const selectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const selectedDateEvents = useMemo(() => {
    return getEventsForDate(selectedDate).filter(event => 
      selectedCategory === 'all' || event.type === selectedCategory
    );
  }, [selectedDate, events, selectedCategory]);

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'create':
        toast.success('Открываю форму создания события');
        break;
      case 'today':
        setSelectedDate(new Date());
        setCurrentMonth(new Date());
        toast.success('Переход к сегодняшнему дню');
        break;
      case 'upcoming':
        setSelectedCategory('all');
        toast.success('Показаны предстоящие события');
        break;
      case 'export':
        toast.success('Экспорт календаря');
        break;
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const categoryName = categories.find(c => c.id === categoryId)?.name || 'Все события';
    toast.success(`Фильтр: ${categoryName}`);
  };

  const handleEventAction = (event: CalendarEvent, action: string) => {
    const actions = {
      view: `Просмотр: ${event.title}`,
      edit: `Редактирование: ${event.title}`,
      delete: `Удаление: ${event.title}`,
      reminder: `${event.hasReminder ? 'Отключение' : 'Включение'} напоминания: ${event.title}`
    };
    toast.success(actions[action as keyof typeof actions] || 'Действие выполнено');
  };

  if (!mounted) {
    return (
      <div className="loading-dashboard">
        <div className="loading-content">
          <div className="loading-spinner-modern">
            <div className="spinner"></div>
          </div>
          <p>Загрузка календаря...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="calendar-compact">
      {/* Компактный заголовок */}
      <div className="calendar-header-compact">
        <div className="header-main">
          <Calendar className="w-6 h-6" />
          <div>
            <h1>Календарь событий</h1>
            <p>{events.length} событий • {eventStats.upcoming.value} предстоящих</p>
          </div>
        </div>
        <div className="current-calendar-indicator">
          <span className="calendar-badge">{eventStats.today.value}</span>
          <span className="calendar-label">Сегодня</span>
        </div>
      </div>

      {/* Основной компактный контент */}
      <div className="calendar-main-compact">
        {/* Верхний ряд - статистика и быстрые действия */}
        <div className="calendar-top-row">
          {/* Статистика событий */}
          <motion.div 
            className="calendar-stats-compact"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="stats-header">
              <h3>Статистика</h3>
              <p>Аналитика событий</p>
            </div>
            <div className="stats-grid-compact">
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                <Calendar className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{eventStats.total.value}</span>
                  <span className="stat-label-compact">{eventStats.total.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(eventStats.total.trend)}
                    <span>{eventStats.total.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                <Clock className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{eventStats.today.value}</span>
                  <span className="stat-label-compact">{eventStats.today.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(eventStats.today.trend)}
                    <span>{eventStats.today.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{eventStats.important.value}</span>
                  <span className="stat-label-compact">{eventStats.important.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(eventStats.important.trend)}
                    <span>{eventStats.important.change}</span>
            </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{eventStats.upcoming.value}</span>
                  <span className="stat-label-compact">{eventStats.upcoming.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(eventStats.upcoming.trend)}
                    <span>{eventStats.upcoming.change}</span>
                  </div>
                </div>
              </div>
        </div>
      </motion.div>

          {/* Быстрые действия */}
      <motion.div 
            className="calendar-actions-compact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
      >
            <h4>Быстрые действия</h4>
            <div className="actions-grid-calendar">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  className="action-btn-calendar"
                  onClick={() => handleQuickAction(action.id)}
                  style={{ '--action-color': action.color } as React.CSSProperties}
                >
                  <div className="action-icon-calendar">
                    {action.icon}
                    {action.badge && (
                      <span className="action-badge-calendar">{action.badge}</span>
                    )}
                  </div>
                  <div className="action-content-calendar">
                    <span className="action-title">{action.title}</span>
                    <span className="action-desc">{action.description}</span>
            </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Нижний ряд - календарь и события */}
        <div className="calendar-bottom-row">
          {/* Календарь */}
        <motion.div 
            className="calendar-grid-compact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <div className="calendar-grid-header">
              <div className="calendar-nav">
                <button 
                  className="calendar-nav-btn"
                  onClick={previousMonth}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <h3 className="calendar-month-title">
                  {getMonthName(currentMonth)}
                </h3>
                <button 
                  className="calendar-nav-btn"
                  onClick={nextMonth}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="calendar-view-options">
                <button 
                  className="calendar-today-btn"
                  onClick={() => handleQuickAction('today')}
                >
                  <Clock className="w-4 h-4" />
                  <span>Сегодня</span>
                </button>
              </div>
            </div>

            {/* Дни недели */}
            <div className="calendar-weekdays">
              {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
                <div key={day} className="calendar-weekday">
                  {day}
                </div>
              ))}
            </div>

            {/* Календарная сетка */}
            <div className="calendar-days-grid">
              {/* Пустые дни предыдущего месяца */}
              {Array.from({ length: getFirstDayOfMonth(currentMonth) }, (_, i) => (
                <div key={`empty-${i}`} className="calendar-day empty" />
              ))}
              
              {/* Дни текущего месяца */}
              {Array.from({ length: getDaysInMonth(currentMonth) }, (_, i) => {
                const day = i + 1;
                const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                const dayEvents = getEventsForDate(date);
                const hasEvents = dayEvents.length > 0;
                
                return (
                  <div
                    key={day}
                    className={`calendar-day ${isToday(date) ? 'today' : ''} ${isSelectedDate(date) ? 'selected' : ''} ${hasEvents ? 'has-events' : ''}`}
                    onClick={() => selectDate(date)}
                  >
                    <span className="calendar-day-number">{day}</span>
                    {hasEvents && (
                      <div className="calendar-day-events">
                        {dayEvents.slice(0, 3).map((event, index) => (
                          <div
                            key={event.id}
                            className="calendar-day-event"
                            style={{ backgroundColor: getEventColor(event.type) }}
                            title={event.title}
                          />
                        ))}
                        {dayEvents.length > 3 && (
                          <div className="calendar-day-more">
                            +{dayEvents.length - 3}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </motion.div>

          {/* События выбранного дня */}
            <motion.div
            className="calendar-events-compact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="calendar-events-header">
              <div>
                <h3>
                  {selectedDate.toLocaleDateString('ru-RU', { 
                    day: 'numeric', 
                    month: 'long',
                    weekday: 'long'
                  })}
                </h3>
                <p>{selectedDateEvents.length} событий</p>
              </div>
              <div className="event-type-filter">
                <select 
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="category-select"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
              </div>
              </div>
              
            <div className="calendar-events-list">
              {selectedDateEvents.length > 0 ? (
                selectedDateEvents.map((event) => (
                  <div key={event.id} className="calendar-event-card">
                    <div className="event-card-header">
                      <div className="event-time-block">
                        <div className="event-time">
                          {formatTime(event.time, event.endTime)}
                        </div>
                        <div 
                          className="event-type-indicator"
                          style={{ backgroundColor: getEventColor(event.type) }}
                        >
                        {getEventIcon(event.type)}
                        </div>
                      </div>
                      <div className="event-actions">
                        {event.hasReminder && (
                          <div className="event-reminder-indicator">
                            <Bell className="w-3 h-3" />
                          </div>
                        )}
                        {event.isOnline && (
                          <div className="event-online-indicator">
                            <Monitor className="w-3 h-3" />
                          </div>
                        )}
                        <button 
                          className="event-action-btn"
                          onClick={() => handleEventAction(event, 'view')}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="event-card-content">
                      <div className="event-title-section">
                        <h4 className="event-title">{event.title}</h4>
                        <div className="event-type-badge" style={{ backgroundColor: getEventColor(event.type) }}>
                          {getTypeName(event.type)}
                        </div>
                      </div>

                      {event.description && (
                        <p className="event-description">{event.description}</p>
                      )}
                    
                      <div className="event-details">
                        <div className="event-detail">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                        {event.organizer && (
                          <div className="event-detail">
                          <User className="w-3 h-3" />
                            <span>{event.organizer}</span>
                        </div>
                      )}
                        {event.attendees && (
                          <div className="event-detail">
                            <Users className="w-3 h-3" />
                            <span>{event.attendees} участников</span>
                  </div>
                )}
                </div>
                
                      <div className="event-status-section">
                        <div 
                          className="event-status-badge"
                          style={{ color: getStatusColor(event.status) }}
                    >
                          {event.status === 'upcoming' ? <Clock className="w-3 h-3" /> :
                           event.status === 'ongoing' ? <Zap className="w-3 h-3" /> :
                           event.status === 'completed' ? <CheckCircle className="w-3 h-3" /> :
                           <AlertTriangle className="w-3 h-3" />}
                          <span>{getStatusText(event.status)}</span>
                      </div>
                      
                        {event.priority === 'high' && (
                          <div className="event-priority-badge high">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Важно</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="event-card-footer">
                      <div className="event-card-actions">
                        <button 
                          className="event-btn view"
                          onClick={() => handleEventAction(event, 'view')}
                        >
                          <Eye className="w-4 h-4" />
                          <span>Просмотр</span>
                        </button>
                        <button 
                          className="event-btn edit"
                          onClick={() => handleEventAction(event, 'edit')}
                        >
                          <Edit3 className="w-4 h-4" />
                          <span>Изменить</span>
                        </button>
                        <button 
                          className={`event-btn reminder ${event.hasReminder ? 'active' : ''}`}
                          onClick={() => handleEventAction(event, 'reminder')}
                        >
                          <Bell className="w-4 h-4" />
                          <span>{event.hasReminder ? 'Отключить' : 'Напомнить'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-events-compact">
                  <Calendar className="w-12 h-12" />
                  <h4>Событий нет</h4>
                  <p>На выбранную дату событий не запланировано</p>
                  <button 
                    className="create-event-btn"
                    onClick={() => handleQuickAction('create')}
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Создать событие</span>
                  </button>
                </div>
              )}
          </div>
        </motion.div>
        </div>
      </div>
    </div>
  );
} 