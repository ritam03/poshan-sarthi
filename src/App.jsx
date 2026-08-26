import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import MealLogger from './components/MealLogger';

import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app-container">
          <Sidebar />
          <main className="main-content glass-panel" style={{ padding: '30px' }}>
            <header className="header" style={{ marginBottom: '30px' }}>
              <div>
                <h1 style={{ fontSize: '28px', fontWeight: '600' }}>Welcome back, Ritam 👋</h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: '5px' }}>Let's stay on track with your nutrition goals today.</p>
              </div>
              <div className="user-profile">
                <div className="avatar">RP</div>
                <span style={{ fontWeight: '500' }}>Ritam Pal</span>
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
    </AppProvider>
  );
}

export default App;
