import { useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { useAuthStore } from '@/stores/authStore'
import { usePosts } from '@/hooks'
import { PostCard } from '@/components/post/PostCard'
import { PostCardSkeleton } from '@/components/post/PostCardSkeleton'
import { PostEditor } from '@/components/post/PostEditor'
import { getRandomEmoji } from '@/config/posts.config'

export function Feed() {
  const { isAuthenticated, user } = useAuthStore()
  const { query, mutations } = usePosts()
  const observerTarget = useRef<HTMLDivElement>(null)

  const handleCreatePost = (content: string) => {
    const emoji = getRandomEmoji()
    mutations.create.mutate({ content, emoji })
  }

  const handleAddComment = (postId: string, content: string) => {
    mutations.createComment.mutate({ postId, content })
  }

  // Stable callback for intersection observer
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage()
    }
  }, [query.hasNextPage, query.isFetchingNextPage, query.fetchNextPage])

  useEffect(() => {
    const currentTarget = observerTarget.current
    if (!currentTarget) return

    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 })
    observer.observe(currentTarget)

    return () => {
      observer.disconnect()
    }
  }, [handleIntersection])

  const allPosts = query.data?.pages.flatMap(page => page.posts) ?? []

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto max-w-2xl py-6 px-4 sm:px-6 w-full">
        <AnimatePresence mode="wait">
          {isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <p className="text-sm text-muted-foreground inline-flex items-center gap-1">
                Welcome back, {user?.name}!
                <picture className="inline-block">
                  <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.webp" type="image/webp" />
                  <img
                    src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.gif"
                    alt="👋"
                    width="20"
                    height="20"
                    className="inline-block"
                  />
                </picture>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <PostEditor onPost={handleCreatePost} isPublishing={mutations.create.isPending} />
        </motion.div>

        {query.isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-10 mt-20"
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))}
          </motion.div>
        )}

        {query.isError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-20 text-center py-12"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="text-6xl">😕</div>
              <h2 className="text-xl font-semibold text-foreground">Failed to load posts</h2>
              <p className="text-muted-foreground text-sm max-w-md">
                Something went wrong while fetching posts. Please check your connection and try again.
              </p>
              <button
                onClick={() => query.refetch()}
                className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        )}

        {query.isSuccess && (
          <>
            {allPosts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-20 text-center py-12"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="text-6xl">📝</div>
                  <h2 className="text-xl font-semibold text-foreground">No posts yet</h2>
                  <p className="text-muted-foreground text-sm max-w-md">
                    Be the first to share your thoughts! Create a post above to get started.
                  </p>
                </div>
              </motion.div>
            ) : (
              <>
                <div className="space-y-10 mt-20">
                  {allPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={index < 3 ? "onscreen" : "offscreen"}
                      whileInView="onscreen"
                      viewport={{ once: true, amount: 0.1 }}
                      variants={{
                        offscreen: {
                          y: 50,
                          opacity: 0,
                          scale: 0.95
                        },
                        onscreen: {
                          y: 0,
                          opacity: 1,
                          scale: 1,
                          transition: {
                            type: 'spring',
                            bounce: 0.1,
                            duration: 0.5
                          }
                        }
                      }}
                      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                    >
                      <PostCard
                        post={post}
                        onAddComment={(content) => handleAddComment(post.id, content)}
                      />
                    </motion.div>
                  ))}
                </div>

                {query.isFetchingNextPage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-10 mt-10"
                  >
                    {Array.from({ length: 2 }).map((_, i) => (
                      <PostCardSkeleton key={`loading-${i}`} />
                    ))}
                  </motion.div>
                )}

                {query.hasNextPage && <div ref={observerTarget} className="h-10" />}

                {!query.hasNextPage && allPosts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, type: 'spring', bounce: 0.3 }}
                    className="text-center py-8 text-muted-foreground text-sm"
                  >
                    You've reached the end
                  </motion.div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
