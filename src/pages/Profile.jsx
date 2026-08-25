import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  User,
  MapPin,
  Clock,
  CheckCircle2,
  Plus,
  X,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import './Profile.css'

export default function Profile() {
  const { user, profile, updateProfile } = useApp()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: user?.name || 'Arjun Sharma',
    email: user?.email || 'arjun.sharma@example.com',
    role: profile?.currentRole || 'Software Engineer',
    targetRole: profile?.targetRole || 'Data Scientist',
    experience: profile?.experience || '3 years',
    location: 'Bengaluru, India',
    github: 'https://github.com/arjunsharma',
    linkedin: 'https://linkedin.com/in/arjunsharma',
    bio: 'Software engineer transitioning to Machine Learning & Data Science. Passionate about LLMs, Python pipelines, and statistical modeling.'
  })

  const [skills, setSkills] = useState(
    profile?.skills?.length ? profile.skills : ['Python', 'SQL', 'Pandas', 'Scikit-learn', 'Git', 'Data Visualization']
  )
  const [skillInput, setSkillInput] = useState('')
  const [savedMessage, setSavedMessage] = useState(false)

  const handleAddSkill = (e) => {
    e.preventDefault()
    if (!skillInput.trim() || skills.includes(skillInput.trim())) return
    setSkills([...skills, skillInput.trim()])
    setSkillInput('')
  }

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (updateProfile) {
      updateProfile({
        ...profile,
        currentRole: formData.role,
        targetRole: formData.targetRole,
        experience: formData.experience,
        skills
      })
    }
    setSavedMessage(true)
    setTimeout(() => setSavedMessage(false), 3000)
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header-card">
          <div className="ph-left">
            <div className="ph-avatar">
              {formData.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="ph-info">
              <h2>{formData.name}</h2>
              <p className="ph-role">{formData.role} → <span className="ph-target">{formData.targetRole}</span></p>
              <p className="ph-meta">
                <MapPin size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
                {formData.location} · 
                <Clock size={12} style={{ display: 'inline', margin: '0 4px', verticalAlign: 'middle' }} />
                {formData.experience} experience
              </p>
            </div>
          </div>
          <div className="ph-actions">
            <button className="btn-outline btn-sm" onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </button>
          </div>
        </div>

        {savedMessage && (
          <div className="profile-alert-success">
            <CheckCircle2 size={16} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
            Profile changes saved successfully to your LaunchPad account!
          </div>
        )}

        <form onSubmit={handleSubmit} className="profile-grid">
          {/* PERSONAL INFO */}
          <div className="db-card">
            <div className="db-card-header">
              <h3>Personal Details</h3>
            </div>
            <div className="profile-form-body">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Current Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Target Dream Role</label>
                  <input
                    type="text"
                    value={formData.targetRole}
                    onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>About Me / Bio</label>
                <textarea
                  rows="3"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* SKILLS & PREFERENCES */}
          <div className="profile-side-col">
            <div className="db-card">
              <div className="db-card-header">
                <h3>Your Skill Stack</h3>
              </div>
              <div className="profile-skills-box">
                <div className="active-skills-list">
                  {skills.map((s) => (
                    <span key={s} className="profile-skill-badge">
                      {s}
                      <button type="button" onClick={() => handleRemoveSkill(s)} aria-label="Remove skill">✕</button>
                    </span>
                  ))}
                </div>
                <div className="add-skill-inline">
                  <input
                    type="text"
                    placeholder="Add a skill (e.g. PyTorch)"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                  />
                  <button type="button" className="btn-sm" onClick={handleAddSkill}>
                    <Plus size={14} /> Add
                  </button>
                </div>
              </div>
            </div>

            <div className="db-card" style={{ marginTop: 20 }}>
              <div className="db-card-header">
                <h3>Links & Socials</h3>
              </div>
              <div className="profile-form-body">
                <div className="form-group">
                  <label>GitHub Profile</label>
                  <input
                    type="text"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>LinkedIn Profile</label>
                  <input
                    type="text"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-primary btn-full" style={{ marginTop: 20 }}>
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
