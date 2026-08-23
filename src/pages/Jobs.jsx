import { useState } from 'react'
import './Jobs.css'

const JOBS = [
  {
    id: 1, title: 'Machine Learning Engineer', company: 'Flipkart', logo: 'F', logoColor: '#F9A825',
    location: 'Bengaluru', type: 'Full-time', mode: 'Hybrid', exp: '2–4 yrs',
    salary: '₹18L – ₹32L', match: 93, tags: ['Python', 'ML', 'Spark', 'SQL'],
    posted: '2 days ago', deadline: '3 days left', featured: true,
    desc: 'Build and deploy ML models powering Flipkart\'s recommendation engine serving 350M+ users.',
  },
  {
    id: 2, title: 'Data Scientist – AI Platform', company: 'Google', logo: 'G', logoColor: '#4285F4',
    location: 'Hyderabad', type: 'Full-time', mode: 'On-site', exp: '3–6 yrs',
    salary: '₹30L – ₹60L', match: 87, tags: ['Python', 'TensorFlow', 'BigQuery', 'ML'],
    posted: '5 days ago', deadline: '12 days left', featured: true,
    desc: 'Join Google AI to build next-gen data science platform components for enterprise customers.',
  },
  {
    id: 3, title: 'Junior Data Scientist', company: 'Swiggy', logo: 'S', logoColor: '#FC8019',
    location: 'Bengaluru', type: 'Full-time', mode: 'Hybrid', exp: '1–3 yrs',
    salary: '₹12L – ₹20L', match: 96, tags: ['Python', 'Pandas', 'SQL', 'Scikit-learn'],
    posted: '1 day ago', deadline: '7 days left', featured: false,
    desc: 'Work on demand forecasting, personalization and supply-demand optimization at Swiggy.',
  },
  {
    id: 4, title: 'AI/ML Engineer', company: 'Sarvam AI', logo: 'SA', logoColor: '#7C3AED',
    location: 'Remote', type: 'Full-time', mode: 'Remote', exp: '2–5 yrs',
    salary: '₹20L – ₹45L', match: 91, tags: ['LLMs', 'PyTorch', 'RAG', 'Python'],
    posted: '3 days ago', deadline: '10 days left', featured: true,
    desc: 'Build India-first LLMs and AI applications at Sarvam AI — one of India\'s top AI startups.',
  },
  {
    id: 5, title: 'Data Analyst → Data Scientist Track', company: 'Razorpay', logo: 'R', logoColor: '#3395FF',
    location: 'Bengaluru', type: 'Full-time', mode: 'Hybrid', exp: '0–2 yrs',
    salary: '₹10L – ₹18L', match: 89, tags: ['Python', 'SQL', 'Analytics', 'A/B Testing'],
    posted: '4 days ago', deadline: '14 days left', featured: false,
    desc: 'Start as Data Analyst with a structured growth path to Data Scientist within 18 months.',
  },
  {
    id: 6, title: 'Research Scientist – NLP', company: 'Microsoft', logo: 'MS', logoColor: '#00A4EF',
    location: 'Hyderabad', type: 'Full-time', mode: 'Hybrid', exp: '4–8 yrs',
    salary: '₹40L – ₹80L', match: 72, tags: ['NLP', 'LLMs', 'Research', 'PyTorch'],
    posted: '1 week ago', deadline: '20 days left', featured: false,
    desc: 'Conduct cutting-edge NLP research and build language model capabilities at Microsoft Research India.',
  },
]

