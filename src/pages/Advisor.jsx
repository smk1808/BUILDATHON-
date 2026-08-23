import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Advisor.css'

const AI_RESPONSES = {
  'skills': `## 🎯 Skills for Data Science

Here's what you need as a **Data Scientist** in 2026:

**Core Technical Skills:**
- 🐍 **Python** (Pandas, NumPy, Matplotlib)
- 📊 **SQL** — essential for data querying
- 🤖 **ML Libraries** — Scikit-learn, XGBoost, LightGBM
- 🧠 **Deep Learning** — TensorFlow or PyTorch
- ☁️ **Cloud** — GCP BigQuery or AWS SageMaker

**Emerging (High Demand):**
- 🔥 LLM Engineering & Prompt Engineering
- ⚡ MLOps — model deployment & monitoring
- 🗄️ Vector Databases — Pinecone, ChromaDB

**Your Gap:** Based on your profile, focus on **Deep Learning** and **MLOps** first — these will 3x your job match rate!`,
  'transition': `## 🚀 SWE → AI/ML Transition Roadmap

Based on your profile (3 yrs SWE experience), here's your optimal path:

**Month 1–2: Foundations**
- Complete Stanford ML Course (Andrew Ng)
- Practice with Kaggle datasets daily

**Month 3–4: Core ML**
- Scikit-learn mastery
- Build 3 end-to-end ML projects

**Month 5–6: Deep Learning & GenAI**
- Fast.ai Practical Deep Learning
- Build a RAG application with LangChain

**Month 7+: Job Applications**
- Target AI-first companies
- Your SWE background is a huge advantage for MLOps roles!

**Estimated Timeline:** 8–10 months to your first ML role 🎯`,
  'companies': `## 🏢 Top ML Companies Hiring in India (2026)

**Tier 1 — FAANG+:**
- 🔵 **Google DeepMind** — Hyderabad/Bangalore, ₹30–80L
- 🔴 **Microsoft Research India** — Hyderabad, ₹25–70L
- 🟠 **Amazon AWS AI** — Bangalore, ₹20–60L

**Tier 2 — Indian Tech Giants:**
- 🟡 **Flipkart** — Bangalore, ₹18–40L
- 🟢 **Swiggy / Zomato** — AI recommendations, ₹15–35L
- 🔵 **Zepto / Meesho** — Fast-growing, ₹15–30L

**Tier 3 — AI Startups (High Growth):**
- 🚀 **Sarvam AI** — Indian LLMs, ₹20–50L
- ⚡ **Ola Krutrim** — Bangalore, ₹18–45L

**Your Best Bet:** Start with Tier 2, build portfolio, target Tier 1 in 12–18 months!`,
  'google': `## 📋 6-Month Google Interview Plan

**Month 1: Data Structures & Algorithms**
- LeetCode: 150 problems (Easy→Hard)
- Focus: Arrays, Trees, Graphs, DP
- Daily: 2 problems, 1 hour

**Month 2: System Design**
- Design: URL shortener, YouTube, WhatsApp
- Read "Designing Data-Intensive Applications"

**Month 3: ML Fundamentals**
- Study ML algorithms from scratch
- Implement from zero: Linear Reg, Decision Trees, K-means

**Month 4: Statistics & Probability**
- Probability theory, Bayesian thinking
- A/B testing methodology

**Month 5: ML System Design**
- Design: Recommendation systems, Search ranking
- Study Google's ML production systems

**Month 6: Mock Interviews**
- 20+ mock interviews on Pramp / Interviewing.io
- Apply and iterate!

**Key Resource:** "Cracking the Coding Interview" + LeetCode Premium ✅`,
  'certifications': `## 🏆 Top Certifications for Data Scientists

**Most Valuable (ROI):**
1. 🥇 **Google Professional Data Engineer** — ₹5-8L salary bump
2. 🥈 **AWS Machine Learning Specialty** — High industry recognition
3. 🥉 **TensorFlow Developer Certificate** — Validates DL skills

**Coursera Specializations:**
- Deep Learning Specialization (Andrew Ng) — MUST DO
- Machine Learning Engineering for Production (MLOps)
- Applied Data Science (IBM)

**Free but Powerful:**
- fast.ai Practical Deep Learning
- Kaggle Competitions (builds portfolio)
- Google's ML Crash Course

**Your Priority Order:**
1. Deep Learning Spec (Coursera) — 4 months
2. TensorFlow Cert — 1 month prep
3. AWS ML Specialty — 2 months

This combo will make you top 10% of applicants! 🚀`,
  'default': `I understand your question about your career! Let me provide personalized guidance.

**Based on your profile** (Software Engineer → Data Scientist):

I can help you with:
- 📊 Specific skill recommendations for your target role
- 🗺️ Week-by-week learning roadmaps
- 💼 Job market salary benchmarks
- 📚 Best courses and resources
- 🧠 Interview preparation strategies

Could you be more specific? For example:
- "What Python libraries should I focus on?"
- "How long will it take to get a ML role?"
- "What's a realistic salary expectation?"

I'm here to give you the most precise, actionable advice possible! 🎯`
}

