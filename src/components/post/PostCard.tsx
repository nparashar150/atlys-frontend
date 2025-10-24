import { formatDistanceToNow } from 'date-fns'
import type { Post } from '@/types/post'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
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
        <div className="flex items-center gap-6 text-sm text-muted-foreground pt-2 border-t">
          <button className="flex items-center gap-2 hover:text-foreground transition-colors py-2">
            <span>❤️</span>
            <span>{post.likes} likes</span>
          </button>
          <button className="flex items-center gap-2 hover:text-foreground transition-colors py-2">
            <span>💬</span>
            <span>{post.comments.length} comments</span>
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
