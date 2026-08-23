import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState({
    name: 'Arjun Sharma',
    age: 24,
    education: "Bachelor's Degree",
    field: 'Computer Science',
    experience: '2-4',
    skills: ['Python', 'JavaScript', 'SQL', 'Data Analysis'],
    targetRole: 'Data Scientist',
    targetIndustry: ['AI & Tech'],
    salary: '₹12L – ₹20L',
    workPref: 'Hybrid',
  })

  const login = (userData) => setUser(userData || { name: 'Arjun Sharma', email: 'demo@careerai.com' })
  const logout = () => setUser(null)
  const updateProfile = (data) => setProfile(prev => ({ ...prev, ...data }))

  return (
    <AppContext.Provider value={{ user, login, logout, profile, updateProfile }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
