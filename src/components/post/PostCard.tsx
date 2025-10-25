import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import type { Post } from '@/types/post'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Heart, MessageCircle, Share2 } from 'lucide-react'
import { CommentInput } from '@/components/comment/CommentInput'
import { usePostsStore } from '@/stores/postsStore'
import { useAuthStore } from '@/stores/authStore'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const addComment = usePostsStore(state => state.addComment)
  const user = useAuthStore(state => state.user)

  const handleLike = () => {
    alert('Like not implemented')
  }

  const handleCommentClick = () => {
    setShowComments(!showComments)
  }

  const handleAddComment = (content: string) => {
    if (!user) return
    addComment(post.id, content, user)
  }

  const handleShare = () => {
    alert('Share not implemented')
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        {/* Post Header */}
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{post.author.name}</p>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(post.createdAt, { addSuffix: true })}
            </p>
          </div>
        </div>

        {/* Post Content */}
        <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>

        {/* Post Actions */}
        <div className="flex items-center gap-4 pt-4 border-t">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors py-2 px-3 rounded-md hover:bg-accent"
          >
            <Heart className="w-4 h-4" />
            <span className="text-sm">{post.likes}</span>
          </button>

          <button
            onClick={handleCommentClick}
            className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 transition-colors py-2 px-3 rounded-md hover:bg-accent"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{post.comments.length}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-muted-foreground hover:text-green-500 transition-colors py-2 px-3 rounded-md hover:bg-accent"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm">Share</span>
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t space-y-4">
            {/* Existing Comments */}
            {post.comments.length > 0 && (
              <div className="space-y-3">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                      <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-accent rounded-lg px-3 py-2">
                        <p className="font-semibold text-sm">{comment.author.name}</p>
                        <p className="text-sm text-foreground">{comment.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 ml-3">
                        {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Comment Input */}
            <CommentInput postId={post.id} onComment={handleAddComment} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
