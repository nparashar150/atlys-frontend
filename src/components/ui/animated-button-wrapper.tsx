import { motion } from 'framer-motion'
import { Magnetic } from './magnetic'

/**
 * Wraps buttons with magnetic effect and hover/tap animations
 *
 * Provides consistent interaction feedback across all action buttons.
 * Combines magnetic attraction effect with scale animations for engaging UX.
 *
 * @example
 * ```tsx
 * <AnimatedButtonWrapper>
 *   <Button onClick={handleClick}>
 *     <Icon />
 *   </Button>
 * </AnimatedButtonWrapper>
 * ```
 */
interface AnimatedButtonWrapperProps {
  /** Button element to wrap with animations */
  children: React.ReactNode
  /** Strength of magnetic attraction effect (0-1) */
  magneticStrength?: number
  /** Scale multiplier on hover (e.g., 1.1 = 110%) */
  hoverScale?: number
  /** Scale multiplier on tap/click (e.g., 0.95 = 95%) */
  tapScale?: number
}

export function AnimatedButtonWrapper({
  children,
  magneticStrength = 0.2,
  hoverScale = 1.1,
  tapScale = 0.95
}: AnimatedButtonWrapperProps) {
  return (
    <Magnetic strength={magneticStrength}>
      <motion.div
        whileHover={{ scale: hoverScale }}
        whileTap={{ scale: tapScale }}
      >
        {children}
      </motion.div>
    </Magnetic>
  )
}
