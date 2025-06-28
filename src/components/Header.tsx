'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useSidebar } from './DashboardLayout';
import {
  Search,
  Bell,
  Calendar,
  Clock,
  Zap,
  BookOpen,
  FileText,
  Users,
  ChevronDown,
  ChevronRight,
  X,
  Menu,
  Sun,
  Cloud,
  CloudRain,
  Eye,
  CheckCircle,
  AlertCircle,
  Info,
  MessageSquare,
  Award,
  TrendingUp,
  MapPin
} from 'lucide-react';

interface SearchResult {
  type: 'course' | 'teacher' | 'document' | 'student' | 'room';
  title: string;
  subtitle: string;
  href: string;
  icon: React.ReactNode;
  relevance?: number;
}

interface Notification {
  id: number;
  type: 'assignment' | 'schedule' | 'grade' | 'message' | 'system';
  title: string;
  message: string;
  time: string;
  unread: boolean;
  priority: 'high' | 'medium' | 'low';
  actionUrl?: string;
}

interface QuickAction {
  label: string;
  icon: React.ReactNode;
  action: () => void;
  color: string;
  available: boolean;
  shortcut?: string;
}

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);
  const [weather, setWeather] = useState({ temp: 18, condition: 'cloudy', location: 'Москва', lastUpdated: new Date() });
  const [weatherLoading, setWeatherLoading] = useState(false);
  const { collapsed, isMobile, setCollapsed, mobileMenuOpen, setMobileMenuOpen } = useSidebar();

  // Расширенные моковые данные для поиска
  const mockSearchResults: SearchResult[] = [
    // Курсы
    { type: 'course', title: 'Математический анализ', subtitle: 'Лекция • Иванов А.С. • Понедельник 9:00', href: '/courses/math', icon: <BookOpen className="w-4 h-4" /> },
    { type: 'course', title: 'Программирование', subtitle: 'Лабораторная • Петров В.М. • Вторник 10:45', href: '/courses/programming', icon: <BookOpen className="w-4 h-4" /> },
    { type: 'course', title: 'Физика', subtitle: 'Лекция • Козлов Д.П. • Среда 9:00', href: '/courses/physics', icon: <BookOpen className="w-4 h-4" /> },
    { type: 'course', title: 'История', subtitle: 'Семинар • Сидорова Е.И. • Четверг 13:00', href: '/courses/history', icon: <BookOpen className="w-4 h-4" /> },
    
    // Преподаватели
    { type: 'teacher', title: 'Иванов Александр Сергеевич', subtitle: 'Математика • Доцент • Ауд. 205', href: '/teachers/ivanov', icon: <Users className="w-4 h-4" /> },
    { type: 'teacher', title: 'Петров Владимир Михайлович', subtitle: 'Программирование • Профессор • Ауд. 301', href: '/teachers/petrov', icon: <Users className="w-4 h-4" /> },
    { type: 'teacher', title: 'Козлов Дмитрий Петрович', subtitle: 'Физика • Доцент • Ауд. 108', href: '/teachers/kozlov', icon: <Users className="w-4 h-4" /> },
    { type: 'teacher', title: 'Сидорова Елена Ивановна', subtitle: 'История • Профессор • Ауд. 102', href: '/teachers/sidorova', icon: <Users className="w-4 h-4" /> },
    
    // Документы
    { type: 'document', title: 'Лабораторная работа №3', subtitle: 'Программирование • PDF • 1.2 МБ', href: '/documents/lab3', icon: <FileText className="w-4 h-4" /> },
    { type: 'document', title: 'Конспект лекций по математике', subtitle: 'Математический анализ • PDF • 5.8 МБ', href: '/documents/math-lectures', icon: <FileText className="w-4 h-4" /> },
    { type: 'document', title: 'Методические указания', subtitle: 'Физика • PDF • 2.1 МБ', href: '/documents/physics-guide', icon: <FileText className="w-4 h-4" /> },
    { type: 'document', title: 'Расписание экзаменов', subtitle: 'Деканат • PDF • 456 КБ', href: '/documents/exam-schedule', icon: <FileText className="w-4 h-4" /> },
    
    // Аудитории
    { type: 'room', title: 'Аудитория 205', subtitle: 'Математика • Свободна до 14:00 • 40 мест', href: '/rooms/205', icon: <MapPin className="w-4 h-4" /> },
    { type: 'room', title: 'Аудитория 301', subtitle: 'Компьютерный класс • Занята до 12:15 • 25 мест', href: '/rooms/301', icon: <MapPin className="w-4 h-4" /> },
    { type: 'room', title: 'Аудитория 108', subtitle: 'Физика • Свободна • 35 мест', href: '/rooms/108', icon: <MapPin className="w-4 h-4" /> },
    { type: 'room', title: 'Библиотека', subtitle: 'Читальный зал • Открыта 9:00-20:00 • 100 мест', href: '/library', icon: <MapPin className="w-4 h-4" /> },
    
    // Студенты
    { type: 'student', title: 'Смирнов Алексей', subtitle: 'ИТ-301 • 3 курс • 4.2 балла', href: '/students/smirnov', icon: <Users className="w-4 h-4" /> },
    { type: 'student', title: 'Кузнецова Мария', subtitle: 'ИТ-301 • 3 курс • 4.8 балла', href: '/students/kuznetsova', icon: <Users className="w-4 h-4" /> },
  ];

  // Состояние уведомлений с загрузкой из localStorage
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Инициализация уведомлений
  useEffect(() => {
    const loadNotifications = () => {
      try {
        const saved = localStorage.getItem('notifications');
        if (saved) {
          setNotifications(JSON.parse(saved));
        } else {
          // Начальные уведомления
          const initialNotifications: Notification[] = [
            {
              id: 1,
              type: 'assignment',
              title: 'Новое задание',
              message: 'Лабораторная работа по программированию',
              time: '2 мин назад',
              unread: true,
              priority: 'high',
              actionUrl: '/courses/programming'
            },
            {
              id: 2,
              type: 'schedule',
              title: 'Изменение расписания',
              message: 'Лекция по математике перенесена на 10:00',
              time: '15 мин назад',
              unread: true,
              priority: 'medium',
              actionUrl: '/schedule'
            },
            {
              id: 3,
              type: 'grade',
              title: 'Новая оценка',
              message: 'Экзамен по физике - отлично (5)',
              time: '1 час назад',
              unread: false,
              priority: 'low',
              actionUrl: '/grades'
            },
            {
              id: 4,
              type: 'message',
              title: 'Сообщение от преподавателя',
              message: 'Дополнительные материалы к курсу',
              time: '2 часа назад',
              unread: true,
              priority: 'medium',
              actionUrl: '/messages'
            }
          ];
          setNotifications(initialNotifications);
          localStorage.setItem('notifications', JSON.stringify(initialNotifications));
        }
      } catch (error) {
        console.error('Ошибка загрузки уведомлений:', error);
        setNotifications([]);
      }
    };

    if (mounted) {
      loadNotifications();
    }
  }, [mounted]);

  // Мемоизированные счетчики для оптимизации
  const { unreadCount, totalCount } = useMemo(() => {
    return {
      unreadCount: notifications.filter(n => n.unread).length,
      totalCount: notifications.length
    };
  }, [notifications]);

  // Инициализация на клиенте
  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
  }, []);

  // Обновление времени каждую минуту
  useEffect(() => {
    if (!mounted) return;
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, [mounted]);

  // Улучшенный поиск с приоритетами и ранжированием
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const filtered = mockSearchResults
          .map(result => {
            const titleMatch = result.title.toLowerCase().includes(query);
            const subtitleMatch = result.subtitle.toLowerCase().includes(query);
            const exactMatch = result.title.toLowerCase() === query;
            const startsWithMatch = result.title.toLowerCase().startsWith(query);
            
            // Рассчитываем релевантность
            let relevance = 0;
            if (exactMatch) relevance += 100;
            if (startsWithMatch) relevance += 50;
            if (titleMatch) relevance += 30;
            if (subtitleMatch) relevance += 10;
            
            // Приоритет по типу контента
            const typePriority = {
              'course': 5,
              'teacher': 4, 
              'document': 3,
              'room': 2,
              'student': 1
            };
            relevance += typePriority[result.type] || 0;
            
            return { ...result, relevance };
          })
          .filter(result => result.relevance > 0)
          .sort((a, b) => b.relevance - a.relevance)
          .slice(0, 8); // Ограничиваем до 8 результатов
        
        setSearchResults(filtered);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Горячие клавиши
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + K для поиска
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setShowSearch(true);
        const searchInput = document.querySelector('.search-input-smart') as HTMLInputElement;
        searchInput?.focus();
      }
      
      // Escape для закрытия
      if (event.key === 'Escape') {
        setShowSearch(false);
        setShowNotifications(false);
        clearSearch();
      }
      
      // Горячие клавиши для быстрых действий
      if ((event.ctrlKey || event.metaKey) && event.shiftKey) {
        switch (event.key) {
          case 'S':
            event.preventDefault();
            window.location.href = '/schedule';
            // toast.success('Переход к расписанию (Ctrl+Shift+S)'); // Убрано раздражающее уведомление
            break;
          case 'G':
            event.preventDefault();
            window.location.href = '/grades';
            // toast.success('Переход к оценкам (Ctrl+Shift+G)'); // Убрано раздражающее уведомление
            break;
          case 'L':
            event.preventDefault();
            window.location.href = '/library';
            // toast.success('Переход к библиотеке (Ctrl+Shift+L)'); // Убрано раздражающее уведомление
            break;
          case 'D':
            event.preventDefault();
            window.location.href = '/documents';
            // toast.success('Переход к документам (Ctrl+Shift+D)'); // Убрано раздражающее уведомление
            break;
          case 'N':
            event.preventDefault();
            setShowNotifications(!showNotifications);
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showNotifications]);

  const getTimeBasedGreeting = () => {
    if (!currentTime) return 'Добро пожаловать';
    const hour = currentTime.getHours();
    if (hour < 12) return 'Доброе утро';
    if (hour < 17) return 'Добрый день';
    if (hour < 22) return 'Добрый вечер';
    return 'Доброй ночи';
  };

  const getTimeOfDay = () => {
    if (!currentTime) return 'day';
    const hour = currentTime.getHours();
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    if (hour >= 18 && hour < 22) return 'evening';
    return 'night';
  };

  // Мемоизированные контекстные действия для оптимизации
  const contextualActions = useMemo((): QuickAction[] => {
    if (!currentTime) return [];
    const timeOfDay = getTimeOfDay();
    const hour = currentTime.getHours();
    const day = currentTime.getDay();

    const baseActions: QuickAction[] = [
      {
        label: 'Следующее занятие',
        icon: <Calendar className="w-4 h-4" />,
        action: () => { /* toast.success('Переход к расписанию'); */ window.location.href = '/schedule'; }, // Убрано раздражающее уведомление
        color: 'var(--accent-blue)',
        available: day >= 1 && day <= 5 && hour >= 8 && hour <= 18,
        shortcut: 'S'
      },
      {
        label: 'Проверить оценки',
        icon: <TrendingUp className="w-4 h-4" />,
        action: () => { /* toast.success('Переход к оценкам'); */ window.location.href = '/grades'; }, // Убрано раздражающее уведомление
        color: 'var(--accent-green)',
        available: true,
        shortcut: 'G'
      },
      {
        label: 'Библиотека',
        icon: <BookOpen className="w-4 h-4" />,
        action: () => { /* toast.success('Переход к библиотеке'); */ window.location.href = '/library'; }, // Убрано раздражающее уведомление
        color: 'var(--accent-purple)',
        available: hour >= 9 && hour <= 20,
        shortcut: 'L'
      },
      {
        label: 'Документы',
        icon: <FileText className="w-4 h-4" />,
        action: () => { /* toast.success('Переход к документам'); */ window.location.href = '/documents'; }, // Убрано раздражающее уведомление
        color: 'var(--accent-orange)',
        available: true,
        shortcut: 'D'
      }
    ];

    // Контекстные действия по времени
    if (timeOfDay === 'morning') {
      baseActions.unshift({
        label: 'План на день',
        icon: <Zap className="w-4 h-4" />,
        action: () => {/* Ваш план на сегодня: 3 занятия, 1 дедлайн */},
        color: 'var(--accent-yellow)',
        available: true
      });
    }

    if (timeOfDay === 'evening') {
      baseActions.push({
        label: 'Итоги дня',
        icon: <CheckCircle className="w-4 h-4" />,
        action: () => {/* Отлично! Сегодня: 2 занятия посещено, 1 задание сдано */},
        color: 'var(--accent-green)',
        available: true
      });
    }

    return baseActions.filter(action => action.available);
  }, [currentTime]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'assignment': return <FileText className="w-4 h-4" />;
      case 'schedule': return <Calendar className="w-4 h-4" />;
      case 'grade': return <Award className="w-4 h-4" />;
      case 'message': return <MessageSquare className="w-4 h-4" />;
      case 'system': return <Info className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'var(--accent-red)';
      case 'medium': return 'var(--accent-orange)';
      case 'low': return 'var(--accent-green)';
      default: return 'var(--accent-blue)';
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-4 h-4" />;
      case 'cloudy': return <Cloud className="w-4 h-4" />;
      case 'rainy': return <CloudRain className="w-4 h-4" />;
      default: return <Cloud className="w-4 h-4" />;
    }
  };

  // Оптимизированная функция сохранения в localStorage с debounce
  const saveNotificationsDebounced = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (updatedNotifications: Notification[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          try {
            localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
          } catch (error) {
            console.error('Ошибка сохранения уведомлений:', error);
          }
        }, 100);
      };
    })(),
    []
  );

  // Оптимизированные функции управления уведомлениями
  const markAsRead = useCallback((notificationId: number) => {
    setNotifications(prev => {
      const updatedNotifications = prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, unread: false }
          : notification
      );
      
      saveNotificationsDebounced(updatedNotifications);
      return updatedNotifications;
    });
    
    // toast.success('Уведомление отмечено как прочитанное'); // Убрано раздражающее уведомление
  }, [saveNotificationsDebounced]);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => {
      const updatedNotifications = prev.map(notification => 
        ({ ...notification, unread: false })
      );
      
      saveNotificationsDebounced(updatedNotifications);
      return updatedNotifications;
    });
    
    // toast.success('Все уведомления отмечены как прочитанные'); // Убрано раздражающее уведомление
  }, [saveNotificationsDebounced]);

  const deleteNotification = useCallback((notificationId: number) => {
    setNotifications(prev => {
      const updatedNotifications = prev.filter(notification => 
        notification.id !== notificationId
      );
      
      saveNotificationsDebounced(updatedNotifications);
      return updatedNotifications;
    });
    
    // toast.success('Уведомление удалено'); // Убрано раздражающее уведомление
  }, [saveNotificationsDebounced]);

  const handleNotificationClick = useCallback((notification: Notification) => {
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
    if (notification.unread) {
      markAsRead(notification.id);
    }
    setShowNotifications(false);
  }, [markAsRead]);

  // Функция для сброса уведомлений к начальному состоянию (для тестирования)
  const resetNotifications = useCallback(() => {
    const initialNotifications: Notification[] = [
      {
        id: 1,
        type: 'assignment',
        title: 'Новое задание',
        message: 'Лабораторная работа по программированию',
        time: '2 мин назад',
        unread: true,
        priority: 'high',
        actionUrl: '/courses/programming'
      },
      {
        id: 2,
        type: 'schedule',
        title: 'Изменение расписания',
        message: 'Лекция по математике перенесена на 10:00',
        time: '15 мин назад',
        unread: true,
        priority: 'medium',
        actionUrl: '/schedule'
      },
      {
        id: 3,
        type: 'grade',
        title: 'Новая оценка',
        message: 'Экзамен по физике - отлично (5)',
        time: '1 час назад',
        unread: false,
        priority: 'low',
        actionUrl: '/grades'
      },
      {
        id: 4,
        type: 'message',
        title: 'Сообщение от преподавателя',
        message: 'Дополнительные материалы к курсу',
        time: '2 часа назад',
        unread: true,
        priority: 'medium',
        actionUrl: '/messages'
      }
    ];
    
    setNotifications(initialNotifications);
    localStorage.setItem('notifications', JSON.stringify(initialNotifications));
    // toast.success('Тестовые уведомления добавлены'); // Убрано раздражающее уведомление
  }, []);

  const updateWeather = async () => {
    setWeatherLoading(true);
    try {
      // Имитация API запроса погоды
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Случайные значения для демонстрации
      const conditions = ['sunny', 'cloudy', 'rainy'];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      const randomTemp = Math.floor(Math.random() * 30) + 10; // 10-40°C
      
      setWeather({
        temp: randomTemp,
        condition: randomCondition,
        location: 'Москва',
        lastUpdated: new Date()
      });
      
      // toast.success('Погода обновлена'); // Убрано раздражающее уведомление
    } catch (error) {
      // toast.error('Ошибка обновления погоды'); // Убрано раздражающее уведомление
    } finally {
      setWeatherLoading(false);
    }
  };

  const getWeatherText = (condition: string) => {
    switch (condition) {
      case 'sunny': return 'Солнечно';
      case 'cloudy': return 'Облачно';
      case 'rainy': return 'Дождь';
      default: return 'Неизвестно';
    }
  };

  const getSearchResultTypeText = (type: string) => {
    switch (type) {
      case 'course': return 'Курс';
      case 'teacher': return 'Преподаватель';
      case 'document': return 'Документ';
      case 'room': return 'Аудитория';
      case 'student': return 'Студент';
      default: return type;
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSearch(false);
  };

  // Простой рендер до гидратации
  if (!mounted) {
    return (
      <header className="header-student">
        <div className="header-content-student">
          <div className="header-left-student">
            {isMobile && (
              <button className="mobile-menu-btn">
                <Menu className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="header-center-student">
            <div className="smart-search-wrapper">
              <div className="smart-search">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Поиск..."
                  className="search-input-smart"
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="header-right-student">
            <div className="smart-notifications">
              <button className="notifications-btn-smart">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <motion.header 
      className="header-student"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="header-content-student">
        {/* Левая часть - кнопка меню и информация */}
        <div className="header-left-student">
          {isMobile && (
            <motion.button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Открыть меню"
            >
              <Menu className="w-5 h-5" />
            </motion.button>
          )}

          {/* Только погода */}
          {!isMobile && (
            <motion.div 
              className="smart-info-panel"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Улучшенная погода */}
              <motion.div 
                className="weather-info"
                whileHover={{ scale: 1.02 }}
                onClick={updateWeather}
                style={{ cursor: 'pointer' }}
                title={`Последнее обновление: ${weather.lastUpdated.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}. Нажмите для обновления`}
              >
                <div className="weather-icon" style={{ color: 'var(--accent-blue)' }}>
                  {weatherLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Clock className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    getWeatherIcon(weather.condition)
                  )}
                </div>
                <div className="weather-details">
                  <span className="temperature">{weather.temp}°C</span>
                  <span className="location">{weather.location} • {getWeatherText(weather.condition)}</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Центральная часть - умный поиск */}
        <motion.div 
          className="header-center-student"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="smart-search-wrapper">
            <motion.div 
              className={`smart-search ${showSearch ? 'expanded' : ''}`}
              animate={{ 
                width: showSearch ? (isMobile ? '100%' : '500px') : (isMobile ? '40px' : '400px')
              }}
              transition={{ duration: 0.3 }}
            >
              <Search className="search-icon" />
              <input
                type="text"
                placeholder={isMobile ? "Поиск..." : "Поиск курсов, преподавателей, документов... (Ctrl+K)"}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearch(true)}
                className="search-input-smart"
              />
              {searchQuery && (
                <motion.button
                  className="search-clear-btn"
                  onClick={clearSearch}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}
            </motion.div>

            {/* Результаты поиска */}
            <AnimatePresence>
              {showSearch && searchResults.length > 0 && (
                <motion.div
                  className="search-results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {searchResults.map((result, index) => (
                    <motion.a
                      key={index}
                      href={result.href}
                      className="search-result-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      whileHover={{ x: 4 }}
                      onClick={clearSearch}
                    >
                      <div className="result-icon" style={{ color: 'var(--accent-blue)' }}>
                        {result.icon}
                      </div>
                      <div className="result-content">
                        <div className="result-title">{result.title}</div>
                        <div className="result-subtitle">{result.subtitle}</div>
                      </div>
                      <div className="result-meta">
                        <span className="result-type">{getSearchResultTypeText(result.type)}</span>
                        {result.relevance && (
                          <span className="result-relevance" title="Релевантность">
                            {Math.round((result.relevance / 100) * 5)}★
                          </span>
                        )}
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Правая часть - контекстные действия и уведомления */}
        <motion.div 
          className="header-right-student"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Быстрые действия */}
          {!isMobile && (
            <motion.div 
              className="contextual-actions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {contextualActions.slice(0, 3).map((action, index) => (
                <motion.button
                  key={action.label}
                  className="action-btn-contextual"
                  onClick={action.action}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  title={`${action.label}${action.shortcut ? ` (${action.shortcut})` : ''}`}
                >
                  <div className="action-icon" style={{ color: action.color }}>
                    {action.icon}
                  </div>
                  <span className="action-label">{action.label}</span>
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* Оптимизированные уведомления */}
          <div className="smart-notifications">
            <motion.button
              className="notifications-btn-smart"
              onClick={() => setShowNotifications(!showNotifications)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <motion.span
                  className="notification-badge-smart"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  className="notifications-panel-smart"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="notifications-header">
                    <div className="notifications-title">
                      <h6>Уведомления</h6>
                      <span className="unread-indicator">
                        {totalCount === 0 ? 'Пусто' : 
                         unreadCount > 0 ? `${unreadCount} из ${totalCount} новых` : `${totalCount} уведомлений`}
                      </span>
                    </div>
                    <div className="notifications-controls">
                      {unreadCount > 0 && (
                        <motion.button
                          className="control-btn-small"
                          onClick={markAllAsRead}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          title="Отметить все как прочитанные"
                        >
                          <CheckCircle className="w-3 h-3" />
                        </motion.button>
                      )}
                      <motion.button
                        className="control-btn-small"
                        onClick={() => setShowNotifications(false)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Закрыть"
                      >
                        <X className="w-3 h-3" />
                      </motion.button>
                    </div>
                  </div>
                  <div className="notifications-list-smart">
                    {notifications.length === 0 ? (
                      <div className="empty-notifications-state">
                        <div className="empty-state-icon">
                          <Bell className="w-8 h-8" />
                        </div>
                        <h4 className="empty-state-title">Нет уведомлений</h4>
                        <p className="empty-state-text">
                          Все уведомления будут отображаться здесь
                        </p>
                        <motion.button
                          onClick={resetNotifications}
                          className="empty-state-action"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Добавить тестовые уведомления
                        </motion.button>
                      </div>
                    ) : (
                      // Упрощенная анимация уведомлений для производительности
                                              <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {notifications.slice(0, 4).map((notification) => (
                          <div
                          key={notification.id}
                          className={`notification-item-smart ${notification.unread ? 'unread' : ''}`}
                          onClick={() => handleNotificationClick(notification)}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="notification-icon-smart" style={{ color: getPriorityColor(notification.priority) }}>
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="notification-content-smart">
                            <div className="notification-title-smart">{notification.title}</div>
                            <div className="notification-message-smart">{notification.message}</div>
                            <div className="notification-meta">
                              <span className="notification-time-smart">{notification.time}</span>
                              <span className="notification-priority" style={{ color: getPriorityColor(notification.priority) }}>
                                {notification.priority === 'high' ? 'Высокий' : 
                                 notification.priority === 'medium' ? 'Средний' : 'Низкий'} приоритет
                              </span>
                            </div>
                          </div>
                          <div className="notification-actions">
                            {notification.unread && (
                                <button
                                className="notification-action-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification.id);
                                }}
                                title="Отметить как прочитанное"
                              >
                                <Eye className="w-3 h-3" />
                                </button>
                            )}
                              <button
                              className="notification-action-btn delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              title="Удалить уведомление"
                            >
                              <X className="w-3 h-3" />
                              </button>
                          </div>
                          </div>
                        ))}
                        </motion.div>
                    )}
                  </div>
                  <div className="notifications-footer">
                    <Link href="/notifications" className="view-all-notifications">
                      Все уведомления →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Overlay для закрытия */}
        <AnimatePresence>
          {(showNotifications || showSearch) && (
            <motion.div
              className="header-overlay-student"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowNotifications(false);
                setShowSearch(false);
              }}
              style={{ 
                pointerEvents: showNotifications || showSearch ? 'auto' : 'none',
                zIndex: 35 
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
} 