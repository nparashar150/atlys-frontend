import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MotionConfig } from 'framer-motion'
import { Feed } from '@/pages/Feed'
import { ToastContainer } from '@/components/ui/toast'
import { PageLoadingSkeleton } from '@/components/ui/PageLoadingSkeleton'

// Lazy load auth pages
const SignInPage = lazy(() => import('@/pages/SignInPage'))
const SignUpPage = lazy(() => import('@/pages/SignUpPage'))

// Lazy load devtools (dev only)
const ReactQueryDevtools = lazy(() =>
  import('@tanstack/react-query-devtools').then((m) => ({
    default: m.ReactQueryDevtools,
  }))
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
})

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<PageLoadingSkeleton />}>
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        {import.meta.env.DEV && (
          <Suspense fallback={null}>
            <ReactQueryDevtools initialIsOpen={false} />
          </Suspense>
        )}
      </QueryClientProvider>
    </MotionConfig>
  )
}
