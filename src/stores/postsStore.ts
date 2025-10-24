import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Post } from '@/types/post'
import { getDefaultMockPosts } from '@/data/mockPosts'

interface PostsStore {
  posts: Post[]
  addPost: (post: Post) => void
  initializePosts: () => void
}

export const usePostsStore = create<PostsStore>()(
  persist(
    (set, get) => ({
      posts: [],

      addPost: (post: Post) => {
        set({ posts: [post, ...get().posts] })
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
