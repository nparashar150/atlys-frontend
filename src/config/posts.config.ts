export const POST_EMOJIS = ['🌟', '✨', '💡', '🎯', '🚀', '💫', '🔥', '⚡', '🌈', '🎬'] as const

export function getRandomEmoji(): string {
  return POST_EMOJIS[Math.floor(Math.random() * POST_EMOJIS.length)]
}
