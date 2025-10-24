import { Header } from '@/components/layout/Header'
import { useAuthStore } from '@/stores/authStore'
import { getDefaultMockPosts } from '@/data/mockPosts'
import { PostCard } from '@/components/post/PostCard'

const Feed = () => {
  const { isAuthenticated, user } = useAuthStore()
  const posts = getDefaultMockPosts()

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

        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Feed
