import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('aqm:user')
    return raw ? JSON.parse(raw) : null
  })

  useEffect(() => {
    if (user) localStorage.setItem('aqm:user', JSON.stringify(user))
    else localStorage.removeItem('aqm:user')
  }, [user])

  const login = async (email, password) => {
    // Simple mock auth: accept any non-empty creds
    if (!email || !password) throw new Error('Email/password required')
    const profile = {
      id: 'u_' + Math.random().toString(36).slice(2, 8),
      name: email.split('@')[0]?.replace(/\W+/g, ' ') || 'User',
      email,
      project: 'Air Quality Monitoring'
    }
    setUser(profile)
    return profile
  }

  const register = async (name, email, password) => {
    if (!name || !email || !password) throw new Error('All fields required')
    const profile = { id: 'u_' + Math.random().toString(36).slice(2, 8), name, email, project: 'Air Quality Monitoring' }
    setUser(profile)
    return profile
  }

  const logout = () => setUser(null)

  const value = useMemo(() => ({ user, login, register, logout }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() { return useContext(AuthContext) }
