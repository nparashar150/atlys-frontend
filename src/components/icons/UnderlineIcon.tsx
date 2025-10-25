import type { LucideProps } from 'lucide-react'

export function UnderlineIcon({
  size = 24,
  strokeWidth = 1.5,
  color = 'currentColor',
  className,
  ...props
}: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M3.49988 12.25L10.4999 12.25M10.4999 1.75002L10.4999 6.41668C10.4999 8.34968 8.93288 9.91668 6.99988 9.91668C5.06688 9.91668 3.49988 8.34968 3.49988 6.41668L3.49988 1.75002"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
