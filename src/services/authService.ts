import { DEMO_ACCOUNTS } from '@/config/auth.config'

interface User {
  id: string
  email: string
  name: string
  avatar: string
}

interface AuthResponse {
  success: boolean
  user?: User
  error?: string
}

export const authService = {
  login: (identifier: string, password: string): AuthResponse => {
    // Check if credentials match demo accounts
    const demoAccount = DEMO_ACCOUNTS.find(
      (account) =>
        (account.email === identifier || account.username === identifier) &&
        account.password === password
    )

    if (demoAccount) {
      return {
        success: true,
        user: {
          id: '1',
          email: demoAccount.email,
          name: demoAccount.name,
          avatar: `https://i.pravatar.cc/150?u=${demoAccount.email}`
        }
      }
    }

    return {
      success: false,
      error: 'Account not found. Please sign up first.'
    }
  },

  signup: (identifier: string, _password: string): AuthResponse => {
    // Extract name from identifier
    const name = identifier.includes('@')
      ? identifier.split('@')[0]
      : identifier

    return {
      success: true,
      user: {
        id: Date.now().toString(),
        email: identifier.includes('@') ? identifier : `${identifier}@atlys.com`,
        name,
        avatar: `https://i.pravatar.cc/150?u=${identifier}`
      }
    }
  }
}
