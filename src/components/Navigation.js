import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navigation.css';

function Navigation() {
  return (
    <nav className="main-nav">
      <div className="nav-brand">
        <h1>AlmaU Hub</h1>
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
    </nav>
  );
}

export default Navigation; 