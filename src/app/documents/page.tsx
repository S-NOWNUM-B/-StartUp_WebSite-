'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  FileText,
  Download,
  Eye,
  Calendar,
  User,
  Building,
  Grid3X3,
  List,
  Filter,
  CheckCircle,
  AlertCircle,
  Clock,
  Upload,
  Archive,
  PlusCircle,
  TrendingUp,
  FileCheck,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  Zap,
  Shield,
  Folder,
  Search,
  Files,
  CloudDownload,
  FileImage,
  FileSpreadsheet,
  FileVideo,
  Paperclip,
  Star,
  Timer,
  BookOpen,
  CreditCard,
  GraduationCap,
  HardDrive,
  Share2,
  Edit3,
  MoreHorizontal
} from 'lucide-react';

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  date: string;
  category: 'academic' | 'personal' | 'administrative' | 'financial';
  status: 'available' | 'processing' | 'expired' | 'pending';
  description: string;
  downloadCount: number;
  isStarred: boolean;
  lastViewed?: string;
  validUntil?: string;
  issuer: string;
  documentNumber?: string;
}

interface QuickAction {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  badge?: string;
}

export default function DocumentsPageCompact() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [mounted, setMounted] = useState(true);

  const documents: Document[] = [
    { 
      id: 1, 
      name: 'Справка об обучении', 
      type: 'PDF', 
      size: '245 KB', 
      date: '2024-12-15',
      category: 'academic',
      status: 'available',
      description: 'Официальная справка о том, что студент является обучающимся университета',
      downloadCount: 3,
      isStarred: true,
      lastViewed: '2024-12-20',
      validUntil: '2025-03-15',
      issuer: 'Деканат',
      documentNumber: 'СПР-2024-1234'
    },
    { 
      id: 2, 
      name: 'Зачетная книжка', 
      type: 'PDF', 
      size: '1.2 MB', 
      date: '2024-12-10',
      category: 'academic',
      status: 'available',
      description: 'Цифровая копия зачетной книжки с отметками о сданных экзаменах и зачетах',
      downloadCount: 15,
      isStarred: true,
      lastViewed: '2024-12-18',
      issuer: 'Учебный отдел',
      documentNumber: 'ЗК-2024-5678'
    },
    { 
      id: 3, 
      name: 'Расписание занятий', 
      type: 'PDF', 
      size: '890 KB', 
      date: '2024-12-05',
      category: 'academic',
      status: 'available',
      description: 'Актуальное расписание лекций, семинаров и практических занятий на семестр',
      downloadCount: 7,
      isStarred: false,
      lastViewed: '2024-12-19',
      validUntil: '2025-02-01',
      issuer: 'Диспетчерская',
      documentNumber: 'РСП-2024-9012'
    },
    { 
      id: 4, 
      name: 'Справка о доходах', 
      type: 'PDF', 
      size: '320 KB', 
      date: '2024-12-01',
      category: 'financial',
      status: 'processing',
      description: 'Справка о доходах для получения социальной стипендии',
      downloadCount: 0,
      isStarred: false,
      issuer: 'Бухгалтерия',
      documentNumber: 'СД-2024-3456'
    },
    { 
      id: 5, 
      name: 'Учебный план', 
      type: 'PDF', 
      size: '1.5 MB', 
      date: '2024-11-28',
      category: 'administrative',
      status: 'available',
      description: 'Детальный учебный план по направлению подготовки с разбивкой по семестрам',
      downloadCount: 5,
      isStarred: false,
      lastViewed: '2024-12-16',
      validUntil: '2025-06-30',
      issuer: 'Учебно-методический отдел',
      documentNumber: 'УП-2024-7890'
    },
    {
      id: 6,
      name: 'Справка о составе семьи',
      type: 'PDF',
      size: '156 KB',
      date: '2024-11-20',
      category: 'personal',
      status: 'available',
      description: 'Справка из паспортного стола о составе семьи для льгот и пособий',
      downloadCount: 2,
      isStarred: false,
      lastViewed: '2024-12-10',
      validUntil: '2025-05-20',
      issuer: 'Паспортный стол',
      documentNumber: 'ССС-2024-2345'
    },
    {
      id: 7,
      name: 'Академическая справка',
      type: 'PDF',
      size: '2.1 MB',
      date: '2024-11-15',
      category: 'academic',
      status: 'available',
      description: 'Полная академическая справка с перечнем изученных дисциплин и оценок',
      downloadCount: 8,
      isStarred: true,
      lastViewed: '2024-12-17',
      validUntil: '2025-11-15',
      issuer: 'Деканат',
      documentNumber: 'АС-2024-6789'
    },
    {
      id: 8,
      name: 'Медицинская справка',
      type: 'PDF',
      size: '425 KB',
      date: '2024-11-10',
      category: 'personal',
      status: 'available',
      description: 'Медицинская справка формы 086/у для поступления в университет',
      downloadCount: 1,
      isStarred: false,
      lastViewed: '2024-11-12',
      validUntil: '2025-11-10',
      issuer: 'Медицинский центр',
      documentNumber: 'МС-2024-4567'
    },
    {
      id: 9,
      name: 'Договор об обучении',
      type: 'PDF',
      size: '780 KB',
      date: '2024-11-05',
      category: 'administrative',
      status: 'available',
      description: 'Официальный договор на оказание образовательных услуг',
      downloadCount: 12,
      isStarred: true,
      lastViewed: '2024-12-15',
      validUntil: '2028-06-30',
      issuer: 'Приемная комиссия',
      documentNumber: 'ДО-2024-8901'
    },
    {
      id: 10,
      name: 'Квитанция об оплате',
      type: 'PDF',
      size: '198 KB',
      date: '2024-10-30',
      category: 'financial',
      status: 'pending',
      description: 'Квитанция об оплате обучения за осенний семестр 2024 года',
      downloadCount: 4,
      isStarred: false,
      lastViewed: '2024-11-05',
      issuer: 'Бухгалтерия',
      documentNumber: 'КВ-2024-1122'
    }
  ];

  const categories = [
    { id: 'all', name: 'Все документы', count: documents.length },
    { id: 'academic', name: 'Учебные', count: documents.filter(d => d.category === 'academic').length },
    { id: 'personal', name: 'Личные', count: documents.filter(d => d.category === 'personal').length },
    { id: 'administrative', name: 'Административные', count: documents.filter(d => d.category === 'administrative').length },
    { id: 'financial', name: 'Финансовые', count: documents.filter(d => d.category === 'financial').length }
  ];

  const quickActions: QuickAction[] = useMemo(() => [
    {
      id: 'request',
      title: 'ЗАПРОСИТЬ',
      icon: <PlusCircle className="w-4 h-4" />,
      description: 'Новый документ',
      color: 'var(--accent-blue)',
      badge: 'NEW'
    },
    {
      id: 'upload',
      title: 'ЗАГРУЗИТЬ',
      icon: <Upload className="w-4 h-4" />,
      description: 'Файл документа',
      color: 'var(--accent-green)'
    },
    {
      id: 'archive',
      title: 'АРХИВ',
      icon: <Archive className="w-4 h-4" />,
      description: 'Старые документы',
      color: 'var(--accent-blue)'
    },
    {
      id: 'search',
      title: 'ПОИСК',
      icon: <Search className="w-4 h-4" />,
      description: 'Найти документ',
      color: 'var(--accent-green)'
    }
  ], []);

  const documentsStats = useMemo(() => {
    const totalDocuments = documents.length;
    const availableDocuments = documents.filter(d => d.status === 'available').length;
    const processingDocuments = documents.filter(d => d.status === 'processing').length;
    const starredDocuments = documents.filter(d => d.isStarred).length;
    const totalDownloads = documents.reduce((sum, d) => sum + d.downloadCount, 0);

    return {
      total: {
        value: totalDocuments,
        label: 'Всего документов',
        change: '+3',
        trend: 'up' as const
      },
      available: {
        value: availableDocuments,
        label: 'Доступно сейчас',
        change: '+2',
        trend: 'up' as const
      },
      starred: {
        value: starredDocuments,
        label: 'Избранных',
        change: '+1',
        trend: 'up' as const
      },
      downloads: {
        value: totalDownloads,
        label: 'Скачиваний',
        change: '+8',
        trend: 'up' as const
      }
    };
  }, [documents]);

  const getDocumentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf': return <FileText className="w-4 h-4" />;
      case 'doc':
      case 'docx': return <FileText className="w-4 h-4" />;
      case 'xls':
      case 'xlsx': return <FileSpreadsheet className="w-4 h-4" />;
      case 'jpg':
      case 'jpeg':
      case 'png': return <FileImage className="w-4 h-4" />;
      case 'mp4':
      case 'avi': return <FileVideo className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'available': return 'var(--accent-green)';
      case 'processing': return '#f59e0b';
      case 'expired': return '#ef4444';
      case 'pending': return '#8b5cf6';
      default: return 'var(--text-muted)';
    }
  };

  const getStatusText = (status: Document['status']) => {
    switch (status) {
      case 'available': return 'Доступен';
      case 'processing': return 'Обработка';
      case 'expired': return 'Истёк';
      case 'pending': return 'Ожидание';
      default: return 'Неизвестно';
    }
  };

  const getCategoryColor = (category: Document['category']) => {
    switch (category) {
      case 'academic': return 'var(--accent-blue)';
      case 'personal': return 'var(--accent-green)';
      case 'administrative': return '#8b5cf6';
      case 'financial': return '#f59e0b';
      default: return 'var(--text-muted)';
    }
  };

  const getCategoryIcon = (category: Document['category']) => {
    switch (category) {
      case 'academic': return <GraduationCap className="w-4 h-4" />;
      case 'personal': return <User className="w-4 h-4" />;
      case 'administrative': return <Building className="w-4 h-4" />;
      case 'financial': return <CreditCard className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getCategoryName = (category: Document['category']) => {
    switch (category) {
      case 'academic': return 'Учебный';
      case 'personal': return 'Личный';
      case 'administrative': return 'Административный';
      case 'financial': return 'Финансовый';
      default: return 'Документ';
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

  const getFileSize = (sizeString: string) => {
    return sizeString;
  };

  const filteredDocuments = documents.filter(doc => 
    selectedCategory === 'all' || doc.category === selectedCategory
  );

  const handleQuickAction = (actionId: string) => {
    const action = quickActions.find(a => a.id === actionId);
    toast.success(`Выполняется: ${action?.title}`);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const categoryName = categories.find(d => d.id === categoryId)?.name || 'Все документы';
    toast.success(`Переключение на: ${categoryName}`);
  };

  const handleDocumentAction = (document: Document, action: string) => {
    const actions = {
      download: `Скачивание: ${document.name}`,
      view: `Просмотр: ${document.name}`,
      star: `${document.isStarred ? 'Удаление из' : 'Добавление в'} избранное`,
      share: `Поделиться документом: ${document.name}`
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
          <p>Загрузка документов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="documents-compact">
      {/* Компактный заголовок */}
      <div className="documents-header-compact">
        <div className="header-main">
          <Files className="w-6 h-6" />
          <div>
            <h1>Документы</h1>
            <p>{documents.length} документов • {documentsStats.available.value} доступно</p>
          </div>
        </div>
        <div className="current-documents-indicator">
          <span className="documents-badge">{documentsStats.starred.value}</span>
          <span className="documents-label">Избранных</span>
        </div>
      </div>

      {/* Основной компактный контент */}
      <div className="documents-main-compact">
        {/* Верхний ряд - статистика и быстрые действия */}
        <div className="documents-top-row">
          {/* Статистика документов */}
          <motion.div 
            className="documents-stats-compact"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="stats-header">
              <h3>Статистика</h3>
              <p>Управление документами</p>
            </div>
            <div className="stats-grid-compact">
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Files className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{documentsStats.total.value}</span>
                  <span className="stat-label-compact">{documentsStats.total.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(documentsStats.total.trend)}
                    <span>{documentsStats.total.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{documentsStats.available.value}</span>
                  <span className="stat-label-compact">{documentsStats.available.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(documentsStats.available.trend)}
                    <span>{documentsStats.available.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Star className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{documentsStats.starred.value}</span>
                  <span className="stat-label-compact">{documentsStats.starred.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(documentsStats.starred.trend)}
                    <span>{documentsStats.starred.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <CloudDownload className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{documentsStats.downloads.value}</span>
                  <span className="stat-label-compact">{documentsStats.downloads.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(documentsStats.downloads.trend)}
                    <span>{documentsStats.downloads.change}</span>
                  </div>
        </div>
            </div>
            </div>
      </motion.div>

          {/* Быстрые действия */}
        <motion.div 
            className="documents-actions-compact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
        >
            <h4>Быстрые действия</h4>
            <div className="actions-grid-documents">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  className="action-btn-documents"
                  onClick={() => handleQuickAction(action.id)}
                  style={{ '--action-color': action.color } as React.CSSProperties}
                >
                  <div className="action-icon-documents">
                    {action.icon}
                    {action.badge && (
                      <span className="action-badge-documents">{action.badge}</span>
                    )}
                  </div>
                  <div className="action-content-documents">
                    <span className="action-title">{action.title}</span>
                    <span className="action-desc">{action.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
          </div>

        {/* Нижний ряд - документы и категории */}
        <div className="documents-bottom-row">
          {/* Список документов */}
          <motion.div 
            className="documents-list-compact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
              >
            <div className="documents-list-header">
              <div>
                <h3>
                  {selectedCategory === 'all' ? 'Все документы' : categories.find(c => c.id === selectedCategory)?.name}
                </h3>
                <p>{filteredDocuments.length} документов найдено</p>
              </div>
              <div className="recent-documents-badge">
                <Timer className="w-4 h-4" />
                <span>Недавние</span>
              </div>
            </div>
            
            <div className="documents-grid-compact">
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((document) => (
                  <div key={document.id} className="document-card-compact">
                    <div className="document-card-header">
                      <div className="document-type-info">
                        {getDocumentIcon(document.type)}
                        <span className="document-type">{document.type}</span>
                        <span className="document-size">{document.size}</span>
                  </div>
                      <div className="document-status-actions">
                        {document.isStarred && (
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        )}
                        <div 
                          className="document-status-badge"
                          style={{ backgroundColor: getStatusColor(document.status) }}
                        >
                          {getStatusText(document.status)}
                        </div>
                        </div>
                      </div>
                      
                    <div className="document-card-content">
                      <div className="document-header-info">
                        <h5>{document.name}</h5>
                        <div className="document-category-badge" style={{ color: getCategoryColor(document.category) }}>
                          {getCategoryIcon(document.category)}
                          <span>{getCategoryName(document.category)}</span>
                        </div>
                      </div>
                      
                      <div className="document-description">
                        <p>{document.description}</p>
                      </div>
                      
                      <div className="document-meta-info">
                        <div className="document-date">
                          <Calendar className="w-3 h-3" />
                          <span>Выдан: {formatDate(document.date)}</span>
                        </div>
                        <div className="document-issuer">
                          <Building className="w-3 h-3" />
                          <span>{document.issuer}</span>
                        </div>
                        {document.documentNumber && (
                          <div className="document-number">
                            <Paperclip className="w-3 h-3" />
                            <span>№ {document.documentNumber}</span>
                      </div>
                        )}
                        {document.validUntil && (
                          <div className="document-validity">
                            <Timer className="w-3 h-3" />
                            <span>Действует до: {formatDate(document.validUntil)}</span>
                        </div>
                        )}
                      </div>
                      
                      <div className="document-activity-info">
                        {document.lastViewed && (
                          <div className="last-viewed">
                            <Eye className="w-3 h-3" />
                            <span>Просмотрен: {formatDate(document.lastViewed)}</span>
                          </div>
                        )}
                        <div className="download-count">
                          <CloudDownload className="w-3 h-3" />
                          <span>Скачан: {document.downloadCount} раз</span>
                        </div>
                          </div>
                        </div>
                        
                    <div className="document-card-footer">
                      <div className="document-actions">
                        {document.status === 'available' ? (
                          <>
                            <button 
                              className="document-action-btn view"
                              onClick={() => handleDocumentAction(document, 'view')}
                            >
                              <Eye className="w-4 h-4" />
                              <span>Просмотр</span>
                            </button>
                            <button 
                              className="document-action-btn download"
                              onClick={() => handleDocumentAction(document, 'download')}
                              >
                              <Download className="w-4 h-4" />
                              <span>Скачать</span>
                            </button>
                          </>
                        ) : (
                          <button 
                            className="document-action-btn disabled"
                            disabled
                          >
                            <Clock className="w-4 h-4" />
                            <span>{getStatusText(document.status)}</span>
                          </button>
                        )}
                        <button 
                          className="document-action-btn more"
                          onClick={() => handleDocumentAction(document, 'share')}
                              >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                            </div>
                          </div>
                        </div>
                ))
              ) : (
                <div className="no-documents-compact">
                  <FileText className="w-12 h-12" />
                  <h4>Документов нет</h4>
                  <p>По выбранной категории документы не найдены</p>
                  <button 
                    className="view-all-documents-btn"
                    onClick={() => handleCategoryChange('all')}
                  >
                    <Eye className="w-4 h-4" />
                    <span>Посмотреть все документы</span>
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
                const progressPercent = (category.count / documents.length) * 100;
                
                return (
                  <button
                    key={category.id}
                    className={`category-card-compact ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    <div className="category-card-header">
                      <Folder className="w-5 h-5" />
                      <span className="category-count">{category.count}</span>
                    </div>
                    <div className="category-card-content">
                      <span className="category-name">{category.name}</span>
                      <span className="category-stats">{category.count} документов</span>
                        </div>
                    <div className="category-progress-bar">
                      <div 
                        className="category-progress-fill"
                        style={{ 
                          width: `${progressPercent}%`,
                          backgroundColor: category.id === 'all' ? 'var(--accent-blue)' : getCategoryColor(category.id as Document['category'])
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