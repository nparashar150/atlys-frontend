import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthModal } from '@/hooks'

interface CommentInputProps {
  postId: string
  onComment: (content: string) => void
}

export function CommentInput({ postId, onComment }: CommentInputProps) {
  const [content, setContent] = useState('')
  const { requireAuth, AuthModalComponent } = useAuthModal()

  const handleSubmit = () => {
    if (!content.trim()) return

    requireAuth(() => {
      onComment(content)
      setContent('')
    })
  }

  return (
    <>
      <div className="flex gap-2">
        <Input
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit()
            }
          }}
        />
        <Button onClick={handleSubmit} disabled={!content.trim()} size="sm">
          Comment
        </Button>
      </div>

      <AuthModalComponent />
    </>
  )
}
