import { useState } from 'react'
import './Courses.css'

const COURSES = [
  {
    id: 1, cat: 'ml',
    title: 'Deep Learning Specialization',
    provider: 'Coursera', instructor: 'Andrew Ng',
    duration: '4 months', level: 'Intermediate', rating: 4.9, reviews: 142000,
    price: '₹3,200/mo', badge: '🔥 Top Pick', match: 98,
    tags: ['TensorFlow', 'CNNs', 'RNNs', 'Transformers'],
    desc: 'Master deep learning, improve AI applications, and advance your career through 5 courses.',
  },
  {
    id: 2, cat: 'ml',
    title: 'Machine Learning A-Z',
    provider: 'Udemy', instructor: 'Kirill Eremenko',
    duration: '6 weeks', level: 'Beginner', rating: 4.7, reviews: 218000,
    price: '₹499', badge: '💰 Best Value', match: 92,
    tags: ['Scikit-learn', 'Regression', 'Clustering', 'NLP'],
    desc: 'Learn Machine Learning in Python & R with hands-on exercises and real projects.',
  },
  {
    id: 3, cat: 'genai',
    title: 'LLM Engineering Bootcamp',
    provider: 'Fast.ai', instructor: 'Jeremy Howard',
    duration: '6 weeks', level: 'Advanced', rating: 4.8, reviews: 32000,
    price: 'Free', badge: '⚡ Trending', match: 95,
    tags: ['LLMs', 'RAG', 'LangChain', 'Fine-tuning'],
    desc: 'Hands-on LLM engineering — build RAG systems, fine-tune models, and deploy GenAI apps.',
  },
  {
    id: 4, cat: 'cloud',
    title: 'MLOps Fundamentals on GCP',
    provider: 'Google Cloud', instructor: 'Google Experts',
    duration: '3 weeks', level: 'Intermediate', rating: 4.6, reviews: 18000,
    price: '₹2,100/mo', badge: '☁️ Cloud', match: 88,
    tags: ['MLOps', 'Vertex AI', 'CI/CD', 'Monitoring'],
    desc: 'Deploy and manage ML models at scale on Google Cloud Platform with production best practices.',
  },
  {
    id: 5, cat: 'programming',
    title: 'Python for Data Science',
    provider: 'DataCamp', instructor: 'Hugo Bowne-Anderson',
    duration: '5 weeks', level: 'Beginner', rating: 4.6, reviews: 95000,
    price: '₹1,500/mo', badge: '✅ Recommended', match: 90,
    tags: ['Python', 'Pandas', 'Matplotlib', 'NumPy'],
    desc: 'Master Python for data analysis, visualization, and building your first ML models.',
  },
  {
    id: 6, cat: 'data',
    title: 'SQL for Data Analysis',
    provider: 'Mode Analytics', instructor: 'Scott Teal',
    duration: '2 weeks', level: 'Beginner', rating: 4.5, reviews: 45000,
    price: 'Free', badge: '🎁 Free', match: 85,
    tags: ['SQL', 'PostgreSQL', 'Joins', 'Window Fns'],
    desc: 'Master SQL for data analysis — from basic queries to advanced window functions and CTEs.',
  },
  {
    id: 7, cat: 'data',
    title: 'Statistics for Data Science',
    provider: 'edX', instructor: 'MIT Faculty',
    duration: '8 weeks', level: 'Intermediate', rating: 4.7, reviews: 28000,
    price: '₹5,500', badge: '🎓 MIT', match: 87,
    tags: ['Probability', 'Inference', 'Regression', 'Bayesian'],
    desc: 'Rigorous introduction to statistics as applied to data science and machine learning.',
  },
  {
    id: 8, cat: 'genai',
    title: 'Generative AI with Vertex AI',
    provider: 'Google', instructor: 'Google Cloud Team',
    duration: '4 weeks', level: 'Intermediate', rating: 4.8, reviews: 12000,
    price: 'Free', badge: '🆕 New', match: 93,
    tags: ['Gemini', 'Vertex AI', 'Prompt Eng.', 'Image Gen'],
    desc: 'Build generative AI applications using Google\'s Gemini models and Vertex AI platform.',
  },
]

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'ml', label: '🤖 Machine Learning' },
  { id: 'programming', label: '💻 Programming' },
  { id: 'data', label: '📊 Data & Analytics' },
  { id: 'cloud', label: '☁️ Cloud & MLOps' },
  { id: 'genai', label: '✨ GenAI' },
]

function Stars({ rating }) {
  return (
    <div className="stars">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{color: i <= Math.round(rating) ? '#F59E0B' : 'rgba(255,255,255,0.15)'}}>★</span>
      ))}
      <span className="rating-num">{rating}</span>
    </div>
  )
}

function CourseCard({ course }) {
  const [saved, setSaved] = useState(false)
  return (
    <div className="course-card">
      <div className="cc-top">
        <div className="cc-badges">
          <span className="cc-badge-badge">{course.badge}</span>
          <span className="cc-match">{course.match}% match</span>
        </div>
        <button className={`cc-save ${saved ? 'saved' : ''}`} onClick={() => setSaved(!saved)} title="Save course">
          {saved ? '❤️' : '🤍'}
        </button>
      </div>
      <h3 className="cc-title">{course.title}</h3>
      <div className="cc-meta">
        <span className="cc-provider">{course.provider}</span>
        <span className="cc-dot">·</span>
        <span>{course.instructor}</span>
      </div>
      <p className="cc-desc">{course.desc}</p>
      <div className="cc-tags">
        {course.tags.map(t => <span key={t} className="cc-tag">{t}</span>)}
      </div>
      <div className="cc-stats">
        <Stars rating={course.rating} />
        <span className="cc-reviews">({course.reviews.toLocaleString()})</span>
        <span className="cc-dot">·</span>
        <span className="cc-info">{course.duration}</span>
        <span className="cc-dot">·</span>
        <span className={`cc-level level-${course.level.toLowerCase().replace("'s",'').split(' ')[0]}`}>{course.level}</span>
      </div>
      <div className="cc-footer">
        <div className="cc-price">{course.price}</div>
        <button className="btn-primary btn-sm-med">Enroll Now →</button>
      </div>
    </div>
  )
}

export default function Courses() {
  const [activeCat, setActiveCat] = useState('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('match')

  const filtered = COURSES
    .filter(c => activeCat === 'all' || c.cat === activeCat)
    .filter(c => !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.tags.some(t => t.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => sort === 'match' ? b.match - a.match : sort === 'rating' ? b.rating - a.rating : 0)

  return (
    <div className="courses-page">
      <div className="courses-hero">
        <div className="ch-orb"></div>
        <div className="container">
          <div className="section-badge">Personalized for You</div>
          <h1>📚 Recommended Courses</h1>
          <p>Curated specifically for your goal: <span className="goal-chip">Data Scientist</span></p>
          <div className="courses-search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search courses, skills, or topics..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="courses-controls">
          <div className="cat-filters">
            {CATEGORIES.map(c => (
              <button key={c.id} className={`filter-btn ${activeCat === c.id ? 'active' : ''}`} onClick={() => setActiveCat(c.id)}>
                {c.label}
              </button>
            ))}
          </div>
          <div className="sort-wrap">
            <label>Sort by:</label>
            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="match">Best Match</option>
              <option value="rating">Rating</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        <div className="courses-count">{filtered.length} courses found</div>

        <div className="courses-grid">
          {filtered.map(c => <CourseCard key={c.id} course={c} />)}
        </div>
      </div>
    </div>
  )
}
