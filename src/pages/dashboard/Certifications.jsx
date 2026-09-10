import { useState } from 'react'
import {
  Award,
  CheckCircle2,
  Link2,
  Download,
  Cloud,
  Brain,
  Zap,
  Plus,
  X,
  Sparkles,
  Code2,
  Database
} from 'lucide-react'
import './Certifications.css'

const MY_CERTS = [
  {
    id: 1,
    title: 'Python for Data Science & ML',
    issuer: 'DataCamp',
    date: 'Aug 14, 2026',
    credentialId: 'LP-CERT-884920',
    icon: <Code2 size={24} color="#10B981" />,
    status: 'Verified',
    skills: ['Python', 'Pandas', 'NumPy', 'Data Cleaning'],
    badgeColor: '#10B981'
  },
  {
    id: 2,
    title: 'SQL Analytics Specialist',
    issuer: 'Mode Analytics',
    date: 'Jul 22, 2026',
    credentialId: 'LP-CERT-441902',
    icon: <Database size={24} color="#06B6D4" />,
    status: 'Verified',
    skills: ['SQL', 'PostgreSQL', 'Joins', 'Aggregations'],
    badgeColor: '#06B6D4'
  }
]

const RECOMMENDED_CERTS = [
  {
    id: 3,
    title: 'Google Professional Data Engineer',
    issuer: 'Google Cloud',
    prepTime: '6-8 weeks',
    difficulty: 'Advanced',
    avgSalaryBump: '+ ₹6.5 LPA',
    icon: <Cloud size={28} color="#4285F4" />,
    examFee: '₹16,500',
    tags: ['BigQuery', 'Dataflow', 'Vertex AI', 'Pipeline Design']
  },
  {
    id: 4,
    title: 'AWS Certified Machine Learning - Specialty',
    issuer: 'Amazon Web Services',
    prepTime: '8-10 weeks',
    difficulty: 'Advanced',
    avgSalaryBump: '+ ₹8.0 LPA',
    icon: <Brain size={28} color="#F59E0B" />,
    examFee: '₹24,000',
    tags: ['SageMaker', 'Feature Engineering', 'Model Tuning', 'Security']
  },
  {
    id: 5,
    title: 'TensorFlow Developer Certificate',
    issuer: 'Google / TF Team',
    prepTime: '4-6 weeks',
    difficulty: 'Intermediate',
    avgSalaryBump: '+ ₹4.5 LPA',
    icon: <Zap size={28} color="#7C3AED" />,
    examFee: '₹8,200',
    tags: ['CNNs', 'NLP', 'Time Series', 'Keras']
  }
]

export default function Certifications() {
  const [certs, setCerts] = useState(MY_CERTS)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newIssuer, setNewIssuer] = useState('')

  const handleAddCert = (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    const newCert = {
      id: Date.now(),
      title: newTitle,
      issuer: newIssuer || 'Self-Reported',
      date: 'Just now',
      credentialId: `LP-CERT-${Math.floor(100000 + Math.random() * 900000)}`,
      icon: <Award size={24} color="#F59E0B" />,
      status: 'Pending Verification',
      skills: ['General Tech'],
      badgeColor: '#F59E0B'
    }
    setCerts([newCert, ...certs])
    setNewTitle('')
    setNewIssuer('')
    setShowAddModal(false)
  }

  return (
    <div className="fade-in certs-container">
      <div className="db-page-header">
        <div className="certs-header-row">
          <div>
            <h1>Certifications & Badges</h1>
            <p>Showcase verified credentials to prospective employers and discover target industry certificates.</p>
          </div>
          <button className="btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={16} style={{ marginRight: 6 }} /> Add Certificate
          </button>
        </div>
      </div>

      {/* VERIFIED EARNED CERTS */}
      <div className="db-card" style={{ marginBottom: 24 }}>
        <div className="db-card-header">
          <h3>Your Earned Credentials ({certs.length})</h3>
          <span className="badge-pill green">LinkedIn Compatible</span>
        </div>
        <div className="earned-certs-grid">
          {certs.map((c) => (
            <div key={c.id} className="earned-cert-card">
              <div className="cert-card-top">
                <div className="cert-icon-wrap">{c.icon}</div>
                <div className="cert-status-tag" style={{ color: c.badgeColor, background: `${c.badgeColor}18` }}>
                  <CheckCircle2 size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
                  {c.status}
                </div>
              </div>
              <h4 className="cert-title">{c.title}</h4>
              <div className="cert-issuer">{c.issuer} · Issued {c.date}</div>
              <div className="cert-cred-id">ID: <code>{c.credentialId}</code></div>
              <div className="cert-skills-wrap">
                {c.skills.map((s, idx) => (
                  <span key={idx} className="cert-skill-pill">{s}</span>
                ))}
              </div>
              <div className="cert-actions">
                <button className="btn-ghost btn-sm" onClick={() => alert('Certificate link copied to clipboard!')}>
                  <Link2 size={13} style={{ marginRight: 4 }} /> Copy Link
                </button>
                <button className="btn-outline btn-sm" onClick={() => alert('Downloading official badge asset...')}>
                  <Download size={13} style={{ marginRight: 4 }} /> Badge
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RECOMMENDED TARGET CERTS */}
      <div className="db-card">
        <div className="db-card-header">
          <div>
            <h3>High-ROI Target Certifications</h3>
            <p style={{ fontSize: 13, color: 'var(--text-sub)', marginTop: 4 }}>
              Certifications matching your target role (<strong>Data Scientist</strong>) with proven hiring leverage.
            </p>
          </div>
          <span className="badge-pill purple">AI Recommended</span>
        </div>
        <div className="rec-certs-list">
          {RECOMMENDED_CERTS.map((rc) => (
            <div key={rc.id} className="rec-cert-row">
              <div className="rc-icon">{rc.icon}</div>
              <div className="rc-main">
                <div className="rc-title-line">
                  <h4 className="rc-title">{rc.title}</h4>
                  <span className="rc-bump">{rc.avgSalaryBump}</span>
                </div>
                <div className="rc-sub">
                  <span>{rc.issuer}</span> · <span>⏱️ {rc.prepTime}</span> · <span>📈 {rc.difficulty}</span> · <span>Fee: {rc.examFee}</span>
                </div>
                <div className="rc-tags">
                  {rc.tags.map((t, idx) => (
                    <span key={idx} className="rc-tag">{t}</span>
                  ))}
                </div>
              </div>
              <div className="rc-action">
                <button className="btn-primary btn-sm" onClick={() => alert(`Starting preparation guide for ${rc.title}`)}>
                  Prep Guide →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD CERT MODAL */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Verified Certificate</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)} aria-label="Close modal">
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleAddCert} className="modal-form">
              <div className="form-group">
                <label>Certification Name *</label>
                <input
                  type="text"
                  placeholder="e.g. AWS Certified Solutions Architect"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Issuing Organization</label>
                <input
                  type="text"
                  placeholder="e.g. Coursera / AWS / IBM"
                  value={newIssuer}
                  onChange={(e) => setNewIssuer(e.target.value)}
                />
            
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-ghost" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
