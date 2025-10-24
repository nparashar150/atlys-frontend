import { Header } from '@/components/layout/Header'
import { SignInForm } from '@/components/auth/SignInForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto max-w-md py-16 px-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignInForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SignInPage
