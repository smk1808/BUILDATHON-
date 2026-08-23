import { useState } from 'react'
import './InterviewPrep.css'

const CATEGORIES = [
  { id: 'dsa', label: '💻 Data Structures & Algorithms' },
  { id: 'ml', label: '🤖 Machine Learning Concepts' },
  { id: 'sql', label: '🗄️ SQL & Databases' },
  { id: 'behavioral', label: '🎯 Behavioral (STAR Method)' },
  { id: 'system', label: '🏗️ System Design' },
]

const QUESTIONS = {
  ml: [
    { q: 'What is the difference between overfitting and underfitting? How do you diagnose and address each?', a: '**Overfitting** occurs when a model learns the training data too well — capturing noise along with the underlying pattern. It shows high training accuracy but low validation accuracy. Fix: regularization (L1/L2), dropout, more data, cross-validation.\n\n**Underfitting** occurs when the model is too simple to capture the data patterns. Both training and validation accuracy are low. Fix: increase model complexity, reduce regularization, add more features, train longer.' },
    { q: 'Explain the bias-variance tradeoff with a practical example.', a: '**Bias** = error from wrong assumptions (underfitting). **Variance** = error from sensitivity to small training fluctuations (overfitting).\n\nExample: A linear regression on non-linear data has high bias. A 100-node decision tree might have low bias but high variance. The tradeoff means reducing one often increases the other — optimal models balance both using techniques like ensemble methods (Random Forest, XGBoost).' },
    { q: 'How does gradient descent work? What are its variants?', a: '**Gradient Descent** minimizes a loss function by iteratively adjusting parameters in the direction of the steepest descent (negative gradient).\n\nVariants:\n1. **Batch GD** — uses entire dataset per step, slow but stable\n2. **Stochastic GD (SGD)** — uses one sample, fast but noisy\n3. **Mini-batch GD** — best of both, commonly used in deep learning\n\nAdaptive variants: Adam, RMSprop, Adagrad — adjust learning rates per parameter.' },
  ],
  dsa: [
    { q: 'Explain the time complexity of Quick Sort and when it performs poorly.', a: '**Quick Sort Average/Best:** O(n log n), **Worst:** O(n²)\n\nWorst case occurs when the pivot always lands at the extreme (e.g., sorted/reverse-sorted array with naive pivot). Fixes: randomized pivot, three-way partition, median-of-three.\n\nSpace: O(log n) average for recursion stack.' },
    { q: 'What is dynamic programming? Give a classic example.', a: '**Dynamic Programming** breaks problems into overlapping subproblems and stores solutions to avoid recomputation (memoization/tabulation).\n\nExample: **Fibonacci** — naive recursion is O(2ⁿ), DP reduces to O(n) by storing computed values.\n\n**Longest Common Subsequence (LCS)** — classic 2D DP problem, O(m×n) time.' },
  ],
  sql: [
    { q: 'What is the difference between INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN?', a: '**INNER JOIN** — returns only matching rows in both tables\n**LEFT JOIN** — all rows from left + matching rows from right (NULL for non-matches)\n**RIGHT JOIN** — all rows from right + matching from left\n**FULL OUTER JOIN** — all rows from both tables (NULL where no match)\n\nTip: INNER JOIN is most commonly used; LEFT JOIN for when you need all base records regardless of match.' },
  ],
  behavioral: [
    { q: 'Tell me about a time you had to learn something quickly to deliver results.', a: '**STAR Method:**\n\n**Situation:** My team was tasked with building a recommendation system in 2 weeks — a domain I had no experience in.\n\n**Task:** I needed to deliver a working collaborative filtering model.\n\n**Action:** I spent 3 evenings on Andrew Ng\'s ML course, built a prototype with Surprise library, and iterated daily with team feedback.\n\n**Result:** Delivered on time, system improved click-through rate by 23%.' },
  ],
  system: [
    { q: 'How would you design a URL shortener like bit.ly at scale?', a: '**Key Components:**\n1. **API Layer** — POST /shorten, GET /:code endpoints\n2. **Encoding** — Base62 encoding of auto-incremented IDs or MD5 hash (first 6 chars)\n3. **Database** — SQL for mappings (URL, code, created_at, user_id)\n4. **Cache** — Redis for hot URLs (80/20 rule applies)\n5. **Load Balancer** — distribute read traffic across read replicas\n6. **CDN** — for static redirect pages\n\n**Scale:** 100M URLs, 10B redirects/day ≈ 115K RPS → read-heavy, eventual consistency acceptable.' },
  ],
}

