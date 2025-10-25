import { useState } from 'react'
import type { Editor } from '@tiptap/react'
import type { LucideProps } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ALargeSmall, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Magnetic } from '@/components/ui/magnetic'
import { BoldIcon, ItalicIcon, UnderlineIcon, ListIcon, ListOrderedIcon, QuoteIcon, CodeIcon, TrashIcon } from '@/components/icons'

import { EmojiPickerButton } from './EmojiPicker'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

interface ToolbarButtonConfig {
  icon: React.ComponentType<LucideProps>
  action: (editor: Editor) => void
  type: 'button' | 'separator' | 'space'
}

interface HeadingOption {
  value: string
  label: string
  level?: HeadingLevel
}

const HEADING_OPTIONS: HeadingOption[] = [
  { value: 'h1', label: 'Heading 1', level: 1 },
  { value: 'h2', label: 'Heading 2', level: 2 },
  { value: 'h3', label: 'Heading 3', level: 3 },
  { value: 'h4', label: 'Heading 4', level: 4 },
  { value: 'h5', label: 'Heading 5', level: 5 },
  { value: 'h6', label: 'Heading 6', level: 6 },
  { value: 'paragraph', label: 'Paragraph' },
]

const getHeadingSize = (value: string): string => {
  switch (value) {
    case 'h1':
      return 'text-2xl font-bold'
    case 'h2':
      return 'text-xl font-bold'
    case 'h3':
      return 'text-lg font-semibold'
    case 'h4':
      return 'text-base font-semibold'
    case 'h5':
      return 'text-sm font-semibold'
    case 'h6':
      return 'text-xs font-semibold'
    default:
      return 'text-sm'
  }
}

const TOOLBAR_BUTTONS: ToolbarButtonConfig[] = [
  { icon: BoldIcon, action: (e) => e.chain().focus().toggleBold().run(), type: 'space' },
  { icon: ItalicIcon, action: (e) => e.chain().focus().toggleItalic().run(), type: 'button' },
  { icon: UnderlineIcon, action: (e) => e.chain().focus().toggleUnderline().run(), type: 'button' },
  { icon: ListIcon, action: (e) => e.chain().focus().toggleBulletList().run(), type: 'separator' },
  { icon: ListOrderedIcon, action: (e) => e.chain().focus().toggleOrderedList().run(), type: 'button' },
  { icon: QuoteIcon, action: (e) => e.chain().focus().toggleBlockquote().run(), type: 'separator' },
  { icon: CodeIcon, action: (e) => e.chain().focus().toggleCodeBlock().run(), type: 'button' },
]

const BUTTON_CLASSES = 'bg-inherit rounded-md hover:bg-white/90'
const ICON_CLASSES = 'w-3.5 h-3.5 text-black/54'

interface EditorToolbarProps {
  editor: Editor | null
}

const HeadingSelector = ({ editor }: { editor: Editor }) => {
  const handleHeadingChange = (value: string) => {
    const option = HEADING_OPTIONS.find((opt) => opt.value === value)
    if (option?.level) {
      editor.chain().focus().setHeading({ level: option.level }).run()
    } else {
      editor.chain().focus().setParagraph().run()
    }
  }

  return (
    <Select onValueChange={handleHeadingChange} defaultValue="paragraph">
      <SelectTrigger className="size-8 w-fit text-xs bg-white border-0">
        <SelectValue placeholder="Paragraph" />
      </SelectTrigger>
      <SelectContent>
        {HEADING_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value} className={getHeadingSize(option.value)}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

const ToolbarButton = ({ icon: Icon, action, editor }: { icon: React.ComponentType<LucideProps>; action: (editor: Editor) => void; editor: Editor }) => (
  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
    <Button size="icon-sm" variant="ghost" onClick={() => action(editor)} className={BUTTON_CLASSES}>
      <Icon className={ICON_CLASSES} />
    </Button>
  </motion.div>
)

const EmojiButton = ({ editor }: { editor: Editor }) => (
  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
    <EmojiPickerButton editor={editor} />
  </motion.div>
)

export function EditorToolbar({ editor }: EditorToolbarProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!editor) return null

  return (
    <div className="flex items-center gap-2 w-full">
      {/* Desktop: Full toolbar always visible */}
      <div className="hidden md:flex items-center gap-2 flex-1">
        <div className="px-1 flex items-center gap-1 bg-black/3 rounded-lg h-11 min-w-0 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-1 flex-nowrap">
            <HeadingSelector editor={editor} />

            {TOOLBAR_BUTTONS.map(({ icon, action, type }, index) => (
              <div key={index} className="contents">
                {type === 'space' && <div className="w-px shrink-0" />}
                {type === 'separator' && <div className="w-px h-6 bg-black/10 mx-1 shrink-0" />}
                <ToolbarButton icon={icon} action={action} editor={editor} />
              </div>
            ))}

            <div className="w-px h-6 bg-black/10 mx-1 shrink-0" />
            <EmojiButton editor={editor} />
          </div>
        </div>
      </div>

      {/* Mobile: Collapsible toolbar */}
      <div className="flex md:hidden items-center gap-2 flex-1 min-w-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            // Collapsed state
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1 px-1 bg-black/3 rounded-lg h-11 shrink-0"
            >
              <HeadingSelector editor={editor} />
              <div className="w-px h-6 bg-black/10 mx-1" />
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsExpanded(true)}
                  className="bg-inherit rounded-md hover:bg-white/90 h-8 px-2 font-semibold text-sm text-black/60"
                >
                  <ALargeSmall />
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            // Expanded state
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 flex-1 min-w-0"
            >
              <div className="px-1 flex items-center gap-1 bg-black/3 rounded-lg h-11 shrink-0">
                <HeadingSelector editor={editor} />
                <div className="w-px h-6 bg-black/10 mx-1" />
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    onClick={() => setIsExpanded(false)}
                    className="bg-inherit rounded-md hover:bg-white/90"
                  >
                    <X className="w-3.5 h-3.5 text-black/54" />
                  </Button>
                </motion.div>
              </div>

              <div className="px-1 flex items-center gap-1 bg-black/3 rounded-lg h-11 overflow-x-auto flex-1 min-w-0 scrollbar-hide">
                <div className="flex items-center gap-1 flex-nowrap">
                  {TOOLBAR_BUTTONS.map(({ icon, action, type }, index) => (
                    <div key={index} className="contents">
                      {type === 'space' && <div className="w-px shrink-0" />}
                      {type === 'separator' && <div className="w-px h-6 bg-black/10 mx-1 shrink-0" />}
                      <ToolbarButton icon={icon} action={action} editor={editor} />
                    </div>
                  ))}

                  <div className="w-px h-6 bg-black/10 mx-1 shrink-0" />
                  <EmojiButton editor={editor} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Delete button - always visible */}
      <Magnetic strength={0.2}>
        <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => editor.commands.clearContent()}
            className="w-10 h-10 bg-red-500/15 rounded-lg hover:bg-red-500/25 shrink-0"
          >
            <TrashIcon className="w-3.5 h-3.5 text-[#D83B3B]" />
          </Button>
        </motion.div>
      </Magnetic>
    </div>
  )
}
