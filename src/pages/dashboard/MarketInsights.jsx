import {
  BarChart3,
  DollarSign,
  TrendingUp,
  Flame,
  Building2,
  MapPin,
  Sparkles
} from 'lucide-react'
import './MarketInsights.css'

const SALARY_DATA = [
  { role: 'Data Analyst', min: 6, mid: 12, max: 22 },
  { role: 'Data Scientist', min: 12, mid: 22, max: 45 },
  { role: 'ML Engineer', min: 15, mid: 28, max: 60 },
  { role: 'AI/LLM Engineer', min: 20, mid: 40, max: 90 },
  { role: 'Data Engineer', min: 10, mid: 20, max: 40 },
  { role: 'MLOps Engineer', min: 14, mid: 25, max: 50 },
]
const MAX_SAL = 90

const HOT_SKILLS = [
  { name: 'LLM Engineering', growth: '+142%', heat: 98, color: '#EF4444' },
  { name: 'MLOps / LLMOps', growth: '+89%', heat: 85, color: '#F97316' },
  { name: 'RAG Systems', growth: '+76%', heat: 78, color: '#EAB308' },
  { name: 'PyTorch', growth: '+65%', heat: 70, color: '#7C3AED' },
  { name: 'Vector Databases', growth: '+58%', heat: 62, color: '#06B6D4' },
  { name: 'Prompt Engineering', growth: '+54%', heat: 57, color: '#10B981' },
]

const HIRING_TREND = [
  { month: 'Mar', jobs: 420 }, { month: 'Apr', jobs: 510 }, { month: 'May', jobs: 480 },
  { month: 'Jun', jobs: 620 }, { month: 'Jul', jobs: 710 }, { month: 'Aug', jobs: 860 },
]
const MAX_JOBS = 860

const TOP_COMPANIES = [
  { name: 'Google', logo: 'G', color: '#4285F4', openings: 42, trend: '↑' },
  { name: 'Microsoft', logo: 'MS', color: '#00A4EF', openings: 38, trend: '↑' },
  { name: 'Flipkart', logo: 'F', color: '#F9A825', openings: 31, trend: '↑' },
  { name: 'Swiggy', logo: 'S', color: '#FC8019', openings: 24, trend: '↑' },
  { name: 'Sarvam AI', logo: 'SA', color: '#7C3AED', openings: 18, trend: '🔥' },
  { name: 'Meesho', logo: 'M', color: '#E91E8C', openings: 15, trend: '↑' },
]

export default function MarketInsights() {
  return (
    <div className="fade-in">
      <div className="db-page-header">
        <h1>Market Insights & Analytics</h1>
        <p>Real-time salary benchmarks, hiring trends, and skill demand for AI & Data roles in India.</p>
      </div>

      {/* SALARY BENCHMARKS */}
      <div className="db-card" style={{marginBottom:20}}>
        <div className="db-card-header">
          <h3>
            <DollarSign size={18} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
            Salary Benchmarks (India · LPA)
          </h3>
          <span className="badge-pill green">Updated Aug 2026</span>
        </div>
        <div className="salary-chart">
          {SALARY_DATA.map((r, i) => (
            <div key={i} className="sc-row">
              <div className="sc-role">{r.role}</div>
              <div className="sc-bars">
                <div className="sc-bar-track">
                  <div className="sc-bar min" style={{width: `${(r.min/MAX_SAL)*100}%`}} title={`Min: ₹${r.min}L`}></div>
                  <div className="sc-bar mid" style={{width: `${((r.mid-r.min)/MAX_SAL)*100}%`}} title={`Mid: ₹${r.mid}L`}></div>
                  <div className="sc-bar max" style={{width: `${((r.max-r.mid)/MAX_SAL)*100}%`}} title={`Max: ₹${r.max}L`}></div>
                </div>
              </div>
              <div className="sc-labels">
                <span className="sc-min">₹{r.min}L</span>
                <span className="sc-mid">₹{r.mid}L</span>
                <span className="sc-max">₹{r.max}L</span>
              </div>
            </div>
          ))}
          <div className="sc-legend">
            <span><span className="sl-dot" style={{background:'rgba(124,58,237,0.4)'}}></span>Entry</span>
            <span><span className="sl-dot" style={{background:'#7C3AED'}}></span>Mid</span>
            <span><span className="sl-dot" style={{background:'#06B6D4'}}></span>Senior</span>
          </div>
        </div>
        <div className="your-benchmark">
          <span>
            <MapPin size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
            Your target role: <strong>Data Scientist</strong>
          </span>
          <span className="ybm-range">₹12L – ₹45L · Median: ₹22L</span>
        </div>
      </div>

      <div className="insights-grid">
        {/* HOT SKILLS */}
        <div className="db-card">
          <div className="db-card-header">
            <h3>
              <Flame size={18} color="#EF4444" style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
              Fastest Growing Skills
            </h3>
          </div>
          <div className="hot-skills">
            {HOT_SKILLS.map((s, i) => (
              <div key={i} className="hs-item">
                <div className="hs-top">
                  <span className="hs-name">{s.name}</span>
                  <span className="hs-growth">{s.growth}</span>
                </div>
                <div className="hs-track">
                  <div className="hs-fill" style={{width:`${s.heat}%`, background: s.color}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HIRING TREND */}
        <div className="db-card">
          <div className="db-card-header">
            <h3>
              <TrendingUp size={18} color="#06B6D4" style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
              AI/ML Job Postings Trend — 2026
            </h3>
          </div>
          <div className="trend-bars">
            {HIRING_TREND.map((t, i) => (
              <div key={i} className="tb-col">
                <div className="tb-val">+{Math.round((t.jobs/420-1)*100)}%</div>
                <div className="tb-bar-wrap">
                  <div className="tb-bar" style={{height:`${(t.jobs/MAX_JOBS)*100}%`}}></div>
                </div>
                <div className="tb-label">{t.month}</div>
              </div>
            ))}
          </div>
          <div className="trend-note">60% YoY increase in AI/ML job openings across India</div>
        </div>
      </div>

      {/* TOP HIRING COMPANIES */}
      <div className="db-card" style={{marginTop:20}}>
        <div className="db-card-header">
          <h3>
            <Building2 size={18} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
            Top Hiring Companies Right Now
          </h3>
          <span className="badge-pill purple">Live Market</span>
        </div>
        <div className="company-grid">
          {TOP_COMPANIES.map((c, i) => (
            <div key={i} className="tc-card">
              <div className="tc-logo" style={{background:`${c.color}22`, color:c.color}}>{c.logo}</div>
              <div className="tc-name">{c.name}</div>
              <div className="tc-openings"><strong>{c.openings}</strong> openings</div>
              <div className="tc-trend">{c.trend} Active hiring</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
