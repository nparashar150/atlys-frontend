import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@/test/test-utils'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Feed } from '@/pages/Feed'
import * as postsHooks from '@/hooks/usePosts'

// Mock the hooks module
vi.mock('@/hooks/usePosts')

describe('Feed Integration Tests', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: Infinity,
        },
      },
    })
  })

  it('should show skeletons while loading posts', () => {
    vi.spyOn(postsHooks, 'usePosts').mockReturnValue({
      query: {
        isLoading: true,
        isError: false,
        isSuccess: false,
        data: undefined,
        hasNextPage: false,
        isFetchingNextPage: false,
        fetchNextPage: vi.fn(),
        refetch: vi.fn(),
      },
      mutations: {
        create: {
          mutate: vi.fn(),
          isPending: false,
        },
        createComment: {
          mutate: vi.fn(),
        },
      },
    } as any)

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Feed />
      </QueryClientProvider>
    )

    // Check that skeleton elements are rendered
    const skeletons = container.querySelectorAll('[class*="animate-pulse"]')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('should render posts after loading completes', async () => {
    const mockPosts = [
      {
        id: '1',
        content: '<p>First test post</p>',
        emoji: '😊',
        author: {
          id: 'user-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://example.com/avatar.jpg',
        },
        createdAt: new Date('2025-01-01T12:00:00Z').toISOString(),
        comments: [],
      },
      {
        id: '2',
        content: '<p>Second test post</p>',
        emoji: '🎉',
        author: {
          id: 'user-2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          avatar: 'https://example.com/avatar2.jpg',
        },
        createdAt: new Date('2025-01-02T12:00:00Z').toISOString(),
        comments: [],
      },
    ]

    vi.spyOn(postsHooks, 'usePosts').mockReturnValue({
      query: {
        isLoading: false,
        isError: false,
        isSuccess: true,
        data: {
          pages: [
            {
              posts: mockPosts,
              nextCursor: null,
            },
          ],
          pageParams: [null],
        },
        hasNextPage: false,
        isFetchingNextPage: false,
        fetchNextPage: vi.fn(),
        refetch: vi.fn(),
      },
      mutations: {
        create: {
          mutate: vi.fn(),
          isPending: false,
        },
        createComment: {
          mutate: vi.fn(),
        },
      },
    } as any)

    render(
      <QueryClientProvider client={queryClient}>
        <Feed />
      </QueryClientProvider>
    )

    // Wait for posts to be rendered
    await waitFor(() => {
      expect(screen.getByText('First test post')).toBeInTheDocument()
      expect(screen.getByText('Second test post')).toBeInTheDocument()
    })

    // Check that both authors are rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })

  it('should show empty state when no posts are available', async () => {
    vi.spyOn(postsHooks, 'usePosts').mockReturnValue({
      query: {
        isLoading: false,
        isError: false,
        isSuccess: true,
        data: {
          pages: [
            {
              posts: [],
              nextCursor: null,
            },
          ],
          pageParams: [null],
        },
        hasNextPage: false,
        isFetchingNextPage: false,
        fetchNextPage: vi.fn(),
        refetch: vi.fn(),
      },
      mutations: {
        create: {
          mutate: vi.fn(),
          isPending: false,
        },
        createComment: {
          mutate: vi.fn(),
        },
      },
    } as any)

    render(
      <QueryClientProvider client={queryClient}>
        <Feed />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('No posts yet')).toBeInTheDocument()
    })
  })
})
