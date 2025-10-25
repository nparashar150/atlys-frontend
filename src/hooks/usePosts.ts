import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchPosts, createPost, createComment, type FetchPostsResponse } from '@/api/posts.api'
import { useAuthStore } from '@/stores/authStore'
import type { Post } from '@/types'

export function usePosts() {
  const queryClient = useQueryClient()
  const user = useAuthStore(state => state.user)

  const query = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => fetchPosts({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const createMutation = useMutation({
    mutationFn: (content: string) => {
      if (!user) throw new Error('User not authenticated')
      return createPost(content, user)
    },
    onMutate: async (content) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] })

      const previousData = queryClient.getQueryData<{ pages: FetchPostsResponse[]; pageParams: number[] }>(['posts'])

      if (user) {
        const optimisticPost: Post = {
          id: `temp-${Date.now()}`,
          content,
          author: user,
          createdAt: new Date().toISOString(),
          emoji: '💭',
          comments: []
        }

        queryClient.setQueryData<{ pages: FetchPostsResponse[]; pageParams: number[] }>(['posts'], (old) => {
          if (!old) return old
          return {
            ...old,
            pages: old.pages.map((page, index) =>
              index === 0
                ? { ...page, posts: [optimisticPost, ...page.posts] }
                : page
            )
          }
        })
      }

      return { previousData }
    },
    onError: (_err, _content, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['posts'], context.previousData)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })

  const createCommentMutation = useMutation({
    mutationFn: ({ postId, content }: { postId: string; content: string }) => {
      if (!user) throw new Error('User not authenticated')
      return createComment(postId, content, user)
    },
    onMutate: async ({ postId, content }) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] })

      const previousData = queryClient.getQueryData<{ pages: FetchPostsResponse[]; pageParams: number[] }>(['posts'])

      if (user) {
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
    onError: (_err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['posts'], context.previousData)
      }
    },
    onSettled: () => {
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
