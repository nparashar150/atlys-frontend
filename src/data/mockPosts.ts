import type { Post, User } from '@/types/post'

const MOCK_USERS = [
  { name: 'Sarah Johnson', email: 'sarah@example.com', avatar: 'https://i.pravatar.cc/150?img=1' }, // Female
  { name: 'Alex Martinez', email: 'alex@example.com', avatar: 'https://i.pravatar.cc/150?img=12' }, // Male
  { name: 'Emily Chen', email: 'emily@example.com', avatar: 'https://i.pravatar.cc/150?img=5' }, // Female
  { name: 'Marcus Brown', email: 'marcus@example.com', avatar: 'https://i.pravatar.cc/150?img=13' }, // Male
  { name: 'Jessica Williams', email: 'jessica@example.com', avatar: 'https://i.pravatar.cc/150?img=10' }, // Female
  { name: 'David Kim', email: 'david@example.com', avatar: 'https://i.pravatar.cc/150?img=15' }, // Male
  { name: 'Priya Patel', email: 'priya@example.com', avatar: 'https://i.pravatar.cc/150?img=20' }, // Female
  { name: 'James Anderson', email: 'james@example.com', avatar: 'https://i.pravatar.cc/150?img=33' }, // Male
]

const MOCK_POST_SNIPPETS = [
  'Just got my visa approved for Japan! 🇯🇵 Can\'t wait to explore Tokyo and Kyoto. Thanks for the smooth process!',
  'Finally exploring the streets of Paris! 🗼 The Eiffel Tower is even more beautiful in person. Travel dreams do come true!',
  'Landed in Bali this morning! 🌴 The beaches here are absolutely stunning. Best decision ever to take this trip.',
  'Exploring the ancient ruins of Machu Picchu 🏔️ This place is absolutely breathtaking. Peru, you have my heart!',
  'Just booked my flights to Iceland! ✈️ Northern lights, here I come! So excited for this adventure.',
  'The food scene in Bangkok is incredible! 🍜 Street food heaven. Every meal is an adventure here.',
  'Santorini sunsets are unreal! 🌅 No filter needed. Greece, you\'re magical.',
  'Hiking through the Swiss Alps today 🏔️ The views are absolutely incredible. Nature therapy at its finest!',
  'Safari day in Kenya! 🦁 Just saw a pride of lions. This is a once-in-a-lifetime experience!',
  'Exploring the vibrant markets of Marrakech 🕌 The colors, sounds, and smells are mesmerizing. Morocco is enchanting!',
  'Beach hopping in the Maldives 🏖️ Crystal clear waters and white sand beaches. Paradise found!',
  'Just tried authentic pasta in Rome! 🍝 When in Italy... This culinary journey is amazing!',
  'The Great Wall of China is surreal! 🏯 Standing here, you can feel the history. Absolutely worth the visit.',
  'Scuba diving in the Great Barrier Reef! 🐠 The underwater world is spectacular. Australia, you\'re amazing!',
  'Exploring the temples of Angkor Wat at sunrise 🛕 Cambodia is full of wonders. Spiritual and beautiful!',
]

/**
 * Combine 2-3 random snippets into a single post content
 */
function generateCombinedContent(index: number): string {
  const snippetCount = 2 + (index % 5) // Alternates between 2 and 3 snippets
  const startIndex = (index * 3) % MOCK_POST_SNIPPETS.length
  const snippets: string[] = []

  for (let i = 0; i < snippetCount; i++) {
    const snippetIndex = (startIndex + i) % MOCK_POST_SNIPPETS.length
    snippets.push(MOCK_POST_SNIPPETS[snippetIndex])
  }

  return snippets.join(' ')
}

/**
 * Generate mock users
 * @param count Number of users to generate (default: 8)
 */
export function generateMockUsers(count: number = 8): User[] {
  return Array.from({ length: count }, (_, i) => {
    const user = MOCK_USERS[i % MOCK_USERS.length]
    return {
      id: String(i + 1),
      email: user.email,
      name: user.name,
      avatar: user.avatar
    }
  })
}

/**
 * Generate mock posts
 * @param count Number of posts to generate (default: 10)
 */
export function generateMockPosts(count: number = 10): Post[] {
  const users = generateMockUsers()
  const now = Date.now()

  return Array.from({ length: count }, (_, i) => {
    const hoursAgo = i * 2
    const createdAt = new Date(now - hoursAgo * 60 * 60 * 1000)

    return {
      id: String(i + 1),
      content: generateCombinedContent(i),
      author: users[i % users.length],
      createdAt,
      likes: Math.floor(Math.random() * 100),
      likedBy: Array.from(
        { length: Math.floor(Math.random() * 4) },
        (_, j) => String((j + 1) % users.length + 1)
      ),
      comments: [],
      media: []
    }
  })
}

/**
 * Get default mock posts (for initial load)
 */
export function getDefaultMockPosts(): Post[] {
  return generateMockPosts(20)
}
