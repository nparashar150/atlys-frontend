import { useState, useRef, useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { AuthModal } from '@/components/auth/AuthModal'

export function useAuthModal() {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated } = useAuthStore()
  const pendingActionRef = useRef<(() => void) | null>(null)

  // Execute pending action after successful authentication
  useEffect(() => {
    if (isAuthenticated && pendingActionRef.current) {
      const callback = pendingActionRef.current
      pendingActionRef.current = null
      setIsOpen(false)
      // Execute callback after modal closes
      setTimeout(() => callback(), 100)
    }
  }, [isAuthenticated])

  const requireAuth = (callback: () => void) => {
    if (!isAuthenticated) {
      pendingActionRef.current = callback
      setIsOpen(true)
      return
    }
    callback()
  }

  const handleModalClose = (open: boolean) => {
    setIsOpen(open)
    // Clear pending action if user closes modal without authenticating
    if (!open && !isAuthenticated) {
      pendingActionRef.current = null
    }
  }

  const AuthModalComponent = () => (
    <AuthModal open={isOpen} onOpenChange={handleModalClose} />
  )

  return {
    isOpen,
    setIsOpen,
    requireAuth,
    AuthModalComponent
  }
}
