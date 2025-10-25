import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface AtlysCardProps {
  children?: React.ReactNode
  body?: React.ReactNode
  footer?: React.ReactNode
  className?: string
  role?: string
  'aria-label'?: string
}

const AtlysCard = forwardRef<HTMLDivElement, AtlysCardProps>(
  ({ children, body, footer, className, ...props }, ref) => {
    const hasFooter = !!footer
    const content = body || children

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl bg-[#F7F7F7] shadow-[0_0_0_10px_#F7F7F7] overflow-hidden',
          className
        )}
        {...props}
      >
        <div className={cn('bg-white rounded-2xl border border-black/10')}>
          {content}
        </div>

        {/* Optional footer */}
        {hasFooter && <div className="rounded-b-2xl">{footer}</div>}
      </div>
    )
  }
)

AtlysCard.displayName = 'AtlysCard'
export { AtlysCard }
