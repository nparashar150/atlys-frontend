import { useState, Suspense, lazy } from 'react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { Smile } from 'lucide-react'
import type { Editor } from '@tiptap/react'

interface EmojiPickerButtonProps {
  editor: Editor | null
}

interface EmojiData {
  native: string
}

// Lazy load the emoji picker component with data
const LazyEmojiPicker = lazy(async () => {
  const [{ default: data }, { default: Picker }] = await Promise.all([
    import('@emoji-mart/data'),
    import('@emoji-mart/react')
  ])

  return {
    default: ({ onEmojiSelect }: { onEmojiSelect: (emoji: EmojiData) => void }) => (
      <Picker data={data} onEmojiSelect={onEmojiSelect} theme="light" />
    )
  }
})

const EmojiPickerSkeleton = () => (
  <div className="w-80 p-3 space-y-3">
    {/* Search bar skeleton */}
    <Skeleton className="w-full h-9 rounded-lg" />

    {/* Categories skeleton */}
    <div className="flex gap-2">
      {Array.from({ length: 9 }).map((_, i) => (
        <Skeleton key={i} className="w-7 h-7 rounded-lg" />
      ))}
    </div>

    {/* Emoji grid skeleton */}
    <div className="grid grid-cols-9 gap-2">
      {Array.from({ length: 63 }).map((_, i) => (
        <Skeleton key={i} className="w-7 h-7 rounded-lg" />
      ))}
    </div>
  </div>
)

export function EmojiPickerButton({ editor }: EmojiPickerButtonProps) {
  const [open, setOpen] = useState(false)

  const onEmojiSelect = (emoji: EmojiData) => {
    if (editor) {
      editor.chain().focus().insertContent(emoji.native).run()
      setOpen(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0 rounded-md hover:bg-white/90"
        >
          <Smile className="w-3.5 h-3.5 text-black/75" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        {open && (
          <Suspense fallback={<EmojiPickerSkeleton />}>
            <LazyEmojiPicker onEmojiSelect={onEmojiSelect} />
          </Suspense>
        )}
      </PopoverContent>
    </Popover>
  )
}
