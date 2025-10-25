import type { LucideProps } from 'lucide-react'

export function LogoutIcon({
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
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M16 8V7.50003C16 6.10444 16 5.40665 15.8278 4.83884C15.44 3.56045 14.4395 2.56005 13.1611 2.17225C12.5933 2 11.8956 2 10.5 2H8.4C6.15979 2 5.03969 2 4.18404 2.43597C3.43139 2.81947 2.81947 3.43139 2.43597 4.18404C2 5.03969 2 6.15979 2 8.4V15.6C2 17.8402 2 18.9603 2.43597 19.816C2.81947 20.5686 3.43139 21.1805 4.18404 21.564C5.03969 22 6.15979 22 8.4 22H10.5C11.8956 22 12.5933 22 13.1611 21.8278C14.4395 21.44 15.44 20.4395 15.8278 19.1611C16 18.5933 16 17.8956 16 16.5V16M22 12H7M7 12L11 8M7 12L11 16"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
