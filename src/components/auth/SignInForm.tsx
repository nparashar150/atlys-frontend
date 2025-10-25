import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema, type SignInFormData } from '@/lib/validations'
import { useAuthStore } from '@/stores/authStore'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AtlysCard } from '@/components/ui/atlys-card'
import { LoginIcon } from '@/components/icons'

interface SignInFormProps {
  onSuccess?: () => void
  onToggleMode?: () => void
}

export function SignInForm({ onSuccess, onToggleMode }: SignInFormProps) {
  const login = useAuthStore(state => state.login)
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true)
    setError('')

    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))

    const result = login(data.identifier, data.password)

    if (result.success) {
      onSuccess?.()
      if (!onSuccess) {
        navigate('/')
      }
    } else {
      setError(result.error || 'Login failed')
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              <h2 className="text-xl font-medium text-black/90 mb-2">Sign in to continue</h2>
              <p className="text-sm text-black/50">Sign in to access all the features on this app</p>
            </div>

            {/* Input fields */}
            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="identifier" className="block text-sm font-medium text-black/75 mb-2">
                  Email or Username
                </Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="Enter your email or username"
                  autoComplete="username"
                  disabled={isLoading}
                  className="w-full h-11 bg-black/[0.03] border-black/10"
                  {...register('identifier')}
                />
                {errors.identifier && (
                  <p className="text-sm text-destructive mt-1">{errors.identifier.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-black/75 mb-2">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={isLoading}
                  className="w-full h-11 bg-black/[0.03] border-black/10"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
                )}
              </div>
            </div>

            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md mb-4">
                {error}
              </div>
            )}

            {/* Sign in button */}
            <Button type="submit" className="w-full h-11 bg-[#5057EA] hover:bg-[#5057EA]/90 font-medium" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </div>
        }
        footer={
          <div className="px-6 py-3">
            <p className="text-sm text-black/50 text-center">
              Do not have an account?{' '}
              {onToggleMode ? (
                <button type="button" onClick={onToggleMode} className="text-[#5057EA] font-medium">
                  Sign Up
                </button>
              ) : (
                <Link to="/signup" className="text-[#5057EA] font-medium">
                  Sign Up
                </Link>
              )}
            </p>
          </div>
        }
      />
    </form>
  )
}
