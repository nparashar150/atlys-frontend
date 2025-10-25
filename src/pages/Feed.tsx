import { Header } from '@/components/layout/Header'
import { useAuthStore } from '@/stores/authStore'
import { usePosts } from '@/hooks'
import { PostCard } from '@/components/post/PostCard'
import { PostCardSkeleton } from '@/components/post/PostCardSkeleton'
import { PostEditor } from '@/components/post/PostEditor'

export function Feed() {
  const { isAuthenticated, user } = useAuthStore()
  const { query, mutations } = usePosts()

  const handleCreatePost = (content: string) => {
    mutations.create.mutate(content)
  }

  const handleAddComment = (postId: string, content: string) => {
    mutations.createComment.mutate({ postId, content })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto max-w-2xl py-6 px-4">
        <div className="mb-6">
          {isAuthenticated && (
            <p className="text-sm text-muted-foreground">
              Welcome back, {user?.name}! 👋
            </p>
          )}
        </div>

        <PostEditor onPost={handleCreatePost} />

        {query.isLoading && (
          <div className="space-y-10 mt-20">
            {Array.from({ length: 3 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        )}

        {query.isError && (
          <div className="text-center py-8 text-destructive">
            Failed to load posts. Please try again.
          </div>
        )}

        {query.isSuccess && (
          <div className="space-y-10 mt-20">
            {query.data.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onAddComment={handleAddComment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
