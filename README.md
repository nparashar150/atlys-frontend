# Atlys Frontend

A modern social media feed application built with React and TypeScript.

## What I Built

| Feature | Description | Why |
|---------|-------------|-----|
| **Authentication** | Sign in/Sign up with modal system | Smooth UX with action resumption after login |
| **Post Feed** | Infinite scrolling feed with posts | Core feature for content consumption |
| **Rich Text Editor** | Tiptap-based markdown editor | Better content creation experience |
| **Comments** | Nested comments on posts | User engagement |
| **Reactions** | Like posts with animation | Interactive feedback |
| **Emoji Picker** | Emoji support in posts/comments | Enhanced expression |
| **Responsive Design** | Mobile-first approach | Accessibility across devices |
| **Animations** | Framer Motion transitions | Polished UX |

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework with latest features |
| **TypeScript** | Type safety |
| **Vite** | Fast build tool |
| **TailwindCSS 4** | Styling with utility classes |
| **TanStack Query** | Server state management & caching |
| **Zustand** | Client state management |
| **React Router** | Routing |
| **Tiptap** | Rich text editing |
| **Framer Motion** | Animations |
| **React Hook Form + Zod** | Form handling & validation |
| **Radix UI** | Accessible component primitives |
| **Vitest** | Unit & integration testing |
| **Testing Library** | React component testing |

## Code Structure

```
src/
├── api/              # API layer (auth, posts)
├── components/       # React components
│   ├── auth/        # Authentication forms
│   ├── comment/     # Comment components
│   ├── editor/      # Rich text editor
│   ├── post/        # Post components
│   └── ui/          # Reusable UI components
├── config/          # App configuration
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── services/        # Business logic
├── stores/          # Zustand stores
├── test/            # Test setup & integration tests
├── types/           # TypeScript types
└── utils/           # Helper functions
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Analyze bundle size
pnpm build:analyze

# Run tests
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

## What Can Be Improved

| Area | Improvement | How |
|------|-------------|-----|
| **Testing** | Expand test coverage | Add unit tests for utilities & hooks |
| **Performance** | Reduce initial load time | Implement route-based code splitting, defer non-critical JS |
| **Accessibility** | Automated a11y testing | Add axe-devtools, fix keyboard navigation gaps |
| **Error Handling** | Global error boundaries | Implement React error boundaries for graceful failures |
| **Monitoring** | Performance tracking | Add Core Web Vitals monitoring, error tracking (Sentry) |
| **Image Optimization** | Responsive images | Add next-gen formats (WebP/AVIF), lazy loading with blur-up |
| **PWA** | Offline support | Service worker for offline-first experience |
| **Backend** | Real API integration | Replace mock API with actual backend |
| **Security** | Comprehensive XSS protection | Extend DOMPurify to comments and user-generated content |
| **Auth Security** | Secure token storage | Implement HTTP-only cookies, refresh token rotation |
| **Input Validation** | API response validation | Validate all API responses with Zod schemas |

## Key Features Implemented

- Action resumption (login redirects back to intended action)
- Optimistic UI updates for better perceived performance
- Query caching to minimize redundant API calls
- Lazy loading for code splitting (auth pages, devtools)
- Accessibility utilities (screen reader announcements, ARIA labels)
- Error logging utility (mutation, query, and general errors)
- Markdown shortcuts in editor (Cmd+B for bold, Cmd+I for italic)
- Mobile-optimized responsive layout
- Integration tests for core features (auth modal, RTE, feed)

## Performance Optimizations

- React 19 compiler for automatic memoization
- Lazy route loading
- Query result caching (5min stale time)
- Reduced motion support for accessibility
- Bundle analysis tooling included
