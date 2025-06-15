import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TopNavigation.css';

// Иконки
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
};

function TopNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Определяем мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Закрываем мобильное меню при смене роута
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Структура меню
  const menuStructure = [
    {
      name: 'Учебный процесс',
      icon: icons.academic,
      isDropdown: true,
      items: [
        { name: 'Расписание занятий', path: '/schedule', icon: icons.schedule },
        { name: 'Журнал оценок', path: '/grades', icon: icons.grades },
        { name: 'Индивидуальный план', path: '/individual-plan', icon: icons.plan },
        { name: 'Учебные материалы', path: '/learning-materials', icon: icons.materials },
        { name: 'Тестирование', path: '/testing', icon: icons.testing },
        { name: 'Апелляции', path: '/appeals', icon: icons.appeals },
        { name: 'Транскрипт', path: '/transcript', icon: icons.transcript },
        { name: 'Преподаватели', path: '/teachers', icon: icons.teachers },
      ]
    },
    {
      name: 'Новости',
      icon: icons.news,
      isDropdown: true,
      items: [
        { name: 'Все новости', path: '/news', icon: icons.news },
        { name: 'Объявления', path: '/announcements', icon: icons.announcements },
        { name: 'События', path: '/events', icon: icons.events },
      ]
    },
    {
      name: 'Профиль',
      icon: icons.profile,
      isDropdown: true,
      items: [
        { name: 'Моя информация', path: '/profile', icon: icons.profile },
        { name: 'Настройки', path: '/settings', icon: icons.settings },
        { name: 'Документы', path: '/documents', icon: icons.documents },
        { name: 'Финансы', path: '/finance', icon: icons.finance },
      ]
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (menuName) => {
    setActiveDropdown(activeDropdown === menuName ? null : menuName);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  // Функция для проверки активности пункта меню
  const isItemActive = (item) => {
    if (item.exact) {
      return location.pathname === item.path;
    }
    return location.pathname.startsWith(item.path);
  };

  // Функция для проверки активности группы
  const isGroupActive = (group) => {
    if (!group.items) return false;
    return group.items.some(item => isItemActive(item));
  };

  return (
    <nav className="top-navigation">
      <div className="container-fluid">
        <div className="nav-content">
          {/* Логотип */}
          <div className="nav-brand">
            <NavLink to="/" className="brand-link">
              <i className="bi bi-bank2"></i>
              <span>CampusHub</span>
            </NavLink>
          </div>

          {/* Десктопное меню */}
          <div className="nav-menu d-none d-md-flex">
            {menuStructure.map((item, index) => (
              <div key={index} className="nav-item">
                {item.isDropdown ? (
                  <div className={`nav-dropdown ${isGroupActive(item) ? 'active' : ''}`}>
                    <button
                      className={`nav-link dropdown-toggle ${isGroupActive(item) ? 'active' : ''}`}
                      onClick={() => toggleDropdown(item.name)}
                      onMouseEnter={() => !isMobile && setActiveDropdown(item.name)}
                    >
                      <i className={item.icon}></i>
                      <span>{item.name}</span>
                      <i className="bi bi-chevron-down dropdown-arrow"></i>
                    </button>
                    <div 
                      className={`dropdown-menu ${activeDropdown === item.name ? 'show' : ''}`}
                      onMouseLeave={() => !isMobile && setActiveDropdown(null)}
                    >
                      {item.items.map((subItem, subIndex) => (
                        <NavLink
                          key={subIndex}
                          to={subItem.path}
                          className={({ isActive }) => 
                            `dropdown-item ${isActive ? 'active' : ''}`
                          }
                          onClick={handleLinkClick}
                        >
                          <i className={subItem.icon}></i>
                          <span>{subItem.name}</span>
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    end={item.exact}
                    className={({ isActive }) => 
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    <i className={item.icon}></i>
                    <span>{item.name}</span>
                  </NavLink>
                )}
              </div>
            ))}
          </div>

          {/* Мобильная кнопка */}
          <button
              className="mobile-menu-btn"
              onClick={toggleMobileMenu}
              aria-label="Открыть меню"
          >
            <i className={`bi ${isMobileMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
          </button>
        </div>

        {/* Мобильное меню */}
        <div className={`mobile-menu d-md-none ${isMobileMenuOpen ? 'show' : ''}`} style={{zIndex: 1050}}>
          {menuStructure.map((item, index) => (
            <div key={index} className="mobile-nav-item">
              {item.isDropdown ? (
                <>
                  <button
                    className={`mobile-nav-link ${activeDropdown === item.name ? 'active' : ''}`}
                    onClick={() => toggleDropdown(item.name)}
                    aria-expanded={activeDropdown === item.name}
                  >
                    <i className={item.icon}></i>
                    <span>{item.name}</span>
                    <i className={`bi ${activeDropdown === item.name ? 'bi-chevron-up' : 'bi-chevron-down'} dropdown-arrow`}></i>
                  </button>
                  <div className={`mobile-dropdown${activeDropdown === item.name ? ' show' : ''}`}
                    style={{ maxHeight: activeDropdown === item.name ? 500 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                    {item.items.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={subItem.path}
                        className={({ isActive }) => 
                          `mobile-dropdown-item ${isActive ? 'active' : ''}`
                        }
                        onClick={handleLinkClick}
                      >
                        <i className={subItem.icon}></i>
                        <span>{subItem.name}</span>
                      </NavLink>
                    ))}
                  </div>
                </>
              ) : (
                <NavLink
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) => 
                    `mobile-nav-link ${isActive ? 'active' : ''}`
                  }
                  onClick={handleLinkClick}
                >
                  <i className={item.icon}></i>
                  <span>{item.name}</span>
                </NavLink>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Overlay для мобильного меню */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          style={{zIndex: 1049}}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
}

export default TopNavigation; 