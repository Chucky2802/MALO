// src/Components/Dashboard.jsx
import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Styles/Dashboard.css';
import axios from 'axios';

const apiBase =
  import.meta?.env?.VITE_API_URL ||
  process.env.REACT_APP_API_URL ||
  'http://localhost:4000';

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const goto = (path) => navigate(path);

  const logout = async () => {
    try {
      const { data } = await axios.get(`${apiBase}/auth/logout`, { withCredentials: true });
      if (data?.Status) navigate('/adminlogin');
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  const items = [
    { to: '/dashboard', icon: 'bi-house-door', label: 'Dashboard' },
    { to: '/dashboard/employee-management', icon: 'bi-people', label: 'Employee Management' },
    { to: '/dashboard/category', icon: 'bi-card-list', label: 'Category' },
    { to: '/dashboard/customer-management', icon: 'bi-people', label: 'Customer Management' },
    { to: '/dashboard/service-management', icon: 'bi-tools', label: 'Service Management' },
    { to: '/dashboard/profile', icon: 'bi-person', label: 'Profile' },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <a href="#/" className="brand" onClick={(e) => e.preventDefault()}>
          <span className="brand__logo">M</span>
          <span className="brand__text">Malo Printing Services</span>
          <span className="brand__subtitle">Admin Console</span>
        </a>

        <nav className="nav">
          <div className="nav-section">
            <div className="nav-title">Main</div>
            {items.map((it) => {
              const active = location.pathname === it.to;
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  className={`nav-link ${active ? 'active' : ''}`}
                  data-tooltip={it.label}
                >
                  <i className={`nav-icon bi ${it.icon}`} />
                  <span className="nav-label">{it.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile" onClick={() => goto('/dashboard/user-profile')}>
            <div className="user-avatar">MP</div>
            <div className="user-info">
              <h4>Admin</h4>
              <p>malo@example.com</p>
            </div>
          </div>

          <button className="nav-link" onClick={() => goto('/dashboard/settings')} data-tooltip="Settings">
            <i className="nav-icon bi bi-gear" />
            <span className="nav-label">Settings</span>
          </button>

          <button className="nav-link" onClick={logout} data-tooltip="Logout">
            <i className="nav-icon bi bi-box-arrow-right" />
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </aside>

      {/* Toggle button */}
      <button
        className={`sidebar-toggle ${collapsed ? 'collapsed' : ''}`}
        onClick={() => setCollapsed((c) => !c)}
        aria-label="Toggle sidebar"
      >
        <i className={`bi ${collapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`} />
      </button>

      {/* Content area */}
      <main className={`content ${collapsed ? 'collapsed' : ''}`}>
        <Outlet />
      </main>
    </>
  );
}
