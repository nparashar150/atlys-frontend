import { useEffect, useRef } from 'react'
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
          <PostEditor onPost={handleCreatePost} />
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
            className="text-center py-8 text-destructive"
          >
            Failed to load posts. Please try again.
          </motion.div>
        )}

        {query.isSuccess && (
          <>
            <div className="space-y-10 mt-20">
              {allPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.3 }}
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
                    onAddComment={handleAddComment}
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
      </div>
    </div>
  )
}
