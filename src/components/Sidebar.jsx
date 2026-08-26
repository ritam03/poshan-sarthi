import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, PlusCircle, Settings, LogOut, Flame } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar glass-panel">
      <div className="logo">
        <Flame size={28} color="var(--primary-color)" />
        <span>PoshanSarthi</span>
      </div>
      
      <nav className="nav-links" style={{ flex: 1 }}>
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/log" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <PlusCircle size={20} />
          <span>Log Meal</span>
        </NavLink>
        <NavLink to="/chat" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <MessageSquare size={20} />
          <span>Food Agent</span>
        </NavLink>
      </nav>

      <div className="nav-links">
        <a href="#" className="nav-link">
          <Settings size={20} />
          <span>Settings</span>
        </a>
        <a href="#" className="nav-link" style={{ color: 'var(--danger)' }}>
          <LogOut size={20} />
          <span>Logout</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
