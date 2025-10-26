import type { Comment } from '@/types'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { formatDistanceToNow } from 'date-fns'

interface CommentCardProps {
  comment: Comment
}

export function CommentCard({ comment }: CommentCardProps) {
  const formattedTime = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })

  return (
    <article
      className="flex gap-3 py-3"
      role="comment"
      aria-label={`Comment by ${comment.author.name}`}
    >
      <Avatar className="w-8 h-8 rounded-lg">
        <AvatarImage
          src={comment.author.avatar}
          alt={`${comment.author.name}'s avatar`}
        />
        <AvatarFallback aria-label={comment.author.name}>
          {comment.author.name[0]}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <header className="flex items-center gap-2">
          <span className="font-semibold text-sm" aria-label="Comment author">
            {comment.author.name}
          </span>
          <time
            className="text-xs text-muted-foreground"
            dateTime={comment.createdAt}
            aria-label={`Posted ${formattedTime}`}
          >
            {formattedTime}
          </time>
        </header>
        <p className="text-sm mt-1">{comment.content}</p>
      </div>
    </article>
  )
}
