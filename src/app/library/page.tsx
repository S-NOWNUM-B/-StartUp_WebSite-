'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  BookOpen,
  Search,
  Star,
  Calendar,
  User,
  MapPin,
  Download,
  FileText,
  Grid3X3,
  List,
  Filter,
  Globe,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  Coffee,
  Target,
  TrendingUp,
  Archive,
  Bookmark,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Settings,
  Zap,
  Heart,
  Users,
  Building,
  BarChart3,
  FileDown,
  BookOpenCheck,
  Library,
  Plus,
  ShoppingCart,
  Sparkles,
  Timer,
  Brain
} from 'lucide-react';

interface Book {
  id: number;
  title: string;
  author: string;
  category: 'textbook' | 'reference' | 'fiction' | 'scientific' | 'periodical';
  isbn: string;
  publisher: string;
  year: number;
  pages: number;
  language: 'ru' | 'en' | 'de' | 'fr';
  availability: 'available' | 'borrowed' | 'reserved' | 'processing';
  location: string;
  description: string;
  tags: string[];
  rating: number;
  totalCopies: number;
  availableCopies: number;
  reservations: number;
  popularity: number;
  lastBorrowed?: string;
}

interface QuickAction {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  badge?: string;
}

export default function LibraryPageCompact() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [mounted, setMounted] = useState(true);

  const books: Book[] = [
    {
      id: 1,
      title: 'Алгоритмы: построение и анализ',
      author: 'Кормен Т., Лейзерсон Ч.',
      category: 'textbook',
      isbn: '978-5-8459-0857-5',
      publisher: 'Вильямс',
      year: 2019,
      pages: 1296,
      language: 'ru',
      availability: 'available',
      location: 'Секция ИТ, полка 15-А',
      description: 'Фундаментальный учебник по алгоритмам и структурам данных. Рассматриваются основные алгоритмы сортировки, поиска, работы с графами.',
      tags: ['алгоритмы', 'программирование', 'структуры данных', 'сложность'],
      rating: 4.8,
      totalCopies: 5,
      availableCopies: 2,
      reservations: 1,
      popularity: 95,
      lastBorrowed: '2024-11-20'
    },
    {
      id: 2,
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      author: 'Robert C. Martin',
      category: 'textbook',
      isbn: '978-0-13-235088-4',
      publisher: 'Prentice Hall',
      year: 2008,
      pages: 464,
      language: 'en',
      availability: 'borrowed',
      location: 'Секция ИТ, полка 12-B',
      description: 'Практическое руководство по написанию чистого и поддерживаемого кода. Лучшие практики разработки ПО.',
      tags: ['программирование', 'практики', 'качество кода', 'рефакторинг'],
      rating: 4.6,
      totalCopies: 3,
      availableCopies: 0,
      reservations: 2,
      popularity: 88,
      lastBorrowed: '2024-11-25'
    },
    {
      id: 3,
      title: 'Математический анализ. Том 1',
      author: 'Зорич В.А.',
      category: 'textbook',
      isbn: '978-5-9710-5884-3',
      publisher: 'МЦНМО',
      year: 2018,
      pages: 704,
      language: 'ru',
      availability: 'available',
      location: 'Секция Математика, полка 5-А',
      description: 'Классический учебник по математическому анализу. Пределы, непрерывность, дифференцирование, интегрирование.',
      tags: ['математика', 'анализ', 'интегралы', 'производные', 'пределы'],
      rating: 4.9,
      totalCopies: 8,
      availableCopies: 4,
      reservations: 0,
      popularity: 92,
      lastBorrowed: '2024-11-18'
    },
    {
      id: 4,
      title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
      author: 'Gang of Four',
      category: 'reference',
      isbn: '978-0-201-63361-0',
      publisher: 'Addison-Wesley',
      year: 1994,
      pages: 395,
      language: 'en',
      availability: 'reserved',
      location: 'Секция ИТ, полка 14-C',
      description: 'Классическая книга о паттернах проектирования в объектно-ориентированном программировании.',
      tags: ['паттерны', 'ООП', 'проектирование', 'архитектура'],
      rating: 4.7,
      totalCopies: 2,
      availableCopies: 0,
      reservations: 3,
      popularity: 85,
      lastBorrowed: '2024-11-22'
    },
    {
      id: 5,
      title: 'Физика. Общий курс. Том 1. Механика',
      author: 'Сивухин Д.В.',
      category: 'textbook',
      isbn: '978-5-9221-1199-2',
      publisher: 'Физматлит',
      year: 2016,
      pages: 560,
      language: 'ru',
      availability: 'available',
      location: 'Секция Физика, полка 8-А',
      description: 'Фундаментальный курс общей физики. Кинематика, динамика, законы сохранения.',
      tags: ['физика', 'механика', 'динамика', 'кинематика'],
      rating: 4.5,
      totalCopies: 6,
      availableCopies: 3,
      reservations: 1,
      popularity: 78,
      lastBorrowed: '2024-11-15'
    },
    {
      id: 6,
      title: 'JavaScript: The Definitive Guide',
      author: 'David Flanagan',
      category: 'reference',
      isbn: '978-1-491-95202-3',
      publisher: "O'Reilly Media",
      year: 2020,
      pages: 706,
      language: 'en',
      availability: 'available',
      location: 'Секция ИТ, полка 13-A',
      description: 'Полное руководство по JavaScript. От основ до продвинутых техник программирования.',
      tags: ['javascript', 'веб-разработка', 'frontend', 'ES6+'],
      rating: 4.4,
      totalCopies: 4,
      availableCopies: 2,
      reservations: 0,
      popularity: 82,
      lastBorrowed: '2024-11-12'
    },
    {
      id: 7,
      title: 'Война и мир',
      author: 'Лев Толстой',
      category: 'fiction',
      isbn: '978-5-17-085421-4',
      publisher: 'АСТ',
      year: 2019,
      pages: 1408,
      language: 'ru',
      availability: 'available',
      location: 'Секция Литература, полка 2-B',
      description: 'Классический роман русской литературы. Эпопея о жизни русского общества в эпоху наполеоновских войн.',
      tags: ['классика', 'русская литература', 'роман', 'история'],
      rating: 4.6,
      totalCopies: 10,
      availableCopies: 7,
      reservations: 0,
      popularity: 65,
      lastBorrowed: '2024-11-08'
    },
    {
      id: 8,
      title: 'Nature Magazine',
      author: 'Nature Publishing Group',
      category: 'periodical',
      isbn: 'ISSN 0028-0836',
      publisher: 'Nature Publishing',
      year: 2024,
      pages: 120,
      language: 'en',
      availability: 'available',
      location: 'Периодика, стеллаж П-3',
      description: 'Ведущий международный журнал по естественным наукам. Выпуск ноября 2024.',
      tags: ['наука', 'исследования', 'биология', 'физика'],
      rating: 4.8,
      totalCopies: 5,
      availableCopies: 4,
      reservations: 0,
      popularity: 70,
      lastBorrowed: '2024-11-23'
    }
  ];

  const categories = [
    { id: 'all', name: 'Все книги', count: books.length },
    { id: 'textbook', name: 'Учебники', count: books.filter(b => b.category === 'textbook').length },
    { id: 'reference', name: 'Справочники', count: books.filter(b => b.category === 'reference').length },
    { id: 'scientific', name: 'Научная литература', count: books.filter(b => b.category === 'scientific').length },
    { id: 'fiction', name: 'Художественная', count: books.filter(b => b.category === 'fiction').length },
    { id: 'periodical', name: 'Периодика', count: books.filter(b => b.category === 'periodical').length }
  ];

  const quickActions: QuickAction[] = useMemo(() => [
    {
      id: 'catalog',
      title: 'КАТАЛОГ',
      icon: <Library className="w-4 h-4" />,
      description: 'Полный каталог',
      color: 'var(--accent-blue)',
      badge: 'PDF'
    },
    {
      id: 'search',
      title: 'ПОИСК',
      icon: <Search className="w-4 h-4" />,
      description: 'Найти книгу',
      color: 'var(--accent-green)'
    },
    {
      id: 'analytics',
      title: 'АНАЛИТИКА',
      icon: <BarChart3 className="w-4 h-4" />,
      description: 'Статистика',
      color: 'var(--accent-blue)'
    },
    {
      id: 'request',
      title: 'ЗАКАЗАТЬ',
      icon: <Plus className="w-4 h-4" />,
      description: 'Новую книгу',
      color: 'var(--accent-green)'
    }
  ], []);

  const libraryStats = useMemo(() => {
    const totalBooks = books.length;
    const availableBooks = books.filter(b => b.availability === 'available').length;
    const borrowedBooks = books.filter(b => b.availability === 'borrowed').length;
    const avgRating = (books.reduce((sum, b) => sum + b.rating, 0) / books.length).toFixed(1);
    const popularBooks = books.filter(b => b.popularity > 80).length;

    return {
      total: {
        value: totalBooks,
        label: 'Всего книг',
        change: '+12',
        trend: 'up' as const
      },
      available: {
        value: availableBooks,
        label: 'Доступно сейчас',
        change: '+5',
        trend: 'up' as const
      },
      rating: {
        value: avgRating,
        label: 'Средний рейтинг',
        change: '+0.2',
        trend: 'up' as const
      },
      popular: {
        value: popularBooks,
        label: 'Популярных книг',
        change: '+3',
        trend: 'up' as const
      }
    };
  }, [books]);

  const getAvailabilityColor = (availability: Book['availability']) => {
    switch (availability) {
      case 'available': return 'var(--accent-green)';
      case 'borrowed': return '#ef4444';
      case 'reserved': return '#f59e0b';
      case 'processing': return '#8b5cf6';
      default: return 'var(--text-muted)';
    }
  };

  const getAvailabilityText = (availability: Book['availability']) => {
    switch (availability) {
      case 'available': return 'Доступна';
      case 'borrowed': return 'Выдана';
      case 'reserved': return 'Забронирована';
      case 'processing': return 'Обработка';
      default: return 'Неизвестно';
    }
  };

  const getCategoryColor = (category: Book['category']) => {
    switch (category) {
      case 'textbook': return 'var(--accent-blue)';
      case 'reference': return 'var(--accent-green)';
      case 'scientific': return '#8b5cf6';
      case 'fiction': return '#f59e0b';
      case 'periodical': return '#ef4444';
      default: return 'var(--text-muted)';
    }
  };

  const getCategoryIcon = (category: Book['category']) => {
    switch (category) {
      case 'textbook': return <Target className="w-4 h-4" />;
      case 'reference': return <Bookmark className="w-4 h-4" />;
      case 'scientific': return <Award className="w-4 h-4" />;
      case 'fiction': return <Heart className="w-4 h-4" />;
      case 'periodical': return <Calendar className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getLanguageFlag = (language: Book['language']) => {
    switch (language) {
      case 'ru': return '🇷🇺';
      case 'en': return '🇺🇸';
      case 'de': return '🇩🇪';
      case 'fr': return '🇫🇷';
      default: return '📖';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down': return <ArrowDownRight className="w-3 h-3 text-red-500" />;
      case 'stable': return <ArrowUpRight className="w-3 h-3 text-blue-500" />;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  const filteredBooks = books.filter(book => 
    selectedCategory === 'all' || book.category === selectedCategory
  );

  const handleQuickAction = (actionId: string) => {
    const action = quickActions.find(a => a.id === actionId);
    toast.success(`Выполняется: ${action?.title}`);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const categoryName = categories.find(d => d.id === categoryId)?.name || 'Все книги';
    // toast.success(`Переключение на: ${categoryName}`); // Убрано раздражающее уведомление
  };

  const handleBookAction = (book: Book, action: string) => {
    const actions = {
      borrow: `Бронирование книги: ${book.title}`,
      reserve: `Резервирование: ${book.title}`,
      info: `Подробная информация о: ${book.title}`
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
          <p>Загрузка библиотеки...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="library-compact">
      {/* Компактный заголовок */}
      <div className="library-header-compact">
        <div className="header-main">
          <Library className="w-6 h-6" />
          <div>
            <h1>Библиотека</h1>
            <p>{books.length} книг • Средний рейтинг: {libraryStats.rating.value}</p>
          </div>
        </div>
        <div className="current-library-indicator">
          <span className="library-badge">{libraryStats.available.value}</span>
          <span className="library-label">Доступно</span>
        </div>
      </div>

      {/* Основной компактный контент */}
      <div className="library-main-compact">
        {/* Верхний ряд - статистика и быстрые действия */}
        <div className="library-top-row">
          {/* Статистика библиотеки */}
          <motion.div 
            className="library-stats-compact"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="stats-header">
              <h3>Статистика</h3>
              <p>Фонд библиотеки</p>
            </div>
            <div className="stats-grid-compact">
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Library className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{libraryStats.total.value}</span>
                  <span className="stat-label-compact">{libraryStats.total.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(libraryStats.total.trend)}
                    <span>{libraryStats.total.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <BookOpenCheck className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{libraryStats.available.value}</span>
                  <span className="stat-label-compact">{libraryStats.available.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(libraryStats.available.trend)}
                    <span>{libraryStats.available.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Star className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{libraryStats.rating.value}</span>
                  <span className="stat-label-compact">{libraryStats.rating.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(libraryStats.rating.trend)}
                    <span>{libraryStats.rating.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{libraryStats.popular.value}</span>
                  <span className="stat-label-compact">{libraryStats.popular.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(libraryStats.popular.trend)}
                    <span>{libraryStats.popular.change}</span>
                  </div>
        </div>
            </div>
            </div>
      </motion.div>

          {/* Быстрые действия */}
        <motion.div 
            className="library-actions-compact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
        >
            <h4>Быстрые действия</h4>
            <div className="actions-grid-library">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  className="action-btn-library"
                  onClick={() => handleQuickAction(action.id)}
                  style={{ '--action-color': action.color } as React.CSSProperties}
                >
                  <div className="action-icon-library">
                    {action.icon}
                    {action.badge && (
                      <span className="action-badge-library">{action.badge}</span>
                    )}
                  </div>
                  <div className="action-content-library">
                    <span className="action-title">{action.title}</span>
                    <span className="action-desc">{action.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
          </div>

        {/* Нижний ряд - книги и категории */}
        <div className="library-bottom-row">
          {/* Список книг */}
          <motion.div 
            className="books-list-compact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
              >
            <div className="books-list-header">
              <div>
                <h3>
                  {selectedCategory === 'all' ? 'Все книги' : categories.find(c => c.id === selectedCategory)?.name}
                </h3>
                <p>{filteredBooks.length} книг найдено</p>
              </div>
              <div className="popular-book-badge">
                <Sparkles className="w-4 h-4" />
                <span>Популярные новинки</span>
              </div>
            </div>
            
            <div className="books-grid-compact">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <div key={book.id} className="book-card-compact">
                    <div className="book-card-header">
                      <div className="book-rating">
                        {renderStars(book.rating)}
                        <span className="rating-value">({book.rating})</span>
                        </div>
                        <div 
                        className="book-availability-badge"
                          style={{ backgroundColor: getAvailabilityColor(book.availability) }}
                        >
                          {getAvailabilityText(book.availability)}
                        </div>
                      </div>
                      
                    <div className="book-card-content">
                      <div className="book-header-info">
                        <h5>{book.title}</h5>
                        <div className="book-category-badge" style={{ color: getCategoryColor(book.category) }}>
                          {getCategoryIcon(book.category)}
                          <span>{book.category === 'textbook' ? 'Учебник' : 
                                 book.category === 'reference' ? 'Справочник' :
                                 book.category === 'scientific' ? 'Научная' :
                                 book.category === 'fiction' ? 'Художественная' : 'Периодика'}</span>
                        </div>
                      </div>
                      
                      <div className="book-meta-info">
                        <div className="book-author">
                          <User className="w-3 h-3" />
                          <span>{book.author}</span>
                        </div>
                        <div className="book-details">
                          <Calendar className="w-3 h-3" />
                          <span>{book.year} • {book.pages} стр.</span>
                        </div>
                        <div className="book-language">
                          <Globe className="w-3 h-3" />
                          <span>{getLanguageFlag(book.language)} {book.language.toUpperCase()}</span>
                        </div>
                      </div>
                      
                      <div className="book-tags">
                        {book.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="book-tag">
                            {tag}
                          </span>
                        ))}
                        {book.tags.length > 3 && (
                          <span className="book-tag-more">+{book.tags.length - 3}</span>
                        )}
                      </div>
                      
                      <div className="book-location-info">
                        <MapPin className="w-3 h-3" />
                        <span>{book.location}</span>
                      </div>
                      
                      <div className="book-copies-info">
                        <Archive className="w-3 h-3" />
                        <span>Доступно: {book.availableCopies}/{book.totalCopies}</span>
                        {book.reservations > 0 && (
                          <span className="reservations-info">• {book.reservations} бронь</span>
                        )}
                        </div>
                      </div>
                      
                    <div className="book-card-footer">
                      <div className="book-popularity">
                        <TrendingUp className="w-4 h-4" />
                        <span>{book.popularity}%</span>
                        <span className="popularity-label">популярность</span>
                      </div>
                      {book.availability === 'available' ? (
                        <button 
                          className="borrow-book-btn"
                          onClick={() => handleBookAction(book, 'borrow')}
                        >
                          <BookOpenCheck className="w-4 h-4" />
                          <span>Взять</span>
                        </button>
                      ) : (
                        <button 
                          className="reserve-book-btn"
                          onClick={() => handleBookAction(book, 'reserve')}
                          disabled={book.availability === 'processing'}
                      >
                          <Timer className="w-4 h-4" />
                          <span>{book.availability === 'borrowed' ? 'Забронировать' : 
                                 book.availability === 'reserved' ? 'В очереди' : 'Обработка'}</span>
                        </button>
                      )}
                          </div>
                        </div>
                ))
              ) : (
                <div className="no-books-compact">
                  <BookOpen className="w-12 h-12" />
                  <h4>Книг нет</h4>
                  <p>По выбранной категории книги не найдены</p>
                  <button 
                    className="view-all-books-btn"
                    onClick={() => handleCategoryChange('all')}
                  >
                    <Eye className="w-4 h-4" />
                    <span>Посмотреть все книги</span>
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
              <p>Фильтр по типам</p>
            </div>
            <div className="categories-grid-compact">
              {categories.map((category) => {
                const progressPercent = (category.count / books.length) * 100;
                
                return (
                  <button
                    key={category.id}
                    className={`category-card-compact ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    <div className="category-card-header">
                      <BookOpen className="w-5 h-5" />
                      <span className="category-count">{category.count}</span>
                    </div>
                    <div className="category-card-content">
                      <span className="category-name">{category.name}</span>
                      <span className="category-stats">{category.count} книг</span>
                        </div>
                    <div className="category-progress-bar">
                      <div 
                        className="category-progress-fill"
                        style={{ 
                          width: `${progressPercent}%`,
                          backgroundColor: category.id === 'all' ? 'var(--accent-blue)' : getCategoryColor(category.id as Book['category'])
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