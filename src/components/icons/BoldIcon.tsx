import type { LucideProps } from 'lucide-react'

export function BoldIcon({
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
        d="M2.33332 7L9.04165 7C10.4914 7 11.6667 8.17525 11.6667 9.625C11.6667 11.0747 10.4914 12.25 9.04165 12.25L3.37035 12.25C2.79761 12.25 2.33332 11.7857 2.33332 11.213L2.33332 7ZM2.33332 7L7.29165 7C8.7414 7 9.91665 5.82475 9.91665 4.375C9.91665 2.92525 8.7414 1.75 7.29165 1.75L3.17591 1.75C2.71056 1.75 2.33332 2.12724 2.33332 2.59259L2.33332 7Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
