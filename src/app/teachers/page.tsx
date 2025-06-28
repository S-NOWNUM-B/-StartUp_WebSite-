'use client';

import { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import {
  User,
  Users,
  BookOpen,
  Award,
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  Building,
  GraduationCap,
  Calendar,
  FileText,
  Download,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Settings,
  BarChart3,
  Coffee,
  Globe,
  Briefcase,
  ChevronRight
} from 'lucide-react';

interface Teacher {
  id: number;
  name: string;
  position: string;
  department: string;
  degree: string;
  experience: number;
  email: string;
  phone: string;
  office: string;
  bio: string;
  specializations: string[];
  courses: string[];
  rating: number;
  totalStudents: number;
  workingHours: {
    day: string;
    time: string;
  }[];
  publications: number;
  researchAreas: string[];
  languages: string[];
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

export default function TeachersPageCompact() {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const teachers: Teacher[] = [
    {
      id: 1,
      name: 'Иванов Александр Сергеевич',
      position: 'Профессор',
      department: 'Информационные технологии',
      degree: 'Доктор технических наук',
      experience: 15,
      email: 'a.ivanov@university.ru',
      phone: '+7 (495) 123-45-67',
      office: 'Корпус А, каб. 305',
      bio: 'Специалист в области алгоритмов и структур данных, автор более 50 научных публикаций.',
      specializations: ['Алгоритмы', 'Структуры данных', 'Машинное обучение'],
      courses: ['Алгоритмы и структуры данных', 'Математический анализ', 'Дискретная математика'],
      rating: 4.8,
      totalStudents: 240,
      workingHours: [
        { day: 'Понедельник', time: '14:00-16:00' },
        { day: 'Среда', time: '10:00-12:00' },
        { day: 'Пятница', time: '14:00-16:00' }
      ],
      publications: 52,
      researchAreas: ['Машинное обучение', 'Анализ алгоритмов', 'Оптимизация'],
      languages: ['Русский', 'English', 'Deutsch'],
      color: '#3B82F6'
    },
    {
      id: 2,
      name: 'Петрова Мария Владимировна',
      position: 'Доцент',
      department: 'Веб-технологии',
      degree: 'Кандидат технических наук',
      experience: 8,
      email: 'm.petrova@university.ru',
      phone: '+7 (495) 123-45-68',
      office: 'Корпус Б, каб. 210',
      bio: 'Эксперт в области веб-разработки и пользовательских интерфейсов.',
      specializations: ['Веб-разработка', 'UI/UX дизайн', 'JavaScript'],
      courses: ['Веб-разработка', 'Основы программирования', 'Интерфейсы пользователя'],
      rating: 4.6,
      totalStudents: 180,
      workingHours: [
        { day: 'Вторник', time: '16:00-18:00' },
        { day: 'Четверг', time: '14:00-16:00' }
      ],
      publications: 23,
      researchAreas: ['Веб-технологии', 'Пользовательский опыт', 'Адаптивный дизайн'],
      languages: ['Русский', 'English'],
      color: '#10B981'
    },
    {
      id: 3,
      name: 'Сидоров Дмитрий Павлович',
      position: 'Старший преподаватель',
      department: 'Базы данных',
      degree: 'Кандидат технических наук',
      experience: 12,
      email: 'd.sidorov@university.ru',
      phone: '+7 (495) 123-45-69',
      office: 'Корпус А, каб. 201',
      bio: 'Специалист по проектированию и оптимизации баз данных.',
      specializations: ['Базы данных', 'SQL', 'NoSQL', 'Системы управления данными'],
      courses: ['Базы данных', 'Системы управления базами данных', 'Анализ данных'],
      rating: 4.4,
      totalStudents: 200,
      workingHours: [
        { day: 'Понедельник', time: '10:00-12:00' },
        { day: 'Среда', time: '14:00-16:00' },
        { day: 'Пятница', time: '10:00-12:00' }
      ],
      publications: 18,
      researchAreas: ['Оптимизация БД', 'Распределенные системы', 'Big Data'],
      languages: ['Русский', 'English'],
      color: '#F59E0B'
    },
    {
      id: 4,
      name: 'Козлова Елена Ивановна',
      position: 'Профессор',
      department: 'Математика',
      degree: 'Доктор физико-математических наук',
      experience: 20,
      email: 'e.kozlova@university.ru',
      phone: '+7 (495) 123-45-70',
      office: 'Корпус В, каб. 105',
      bio: 'Заведующая кафедрой математического анализа, автор учебников.',
      specializations: ['Математический анализ', 'Дифференциальные уравнения', 'Функциональный анализ'],
      courses: ['Математический анализ', 'Дифференциальные уравнения', 'Теория функций'],
      rating: 4.9,
      totalStudents: 320,
      workingHours: [
        { day: 'Вторник', time: '10:00-12:00' },
        { day: 'Четверг', time: '14:00-16:00' }
      ],
      publications: 85,
      researchAreas: ['Функциональный анализ', 'Дифференциальные уравнения', 'Математическое моделирование'],
      languages: ['Русский', 'English', 'Français'],
      color: '#8B5CF6'
    },
    {
      id: 5,
      name: 'Белов Михаил Романович',
      position: 'Ассистент',
      department: 'Информационные технологии',
      degree: 'Магистр',
      experience: 3,
      email: 'm.belov@university.ru',
      phone: '+7 (495) 123-45-71',
      office: 'Корпус А, каб. 308',
      bio: 'Молодой преподаватель, специализирующийся на современных веб-технологиях.',
      specializations: ['React', 'Node.js', 'TypeScript', 'Fullstack разработка'],
      courses: ['Курсовой проект', 'Современные веб-фреймворки'],
      rating: 4.3,
      totalStudents: 85,
      workingHours: [
        { day: 'Понедельник', time: '16:00-18:00' },
        { day: 'Пятница', time: '16:00-18:00' }
      ],
      publications: 5,
      researchAreas: ['Веб-технологии', 'Мобильная разработка'],
      languages: ['Русский', 'English'],
      color: '#EC4899'
    },
    {
      id: 6,
      name: 'Федорова Людмила Петровна',
      position: 'Доцент',
      department: 'Искусственный интеллект',
      degree: 'Кандидат технических наук',
      experience: 10,
      email: 'l.fedorova@university.ru',
      phone: '+7 (495) 123-45-72',
      office: 'Корпус А, каб. 401',
      bio: 'Эксперт в области машинного обучения и нейронных сетей.',
      specializations: ['Машинное обучение', 'Нейронные сети', 'Data Science', 'Python'],
      courses: ['Машинное обучение', 'Анализ данных', 'Нейронные сети'],
      rating: 4.7,
      totalStudents: 150,
      workingHours: [
        { day: 'Среда', time: '10:00-12:00' },
        { day: 'Пятница', time: '14:00-16:00' }
      ],
      publications: 35,
      researchAreas: ['Deep Learning', 'Computer Vision', 'NLP'],
      languages: ['Русский', 'English'],
      color: '#06B6D4'
    }
  ];

  const departments = [
    { id: 'all', name: 'Все кафедры', icon: Building, count: teachers.length },
    { id: 'Информационные технологии', name: 'Информационные технологии', icon: User, count: teachers.filter(t => t.department === 'Информационные технологии').length },
    { id: 'Веб-технологии', name: 'Веб-технологии', icon: Globe, count: teachers.filter(t => t.department === 'Веб-технологии').length },
    { id: 'Базы данных', name: 'Базы данных', icon: Award, count: teachers.filter(t => t.department === 'Базы данных').length },
    { id: 'Математика', name: 'Математика', icon: Target, count: teachers.filter(t => t.department === 'Математика').length },
    { id: 'Искусственный интеллект', name: 'Искусственный интеллект', icon: Settings, count: teachers.filter(t => t.department === 'Искусственный интеллект').length }
  ];

  const quickActions: QuickAction[] = useMemo(() => [
    {
      id: 'analytics',
      title: 'АНАЛИТИКА',
      icon: <BarChart3 className="w-4 h-4" />,
      description: 'Статистика кафедр',
      color: 'var(--accent-blue)',
      badge: 'NEW'
    },
    {
      id: 'directory',
      title: 'СПРАВОЧНИК',
      icon: <Users className="w-4 h-4" />,
      description: 'Контакты',
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
      id: 'settings',
      title: 'НАСТРОЙКИ',
      icon: <Settings className="w-4 h-4" />,
      description: 'Параметры',
      color: 'var(--accent-green)'
    }
  ], []);

  const teachersStats = useMemo(() => {
    const avgExperience = Math.round(teachers.reduce((sum, t) => sum + t.experience, 0) / teachers.length);
    const avgRating = (teachers.reduce((sum, t) => sum + t.rating, 0) / teachers.length).toFixed(1);
    const totalPublications = teachers.reduce((sum, t) => sum + t.publications, 0);
    const totalStudents = teachers.reduce((sum, t) => sum + t.totalStudents, 0);

    return {
      total: {
        value: teachers.length,
        label: 'Преподавателей',
        change: '+2',
        trend: 'up' as const
      },
      experience: {
        value: avgExperience,
        label: 'Средний опыт (лет)',
        change: '+1',
        trend: 'up' as const
      },
      rating: {
        value: avgRating,
        label: 'Средний рейтинг',
        change: '+0.1',
        trend: 'up' as const
      },
      publications: {
        value: totalPublications,
        label: 'Публикаций',
        change: '+12',
        trend: 'up' as const
      }
    };
  }, [teachers]);

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'Профессор': return '#8b5cf6';
      case 'Доцент': return 'var(--accent-blue)';
      case 'Старший преподаватель': return 'var(--accent-green)';
      case 'Ассистент': return '#f59e0b';
      default: return 'var(--text-muted)';
    }
  };

  const getPositionIcon = (position: string) => {
    switch (position) {
      case 'Профессор': return <GraduationCap className="w-4 h-4" />;
      case 'Доцент': return <BookOpen className="w-4 h-4" />;
      case 'Старший преподаватель': return <User className="w-4 h-4" />;
      case 'Ассистент': return <Users className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down': return <ArrowDownRight className="w-3 h-3 text-red-500" />;
      case 'stable': return <ArrowUpRight className="w-3 h-3 text-blue-500" />;
    }
  };

  const renderStarRating = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
      />
    ));
  };

  const filteredTeachers = teachers.filter(teacher => 
    selectedDepartment === 'all' || teacher.department === selectedDepartment
  );

  const handleQuickAction = (actionId: string) => {
    const action = quickActions.find(a => a.id === actionId);
    // toast.success(`Выполняется: ${action?.title}`); // Убрано раздражающее уведомление
  };

  const handleDepartmentChange = (departmentId: string) => {
    setSelectedDepartment(departmentId);
    const departmentName = departments.find(d => d.id === departmentId)?.name || 'Все кафедры';
    // toast.success(`Переключение на: ${departmentName}`); // Убрано раздражающее уведомление
  };

  if (!mounted) {
    return (
      <div className="loading-dashboard">
        <div className="loading-content">
          <div className="loading-spinner-modern">
            <div className="spinner"></div>
          </div>
          <p>Загрузка преподавателей...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="schedule-compact">
      {/* Компактный заголовок */}
      <div className="schedule-header-compact">
        <div className="header-main">
          <Users className="w-6 h-6" />
          <div>
            <h1>Преподаватели</h1>
            <p>{teachersStats.total.value} преподавателей • {teachersStats.publications.value} публикаций</p>
          </div>
        </div>
        <div className="current-day-indicator">
          <span className="day-badge">
            <Star className="w-4 h-4" />
          </span>
          <span className="day-date">{teachersStats.rating.value}</span>
        </div>
      </div>

      {/* Основной компактный контент */}
      <div className="schedule-main-compact">
        {/* Верхний ряд - статистика и быстрые действия */}
        <div className="schedule-top-row">
          {/* Статистика преподавателей */}
          <div className="schedule-stats-compact">
            <div className="stats-header">
              <h3>Статистика</h3>
              <p>Обзор кафедр</p>
            </div>
            <div className="stats-grid-compact">
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Users className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{teachersStats.total.value}</span>
                  <span className="stat-label-compact">{teachersStats.total.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(teachersStats.total.trend)}
                    <span>{teachersStats.total.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{teachersStats.experience.value}</span>
                  <span className="stat-label-compact">{teachersStats.experience.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(teachersStats.experience.trend)}
                    <span>{teachersStats.experience.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Star className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{teachersStats.rating.value}</span>
                  <span className="stat-label-compact">{teachersStats.rating.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(teachersStats.rating.trend)}
                    <span>{teachersStats.rating.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{teachersStats.publications.value}</span>
                  <span className="stat-label-compact">{teachersStats.publications.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(teachersStats.publications.trend)}
                    <span>{teachersStats.publications.change}</span>
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
          {/* Навигация по кафедрам */}
          <div className="schedule-categories-compact">
            <div className="categories-header">
              <h3>Кафедры</h3>
              <p>Выберите кафедру</p>
            </div>
            <div className="categories-grid-compact">
              {departments.map((department) => (
                <button
                  key={department.id}
                  className={`category-card-compact ${selectedDepartment === department.id ? 'active' : ''}`}
                  onClick={() => handleDepartmentChange(department.id)}
                >
                  <div className="category-card-header">
                    <div className="category-icon">
                      <department.icon className="w-4 h-4" />
                    </div>
                    <span className="category-count">{department.count}</span>
                  </div>
                  <div className="category-card-content">
                    <span className="category-name">{department.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Содержимое преподавателей */}
          <div className="schedule-content-compact">
            <div className="schedule-content-header">
              <h3>
                {departments.find(d => d.id === selectedDepartment)?.name || 'Все кафедры'}
              </h3>
              <p>
                {filteredTeachers.length} {filteredTeachers.length === 1 ? 'преподаватель' : 'преподавателей'}
              </p>
            </div>
            
            <div className="courses-grid">
              {filteredTeachers.map((teacher) => (
                <div key={teacher.id} className="lesson-card-unified">
                  <div className="lesson-header">
                    <div className="lesson-type" style={{ backgroundColor: teacher.color }}>
                      {getPositionIcon(teacher.position)}
                    </div>
                    <div className="lesson-status" style={{ color: getPositionColor(teacher.position) }}>
                      <span>{teacher.position}</span>
                    </div>
                  </div>
                  
                  <div className="lesson-content">
                    <h3 className="lesson-title">{teacher.name}</h3>
                    <p className="course-description">{teacher.bio}</p>
                    
                    <div className="course-meta">
                      <div className="meta-item">
                        <Building className="w-4 h-4" />
                        <span>{teacher.department}</span>
                      </div>
                      <div className="meta-item">
                        <Award className="w-4 h-4" />
                        <span>{teacher.degree}</span>
                      </div>
                      <div className="meta-item">
                        <Calendar className="w-4 h-4" />
                        <span>{teacher.experience} лет опыта</span>
                      </div>
                    </div>

                    {/* Рейтинг преподавателя */}
                    <div className="teacher-rating-display">
                      <div className="rating-stars">
                        {renderStarRating(teacher.rating)}
                      </div>
                      <span className="rating-number">{teacher.rating}</span>
                      <span className="rating-label">({teacher.totalStudents} студентов)</span>
                    </div>

                    {/* Статистика преподавателя */}
                    <div className="teacher-stats-display">
                      <div className="stat-item-small">
                        <Users className="w-4 h-4" />
                        <span>{teacher.totalStudents}</span>
                        <small>студентов</small>
                      </div>
                      <div className="stat-item-small">
                        <FileText className="w-4 h-4" />
                        <span>{teacher.publications}</span>
                        <small>публикаций</small>
                      </div>
                      <div className="stat-item-small">
                        <BookOpen className="w-4 h-4" />
                        <span>{teacher.courses.length}</span>
                        <small>курсов</small>
                      </div>
                    </div>

                    {/* Рабочие часы */}
                    <div className="course-schedule">
                      <Clock className="w-4 h-4" />
                      <div className="schedule-list">
                        {teacher.workingHours.slice(0, 2).map((session, index) => (
                          <div key={index} className="schedule-item">
                            <span>{session.day}</span>
                            <span>{session.time}</span>
                            <span className="room">
                              <MapPin className="w-3 h-3" />
                              Консультации
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Специализации */}
                    <div className="course-tags">
                      {teacher.specializations.slice(0, 3).map((spec, index) => (
                        <span key={index} className="tag">{spec}</span>
                      ))}
                      {teacher.specializations.length > 3 && (
                        <span className="tag-more">+{teacher.specializations.length - 3}</span>
                      )}
                    </div>
                  </div>

                  <div className="lesson-footer">
                    <div className="teacher-contact-info">
                      <div className="contact-item-small">
                        <Mail className="w-3 h-3" />
                        <span>{teacher.email}</span>
                      </div>
                      <div className="contact-item-small">
                        <MapPin className="w-3 h-3" />
                        <span>{teacher.office}</span>
                      </div>
                    </div>
                    <div className="course-actions">
                      <button className="action-btn-small">
                        <Mail className="w-4 h-4" />
                        Написать
                      </button>
                      <button className="action-btn-small">
                        <Calendar className="w-4 h-4" />
                        Консультация
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredTeachers.length === 0 && (
              <div className="empty-state">
                <Users className="w-12 h-12" />
                <h3>Преподаватели не найдены</h3>
                <p>В выбранной кафедре нет преподавателей</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 