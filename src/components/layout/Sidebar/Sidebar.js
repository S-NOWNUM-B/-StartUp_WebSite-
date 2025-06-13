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
  testing: 'bi bi-pencil-square',
  appeals: 'bi bi-shield-check',
  transcript: 'bi bi-file-earmark-text',
  teachers: 'bi bi-person-badge',
  news: 'bi bi-newspaper',
  announcements: 'bi bi-megaphone',
  events: 'bi bi-calendar-event',
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
  const [isMobile, setIsMobile] = useState(false);

  // Определяем мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close all sections when sidebar is closed
  useEffect(() => {
    if (!isOpen) {
      setOpenSections({});
    }
  }, [isOpen]);

  // Закрываем сайдбар при клике на overlay (только для мобильных)
  const handleOverlayClick = () => {
    if (isMobile && isOpen) {
      toggleSidebar();
    }
  };

  // Функция для переключения состояния подменю
  const toggleSection = (sectionName) => {
    // При клике на заголовок секции в закрытом сайдбаре,
    // сначала открываем сайдбар, затем переключаем состояние секции.
    if (!isOpen && !isMobile) {
        toggleSidebar(); // Открываем сайдбар
    }
    // Теперь переключаем состояние секции
    setOpenSections(prevState => ({
      ...prevState,
      [sectionName]: !prevState[sectionName]
    }));
  };

  // Закрытие сайдбара при клике на ссылку (только для мобильных)
  const handleLinkClick = () => {
    if (isMobile && isOpen) {
      toggleSidebar();
    }
  };

  // Определение структуры меню
  const menuStructure = [
    {
      name: 'Учебный процесс',
      icon: icons.academic,
      isSection: true,
      items: [
        { name: 'Расписание занятий', path: '/schedule' },
        { name: 'Журнал оценок', path: '/grades' },
        { name: 'Индивидуальный учебный план', path: '/individual-plan' },
        { name: 'Электронные учебные материалы', path: '/learning-materials' },
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
      ]
    },
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
    <>
      {/* Кнопка-гамбургер для мобильных устройств */}
      {isMobile && (
        <button 
          className="mobile-menu-toggle"
          onClick={toggleSidebar}
          aria-label="Открыть меню"
        >
          <i className={`bi ${isOpen ? 'bi-x' : 'bi-list'}`}></i>
        </button>
      )}

      {/* Overlay для мобильных устройств */}
      {isMobile && isOpen && (
        <div 
          className="mobile-sidebar-overlay"
          onClick={handleOverlayClick}
        />
      )}

      <div ref={sidebarRef} className={`sidebar bg-dark text-white d-flex flex-column ${isOpen ? 'open' : 'closed'}`}>
        <div className={`sidebar-header d-flex align-items-center border-bottom border-secondary ${!isOpen && !isMobile ? 'justify-content-center' : ''}`}>
          {(isOpen || isMobile) ? (
            <NavLink to="/" className="text-white text-decoration-none d-flex align-items-center h4 mb-0 me-auto" onClick={handleLinkClick}>
              <i className="bi bi-mortarboard-fill me-2"></i>
              <span>EduSpace</span>
            </NavLink>
          ) : (
            <NavLink to="/" className="text-white text-decoration-none h4 mb-0 sidebar-closed-nav-link">
              <i className="bi bi-mortarboard-fill"></i>
            </NavLink>
          )}
        </div>
        
        <div className="sidebar-content flex-grow-1 overflow-auto">
          <ul className="nav flex-column">
            {menuStructure.map((item, index) => (
              <li key={index} className="nav-item">
                {item.isSection ? (
                  <div
                    className={`nav-link d-flex align-items-center ${openSections[item.name] ? 'active' : ''}`}
                    onClick={() => toggleSection(item.name)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="d-flex align-items-center">
                      <i className={`${item.icon}`}></i>
                      {(isOpen || isMobile) && <span>{item.name}</span>}
                    </div>
                    {(isOpen || isMobile) && (
                      <i className={`bi ${openSections[item.name] ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) => 
                      `nav-link d-flex align-items-center ${isActive ? 'active' : ''} ${!isOpen && !isMobile ? 'sidebar-closed-nav-link-item' : ''}`
                    }
                    // При клике на обычную ссылку в закрытом сайдбаре, просто открываем его
                    onClick={!isOpen && !isMobile ? toggleSidebar : handleLinkClick}
                  >
                    <i className={`${item.icon}`}></i>
                    {(isOpen || isMobile) && <span>{item.name}</span>}
                  </NavLink>
                )}

                {item.isSection && openSections[item.name] && (isOpen || isMobile) && (
                  <ul className="nav flex-column submenu">
                    {item.items.map((subItem, subIndex) => (
                      <li key={subIndex} className="nav-item">
                        <NavLink
                          to={subItem.path}
                          className={({ isActive }) => 
                            `nav-link py-1 ${isActive ? 'active' : ''}`
                          }
                          onClick={handleLinkClick}
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
        </div>
        
        {/* Кнопка для открытия сайдбара в закрытом состоянии (только для десктопа) */}
        {!isOpen && !isMobile && (
          <div className="position-absolute bottom-0 start-0 w-100 p-2">
            <button 
              className="sidebar-toggle-button" 
              onClick={toggleSidebar}
              aria-label="Открыть сайдбар"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Sidebar; 