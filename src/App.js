import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNavigation from './components/layout/TopNavigation/TopNavigation';
import HomePage from './pages/Home';
import SchedulePage from './pages/Schedule';
import GradesPage from './pages/Grades';
import NewsPage from './pages/News';
import ProfilePage from './pages/Profile';
import IndividualPlanPage from './pages/Academic/IndividualPlan/index';
import LearningMaterialsPage from './pages/Academic/LearningMaterials';
import TestingPage from './pages/Academic/Testing';
import TeachersPage from './pages/Communication/Teachers';
import DocumentsPage from './pages/Administrative/Documents';
import FinancePage from './pages/Administrative/Finance';
import AppealsPage from './pages/Academic/Appeals';
import TranscriptPage from './pages/Academic/Transcript';
import SettingsPage from './pages/Administrative/SettingsPage';
import AnnouncementsPage from './pages/Communication/Announcements';
import EventsPage from './pages/Communication/EventsPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/global.css';

function App() {
  const [schedulePageKey, setSchedulePageKey] = useState(0);

  const resetSchedulePage = () => {
    setSchedulePageKey(prevKey => prevKey + 1);
  };

  return (
    <Router>
      <div className="app">
        <TopNavigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/schedule" element={<SchedulePage key={schedulePageKey} onModalClose={resetSchedulePage} />} />
            <Route path="/grades" element={<GradesPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            <Route path="/individual-plan" element={<IndividualPlanPage />} />
            <Route path="/learning-materials" element={<LearningMaterialsPage />} />
            <Route path="/testing" element={<TestingPage />} />
            <Route path="/appeals" element={<AppealsPage />} />
            <Route path="/transcript" element={<TranscriptPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/finance" element={<FinancePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;