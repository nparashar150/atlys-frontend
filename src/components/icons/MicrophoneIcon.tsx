import type { LucideProps } from 'lucide-react'

export function MicrophoneIcon({
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
      viewBox="0 0 18 18"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M9 14.25C11.5714 14.25 15 12 15 8.25M9 14.25C6.42857 14.25 3 12 3 8.25M9 14.25V16.5M9 12C6.92893 12 5.25 10.3211 5.25 8.25V5.25C5.25 3.17893 6.92893 1.5 9 1.5C11.0711 1.5 12.75 3.17893 12.75 5.25V8.25C12.75 10.3211 11.0711 12 9 12Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
