import React, { useState } from 'react';

function LearningMaterialsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid или list

  const materials = [
    {
      id: 1,
      title: 'Лекции по высшей математике - Часть 1',
      subject: 'Высшая математика',
      type: 'Лекции',
      format: 'PDF',
      size: '15.2 MB',
      uploadDate: '2025-01-10',
      author: 'Проф. Иванов И.И.',
      description: 'Основы дифференциального исчисления и его применение',
      downloadCount: 234,
      rating: 4.8,
      thumbnail: '📚'
    },
    {
      id: 2,
      title: 'Практические задания по React',
      subject: 'Веб-программирование (React)',
      type: 'Практические работы',
      format: 'ZIP',
      size: '8.7 MB',
      uploadDate: '2025-01-15',
      author: 'Доц. Ахметов Б.К.',
      description: 'Сборник практических заданий с примерами кода',
      downloadCount: 156,
      rating: 4.9,
      thumbnail: '💻'
    },
    {
      id: 3,
      title: 'Видеолекция: Основы баз данных',
      subject: 'Базы данных',
      type: 'Видеолекции',
      format: 'MP4',
      size: '245.8 MB',
      uploadDate: '2025-01-12',
      author: 'Проф. Султан А.М.',
      description: 'Введение в реляционные базы данных и SQL',
      downloadCount: 89,
      rating: 4.7,
      thumbnail: '🎥'
    },
    {
      id: 4,
      title: 'Конспект лекций по физике',
      subject: 'Физика',
      type: 'Конспекты',
      format: 'PDF',
      size: '12.4 MB',
      uploadDate: '2025-01-08',
      author: 'Доц. Петрова А.С.',
      description: 'Полный курс механики и термодинамики',
      downloadCount: 178,
      rating: 4.6,
      thumbnail: '📝'
    },
    {
      id: 5,
      title: 'Методические указания к лабораторным работам',
      subject: 'Структуры данных и алгоритмы',
      type: 'Методические материалы',
      format: 'PDF',
      size: '6.3 MB',
      uploadDate: '2025-01-14',
      author: 'Доц. Смирнов К.В.',
      description: 'Пошаговые инструкции для выполнения лабораторных работ',
      downloadCount: 112,
      rating: 4.5,
      thumbnail: '🔬'
    },
    {
      id: 6,
      title: 'Электронный учебник по истории Казахстана',
      subject: 'История Казахстана',
      type: 'Учебники',
      format: 'PDF',
      size: '28.9 MB',
      uploadDate: '2025-01-05',
      author: 'Доц. Сарсенбаев К.А.',
      description: 'Полный курс истории Казахстана с древних времен до наших дней',
      downloadCount: 267,
      rating: 4.4,
      thumbnail: '📖'
    },
    {
      id: 7,
      title: 'Тестовые задания по экономике',
      subject: 'Экономика',
      type: 'Тесты',
      format: 'PDF',
      size: '3.8 MB',
      uploadDate: '2025-01-13',
      author: 'Проф. Сидорова М.В.',
      description: 'Тестовые задания для самопроверки знаний по экономике',
      downloadCount: 145,
      rating: 4.3,
      thumbnail: '✅'
    },
    {
      id: 8,
      title: 'Аудиокурс изучения казахского языка',
      subject: 'Казахский язык',
      type: 'Аудиоматериалы',
      format: 'MP3',
      size: '156.2 MB',
      uploadDate: '2025-01-11',
      author: 'Лектор Назарбаева А.К.',
      description: 'Аудиокурс для изучения разговорного казахского языка',
      downloadCount: 98,
      rating: 4.8,
      thumbnail: '🎵'
    }
  ];

  const filteredMaterials = materials.filter(material => {
    const titleMatch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      material.author.toLowerCase().includes(searchTerm.toLowerCase());
    const subjectMatch = selectedSubject === 'all' || material.subject === selectedSubject;
    const typeMatch = selectedType === 'all' || material.type === selectedType;
    
    return titleMatch && subjectMatch && typeMatch;
  });

  const subjects = [...new Set(materials.map(m => m.subject))];
  const types = [...new Set(materials.map(m => m.type))];

  const getFileIcon = (format) => {
    switch(format.toLowerCase()) {
      case 'pdf': return '📄';
      case 'mp4': return '🎬';
      case 'mp3': return '🎵';
      case 'zip': return '📦';
      case 'doc':
      case 'docx': return '📝';
      default: return '📁';
    }
  };

  const formatFileSize = (size) => {
    return size;
  };

  const handleDownload = (material) => {
    // В реальном приложении здесь был бы вызов API для скачивания
    alert(`Скачивание: ${material.title}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="bi bi-star-half text-warning"></i>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="bi bi-star text-warning"></i>);
    }
    
    return stars;
  };

  return (
    <div className="container py-4">
      <div className="page-content card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1">Электронные учебные материалы</h2>
            <p className="lead text-muted mb-0">Библиотека учебных ресурсов</p>
          </div>
          <div className="d-flex gap-2">
            <button 
              className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setViewMode('grid')}
            >
              <i className="bi bi-grid-3x3-gap"></i>
            </button>
            <button 
              className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setViewMode('list')}
            >
              <i className="bi bi-list"></i>
            </button>
          </div>
        </div>

        {/* Статистика */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card text-center border-primary">
              <div className="card-body">
                <div className="h4 text-primary">{materials.length}</div>
                <small className="text-muted">Всего материалов</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center border-success">
              <div className="card-body">
                <div className="h4 text-success">{subjects.length}</div>
                <small className="text-muted">Предметов</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center border-info">
              <div className="card-body">
                <div className="h4 text-info">{types.length}</div>
                <small className="text-muted">Типов материалов</small>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center border-warning">
              <div className="card-body">
                <div className="h4 text-warning">
                  {materials.reduce((sum, m) => sum + m.downloadCount, 0)}
                </div>
                <small className="text-muted">Всего скачиваний</small>
              </div>
            </div>
          </div>
        </div>

        {/* Поиск и фильтры */}
        <div className="row mb-4">
          <div className="col-md-4">
            <label className="form-label">Поиск:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Поиск по названию, описанию или автору..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Предмет:</label>
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
          <div className="col-md-4">
            <label className="form-label">Тип материала:</label>
            <select 
              className="form-select" 
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">Все типы</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Отображение результатов */}
        <div className="mb-3">
          <span className="text-muted">
            Найдено материалов: {filteredMaterials.length}
          </span>
        </div>

        {/* Материалы в виде сетки */}
        {viewMode === 'grid' && (
          <div className="row">
            {filteredMaterials.map(material => (
              <div key={material.id} className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-start mb-3">
                      <div className="me-3" style={{ fontSize: '2rem' }}>
                        {material.thumbnail}
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="card-title mb-1">{material.title}</h6>
                        <small className="text-primary">{material.subject}</small>
                      </div>
                    </div>
                    
                    <p className="card-text small text-muted mb-3">
                      {material.description}
                    </p>
                    
                    <div className="mb-3">
                      <div className="d-flex justify-content-between small text-muted mb-1">
                        <span>Автор: {material.author}</span>
                      </div>
                      <div className="d-flex justify-content-between small text-muted mb-1">
                        <span>Тип: {material.type}</span>
                        <span>{getFileIcon(material.format)} {material.format}</span>
                      </div>
                      <div className="d-flex justify-content-between small text-muted mb-2">
                        <span>Размер: {formatFileSize(material.size)}</span>
                        <span>Загружен: {material.uploadDate}</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          {renderStars(material.rating)}
                          <span className="ms-1 small text-muted">({material.rating})</span>
                        </div>
                        <small className="text-muted">
                          <i className="bi bi-download me-1"></i>
                          {material.downloadCount}
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer bg-transparent">
                    <button 
                      className="btn btn-primary btn-sm w-100"
                      onClick={() => handleDownload(material)}
                    >
                      <i className="bi bi-download me-2"></i>
                      Скачать
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Материалы в виде списка */}
        {viewMode === 'list' && (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Материал</th>
                  <th>Предмет</th>
                  <th>Тип</th>
                  <th>Автор</th>
                  <th>Формат</th>
                  <th>Размер</th>
                  <th>Рейтинг</th>
                  <th>Скачивания</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredMaterials.map(material => (
                  <tr key={material.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="me-2" style={{ fontSize: '1.5rem' }}>
                          {material.thumbnail}
                        </span>
                        <div>
                          <div className="fw-semibold">{material.title}</div>
                          <small className="text-muted">{material.description}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-primary">{material.subject}</span>
                    </td>
                    <td>{material.type}</td>
                    <td>{material.author}</td>
                    <td>
                      <span className="d-flex align-items-center">
                        {getFileIcon(material.format)} 
                        <span className="ms-1">{material.format}</span>
                      </span>
                    </td>
                    <td>{formatFileSize(material.size)}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        {renderStars(material.rating)}
                        <span className="ms-1 small">({material.rating})</span>
                      </div>
                    </td>
                    <td>
                      <i className="bi bi-download me-1"></i>
                      {material.downloadCount}
                    </td>
                    <td>
                      <button 
                        className="btn btn-sm btn-primary"
                        onClick={() => handleDownload(material)}
                      >
                        <i className="bi bi-download"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredMaterials.length === 0 && (
          <div className="text-center py-5">
            <i className="bi bi-search display-1 text-muted"></i>
            <h4 className="mt-3 text-muted">Материалы не найдены</h4>
            <p className="text-muted">Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LearningMaterialsPage; 