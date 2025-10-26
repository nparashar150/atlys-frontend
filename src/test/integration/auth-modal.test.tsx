import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import { PostCard } from '@/components/post/PostCard'
import type { Post } from '@/types'

describe('Auth Modal Integration Tests', () => {
  const mockPost: Post = {
    id: '1',
    content: '<p>Test post content</p>',
    emoji: '😊',
    author: {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://example.com/avatar.jpg',
    },
    createdAt: new Date('2025-01-01T12:00:00Z').toISOString(),
    comments: [],
  }

  const mockOnAddComment = vi.fn()

  it('should show login modal when unauthenticated user clicks like button', async () => {
    const user = userEvent.setup()
    render(<PostCard post={mockPost} onAddComment={mockOnAddComment} />)

    const likeButton = screen.getByLabelText('Like post')
    await user.click(likeButton)

    await waitFor(() => {
      expect(screen.getByText(/sign in to continue/i)).toBeInTheDocument()
    })
  })

  it('should show login modal when unauthenticated user clicks comment button', async () => {
    const user = userEvent.setup()
    render(<PostCard post={mockPost} onAddComment={mockOnAddComment} />)

    const commentButton = screen.getByLabelText('Show comments')
    await user.click(commentButton)

    await waitFor(() => {
      expect(screen.getByText(/sign in to continue/i)).toBeInTheDocument()
    })
  })

  it('should show login modal when unauthenticated user clicks share button', async () => {
    const user = userEvent.setup()
    render(<PostCard post={mockPost} onAddComment={mockOnAddComment} />)

    const shareButton = screen.getByLabelText('Share post')
    await user.click(shareButton)

    await waitFor(() => {
      expect(screen.getByText(/sign in to continue/i)).toBeInTheDocument()
    })
  })
})
