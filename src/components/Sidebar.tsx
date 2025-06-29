'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebar } from './DashboardLayout';
import {
  Home,
  Calendar,
  BarChart3,
  BookOpen,
  Users,
  Library,
  FileText,
  Newspaper,
  Bell,
  CalendarDays,
  User,
  MessageSquare,
  Settings,
  Building,
  Phone,
  Clock,
  AlertCircle,
  TrendingUp,
  Target,
  Award,
  ChevronRight,
  Play,
  Coffee,
  Zap,
  BookMarked,
  PenTool,
  HelpCircle
} from 'lucide-react';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  category?: string;
  badge?: number;
  isNew?: boolean;
  color?: string;
}

interface NextClass {
  subject: string;
  time: string;
  room: string;
  teacher: string;
  type: 'lecture' | 'seminar' | 'lab';
  startsIn: string;
}

interface Deadline {
  title: string;
  subject: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  type: 'assignment' | 'exam' | 'project';
}

const sidebarItems: SidebarItem[] = [
  { name: 'Главная', href: '/', icon: <Home className="w-4 h-4" />, color: 'var(--accent-blue)' },
  { name: 'Расписание', href: '/schedule', icon: <Calendar className="w-4 h-4" />, category: 'Учёба', badge: 2, color: 'var(--accent-blue)' },
  { name: 'Оценки', href: '/grades', icon: <BarChart3 className="w-4 h-4" />, category: 'Учёба', color: 'var(--accent-green)' },
  { name: 'Курсы', href: '/courses', icon: <BookOpen className="w-4 h-4" />, category: 'Учёба', badge: 3, color: 'var(--accent-purple)' },
  { name: 'Преподаватели', href: '/teachers', icon: <Users className="w-4 h-4" />, category: 'Учёба', color: 'var(--accent-orange)' },
  { name: 'Библиотека', href: '/library', icon: <Library className="w-4 h-4" />, category: 'Ресурсы', color: 'var(--accent-blue)' },
  { name: 'Документы', href: '/documents', icon: <FileText className="w-4 h-4" />, category: 'Ресурсы', badge: 1, color: 'var(--accent-green)' },
  { name: 'Новости', href: '/news', icon: <Newspaper className="w-4 h-4" />, category: 'Информация', badge: 5, isNew: true, color: 'var(--accent-red)' },
  { name: 'Уведомления', href: '/notifications', icon: <Bell className="w-4 h-4" />, category: 'Информация', badge: 8, color: 'var(--accent-orange)' },
  { name: 'События', href: '/calendar', icon: <CalendarDays className="w-4 h-4" />, category: 'Информация', color: 'var(--accent-purple)' },
  { name: 'Профиль', href: '/profile', icon: <User className="w-4 h-4" />, category: 'Личное', color: 'var(--accent-blue)' },
  { name: 'Поддержка', href: '/feedback', icon: <HelpCircle className="w-4 h-4" />, category: 'Личное', color: 'var(--accent-green)' },
  { name: 'О университете', href: '/about', icon: <Building className="w-4 h-4" />, category: 'Прочее', color: 'var(--accent-blue)' },
  { name: 'Контакты', href: '/contacts', icon: <Phone className="w-4 h-4" />, category: 'Прочее', color: 'var(--accent-green)' },
];

const categories = ['Учёба', 'Ресурсы', 'Информация', 'Личное', 'Прочее'];

