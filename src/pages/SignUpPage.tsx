import { Header } from '@/components/layout/Header'
import { SignUpForm } from '@/components/auth/SignUpForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto max-w-md py-16 px-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>
              Enter your details to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SignUpPage
