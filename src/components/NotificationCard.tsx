'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  AlertTriangle,
  Bell,
  Calendar,
  FileText,
  Users,
  Award,
  MessageSquare,
  Settings,
  Star,
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react';
import { useState } from 'react';

interface NotificationCardProps {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'reminder' | 'urgent' | 'achievement' | 'social';
  category?: 'academic' | 'system' | 'financial' | 'social' | 'administrative';
  timestamp: string;
  unread?: boolean;
  priority: 'high' | 'medium' | 'low';
  actionRequired?: boolean;
  sender?: string;
  actionUrl?: string;
  onDismiss?: (id: string) => void;
  onMarkAsRead?: (id: string) => void;
  onAction?: (id: string) => void;
  compact?: boolean;
  interactive?: boolean;
}

export default function NotificationCard({
  id,
  title,
  message,
  type,
  category,
  timestamp,
  unread = false,
  priority = 'medium',
  actionRequired = false,
  sender,
  actionUrl,
  onDismiss,
  onMarkAsRead,
  onAction,
  compact = false,
  interactive = true
}: NotificationCardProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5" />;
      case 'error': return <AlertCircle className="w-5 h-5" />;
      case 'warning': return <AlertTriangle className="w-5 h-5" />;
      case 'urgent': return <AlertTriangle className="w-5 h-5" />;
      case 'reminder': return <Clock className="w-5 h-5" />;
      case 'achievement': return <Award className="w-5 h-5" />;
      case 'social': return <Users className="w-5 h-5" />;
      case 'info':
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getCategoryIcon = () => {
    if (!category) return null;
    switch (category) {
      case 'academic': return <FileText className="w-4 h-4" />;
      case 'system': return <Settings className="w-4 h-4" />;
      case 'financial': return <Star className="w-4 h-4" />;
      case 'social': return <Users className="w-4 h-4" />;
      case 'administrative': return <Calendar className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'success': return 'var(--accent-green)';
      case 'error': return 'var(--accent-red)';
      case 'warning': return 'var(--accent-orange)';
      case 'urgent': return 'var(--accent-red)';
      case 'reminder': return 'var(--accent-purple)';
      case 'achievement': return 'var(--accent-yellow)';
      case 'social': return 'var(--accent-green)';
      case 'info':
      default: return 'var(--accent-blue)';
    }
  };

  const getPriorityColor = () => {
    switch (priority) {
      case 'high': return 'var(--accent-red)';
      case 'medium': return 'var(--accent-orange)';
      case 'low': return 'var(--accent-green)';
      default: return 'var(--accent-blue)';
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss?.(id), 300);
  };

  const handleMarkAsRead = () => {
    onMarkAsRead?.(id);
  };

  const handleAction = () => {
    if (actionUrl) {
      window.location.href = actionUrl;
    }
    onAction?.(id);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className={`notification-card-modern ${type} ${unread ? 'unread' : ''} ${compact ? 'compact' : ''} ${priority}`}
      initial={{ opacity: 0, x: 100, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ scale: interactive ? 1.02 : 1, y: interactive ? -2 : 0 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      layout
    >
      {/* Индикатор приоритета */}
      <motion.div 
        className="priority-indicator"
        style={{ backgroundColor: getPriorityColor() }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      />

      {/* Индикатор типа */}
      <motion.div 
        className="type-indicator"
        style={{ backgroundColor: getTypeColor() }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {getIcon()}
      </motion.div>

      <div className="notification-content-modern">
        {/* Заголовок */}
        <div className="notification-header-modern">
          <div className="header-left">
            <div className="notification-meta">
              {category && (
                <motion.div 
                  className="category-badge"
                  style={{ color: getTypeColor() }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {getCategoryIcon()}
                  <span>{category}</span>
                </motion.div>
              )}
              {actionRequired && (
                <motion.div 
                  className="action-required-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <AlertCircle className="w-3 h-3" />
                  <span>Требует действий</span>
                </motion.div>
              )}
            </div>
            {unread && (
              <motion.div
                className="unread-indicator-modern"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              />
            )}
          </div>
          
          <AnimatePresence>
            {(isHovered || !interactive) && (
              <motion.div 
                className="notification-actions-modern"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                {unread && (
                  <motion.button
                    className="action-btn-modern mark-read"
                    onClick={handleMarkAsRead}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Отметить как прочитанное"
                  >
                    <Eye className="w-4 h-4" />
                  </motion.button>
                )}
                {!unread && (
                  <motion.button
                    className="action-btn-modern mark-unread"
                    onClick={() => onMarkAsRead?.(id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Отметить как непрочитанное"
                  >
                    <EyeOff className="w-4 h-4" />
                  </motion.button>
                )}
                <motion.button
                  className="action-btn-modern dismiss"
                  onClick={handleDismiss}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  title="Закрыть"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Основное содержимое */}
        <motion.div 
          className="notification-body-modern"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h4 className="notification-title-modern">{title}</h4>
          {!compact && (
            <p className="notification-message-modern">{message}</p>
          )}
          
          {/* Информация об отправителе и времени */}
          <div className="notification-footer-modern">
            <div className="notification-timestamp-modern">
              <Clock className="w-3 h-3" />
              <span>{timestamp}</span>
            </div>
            {sender && (
              <div className="notification-sender">
                <MessageSquare className="w-3 h-3" />
                <span>{sender}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Кнопка действия */}
        {(actionUrl || actionRequired) && (
          <motion.div 
            className="notification-action-modern"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              className="action-button-modern"
              onClick={handleAction}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              style={{ backgroundColor: getTypeColor() }}
            >
              <span>Открыть</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Анимированный фон для непрочитанных */}
      {unread && (
        <motion.div
          className="notification-glow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          style={{ backgroundColor: getTypeColor() }}
        />
      )}
    </motion.div>
  );
} 