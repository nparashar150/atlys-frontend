import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchPosts, createPost, createComment } from '@/api/posts.api'
import { useAuthStore } from '@/stores/authStore'
import type { Post } from '@/types'

export function usePosts() {
  const queryClient = useQueryClient()
  const user = useAuthStore(state => state.user)

  const query = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const createMutation = useMutation({
    mutationFn: (content: string) => {
      if (!user) throw new Error('User not authenticated')
      return createPost(content, user)
    },
    onMutate: async (content) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] })

      const previousPosts = queryClient.getQueryData<Post[]>(['posts'])

      if (user) {
        const optimisticPost: Post = {
          id: `temp-${Date.now()}`,
          content,
          author: user,
          createdAt: new Date().toISOString(),
          emoji: '💭',
          comments: []
        }

        queryClient.setQueryData<Post[]>(['posts'], (old = []) => [
          optimisticPost,
          ...old
        ])
      }

      return { previousPosts }
    },
    onError: (_err, _content, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts)
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

      const previousPosts = queryClient.getQueryData<Post[]>(['posts'])

      if (user) {
        queryClient.setQueryData<Post[]>(['posts'], (old = []) =>
          old.map(post =>
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
        )
      }

      return { previousPosts }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts)
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
