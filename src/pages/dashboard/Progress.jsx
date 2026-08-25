import { useState } from 'react'
import {
  Flame,
  Clock,
  CheckCircle2,
  BookOpen,
  Target,
  Calendar,
  Code2,
  Database,
  BarChart3,
  Plus
} from 'lucide-react'
import './Progress.css'

const LEARNING_GOALS = [
  { id: 1, title: 'Complete Deep Learning Specialization', course: 'Coursera', target: 100, current: 62, deadline: 'Oct 15, 2026', status: 'in-progress' },
  { id: 2, title: 'Finish SQL for Analytics', course: 'Mode Analytics', target: 100, current: 100, deadline: 'Aug 10, 2026', status: 'done' },
  { id: 3, title: 'Build 3 ML Projects for Portfolio', course: 'Self-guided', target: 3, current: 1, deadline: 'Nov 1, 2026', status: 'in-progress', unit: 'projects' },
  { id: 4, title: 'LLM Engineering Bootcamp', course: 'Fast.ai', target: 100, current: 0, deadline: 'Dec 1, 2026', status: 'upcoming' },
  { id: 5, title: 'Apply to 20 Data Science Jobs', course: 'LaunchPad', target: 20, current: 5, deadline: 'Sep 30, 2026', status: 'in-progress', unit: 'applications' },
]

const WEEKLY_ACTIVITY = [
  { day: 'Mon', mins: 90 }, { day: 'Tue', mins: 45 }, { day: 'Wed', mins: 120 },
  { day: 'Thu', mins: 60 }, { day: 'Fri', mins: 30 }, { day: 'Sat', mins: 150 }, { day: 'Sun', mins: 0 },
]
const MAX_MINS = 150

const COMPLETED = [
  { title: 'Python for Data Science', provider: 'DataCamp', date: 'Aug 2026', icon: <Code2 size={20} color="#06B6D4" /> },
  { title: 'SQL Fundamentals', provider: 'Mode Analytics', date: 'Jul 2026', icon: <Database size={20} color="#10B981" /> },
  { title: 'Statistics for DS — Part 1', provider: 'edX', date: 'Jun 2026', icon: <BarChart3 size={20} color="#7C3AED" /> },
]

export default function Progress() {
  const [goals, setGoals] = useState(LEARNING_GOALS)
  const [showAdd, setShowAdd] = useState(false)
  const [newGoal, setNewGoal] = useState('')

  const totalMinutes = WEEKLY_ACTIVITY.reduce((s, d) => s + d.mins, 0)
  const streak = 5

  const addGoal = () => {
    if (!newGoal.trim()) return
    setGoals(prev => [...prev, {
      id: Date.now(), title: newGoal, course: 'Custom', target: 100, current: 0,
      deadline: 'TBD', status: 'upcoming'
    }])
    setNewGoal('')
    setShowAdd(false)
  }

  return (
    <div className="fade-in">
      <div className="db-page-header">
        <h1>My Progress</h1>
        <p>Track your learning journey, goals, and weekly study time.</p>
      </div>

      {/* STAT STRIP */}
      <div className="prog-stats">
        {[
          { icon: <Flame size={24} color="#EF4444" />, val: `${streak}`, label: 'Day Streak' },
          { icon: <Clock size={24} color="#06B6D4" />, val: `${Math.round(totalMinutes / 60)}h`, label: 'This Week' },
          { icon: <CheckCircle2 size={24} color="#10B981" />, val: `${goals.filter(g=>g.status==='done').length}`, label: 'Goals Completed' },
          { icon: <BookOpen size={24} color="#7C3AED" />, val: `${COMPLETED.length}`, label: 'Courses Finished' },
        ].map((s,i) => (
          <div key={i} className="prog-stat-card">
            <div className="psc-icon">{s.icon}</div>
            <div className="psc-val">{s.val}</div>
            <div className="psc-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="prog-grid">
        {/* LEARNING GOALS */}
        <div className="db-card prog-goals-card">
          <div className="db-card-header">
            <h3>Learning Goals</h3>
            <button className="btn-sm" onClick={() => setShowAdd(!showAdd)}>
              <Plus size={14} style={{ marginRight: 4 }} /> Add Goal
            </button>
          </div>

          {showAdd && (
            <div className="add-goal-row">
              <input type="text" placeholder="e.g. Complete PyTorch course..." value={newGoal} onChange={e => setNewGoal(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && addGoal()} />
              <button className="btn-primary btn-sm" onClick={addGoal}>Add</button>
            </div>
          )}

          <div className="goal-list">
            {goals.map(g => {
              const pct = Math.round((g.current / g.target) * 100)
              return (
                <div key={g.id} className={`goal-item ${g.status}`}>
                  <div className="gi-top">
                    <div className="gi-info">
                      <div className="gi-title">{g.title}</div>
                      <div className="gi-meta">{g.course} · Due {g.deadline}</div>
                    </div>
                    <span className={`gi-badge ${g.status}`}>
                      {g.status === 'done' ? 'Completed' : g.status === 'upcoming' ? 'Queued' : 'In Progress'}
                    </span>
                  </div>
                  {g.status !== 'upcoming' && (
                    <>
                      <div className="gi-progress-bar">
                        <div className="gi-progress-fill" style={{width: `${pct}%`}}></div>
                      </div>
                      <div className="gi-pct-row">
                        <span className="gi-pct-label">{g.current}{g.unit ? ` ${g.unit}` : '%'} of {g.target}{g.unit ? ` ${g.unit}` : '%'}</span>
                        <span className="gi-pct">{pct}%</span>
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="prog-right-col">
          {/* WEEKLY ACTIVITY */}
          <div className="db-card">
            <div className="db-card-header">
              <h3>
                <Calendar size={16} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
                Weekly Study Activity
              </h3>
              <span className="badge-pill cyan">{Math.round(totalMinutes/60)}h total</span>
            </div>
            <div className="weekly-bars">
              {WEEKLY_ACTIVITY.map((d, i) => (
                <div key={i} className="wb-col">
                  <div className="wb-bar-wrap">
                    <div className="wb-bar" style={{height: `${(d.mins / MAX_MINS) * 100}%`, opacity: d.mins === 0 ? 0.15 : 1}}></div>
                  </div>
                  <div className="wb-day">{d.day}</div>
                  <div className="wb-mins">{d.mins > 0 ? `${d.mins}m` : ''}</div>
                </div>
              ))}
            </div>
          </div>

          {/* COMPLETED COURSES */}
          <div className="db-card" style={{marginTop:16}}>
            <div className="db-card-header"><h3>Completed Courses</h3></div>
            <div className="completed-list">
              {COMPLETED.map((c, i) => (
                <div key={i} className="completed-item">
                  <div className="ci-icon">{c.icon}</div>
                  <div className="ci-info">
                    <div className="ci-title">{c.title}</div>
                    <div className="ci-meta">{c.provider} · {c.date}</div>
                  </div>
                  <span className="badge-pill green">Verified</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
