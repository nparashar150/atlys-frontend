import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema, type SignInFormData } from '@/lib/validations'
import { useAuthStore } from '@/stores/authStore'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface SignInFormProps {
  onSuccess?: () => void
}

export function SignInForm({ onSuccess }: SignInFormProps) {
  const login = useAuthStore(state => state.login)
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = (data: SignInFormData) => {
    const result = login(data.identifier, data.password)

    if (result.success) {
      setError('')
      onSuccess?.()
      if (!onSuccess) {
        navigate('/')
      }
    } else {
      setError(result.error || 'Login failed')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="identifier">Email or Username</Label>
        <Input
          id="identifier"
          type="text"
          placeholder="demo@example.com or username"
          {...register('identifier')}
        />
        {errors.identifier && (
          <p className="text-sm text-red-500 mt-1">{errors.identifier.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register('password')}
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500">❌ {error}</p>
      )}

      <Button type="submit" className="w-full">
        Sign In
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Demo: demo@example.com / password123
      </p>
    </form>
  )
}
