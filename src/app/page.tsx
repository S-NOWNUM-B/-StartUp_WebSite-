'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useScheduleData } from '../hooks/useScheduleData';
// import { toast } from 'react-hot-toast'; // Убран импорт, так как все toast уведомления отключены
import { 
  BookOpen, 
  Calendar, 
  BarChart3, 
  Bell, 
  FileText, 
  Settings,
  ArrowUpRight,
  ArrowDownRight,
  GraduationCap,
  BookmarkCheck,
  ClipboardList,
  Timer,
  Eye,
  Award,
  Users,
  TrendingUp,
  Download,
  User,
  MessageSquare,
  PieChart,
  Trophy,
  Plus,
  ExternalLink,
  Play,
  Pause,
  MapPin,
  Clock,
  Star,
  Book,
  Calculator,
  Cpu,
  Globe,
  Beaker,
  CheckCircle,
  AlertCircle,
  Info,
  Circle,
  Zap,
  Target,
  ChevronRight,
  TrendingDown,
  Edit3,
  Save,
  X,
  Sun,
  Moon,
  CloudRain,
  Coffee,
  CalendarDays
} from 'lucide-react';



interface QuickNote {
  id: string;
  text: string;
  createdAt: Date;
  important: boolean;
}

interface Task {
  id: string;
  title: string;
  subject: string;
  deadline: Date;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  progress: number;
}

interface Grade {
  id: string;
  subject: string;
  grade: number;
  maxGrade: number;
  weight: number;
  date: Date;
  type: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: 'lesson' | 'exam' | 'deadline' | 'meeting';
  location?: string;
}

// Новые интерфейсы для улучшенного модуля
interface AcademicStat {
  id: string;
  title: string;
  value: number | string;
  maxValue?: number;
  label: string;
  sublabel: string;
  trend: 'up' | 'down' | 'stable';
  trendValue?: string;
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
  details?: {
    breakdown: Array<{ label: string; value: string; color?: string }>;
    insights: Array<{ text: string; type: 'success' | 'warning' | 'info' }>;
    actions?: Array<{ label: string; onClick: () => void }>;
  };
}

interface WeeklyStat {
  id: string;
  title: string;
  value: number | string;
  maxValue?: number;
  label: string;
  sublabel: string;
  trend: 'up' | 'down' | 'stable';
  trendValue?: string;
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
  details?: {
    breakdown: Array<{ label: string; value: string; color?: string }>;
    insights: Array<{ text: string; type: 'success' | 'warning' | 'info' }>;
  };
}

interface AcademicModalData {
  stat: AcademicStat;
  isOpen: boolean;
}

interface WeeklyModalData {
  stat: WeeklyStat;
  isOpen: boolean;
}

