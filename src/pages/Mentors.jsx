import { useState } from 'react'
import {
  Star,
  Clock,
  CheckCircle2,
  Calendar,
  Video,
  X,
  Users
} from 'lucide-react'
import './Mentors.css'

const MENTORS_DATA = [
  {
    id: 1,
    name: 'Dr. Vikram Seth',
    role: 'Principal AI Scientist',
    company: 'Google DeepMind',
    experience: '12+ yrs',
    rating: 4.9,
    reviews: 84,
    avatar: 'VS',
    specialties: ['ML Systems', 'Deep Learning', 'Career Pivoting', 'Google Hiring'],
    availability: 'Available this Thu',
    hourlyRate: 'Free Community Session',
    bio: 'Ex-Amazon, PhD in Computer Science. Mentored 40+ engineers transitioning to top AI research labs.'
  },
  {
    id: 2,
    name: 'Ananya Deshmukh',
    role: 'Lead Data Scientist',
    company: 'Flipkart',
    experience: '8 yrs',
    rating: 4.8,
    reviews: 62,
    avatar: 'AD',
    specialties: ['Recommendation Engines', 'Python ML', 'Resume Review', 'Behavioral'],
    availability: 'Available tomorrow',
    hourlyRate: 'Free 30m Intro',
    bio: 'Built Flipkart search & recommendation pipelines. Passionate about helping women & juniors in Data Science.'
  },
  {
    id: 3,
    name: 'Rohit Kulkarni',
    role: 'Staff MLOps Architect',
    company: 'Microsoft',
    experience: '10 yrs',
    rating: 5.0,
    reviews: 95,
    avatar: 'RK',
    specialties: ['MLOps on Azure', 'Kubeflow', 'System Design', 'Scaling ML'],
    availability: 'Available this weekend',
    hourlyRate: 'Community Mentor',
    bio: 'Specialized in taking ML models from Jupyter notebooks to production serving 100M+ requests daily.'
  },
  {
    id: 4,
    name: 'Meera Nambiar',
    role: 'AI Product Manager',
    company: 'Sarvam AI',
    experience: '7 yrs',
    rating: 4.9,
    reviews: 51,
    avatar: 'MN',
    specialties: ['GenAI Products', 'Tech-to-Product Transition', 'Portfolio Building'],
    availability: 'Available Fri',
    hourlyRate: 'Free 30m Intro',
    bio: 'Leading LLM applications at Sarvam AI. Helps engineers frame their engineering background into high-impact PM roles.'
  }
]

export default function Mentors() {
  const [mentors] = useState(MENTORS_DATA)
  const [selectedMentor, setSelectedMentor] = useState(null)
  const [sessionBooked, setSessionBooked] = useState(false)
  const [selectedTime, setSelectedTime] = useState('Thursday, 6:00 PM IST')

  const handleBook = (mentor) => {
    setSelectedMentor(mentor)
    setSessionBooked(false)
  }

  const confirmBooking = (e) => {
    e.preventDefault()
    setSessionBooked(true)
    setTimeout(() => {
      setSelectedMentor(null)
      setSessionBooked(false)
      alert(`1:1 Mentorship Session Confirmed with ${selectedMentor.name}! Check your email for calendar invite.`)
    }, 1500)
  }

  return (
    <div className="mentors-page">
      <div className="mentors-hero">
        <div className="container">
          <div className="section-badge">1:1 Career Guidance</div>
          <h1>Connect with Top Industry Mentors</h1>
          <p>Book 1-on-1 advisory sessions with verified Data Scientists, AI Engineers, and Tech Leaders.</p>
        </div>
      </div>

      <div className="container mentors-body">
        <div className="mentors-grid">
          {mentors.map((m) => (
            <div key={m.id} className="mentor-card">
              <div className="mc-top">
                <div className="mc-avatar">{m.avatar}</div>
                <div className="mc-info">
                  <h3>{m.name}</h3>
                  <div className="mc-role">{m.role} · <strong style={{ color: 'var(--cyan)' }}>{m.company}</strong></div>
                  <div className="mc-meta">
                    <Star size={12} fill="#F59E0B" color="#F59E0B" style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
                    {m.rating} ({m.reviews} reviews) · {m.experience}
                  </div>
                </div>
              </div>
              <p className="mc-bio">{m.bio}</p>
              <div className="mc-specialties">
                {m.specialties.map((s, idx) => (
                  <span key={idx} className="mc-tag">{s}</span>
                ))}
              </div>
              <div className="mc-footer">
                <div className="mc-rate">
                  <span className="mc-avail">
                    <Clock size={11} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
                    {m.availability}
                  </span>
                  <span className="mc-price">{m.hourlyRate}</span>
                </div>
                <button className="btn-primary btn-sm" onClick={() => handleBook(m)}>
                  Book Session →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOOKING MODAL */}
      {selectedMentor && (
        <div className="modal-backdrop" onClick={() => setSelectedMentor(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Book Session with {selectedMentor.name}</h3>
              <button className="modal-close" onClick={() => setSelectedMentor(null)} aria-label="Close modal">
                <X size={16} />
              </button>
            </div>
            <div className="booking-summary">
              <p><strong>Mentor:</strong> {selectedMentor.name} ({selectedMentor.role} @ {selectedMentor.company})</p>
              <p><strong>Format:</strong> 30-min Google Meet 1:1 Video Call</p>
            </div>
            <form onSubmit={confirmBooking} className="modal-form">
              <div className="form-group">
                <label>Select Preferred Time Slot</label>
                <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                  <option>Thursday, 6:00 PM IST</option>
                  <option>Friday, 7:30 PM IST</option>
                  <option>Saturday, 11:00 AM IST</option>
                  <option>Sunday, 4:00 PM IST</option>
                </select>
              </div>
              <div className="form-group">
                <label>What would you like to discuss?</label>
                <textarea rows="3" placeholder="e.g. Need feedback on transitioning from SWE to ML and resume review for Google." required />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-ghost" onClick={() => setSelectedMentor(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={sessionBooked}>
                  {sessionBooked ? 'Confirming...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
