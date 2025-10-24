import { useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { useAuthStore } from '@/stores/authStore'
import { usePostsStore } from '@/stores/postsStore'
import { PostCard } from '@/components/post/PostCard'
import { PostEditor } from '@/components/post/PostEditor'
import type { Post } from '@/types/post'

const Feed = () => {
  const { isAuthenticated, user } = useAuthStore()
  const { posts, addPost, initializePosts } = usePostsStore()

  useEffect(() => {
    initializePosts()
  }, [initializePosts])

  const handleCreatePost = (content: string) => {
    if (!user) return

    const newPost: Post = {
      id: Date.now().toString(),
      content,
      author: user,
      createdAt: new Date(),
      likes: 0,
      likedBy: [],
      comments: [],
      media: []
    }

    addPost(newPost)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto max-w-2xl py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Feed</h1>
          {isAuthenticated && (
            <p className="text-muted-foreground">
              Welcome back, {user?.name}! 👋
            </p>
          )}
        </div>

        <PostEditor onPost={handleCreatePost} />

        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Feed
