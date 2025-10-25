import { useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { useAuthStore } from '@/stores/authStore'
import { usePostsStore } from '@/stores/postsStore'
import { PostCard } from '@/components/post/PostCard'
import { PostEditor } from '@/components/post/PostEditor'
import type { Post, Comment } from '@/types/post'

const Feed = () => {
  const { isAuthenticated, user } = useAuthStore()
  const { posts, addPost, addComment, initializePosts } = usePostsStore()

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

  const handleAddComment = (postId: string, content: string) => {
    if (!user) return

    const newComment: Comment = {
      id: Date.now().toString(),
      postId,
      author: user,
      content,
      createdAt: new Date(),
      reactions: []
    }

    addComment(postId, newComment)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto max-w-2xl py-6 px-4">
        <div className="mb-6">
          <h1 className="text-xl font-bold mb-3">Feed</h1>
          {isAuthenticated && (
            <p className="text-sm text-muted-foreground">
              Welcome back, {user?.name}! 👋
            </p>
          )}
        </div>

        <PostEditor onPost={handleCreatePost} />

        <div className="space-y-10 mt-20">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onAddComment={handleAddComment}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Feed
