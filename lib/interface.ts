import { PostType } from '@/types'

export interface IUser {
  _id: string
  fullname: string | null
  username: string
  avatar: string
  bio?: string | null
  email: string
  hasStory?: boolean
  createdAt: string | Date
}

export interface IPost {
  _id: string
  userId: string
  content: string
  image: string[]
  video?: string[]
  likes: string[]
  shares: string[]
  comments: string[]
  createdAt: Date | string
  type: PostType
}
