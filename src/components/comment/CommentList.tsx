import type { Comment } from '@/types'
import { CommentCard } from './CommentCard'
import { CommentInput } from './CommentInput'

interface CommentListProps {
  postId: string
  comments: Comment[]
  onAddComment: (content: string) => void
}

export function CommentList({ postId, comments, onAddComment }: CommentListProps) {
  return (
    <div>
      {comments.length === 0 ? (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground text-center py-2">
            No comments yet. Be the first to comment
          </p>
          <CommentInput postId={postId} onComment={onAddComment} />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            {comments.map(comment => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
          <CommentInput postId={postId} onComment={onAddComment} />
        </div>
      )}
    </div>
  )
}
