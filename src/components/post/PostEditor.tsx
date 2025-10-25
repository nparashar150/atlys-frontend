import { useState } from 'react'
import { motion } from 'framer-motion'
import { AtlysCard } from '@/components/ui/atlys-card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { RichTextEditor } from '@/components/editor/RichTextEditor'
import { Magnetic } from '@/components/ui/magnetic'
import { useAuthModal } from '@/hooks'
import { MicrophoneIcon, VideoRecordIcon, SendIcon } from '@/components/icons'

interface PostEditorProps {
  onPost: (content: string) => void
}

export function PostEditor({ onPost }: PostEditorProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { requireAuth, AuthModalComponent } = useAuthModal()

  const handleSubmit = () => {
    if (!content.trim() || content === '<p></p>') return

    requireAuth(() => {
      setIsSubmitting(true)
      onPost(content)
      setContent('')

      // Reset submitting state after animation
      setTimeout(() => setIsSubmitting(false), 500)
    })
  }

  const handlePlaceholderClick = () => {
    alert('Function not implemented')
  }

  return (
    <>
      <AtlysCard className="p-0 overflow-hidden gap-0" role="form" aria-label="Create new post">
        {/* Editor with padding for content area */}
        <div className="p-2">
          <RichTextEditor
            content={content}
            onChange={setContent}
            placeholder="How are you feeling today?"
            onSubmit={handleSubmit}
          />
        </div>

        {/* Full-width separator */}
        <div className="w-full h-px bg-black/10" />

        {/* Footer section matching toolbar height */}
        <div className="flex items-center justify-between px-2 h-12">
          <div className="flex items-center gap-2">
            {/* Plus button with circle background */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="icon"
                variant="ghost"
                onClick={handlePlaceholderClick}
                className="bg-black/5 rounded-lg hover:bg-black/10"
                aria-label="Add attachment"
              >
                <Plus className="w-4 h-4 text-black/60" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="icon"
                variant="ghost"
                onClick={handlePlaceholderClick}
                className="hover:bg-black/10"
                aria-label="Add audio"
              >
                <MicrophoneIcon className="w-4 h-4 text-black/60" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="icon"
                variant="ghost"
                onClick={handlePlaceholderClick}
                className="hover:bg-black/10"
                aria-label="Add video"
              >
                <VideoRecordIcon className="w-4 h-4 text-black/60" />
              </Button>
            </motion.div>
          </div>

          {/* Send button */}
          <Magnetic strength={0.2}>
            <motion.div
              whileHover={!content.trim() || content === '<p></p>' ? {} : { scale: 1.1 }}
              whileTap={!content.trim() || content === '<p></p>' ? {} : { scale: 0.9 }}
              animate={isSubmitting ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Button
                size="icon"
                variant="ghost"
                onClick={handleSubmit}
                disabled={!content.trim() || content === '<p></p>'}
                className="hover:bg-black/10 disabled:opacity-50 p-0"
                aria-label="Post"
              >
                <SendIcon className="w-full h-full" color="#5057EA" />
              </Button>
            </motion.div>
          </Magnetic>
        </div>
      </AtlysCard>

      <AuthModalComponent />
    </>
  )
}
