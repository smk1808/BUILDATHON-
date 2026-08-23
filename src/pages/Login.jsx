import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('demo@careerai.com')
  const [password, setPassword] = useState('demo123')
  const [loading, setLoading] = useState(false)
  const { login } = useApp()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      login({ name: 'Arjun Sharma', email })
      navigate('/dashboard')
    }, 1200)
  }

  return (
    <div className="login-page">
      <div className="login-visual">
        <div className="lv-orb lv-orb1"></div>
        <div className="lv-orb lv-orb2"></div>
        <div className="lv-grid"></div>
        <div className="lv-content">
          <div className="lv-logo">Career<span>AI</span></div>
          <div className="lv-quote">"The best investment you can make is in yourself."</div>
          <div className="lv-author">— Warren Buffett</div>
          <div className="lv-stats">
            <div className="lv-stat"><span className="lv-stat-num">50K+</span><span className="lv-stat-label">Users</span></div>
            <div className="lv-stat"><span className="lv-stat-num">98%</span><span className="lv-stat-label">Satisfaction</span></div>
            <div className="lv-stat"><span className="lv-stat-num">2.4K+</span><span className="lv-stat-label">Courses</span></div>
          </div>
        </div>
      </div>

      <div className="login-form-wrap">
        <div className="login-form-container">
          <div className="lf-header">
            <h1>Welcome Back 👋</h1>
            <p>Sign in to continue your career journey</p>
          </div>

          <button className="social-btn" type="button" onClick={handleSubmit}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="divider"><span>or sign in with email</span></div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>
            <button type="submit" className={`btn-primary btn-full ${loading ? 'loading' : ''}`} disabled={loading}>
              {loading ? <span className="spinner"></span> : 'Sign In →'}
            </button>
          </form>

          <div className="lf-footer">
            Don't have an account?{' '}
            <span className="lf-link" onClick={() => navigate('/onboarding')}>Create one free</span>
          </div>

          <div className="demo-hint">
            <span>🎯</span> Demo credentials are pre-filled. Just click Sign In!
          </div>
        </div>
      </div>
    </div>
  )
}