const HISTORY = [
  { topic: 'Python Basics', score: 92, grade: 'good' },
  { topic: 'SQL Joins & Aggregations', score: 85, grade: 'good' },
  { topic: 'ML Algorithms', score: 68, grade: 'mid' },
  { topic: 'Statistics & Probability', score: 72, grade: 'mid' },
  { topic: 'Behavioral Questions', score: 88, grade: 'good' },
]

export default function InterviewPrep() {
  const [selectedCat, setSelectedCat] = useState('ml')
  const [session, setSession] = useState(null)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [feedbackLoading, setFeedbackLoading] = useState(false)

  const startSession = () => {
    const qs = QUESTIONS[selectedCat] || QUESTIONS.ml
    setSession({ questions: qs, idx: 0 })
    setAnswer('')
    setFeedback(null)
  }

  const submitAnswer = () => {
    if (!answer.trim()) return
    setFeedbackLoading(true)
    setTimeout(() => {
      const q = session.questions[session.idx]
      setFeedback(q.a)
      setFeedbackLoading(false)
    }, 1500)
  }

  const nextQuestion = () => {
    const next = session.idx + 1
    if (next < session.questions.length) {
      setSession(prev => ({ ...prev, idx: next }))
      setAnswer('')
      setFeedback(null)
    } else {
      setSession(null)
    }
  }

  return (
    <div className="fade-in">
      <div className="db-page-header">
        <h1>🧠 Interview Preparation</h1>
        <p>Practice with AI-generated questions tailored to your target role and company.</p>
      </div>

      <div className="interview-grid">
        <div className="db-card">
          <div className="db-card-header"><h3>Select Practice Area</h3></div>
          <div className="int-cats">
            {CATEGORIES.map(c => (
              <div key={c.id} className={`int-cat ${selectedCat === c.id ? 'active' : ''}`} onClick={() => setSelectedCat(c.id)}>
                {c.label}
                {QUESTIONS[c.id] && <span className="int-q-count">{QUESTIONS[c.id].length}Q</span>}
              </div>
            ))}
          </div>
          <button className="btn-primary btn-full" style={{marginTop:16}} onClick={startSession}>
            Start Practice Session →
          </button>
        </div>

        <div className="db-card">
          <div className="db-card-header"><h3>📊 Practice History</h3></div>
          <div className="int-history">
            {HISTORY.map((h,i) => (
              <div key={i} className="int-hist-row">
                <div className="int-hist-topic">{h.topic}</div>
                <div className={`int-hist-score ${h.grade}`}>{h.score}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {session && (
        <div className="db-card" style={{marginTop:20}}>
          <div className="db-card-header">
            <h3>🎯 Practice Session</h3>
            <span className="badge-pill green">Live</span>
          </div>
          <div className="iq-num">Question {session.idx + 1} of {session.questions.length}</div>
          <div className="iq-text">{session.questions[session.idx].q}</div>
          <textarea
            className="iq-answer"
            placeholder="Type your answer here... Think aloud and explain your reasoning."
            value={answer}
            onChange={e => setAnswer(e.target.value)}
          />
          <div className="iq-actions">
            <button className="btn-ghost" onClick={nextQuestion}>Skip →</button>
            <button className="btn-primary" onClick={submitAnswer} disabled={feedbackLoading || !answer.trim()}>
              {feedbackLoading ? <><span className="spinner"></span> Analyzing...</> : 'Submit & Get AI Feedback →'}
            </button>
          </div>
          {feedback && (
            <div className="ai-feedback">
              <div className="af-header">🤖 Model Answer & Explanation</div>
              <div className="af-body">
                {feedback.split('\n').map((line, i) => (
                  <p key={i} style={{marginBottom: line === '' ? 8 : 4, fontWeight: line.startsWith('**') ? 600 : 400}}>
                    {line.replace(/\*\*/g, '')}
                  </p>
                ))}
              </div>
              <button className="btn-primary" style={{marginTop:12}} onClick={nextQuestion}>
                Next Question →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
