import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Post, Comment, User } from '@/types/post'
import { getDefaultMockPosts } from '@/data/mockPosts'

interface PostsStore {
  posts: Post[]
  addPost: (post: Post) => void
  addComment: (postId: string, content: string, user: User) => void
  initializePosts: () => void
}

export const usePostsStore = create<PostsStore>()(
  persist(
    (set, get) => ({
      posts: [],

      addPost: (post: Post) => {
        set({ posts: [post, ...get().posts] })
      },

      addComment: (postId: string, content: string, user: User) => {
        const newComment: Comment = {
          id: Date.now().toString(),
          postId,
          author: user,
          content,
          createdAt: new Date(),
          reactions: []
        }

        set({
          posts: get().posts.map(post =>
            post.id === postId
              ? { ...post, comments: [...post.comments, newComment] }
              : post
          )
        })
      },

      initializePosts: () => {
        if (get().posts.length === 0) {
          set({ posts: getDefaultMockPosts() })
        }
      }
    }),
    {
      name: '__atlys_posts'
    }
  )
)
