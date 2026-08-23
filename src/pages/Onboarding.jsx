import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './Onboarding.css'

const TECH_SKILLS = ['Python', 'JavaScript', 'Java', 'React', 'SQL', 'Machine Learning', 'Cloud (AWS/GCP)', 'DevOps', 'Data Analysis', 'UI/UX Design', 'Node.js', 'Docker']
const SOFT_SKILLS = ['Leadership', 'Communication', 'Problem Solving', 'Teamwork', 'Project Management', 'Critical Thinking', 'Creativity', 'Adaptability']
const DOMAINS = ['Finance', 'Marketing', 'Healthcare', 'Education', 'E-commerce', 'Manufacturing', 'Media', 'Legal']
const INDUSTRIES = ['🤖 AI & Tech', '💰 FinTech', '🏥 HealthTech', '🛒 E-Commerce', '🎓 EdTech', '🚀 Startups', '🏛️ Government', '🌐 Consulting']
const EXP_OPTS = [
  { val: '0-1', label: '🌱 Fresher', sub: '0–1 yr' },
  { val: '2-4', label: '🚀 Junior', sub: '2–4 yr' },
  { val: '5-9', label: '⭐ Mid-level', sub: '5–9 yr' },
  { val: '10+', label: '👑 Senior', sub: '10+ yr' },
]

