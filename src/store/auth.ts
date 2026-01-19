'use client'

import { create } from 'zustand'

interface AuthStore {
  user: { id: string; name: string; email: string } | null
  token: string | null
  setUser: (user: any, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  setUser: (user, token) => {
    set({ user, token })
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    }
  },
  logout: () => {
    set({ user: null, token: null })
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  },
}))

export const initAuthFromStorage = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    if (token && user) {
      useAuthStore.setState({
        token,
        user: JSON.parse(user),
      })
    }
  }
}