export default function StudentDashboardModern() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Получаем реальные данные расписания
  const { getTodayEvents, getTodayTasks } = useScheduleData(currentTime);
  const [newNote, setNewNote] = useState('');
  const [showNoteForm, setShowNoteForm] = useState(false);
  // Убраны состояния для создания задач - теперь задачи берутся из расписания
  const [widgetIndex, setWidgetIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [showDayDetail, setShowDayDetail] = useState(false);
  const [academicModal, setAcademicModal] = useState<AcademicModalData | null>(null);
  const [weeklyModal, setWeeklyModal] = useState<WeeklyModalData | null>(null);

  // Новые состояния для функциональных модальных окон
  const [showGradesDetail, setShowGradesDetail] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showTaskPlanner, setShowTaskPlanner] = useState(false);
  const [showStudyPlan, setShowStudyPlan] = useState(false);
  const [showElectives, setShowElectives] = useState(false);
  const [showFullSchedule, setShowFullSchedule] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    
    const timer = setInterval(() => setCurrentTime(new Date()), 60000); // Update every minute
    return () => {
      clearInterval(timer);
    };
  }, []);

  // Обработка клавиши Escape для закрытия модальных окон
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // Закрываем все открытые модальные окна
        if (academicModal?.isOpen) setAcademicModal(null);
        if (weeklyModal?.isOpen) setWeeklyModal(null);
        if (showGradesDetail) setShowGradesDetail(false);
        if (showAnalytics) setShowAnalytics(false);
        if (showTaskPlanner) setShowTaskPlanner(false);
        if (showStudyPlan) setShowStudyPlan(false);
        if (showElectives) setShowElectives(false);
        if (showFullSchedule) setShowFullSchedule(false);
        if (showNotificationSettings) setShowNotificationSettings(false);
        if (showDayDetail) closeDayDetail();
        if (showNoteForm) setShowNoteForm(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [academicModal, weeklyModal, showGradesDetail, showAnalytics, showTaskPlanner, showStudyPlan, 
      showElectives, showFullSchedule, showNotificationSettings, showDayDetail, 
      showNoteForm]);



  const [quickNotes, setQuickNotes] = useState<QuickNote[]>([]);

  // Загрузка заметок из localStorage при монтировании
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem('quickNotes');
      if (savedNotes) {
        const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt)
        }));
        setQuickNotes(parsedNotes);
      } else {
        // Устанавливаем дефолтные заметки только если нет сохраненных
        const defaultNotes = [
          { id: '1', text: 'Подготовиться к экзамену по математике', createdAt: new Date(), important: true },
          { id: '2', text: 'Сдать курсовую работу до пятницы', createdAt: new Date(), important: false },
          { id: '3', text: 'Встреча с научным руководителем в 14:00', createdAt: new Date(), important: true }
        ];
        setQuickNotes(defaultNotes);
        localStorage.setItem('quickNotes', JSON.stringify(defaultNotes));
      }
    } catch (error) {
      console.error('Ошибка при загрузке заметок:', error);
      // Устанавливаем дефолтные заметки при ошибке
      const defaultNotes = [
        { id: '1', text: 'Подготовиться к экзамену по математике', createdAt: new Date(), important: true },
        { id: '2', text: 'Сдать курсовую работу до пятницы', createdAt: new Date(), important: false },
        { id: '3', text: 'Встреча с научным руководителем в 14:00', createdAt: new Date(), important: true }
      ];
      setQuickNotes(defaultNotes);
    }
  }, []);

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Решить задачи по алгебре', subject: 'Математика', deadline: new Date(2024, 11, 25), priority: 'high', completed: false, progress: 60 },
    { id: '2', title: 'Написать эссе по истории', subject: 'История', deadline: new Date(2024, 11, 23), priority: 'medium', completed: false, progress: 30 },
    { id: '3', title: 'Подготовить презентацию', subject: 'Программирование', deadline: new Date(2024, 11, 28), priority: 'high', completed: false, progress: 80 },
    { id: '4', title: 'Прочитать главу 5', subject: 'Физика', deadline: new Date(2024, 11, 22), priority: 'low', completed: true, progress: 100 }
  ]);

  const grades: Grade[] = [
    { id: '1', subject: 'Математика', grade: 5, maxGrade: 5, weight: 3, date: new Date(), type: 'Экзамен' },
    { id: '2', subject: 'Программирование', grade: 4, maxGrade: 5, weight: 2, date: new Date(), type: 'Практика' },
    { id: '3', subject: 'Физика', grade: 5, maxGrade: 5, weight: 3, date: new Date(), type: 'Лабораторная' },
    { id: '4', subject: 'История', grade: 4, maxGrade: 5, weight: 1, date: new Date(), type: 'Эссе' },
    { id: '5', subject: 'Английский', grade: 4, maxGrade: 5, weight: 2, date: new Date(), type: 'Тест' }
  ];



  // Используем реальные данные из расписания
  const todayScheduleTasks = useMemo(() => {
    if (!mounted) return [];
    return getTodayTasks;
  }, [getTodayTasks, mounted]);

  const todayEvents: CalendarEvent[] = useMemo(() => {
    if (!mounted || !getTodayEvents.length) return [];
    
    return getTodayEvents
      .map((event, index) => ({
        id: event.id,
        title: event.title,
        date: new Date(),
        time: event.time,
        type: event.type === 'lecture' ? 'lesson' as const : 
              event.type === 'exam' ? 'exam' as const : 
              event.type === 'consultation' ? 'meeting' as const : 'lesson' as const,
        location: event.room
      }));
  }, [getTodayEvents, mounted]);

  const gpaCalculation = useMemo(() => {
    const totalPoints = grades.reduce((sum, grade) => sum + (grade.grade * grade.weight), 0);
    const totalWeights = grades.reduce((sum, grade) => sum + grade.weight, 0);
    const gpa = totalWeights > 0 ? totalPoints / totalWeights : 0;
    const trend: 'up' | 'down' | 'stable' = gpa >= 4.0 ? 'up' : gpa >= 3.5 ? 'stable' : 'down';
    return {
      current: gpa.toFixed(2),
      total: totalWeights,
      trend
    };
  }, [grades]);

  const tasksStats = useMemo(() => {
    const pending = tasks.filter(t => !t.completed);
    const overdue = pending.filter(t => t.deadline < new Date());
    const today = pending.filter(t => 
      t.deadline.toDateString() === new Date().toDateString()
    );
    const avgProgress = pending.length > 0 
      ? (pending.length > 0 ? pending.reduce((sum, t) => sum + t.progress, 0) / pending.length : 0) 
      : 0;

    return {
      pending: pending.length,
      overdue: overdue.length,
      today: today.length,
      avgProgress: Math.round(avgProgress)
    };
  }, [tasks]);

  const weeklyStats = useMemo(() => {
    if (!mounted) return [];
    
    const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    const fullDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const today = new Date().getDay();
    
    // Используем стабильные данные вместо случайных для лучшей производительности
    const predefinedData = [
      { completed: 4, total: 5, streak: 8 },  // ВС
      { completed: 5, total: 6, streak: 12 }, // ПН
      { completed: 3, total: 4, streak: 6 },  // ВТ
      { completed: 4, total: 5, streak: 9 },  // СР
      { completed: 5, total: 5, streak: 15 }, // ЧТ
      { completed: 3, total: 5, streak: 4 },  // ПТ
      { completed: 2, total: 3, streak: 7 }   // СБ
    ];
    
    const taskTitles = [
      'Посетить лекцию',
      'Выполнить ДЗ',
      'Подготовить презентацию',
      'Прочитать главу',
      'Сдать лабораторную',
      'Встреча с куратором',
      'Проект по программированию'
    ];
    
    const subjects = ['Математика', 'Программирование', 'Физика', 'История', 'Английский'];
    
    return days.map((day, index) => {
      const dayData = predefinedData[index];
      const efficiency = Math.round((dayData.completed / dayData.total) * 100);
      
      // Генерируем стабильные задачи для каждого дня
      const dayTasks = Array.from({ length: dayData.total }, (_, i) => ({
        id: `${day}-${i}`,
        title: taskTitles[i % taskTitles.length],
        completed: i < dayData.completed,
        time: `${8 + i * 2}:00`,
        subject: subjects[i % subjects.length]
      }));
      
      return {
        day,
        fullDay: fullDays[index],
        completed: dayData.completed,
        total: dayData.total,
        efficiency,
        active: index === today,
        isPast: index < today,
        isFuture: index > today,
        tasks: dayTasks,
        streak: index === today ? 5 : dayData.streak,
        mood: efficiency >= 80 ? 'отлично' : efficiency >= 60 ? 'хорошо' : efficiency >= 40 ? 'средне' : 'плохо'
      };
    });
  }, [mounted]);



  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-red-500" />;
      case 'stable': return <ArrowUpRight className="w-3 h-3 text-blue-500" />;
    }
  };

  const addQuickNote = () => {
    try {
      if (!newNote.trim()) return;
      
      const note: QuickNote = {
        id: Date.now().toString(),
        text: newNote.trim(),
        createdAt: new Date(),
        important: false
      };
      const updatedNotes = [note, ...quickNotes];
      setQuickNotes(updatedNotes);
      localStorage.setItem('quickNotes', JSON.stringify(updatedNotes));
      setNewNote('');
      setShowNoteForm(false);
    } catch (error) {
      console.error('Ошибка при добавлении заметки:', error);
    }
  };

  const deleteNote = (id: string) => {
    try {
      if (!id) return;
      const updatedNotes = quickNotes.filter(note => note.id !== id);
      setQuickNotes(updatedNotes);
      localStorage.setItem('quickNotes', JSON.stringify(updatedNotes));
    } catch (error) {
      console.error('Ошибка при удалении заметки:', error);
    }
  };

  const toggleNoteImportant = (id: string) => {
    try {
      const updatedNotes = quickNotes.map(note => 
        note.id === id ? { ...note, important: !note.important } : note
      );
      setQuickNotes(updatedNotes);
      localStorage.setItem('quickNotes', JSON.stringify(updatedNotes));
    } catch (error) {
      console.error('Ошибка при изменении статуса заметки:', error);
    }
  };

  // Функция создания задач удалена - теперь задачи берутся из расписания

  const toggleTaskCompleted = (id: string) => {
    try {
      if (!id) return;
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed, progress: task.completed ? 0 : 100 } : task
      ));
    } catch (error) {
      console.error('Ошибка при изменении статуса задачи:', error);
    }
  };

  const getTimeGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return { text: 'Доброе утро', icon: <Sun className="w-5 h-5" /> };
    if (hour < 18) return { text: 'Добрый день', icon: <Sun className="w-5 h-5" /> };
    return { text: 'Добрый вечер', icon: <Moon className="w-5 h-5" /> };
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  const getDaysUntilDeadline = (deadline: Date) => {
    const diff = deadline.getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return 'var(--accent-green)';
      default: return 'var(--text-muted)';
    }
  };

  // Полезные виджеты для правого угла
  const headerWidgets = useMemo(() => {
    const now = new Date();
    const semesterStart = new Date(2024, 8, 1); // 1 сентября
    const semesterEnd = new Date(2025, 0, 31); // 31 января
    const semesterProgress = Math.round(((now.getTime() - semesterStart.getTime()) / (semesterEnd.getTime() - semesterStart.getTime())) * 100);
    
    const nextExam = new Date(2024, 11, 25); // 25 декабря
    const daysToExam = Math.ceil((nextExam.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    const attendance = 87; // Процент посещаемости
    const groupRank = 3; // Место в группе
    const totalStudents = 24; // Всего студентов в группе
    
    const completedTasks = tasks.filter(t => t.completed).length;
    const taskStreak = 7; // Дней подряд выполняет задачи
    
    return [
      {
        id: 'gpa',
        icon: <Trophy className="w-4 h-4" />,
        value: gpaCalculation.current,
        label: 'GPA',
        color: 'var(--accent-green)',
        trend: getTrendIcon(gpaCalculation.trend)
      },
      {
        id: 'semester',
        icon: <Calendar className="w-4 h-4" />,
        value: `${semesterProgress}%`,
        label: 'Семестр',
        color: 'var(--accent-blue)',
        trend: <ArrowUpRight className="w-3 h-3 text-blue-500" />
      },
      {
        id: 'attendance',
        icon: <CheckCircle className="w-4 h-4" />,
        value: `${attendance}%`,
        label: 'Посещений',
        color: attendance >= 80 ? 'var(--accent-green)' : '#f59e0b',
        trend: attendance >= 80 ? <TrendingUp className="w-3 h-3 text-green-500" /> : <TrendingDown className="w-3 h-3 text-orange-500" />
      },
      {
        id: 'rank',
        icon: <Award className="w-4 h-4" />,
        value: `${groupRank}/${totalStudents}`,
        label: 'Рейтинг',
        color: groupRank <= 5 ? 'var(--accent-green)' : 'var(--accent-blue)',
        trend: <Star className="w-3 h-3 text-yellow-500" />
      },
      {
        id: 'exam',
        icon: <Timer className="w-4 h-4" />,
        value: daysToExam > 0 ? `${daysToExam}д` : 'Сегодня',
        label: 'До экзамена',
        color: daysToExam <= 7 ? '#ef4444' : daysToExam <= 14 ? '#f59e0b' : 'var(--accent-blue)',
        trend: daysToExam <= 7 ? <AlertCircle className="w-3 h-3 text-red-500" /> : <Clock className="w-3 h-3 text-blue-500" />
      },
      {
        id: 'streak',
        icon: <Zap className="w-4 h-4" />,
        value: `${taskStreak}`,
        label: 'Дней streak',
        color: '#f59e0b',
        trend: <TrendingUp className="w-3 h-3 text-orange-500" />
      }
    ];
  }, [gpaCalculation, tasks]);

  const academicStats = useMemo((): AcademicStat[] => {
    const totalCreditsNeeded = 120;
    const currentCredits = gpaCalculation.total;
    const creditProgress = Math.round((currentCredits / totalCreditsNeeded) * 100);
    
    const averageGrade = grades.length > 0 
              ? (grades.length > 0 ? grades.reduce((sum, grade) => sum + grade.grade, 0) / grades.length : 0) 
      : 0;
    
    const semesterGoal = 30; // Кредитов за семестр
    const semesterProgress = Math.round((currentCredits % semesterGoal / semesterGoal) * 100);
    
    return [
      {
        id: 'grades',
        title: 'Оценки получено',
        value: grades.length,
        label: 'оценок',
        sublabel: 'За семестр',
        trend: averageGrade >= 4.5 ? 'up' : averageGrade >= 4.0 ? 'stable' : 'down',
        trendValue: `${averageGrade.toFixed(1)} средний балл`,
        color: '#3b82f6',
        gradientFrom: '#3b82f6',
        gradientTo: '#1d4ed8',
        icon: <BookOpen className="w-5 h-5" />,
        progress: Math.round((averageGrade / 5) * 100),
        comparison: {
          label: 'К прошлому семестру',
          value: '+0.3',
          positive: true
        },
        details: {
          breakdown: grades.map(grade => ({
            label: grade.subject,
            value: `${grade.grade}/${grade.maxGrade}`,
            color: grade.grade >= 4 ? '#10b981' : grade.grade >= 3 ? '#f59e0b' : '#ef4444'
          })),
          insights: [
            { text: 'Отличная динамика по математике', type: 'success' },
            { text: 'Рекомендуется улучшить показатели по истории', type: 'warning' },
            { text: `Для отличия нужно поднять средний балл до 4.5`, type: 'info' }
          ]
        }
      },
      {
        id: 'tasks',
        title: 'Активных задач',
        value: tasksStats.pending,
        label: 'задач',
        sublabel: `${tasksStats.overdue} просрочено`,
        trend: tasksStats.overdue === 0 ? 'up' : tasksStats.overdue <= 2 ? 'stable' : 'down',
        trendValue: `${tasksStats.avgProgress}% прогресс`,
        color: '#f59e0b',
        gradientFrom: '#f59e0b',
        gradientTo: '#d97706',
        icon: <Target className="w-5 h-5" />,
        progress: tasksStats.avgProgress,
        comparison: {
          label: 'За неделю',
          value: `${tasks.filter(t => t.completed).length} выполнено`,
          positive: true
        },
        details: {
          breakdown: [
            { label: 'Высокий приоритет', value: `${tasks.filter(t => !t.completed && t.priority === 'high').length}`, color: '#ef4444' },
            { label: 'Средний приоритет', value: `${tasks.filter(t => !t.completed && t.priority === 'medium').length}`, color: '#f59e0b' },
            { label: 'Низкий приоритет', value: `${tasks.filter(t => !t.completed && t.priority === 'low').length}`, color: '#10b981' }
          ],
          insights: [
            { text: `${tasksStats.today} задач нужно выполнить сегодня`, type: 'warning' },
            { text: 'Хорошая скорость выполнения задач', type: 'success' },
            { text: 'Рекомендуется планировать задачи заранее', type: 'info' }
          ]
        }
      },
      {
        id: 'credits',
        title: 'Кредитов набрано',
        value: currentCredits,
        maxValue: totalCreditsNeeded,
        label: 'кредитов',
        sublabel: `Из ${totalCreditsNeeded} всего`,
        trend: creditProgress >= 25 ? 'up' : creditProgress >= 15 ? 'stable' : 'down',
        trendValue: `${creditProgress}% от общего плана`,
        color: '#10b981',
        gradientFrom: '#10b981',
        gradientTo: '#059669',
        icon: <GraduationCap className="w-5 h-5" />,
        progress: creditProgress,
        comparison: {
          label: 'До окончания',
          value: `${totalCreditsNeeded - currentCredits} кредитов`,
          positive: false
        },
        details: {
          breakdown: [
            { label: 'Основные предметы', value: `${Math.floor(currentCredits * 0.7)}`, color: '#3b82f6' },
            { label: 'Элективы', value: `${Math.floor(currentCredits * 0.2)}`, color: '#10b981' },
            { label: 'Практика', value: `${Math.floor(currentCredits * 0.1)}`, color: '#f59e0b' }
          ],
          insights: [
            { text: `Вы опережаете план на ${Math.max(0, currentCredits - 15)} кредитов`, type: 'success' },
            { text: 'Рекомендуется выбрать элективы на следующий семестр', type: 'info' },
            { text: `До получения степени ${((totalCreditsNeeded - currentCredits) / 30).toFixed(1)} семестра`, type: 'info' }
          ]
        }
      },
      {
        id: 'events',
        title: 'Событий сегодня',
        value: todayEvents.length,
        label: 'событий',
        sublabel: 'В расписании',
        trend: todayEvents.length >= 3 ? 'up' : todayEvents.length >= 2 ? 'stable' : 'down',
        trendValue: `${todayEvents.filter(e => e.type === 'exam').length} экзаменов`,
        color: '#8b5cf6',
        gradientFrom: '#8b5cf6',
        gradientTo: '#7c3aed',
        icon: <Calendar className="w-5 h-5" />,
        progress: Math.round((todayEvents.length / 5) * 100),
        comparison: {
          label: 'На этой неделе',
          value: `${todayEvents.length * 5} событий`,
          positive: true
        },
        details: {
          breakdown: todayEvents.map(event => ({
            label: event.title,
            value: event.time,
            color: event.type === 'exam' ? '#ef4444' : event.type === 'lesson' ? '#3b82f6' : '#10b981'
          })),
          insights: [
            { text: 'Рекомендуется прийти на 10 минут раньше', type: 'info' },
            { text: 'Все аудитории доступны', type: 'success' },
            { text: `${todayEvents.filter(e => e.type === 'exam').length > 0 ? 'Сегодня экзамен - удачи!' : 'Спокойный учебный день'}`, type: todayEvents.filter(e => e.type === 'exam').length > 0 ? 'warning' : 'success' }
          ]
        }
      }
    ];
  }, [grades, tasksStats, gpaCalculation, todayEvents, tasks]);

  const currentWidget = headerWidgets[widgetIndex];

  const cycleWidget = () => {
    try {
      if (headerWidgets.length === 0) return;
      setWidgetIndex((prev) => (prev + 1) % headerWidgets.length);
    } catch (error) {
      console.error('Ошибка при переключении виджета:', error);
    }
  };

  const handleDayClick = (day: string) => {
    try {
      if (!day || weeklyStats.length === 0) return;
      
      const dayData = weeklyStats.find(d => d.day === day);
      if (!dayData) return;
      
      setSelectedDay(day);
      setShowDayDetail(true);
    } catch (error) {
      console.error('Ошибка при открытии деталей дня:', error);
    }
  };

  const closeDayDetail = () => {
    setShowDayDetail(false);
    setSelectedDay(null);
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 80) return 'var(--accent-green)';
    if (efficiency >= 60) return 'var(--accent-blue)';
    if (efficiency >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const weeklyOverview = useMemo(() => {
    if (!weeklyStats.length) {
      return {
        totalCompleted: 0,
        totalTasks: 0,
        avgEfficiency: 0,
        bestDay: { day: 'ПН', efficiency: 0, fullDay: 'Понедельник', completed: 0, total: 0, active: false, isPast: false, isFuture: false, tasks: [], streak: 0, mood: 'хорошо' },
        completedDays: 0,
        trend: 'stable' as const
      };
    }

    const totalCompleted = weeklyStats.reduce((sum, day) => sum + day.completed, 0);
    const totalTasks = weeklyStats.reduce((sum, day) => sum + day.total, 0);
    const avgEfficiency = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;
    const bestDay = weeklyStats.reduce((best, day) => 
      day.efficiency > best.efficiency ? day : best, weeklyStats[0]
    );
    const completedDays = weeklyStats.filter(day => day.isPast && day.efficiency >= 60).length;

    const trend: 'up' | 'down' | 'stable' = avgEfficiency >= 70 ? 'up' : avgEfficiency >= 50 ? 'stable' : 'down';
    
    return {
      totalCompleted,
      totalTasks,
      avgEfficiency,
      bestDay,
      completedDays,
      trend
    };
  }, [weeklyStats]);

  const weeklyActivityStats = useMemo((): WeeklyStat[] => {
    const currentStreak = 5; // Текущая полоса продуктивности
    const targetEfficiency = 80; // Целевая эффективность
    
    return [
      {
        id: 'efficiency',
        title: 'Эффективность',
        value: weeklyOverview.avgEfficiency,
        maxValue: 100,
        label: '%',
        sublabel: 'Средняя за неделю',
        trend: weeklyOverview.trend,
        trendValue: `${weeklyOverview.avgEfficiency >= targetEfficiency ? 'Цель достигнута' : 'Ниже цели'}`,
        color: '#10b981',
        gradientFrom: '#10b981',
        gradientTo: '#059669',
        icon: <TrendingUp className="w-5 h-5" />,
        progress: weeklyOverview.avgEfficiency,
        comparison: {
          label: 'К прошлой неделе',
          value: '+12%',
          positive: true
        },
        details: {
          breakdown: weeklyStats.map(day => ({
            label: day.fullDay,
            value: `${day.efficiency}%`,
            color: getEfficiencyColor(day.efficiency)
          })),
          insights: [
            { text: 'Лучший результат в четверг', type: 'success' },
            { text: weeklyOverview.avgEfficiency >= 70 ? 'Отличная продуктивность' : 'Есть потенциал для роста', type: weeklyOverview.avgEfficiency >= 70 ? 'success' : 'warning' },
            { text: 'Рекомендуется поддерживать ритм', type: 'info' }
          ]
        }
      },
      {
        id: 'tasks',
        title: 'Задач выполнено',
        value: weeklyOverview.totalCompleted,
        maxValue: weeklyOverview.totalTasks,
        label: 'задач',
        sublabel: `Из ${weeklyOverview.totalTasks} всего`,
        trend: weeklyOverview.totalCompleted >= weeklyOverview.totalTasks * 0.7 ? 'up' : 'stable',
        trendValue: `${weeklyOverview.totalTasks > 0 ? Math.round((weeklyOverview.totalCompleted / weeklyOverview.totalTasks) * 100) : 0}% выполнение`,
        color: '#3b82f6',
        gradientFrom: '#3b82f6',
        gradientTo: '#1d4ed8',
        icon: <CheckCircle className="w-5 h-5" />,
        progress: weeklyOverview.totalTasks > 0 ? Math.round((weeklyOverview.totalCompleted / weeklyOverview.totalTasks) * 100) : 0,
        comparison: {
          label: 'За неделю',
          value: `${weeklyOverview.totalCompleted} выполнено`,
          positive: true
        },
        details: {
          breakdown: weeklyStats.map(day => ({
            label: day.fullDay,
            value: `${day.completed}/${day.total}`,
            color: day.completed === day.total ? '#10b981' : day.completed > day.total / 2 ? '#3b82f6' : '#f59e0b'
          })),
          insights: [
            { text: `${weeklyStats.filter(d => d.completed === d.total).length} дней с полным выполнением`, type: 'success' },
            { text: 'Стабильный темп работы', type: 'info' },
            { text: 'Хорошее планирование задач', type: 'success' }
          ]
        }
      },
      {
        id: 'streak',
        title: 'Активная полоса',
        value: currentStreak,
        label: 'дней',
        sublabel: 'Продуктивных подряд',
        trend: currentStreak >= 5 ? 'up' : currentStreak >= 3 ? 'stable' : 'down',
        trendValue: `${currentStreak >= 7 ? 'Отличная дисциплина' : 'Набираем обороты'}`,
        color: '#f59e0b',
        gradientFrom: '#f59e0b',
        gradientTo: '#d97706',
        icon: <Zap className="w-5 h-5" />,
        progress: Math.min((currentStreak / 10) * 100, 100),
        comparison: {
          label: 'Лучший результат',
          value: '12 дней',
          positive: false
        },
        details: {
          breakdown: [
            { label: 'Текущая полоса', value: `${currentStreak} дней`, color: '#f59e0b' },
            { label: 'Лучший результат', value: '12 дней', color: '#10b981' },
            { label: 'Средняя полоса', value: '4.2 дня', color: '#6b7280' }
          ],
          insights: [
            { text: 'Превосходная консистентность', type: 'success' },
            { text: 'До рекорда остается 7 дней', type: 'info' },
            { text: 'Поддерживайте текущий темп', type: 'info' }
          ]
        }
      },
      {
        id: 'bestday',
        title: 'Лучший день',
        value: weeklyOverview.bestDay.day,
        label: weeklyOverview.bestDay.efficiency + '%',
        sublabel: 'Максимальная эффективность',
        trend: weeklyOverview.bestDay.efficiency >= 90 ? 'up' : weeklyOverview.bestDay.efficiency >= 70 ? 'stable' : 'down',
        trendValue: `${weeklyOverview.bestDay.efficiency}% эффективность`,
        color: '#8b5cf6',
        gradientFrom: '#8b5cf6',
        gradientTo: '#7c3aed',
        icon: <Trophy className="w-5 h-5" />,
        progress: weeklyOverview.bestDay.efficiency,
        comparison: {
          label: 'Продуктивных дней',
          value: `${weeklyOverview.completedDays}/7`,
          positive: weeklyOverview.completedDays >= 5
        },
        details: {
          breakdown: weeklyStats
            .sort((a, b) => b.efficiency - a.efficiency)
            .slice(0, 3)
            .map((day, index) => ({
              label: `${index + 1}. ${day.fullDay}`,
              value: `${day.efficiency}%`,
              color: index === 0 ? '#10b981' : index === 1 ? '#3b82f6' : '#f59e0b'
            })),
          insights: [
            { text: `${weeklyOverview.bestDay.day} - ваш самый продуктивный день`, type: 'success' },
            { text: `${weeklyOverview.completedDays} из 7 дней были продуктивными`, type: 'info' },
            { text: 'Определите паттерны успешных дней', type: 'info' }
          ]
        }
      },
      {
        id: 'studytime',
        title: 'Время обучения',
        value: '28',
        label: 'часов',
        sublabel: 'За эту неделю',
        trend: 'up',
        trendValue: 'На 4 часа больше',
        color: '#06b6d4',
        gradientFrom: '#06b6d4',
        gradientTo: '#0891b2',
        icon: <Clock className="w-5 h-5" />,
        progress: Math.round((28 / 35) * 100), // Из 35 часов целевых
        comparison: {
          label: 'Цель: 35 часов',
          value: '80% выполнено',
          positive: true
        },
        details: {
          breakdown: [
            { label: 'Лекции', value: '12 часов', color: '#06b6d4' },
            { label: 'Самостоятельная работа', value: '10 часов', color: '#3b82f6' },
            { label: 'Практические занятия', value: '6 часов', color: '#10b981' }
          ],
          insights: [
            { text: 'Отличный прогресс в достижении цели', type: 'success' },
            { text: 'Балансируйте теорию и практику', type: 'info' },
            { text: 'До цели остается 7 часов', type: 'info' }
          ]
        }
      }
    ];
  }, [weeklyStats, weeklyOverview, getEfficiencyColor]);

  const selectedDayData = selectedDay ? weeklyStats.find(d => d.day === selectedDay) : null;

  if (!mounted) {
    return (
      <div className="loading-dashboard">
        <div className="loading-content">
          <div className="loading-spinner-modern">
            <div className="spinner"></div>
          </div>
          <p>Загрузка дашборда...</p>
        </div>
      </div>
    );
  }

  const greeting = getTimeGreeting();

  return (
    <div className="schedule-compact">
      {/* Персонализированный заголовок */}
      <div className="schedule-header-compact">
        <div className="header-main">
          {greeting.icon}
          <div>
            <h1>{greeting.text}!</h1>
            <p>{formatDate(currentTime)} • {formatTime(currentTime)}</p>
          </div>
        </div>
        <div className="header-widget" onClick={cycleWidget}>
          <div className="widget-icon" style={{ color: currentWidget.color }}>
            {currentWidget.icon}
          </div>
          <div className="widget-content">
            <span className="widget-value">{currentWidget.value}</span>
            <span className="widget-label">{currentWidget.label}</span>
          </div>
          <div className="widget-trend">
            {currentWidget.trend}
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="schedule-main-compact">
        {/* Верхний ряд - статистика */}
        <div className="schedule-top-row">
          {/* GPA Калькулятор */}
          <div className="schedule-stats-compact enhanced">
            <div className="stats-header">
              <h3>Академические показатели</h3>
              <p>Текущий прогресс</p>
            </div>
            <div className="stats-grid-enhanced">
              {academicStats.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  className="stat-card-enhanced"
                  onClick={() => setAcademicModal({ stat, isOpen: true })}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
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
                      {typeof stat.value === 'number' && stat.maxValue ? (
                        <>
                          <span className="value-primary">{stat.value}</span>
                          <span className="value-separator">/</span>
                          <span className="value-secondary">{stat.maxValue}</span>
                        </>
                      ) : (
                        <span className="value-primary">{stat.value}</span>
                      )}
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
                        <span className="progress-percentage">{stat.progress}%</span>
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
          </div>

          {/* Недельная активность */}
          <div className="schedule-stats-compact enhanced">
            <div className="stats-header">
              <h3>Активность недели</h3>
              <p>Продуктивность и прогресс</p>
            </div>
            <div className="weekly-activity-vertical">
              {/* Верхняя карточка: Продуктивность недели */}
              <motion.div
                className="weekly-card-compact"
                onClick={() => setWeeklyModal({ stat: weeklyActivityStats[0], isOpen: true })}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="stat-background" style={{
                  background: `linear-gradient(135deg, #10b98115, #05966905)`
                }} />
                
                <div className="stat-header-enhanced">
                  <div className="stat-icon-enhanced" style={{ color: '#10b981' }}>
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div className="stat-trend-indicator">
                    {getTrendIcon(weeklyOverview.trend)}
                  </div>
                </div>

                <div className="stat-main-content">
                  <div className="stat-value-enhanced">
                    <span className="value-primary">{weeklyOverview.avgEfficiency}</span>
                    <span className="value-unit">%</span>
                  </div>
                  <div className="stat-labels">
                    <span className="stat-label-enhanced">Эффективность</span>
                    <span className="stat-sublabel-enhanced">Средняя за неделю</span>
                  </div>
                </div>

                <div className="stat-progress-section">
                  <div className="progress-bar-enhanced">
                    <motion.div 
                      className="progress-fill-enhanced"
                      style={{ backgroundColor: '#10b981' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${weeklyOverview.avgEfficiency}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <div className="progress-details">
                    <span className="progress-percentage">{weeklyOverview.avgEfficiency}%</span>
                    <span className="progress-trend">{weeklyOverview.avgEfficiency >= 70 ? 'Отличная продуктивность' : 'Есть потенциал для роста'}</span>
                  </div>
                </div>

                <div className="stat-comparison">
                  <span className="comparison-value positive">
                    {weeklyOverview.totalCompleted}/{weeklyOverview.totalTasks} задач
                  </span>
                  <span className="comparison-label">Выполнено за неделю</span>
                </div>
              </motion.div>

              {/* Средняя карточка: Активная полоса */}
              <motion.div
                className="weekly-card-compact"
                onClick={() => setWeeklyModal({ stat: weeklyActivityStats[2], isOpen: true })}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="stat-background" style={{
                  background: `linear-gradient(135deg, #f59e0b15, #d9770605)`
                }} />
                
                <div className="stat-header-enhanced">
                  <div className="stat-icon-enhanced" style={{ color: '#f59e0b' }}>
                    <Zap className="w-5 h-5" />
                  </div>
                  <div className="stat-trend-indicator">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                  </div>
                </div>

                <div className="stat-main-content">
                  <div className="stat-value-enhanced">
                    <span className="value-primary">5</span>
                    <span className="value-unit">дней</span>
                  </div>
                  <div className="stat-labels">
                    <span className="stat-label-enhanced">Активная полоса</span>
                    <span className="stat-sublabel-enhanced">Продуктивных подряд</span>
                  </div>
                </div>

                <div className="stat-progress-section">
                  <div className="progress-bar-enhanced">
                    <motion.div 
                      className="progress-fill-enhanced"
                      style={{ backgroundColor: '#f59e0b' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((5 / 12) * 100, 100)}%` }}
                      transition={{ duration: 1, delay: 0.6 }}
                    />
                  </div>
                  <div className="progress-details">
                    <span className="progress-percentage">{Math.min((5 / 12) * 100, 100).toFixed(0)}%</span>
                    <span className="progress-trend">До рекорда 7 дней</span>
                  </div>
                </div>

                <div className="stat-comparison">
                  <span className="comparison-value positive">
                    {weeklyOverview.bestDay.day} • {weeklyOverview.bestDay.efficiency}%
                  </span>
                  <span className="comparison-label">Лучший день недели</span>
                </div>
              </motion.div>

              {/* Нижняя карточка: Время обучения */}
              <motion.div
                className="weekly-card-compact"
                onClick={() => setWeeklyModal({ stat: weeklyActivityStats[4], isOpen: true })}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="stat-background" style={{
                  background: `linear-gradient(135deg, #06b6d415, #0891b205)`
                }} />
                
                <div className="stat-header-enhanced">
                  <div className="stat-icon-enhanced" style={{ color: '#06b6d4' }}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="stat-trend-indicator">
                    <TrendingUp className="w-4 h-4 text-cyan-500" />
                  </div>
                </div>

                <div className="stat-main-content">
                  <div className="stat-value-enhanced">
                    <span className="value-primary">28</span>
                    <span className="value-unit">часов</span>
                  </div>
                  <div className="stat-labels">
                    <span className="stat-label-enhanced">Время обучения</span>
                    <span className="stat-sublabel-enhanced">За эту неделю</span>
                  </div>
                </div>

                <div className="stat-progress-section">
                  <div className="progress-bar-enhanced">
                    <motion.div 
                      className="progress-fill-enhanced"
                      style={{ backgroundColor: '#06b6d4' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.round((28 / 35) * 100)}%` }}
                      transition={{ duration: 1, delay: 0.7 }}
                    />
                  </div>
                  <div className="progress-details">
                    <span className="progress-percentage">{Math.round((28 / 35) * 100)}%</span>
                    <span className="progress-trend">На 4 часа больше</span>
                  </div>
                </div>

                <div className="stat-comparison">
                  <span className="comparison-value positive">
                    80% выполнено
                  </span>
                  <span className="comparison-label">Цель: 35 часов</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Нижний ряд - единый большой модуль */}
        <motion.div 
          className="schedule-unified-module"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="schedule-stats-compact enhanced large-unified">
            <div className="stats-header">
              <h3>Управление учебным процессом</h3>
              <p>Задачи, заметки, расписание и быстрые действия</p>
            </div>
            
            {/* Основная сетка модуля */}
            <div className="unified-module-grid">
              {/* Левая колонка - Заметки и задачи */}
              <div className="unified-module-section">
                {/* Быстрые заметки */}
                <div className="task-management-section">
                  <div className="section-header">
                    <h4>Быстрые заметки</h4>
                    <button 
                      className="add-btn-small"
                      onClick={() => setShowNoteForm(!showNoteForm)}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {showNoteForm && (
                    <div className="quick-form">
                      <div className="form-row">
                        <input
                          type="text"
                          placeholder="Добавить заметку..."
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addQuickNote()}
                          className="form-input-small"
                        />
                        <button onClick={addQuickNote} className="btn-save">
                          <Save className="w-4 h-4" />
                        </button>
                        <button onClick={() => setShowNoteForm(false)} className="btn-cancel">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="compact-notes-list">
                    {quickNotes.slice(0, 3).map((note, index) => (
                      <motion.div 
                        key={note.id} 
                        className={`compact-note-item ${note.important ? 'important' : ''}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -1, scale: 1.01 }}
                      >
                        <div className="note-content">
                          <p>{note.text}</p>
                          <span className="note-time">{formatTime(note.createdAt)}</span>
                        </div>
                        <div className="note-actions">
                          <motion.button 
                            onClick={() => toggleNoteImportant(note.id)}
                            className={note.important ? 'important-btn active' : 'important-btn'}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Star className="w-3 h-3" />
                          </motion.button>
                          <motion.button 
                            onClick={() => deleteNote(note.id)} 
                            className="delete-btn"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <X className="w-3 h-3" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Задачи из расписания */}
                <div className="task-management-section">
                                  <div className="section-header">
                  <h4>Задачи из расписания</h4>
                </div>

                  <div className="compact-tasks-list">
                    {todayScheduleTasks.length === 0 ? (
                      <motion.div 
                        className="empty-state-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="empty-state-icon">
                          <Calendar className="w-8 h-8" />
                        </div>
                        <div className="empty-state-content">
                          <h5>На сегодня нет дел</h5>
                          <p>Отличный день для отдыха или планирования!</p>
                        </div>
                      </motion.div>
                    ) : (
                      todayScheduleTasks.slice(0, 4).map((task, index) => {
                      const isCompleted = task.progress >= 100;
                      const taskTypeGradient = task.type === 'lesson' ? 'rgba(59, 130, 246, 0.15)' : 
                                             task.type === 'exam' ? 'rgba(239, 68, 68, 0.15)' : 
                                             task.type === 'meeting' ? 'rgba(139, 92, 246, 0.15)' : 
                                             'rgba(245, 158, 11, 0.15)';
                      const taskTypeColor = task.type === 'lesson' ? '#3b82f6' : 
                                           task.type === 'exam' ? '#ef4444' : 
                                           task.type === 'meeting' ? '#8b5cf6' : '#f59e0b';
                      
                      return (
                        <motion.div 
                          key={task.id} 
                          className={`compact-task-item ${isCompleted ? 'completed' : ''}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: -1, scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => {/* toast.success(`Детали задачи: ${task.title}`) */}} // Убрано раздражающее уведомление
                        >
                          <div className="task-main">
                            <div className="task-type-indicator" style={{ background: taskTypeGradient }}>
                              {task.type === 'lesson' && <BookOpen className="w-4 h-4" style={{ color: taskTypeColor }} />}
                              {task.type === 'exam' && <GraduationCap className="w-4 h-4" style={{ color: taskTypeColor }} />}
                              {task.type === 'meeting' && <Users className="w-4 h-4" style={{ color: taskTypeColor }} />}
                              {task.type === 'deadline' && <Target className="w-4 h-4" style={{ color: taskTypeColor }} />}
                            </div>
                            <div className="task-content">
                              <h5>{task.title}</h5>
                              <div className="task-meta">
                                <span className="task-subject">{task.subject}</span>
                                <span className="task-time">{task.time}</span>
                                <span className={`task-type ${task.type}`}>
                                  {task.type === 'lesson' ? 'Занятие' :
                                   task.type === 'exam' ? 'Экзамен' :
                                   task.type === 'meeting' ? 'Встреча' : 'Дедлайн'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="task-progress-compact">
                            <div className="progress-bar-mini">
                              <motion.div 
                                className="progress-fill-mini"
                                style={{ 
                                  width: `${task.progress}%`,
                                  backgroundColor: taskTypeColor
                                }}
                                initial={{ width: 0 }}
                                animate={{ width: `${task.progress}%` }}
                                transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                              />
                            </div>
                            <span className="progress-text-mini">{task.progress}%</span>
                          </div>
                        </motion.div>
                      );
                    }))}
                  </div>
                </div>
              </div>

              {/* Правая колонка - Расписание и статистика */}
              <div className="unified-module-section">
                {/* Сегодняшние события */}
                <div className="schedule-events-section">
                  <div className="section-header">
                    <h4>Сегодня в расписании</h4>
                  </div>

                  <div className="compact-events-list">
                    {todayEvents.length === 0 ? (
                      <motion.div 
                        className="empty-state-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <div className="empty-state-icon">
                          <Clock className="w-8 h-8" />
                        </div>
                        <div className="empty-state-content">
                          <h5>Сегодня свободный день</h5>
                          <p>Нет запланированных занятий</p>
                        </div>
                      </motion.div>
                    ) : (
                      todayEvents.map((event) => (
                      <motion.div 
                        key={event.id} 
                        className="compact-event-item"
                        whileHover={{ x: 2, scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => {
                          if (event.type === 'exam') {
                            setShowGradesDetail(true);
                          } else if (event.type === 'lesson') {
                            setShowFullSchedule(true);
                          } else {
                            setShowTaskPlanner(true);
                          }
                        }}
                      >
                        <div className="event-time">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="event-content">
                          <h5>{event.title}</h5>
                          <div className="event-meta">
                            <span className={`event-type ${event.type}`}>
                              {event.type === 'lesson' ? 'Занятие' :
                               event.type === 'exam' ? 'Экзамен' :
                               event.type === 'meeting' ? 'Встреча' : 'Дедлайн'}
                            </span>
                            {event.location && (
                              <span className="event-location">
                                <MapPin className="w-3 h-3" />
                                {event.location}
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 event-arrow" />
                      </motion.div>
                    )))}
                  </div>
                </div>

                {/* Статистика дня */}
                <div className="schedule-stats-section">
                  <div className="section-header">
                    <h4>Прогресс дня</h4>
                  </div>
                  
                  <div className="unified-daily-progress-grid">
                    <motion.div 
                      className="unified-progress-stat-card"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="stat-icon" style={{ color: '#10b981' }}>
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <div className="stat-content">
                        <div className="stat-value">
                          {todayScheduleTasks.filter(t => t.progress >= 100).length}/{todayScheduleTasks.length || 1}
                        </div>
                        <div className="stat-label">Задач выполнено</div>
                        <div className="progress-bar-small">
                          <motion.div 
                            className="progress-fill-small"
                            style={{ backgroundColor: '#10b981' }}
                            initial={{ width: 0 }}
                            animate={{ width: `${todayScheduleTasks.length > 0 
                              ? Math.round((todayScheduleTasks.filter(t => t.progress >= 100).length / todayScheduleTasks.length) * 100)
                              : 0}%` }}
                            transition={{ duration: 1, delay: 1.2 }}
                          />
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="unified-progress-stat-card"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="stat-icon" style={{ color: '#3b82f6' }}>
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="stat-content">
                        <div className="stat-value">{todayEvents.length}</div>
                        <div className="stat-label">События сегодня</div>
                        <div className="progress-bar-small">
                          <motion.div 
                            className="progress-fill-small"
                            style={{ backgroundColor: '#3b82f6' }}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((todayEvents.length / 5) * 100, 100)}%` }}
                            transition={{ duration: 1, delay: 1.3 }}
                          />
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="unified-progress-stat-card"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="stat-icon" style={{ color: '#f59e0b' }}>
                        <Star className="w-4 h-4" />
                      </div>
                      <div className="stat-content">
                        <div className="stat-value">{quickNotes.filter(n => n.important).length}</div>
                        <div className="stat-label">Важных заметок</div>
                        <div className="progress-bar-small">
                          <motion.div 
                            className="progress-fill-small"
                            style={{ backgroundColor: '#f59e0b' }}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((quickNotes.filter(n => n.important).length / 3) * 100, 100)}%` }}
                            transition={{ duration: 1, delay: 1.4 }}
                          />
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="unified-progress-stat-card"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="stat-icon" style={{ color: '#8b5cf6' }}>
                        <BarChart3 className="w-4 h-4" />
                      </div>
                      <div className="stat-content">
                        <div className="stat-value">
                          {todayScheduleTasks.length > 0 
                            ? Math.round(todayScheduleTasks.reduce((sum, t) => sum + t.progress, 0) / todayScheduleTasks.length)
                            : 0}%
                        </div>
                        <div className="stat-label">Общий прогресс</div>
                        <div className="progress-bar-small">
                          <motion.div 
                            className="progress-fill-small"
                            style={{ backgroundColor: '#8b5cf6' }}
                            initial={{ width: 0 }}
                            animate={{ width: `${todayScheduleTasks.length > 0 
                              ? Math.round(todayScheduleTasks.reduce((sum, t) => sum + t.progress, 0) / todayScheduleTasks.length)
                              : 0}%` }}
                            transition={{ duration: 1, delay: 1.5 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Быстрые действия */}
                  <div className="unified-quick-actions">
                    <motion.button 
                      className="unified-quick-action-btn"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        try {
                          router.push('/schedule');
                        } catch (error) {
                          console.error('Ошибка при переходе на страницу расписания:', error);
                        }
                      }}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Полное расписание</span>
                    </motion.button>
                    <motion.button 
                      className="unified-quick-action-btn"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        try {
                          router.push('/notifications');
                        } catch (error) {
                          console.error('Ошибка при переходе на страницу уведомлений:', error);
                        }
                      }}
                    >
                      <Bell className="w-4 h-4" />
                      <span>Уведомления</span>
                    </motion.button>
                    <motion.button 
                      className="unified-quick-action-btn"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        try {
                          router.push('/library');
                        } catch (error) {
                          console.error('Ошибка при переходе на страницу библиотеки:', error);
                        }
                      }}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Библиотека</span>
                    </motion.button>
                    <motion.button 
                      className="unified-quick-action-btn"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        try {
                          router.push('/teachers');
                        } catch (error) {
                          console.error('Ошибка при переходе на страницу преподавателей:', error);
                        }
                      }}
                    >
                      <Users className="w-4 h-4" />
                      <span>Преподаватели</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Модальное окно детализации дня */}
      {showDayDetail && selectedDayData && (
        <div className="day-detail-overlay" onClick={closeDayDetail}>
          <div className="day-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="day-detail-header">
              <div className="day-detail-title">
                <h3>{selectedDayData!.fullDay}</h3>
                <div className="day-detail-stats">
                  <span className="efficiency-badge" style={{ backgroundColor: getEfficiencyColor(selectedDayData!.efficiency) }}>
                    {selectedDayData!.efficiency}% эффективность
                  </span>
                  <span className="mood-badge">
                    Настроение: {selectedDayData!.mood}
                  </span>
                </div>
              </div>
              <button className="close-btn" onClick={closeDayDetail}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="day-detail-content">
              <div className="day-tasks-section">
                <h4>Задачи дня ({selectedDayData!.completed}/{selectedDayData!.total})</h4>
                <div className="day-tasks-list">
                  {selectedDayData!.tasks.map((task, index) => (
                    <div key={task.id} className={`day-task-item ${task.completed ? 'completed' : 'pending'}`}>
                      <div className="task-status">
                        {task.completed ? 
                          <CheckCircle className="w-4 h-4 text-green-500" /> : 
                          <Clock className="w-4 h-4 text-orange-500" />
                        }
                      </div>
                      <div className="task-info">
                        <h5>{task.title}</h5>
                        <div className="task-meta">
                          <span className="task-time">{task.time}</span>
                          <span className="task-subject">{task.subject}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedDayData!.active && (
                <div className="day-actions-section">
                  <h4>Быстрые действия</h4>
                  <div className="day-actions">
                    <button className="action-btn primary">
                      <Plus className="w-4 h-4" />
                      Добавить задачу
                    </button>
                    <button className="action-btn secondary">
                      <Calendar className="w-4 h-4" />
                      Открыть расписание
                    </button>
                  </div>
                </div>
              )}

              <div className="day-insights-section">
                <h4>Инсайты</h4>
                <div className="insights-grid">
                  <div className="insight-card">
                    <Zap className="w-4 h-4" />
                    <div>
                      <span>Streak: {selectedDayData!.streak} дней</span>
                      <small>Дней подряд выполняете задачи</small>
                    </div>
                  </div>
                  <div className="insight-card">
                    <Target className="w-4 h-4" />
                    <div>
                      <span>Фокус: {selectedDayData!.efficiency >= 80 ? 'Высокий' : 'Средний'}</span>
                      <small>Уровень концентрации</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно деталей академической статистики */}
      {academicModal?.isOpen && (
        <div className="academic-modal-overlay" onClick={() => setAcademicModal(null)}>
          <motion.div 
            className="academic-modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            <div className="academic-modal-header">
              <div className="modal-title-section">
                <div className="modal-icon" style={{ color: academicModal.stat.color }}>
                  {academicModal.stat.icon}
                </div>
                <div>
                  <h3>{academicModal.stat.title}</h3>
                  <p>{academicModal.stat.sublabel}</p>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setAcademicModal(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="academic-modal-content">
              {/* Основная статистика */}
              <div className="modal-main-stats">
                <div className="main-stat-card">
                  <div className="main-stat-value">
                    {typeof academicModal.stat.value === 'number' && academicModal.stat.maxValue ? (
                      <>
                        <span>{academicModal.stat.value}</span>
                        <small>/ {academicModal.stat.maxValue}</small>
                      </>
                    ) : (
                      <span>{academicModal.stat.value}</span>
                    )}
                  </div>
                  <div className="main-stat-label">{academicModal.stat.label}</div>
                  {academicModal.stat.progress !== undefined && (
                    <div className="main-stat-progress">
                      <div className="progress-bar-modal">
                        <div 
                          className="progress-fill-modal"
                          style={{ 
                            width: `${academicModal.stat.progress}%`,
                            backgroundColor: academicModal.stat.color 
                          }}
                        />
                      </div>
                      <span>{academicModal.stat.progress}%</span>
                    </div>
                  )}
                </div>

                <div className="trend-comparison-card">
                  <div className="trend-section">
                    <div className="trend-indicator">
                      {getTrendIcon(academicModal.stat.trend)}
                    </div>
                    <div>
                      <span>Тренд</span>
                      <p>{academicModal.stat.trendValue}</p>
                    </div>
                  </div>
                  {academicModal.stat.comparison && (
                    <div className="comparison-section">
                      <span className="comparison-label">{academicModal.stat.comparison.label}</span>
                      <span className={`comparison-value ${academicModal.stat.comparison.positive ? 'positive' : 'neutral'}`}>
                        {academicModal.stat.comparison.value}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Детальная разбивка */}
              {academicModal.stat.details?.breakdown && (
                <div className="modal-breakdown-section">
                  <h4>Детальная разбивка</h4>
                  <div className="breakdown-list">
                    {academicModal.stat.details.breakdown.map((item, index) => (
                      <div key={index} className="breakdown-item">
                        <div className="breakdown-label">
                          {item.color && (
                            <div 
                              className="breakdown-color-indicator"
                              style={{ backgroundColor: item.color }}
                            />
                          )}
                          {item.label}
                        </div>
                        <div className="breakdown-value">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Инсайты */}
              {academicModal.stat.details?.insights && (
                <div className="modal-insights-section">
                  <h4>Рекомендации</h4>
                  <div className="insights-list">
                    {academicModal.stat.details.insights.map((insight, index) => (
                      <div key={index} className={`insight-item ${insight.type}`}>
                        <div className="insight-icon">
                          {insight.type === 'success' && <CheckCircle className="w-4 h-4" />}
                          {insight.type === 'warning' && <AlertCircle className="w-4 h-4" />}
                          {insight.type === 'info' && <Info className="w-4 h-4" />}
                        </div>
                        <span>{insight.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Модальное окно деталей недельной активности */}
      {weeklyModal?.isOpen && (
        <div className="academic-modal-overlay" onClick={() => setWeeklyModal(null)}>
          <motion.div 
            className="academic-modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            <div className="academic-modal-header">
              <div className="modal-title-section">
                <div className="modal-icon" style={{ color: weeklyModal.stat.color }}>
                  {weeklyModal.stat.icon}
                </div>
                <div>
                  <h3>{weeklyModal.stat.title}</h3>
                  <p>{weeklyModal.stat.sublabel}</p>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setWeeklyModal(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="academic-modal-content">
              {/* Основная статистика */}
              <div className="modal-main-stats">
                <div className="main-stat-card">
                  <div className="main-stat-value">
                    {typeof weeklyModal.stat.value === 'number' && weeklyModal.stat.maxValue ? (
                      <>
                        <span>{weeklyModal.stat.value}</span>
                        <small>/ {weeklyModal.stat.maxValue}</small>
                      </>
                    ) : (
                      <span>{weeklyModal.stat.value}</span>
                    )}
                  </div>
                  <div className="main-stat-label">{weeklyModal.stat.label}</div>
                  {weeklyModal.stat.progress !== undefined && (
                    <div className="main-stat-progress">
                      <div className="progress-bar-modal">
                        <div 
                          className="progress-fill-modal"
                          style={{ 
                            width: `${weeklyModal.stat.progress}%`,
                            backgroundColor: weeklyModal.stat.color 
                          }}
                        />
                      </div>
                      <span>{weeklyModal.stat.progress}%</span>
                    </div>
                  )}
                </div>

                <div className="trend-comparison-card">
                  <div className="trend-section">
                    <div className="trend-indicator">
                      {getTrendIcon(weeklyModal.stat.trend)}
                    </div>
                    <div>
                      <span>Тренд</span>
                      <p>{weeklyModal.stat.trendValue}</p>
                    </div>
                  </div>
                  {weeklyModal.stat.comparison && (
                    <div className="comparison-section">
                      <span className="comparison-label">{weeklyModal.stat.comparison.label}</span>
                      <span className={`comparison-value ${weeklyModal.stat.comparison.positive ? 'positive' : 'neutral'}`}>
                        {weeklyModal.stat.comparison.value}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Детальная разбивка */}
              {weeklyModal.stat.details?.breakdown && (
                <div className="modal-breakdown-section">
                  <h4>Детальная разбивка</h4>
                  <div className="breakdown-list">
                    {weeklyModal.stat.details.breakdown.map((item, index) => (
                      <div key={index} className="breakdown-item">
                        <div className="breakdown-label">
                          {item.color && (
                            <div 
                              className="breakdown-color-indicator"
                              style={{ backgroundColor: item.color }}
                            />
                          )}
                          {item.label}
                        </div>
                        <div className="breakdown-value">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Инсайты */}
              {weeklyModal.stat.details?.insights && (
                <div className="modal-insights-section">
                  <h4>Рекомендации</h4>
                  <div className="insights-list">
                    {weeklyModal.stat.details.insights.map((insight, index) => (
                      <div key={index} className={`insight-item ${insight.type}`}>
                        <div className="insight-icon">
                          {insight.type === 'success' && <CheckCircle className="w-4 h-4" />}
                          {insight.type === 'warning' && <AlertCircle className="w-4 h-4" />}
                          {insight.type === 'info' && <Info className="w-4 h-4" />}
                        </div>
                        <span>{insight.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
