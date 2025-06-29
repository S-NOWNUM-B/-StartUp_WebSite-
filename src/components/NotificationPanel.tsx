'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  Bell,
  X,
  Search,
  Filter,
  Check,
  CheckCircle2,

  ArrowRight,
  MoreHorizontal,
  RefreshCw,
  Clock,
  Star,
  Archive,
  Trash2,
  Eye,
  EyeOff,
  Download,
  Share2,
  AlertCircle,
  Bookmark
} from 'lucide-react';
import NotificationCard from './NotificationCard';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'reminder' | 'urgent' | 'achievement' | 'social';
  category: 'academic' | 'system' | 'financial' | 'social' | 'administrative';
  timestamp: string;
  unread: boolean;
  priority: 'high' | 'medium' | 'low';
  actionRequired: boolean;
  sender: string;
  actionUrl?: string;
  starred?: boolean;
  archived?: boolean;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
  onStar: (id: string) => void;
  onRefresh: () => void;
  className?: string;
}

export default function NotificationPanel({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onArchive,
  onStar,
  onRefresh,
  className = ''
}: NotificationPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread' | 'starred' | 'archived'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'time' | 'priority' | 'type'>('time');

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const filters = [
    { id: 'all', label: 'Все', count: notifications.length },
    { id: 'unread', label: 'Непрочитанные', count: notifications.filter(n => n.unread).length },
    { id: 'starred', label: 'Избранные', count: notifications.filter(n => n.starred).length },
    { id: 'archived', label: 'Архив', count: notifications.filter(n => n.archived).length }
  ];

  const categories = [
    { id: 'all', label: 'Все категории' },
    { id: 'academic', label: 'Учебные' },
    { id: 'system', label: 'Системные' },
    { id: 'financial', label: 'Финансовые' },
    { id: 'social', label: 'Социальные' },
    { id: 'administrative', label: 'Административные' }
  ];

  // Фильтрация и сортировка уведомлений
  const filteredNotifications = useMemo(() => {
    let filtered = notifications.filter(notification => {
      // Фильтр по поиску
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!notification.title.toLowerCase().includes(query) &&
            !notification.message.toLowerCase().includes(query) &&
            !notification.sender.toLowerCase().includes(query)) {
          return false;
        }
      }

      // Фильтр по статусу
      switch (selectedFilter) {
        case 'unread':
          if (notification.unread !== true) return false;
          break;
        case 'starred':
          if (!notification.starred) return false;
          break;
        case 'archived':
          if (!notification.archived) return false;
          break;
      }

      // Фильтр по категории
      if (selectedCategory !== 'all' && notification.category !== selectedCategory) {
        return false;
      }

      return true;
    });

    // Сортировка
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'type':
          return a.type.localeCompare(b.type);
        case 'time':
        default:
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
    });

    return filtered;
  }, [notifications, searchQuery, selectedFilter, selectedCategory, sortBy]);

  const unreadCount = notifications.filter(n => n.unread && !n.archived).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && n.unread).length;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
      toast.success('Уведомления обновлены');
    } catch (error) {
      toast.error('Ошибка обновления');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleBulkAction = (action: 'read' | 'archive' | 'delete') => {
    selectedNotifications.forEach(id => {
      switch (action) {
        case 'read':
          onMarkAsRead(id);
          break;
        case 'archive':
          onArchive(id);
          break;
        case 'delete':
          onDelete(id);
          break;
      }
    });
    setSelectedNotifications([]);
    setIsSelectionMode(false);
    toast.success(`Выполнено для ${selectedNotifications.length} уведомлений`);
  };

  const toggleSelection = (id: string) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(notifId => notifId !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedNotifications(filteredNotifications.map(n => n.id));
  };

  const clearSelection = () => {
    setSelectedNotifications([]);
    setIsSelectionMode(false);
  };

  const exportNotifications = () => {
    const dataToExport = {
      notifications: filteredNotifications,
      exportDate: new Date().toISOString(),
      filter: selectedFilter,
      category: selectedCategory,
      searchQuery
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notifications-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Уведомления экспортированы');
  };

  const groupedNotifications = useMemo(() => {
    const groups: { [key: string]: Notification[] } = {};
    
    filteredNotifications.forEach(notification => {
      const date = new Date(notification.timestamp);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      let groupKey: string;
      
      if (date.toDateString() === today.toDateString()) {
        groupKey = 'Сегодня';
      } else if (date.toDateString() === yesterday.toDateString()) {
        groupKey = 'Вчера';
      } else if (date.getTime() > today.getTime() - 7 * 24 * 60 * 60 * 1000) {
        groupKey = 'На этой неделе';
      } else {
        groupKey = 'Ранее';
      }
      
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(notification);
    });
    
    return groups;
  }, [filteredNotifications]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={`notifications-panel-advanced ${className}`}
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        {/* Заголовок панели */}
        <div className="notifications-header-advanced">
          <div className="notifications-title-advanced">
            <Bell className="w-5 h-5" style={{ color: 'var(--accent-blue)' }} />
            <h3>Уведомления</h3>
            {unreadCount > 0 && (
              <div className="notifications-count">{unreadCount}</div>
            )}
            {highPriorityCount > 0 && (
              <motion.div
                className="priority-alert"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  background: 'var(--accent-red)',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: '600'
                }}
              >
                <AlertCircle className="w-3 h-3" />
                {highPriorityCount} срочных
              </motion.div>
            )}
          </div>
          
          <div className="notifications-controls-advanced">
            {isSelectionMode && (
              <motion.div
                className="selection-controls"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ display: 'flex', gap: '0.5rem', marginRight: '0.5rem' }}
              >
                <button
                  className="control-btn-advanced"
                  onClick={selectAll}
                  title="Выбрать все"
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>
                <button
                  className="control-btn-advanced"
                  onClick={() => handleBulkAction('read')}
                  title="Отметить как прочитанное"
                  disabled={selectedNotifications.length === 0}
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  className="control-btn-advanced"
                  onClick={() => handleBulkAction('archive')}
                  title="Архивировать"
                  disabled={selectedNotifications.length === 0}
                >
                  <Archive className="w-4 h-4" />
                </button>
                <button
                  className="control-btn-advanced"
                  onClick={() => handleBulkAction('delete')}
                  title="Удалить"
                  disabled={selectedNotifications.length === 0}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            )}
            
            <button
              className="control-btn-advanced"
              onClick={() => setIsSelectionMode(!isSelectionMode)}
              title="Режим выбора"
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>
            <button
              className="control-btn-advanced"
              onClick={handleRefresh}
              disabled={isRefreshing}
              title="Обновить"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              className="control-btn-advanced"
              onClick={exportNotifications}
              title="Экспорт"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              className="control-btn-advanced"
              onClick={onClose}
              title="Закрыть"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Поиск и фильтры */}
        <div className="notifications-search-filters">
          <div className="search-container" style={{ position: 'relative', marginBottom: '1rem' }}>
            <Search className="w-4 h-4" style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: 'var(--text-muted)' 
            }} />
            <input
              type="text"
              placeholder="Поиск по уведомлениям..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.5rem',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '0.875rem'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="notifications-filters">
            {filters.map(filter => (
              <button
                key={filter.id}
                className={`filter-btn ${selectedFilter === filter.id ? 'active' : ''}`}
                onClick={() => setSelectedFilter(filter.id as any)}
              >
                {filter.label} {filter.count > 0 && `(${filter.count})`}
              </button>
            ))}
          </div>

          <div className="advanced-filters" style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            marginTop: '0.5rem',
            flexWrap: 'wrap'
          }}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: '0.375rem 0.75rem',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                color: 'var(--text-primary)',
                fontSize: '0.75rem'
              }}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                padding: '0.375rem 0.75rem',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                color: 'var(--text-primary)',
                fontSize: '0.75rem'
              }}
            >
              <option value="time">По времени</option>
              <option value="priority">По приоритету</option>
              <option value="type">По типу</option>
            </select>
          </div>
        </div>

        {/* Список уведомлений */}
        <div className="notifications-list-advanced">
          {filteredNotifications.length === 0 ? (
            <div className="empty-notifications-advanced">
              <div className="empty-icon-advanced">
                <Bell className="w-8 h-8" />
              </div>
              <h4 className="empty-title-advanced">
                {searchQuery || selectedFilter !== 'all' ? 'Ничего не найдено' : 'Нет уведомлений'}
              </h4>
              <p className="empty-description-advanced">
                {searchQuery 
                  ? 'Попробуйте изменить критерии поиска'
                  : 'Все уведомления будут отображаться здесь'
                }
              </p>
              {!searchQuery && selectedFilter === 'all' && (
                <button
                  className="test-notifications-btn"
                  onClick={() => {
                    // Добавить тестовые уведомления
                    toast.success('Тестовые уведомления добавлены');
                  }}
                >
                  Добавить тестовые уведомления
                </button>
              )}
            </div>
          ) : (
            Object.entries(groupedNotifications).map(([groupName, groupNotifications]) => (
              <div key={groupName} className="notification-group">
                <motion.h4
                  className="group-title"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    margin: '1rem 0 0.5rem',
                    padding: '0 0.5rem',
                    position: 'sticky',
                    top: 0,
                    background: 'var(--bg-elevated)',
                    zIndex: 1
                  }}
                >
                  {groupName} ({groupNotifications.length})
                </motion.h4>
                {groupNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={{ 
                      position: 'relative',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {isSelectionMode && (
                      <motion.label
                        className="selection-checkbox"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                          position: 'absolute',
                          top: '1rem',
                          left: '1rem',
                          zIndex: 2,
                          cursor: 'pointer'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedNotifications.includes(notification.id)}
                          onChange={() => toggleSelection(notification.id)}
                          style={{ display: 'none' }}
                        />
                        <div style={{
                          width: '20px',
                          height: '20px',
                          background: selectedNotifications.includes(notification.id) 
                            ? 'var(--accent-blue)' 
                            : 'var(--bg-tertiary)',
                          border: '2px solid var(--border-color)',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {selectedNotifications.includes(notification.id) && (
                            <Check className="w-3 h-3" style={{ color: 'white' }} />
                          )}
                        </div>
                      </motion.label>
                    )}
                    <div style={{ marginLeft: isSelectionMode ? '2.5rem' : '0' }}>
                      <NotificationCard
                        {...notification}
                        onMarkAsRead={onMarkAsRead}
                        onDismiss={onDelete}
                        onAction={(id) => {
                          if (notification.actionUrl) {
                            window.location.href = notification.actionUrl;
                          }
                        }}
                        compact={false}
                        interactive={!isSelectionMode}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Футер панели */}
        {filteredNotifications.length > 0 && (
          <div className="notifications-footer-advanced">
            {unreadCount > 0 && (
              <motion.button
                className="mark-all-read-btn"
                onClick={onMarkAllAsRead}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: 'var(--accent-green)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  marginBottom: '0.75rem'
                }}
              >
                <CheckCircle2 className="w-4 h-4" />
                Отметить все как прочитанные ({unreadCount})
              </motion.button>
            )}
            <a
              href="/notifications"
              className="view-all-btn-advanced"
              onClick={onClose}
            >
              <span>Все уведомления</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
} 