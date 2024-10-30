export type LoginUser = {
  username: string
  password: string
}

export type UserProps = {
  _id: string
  fullname: string | null
  username: string
  avatar: string
  bio?: string | null
  email: string
  hasStory?: boolean
  createdAt: string | Date
}

export type SignUpUserFormData = {
  fullname?: string
  email?: string
  password?: string
}

export type CommentProps = {
  _id: string
  user: UserProps
  content: string
  createdAt: string | Date
  likes: string[]
}

export type CardPostProps = {
  author: UserProps
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
  user: UserProps
  posts: CardPostProps[]
  followers: UserProps[]
  following: UserProps[]
  isFollowed: boolean
  isFollowing: boolean
  isMe: boolean
}
