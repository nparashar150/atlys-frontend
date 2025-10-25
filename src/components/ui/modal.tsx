import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'

interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
  className?: string
}

export function Modal({ open, onOpenChange, children, className = '' }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(open)

  // Sync visibility state with a delay for exit animation
  useEffect(() => {
    if (open) {
      setIsVisible(true)
    }
  }, [open])

  // Focus trap
  useEffect(() => {
    if (!open || !modalRef.current) return

    // Save the previously focused element
    previousActiveElement.current = document.activeElement as HTMLElement

    const modalElement = modalRef.current
    const focusableElements = modalElement.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    // Focus first element
    firstElement?.focus()

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    modalElement.addEventListener('keydown', handleTabKey)

    return () => {
      modalElement.removeEventListener('keydown', handleTabKey)
      // Return focus to previously focused element
      previousActiveElement.current?.focus()
    }
  }, [open])

  // Handle Escape key
  useEffect(() => {
    if (!open) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, onOpenChange])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!isVisible) return null

  return createPortal(
    <AnimatePresence mode="wait" onExitComplete={() => setIsVisible(false)}>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => onOpenChange(false)}
            aria-hidden="true"
          />

          {/* Modal */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => onOpenChange(false)}
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{
                duration: 0.25,
                scale: { type: 'spring', visualDuration: 0.25, bounce: 0.15 }
              }}
              className={`relative max-w-md w-full ${className}`}
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

interface ModalHeaderProps {
  children: ReactNode
  className?: string
}

export function ModalHeader({ children, className = '' }: ModalHeaderProps) {
  return (
    <div className={`px-6 pt-6 pb-4 ${className}`}>
      {children}
    </div>
  )
}

interface ModalTitleProps {
  children: ReactNode
  className?: string
}

export function ModalTitle({ children, className = '' }: ModalTitleProps) {
  return (
    <h2 className={`text-xl font-semibold ${className}`}>
      {children}
    </h2>
  )
}

interface ModalContentProps {
  children: ReactNode
  className?: string
}

export function ModalContent({ children, className = '' }: ModalContentProps) {
  return (
    <div className={`px-6 pb-6 ${className}`}>
      {children}
    </div>
  )
}
