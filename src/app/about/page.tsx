'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  GraduationCap,
  Users, 
  Award,
  BookOpen, 
  Calendar,
  MapPin, 
  Phone, 
  Mail, 
  Globe,
  Star,
  TrendingUp,
  Building,
  Target,
  Heart,
  Lightbulb,
  Trophy,
  ChevronRight,
  ExternalLink,
  Download,
  Share,
  Eye,
  User,
  ArrowUpRight
} from 'lucide-react';

interface Faculty {
  id: number;
  name: string;
  description: string;
  students: number;
  teachers: number;
  programs: number;
  rating: number;
}

interface Achievement {
  id: number;
  year: string;
  title: string;
  description: string;
  category: 'academic' | 'research' | 'infrastructure' | 'international';
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  badge?: string;
}

export default function AboutPageCompact() {
  const [selectedTab, setSelectedTab] = useState<string>('overview');
  const [mounted, setMounted] = useState(true);

  const faculties: Faculty[] = [
    {
      id: 1,
      name: 'Факультет информационных технологий',
      description: 'Современные IT-специальности и инновационные программы обучения',
      students: 1250,
      teachers: 89,
      programs: 8,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Экономический факультет',
      description: 'Подготовка экономистов и менеджеров международного уровня',
      students: 980,
      teachers: 67,
      programs: 6,
      rating: 4.6
    },
    {
      id: 3,
      name: 'Юридический факультет',
      description: 'Фундаментальное юридическое образование и правовая практика',
      students: 760,
      teachers: 54,
      programs: 5,
      rating: 4.7
    },
    {
      id: 4,
      name: 'Медицинский факультет',
      description: 'Подготовка врачей с использованием современного оборудования',
      students: 650,
      teachers: 78,
      programs: 7,
      rating: 4.9
    }
  ];

  const achievements: Achievement[] = [
    {
      id: 1,
      year: '2024',
      title: 'Топ-5 университетов России',
      description: 'Университет вошел в топ-5 лучших университетов России по версии международного рейтинга',
      category: 'academic'
    },
    {
      id: 2,
      year: '2023',
      title: 'Открытие научно-исследовательского центра',
      description: 'Запущен современный центр квантовых вычислений и искусственного интеллекта',
      category: 'infrastructure'
    },
    {
      id: 3,
      year: '2022',
      title: 'Международная аккредитация',
      description: 'Получена аккредитация от Европейской ассоциации университетов',
      category: 'international'
    },
    {
      id: 4,
      year: '2021',
      title: 'Прорыв в исследованиях',
      description: 'Научная группа университета совершила важное открытие в области медицины',
      category: 'research'
    }
  ];

  const categories = [
    { id: 'overview', name: 'Обзор', count: null },
    { id: 'faculties', name: 'Факультеты', count: faculties.length },
    { id: 'achievements', name: 'Достижения', count: achievements.length },
    { id: 'contacts', name: 'Контакты', count: null }
  ];

  const quickActions: QuickAction[] = useMemo(() => [
    {
      id: 'virtual-tour',
      title: 'ВИРТУАЛЬНЫЙ ТУР',
      description: 'Экскурсия по кампусу',
      icon: <Eye className="w-4 h-4" />,
      color: 'var(--accent-blue)',
      badge: '360°'
    },
    {
      id: 'brochure',
      title: 'БРОШЮРА',
      description: 'Скачать каталог',
      icon: <Download className="w-4 h-4" />,
      color: 'var(--accent-green)'
    },
    {
      id: 'schedule',
      title: 'РАСПИСАНИЕ',
      description: 'Дни открытых дверей',
      icon: <Calendar className="w-4 h-4" />,
      color: 'var(--accent-blue)'
    },
    {
      id: 'share',
      title: 'ПОДЕЛИТЬСЯ',
      description: 'Рассказать друзьям',
      icon: <Share className="w-4 h-4" />,
      color: 'var(--accent-green)'
    }
  ], []);

  const aboutStats = useMemo(() => {
    const totalStudents = faculties.reduce((sum, faculty) => sum + faculty.students, 0);
    const totalTeachers = faculties.reduce((sum, faculty) => sum + faculty.teachers, 0);
    const totalPrograms = faculties.reduce((sum, faculty) => sum + faculty.programs, 0);
    const avgRating = faculties.reduce((sum, faculty) => sum + faculty.rating, 0) / faculties.length;

    return {
      students: {
        value: totalStudents,
        label: 'Студентов',
        change: '+12%',
        trend: 'up' as const
      },
      teachers: {
        value: totalTeachers,
        label: 'Преподавателей',
        change: '+8%',
        trend: 'up' as const
      },
      programs: {
        value: totalPrograms,
        label: 'Программ',
        change: '+3',
        trend: 'up' as const
      },
      rating: {
        value: Number(avgRating.toFixed(1)),
        label: 'Рейтинг',
        change: '+0.2',
        trend: 'up' as const
      }
    };
  }, [faculties]);

  const getCategoryColor = (category: Achievement['category']) => {
    switch (category) {
      case 'academic': return 'var(--accent-blue)';
      case 'research': return 'var(--accent-green)';
      case 'infrastructure': return '#f59e0b';
      case 'international': return '#8b5cf6';
      default: return 'var(--text-secondary)';
    }
  };

  const getCategoryName = (category: Achievement['category']) => {
    switch (category) {
      case 'academic': return 'Академия';
      case 'research': return 'Исследования';
      case 'infrastructure': return 'Инфраструктура';
      case 'international': return 'Международное';
      default: return 'Общее';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down': return <ArrowUpRight className="w-3 h-3 text-red-500" />;
      case 'stable': return <Target className="w-3 h-3 text-blue-500" />;
    }
  };

  const handleQuickAction = (actionId: string) => {
    const action = quickActions.find(a => a.id === actionId);
    toast.success(`Выполняется: ${action?.title}`);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedTab(categoryId);
    const categoryName = categories.find(c => c.id === categoryId)?.name || 'Обзор';
    toast.success(`Переход: ${categoryName}`);
  };

  const handleAboutAction = (action: string, item?: any) => {
    const actions = {
      'view-faculty': `Просмотр факультета: ${item?.name}`,
      'view-achievement': `Просмотр достижения: ${item?.title}`,
      'contact-university': 'Связаться с университетом',
      'apply': 'Подача заявления на поступление'
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
          <p>Загрузка информации...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="about-compact">
      {/* Компактный заголовок */}
      <div className="about-header-compact">
        <div className="header-main">
          <GraduationCap className="w-6 h-6" />
          <div>
            <h1>О университете</h1>
            <p>{aboutStats.students.value} студентов • {aboutStats.teachers.value} преподавателей • 95 лет excellence</p>
          </div>
        </div>
        <div className="current-about-indicator">
          <span className="about-badge">★ {aboutStats.rating.value}</span>
          <span className="about-label">Рейтинг</span>
        </div>
      </div>

      {/* Основной компактный контент */}
      <div className="about-main-compact">
        {/* Верхний ряд - статистика и быстрые действия */}
        <div className="about-top-row">
          {/* Статистика университета */}
          <motion.div 
            className="about-stats-compact"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="stats-header">
              <h3>Статистика</h3>
              <p>Ключевые показатели университета</p>
            </div>
            <div className="stats-grid-compact">
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Users className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{aboutStats.students.value}</span>
                  <span className="stat-label-compact">{aboutStats.students.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(aboutStats.students.trend)}
                    <span>{aboutStats.students.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <User className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{aboutStats.teachers.value}</span>
                  <span className="stat-label-compact">{aboutStats.teachers.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(aboutStats.teachers.trend)}
                    <span>{aboutStats.teachers.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{aboutStats.programs.value}</span>
                  <span className="stat-label-compact">{aboutStats.programs.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(aboutStats.programs.trend)}
                    <span>{aboutStats.programs.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Star className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{aboutStats.rating.value}</span>
                  <span className="stat-label-compact">{aboutStats.rating.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(aboutStats.rating.trend)}
                    <span>{aboutStats.rating.change}</span>
                  </div>
        </div>
            </div>
            </div>
      </motion.div>

          {/* Быстрые действия */}
        <motion.div 
            className="about-actions-compact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
        >
            <h4>Быстрые действия</h4>
            <div className="actions-grid-about">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.id}
                  className="action-btn-about"
                  onClick={() => handleQuickAction(action.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="action-icon-about" style={{ color: action.color }}>
                    {action.icon}
                  </div>
                  {action.badge && (
                    <div className="action-badge-about" style={{ color: action.color }}>
                      {action.badge}
                    </div>
                  )}
                  <div className="action-content-about">
                    <span className="action-title">{action.title}</span>
                    <span className="action-desc">{action.description}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
          </div>

        {/* Нижний ряд - категории и контент */}
        <div className="about-bottom-row">
          {/* Категории */}
          <motion.div 
            className="about-categories-compact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
              >
            <div className="categories-header">
              <h3>Разделы</h3>
              <p>Информация о университете</p>
            </div>
            <div className="categories-grid-compact">
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  className={`category-card-compact ${selectedTab === category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
              >
                  <div className="category-card-header">
                    <div className="category-icon">
                      {category.id === 'overview' && <GraduationCap className="w-4 h-4" />}
                      {category.id === 'faculties' && <Building className="w-4 h-4" />}
                      {category.id === 'achievements' && <Trophy className="w-4 h-4" />}
                      {category.id === 'contacts' && <Phone className="w-4 h-4" />}
                    </div>
                    {category.count && (
                      <div className="category-count">{category.count}</div>
                    )}
                      </div>
                  <div className="category-card-content">
                    <div className="category-name">{category.name}</div>
                    </div>
                </motion.button>
              ))}
                    </div>
                  </motion.div>

          {/* Контент */}
                  <motion.div
            className="about-content-compact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
                  >
            <div className="about-content-header">
              <h3>{categories.find(c => c.id === selectedTab)?.name || 'Обзор'}</h3>
              <p>Подробная информация</p>
                    </div>
                    
            <div className="about-content-area">
              {selectedTab === 'overview' && (
                <div className="overview-section">
                  <div className="info-card">
                    <div className="info-card-header">
                      <Target className="w-5 h-5" />
                      <h4>Миссия</h4>
                    </div>
                    <p>Формируем будущее через качественное образование, инновационные исследования и подготовку высококвалифицированных специалистов для развития общества и экономики.</p>
                    </div>
                    
                  <div className="info-card">
                    <div className="info-card-header">
                      <Lightbulb className="w-5 h-5" />
                      <h4>Видение</h4>
                    </div>
                    <p>Стать ведущим университетом России, признанным на международном уровне центром образования, науки и инноваций, готовящим лидеров будущего.</p>
                    </div>
                    
                  <div className="info-card">
                    <div className="info-card-header">
                      <Heart className="w-5 h-5" />
                      <h4>Ценности</h4>
                    </div>
                    <p>Качество образования, научная честность, инновационность, открытость к сотрудничеству, уважение к личности и непрерывное развитие.</p>
                    </div>
                </div>
              )}

              {selectedTab === 'faculties' && (
                <div className="faculties-section">
                  <div className="faculties-grid">
                    {faculties.map((faculty, index) => (
                <motion.div
                  key={faculty.id}
                        className="faculty-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleAboutAction('view-faculty', faculty)}
                >
                        <div className="faculty-header">
                          <div className="faculty-icon">
                            <Building className="w-5 h-5" />
                  </div>
                          <div className="faculty-rating">
                            <Star className="w-4 h-4" />
                            <span>{faculty.rating}</span>
                        </div>
                        </div>
                        <h4>{faculty.name}</h4>
                        <p>{faculty.description}</p>
                        <div className="faculty-stats">
                          <div className="faculty-stat">
                            <span>{faculty.students}</span>
                            <small>студентов</small>
                      </div>
                          <div className="faculty-stat">
                            <span>{faculty.teachers}</span>
                            <small>преподавателей</small>
                        </div>
                          <div className="faculty-stat">
                            <span>{faculty.programs}</span>
                            <small>программ</small>
                        </div>
                      </div>
                    </motion.div>
                    ))}
                  </div>
            </div>
              )}

              {selectedTab === 'achievements' && (
                <div className="achievements-section">
                  <div className="achievements-list">
                    {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                        className="achievement-card"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleAboutAction('view-achievement', achievement)}
                      >
                        <div className="achievement-year">{achievement.year}</div>
                        <div className="achievement-content">
                          <div className="achievement-header">
                            <h4>{achievement.title}</h4>
                        <div 
                              className="achievement-category"
                              style={{ color: getCategoryColor(achievement.category) }}
                        >
                              {getCategoryName(achievement.category)}
                        </div>
                      </div>
                          <p>{achievement.description}</p>
                        </div>
                        <ChevronRight className="w-4 h-4" />
                </motion.div>
              ))}
            </div>
                </div>
              )}

              {selectedTab === 'contacts' && (
                <div className="contacts-section">
                  <div className="contacts-grid">
                    <div className="contact-card">
                      <div className="contact-icon">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <h4>Адрес</h4>
                      <p>г. Москва, ул. Университетская, д. 1</p>
                    </div>
                    
                    <div className="contact-card">
                      <div className="contact-icon">
                        <Phone className="w-5 h-5" />
                      </div>
                      <h4>Телефон</h4>
                      <p>+7 (495) 123-45-67</p>
                    </div>
                    
                    <div className="contact-card">
                      <div className="contact-icon">
                        <Mail className="w-5 h-5" />
                      </div>
                      <h4>Email</h4>
                      <p>info@university.edu</p>
                    </div>
                    
                    <div className="contact-card">
                      <div className="contact-icon">
                        <Globe className="w-5 h-5" />
                      </div>
                      <h4>Сайт</h4>
                      <p>www.university.edu</p>
                      </div>
                    </div>
                    
                  <div className="apply-section">
                    <h4>Поступление</h4>
                    <p>Заинтересованы в поступлении? Подайте заявку онлайн или свяжитесь с приемной комиссией.</p>
                    <button 
                      className="btn-primary-custom"
                      onClick={() => handleAboutAction('apply')}
                    >
                      Подать заявление
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </button>
                    </div>
                </div>
              )}
            </div>
        </motion.div>
        </div>
      </div>
    </div>
  );
} 