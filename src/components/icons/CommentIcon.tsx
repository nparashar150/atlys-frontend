import type { LucideProps } from 'lucide-react'

export function CommentIcon({
  size = 24,
  strokeWidth = 1.5,
  color = 'currentColor',
  className,
  ...props
}: LucideProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M4.5 5.25H10.5M4.5 8.25H7.5M13.2874 15.0224C13.1884 14.963 13.1389 14.9333 13.0896 14.9052C12.369 14.4948 11.5576 14.2701 10.7286 14.2513C10.6718 14.25 10.6141 14.25 10.4987 14.25H7.5C5.87228 14.25 5.05842 14.25 4.3928 14.0623C2.71847 13.5901 1.40993 12.2815 0.937724 10.6072C0.75 9.94158 0.75 9.12772 0.75 7.5C0.75 5.87228 0.75 5.05842 0.937724 4.3928C1.40993 2.71847 2.71847 1.40993 4.3928 0.937724C5.05842 0.75 5.87228 0.75 7.5 0.75H8.25C10.5797 0.75 11.7446 0.75 12.6634 1.1306C13.8886 1.63807 14.8619 2.61144 15.3694 3.83658C15.75 4.75544 15.75 5.92029 15.75 8.25V13.6281C15.75 13.8209 15.75 13.9173 15.7441 13.9836C15.6511 15.0295 14.5399 15.6586 13.5952 15.2003C13.5353 15.1712 13.4527 15.1216 13.2874 15.0224Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
