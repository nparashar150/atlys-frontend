import { SignUpForm } from '@/components/auth/SignUpForm'
import { Header } from '@/components/layout/Header'

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <SignUpForm />
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
