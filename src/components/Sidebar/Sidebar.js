import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

// Пример иконок (можно заменить на реальные из библиотеки) - используем текстовые заглушки
const icons = {
  dashboard: '🏠',
  academic: '📚',
  schedule: '📅',
  grades: '🏆',
  plan: '📄',
  materials: '📖',
  tasks: '✅',
  testing: '📝',
  appeals: '⚖️',
  transcript: '📜',
  teachers: '👨‍🏫',
  news: '📰',
  announcements: '📣',
  events: '🎟️',
  notifications: '🔔',
  profile: '👤',
  settings: '⚙️',
  documents: '📁',
  finance: '💳',
  communications: '💬',
  messages: '✉️',
  forums: '🗣️',
  contacts: '📞',
  resources: '💡',
  library: '🏛️',
  sports: '🏋️‍♀️',
  campus: '🗺️',
};

function Sidebar({ isOpen, toggleSidebar }) {
  // Состояние для отслеживания открытых подменю
  const [openSections, setOpenSections] = useState({});

  // Функция для переключения состояния подменю
  const toggleSection = (sectionName) => {
    // При клике на заголовок секции в закрытом сайдбаре,
    // сначала открываем сайдбар, затем переключаем состояние секции.
    if (!isOpen) {
        toggleSidebar(); // Открываем сайдбар
    }
    // Теперь переключаем состояние секции
    setOpenSections(prevState => ({
      ...prevState,
      [sectionName]: !prevState[sectionName]
    }));
  };

  // Определение структуры меню
  const menuStructure = [
    { name: 'Главная', path: '/', icon: icons.dashboard, isSection: false },
    {
      name: 'Учебный процесс',
      icon: icons.academic,
      isSection: true,
      items: [
        { name: 'Академический календарь', path: '/academic-calendar' },
        { name: 'Расписание занятий', path: '/schedule' },
        { name: 'Журнал оценок', path: '/grades' },
        { name: 'Индивидуальный учебный план', path: '/individual-plan' },
        { name: 'Электронные учебные материалы', path: '/learning-materials' },
        { name: 'Задания и проекты', path: '/tasks' },
        { name: 'Тестирование и экзамены', path: '/testing' },
        { name: 'Апелляции', path: '/appeals' },
        { name: 'Транскрипт', path: '/transcript' },
        { name: 'Преподаватели', path: '/teachers' },
      ]
    },
    {
      name: 'Новости и Объявления',
      icon: icons.news,
      isSection: true,
      items: [
        { name: 'Все новости', path: '/news' },
        { name: 'Объявления', path: '/announcements' },
        { name: 'События', path: '/events' },
        { name: 'Уведомления', path: '/notifications' },
      ]
    },
    { name: 'Задачи', path: '/tasks', icon: icons.tasks, isSection: false },
    {
      name: 'Профиль',
      icon: icons.profile,
      isSection: true,
      items: [
        { name: 'Моя информация', path: '/profile' },
        { name: 'Настройки', path: '/settings' },
        { name: 'Документы', path: '/documents' },
        { name: 'Финансы', path: '/finance' },
      ]
    },
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h2>Student Hub</h2>
        {/* Кнопка для закрытия/открытия сайдбара в открытом состоянии */}
        {isOpen && <button className="close-sidebar-btn" onClick={toggleSidebar}>×</button>}
      </div>
      <ul className="sidebar-nav-links">
        {menuStructure.map((item, index) => (
          <li key={index}>
            {item.isSection ? (
              <div
                className={`section-header ${openSections[item.name] ? 'open' : ''}`}
                onClick={() => {
                  // Логика переключения секции уже включает открытие сайдбара при необходимости
                  toggleSection(item.name);
                }}
              >
                <span className="menu-icon">{item.icon}</span>
                {isOpen && <span>{item.name}</span>}
                {isOpen && <span className="arrow">{openSections[item.name] ? '▼' : '►'}</span>}
              </div>
            ) : (
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) => `
                  menu-item
                  ${isActive ? 'active' : ''}
                  ${!isOpen ? 'closed' : ''}
                `}
                // При клике на обычную ссылку в закрытом сайдбаре, просто открываем его
                onClick={!isOpen ? toggleSidebar : undefined}
              >
                <span className="menu-icon">{item.icon}</span>
                {isOpen && <span>{item.name}</span>}
              </NavLink>
            )}

            {item.isSection && openSections[item.name] && isOpen && (
              <ul className="submenu-links">
                {item.items.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <NavLink
                      to={subItem.path}
                      end={subItem.path === '/'}
                      className={({ isActive }) => `
                        submenu-item
                        ${isActive ? 'active' : ''}
                      `}
                    >
                      <span>{subItem.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      {/* Кнопка для открытия сайдбара в закрытом состоянии */}
      {!isOpen && (
        <div className="open-sidebar-btn-container">
          <button className="open-sidebar-btn" onClick={toggleSidebar}>▶</button>
        </div>
      )}
    </div>
  );
}

export default Sidebar; 