export default function Sidebar() {
  const pathname = usePathname();
  const { collapsed, setCollapsed, isMobile, mobileMenuOpen, setMobileMenuOpen } = useSidebar();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  // Моковые данные для студента
  const [nextClass] = useState<NextClass>({
    subject: 'Математический анализ',
    time: '10:45',
    room: 'Ауд. 205',
    teacher: 'Иванов А.С.',
    type: 'lecture',
    startsIn: '25 мин'
  });

  const [upcomingDeadlines] = useState<Deadline[]>([
    {
      title: 'Лабораторная работа №3',
      subject: 'Программирование',
      dueDate: 'Завтра',
      priority: 'high',
      type: 'assignment'
    },
    {
      title: 'Эссе по философии',
      subject: 'Философия',
      dueDate: '3 дня',
      priority: 'medium',
      type: 'assignment'
    },
    {
      title: 'Экзамен по физике',
      subject: 'Физика',
      dueDate: '1 неделя',
      priority: 'high',
      type: 'exam'
    }
  ]);

  const [weekProgress] = useState({
    completed: 12,
    total: 18,
    percentage: 67
  });

  const [todayStats] = useState({
    classesLeft: 2,
    assignmentsDue: 1,
    newNotifications: 3
  });

  // Инициализация на клиенте (исправление hydration error)
  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
  }, []);

  // Обновление времени
  useEffect(() => {
    if (!mounted) return;
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Обновляем каждую минуту

    return () => clearInterval(timer);
  }, [mounted]);

  const groupedItems = categories.reduce((acc, category) => {
    acc[category] = sidebarItems.filter(item => item.category === category);
    return acc;
  }, {} as Record<string, SidebarItem[]>);

  const mainItems = sidebarItems.filter(item => !item.category);

  const getDeadlineIcon = (type: string) => {
    switch (type) {
      case 'assignment': return <PenTool className="w-3 h-3" />;
      case 'exam': return <Award className="w-3 h-3" />;
      case 'project': return <Target className="w-3 h-3" />;
      default: return <FileText className="w-3 h-3" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'var(--accent-red)';
      case 'medium': return 'var(--accent-orange)';
      case 'low': return 'var(--accent-green)';
      default: return 'var(--text-secondary)';
    }
  };

  const getGreeting = () => {
    if (!currentTime) return 'Добро пожаловать';
    const hour = currentTime.getHours();
    if (hour < 12) return 'Доброе утро';
    if (hour < 17) return 'Добрый день';
    return 'Добрый вечер';
  };

  const formatDate = () => {
    if (!currentTime) return '';
    return currentTime.toLocaleDateString('ru-RU', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const handleLinkClick = () => {
    if (isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  // Предотвращаем hydration error
  if (!mounted) {
    return (
      <div className={`sidebar-student ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header-student">
          <div className="sidebar-logo-student">
            <div className="logo-icon-student">
              <BookMarked className="w-6 h-6" />
            </div>
            {!collapsed && (
              <div className="logo-text-student">
                <span className="logo-title-student">УниПлатформа</span>
                <span className="logo-subtitle-student">Student Portal</span>
              </div>
            )}
          </div>
        </div>
        <div className="sidebar-nav-student">
          {/* Главная страница */}
          {mainItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-item-student">
              <div className="nav-content-student">
                <div className="nav-icon-wrapper-student">
                  <div className="nav-icon-student" style={{ color: item.color }}>
                    {item.icon}
                  </div>
                </div>
                {!collapsed && (
                  <div className="nav-title-wrapper-student">
                    <span className="nav-title-student">{item.name}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
          
          {/* Категории */}
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="nav-section-student">
              {!collapsed && (
                <div className="nav-category-student">
                  <span className="category-title-student">{category}</span>
                  <span className="category-count-student">{items.length}</span>
                </div>
              )}
              {items.map((item) => (
                <Link key={item.href} href={item.href} className="nav-item-student">
                  <div className="nav-content-student">
                    <div className="nav-icon-wrapper-student">
                      <div className="nav-icon-student" style={{ color: item.color }}>
                        {item.icon}
                      </div>
                    </div>
                    {!collapsed && (
                      <div className="nav-title-wrapper-student">
                        <span className="nav-title-student">{item.name}</span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
        
        {/* Профиль пользователя */}
        <div className="sidebar-footer-student">
          <div className="user-profile-student">
            <div className="user-avatar-student">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="User" />
            </div>
            {!collapsed && (
              <div className="user-info-student">
                <span className="user-name-student">Иван Иванов</span>
                <span className="user-role-student">Студент 3 курса • ИТ факультет</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <motion.div 
        className={`sidebar-student ${collapsed ? 'collapsed' : ''} ${isMobile && mobileMenuOpen ? 'open' : ''}`}
        initial={{ x: isMobile ? -280 : 0 }}
        animate={{ x: isMobile ? (mobileMenuOpen ? 0 : -280) : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Заголовок с логотипом */}
        <motion.div 
          className="sidebar-header-student"
          layout
        >
          <motion.div 
            className="sidebar-logo-student"
            whileHover={{ scale: 1.05 }}
          >
            <div className="logo-icon-student">
              <BookMarked className="w-6 h-6" />
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div 
                  className="logo-text-student"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="logo-title-student">УниПлатформа</span>
                  <span className="logo-subtitle-student">Student Portal</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          {!isMobile && (
            <motion.button
              onClick={() => setCollapsed(!collapsed)}
              className="sidebar-toggle-student"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={collapsed ? 'Развернуть меню' : 'Свернуть меню'}
            >
              <motion.div
                animate={{ rotate: collapsed ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.div>
            </motion.button>
          )}
        </motion.div>



        {/* Навигация */}
        <div className="sidebar-nav-student">
          {/* Главная страница */}
          <div className="nav-section-student">
            {mainItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`nav-item-student ${pathname === item.href ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={handleLinkClick}
                  title={collapsed ? item.name : undefined}
                >
                  <motion.div 
                    className="nav-content-student"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="nav-icon-wrapper-student">
                      <div className="nav-icon-student" style={{ color: item.color }}>
                        {item.icon}
                      </div>
                      {item.badge && (
                        <motion.span 
                          className="nav-badge-student"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
                        >
                          {item.badge}
                        </motion.span>
                      )}
                      {item.isNew && (
                        <motion.span 
                          className="nav-new-indicator-student"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>
                    <AnimatePresence>
                      {!collapsed && (
                        <motion.div 
                          className="nav-title-wrapper-student"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="nav-title-student">{item.name}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Категории с элементами */}
          {Object.entries(groupedItems).map(([category, items], categoryIndex) => (
            <div key={category} className="nav-section-student">
              <AnimatePresence>
                {!collapsed && (
                  <motion.div 
                    className="nav-category-student"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
                  >
                    <span className="category-title-student">{category}</span>
                    <span className="category-count-student">{items.length}</span>
                  </motion.div>
                )}
              </AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                >
                  <Link
                    href={item.href}
                    className={`nav-item-student ${pathname === item.href ? 'active' : ''}`}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={handleLinkClick}
                    title={collapsed ? item.name : undefined}
                  >
                    <motion.div 
                      className="nav-content-student"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="nav-icon-wrapper-student">
                        <div className="nav-icon-student" style={{ color: item.color }}>
                          {item.icon}
                        </div>
                        {item.badge && (
                          <motion.span 
                            className="nav-badge-student"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
                          >
                            {item.badge}
                          </motion.span>
                        )}
                        {item.isNew && (
                          <motion.span 
                            className="nav-new-indicator-student"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </div>
                      <AnimatePresence>
                        {!collapsed && (
                          <motion.div 
                            className="nav-title-wrapper-student"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <span className="nav-title-student">{item.name}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ))}
        </div>



        {/* Нижняя часть - профиль пользователя */}
        <motion.div 
          className="sidebar-footer-student"
          layout
        >
          <motion.div 
            className="user-profile-student"
            whileHover={{ y: -2 }}
          >
            <div className="user-avatar-student">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="User" />
              <motion.div 
                className="user-status-student"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div 
                  className="user-info-student"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="user-name-student">Иван Иванов</span>
                  <span className="user-role-student">Студент 3 курса • ИТ факультет</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Тултип для свернутого состояния */}
      <AnimatePresence>
        {collapsed && hoveredItem && !isMobile && (
          <motion.div 
            className="sidebar-tooltip-student"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {hoveredItem}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 