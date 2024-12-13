import { PostType } from '@/types'
import { AxiosError } from 'axios'

export interface IUser {
  _id: string
  fullName: string
  username: string
  email: string
  bio: string
  hasStory: boolean
  accountStatus: string
  role: string
  followers: string[]
  following: string[]
  blockedUsers: string[]
  savedPosts: string[]
  createdAt: string
  updatedAt: string
  avatar: Avatar
}

export interface Avatar {
  public_id: string
  url: string
}

export interface IPost {
  _id: string
  userId: IUserId
  MediaTypeEnum: PostType
  mediaUrl: MediaUrl[]
  visibility: string
  likes: string[]
  content?: string
  shares: string[]
  comments: string[]
  createdAt: string
  updatedAt: string
}

export interface ICardPost extends IPost {
  isLikedPost: boolean
  isSavedPost: boolean
}

export interface IUserId {
  _id: string
  avatar: {
    url: string
  }
  username: string
  fullName: string
  isFollowed?: boolean
}

export interface MediaUrl {
  url: string
  public_id: string
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

// ? Request Interface
export interface ToggleLikePost {
  postId: string
}
