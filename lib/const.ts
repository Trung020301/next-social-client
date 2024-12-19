import { IUser } from './interface'
import { UserSettingProfileProps } from '@/types'

export const pathRoute = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  PROFILE: '/my-profile',
  EXPLORE: '/explore',
  UPLOAD: '/upload',
  MESSAGES: '/chat',
  NOT_FOUND: '/404',
  SETTINGS: '/settings',
  ACCOUNT: '/account',
}

export const languageLabels = [
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'Vietnamese',
    value: 'vi',
  },
]

export const STEP_ONE = 'set-name'
export const STEP_TWO = 'set-authentication'

export const defaultImage = '/images/defaultImage.jpg'
export const userNotFound = '/images/user-not-found.png'
export const defaultAvatar =
  'https://res.cloudinary.com/dpqhuucyq/image/upload/v1732780340/2_ea60qt.jpg'

export const createPostFileImage = '/images/create-post.png'

export const DEFAULT_TAB = 'all'
export const REEF_TAB = 'reef'
export const TAG_TAB = 'tag'

const MY_PROFILE = 'my-profile'
const USER_PROFILE = 'user-profile'

export const TYPE_PROFILE = {
  MY_PROFILE,
  USER_PROFILE,
}
export const defaultUser: IUser = {
  _id: '',
  fullName: '',
  username: '',
  email: '',
  bio: '',
  hasStory: false,
  accountStatus: '',
  role: '',
  followers: [],
  following: [],
  blockedUsers: [],
  savedPosts: [],
  createdAt: '',
  updatedAt: '',
  avatar: {
    public_id: '',
    url: '',
  },
}

export const defaultEditUser: UserSettingProfileProps = {
  avatar: {
    url: '',
    public_id: '',
  },
  fullName: '',
  username: '',
  phone: '',
  bio: '',
  gender: 'other',
}
