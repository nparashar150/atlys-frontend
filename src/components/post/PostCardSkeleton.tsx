import { AtlysCard } from '@/components/ui/atlys-card'
import { Skeleton } from '@/components/ui/skeleton'

export function PostCardSkeleton() {
  return (
    <AtlysCard
      body={
        <div className="p-4">
          <div className="grid grid-cols-[auto_auto_1fr] gap-x-1.5 gap-y-3">
            <Skeleton className="w-10 h-10 rounded-lg row-span-1" />
            <div className="w-1" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="w-8 h-8 rounded-full self-start justify-self-center" />
            <div className="w-1" />
            <div className="space-y-2">
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      }
      footer={
        <div className="px-4">
          <div className="flex items-center gap-4 mt-2">
            <Skeleton className="w-6 h-6 rounded-lg" />
            <Skeleton className="w-6 h-6 rounded-lg" />
            <Skeleton className="w-6 h-6 rounded-lg" />
          </div>
        </div>
      }
    />
  )
}
