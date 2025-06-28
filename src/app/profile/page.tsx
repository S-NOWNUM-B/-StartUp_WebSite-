'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  User,
  Award,
  Activity,
  Settings,
  Star,
  Calendar,
  Mail,
  Phone,
  BookOpen,
  Users,
  Trophy,
  TrendingUp,
  TrendingDown,
  Camera,
  Edit,
  Share,
  CheckCircle,
  Target,
  Clock,
  Upload,
  Download,
  Shield,
  Bell,
  Palette,
  Lock,
  Globe,
  Eye,
  Heart,
  Bookmark,
  MoreHorizontal,
  UserCheck,
  MapPin,
  GraduationCap,
  Zap,
  ChevronRight,
  Plus,
  Trash2
} from 'lucide-react';

interface Achievement {
  id: number;
  title: string;
  description: string;
  type: 'academic' | 'social' | 'sport' | 'creative';
  date: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress?: number;
  isNew?: boolean;
}

interface Activity {
  id: number;
  type: 'grade' | 'assignment' | 'event' | 'achievement' | 'attendance';
  title: string;
  description: string;
  date: string;
  value?: string;
  isImportant?: boolean;
}

interface SkillProgress {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  category: 'technical' | 'soft' | 'academic';
  experience: number;
  nextLevelExp: number;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  badge?: string;
  isNew?: boolean;
}

