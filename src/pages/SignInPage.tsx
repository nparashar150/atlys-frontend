import { Header } from '@/components/layout/Header'
import { SignInForm } from '@/components/auth/SignInForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const SignInPage = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto max-w-md py-16 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
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
