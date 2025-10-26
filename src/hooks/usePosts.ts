import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchPosts, createPost, createComment, type FetchPostsResponse } from '@/api/posts.api'
import { useAuthStore } from '@/stores/authStore'
import { UI_CONFIG } from '@/config/ui.config'
import { logMutationError } from '@/utils/error-logger'
import type { Post } from '@/types'

export function usePosts() {
  const queryClient = useQueryClient()
  const user = useAuthStore(state => state.user)

  const query = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => fetchPosts({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: UI_CONFIG.QUERY.STALE_TIME_MS,
  })

  const createMutation = useMutation({
    mutationFn: ({ content, emoji }: { content: string; emoji: string }) => {
      if (!user) throw new Error('User not authenticated')
      return createPost(content, user, emoji)
    },
    /**
     * Optimistic update handler for post creation
     *
     * Flow:
     * 1. Cancel in-flight queries to prevent race conditions
     * 2. Snapshot current data for rollback on error
     * 3. Inject optimistic post at top of first page
     * 4. Return snapshot for error recovery
     *
     * Why optimistic? Provides instant UI feedback before server confirms
     */
    onMutate: async ({ content, emoji }) => {
      // Cancel in-flight queries to avoid race conditions
      await queryClient.cancelQueries({ queryKey: ['posts'] })

      // Snapshot current data for rollback on error
      const previousData = queryClient.getQueryData<{ pages: FetchPostsResponse[]; pageParams: number[] }>(['posts'])

      if (user) {
        // Create temporary post for instant UI feedback
        const optimisticPost: Post = {
          id: `temp-${Date.now()}`,
          content,
          author: user,
          createdAt: new Date().toISOString(),
          emoji,
          comments: []
        }

        // Inject optimistic post at the top of the first page
        queryClient.setQueryData<{ pages: FetchPostsResponse[]; pageParams: number[] }>(['posts'], (old) => {
          if (!old) return old
          return {
            ...old,
            pages: old.pages.map((page, pageIndex) =>
              pageIndex === 0
                ? { ...page, posts: [optimisticPost, ...page.posts] }
                : page
            )
          }
        })
      }

      return { previousData }
    },
    onError: (error, variables, context) => {
      // Log error for debugging and monitoring
      logMutationError('createPost', error as Error, {
        content: variables.content,
        emoji: variables.emoji,
      })

      // Rollback to previous state if mutation fails
      if (context?.previousData) {
        queryClient.setQueryData(['posts'], context.previousData)
      }
    },
    onSettled: () => {
      // Refetch to ensure data is in sync with server
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })

  const createCommentMutation = useMutation({
    mutationFn: ({ postId, content }: { postId: string; content: string }) => {
      if (!user) throw new Error('User not authenticated')
      return createComment(postId, content, user)
    },
    /**
     * Optimistic update handler for comment creation
     *
     * Flow:
     * 1. Cancel in-flight queries to prevent race conditions
     * 2. Snapshot current data for rollback on error
     * 3. Find target post and append optimistic comment
     * 4. Return snapshot for error recovery
     *
     * Why optimistic? Provides instant comment visibility before server confirms
     */
    onMutate: async ({ postId, content }) => {
      // Cancel in-flight queries to avoid race conditions
      await queryClient.cancelQueries({ queryKey: ['posts'] })

      // Snapshot current data for rollback on error
      const previousData = queryClient.getQueryData<{ pages: FetchPostsResponse[]; pageParams: number[] }>(['posts'])

      if (user) {
        // Traverse all pages and find the target post to add comment
        queryClient.setQueryData<{ pages: FetchPostsResponse[]; pageParams: number[] }>(['posts'], (old) => {
          if (!old) return old
          return {
            ...old,
            pages: old.pages.map(page => ({
              ...page,
              posts: page.posts.map(post =>
                post.id === postId
                  ? {
                      ...post,
                      comments: [
                        ...post.comments,
                        {
                          id: `temp-${Date.now()}`,
                          postId,
                          content,
                          author: user,
                          createdAt: new Date().toISOString()
                        }
                      ]
                    }
                  : post
              )
            }))
          }
        })
      }

      return { previousData }
    },
    onError: (error, variables, context) => {
      // Log error for debugging and monitoring
      logMutationError('createComment', error as Error, {
        postId: variables.postId,
        content: variables.content,
      })

      // Rollback to previous state if mutation fails
      if (context?.previousData) {
        queryClient.setQueryData(['posts'], context.previousData)
      }
    },
    onSettled: () => {
      // Refetch to ensure data is in sync with server
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })

  return {
    query,
    mutations: {
      create: createMutation,
      createComment: createCommentMutation
    }
  }
}
