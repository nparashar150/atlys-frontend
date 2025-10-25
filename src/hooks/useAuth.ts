import { useMutation } from '@tanstack/react-query'
import { loginApi, signupApi } from '@/api/auth.api'
import { useAuthStore } from '@/stores/authStore'

export function useAuth() {
  const setUser = useAuthStore(state => state.setUser)

  const loginMutation = useMutation({
    mutationFn: ({ identifier, password }: { identifier: string; password: string }) =>
      loginApi(identifier, password),
    onSuccess: (response) => {
      if (response.success && response.user) {
        setUser(response.user)
      }
    }
  })

  const signupMutation = useMutation({
    mutationFn: ({ identifier, password }: { identifier: string; password: string }) =>
      signupApi(identifier, password),
    onSuccess: (response) => {
      if (response.success && response.user) {
        setUser(response.user)
      }
    }
  })

  return {
    mutations: {
      login: loginMutation,
      signup: signupMutation
    }
  }
}
