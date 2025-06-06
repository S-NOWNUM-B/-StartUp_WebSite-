import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';

function Navigation() {
  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="nav-logo">
          <NavLink to="/">Student Hub</NavLink>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink to="/" end>Главная</NavLink>
          </li>
          <li>
            <NavLink to="/schedule">Расписание</NavLink>
          </li>
          <li>
            <NavLink to="/grades">Оценки</NavLink>
          </li>
          <li>
            <NavLink to="/news">Новости</NavLink>
          </li>
          <li>
            <NavLink to="/tasks">Задачи</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Профиль</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation; 