import { useState, useEffect, useRef } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
  Bell,
  Briefcase,
  GraduationCap,
  Sparkles,
  Award,
  Calendar,
  LogOut,
  User,
  Bookmark,
  Compass,
  Rocket
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import './Navbar.css'

const NOTIFICATIONS = [
  { id: 1, type: 'job', title: 'New Job Match!', sub: 'Swiggy ML Engineer — 96% match', time: '2 min ago', unread: true },
  { id: 2, type: 'course', title: 'Course Reminder', sub: 'ML Module 3 — 45 mins remaining', time: '1 hr ago', unread: true },
  { id: 3, type: 'skill', title: 'Skill Gap Alert', sub: 'Add PyTorch to boost 4 job matches', time: '3 hr ago', unread: true },
  { id: 4, type: 'badge', title: 'Badge Earned!', sub: 'Python Proficiency — Level 3', time: '1 day ago', unread: false },
  { id: 5, type: 'interview', title: 'Interview Reminder', sub: 'Mock Interview scheduled for tomorrow', time: '1 day ago', unread: false },
]

export default function Navbar() {
  const { user, logout } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState(NOTIFICATIONS)
  const notifRef = useRef(null)

  const isDashboard = location.pathname.startsWith('/dashboard')
  const isAdvisor = location.pathname === '/advisor'
  const unreadCount = notifications.filter(n => n.unread).length

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, unread: false })))

  const getNotifIcon = (type) => {
    switch (type) {
      case 'job': return <Briefcase size={18} color="#06B6D4" />
      case 'course': return <GraduationCap size={18} color="#7C3AED" />
      case 'skill': return <Sparkles size={18} color="#F59E0B" />
      case 'badge': return <Award size={18} color="#10B981" />
      case 'interview': return <Calendar size={18} color="#EC4899" />
      default: return <Bell size={18} color="#94A3B8" />
    }
  }

  if (isDashboard || isAdvisor) return null

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo" onClick={() => navigate('/')}>
          <div className="logo-icon">
            <Rocket size={20} color="#06B6D4" />
          </div>
          <span className="logo-text">Launch<span className="logo-accent">Pad</span></span>
        </div>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><NavLink to="/" end className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/dashboard" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setMenuOpen(false)}>Dashboard</NavLink></li>
          <li><NavLink to="/advisor" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setMenuOpen(false)}>AI Advisor</NavLink></li>
          <li><NavLink to="/courses" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setMenuOpen(false)}>Courses</NavLink></li>
          <li><NavLink to="/jobs" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setMenuOpen(false)}>Jobs</NavLink></li>
          <li><NavLink to="/mentors" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setMenuOpen(false)}>Mentors</NavLink></li>
        </ul>

        <div className="nav-actions">
          {/* Notification Bell */}
          <div className="notif-wrap" ref={notifRef}>
            <button className="notif-btn" onClick={() => setNotifOpen(!notifOpen)} aria-label="Notifications">
              <Bell size={18} />
              {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
            </button>

            {notifOpen && (
              <div className="notif-dropdown">
                <div className="nd-header">
                  <span>Notifications</span>
                  <button className="nd-mark-read" onClick={markAllRead}>Mark all read</button>
                </div>
                <div className="nd-list">
                  {notifications.map(n => (
                    <div key={n.id} className={`nd-item ${n.unread ? 'unread' : ''}`}>
                      <div className="nd-icon-wrapper">{getNotifIcon(n.type)}</div>
                      <div className="nd-content">
                        <div className="nd-title">{n.title}</div>
                        <div className="nd-sub">{n.sub}</div>
                        <div className="nd-time">{n.time}</div>
                      </div>
                      {n.unread && <div className="nd-dot"></div>}
                    </div>
                  ))}
                </div>
                <div className="nd-footer" onClick={() => setNotifOpen(false)}>View all notifications</div>
              </div>
            )}
          </div>

          {user ? (
            <div className="nav-user">
              <div className="user-chip" onClick={() => navigate('/profile')} title="My Profile">
                {user.name?.split(' ').map(n=>n[0]).join('')}
              </div>
              <div className="nav-user-dropdown">
                <button className="btn-sm" onClick={() => navigate('/profile')}>
                  <User size={14} style={{ marginRight: 6 }} /> Profile
                </button>
                <button className="btn-sm" onClick={() => navigate('/saved')}>
                  <Bookmark size={14} style={{ marginRight: 6 }} /> Saved
                </button>
                <button className="btn-ghost sign-out-btn" onClick={() => { logout(); navigate('/') }}>
                  <LogOut size={14} style={{ marginRight: 6 }} /> Sign Out
                </button>
              </div>
            </div>
          ) : (
            <>
              <button className="btn-ghost" onClick={() => navigate('/login')}>Sign In</button>
              <button className="btn-primary" onClick={() => navigate('/onboarding')}>Get Started</button>
            </>
          )}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  )
}
