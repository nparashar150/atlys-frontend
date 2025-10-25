import type { User } from './user'

export interface Media {
  type: 'image' | 'audio' | 'video' | 'file'
  data: string // base64 or URL
  mimeType: string
  name: string
}

export interface Comment {
  id: string
  postId: string
  author: User
  content: string
  createdAt: Date
  reactions: Reaction[]
}

export interface Reaction {
  emoji: string
  count: number
  users: string[]
}

export interface Post {
  id: string
  content: string
  author: User
  createdAt: Date
  likes: number
  likedBy: string[]
  comments: Comment[]
  media: Media[]
}
