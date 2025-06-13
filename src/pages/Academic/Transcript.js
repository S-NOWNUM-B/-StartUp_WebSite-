import React, { useState } from 'react';

function TranscriptPage() {
  const [selectedFormat, setSelectedFormat] = useState('detailed'); // detailed, official, summary
  const [selectedLanguage, setSelectedLanguage] = useState('russian');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [pdfOptions, setPdfOptions] = useState({
    includeStudentInfo: true,
    includeStatistics: true,
    includeGradeDistribution: true,
    includeSemesterDetails: true,
    selectedSemesters: 'all', // all, current, completed
    format: 'detailed', // detailed, summary, official
    language: 'russian',
    includeHeader: true,
    includeFooter: true,
    colorMode: 'color' // color, grayscale
  });

  const studentInfo = {
    name: 'Иванов Иван Иванович',
    studentId: 'ST-2024-001',
    birthDate: '15.03.2003',
    admissionDate: '01.09.2023',
    faculty: 'Факультет информационных технологий',
    specialization: 'Программная инженерия',
    degree: 'Бакалавр',
    studyForm: 'Очная',
    studyBasis: 'Грант',
    currentSemester: 4,
    currentYear: 2,
    totalCredits: 240,
    completedCredits: 95,
    currentGPA: 3.65,
    cumulativeGPA: 3.72
  };

  const transcriptData = [
    {
      semester: 1,
      year: '2023-2024',
      period: 'Осенний семестр',
      courses: [
        { code: 'MATH101', name: 'Высшая математика I', credits: 6, grade: 'A', points: 4.0, hours: 150, type: 'Обязательный' },
        { code: 'PHYS101', name: 'Физика I', credits: 5, grade: 'B+', points: 3.3, hours: 125, type: 'Обязательный' },
        { code: 'CS101', name: 'Информатика', credits: 4, grade: 'A', points: 4.0, hours: 100, type: 'Профилирующий' },
        { code: 'HIST101', name: 'История Казахстана', credits: 3, grade: 'B', points: 3.0, hours: 75, type: 'Общеобразовательный' },
        { code: 'KAZ101', name: 'Казахский язык', credits: 3, grade: 'A-', points: 3.7, hours: 75, type: 'Общеобразовательный' }
      ]
    },
    {
      semester: 2,
      year: '2023-2024',
      period: 'Весенний семестр',
      courses: [
        { code: 'MATH102', name: 'Высшая математика II', credits: 6, grade: 'A-', points: 3.7, hours: 150, type: 'Обязательный' },
        { code: 'PHYS102', name: 'Физика II', credits: 5, grade: 'B', points: 3.0, hours: 125, type: 'Обязательный' },
        { code: 'CS102', name: 'Программирование I', credits: 5, grade: 'A', points: 4.0, hours: 125, type: 'Профилирующий' },
        { code: 'PHIL101', name: 'Философия', credits: 3, grade: 'B+', points: 3.3, hours: 75, type: 'Общеобразовательный' },
        { code: 'ENG101', name: 'Иностранный язык', credits: 3, grade: 'A', points: 4.0, hours: 75, type: 'Общеобразовательный' }
      ]
    },
    {
      semester: 3,
      year: '2024-2025',
      period: 'Осенний семестр',
      courses: [
        { code: 'MATH201', name: 'Дискретная математика', credits: 5, grade: 'A-', points: 3.7, hours: 125, type: 'Базовый' },
        { code: 'CS201', name: 'Программирование II', credits: 5, grade: 'A', points: 4.0, hours: 125, type: 'Профилирующий' },
        { code: 'DB101', name: 'Базы данных I', credits: 4, grade: 'B+', points: 3.3, hours: 100, type: 'Профилирующий' },
        { code: 'ECON101', name: 'Экономика', credits: 3, grade: 'A', points: 4.0, hours: 75, type: 'Общеобразовательный' },
        { code: 'PE101', name: 'Физическая культура', credits: 2, grade: 'A', points: 4.0, hours: 50, type: 'Общеобразовательный' }
      ]
    },
    {
      semester: 4,
      year: '2024-2025',
      period: 'Весенний семестр (текущий)',
      courses: [
        { code: 'CS301', name: 'Структуры данных и алгоритмы', credits: 5, grade: 'В процессе', points: null, hours: 125, type: 'Профилирующий' },
        { code: 'WEB201', name: 'Веб-программирование (React)', credits: 4, grade: 'В процессе', points: null, hours: 100, type: 'Профилирующий' },
        { code: 'DB201', name: 'Базы данных II', credits: 4, grade: 'В процессе', points: null, hours: 100, type: 'Профилирующий' },
        { code: 'STAT101', name: 'Статистика и вероятность', credits: 4, grade: 'В процессе', points: null, hours: 100, type: 'Базовый' },
        { code: 'KAZ201', name: 'Деловой казахский язык', credits: 3, grade: 'В процессе', points: null, hours: 75, type: 'Общеобразовательный' }
      ]
    }
  ];

  const calculateSemesterGPA = (courses) => {
    const completedCourses = courses.filter(course => course.points !== null);
    if (completedCourses.length === 0) return 'N/A';
    
    const totalPoints = completedCourses.reduce((sum, course) => sum + (course.points * course.credits), 0);
    const totalCredits = completedCourses.reduce((sum, course) => sum + course.credits, 0);
    
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 'N/A';
  };

  const calculateOverallStatistics = () => {
    const allCompletedCourses = transcriptData.flatMap(sem => 
      sem.courses.filter(course => course.points !== null)
    );
    
    const totalCreditsCompleted = allCompletedCourses.reduce((sum, course) => sum + course.credits, 0);
    const totalPoints = allCompletedCourses.reduce((sum, course) => sum + (course.points * course.credits), 0);
    const gpa = totalCreditsCompleted > 0 ? (totalPoints / totalCreditsCompleted).toFixed(2) : 0;
    
    // Распределение оценок
    const gradeDistribution = {};
    allCompletedCourses.forEach(course => {
      gradeDistribution[course.grade] = (gradeDistribution[course.grade] || 0) + 1;
    });
    
    return {
      totalCreditsCompleted,
      gpa,
      totalCourses: allCompletedCourses.length,
      gradeDistribution
    };
  };

  const statistics = calculateOverallStatistics();

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

  const handleOrderTranscript = () => {
    alert(`Заказ официального транскрипта:\nФормат: ${selectedFormat}\nЯзык: ${selectedLanguage}\nДанные отправлены в деканат для обработки.`);
    setShowOrderModal(false);
  };

  const handleDownloadPDF = () => {
    setShowPDFModal(true);
  };

  const generatePDFContent = () => {
    const { includeStudentInfo, includeStatistics, includeGradeDistribution, 
            includeSemesterDetails, selectedSemesters, format, language, 
            includeHeader, includeFooter, colorMode } = pdfOptions;

    let content = '';
    
    // Заголовок документа
    if (includeHeader) {
      content += `
        <div style="text-align: center; border-bottom: 3px solid #007bff; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="color: #007bff; margin: 0; font-size: 28px; font-weight: bold;">
            АКАДЕМИЧЕСКИЙ ТРАНСКРИПТ
          </h1>
          <h2 style="color: #6c757d; margin: 10px 0 0 0; font-size: 18px;">
            Казахский Национальный Университет им. аль-Фараби
          </h2>
          <p style="color: #6c757d; margin: 5px 0 0 0; font-size: 14px;">
            Дата выдачи: ${new Date().toLocaleDateString('ru-RU')}
          </p>
        </div>
      `;
    }

    // Информация о студенте
    if (includeStudentInfo) {
      content += `
        <div style="background: #f8f9fa; border-left: 4px solid #007bff; padding: 20px; margin-bottom: 30px;">
          <h3 style="color: #007bff; margin: 0 0 15px 0; font-size: 20px;">Информация о студенте</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div>
              <p style="margin: 8px 0;"><strong>ФИО:</strong> ${studentInfo.name}</p>
              <p style="margin: 8px 0;"><strong>Студенческий ID:</strong> ${studentInfo.studentId}</p>
              <p style="margin: 8px 0;"><strong>Дата рождения:</strong> ${studentInfo.birthDate}</p>
              <p style="margin: 8px 0;"><strong>Дата поступления:</strong> ${studentInfo.admissionDate}</p>
            </div>
            <div>
              <p style="margin: 8px 0;"><strong>Факультет:</strong> ${studentInfo.faculty}</p>
              <p style="margin: 8px 0;"><strong>Специальность:</strong> ${studentInfo.specialization}</p>
              <p style="margin: 8px 0;"><strong>Степень:</strong> ${studentInfo.degree}</p>
              <p style="margin: 8px 0;"><strong>Форма обучения:</strong> ${studentInfo.studyForm} (${studentInfo.studyBasis})</p>
            </div>
          </div>
        </div>
      `;
    }

    // Общая статистика
    if (includeStatistics) {
      content += `
        <div style="margin-bottom: 30px;">
          <h3 style="color: #007bff; margin: 0 0 15px 0; font-size: 20px;">Академические достижения</h3>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 20px;">
            <div style="background: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; padding: 15px; text-align: center;">
              <div style="font-size: 24px; font-weight: bold; color: #155724;">${statistics.gpa}</div>
              <div style="font-size: 12px; color: #155724;">Cumulative GPA</div>
            </div>
            <div style="background: #cce5ff; border: 1px solid #99d1ff; border-radius: 8px; padding: 15px; text-align: center;">
              <div style="font-size: 24px; font-weight: bold; color: #004085;">${statistics.totalCreditsCompleted}</div>
              <div style="font-size: 12px; color: #004085;">Кредитов завершено</div>
            </div>
            <div style="background: #e2f4ff; border: 1px solid #b8e6ff; border-radius: 8px; padding: 15px; text-align: center;">
              <div style="font-size: 24px; font-weight: bold; color: #086fa4;">${statistics.totalCourses}</div>
              <div style="font-size: 12px; color: #086fa4;">Курсов пройдено</div>
            </div>
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; text-align: center;">
              <div style="font-size: 24px; font-weight: bold; color: #856404;">${studentInfo.currentSemester}</div>
              <div style="font-size: 12px; color: #856404;">Текущий семестр</div>
            </div>
          </div>
        </div>
      `;
    }

    // Детальная информация по семестрам
    if (includeSemesterDetails) {
      content += `<h3 style="color: #007bff; margin: 30px 0 15px 0; font-size: 20px;">Академические записи по семестрам</h3>`;
      
      const filteredSemesters = selectedSemesters === 'all' ? transcriptData : 
                               selectedSemesters === 'completed' ? transcriptData.filter(sem => sem.courses.every(c => c.grade !== 'В процессе')) :
                               transcriptData.filter(sem => sem.courses.some(c => c.grade === 'В процессе'));

      filteredSemesters.forEach((semester, index) => {
        const semesterGPA = calculateSemesterGPA(semester.courses);
        const totalCredits = semester.courses.reduce((sum, c) => sum + c.credits, 0);
        
        content += `
          <div style="margin-bottom: 25px; border: 1px solid #dee2e6; border-radius: 8px; overflow: hidden;">
            <div style="background: ${semester.courses.some(c => c.grade === 'В процессе') ? '#17a2b8' : '#6c757d'}; color: white; padding: 15px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4 style="margin: 0; font-size: 16px;">${semester.semester} семестр, ${semester.year} - ${semester.period}</h4>
                <div style="display: flex; gap: 20px; font-size: 14px;">
                  <span>Кредитов: ${totalCredits}</span>
                  <span>GPA: ${semesterGPA}</span>
                </div>
              </div>
            </div>
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                <thead>
                  <tr style="background: #f8f9fa;">
                    <th style="padding: 12px 8px; text-align: left; border-bottom: 2px solid #dee2e6;">Код</th>
                    <th style="padding: 12px 8px; text-align: left; border-bottom: 2px solid #dee2e6;">Дисциплина</th>
                    <th style="padding: 12px 8px; text-align: center; border-bottom: 2px solid #dee2e6;">Тип</th>
                    <th style="padding: 12px 8px; text-align: center; border-bottom: 2px solid #dee2e6;">Кредиты</th>
                    <th style="padding: 12px 8px; text-align: center; border-bottom: 2px solid #dee2e6;">Часы</th>
                    <th style="padding: 12px 8px; text-align: center; border-bottom: 2px solid #dee2e6;">Оценка</th>
                    <th style="padding: 12px 8px; text-align: center; border-bottom: 2px solid #dee2e6;">Баллы</th>
                  </tr>
                </thead>
                <tbody>
        `;
        
        semester.courses.forEach((course, courseIndex) => {
          const gradeColor = course.grade === 'В процессе' ? '#6c757d' : 
                           course.grade === 'A' ? '#28a745' :
                           course.grade.startsWith('A') ? '#28a745' :
                           course.grade.startsWith('B') ? '#007bff' :
                           course.grade.startsWith('C') ? '#ffc107' : '#dc3545';
          
          content += `
            <tr style="border-bottom: 1px solid #dee2e6;">
              <td style="padding: 10px 8px; font-weight: bold;">${course.code}</td>
              <td style="padding: 10px 8px;">${course.name}</td>
              <td style="padding: 10px 8px; text-align: center;">
                <span style="background: ${gradeColor}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px;">
                  ${course.type}
                </span>
              </td>
              <td style="padding: 10px 8px; text-align: center; font-weight: bold;">${course.credits}</td>
              <td style="padding: 10px 8px; text-align: center;">${course.hours}</td>
              <td style="padding: 10px 8px; text-align: center;">
                <span style="background: ${gradeColor}; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;">
                  ${course.grade}
                </span>
              </td>
              <td style="padding: 10px 8px; text-align: center; font-weight: bold;">
                ${course.points ? course.points.toFixed(1) : '—'}
              </td>
            </tr>
          `;
        });
        
        content += `
                </tbody>
              </table>
            </div>
          </div>
        `;
      });
    }

    // Распределение оценок
    if (includeGradeDistribution) {
      content += `
        <div style="margin-top: 30px;">
          <h3 style="color: #007bff; margin: 0 0 15px 0; font-size: 20px;">Статистика и распределение оценок</h3>
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px;">
            <div>
              <h4 style="margin: 0 0 10px 0; font-size: 16px;">Распределение оценок</h4>
      `;
      
      Object.entries(statistics.gradeDistribution).forEach(([grade, count]) => {
        const percentage = (count / statistics.totalCourses * 100).toFixed(1);
        const gradeColor = grade === 'A' ? '#28a745' :
                          grade.startsWith('A') ? '#28a745' :
                          grade.startsWith('B') ? '#007bff' :
                          grade.startsWith('C') ? '#ffc107' : '#dc3545';
        
        content += `
          <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <span style="background: ${gradeColor}; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold; min-width: 35px; text-align: center;">${grade}</span>
            <div style="flex-grow: 1; margin: 0 10px; background: #e9ecef; border-radius: 4px; height: 20px; position: relative;">
              <div style="background: ${gradeColor}; height: 100%; border-radius: 4px; width: ${percentage}%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">
                ${count}
              </div>
            </div>
            <span style="min-width: 50px; text-align: right; font-weight: bold;">${percentage}%</span>
          </div>
        `;
      });
      
      content += `
            </div>
            <div>
              <h4 style="margin: 0 0 10px 0; font-size: 16px;">Сводка</h4>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span>Всего курсов:</span>
                  <span style="font-weight: bold;">${statistics.totalCourses}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span>Кредитов завершено:</span>
                  <span style="font-weight: bold;">${statistics.totalCreditsCompleted}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span>Кредитов осталось:</span>
                  <span style="font-weight: bold;">${studentInfo.totalCredits - statistics.totalCreditsCompleted}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <span>Прогресс:</span>
                  <span style="font-weight: bold;">${((statistics.totalCreditsCompleted / studentInfo.totalCredits) * 100).toFixed(1)}%</span>
                </div>
                <hr style="margin: 12px 0;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="font-weight: bold;">Cumulative GPA:</span>
                  <span style="font-weight: bold; font-size: 18px; color: ${parseFloat(statistics.gpa) >= 3.5 ? '#28a745' : parseFloat(statistics.gpa) >= 3.0 ? '#ffc107' : '#dc3545'};">
                    ${statistics.gpa}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // Футер документа
    if (includeFooter) {
      content += `
        <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #dee2e6; text-align: center; color: #6c757d; font-size: 12px;">
          <p style="margin: 0;">Документ сгенерирован системой управления студентами</p>
          <p style="margin: 5px 0 0 0;">Дата и время: ${new Date().toLocaleString('ru-RU')}</p>
          <p style="margin: 5px 0 0 0;">© Казахский Национальный Университет им. аль-Фараби</p>
        </div>
      `;
    }

    return content;
  };

  const generateAndDownloadPDF = () => {
    // Создаем новое окно для печати/сохранения PDF
    const printWindow = window.open('', '_blank');
    const content = generatePDFContent();
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Академический транскрипт - ${studentInfo.name}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          @media print { .no-print { display: none !important; } }
        </style>
      </head>
      <body>
        <div class="no-print">
          <button onclick="window.print()">📄 Печать/Сохранить PDF</button>
          <button onclick="window.close()">✖️ Закрыть</button>
        </div>
        ${content}
      </body>
      </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    setShowPDFModal(false);
  };

  const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} position-fixed`;
    toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    toast.innerHTML = `<div>${message}</div>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container py-4">
      <div className="page-content card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1">Академический транскрипт</h2>
            <p className="lead text-muted mb-0">Детальная информация об учебных достижениях</p>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary" onClick={handlePrint}>
              <i className="bi bi-printer me-2"></i>
              Печать
            </button>
            <button className="btn btn-outline-success" onClick={handleDownloadPDF}>
              <i className="bi bi-download me-2"></i>
              PDF
            </button>
            <button className="btn btn-primary" onClick={() => setShowOrderModal(true)}>
              <i className="bi bi-file-earmark-text me-2"></i>
              Заказать официальный
            </button>
          </div>
        </div>

        {/* Информация о студенте */}
        <div className="card mb-4 border-primary">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Информация о студенте</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <td className="fw-bold">ФИО:</td>
                      <td>{studentInfo.name}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Студенческий ID:</td>
                      <td>{studentInfo.studentId}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Дата рождения:</td>
                      <td>{studentInfo.birthDate}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Дата поступления:</td>
                      <td>{studentInfo.admissionDate}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-6">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <td className="fw-bold">Факультет:</td>
                      <td>{studentInfo.faculty}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Специальность:</td>
                      <td>{studentInfo.specialization}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Степень:</td>
                      <td>{studentInfo.degree}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Форма обучения:</td>
                      <td>{studentInfo.studyForm} ({studentInfo.studyBasis})</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Общая статистика */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card text-center border-success">
              <div className="card-body">
                <div className="h4 text-success">{statistics.gpa}</div>
                <small className="text-muted">Cumulative GPA</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center border-primary">
              <div className="card-body">
                <div className="h4 text-primary">{statistics.totalCreditsCompleted}</div>
                <small className="text-muted">Кредитов завершено</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center border-info">
              <div className="card-body">
                <div className="h4 text-info">{statistics.totalCourses}</div>
                <small className="text-muted">Курсов пройдено</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center border-warning">
              <div className="card-body">
                <div className="h4 text-warning">{studentInfo.currentSemester}</div>
                <small className="text-muted">Текущий семестр</small>
              </div>
            </div>
          </div>
        </div>

        {/* Детальный транскрипт по семестрам */}
        <div className="mb-4">
          <h4 className="mb-3">Академические записи по семестрам</h4>
          
          {transcriptData.map((semester, index) => (
            <div key={index} className="card mb-4">
              <div className={`card-header ${semester.courses.some(c => c.grade === 'В процессе') ? 'bg-info text-white' : 'bg-light'}`}>
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">
                    {semester.semester} семестр, {semester.year} - {semester.period}
                  </h6>
                  <div className="d-flex gap-3">
                    <small>
                      Кредитов: {semester.courses.reduce((sum, c) => sum + c.credits, 0)}
                    </small>
                    <small>
                      GPA: {calculateSemesterGPA(semester.courses)}
                    </small>
                  </div>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th>Код курса</th>
                        <th>Название дисциплины</th>
                        <th>Тип</th>
                        <th>Кредиты</th>
                        <th>Часы</th>
                        <th>Оценка</th>
                        <th>Баллы</th>
                      </tr>
                    </thead>
                    <tbody>
                      {semester.courses.map((course, courseIndex) => (
                        <tr key={courseIndex}>
                          <td className="fw-bold">{course.code}</td>
                          <td>{course.name}</td>
                          <td>
                            <span className="badge bg-secondary">{course.type}</span>
                          </td>
                          <td className="text-center">{course.credits}</td>
                          <td className="text-center">{course.hours}</td>
                          <td className="text-center">
                            {course.grade === 'В процессе' ? (
                              <span className="badge bg-info">{course.grade}</span>
                            ) : (
                              <span className={`badge bg-${getGradeColor(course.grade)} fs-6`}>
                                {course.grade}
                              </span>
                            )}
                          </td>
                          <td className="text-center fw-bold">
                            {course.points ? course.points.toFixed(1) : '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Распределение оценок */}
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Распределение оценок</h5>
              </div>
              <div className="card-body">
                {Object.entries(statistics.gradeDistribution).map(([grade, count]) => {
                  const percentage = (count / statistics.totalCourses * 100).toFixed(1);
                  return (
                    <div key={grade} className="d-flex justify-content-between align-items-center mb-2">
                      <span className={`badge bg-${getGradeColor(grade)}`}>{grade}</span>
                      <div className="flex-grow-1 mx-3">
                        <div className="progress" style={{ height: '20px' }}>
                          <div 
                            className={`progress-bar bg-${getGradeColor(grade)}`}
                            style={{ width: `${percentage}%` }}
                          >
                            {count}
                          </div>
                        </div>
                      </div>
                      <span className="text-muted">{percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Сводка</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span>Всего курсов:</span>
                  <span className="fw-bold">{statistics.totalCourses}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Кредитов завершено:</span>
                  <span className="fw-bold">{statistics.totalCreditsCompleted}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Кредитов осталось:</span>
                  <span className="fw-bold">{studentInfo.totalCredits - statistics.totalCreditsCompleted}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Прогресс:</span>
                  <span className="fw-bold">{((statistics.totalCreditsCompleted / studentInfo.totalCredits) * 100).toFixed(1)}%</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">Cumulative GPA:</span>
                  <span className={`fw-bold fs-5 ${parseFloat(statistics.gpa) >= 3.5 ? 'text-success' : parseFloat(statistics.gpa) >= 3.0 ? 'text-warning' : 'text-danger'}`}>
                    {statistics.gpa}
                  </span>
                </div>
              </div>
            </div>

            <div className="card mt-3">
              <div className="card-header">
                <h6 className="mb-0">Академический статус</h6>
              </div>
              <div className="card-body">
                <div className="text-center">
                  <span className={`badge fs-6 ${parseFloat(statistics.gpa) >= 3.5 ? 'bg-success' : parseFloat(statistics.gpa) >= 3.0 ? 'bg-warning' : 'bg-danger'}`}>
                    {parseFloat(statistics.gpa) >= 3.5 ? 'Отличник' : parseFloat(statistics.gpa) >= 3.0 ? 'Хорошист' : 'Требует улучшения'}
                  </span>
                  <div className="mt-2">
                    <small className="text-muted">
                      Следующий семестр: {studentInfo.currentSemester + 1}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Модальное окно заказа официального транскрипта */}
        {showOrderModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Заказ официального транскрипта</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setShowOrderModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Формат документа:</label>
                    <select 
                      className="form-select" 
                      value={selectedFormat} 
                      onChange={(e) => setSelectedFormat(e.target.value)}
                    >
                      <option value="detailed">Подробный транскрипт</option>
                      <option value="official">Официальная справка</option>
                      <option value="summary">Краткая сводка</option>
                    </select>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Язык документа:</label>
                    <select 
                      className="form-select" 
                      value={selectedLanguage} 
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                    >
                      <option value="russian">Русский</option>
                      <option value="kazakh">Казахский</option>
                      <option value="english">Английский</option>
                    </select>
                  </div>

                  <div className="alert alert-info">
                    <i className="bi bi-info-circle me-2"></i>
                    <strong>Информация:</strong> Официальный транскрипт будет подготовлен в течение 3-5 рабочих дней. 
                    Стоимость: 5000 тенге. Документ будет заверен печатью университета.
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowOrderModal(false)}
                  >
                    Отмена
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleOrderTranscript}
                  >
                    Заказать (5000 тенге)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Модальное окно выбора параметров для PDF */}
        {showPDFModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Параметры для генерации PDF</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setShowPDFModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <div className="form-check">
                      <input 
                        className="form-check-input"
                        type="checkbox" 
                        id="includeStudentInfo"
                        checked={pdfOptions.includeStudentInfo} 
                        onChange={(e) => setPdfOptions({ ...pdfOptions, includeStudentInfo: e.target.checked })}
                      />
                      <label className="form-check-label" htmlFor="includeStudentInfo">
                        Включить информацию о студенте
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input 
                        className="form-check-input"
                        type="checkbox" 
                        id="includeStatistics"
                        checked={pdfOptions.includeStatistics} 
                        onChange={(e) => setPdfOptions({ ...pdfOptions, includeStatistics: e.target.checked })}
                      />
                      <label className="form-check-label" htmlFor="includeStatistics">
                        Включить общую статистику
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input 
                        className="form-check-input"
                        type="checkbox" 
                        id="includeGradeDistribution"
                        checked={pdfOptions.includeGradeDistribution} 
                        onChange={(e) => setPdfOptions({ ...pdfOptions, includeGradeDistribution: e.target.checked })}
                      />
                      <label className="form-check-label" htmlFor="includeGradeDistribution">
                        Включить распределение оценок
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input 
                        className="form-check-input"
                        type="checkbox" 
                        id="includeSemesterDetails"
                        checked={pdfOptions.includeSemesterDetails} 
                        onChange={(e) => setPdfOptions({ ...pdfOptions, includeSemesterDetails: e.target.checked })}
                      />
                      <label className="form-check-label" htmlFor="includeSemesterDetails">
                        Включить детальную информацию по семестрам
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Выберите семестры:</label>
                    <select 
                      className="form-select" 
                      value={pdfOptions.selectedSemesters} 
                      onChange={(e) => setPdfOptions({ ...pdfOptions, selectedSemesters: e.target.value })}
                    >
                      <option value="all">Все семестры</option>
                      <option value="completed">Завершенные семестры</option>
                      <option value="current">Текущие семестры</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Формат документа:</label>
                    <select 
                      className="form-select" 
                      value={pdfOptions.format} 
                      onChange={(e) => setPdfOptions({ ...pdfOptions, format: e.target.value })}
                    >
                      <option value="detailed">Подробный транскрипт</option>
                      <option value="summary">Краткая сводка</option>
                      <option value="official">Официальная справка</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Язык документа:</label>
                    <select 
                      className="form-select" 
                      value={pdfOptions.language} 
                      onChange={(e) => setPdfOptions({ ...pdfOptions, language: e.target.value })}
                    >
                      <option value="russian">Русский</option>
                      <option value="kazakh">Казахский</option>
                      <option value="english">Английский</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input 
                        className="form-check-input"
                        type="checkbox" 
                        id="includeHeader"
                        checked={pdfOptions.includeHeader} 
                        onChange={(e) => setPdfOptions({ ...pdfOptions, includeHeader: e.target.checked })}
                      />
                      <label className="form-check-label" htmlFor="includeHeader">
                        Включить заголовок
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input 
                        className="form-check-input"
                        type="checkbox" 
                        id="includeFooter"
                        checked={pdfOptions.includeFooter} 
                        onChange={(e) => setPdfOptions({ ...pdfOptions, includeFooter: e.target.checked })}
                      />
                      <label className="form-check-label" htmlFor="includeFooter">
                        Включить подвал
                      </label>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowPDFModal(false)}
                  >
                    Отмена
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={generateAndDownloadPDF}
                  >
                    Сгенерировать PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TranscriptPage; 