import { useNavigate } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="not-found-page">
      <div className="nf-content">
        <div className="nf-code">404</div>
        <h1>Lost in Career Orbit?</h1>
        <p>The page you are looking for has been relocated or doesn't exist.</p>
        <div className="nf-actions">
          <button className="btn-primary" onClick={() => navigate('/')}>
            Back to Home
          </button>
          <button className="btn-outline" onClick={() => navigate('/dashboard')}>
            LaunchPad Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
