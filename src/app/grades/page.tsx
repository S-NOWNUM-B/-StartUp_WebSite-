'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  Award,
  BookOpen,
  Calculator,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Filter,
  BarChart3,
  TrendingUp,
  Trophy,
  User,
  Target,
  Grid3X3,
  List,
  FileText,
  Clipboard,
  Home,
  Briefcase,
  Star,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Settings,
  Zap,
  Coffee,
  ChevronRight,
  Percent,
  Users,
  Brain
} from 'lucide-react';

interface Grade {
  id: number;
  subject: string;
  grade: number;
  maxGrade: number;
  type: 'exam' | 'test' | 'homework' | 'project';
  date: string;
  teacher: string;
  weight: number;
}

interface Subject {
  id: number;
  name: string;
  averageGrade: number;
  totalGrades: number;
  credits: number;
  status: 'active' | 'completed' | 'failed';
}

interface QuickAction {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  badge?: string;
}

export default function GradesPageCompact() {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [mounted, setMounted] = useState(true);

  const grades: Grade[] = [
    { id: 1, subject: 'Математический анализ', grade: 92, maxGrade: 100, type: 'exam', date: '15.12.2024', teacher: 'Иванов А.С.', weight: 0.4 },
    { id: 2, subject: 'Математический анализ', grade: 88, maxGrade: 100, type: 'test', date: '10.12.2024', teacher: 'Иванов А.С.', weight: 0.3 },
    { id: 3, subject: 'Программирование', grade: 95, maxGrade: 100, type: 'project', date: '12.12.2024', teacher: 'Петров В.М.', weight: 0.5 },
    { id: 4, subject: 'Программирование', grade: 85, maxGrade: 100, type: 'homework', date: '08.12.2024', teacher: 'Петров В.М.', weight: 0.2 },
    { id: 5, subject: 'Физика', grade: 78, maxGrade: 100, type: 'exam', date: '14.12.2024', teacher: 'Козлов Д.П.', weight: 0.4 },
    { id: 6, subject: 'История', grade: 90, maxGrade: 100, type: 'test', date: '11.12.2024', teacher: 'Сидорова Е.И.', weight: 0.3 },
    { id: 7, subject: 'Английский язык', grade: 87, maxGrade: 100, type: 'test', date: '09.12.2024', teacher: 'Smith J.', weight: 0.3 }
  ];

  const subjects: Subject[] = [
    { id: 1, name: 'Математический анализ', averageGrade: 4.6, totalGrades: 8, credits: 5, status: 'active' },
    { id: 2, name: 'Программирование', averageGrade: 4.8, totalGrades: 6, credits: 4, status: 'active' },
    { id: 3, name: 'Физика', averageGrade: 4.2, totalGrades: 5, credits: 3, status: 'active' },
    { id: 4, name: 'История', averageGrade: 4.5, totalGrades: 4, credits: 2, status: 'completed' },
    { id: 5, name: 'Английский язык', averageGrade: 4.4, totalGrades: 7, credits: 3, status: 'active' }
  ];

  const quickActions: QuickAction[] = useMemo(() => [
    {
      id: 'analytics',
      title: 'АНАЛИТИКА',
      icon: <BarChart3 className="w-4 h-4" />,
      description: 'Детальный анализ',
      color: 'var(--accent-blue)',
      badge: 'NEW'
    },
    {
      id: 'download',
      title: 'ОТЧЕТ',
      icon: <Download className="w-4 h-4" />,
      description: 'Скачать PDF',
      color: 'var(--accent-green)'
    },
    {
      id: 'export',
      title: 'ЭКСПОРТ',
      icon: <FileText className="w-4 h-4" />,
      description: 'В Excel',
      color: 'var(--accent-blue)'
    },
    {
      id: 'settings',
      title: 'НАСТРОЙКИ',
      icon: <Settings className="w-4 h-4" />,
      description: 'Параметры',
      color: 'var(--accent-green)'
    }
  ], []);

  const gradeStats = useMemo(() => {
    const allGrades = grades;
    const excellentGrades = allGrades.filter(g => (g.grade / g.maxGrade) * 100 >= 90).length;
    const goodGrades = allGrades.filter(g => {
      const percentage = (g.grade / g.maxGrade) * 100;
      return percentage >= 80 && percentage < 90;
    }).length;
    const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);
    const averageGrade = subjects.reduce((sum, s) => sum + s.averageGrade, 0) / subjects.length;
    const activeSubjects = subjects.filter(s => s.status === 'active').length;

    return {
      average: {
        value: averageGrade.toFixed(1),
        label: 'Средний балл',
        change: '+0.3',
        trend: 'up' as const
      },
      excellent: {
        value: excellentGrades,
        label: 'Отличных оценок',
        change: '+2',
        trend: 'up' as const
      },
      active: {
        value: activeSubjects,
        label: 'Активных предметов',
        change: '0',
        trend: 'stable' as const
      },
      credits: {
        value: totalCredits,
        label: 'Кредитов набрано',
        change: '+3',
        trend: 'up' as const
      }
    };
  }, [grades, subjects]);

  const getGradeColor = (grade: number, maxGrade: number) => {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 90) return 'var(--accent-green)';
    if (percentage >= 80) return 'var(--accent-blue)';
    if (percentage >= 70) return '#f59e0b';
    return '#ef4444';
  };

  const getGradeLabel = (grade: number, maxGrade: number) => {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 90) return 'Отлично';
    if (percentage >= 80) return 'Хорошо';
    if (percentage >= 70) return 'Удовл.';
    return 'Неудовл.';
  };

  const getTypeIcon = (type: Grade['type']) => {
    switch (type) {
      case 'exam': return <Clipboard className="w-4 h-4" />;
      case 'test': return <FileText className="w-4 h-4" />;
      case 'homework': return <Home className="w-4 h-4" />;
      case 'project': return <Briefcase className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeName = (type: Grade['type']) => {
    switch (type) {
      case 'exam': return 'Экзамен';
      case 'test': return 'Тест';
      case 'homework': return 'ДЗ';
      case 'project': return 'Проект';
      default: return 'Работа';
    }
  };

  const getStatusColor = (status: Subject['status']) => {
    switch (status) {
      case 'active': return 'var(--accent-blue)';
      case 'completed': return 'var(--accent-green)';
      case 'failed': return '#ef4444';
      default: return 'var(--text-muted)';
    }
  };

  const getStatusName = (status: Subject['status']) => {
    switch (status) {
      case 'active': return 'Активный';
      case 'completed': return 'Завершён';
      case 'failed': return 'Провален';
      default: return 'Неизвестно';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down': return <ArrowDownRight className="w-3 h-3 text-red-500" />;
      case 'stable': return <ArrowUpRight className="w-3 h-3 text-blue-500" />;
    }
  };

  const filteredGrades = selectedSubject === 'all' 
    ? grades 
    : grades.filter(grade => grade.subject === selectedSubject);

  const handleQuickAction = (actionId: string) => {
    const action = quickActions.find(a => a.id === actionId);
    toast.success(`Выполняется: ${action?.title}`);
  };

  const handleSubjectChange = (subjectName: string) => {
    setSelectedSubject(subjectName);
    // toast.success(`Переключение на: ${subjectName === 'all' ? 'Все предметы' : subjectName}`); // Убрано раздражающее уведомление
  };

  if (!mounted) {
    return (
      <div className="loading-dashboard">
        <div className="loading-content">
          <div className="loading-spinner-modern">
            <div className="spinner"></div>
          </div>
          <p>Загрузка оценок...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grades-compact">
      {/* Компактный заголовок */}
      <div className="grades-header-compact">
        <div className="header-main">
          <Trophy className="w-6 h-6" />
          <div>
            <h1>Академические результаты</h1>
            <p>{grades.length} оценок всего • Средний балл: {gradeStats.average.value}</p>
          </div>
        </div>
        <div className="current-grade-indicator">
          <span className="grade-badge">{gradeStats.average.value}</span>
          <span className="grade-label">Средний</span>
        </div>
      </div>

      {/* Основной компактный контент */}
      <div className="grades-main-compact">
        {/* Верхний ряд - статистика и быстрые действия */}
        <div className="grades-top-row">
          {/* Статистика оценок */}
          <motion.div 
            className="grades-stats-compact"
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
                  <Trophy className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{gradeStats.average.value}</span>
                  <span className="stat-label-compact">{gradeStats.average.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(gradeStats.average.trend)}
                    <span>{gradeStats.average.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Star className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{gradeStats.excellent.value}</span>
                  <span className="stat-label-compact">{gradeStats.excellent.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(gradeStats.excellent.trend)}
                    <span>{gradeStats.excellent.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{gradeStats.active.value}</span>
                  <span className="stat-label-compact">{gradeStats.active.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(gradeStats.active.trend)}
                    <span>{gradeStats.active.change}</span>
                  </div>
                </div>
              </div>
              <div className="stat-item-compact">
                <div className="stat-icon-compact">
                  <Target className="w-4 h-4" />
                </div>
                <div className="stat-content-compact">
                  <span className="stat-value-compact">{gradeStats.credits.value}</span>
                  <span className="stat-label-compact">{gradeStats.credits.label}</span>
                  <div className="stat-change-compact">
                    {getTrendIcon(gradeStats.credits.trend)}
                    <span>{gradeStats.credits.change}</span>
                  </div>
        </div>
            </div>
            </div>
      </motion.div>

          {/* Быстрые действия */}
        <motion.div 
            className="grades-actions-compact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
        >
            <h4>Быстрые действия</h4>
            <div className="actions-grid-grades">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  className="action-btn-grades"
                  onClick={() => handleQuickAction(action.id)}
                  style={{ '--action-color': action.color } as React.CSSProperties}
                >
                  <div className="action-icon-grades">
                    {action.icon}
                    {action.badge && (
                      <span className="action-badge-grades">{action.badge}</span>
                    )}
                  </div>
                  <div className="action-content-grades">
                    <span className="action-title">{action.title}</span>
                    <span className="action-desc">{action.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
          </div>

        {/* Средний ряд - навигация предметов и список оценок */}
        <div className="grades-middle-row">
          {/* Навигация по предметам */}
          <motion.div 
            className="subjects-navigation-compact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
              >
            <div className="subjects-header">
              <h3>Предметы</h3>
              <p>Выберите предмет</p>
            </div>
            <div className="subjects-grid-compact">
              {/* Все предметы */}
              <button
                className={`subject-card-compact ${selectedSubject === 'all' ? 'active' : ''}`}
                onClick={() => handleSubjectChange('all')}
              >
                <div className="subject-card-header">
                  <BarChart3 className="w-5 h-5" />
                  <span className="subject-count">{grades.length}</span>
                </div>
                <div className="subject-card-content">
                  <span className="subject-name">Все предметы</span>
                  <span className="subject-stats">Общая статистика</span>
            </div>
                <div className="subject-progress-bar">
                  <div 
                    className="subject-progress-fill"
                    style={{ width: '100%' }}
                  />
          </div>
              </button>

              {/* Отдельные предметы */}
              {subjects.map((subject) => {
                const subjectGrades = grades.filter(g => g.subject === subject.name);
                const progressPercent = subject.status === 'completed' ? 100 : 
                                      subject.status === 'active' ? 75 : 25;
                
                return (
                  <button
                  key={subject.id}
                    className={`subject-card-compact ${selectedSubject === subject.name ? 'active' : ''}`}
                    onClick={() => handleSubjectChange(subject.name)}
                    >
                    <div className="subject-card-header">
                      <div 
                        className="subject-grade-badge"
                        style={{ color: getStatusColor(subject.status) }}
                        >
                        {subject.averageGrade}
                      </div>
                      <div 
                        className="subject-status-dot"
                        style={{ backgroundColor: getStatusColor(subject.status) }}
                      />
                        </div>
                    <div className="subject-card-content">
                      <span className="subject-name">{subject.name}</span>
                      <span className="subject-stats">
                        {subjectGrades.length} оценок • {subject.credits} кредитов
                      </span>
                      </div>
                    <div className="subject-progress-bar">
                      <div 
                        className="subject-progress-fill"
                        style={{
                          width: `${progressPercent}%`,
                          backgroundColor: getStatusColor(subject.status)
                        }}
                      />
                          </div>
                  </button>
                );
              })}
                        </div>
                      </motion.div>

          {/* Список оценок */}
          <motion.div 
            className="grades-list-compact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="grades-list-header">
              <div>
                <h3>
                  {selectedSubject === 'all' ? 'Все оценки' : selectedSubject}
                </h3>
                <p>{filteredGrades.length} оценок найдено</p>
              </div>
              {selectedSubject !== 'all' && (
                <div className="subject-details-badge">
                  {(() => {
                    const subject = subjects.find(s => s.name === selectedSubject);
                    return subject ? (
                      <div className="subject-info-compact">
                        <span className="subject-avg">{subject.averageGrade}</span>
                        <span className="subject-status">{getStatusName(subject.status)}</span>
                      </div>
                    ) : null;
                  })()}
                      </div>
                    )}
            </div>
            
            <div className="grades-list-content">
              {filteredGrades.length > 0 ? (
                filteredGrades.map((grade) => (
                  <div key={grade.id} className="grade-card-compact">
                    <div className="grade-score-section">
                      <div className="grade-score">
                        <span className="score-value">{grade.grade}</span>
                        <span className="score-max">/{grade.maxGrade}</span>
                      </div>
                      <div 
                        className="grade-percentage"
                        style={{ color: getGradeColor(grade.grade, grade.maxGrade) }}
                      >
                        {Math.round((grade.grade / grade.maxGrade) * 100)}%
                      </div>
                </div>
                
                    <div className="grade-content-section">
                      <div className="grade-header-info">
                        <h5>{selectedSubject === 'all' ? grade.subject : getTypeName(grade.type)}</h5>
                        <div className="grade-type-icon" style={{ color: getGradeColor(grade.grade, grade.maxGrade) }}>
                          {getTypeIcon(grade.type)}
                        </div>
                      </div>
                      
                      <div className="grade-meta-info">
                        <div className="grade-teacher">
                          <User className="w-3 h-3" />
                          <span>{grade.teacher}</span>
                        </div>
                        <div className="grade-date">
                          <Calendar className="w-3 h-3" />
                          <span>{grade.date}</span>
                        </div>
                      </div>
                      
                      <div className="grade-weight-info">
                        <Percent className="w-3 h-3" />
                        <span>Вес: {Math.round(grade.weight * 100)}%</span>
                        </div>
                        </div>
                    
                    <div className="grade-status-section">
                      <div 
                        className="grade-label-badge"
                        style={{ 
                          color: getGradeColor(grade.grade, grade.maxGrade),
                          backgroundColor: `${getGradeColor(grade.grade, grade.maxGrade)}20`
                        }}
                      >
                        {getGradeLabel(grade.grade, grade.maxGrade)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-grades-compact">
                  <Calculator className="w-12 h-12" />
                  <h4>Оценок нет</h4>
                  <p>По выбранному фильтру оценки не найдены</p>
                  <button 
                    className="view-all-btn"
                    onClick={() => handleSubjectChange('all')}
                  >
                    <Eye className="w-4 h-4" />
                    <span>Посмотреть все оценки</span>
                  </button>
                </div>
              )}
            </div>
        </motion.div>
        </div>
      </div>
    </div>
  );
} 