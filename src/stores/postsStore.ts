import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Post, Comment } from '@/types/post'
import { getDefaultMockPosts } from '@/data/mockPosts'

interface PostsStore {
  posts: Post[]
  addPost: (post: Post) => void
  addComment: (postId: string, comment: Comment) => void
  initializePosts: () => void
}

export const usePostsStore = create<PostsStore>()(
  persist(
    (set, get) => ({
      posts: [],

      addPost: (post: Post) => {
        set({ posts: [post, ...get().posts] })
      },

      addComment: (postId: string, comment: Comment) => {
        set({
          posts: get().posts.map(post =>
            post.id === postId
              ? { ...post, comments: [...post.comments, comment] }
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
