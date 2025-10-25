import type { Comment } from '@/types'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { formatDistanceToNow } from 'date-fns'

interface CommentCardProps {
  comment: Comment
}

export function CommentCard({ comment }: CommentCardProps) {
  return (
    <div className="flex gap-3 py-3">
      <Avatar className="w-8 h-8">
        <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
        <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">{comment.author.name}</span>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </span>
        </div>
        <p className="text-sm mt-1">{comment.content}</p>
      </div>
    </div>
  )
}
