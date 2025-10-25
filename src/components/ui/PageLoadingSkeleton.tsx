export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header skeleton */}
      <div className="border-b border-border">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="h-8 w-32 bg-muted animate-pulse rounded" />
          <div className="h-10 w-24 bg-muted animate-pulse rounded" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="container mx-auto max-w-2xl py-12 px-4 sm:px-6">
        <div className="bg-card rounded-lg p-8 shadow-sm">
          {/* Title skeleton */}
          <div className="flex justify-center mb-6">
            <div className="h-12 w-12 bg-muted animate-pulse rounded-full" />
          </div>

          {/* Text skeleton */}
          <div className="space-y-4 mb-8">
            <div className="h-6 bg-muted animate-pulse rounded w-3/4 mx-auto" />
            <div className="h-4 bg-muted animate-pulse rounded w-2/3 mx-auto" />
          </div>

          {/* Form fields skeleton */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="h-4 w-16 bg-muted animate-pulse rounded" />
              <div className="h-11 bg-muted animate-pulse rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-20 bg-muted animate-pulse rounded" />
              <div className="h-11 bg-muted animate-pulse rounded" />
            </div>
            <div className="h-11 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}
