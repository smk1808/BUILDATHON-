import { useState } from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Map,
  Zap,
  TrendingUp,
  Award,
  FileText,
  BrainCircuit,
  BarChart3,
  BookOpen,
  Briefcase,
  Users,
  Bookmark,
  User,
  LogOut,
  Target
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import './Dashboard.css'

/* ── Sub-pages ── */
import Overview from './dashboard/Overview'
import Roadmap from './dashboard/Roadmap'
import SkillAnalysis from './dashboard/SkillAnalysis'
import ResumeBuilder from './dashboard/ResumeBuilder'
import InterviewPrep from './dashboard/InterviewPrep'
import Progress from './dashboard/Progress'
import MarketInsights from './dashboard/MarketInsights'
import Certifications from './dashboard/Certifications'

const NAV_MAIN = [
  { to: '/dashboard', label: 'Overview', icon: <LayoutDashboard size={18} />, end: true },
  { to: '/dashboard/roadmap', label: 'Career Roadmap', icon: <Map size={18} /> },
  { to: '/dashboard/skills', label: 'Skill Analysis', icon: <Zap size={18} /> },
  { to: '/dashboard/progress', label: 'My Progress', icon: <TrendingUp size={18} /> },
  { to: '/dashboard/certifications', label: 'Certifications', icon: <Award size={18} /> },
]
const NAV_TOOLS = [
  { to: '/dashboard/resume', label: 'Resume Builder', icon: <FileText size={18} /> },
  { to: '/dashboard/interview', label: 'Interview Prep', icon: <BrainCircuit size={18} /> },
  { to: '/dashboard/insights', label: 'Market Insights', icon: <BarChart3 size={18} /> },
]
const NAV_EXPLORE = [
  { to: '/courses', label: 'Courses', icon: <BookOpen size={18} /> },
  { to: '/jobs', label: 'Jobs', icon: <Briefcase size={18} /> },
  { to: '/mentors', label: 'Mentors', icon: <Users size={18} /> },
  { to: '/saved', label: 'Saved Items', icon: <Bookmark size={18} /> },
]

export default function Dashboard() {
  const { user, logout } = useApp()
  const navigate = useNavigate()
  const score = 77
  const circumference = 2 * Math.PI * 50
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="dashboard-root">
      <aside className="db-sidebar">
        <div className="db-brand" onClick={() => navigate('/')}>Launch<span>Pad</span></div>

        <div className="db-user" onClick={() => navigate('/profile')} style={{cursor:'pointer'}} title="Edit Profile">
          <div className="db-avatar">{user?.name?.split(' ').map(n=>n[0]).join('') || 'AS'}</div>
          <div className="db-user-info">
            <div className="db-user-name">{user?.name || 'Arjun Sharma'}</div>
            <div className="db-user-role">SWE → Data Scientist</div>
          </div>
        </div>

        <nav className="db-nav">
          <div className="db-nav-section">MAIN</div>
          {NAV_MAIN.map(n => (
            <NavLink key={n.to} to={n.to} end={n.end}
              className={({isActive}) => `db-nav-link ${isActive ? 'active' : ''}`}>
              <span className="db-nav-icon">{n.icon}</span>{n.label}
            </NavLink>
          ))}

          <div className="db-nav-section">TOOLS</div>
          {NAV_TOOLS.map(n => (
            <NavLink key={n.to} to={n.to}
              className={({isActive}) => `db-nav-link ${isActive ? 'active' : ''}`}>
              <span className="db-nav-icon">{n.icon}</span>{n.label}
            </NavLink>
          ))}

          <div className="db-nav-section">EXPLORE</div>
          {NAV_EXPLORE.map(n => (
            <div key={n.to} className="db-nav-link" onClick={() => navigate(n.to)}>
              <span className="db-nav-icon">{n.icon}</span>{n.label}
            </div>
          ))}
        </nav>

        <div className="db-score-card">
          <div className="db-score-title">
            <Target size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} /> Career Score
          </div>
          <div className="db-score-ring-wrap">
            <svg viewBox="0 0 120 120" className="score-svg">
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10"/>
              <circle cx="60" cy="60" r="50" fill="none" stroke="url(#sg)" strokeWidth="10"
                strokeDasharray={circumference} strokeDashoffset={offset}
                strokeLinecap="round" transform="rotate(-90 60 60)"
                style={{transition:'stroke-dashoffset 1s ease'}}/>
              <defs>
                <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7C3AED"/><stop offset="100%" stopColor="#06B6D4"/>
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
          <div className="db-nav-link" onClick={() => navigate('/profile')}>
            <span className="db-nav-icon"><User size={16} /></span> My Profile
          </div>
          <button className="btn-ghost db-logout" onClick={() => { logout(); navigate('/') }}>
            <LogOut size={16} style={{ marginRight: 8 }} />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="db-main">
        <Routes>
          <Route index element={<Overview />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="skills" element={<SkillAnalysis />} />
          <Route path="resume" element={<ResumeBuilder />} />
          <Route path="interview" element={<InterviewPrep />} />
          <Route path="progress" element={<Progress />} />
          <Route path="insights" element={<MarketInsights />} />
          <Route path="certifications" element={<Certifications />} />
        </Routes>
      </main>
    </div>
  )
}
