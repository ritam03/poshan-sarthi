import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import MealLogger from './components/MealLogger';
import Onboarding from './components/Onboarding';

import { AppProvider, useAppContext } from './context/AppContext';

function MainApp() {
  const { isOnboarded, profile } = useAppContext();

  if (!isOnboarded) {
    return (
      <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Onboarding />
      </div>
    );
  }

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content glass-panel" style={{ padding: '30px' }}>
          <header className="header" style={{ marginBottom: '30px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: '600' }}>Welcome back, {profile?.gender === 'Female' ? 'Priya' : 'Ritam'} 👋</h1>
              <p style={{ color: 'var(--text-secondary)', marginTop: '5px' }}>Let's stay on track with your nutrition goals today.</p>
            </div>
            <div className="user-profile">
              <div className="avatar">{profile?.gender === 'Female' ? 'P' : 'R'}</div>
              <span style={{ fontWeight: '500' }}>{profile?.gender === 'Female' ? 'Priya' : 'Ritam'}</span>
            </div>
          </header>
          
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chat" element={<Chatbot />} />
            <Route path="/log" element={<MealLogger />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

export default App;
