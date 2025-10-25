import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema, type SignUpFormData } from '@/lib/validations'
import { useAuthStore } from '@/stores/authStore'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AtlysCard } from '@/components/ui/atlys-card'
import { LoginIcon } from '@/components/icons'

interface SignUpFormProps {
  onSuccess?: () => void
  onToggleMode?: () => void
}

export function SignUpForm({ onSuccess, onToggleMode }: SignUpFormProps) {
  const signup = useAuthStore(state => state.signup)
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema)
  })

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true)
    setError('')

    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))

    try {
      signup(data.identifier, data.password)
      onSuccess?.()
      if (!onSuccess) {
        navigate('/')
      }
    } catch (err) {
      setError('Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} aria-label="Sign up form">
      <AtlysCard
        body={
          <div className="p-6">
            {/* Center-aligned login icon */}
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <LoginIcon size={24} strokeWidth={2} className="text-black " />
              </div>
            </div>

            {/* Title and subtitle */}
            <div className="text-center mb-8">
              <h2 className="text-xl font-medium text-black/90 mb-2">Create an account to continue</h2>
              <p className="text-sm text-black/50">Create an account to access all the features on this app</p>
            </div>

            {/* Input fields */}
            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="identifier" className="block text-sm font-medium text-black/75 mb-2">
                  Email
                </Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="Enter your email"
                  autoComplete="username"
                  disabled={isLoading}
                  aria-label="Email"
                  aria-invalid={!!errors.identifier}
                  aria-describedby={errors.identifier ? "identifier-error" : undefined}
                  className="w-full h-11 bg-black/[0.03] border-black/10"
                  {...register('identifier')}
                />
                {errors.identifier && (
                  <p id="identifier-error" className="text-sm text-destructive mt-1" role="alert">
                    {errors.identifier.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-black/75 mb-2">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Choose a strong password"
                  autoComplete="new-password"
                  disabled={isLoading}
                  aria-label="Password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  className="w-full h-11 bg-black/[0.03] border-black/10"
                  {...register('password')}
                />
                {errors.password && (
                  <p id="password-error" className="text-sm text-destructive mt-1" role="alert">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md mb-4" role="alert" aria-live="polite">
                {error}
              </div>
            )}

            {/* Sign up button */}
            <Button
              type="submit"
              className="w-full h-11 bg-[#5057EA] hover:bg-[#5057EA]/90 font-medium"
              disabled={isLoading}
              aria-label={isLoading ? 'Creating account' : 'Create account'}
            >
              {isLoading ? 'Creating account...' : 'Continue'}
            </Button>
          </div>
        }
        footer={
          <div className="px-6 py-3">
            <p className="text-sm text-black/50 text-center">
              Already have an account?{' '}
              {onToggleMode ? (
                <button type="button" onClick={onToggleMode} className="text-[#5057EA] font-medium" aria-label="Switch to login">
                  Login →
                </button>
              ) : (
                <Link to="/signin" className="text-[#5057EA] font-medium" aria-label="Go to login page">
                  Login →
                </Link>
              )}
            </p>
          </div>
        }
      />
    </form>
  )
}
