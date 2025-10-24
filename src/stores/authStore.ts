import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
  avatar: string
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => void
  signup: (email: string, password: string, username: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (email: string, password: string) => {
        // Accept ANY credentials for now (mock)
        const user: User = {
          id: '1',
          email,
          name: email.split('@')[0],
          avatar: `https://i.pravatar.cc/150?u=${email}`
        }
        set({ user, isAuthenticated: true })
      },

      signup: (email: string, password: string, username: string) => {
        const user: User = {
          id: Date.now().toString(),
          email,
          name: username,
          avatar: `https://i.pravatar.cc/150?u=${email}`
        }
        set({ user, isAuthenticated: true })
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      }
    }),
    {
      name: '__atlys_frontend'
    }
  )
)
