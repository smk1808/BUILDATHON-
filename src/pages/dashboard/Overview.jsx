import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

const MARKET_TRENDS = [
  { label: 'LLM Engineering', growth: '+142% demand', emoji: '🔥' },
  { label: 'MLOps', growth: '+89% demand', emoji: '📈' },
  { label: 'RAG Systems', growth: '+76% demand', emoji: '⚡' },
  { label: 'Prompt Engineering', growth: '+65% demand', emoji: '🎯' },
  { label: 'Vector Databases', growth: '+58% demand', emoji: '🚀' },
]

function RadarChart() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const cx = 140, cy = 140, r = 110
    const labels = ['Python', 'SQL', 'ML', 'Stats', 'Viz', 'Cloud']
    const current = [0.88, 0.80, 0.62, 0.65, 0.75, 0.40]
    const target  = [0.95, 0.85, 0.90, 0.80, 0.85, 0.75]
    const n = labels.length
    ctx.clearRect(0, 0, 280, 280)

    // grid circles
    for (let ring = 1; ring <= 4; ring++) {
      ctx.beginPath()
      for (let i = 0; i < n; i++) {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2
        const rr = (ring / 4) * r
        const x = cx + Math.cos(angle) * rr
        const y = cy + Math.sin(angle) * rr
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'
      ctx.lineWidth = 1
      ctx.stroke()
    }
    // axes
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r)
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'
      ctx.stroke()
    }
    // target polygon
    ctx.beginPath()
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2
      const x = cx + Math.cos(angle) * target[i] * r
      const y = cy + Math.sin(angle) * target[i] * r
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.fillStyle = 'rgba(6,182,212,0.08)'
    ctx.strokeStyle = 'rgba(6,182,212,0.4)'
    ctx.lineWidth = 1.5
    ctx.fill(); ctx.stroke()
    // current polygon
    ctx.beginPath()
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2
      const x = cx + Math.cos(angle) * current[i] * r
      const y = cy + Math.sin(angle) * current[i] * r
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.fillStyle = 'rgba(124,58,237,0.25)'
    ctx.strokeStyle = '#7C3AED'
    ctx.lineWidth = 2
    ctx.fill(); ctx.stroke()
    // dots + labels
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2
      const x = cx + Math.cos(angle) * current[i] * r
      const y = cy + Math.sin(angle) * current[i] * r
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = '#9F67FF'; ctx.fill()
      const lx = cx + Math.cos(angle) * (r + 20)
      const ly = cy + Math.sin(angle) * (r + 20)
      ctx.font = '11px Inter, sans-serif'
      ctx.fillStyle = 'rgba(255,255,255,0.6)'
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText(labels[i], lx, ly)
    }
  }, [])
  return <canvas ref={canvasRef} width={280} height={280} style={{display:'block',margin:'0 auto'}} />
}

export default function Overview() {
  const navigate = useNavigate()
  const { user } = useApp()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="fade-in">
      <div className="db-page-header">
        <h1>{greeting}, {user?.name?.split(' ')[0] || 'Arjun'}! 👋</h1>
        <p>Here's your personalized career snapshot for today.</p>
      </div>

      <div className="kpi-row">
        {[
          { icon:'💼', val:'12', label:'Job Matches', trend:'↑ 3 new', t:'up' },
          { icon:'📚', val:'8', label:'Courses Curated', trend:'↑ Personalized', t:'up' },
          { icon:'🎯', val:'4', label:'Skills to Acquire', trend:'→ Gap done', t:'neutral' },
          { icon:'⚡', val:'3', label:'Actions Pending', trend:'! Needs attention', t:'warn' },
        ].map((k,i) => (
          <div key={i} className="kpi-card">
            <div className="kpi-icon">{k.icon}</div>
            <div className="kpi-val">{k.val}</div>
            <div className="kpi-label">{k.label}</div>
            <div className={`kpi-trend ${k.t}`}>{k.trend}</div>
          </div>
        ))}
      </div>

      <div className="db-grid-2">
        <div className="db-card">
          <div className="db-card-header">
            <h3>Skill Radar</h3>
            <span className="badge-pill cyan">Live</span>
          </div>
          <RadarChart />
          <div style={{display:'flex',gap:16,justifyContent:'center',marginTop:12}}>
            <div style={{display:'flex',alignItems:'center',gap:6,fontSize:12,color:'var(--text-sub)'}}>
              <span style={{width:12,height:12,background:'rgba(124,58,237,0.6)',display:'inline-block',borderRadius:2}}></span>Current
            </div>
            <div style={{display:'flex',alignItems:'center',gap:6,fontSize:12,color:'var(--text-sub)'}}>
              <span style={{width:12,height:12,background:'rgba(6,182,212,0.5)',display:'inline-block',borderRadius:2}}></span>Target
            </div>
          </div>
        </div>

        <div className="db-card">
          <div className="db-card-header"><h3>Today's Actions</h3></div>
          <div className="action-items">
            {[
              { icon:'📄', cls:'purple', title:'Update your resume', sub:'Add latest project to boost match rate', btn:'Do it', to:'/dashboard/resume' },
              { icon:'🎓', cls:'cyan', title:'Complete Python ML Module', sub:'62% done · 45 mins remaining', btn:'Continue', to:'/courses' },
              { icon:'💼', cls:'green', title:'Apply to Flipkart ML Role', sub:'93% match · Deadline in 3 days', btn:'Apply', to:'/jobs' },
              { icon:'🧠', cls:'amber', title:'Mock Interview: Python DSA', sub:'Scheduled tomorrow 10 AM', btn:'Prep', to:'/dashboard/interview' },
            ].map((a,i) => (
              <div key={i} className="action-item">
                <div className={`action-icon ${a.cls}`}>{a.icon}</div>
                <div className="action-content">
                  <div className="action-title">{a.title}</div>
                  <div className="action-sub">{a.sub}</div>
                </div>
                <button className="btn-sm" onClick={() => navigate(a.to)}>{a.btn}</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="db-card">
        <div className="db-card-header">
          <h3>🔥 Hot in Your Domain</h3>
          <span className="badge-pill purple">AI & Tech</span>
        </div>
        <div className="market-tags">
          {MARKET_TRENDS.map((t,i) => (
            <div key={i} className="market-tag">
              <span>{t.emoji}</span>
              {t.label}
              <span className="tag-growth">{t.growth}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
