import type { Post, Comment, User } from '@/types'
import { getRandomEmoji } from '@/config/posts.config'

const NAMES = [
  'Sarah Johnson', 'Mike Chen', 'Emma Wilson', 'Alex Kumar', 'Lisa Park',
  'David Lee', 'Sophia Martinez', 'James Wilson', 'Olivia Brown', 'Ethan Davis',
  'Ava Garcia', 'Noah Anderson', 'Isabella Taylor', 'Liam Martinez', 'Mia Johnson',
  'William Clark', 'Charlotte White', 'Benjamin Harris', 'Amelia Davis', 'Lucas Brown'
]

const POST_CONTENTS = [
  'Just got back from Iceland! The Northern Lights were absolutely breathtaking - watched them dance across the sky for 2 hours straight. Drove the Ring Road, stopped at waterfalls and black sand beaches. The secret lagoons we found were even better than Blue Lagoon! 🌌✨',

  'Planning my summer trip to Japan! Found some amazing hidden gems in Tokyo - rooftop bars in Shibuya and tiny ramen shops locals love. Also visiting teamLab Borderless before it moves. Any recommendations for lesser-known neighborhoods? 🗾🍜',

  'Bangkok street food is incredible! Been here a week trying everything from pad thai to boat noodles. The mango sticky rice from the night market is the best thing ever. Found family-run stalls with amazing green curry. So many options! 🍜🔥',

  'Working remotely from Bali has been a dream! Bouncing between Canggu and Ubud for a month. The coworking spaces have fast WiFi, great coffee, and amazing people. After work I\'m 5 minutes from the beach for sunset surf sessions. Might extend indefinitely! 💼🏝️',

  'Finally made it to Machu Picchu! The 4-day Inca Trail was brutal but crossing through the Sun Gate at sunrise was magical. Our guide shared fascinating history and we visited empty ruins along the way. Coca tea helped with the altitude. Worth every step! 🏔️⛰️',

  'Melbourne\'s coffee culture is next level! Visited over 20 cafes in two weeks. Every corner has a gem serving exceptional flat whites. Favorites are Patricia Coffee Brewers and Market Lane. The baristas here are true artists. Also loving the laneway street art! ☕🎨',

  'Exploring Petra has been surreal! Walking through the Siq and seeing the Treasury emerge is beyond photos. Hiked to the Monastery - 800+ steps but worth it. Bedouin guides shared amazing stories. Saw Petra by candlelight at night. The history here is overwhelming! 🏛️✨',

  'Northern Lights in Norway exceeded all expectations! Based in Tromsø for a week doing aurora hunting trips. Last night\'s display was incredible - green, purple, and red curtains dancing. Also went dog sledding and ice fishing. This winter wonderland is magical! 🌟❄️',

  'Road tripping through New Zealand\'s South Island! Every turn reveals jaw-dropping vistas - pristine lakes, snow-capped mountains, forests. Drove from Christchurch to Queenstown via Lake Tekapo and Mount Cook. Tomorrow hiking Routeburn Track. This country is one giant postcard! 🚗🏔️',

  'Authentic Neapolitan pizza in Naples changed my life! Visited Pizzeria Brandi where margherita was born, but even corner spots serve gourmet-level pies. The wood-fired crust is perfect. Been eating pizza twice daily for 3 days. No regrets! The espresso here is incredible too. 🍕☕',

  'Volunteering at an elephant sanctuary in Chiang Mai is life-changing! We feed them, bathe them in the river, and learn about conservation. Each has such unique personalities. Baby Som follows me everywhere! The sanctuary rescues elephants from tourism. This work matters. 🐘💚',

  'Sunrise at Angkor Wat was worth the 4 AM wake up! Got a perfect spot by the reflecting pool. Watching the temple reveal itself as the sky turned pink was magical. Later explored Ta Prohm with trees growing through ruins. Three days of temple-hopping barely scratched the surface! 🌅🛕',

  'Scuba diving the Great Barrier Reef opened my eyes to another world! Saw sea turtles, reef sharks, giant clams, vibrant coral. Our instructor pointed out a blue-ringed octopus from safe distance. Did three dives, each site completely different. Already planning the next diving trip! 🐠🌊',

  'The souks of Marrakech are sensory overload in the best way! Vibrant spices, handwoven rugs, traditional lanterns everywhere. Sounds of vendors, smell of mint tea and tagines, handcrafted textiles. Got lost five times. Haggling is fun once you get it. Supporting local artisans! 🕌✨',

  'Safari in Kenya was surreal! Saw all Big Five in one day at Maasai Mara - lions, leopards, elephants, buffalo, rhinos. Watched a pride hunt at sunset and witnessed the Great Migration. Our Maasai guide could spot animals from impossible distances. Photos don\'t do it justice! 🦁🐘',

  'Cherry blossom season in Kyoto is pure magic! Perfect timing - the city transformed into a pink wonderland. Walked the Philosopher\'s Path with cherry trees reflected in the canal. Did hanami picnics in Maruyama Park with locals. Traditional temples framed by sakura are breathtaking! 🌸🇯🇵',

  'Backpacking through Patagonia showed me landscapes I didn\'t know existed! Torres del Paine scenery is otherworldly - granite towers, blue glaciers, turquoise lakes, insane wind. The W Trek was tough but worth it. Wild camped with guanacos nearby. Weather changes every 10 minutes here! 🏔️⛺',

  'Wine tasting in Tuscany and living my best life! Staying at an agriturismo in Chianti surrounded by vineyards and olive groves. Visiting wineries daily, tasting Brunello and Super Tuscans. Yesterday had a 6-course wine-paired lunch lasting 4 hours. Made fresh pasta too! 🍷🇮🇹',

  'Camping under Sahara Desert stars defies description! Rode camels 2 hours into dunes at sunset, everything turned golden. Berber guides cooked tagine over fire. The stars - Milky Way so bright it cast shadows! No light pollution for miles. Slept under open sky, woke to spectacular sunrise. ⭐🏜️',

  'Exploring Bagan temples at sunrise was the Myanmar trip highlight! Climbed a temple at 4:30 AM to watch sunrise over thousands of ancient pagodas. Hot air balloons floated over temples as mist cleared. Spent three days exploring by e-bike, finding hidden temples. Magical and undiscovered! 🛕🎈'
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

function generatePosts(count: number, offset: number): Post[] {
  const posts: Post[] = []

  for (let i = 0; i < count; i++) {
    const postIndex = offset + i
    const hoursAgo = (postIndex + 1) * 6 // Spread posts over time
    const author = generateUser(postIndex % NAMES.length)

    // Randomly decide how many comments (0-3)
    const commentCount = Math.random() < 0.45 ? 0 : Math.random() < 0.6 ? 1 : Math.random() < 0.8 ? 2 : 3
    const comments: Comment[] = []

    for (let j = 0; j < commentCount; j++) {
      comments.push(generateComment((postIndex + 1).toString(), postIndex * 10 + j + 1, hoursAgo - (j + 1)))
    }

    posts.push({
      id: (postIndex + 1).toString(),
      content: `<p>${POST_CONTENTS[postIndex % POST_CONTENTS.length]}</p>`,
      author,
      createdAt: new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString(),
      emoji: getRandomEmoji(),
      comments
    })
  }

  return posts
}

const MOCK_POSTS: Post[] = []
const TOTAL_POSTS = 100
const PAGE_SIZE = 10

// Generate initial posts on demand
function ensurePostsGenerated(upToIndex: number) {
  while (MOCK_POSTS.length <= upToIndex && MOCK_POSTS.length < TOTAL_POSTS) {
    const offset = MOCK_POSTS.length
    const count = Math.min(PAGE_SIZE, TOTAL_POSTS - MOCK_POSTS.length)
    MOCK_POSTS.push(...generatePosts(count, offset))
  }
}

function randomDelay(): Promise<void> {
  const delay = Math.floor(Math.random() * (800 - 300 + 1)) + 300
  return new Promise(resolve => setTimeout(resolve, delay))
}

export interface FetchPostsParams {
  pageParam?: number
}

export interface FetchPostsResponse {
  posts: Post[]
  nextCursor: number | null
}

export async function fetchPosts({ pageParam = 0 }: FetchPostsParams): Promise<FetchPostsResponse> {
  await randomDelay()

  const startIndex = pageParam
  const endIndex = startIndex + PAGE_SIZE

  ensurePostsGenerated(endIndex - 1)

  const posts = MOCK_POSTS.slice(startIndex, endIndex)
  const hasMore = endIndex < TOTAL_POSTS

  return {
    posts,
    nextCursor: hasMore ? endIndex : null
  }
}

export async function createPost(content: string, author: Post['author'], emoji?: string): Promise<Post> {
  await randomDelay()

  const newPost: Post = {
    id: `new-${Date.now()}`,
    content,
    author,
    createdAt: new Date().toISOString(),
    emoji: emoji || getRandomEmoji(),
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
