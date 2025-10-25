import { useState } from 'react'

interface AnimatedEmojiProps {
  emoji: string
  size?: number
  className?: string
}

export function AnimatedEmoji({ emoji, size = 32, className = '' }: AnimatedEmojiProps) {
  const [hasError, setHasError] = useState(false)

  // Convert emoji to hexadecimal Unicode code point
  const getEmojiHex = (emoji: string): string => {
    const codePoint = emoji.codePointAt(0)
    if (!codePoint) return ''
    return codePoint.toString(16).toLowerCase()
  }

  const emojiHex = getEmojiHex(emoji)

  // If we can't get hex or image failed to load, fallback to regular emoji
  if (!emojiHex || hasError) {
    return <span className={className}>{emoji}</span>
  }

  const webpUrl = `https://fonts.gstatic.com/s/e/notoemoji/latest/${emojiHex}/512.webp`
  const gifUrl = `https://fonts.gstatic.com/s/e/notoemoji/latest/${emojiHex}/512.gif`

  return (
    <picture className={className}>
      <source srcSet={webpUrl} type="image/webp" />
      <img
        src={gifUrl}
        alt={emoji}
        width={size}
        height={size}
        className="inline-block"
        onError={() => {
          // Use React state to trigger re-render with fallback
          setHasError(true)
        }}
      />
    </picture>
  )
}
