import type { Comment } from '@/types/post'
import { CommentCard } from './CommentCard'
import { CommentInput } from './CommentInput'
import { Separator } from '@/components/ui/separator'

interface CommentListProps {
  postId: string
  comments: Comment[]
  onAddComment: (content: string) => void
}

export function CommentList({ postId, comments, onAddComment }: CommentListProps) {
  return (
    <div className="mt-4">
      <Separator className="mb-4" />

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
