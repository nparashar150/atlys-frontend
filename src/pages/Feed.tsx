import { Header } from '@/components/layout/Header'
import { useAuthStore } from '@/stores/authStore'
import { getDefaultMockPosts } from '@/data/mockPosts'
import { formatDistanceToNow } from 'date-fns'

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
            <div
              key={post.id}
              className="border rounded-lg p-6 bg-card hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3 mb-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{post.author.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                  </p>
                </div>
              </div>

              <p className="text-foreground mb-4">{post.content}</p>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span>❤️ {post.likes} likes</span>
                <span>💬 {post.comments.length} comments</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Feed
