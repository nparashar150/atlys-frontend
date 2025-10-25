import { useState } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { AuthModal } from '@/components/auth/AuthModal'

export function useAuthModal() {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated } = useAuthStore()

  const requireAuth = (callback: () => void) => {
    if (!isAuthenticated) {
      setIsOpen(true)
      return
    }
    callback()
  }

  const AuthModalComponent = () => (
    <AuthModal open={isOpen} onOpenChange={setIsOpen} />
  )

  return {
    isOpen,
    setIsOpen,
    requireAuth,
    AuthModalComponent
  }
}
