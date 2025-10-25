import type { LucideProps } from 'lucide-react'

export function HeartIcon({
  size = 24,
  strokeWidth = 1.5,
  color = 'currentColor',
  fill = 'none',
  className,
  ...props
}: LucideProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 17 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M8.25 14.25C9 14.25 15.75 10.5002 15.75 5.25032C15.75 2.62542 13.5 0.783041 11.25 0.750485C10.125 0.734207 9 1.12549 8.25 2.25044C7.5 1.12549 6.35554 0.750486 5.25 0.750486C3 0.750486 0.75 2.62542 0.75 5.25032C0.75 10.5002 7.5 14.25 8.25 14.25Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={fill}
      />
    </svg>
  )
}
