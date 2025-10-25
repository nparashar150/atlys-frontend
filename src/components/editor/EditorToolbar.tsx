import type { Editor } from '@tiptap/react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Bold, Italic, Underline, List, ListOrdered, Quote, Code, Heading1, Heading2 } from 'lucide-react'

interface ToolbarButtonConfig {
  icon: LucideIcon
  action: (editor: Editor) => void
  type: 'button' | 'separator'
}

const TOOLBAR_BUTTONS: ToolbarButtonConfig[] = [
  { icon: Bold, action: (e) => e.chain().focus().toggleBold().run(), type: 'button' },
  { icon: Italic, action: (e) => e.chain().focus().toggleItalic().run(), type: 'button' },
  { icon: Underline, action: (e) => e.chain().focus().toggleUnderline().run(), type: 'button' },
  { icon: List, action: (e) => e.chain().focus().toggleBulletList().run(), type: 'separator' },
  { icon: ListOrdered, action: (e) => e.chain().focus().toggleOrderedList().run(), type: 'button' },
  { icon: Quote, action: (e) => e.chain().focus().toggleBlockquote().run(), type: 'separator' },
  { icon: Code, action: (e) => e.chain().focus().toggleCodeBlock().run(), type: 'button' },
  { icon: Heading1, action: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(), type: 'separator' },
  { icon: Heading2, action: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(), type: 'button' },
]

interface EditorToolbarProps {
  editor: Editor | null
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) return null

  return (
    <div className="border-b p-2 flex gap-1 flex-wrap">
      {TOOLBAR_BUTTONS.map(({ icon: Icon, action, type }, index) => (
        <div key={index} className="contents">
          {type === 'separator' && index > 0 && <div className="w-px bg-border mx-1" />}
          <Button variant="ghost" size="sm" onClick={() => action(editor)}>
            <Icon className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}
