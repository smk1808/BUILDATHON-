import { useNavigate } from 'react-router-dom'
import './SkillAnalysis.css'

const STRONG = [
  { name: 'Python', pct: 88 }, { name: 'SQL', pct: 80 }, { name: 'Data Visualization', pct: 75 }, { name: 'Pandas / NumPy', pct: 85 },
]
const IMPROVING = [
  { name: 'Machine Learning', pct: 62 }, { name: 'Scikit-learn', pct: 55 }, { name: 'Statistics', pct: 65 },
]
const GAPS = [
  { name: 'Deep Learning', pct: 20 }, { name: 'PyTorch', pct: 10 }, { name: 'MLOps', pct: 15 }, { name: 'LLMs / GenAI', pct: 5 },
]
const RECS = [
  { icon: '🎓', title: 'Deep Learning Specialization — Coursera', sub: 'By Andrew Ng · 5 courses · ~4 months · Closes PyTorch & DL gap by 70%', impact: '+70% DL' },
  { icon: '🛠️', title: 'MLOps Fundamentals — Google Cloud', sub: 'Practical MLOps on GCP · 3 weeks · Closes MLOps gap by 60%', impact: '+60% MLOps' },
  { icon: '🤖', title: 'LLM Engineering Bootcamp — Fast.ai', sub: 'Hands-on LLM & RAG · 6 weeks · Closes GenAI gap by 80%', impact: '+80% GenAI' },
]

function SkillBar({ name, pct, color }) {
  return (
    <div className="skill-bar-item">
      <div className="sb-top">
        <span className="sb-name">{name}</span>
        <span className="sb-pct">{pct}%</span>
      </div>
      <div className="sb-track">
        <div className="sb-fill" style={{width:`${pct}%`, background: color}}></div>
      </div>
    </div>
  )
}

export default function SkillAnalysis() {
  const navigate = useNavigate()
  return (
    <div className="fade-in">
      <div className="db-page-header">
        <h1>⚡ Skill Gap Analysis</h1>
        <p>Your current skills vs. what top companies require for <strong style={{color:'#9F67FF'}}>Data Scientist</strong> roles.</p>
      </div>

      <div className="skill-gap-grid">
        <div className="sg-card strong">
          <div className="sg-header"><span className="sg-badge green">✅ Strong</span></div>
          {STRONG.map(s => <SkillBar key={s.name} {...s} color="var(--green)" />)}
        </div>
        <div className="sg-card improving">
          <div className="sg-header"><span className="sg-badge amber">🔄 Improving</span></div>
          {IMPROVING.map(s => <SkillBar key={s.name} {...s} color="var(--amber)" />)}
        </div>
        <div className="sg-card gap">
          <div className="sg-header"><span className="sg-badge red">🎯 Skill Gaps</span></div>
          {GAPS.map(s => <SkillBar key={s.name} {...s} color="var(--red)" />)}
        </div>
      </div>

      <div className="db-card" style={{marginTop:20}}>
        <div className="db-card-header">
          <h3>📋 AI Recommendations to Close Your Gaps</h3>
          <span className="badge-pill purple">Personalized</span>
        </div>
        <div className="ai-recs">
          {RECS.map((r,i) => (
            <div key={i} className="ai-rec-row">
              <div className="ai-rec-icon">{r.icon}</div>
              <div className="ai-rec-content">
                <div className="ai-rec-title">{r.title}</div>
                <div className="ai-rec-sub">{r.sub}</div>
              </div>
              <div className="ai-rec-impact">{r.impact}</div>
              <button className="btn-sm" onClick={() => navigate('/courses')}>Enroll</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
