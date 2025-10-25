import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/authStore'
import { Smile, Image, Mic, Video } from 'lucide-react'
import { RichTextEditor } from '@/components/editor/RichTextEditor'

interface PostEditorProps {
  onPost: (content: string) => void
}

export function PostEditor({ onPost }: PostEditorProps) {
  const [content, setContent] = useState('')
  const { user, isAuthenticated } = useAuthStore()

  const handleSubmit = () => {
    if (!content.trim() || content === '<p></p>') return

    // If not authenticated, open login modal (placeholder for now)
    if (!isAuthenticated) {
      alert('Please sign in to publish your post')
      // TODO: Open sign-in modal instead of alert
      return
    }

    onPost(content)
    setContent('')
  }

  const handlePlaceholderClick = () => {
    alert('Function not implemented')
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="space-y-4">
          <RichTextEditor
            content={content}
            onChange={setContent}
            placeholder={isAuthenticated ? `What's on your mind, ${user?.name}?` : "Share your travel stories..."}
          />

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePlaceholderClick}
                className="text-muted-foreground"
              >
                <Smile className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePlaceholderClick}
                className="text-muted-foreground"
              >
                <Image className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePlaceholderClick}
                className="text-muted-foreground"
              >
                <Mic className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePlaceholderClick}
                className="text-muted-foreground"
              >
                <Video className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={handleSubmit} disabled={!content.trim() || content === '<p></p>'}>
                Publish
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