function JobCard({ job, onClick }) {
  const [saved, setSaved] = useState(false)
  return (
    <div className={`job-card ${job.featured ? 'featured' : ''}`} onClick={() => onClick(job)}>
      {job.featured && <div className="job-featured-badge">⭐ Featured</div>}
      <div className="jc-top">
        <div className="jc-logo" style={{background: `${job.logoColor}22`, color: job.logoColor}}>{job.logo}</div>
        <div className="jc-title-area">
          <div className="jc-title">{job.title}</div>
          <div className="jc-company">{job.company} · {job.location}</div>
        </div>
        <button className={`jc-save ${saved ? 'saved' : ''}`} onClick={e => { e.stopPropagation(); setSaved(!saved) }}>{saved ? '❤️' : '🤍'}</button>
      </div>
      <p className="jc-desc">{job.desc}</p>
      <div className="jc-tags">
        {job.tags.map(t => <span key={t} className="jc-tag">{t}</span>)}
      </div>
      <div className="jc-footer">
        <div className="jc-meta">
          <span className="jc-pill">{job.mode}</span>
          <span className="jc-pill">{job.type}</span>
          <span className="jc-pill">{job.exp}</span>
        </div>
        <div className="jc-right">
          <div className="jc-salary">{job.salary}</div>
          <div className="jc-match-chip" style={{background: job.match >= 90 ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)', color: job.match >= 90 ? 'var(--green)' : 'var(--amber)'}}>
            {job.match}% match
          </div>
        </div>
      </div>
      <div className="jc-dates">
        <span className="jc-posted">🕐 {job.posted}</span>
        <span className={`jc-deadline ${parseInt(job.deadline) <= 5 ? 'urgent' : ''}`}>⏳ {job.deadline}</span>
      </div>
    </div>
  )
}

function JobModal({ job, onClose }) {
  if (!job) return null
  return (
    <div className="job-modal-overlay" onClick={onClose}>
      <div className="job-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="jm-header">
          <div className="jm-logo" style={{background: `${job.logoColor}22`, color: job.logoColor}}>{job.logo}</div>
          <div>
            <h2>{job.title}</h2>
            <div className="jm-company">{job.company} · {job.location}</div>
          </div>
          <div className="jm-match">{job.match}%<div style={{fontSize:11}}>match</div></div>
        </div>
        <div className="jm-pills">
          {[job.mode, job.type, job.exp, job.salary].map(p => <span key={p} className="jm-pill">{p}</span>)}
        </div>
        <div className="jm-section"><h4>About the Role</h4><p>{job.desc} This is a fantastic opportunity to work with world-class engineers and data scientists on problems at massive scale.</p></div>
        <div className="jm-section"><h4>Required Skills</h4><div className="jm-tags">{job.tags.map(t => <span key={t} className="jc-tag">{t}</span>)}</div></div>
        <div className="jm-section"><h4>Why You're a Match</h4>
          <div className="match-reasons">
            <div className="mr-item">✅ Python skills align perfectly</div>
            <div className="mr-item">✅ SQL experience matches requirements</div>
            <div className="mr-item">✅ {job.exp} matches your experience level</div>
            <div className="mr-item">⚠️ Deep Learning — start learning to increase match to 98%</div>
          </div>
        </div>
        <div className="jm-footer">
          <span className="jc-deadline">{job.deadline}</span>
          <button className="btn-primary">Apply Now →</button>
        </div>
      </div>
    </div>
  )
}

export default function Jobs() {
  const [search, setSearch] = useState('')
  const [selectedJob, setSelectedJob] = useState(null)
  const [modeFilter, setModeFilter] = useState('All')

  const filtered = JOBS.filter(j =>
    (!search || j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()) || j.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) &&
    (modeFilter === 'All' || j.mode === modeFilter)
  ).sort((a, b) => b.match - a.match)

  return (
    <div className="jobs-page">
      <div className="jobs-hero">
        <div className="jh-orb"></div>
        <div className="container">
          <div className="section-badge">AI-Matched For You</div>
          <h1>💼 Job Recommendations</h1>
          <p>Personalized matches based on your profile — sorted by compatibility.</p>
          <div className="jobs-search-bar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search by job title, company, or skill..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="jobs-body container">
        <div className="jobs-sidebar">
          <div className="jobs-filter-card">
            <div className="jf-title">Work Mode</div>
            {['All', 'Remote', 'Hybrid', 'On-site'].map(m => (
              <label key={m} className="jf-radio" onClick={() => setModeFilter(m)}>
                <span className={`jf-rb ${modeFilter === m ? 'active' : ''}`}></span>
                {m}
              </label>
            ))}
          </div>
          <div className="jobs-filter-card">
            <div className="jf-title">Match Score</div>
            <label className="jf-check"><input type="checkbox" defaultChecked /> 90%+ (Perfect)</label>
            <label className="jf-check"><input type="checkbox" defaultChecked /> 80–89% (Great)</label>
            <label className="jf-check"><input type="checkbox" /> 70–79% (Good)</label>
          </div>
          <div className="jobs-filter-card">
            <div className="jf-title">Salary Range</div>
            <label className="jf-check"><input type="checkbox" defaultChecked /> ₹10L – ₹20L</label>
            <label className="jf-check"><input type="checkbox" defaultChecked /> ₹20L – ₹40L</label>
            <label className="jf-check"><input type="checkbox" /> ₹40L+</label>
          </div>
          <div className="jobs-filter-card jobs-tip">
            <div className="jt-title">💡 Pro Tip</div>
            <p>Adding <strong>Deep Learning</strong> to your skills could unlock <strong>4 more high-match jobs</strong>!</p>
          </div>
        </div>

        <div className="jobs-list">
          <div className="jobs-result-count">{filtered.length} jobs matched · sorted by compatibility</div>
          {filtered.map(j => <JobCard key={j.id} job={j} onClick={setSelectedJob} />)}
        </div>
      </div>

      {selectedJob && <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </div>
  )
}