const AI_LOGS = [
  '🔍 Parsing your profile data...',
  '🧠 Connecting to LLM Gateway...',
  '👤 Profile Agent analyzing experience...',
  '⚡ Skills Analyzer running gap analysis...',
  '💼 Job Recommender matching opportunities...',
  '📚 Course Recommender curating learning paths...',
  '📄 Resume Agent optimizing your resume...',
  '✅ Career advisory report generated!',
]

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', age: '', education: '', field: '', experience: '',
    skills: [], targetRole: '', industries: [], salary: '₹12L – ₹20L', workPref: 'Hybrid'
  })
  const [analysisStep, setAnalysisStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [logLines, setLogLines] = useState([])
  const { login, updateProfile } = useApp()
  const navigate = useNavigate()

  const totalSteps = 4

  const updateForm = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const toggleSkill = (skill) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const toggleIndustry = (ind) => {
    setForm(prev => ({
      ...prev,
      industries: prev.industries.includes(ind)
        ? prev.industries.filter(i => i !== ind)
        : [...prev.industries, ind]
    }))
  }

  const nextStep = () => {
    if (step < totalSteps) setStep(s => s + 1)
    if (step === totalSteps - 1) runAnalysis()
  }
  const prevStep = () => { if (step > 1) setStep(s => s - 1) }

  const runAnalysis = () => {
    let i = 0
    const interval = setInterval(() => {
      if (i < AI_LOGS.length) {
        setLogLines(prev => [...prev, AI_LOGS[i]])
        setAnalysisStep(i)
        setProgress(Math.round(((i + 1) / AI_LOGS.length) * 100))
        i++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          login({ name: form.name || 'Arjun Sharma', email: 'user@careerai.com' })
          updateProfile({ ...form })
          navigate('/dashboard')
        }, 1200)
      }
    }, 600)
  }

  return (
    <div className="onboard-page">
      <div className="onboard-header">
        <div className="ob-logo" onClick={() => navigate('/')}>Launch<span>Pad</span></div>
        <div className="step-indicator">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="si-wrap">
              <div className={`si-dot ${i + 1 < step ? 'done' : ''} ${i + 1 === step ? 'active' : ''}`}>
                {i + 1 < step ? '✓' : i + 1}
              </div>
              {i < totalSteps - 1 && <div className={`si-line ${i + 1 < step ? 'done' : ''}`}></div>}
            </div>
          ))}
        </div>
        <div className="ob-step-label">Step {step} of {totalSteps}</div>
      </div>

      <div className="onboard-body">
        {/* STEP 1 */}
        {step === 1 && (
          <div className="ob-step fade-up">
            <div className="ob-step-icon">👤</div>
            <h2>Tell Us About Yourself</h2>
            <p>Let's personalize your experience from the ground up.</p>
            <div className="ob-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" value={form.name} onChange={e => updateForm('name', e.target.value)} placeholder="e.g. Arjun Sharma" />
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input type="number" value={form.age} onChange={e => updateForm('age', e.target.value)} placeholder="e.g. 24" min="15" max="65" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Education Level</label>
                  <select value={form.education} onChange={e => updateForm('education', e.target.value)}>
                    <option value="">Select level</option>
                    <option>High School</option>
                    <option>Diploma / Certification</option>
                    <option>Bachelor's Degree</option>
                    <option>Master's Degree</option>
                    <option>PhD</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Field of Study</label>
                  <input type="text" value={form.field} onChange={e => updateForm('field', e.target.value)} placeholder="e.g. Computer Science" />
                </div>
              </div>
              <div className="form-group">
                <label>Years of Experience</label>
                <div className="exp-grid">
                  {EXP_OPTS.map(opt => (
                    <div
                      key={opt.val}
                      className={`exp-card ${form.experience === opt.val ? 'selected' : ''}`}
                      onClick={() => updateForm('experience', opt.val)}
                    >
                      <div className="exp-label">{opt.label}</div>
                      <div className="exp-sub">{opt.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="ob-step fade-up">
            <div className="ob-step-icon">🛠️</div>
            <h2>Your Skills & Interests</h2>
            <p>Select all that apply — be honest for the best recommendations!</p>
            <div className="skill-categories">
              <div className="skill-cat">
                <div className="skill-cat-title">💻 Technical Skills</div>
                <div className="skill-tags-wrap">
                  {TECH_SKILLS.map(s => (
                    <span key={s} className={`skill-tag ${form.skills.includes(s) ? 'selected' : ''}`} onClick={() => toggleSkill(s)}>{s}</span>
                  ))}
                </div>
              </div>
              <div className="skill-cat">
                <div className="skill-cat-title">🎯 Soft Skills</div>
                <div className="skill-tags-wrap">
                  {SOFT_SKILLS.map(s => (
                    <span key={s} className={`skill-tag ${form.skills.includes(s) ? 'selected' : ''}`} onClick={() => toggleSkill(s)}>{s}</span>
                  ))}
                </div>
              </div>
              <div className="skill-cat">
                <div className="skill-cat-title">📊 Domain Knowledge</div>
                <div className="skill-tags-wrap">
                  {DOMAINS.map(s => (
                    <span key={s} className={`skill-tag ${form.skills.includes(s) ? 'selected' : ''}`} onClick={() => toggleSkill(s)}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
            {form.skills.length > 0 && (
              <div className="selected-count">✅ {form.skills.length} skill{form.skills.length !== 1 ? 's' : ''} selected</div>
            )}
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="ob-step fade-up">
            <div className="ob-step-icon">🎯</div>
            <h2>Career Aspirations</h2>
            <p>What does your dream career look like?</p>
            <div className="ob-form">
              <div className="form-group">
                <label>Target Role</label>
                <input type="text" value={form.targetRole} onChange={e => updateForm('targetRole', e.target.value)} placeholder="e.g. Data Scientist, Product Manager, ML Engineer..." />
              </div>
              <div className="form-group">
                <label>Target Industry (select all that apply)</label>
                <div className="industry-grid">
                  {INDUSTRIES.map(ind => (
                    <div key={ind} className={`ind-card ${form.industries.includes(ind) ? 'selected' : ''}`} onClick={() => toggleIndustry(ind)}>
                      {ind}
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expected Salary (Annual)</label>
                  <select value={form.salary} onChange={e => updateForm('salary', e.target.value)}>
                    <option>₹3L – ₹6L</option>
                    <option>₹6L – ₹12L</option>
                    <option>₹12L – ₹20L</option>
                    <option>₹20L – ₹50L</option>
                    <option>₹50L+</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Work Preference</label>
                  <select value={form.workPref} onChange={e => updateForm('workPref', e.target.value)}>
                    <option>Remote</option>
                    <option>Hybrid</option>
                    <option>On-site</option>
                    <option>Flexible</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4 — AI Analysis */}
        {step === 4 && (
          <div className="ob-step fade-up">
            <div className="ob-step-icon">🤖</div>
            <h2>AI Analysis in Progress</h2>
            <p>Our agent pipeline is building your personalized career plan...</p>
            <div className="analysis-visual">
              <div className="agent-pipeline">
                {['Profile Agent', 'Skills Analyzer', 'Job Recommender', 'Course Recommender'].map((agent, i) => (
                  <div key={i} className={`agent-node ${analysisStep >= i * 2 ? 'active' : ''} ${analysisStep >= i * 2 + 2 ? 'done' : ''}`}>
                    <div className="agent-pulse"></div>
                    <div className="agent-icon">{['👤', '⚡', '💼', '📚'][i]}</div>
                    <div className="agent-name">{agent}</div>
                    <div className="agent-status">{analysisStep >= i * 2 + 2 ? '✅ Done' : analysisStep >= i * 2 ? '🔄 Running' : '⏳ Waiting'}</div>
                  </div>
                ))}
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="progress-label">{progress}% complete</div>
              <div className="analysis-log">
                {logLines.map((line, i) => (
                  <div key={i} className="log-line" style={{ animationDelay: `${i * 0.1}s` }}>{line}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="onboard-footer">
        {step > 1 && step < 4 && (
          <button className="btn-ghost" onClick={prevStep}>← Back</button>
        )}
        {step < 3 && (
          <button className="btn-primary" onClick={nextStep}>Continue →</button>
        )}
        {step === 3 && (
          <button className="btn-primary" onClick={nextStep}>Analyze My Profile 🚀</button>
        )}
        {step === 4 && (
          <div className="analysis-wait">
            <span className="spinner"></span>
            Preparing your dashboard...
          </div>
        )}
      </div>
    </div>
  )
}
