'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';

// Регистрируем Chart.js компоненты
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);
import {
  Award,
  BarChart3,
  Calendar,
  Clock,
  Download,
  Eye,
  GraduationCap,
  Star,
  Target,
  TrendingUp,
  TrendingDown,
  Trophy,
  User,
  ChevronRight,
  BookOpen,
  FileText,
  X,
  CheckCircle,
  Brain,
  Calculator,
  Activity,
  ArrowUpRight,
  Copy,
  MapPin,
  Sun,
  Moon,
  MessageSquare,
  HelpCircle,
  AlertCircle,
  Info,
  PieChart
} from 'lucide-react';

// Типы данных
interface Grade {
  id: string;
  subject: string;
  title: string;
  grade: number;
  maxGrade: number;
  percentage: number;
  type: 'exam' | 'test' | 'homework' | 'project' | 'lab' | 'quiz' | 'rk1' | 'rk2' | 'final_exam';
  date: Date;
  teacher: string;
  credits: number;
  weight: number;
  description?: string;
  feedback?: string;
  room?: string;
  duration?: number;
}

interface GradeStat {
  id: string;
  title: string;
  value: string | number;
  label: string;
  sublabel: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  icon: React.ReactNode;
  progress?: number;
  comparison?: {
    label: string;
    value: string;
    positive: boolean;
  };
}

interface Subject {
  id: string;
  name: string;
  shortName: string;
  teacher: string;
  averageGrade: number;
  gpa: number;
  credits: number;
  totalGrades: number;
  color: string;
  progress: number;
  trend: 'up' | 'down' | 'stable';
  gradeDistribution: { excellent: number; good: number; satisfactory: number; poor: number };
}

