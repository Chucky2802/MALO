import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles.css';
import axios from 'axios';

axios.defaults.withCredentials = true;

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
      .then(result => {
        if (result.data.Status) {
          navigate('/adminlogin');
        }
      })
      .catch(error => {
        console.error('Logout error:', error);
      });
  };

  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleMouseEnter = () => {
    setSidebarVisible(true);
  };

  const handleMouseLeave = () => {
    setSidebarVisible(false);
  };

  return (
    <div className='container-fluid'>
      <div className='row no-gutters'>
        <div 
          className={`col-auto col-md-3 col-xl-2 px-0 bg-dark ${sidebarVisible ? '' : 'collapsed'}`} 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
          style={{
            position: 'fixed', 
            top: 0, 
            bottom: 0, 
            height: '100vh', 
            width: sidebarVisible ? '250px' : '80px', 
            transition: 'width 0.3s',
            overflow: 'hidden',
            zIndex: 1000,
            fontFamily: 'Arial, sans-serif'
          }}
        >
          <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
            <Link to="/dashboard" className='d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none'>
              <span className='fs-5 fw-bolder d-none d-sm-inline'>Malo Printing Services</span>
            </Link>
            <hr className="w-100 my-2" style={{ borderTop: '3px solid #ffffff', opacity: 1 }} />
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start flex-grow-1" id="menu">
              <li className='nav-item'>
                <Link to="/dashboard" className={`nav-link text-white px-0 align-middle sidebar-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                  <i className="bi bi-house-door"></i> <span className={`ms-1 d-none d-sm-inline ${!sidebarVisible && 'd-none'}`}>Dashboard</span>
                </Link>
              </li>
              <li className='nav-item'>
                <Link to="/dashboard/employee-management" className={`nav-link text-white px-0 align-middle sidebar-link ${location.pathname === '/dashboard/employee-management' ? 'active' : ''}`}>
                  <i className="bi bi-people"></i> <span className={`ms-1 d-none d-sm-inline ${!sidebarVisible && 'd-none'}`}>Employee Management</span>
                </Link>
              </li>
              <li className='nav-item'>
                <Link to="/dashboard/category" className={`nav-link text-white px-0 align-middle sidebar-link ${location.pathname === '/dashboard/category' ? 'active' : ''}`}>
                  <i className="bi bi-card-list"></i> <span className={`ms-1 d-none d-sm-inline ${!sidebarVisible && 'd-none'}`}>Category</span>
                </Link>
              </li>
              <li className='nav-item'>
                <Link to="/dashboard/profile" className={`nav-link text-white px-0 align-middle sidebar-link ${location.pathname === '/dashboard/profile' ? 'active' : ''}`}>
                  <i className="bi bi-person"></i> <span className={`ms-1 d-none d-sm-inline ${!sidebarVisible && 'd-none'}`}>Profile</span>
                </Link>
              </li>
              <li className='nav-item'>
                <Link to="/dashboard/customer-management" className={`nav-link text-white px-0 align-middle sidebar-link ${location.pathname === '/dashboard/customer-management' ? 'active' : ''}`}>
                  <i className="bi bi-people"></i> <span className={`ms-1 d-none d-sm-inline ${!sidebarVisible && 'd-none'}`}>Customer Management</span>
                </Link>
              </li>
              <li className='nav-item'>
                <Link to="/dashboard/service-management" className={`nav-link text-white px-0 align-middle sidebar-link ${location.pathname === '/dashboard/service-management' ? 'active' : ''}`}>
                  <i className="bi bi-tools"></i> <span className={`ms-1 d-none d-sm-inline ${!sidebarVisible && 'd-none'}`}>Service Management</span>
                </Link>
              </li>
            </ul>
            <hr className="w-100 my-2" style={{ borderTop: '3px solid #ffffff', opacity: 1 }} />
            <ul className="no-list-style">
              <li className='nav-item'>
                <Link to="/dashboard/user-profile" className={`nav-link text-white px-0 align-middle sidebar-link ${location.pathname === '/dashboard/user-profile' ? 'active' : ''}`}>
                  <i className="bi bi-person-circle"></i> <span className={`ms-1 d-none d-sm-inline ${!sidebarVisible && 'd-none'}`}>User Profile</span>
                </Link>
              </li>
              <li className='nav-item'>
                <Link to="/dashboard/settings" className={`nav-link text-white px-0 align-middle sidebar-link ${location.pathname === '/dashboard/settings' ? 'active' : ''}`}>
                  <i className="bi bi-gear"></i> <span className={`ms-1 d-none d-sm-inline ${!sidebarVisible && 'd-none'}`}>Settings</span>
                </Link>
              </li>
              <li className='nav-item'>
                <button onClick={handleLogout} className='nav-link text-white px-0 align-middle sidebar-link' style={{ border: 'none', background: 'none' }}>
                  <i className="bi bi-box-arrow-right"></i> <span className={`ms-1 d-none d-sm-inline ${!sidebarVisible && 'd-none'}`}>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div 
          className='col' 
          style={{
            marginLeft: sidebarVisible ? '250px' : '80px', 
            overflowY: 'auto', 
            height: '100vh', 
            transition: 'margin-left 0.3s', 
            padding: '20px'
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
