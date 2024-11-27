import { IPost, IUser } from '@/lib/interface'

export type LoginUser = {
  username: string
  password: string
}

export type SignUpUserFormData = {
  fullName?: string
  username?: string
  password?: string
}

export type CommentProps = {
  _id: string
  user: IUser
  content: string
  createdAt: string | Date
  likes: string[]
}

export type CardPostProps = {
  author: IUser
  content: {
    text: string
    images?: string[]
    createdAt: string
  }
  likes: string[] | null | []
  shares: string[] | null | []
  comments: CommentProps[] | []
}

export type AvatarUserProps = {
  src: string
  username: string
  hasStory?: boolean
  width?: number
  height?: number
}

export type UserDetailProps = {
  user: IUser
  posts: CardPostProps[]
  followers: IUser[]
  following: IUser[]
  isFollowed: boolean
  isFollowing: boolean
  isMe: boolean
}

export type PostType = 'image' | 'video'

export type SettingsProps = {
  icon: React.ReactNode
  title: string
  value: string
}
