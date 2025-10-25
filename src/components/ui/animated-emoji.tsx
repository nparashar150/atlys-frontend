interface AnimatedEmojiProps {
  emoji: string
  size?: number
  className?: string
}

export function AnimatedEmoji({ emoji, size = 32, className = '' }: AnimatedEmojiProps) {
  // Convert emoji to hexadecimal Unicode code point
  const getEmojiHex = (emoji: string): string => {
    const codePoint = emoji.codePointAt(0)
    if (!codePoint) return ''
    return codePoint.toString(16).toLowerCase()
  }

  const emojiHex = getEmojiHex(emoji)

  // If we can't get hex, fallback to regular emoji
  if (!emojiHex) {
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
        onError={(e) => {
          // Fallback to regular emoji if image fails to load
          const target = e.currentTarget
          const parent = target.parentElement
          if (parent) {
            parent.outerHTML = `<span class="${className}">${emoji}</span>`
          }
        }}
      />
    </picture>
  )
}
