import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useAuthStore } from '@/stores/authStore'

interface CommentInputProps {
  postId: string
  onComment: (content: string) => void
}

export function CommentInput({ postId, onComment }: CommentInputProps) {
  const [content, setContent] = useState('')
  const { isAuthenticated } = useAuthStore()

  const handleSubmit = () => {
    if (!content.trim()) return
    onComment(content)
    setContent('')
  }

  if (!isAuthenticated) {
    return (
      <p className="text-sm text-muted-foreground text-center py-4">
        Sign in to comment
      </p>
    )
  }

  return (
    <div className="flex gap-2">
      <Textarea
        placeholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 min-h-10"
      />
      <Button onClick={handleSubmit} disabled={!content.trim()}>
        Post
      </Button>
    </div>
  )
}
