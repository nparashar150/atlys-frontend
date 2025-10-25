import { useEditor, EditorContent } from '@tiptap/react'
import { useEffect } from 'react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Code from '@tiptap/extension-code'
import Heading from '@tiptap/extension-heading'
import Blockquote from '@tiptap/extension-blockquote'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import CodeBlock from '@tiptap/extension-code-block'
import HardBreak from '@tiptap/extension-hard-break'
import History from '@tiptap/extension-history'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorToolbar } from './EditorToolbar'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
  onSubmit?: () => void
}

export function RichTextEditor({ content, onChange, placeholder, onSubmit }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Strike,
      Code,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
        HTMLAttributes: {
          class: 'heading',
        },
      }),
      Blockquote,
      BulletList,
      OrderedList,
      ListItem,
      CodeBlock,
      HardBreak,
      History,
      Underline,
      Placeholder.configure({
        placeholder: placeholder || "What's on your mind?",
        emptyEditorClass: 'is-editor-empty'
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-30 max-h-60 overflow-y-auto p-4 text-sm'
      }
    },
    enableInputRules: true,
    enablePasteRules: true,
  })

  // Handle keyboard shortcut for submit
  useEffect(() => {
    if (!editor || !onSubmit) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        event.preventDefault()
        event.stopPropagation()
        onSubmit()
      }
    }

    const editorElement = editor.view.dom
    editorElement.addEventListener('keydown', handleKeyDown, { capture: true })

    return () => {
      editorElement.removeEventListener('keydown', handleKeyDown, { capture: true })
    }
  }, [editor, onSubmit])

  // Sync editor content when content prop changes (for clearing after submit)
  useEffect(() => {
    if (!editor) return

    const currentContent = editor.getHTML()
    // Only update if content has actually changed and is different from current
    if (content !== currentContent) {
      editor.commands.setContent(content, { emitUpdate: false })
    }
  }, [editor, content])

  return (
    <div>
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
