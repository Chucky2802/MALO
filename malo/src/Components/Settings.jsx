import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'UTC',
    notifications: true,
    password: '',
    newPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    axios
      .post('/api/changePassword', {
        password: settings.password,
        newPassword: settings.newPassword,
      })
      .then((response) => {
        if (response.data.Status) {
          alert('Password changed successfully');
          navigate('/profile');
        } else {
          alert('Error changing password');
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-3">
      <h2>Settings</h2>
      <div
        className="scrollable-box"
        style={{
          maxHeight: '90vh',
          overflowY: 'auto',
          border: '1px solid #ccc',
          padding: '15px',
        }}
      >
        <div className="mb-3">
          <h4>Application Preferences</h4>
          <div className="form-group">
            <label>Theme</label>
            <select
              name="theme"
              value={settings.theme}
              onChange={handleChange}
              className="form-control"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="form-group">
            <label>Language</label>
            <select
              name="language"
              value={settings.language}
              onChange={handleChange}
              className="form-control"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
          <div className="form-group">
            <label>Timezone</label>
            <select
              name="timezone"
              value={settings.timezone}
              onChange={handleChange}
              className="form-control"
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">New York</option>
              <option value="Europe/London">London</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <h4>Notifications</h4>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
              />{' '}
              Enable Email Notifications
            </label>
          </div>
        </div>

        <div className="mb-3">
          <h4>Change Password</h4>
          <form onSubmit={handlePasswordChange}>
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                name="password"
                value={settings.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={settings.newPassword}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
