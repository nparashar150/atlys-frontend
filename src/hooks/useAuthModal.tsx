import { useState, useRef, useEffect, lazy, Suspense } from 'react'
import { useAuthStore } from '@/stores/authStore'

// Lazy load AuthModal
const AuthModal = lazy(() => import('@/components/auth/AuthModal'))

export function useAuthModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isModalMounted, setIsModalMounted] = useState(false)
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
      setIsModalMounted(true) // Trigger lazy load
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

  const AuthModalComponent = () => {
    if (!isModalMounted) return null

    return (
      <Suspense fallback={null}>
        <AuthModal open={isOpen} onOpenChange={handleModalClose} />
      </Suspense>
    )
  }

  return {
    isOpen,
    setIsOpen,
    requireAuth,
    AuthModalComponent
  }
}
