import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

function useCountUp(target, duration = 2000, trigger) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let start = 0
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, trigger])
  return count
}

function StatItem({ target, suffix, label }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const count = useCountUp(target, 2000, visible)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-num">{count.toLocaleString()}<span className="stat-suffix">{suffix}</span></div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

const FEATURES = [
  { icon: '🤖', title: 'AI Career Advisor', desc: 'Chat with our intelligent AI advisor for real-time career guidance and personalized next steps.', link: '/advisor', accent: '#7C3AED' },
  { icon: '⚡', title: 'Skill Gap Analysis', desc: 'Identify your skill level vs. industry demand and get a precise roadmap to close every gap.', link: '/dashboard', accent: '#06B6D4' },
  { icon: '📚', title: 'Course Recommendations', desc: 'Hand-picked courses from top platforms, matched to your goals, learning style, and schedule.', link: '/courses', accent: '#10B981' },
  { icon: '💼', title: 'Job Recommendations', desc: 'Get matched with real job openings aligned with your profile, skills, and salary expectations.', link: '/jobs', accent: '#F59E0B' },
  { icon: '📄', title: 'Resume Builder', desc: 'Generate an ATS-optimized resume tailored to each job application using AI assistance.', link: '/dashboard', accent: '#EF4444' },
  { icon: '🗺️', title: 'Career Roadmap', desc: 'Visualize your full career journey with milestones, timelines, and actionable steps.', link: '/dashboard', accent: '#8B5CF6' },
]

const STEPS = [
  { num: '01', icon: '📝', title: 'Create Profile', desc: 'Tell us about your education, skills, interests, and career aspirations.' },
  { num: '02', icon: '🤖', title: 'AI Analysis', desc: 'Our AI agents analyze your profile against market trends and opportunities.' },
  { num: '03', icon: '🎯', title: 'Get Matched', desc: 'Receive personalized job, course, and career path recommendations.' },
  { num: '04', icon: '🚀', title: 'Take Action', desc: 'Follow your roadmap, track progress, and land your dream career.' },
]

const TESTIMONIALS = [
  { name: 'Priya Nair', role: 'ML Engineer @ Google', avatar: 'PN', text: 'CareerAI helped me pivot from backend dev to ML in just 8 months. The roadmap was incredibly precise and the AI advisor was like having a personal career coach!', rating: 5 },
  { name: 'Rahul Verma', role: 'Data Scientist @ Flipkart', avatar: 'RV', text: 'The skill gap analysis was an eye-opener. It told me exactly which skills I was missing and recommended the perfect courses. Got a 3x salary hike!', rating: 5 },
  { name: 'Sneha Gupta', role: 'Product Manager @ Razorpay', avatar: 'SG', text: 'The AI advisor is incredible. It gave me a 6-month roadmap that actually worked. I landed my dream PM role in exactly the time it predicted!', rating: 5 },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb orb-1"></div>
          <div className="hero-orb orb-2"></div>
          <div className="hero-orb orb-3"></div>
          <div className="grid-overlay"></div>
        </div>
        <div className="hero-inner">
          <div className="hero-content fade-up">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              AI-Powered Career Intelligence Platform
            </div>
            <h1 className="hero-title">
              Your <span className="gradient-text">Dream Career</span><br />Starts Here
            </h1>
            <p className="hero-subtitle">
              Get hyper-personalized career guidance, skill gap analysis, course recommendations, and job opportunities — all powered by advanced AI agents tailored just for you.
            </p>
            <div className="hero-actions">
              <button className="btn-primary btn-lg" onClick={() => navigate('/onboarding')}>
                Start Your Journey
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <button className="btn-outline btn-lg" onClick={() => navigate('/advisor')}>
                Talk to AI Advisor
              </button>
            </div>
            <div className="hero-stats">
              <StatItem target={50000} suffix="+" label="Users Guided" />
              <div className="stat-divider"></div>
              <StatItem target={2400} suffix="+" label="Courses Curated" />
              <div className="stat-divider"></div>
              <StatItem target={98} suffix="%" label="Satisfaction Rate" />
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card fc-1">
              <span className="fc-icon">🎯</span>
              <div>
                <div className="fc-title">Career Match</div>
                <div className="fc-sub">92% compatibility</div>
              </div>
              <div className="fc-score">A+</div>
            </div>
            <div className="floating-card fc-2">
              <span className="fc-icon">📈</span>
              <div style={{flex:1}}>
                <div className="fc-title">Skill Growth</div>
                <div className="fc-sub">+34% this month</div>
                <div className="fc-bar-wrap"><div className="fc-bar" style={{width:'74%'}}></div></div>
              </div>
            </div>
            <div className="floating-card fc-3">
              <span className="fc-icon">💼</span>
              <div>
                <div className="fc-title">Job Offers</div>
                <div className="fc-sub">12 new matches</div>
              </div>
              <div className="fc-dots">
                <span className="fd green"></span><span className="fd green"></span><span className="fd cyan"></span><span className="fd purple"></span>
              </div>
            </div>
            <div className="hero-center-glow"></div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">What We Offer</div>
            <h2 className="section-title">Everything You Need to <span className="gradient-text">Succeed</span></h2>
            <p className="section-sub">Our AI agents work in harmony to deliver a completely personalized career advisory experience.</p>
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card" style={{'--accent': f.accent}} onClick={() => navigate(f.link)}>
                <div className="feature-icon-wrap">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <span className="feature-link">
                  Explore
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Process</div>
            <h2 className="section-title">How It <span className="gradient-text">Works</span></h2>
          </div>
          <div className="steps-flow">
            {STEPS.map((s, i) => (
              <>
                <div key={s.num} className="step-card">
                  <div className="step-num">{s.num}</div>
                  <div className="step-emoji">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
                {i < STEPS.length - 1 && <div key={`arrow-${i}`} className="step-arrow">→</div>}
              </>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Success Stories</div>
            <h2 className="section-title">Real People, <span className="gradient-text">Real Results</span></h2>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="test-stars">{'★'.repeat(t.rating)}</div>
                <p className="test-text">"{t.text}"</p>
                <div className="test-author">
                  <div className="test-avatar">{t.avatar}</div>
                  <div>
                    <div className="test-name">{t.name}</div>
                    <div className="test-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <div className="cta-orb"></div>
          <h2>Ready to Transform Your Career?</h2>
          <p>Join 50,000+ professionals who've found their dream career with CareerAI.</p>
          <button className="btn-primary btn-lg" onClick={() => navigate('/onboarding')}>
            Start For Free →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-brand">Career<span>AI</span></div>
          <p className="footer-sub">One-stop Personalized Career & Educational Advisory</p>
          <div className="footer-links">
            <span onClick={() => navigate('/advisor')}>AI Advisor</span>
            <span onClick={() => navigate('/courses')}>Courses</span>
            <span onClick={() => navigate('/jobs')}>Jobs</span>
            <span onClick={() => navigate('/dashboard')}>Dashboard</span>
          </div>
          <div className="footer-copy">© 2026 CareerAI. Built with ❤️ for Buildathon.</div>
        </div>
      </footer>
    </div>
  )
}
