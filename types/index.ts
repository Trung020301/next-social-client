import { Avatar, ICardPost, IPost, IUser } from '@/lib/interface'

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
  post: ICardPost
}

export type AvatarUserProps = {
  src?: string
  username: string
  hasStory?: boolean
  width?: number
  height?: number
  loading?: boolean
}

export type UserExploreProps = {
  _id: string
  fullName: string
  username: string
  followers: string[]
  avatar?: Avatar
  blockedUsers?: string[]
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

export type DetailProfileProps = {
  user: IUser
  posts: IPost[]
}
