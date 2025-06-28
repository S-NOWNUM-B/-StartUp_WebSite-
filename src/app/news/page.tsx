'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  Newspaper,
  Search,
  Eye,
  Heart,
  Calendar,
  User,
  Tag,
  TrendingUp,
  Grid3X3,
  List,
  Filter,
  Megaphone,
  GraduationCap,
  Trophy,
  Info,
  FileText,
  Download,
  Share,
  Bookmark,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  MessageSquare,
  Star,
  Shield,
  Zap,
  Bell,
  ChevronRight,
  ThumbsUp,
  Activity,
  Flame,
  Image as ImageIcon,
  Play,
  Volume2,
  Users,
  Globe,
  Hash,
  Plus,
  Rss,
  Archive,
  Paperclip
} from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  content: string;
  author: string;
  authorRole: string;
  publishDate: string;
  category: 'announcements' | 'academic' | 'events' | 'achievements' | 'general' | 'urgent';
  priority: 'high' | 'medium' | 'low';
  imageUrl?: string;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  isBreaking: boolean;
  isPinned: boolean;
  readTime: number;
  videoUrl?: string;
  attachments?: string[];
}

interface QuickAction {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  badge?: string;
}

export default function NewsPageCompact() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [mounted, setMounted] = useState(true);

  const news: NewsItem[] = [
    {
      id: 1,
      title: 'СРОЧНО: Изменения в расписании экзаменов зимней сессии',
      summary: 'Администрация университета сообщает о критически важных изменениях в расписании экзаменов зимней сессии 2024 года.',
      content: 'В связи с аварийной ситуацией в главном корпусе университета, расписание экзаменов зимней сессии претерпело кардинальные изменения. Все экзамены, запланированные на 20-22 декабря, переносятся на следующую неделю.',
      author: 'Проректор по учебной работе',
      authorRole: 'Администрация',
      publishDate: '2024-12-20T08:00:00Z',
      category: 'urgent',
      priority: 'high',
      isBreaking: true,
      isPinned: true,
      tags: ['экзамены', 'расписание', 'сессия', 'срочно'],
      views: 3456,
      likes: 89,
      comments: 156,
      readTime: 3,
      imageUrl: '/api/placeholder/600/300'
    },
    {
      id: 2,
      title: 'Студенты ФИТ стали победителями международного хакатона AI Challenge',
      summary: 'Команда "QuantumCode" из 4 студентов нашего факультета одержала блестящую победу в престижном международном хакатоне по искусственному интеллекту.',
      content: 'В хакатоне приняли участие более 500 команд из 50 стран мира. Наши студенты представили революционное решение для оптимизации медицинской диагностики с использованием машинного обучения.',
      author: 'Пресс-служба университета',
      authorRole: 'Пресс-служба',
      publishDate: '2024-12-19T15:30:00Z',
      category: 'achievements',
      priority: 'high',
      isBreaking: false,
      isPinned: true,
      tags: ['хакатон', 'ИИ', 'студенты', 'победа', 'международный'],
      views: 2134,
      likes: 287,
      comments: 94,
      readTime: 5,
      imageUrl: '/api/placeholder/600/300',
      videoUrl: '/api/placeholder/video.mp4'
    },
    {
      id: 3,
      title: 'Торжественное открытие лаборатории квантовых вычислений нового поколения',
      summary: 'В университете состоялось грандиозное открытие первой в регионе лаборатории квантовых вычислений, оснащенной уникальным оборудованием стоимостью 75 млн рублей.',
      content: 'Новая лаборатория включает квантовый компьютер IBM, криогенное оборудование и суперкомпьютерные системы. Это позволит студентам и аспирантам проводить передовые исследования в области квантовых технологий.',
      author: 'Ректор университета',
      authorRole: 'Руководство',
      publishDate: '2024-12-18T12:00:00Z',
      category: 'academic',
      priority: 'high',
      isBreaking: false,
      isPinned: false,
      tags: ['лаборатория', 'наука', 'квантовые вычисления', 'оборудование'],
      views: 4567,
      likes: 342,
      comments: 78,
      readTime: 7,
      imageUrl: '/api/placeholder/600/300',
      attachments: ['plan.pdf', 'equipment.pdf']
    },
    {
      id: 4,
      title: 'Зимний фестиваль науки и творчества: программа мероприятий',
      summary: 'Студенческий совет представляет богатую программу зимнего фестиваля, включающую научные выставки, творческие конкурсы и развлекательные мероприятия.',
      content: 'С 25 декабря по 15 января состоится традиционный зимний фестиваль. В программе: выставка научных проектов, конкурс талантов, спортивные соревнования, мастер-классы и новогодние представления.',
      author: 'Председатель студсовета',
      authorRole: 'Студенческий совет',
      publishDate: '2024-12-17T09:15:00Z',
      category: 'events',
      priority: 'medium',
      isBreaking: false,
      isPinned: false,
      tags: ['фестиваль', 'мероприятия', 'культура', 'каникулы'],
      views: 1789,
      likes: 156,
      comments: 45,
      readTime: 4,
      imageUrl: '/api/placeholder/600/300'
    },
    {
      id: 5,
      title: 'Результаты стипендиальной комиссии: рекордное количество получателей',
      summary: 'По итогам зимнего семестра повышенную стипендию получили 234 студента - это максимальный показатель за последние 5 лет.',
      content: 'Стипендиальная комиссия отметила значительное повышение успеваемости студентов. Среди получателей повышенной стипендии - 89 отличников, 145 активистов и 67 призёров олимпиад.',
      author: 'Стипендиальная комиссия',
      authorRole: 'Учебная часть',
      publishDate: '2024-12-16T14:20:00Z',
      category: 'announcements',
      priority: 'medium',
      isBreaking: false,
      isPinned: false,
      tags: ['стипендия', 'студенты', 'результаты', 'успеваемость'],
      views: 2345,
      likes: 189,
      comments: 67,
      readTime: 3
    },
    {
      id: 6,
      title: 'Международная конференция по цифровым технологиям в образовании',
      summary: 'В университете пройдет престижная международная конференция с участием ведущих экспертов из 15 стран.',
      content: 'Конференция EdTech 2024 соберет более 300 участников для обсуждения инновационных подходов в образовании. Планируются мастер-классы, круглые столы и презентации стартапов.',
      author: 'Оргкомитет конференции',
      authorRole: 'Научная часть',
      publishDate: '2024-12-15T11:45:00Z',
      category: 'academic',
      priority: 'medium',
      isBreaking: false,
      isPinned: false,
      tags: ['конференция', 'EdTech', 'международное сотрудничество'],
      views: 987,
      likes: 76,
      comments: 23,
      readTime: 6
    },
    {
      id: 7,
      title: 'Новая система электронного документооборота',
      summary: 'С 1 января 2025 года в университете запускается обновленная система электронного документооборота для студентов.',
      content: 'Новая система позволит получать справки, подавать заявления и отслеживать статус документов в режиме онлайн. Внедрение займет 2 недели.',
      author: 'IT-департамент',
      authorRole: 'Техническая служба',
      publishDate: '2024-12-14T16:30:00Z',
      category: 'general',
      priority: 'low',
      isBreaking: false,
      isPinned: false,
      tags: ['документооборот', 'цифровизация', 'система'],
      views: 1234,
      likes: 45,
      comments: 18,
      readTime: 2
    },
    {
      id: 8,
      title: 'Спортивные достижения: команда по киберспорту в финале чемпионата',
      summary: 'Университетская команда по киберспорту прошла в финал российского чемпионата среди вузов.',
      content: 'Команда UniGamers обыграла соперников из МГУ и СПбГУ, продемонстрировав высокий уровень игры в дисциплинах CS:GO и Dota 2.',
      author: 'Спортивный клуб',
      authorRole: 'Спорт',
      publishDate: '2024-12-13T13:15:00Z',
      category: 'achievements',
      priority: 'medium',
      isBreaking: false,
      isPinned: false,
      tags: ['киберспорт', 'чемпионат', 'финал', 'команда'],
      views: 1567,
      likes: 234,
      comments: 89,
      readTime: 3,
      videoUrl: '/api/placeholder/video.mp4'
    }
  ];

  const categories = [
    { id: 'all', name: 'Все новости', count: news.length },
    { id: 'urgent', name: 'Срочные', count: news.filter(n => n.category === 'urgent').length },
    { id: 'announcements', name: 'Объявления', count: news.filter(n => n.category === 'announcements').length },
    { id: 'academic', name: 'Учебные', count: news.filter(n => n.category === 'academic').length },
    { id: 'events', name: 'Мероприятия', count: news.filter(n => n.category === 'events').length },
    { id: 'achievements', name: 'Достижения', count: news.filter(n => n.category === 'achievements').length },
    { id: 'general', name: 'Общие', count: news.filter(n => n.category === 'general').length }
  ];

  const quickActions: QuickAction[] = useMemo(() => [
    {
      id: 'create',
      title: 'СОЗДАТЬ',
      icon: <Plus className="w-4 h-4" />,
      description: 'Новость',
      color: 'var(--accent-blue)',
      badge: 'NEW'
    },
    {
      id: 'rss',
      title: 'RSS',
      icon: <Rss className="w-4 h-4" />,
      description: 'Подписка',
      color: 'var(--accent-green)'
    },
    {
      id: 'analytics',
      title: 'АНАЛИТИКА',
      icon: <TrendingUp className="w-4 h-4" />,
      description: 'Статистика',
      color: 'var(--accent-blue)'
    },
    {
      id: 'archive',
      title: 'АРХИВ',
      icon: <Archive className="w-4 h-4" />,
      description: 'Старые новости',
      color: 'var(--accent-green)'
    }
  ], []);

  const newsStats = useMemo(() => {
    const totalNews = news.length;
    const totalViews = news.reduce((sum, n) => sum + n.views, 0);
    const totalLikes = news.reduce((sum, n) => sum + n.likes, 0);
    const urgentNews = news.filter(n => n.isBreaking || n.category === 'urgent').length;

    return {
      total: {
        value: totalNews,
        label: 'Всего новостей',
        change: '+5',
        trend: 'up' as const
      },
      views: {
        value: totalViews,
        label: 'Просмотров',
        change: '+23%',
        trend: 'up' as const
      },
      likes: {
        value: totalLikes,
        label: 'Лайков',
        change: '+18%',
        trend: 'up' as const
      },
      urgent: {
        value: urgentNews,
        label: 'Срочных',
        change: '+1',
        trend: 'up' as const
      }
    };
  }, [news]);

  const getCategoryColor = (category: NewsItem['category']) => {
    switch (category) {
      case 'urgent': return '#ef4444';
      case 'announcements': return '#f59e0b';
      case 'academic': return 'var(--accent-blue)';
      case 'events': return 'var(--accent-green)';
      case 'achievements': return '#8b5cf6';
      case 'general': return '#6b7280';
      default: return 'var(--accent-blue)';
    }
  };

  const getPriorityColor = (priority: NewsItem['priority']) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return 'var(--accent-green)';
      default: return '#6b7280';
    }
  };

  const getCategoryIcon = (category: NewsItem['category']) => {
    switch (category) {
      case 'urgent': return <Bell className="w-4 h-4" />;
      case 'announcements': return <Megaphone className="w-4 h-4" />;
      case 'academic': return <GraduationCap className="w-4 h-4" />;
      case 'events': return <Calendar className="w-4 h-4" />;
      case 'achievements': return <Trophy className="w-4 h-4" />;
      case 'general': return <Info className="w-4 h-4" />;
      default: return <Newspaper className="w-4 h-4" />;
    }
  };

  const getCategoryName = (category: NewsItem['category']) => {
    switch (category) {
      case 'urgent': return 'Срочно';
      case 'announcements': return 'Объявление';
      case 'academic': return 'Учебное';
      case 'events': return 'Мероприятие';
      case 'achievements': return 'Достижение';
      case 'general': return 'Общее';
      default: return 'Новость';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down': return <ArrowDownRight className="w-3 h-3 text-red-500" />;
      case 'stable': return <ArrowUpRight className="w-3 h-3 text-blue-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Только что';
    if (diffInHours < 24) return `${diffInHours} ч. назад`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Вчера';
    if (diffInDays < 7) return `${diffInDays} дн. назад`;
    
    return formatDate(dateString);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const filteredNews = news.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  ).sort((a, b) => {
    // Сначала закрепленные
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    
    // Потом срочные
    if (a.isBreaking && !b.isBreaking) return -1;
    if (!a.isBreaking && b.isBreaking) return 1;
    
    // Потом по дате
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });

  const handleQuickAction = (actionId: string) => {
    const action = quickActions.find(a => a.id === actionId);
    toast.success(`Выполняется: ${action?.title}`);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const categoryName = categories.find(c => c.id === categoryId)?.name || 'Все новости';
    // toast.success(`Переключение на: ${categoryName}`); // Убрано раздражающее уведомление
  };

  const handleNewsAction = (newsItem: NewsItem, action: string) => {
    const actions = {
      like: `Лайк новости: ${newsItem.title}`,
      share: `Поделиться: ${newsItem.title}`,
      bookmark: `Добавить в закладки: ${newsItem.title}`,
      comment: `Комментировать: ${newsItem.title}`
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
          <p>Загрузка новостей...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="news-compact">
      {/* Компактный заголовок */}
      <div className="news-header-compact">
        <div className="header-main">
          <Newspaper className="w-6 h-6" />
          <div>
            <h1>Новости</h1>
            <p>{news.length} новостей • {newsStats.urgent.value} срочных</p>
          </div>
        </div>
        <div className="current-news-indicator">
          <span className="news-badge">{newsStats.views.value}</span>
          <span className="news-label">Просмотров</span>
        </div>
      </div>

      {/* Основной компактный контент */}
      <div className="news-main-compact">
        {/* Верхний ряд - статистика и быстрые действия */}
        <div className="news-top-row">
          {/* Статистика новостей */}
          <motion.div 
            className="news-stats-compact"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="stats-header">
              <h3>Статистика</h3>
              <p>Аналитика новостного портала</p>
            </div>
            <div className="stats-grid-compact">
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Newspaper className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{newsStats.total.value}</span>
                  <span className="stat-label-compact">{newsStats.total.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(newsStats.total.trend)}
                    <span>{newsStats.total.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Eye className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{formatNumber(newsStats.views.value)}</span>
                  <span className="stat-label-compact">{newsStats.views.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(newsStats.views.trend)}
                    <span>{newsStats.views.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Heart className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{formatNumber(newsStats.likes.value)}</span>
                  <span className="stat-label-compact">{newsStats.likes.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(newsStats.likes.trend)}
                    <span>{newsStats.likes.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Bell className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{newsStats.urgent.value}</span>
                  <span className="stat-label-compact">{newsStats.urgent.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(newsStats.urgent.trend)}
                    <span>{newsStats.urgent.change}</span>
                  </div>
        </div>
            </div>
            </div>
      </motion.div>

          {/* Быстрые действия */}
        <motion.div 
            className="news-actions-compact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
        >
            <h4>Быстрые действия</h4>
            <div className="actions-grid-news">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  className="action-btn-news"
                  onClick={() => handleQuickAction(action.id)}
                  style={{ '--action-color': action.color } as React.CSSProperties}
                >
                  <div className="action-icon-news">
                    {action.icon}
                    {action.badge && (
                      <span className="action-badge-news">{action.badge}</span>
                    )}
                  </div>
                  <div className="action-content-news">
                    <span className="action-title">{action.title}</span>
                    <span className="action-desc">{action.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
          </div>

        {/* Нижний ряд - новости и категории */}
        <div className="news-bottom-row">
          {/* Список новостей */}
          <motion.div 
            className="news-list-compact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
              >
            <div className="news-list-header">
              <div>
                <h3>
                  {selectedCategory === 'all' ? 'Все новости' : categories.find(c => c.id === selectedCategory)?.name}
                </h3>
                <p>{filteredNews.length} новостей найдено</p>
              </div>
              <div className="breaking-news-badge">
                <Flame className="w-4 h-4" />
                <span>Актуальные</span>
              </div>
            </div>
            
            <div className="news-grid-compact">
              {filteredNews.length > 0 ? (
                filteredNews.map((newsItem) => (
                  <div key={newsItem.id} className="news-card-compact">
                    {newsItem.isPinned && (
                      <div className="news-pinned-badge">
                        <Star className="w-3 h-3" />
                        <span>Закреплено</span>
          </div>
                    )}
                    
                    {newsItem.isBreaking && (
                      <div className="breaking-news-indicator">
                        <Bell className="w-3 h-3" />
                        <span>СРОЧНО</span>
                  </div>
                    )}
                  
                    <div className="news-card-header">
                      <div className="news-meta-info">
                        <div className="news-category-badge" style={{ backgroundColor: getCategoryColor(newsItem.category) }}>
                          {getCategoryIcon(newsItem.category)}
                          <span>{getCategoryName(newsItem.category)}</span>
                        </div>
                        <div className="news-time">
                          <Clock className="w-3 h-3" />
                          <span>{getTimeAgo(newsItem.publishDate)}</span>
                        </div>
                        {newsItem.readTime && (
                          <div className="read-time">
                            <Eye className="w-3 h-3" />
                            <span>{newsItem.readTime} мин</span>
                      </div>
                        )}
                      </div>
                      
                      <div className="news-priority" style={{ color: getPriorityColor(newsItem.priority) }}>
                        {newsItem.priority === 'high' ? <TrendingUp className="w-4 h-4" /> :
                         newsItem.priority === 'medium' ? <Info className="w-4 h-4" /> :
                         <Clock className="w-4 h-4" />}
                      </div>
                    </div>
                    
                    <div className="news-card-content">
                      <div className="news-header-info">
                        <h4>{newsItem.title}</h4>
                        {(newsItem.videoUrl || newsItem.imageUrl) && (
                          <div className="media-indicators">
                            {newsItem.videoUrl && <Play className="w-4 h-4 text-red-500" />}
                            {newsItem.imageUrl && <ImageIcon className="w-4 h-4 text-blue-500" />}
                        </div>
                        )}
                      </div>
                      
                      <div className="news-summary">
                        <p>{newsItem.summary}</p>
                      </div>
                      
                      <div className="news-author-info">
                        <div className="author-details">
                          <User className="w-3 h-3" />
                          <span className="author-name">{newsItem.author}</span>
                          <span className="author-role">• {newsItem.authorRole}</span>
                        </div>
                        
                        {newsItem.tags.length > 0 && (
                          <div className="news-tags">
                            {newsItem.tags.slice(0, 3).map((tag, index) => (
                              <span key={index} className="news-tag">
                                <Hash className="w-3 h-3" />
                                {tag}
                              </span>
                            ))}
                            {newsItem.tags.length > 3 && (
                              <span className="tags-more">+{newsItem.tags.length - 3}</span>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="news-engagement">
                        <div className="engagement-stats">
                          <div className="stat-item">
                            <Eye className="w-3 h-3" />
                            <span>{formatNumber(newsItem.views)}</span>
                          </div>
                          <div className="stat-item">
                            <Heart className="w-3 h-3" />
                            <span>{formatNumber(newsItem.likes)}</span>
                          </div>
                          <div className="stat-item">
                            <MessageSquare className="w-3 h-3" />
                            <span>{newsItem.comments}</span>
                          </div>
                        </div>
                        
                        {newsItem.attachments && newsItem.attachments.length > 0 && (
                          <div className="attachments-indicator">
                            <Paperclip className="w-3 h-3" />
                            <span>{newsItem.attachments.length} файлов</span>
                          </div>
                    )}
                  </div>
                </div>
                
                    <div className="news-card-footer">
                      <div className="news-actions">
                        <button 
                          className="news-action-btn like"
                          onClick={() => handleNewsAction(newsItem, 'like')}
                        >
                          <ThumbsUp className="w-4 h-4" />
                          <span>Лайк</span>
                        </button>
                        <button 
                          className="news-action-btn share"
                          onClick={() => handleNewsAction(newsItem, 'share')}
                        >
                          <Share className="w-4 h-4" />
                          <span>Поделиться</span>
                        </button>
                        <button 
                          className="news-action-btn bookmark"
                          onClick={() => handleNewsAction(newsItem, 'bookmark')}
                        >
                          <Bookmark className="w-4 h-4" />
                          <span>Сохранить</span>
                        </button>
                        <button 
                          className="news-action-btn comment"
                          onClick={() => handleNewsAction(newsItem, 'comment')}
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Комментировать</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-news-compact">
                  <Newspaper className="w-12 h-12" />
                  <h4>Новостей нет</h4>
                  <p>По выбранной категории новости не найдены</p>
                  <button 
                    className="view-all-news-btn"
                    onClick={() => handleCategoryChange('all')}
                  >
                    <Eye className="w-4 h-4" />
                    <span>Посмотреть все новости</span>
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
              <p>Фильтр по типам новостей</p>
            </div>
            <div className="categories-grid-compact">
              {categories.map((category) => {
                const progressPercent = (category.count / news.length) * 100;
                
                return (
                  <button
                    key={category.id}
                    className={`category-card-compact ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    <div className="category-card-header">
                      <Tag className="w-5 h-5" />
                      <span className="category-count">{category.count}</span>
                    </div>
                    <div className="category-card-content">
                      <span className="category-name">{category.name}</span>
                      <span className="category-stats">{category.count} новостей</span>
                    </div>
                    <div className="category-progress-bar">
                      <div 
                        className="category-progress-fill"
                        style={{ 
                          width: `${progressPercent}%`,
                          backgroundColor: category.id === 'all' ? 'var(--accent-blue)' : getCategoryColor(category.id as NewsItem['category'])
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