import { useState, useEffect } from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './Dashboard.css'

/* ── Sub-pages ── */
import Overview from './dashboard/Overview'
import Roadmap from './dashboard/Roadmap'
import SkillAnalysis from './dashboard/SkillAnalysis'
import ResumeBuilder from './dashboard/ResumeBuilder'
import InterviewPrep from './dashboard/InterviewPrep'

const NAV = [
  { to: '/dashboard', label: 'Overview', icon: '⊞', end: true },
  { to: '/dashboard/roadmap', label: 'Career Roadmap', icon: '🗺️' },
  { to: '/dashboard/skills', label: 'Skill Analysis', icon: '⚡' },
  { to: '/dashboard/resume', label: 'Resume Builder', icon: '📄' },
  { to: '/dashboard/interview', label: 'Interview Prep', icon: '🧠' },
]

export default function Dashboard() {
  const { user, logout } = useApp()
  const navigate = useNavigate()

  // career score radial
  const score = 77
  const circumference = 2 * Math.PI * 50
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="dashboard-root">
      {/* SIDEBAR */}
      <aside className="db-sidebar">
        <div className="db-brand" onClick={() => navigate('/')}>Career<span>AI</span></div>

        <div className="db-user">
          <div className="db-avatar">{user?.name?.split(' ').map(n=>n[0]).join('') || 'AS'}</div>
          <div className="db-user-info">
            <div className="db-user-name">{user?.name || 'Arjun Sharma'}</div>
            <div className="db-user-role">SWE → Data Scientist</div>
          </div>
        </div>

        <nav className="db-nav">
          {NAV.map(n => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({isActive}) => `db-nav-link ${isActive ? 'active' : ''}`}
            >
              <span className="db-nav-icon">{n.icon}</span>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="db-score-card">
          <div className="db-score-title">🎯 Career Score</div>
          <div className="db-score-ring-wrap">
            <svg viewBox="0 0 120 120" className="score-svg">
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10"/>
              <circle
                cx="60" cy="60" r="50" fill="none"
                stroke="url(#sg)" strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
                style={{transition: 'stroke-dashoffset 1s ease'}}
              />
              <defs>
                <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7C3AED"/>
                  <stop offset="100%" stopColor="#06B6D4"/>
                </linearGradient>
              </defs>
            </svg>
            <div className="db-score-text">
              <div className="db-score-num">{score}</div>
              <div className="db-score-denom">/100</div>
            </div>
          </div>
          <div className="db-score-trend">↑ +8 this week</div>
        </div>

        <div className="db-sidebar-footer">
          <button className="btn-ghost db-logout" onClick={() => { logout(); navigate('/') }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="db-main">
        <Routes>
          <Route index element={<Overview />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="skills" element={<SkillAnalysis />} />
          <Route path="resume" element={<ResumeBuilder />} />
          <Route path="interview" element={<InterviewPrep />} />
        </Routes>
      </main>
    </div>
  )
}
