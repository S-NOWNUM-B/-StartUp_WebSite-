import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/Home';
import SchedulePage from './pages/Schedule';
import GradesPage from './pages/Grades';
import NewsPage from './pages/News';
import TasksPage from './pages/Tasks';
import ProfilePage from './pages/Profile';
import './styles/App.css';

function App() {
  return (
      <Router>
        <div className="app">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/grades" element={<GradesPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>
        </div>
      </Router>
  );
}

export default App;