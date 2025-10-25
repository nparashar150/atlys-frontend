import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authService } from '@/services/authService'
import type { User } from '@/types'

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (identifier: string, password: string) => { success: boolean; error?: string }
  signup: (identifier: string, password: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (identifier: string, password: string) => {
        const result = authService.login(identifier, password)

        if (result.success && result.user) {
          set({ user: result.user, isAuthenticated: true })
          return { success: true }
        }

        return { success: false, error: result.error }
      },

      signup: (identifier: string, password: string) => {
        const result = authService.signup(identifier, password)

        if (result.success && result.user) {
          set({ user: result.user, isAuthenticated: true })
        }
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
