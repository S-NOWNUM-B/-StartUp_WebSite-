'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  Star,
  Send,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  User,
  Calendar,
  BookOpen,
  Users,
  Award,
  Heart,
  TrendingUp,
  TrendingDown,
  Filter,
  Search,
  ChevronDown,
  Flag,
  Share2,
  CheckCircle,
  Clock,
  Mail,
  Settings,
  Eye,
  Edit3,
  BarChart3,
  FileText,
  Download,
  Upload,
  Plus,
  Trash2,
  MoreHorizontal,
  AlertTriangle,
  Zap,
  Target,
  Building,
  Globe,
  Smartphone,
  Smile,
  Frown,
  Meh
} from 'lucide-react';

interface FeedbackForm {
  type: 'education' | 'teachers' | 'infrastructure' | 'service' | 'general';
  rating: number;
  title: string;
  message: string;
  category: string;
  isAnonymous: boolean;
  contactEmail?: string;
}

interface Review {
  id: string;
  author: string;
  title: string;
  message: string;
  rating: number;
  category: 'education' | 'teachers' | 'infrastructure' | 'service' | 'general';
  date: string;
  likes: number;
  dislikes: number;
  replies: number;
  isVerified: boolean;
  isAnonymous: boolean;
  sentiment: 'positive' | 'neutral' | 'negative';
  tags: string[];
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

export default function FeedbackPageCompact() {
  const [selectedTab, setSelectedTab] = useState<string>('write');
  const [formData, setFormData] = useState<FeedbackForm>({
    type: 'general',
    rating: 0,
    title: '',
    message: '',
    category: 'general',
    isAnonymous: false,
    contactEmail: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [mounted, setMounted] = useState(true);

  const reviews: Review[] = [
    {
      id: '1',
      author: 'Анна Петрова',
      title: 'Отличное качество образования',
      message: 'Очень довольна уровнем преподавания и современными методами обучения. Преподаватели всегда готовы помочь и объяснить сложные темы. Особенно нравятся практические занятия.',
      rating: 5,
      category: 'education',
      date: '2024-12-15',
      likes: 24,
      dislikes: 2,
      replies: 3,
      isVerified: true,
      isAnonymous: false,
      sentiment: 'positive',
      tags: ['качество', 'преподавание', 'помощь']
    },
    {
      id: '2',
      author: 'Михаил Сидоров',
      title: 'Современная техническая база',
      message: 'Университет располагает современным оборудованием и лабораториями. Библиотека работает отлично, много ресурсов для самостоятельного изучения. WiFi работает стабильно.',
      rating: 4,
      category: 'infrastructure',
      date: '2024-12-12',
      likes: 18,
      dislikes: 1,
      replies: 1,
      isVerified: true,
      isAnonymous: false,
      sentiment: 'positive',
      tags: ['оборудование', 'библиотека', 'интернет']
    },
    {
      id: '3',
      author: 'Анонимный пользователь',
      title: 'Прекрасные преподаватели',
      message: 'Особенно хочу отметить профессора Иванова - его лекции всегда интересные и познавательные. Видно, что человек любит свое дело и заботится о студентах.',
      rating: 5,
      category: 'teachers',
      date: '2024-12-10',
      likes: 31,
      dislikes: 0,
      replies: 5,
      isVerified: false,
      isAnonymous: true,
      sentiment: 'positive',
      tags: ['преподаватели', 'лекции', 'профессионализм']
    },
    {
      id: '4',
      author: 'Дмитрий Козлов',
      title: 'Есть над чем работать',
      message: 'В целом университет хороший, но хотелось бы больше практических занятий и современных программ обучения. Также стоит улучшить работу деканата.',
      rating: 3,
      category: 'service',
      date: '2024-12-08',
      likes: 12,
      dislikes: 4,
      replies: 2,
      isVerified: true,
      isAnonymous: false,
      sentiment: 'neutral',
      tags: ['практика', 'деканат', 'улучшения']
    },
    {
      id: '5',
      author: 'Елена Волкова',
      title: 'Отличная атмосфера для учебы',
      message: 'Очень нравится атмосфера в университете. Студенты дружелюбные, много интересных мероприятий. Активная студенческая жизнь помогает развиваться не только в учебе.',
      rating: 5,
      category: 'general',
      date: '2024-12-05',
      likes: 28,
      dislikes: 1,
      replies: 4,
      isVerified: true,
      isAnonymous: false,
      sentiment: 'positive',
      tags: ['атмосфера', 'мероприятия', 'развитие']
    },
    {
      id: '6',
      author: 'Анонимный пользователь',
      title: 'Проблемы с расписанием',
      message: 'Часто бывают изменения в расписании, о которых узнаем в последний момент. Это создает неудобства и мешает планированию времени.',
      rating: 2,
      category: 'service',
      date: '2024-12-03',
      likes: 8,
      dislikes: 15,
      replies: 1,
      isVerified: false,
      isAnonymous: true,
      sentiment: 'negative',
      tags: ['расписание', 'планирование', 'неудобства']
    }
  ];

  const categories = [
    { id: 'all', name: 'Все категории', count: reviews.length },
    { id: 'education', name: 'Образование', count: reviews.filter(r => r.category === 'education').length },
    { id: 'teachers', name: 'Преподаватели', count: reviews.filter(r => r.category === 'teachers').length },
    { id: 'infrastructure', name: 'Инфраструктура', count: reviews.filter(r => r.category === 'infrastructure').length },
    { id: 'service', name: 'Сервисы', count: reviews.filter(r => r.category === 'service').length },
    { id: 'general', name: 'Общее', count: reviews.filter(r => r.category === 'general').length }
  ];

  const quickActions: QuickAction[] = useMemo(() => {
    const positiveReviews = reviews.filter(r => r.sentiment === 'positive').length;
    const newReviews = reviews.filter(r => {
      const reviewDate = new Date(r.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return reviewDate >= weekAgo;
    }).length;
    
    return [
      {
        id: 'write',
        title: 'НАПИСАТЬ',
        description: 'Новый отзыв',
        icon: <Edit3 className="w-4 h-4" />,
        color: 'var(--accent-blue)',
        badge: 'NEW'
      },
      {
        id: 'analytics',
        title: 'АНАЛИТИКА',
        description: 'Статистика отзывов',
        icon: <BarChart3 className="w-4 h-4" />,
        color: 'var(--accent-green)',
        badge: positiveReviews > 0 ? `+${positiveReviews}` : undefined
      },
      {
        id: 'recent',
        title: 'НОВЫЕ',
        description: 'За последнюю неделю',
        icon: <Clock className="w-4 h-4" />,
        color: '#f59e0b',
        badge: newReviews > 0 ? `${newReviews}` : undefined,
        isNew: newReviews > 0
      },
      {
        id: 'export',
        title: 'ЭКСПОРТ',
        description: 'Сохранить отзывы',
        icon: <Download className="w-4 h-4" />,
        color: '#8b5cf6'
      }
    ];
  }, [reviews]);

  const feedbackStats = useMemo(() => {
    const totalReviews = reviews.length;
    const averageRating = Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews) * 10) / 10;
    const positiveReviews = reviews.filter(r => r.sentiment === 'positive').length;
    const totalLikes = reviews.reduce((sum, r) => sum + r.likes, 0);

    return {
      total: {
        value: totalReviews,
        label: 'Всего отзывов',
        change: '+2',
        trend: 'up' as const
      },
      rating: {
        value: averageRating,
        label: 'Средний рейтинг',
        change: '+0.1',
        trend: 'up' as const
      },
      positive: {
        value: positiveReviews,
        label: 'Положительных',
        change: '+1',
        trend: 'up' as const
      },
      engagement: {
        value: totalLikes,
        label: 'Всего лайков',
        change: '+15',
        trend: 'up' as const
      }
    };
  }, [reviews]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'education': return 'var(--accent-blue)';
      case 'teachers': return 'var(--accent-green)';
      case 'infrastructure': return '#f59e0b';
      case 'service': return '#8b5cf6';
      case 'general': return '#ec4899';
      default: return 'var(--text-secondary)';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'education': return <BookOpen className="w-4 h-4" />;
      case 'teachers': return <User className="w-4 h-4" />;
      case 'infrastructure': return <Building className="w-4 h-4" />;
      case 'service': return <Settings className="w-4 h-4" />;
      case 'general': return <MessageSquare className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <Smile className="w-4 h-4 text-green-500" />;
      case 'negative': return <Frown className="w-4 h-4 text-red-500" />;
      case 'neutral': return <Meh className="w-4 h-4 text-yellow-500" />;
      default: return <Meh className="w-4 h-4" />;
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-red-500" />;
      case 'stable': return <Target className="w-3 h-3 text-blue-500" />;
    }
  };

  const renderStars = (rating: number, size: 'sm' | 'md' = 'sm') => {
    const sizeClass = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
    return (
      <div className="stars-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'write':
        setSelectedTab('write');
        toast.success('Переход к форме отзыва');
        break;
      case 'analytics':
        setSelectedTab('stats');
        toast.success('Открытие аналитики');
        break;
      case 'recent':
        setSelectedTab('reviews');
        setFilterCategory('all');
        toast.success('Показаны новые отзывы');
        break;
      case 'export':
        toast.success('Экспорт отзывов начат');
        break;
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setFilterCategory(categoryId);
    const categoryName = categories.find(c => c.id === categoryId)?.name || 'Все категории';
    toast.success(`Фильтр: ${categoryName}`);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.message.trim() || formData.rating === 0) {
      toast.error('Пожалуйста, заполните все поля и поставьте оценку');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Спасибо за ваш отзыв! Мы ценим вашу обратную связь.');
    setFormData({
      type: 'general',
      rating: 0,
      title: '',
      message: '',
      category: 'general',
      isAnonymous: false,
      contactEmail: ''
    });
    setIsSubmitting(false);
    setSelectedTab('reviews');
  };

  const handleReviewAction = (reviewId: string, action: string) => {
    const actions = {
      'like': `Отзыв понравился`,
      'dislike': `Отзыв не понравился`,
      'reply': `Ответ на отзыв`,
      'report': `Жалоба отправлена на модерацию`,
      'share': `Отзыв скопирован для поделиться`
    };
    toast.success(actions[action as keyof typeof actions] || 'Действие выполнено');
  };

  const filteredReviews = useMemo(() => {
    return reviews.filter(review => 
      filterCategory === 'all' || review.category === filterCategory
    );
  }, [reviews, filterCategory]);

  if (!mounted) {
  return (
      <div className="loading-dashboard">
        <div className="loading-content">
          <div className="loading-spinner-modern">
            <div className="spinner"></div>
          </div>
          <p>Загрузка обратной связи...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-compact">
      {/* Компактный заголовок обратной связи */}
      <div className="feedback-header-compact">
        <div className="header-main">
          <MessageSquare className="w-6 h-6" />
          <div>
            <h1>Обратная связь</h1>
            <p>{reviews.length} отзывов • средний рейтинг {feedbackStats.rating.value}</p>
          </div>
        </div>
        <div className="current-feedback-indicator">
          <span className="feedback-badge">{feedbackStats.positive.value}</span>
          <span className="feedback-label">Положительных</span>
        </div>
      </div>

      {/* Основной компактный контент обратной связи */}
      <div className="feedback-main-compact">
        {/* Верхний ряд - статистика и быстрые действия */}
        <div className="feedback-top-row">
          {/* Статистика отзывов */}
          <motion.div 
            className="feedback-stats-compact"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="stats-header">
              <h3>Статистика</h3>
              <p>Аналитика отзывов</p>
            </div>
            <div className="stats-grid-compact">
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{feedbackStats.total.value}</span>
                  <span className="stat-label-compact">{feedbackStats.total.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(feedbackStats.total.trend)}
                    <span>{feedbackStats.total.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Star className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{feedbackStats.rating.value}</span>
                  <span className="stat-label-compact">{feedbackStats.rating.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(feedbackStats.rating.trend)}
                    <span>{feedbackStats.rating.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Smile className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{feedbackStats.positive.value}</span>
                  <span className="stat-label-compact">{feedbackStats.positive.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(feedbackStats.positive.trend)}
                    <span>{feedbackStats.positive.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Heart className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{feedbackStats.engagement.value}</span>
                  <span className="stat-label-compact">{feedbackStats.engagement.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(feedbackStats.engagement.trend)}
                    <span>{feedbackStats.engagement.change}</span>
                  </div>
                </div>
              </div>
        </div>
      </motion.div>

          {/* Быстрые действия обратной связи */}
      <motion.div 
            className="feedback-actions-compact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
      >
            <h4>Быстрые действия</h4>
            <div className="actions-grid-feedback">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  className="action-btn-feedback"
                  onClick={() => handleQuickAction(action.id)}
                  style={{ '--action-color': action.color } as React.CSSProperties}
                >
                  <div className="action-icon-feedback">
                    {action.icon}
                    {action.badge && (
                      <span className="action-badge-feedback">{action.badge}</span>
                    )}
                    {action.isNew && (
                      <div className="action-new-indicator" />
                    )}
            </div>
                  <div className="action-content-feedback">
                    <span className="action-title">{action.title}</span>
                    <span className="action-desc">{action.description}</span>
            </div>
                </button>
        ))}
            </div>
      </motion.div>
        </div>

        {/* Нижний ряд - разделы и контент */}
        <div className="feedback-bottom-row">
          {/* Навигация по разделам */}
        <motion.div 
            className="feedback-categories-compact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <div className="categories-header">
            <h3>Разделы</h3>
              <p>Управление отзывами</p>
            </div>
            <div className="tabs-navigation-compact">
              {[
                { id: 'write', name: 'Написать отзыв', icon: Edit3 },
                { id: 'reviews', name: 'Все отзывы', icon: MessageSquare },
                { id: 'stats', name: 'Аналитика', icon: BarChart3 }
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-btn-compact ${selectedTab === tab.id ? 'active' : ''}`}
                  onClick={() => setSelectedTab(tab.id)}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
          </div>

            {selectedTab === 'reviews' && (
              <div className="categories-filter">
                <h4>Фильтр по категориям</h4>
                <div className="categories-grid-compact">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className={`category-card-compact ${filterCategory === category.id ? 'active' : ''}`}
                      onClick={() => handleCategoryChange(category.id)}
              >
                      <div className="category-card-header">
                        <div className="category-icon">
                          {getCategoryIcon(category.id)}
            </div>
                        <div className="category-count">{category.count}</div>
          </div>
                      <div className="category-card-content">
                        <div className="category-name">{category.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
        </motion.div>

          {/* Основной контент обратной связи */}
        <motion.div 
            className="feedback-content-compact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <div className="feedback-content-header">
              <div>
                <h3>
                  {selectedTab === 'write' && 'Написать отзыв'}
                  {selectedTab === 'reviews' && `Отзывы (${filteredReviews.length})`}
                  {selectedTab === 'stats' && 'Аналитика отзывов'}
                </h3>
                <p>
                  {selectedTab === 'write' && 'Поделитесь своим опытом и помогите улучшить сервис'}
                  {selectedTab === 'reviews' && `${filteredReviews.length} отзывов в выбранной категории`}
                  {selectedTab === 'stats' && 'Подробная статистика и аналитика отзывов'}
                </p>
                      </div>
                    </div>
                    
            <div className="feedback-content-area">
              {selectedTab === 'write' && (
                <div className="feedback-form-section">
                  <form onSubmit={handleFormSubmit} className="feedback-form">
                    {/* Выбор типа отзыва */}
                    <div className="form-section">
                      <h4>Тип отзыва</h4>
                      <div className="feedback-types-grid">
                        {[
                          { id: 'education', name: 'Образование', icon: BookOpen, color: 'var(--accent-blue)' },
                          { id: 'teachers', name: 'Преподаватели', icon: User, color: 'var(--accent-green)' },
                          { id: 'infrastructure', name: 'Инфраструктура', icon: Building, color: '#f59e0b' },
                          { id: 'service', name: 'Сервисы', icon: Settings, color: '#8b5cf6' },
                          { id: 'general', name: 'Общее', icon: MessageSquare, color: '#ec4899' }
                        ].map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            className={`feedback-type-btn ${formData.type === type.id ? 'active' : ''}`}
                            onClick={() => setFormData(prev => ({ ...prev, type: type.id as any }))}
                            style={{ '--type-color': type.color } as React.CSSProperties}
                          >
                            <type.icon className="w-5 h-5" />
                            <span>{type.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Рейтинг */}
                    <div className="form-section">
                      <h4>Оценка</h4>
                      <div className="rating-input">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className={`star-btn ${formData.rating >= star ? 'active' : ''}`}
                            onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                          >
                            <Star className="w-6 h-6" />
                          </button>
                        ))}
                        <span className="rating-text">
                          {formData.rating > 0 && `${formData.rating} из 5 звезд`}
                          </span>
                      </div>
                    </div>

                        {/* Заголовок */}
                    <div className="form-section">
                      <label htmlFor="title">Заголовок отзыва</label>
                          <input
                        id="title"
                            type="text"
                            value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Кратко опишите ваш опыт..."
                        className="form-input"
                            required
                          />
                        </div>

                        {/* Сообщение */}
                    <div className="form-section">
                      <label htmlFor="message">Подробный отзыв</label>
                          <textarea
                        id="message"
                            value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Расскажите подробнее о вашем опыте..."
                        className="form-textarea"
                        rows={5}
                            required
                          />
                        </div>

                    {/* Дополнительные опции */}
                    <div className="form-section">
                      <div className="form-options">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={formData.isAnonymous}
                            onChange={(e) => setFormData(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                            className="checkbox-input"
                          />
                          <div className="checkbox-custom" />
                          <span>Анонимный отзыв</span>
                        </label>

                        {!formData.isAnonymous && (
                          <div className="contact-email">
                            <label htmlFor="contactEmail">Email для связи (необязательно)</label>
                          <input
                              id="contactEmail"
                            type="email"
                              value={formData.contactEmail}
                              onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                              placeholder="your@email.com"
                              className="form-input"
                            />
                          </div>
                        )}
                      </div>
                        </div>

                        {/* Кнопка отправки */}
                    <div className="form-actions">
                      <button 
                          type="submit"
                        className="submit-btn"
                        disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                            <div className="loading-spinner" />
                              <span>Отправка...</span>
                            </>
                          ) : (
                            <>
                            <Send className="w-4 h-4" />
                              <span>Отправить отзыв</span>
                            </>
                          )}
                      </button>
                      </div>
                    </form>
                </div>
              )}

              {selectedTab === 'reviews' && (
                <div className="reviews-section">
                  <div className="reviews-list">
                    {filteredReviews.map((review) => (
                      <div key={review.id} className="review-card">
                        <div className="review-header">
                          <div className="review-author-info">
                            <div className="author-avatar">
                              {review.isAnonymous ? <User className="w-4 h-4" /> : review.author[0]}
            </div>
                            <div className="author-details">
                              <div className="author-name">
                                {review.isAnonymous ? 'Анонимный пользователь' : review.author}
                                {review.isVerified && (
                                  <CheckCircle className="w-3 h-3 text-blue-500 ml-1" />
                                )}
                  </div>
                              <div className="review-date">
                                {new Date(review.date).toLocaleDateString('ru-RU')}
                              </div>
                            </div>
                          </div>
                          <div className="review-meta">
                            <div className="review-rating">
                              {renderStars(review.rating)}
                        </div>
                        <div 
                              className="review-category-badge"
                          style={{ backgroundColor: getCategoryColor(review.category) }}
                        >
                              {getCategoryIcon(review.category)}
                            </div>
                            {getSentimentIcon(review.sentiment)}
                        </div>
                      </div>
                      
                        <div className="review-content">
                          <h4 className="review-title">{review.title}</h4>
                          <p className="review-message">{review.message}</p>
                          
                          {review.tags.length > 0 && (
                            <div className="review-tags">
                              {review.tags.map((tag, index) => (
                                <span key={index} className="review-tag">
                                  #{tag}
                          </span>
                              ))}
                        </div>
                          )}
                      </div>
                      
                        <div className="review-footer">
                          <div className="review-stats">
                            <span className="stat-item">
                          <ThumbsUp className="w-3 h-3" />
                              {review.likes}
                            </span>
                            <span className="stat-item">
                              <ThumbsDown className="w-3 h-3" />
                              {review.dislikes}
                            </span>
                            <span className="stat-item">
                              <MessageSquare className="w-3 h-3" />
                              {review.replies}
                            </span>
                        </div>
                          <div className="review-actions">
                            <button 
                              className="review-action-btn like"
                              onClick={() => handleReviewAction(review.id, 'like')}
                            >
                              <ThumbsUp className="w-4 h-4" />
                            </button>
                            <button 
                              className="review-action-btn dislike"
                              onClick={() => handleReviewAction(review.id, 'dislike')}
                            >
                              <ThumbsDown className="w-4 h-4" />
                            </button>
                            <button 
                              className="review-action-btn reply"
                              onClick={() => handleReviewAction(review.id, 'reply')}
                        >
                              <MessageSquare className="w-4 h-4" />
                            </button>
                            <button 
                              className="review-action-btn more"
                              onClick={() => handleReviewAction(review.id, 'more')}
                        >
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                      </div>
                  </div>
                      </div>
              ))}
            </div>
                </div>
              )}

              {selectedTab === 'stats' && (
                <div className="stats-section">
                  <div className="stats-overview">
                    <div className="stats-cards-grid">
                      <div className="stats-card">
                        <div className="stats-card-header">
                          <BarChart3 className="w-5 h-5" />
                          <h4>Общая статистика</h4>
                        </div>
                        <div className="stats-card-content">
                          <div className="stat-row">
                            <span>Всего отзывов:</span>
                            <span className="stat-value">{reviews.length}</span>
                          </div>
                          <div className="stat-row">
                            <span>Средний рейтинг:</span>
                            <span className="stat-value">{feedbackStats.rating.value}/5</span>
                          </div>
                          <div className="stat-row">
                            <span>Положительных:</span>
                            <span className="stat-value text-green-500">{feedbackStats.positive.value}</span>
                          </div>
                          <div className="stat-row">
                            <span>Общая активность:</span>
                            <span className="stat-value">{feedbackStats.engagement.value} лайков</span>
                          </div>
                        </div>
                      </div>

                      <div className="stats-card">
                        <div className="stats-card-header">
                          <Target className="w-5 h-5" />
                          <h4>По категориям</h4>
                        </div>
                        <div className="stats-card-content">
                          {categories.slice(1).map((category) => (
                            <div key={category.id} className="category-stat">
                              <div className="category-stat-info">
                                {getCategoryIcon(category.id)}
                                <span>{category.name}</span>
                              </div>
                              <div className="category-stat-value">
                                <span>{category.count}</span>
                                <div className="category-progress-bar">
                                  <div 
                                    className="category-progress-fill"
                      style={{
                                      width: `${(category.count / reviews.length) * 100}%`,
                                      backgroundColor: getCategoryColor(category.id)
                      }}
                                  />
                        </div>
                        </div>
                      </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="stats-card">
                        <div className="stats-card-header">
                          <Heart className="w-5 h-5" />
                          <h4>Настроения</h4>
                        </div>
                        <div className="stats-card-content">
                          {['positive', 'neutral', 'negative'].map((sentiment) => {
                            const count = reviews.filter(r => r.sentiment === sentiment).length;
                            return (
                              <div key={sentiment} className="sentiment-stat">
                                <div className="sentiment-stat-info">
                                  {getSentimentIcon(sentiment)}
                          <span>
                                    {sentiment === 'positive' && 'Положительные'}
                                    {sentiment === 'neutral' && 'Нейтральные'}
                                    {sentiment === 'negative' && 'Отрицательные'}
                          </span>
                        </div>
                                <div className="sentiment-stat-value">
                                  <span>{count}</span>
                                  <span className="sentiment-percentage">
                                    {Math.round((count / reviews.length) * 100)}%
                                  </span>
                      </div>
                    </div>
                            );
                          })}
                </div>
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