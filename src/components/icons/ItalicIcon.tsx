import type { LucideProps } from 'lucide-react'

export function ItalicIcon({
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
        d="M5.24984 1.75005L11.0832 1.75005M2.91651 12.25L8.74984 12.25M8.16651 1.75005L5.83317 12.25"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
