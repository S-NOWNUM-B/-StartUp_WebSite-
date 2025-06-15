import React, { useState, useEffect } from 'react';

function TestingPage() {
  const [activeTab, setActiveTab] = useState('schedule'); // schedule, tests, results, preparation
  const [selectedSubject, setSelectedSubject] = useState('all');
  
  // Состояния для активного теста
  const [activeTest, setActiveTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const examSchedule = [
    {
      id: 1,
      subject: 'Высшая математика',
      type: 'Экзамен',
      date: '2025-06-15',
      time: '09:00 - 11:00',
      location: 'Ауд. 301',
      instructor: 'Проф. Иванов И.И.',
      status: 'upcoming',
      materials: ['Лекции 1-15', 'Семинары', 'Задачник Кузнецова'],
      format: 'Письменный'
    },
    {
      id: 2,
      subject: 'Структуры данных и алгоритмы',
      type: 'Экзамен',
      date: '2025-06-18',
      time: '14:00 - 16:00',
      location: 'Комп. класс 101',
      instructor: 'Доц. Смирнов К.В.',
      status: 'upcoming',
      materials: ['Практические работы', 'Теория алгоритмов', 'Код задач'],
      format: 'Практический'
    },
    {
      id: 3,
      subject: 'Базы данных II',
      type: 'Экзамен',
      date: '2025-06-20',
      time: '10:00 - 12:00',
      location: 'Лаб. 206',
      instructor: 'Проф. Султан А.М.',
      status: 'upcoming',
      materials: ['SQL запросы', 'Проектирование БД', 'Нормализация'],
      format: 'Смешанный'
    },
    {
      id: 4,
      subject: 'Веб-программирование (React)',
      type: 'Зачет',
      date: '2025-06-12',
      time: '15:00 - 17:00',
      location: 'Комп. класс 102',
      instructor: 'Доц. Ахметов Б.К.',
      status: 'upcoming',
      materials: ['React проекты', 'Hooks', 'State Management'],
      format: 'Защита проекта'
    },
    {
      id: 5,
      subject: 'Физика',
      type: 'Экзамен',
      date: '2025-01-25',
      time: '09:00 - 11:00',
      location: 'Ауд. 205',
      instructor: 'Доц. Петрова А.С.',
      status: 'completed',
      materials: ['Механика', 'Термодинамика', 'Электричество'],
      format: 'Письменный',
      grade: 'B+'
    }
  ];

  // Данные с вопросами для тестов
  const testQuestions = {
    1: [ // Математика
      {
        id: 1,
        question: "Найдите производную функции f(x) = x³ + 2x² - 5x + 1",
        options: [
          "3x² + 4x - 5",
          "x⁴ + 2x³ - 5x² + x",
          "3x² + 4x + 5",
          "6x + 4"
        ],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "Вычислите предел: lim(x→∞) (3x² + 2x + 1)/(x² - x + 2)",
        options: ["0", "1", "3", "∞"],
        correctAnswer: 2
      },
      {
        id: 3,
        question: "Найдите интеграл ∫(2x + 3)dx",
        options: [
          "x² + 3x + C",
          "2x² + 3x + C", 
          "x² + 3x²/2 + C",
          "2 + C"
        ],
        correctAnswer: 0
      },
      {
        id: 4,
        question: "Что такое дифференциал функции?",
        options: [
          "Главная линейная часть приращения функции",
          "Производная функции",
          "Интеграл функции",
          "Предел функции"
        ],
        correctAnswer: 0
      },
      {
        id: 5,
        question: "Найдите область определения функции f(x) = √(x-2)",
        options: [
          "x ≥ 2",
          "x > 2",
          "x ≤ 2",
          "все действительные числа"
        ],
        correctAnswer: 0
      }
    ],
    2: [ // Алгоритмы
      {
        id: 1,
        question: "Какая временная сложность у алгоритма быстрой сортировки в среднем случае?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "Что такое стабильная сортировка?",
        options: [
          "Сортировка, которая не изменяет относительный порядок равных элементов",
          "Сортировка с постоянной временной сложностью",
          "Сортировка, использующая дополнительную память",
          "Сортировка только положительных чисел"
        ],
        correctAnswer: 0
      },
      {
        id: 3,
        question: "В каком случае сортировка пузырьком работает за O(n)?",
        options: [
          "Массив отсортирован по убыванию",
          "Массив уже отсортирован по возрастанию",
          "Все элементы равны",
          "Случайный порядок элементов"
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "Что такое куча (heap)?",
        options: [
          "Линейная структура данных",
          "Полное бинарное дерево с определенным свойством упорядоченности",
          "Связанный список",
          "Хеш-таблица"
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: "Какая структура данных используется для реализации очереди с приоритетом?",
        options: ["Стек", "Очередь", "Куча", "Массив"],
        correctAnswer: 2
      }
    ],
    4: [ // React
      {
        id: 1,
        question: "Что возвращает хук useState?",
        options: [
          "Только текущее значение состояния",
          "Массив с текущим значением и функцией для его обновления",
          "Объект с состоянием и методами",
          "Функцию для обновления состояния"
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "Когда выполняется код в useEffect без зависимостей?",
        options: [
          "Только при монтировании компонента",
          "При каждом рендере",
          "Только при размонтировании",
          "Никогда"
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "Как передать данные от родительского компонента к дочернему?",
        options: [
          "Через state",
          "Через props",
          "Через context",
          "Через refs"
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "Что произойдет при вызове setState с тем же значением?",
        options: [
          "Компонент всегда перерендерится",
          "React может пропустить рендер",
          "Возникнет ошибка",
          "Состояние не изменится"
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: "Для чего используется key prop в списках?",
        options: [
          "Для стилизации элементов",
          "Для оптимизации рендеринга и идентификации элементов",
          "Для сортировки элементов",
          "Для добавления анимаций"
        ],
        correctAnswer: 1
      }
    ]
  };

  const [onlineTests, setOnlineTests] = useState([
    {
      id: 1,
      title: 'Промежуточный тест по математике',
      subject: 'Высшая математика',
      questionCount: 5,
      timeLimit: 10,
      attempts: 2,
      usedAttempts: 1,
      bestScore: 85,
      deadline: '2025-06-10',
      status: 'available',
      topics: ['Производные', 'Интегралы', 'Пределы']
    },
    {
      id: 2,
      title: 'Тест по алгоритмам сортировки',
      subject: 'Структуры данных и алгоритмы',
      questionCount: 5,
      timeLimit: 8,
      attempts: 3,
      usedAttempts: 0,
      bestScore: null,
      deadline: '2025-06-14',
      status: 'available',
      topics: ['Bubble Sort', 'Quick Sort', 'Merge Sort', 'Heap Sort']
    },
    {
      id: 3,
      title: 'SQL практикум',
      subject: 'Базы данных II',
      questionCount: 20,
      timeLimit: 45,
      attempts: 2,
      usedAttempts: 2,
      bestScore: 92,
      deadline: '2025-06-08',
      status: 'completed',
      topics: ['SELECT запросы', 'JOIN', 'Подзапросы', 'Индексы']
    },
    {
      id: 4,
      title: 'React компоненты и состояние',
      subject: 'Веб-программирование (React)',
      questionCount: 5,
      timeLimit: 7,
      attempts: 1,
      usedAttempts: 0,
      bestScore: null,
      deadline: '2025-06-09',
      status: 'available',
      topics: ['useState', 'useEffect', 'Props', 'Event Handling']
    }
  ]);

  const [testResults, setTestResults] = useState([
    {
      id: 1,
      testTitle: 'Входной тест по математике',
      subject: 'Высшая математика',
      date: '2025-02-15',
      score: 78,
      maxScore: 100,
      timeSpent: 45,
      timeLimit: 60,
      correctAnswers: 19,
      totalQuestions: 25,
      feedback: 'Хорошее понимание основ, нужно подтянуть интегралы'
    },
    {
      id: 2,
      testTitle: 'Модульный тест по программированию',
      subject: 'Структуры данных и алгоритмы',
      date: '2025-03-10',
      score: 95,
      maxScore: 100,
      timeSpent: 28,
      timeLimit: 30,
      correctAnswers: 14,
      totalQuestions: 15,
      feedback: 'Отличное знание алгоритмов и структур данных'
    },
    {
      id: 3,
      testTitle: 'SQL практикум',
      subject: 'Базы данных II',
      date: '2025-04-05',
      score: 92,
      maxScore: 100,
      timeSpent: 40,
      timeLimit: 45,
      correctAnswers: 18,
      totalQuestions: 20,
      feedback: 'Очень хорошо знаете SQL, небольшие ошибки в сложных запросах'
    }
  ]);

  const preparationMaterials = [
    {
      subject: 'Высшая математика',
      materials: [
        { type: 'Конспект лекций', status: 'available', link: '#' },
        { type: 'Задачи с решениями', status: 'available', link: '#' },
        { type: 'Типовые экзаменационные билеты', status: 'available', link: '#' },
        { type: 'Видеоразборы задач', status: 'coming_soon', link: '#' }
      ]
    },
    {
      subject: 'Структуры данных и алгоритмы',
      materials: [
        { type: 'Справочник по алгоритмам', status: 'available', link: '#' },
        { type: 'Примеры кода', status: 'available', link: '#' },
        { type: 'Практические задания', status: 'available', link: '#' },
        { type: 'Тренажер по программированию', status: 'available', link: '#' }
      ]
    },
    {
      subject: 'Базы данных II',
      materials: [
        { type: 'SQL шпаргалка', status: 'available', link: '#' },
        { type: 'Примеры баз данных', status: 'available', link: '#' },
        { type: 'Интерактивный SQL тренажер', status: 'available', link: '#' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming': return 'primary';
      case 'completed': return 'success';
      case 'available': return 'info';
      case 'overdue': return 'danger';
      default: return 'secondary';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'upcoming': return 'Предстоящий';
      case 'completed': return 'Завершен';
      case 'available': return 'Доступен';
      case 'overdue': return 'Просрочен';
      default: return 'Неизвестно';
    }
  };

  const filteredSchedule = selectedSubject === 'all' 
    ? examSchedule 
    : examSchedule.filter(exam => exam.subject === selectedSubject);

  const filteredTests = selectedSubject === 'all' 
    ? onlineTests 
    : onlineTests.filter(test => test.subject === selectedSubject);

  const subjects = [...new Set(examSchedule.map(exam => exam.subject))];

  // Таймер для теста
  useEffect(() => {
    let timer;
    if (testStarted && timeLeft > 0 && !testCompleted) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            completeTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [testStarted, timeLeft, testCompleted]);

  // Закрытие модального окна при нажатии Escape
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && activeTest && !testStarted) {
        closeTest();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [activeTest, testStarted]);

  const startTest = (test) => {
    setActiveTest(test);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTimeLeft(test.timeLimit * 60); // конвертируем минуты в секунды
    setTestStarted(false);
    setTestCompleted(false);
    setShowResults(false);
  };

  const beginTest = () => {
    setTestStarted(true);
  };

  const closeTest = () => {
    setActiveTest(null);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTimeLeft(0);
    setTestStarted(false);
    setTestCompleted(false);
    setShowResults(false);
  };

  const selectAnswer = (questionId, answerIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const nextQuestion = () => {
    const questions = testQuestions[activeTest.id];
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const completeTest = () => {
    setTestCompleted(true);
    setTestStarted(false);
    calculateResults();
  };

  const calculateResults = () => {
    const questions = testQuestions[activeTest.id];
    let correctCount = 0;

    questions.forEach(question => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);
    const timeSpent = Math.ceil((activeTest.timeLimit * 60 - timeLeft) / 60);

    // Обновляем результаты теста
    setOnlineTests(prevTests => 
      prevTests.map(test => {
        if (test.id === activeTest.id) {
          return {
            ...test,
            usedAttempts: test.usedAttempts + 1,
            bestScore: test.bestScore ? Math.max(test.bestScore, score) : score,
            status: test.usedAttempts + 1 >= test.attempts ? 'completed' : 'available'
          };
        }
        return test;
      })
    );

    // Добавляем результат в историю
    const newResult = {
      id: Date.now(),
      testTitle: activeTest.title,
      subject: activeTest.subject,
      date: new Date().toISOString().split('T')[0],
      score: score,
      maxScore: 100,
      timeSpent: timeSpent,
      timeLimit: activeTest.timeLimit,
      correctAnswers: correctCount,
      totalQuestions: questions.length,
      feedback: generateFeedback(score)
    };

    setTestResults(prev => [newResult, ...prev]);
    setShowResults(true);
  };

  const generateFeedback = (score) => {
    if (score >= 90) return 'Отличный результат! Вы прекрасно знаете материал.';
    if (score >= 80) return 'Хороший результат! Есть небольшие пробелы в знаниях.';
    if (score >= 70) return 'Удовлетворительно. Рекомендуется повторить материал.';
    if (score >= 60) return 'Слабый результат. Необходима дополнительная подготовка.';
    return 'Неудовлетворительно. Требуется серьезная работа над материалом.';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getAnsweredCount = () => {
    const questions = testQuestions[activeTest?.id] || [];
    return questions.filter(q => userAnswers[q.id] !== undefined).length;
  };

  return (
    <div className="page-container">
      {/* Заголовок страницы */}
      <div className="page-header">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="page-title">
              <i className="bi bi-laptop"></i>
              Тестирование и экзамены
            </h1>
            <p className="page-subtitle">Расписание, тесты и результаты</p>
          </div>
          <div>
            <select 
              className="form-select" 
              value={selectedSubject} 
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="all">Все предметы</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="page-section">
        {/* Навигационные табы */}
        <ul className="nav nav-pills mb-4">
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'schedule' ? 'active' : ''}`}
              onClick={() => setActiveTab('schedule')}
            >
              <i className="bi bi-calendar-event me-2"></i>
              Расписание экзаменов
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'tests' ? 'active' : ''}`}
              onClick={() => setActiveTab('tests')}
            >
              <i className="bi bi-laptop me-2"></i>
              Онлайн тесты
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'results' ? 'active' : ''}`}
              onClick={() => setActiveTab('results')}
            >
              <i className="bi bi-graph-up me-2"></i>
              Результаты
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'preparation' ? 'active' : ''}`}
              onClick={() => setActiveTab('preparation')}
            >
              <i className="bi bi-book me-2"></i>
              Подготовка
            </button>
          </li>
        </ul>

        {/* Расписание экзаменов */}
        {activeTab === 'schedule' && (
          <div>
            <h4 className="mb-3">Расписание экзаменов</h4>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Предмет</th>
                    <th>Тип</th>
                    <th>Дата и время</th>
                    <th>Место</th>
                    <th>Преподаватель</th>
                    <th>Формат</th>
                    <th>Статус</th>
                    <th>Результат</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSchedule.map(exam => (
                    <tr key={exam.id}>
                      <td className="fw-semibold">{exam.subject}</td>
                      <td>
                        <span className={`badge bg-${exam.type === 'Экзамен' ? 'danger' : 'warning'}`}>
                          {exam.type}
                        </span>
                      </td>
                      <td>
                        <div>{exam.date}</div>
                        <small className="text-muted">{exam.time}</small>
                      </td>
                      <td>{exam.location}</td>
                      <td>{exam.instructor}</td>
                      <td>{exam.format}</td>
                      <td>
                        <span className={`badge bg-${getStatusColor(exam.status)}`}>
                          {getStatusText(exam.status)}
                        </span>
                      </td>
                      <td>
                        {exam.grade ? (
                          <span className="badge bg-success">{exam.grade}</span>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Детали предстоящих экзаменов */}
            <div className="mt-4">
              <h5>Ближайшие экзамены</h5>
              <div className="row">
                {filteredSchedule.filter(exam => exam.status === 'upcoming').slice(0, 3).map(exam => (
                  <div key={exam.id} className="col-md-4 mb-3">
                    <div className="card border-primary">
                      <div className="card-header bg-primary text-white">
                        <h6 className="mb-0">{exam.subject}</h6>
                      </div>
                      <div className="card-body">
                        <div className="mb-2">
                          <strong>{exam.date}</strong> в <strong>{exam.time}</strong>
                        </div>
                        <div className="mb-2">
                          <i className="bi bi-geo-alt me-1"></i>
                          {exam.location}
                        </div>
                        <div className="mb-3">
                          <small className="text-muted">Материалы для подготовки:</small>
                          <ul className="list-unstyled mt-1">
                            {exam.materials.map((material, index) => (
                              <li key={index}>
                                <small>• {material}</small>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <span className={`badge bg-${exam.type === 'Экзамен' ? 'danger' : 'warning'}`}>
                          {exam.type} ({exam.format})
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Онлайн тесты */}
        {activeTab === 'tests' && (
          <div>
            <h4 className="mb-3">Онлайн тесты</h4>
            <div className="row">
              {filteredTests.map(test => (
                <div key={test.id} className="col-lg-6 mb-4">
                  <div className={`card border-${getStatusColor(test.status)}`}>
                    <div className={`card-header bg-${getStatusColor(test.status)} text-white`}>
                      <h6 className="mb-0">{test.title}</h6>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <span className="badge bg-primary">{test.subject}</span>
                      </div>
                      
                      <div className="row mb-3">
                        <div className="col-6">
                          <small className="text-muted">Вопросов:</small>
                          <div className="fw-bold">{test.questionCount}</div>
                        </div>
                        <div className="col-6">
                          <small className="text-muted">Время:</small>
                          <div className="fw-bold">{test.timeLimit} мин</div>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-6">
                          <small className="text-muted">Попыток:</small>
                          <div className="fw-bold">{test.usedAttempts}/{test.attempts}</div>
                        </div>
                        <div className="col-6">
                          <small className="text-muted">Лучший результат:</small>
                          <div className="fw-bold">
                            {test.bestScore ? `${test.bestScore}%` : '—'}
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <small className="text-muted">Дедлайн:</small>
                        <div className="fw-bold text-danger">{test.deadline}</div>
                      </div>

                      <div className="mb-3">
                        <small className="text-muted">Темы:</small>
                        <div className="mt-1">
                          {test.topics.map((topic, index) => (
                            <span key={index} className="badge bg-light text-dark me-1 mb-1">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      {test.status === 'available' && test.usedAttempts < test.attempts && (
                        <button 
                          className="btn btn-primary w-100"
                          onClick={() => startTest(test)}
                        >
                          <i className="bi bi-play-circle me-2"></i>
                          Начать тест
                        </button>
                      )}

                      {test.status === 'completed' && (
                        <div className="alert alert-success mb-0">
                          <i className="bi bi-check-circle me-2"></i>
                          Тест завершен
                        </div>
                      )}

                      {test.usedAttempts >= test.attempts && test.status !== 'completed' && (
                        <div className="alert alert-warning mb-0">
                          <i className="bi bi-exclamation-triangle me-2"></i>
                          Попытки исчерпаны
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Результаты */}
        {activeTab === 'results' && (
          <div>
            <h4 className="mb-3">Результаты тестирования</h4>
            
            {/* Общая статистика */}
            <div className="row mb-4">
              <div className="col-md-3">
                <div className="card text-center border-success">
                  <div className="card-body">
                    <div className="h4 text-success">
                      {(testResults.reduce((sum, r) => sum + r.score, 0) / testResults.length).toFixed(1)}%
                    </div>
                    <small className="text-muted">Средний балл</small>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center border-info">
                  <div className="card-body">
                    <div className="h4 text-info">{testResults.length}</div>
                    <small className="text-muted">Пройдено тестов</small>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center border-warning">
                  <div className="card-body">
                    <div className="h4 text-warning">
                      {Math.max(...testResults.map(r => r.score))}%
                    </div>
                    <small className="text-muted">Лучший результат</small>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center border-primary">
                  <div className="card-body">
                    <div className="h4 text-primary">
                      {(testResults.reduce((sum, r) => sum + r.correctAnswers, 0) / 
                        testResults.reduce((sum, r) => sum + r.totalQuestions, 0) * 100).toFixed(1)}%
                    </div>
                    <small className="text-muted">Правильных ответов</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Детальные результаты */}
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Тест</th>
                    <th>Предмет</th>
                    <th>Дата</th>
                    <th>Результат</th>
                    <th>Время</th>
                    <th>Правильные ответы</th>
                    <th>Обратная связь</th>
                  </tr>
                </thead>
                <tbody>
                  {testResults.map(result => (
                    <tr key={result.id}>
                      <td className="fw-semibold">{result.testTitle}</td>
                      <td>
                        <span className="badge bg-primary">{result.subject}</span>
                      </td>
                      <td>{result.date}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="progress me-2" style={{ width: '100px', height: '20px' }}>
                            <div 
                              className="progress-bar bg-success" 
                              style={{ width: `${(result.score/result.maxScore)*100}%` }}
                            >
                              {result.score}%
                            </div>
                          </div>
                          <span className="fw-bold">{result.score}/{result.maxScore}</span>
                        </div>
                      </td>
                      <td>{result.timeSpent}/{result.timeLimit} мин</td>
                      <td>{result.correctAnswers}/{result.totalQuestions}</td>
                      <td>
                        <small className="text-muted">{result.feedback}</small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Материалы для подготовки */}
        {activeTab === 'preparation' && (
          <div>
            <h4 className="mb-3">Материалы для подготовки</h4>
            {preparationMaterials.map((subjectMaterials, index) => (
              <div key={index} className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">{subjectMaterials.subject}</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    {subjectMaterials.materials.map((material, materialIndex) => (
                      <div key={materialIndex} className="col-md-6 mb-3">
                        <div className="d-flex align-items-center p-3 border rounded">
                          <div className="me-3">
                            {material.status === 'available' ? (
                              <i className="bi bi-check-circle-fill text-success fs-4"></i>
                            ) : (
                              <i className="bi bi-clock text-warning fs-4"></i>
                            )}
                          </div>
                          <div className="flex-grow-1">
                            <div className="fw-semibold">{material.type}</div>
                            <small className="text-muted">
                              {material.status === 'available' ? 'Доступно' : 'Скоро'}
                            </small>
                          </div>
                          {material.status === 'available' && (
                            <button className="btn btn-sm btn-outline-primary">
                              <i className="bi bi-download"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Модальное окно тестирования */}
        {activeTest && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                {!testStarted && !testCompleted && !showResults && (
                  <>
                    <div className="modal-header bg-primary text-white">
                      <h5 className="modal-title">{activeTest.title}</h5>
                      <button 
                        type="button" 
                        className="btn-close btn-close-white" 
                        onClick={closeTest}
                      ></button>
                    </div>
                    <div className="modal-body text-center">
                      <div className="row justify-content-center">
                        <div className="col-md-8">
                          <h4 className="mb-4">Готовы начать тест?</h4>
                          <div className="row g-3 mb-4">
                            <div className="col-6 col-md-3">
                              <div className="card border-info h-100">
                                <div className="card-body text-center py-3">
                                  <i className="bi bi-question-circle fs-3 text-info mb-2"></i>
                                  <div className="h5 mb-1">{activeTest.questionCount}</div>
                                  <small className="text-muted">вопросов</small>
                                </div>
                              </div>
                            </div>
                            <div className="col-6 col-md-3">
                              <div className="card border-warning h-100">
                                <div className="card-body text-center py-3">
                                  <i className="bi bi-clock fs-3 text-warning mb-2"></i>
                                  <div className="h5 mb-1">{activeTest.timeLimit} мин</div>
                                  <small className="text-muted">времени</small>
                                </div>
                              </div>
                            </div>
                            <div className="col-6 col-md-3">
                              <div className="card border-success h-100">
                                <div className="card-body text-center py-3">
                                  <i className="bi bi-arrow-repeat fs-3 text-success mb-2"></i>
                                  <div className="h5 mb-1">{activeTest.attempts - activeTest.usedAttempts}</div>
                                  <small className="text-muted">попыток осталось</small>
                                </div>
                              </div>
                            </div>
                            <div className="col-6 col-md-3">
                              <div className="card border-primary h-100">
                                <div className="card-body text-center py-3">
                                  <i className="bi bi-trophy fs-3 text-primary mb-2"></i>
                                  <div className="h5 mb-1">{activeTest.bestScore || 0}%</div>
                                  <small className="text-muted">лучший результат</small>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="alert alert-info">
                            <h6><i className="bi bi-info-circle me-2"></i>Правила тестирования:</h6>
                            <ul className="list-unstyled mb-0">
                              <li>• Можно перемещаться между вопросами</li>
                              <li>• Ответы сохраняются автоматически</li>
                              <li>• Тест завершится по истечении времени</li>
                              <li>• Результат будет виден сразу после завершения</li>
                            </ul>
                          </div>

                          <div className="mb-3">
                            <strong>Темы:</strong>
                            <div className="mt-2">
                              {activeTest.topics.map((topic, index) => (
                                <span key={index} className="badge bg-secondary me-1">
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer justify-content-center">
                      <button 
                        type="button" 
                        className="btn btn-secondary me-3" 
                        onClick={closeTest}
                      >
                        Отмена
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-success"
                        onClick={beginTest}
                      >
                        <i className="bi bi-play-fill me-2"></i>
                        Начать тест
                      </button>
                    </div>
                  </>
                )}

                {testStarted && !testCompleted && testQuestions[activeTest.id] && (
                  <>
                    <div className="modal-header bg-warning text-dark">
                      <h5 className="modal-title">
                        {activeTest.title} - Вопрос {currentQuestionIndex + 1} из {testQuestions[activeTest.id].length}
                      </h5>
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          <span className={`badge ${timeLeft <= 60 ? 'bg-danger' : timeLeft <= 180 ? 'bg-warning' : 'bg-success'} fs-6`}>
                            <i className="bi bi-clock me-1"></i>
                            {formatTime(timeLeft)}
                          </span>
                        </div>
                        <div className="progress" style={{ width: '100px', height: '8px' }}>
                          <div 
                            className="progress-bar bg-info" 
                            style={{ width: `${(getAnsweredCount() / testQuestions[activeTest.id].length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-md-9">
                          {/* Текущий вопрос */}
                          {(() => {
                            const currentQuestion = testQuestions[activeTest.id][currentQuestionIndex];
                            return (
                              <div className="card">
                                <div className="card-body">
                                  <h5 className="card-title mb-4">
                                    <span className="badge bg-primary me-2">{currentQuestion.id}</span>
                                    {currentQuestion.question}
                                  </h5>
                                  
                                  <div className="row">
                                    {currentQuestion.options.map((option, index) => (
                                      <div key={index} className="col-12 mb-3">
                                        <div 
                                          className={`card ${userAnswers[currentQuestion.id] === index ? 'border-primary bg-light' : 'border-secondary'}`}
                                          style={{ cursor: 'pointer' }}
                                          onClick={() => selectAnswer(currentQuestion.id, index)}
                                        >
                                          <div className="card-body py-3">
                                            <div className="d-flex align-items-center">
                                              <div className="form-check me-3">
                                                <input 
                                                  className="form-check-input" 
                                                  type="radio" 
                                                  name={`question-${currentQuestion.id}`}
                                                  checked={userAnswers[currentQuestion.id] === index}
                                                  onChange={() => selectAnswer(currentQuestion.id, index)}
                                                />
                                              </div>
                                              <span className="badge bg-secondary me-3">{String.fromCharCode(65 + index)}</span>
                                              <span>{option}</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                        
                        {/* Боковая панель с навигацией */}
                        <div className="col-md-3">
                          <div className="card">
                            <div className="card-header">
                              <h6 className="mb-0">Навигация по вопросам</h6>
                            </div>
                            <div className="card-body">
                              <div className="d-grid gap-2">
                                {testQuestions[activeTest.id].map((question, index) => (
                                  <button
                                    key={question.id}
                                    className={`btn btn-sm ${
                                      index === currentQuestionIndex ? 'btn-primary' :
                                      userAnswers[question.id] !== undefined ? 'btn-success' : 
                                      'btn-outline-secondary'
                                    }`}
                                    onClick={() => goToQuestion(index)}
                                  >
                                    {index + 1}
                                    {userAnswers[question.id] !== undefined && 
                                      <i className="bi bi-check ms-1"></i>
                                    }
                                  </button>
                                ))}
                              </div>
                              
                              <hr />
                              
                              <div className="text-center">
                                <div className="mb-2">
                                  <small className="text-muted">Прогресс</small>
                                </div>
                                <div className="progress mb-2" style={{ height: '10px' }}>
                                  <div 
                                    className="progress-bar bg-success" 
                                    style={{ width: `${(getAnsweredCount() / testQuestions[activeTest.id].length) * 100}%` }}
                                  ></div>
                                </div>
                                <small>
                                  {getAnsweredCount()} из {testQuestions[activeTest.id].length} отвечено
                                </small>
                              </div>
                              
                              <button 
                                className="btn btn-warning w-100 mt-3"
                                onClick={completeTest}
                                disabled={getAnsweredCount() === 0}
                              >
                                <i className="bi bi-check-square me-2"></i>
                                Завершить тест
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={prevQuestion}
                        disabled={currentQuestionIndex === 0}
                      >
                        <i className="bi bi-arrow-left me-2"></i>
                        Предыдущий
                      </button>
                      
                      <div className="flex-grow-1 text-center">
                        <span className="text-muted">
                          Вопрос {currentQuestionIndex + 1} из {testQuestions[activeTest.id].length}
                        </span>
                      </div>
                      
                      <button 
                        className="btn btn-primary"
                        onClick={nextQuestion}
                        disabled={currentQuestionIndex === testQuestions[activeTest.id].length - 1}
                      >
                        Следующий
                        <i className="bi bi-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </>
                )}

                {showResults && (
                  <>
                    <div className="modal-header bg-success text-white">
                      <h5 className="modal-title">
                        <i className="bi bi-trophy me-2"></i>
                        Результаты тестирования
                      </h5>
                    </div>
                    <div className="modal-body text-center">
                      {(() => {
                        const latestResult = testResults[0];
                        const questions = testQuestions[activeTest.id];
                        return (
                          <div className="row justify-content-center">
                            <div className="col-md-8">
                              <div className="mb-4">
                                <div className="display-4 mb-2">
                                  <span className={`badge ${latestResult.score >= 80 ? 'bg-success' : latestResult.score >= 60 ? 'bg-warning' : 'bg-danger'} fs-1`}>
                                    {latestResult.score}%
                                  </span>
                                </div>
                                <h5>{latestResult.feedback}</h5>
                              </div>

                              <div className="row g-3 mb-4">
                                <div className="col-6 col-md-3">
                                  <div className="card border-success h-100">
                                    <div className="card-body text-center py-3">
                                      <i className="bi bi-check-circle fs-3 text-success mb-2"></i>
                                      <div className="h5 mb-1">{latestResult.correctAnswers}</div>
                                      <small className="text-muted">правильных ответов</small>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6 col-md-3">
                                  <div className="card border-danger h-100">
                                    <div className="card-body text-center py-3">
                                      <i className="bi bi-x-circle fs-3 text-danger mb-2"></i>
                                      <div className="h5 mb-1">{latestResult.totalQuestions - latestResult.correctAnswers}</div>
                                      <small className="text-muted">неправильных</small>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6 col-md-3">
                                  <div className="card border-info h-100">
                                    <div className="card-body text-center py-3">
                                      <i className="bi bi-clock fs-3 text-info mb-2"></i>
                                      <div className="h5 mb-1">{latestResult.timeSpent} мин</div>
                                      <small className="text-muted">потрачено времени</small>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-6 col-md-3">
                                  <div className="card border-warning h-100">
                                    <div className="card-body text-center py-3">
                                      <i className="bi bi-percent fs-3 text-warning mb-2"></i>
                                      <div className="h5 mb-1">{Math.round((latestResult.correctAnswers / latestResult.totalQuestions) * 100)}%</div>
                                      <small className="text-muted">точность</small>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Детальный разбор ответов */}
                              <div className="card">
                                <div className="card-header">
                                  <h6 className="mb-0">Разбор ответов</h6>
                                </div>
                                <div className="card-body">
                                  {questions.map((question, index) => {
                                    const userAnswer = userAnswers[question.id];
                                    const isCorrect = userAnswer === question.correctAnswer;
                                    return (
                                      <div key={question.id} className="mb-3 p-3 border rounded">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                          <span className="fw-bold">Вопрос {index + 1}:</span>
                                          <span className={`badge ${isCorrect ? 'bg-success' : 'bg-danger'}`}>
                                            {isCorrect ? 'Правильно' : 'Неправильно'}
                                          </span>
                                        </div>
                                        <p className="mb-2">{question.question}</p>
                                        <div className="row">
                                          <div className="col-md-6">
                                            <small className="text-muted">Ваш ответ:</small>
                                            <div className={`p-2 rounded ${isCorrect ? 'bg-success bg-opacity-10' : 'bg-danger bg-opacity-10'}`}>
                                              {userAnswer !== undefined ? 
                                                `${String.fromCharCode(65 + userAnswer)}. ${question.options[userAnswer]}` : 
                                                'Не отвечено'
                                              }
                                            </div>
                                          </div>
                                          {!isCorrect && (
                                            <div className="col-md-6">
                                              <small className="text-muted">Правильный ответ:</small>
                                              <div className="p-2 rounded bg-success bg-opacity-10">
                                                {String.fromCharCode(65 + question.correctAnswer)}. {question.options[question.correctAnswer]}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                    <div className="modal-footer">
                      <button 
                        type="button" 
                        className="btn btn-secondary" 
                        onClick={closeTest}
                      >
                        Закрыть
                      </button>
                      {activeTest.usedAttempts < activeTest.attempts && (
                        <button 
                          type="button" 
                          className="btn btn-primary"
                          onClick={() => {
                            closeTest();
                            startTest(activeTest);
                          }}
                        >
                          <i className="bi bi-arrow-repeat me-2"></i>
                          Попробовать снова
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TestingPage; 