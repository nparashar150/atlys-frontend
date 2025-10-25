import { useEffect, useRef } from 'react'
import { Header } from '@/components/layout/Header'
import { useAuthStore } from '@/stores/authStore'
import { usePosts } from '@/hooks'
import { PostCard } from '@/components/post/PostCard'
import { PostCardSkeleton } from '@/components/post/PostCardSkeleton'
import { PostEditor } from '@/components/post/PostEditor'

export function Feed() {
  const { isAuthenticated, user } = useAuthStore()
  const { query, mutations } = usePosts()
  const observerTarget = useRef<HTMLDivElement>(null)

  const handleCreatePost = (content: string) => {
    mutations.create.mutate(content)
  }

  const handleAddComment = (postId: string, content: string) => {
    mutations.createComment.mutate({ postId, content })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && query.hasNextPage && !query.isFetchingNextPage) {
          query.fetchNextPage()
        }
      },
      { threshold: 0.1 }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [query.hasNextPage, query.isFetchingNextPage, query.fetchNextPage])

  const allPosts = query.data?.pages.flatMap(page => page.posts) ?? []

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
          <>
            <div className="space-y-10 mt-20">
              {allPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onAddComment={handleAddComment}
                />
              ))}
            </div>

            {query.isFetchingNextPage && (
              <div className="space-y-10 mt-10">
                {Array.from({ length: 2 }).map((_, i) => (
                  <PostCardSkeleton key={`loading-${i}`} />
                ))}
              </div>
            )}

            {query.hasNextPage && <div ref={observerTarget} className="h-10" />}

            {!query.hasNextPage && allPosts.length > 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                You've reached the end
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
