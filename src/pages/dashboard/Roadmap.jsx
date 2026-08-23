import './Roadmap.css'

const PHASES = [
  {
    num: 1, status: 'done', phase: 'Phase 1 — Foundation',
    title: 'Python & Statistics Mastery',
    desc: 'Build solid foundations in Python programming, statistics, and data manipulation with Pandas & NumPy.',
    tags: ['Python', 'Statistics', 'Pandas', 'NumPy'],
    meta: '✅ Completed', progress: 100, duration: '3 months',
  },
  {
    num: 2, status: 'active', phase: 'Phase 2 — Core ML (Current)',
    title: 'Machine Learning Fundamentals',
    desc: 'Master supervised/unsupervised learning, feature engineering, model evaluation, and ML pipelines.',
    tags: ['Scikit-learn', 'ML Models', 'Feature Eng.', 'Evaluation'],
    meta: '🔄 In Progress — 62%', progress: 62, duration: '~2 months left',
  },
  {
    num: 3, status: 'upcoming', phase: 'Phase 3 — Deep Learning',
    title: 'Neural Networks & Deep Learning',
    desc: 'Dive into deep learning with TensorFlow/PyTorch, CNNs, RNNs, and Transformers.',
    tags: ['TensorFlow', 'PyTorch', 'CNNs', 'Transformers'],
    meta: '⏳ Upcoming', progress: 0, duration: '3–4 months',
  },
  {
    num: 4, status: 'upcoming', phase: 'Phase 4 — Specialization',
    title: 'LLMs & GenAI Engineering',
    desc: 'Build expertise in Large Language Models, RAG systems, prompt engineering, and GenAI applications.',
    tags: ['LLMs', 'RAG', 'LangChain', 'Vector DBs'],
    meta: '⏳ Upcoming', progress: 0, duration: '2–3 months',
  },
  {
    num: '🏆', status: 'goal', phase: 'Goal',
    title: 'Senior Data Scientist — ₹30L+ CTC',
    desc: 'Target companies: Google DeepMind, Microsoft Research, Flipkart, or a top AI startup.',
    tags: ['🎯 Target Role'],
    meta: '🏆 Estimated: 10–12 months', progress: null, duration: '',
  },
]

export default function Roadmap() {
  return (
    <div className="fade-in">
      <div className="db-page-header">
        <h1>🗺️ Your Career Roadmap</h1>
        <p>From Software Engineer to Senior Data Scientist — your personalized AI-generated path.</p>
      </div>
      <div className="roadmap-timeline">
        {PHASES.map((p, i) => (
          <div key={i} className={`rm-item ${p.status}`}>
            <div className="rm-connector">
              <div className="rm-marker">
                {p.status === 'done' ? '✓' : p.num}
              </div>
              {i < PHASES.length - 1 && <div className="rm-line"></div>}
            </div>
            <div className="rm-card">
              <div className="rm-phase">{p.phase}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="rm-tags">
                {p.tags.map(t => <span key={t}>{t}</span>)}
              </div>
              {p.progress !== null && (
                <div className="rm-progress">
                  <div className="rm-prog-bar">
                    <div className="rm-prog-fill" style={{width: `${p.progress}%`}}></div>
                  </div>
                  <span className="rm-prog-pct">{p.progress}%</span>
                </div>
              )}
              <div className="rm-meta">
                <span className={`rm-status ${p.status}`}>{p.meta}</span>
                {p.duration && <span className="rm-duration">· {p.duration}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
