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
├── types/           # TypeScript types
└── utils/           # Helper functions
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Analyze bundle size
npm run build:analyze
```

## What Can Be Improved

| Area | Improvement | How |
|------|-------------|-----|
| **Testing** | Add unit & integration tests | Jest + React Testing Library |
| **Performance** | Optimize bundle size | Code splitting, tree shaking |
| **Accessibility** | ARIA labels & keyboard nav | Audit with axe-devtools |
| **Error Handling** | Better error boundaries | Implement global error handler |
| **Caching** | Optimistic updates | Improve TanStack Query mutations |
| **Real-time** | Live updates | WebSocket integration |
| **Image Optimization** | Lazy loading images | Add intersection observer |
| **PWA** | Offline support | Service worker implementation |
| **Backend** | Real API integration | Replace mock API with actual backend |
| **Security** | Sanitize user input | Already using DOMPurify, can enhance |

## Key Features Implemented

- Action resumption (login redirects back to intended action)
- Optimistic UI updates for better perceived performance
- Debounced API calls to reduce server load
- Lazy loading for code splitting
- Accessibility utilities (focus management, ARIA)
- Error logging utility
- Markdown shortcuts in editor (Cmd+B for bold, etc.)
- Mobile-optimized responsive layout

## Performance Optimizations

- React 19 compiler for automatic memoization
- Lazy route loading
- Query result caching (5min stale time)
- Reduced motion support for accessibility
- Bundle analysis tooling included
