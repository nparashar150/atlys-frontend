import type { Post, Comment, User } from '@/types'

const POST_EMOJIS = ['💭', '🌟', '✨', '💡', '🎯', '🚀', '💫', '🎨', '🔥', '⚡', '🌈', '🎪', '🎭', '🎬', '🎤']

const NAMES = [
  'Sarah Johnson', 'Mike Chen', 'Emma Wilson', 'Alex Kumar', 'Lisa Park',
  'David Lee', 'Sophia Martinez', 'James Wilson', 'Olivia Brown', 'Ethan Davis',
  'Ava Garcia', 'Noah Anderson', 'Isabella Taylor', 'Liam Martinez', 'Mia Johnson',
  'William Clark', 'Charlotte White', 'Benjamin Harris', 'Amelia Davis', 'Lucas Brown'
]

const POST_CONTENTS = [
  'Just got back from an amazing trip to Iceland! The Northern Lights were absolutely breathtaking. 🌌',
  'Currently planning my summer vacation to Japan. Any recommendations for hidden gems in Tokyo? 🗾',
  'The street food in Bangkok is out of this world! Can\'t decide what to eat next. 🍜',
  'Working remotely from Bali has been a dream come true. The coworking spaces here are incredible! 💼🏝️',
  'Finally hiked to Machu Picchu! The journey was tough but absolutely worth it. 🏔️',
  'Coffee shops in Melbourne are on another level. Every corner has a hidden gem! ☕',
  'Exploring the ancient ruins of Petra. History comes alive here! 🏛️',
  'The Northern Lights in Norway exceeded all expectations. Nature\'s best show! 🌟',
  'Road tripping through New Zealand\'s South Island. Every turn is a postcard! 🚗',
  'Just tried authentic Neapolitan pizza in Naples. Nothing compares! 🍕',
  'Volunteering at an elephant sanctuary in Thailand. Life-changing experience! 🐘',
  'Sunrise at Angkor Wat was absolutely breathtaking. Worth waking up at 4 AM! 🌅',
  'Scuba diving in the Great Barrier Reef. The underwater world is incredible! 🐠',
  'Exploring the souks of Marrakech. The colors, smells, and sounds are overwhelming in the best way! 🕌',
  'Safari in Kenya was surreal. Saw the Big Five in one day! 🦁',
  'Cherry blossom season in Kyoto is pure magic. Timing couldn\'t have been better! 🌸',
  'Backpacking through Patagonia. The landscapes are otherworldly! 🏔️',
  'Wine tasting in Tuscany. Living my best life! 🍷',
  'Camping under the stars in the Sahara Desert. No words can describe this experience! ⭐',
  'Exploring the temples of Bagan at sunrise. Myanmar is incredible! 🛕'
]

const COMMENT_CONTENTS = [
  'Wow, that sounds incredible! How long did you stay?',
  'I went last winter! Did you visit the Blue Lagoon?',
  'Try the mango sticky rice! It\'s amazing',
  'Which coworking space are you at?',
  'I\'m planning to do the same next year!',
  'How\'s the internet speed?',
  'Have you tried Patricia Coffee Brewers?',
  'What month did you go?',
  'I saw them in Iceland too! Magical experience',
  'Which pizzeria did you visit?',
  'Any winery recommendations?',
  'The Chianti region is beautiful!',
  'Hot air balloon ride?',
  'Did you stay in a riad?',
  'Which temples did you visit?',
  'How crowded was it?',
  'Did you get a guide or explore on your own?'
]

function getRandomEmoji(): string {
  return POST_EMOJIS[Math.floor(Math.random() * POST_EMOJIS.length)]
}

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function generateUser(index: number): User {
  const name = NAMES[index % NAMES.length]
  const email = `${name.toLowerCase().replace(' ', '.')}@example.com`
  return {
    id: (index + 1).toString(),
    name,
    email,
    avatar: `https://i.pravatar.cc/150?u=${email}`
  }
}

function generateComment(postId: string, commentIndex: number, hoursAgo: number): Comment {
  const author = generateUser(Math.floor(Math.random() * NAMES.length))
  return {
    id: `c${commentIndex}`,
    postId,
    content: getRandomItem(COMMENT_CONTENTS),
    author,
    createdAt: new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString()
  }
}

function generatePosts(): Post[] {
  const posts: Post[] = []

  for (let i = 0; i < 20; i++) {
    const hoursAgo = (i + 1) * 6 // Spread posts over time
    const author = generateUser(i % NAMES.length)

    // Randomly decide how many comments (0-3)
    const commentCount = Math.random() < 0.45 ? 0 : Math.random() < 0.6 ? 1 : Math.random() < 0.8 ? 2 : 3
    const comments: Comment[] = []

    for (let j = 0; j < commentCount; j++) {
      comments.push(generateComment((i + 1).toString(), i * 10 + j + 1, hoursAgo - (j + 1)))
    }

    posts.push({
      id: (i + 1).toString(),
      content: `<p>${POST_CONTENTS[i]}</p>`,
      author,
      createdAt: new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString(),
      emoji: getRandomEmoji(),
      comments
    })
  }

  return posts
}

const MOCK_POSTS = generatePosts()

function randomDelay(): Promise<void> {
  const delay = Math.floor(Math.random() * (800 - 300 + 1)) + 300
  return new Promise(resolve => setTimeout(resolve, delay))
}

export async function fetchPosts(): Promise<Post[]> {
  await randomDelay()
  return [...MOCK_POSTS]
}

export async function createPost(content: string, author: Post['author']): Promise<Post> {
  await randomDelay()

  const newPost: Post = {
    id: Date.now().toString(),
    content,
    author,
    createdAt: new Date().toISOString(),
    emoji: getRandomEmoji(),
    comments: []
  }

  MOCK_POSTS.unshift(newPost)
  return newPost
}

export async function createComment(
  postId: string,
  content: string,
  author: Post['author']
): Promise<Post> {
  await randomDelay()

  const post = MOCK_POSTS.find(p => p.id === postId)
  if (!post) {
    throw new Error('Post not found')
  }

  const newComment = {
    id: `c${Date.now()}`,
    postId,
    content,
    author,
    createdAt: new Date().toISOString()
  }

  post.comments.push(newComment)
  return { ...post }
}