export default function GradesPageModern() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [selectedSubjectAnalytics, setSelectedSubjectAnalytics] = useState<Subject | null>(null);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const [showAllGrades, setShowAllGrades] = useState(false);

  const [viewMode, setViewMode] = useState<'overview' | 'subjects' | 'analytics'>('overview');
  
  // Состояния для калькулятора GPA
  const [calculatorGrades, setCalculatorGrades] = useState<{id: number, credits: number, grade: string}[]>([
    { id: 1, credits: 3, grade: '' },
    { id: 2, credits: 3, grade: '' },
    { id: 3, credits: 4, grade: '' }
  ]);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Генерируем данные оценок
  const grades = useMemo<Grade[]>(() => {
    const subjectTemplates = [
      { name: 'Математический анализ', teacher: 'Иванов А.С.', shortName: 'Математика' },
      { name: 'Программирование на Python', teacher: 'Петров В.М.', shortName: 'Программирование' },
      { name: 'Общая физика', teacher: 'Козлов Д.П.', shortName: 'Физика' },
      { name: 'История Казахстана', teacher: 'Сидорова Е.И.', shortName: 'История' },
      { name: 'Английский язык', teacher: 'Smith J.', shortName: 'Английский' },
      { name: 'Экономическая теория', teacher: 'Морозова Н.Л.', shortName: 'Экономика' }
    ];

    const types: Grade['type'][] = ['rk1', 'rk2', 'final_exam', 'test', 'homework', 'project', 'lab', 'quiz'];
    const titles = {
      exam: ['Промежуточный экзамен', 'Итоговый экзамен', 'Модульный экзамен'],
      test: ['Контрольная работа №1', 'Контрольная работа №2', 'Тестирование'],
      homework: ['Домашнее задание №1', 'Домашнее задание №2', 'Практическая работа'],
      project: ['Курсовой проект', 'Групповой проект', 'Исследовательская работа'],
      lab: ['Лабораторная работа №1', 'Лабораторная работа №2', 'Практикум'],
      quiz: ['Викторина', 'Быстрый тест', 'Устный опрос'],
      rk1: ['РК1 - Рубежный контроль 1', 'Первый рубежный контроль', 'РК1'],
      rk2: ['РК2 - Рубежный контроль 2', 'Второй рубежный контроль', 'РК2'],
      final_exam: ['Итоговый экзамен', 'Экзамен', 'Финальный экзамен']
    };

    const generatedGrades: Grade[] = [];
    let idCounter = 1;

    subjectTemplates.forEach(subject => {
      // Сначала добавляем обязательные оценки: РК1, РК2, итоговый экзамен
      const mandatoryTypes: Grade['type'][] = ['rk1', 'rk2'];
      
      // Добавляем РК1 и РК2 для каждого предмета
      mandatoryTypes.forEach((type, index) => {
        const title = titles[type][0];
        
        let grade;
        const rand = Math.random();
        if (rand > 0.5) grade = Math.floor(Math.random() * 11) + 85;
        else if (rand > 0.2) grade = Math.floor(Math.random() * 15) + 70;
        else grade = Math.floor(Math.random() * 20) + 60;

        const maxGrade = 100;
        const dateOffset = Math.floor(Math.random() * 60) + (index * 40);
        const gradeDate = new Date();
        gradeDate.setDate(gradeDate.getDate() - dateOffset);

        const weight = type === 'rk1' ? 0.25 : 0.25;

        generatedGrades.push({
          id: `grade-${idCounter++}`,
          subject: subject.name,
          title,
          grade: Math.min(grade, maxGrade),
          maxGrade,
          percentage: Math.round((Math.min(grade, maxGrade) / maxGrade) * 100),
          type,
          date: gradeDate,
          teacher: subject.teacher,
          credits: 3 + Math.floor(Math.random() * 3),
          weight,
          description: `${title} по предмету ${subject.shortName}`,
          feedback: Math.random() > 0.3 ? 'Отличная работа!' : undefined,
          room: 'Ауд. ' + (Math.floor(Math.random() * 300) + 100),
          duration: 120
        });
      });

      // Иногда добавляем итоговый экзамен (60% вероятность)
      if (Math.random() > 0.4) {
        const examTitle = titles['final_exam'][0];
        let examGrade;
        const examRand = Math.random();
        if (examRand > 0.6) examGrade = Math.floor(Math.random() * 11) + 85;
        else if (examRand > 0.3) examGrade = Math.floor(Math.random() * 15) + 70;
        else examGrade = Math.floor(Math.random() * 20) + 60;

        const examDate = new Date();
        examDate.setDate(examDate.getDate() - Math.floor(Math.random() * 30));

        generatedGrades.push({
          id: `grade-${idCounter++}`,
          subject: subject.name,
          title: examTitle,
          grade: Math.min(examGrade, 100),
          maxGrade: 100,
          percentage: Math.round((Math.min(examGrade, 100) / 100) * 100),
          type: 'final_exam',
          date: examDate,
          teacher: subject.teacher,
          credits: 3 + Math.floor(Math.random() * 3),
          weight: 0.40,
          description: `${examTitle} по предмету ${subject.shortName}`,
          feedback: Math.random() > 0.3 ? 'Хороший результат!' : undefined,
          room: 'Ауд. ' + (Math.floor(Math.random() * 300) + 100),
          duration: 180
        });
      }

      // Затем добавляем дополнительные оценки
      const additionalCount = Math.floor(Math.random() * 4) + 3;
      const additionalTypes: Grade['type'][] = ['test', 'homework', 'project', 'lab', 'quiz'];
      
      for (let i = 0; i < additionalCount; i++) {
        const type = additionalTypes[Math.floor(Math.random() * additionalTypes.length)];
        const title = titles[type][Math.floor(Math.random() * titles[type].length)];
        
        let grade;
        const rand = Math.random();
        if (rand > 0.6) grade = Math.floor(Math.random() * 11) + 85;
        else if (rand > 0.2) grade = Math.floor(Math.random() * 15) + 70;
        else grade = Math.floor(Math.random() * 20) + 50;

        const maxGrade = type === 'quiz' ? 10 : 100;
        if (type === 'quiz') grade = Math.min(Math.floor(grade / 10), 10);
        
        const dateOffset = Math.floor(Math.random() * 120);
        const gradeDate = new Date();
        gradeDate.setDate(gradeDate.getDate() - dateOffset);

        const weight = type === 'project' ? 0.15 : 
                      type === 'test' ? 0.10 : 
                      type === 'lab' ? 0.08 : 
                      type === 'homework' ? 0.05 : 0.02;

        generatedGrades.push({
          id: `grade-${idCounter++}`,
          subject: subject.name,
          title,
          grade: Math.min(grade, maxGrade),
          maxGrade,
          percentage: Math.round((Math.min(grade, maxGrade) / maxGrade) * 100),
          type,
          date: gradeDate,
          teacher: subject.teacher,
          credits: 3 + Math.floor(Math.random() * 3),
          weight,
          description: `${title} по предмету ${subject.shortName}`,
          feedback: Math.random() > 0.3 ? 'Отличная работа!' : undefined,
          room: 'Ауд. ' + (Math.floor(Math.random() * 300) + 100),
          duration: type === 'exam' ? 180 : type === 'test' ? 120 : 90
        });
      }
    });

    return generatedGrades.sort((a, b) => b.date.getTime() - a.date.getTime());
  }, []);

  // Создаем данные предметов
  const subjects = useMemo(() => {
    const subjectNames = Array.from(new Set(grades.map(g => g.subject)));
    const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#06b6d4', '#84cc16'];
    
    return subjectNames.map((subjectName, index) => {
      const subjectGrades = grades.filter(g => g.subject === subjectName);
      const avgGrade = subjectGrades.length > 0 
        ? subjectGrades.reduce((sum, g) => sum + g.percentage, 0) / subjectGrades.length 
        : 0;
      
      const gpa = avgGrade >= 90 ? 4.0 : 
                  avgGrade >= 80 ? 3.0 : 
                  avgGrade >= 70 ? 2.0 : 
                  avgGrade >= 60 ? 1.0 : 0.0;

      const teacher = subjectGrades[0]?.teacher || 'Преподаватель';
      const shortName = subjectName.split(' ')[0];
      const color = colors[index % colors.length];

      const recentGrades = subjectGrades.slice(0, 3);
      const oldGrades = subjectGrades.slice(3, 6);
      const recentAvg = recentGrades.reduce((sum, g) => sum + g.percentage, 0) / Math.max(recentGrades.length, 1);
      const oldAvg = oldGrades.reduce((sum, g) => sum + g.percentage, 0) / Math.max(oldGrades.length, 1);
      const trend: 'up' | 'down' | 'stable' = recentAvg > oldAvg + 5 ? 'up' : recentAvg < oldAvg - 5 ? 'down' : 'stable';

      const excellent = subjectGrades.filter(g => g.percentage >= 90).length;
      const good = subjectGrades.filter(g => g.percentage >= 80 && g.percentage < 90).length;
      const satisfactory = subjectGrades.filter(g => g.percentage >= 70 && g.percentage < 80).length;
      const poor = subjectGrades.filter(g => g.percentage < 70).length;

      return {
        id: `subject-${subjectName}`,
        name: subjectName,
        shortName,
        teacher,
        averageGrade: Math.round(avgGrade),
        gpa,
        credits: subjectGrades[0]?.credits || 3,
        totalGrades: subjectGrades.length,
        color,
        progress: Math.min(Math.round((subjectGrades.length / 8) * 100), 100),
        trend,
        gradeDistribution: { excellent, good, satisfactory, poor }
      };
    });
  }, [grades]);

  // Основная статистика
  const gradeStats = useMemo<GradeStat[]>(() => {
    const totalGrades = grades.length;
    const avgPercentage = grades.length > 0 
      ? Math.round(grades.reduce((sum, g) => sum + g.percentage, 0) / grades.length) 
      : 0;
    
    const gpa = avgPercentage >= 90 ? 4.0 : 
                avgPercentage >= 80 ? 3.0 : 
                avgPercentage >= 70 ? 2.0 : 
                avgPercentage >= 60 ? 1.0 : 0.0;

    const excellentGrades = grades.filter(g => g.percentage >= 90).length;
    
    const recentGrades = grades.filter(g => {
      const daysDiff = (new Date().getTime() - g.date.getTime()) / (1000 * 60 * 60 * 24);
      return daysDiff <= 7;
    }).length;

    return [
      {
        id: 'gpa',
        title: 'GPA',
        value: gpa.toFixed(1),
        label: 'средний балл',
        sublabel: 'за семестр',
        trend: gpa >= 3.5 ? 'up' : gpa >= 2.5 ? 'stable' : 'down',
        trendValue: '+0.2 к прошлому',
        color: '#3b82f6',
        gradientFrom: '#3b82f6',
        gradientTo: '#1d4ed8',
        icon: <Trophy className="w-5 h-5" />,
        progress: (gpa / 4.0) * 100,
        comparison: {
          label: 'к целевому 3.5',
          value: gpa >= 3.5 ? '+' + (gpa - 3.5).toFixed(1) : '-' + (3.5 - gpa).toFixed(1),
          positive: gpa >= 3.5
        }
      },
      {
        id: 'average',
        title: 'Успеваемость',
        value: `${avgPercentage}%`,
        label: 'средний процент',
        sublabel: 'по всем предметам',
        trend: avgPercentage >= 85 ? 'up' : avgPercentage >= 75 ? 'stable' : 'down',
        trendValue: '+3% за месяц',
        color: '#10b981',
        gradientFrom: '#10b981',
        gradientTo: '#059669',
        icon: <Target className="w-5 h-5" />,
        progress: avgPercentage,
        comparison: {
          label: 'к минимуму 75%',
          value: avgPercentage >= 75 ? '+' + (avgPercentage - 75) + '%' : '-' + (75 - avgPercentage) + '%',
          positive: avgPercentage >= 75
        }
      },
      {
        id: 'excellent',
        title: 'Отличные',
        value: excellentGrades,
        label: 'оценок 90%+',
        sublabel: `из ${totalGrades} общих`,
        trend: 'up',
        trendValue: '+2 за неделю',
        color: '#f59e0b',
        gradientFrom: '#f59e0b',
        gradientTo: '#d97706',
        icon: <Star className="w-5 h-5" />,
        progress: totalGrades > 0 ? (excellentGrades / totalGrades) * 100 : 0,
        comparison: {
          label: 'от общего числа',
          value: totalGrades > 0 ? Math.round((excellentGrades / totalGrades) * 100) + '%' : '0%',
          positive: (excellentGrades / totalGrades) >= 0.3
        }
      },
      {
        id: 'activity',
        title: 'Активность',
        value: recentGrades,
        label: 'новых оценок',
        sublabel: 'за последнюю неделю',
        trend: 'stable',
        trendValue: '0 к предыдущей',
        color: '#8b5cf6',
        gradientFrom: '#8b5cf6',
        gradientTo: '#7c3aed',
        icon: <Activity className="w-5 h-5" />,
        progress: Math.min((recentGrades / 5) * 100, 100),
        comparison: {
          label: 'средняя нагрузка',
          value: recentGrades >= 3 ? 'Высокая' : recentGrades >= 1 ? 'Средняя' : 'Низкая',
          positive: recentGrades >= 2
        }
      }
    ];
  }, [grades]);

  // Вспомогательные функции
  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return '#10b981';
    if (percentage >= 80) return '#3b82f6';
    if (percentage >= 70) return '#f59e0b';
    return '#ef4444';
  };

  const getGradeLabel = (percentage: number) => {
    if (percentage >= 90) return 'Отлично';
    if (percentage >= 80) return 'Хорошо';
    if (percentage >= 70) return 'Удовлетворительно';
    return 'Неудовлетворительно';
  };

  const getTypeIcon = (type: Grade['type']) => {
    switch (type) {
      case 'exam': return <GraduationCap className="w-4 h-4" />;
      case 'final_exam': return <Award className="w-4 h-4" />;
      case 'rk1': return <CheckCircle className="w-4 h-4" />;
      case 'rk2': return <Star className="w-4 h-4" />;
      case 'test': return <FileText className="w-4 h-4" />;
      case 'homework': return <BookOpen className="w-4 h-4" />;
      case 'project': return <Target className="w-4 h-4" />;
      case 'lab': return <Activity className="w-4 h-4" />;
      case 'quiz': return <Brain className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeName = (type: Grade['type']) => {
    switch (type) {
      case 'exam': return 'Экзамен';
      case 'final_exam': return 'Итоговый экзамен';
      case 'rk1': return 'РК1';
      case 'rk2': return 'РК2';
      case 'test': return 'Контрольная';
      case 'homework': return 'Домашнее задание';
      case 'project': return 'Проект';
      case 'lab': return 'Лабораторная';
      case 'quiz': return 'Викторина';
      default: return 'Работа';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-red-500" />;
      case 'stable': return <ArrowUpRight className="w-3 h-3 text-blue-500" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Функции для Chart.js графиков
  const getGradeDistributionChart = useCallback(() => {
    const excellent = grades.filter(g => g.percentage >= 90).length;
    const good = grades.filter(g => g.percentage >= 80 && g.percentage < 90).length;
    const satisfactory = grades.filter(g => g.percentage >= 70 && g.percentage < 80).length;
    const poor = grades.filter(g => g.percentage < 70).length;

    return {
      type: 'doughnut' as const,
      data: {
        labels: ['Отлично (90-100%)', 'Хорошо (80-89%)', 'Удовлетв. (70-79%)', 'Неудовлетв. (<70%)'],
        datasets: [{
          data: [excellent, good, satisfactory, poor],
          backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'],
          borderWidth: 0,
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom' as const,
            labels: {
              padding: 20,
              usePointStyle: true,
              font: { size: 12 }
            }
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                const percentage = ((context.raw / total) * 100).toFixed(1);
                return `${context.label}: ${context.raw} (${percentage}%)`;
              }
            }
          }
        },
        animation: {
          animateRotate: true,
          duration: 1000
        }
      }
    };
  }, [grades]);

  const getSubjectPerformanceChart = useCallback(() => {
    const subjectData = subjects.map(subject => ({
      name: subject.shortName,
      average: subject.averageGrade,
      color: subject.color
    }));

    return {
      type: 'bar' as const,
      data: {
        labels: subjectData.map(s => s.name),
        datasets: [{
          label: 'Средний балл',
          data: subjectData.map(s => s.average),
          backgroundColor: subjectData.map(s => s.color + '40'),
          borderColor: subjectData.map(s => s.color),
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: 'rgba(0,0,0,0.1)'
            },
            ticks: {
              callback: (value: any) => value + '%'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context: any) => `Средний балл: ${context.raw}%`
            }
          }
        },
        animation: {
          duration: 1200,
          easing: 'easeOutQuart' as const
        }
      }
    };
  }, [subjects]);

  const getProgressTrendChart = useCallback(() => {
    const monthlyData = [
      { month: 'Сентябрь', average: 75 },
      { month: 'Октябрь', average: 78 },
      { month: 'Ноябрь', average: 82 },
      { month: 'Декабрь', average: 85 }
    ];

    return {
      type: 'line' as const,
      data: {
        labels: monthlyData.map(d => d.month),
        datasets: [{
          label: 'Средний балл',
          data: monthlyData.map(d => d.average),
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#3b82f6',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 3,
          pointRadius: 6,
          pointHoverRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            min: 70,
            max: 95,
            grid: {
              color: 'rgba(0,0,0,0.1)'
            },
            ticks: {
              callback: (value: any) => value + '%'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index' as const,
            intersect: false,
            callbacks: {
              label: (context: any) => `Средний балл: ${context.raw}%`
            }
          }
        },
        elements: {
          point: {
            hoverBackgroundColor: '#3b82f6'
          }
        },
        animation: {
          duration: 1500,
          easing: 'easeOutCubic' as const
        }
      }
    };
  }, []);

  // Функции для калькулятора GPA
  const calculateGPA = useCallback(() => {
    const validGrades = calculatorGrades.filter(g => g.grade !== '');
    if (validGrades.length === 0) return 0;

    const totalPoints = validGrades.reduce((sum, g) => {
      const gradePoints = parseFloat(g.grade) || 0;
      return sum + (gradePoints * g.credits);
    }, 0);

    const totalCredits = validGrades.reduce((sum, g) => sum + g.credits, 0);
    
    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  }, [calculatorGrades]);

  const addCalculatorGrade = () => {
    const newId = Math.max(...calculatorGrades.map(g => g.id)) + 1;
    setCalculatorGrades([...calculatorGrades, { id: newId, credits: 3, grade: '' }]);
  };

  const removeCalculatorGrade = (id: number) => {
    if (calculatorGrades.length > 1) {
      setCalculatorGrades(calculatorGrades.filter(g => g.id !== id));
    }
  };

  const updateCalculatorGrade = (id: number, field: 'credits' | 'grade', value: string | number) => {
    setCalculatorGrades(calculatorGrades.map(g => 
      g.id === id ? { ...g, [field]: value } : g
    ));
  };

  // Улучшенная функция экспорта оценок
  const handleExportGrades = async () => {
    try {
      // Показываем индикатор загрузки
      const notification = document.createElement('div');
      notification.innerHTML = 'Подготовка экспорта...';
      notification.style.cssText = 'position:fixed;top:20px;right:20px;background:#3b82f6;color:white;padding:12px 20px;border-radius:8px;z-index:10000;box-shadow:0 4px 12px rgba(0,0,0,0.15);';
      document.body.appendChild(notification);

      // Имитируем небольшую задержку для UX
      await new Promise(resolve => setTimeout(resolve, 500));

      const csvHeaders = [
        'Предмет',
        'Работа', 
        'Оценка',
        'Максимум',
        'Процент (%)',
        'Тип работы',
        'Дата выполнения',
        'Преподаватель',
        'Кредиты',
        'Вес (%)',
        'Буквенная оценка',
        'Статус'
      ];

      const csvData = grades.map(grade => {
        const letterGrade = grade.percentage >= 90 ? 'A' : 
                           grade.percentage >= 80 ? 'B' : 
                           grade.percentage >= 70 ? 'C' : 
                           grade.percentage >= 60 ? 'D' : 'F';
        
        const status = grade.percentage >= 70 ? 'Зачтено' : 'Не зачтено';

        return [
          grade.subject,
          grade.title,
          grade.grade,
          grade.maxGrade,
          grade.percentage,
          getTypeName(grade.type),
          formatDate(grade.date),
          grade.teacher,
          grade.credits,
          Math.round(grade.weight * 100),
          letterGrade,
          status
        ];
      });

      // Добавляем статистику в конец файла
      const stats = [
        [],
        ['СТАТИСТИКА'],
        ['Общее количество оценок', grades.length],
        ['Средний процент', Math.round(grades.reduce((sum, g) => sum + g.percentage, 0) / grades.length) + '%'],
        ['Отличных оценок (90%+)', grades.filter(g => g.percentage >= 90).length],
        ['Хороших оценок (80-89%)', grades.filter(g => g.percentage >= 80 && g.percentage < 90).length],
        ['Удовлетворительных (70-79%)', grades.filter(g => g.percentage >= 70 && g.percentage < 80).length],
        ['Неудовлетворительных (<70%)', grades.filter(g => g.percentage < 70).length],
        [],
        ['ПРЕДМЕТЫ'],
        ...subjects.map(subject => [
          subject.shortName, 
          subject.averageGrade + '%', 
          subject.gpa.toFixed(1) + ' GPA',
          subject.totalGrades + ' оценок'
        ])
      ];

      const csvContent = [
        csvHeaders.join(','),
        ...csvData.map(row => row.map(field => `"${field}"`).join(',')),
        ...stats.map(row => row.map(field => `"${field}"`).join(','))
      ].join('\n');

      // Обновляем уведомление
      notification.innerHTML = 'Сохранение файла...';
      await new Promise(resolve => setTimeout(resolve, 300));

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      const filename = `Академические_результаты_${new Date().toLocaleDateString('ru-RU').replace(/\./g, '_')}.csv`;
      
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Показываем успешное завершение
      notification.innerHTML = 'Экспорт завершен успешно!';
      notification.style.background = '#10b981';
      
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 2000);

    } catch (error) {
      console.error('Ошибка экспорта:', error);
      
      // Показываем ошибку
      const errorNotification = document.createElement('div');
      errorNotification.innerHTML = 'Ошибка при экспорте данных';
      errorNotification.style.cssText = 'position:fixed;top:20px;right:20px;background:#ef4444;color:white;padding:12px 20px;border-radius:8px;z-index:10000;box-shadow:0 4px 12px rgba(0,0,0,0.15);';
      document.body.appendChild(errorNotification);
      
      setTimeout(() => {
        document.body.removeChild(errorNotification);
      }, 3000);
    }
  };

  if (!mounted) {
    return (
      <div className="loading-dashboard">
        <div className="loading-content">
          <div className="loading-spinner-modern">
            <div className="spinner"></div>
          </div>
          <p>Загрузка академических результатов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="schedule-compact">
      {/* Заголовок в стиле эталонных страниц */}
      <div className="schedule-header-compact">
        <div className="header-main">
          <Award className="w-6 h-6" />
          <div>
            <h1>Академические результаты</h1>
            <p>{formatDate(currentTime)} • {grades.length} оценок за семестр</p>
          </div>
        </div>
        <div className="header-widget">
          <div className="widget-icon" style={{ color: gradeStats[0].color }}>
            <Trophy className="w-5 h-5" />
            </div>
          <div className="widget-content">
            <span className="widget-value">{gradeStats[0].value}</span>
            <span className="widget-label">GPA</span>
            </div>
          <div className="widget-trend">
            {getTrendIcon(gradeStats[0].trend)}
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="schedule-main-compact">
        {/* Верхний ряд - статистика */}
        <div className="schedule-top-row">
          {/* Статистика оценок */}
          <motion.div 
            className="schedule-stats-compact enhanced"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="stats-header">
              <h3>Академическая статистика</h3>
              <p>Обзор успеваемости</p>
            </div>
            <div className="stats-grid-enhanced">
              {gradeStats.map((stat, index) => (
                <motion.div 
                  key={stat.id}
                  className="stat-card-enhanced"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="stat-background" style={{
                    background: `linear-gradient(135deg, ${stat.gradientFrom}15, ${stat.gradientTo}05)`
                  }} />
                  
                  <div className="stat-header-enhanced">
                    <div className="stat-icon-enhanced" style={{ color: stat.color }}>
                      {stat.icon}
                    </div>
                    <div className="stat-trend-indicator">
                      {getTrendIcon(stat.trend)}
                    </div>
                  </div>

                  <div className="stat-main-content">
                    <div className="stat-value-enhanced">
                      <span className="value-primary">{stat.value}</span>
                    </div>
                    <div className="stat-labels">
                      <span className="stat-label-enhanced">{stat.title}</span>
                      <span className="stat-sublabel-enhanced">{stat.sublabel}</span>
                    </div>
                  </div>

                    {stat.progress !== undefined && (
                    <div className="stat-progress-section">
                      <div className="progress-bar-enhanced">
                          <motion.div 
                          className="progress-fill-enhanced"
                            style={{ backgroundColor: stat.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${stat.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                          />
                        </div>
                      <div className="progress-details">
                        <span className="progress-percentage">{Math.round(stat.progress)}%</span>
                        <span className="progress-trend">{stat.trendValue}</span>
                      </div>
                      </div>
                    )}

                  {stat.comparison && (
                    <div className="stat-comparison">
                      <span className={`comparison-value ${stat.comparison.positive ? 'positive' : 'neutral'}`}>
                        {stat.comparison.value}
                      </span>
                      <span className="comparison-label">{stat.comparison.label}</span>
                  </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Быстрые действия */}
          <motion.div 
            className="schedule-stats-compact enhanced"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="stats-header">
              <h3>Быстрые действия</h3>
              <p>Полезные инструменты</p>
            </div>
            <div className="quick-actions-grid-schedule">
              <motion.button 
                className="quick-action-btn-schedule"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleExportGrades}
                title="Экспортировать оценки в CSV файл"
              >
                <div className="action-icon-schedule">
                  <Download className="w-5 h-5" />
                </div>
                <div className="action-content-schedule">
                  <span className="action-title-schedule">Экспорт</span>
                  <span className="action-subtitle-schedule">Оценки</span>
                </div>
              </motion.button>

              <motion.button 
                className="quick-action-btn-schedule"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowCalculatorModal(true)}
              >
                <div className="action-icon-schedule">
                  <Calculator className="w-5 h-5" />
                </div>
                <div className="action-content-schedule">
                  <span className="action-title-schedule">Калькулятор</span>
                  <span className="action-subtitle-schedule">GPA</span>
                </div>
              </motion.button>

              <motion.button 
                className="quick-action-btn-schedule"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAnalyticsModal(true)}
              >
                <div className="action-icon-schedule">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div className="action-content-schedule">
                  <span className="action-title-schedule">Аналитика</span>
                  <span className="action-subtitle-schedule">Графики</span>
                </div>
              </motion.button>

              <motion.button 
                className="quick-action-btn-schedule"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/feedback')}
              >
                <div className="action-icon-schedule">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div className="action-content-schedule">
                  <span className="action-title-schedule">Поддержка</span>
                  <span className="action-subtitle-schedule">Помощь</span>
                </div>
              </motion.button>
                </div>
              </motion.div>
        </div>

        {/* Предметы с оценками */}
        <motion.div 
          className="schedule-stats-compact enhanced large-unified"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
            <div className="stats-header">
            <div className="schedule-header-controls">
              <div className="schedule-title-section">
                <h3>Академические предметы</h3>
                <p>Обзор успеваемости по дисциплинам</p>
              </div>
            </div>
            </div>
            
          <div className="section-content">
            <div className="subjects-overview-grid">
              {subjects.map((subject, index) => (
                <motion.div
                  key={subject.id}
                  className="subject-overview-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedSubjectAnalytics(subject);
                    setShowAllGrades(false);
                  }}
                  style={{ borderLeftColor: subject.color }}
                >
                  <div className="subject-overview-header">
                    <div className="subject-overview-icon" style={{ backgroundColor: subject.color + '20', color: subject.color }}>
                      {subject.shortName.charAt(0)}
                    </div>
                    <div className="subject-overview-info">
                      <h4>{subject.shortName}</h4>
                      <p>{subject.teacher}</p>
                    </div>
                    <div className="subject-overview-trend">
                      {getTrendIcon(subject.trend)}
                    </div>
                  </div>

                  <div className="subject-overview-metrics">
                    <div className="metric-main">
                      <span className="metric-value" style={{ color: subject.color }}>
                        {subject.averageGrade}%
                      </span>
                      <span className="metric-label">Средний балл</span>
                    </div>
                    
                    <div className="metric-secondary">
                      <div className="metric-item">
                        <span className="metric-number">{subject.totalGrades}</span>
                        <span className="metric-text">оценок</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-number">{subject.gpa.toFixed(1)}</span>
                        <span className="metric-text">GPA</span>
                      </div>
                    </div>
                  </div>

                  <div className="subject-overview-progress">
                    <div className="progress-info">
                      <span>Завершено семестра</span>
                      <span>{subject.progress}%</span>
                    </div>
                    <div className="progress-bar-subject">
                      <motion.div
                        className="progress-fill-subject"
                        style={{ backgroundColor: subject.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${subject.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  />
                </div>
              </div>

                  <div className="subject-overview-stats">
                    <div className="stat-badge excellent" title="Отличные оценки">
                      <CheckCircle className="w-3 h-3" />
                      <span>{subject.gradeDistribution.excellent}</span>
                    </div>
                    <div className="stat-badge good" title="Хорошие оценки">
                      <Star className="w-3 h-3" />
                      <span>{subject.gradeDistribution.good}</span>
                    </div>
                    <div className="stat-badge satisfactory" title="Удовлетворительные">
                      <Target className="w-3 h-3" />
                      <span>{subject.gradeDistribution.satisfactory}</span>
                    </div>
                    {subject.gradeDistribution.poor > 0 && (
                      <div className="stat-badge poor" title="Неудовлетворительные">
                        <AlertCircle className="w-3 h-3" />
                        <span>{subject.gradeDistribution.poor}</span>
                      </div>
                    )}
                  </div>

                  <div className="subject-overview-action">
                    <span>Подробнее</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Модальные окна */}
      <AnimatePresence>
        {showCalculatorModal && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCalculatorModal(false)}
          >
            <motion.div 
              className="modal-content calculator-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="modal-header">
                <div className="modal-icon" style={{ backgroundColor: '#10b981' }}>
                  <Calculator className="w-5 h-5" />
              </div>
                <div className="modal-title">
                  <h2>Калькулятор GPA</h2>
                  <span className="modal-subtitle">Расчет среднего балла</span>
                </div>
                <button 
                  className="modal-close"
                  onClick={() => setShowCalculatorModal(false)}
                >
                  <X className="w-5 h-5" />
                </button>
            </div>

              <div className="modal-body calculator-body-modern">
                <div className="calculator-header-section">
                  <div className="calculator-result-modern">
                    <div className="gpa-display-modern">
                      <div className="gpa-circle">
                        <span className="gpa-value-large">{calculateGPA().toFixed(2)}</span>
                        <span className="gpa-label-modern">Рассчитанный GPA</span>
                  </div>
                      <div className="gpa-grade-info">
                        <div className="grade-letter-modern">
                          {calculateGPA() >= 3.7 ? 'A' : 
                           calculateGPA() >= 3.0 ? 'B' : 
                           calculateGPA() >= 2.0 ? 'C' : 
                           calculateGPA() >= 1.0 ? 'D' : 'F'}
                  </div>
                        <span className="grade-description-modern">
                          {calculateGPA() >= 3.7 ? 'Отлично' : 
                           calculateGPA() >= 3.0 ? 'Хорошо' : 
                           calculateGPA() >= 2.0 ? 'Удовлетворительно' : 
                           calculateGPA() >= 1.0 ? 'Неудовлетворительно' : 'Провал'}
                        </span>
                </div>
                    </div>
                  </div>
                </div>

                <div className="calculator-form-modern">
                  <div className="form-header-modern">
                    <h4>Добавьте ваши оценки</h4>
                    <p>Введите оценки в формате 4-балльной системы (0.0 - 4.0)</p>
                  </div>

                  <div className="grades-list-modern">
                    {calculatorGrades.map((grade, index) => (
                    <motion.div 
                      key={grade.id}
                        className="grade-input-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                      <div className="card-header">
                          <span className="subject-number">Предмет {index + 1}</span>
                          {calculatorGrades.length > 1 && (
                            <button 
                              className="remove-grade-btn-modern"
                              onClick={() => removeCalculatorGrade(grade.id)}
                              title="Удалить предмет"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <div className="card-inputs">
                          <div className="input-group-modern">
                            <label>Оценка</label>
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              max="4"
                              placeholder="0.0 - 4.0"
                              value={grade.grade}
                              onChange={(e) => updateCalculatorGrade(grade.id, 'grade', e.target.value)}
                              className="grade-input"
                            />
                        </div>
                          <div className="input-group-modern">
                            <label>Кредиты</label>
                            <input
                              type="number"
                              min="1"
                              max="6"
                              value={grade.credits}
                              onChange={(e) => updateCalculatorGrade(grade.id, 'credits', parseInt(e.target.value) || 3)}
                              className="credits-input"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                      </div>

                  <motion.button 
                    className="add-grade-btn-modern"
                    onClick={addCalculatorGrade}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>+ Добавить предмет</span>
                  </motion.button>
                </div>

                <div className="calculator-reference">
                  <h5>Справка по шкале оценок:</h5>
                  <div className="grade-scale-modern">
                    <div className="scale-item-modern excellent">
                      <div className="scale-letter-modern">A</div>
                      <div className="scale-info">
                        <span className="scale-range">3.7 - 4.0</span>
                        <span className="scale-desc">Отлично</span>
                          </div>
                          </div>
                    <div className="scale-item-modern good">
                      <div className="scale-letter-modern">B</div>
                      <div className="scale-info">
                        <span className="scale-range">3.0 - 3.6</span>
                        <span className="scale-desc">Хорошо</span>
                          </div>
                        </div>
                    <div className="scale-item-modern satisfactory">
                      <div className="scale-letter-modern">C</div>
                      <div className="scale-info">
                        <span className="scale-range">2.0 - 2.9</span>
                        <span className="scale-desc">Удовлетворительно</span>
                      </div>
                        </div>
                    <div className="scale-item-modern poor">
                      <div className="scale-letter-modern">D</div>
                      <div className="scale-info">
                        <span className="scale-range">1.0 - 1.9</span>
                        <span className="scale-desc">Неудовлетворительно</span>
                      </div>
                </div>
            </div>
          </div>
      </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



      <AnimatePresence>
        {showAnalyticsModal && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAnalyticsModal(false)}
          >
            <motion.div 
              className="modal-content analytics-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="modal-header">
                <div className="modal-icon" style={{ backgroundColor: '#3b82f6' }}>
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div className="modal-title">
                  <h2>Интерактивная аналитика</h2>
                  <span className="modal-subtitle">Детальный анализ успеваемости</span>
                </div>
                <button 
                  className="modal-close"
                  onClick={() => setShowAnalyticsModal(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="modal-body analytics-modal-body">
                <div className="analytics-tabs">
                  <motion.button
                    className={`analytics-tab ${viewMode === 'overview' ? 'active' : ''}`}
                    onClick={() => setViewMode('overview')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>Обзор</span>
                  </motion.button>
                  <motion.button
                    className={`analytics-tab ${viewMode === 'subjects' ? 'active' : ''}`}
                    onClick={() => setViewMode('subjects')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Target className="w-4 h-4" />
                    <span>Предметы</span>
                  </motion.button>
                  <motion.button
                    className={`analytics-tab ${viewMode === 'analytics' ? 'active' : ''}`}
                    onClick={() => setViewMode('analytics')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>Прогнозы</span>
                  </motion.button>
                  </div>

                <div className="analytics-content">
                  {viewMode === 'overview' && (
                    <motion.div 
                      className="charts-overview"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="charts-grid">
                        <div className="chart-card">
                          <h4>Распределение оценок</h4>
                          <div className="chart-container" style={{ height: '250px' }}>
                            <Doughnut {...getGradeDistributionChart()} />
                  </div>
                  </div>
                        <div className="chart-card">
                          <h4>Успеваемость по предметам</h4>
                          <div className="chart-container" style={{ height: '250px' }}>
                            <Bar {...getSubjectPerformanceChart()} />
                </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {viewMode === 'subjects' && (
                    <motion.div 
                      className="charts-subjects"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="chart-card large">
                        <h4>Динамика прогресса</h4>
                        <div className="chart-container" style={{ height: '300px' }}>
                          <Line {...getProgressTrendChart()} />
                    </div>
                  </div>
                    </motion.div>
                  )}

                  {viewMode === 'analytics' && (
                    <motion.div 
                      className="charts-predictions"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="predictions-section">
                        <div className="prediction-main-card">
                          <div className="prediction-header">
                            <TrendingUp className="w-5 h-5" style={{ color: '#3b82f6' }} />
                            <h4>Прогноз итогового GPA</h4>
                    </div>
                          <div className="prediction-value">
                            <span className="big-number">3.7</span>
                            <span className="prediction-label">прогнозируемый GPA</span>
                          </div>
                          <p>При текущем темпе вы можете достичь GPA 3.7 к концу семестра</p>
                  </div>
                  
                        <div className="recommendations-section">
                          <div className="recommendations-header">
                            <Target className="w-5 h-5" style={{ color: '#10b981' }} />
                            <h4>Персональные рекомендации</h4>
                          </div>
                          <div className="recommendations-cards">
                            <div className="recommendation-card success">
                              <div className="rec-icon">
                                <CheckCircle className="w-5 h-5" />
                              </div>
                              <div className="rec-content">
                                <h5>Отличная динамика по математике</h5>
                                <p>Продолжайте в том же духе, ваши результаты стабильно улучшаются</p>
                    </div>
                  </div>
                      
                            <div className="recommendation-card warning">
                              <div className="rec-icon">
                                <AlertCircle className="w-5 h-5" />
                    </div>
                              <div className="rec-content">
                                <h5>Рекомендуется улучшить показатели по истории</h5>
                                <p>Обратите внимание на подготовку к контрольным работам</p>
                  </div>
                </div>
                    
                            <div className="recommendation-card info">
                              <div className="rec-icon">
                                <Info className="w-5 h-5" />
                  </div>
                              <div className="rec-content">
                                <h5>Для отличия нужно поднять средний балл до 4.5</h5>
                                <p>Сосредоточьтесь на предметах с наименьшими оценками</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="analytics-detailed-stats">
                          <div className="detailed-stat-card">
                            <div className="stat-card-header">
                              <BarChart3 className="w-5 h-5" style={{ color: '#8b5cf6' }} />
                              <h5>Подробная статистика</h5>
                    </div>
                            <div className="stats-mini-grid">
                              <div className="stat-mini">
                                <span className="stat-number">{grades.length}</span>
                                <span className="stat-text">Всего оценок</span>
                  </div>
                              <div className="stat-mini">
                                <span className="stat-number">{subjects.length}</span>
                                <span className="stat-text">Активных предметов</span>
                              </div>
                              <div className="stat-mini">
                                <span className="stat-number">{Math.round(grades.reduce((sum, g) => sum + g.percentage, 0) / grades.length)}%</span>
                                <span className="stat-text">Средний балл</span>
                              </div>
                              <div className="stat-mini">
                                <span className="stat-number">{grades.filter(g => g.percentage >= 90).length}</span>
                                <span className="stat-text">Отличных оценок</span>
                              </div>
                            </div>
                          </div>

                          <div className="trend-analysis-card">
                            <div className="trend-card-header">
                              <Activity className="w-5 h-5" style={{ color: '#f59e0b' }} />
                              <h5>Анализ тенденций</h5>
                            </div>
                            <div className="trend-items">
                              <div className="trend-item positive">
                                <TrendingUp className="w-4 h-4" />
                                <span>Программирование: +15% за месяц</span>
                              </div>
                              <div className="trend-item positive">
                                <TrendingUp className="w-4 h-4" />
                                <span>Математика: стабильно высокие результаты</span>
                              </div>
                              <div className="trend-item negative">
                                <TrendingDown className="w-4 h-4" />
                                <span>Физика: требует внимания</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                )}
              </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Модальное окно детального просмотра предмета - НОВЫЙ ДИЗАЙН */}
      <AnimatePresence>
        {selectedSubjectAnalytics && (
          <motion.div 
            className="modal-overlay-modern"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedSubjectAnalytics(null);
              setShowAllGrades(false);
            }}
          >
            <motion.div 
              className="subject-modal-modern"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {/* Современный заголовок */}
              <div className="subject-modal-header" style={{ 
                background: `linear-gradient(135deg, ${selectedSubjectAnalytics.color}15 0%, ${selectedSubjectAnalytics.color}05 100%)`
              }}>
                <div className="subject-hero">
                  <div className="subject-hero-icon" style={{ 
                    background: `linear-gradient(135deg, ${selectedSubjectAnalytics.color} 0%, ${selectedSubjectAnalytics.color}CC 100%)`,
                    boxShadow: `0 8px 24px ${selectedSubjectAnalytics.color}40`
                  }}>
                    {selectedSubjectAnalytics.shortName.charAt(0)}
                  </div>
                  <div className="subject-hero-content">
                    <h1 className="subject-hero-title">{selectedSubjectAnalytics.name}</h1>
                    <p className="subject-hero-teacher">{selectedSubjectAnalytics.teacher}</p>
                    <div className="subject-hero-stats">
                      <div className="hero-stat">
                        <span className="hero-stat-value" style={{ color: selectedSubjectAnalytics.color }}>
                          {selectedSubjectAnalytics.averageGrade}%
                        </span>
                        <span className="hero-stat-label">Средний балл</span>
                      </div>
                      <div className="hero-stat">
                        <span className="hero-stat-value">{selectedSubjectAnalytics.gpa.toFixed(1)}</span>
                        <span className="hero-stat-label">GPA</span>
                      </div>
                      <div className="hero-stat">
                        <span className="hero-stat-value">{selectedSubjectAnalytics.totalGrades}</span>
                        <span className="hero-stat-label">Оценок</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button 
                  className="subject-modal-close"
                  onClick={() => {
                    setSelectedSubjectAnalytics(null);
                    setShowAllGrades(false);
                  }}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="subject-modal-content">
                {/* Система оценивания - главная секция */}
                <div className="assessment-system-modern">
                  <div className="assessment-header">
                    <div className="assessment-title">
                      <BarChart3 className="w-6 h-6" style={{ color: selectedSubjectAnalytics.color }} />
                      <h2>Система оценивания</h2>
                    </div>
                    <div className="assessment-progress">
                      <span>Прогресс семестра</span>
                      <div className="progress-badge" style={{ backgroundColor: selectedSubjectAnalytics.color + '20', color: selectedSubjectAnalytics.color }}>
                        {selectedSubjectAnalytics.progress}%
                      </div>
                    </div>
                  </div>

                  <div className="assessment-cards-grid">
                    {/* РК1 Карточка */}
                    {(() => {
                      const rk1Grade = grades.find(g => g.subject === selectedSubjectAnalytics.name && g.type === 'rk1');
                      return (
                        <motion.div 
                          className="assessment-card rk1-card"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          whileHover={{ y: -4, scale: 1.02 }}
                        >
                          <div className="assessment-card-header">
                            <div className="assessment-card-icon rk1-icon">
                              <CheckCircle className="w-6 h-6" />
                            </div>
                            <div className="assessment-card-badge">25%</div>
                          </div>
                          <div className="assessment-card-content">
                            <h3>РК1</h3>
                            <p>Рубежный контроль 1</p>
                            {rk1Grade ? (
                              <div className="assessment-result">
                                <div className="result-score" style={{ color: getGradeColor(rk1Grade.percentage) }}>
                                  {rk1Grade.percentage}%
                                </div>
                                <div className="result-details">
                                  <span>{rk1Grade.grade}/{rk1Grade.maxGrade}</span>
                                  <span>{formatDate(rk1Grade.date)}</span>
                                </div>
                              </div>
                            ) : (
                              <div className="assessment-pending">
                                <Clock className="w-5 h-5" />
                                <span>Ожидается</span>
                              </div>
                            )}
              </div>
            </motion.div>
                      );
                    })()}

                    {/* РК2 Карточка */}
                    {(() => {
                      const rk2Grade = grades.find(g => g.subject === selectedSubjectAnalytics.name && g.type === 'rk2');
                      return (
                        <motion.div 
                          className="assessment-card rk2-card"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          whileHover={{ y: -4, scale: 1.02 }}
                        >
                          <div className="assessment-card-header">
                            <div className="assessment-card-icon rk2-icon">
                              <Star className="w-6 h-6" />
                            </div>
                            <div className="assessment-card-badge">25%</div>
                          </div>
                          <div className="assessment-card-content">
                            <h3>РК2</h3>
                            <p>Рубежный контроль 2</p>
                            {rk2Grade ? (
                              <div className="assessment-result">
                                <div className="result-score" style={{ color: getGradeColor(rk2Grade.percentage) }}>
                                  {rk2Grade.percentage}%
                                </div>
                                <div className="result-details">
                                  <span>{rk2Grade.grade}/{rk2Grade.maxGrade}</span>
                                  <span>{formatDate(rk2Grade.date)}</span>
                                </div>
                              </div>
                            ) : (
                              <div className="assessment-pending">
                                <Clock className="w-5 h-5" />
                                <span>Ожидается</span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })()}

                    {/* Экзамен Карточка */}
                    {(() => {
                      const examGrade = grades.find(g => g.subject === selectedSubjectAnalytics.name && g.type === 'final_exam');
                      return (
                        <motion.div 
                          className="assessment-card exam-card"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          whileHover={{ y: -4, scale: 1.02 }}
                        >
                          <div className="assessment-card-header">
                            <div className="assessment-card-icon exam-icon">
                              <Award className="w-6 h-6" />
                            </div>
                            <div className="assessment-card-badge">40%</div>
                          </div>
                          <div className="assessment-card-content">
                            <h3>Итоговый экзамен</h3>
                            <p>Финальная оценка</p>
                            {examGrade ? (
                              <div className="assessment-result">
                                <div className="result-score" style={{ color: getGradeColor(examGrade.percentage) }}>
                                  {examGrade.percentage}%
                                </div>
                                <div className="result-details">
                                  <span>{examGrade.grade}/{examGrade.maxGrade}</span>
                                  <span>{formatDate(examGrade.date)}</span>
                                </div>
                              </div>
                            ) : (
                              <div className="assessment-pending">
                                <Clock className="w-5 h-5" />
                                <span>Ожидается</span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })()}
                  </div>
                </div>

                {/* Распределение оценок и последние работы */}
                <div className="subject-analytics-grid">
                  {/* Распределение оценок */}
                  <motion.div 
                    className="analytics-section distribution-section"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="section-header">
                      <PieChart className="w-5 h-5" style={{ color: selectedSubjectAnalytics.color }} />
                      <h3>Распределение оценок</h3>
                    </div>
                    <div className="distribution-items">
                      <div className="distribution-item-modern excellent">
                        <div className="distribution-dot"></div>
                        <div className="distribution-info">
                          <span className="distribution-count">{selectedSubjectAnalytics.gradeDistribution.excellent}</span>
                          <span className="distribution-label">Отличные</span>
                        </div>
                      </div>
                      <div className="distribution-item-modern good">
                        <div className="distribution-dot"></div>
                        <div className="distribution-info">
                          <span className="distribution-count">{selectedSubjectAnalytics.gradeDistribution.good}</span>
                          <span className="distribution-label">Хорошие</span>
                        </div>
                      </div>
                      <div className="distribution-item-modern satisfactory">
                        <div className="distribution-dot"></div>
                        <div className="distribution-info">
                          <span className="distribution-count">{selectedSubjectAnalytics.gradeDistribution.satisfactory}</span>
                          <span className="distribution-label">Удовлетворительные</span>
                        </div>
                      </div>
                      {selectedSubjectAnalytics.gradeDistribution.poor > 0 && (
                        <div className="distribution-item-modern poor">
                          <div className="distribution-dot"></div>
                          <div className="distribution-info">
                            <span className="distribution-count">{selectedSubjectAnalytics.gradeDistribution.poor}</span>
                            <span className="distribution-label">Неудовлетворительные</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Последние оценки */}
                  <motion.div 
                    className="analytics-section recent-grades-section"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="section-header">
                      <FileText className="w-5 h-5" style={{ color: selectedSubjectAnalytics.color }} />
                      <h3>Последние оценки</h3>
                    </div>
                                         <div className="recent-grades-list">
                       {grades
                         .filter(grade => grade.subject === selectedSubjectAnalytics.name)
                         .slice(0, showAllGrades ? undefined : 4)
                         .map((grade, index) => (
                          <motion.div
                            key={grade.id}
                            className="recent-grade-item"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                          >
                            <div className="grade-type-badge" style={{ backgroundColor: getGradeColor(grade.percentage) + '20', color: getGradeColor(grade.percentage) }}>
                              {getTypeIcon(grade.type)}
                            </div>
                            <div className="grade-content">
                              <div className="grade-title">{grade.title}</div>
                              <div className="grade-date">{formatDate(grade.date)}</div>
                            </div>
                            <div className="grade-score" style={{ color: getGradeColor(grade.percentage) }}>
                              {grade.percentage}%
                            </div>
                          </motion.div>
                        ))}
                      
                                             {grades.filter(grade => grade.subject === selectedSubjectAnalytics.name).length > 4 && (
                         <motion.button 
                           className="show-all-grades-btn"
                           whileHover={{ scale: 1.02 }}
                           whileTap={{ scale: 0.98 }}
                           onClick={() => setShowAllGrades(!showAllGrades)}
                         >
                           <span>
                             {showAllGrades 
                               ? 'Скрыть лишние оценки' 
                               : `Показать все ${grades.filter(grade => grade.subject === selectedSubjectAnalytics.name).length} оценок`
                             }
                           </span>
                           <ChevronRight className={`w-4 h-4 transition-transform ${showAllGrades ? 'rotate-90' : ''}`} />
                         </motion.button>
                       )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 