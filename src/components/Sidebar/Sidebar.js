import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css';

// Icons using Bootstrap icons
const icons = {
  dashboard: 'bi bi-house-door',
  academic: 'bi bi-book',
  schedule: 'bi bi-calendar3',
  grades: 'bi bi-trophy',
  plan: 'bi bi-file-text',
  materials: 'bi bi-journal-text',
  tasks: 'bi bi-check2-square',
  testing: 'bi bi-pencil-square',
  appeals: 'bi bi-shield-check',
  transcript: 'bi bi-file-earmark-text',
  teachers: 'bi bi-person-badge',
  news: 'bi bi-newspaper',
  announcements: 'bi bi-megaphone',
  events: 'bi bi-calendar-event',
  notifications: 'bi bi-bell',
  profile: 'bi bi-person-circle',
  settings: 'bi bi-gear',
  documents: 'bi bi-folder',
  finance: 'bi bi-credit-card',
  communications: 'bi bi-chat-dots',
  messages: 'bi bi-envelope',
  forums: 'bi bi-chat-square-text',
  contacts: 'bi bi-telephone',
  resources: 'bi bi-lightbulb',
  library: 'bi bi-building',
  sports: 'bi bi-trophy',
  campus: 'bi bi-geo-alt',
};

function Sidebar({ isOpen, toggleSidebar, sidebarRef }) {
  // Состояние для отслеживания открытых подменю
  const [openSections, setOpenSections] = useState({});

  // Close all sections when sidebar is closed
  useEffect(() => {
    if (!isOpen) {
      setOpenSections({});
    }
  }, [isOpen]);

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
    <div ref={sidebarRef} className={`sidebar bg-dark text-white ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header d-flex justify-content-between align-items-center border-bottom border-secondary">
        {isOpen ? (
          <NavLink to="/" className="text-white text-decoration-none d-flex align-items-center h4 mb-0">
            <i className="bi bi-mortarboard-fill me-2"></i>
            <span>AlmaU Hub</span>
          </NavLink>
        ) : (
          <NavLink to="/" className="text-white text-decoration-none h4 mb-0">
            <i className="bi bi-mortarboard-fill"></i>
          </NavLink>
        )}
        {isOpen && (
          <button 
            className="btn btn-link text-white" 
            onClick={toggleSidebar}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        )}
      </div>
      
      <ul className="nav flex-column p-2">
        {menuStructure.map((item, index) => (
          <li key={index} className="nav-item">
            {item.isSection ? (
              <div
                className={`nav-link d-flex align-items-center justify-content-between ${openSections[item.name] ? 'active' : ''}`}
                onClick={() => toggleSection(item.name)}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex align-items-center">
                  <i className={`${item.icon} me-2`}></i>
                  {isOpen && <span>{item.name}</span>}
                </div>
                {isOpen && (
                  <i className={`bi ${openSections[item.name] ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
                )}
              </div>
            ) : (
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) => 
                  `nav-link d-flex align-items-center ${isActive ? 'active' : ''}`
                }
                // При клике на обычную ссылку в закрытом сайдбаре, просто открываем его
                onClick={!isOpen ? toggleSidebar : undefined}
              >
                <i className={`${item.icon} me-2`}></i>
                {isOpen && <span>{item.name}</span>}
              </NavLink>
            )}

            {item.isSection && openSections[item.name] && isOpen && (
              <ul className="nav flex-column ms-4 mt-1">
                {item.items.map((subItem, subIndex) => (
                  <li key={subIndex} className="nav-item">
                    <NavLink
                      to={subItem.path}
                      className={({ isActive }) => 
                        `nav-link py-1 ${isActive ? 'active' : ''}`
                      }
                    >
                      {subItem.name}
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
        <div className="position-absolute bottom-0 start-0 w-100 p-2">
          <button 
            className="btn btn-outline-light w-100" 
            onClick={toggleSidebar}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default Sidebar; 