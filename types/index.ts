export type LoginUser = {
  username: string
  password: string
}

export type UserProps = {
  _id: string
  fullname: string | null
  avatar: string
  email: string
  hasStory: boolean
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
}

export type CardPostProps = {
  src: string
  fullname: string
  hasStory?: boolean
  content: {
    text: string
    images?: string[]
    createdAt: string
  }
  comments: CommentProps[] | []
}
