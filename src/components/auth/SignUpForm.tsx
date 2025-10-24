import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema, type SignUpFormData } from '@/lib/validations'
import { useAuthStore } from '@/stores/authStore'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface SignUpFormProps {
  onSuccess?: () => void
}

export function SignUpForm({ onSuccess }: SignUpFormProps) {
  const signup = useAuthStore(state => state.signup)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema)
  })

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true)

    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))

    signup(data.identifier, data.password)
    onSuccess?.()
    if (!onSuccess) {
      navigate('/')
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="identifier">Email or Username</Label>
        <Input
          id="identifier"
          type="text"
          placeholder="Choose a username or enter email"
          disabled={isLoading}
          {...register('identifier')}
        />
        {errors.identifier && (
          <p className="text-sm text-destructive">{errors.identifier.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Create a strong password"
          disabled={isLoading}
          {...register('password')}
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Must be at least 8 characters
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Re-enter your password"
          disabled={isLoading}
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Creating account...' : 'Sign Up'}
      </Button>

      {!onSuccess && (
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/signin" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      )}
    </form>
  )
}
