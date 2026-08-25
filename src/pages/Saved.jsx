import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Briefcase,
  BookOpen,
  Star,
  Clock,
  Trash2,
  ArrowRight,
  Bookmark
} from 'lucide-react'
import './Saved.css'

const SAVED_ITEMS = {
  jobs: [
    {
      id: 1,
      title: 'Machine Learning Engineer',
      company: 'Flipkart',
      location: 'Bengaluru (Hybrid)',
      salary: '₹18L – ₹32L',
      match: 93,
      tags: ['Python', 'ML', 'Spark', 'SQL']
    },
    {
      id: 3,
      title: 'Junior Data Scientist',
      company: 'Swiggy',
      location: 'Bengaluru (Hybrid)',
      salary: '₹12L – ₹20L',
      match: 96,
      tags: ['Python', 'Pandas', 'SQL', 'Scikit-learn']
    }
  ],
  courses: [
    {
      id: 1,
      title: 'Deep Learning Specialization',
      provider: 'Coursera (Andrew Ng)',
      duration: '4 months',
      rating: 4.9,
      match: 98,
      tags: ['TensorFlow', 'CNNs', 'Transformers']
    },
    {
      id: 3,
      title: 'LLM Engineering Bootcamp',
      provider: 'Fast.ai',
      duration: '6 weeks',
      rating: 4.8,
      match: 95,
      tags: ['LLMs', 'RAG', 'LangChain']
    }
  ]
}

export default function Saved() {
  const [activeTab, setActiveTab] = useState('jobs')
  const [savedJobs, setSavedJobs] = useState(SAVED_ITEMS.jobs)
  const [savedCourses, setSavedCourses] = useState(SAVED_ITEMS.courses)
  const navigate = useNavigate()

  const removeJob = (id) => setSavedJobs(savedJobs.filter(j => j.id !== id))
  const removeCourse = (id) => setSavedCourses(savedCourses.filter(c => c.id !== id))

  return (
    <div className="saved-page">
      <div className="saved-hero">
        <div className="container">
          <div className="section-badge">Bookmarked Resources</div>
          <h1>Your Saved Jobs & Courses</h1>
          <p>Easily access and manage the opportunities and learning paths you've bookmarked.</p>
        </div>
      </div>

      <div className="container saved-body">
        <div className="saved-tabs">
          <button
            className={`saved-tab-btn ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            <Briefcase size={15} style={{ marginRight: 6, display: 'inline', verticalAlign: 'middle' }} />
            Saved Jobs ({savedJobs.length})
          </button>
          <button
            className={`saved-tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            <BookOpen size={15} style={{ marginRight: 6, display: 'inline', verticalAlign: 'middle' }} />
            Saved Courses ({savedCourses.length})
          </button>
        </div>

        {activeTab === 'jobs' && (
          <div className="saved-list">
            {savedJobs.length === 0 ? (
              <div className="saved-empty">
                <Bookmark size={32} color="#94A3B8" />
                <p>No saved jobs yet.</p>
                <button className="btn-primary btn-sm" onClick={() => navigate('/jobs')}>
                  Explore Job Recommendations →
                </button>
              </div>
            ) : (
              savedJobs.map((j) => (
                <div key={j.id} className="saved-card">
                  <div className="sc-content">
                    <div className="sc-header">
                      <h3>{j.title}</h3>
                      <span className="sc-match">{j.match}% Match</span>
                    </div>
                    <div className="sc-meta">{j.company} · {j.location} · <strong>{j.salary}</strong></div>
                    <div className="sc-tags">
                      {j.tags.map((t) => (
                        <span key={t} className="sc-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="sc-actions">
                    <button className="btn-primary btn-sm" onClick={() => navigate('/jobs')}>
                      Apply Now
                    </button>
                    <button className="btn-ghost btn-sm" onClick={() => removeJob(j.id)} style={{ color: '#EF4444' }}>
                      <Trash2 size={13} style={{ marginRight: 4 }} /> Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="saved-list">
            {savedCourses.length === 0 ? (
              <div className="saved-empty">
                <Bookmark size={32} color="#94A3B8" />
                <p>No saved courses yet.</p>
                <button className="btn-primary btn-sm" onClick={() => navigate('/courses')}>
                  Browse Courses →
                </button>
              </div>
            ) : (
              savedCourses.map((c) => (
                <div key={c.id} className="saved-card">
                  <div className="sc-content">
                    <div className="sc-header">
                      <h3>{c.title}</h3>
                      <span className="sc-match">{c.match}% Match</span>
                    </div>
                    <div className="sc-meta">
                      {c.provider} ·
                      <Clock size={12} style={{ display: 'inline', margin: '0 4px', verticalAlign: 'middle' }} />
                      {c.duration} ·
                      <Star size={12} fill="#F59E0B" color="#F59E0B" style={{ display: 'inline', margin: '0 4px', verticalAlign: 'middle' }} />
                      {c.rating}
                    </div>
                    <div className="sc-tags">
                      {c.tags.map((t) => (
                        <span key={t} className="sc-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="sc-actions">
                    <button className="btn-primary btn-sm" onClick={() => navigate('/courses')}>
                      Start Learning
                    </button>
                    <button className="btn-ghost btn-sm" onClick={() => removeCourse(c.id)} style={{ color: '#EF4444' }}>
                      <Trash2 size={13} style={{ marginRight: 4 }} /> Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
