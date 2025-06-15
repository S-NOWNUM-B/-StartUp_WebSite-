import React, { useState } from 'react';

function IndividualPlanPage() {
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const studentInfo = {
    name: 'Иван Иванов',
    studentId: '2024001',
    faculty: 'Информационные технологии',
    specialization: 'Программная инженерия',
    year: 2,
    totalCreditsRequired: 240,
    creditsCompleted: 95
  };

  const curriculum = [
    {
      semester: 1,
      year: 1,
      subjects: [
        { id: 1, name: 'Высшая математика I', credits: 6, category: 'Базовые дисциплины', status: 'completed', grade: 'A', prerequisite: null },
        { id: 2, name: 'Физика I', credits: 5, category: 'Базовые дисциплины', status: 'completed', grade: 'B+', prerequisite: null },
        { id: 3, name: 'Информатика', credits: 4, category: 'Профилирующие дисциплины', status: 'completed', grade: 'A', prerequisite: null },
        { id: 4, name: 'История Казахстана', credits: 3, category: 'Общеобразовательные дисциплины', status: 'completed', grade: 'B', prerequisite: null },
        { id: 5, name: 'Казахский язык', credits: 3, category: 'Общеобразовательные дисциплины', status: 'completed', grade: 'A-', prerequisite: null }
      ]
    },
    {
      semester: 2,
      year: 1,
      subjects: [
        { id: 6, name: 'Высшая математика II', credits: 6, category: 'Базовые дисциплины', status: 'completed', grade: 'A-', prerequisite: 'Высшая математика I' },
        { id: 7, name: 'Физика II', credits: 5, category: 'Базовые дисциплины', status: 'completed', grade: 'B', prerequisite: 'Физика I' },
        { id: 8, name: 'Программирование I', credits: 5, category: 'Профилирующие дисциплины', status: 'completed', grade: 'A', prerequisite: 'Информатика' },
        { id: 9, name: 'Философия', credits: 3, category: 'Общеобразовательные дисциплины', status: 'completed', grade: 'B+', prerequisite: null },
        { id: 10, name: 'Иностранный язык', credits: 3, category: 'Общеобразовательные дисциплины', status: 'completed', grade: 'A', prerequisite: null }
      ]
    },
    {
      semester: 3,
      year: 2,
      subjects: [
        { id: 11, name: 'Дискретная математика', credits: 5, category: 'Базовые дисциплины', status: 'completed', grade: 'A-', prerequisite: 'Высшая математика II' },
        { id: 12, name: 'Программирование II', credits: 5, category: 'Профилирующие дисциплины', status: 'completed', grade: 'A', prerequisite: 'Программирование I' },
        { id: 13, name: 'Базы данных I', credits: 4, category: 'Профилирующие дисциплины', status: 'completed', grade: 'B+', prerequisite: 'Программирование I' },
        { id: 14, name: 'Экономика', credits: 3, category: 'Общеобразовательные дисциплины', status: 'completed', grade: 'A', prerequisite: null },
        { id: 15, name: 'Физическая культура', credits: 2, category: 'Общеобразовательные дисциплины', status: 'completed', grade: 'A', prerequisite: null }
      ]
    },
    {
      semester: 4,
      year: 2,
      subjects: [
        { id: 16, name: 'Структуры данных и алгоритмы', credits: 5, category: 'Профилирующие дисциплины', status: 'current', grade: null, prerequisite: 'Программирование II' },
        { id: 17, name: 'Веб-программирование (React)', credits: 4, category: 'Профилирующие дисциплины', status: 'current', grade: null, prerequisite: 'Программирование II' },
        { id: 18, name: 'Базы данных II', credits: 4, category: 'Профилирующие дисциплины', status: 'current', grade: null, prerequisite: 'Базы данных I' },
        { id: 19, name: 'Статистика и вероятность', credits: 4, category: 'Базовые дисциплины', status: 'current', grade: null, prerequisite: 'Дискретная математика' },
        { id: 20, name: 'Деловой казахский язык', credits: 3, category: 'Общеобразовательные дисциплины', status: 'current', grade: null, prerequisite: 'Казахский язык' }
      ]
    },
    {
      semester: 5,
      year: 3,
      subjects: [
        { id: 21, name: 'Объектно-ориентированное программирование', credits: 5, category: 'Профилирующие дисциплины', status: 'planned', grade: null, prerequisite: 'Структуры данных и алгоритмы' },
        { id: 22, name: 'Компьютерные сети', credits: 4, category: 'Профилирующие дисциплины', status: 'planned', grade: null, prerequisite: 'Веб-программирование (React)' },
        { id: 23, name: 'Операционные системы', credits: 4, category: 'Базовые дисциплины', status: 'planned', grade: null, prerequisite: 'Структуры данных и алгоритмы' },
        { id: 24, name: 'Управление проектами', credits: 3, category: 'Общеобразовательные дисциплины', status: 'planned', grade: null, prerequisite: null },
        { id: 25, name: 'Элективный курс I', credits: 3, category: 'Элективные дисциплины', status: 'planned', grade: null, prerequisite: null }
      ]
    },
    {
      semester: 6,
      year: 3,
      subjects: [
        { id: 26, name: 'Архитектура программного обеспечения', credits: 5, category: 'Профилирующие дисциплины', status: 'planned', grade: null, prerequisite: 'Объектно-ориентированное программирование' },
        { id: 27, name: 'Машинное обучение', credits: 4, category: 'Профилирующие дисциплины', status: 'planned', grade: null, prerequisite: 'Статистика и вероятность' },
        { id: 28, name: 'Безопасность информационных систем', credits: 4, category: 'Профилирующие дисциплины', status: 'planned', grade: null, prerequisite: 'Компьютерные сети' },
        { id: 29, name: 'Профессиональная практика', credits: 6, category: 'Практика', status: 'planned', grade: null, prerequisite: null },
        { id: 30, name: 'Элективный курс II', credits: 3, category: 'Элективные дисциплины', status: 'planned', grade: null, prerequisite: null }
      ]
    }
  ];

  const allSubjects = curriculum.flatMap(sem => sem.subjects);
  
  const filteredSubjects = allSubjects.filter(subject => {
    const semesterMatch = selectedSemester === 'all' || curriculum.find(sem => sem.subjects.includes(subject))?.semester.toString() === selectedSemester;
    const categoryMatch = selectedCategory === 'all' || subject.category === selectedCategory;
    return semesterMatch && categoryMatch;
  });

  const categories = [...new Set(allSubjects.map(subject => subject.category))];
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'success';
      case 'current': return 'primary';
      case 'planned': return 'secondary';
      default: return 'light';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'completed': return 'Завершено';
      case 'current': return 'Изучается';
      case 'planned': return 'Запланировано';
      default: return 'Неизвестно';
    }
  };

  const calculateCategoryProgress = () => {
    return categories.map(category => {
      const categorySubjects = allSubjects.filter(s => s.category === category);
      const completedCredits = categorySubjects
        .filter(s => s.status === 'completed')
        .reduce((sum, s) => sum + s.credits, 0);
      const totalCredits = categorySubjects.reduce((sum, s) => sum + s.credits, 0);
      
      return {
        category,
        completedCredits,
        totalCredits,
        percentage: totalCredits > 0 ? (completedCredits / totalCredits * 100) : 0
      };
    });
  };

  const categoryProgress = calculateCategoryProgress();

  return (
    <div className="container py-4">
      <div className="page-content card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1">Индивидуальный учебный план</h2>
            <p className="lead text-muted mb-0">{studentInfo.specialization}, {studentInfo.year} курс</p>
          </div>
          <div className="text-center">
            <div className="h4 mb-0 text-success">{studentInfo.creditsCompleted}/{studentInfo.totalCreditsRequired}</div>
            <small className="text-muted">Кредитов выполнено</small>
          </div>
        </div>

        {/* Общий прогресс */}
        <div className="card mb-4 border-primary">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Общий прогресс обучения</h5>
          </div>
          <div className="card-body">
            <div className="progress mb-3" style={{ height: '25px' }}>
              <div 
                className="progress-bar bg-success" 
                style={{ width: `${(studentInfo.creditsCompleted / studentInfo.totalCreditsRequired) * 100}%` }}
              >
                {((studentInfo.creditsCompleted / studentInfo.totalCreditsRequired) * 100).toFixed(1)}%
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="text-center">
                  <div className="h5 text-success">{allSubjects.filter(s => s.status === 'completed').length}</div>
                  <small className="text-muted">Завершено предметов</small>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <div className="h5 text-primary">{allSubjects.filter(s => s.status === 'current').length}</div>
                  <small className="text-muted">Изучается сейчас</small>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <div className="h5 text-secondary">{allSubjects.filter(s => s.status === 'planned').length}</div>
                  <small className="text-muted">Запланировано</small>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <div className="h5 text-info">{studentInfo.year}</div>
                  <small className="text-muted">Текущий курс</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Прогресс по категориям */}
        <div className="row mb-4">
          {categoryProgress.map(progress => (
            <div key={progress.category} className="col-md-6 col-lg-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h6 className="card-title">{progress.category}</h6>
                  <div className="progress mb-2" style={{ height: '15px' }}>
                    <div 
                      className="progress-bar" 
                      style={{ width: `${progress.percentage}%` }}
                    >
                      {progress.percentage.toFixed(0)}%
                    </div>
                  </div>
                  <small className="text-muted">
                    {progress.completedCredits} из {progress.totalCredits} кредитов
                  </small>
                </div>
              </div>
            </div>
          ))}
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
              {curriculum.map(sem => (
                <option key={sem.semester} value={sem.semester.toString()}>
                  {sem.semester} семестр ({sem.year} курс)
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Категория:</label>
            <select 
              className="form-select" 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Все категории</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Таблица предметов */}
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>Семестр</th>
                <th>Предмет</th>
                <th>Кредиты</th>
                <th>Категория</th>
                <th>Пререквизиты</th>
                <th>Статус</th>
                <th>Оценка</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubjects.map(subject => {
                const semester = curriculum.find(sem => sem.subjects.includes(subject));
                return (
                  <tr key={subject.id}>
                    <td>
                      <span className="badge bg-info">
                        {semester?.semester} сем. ({semester?.year} курс)
                      </span>
                    </td>
                    <td className="fw-semibold">{subject.name}</td>
                    <td>{subject.credits}</td>
                    <td>
                      <small className="text-muted">{subject.category}</small>
                    </td>
                    <td>
                      {subject.prerequisite ? (
                        <small className="text-warning">
                          <i className="bi bi-arrow-left-circle me-1"></i>
                          {subject.prerequisite}
                        </small>
                      ) : (
                        <small className="text-muted">Нет</small>
                      )}
                    </td>
                    <td>
                      <span className={`badge bg-${getStatusColor(subject.status)}`}>
                        {getStatusText(subject.status)}
                      </span>
                    </td>
                    <td>
                      {subject.grade ? (
                        <span className="badge bg-success">{subject.grade}</span>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Поэтапный план */}
        <div className="mt-5">
          <h4 className="mb-3">Учебный план по семестрам</h4>
          <div className="row">
            {curriculum.map(semester => (
              <div key={semester.semester} className="col-lg-6 mb-4">
                <div className={`card ${semester.semester <= 4 ? 'border-primary' : 'border-secondary'}`}>
                  <div className={`card-header ${semester.semester <= 4 ? 'bg-primary text-white' : 'bg-light'}`}>
                    <h6 className="mb-0">
                      {semester.semester} семестр ({semester.year} курс)
                      <span className="ms-2">
                        {semester.subjects.reduce((sum, s) => sum + s.credits, 0)} кредитов
                      </span>
                    </h6>
                  </div>
                  <div className="card-body p-2">
                    {semester.subjects.map(subject => (
                      <div key={subject.id} className="d-flex justify-content-between align-items-center p-2 border-bottom">
                        <div className="flex-grow-1">
                          <div className="fw-semibold">{subject.name}</div>
                          <small className="text-muted">{subject.credits} кред.</small>
                        </div>
                        <span className={`badge bg-${getStatusColor(subject.status)}`}>
                          {subject.grade || getStatusText(subject.status)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualPlanPage; 