import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { LoginIcon, LogoutIcon } from '@/components/icons'
import { useAuthStore } from '@/stores/authStore'

export function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuthStore()

  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup'

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-lg font-bold hover:opacity-80 transition-opacity">
          foo-rum
        </Link>

        {isAuthPage ? (
          <Button variant="ghost" asChild>
            <Link to="/">Back to home</Link>
          </Button>
        ) : isAuthenticated ? (
          <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2">
            Logout
            <LogoutIcon size={16} strokeWidth={2} />
          </Button>
        ) : (
          <Button variant="ghost" asChild>
            <Link to="/signin" className="flex items-center gap-2">
              Login
              <LoginIcon size={16} strokeWidth={2} />
            </Link>
          </Button>
        )}
      </div>
    </header>
  )
}
