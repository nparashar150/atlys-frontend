import { useAuthStore } from '@/stores/authStore'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function Header() {
  const { user, isAuthenticated, logout } = useAuthStore()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
          Atlys Feed
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <span className="text-sm">
              Welcome, <span className="font-semibold">{user?.name}</span>
            </span>
            <Button variant="outline" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