const SUGGESTIONS = [
  { text: 'What skills do I need for Data Science?', key: 'skills' },
  { text: 'How to transition from SWE to AI/ML?', key: 'transition' },
  { text: 'Top companies hiring for ML in India?', key: 'companies' },
  { text: '6-month Google interview plan?', key: 'google' },
  { text: 'Best certifications for Data Science?', key: 'certifications' },
]

function getAIResponse(msg) {
  const lower = msg.toLowerCase()
  if (lower.includes('skill') || lower.includes('learn')) return AI_RESPONSES.skills
  if (lower.includes('transition') || lower.includes('swe') || lower.includes('switch')) return AI_RESPONSES.transition
  if (lower.includes('compan') || lower.includes('hiring') || lower.includes('india')) return AI_RESPONSES.companies
  if (lower.includes('google') || lower.includes('interview') || lower.includes('6 month') || lower.includes('crack')) return AI_RESPONSES.google
  if (lower.includes('certif')) return AI_RESPONSES.certifications
  return AI_RESPONSES.default
}

function MsgBubble({ msg }) {
  return (
    <div className={`chat-msg ${msg.role}`}>
      {msg.role === 'ai' && <div className="cm-avatar">🤖</div>}
      <div className="cm-bubble">
        {msg.text.split('\n').map((line, i) => {
          if (line.startsWith('## ')) return <h3 key={i} className="md-h3">{line.slice(3)}</h3>
          if (line.startsWith('**') && line.endsWith('**')) return <strong key={i} className="md-bold">{line.slice(2,-2)}</strong>
          if (line.startsWith('- ')) return <div key={i} className="md-li">• {line.slice(2)}</div>
          if (line.match(/^\d+\./)) return <div key={i} className="md-li">{line}</div>
          if (line === '') return <br key={i}/>
          return <p key={i} className="md-p">{line}</p>
        })}
      </div>
      {msg.role === 'user' && <div className="cm-avatar user">👤</div>}
    </div>
  )
}

export default function Advisor() {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: `## 👋 Hello! I'm your AI Career Advisor

I'm powered by advanced AI to give you personalized career guidance.

I can help you with:
- 📊 Career path planning & skill roadmaps
- 🎯 Skill gap analysis & learning resources
- 💼 Job market insights & salary benchmarks
- 📚 Course & certification recommendations
- 🧠 Interview preparation strategies

**What would you like to explore today?**`,
    }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = (text) => {
    const msg = text || input.trim()
    if (!msg) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: msg }])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, { role: 'ai', text: getAIResponse(msg) }])
    }, 1200 + Math.random() * 800)
  }

  return (
    <div className="advisor-page">
      {/* SIDEBAR */}
      <div className="adv-sidebar">
        <div className="adv-brand" onClick={() => navigate('/')}>Career<span>AI</span></div>
        <div className="adv-info">
          <div className="adv-avatar">🤖</div>
          <div className="adv-name">CareerAI Assistant</div>
          <div className="adv-status"><span className="adv-dot"></span>Online · Powered by Gemini</div>
        </div>
        <div className="adv-suggestions">
          <div className="adv-sug-title">💡 Try asking:</div>
          {SUGGESTIONS.map((s, i) => (
            <div key={i} className="adv-sug" onClick={() => sendMessage(s.text)}>{s.text}</div>
          ))}
        </div>
        <div className="adv-links">
          <div className="adv-link" onClick={() => navigate('/dashboard')}>← Dashboard</div>
          <div className="adv-link" onClick={() => navigate('/courses')}>📚 Courses</div>
          <div className="adv-link" onClick={() => navigate('/jobs')}>💼 Jobs</div>
        </div>
      </div>

      {/* CHAT */}
      <div className="adv-chat">
        <div className="chat-header">
          <div className="ch-info">
            <div className="ch-name">AI Career Advisor</div>
            <div className="ch-sub">Personalized · Real-time · Always available</div>
          </div>
          <button className="btn-ghost ch-clear" onClick={() => setMessages([messages[0]])}>Clear Chat</button>
        </div>

        <div className="chat-messages" id="chat-messages">
          {messages.map((m, i) => <MsgBubble key={i} msg={m} />)}
          {typing && (
            <div className="chat-msg ai">
              <div className="cm-avatar">🤖</div>
              <div className="cm-bubble typing-bubble">
                <span className="dot"></span><span className="dot"></span><span className="dot"></span>
              </div>
            </div>
          )}
          <div ref={bottomRef}></div>
        </div>

        <div className="chat-input-area">
          <div className="chat-input-row">
            <input
              type="text"
              className="chat-input"
              placeholder="Ask me anything about your career..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && sendMessage()}
              disabled={typing}
            />
            <button className="chat-send" onClick={() => sendMessage()} disabled={typing || !input.trim()}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
          <div className="chat-disclaimer">AI responses are for guidance only. Always verify with career professionals.</div>
        </div>
      </div>
    </div>
  )
}
