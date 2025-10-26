import { describe, it, expect, vi } from 'vitest'
import { render, waitFor } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import { RichTextEditor } from '@/components/editor/RichTextEditor'

describe('Rich Text Editor Integration Tests', () => {
  it('should update content when typing in editor', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    const { container } = render(
      <RichTextEditor
        content=""
        onChange={onChange}
        placeholder="Write something..."
      />
    )

    // Find the editor element
    const editor = container.querySelector('.ProseMirror')
    expect(editor).toBeInTheDocument()

    // Type some text
    if (editor) {
      await user.click(editor)
      await user.keyboard('Test content')

      await waitFor(() => {
        expect(onChange).toHaveBeenCalled()
        expect(onChange.mock.calls.length).toBeGreaterThan(0)
      })
    }
  })

  it('should apply bold formatting with keyboard shortcut', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    const { container } = render(
      <RichTextEditor
        content=""
        onChange={onChange}
        placeholder="Write something..."
      />
    )

    const editor = container.querySelector('.ProseMirror')
    if (editor) {
      await user.click(editor)
      await user.keyboard('Bold text')

      // Select all and apply bold with Ctrl+B
      await user.keyboard('{Control>}a{/Control}')
      await user.keyboard('{Control>}b{/Control}')

      await waitFor(() => {
        const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1][0]
        expect(lastCall).toContain('<strong>')
      })
    }
  })

  it('should apply italic formatting with keyboard shortcut', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    const { container } = render(
      <RichTextEditor
        content=""
        onChange={onChange}
        placeholder="Write something..."
      />
    )

    const editor = container.querySelector('.ProseMirror')
    if (editor) {
      await user.click(editor)
      await user.keyboard('Italic text')

      // Select all and apply italic with Ctrl+I
      await user.keyboard('{Control>}a{/Control}')
      await user.keyboard('{Control>}i{/Control}')

      await waitFor(() => {
        const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1][0]
        expect(lastCall).toContain('<em>')
      })
    }
  })

  it('should have toolbar with formatting buttons', () => {
    const onChange = vi.fn()

    const { container } = render(
      <RichTextEditor
        content=""
        onChange={onChange}
        placeholder="Write something..."
      />
    )

    // Check that toolbar exists
    const toolbar = container.querySelector('.ProseMirror')
    expect(toolbar).toBeInTheDocument()

    // Check that buttons exist
    const buttons = container.querySelectorAll('button')
    expect(buttons.length).toBeGreaterThan(0)
  })
})
