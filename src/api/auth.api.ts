import { authService } from '@/services/authService'
import type { User } from '@/types'

function randomDelay(): Promise<void> {
  const delay = Math.floor(Math.random() * (800 - 300 + 1)) + 300
  return new Promise(resolve => setTimeout(resolve, delay))
}

interface AuthResponse {
  success: boolean
  user?: User
  error?: string
}

export async function loginApi(identifier: string, password: string): Promise<AuthResponse> {
  await randomDelay()
  return authService.login(identifier, password)
}

export async function signupApi(identifier: string, password: string): Promise<AuthResponse> {
  await randomDelay()
  return authService.signup(identifier, password)
}
