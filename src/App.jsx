import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Advisor from './pages/Advisor'
import Courses from './pages/Courses'
import Jobs from './pages/Jobs'
import Profile from './pages/Profile'
import Mentors from './pages/Mentors'
import Saved from './pages/Saved'
import NotFound from './pages/NotFound'
import { AppProvider } from './context/AppContext'

export default function App() {
  return (
    <AppProvider>
      <div className="app-root">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/advisor" element={<Advisor />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AppProvider>
  )
}
