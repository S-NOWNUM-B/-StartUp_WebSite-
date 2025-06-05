import { useState } from 'react';
import './StudyMaterialsPage.css';

const StudyMaterialsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const subjects = [
    { id: 'all', name: 'Все предметы' },
    { id: 'math', name: 'Математика' },
    { id: 'physics', name: 'Физика' },
    { id: 'programming', name: 'Программирование' },
    { id: 'english', name: 'Английский язык' }
  ];

  const materialTypes = [
    { id: 'all', name: 'Все типы' },
    { id: 'lecture', name: 'Лекции' },
    { id: 'practice', name: 'Практические работы' },
    { id: 'lab', name: 'Лабораторные работы' },
    { id: 'book', name: 'Учебники' }
  ];

  const materials = [
    {
      id: 1,
      title: 'Введение в математический анализ',
      subject: 'math',
      type: 'lecture',
      author: 'Иванов И.И.',
      date: '2024-03-15',
      size: '2.5 MB',
      downloads: 156
    },
    {
      id: 2,
      title: 'Практикум по физике',
      subject: 'physics',
      type: 'practice',
      author: 'Петров П.П.',
      date: '2024-03-14',
      size: '1.8 MB',
      downloads: 89
    },
    {
      id: 3,
      title: 'Основы программирования на Python',
      subject: 'programming',
      type: 'book',
      author: 'Сидоров С.С.',
      date: '2024-03-13',
      size: '4.2 MB',
      downloads: 234
    },
    {
      id: 4,
      title: 'Лабораторная работа №1 по физике',
      subject: 'physics',
      type: 'lab',
      author: 'Петров П.П.',
      date: '2024-03-12',
      size: '1.2 MB',
      downloads: 67
    }
  ];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || material.subject === selectedSubject;
    const matchesType = selectedType === 'all' || material.type === selectedType;
    return matchesSearch && matchesSubject && matchesType;
  });

  return (
    <div className="study-materials-container">
      <div className="study-materials-main-content">
        <h1>Учебные материалы</h1>
        <p>Доступ к лекциям, практическим работам и дополнительным материалам</p>

        <div className="materials-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Поиск материалов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filters">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {materialTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="materials-grid">
          {filteredMaterials.map(material => (
            <div key={material.id} className="material-card">
              <div className="material-icon">
                {material.type === 'lecture' && '📚'}
                {material.type === 'practice' && '📝'}
                {material.type === 'lab' && '🔬'}
                {material.type === 'book' && '📖'}
              </div>
              <div className="material-info">
                <h3>{material.title}</h3>
                <p className="material-meta">
                  <span>{subjects.find(s => s.id === material.subject)?.name}</span>
                  <span>{materialTypes.find(t => t.id === material.type)?.name}</span>
                </p>
                <p className="material-author">Автор: {material.author}</p>
                <p className="material-date">Добавлено: {material.date}</p>
                <div className="material-stats">
                  <span>Размер: {material.size}</span>
                  <span>Скачиваний: {material.downloads}</span>
                </div>
              </div>
              <button className="download-button">Скачать</button>
            </div>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <div className="no-results">
            <p>Материалы не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyMaterialsPage; 