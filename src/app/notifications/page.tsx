'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  Bell,
  BellRing,
  Check,
  CheckCircle,
  AlertTriangle,
  Info,
  Clock,
  User,

  TrendingUp,
  ArrowDownRight,
  CheckCheck,
  AlertCircle,
  Archive,
  Star,
  ChevronDown,
  ChevronUp,
  Timer,
  ExternalLink,
  Hash,
  Download,
  Monitor,
  Bookmark,
  Trash2,
  Eye,
  GraduationCap,
  DollarSign,
  Users,
  Building
} from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  message: string;
  fullMessage?: string;
  type: 'info' | 'warning' | 'success' | 'urgent' | 'reminder';
  category: 'academic' | 'system' | 'social' | 'financial' | 'administrative';
  timestamp: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
  actionRequired?: boolean;
  actionUrl?: string;
  sender: string;
  senderRole: string;
  tags?: string[];
  attachments?: string[];
  expiresAt?: string;
  isPinned?: boolean;
  isStarred?: boolean;
}

export default function NotificationsPageCompact() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedNotifications, setExpandedNotifications] = useState<Set<number>>(new Set());

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'СРОЧНО: Изменение расписания экзаменов',
      message: 'Экзамен по математическому анализу перенесен с 20.12 на 22.12. Проверьте обновленное расписание.',
      fullMessage: 'Уважаемые студенты! В связи с техническими работами в аудитории 305 экзамен по математическому анализу, запланированный на 20 декабря в 9:00, переносится на 22 декабря в то же время.',
      type: 'urgent',
      category: 'academic',
      timestamp: '2024-12-20T14:30:00Z',
      isRead: false,
      priority: 'high',
      actionRequired: true,
      actionUrl: '/schedule',
      sender: 'Проректор по учебной работе',
      senderRole: 'Администрация',
      tags: ['экзамены', 'расписание', 'срочно'],
      isPinned: true,
      isStarred: false,
      expiresAt: '2024-12-22T09:00:00Z'
    },
    {
      id: 2,
      title: 'Начислена стипендия за декабрь',
      message: 'На ваш счет начислена академическая стипендия в размере 8,500 рублей за декабрь 2024 года.',
      type: 'success',
      category: 'financial',
      timestamp: '2024-12-19T10:00:00Z',
      isRead: false,
      priority: 'medium',
      actionRequired: false,
      sender: 'Бухгалтерия университета',
      senderRole: 'Финансовая служба',
      tags: ['стипендия', 'начисление', 'финансы'],
      isStarred: true,
      isPinned: false
    },
    {
      id: 3,
      title: 'Новые материалы курса "Алгоритмы и структуры данных"',
      message: 'Преподаватель загрузил новые лекционные материалы и практические задания по теме "Графы".',
      type: 'info',
      category: 'academic',
      timestamp: '2024-12-19T12:15:00Z',
      isRead: true,
      priority: 'medium',
      actionRequired: true,
      actionUrl: '/courses',
      sender: 'Профессор Иванов А.В.',
      senderRole: 'Преподаватель',
      tags: ['курс', 'материалы', 'алгоритмы'],
      attachments: ['algorithms_graphs.pdf', 'practice_tasks.docx'],
      isPinned: false,
      isStarred: false
    },
    {
      id: 4,
      title: 'Техническое обслуживание системы',
      message: 'Запланированные технические работы 21 декабря с 02:00 до 04:00. Доступ к сервисам будет ограничен.',
      type: 'warning',
      category: 'system',
      timestamp: '2024-12-18T16:45:00Z',
      isRead: false,
      priority: 'medium',
      actionRequired: false,
      sender: 'IT-департамент',
      senderRole: 'Техническая служба',
      tags: ['техработы', 'система', 'обслуживание'],
      isPinned: false,
      isStarred: false,
      expiresAt: '2024-12-21T04:00:00Z'
    }
  ]);

  const categories = [
    { id: 'all', name: 'Все уведомления', count: notifications.length },
    { id: 'academic', name: 'Учебные', count: notifications.filter(n => n.category === 'academic').length },
    { id: 'financial', name: 'Финансовые', count: notifications.filter(n => n.category === 'financial').length },
    { id: 'system', name: 'Системные', count: notifications.filter(n => n.category === 'system').length },
    { id: 'social', name: 'Социальные', count: notifications.filter(n => n.category === 'social').length },
    { id: 'administrative', name: 'Административные', count: notifications.filter(n => n.category === 'administrative').length }
  ];

  const quickActions = useMemo(() => {
    const unreadCount = notifications.filter(n => !n.isRead).length;
    const actionRequiredCount = notifications.filter(n => n.actionRequired && !n.isRead).length;
    
    return [
      {
        id: 'markAll',
        title: 'ПРОЧЕСТЬ ВСЕ',
        icon: <CheckCheck className="w-4 h-4" />,
        description: 'Отметить прочитанными',
        color: 'var(--accent-green)',
        badge: unreadCount > 0 ? `${unreadCount}` : undefined
      },
      {
        id: 'actionRequired',
        title: 'ТРЕБУЮТ ДЕЙСТВИЙ',
        icon: <AlertCircle className="w-4 h-4" />,
        description: 'Нужно действие',
        color: '#f59e0b',
        badge: actionRequiredCount > 0 ? `${actionRequiredCount}` : undefined
      },
      {
        id: 'export',
        title: 'ЭКСПОРТ',
        icon: <Download className="w-4 h-4" />,
        description: 'Данные',
        color: 'var(--accent-blue)'
      },
      {
        id: 'archive',
        title: 'АРХИВ',
        icon: <Archive className="w-4 h-4" />,
        description: 'Старые уведомления',
        color: '#6b7280'
      }
    ];
  }, [notifications]);

  const notificationStats = useMemo(() => {
    const totalNotifications = notifications.length;
    const unreadCount = notifications.filter(n => !n.isRead).length;
    const urgentCount = notifications.filter(n => n.type === 'urgent' || n.priority === 'high').length;
    const actionRequiredCount = notifications.filter(n => n.actionRequired).length;

    return {
      total: { value: totalNotifications, label: 'Всего уведомлений', change: '+3', trend: 'up' as const },
      unread: { value: unreadCount, label: 'Непрочитанных', change: '-2', trend: 'down' as const },
      urgent: { value: urgentCount, label: 'Срочных', change: '+1', trend: 'up' as const },
      action: { value: actionRequiredCount, label: 'Требуют действий', change: '0', trend: 'stable' as const }
    };
  }, [notifications]);

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'var(--accent-green)';
      case 'warning': return '#f59e0b';
      case 'urgent': return '#ef4444';
      case 'reminder': return '#8b5cf6';
      case 'info':
      default: return 'var(--accent-blue)';
    }
  };

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'urgent': return <AlertTriangle className="w-4 h-4" />;
      case 'reminder': return <Clock className="w-4 h-4" />;
      case 'info':
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getTypeText = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'Успех';
      case 'warning': return 'Предупреждение';
      case 'urgent': return 'Срочно';
      case 'reminder': return 'Напоминание';
      case 'info':
      default: return 'Информация';
    }
  };

  const getCategoryIcon = (category: Notification['category']) => {
    switch (category) {
      case 'academic': return <GraduationCap className="w-4 h-4" />;
      case 'system': return <Monitor className="w-4 h-4" />;
      case 'financial': return <DollarSign className="w-4 h-4" />;
      case 'social': return <Users className="w-4 h-4" />;
      case 'administrative': return <Building className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: Notification['category']) => {
    switch (category) {
      case 'academic': return 'var(--accent-blue)';
      case 'system': return '#6b7280';
      case 'financial': return 'var(--accent-green)';
      case 'social': return '#f59e0b';
      case 'administrative': return '#8b5cf6';
      default: return 'var(--accent-blue)';
    }
  };

  const getCategoryName = (category: Notification['category']) => {
    switch (category) {
      case 'academic': return 'Учебное';
      case 'system': return 'Системное';
      case 'financial': return 'Финансовое';
      case 'social': return 'Социальное';
      case 'administrative': return 'Административное';
      default: return 'Уведомление';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down': return <ArrowDownRight className="w-3 h-3 text-red-500" />;
      case 'stable': return <TrendingUp className="w-3 h-3 text-blue-500" />;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Только что';
    if (diffInMinutes < 60) return `${diffInMinutes} мин. назад`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} ч. назад`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Вчера';
    if (diffInDays < 7) return `${diffInDays} дн. назад`;
    
    return date.toLocaleDateString('ru-RU');
  };

  const isExpired = (expiresAt?: string) => {
    if (!expiresAt) return false;
    return new Date(expiresAt).getTime() < new Date().getTime();
  };

  const filteredNotifications = notifications
    .filter(notification => selectedCategory === 'all' || notification.category === selectedCategory)
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      if (!a.isRead && b.isRead) return -1;
      if (a.isRead && !b.isRead) return 1;
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
    toast.success('Уведомление отмечено как прочитанное');
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    toast.success('Все уведомления отмечены как прочитанные');
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    toast.success('Уведомление удалено');
  };

  const toggleStar = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isStarred: !notification.isStarred }
          : notification
      )
    );
    const notification = notifications.find(n => n.id === id);
    toast.success(notification?.isStarred ? 'Убрано из избранного' : 'Добавлено в избранное');
  };

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedNotifications);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedNotifications(newExpanded);
  };

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'markAll':
        markAllAsRead();
        break;
      case 'actionRequired':
        setSelectedCategory('all');
        toast.success('Показаны уведомления, требующие действий');
        break;
      case 'export':
        toast.success('Экспорт уведомлений запущен');
        break;
      case 'archive':
        toast.success('Открываю архив уведомлений');
        break;
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const categoryName = categories.find(c => c.id === categoryId)?.name || 'Все уведомления';
    // toast.success(`Переключение на: ${categoryName}`); // Убрано раздражающее уведомление
  };

  const handleNotificationAction = (notification: Notification, action: string) => {
    switch (action) {
      case 'read':
        if (!notification.isRead) markAsRead(notification.id);
        break;
      case 'star':
        toggleStar(notification.id);
        break;
      case 'delete':
        deleteNotification(notification.id);
        break;
      case 'expand':
        toggleExpanded(notification.id);
        break;
      case 'action':
        if (notification.actionUrl) {
          toast.success(`Переход к: ${notification.actionUrl}`);
        }
        break;
    }
  };

  return (
    <div className="notifications-compact">
      {/* Компактный заголовок */}
      <div className="notifications-header-compact">
        <div className="header-main">
          <Bell className="w-6 h-6" />
          <div>
            <h1>Уведомления</h1>
            <p>{notifications.length} уведомлений • {notificationStats.unread.value} новых</p>
          </div>
        </div>
        <div className="current-notifications-indicator">
          <span className="notifications-badge">{notificationStats.unread.value}</span>
          <span className="notifications-label">Новых</span>
        </div>
      </div>

      {/* Основной компактный контент */}
      <div className="notifications-main-compact">
        {/* Верхний ряд - статистика и быстрые действия */}
        <div className="notifications-top-row">
          {/* Статистика уведомлений */}
          <motion.div 
            className="notifications-stats-compact"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="stats-header">
              <h3>Статистика</h3>
              <p>Аналитика уведомлений</p>
            </div>
            <div className="stats-grid-compact">
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Bell className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{notificationStats.total.value}</span>
                  <span className="stat-label-compact">{notificationStats.total.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(notificationStats.total.trend)}
                    <span>{notificationStats.total.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <BellRing className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{notificationStats.unread.value}</span>
                  <span className="stat-label-compact">{notificationStats.unread.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(notificationStats.unread.trend)}
                    <span>{notificationStats.unread.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{notificationStats.urgent.value}</span>
                  <span className="stat-label-compact">{notificationStats.urgent.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(notificationStats.urgent.trend)}
                    <span>{notificationStats.urgent.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{notificationStats.action.value}</span>
                  <span className="stat-label-compact">{notificationStats.action.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(notificationStats.action.trend)}
                    <span>{notificationStats.action.change}</span>
                  </div>
        </div>
            </div>
            </div>
      </motion.div>

          {/* Быстрые действия */}
        <motion.div 
            className="notifications-actions-compact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
        >
            <h4>Быстрые действия</h4>
            <div className="actions-grid-notifications">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  className="action-btn-notifications"
                  onClick={() => handleQuickAction(action.id)}
                  style={{ '--action-color': action.color } as React.CSSProperties}
                >
                  <div className="action-icon-notifications">
                    {action.icon}
                    {action.badge && (
                      <span className="action-badge-notifications">{action.badge}</span>
                    )}
                  </div>
                  <div className="action-content-notifications">
                    <span className="action-title">{action.title}</span>
                    <span className="action-desc">{action.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
          </div>

        {/* Нижний ряд - уведомления и категории */}
        <div className="notifications-bottom-row">
          {/* Список уведомлений */}
          <motion.div 
            className="notifications-list-compact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
              >
            <div className="notifications-list-header">
              <div>
                <h3>
                  {selectedCategory === 'all' ? 'Все уведомления' : categories.find(c => c.id === selectedCategory)?.name}
                </h3>
                <p>{filteredNotifications.length} уведомлений найдено</p>
              </div>
              <div className="urgent-notifications-badge">
                <AlertTriangle className="w-4 h-4" />
                <span>Актуальные</span>
              </div>
            </div>
            
            <div className="notifications-grid-compact">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => {
                  const isExpiredNotification = isExpired(notification.expiresAt);
                  const isExpanded = expandedNotifications.has(notification.id);
                  
                  return (
                    <div 
                      key={notification.id} 
                      className={`notification-card-compact ${!notification.isRead ? 'unread' : ''} ${isExpiredNotification ? 'expired' : ''}`}
                    >
                      {notification.isPinned && (
                        <div className="notification-pinned-badge">
                          <Star className="w-3 h-3" />
                          <span>Закреплено</span>
                        </div>
                      )}
                      
                      {notification.type === 'urgent' && (
                        <div className="urgent-notification-indicator">
                          <AlertTriangle className="w-3 h-3" />
                          <span>СРОЧНО</span>
                        </div>
                      )}
                      
                      <div className="notification-card-header">
                        <div className="notification-meta-info">
                          <div className="notification-category-badge" style={{ backgroundColor: getCategoryColor(notification.category) }}>
                            {getCategoryIcon(notification.category)}
                            <span>{getCategoryName(notification.category)}</span>
                          </div>
                          <div className="notification-time">
                          <Clock className="w-3 h-3" />
                          <span>{formatTimeAgo(notification.timestamp)}</span>
                          </div>
                          <div className="notification-type" style={{ color: getTypeColor(notification.type) }}>
                            {getTypeIcon(notification.type)}
                            <span>{getTypeText(notification.type)}</span>
                          </div>
                        </div>
                        
                        <div className="notification-actions-header">
                          <button 
                            className={`notification-star-btn ${notification.isStarred ? 'starred' : ''}`}
                            onClick={() => handleNotificationAction(notification, 'star')}
                    >
                            <Star className="w-4 h-4" />
                          </button>
                          {notification.fullMessage && (
                            <button 
                              className="notification-expand-btn"
                              onClick={() => handleNotificationAction(notification, 'expand')}
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div className="notification-card-content">
                        <div className="notification-header-info">
                          <h4>{notification.title}</h4>
                          {!notification.isRead && (
                            <div className="unread-indicator">
                              <div className="unread-dot" />
                            </div>
                          )}
                        </div>
                        
                        <div className="notification-summary">
                          <p>{isExpanded ? notification.fullMessage || notification.message : notification.message}</p>
                      </div>
                      
                        <div className="notification-author-info">
                          <div className="author-details">
                            <User className="w-3 h-3" />
                            <span className="author-name">{notification.sender}</span>
                            <span className="author-role">• {notification.senderRole}</span>
                          </div>
                          
                          {notification.tags && notification.tags.length > 0 && (
                            <div className="notification-tags">
                              {notification.tags.slice(0, 3).map((tag, index) => (
                                <span key={index} className="notification-tag">
                                  <Hash className="w-3 h-3" />
                                  {tag}
                                </span>
                              ))}
                              {notification.tags.length > 3 && (
                                <span className="tags-more">+{notification.tags.length - 3}</span>
                              )}
                            </div>
                          )}
                        </div>
                        
                        {notification.attachments && notification.attachments.length > 0 && (
                          <div className="notification-attachments">
                            <div className="attachments-header">
                              <Download className="w-3 h-3" />
                              <span>Вложения ({notification.attachments.length})</span>
                      </div>
                            <div className="attachments-list">
                              {notification.attachments.map((attachment, index) => (
                                <span key={index} className="attachment-item">
                                  {attachment}
                                </span>
              ))}
            </div>
                          </div>
                        )}
                        
                        {notification.expiresAt && (
                          <div className={`notification-expiry ${isExpiredNotification ? 'expired' : ''}`}>
                            <Timer className="w-3 h-3" />
                  <span>
                              {isExpiredNotification 
                                ? 'Истекло' 
                                : `Истекает: ${new Date(notification.expiresAt).toLocaleDateString('ru-RU')}`
                              }
                  </span>
                          </div>
                        )}
                      </div>

                      <div className="notification-card-footer">
                        <div className="notification-actions">
                        {!notification.isRead && (
                            <button 
                              className="notification-action-btn mark-read"
                              onClick={() => handleNotificationAction(notification, 'read')}
                          >
                              <Check className="w-4 h-4" />
                              <span>Прочитано</span>
                            </button>
                        )}
                          {notification.actionRequired && notification.actionUrl && (
                            <button 
                              className="notification-action-btn action-required"
                              onClick={() => handleNotificationAction(notification, 'action')}
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>Перейти</span>
                            </button>
                          )}
                          <button 
                            className="notification-action-btn bookmark"
                            onClick={() => handleNotificationAction(notification, 'star')}
                          >
                            <Bookmark className="w-4 h-4" />
                            <span>{notification.isStarred ? 'Убрать' : 'Сохранить'}</span>
                          </button>
                          <button 
                            className="notification-action-btn delete"
                            onClick={() => handleNotificationAction(notification, 'delete')}
                        >
                            <Trash2 className="w-4 h-4" />
                            <span>Удалить</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="no-notifications-compact">
                  <Bell className="w-12 h-12" />
                  <h4>Уведомлений нет</h4>
                  <p>По выбранной категории уведомления не найдены</p>
                  <button 
                    className="view-all-notifications-btn"
                    onClick={() => handleCategoryChange('all')}
                  >
                    <Eye className="w-4 h-4" />
                    <span>Посмотреть все уведомления</span>
                  </button>
                </div>
                  )}
                </div>
              </motion.div>

          {/* Навигация по категориям */}
          <motion.div 
            className="categories-navigation-compact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="categories-header">
              <h3>Категории</h3>
              <p>Фильтр по типам уведомлений</p>
            </div>
            <div className="categories-grid-compact">
              {categories.map((category) => {
                const progressPercent = (category.count / notifications.length) * 100;
                
                return (
                  <button
                    key={category.id}
                    className={`category-card-compact ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    <div className="category-card-header">
                      <Bell className="w-5 h-5" />
                      <span className="category-count">{category.count}</span>
                    </div>
                    <div className="category-card-content">
                      <span className="category-name">{category.name}</span>
                      <span className="category-stats">{category.count} уведомлений</span>
                    </div>
                    <div className="category-progress-bar">
                      <div 
                        className="category-progress-fill"
                        style={{ 
                          width: `${progressPercent}%`,
                          backgroundColor: category.id === 'all' ? 'var(--accent-blue)' : getCategoryColor(category.id as Notification['category'])
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
        </motion.div>
        </div>
      </div>
    </div>
  );
} 
