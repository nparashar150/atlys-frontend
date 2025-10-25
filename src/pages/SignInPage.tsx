import { SignInForm } from '@/components/auth/SignInForm'
import { Header } from '@/components/layout/Header'

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <SignInForm />
        </div>
      </div>
    </div>
  )
}

export default SignInPage
