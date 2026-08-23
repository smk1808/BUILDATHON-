import { useState } from 'react'
import './ResumeBuilder.css'

export default function ResumeBuilder() {
  const [title, setTitle] = useState('Data Scientist')
  const [company, setCompany] = useState('Google DeepMind')
  const [tone, setTone] = useState('Professional & Concise')
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(true)

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => { setGenerating(false); setGenerated(true) }, 2000)
  }

  return (
    <div className="fade-in">
      <div className="db-page-header">
        <h1>📄 AI Resume Builder</h1>
        <p>Generate an ATS-optimized resume tailored to your target role using AI.</p>
      </div>
      <div className="resume-layout">
        <div className="resume-controls">
          <div className="db-card">
            <h3 style={{marginBottom:18,color:'#fff',fontSize:16,fontWeight:700}}>Resume Settings</h3>
            <div className="form-group" style={{marginBottom:14}}>
              <label>Target Job Title</label>
              <input type="text" value={title} onChange={e=>setTitle(e.target.value)} />
            </div>
            <div className="form-group" style={{marginBottom:14}}>
              <label>Target Company</label>
              <input type="text" value={company} onChange={e=>setCompany(e.target.value)} />
            </div>
            <div className="form-group" style={{marginBottom:20}}>
              <label>Tone</label>
              <select value={tone} onChange={e=>setTone(e.target.value)}>
                <option>Professional & Concise</option>
                <option>Creative & Bold</option>
                <option>Research-focused</option>
                <option>Leadership-focused</option>
              </select>
            </div>
            <button className={`btn-primary btn-full ${generating ? 'loading' : ''}`} onClick={handleGenerate} disabled={generating}>
              {generating ? <><span className="spinner"></span> Generating...</> : '🤖 Generate Resume'}
            </button>
            <button className="btn-outline btn-full" style={{marginTop:10}} onClick={() => window.print()}>
              📥 Download PDF
            </button>
          </div>

          <div className="db-card" style={{marginTop:16}}>
            <h3 style={{marginBottom:16,color:'#fff',fontSize:16,fontWeight:700}}>ATS Score</h3>
            <div className="ats-ring-wrap">
              <svg viewBox="0 0 120 120" width="110" height="110">
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12"/>
                <circle cx="60" cy="60" r="50" fill="none" stroke="url(#atsG)" strokeWidth="12"
                  strokeDasharray="314" strokeDashoffset="50" strokeLinecap="round"
                  transform="rotate(-90 60 60)"/>
                <defs>
                  <linearGradient id="atsG" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981"/><stop offset="100%" stopColor="#06B6D4"/>
                  </linearGradient>
                </defs>
              </svg>
              <div className="ats-center">
                <div className="ats-num">84</div>
                <div className="ats-label">ATS</div>
              </div>
            </div>
            <div className="ats-tips">
              <div className="ats-tip good">✅ 18/22 keywords matched</div>
              <div className="ats-tip warn">⚠️ Add quantified achievements</div>
              <div className="ats-tip good">✅ Proper heading structure</div>
              <div className="ats-tip warn">⚠️ Add certifications section</div>
            </div>
          </div>
        </div>

        {generated && (
          <div className="resume-paper">
            <div className="rp-header">
              <div className="rp-name">Arjun Sharma</div>
              <div className="rp-contact">arjun.sharma@gmail.com · +91 98765 43210 · linkedin.com/in/arjunsharma · github.com/arjunsharma</div>
              <div className="rp-tagline">Aspiring {title} | Python · ML · SQL · Data Analytics</div>
            </div>
            <div className="rp-section">
              <div className="rp-sec-title">PROFESSIONAL SUMMARY</div>
              <p>Results-driven Software Engineer with 3 years of experience transitioning into Data Science. Proficient in Python, SQL, and Machine Learning with hands-on experience building data pipelines and predictive models. Seeking to leverage analytical expertise at {company} to solve complex AI challenges.</p>
            </div>
            <div className="rp-section">
              <div className="rp-sec-title">TECHNICAL SKILLS</div>
              <p><strong>Languages:</strong> Python, SQL, JavaScript &nbsp;|&nbsp; <strong>ML/AI:</strong> Scikit-learn, TensorFlow, Pandas, NumPy &nbsp;|&nbsp; <strong>Tools:</strong> Git, Docker, Jupyter, Tableau &nbsp;|&nbsp; <strong>Cloud:</strong> GCP, AWS basics</p>
            </div>
            <div className="rp-section">
              <div className="rp-sec-title">WORK EXPERIENCE</div>
              <div className="rp-job">
                <div className="rp-job-row"><strong>Software Engineer</strong><span>Jan 2022 – Present</span></div>
                <div className="rp-company">TechCorp Pvt. Ltd. · Bengaluru</div>
                <ul className="rp-bullets">
                  <li>Built a churn prediction model with 91% accuracy using XGBoost, reducing customer churn by 18%</li>
                  <li>Designed automated ETL pipelines processing 2M+ records daily using Python & Apache Airflow</li>
                  <li>Created interactive dashboards in Tableau, improving decision-making speed by 30%</li>
                  <li>Collaborated with cross-functional teams on 5 high-impact data science projects</li>
                </ul>
              </div>
            </div>
            <div className="rp-section">
              <div className="rp-sec-title">EDUCATION</div>
              <div className="rp-job">
                <div className="rp-job-row"><strong>B.Tech Computer Science</strong><span>2018 – 2022</span></div>
                <div className="rp-company">IIT Hyderabad · CGPA: 8.6/10</div>
              </div>
            </div>
            <div className="rp-section">
              <div className="rp-sec-title">CERTIFICATIONS</div>
              <p>Google Data Analytics Professional · AWS Cloud Practitioner · TensorFlow Developer Certificate</p>
            </div>
            <div className="rp-section">
              <div className="rp-sec-title">PROJECTS</div>
              <div className="rp-job">
                <div className="rp-job-row"><strong>Customer Churn Predictor</strong><span>2023</span></div>
                <p>Built end-to-end ML pipeline using XGBoost achieving 91% accuracy; deployed on GCP with CI/CD via GitHub Actions.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
