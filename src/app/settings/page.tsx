'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Eye,
  Database,
  Download,
  Upload,
  Trash2,
  Save,
  RefreshCw,
  Check,
  X,
  Camera,
  Edit,
  Mail,
  Phone,
  Lock,
  Monitor,
  Smartphone,
  TrendingUp,
  Volume2,
  Moon,
  Sun,
  Languages,
  AlertCircle,
  ChevronRight
} from 'lucide-react';

interface SettingsCategory {
  id: string;
  name: string;
  count?: number;
  icon: React.ReactNode;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  badge?: string;
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  deadlines: boolean;
  grades: boolean;
  events: boolean;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string | null;
}

interface ActiveSession {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
}

export default function SettingsPageCompact() {
  const [selectedTab, setSelectedTab] = useState<string>('profile');
  const [mounted, setMounted] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: 'Иван',
    lastName: 'Петров',
    email: 'ivan.petrov@university.edu',
    phone: '+7 (999) 123-45-67',
    avatar: null
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    push: true,
    sms: false,
    deadlines: true,
    grades: true,
    events: false
  });

  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('ru');
  const [fontSize, setFontSize] = useState('medium');

  const categories: SettingsCategory[] = [
    { id: 'profile', name: 'Профиль', icon: <User className="w-4 h-4" /> },
    { id: 'notifications', name: 'Уведомления', count: Object.values(notifications).filter(Boolean).length, icon: <Bell className="w-4 h-4" /> },
    { id: 'privacy', name: 'Приватность', icon: <Shield className="w-4 h-4" /> },
    { id: 'appearance', name: 'Внешний вид', icon: <Palette className="w-4 h-4" /> },
    { id: 'data', name: 'Данные', icon: <Database className="w-4 h-4" /> }
  ];

  const quickActions: QuickAction[] = useMemo(() => [
    {
      id: 'save',
      title: 'СОХРАНИТЬ',
      description: 'Применить изменения',
      icon: <Save className="w-4 h-4" />,
      color: 'var(--accent-green)',
      badge: hasUnsavedChanges ? 'NEW' : undefined
    },
    {
      id: 'reset',
      title: 'СБРОС',
      description: 'По умолчанию',
      icon: <RefreshCw className="w-4 h-4" />,
      color: 'var(--accent-blue)'
    },
    {
      id: 'export',
      title: 'ЭКСПОРТ',
      description: 'Настройки в файл',
      icon: <Download className="w-4 h-4" />,
      color: 'var(--accent-blue)'
    },
    {
      id: 'import',
      title: 'ИМПОРТ',
      description: 'Загрузить настройки',
      icon: <Upload className="w-4 h-4" />,
      color: 'var(--accent-green)'
    }
  ], [hasUnsavedChanges]);

  const activeSessions: ActiveSession[] = [
    {
      id: '1',
      device: 'Desktop - Chrome',
      location: 'Москва, Россия',
      lastActive: '2024-12-20T14:30:00Z',
      current: true
    },
    {
      id: '2',
      device: 'Mobile - Safari',
      location: 'Москва, Россия',
      lastActive: '2024-12-19T18:15:00Z',
      current: false
    }
  ];

  const settingsStats = useMemo(() => {
    const enabledNotifications = Object.values(notifications).filter(Boolean).length;
    const totalSessions = activeSessions.length;
    const securityScore = 85; // Пример
    
    return {
      notifications: {
        value: enabledNotifications,
        label: 'Уведомлений активно',
        change: '+2',
        trend: 'up' as const
      },
      sessions: {
        value: totalSessions,
        label: 'Активных сессий',
        change: '0',
        trend: 'stable' as const
      },
      security: {
        value: securityScore,
        label: 'Уровень безопасности',
        change: '+5%',
        trend: 'up' as const
      },
      storage: {
        value: 2.1,
        label: 'ГБ данных',
        change: '+0.3',
        trend: 'up' as const
      }
    };
  }, [notifications, activeSessions]);

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down': return <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />;
      case 'stable': return <TrendingUp className="w-3 h-3 text-blue-500" />;
    }
  };

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'save':
        setHasUnsavedChanges(false);
        toast.success('Настройки сохранены');
        break;
      case 'reset':
        setShowModal(true);
        break;
      case 'export':
        toast.success('Экспорт настроек...');
        break;
      case 'import':
        toast.success('Импорт настроек...');
        break;
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedTab(categoryId);
    const categoryName = categories.find(c => c.id === categoryId)?.name || 'Настройки';
    toast.success(`Переход: ${categoryName}`);
  };

  const handleProfileChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    setHasUnsavedChanges(true);
  };

  const handleAvatarUpload = () => {
    toast.success('Загрузка аватара...');
    setHasUnsavedChanges(true);
  };

  if (!mounted) {
    return (
      <div className="loading-dashboard">
        <div className="loading-content">
          <div className="loading-spinner-modern">
            <div className="spinner"></div>
          </div>
          <p>Загрузка настроек...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-compact">
      {/* Компактный заголовок */}
      <div className="settings-header-compact">
        <div className="header-main">
          <Settings className="w-6 h-6" />
          <div>
            <h1>Настройки</h1>
            <p>Персонализация и управление аккаунтом</p>
          </div>
          {hasUnsavedChanges && (
            <div className="unsaved-indicator">
              <AlertCircle className="w-4 h-4" />
              <span>Есть несохраненные изменения</span>
            </div>
          )}
        </div>
        <div className="current-settings-indicator">
          <span className="settings-badge">{settingsStats.security.value}%</span>
          <span className="settings-label">Безопасность</span>
        </div>
      </div>

      {/* Основной компактный контент */}
      <div className="settings-main-compact">
        {/* Верхний ряд - статистика и быстрые действия */}
        <div className="settings-top-row">
          {/* Статистика настроек */}
      <motion.div 
            className="settings-stats-compact"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
      >
            <div className="stats-header">
              <h3>Статистика</h3>
              <p>Текущее состояние настроек</p>
            </div>
            <div className="stats-grid-compact">
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Bell className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{settingsStats.notifications.value}</span>
                  <span className="stat-label-compact">{settingsStats.notifications.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(settingsStats.notifications.trend)}
                    <span>{settingsStats.notifications.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Monitor className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{settingsStats.sessions.value}</span>
                  <span className="stat-label-compact">{settingsStats.sessions.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(settingsStats.sessions.trend)}
                    <span>{settingsStats.sessions.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{settingsStats.security.value}%</span>
                  <span className="stat-label-compact">{settingsStats.security.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(settingsStats.security.trend)}
                    <span>{settingsStats.security.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Database className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{settingsStats.storage.value}</span>
                  <span className="stat-label-compact">{settingsStats.storage.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(settingsStats.storage.trend)}
                    <span>{settingsStats.storage.change}</span>
                  </div>
                </div>
              </div>
            </div>
      </motion.div>

          {/* Быстрые действия */}
        <motion.div 
            className="settings-actions-compact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
        >
            <h4>Быстрые действия</h4>
            <div className="actions-grid-settings">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.id}
                  className="action-btn-settings"
                  onClick={() => handleQuickAction(action.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="action-icon-settings" style={{ color: action.color }}>
                    {action.icon}
                  </div>
                  {action.badge && (
                    <div className="action-badge-settings" style={{ color: action.color }}>
                      {action.badge}
                    </div>
                  )}
                  <div className="action-content-settings">
                    <span className="action-title">{action.title}</span>
                    <span className="action-desc">{action.description}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
          </div>

        {/* Нижний ряд - категории и контент */}
        <div className="settings-bottom-row">
          {/* Категории */}
          <motion.div 
            className="settings-categories-compact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
              >
            <div className="categories-header">
              <h3>Разделы</h3>
              <p>Настройки аккаунта</p>
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
                      {category.icon}
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
            className="settings-content-compact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <div className="settings-content-header">
              <h3>{categories.find(c => c.id === selectedTab)?.name || 'Настройки'}</h3>
              <p>Управление параметрами</p>
                </div>
                
            <div className="settings-content-area">
              {selectedTab === 'profile' && (
                <div className="profile-section">
                  <div className="settings-card">
                    <div className="card-header">
                      <User className="w-5 h-5" />
                      <h4>Основная информация</h4>
                    </div>
                    <div className="card-content">
                      <div className="avatar-section">
                        <div className="avatar-preview">
                          {profileData.avatar ? (
                            <img src={profileData.avatar} alt="Avatar" />
                          ) : (
                            <User className="w-8 h-8" />
                          )}
                      </div>
                        <button className="avatar-upload-btn" onClick={handleAvatarUpload}>
                          <Camera className="w-4 h-4" />
                          Загрузить фото
                        </button>
                    </div>
                    
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Имя</label>
                          <input
                            type="text"
                            value={profileData.firstName}
                            onChange={(e) => handleProfileChange('firstName', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Фамилия</label>
                          <input
                            type="text"
                            value={profileData.lastName}
                            onChange={(e) => handleProfileChange('lastName', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <div className="input-with-icon">
                            <Mail className="input-icon" />
                        <input
                          type="email"
                          value={profileData.email}
                              onChange={(e) => handleProfileChange('email', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Телефон</label>
                          <div className="input-with-icon">
                            <Phone className="input-icon" />
                        <input
                          type="tel"
                          value={profileData.phone}
                              onChange={(e) => handleProfileChange('phone', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'notifications' && (
                <div className="notifications-section">
                  <div className="settings-card">
                    <div className="card-header">
                      <Bell className="w-5 h-5" />
                      <h4>Способы доставки</h4>
                        </div>
                    <div className="card-content">
                      <div className="notification-toggle">
                        <span>Email уведомления</span>
                        <button 
                          className={`toggle-btn ${notifications.email ? 'enabled' : 'disabled'}`}
                          onClick={() => handleNotificationChange('email')}
                        >
                          {notifications.email ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="notification-toggle">
                        <span>Push уведомления</span>
                        <button 
                          className={`toggle-btn ${notifications.push ? 'enabled' : 'disabled'}`}
                          onClick={() => handleNotificationChange('push')}
                        >
                          {notifications.push ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="notification-toggle">
                        <span>SMS уведомления</span>
                        <button 
                          className={`toggle-btn ${notifications.sms ? 'enabled' : 'disabled'}`}
                          onClick={() => handleNotificationChange('sms')}
                    >
                          {notifications.sms ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                        </button>
                      </div>
                        </div>
                      </div>
                      
                  <div className="settings-card">
                    <div className="card-header">
                      <Volume2 className="w-5 h-5" />
                      <h4>Типы уведомлений</h4>
                        </div>
                    <div className="card-content">
                      <div className="notification-toggle">
                        <span>Сроки сдачи работ</span>
                        <button 
                          className={`toggle-btn ${notifications.deadlines ? 'enabled' : 'disabled'}`}
                          onClick={() => handleNotificationChange('deadlines')}
                        >
                          {notifications.deadlines ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="notification-toggle">
                        <span>Новые оценки</span>
                        <button 
                          className={`toggle-btn ${notifications.grades ? 'enabled' : 'disabled'}`}
                          onClick={() => handleNotificationChange('grades')}
                  >
                          {notifications.grades ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="notification-toggle">
                        <span>События и мероприятия</span>
                        <button 
                          className={`toggle-btn ${notifications.events ? 'enabled' : 'disabled'}`}
                          onClick={() => handleNotificationChange('events')}
                      >
                          {notifications.events ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'privacy' && (
                <div className="privacy-section">
                  <div className="settings-card">
                    <div className="card-header">
                      <Lock className="w-5 h-5" />
                      <h4>Активные сессии</h4>
                    </div>
                    <div className="card-content">
                      <div className="sessions-list">
                        {activeSessions.map((session) => (
                          <div key={session.id} className="session-item">
                            <div className="session-info">
                              <div className="session-device">
                                {session.device.includes('Mobile') ? 
                                  <Smartphone className="w-4 h-4" /> : 
                                  <Monitor className="w-4 h-4" />
                                }
                                <span>{session.device}</span>
                                {session.current && <span className="current-session">Текущая</span>}
                              </div>
                              <div className="session-details">
                                <span className="session-location">{session.location}</span>
                                <span className="session-time">
                                  Активна: {new Date(session.lastActive).toLocaleDateString('ru-RU')}
                                </span>
                      </div>
                    </div>
                            {!session.current && (
                              <button className="session-logout-btn">
                                Завершить
                              </button>
                            )}
                      </div>
                        ))}
                      </div>
                    </div>
                      </div>
                    </div>
              )}

              {selectedTab === 'appearance' && (
                <div className="appearance-section">
                  <div className="settings-card">
                    <div className="card-header">
                      <Palette className="w-5 h-5" />
                      <h4>Тема оформления</h4>
                    </div>
                    <div className="card-content">
                      <div className="theme-options">
                        <div className={`theme-option ${theme === 'light' ? 'selected' : ''}`} onClick={() => setTheme('light')}>
                          <Sun className="w-5 h-5" />
                          <div>
                            <div className="theme-name">Светлая</div>
                            <div className="theme-desc">Классический светлый интерфейс</div>
                </div>
                          {theme === 'light' && <Check className="check-icon" />}
            </div>
                        <div className={`theme-option ${theme === 'dark' ? 'selected' : ''}`} onClick={() => setTheme('dark')}>
                          <Moon className="w-5 h-5" />
                          <div>
                            <div className="theme-name">Темная</div>
                            <div className="theme-desc">Современный темный интерфейс</div>
                </div>
                          {theme === 'dark' && <Check className="check-icon" />}
                      </div>
                      </div>
                      </div>
                    </div>
                    
                  <div className="settings-card">
                    <div className="card-header">
                      <Languages className="w-5 h-5" />
                      <h4>Язык интерфейса</h4>
                    </div>
                    <div className="card-content">
                      <div className="language-options">
                        <div className={`language-option ${language === 'ru' ? 'selected' : ''}`} onClick={() => setLanguage('ru')}>
                          <div className="language-flag">🇷🇺</div>
                          <div className="language-name">Русский</div>
                          {language === 'ru' && <Check className="check-icon" />}
                        </div>
                        <div className={`language-option ${language === 'en' ? 'selected' : ''}`} onClick={() => setLanguage('en')}>
                          <div className="language-flag">🇺🇸</div>
                          <div className="language-name">English</div>
                          {language === 'en' && <Check className="check-icon" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'data' && (
                <div className="data-section">
                  <div className="settings-card">
                    <div className="card-header">
                      <Database className="w-5 h-5" />
                      <h4>Управление данными</h4>
                    </div>
                    <div className="card-content">
                      <div className="security-action">
                        <div>
                          <h5>Экспорт данных</h5>
                          <p>Скачать все ваши данные в формате JSON</p>
                      </div>
                        <button className="btn btn-secondary" onClick={() => toast.success('Подготовка экспорта...')}>
                          <Download className="w-4 h-4" />
                          Экспорт
                        </button>
                      </div>
                      
                      <div className="security-action">
                        <div>
                          <h5>Удаление аккаунта</h5>
                          <p>Безвозвратно удалить аккаунт и все данные</p>
                    </div>
                        <button className="btn btn-danger" onClick={() => toast.error('Функция недоступна')}>
                          <Trash2 className="w-4 h-4" />
                          Удалить
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

      {/* Модальное окно подтверждения */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3>Сбросить настройки</h3>
              <p>Вы уверены, что хотите вернуть все настройки к значениям по умолчанию?</p>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Отмена
              </button>
              <button className="btn btn-danger" onClick={() => {
                setShowModal(false);
                setHasUnsavedChanges(false);
                toast.success('Настройки сброшены');
              }}>
                Сбросить
              </button>
            </div>
          </div>
            </div>
          )}
      </div>
  );
} 