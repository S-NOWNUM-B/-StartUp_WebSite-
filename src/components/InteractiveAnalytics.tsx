'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  Calendar,
  Clock,
  BookOpen,
  Users,
  Zap,
  Eye,
  Filter,
  Download,
  Share2
} from 'lucide-react';

interface AnalyticsData {
  period: string;
  grades: number[];
  attendance: number[];
  studyTime: number[];
  labels: string[];
}

interface MetricCard {
  id: string;
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  color: string;
  description: string;
}

export default function InteractiveAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'semester'>('month');
  const [selectedMetric, setSelectedMetric] = useState<'grades' | 'attendance' | 'studyTime'>('grades');
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [animateChart, setAnimateChart] = useState(false);

  const analyticsData: Record<string, AnalyticsData> = {
    week: {
      period: 'Последняя неделя',
      grades: [4.2, 4.5, 4.1, 4.8, 4.6, 4.3, 4.7],
      attendance: [100, 95, 100, 90, 100, 85, 95],
      studyTime: [3.5, 4.2, 2.8, 5.1, 4.5, 3.2, 4.8],
      labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    },
    month: {
      period: 'Последний месяц',
      grades: [4.1, 4.3, 4.5, 4.2, 4.6, 4.4, 4.7, 4.5, 4.8, 4.6, 4.9, 4.7],
      attendance: [88, 92, 95, 90, 97, 85, 93, 89, 96, 91, 94, 92],
      studyTime: [3.2, 3.8, 4.1, 3.5, 4.5, 3.9, 4.8, 4.2, 5.1, 4.6, 4.9, 4.3],
      labels: ['Нед 1', 'Нед 2', 'Нед 3', 'Нед 4', 'Нед 5', 'Нед 6', 'Нед 7', 'Нед 8', 'Нед 9', 'Нед 10', 'Нед 11', 'Нед 12']
    },
    semester: {
      period: 'Семестр',
      grades: [3.8, 4.0, 4.2, 4.1, 4.5, 4.3, 4.6, 4.4, 4.7, 4.6, 4.8, 4.7],
      attendance: [85, 88, 90, 87, 92, 89, 94, 91, 95, 93, 96, 94],
      studyTime: [2.8, 3.2, 3.6, 3.4, 4.0, 3.8, 4.2, 4.0, 4.5, 4.3, 4.7, 4.5],
      labels: ['Сен', 'Окт', 'Ноя', 'Дек', 'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг']
    }
  };

  const metrics: MetricCard[] = [
    {
      id: 'avg-grade',
      title: 'Средний балл',
      value: '4.65',
      change: 8.2,
      trend: 'up',
      icon: <Award className="w-5 h-5" />,
      color: 'var(--accent-blue)',
      description: 'За последний месяц'
    },
    {
      id: 'attendance',
      title: 'Посещаемость',
      value: '92%',
      change: 5.1,
      trend: 'up',
      icon: <Target className="w-5 h-5" />,
      color: 'var(--accent-green)',
      description: 'Среднее за период'
    },
    {
      id: 'study-time',
      title: 'Время занятий',
      value: '4.2ч',
      change: -2.3,
      trend: 'down',
      icon: <Clock className="w-5 h-5" />,
      color: 'var(--accent-orange)',
      description: 'В день в среднем'
    },
    {
      id: 'subjects',
      title: 'Активных предметов',
      value: '6',
      change: 0,
      trend: 'stable',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'var(--accent-purple)',
      description: 'В текущем семестре'
    }
  ];

  useEffect(() => {
    setAnimateChart(true);
    const timer = setTimeout(() => setAnimateChart(false), 100);
    return () => clearTimeout(timer);
  }, [selectedPeriod, selectedMetric]);

  const currentData = analyticsData[selectedPeriod];
  const maxValue = Math.max(...currentData[selectedMetric]);
  const minValue = Math.min(...currentData[selectedMetric]);

  const getMetricName = (metric: string) => {
    switch (metric) {
      case 'grades': return 'Оценки';
      case 'attendance': return 'Посещаемость (%)';
      case 'studyTime': return 'Время занятий (ч)';
      default: return 'Данные';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4" />;
      case 'down': return <TrendingDown className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'var(--accent-green)';
      case 'down': return 'var(--accent-red)';
      default: return 'var(--text-muted)';
    }
  };

  const exportData = () => {
    const dataToExport = {
      period: selectedPeriod,
      metric: selectedMetric,
      data: currentData,
      metrics: metrics,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${selectedPeriod}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div 
      className="interactive-analytics"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Заголовок */}
      <div className="analytics-header">
        <div className="header-content">
          <div className="header-text">
            <h2>Аналитика успеваемости</h2>
            <p>Отслеживайте свой прогресс и выявляйте области для улучшения</p>
          </div>
          <div className="header-actions">
            <motion.button
              className="action-btn-analytics"
              onClick={exportData}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4" />
              Экспорт
            </motion.button>
            <motion.button
              className="action-btn-analytics"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 className="w-4 h-4" />
              Поделиться
            </motion.button>
          </div>
        </div>
      </div>

      {/* Карточки метрик */}
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            className="metric-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div className="metric-header">
              <div className="metric-icon" style={{ color: metric.color }}>
                {metric.icon}
              </div>
              <div 
                className="metric-trend"
                style={{ color: getTrendColor(metric.trend) }}
              >
                {getTrendIcon(metric.trend)}
                <span>{Math.abs(metric.change)}%</span>
              </div>
            </div>
            <div className="metric-content">
              <div className="metric-value">{metric.value}</div>
              <div className="metric-title">{metric.title}</div>
              <div className="metric-description">{metric.description}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Контролы */}
      <div className="analytics-controls">
        <div className="controls-section">
          <h3>Период</h3>
          <div className="button-group">
            {(['week', 'month', 'semester'] as const).map((period) => (
              <motion.button
                key={period}
                className={`control-btn ${selectedPeriod === period ? 'active' : ''}`}
                onClick={() => setSelectedPeriod(period)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {period === 'week' ? 'Неделя' : period === 'month' ? 'Месяц' : 'Семестр'}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="controls-section">
          <h3>Метрика</h3>
          <div className="button-group">
            {(['grades', 'attendance', 'studyTime'] as const).map((metric) => (
              <motion.button
                key={metric}
                className={`control-btn ${selectedMetric === metric ? 'active' : ''}`}
                onClick={() => setSelectedMetric(metric)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {getMetricName(metric)}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="controls-section">
          <h3>Вид</h3>
          <div className="button-group">
            <motion.button
              className={`control-btn ${viewMode === 'chart' ? 'active' : ''}`}
              onClick={() => setViewMode('chart')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <BarChart3 className="w-4 h-4" />
              График
            </motion.button>
            <motion.button
              className={`control-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye className="w-4 h-4" />
              Таблица
            </motion.button>
          </div>
        </div>
      </div>

      {/* Основная визуализация */}
      <motion.div 
        className="chart-container"
        key={`${selectedPeriod}-${selectedMetric}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="chart-header">
          <h3>{getMetricName(selectedMetric)} - {currentData.period}</h3>
          <div className="chart-info">
            <span className="chart-max">Макс: {maxValue.toFixed(1)}</span>
            <span className="chart-min">Мин: {minValue.toFixed(1)}</span>
          </div>
        </div>

        {viewMode === 'chart' ? (
          <div className="chart-area">
            <div className="chart-grid">
              {/* Сетка графика */}
              {[100, 75, 50, 25, 0].map((line) => (
                <div key={line} className="grid-line" style={{ bottom: `${line}%` }}>
                  <span className="grid-label">{(maxValue * line / 100).toFixed(1)}</span>
                </div>
              ))}
            </div>
            
            <div className="chart-bars">
              {currentData[selectedMetric].map((value, index) => {
                const height = (value / maxValue) * 100;
                return (
                  <div key={index} className="bar-container">
                    <motion.div
                      className="chart-bar"
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.05,
                        ease: "easeOut"
                      }}
                      style={{
                        backgroundColor: value >= (maxValue * 0.8) ? 'var(--accent-green)' :
                                        value >= (maxValue * 0.6) ? 'var(--accent-blue)' :
                                        value >= (maxValue * 0.4) ? 'var(--accent-orange)' : 'var(--accent-red)'
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="bar-value">{value.toFixed(1)}</div>
                    </motion.div>
                    <div className="bar-label">{currentData.labels[index]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="data-table">
            <div className="table-header">
              <div className="table-cell">Период</div>
              <div className="table-cell">Значение</div>
              <div className="table-cell">Изменение</div>
              <div className="table-cell">Статус</div>
            </div>
            {currentData[selectedMetric].map((value, index) => {
              const prevValue = index > 0 ? currentData[selectedMetric][index - 1] : value;
              const change = value - prevValue;
              return (
                <motion.div
                  key={index}
                  className="table-row"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="table-cell">{currentData.labels[index]}</div>
                  <div className="table-cell font-bold">{value.toFixed(1)}</div>
                  <div 
                    className="table-cell"
                    style={{ 
                      color: change > 0 ? 'var(--accent-green)' : 
                             change < 0 ? 'var(--accent-red)' : 'var(--text-muted)'
                    }}
                  >
                    {change !== 0 ? (change > 0 ? '+' : '') + change.toFixed(1) : '—'}
                  </div>
                  <div className="table-cell">
                    <div 
                      className="status-indicator"
                      style={{
                        backgroundColor: value >= (maxValue * 0.8) ? 'var(--accent-green)' :
                                        value >= (maxValue * 0.6) ? 'var(--accent-blue)' :
                                        value >= (maxValue * 0.4) ? 'var(--accent-orange)' : 'var(--accent-red)'
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
} 