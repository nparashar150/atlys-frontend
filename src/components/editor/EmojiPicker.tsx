import { useState } from 'react'
import EmojiPicker, { type EmojiClickData } from 'emoji-picker-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Smile } from 'lucide-react'
import type { Editor } from '@tiptap/react'

interface EmojiPickerButtonProps {
  editor: Editor | null
}

export function EmojiPickerButton({ editor }: EmojiPickerButtonProps) {
  const [open, setOpen] = useState(false)

  const onEmojiClick = (emojiData: EmojiClickData) => {
    if (editor) {
      editor.chain().focus().insertContent(emojiData.emoji).run()
      setOpen(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm">
          <Smile className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <EmojiPicker onEmojiClick={onEmojiClick} width="100%" />
      </PopoverContent>
    </Popover>
  )
}
