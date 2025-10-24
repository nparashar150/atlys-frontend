import { useState } from 'react'
import { useAuthStore } from '@/stores/authStore'

const Feed = () => {
  const { user, isAuthenticated, login, logout } = useAuthStore()
  const [error, setError] = useState('')

  const handleLogin = () => {
    const result = login('demo@example.com', 'password123')
    if (!result.success) {
      setError(result.error || 'Login failed')
    } else {
      setError('')
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Feed Page</h1>

      <div className="space-y-4">
        {isAuthenticated ? (
          <div>
            <p className="text-green-600 mb-2">✅ Logged in as: {user?.name}</p>
            <p className="text-sm text-gray-600 mb-4">Email: {user?.email}</p>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-4">❌ Not logged in</p>
            {error && (
              <p className="text-red-600 text-sm mb-4">❌ {error}</p>
            )}
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Test Login (demo@example.com)
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <p className="text-sm font-mono">
          Zustand is working! Check localStorage → "__atlys_frontend"
        </p>
      </div>
    </div>
  )
}

export default Feed
