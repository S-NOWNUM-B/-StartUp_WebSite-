'use client';

import { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  Award,
  Target,
  Download,
  Filter,
  Star,
  CheckCircle,
  AlertCircle,
  Play,
  Wrench,
  HelpCircle,
  PlusCircle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  BarChart3,
  GraduationCap,
  Timer,
  Users,
  MapPin,
  Zap,
  Briefcase,
  Monitor,
  FileText,
  Coffee
} from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  semester: number;
  credits: number;
  category: 'mandatory' | 'elective' | 'project' | 'practical';
  status: 'enrolled' | 'completed' | 'available' | 'locked';
  progress: number;
  grade?: number;
  totalLessons: number;
  completedLessons: number;
  upcomingDeadline?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  requirements: string[];
  schedule: {
    day: string;
    time: string;
    room: string;
  }[];
  color: string;
}

interface QuickAction {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  badge?: string;
}

export default function CoursesPageCompact() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const courses: Course[] = [
    {
      id: 1,
      title: 'Алгоритмы и структуры данных',
      description: 'Изучение основных алгоритмов сортировки, поиска и структур данных',
      instructor: 'Иванов А.С.',
      semester: 5,
      credits: 4,
      category: 'mandatory',
      status: 'enrolled',
      progress: 75,
      totalLessons: 16,
      completedLessons: 12,
      upcomingDeadline: '2024-12-20',
      difficulty: 'intermediate',
      tags: ['алгоритмы', 'программирование', 'структуры данных'],
      requirements: ['Основы программирования', 'Математическая логика'],
      schedule: [
        { day: 'Понедельник', time: '10:00-11:30', room: 'Ауд. 301' },
        { day: 'Среда', time: '14:00-15:30', room: 'Ауд. 301' }
      ],
      color: '#3B82F6'
    },
    {
      id: 2,
      title: 'Веб-разработка',
      description: 'Современные технологии веб-разработки: HTML, CSS, JavaScript, React',
      instructor: 'Петров В.М.',
      semester: 6,
      credits: 3,
      category: 'elective',
      status: 'enrolled',
      progress: 45,
      totalLessons: 14,
      completedLessons: 6,
      upcomingDeadline: '2024-12-18',
      difficulty: 'beginner',
      tags: ['веб', 'html', 'css', 'javascript', 'react'],
      requirements: ['Основы программирования'],
      schedule: [
        { day: 'Вторник', time: '16:00-17:30', room: 'Комп. класс 2' }
      ],
      color: '#10B981'
    },
    {
      id: 3,
      title: 'Математический анализ',
      description: 'Дифференциальное и интегральное исчисление функций одной переменной',
      instructor: 'Сидорова М.И.',
      semester: 3,
      credits: 5,
      category: 'mandatory',
      status: 'completed',
      progress: 100,
      grade: 4.8,
      totalLessons: 18,
      completedLessons: 18,
      difficulty: 'advanced',
      tags: ['математика', 'анализ', 'интегралы', 'производные'],
      requirements: ['Математика (школьный курс)'],
      schedule: [
        { day: 'Понедельник', time: '14:00-15:30', room: 'Ауд. 205' },
        { day: 'Четверг', time: '10:00-11:30', room: 'Ауд. 205' }
      ],
      color: '#8B5CF6'
    },
    {
      id: 4,
      title: 'Базы данных',
      description: 'Проектирование и работа с реляционными базами данных, SQL',
      instructor: 'Козлов Д.П.',
      semester: 5,
      credits: 4,
      category: 'mandatory',
      status: 'available',
      progress: 0,
      totalLessons: 15,
      completedLessons: 0,
      difficulty: 'intermediate',
      tags: ['базы данных', 'sql', 'проектирование'],
      requirements: ['Основы программирования', 'Дискретная математика'],
      schedule: [
        { day: 'Вторник', time: '10:00-11:30', room: 'Ауд. 320' },
        { day: 'Пятница', time: '14:00-15:30', room: 'Ауд. 320' }
      ],
      color: '#F59E0B'
    },
    {
      id: 5,
      title: 'Курсовой проект',
      description: 'Разработка полноценного веб-приложения с использованием современных технологий',
      instructor: 'Белов М.Р.',
      semester: 6,
      credits: 6,
      category: 'project',
      status: 'enrolled',
      progress: 30,
      totalLessons: 10,
      completedLessons: 3,
      upcomingDeadline: '2024-12-25',
      difficulty: 'advanced',
      tags: ['проект', 'веб-приложение', 'fullstack'],
      requirements: ['Веб-разработка', 'Базы данных'],
      schedule: [
        { day: 'Пятница', time: '16:00-17:30', room: 'Проектная лаб.' }
      ],
      color: '#EC4899'
    },
    {
      id: 6,
      title: 'Машинное обучение',
      description: 'Основы машинного обучения, нейронные сети и алгоритмы обучения',
      instructor: 'Федорова Л.П.',
      semester: 6,
      credits: 4,
      category: 'elective',
      status: 'available',
      progress: 0,
      totalLessons: 12,
      completedLessons: 0,
      difficulty: 'advanced',
      tags: ['ML', 'AI', 'нейронные сети', 'Python'],
      requirements: ['Математический анализ', 'Программирование на Python'],
      schedule: [
        { day: 'Среда', time: '10:00-11:30', room: 'Ауд. 401' }
      ],
      color: '#06B6D4'
    }
  ];

  const categories = [
    { id: 'all', name: 'Все курсы', icon: BookOpen, count: courses.length },
    { id: 'mandatory', name: 'Обязательные', icon: AlertCircle, count: courses.filter(c => c.category === 'mandatory').length },
    { id: 'elective', name: 'Факультативы', icon: Star, count: courses.filter(c => c.category === 'elective').length },
    { id: 'project', name: 'Проекты', icon: Briefcase, count: courses.filter(c => c.category === 'project').length },
          { id: 'practical', name: 'Практика', icon: Wrench, count: courses.filter(c => c.category === 'practical').length }
  ];

  const quickActions: QuickAction[] = useMemo(() => [
    {
      id: 'analytics',
      title: 'АНАЛИТИКА',
      icon: <BarChart3 className="w-4 h-4" />,
      description: 'Прогресс курсов',
      color: 'var(--accent-blue)',
      badge: 'NEW'
    },
    {
      id: 'catalog',
      title: 'КАТАЛОГ',
      icon: <PlusCircle className="w-4 h-4" />,
      description: 'Найти курсы',
      color: 'var(--accent-green)'
    },
    {
      id: 'download',
      title: 'ОТЧЕТ',
      icon: <Download className="w-4 h-4" />,
      description: 'Скачать PDF',
      color: 'var(--accent-blue)'
    },
    {
      id: 'help',
      title: 'ПОМОЩЬ',
      icon: <HelpCircle className="w-4 h-4" />,
      description: 'Поддержка',
      color: 'var(--accent-green)'
    }
  ], []);

  const courseStats = useMemo(() => {
    const enrolledCourses = courses.filter(c => c.status === 'enrolled');
    const completedCourses = courses.filter(c => c.status === 'completed');
    const totalCredits = courses.filter(c => c.status === 'completed' || c.status === 'enrolled').reduce((sum, c) => sum + c.credits, 0);
    const avgGrade = completedCourses.reduce((sum, c) => sum + (c.grade || 0), 0) / completedCourses.length;
    const activeCourse = enrolledCourses.find(c => c.progress > 0);

    return {
      active: {
        value: enrolledCourses.length,
        label: 'Активных курсов',
        change: '+1',
        trend: 'up' as const
      },
      completed: {
        value: completedCourses.length,
        label: 'Завершенных курсов',
        change: '+2',
        trend: 'up' as const
      },
      credits: {
        value: totalCredits,
        label: 'Кредитов набрано',
        change: '+6',
        trend: 'up' as const
      },
      grade: {
        value: avgGrade ? avgGrade.toFixed(1) : '—',
        label: 'Средний балл',
        change: '+0.2',
        trend: 'up' as const
      },
      current: activeCourse
    };
  }, [courses]);

  const getCategoryColor = (category: Course['category']) => {
    switch (category) {
      case 'mandatory': return '#ef4444';
      case 'elective': return 'var(--accent-blue)';
      case 'project': return '#8b5cf6';
      case 'practical': return 'var(--accent-green)';
      default: return 'var(--text-muted)';
    }
  };

  const getCategoryName = (category: Course['category']) => {
    switch (category) {
      case 'mandatory': return 'Обязательный';
      case 'elective': return 'Факультатив';
      case 'project': return 'Проект';
      case 'practical': return 'Практика';
      default: return '';
    }
  };

  const getStatusColor = (status: Course['status']) => {
    switch (status) {
      case 'enrolled': return 'var(--accent-blue)';
      case 'completed': return 'var(--accent-green)';
      case 'available': return '#f59e0b';
      case 'locked': return '#ef4444';
      default: return 'var(--text-muted)';
    }
  };

  const getStatusText = (status: Course['status']) => {
    switch (status) {
      case 'enrolled': return 'Изучаю';
      case 'completed': return 'Завершен';
      case 'available': return 'Доступен';
      case 'locked': return 'Заблокирован';
      default: return '';
    }
  };

  const getDifficultyColor = (difficulty: Course['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'var(--accent-green)';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return 'var(--text-muted)';
    }
  };

  const getDifficultyText = (difficulty: Course['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'Начальный';
      case 'intermediate': return 'Средний';
      case 'advanced': return 'Продвинутый';
      default: return '';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down': return <ArrowDownRight className="w-3 h-3 text-red-500" />;
      case 'stable': return <ArrowUpRight className="w-3 h-3 text-blue-500" />;
    }
  };

  const filteredCourses = courses.filter(course => 
    selectedCategory === 'all' || course.category === selectedCategory
  );

  const handleQuickAction = (actionId: string) => {
    const action = quickActions.find(a => a.id === actionId);
    toast.success(`Выполняется: ${action?.title}`);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const categoryName = categories.find(c => c.id === categoryId)?.name || 'Все курсы';
    toast.success(`Переключение на: ${categoryName}`);
  };

  if (!mounted) {
    return (
      <div className="loading-dashboard">
        <div className="loading-content">
          <div className="loading-spinner-modern">
            <div className="spinner"></div>
          </div>
          <p>Загрузка курсов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="schedule-compact">
      {/* Компактный заголовок */}
      <div className="schedule-header-compact">
        <div className="header-main">
          <BookOpen className="w-6 h-6" />
          <div>
            <h1>Мои курсы</h1>
            <p>{courseStats.active.value} активных курсов • {courseStats.credits.value} кредитов набрано</p>
          </div>
        </div>
        <div className="current-day-indicator">
          <span className="day-badge">
            <GraduationCap className="w-4 h-4" />
          </span>
          <span className="day-date">{courseStats.grade.value}</span>
        </div>
      </div>

      {/* Основной компактный контент */}
      <div className="schedule-main-compact">
        {/* Верхний ряд - статистика и быстрые действия */}
        <div className="schedule-top-row">
          {/* Статистика курсов */}
          <div className="schedule-stats-compact">
            <div className="stats-header">
              <h3>Статистика</h3>
              <p>Обзор успеваемости</p>
            </div>
            <div className="stats-grid-compact">
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{courseStats.active.value}</span>
                  <span className="stat-label-compact">{courseStats.active.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(courseStats.active.trend)}
                    <span>{courseStats.active.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{courseStats.completed.value}</span>
                  <span className="stat-label-compact">{courseStats.completed.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(courseStats.completed.trend)}
                    <span>{courseStats.completed.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Target className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{courseStats.credits.value}</span>
                  <span className="stat-label-compact">{courseStats.credits.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(courseStats.credits.trend)}
                    <span>{courseStats.credits.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Star className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{courseStats.grade.value}</span>
                  <span className="stat-label-compact">{courseStats.grade.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(courseStats.grade.trend)}
                    <span>{courseStats.grade.change}</span>
                  </div>
                </div>
              </div>
            </div>
        </div>

          {/* Быстрые действия */}
          <div className="schedule-actions-compact">
            <h4>Быстрые действия</h4>
            <div className="actions-grid-compact">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  className="action-btn-compact"
                  onClick={() => handleQuickAction(action.id)}
                >
                  <div className="action-icon-compact" style={{ color: action.color }}>
                    {action.icon}
                  </div>
                  {action.badge && (
                    <span className="action-badge-compact">{action.badge}</span>
                  )}
                  <div className="action-content-compact">
                    <span className="action-title">{action.title}</span>
                    <span className="action-desc">{action.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Нижний ряд - навигация и контент */}
        <div className="schedule-bottom-row">
          {/* Навигация по категориям */}
          <div className="schedule-categories-compact">
            <div className="categories-header">
              <h3>Категории курсов</h3>
              <p>Выберите тип курсов</p>
            </div>
            <div className="categories-grid-compact">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-card-compact ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  <div className="category-card-header">
                    <div className="category-icon">
                  <category.icon className="w-4 h-4" />
                    </div>
                    <span className="category-count">{category.count}</span>
                  </div>
                  <div className="category-card-content">
                    <span className="category-name">{category.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Содержимое курсов */}
          <div className="schedule-content-compact">
            <div className="schedule-content-header">
              <h3>
                {categories.find(c => c.id === selectedCategory)?.name || 'Все курсы'}
              </h3>
              <p>
                {filteredCourses.length} {filteredCourses.length === 1 ? 'курс' : 'курсов'}
              </p>
            </div>
            
            <div className="courses-grid">
              {filteredCourses.map((course) => (
                <div key={course.id} className="lesson-card-unified">
                  <div className="lesson-header">
                    <div className="lesson-type" style={{ backgroundColor: course.color }}>
                    <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="lesson-status" style={{ color: getStatusColor(course.status) }}>
                      <span>{getStatusText(course.status)}</span>
                    </div>
                  </div>
                  
                  <div className="lesson-content">
                    <h3 className="lesson-title">{course.title}</h3>
                    <p className="course-description">{course.description}</p>
                      
                    <div className="course-meta">
                      <div className="meta-item">
                        <User className="w-4 h-4" />
                        <span>{course.instructor}</span>
                      </div>
                      <div className="meta-item">
                        <Target className="w-4 h-4" />
                          <span>{course.credits} кредитов</span>
                      </div>
                      <div className="meta-item">
                        <Award className="w-4 h-4" />
                        <span 
                          className="difficulty-badge"
                          style={{ color: getDifficultyColor(course.difficulty) }}
                        >
                          {getDifficultyText(course.difficulty)}
                        </span>
                        </div>
                      </div>
                      
                    {course.status === 'enrolled' && (
                      <div className="course-progress">
                        <div className="progress-header">
                          <span>Прогресс: {course.progress}%</span>
                          <span>{course.completedLessons}/{course.totalLessons} занятий</span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ 
                              width: `${course.progress}%`,
                              backgroundColor: course.color 
                            }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {course.status === 'completed' && course.grade && (
                      <div className="course-grade">
                        <Star className="w-4 h-4" style={{ color: '#f59e0b' }} />
                        <span>Оценка: {course.grade}</span>
                      </div>
                    )}

                    <div className="course-schedule">
                      <Clock className="w-4 h-4" />
                      <div className="schedule-list">
                        {course.schedule.map((session, index) => (
                          <div key={index} className="schedule-item">
                            <span>{session.day}</span>
                            <span>{session.time}</span>
                            <span className="room">
                              <MapPin className="w-3 h-3" />
                              {session.room}
                  </span>
                </div>
                        ))}
                        </div>
                      </div>
                      
                    <div className="course-tags">
                      {course.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                      {course.tags.length > 3 && (
                        <span className="tag-more">+{course.tags.length - 3}</span>
                      )}
                        </div>
                      </div>
                      
                  <div className="lesson-footer">
                    <div className="course-category">
                      <span 
                        className="category-badge"
                        style={{ backgroundColor: getCategoryColor(course.category) }}
                      >
                        {getCategoryName(course.category)}
                      </span>
                        </div>
                    <div className="course-actions">
                      <button className="action-btn-small">
                        <FileText className="w-4 h-4" />
                        Материалы
                      </button>
                      <button className="action-btn-small">
                        <Users className="w-4 h-4" />
                        Группа
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="empty-state">
                <BookOpen className="w-12 h-12" />
                <h3>Курсы не найдены</h3>
                <p>В выбранной категории нет курсов</p>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
} 