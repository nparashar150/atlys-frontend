import { z } from 'zod'

// Custom validator for username or email
const usernameOrEmail = z.string().min(1, 'This field is required').refine(
  (value) => {
    // If it contains @, validate as email
    if (value.includes('@')) {
      return z.string().email().safeParse(value).success
    }
    // Otherwise validate as username (3-20 chars, alphanumeric + underscore)
    return /^[a-zA-Z0-9_]{3,20}$/.test(value)
  },
  {
    message: 'Enter a valid email or username (3-20 characters, alphanumeric)'
  }
)

export const signInSchema = z.object({
  identifier: usernameOrEmail, // Can be username or email
  password: z.string().min(6, 'Password must be at least 6 characters')
})

export const signUpSchema = z.object({
  identifier: usernameOrEmail, // Can be username or email
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
})

export type SignInFormData = z.infer<typeof signInSchema>
export type SignUpFormData = z.infer<typeof signUpSchema>
