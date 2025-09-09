// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css';
 // <-- dedicated CSS for this screen

const api = axios.create({
  baseURL:
    import.meta?.env?.VITE_API_URL ||        // Vite
    process.env.REACT_APP_API_URL ||          // CRA
    'http://localhost:4000',                  // fallback for dev
  withCredentials: true,
});

export default function Login() {
  const [values, setValues] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setValues(v => ({ ...v, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post('/auth/adminlogin', values);
      if (data?.loginStatus) {
        navigate('/dashboard');
      } else {
        setError(data?.Error || 'Invalid email or password.');
      }
    } catch (err) {
      console.error(err);
      setError('Could not reach the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      {/* background shapes */}
      <div className="bg-shape bg-1" />
      <div className="bg-shape bg-2" />
      <div className="bg-noise" />

      <section className="login-card" aria-labelledby="login-title">
        <header className="login-card__header">
          <div className="brand">
            <div className="brand__logo" aria-hidden="true">M</div>
            <div className="brand__text">
              <h1 id="login-title">Welcome back</h1>
              <p className="muted">Sign in to manage MALO</p>
            </div>
          </div>
        </header>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {error && <div className="alert" role="alert">{error}</div>}

          <label className="field">
            <span className="field__label">Email</span>
            <input
              className="field__input"
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              onChange={onChange}
              value={values.email}
              required
            />
          </label>

          <label className="field">
            <span className="field__label">Password</span>
            <div className="password">
              <input
                className="field__input"
                type={showPwd ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                autoComplete="current-password"
                onChange={onChange}
                value={values.password}
                required
              />
              <button
                type="button"
                className="password__toggle"
                onClick={() => setShowPwd(s => !s)}
                aria-label={showPwd ? 'Hide password' : 'Show password'}
              >
                {showPwd ? '🙈' : '👁️'}
              </button>
            </div>
          </label>

          <div className="actions">
            <label className="checkbox">
              <input type="checkbox" /> <span>Remember me</span>
            </label>
            <button className="link" type="button" onClick={() => alert('Coming soon')}>
              Forgot password?
            </button>
          </div>

          <button className="btn" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          <p className="footnote">
            Don’t have an account?{' '}
            <button className="link" type="button" onClick={() => navigate('/signup')}>
              Sign up
            </button>
          </p>
        </form>
      </section>
    </main>
  );
}
