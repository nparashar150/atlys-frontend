import { Header } from '@/components/layout/Header'
import { SignUpForm } from '@/components/auth/SignUpForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const SignUpPage = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto max-w-md py-16 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
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
