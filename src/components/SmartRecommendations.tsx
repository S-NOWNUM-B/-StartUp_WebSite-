'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  Brain,
  TrendingUp,
  Clock,
  BookOpen,
  Target,
  Lightbulb,
  Zap,
  AlertCircle,
  CheckCircle,
  Calendar,
  Award,
  Users,
  X
} from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'study' | 'schedule' | 'social' | 'wellness' | 'achievement';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  action: string;
  actionUrl: string;
  confidence: number;
  reason: string;
}

interface SmartRecommendationsProps {
  userId?: string;
  context?: 'dashboard' | 'page';
  maxRecommendations?: number;
}

export default function SmartRecommendations({ 
  userId, 
  context = 'dashboard', 
  maxRecommendations = 3 
}: SmartRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState<string[]>([]);

  useEffect(() => {
    generateRecommendations();
  }, [userId]);

  const generateRecommendations = () => {
    setLoading(true);
    
    // Симуляция AI-анализа активности пользователя
    setTimeout(() => {
      const mockRecommendations: Recommendation[] = [
        {
          id: '1',
          type: 'study',
          title: 'Оптимизируйте время изучения математики',
          description: 'На основе ваших оценок рекомендуем уделить больше времени математическому анализу',
          priority: 'high',
          action: 'Создать план занятий',
          actionUrl: '/schedule/create-plan',
          confidence: 92,
          reason: 'Средний балл по математике ниже общего на 0.3 балла'
        },
        {
          id: '2',
          type: 'schedule',
          title: 'Лучшее время для занятий',
          description: 'Ваша продуктивность максимальна в 10:00-12:00. Запланируйте сложные предметы на это время',
          priority: 'medium',
          action: 'Настроить расписание',
          actionUrl: '/schedule/optimize',
          confidence: 87,
          reason: 'Анализ активности показывает пик концентрации утром'
        },
        {
          id: '3',
          type: 'social',
          title: 'Присоединитесь к группе по программированию',
          description: 'Студенты в группах изучения показывают на 23% лучшие результаты',
          priority: 'medium',
          action: 'Найти группу',
          actionUrl: '/groups/programming',
          confidence: 78,
          reason: 'Ваш интерес к программированию и хорошие результаты'
        },
        {
          id: '4',
          type: 'wellness',
          title: 'Время для перерыва',
          description: 'Вы занимаетесь 3 часа подряд. Рекомендуем 15-минутный перерыв для лучшей концентрации',
          priority: 'high',
          action: 'Сделать перерыв',
          actionUrl: '/wellness/break',
          confidence: 95,
          reason: 'Непрерывная активность более 3 часов снижает эффективность на 40%'
        },
        {
          id: '5',
          type: 'achievement',
          title: 'Вы близки к достижению "Отличник месяца"',
          description: 'Еще 2 отличные оценки и вы получите значок отличника!',
          priority: 'low',
          action: 'Посмотреть прогресс',
          actionUrl: '/achievements/excellent-student',
          confidence: 89,
          reason: 'У вас 8 из 10 необходимых отличных оценок'
        }
      ];

      setRecommendations(mockRecommendations.slice(0, maxRecommendations));
      setLoading(false);
    }, 1500);
  };

  const getTypeIcon = (type: Recommendation['type']) => {
    switch (type) {
      case 'study': return <BookOpen className="w-5 h-5" />;
      case 'schedule': return <Clock className="w-5 h-5" />;
      case 'social': return <Users className="w-5 h-5" />;
      case 'wellness': return <Target className="w-5 h-5" />;
      case 'achievement': return <Award className="w-5 h-5" />;
      default: return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: Recommendation['type']) => {
    switch (type) {
      case 'study': return 'var(--accent-blue)';
      case 'schedule': return 'var(--accent-purple)';
      case 'social': return 'var(--accent-green)';
      case 'wellness': return 'var(--accent-orange)';
      case 'achievement': return 'var(--accent-yellow)';
      default: return 'var(--accent-blue)';
    }
  };

  const getPriorityIcon = (priority: Recommendation['priority']) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-4 h-4" />;
      case 'medium': return <Clock className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: Recommendation['priority']) => {
    switch (priority) {
      case 'high': return 'var(--accent-red)';
      case 'medium': return 'var(--accent-orange)';
      case 'low': return 'var(--accent-green)';
      default: return 'var(--accent-blue)';
    }
  };

  const handleAction = (recommendation: Recommendation) => {
    toast.success(`Выполняется: ${recommendation.action}`);
    // Здесь была бы навигация или API вызов
    console.log('Action:', recommendation.actionUrl);
  };

  const dismissRecommendation = (id: string) => {
    setDismissed([...dismissed, id]);
    toast.success('Рекомендация скрыта');
  };

  const visibleRecommendations = recommendations.filter(r => !dismissed.includes(r.id));

  if (loading) {
    return (
      <div className="smart-recommendations loading">
        <div className="recommendations-header">
          <div className="header-icon">
            <Brain className="w-6 h-6" style={{ color: 'var(--accent-blue)' }} />
          </div>
          <div className="header-text">
            <h3>AI Рекомендации</h3>
            <p>Анализируем вашу активность...</p>
          </div>
        </div>
        <div className="loading-container">
          <div className="ai-loading-spinner">
            <Zap className="w-8 h-8" />
          </div>
          <p>Генерируем персональные рекомендации</p>
        </div>
      </div>
    );
  }

  if (visibleRecommendations.length === 0) {
    return (
      <div className="smart-recommendations empty">
        <div className="recommendations-header">
          <div className="header-icon">
            <Brain className="w-6 h-6" style={{ color: 'var(--accent-blue)' }} />
          </div>
          <div className="header-text">
            <h3>AI Рекомендации</h3>
            <p>Пока нет новых рекомендаций</p>
          </div>
        </div>
        <div className="empty-state">
          <CheckCircle className="w-12 h-12" style={{ color: 'var(--accent-green)' }} />
          <p>Отлично! Вы следуете всем рекомендациям</p>
          <button 
            className="refresh-btn"
            onClick={generateRecommendations}
          >
            <TrendingUp className="w-4 h-4" />
            Обновить анализ
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="smart-recommendations"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="recommendations-header">
        <div className="header-icon">
          <Brain className="w-6 h-6" style={{ color: 'var(--accent-blue)' }} />
        </div>
        <div className="header-text">
          <h3>AI Рекомендации</h3>
          <p>Персональные советы на основе вашей активности</p>
        </div>
        <motion.button
          className="refresh-btn"
          onClick={generateRecommendations}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <TrendingUp className="w-4 h-4" />
        </motion.button>
      </div>

      <div className="recommendations-list">
        <AnimatePresence mode="popLayout">
          {visibleRecommendations.map((recommendation, index) => (
            <motion.div
              key={recommendation.id}
              className="recommendation-card"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <div className="recommendation-header">
                <div 
                  className="type-icon"
                  style={{ color: getTypeColor(recommendation.type) }}
                >
                  {getTypeIcon(recommendation.type)}
                </div>
                <div 
                  className="priority-badge"
                  style={{ 
                    backgroundColor: getPriorityColor(recommendation.priority),
                    color: 'white'
                  }}
                >
                  {getPriorityIcon(recommendation.priority)}
                  <span>{recommendation.priority.toUpperCase()}</span>
                </div>
                <motion.button
                  className="dismiss-btn"
                  onClick={() => dismissRecommendation(recommendation.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="recommendation-content">
                <h4 className="recommendation-title">{recommendation.title}</h4>
                <p className="recommendation-description">{recommendation.description}</p>
                <div className="recommendation-reason">
                  <Lightbulb className="w-3 h-3" />
                  <span>{recommendation.reason}</span>
                </div>
              </div>

              <div className="recommendation-footer">
                <div className="confidence-meter">
                  <span className="confidence-label">Уверенность</span>
                  <div className="confidence-bar">
                    <motion.div
                      className="confidence-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${recommendation.confidence}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      style={{ backgroundColor: getTypeColor(recommendation.type) }}
                    />
                  </div>
                  <span className="confidence-value">{recommendation.confidence}%</span>
                </div>
                <motion.button
                  className="action-btn"
                  onClick={() => handleAction(recommendation)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ backgroundColor: getTypeColor(recommendation.type) }}
                >
                  {recommendation.action}
                  <Zap className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
} 