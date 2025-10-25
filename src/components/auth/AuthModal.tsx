import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 border-0 bg-transparent shadow-none [&>button]:hidden">
        {mode === 'signin' ? (
          <SignInForm onSuccess={handleSuccess} onToggleMode={toggleMode} />
        ) : (
          <SignUpForm onSuccess={handleSuccess} onToggleMode={toggleMode} />
        )}
      </DialogContent>
    </Dialog>
  )
}
