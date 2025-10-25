import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticCursorProps {
  magnetic?: boolean
  className?: string
}

export function MagneticCursor({ magnetic = true, className = '' }: MagneticCursorProps) {
  const [isPointer, setIsPointer] = useState(false)
  const [isMagnetic, setIsMagnetic] = useState(false)

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const magneticElementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Check if hovering over clickable element
      const isClickable =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.style.cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'pointer'

      setIsPointer(isClickable)

      if (magnetic && isClickable) {
        const clickableElement =
          target.tagName === 'BUTTON' || target.tagName === 'A'
            ? target
            : (target.closest('button') || target.closest('a')) as HTMLElement

        if (clickableElement) {
          magneticElementRef.current = clickableElement
          const rect = clickableElement.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2

          // Calculate distance from center
          const distanceX = e.clientX - centerX
          const distanceY = e.clientY - centerY
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

          // Magnetic effect radius (adjust as needed)
          const magnetRadius = Math.max(rect.width, rect.height) * 0.8

          if (distance < magnetRadius) {
            setIsMagnetic(true)
            // Pull cursor toward center with easing
            const pullStrength = 0.3
            cursorX.set(centerX - (distanceX * pullStrength))
            cursorY.set(centerY - (distanceY * pullStrength))
            return
          }
        }
      }

      setIsMagnetic(false)
      magneticElementRef.current = null
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [magnetic, cursorX, cursorY])

  return (
    <motion.div
      className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference ${className}`}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      {/* Outer ring */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
        animate={{
          width: isPointer ? 40 : 32,
          height: isPointer ? 40 : 32,
          opacity: isMagnetic ? 0.6 : 0.3,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Inner dot */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        animate={{
          width: isPointer ? 8 : 6,
          height: isPointer ? 8 : 6,
          opacity: isMagnetic ? 1 : 0.8,
        }}
        transition={{ duration: 0.15 }}
      />
    </motion.div>
  )
}