export default function ProfilePageCompact() {
  const [selectedTab, setSelectedTab] = useState<string>('info');
  const [editMode, setEditMode] = useState(false);
  const [mounted, setMounted] = useState(true);

  const profile = {
    firstName: 'Иван',
    lastName: 'Петров',
    middleName: 'Александрович',
    email: 'ivan.petrov@university.edu',
    phone: '+7 (999) 123-45-67',
    studentId: 'ST2024001',
    group: 'ИС-301',
    course: 3,
    faculty: 'Факультет информационных технологий',
    specialization: 'Информационные системы и технологии',
    enrollmentDate: '2022-09-01',
    birthDate: '2002-03-15',
    location: 'Москва, Россия',
    gpa: 4.3,
    totalCredits: 150,
    avatar: null,
    bio: 'Студент 3 курса, увлекающийся веб-разработкой и машинным обучением. Активный участник студенческих проектов и научных конференций.',
    interests: ['Программирование', 'Искусственный интеллект', 'Спорт', 'Музыка'],
    socialMedia: {
      telegram: '@ivan_petrov',
      github: 'ivan-petrov',
      linkedin: 'ivan-petrov-dev'
    }
  };

  const achievements: Achievement[] = [
    { 
      id: 1, 
      title: 'Отличник учебы', 
      description: 'Средний балл выше 4.5 в течение семестра', 
      type: 'academic', 
      date: '2024-06-15', 
      rarity: 'epic',
      progress: 100,
      isNew: false
    },
    { 
      id: 2, 
      title: 'Лидер группы', 
      description: 'Активное участие в организации мероприятий', 
      type: 'social', 
      date: '2024-05-20', 
      rarity: 'rare',
      progress: 100,
      isNew: true
    },
    { 
      id: 3, 
      title: 'Инновационный проект', 
      description: 'Победа в конкурсе студенческих проектов', 
      type: 'academic', 
      date: '2024-04-10', 
      rarity: 'legendary',
      progress: 100
    },
    { 
      id: 4, 
      title: 'Спортивный чемпион', 
      description: '1 место в университетской лиге по футболу', 
      type: 'sport', 
      date: '2024-03-25', 
      rarity: 'epic',
      progress: 100
    },
    {
      id: 5,
      title: 'Мастер код-ревью',
      description: 'Проведено более 50 код-ревью',
      type: 'academic',
      date: '2024-12-01',
      rarity: 'rare',
      progress: 85,
      isNew: true
    }
  ];

  const recentActivities: Activity[] = [
    { 
      id: 1, 
      type: 'grade', 
      title: 'Получена отличная оценка', 
      description: 'Математический анализ', 
      date: '2024-12-15', 
      value: '5',
      isImportant: true
    },
    { 
      id: 2, 
      type: 'assignment', 
      title: 'Сдана курсовая работа', 
      description: 'Веб-разработка на React', 
      date: '2024-12-12',
      isImportant: false
    },
    { 
      id: 3, 
      type: 'event', 
      title: 'Участие в хакатоне', 
      description: 'Университетский хакатон по ИИ', 
      date: '2024-12-10',
      isImportant: true
    },
    { 
      id: 4, 
      type: 'achievement', 
      title: 'Получено достижение', 
      description: 'Лидер группы', 
      date: '2024-12-08',
      isImportant: true
    },
    {
      id: 5,
      type: 'attendance',
      title: 'Отличная посещаемость',
      description: 'Посещены все лекции за неделю',
      date: '2024-12-05',
      isImportant: false
    }
  ];

  const skills: SkillProgress[] = [
    { id: 'js', name: 'JavaScript', level: 8, maxLevel: 10, category: 'technical', experience: 850, nextLevelExp: 1000 },
    { id: 'react', name: 'React', level: 7, maxLevel: 10, category: 'technical', experience: 720, nextLevelExp: 800 },
    { id: 'python', name: 'Python', level: 6, maxLevel: 10, category: 'technical', experience: 590, nextLevelExp: 600 },
    { id: 'teamwork', name: 'Командная работа', level: 9, maxLevel: 10, category: 'soft', experience: 940, nextLevelExp: 1000 },
    { id: 'math', name: 'Математика', level: 8, maxLevel: 10, category: 'academic', experience: 820, nextLevelExp: 900 },
    { id: 'communication', name: 'Коммуникация', level: 7, maxLevel: 10, category: 'soft', experience: 710, nextLevelExp: 800 }
  ];

  const categories = [
    { id: 'info', name: 'Информация', count: null },
    { id: 'achievements', name: 'Достижения', count: achievements.length },
    { id: 'activity', name: 'Активность', count: recentActivities.length },
    { id: 'skills', name: 'Навыки', count: skills.length },
    { id: 'settings', name: 'Настройки', count: null }
  ];

  const quickActions: QuickAction[] = useMemo(() => {
    const newAchievements = achievements.filter(a => a.isNew).length;
    const incompleteSkills = skills.filter(s => s.level < s.maxLevel).length;
    
    return [
      {
        id: 'edit',
        title: 'РЕДАКТИРОВАТЬ',
        description: 'Изменить профиль',
        icon: <Edit className="w-4 h-4" />,
        color: 'var(--accent-blue)',
        badge: editMode ? 'ON' : undefined
      },
      {
        id: 'photo',
        title: 'ФОТО',
        description: 'Обновить аватар',
        icon: <Camera className="w-4 h-4" />,
        color: 'var(--accent-green)'
      },
      {
        id: 'achievements',
        title: 'ДОСТИЖЕНИЯ',
        description: 'Новые награды',
        icon: <Trophy className="w-4 h-4" />,
        color: '#f59e0b',
        badge: newAchievements > 0 ? `${newAchievements}` : undefined,
        isNew: newAchievements > 0
      },
      {
        id: 'share',
        title: 'ПОДЕЛИТЬСЯ',
        description: 'Экспорт профиля',
        icon: <Share className="w-4 h-4" />,
        color: '#8b5cf6'
      }
    ];
  }, [achievements, skills, editMode]);

  const profileStats = useMemo(() => {
    const completedAchievements = achievements.filter(a => a.progress === 100).length;
    const averageSkillLevel = Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length);
    const recentActivityCount = recentActivities.filter(a => {
      const activityDate = new Date(a.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return activityDate >= weekAgo;
    }).length;
    
    return {
      gpa: {
        value: profile.gpa,
        label: 'Средний балл',
        change: '+0.2',
        trend: 'up' as const
      },
      achievements: {
        value: completedAchievements,
        label: 'Достижений',
        change: '+2',
        trend: 'up' as const
      },
      skillLevel: {
        value: averageSkillLevel,
        label: 'Уровень навыков',
        change: '+1',
        trend: 'up' as const
      },
      activity: {
        value: recentActivityCount,
        label: 'Активность (неделя)',
        change: '+3',
        trend: 'up' as const
      }
    };
  }, [achievements, skills, recentActivities]);

  const getAchievementColor = (type: Achievement['type']) => {
    switch (type) {
      case 'academic': return 'var(--accent-blue)';
      case 'social': return 'var(--accent-green)';
      case 'sport': return '#f59e0b';
      case 'creative': return '#8b5cf6';
      default: return 'var(--text-secondary)';
    }
  };

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return '#6b7280';
      case 'rare': return '#3b82f6';
      case 'epic': return '#8b5cf6';
      case 'legendary': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'grade': return 'var(--accent-green)';
      case 'assignment': return 'var(--accent-blue)';
      case 'event': return '#8b5cf6';
      case 'achievement': return '#f59e0b';
      case 'attendance': return '#06b6d4';
      default: return 'var(--text-secondary)';
    }
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'grade': return <Star className="w-4 h-4" />;
      case 'assignment': return <CheckCircle className="w-4 h-4" />;
      case 'event': return <Calendar className="w-4 h-4" />;
      case 'achievement': return <Award className="w-4 h-4" />;
      case 'attendance': return <UserCheck className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getSkillCategoryColor = (category: SkillProgress['category']) => {
    switch (category) {
      case 'technical': return 'var(--accent-blue)';
      case 'soft': return 'var(--accent-green)';
      case 'academic': return '#f59e0b';
      default: return 'var(--text-secondary)';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-red-500" />;
      case 'stable': return <Target className="w-3 h-3 text-blue-500" />;
    }
  };

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'edit':
        setEditMode(!editMode);
        toast.success(editMode ? 'Режим редактирования выключен' : 'Режим редактирования включен');
        break;
      case 'photo':
        toast.success('Открытие редактора фото...');
        break;
      case 'achievements':
        setSelectedTab('achievements');
        toast.success('Переход к достижениям');
        break;
      case 'share':
        navigator.clipboard.writeText(`${profile.firstName} ${profile.lastName} - ${profile.specialization}`);
        toast.success('Информация профиля скопирована');
        break;
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedTab(categoryId);
    const categoryName = categories.find(c => c.id === categoryId)?.name || 'Информация';
    toast.success(`Переход: ${categoryName}`);
  };

  const handleProfileAction = (action: string, item?: any) => {
    const actions = {
      'edit-info': 'Редактирование основной информации',
      'view-achievement': `Просмотр достижения: ${item?.title}`,
      'share-achievement': `Поделиться достижением: ${item?.title}`,
      'view-activity': `Просмотр активности: ${item?.title}`,
      'upgrade-skill': `Улучшение навыка: ${item?.name}`,
      'privacy': 'Открытие настроек приватности',
      'notifications': 'Настройки уведомлений',
      'theme': 'Смена темы интерфейса',
      'security': 'Настройки безопасности'
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
          <p>Загрузка профиля...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-compact">
      {/* Компактный заголовок профиля */}
      <div className="profile-header-compact">
        <div className="header-main">
          <div className="profile-avatar-section">
            <div className="profile-avatar-large">
              {profile.avatar ? (
                <img src={profile.avatar} alt="Profile" />
              ) : (
                <User className="w-8 h-8" />
              )}
              <div className="avatar-status-indicator" />
            </div>
            <div className="profile-basic-info">
              <h1>{profile.firstName} {profile.lastName}</h1>
              <p>{profile.specialization} • Группа {profile.group} • {profile.course} курс</p>
              <div className="profile-quick-stats">
                <span className="quick-stat">
                  <GraduationCap className="w-4 h-4" />
                  GPA {profile.gpa}
                </span>
                <span className="quick-stat">
                  <Trophy className="w-4 h-4" />
                  {achievements.filter(a => a.progress === 100).length} достижений
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="current-profile-indicator">
          <span className="profile-badge">АКТИВЕН</span>
          <span className="profile-label">Статус</span>
        </div>
      </div>

      {/* Основной компактный контент профиля */}
      <div className="profile-main-compact">
        {/* Верхний ряд - статистика и быстрые действия */}
        <div className="profile-top-row">
          {/* Статистика профиля */}
          <motion.div 
            className="profile-stats-compact"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="stats-header">
              <h3>Статистика</h3>
              <p>Академические показатели</p>
            </div>
            <div className="stats-grid-compact">
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{profileStats.gpa.value}</span>
                  <span className="stat-label-compact">{profileStats.gpa.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(profileStats.gpa.trend)}
                    <span>{profileStats.gpa.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Trophy className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{profileStats.achievements.value}</span>
                  <span className="stat-label-compact">{profileStats.achievements.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(profileStats.achievements.trend)}
                    <span>{profileStats.achievements.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{profileStats.skillLevel.value}</span>
                  <span className="stat-label-compact">{profileStats.skillLevel.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(profileStats.skillLevel.trend)}
                    <span>{profileStats.skillLevel.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{profileStats.activity.value}</span>
                  <span className="stat-label-compact">{profileStats.activity.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(profileStats.activity.trend)}
                    <span>{profileStats.activity.change}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Быстрые действия профиля */}
          <motion.div 
            className="profile-actions-compact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4>Быстрые действия</h4>
            <div className="actions-grid-profile">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  className="action-btn-profile"
                  onClick={() => handleQuickAction(action.id)}
                  style={{ '--action-color': action.color } as React.CSSProperties}
                >
                  <div className="action-icon-profile">
                    {action.icon}
                    {action.badge && (
                      <span className="action-badge-profile">{action.badge}</span>
                    )}
                    {action.isNew && (
                      <div className="action-new-indicator" />
                    )}
                  </div>
                  <div className="action-content-profile">
                    <span className="action-title">{action.title}</span>
                    <span className="action-desc">{action.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Нижний ряд - разделы профиля и контент */}
        <div className="profile-bottom-row">
          {/* Навигация по разделам */}
          <motion.div 
            className="profile-categories-compact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="categories-header">
              <h3>Разделы</h3>
              <p>Навигация по профилю</p>
            </div>
            <div className="categories-grid-compact">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-card-compact ${selectedTab === category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  <div className="category-card-header">
                    <div className="category-icon">
                      {category.id === 'info' && <User className="w-4 h-4" />}
                      {category.id === 'achievements' && <Trophy className="w-4 h-4" />}
                      {category.id === 'activity' && <Activity className="w-4 h-4" />}
                      {category.id === 'skills' && <Zap className="w-4 h-4" />}
                      {category.id === 'settings' && <Settings className="w-4 h-4" />}
                    </div>
                    {category.count !== null && (
                      <div className="category-count">{category.count}</div>
                    )}
                  </div>
                  <div className="category-card-content">
                    <div className="category-name">{category.name}</div>
                    <div className="category-stats">
                      {category.count !== null && `${category.count} элементов`}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Основной контент профиля */}
          <motion.div 
            className="profile-content-compact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="profile-content-header">
              <div>
                <h3>
                  {categories.find(c => c.id === selectedTab)?.name || 'Информация'}
                </h3>
                <p>
                  {selectedTab === 'info' && 'Основная информация о студенте'}
                  {selectedTab === 'achievements' && `${achievements.length} достижений в коллекции`}
                  {selectedTab === 'activity' && `${recentActivities.length} недавних активностей`}
                  {selectedTab === 'skills' && `${skills.length} навыков в развитии`}
                  {selectedTab === 'settings' && 'Настройки профиля и приватности'}
                </p>
              </div>
              {editMode && (
                <button 
                  className="edit-mode-indicator"
                  onClick={() => setEditMode(false)}
                >
                  <Edit className="w-4 h-4" />
                  <span>Режим редактирования</span>
                </button>
              )}
            </div>

            <div className="profile-content-area">
              {selectedTab === 'info' && (
                <div className="profile-info-section">
                  {/* Основная информация */}
                  <div className="info-card">
                    <div className="info-card-header">
                      <User className="w-5 h-5" />
                      <h4>Персональные данные</h4>
                      {editMode && (
                        <button 
                          className="edit-section-btn"
                          onClick={() => handleProfileAction('edit-info')}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">ФИО</span>
                        <span className="info-value">{profile.firstName} {profile.lastName} {profile.middleName}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Email</span>
                        <span className="info-value">{profile.email}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Телефон</span>
                        <span className="info-value">{profile.phone}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Студенческий ID</span>
                        <span className="info-value">{profile.studentId}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Группа</span>
                        <span className="info-value">{profile.group}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Курс</span>
                        <span className="info-value">{profile.course}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Специализация</span>
                        <span className="info-value">{profile.specialization}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Факультет</span>
                        <span className="info-value">{profile.faculty}</span>
                      </div>
                    </div>
                  </div>

                  {/* Академическая информация */}
                  <div className="info-card">
                    <div className="info-card-header">
                      <GraduationCap className="w-5 h-5" />
                      <h4>Академическая информация</h4>
                    </div>
                    <div className="academic-stats">
                      <div className="academic-stat">
                        <div className="stat-icon">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <div className="stat-content">
                          <span className="stat-value">{profile.gpa}</span>
                          <span className="stat-label">Средний балл</span>
                        </div>
                      </div>
                      <div className="academic-stat">
                        <div className="stat-icon">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div className="stat-content">
                          <span className="stat-value">{profile.totalCredits}</span>
                          <span className="stat-label">Кредитов набрано</span>
                        </div>
                      </div>
                      <div className="academic-stat">
                        <div className="stat-icon">
                          <Target className="w-4 h-4" />
                        </div>
                        <div className="stat-content">
                          <span className="stat-value">{Math.round((profile.totalCredits / 240) * 100)}%</span>
                          <span className="stat-label">Прогресс обучения</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Дополнительная информация */}
                  <div className="info-card">
                    <div className="info-card-header">
                      <Heart className="w-5 h-5" />
                      <h4>О себе</h4>
                    </div>
                    <div className="bio-section">
                      <p className="bio-text">{profile.bio}</p>
                      <div className="interests-section">
                        <h5>Интересы:</h5>
                        <div className="interests-tags">
                          {profile.interests.map((interest, index) => (
                            <span key={index} className="interest-tag">
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'achievements' && (
                <div className="achievements-section">
                  <div className="achievements-grid">
                    {achievements.map((achievement) => (
                      <div key={achievement.id} className="achievement-card">
                        <div className="achievement-header">
                          <div 
                            className="achievement-icon"
                            style={{ backgroundColor: getAchievementColor(achievement.type) }}
                          >
                            {achievement.type === 'academic' && <BookOpen className="w-4 h-4" />}
                            {achievement.type === 'social' && <Users className="w-4 h-4" />}
                            {achievement.type === 'sport' && <Trophy className="w-4 h-4" />}
                            {achievement.type === 'creative' && <Star className="w-4 h-4" />}
                          </div>
                          <div className="achievement-rarity">
                            <div 
                              className="rarity-indicator"
                              style={{ backgroundColor: getRarityColor(achievement.rarity) }}
                            />
                            <span className="rarity-text">{achievement.rarity}</span>
                          </div>
                          {achievement.isNew && <div className="achievement-new-badge">NEW</div>}
                        </div>
                        <div className="achievement-content">
                          <h4 className="achievement-title">{achievement.title}</h4>
                          <p className="achievement-description">{achievement.description}</p>
                          <div className="achievement-date">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(achievement.date).toLocaleDateString('ru-RU')}</span>
                          </div>
                          {achievement.progress !== undefined && achievement.progress < 100 && (
                            <div className="achievement-progress">
                              <div className="progress-bar">
                                <div 
                                  className="progress-fill"
                                  style={{ width: `${achievement.progress}%` }}
                                />
                              </div>
                              <span className="progress-text">{achievement.progress}%</span>
                            </div>
                          )}
                        </div>
                        <div className="achievement-actions">
                          <button 
                            className="achievement-btn view"
                            onClick={() => handleProfileAction('view-achievement', achievement)}
                          >
                            <Eye className="w-3 h-3" />
                          </button>
                          <button 
                            className="achievement-btn share"
                            onClick={() => handleProfileAction('share-achievement', achievement)}
                          >
                            <Share className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === 'activity' && (
                <div className="activity-section">
                  <div className="activity-list">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="activity-card">
                        <div className="activity-header">
                          <div 
                            className="activity-icon"
                            style={{ backgroundColor: getActivityColor(activity.type) }}
                          >
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="activity-date">
                            {new Date(activity.date).toLocaleDateString('ru-RU')}
                          </div>
                          {activity.isImportant && (
                            <div className="activity-important-indicator">
                              <Zap className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                        <div className="activity-content">
                          <h4 className="activity-title">{activity.title}</h4>
                          <p className="activity-description">{activity.description}</p>
                          {activity.value && (
                            <div className="activity-value">
                              <strong>Результат: {activity.value}</strong>
                            </div>
                          )}
                        </div>
                        <div className="activity-actions">
                          <button 
                            className="activity-btn"
                            onClick={() => handleProfileAction('view-activity', activity)}
                          >
                            <Eye className="w-4 h-4" />
                            <span>Подробнее</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === 'skills' && (
                <div className="skills-section">
                  <div className="skills-grid">
                    {skills.map((skill) => (
                      <div key={skill.id} className="skill-card">
                        <div className="skill-header">
                          <div className="skill-info">
                            <h4 className="skill-name">{skill.name}</h4>
                            <span className="skill-category">
                              {skill.category === 'technical' && 'Технические'}
                              {skill.category === 'soft' && 'Мягкие навыки'}
                              {skill.category === 'academic' && 'Академические'}
                            </span>
                          </div>
                          <div className="skill-level">
                            <span className="level-text">{skill.level}/{skill.maxLevel}</span>
                          </div>
                        </div>
                        <div className="skill-progress">
                          <div className="skill-progress-bar">
                            <div 
                              className="skill-progress-fill"
                              style={{ 
                                width: `${(skill.level / skill.maxLevel) * 100}%`,
                                backgroundColor: getSkillCategoryColor(skill.category)
                              }}
                            />
                          </div>
                          <div className="skill-experience">
                            <span>{skill.experience}/{skill.nextLevelExp} XP</span>
                          </div>
                        </div>
                        {skill.level < skill.maxLevel && (
                          <div className="skill-actions">
                            <button 
                              className="skill-upgrade-btn"
                              onClick={() => handleProfileAction('upgrade-skill', skill)}
                            >
                              <Plus className="w-3 h-3" />
                              <span>Развить</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === 'settings' && (
                <div className="settings-section">
                  <div className="settings-grid">
                    <div className="settings-card">
                      <div className="settings-card-header">
                        <Shield className="w-5 h-5" />
                        <h4>Приватность</h4>
                      </div>
                      <div className="settings-content">
                        <p>Управление видимостью профиля и персональной информации</p>
                        <button 
                          className="settings-btn"
                          onClick={() => handleProfileAction('privacy')}
                        >
                          <Lock className="w-4 h-4" />
                          <span>Настроить</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="settings-card">
                      <div className="settings-card-header">
                        <Bell className="w-5 h-5" />
                        <h4>Уведомления</h4>
                      </div>
                      <div className="settings-content">
                        <p>Настройка email и push-уведомлений</p>
                        <button 
                          className="settings-btn"
                          onClick={() => handleProfileAction('notifications')}
                        >
                          <Settings className="w-4 h-4" />
                          <span>Настроить</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="settings-card">
                      <div className="settings-card-header">
                        <Palette className="w-5 h-5" />
                        <h4>Тема интерфейса</h4>
                      </div>
                      <div className="settings-content">
                        <p>Выбор темы оформления и цветовой схемы</p>
                        <button 
                          className="settings-btn"
                          onClick={() => handleProfileAction('theme')}
                        >
                          <Eye className="w-4 h-4" />
                          <span>Изменить</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="settings-card">
                      <div className="settings-card-header">
                        <Lock className="w-5 h-5" />
                        <h4>Безопасность</h4>
                      </div>
                      <div className="settings-content">
                        <p>Смена пароля и двухфакторная аутентификация</p>
                        <button 
                          className="settings-btn"
                          onClick={() => handleProfileAction('security')}
                        >
                          <Shield className="w-4 h-4" />
                          <span>Настроить</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
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