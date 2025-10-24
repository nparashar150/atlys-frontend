import { Header } from '@/components/layout/Header'
import { useAuthStore } from '@/stores/authStore'

const Feed = () => {
  const { isAuthenticated, user } = useAuthStore()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto max-w-2xl py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Feed</h1>
          {isAuthenticated && (
            <p className="text-muted-foreground">
              Welcome back, {user?.name}! 👋
            </p>
          )}
        </div>

        <div className="text-center py-12">
          <p className="text-muted-foreground">Feed content coming soon...</p>
        </div>
      </div>
    </div>
  )
}

export default Feed
