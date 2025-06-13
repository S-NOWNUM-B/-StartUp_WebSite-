import React, { useState } from 'react';
import './styles.css';

function GradesPage() {
  const [selectedSemester, setSelectedSemester] = useState('current');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const gradesData = [
    { 
      id: 1, 
      subject: 'Высшая математика', 
      finalGrade: 'A', 
      credits: 6,
      semester: 'current',
      assignments: [
        { type: 'Лекции (посещаемость)', score: 95, maxScore: 100, weight: 10 },
        { type: 'Семинары', score: 88, maxScore: 100, weight: 20 },
        { type: 'СИР', score: 92, maxScore: 100, weight: 30 },
        { type: 'Экзамен', score: 89, maxScore: 100, weight: 40 }
      ],
      teacher: 'Проф. Иванов И.И.',
      gpa: 3.7
    },
    { 
      id: 2, 
      subject: 'Физика', 
      finalGrade: 'B+', 
      credits: 5,
      semester: 'current',
      assignments: [
        { type: 'Лекции (посещаемость)', score: 90, maxScore: 100, weight: 10 },
        { type: 'Лабораторные работы', score: 85, maxScore: 100, weight: 25 },
        { type: 'СИР', score: 78, maxScore: 100, weight: 25 },
        { type: 'Экзамен', score: 82, maxScore: 100, weight: 40 }
      ],
      teacher: 'Доц. Петрова А.С.',
      gpa: 3.3
    },
    { 
      id: 3, 
      subject: 'Программирование (React)', 
      finalGrade: 'A-', 
      credits: 4,
      semester: 'current',
      assignments: [
        { type: 'Лекции (посещаемость)', score: 100, maxScore: 100, weight: 10 },
        { type: 'Практические работы', score: 94, maxScore: 100, weight: 30 },
        { type: 'Проект', score: 88, maxScore: 100, weight: 30 },
        { type: 'Экзамен', score: 91, maxScore: 100, weight: 30 }
      ],
      teacher: 'Доц. Ахметов Б.К.',
      gpa: 3.7
    },
    { 
      id: 4, 
      subject: 'История Казахстана', 
      finalGrade: 'B', 
      credits: 3,
      semester: 'current',
      assignments: [
        { type: 'Лекции (посещаемость)', score: 87, maxScore: 100, weight: 15 },
        { type: 'Семинары', score: 79, maxScore: 100, weight: 25 },
        { type: 'Эссе', score: 75, maxScore: 100, weight: 20 },
        { type: 'Экзамен', score: 80, maxScore: 100, weight: 40 }
      ],
      teacher: 'Доц. Сарсенбаев К.А.',
      gpa: 3.0
    },
    { 
      id: 5, 
      subject: 'Экономика', 
      finalGrade: 'A', 
      credits: 3,
      semester: 'previous',
      assignments: [
        { type: 'Лекции (посещаемость)', score: 95, maxScore: 100, weight: 10 },
        { type: 'Семинары', score: 92, maxScore: 100, weight: 20 },
        { type: 'СИР', score: 96, maxScore: 100, weight: 30 },
        { type: 'Экзамен', score: 94, maxScore: 100, weight: 40 }
      ],
      teacher: 'Проф. Сидорова М.В.',
      gpa: 4.0
    }
  ];

  const [expandedGrade, setExpandedGrade] = useState(null);

  const filteredGrades = gradesData.filter(grade => {
    const semesterMatch = selectedSemester === 'all' || grade.semester === selectedSemester;
    const subjectMatch = selectedSubject === 'all' || grade.subject === selectedSubject;
    return semesterMatch && subjectMatch;
  });

  const uniqueSubjects = [...new Set(gradesData.map(grade => grade.subject))];

  const calculateGPA = (grades) => {
    if (grades.length === 0) return 0;
    const totalPoints = grades.reduce((sum, grade) => sum + (grade.gpa * grade.credits), 0);
    const totalCredits = grades.reduce((sum, grade) => sum + grade.credits, 0);
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
  };

  const currentGPA = calculateGPA(filteredGrades.filter(g => g.semester === 'current'));
  const overallGPA = calculateGPA(gradesData);

  const getGradeColor = (grade) => {
    const gradeMap = {
      'A': 'success',
      'A-': 'success', 
      'B+': 'info',
      'B': 'primary',
      'B-': 'primary',
      'C+': 'warning',
      'C': 'warning',
      'D': 'danger',
      'F': 'danger'
    };
    return gradeMap[grade] || 'secondary';
  };

  const calculateWeightedScore = (assignments) => {
    return assignments.reduce((total, assignment) => {
      return total + (assignment.score / assignment.maxScore * 100) * (assignment.weight / 100);
    }, 0).toFixed(1);
  };

  return (
    <div className="container py-4">
      <div className="page-content card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1">Журнал оценок</h2>
            <p className="lead text-muted mb-0">Ваша академическая успеваемость</p>
          </div>
          <div className="d-flex gap-3">
            <div className="text-center">
              <div className="h4 mb-0 text-primary">{currentGPA}</div>
              <small className="text-muted">Текущий GPA</small>
            </div>
            <div className="text-center">
              <div className="h4 mb-0 text-success">{overallGPA}</div>
              <small className="text-muted">Общий GPA</small>
            </div>
          </div>
        </div>

        {/* Фильтры */}
        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label">Семестр:</label>
            <select 
              className="form-select" 
              value={selectedSemester} 
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option value="all">Все семестры</option>
              <option value="current">Текущий семестр</option>
              <option value="previous">Предыдущие семестры</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Предмет:</label>
            <select 
              className="form-select" 
              value={selectedSubject} 
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="all">Все предметы</option>
              {uniqueSubjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Основная таблица оценок */}
        <div className="table-responsive mb-4">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>Предмет</th>
                <th>Преподаватель</th>
                <th>Кредиты</th>
                <th>Текущий балл</th>
                <th>Итоговая оценка</th>
                <th>GPA</th>
                <th>Детали</th>
              </tr>
            </thead>
            <tbody>
              {filteredGrades.map(grade => (
                <React.Fragment key={grade.id}>
                  <tr>
                    <td className="fw-semibold">{grade.subject}</td>
                    <td>{grade.teacher}</td>
                    <td>{grade.credits}</td>
                    <td>
                      <span className="badge bg-secondary">
                        {calculateWeightedScore(grade.assignments)}%
                      </span>
                    </td>
                    <td>
                      <span className={`badge bg-${getGradeColor(grade.finalGrade)} fs-6`}>
                        {grade.finalGrade}
                      </span>
                    </td>
                    <td className="fw-bold">{grade.gpa}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setExpandedGrade(expandedGrade === grade.id ? null : grade.id)}
                      >
                        {expandedGrade === grade.id ? 'Скрыть' : 'Подробнее'}
                      </button>
                    </td>
                  </tr>
                  {expandedGrade === grade.id && (
                    <tr>
                      <td colSpan="7" className="bg-light">
                        <div className="p-3">
                          <h6 className="mb-3">Детализация по компонентам оценки:</h6>
                          <div className="row">
                            {grade.assignments.map((assignment, index) => (
                              <div key={index} className="col-md-6 mb-3">
                                <div className="card">
                                  <div className="card-body p-3">
                                    <h6 className="card-title mb-2">{assignment.type}</h6>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                      <span>Баллы: {assignment.score}/{assignment.maxScore}</span>
                                      <span className="badge bg-info">{assignment.weight}%</span>
                                    </div>
                                    <div className="progress" style={{ height: '8px' }}>
                                      <div 
                                        className="progress-bar" 
                                        style={{ width: `${(assignment.score/assignment.maxScore)*100}%` }}
                                      ></div>
                                    </div>
                                    <small className="text-muted">
                                      {((assignment.score/assignment.maxScore)*100).toFixed(1)}%
                                    </small>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Статистика */}
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Распределение оценок</h5>
              </div>
              <div className="card-body">
                {['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C'].map(grade => {
                  const count = filteredGrades.filter(g => g.finalGrade === grade).length;
                  const percentage = filteredGrades.length > 0 ? (count / filteredGrades.length * 100) : 0;
                  return (
                    <div key={grade} className="d-flex justify-content-between align-items-center mb-2">
                      <span className={`badge bg-${getGradeColor(grade)}`}>{grade}</span>
                      <div className="flex-grow-1 mx-3">
                        <div className="progress" style={{ height: '20px' }}>
                          <div 
                            className={`progress-bar bg-${getGradeColor(grade)}`}
                            style={{ width: `${percentage}%` }}
                          >
                            {count > 0 && `${count}`}
                          </div>
                        </div>
                      </div>
                      <span className="text-muted">{percentage.toFixed(0)}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Академическая сводка</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                  <span>Всего предметов:</span>
                  <span className="fw-bold">{filteredGrades.length}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Общее количество кредитов:</span>
                  <span className="fw-bold">{filteredGrades.reduce((sum, g) => sum + g.credits, 0)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Средний балл:</span>
                  <span className="fw-bold">{
                    filteredGrades.length > 0 
                      ? (filteredGrades.reduce((sum, g) => sum + parseFloat(calculateWeightedScore(g.assignments)), 0) / filteredGrades.length).toFixed(1)
                      : 0
                  }%</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">GPA:</span>
                  <span className={`fw-bold ${parseFloat(calculateGPA(filteredGrades)) >= 3.5 ? 'text-success' : parseFloat(calculateGPA(filteredGrades)) >= 3.0 ? 'text-warning' : 'text-danger'}`}>
                    {calculateGPA(filteredGrades)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GradesPage; 