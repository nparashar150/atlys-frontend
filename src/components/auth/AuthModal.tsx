import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Modal } from '@/components/ui/modal'
import { SignInForm } from './SignInForm'
import { SignUpForm } from './SignUpForm'

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultMode?: 'signin' | 'signup'
}

export function AuthModal({ open, onOpenChange, defaultMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode)

  const handleSuccess = () => {
    onOpenChange(false)
  }

  const toggleMode = () => {
    setMode((prev) => (prev === 'signin' ? 'signup' : 'signin'))
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <AnimatePresence mode="wait">
        {mode === 'signin' ? (
          <motion.div
            key="signin"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <SignInForm onSuccess={handleSuccess} onToggleMode={toggleMode} />
          </motion.div>
        ) : (
          <motion.div
            key="signup"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <SignUpForm onSuccess={handleSuccess} onToggleMode={toggleMode} />
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  )
}

export default AuthModal
