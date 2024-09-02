export type LoginUser = {
  username: string
  password: string
}

export type SignUpUserFormData = {
  fullname?: string
  email?: string
  password?: string
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
}
