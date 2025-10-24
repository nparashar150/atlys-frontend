import type { Post, User } from '@/types/post'

const MOCK_USER_NAMES = [
  { name: 'Jane Doe', email: 'jane@example.com' },
  { name: 'John Smith', email: 'john@example.com' },
  { name: 'Sarah Johnson', email: 'sarah@example.com' },
  { name: 'Mike Brown', email: 'mike@example.com' },
  { name: 'Emily Davis', email: 'emily@example.com' },
]

const MOCK_POST_CONTENTS = [
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
  'Road tripping through New Zealand! 🚗 Every turn reveals a new stunning landscape. Middle Earth is real!',
  'The Northern Lights in Norway! 💚 Nature\'s most spectacular light show. Dreams do come true!',
  'Exploring the souks of Dubai 🏙️ The blend of tradition and modernity is fascinating. What a city!',
  'Island hopping in Greece! ⛵ Mykonos, Santorini, and Crete. Each island has its own magic.',
  'Just finished an amazing trek to Everest Base Camp! 🏔️ Challenging but absolutely worth it. Nepal, you\'re incredible!',
]

/**
 * Generate mock users
 * @param count Number of users to generate (default: 5)
 */
export function generateMockUsers(count: number = 5): User[] {
  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    email: MOCK_USER_NAMES[i % MOCK_USER_NAMES.length].email,
    name: MOCK_USER_NAMES[i % MOCK_USER_NAMES.length].name,
    avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`
  }))
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
      content: MOCK_POST_CONTENTS[i % MOCK_POST_CONTENTS.length],
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
