import { PostType } from '@/types'
import { AxiosError } from 'axios'

export interface IUser {
  _id: string
  fullName: string | null
  username: string
  avatar: string
  bio?: string | null
  email: string
  hasStory?: boolean
  createdAt: string | Date
  followers: string[]
  following: string[]
  blockedUsers: string[]
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

export interface HttpError extends AxiosError {
  response: {
    data: {
      error: string
      message: string
      status: number
    }
  } & AxiosError['response']
}
