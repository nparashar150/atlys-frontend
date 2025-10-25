import type { LucideProps } from 'lucide-react'

export function ListOrderedIcon({
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
        d="M5.25008 11.6667L12.8334 11.6667M5.25008 7.00008L12.8334 7.00008M5.25008 2.33341L12.8334 2.33341M2.04175 4.66674L2.04175 1.75008L1.16675 2.33337M2.04175 4.66674L1.16675 4.66674M2.04175 4.66674L2.91675 4.66671M1.16689 8.75008L2.91689 8.75008L2.91675 10.2084L1.16675 10.2084L1.16675 11.6667L2.91689 11.6667"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
