import { IPost } from '@/lib/interface'
import { CardPostProps, UserDetailProps } from '@/types'

// Story
export const fakeListStory = [
  {
    title: '😝 Hehe',
    image:
      'https://res.cloudinary.com/dpqhuucyq/image/upload/v1730263036/avatars/1_s8hhrh.jpg',
  },
  {
    title: '🍀 Featured',
    image:
      'https://res.cloudinary.com/dpqhuucyq/image/upload/v1730266896/avatars/2_oreucm.jpg',
  },
  {
    title: 'Sky',
    image:
      'https://res.cloudinary.com/dpqhuucyq/image/upload/v1730280315/3_iopoi1.jpg',
  },
  {
    title: '😝 Hehe',
    image:
      'https://res.cloudinary.com/dpqhuucyq/image/upload/v1730263036/avatars/1_s8hhrh.jpg',
  },
  {
    title: '🍀 Featured',
    image:
      'https://res.cloudinary.com/dpqhuucyq/image/upload/v1730266896/avatars/2_oreucm.jpg',
  },
  {
    title: 'Sky',
    image:
      'https://res.cloudinary.com/dpqhuucyq/image/upload/v1730280315/3_iopoi1.jpg',
  },
]

// USER
export const fakeUser: UserDetailProps = {
  user: {
    _id: '1',
    fullname: 'Trần Đình Trung',
    avatar:
      'https://res.cloudinary.com/dpqhuucyq/image/upload/v1730266896/avatars/2_oreucm.jpg',
    bio: '"Everything will be okay?"',
    email: 'trandtrung@example.com',
    hasStory: true,
    createdAt: '2021-01-01',
    username: 'tran.d.trung',
  },
  posts: [
    {
      author: {
        _id: '1asjkldkjashdsa',
        username: 'tran.d.trung',
        fullname: 'Trần Đình Trung',
        avatar: 'https://example.com/avatar.jpg',
        email: '',
        hasStory: true,
        createdAt: '2021-01-01',
      },

      content: {
        text: 'This is a fake post',
        createdAt: '2021-01-01',
      },
      likes: [],
      shares: [],
      comments: [],
    },
  ],
  followers: [
    {
      _id: '2',
      fullname: 'Follower 1',
      username: 'follower1',
      avatar: 'https://example.com/follower1.jpg',
      email: 'follower1@example.com',
      hasStory: false,
      createdAt: '2021-01-01',
    },
    {
      _id: '3',
      username: 'follower2',
      fullname: 'Follower 2',
      avatar: 'https://example.com/follower1.jpg',
      email: 'follower1@example.com',
      hasStory: false,
      createdAt: '2021-01-01',
    },
  ],
  following: [
    {
      _id: '3',
      username: 'following1',
      fullname: 'Following 1',
      avatar: 'https://example.com/following1.jpg',
      email: 'following1@example.com',
      hasStory: false,
      createdAt: '2021-01-01',
    },
  ],
  isFollowed: true,
  isFollowing: true,
  isMe: true,
}

// Post
export const allPostTabs: IPost[] = [
  {
    _id: '1',
    userId: 'user1',
    content: 'This is the first post.',
    image: ['http://example.com/image1.jpg'],
    video: [],
    likes: ['user2', 'user3'],
    shares: ['user4'],
    comments: ['Nice post!', 'Thanks for sharing!'],
    createdAt: '2024-10-31T12:00:00Z',
    type: 'image',
  },
  {
    _id: '2',
    userId: 'user1',
    content: 'This is the first post.',
    image: ['http://example.com/image1.jpg'],
    video: [],
    likes: ['user2', 'user3'],
    shares: ['user4'],
    comments: ['Nice post!', 'Thanks for sharing!'],
    createdAt: '2024-10-31T12:00:00Z',
    type: 'image',
  },

  {
    _id: '3',
    userId: 'user2',
    content: 'This is the second post.',
    image: [],
    video: ['http://example.com/video1.mp4'],
    likes: ['user1'],
    shares: [],
    comments: ['Great video!'],
    createdAt: '2024-10-30T12:00:00Z',
    type: 'video',
  },
  {
    _id: '5',
    userId: 'user1',
    content: 'This is the first post.',
    image: ['http://example.com/image1.jpg'],
    video: [],
    likes: ['user2', 'user3'],
    shares: ['user4'],
    comments: ['Nice post!', 'Thanks for sharing!'],
    createdAt: '2024-10-31T12:00:00Z',
    type: 'image',
  },
]

export const posts: CardPostProps = {
  author: {
    _id: 'hjsdfhsdgj12',
    fullname: 'Tran Dinh Trung',
    bio: 'Hello there',
    hasStory: true,
    username: 'tran.d.trung',
    avatar:
      'https://res.cloudinary.com/dpqhuucyq/image/upload/v1730280315/3_iopoi1.jpg',
    createdAt: '2021-10-10',
    email: '',
  },
  content: {
    createdAt: '2021-10-10',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lorem sapien, tincidunt nec nunc nec, tincidunt ultricies nunc. Donec nec nunc nec, tincidunt ultricies nunc. Donec nec nunc nec, tincidunt ultricies nunc.',
    images: [
      'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?q=80&w=2843&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  likes: ['34234b234'],
  shares: ['34234b234', '232333234gdasd'],
  comments: [
    {
      _id: '1',
      user: {
        _id: '134sdasd',
        avatar: 'https://github.com/shadcn.png',
        username: 'nguyen.van.a',
        fullname: 'Tran Dinh Trung',
        email: '',
        hasStory: true,
        createdAt: '2021-10-10',
      },
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptate in incidunt magnam ex, eligendi accusantium itaque voluptatum! Quisquam impedit ducimus eius debitis minus quae facere maxime cupiditate, temporibus incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptate in incidunt magnam ex, eligendi accusantium itaque voluptatum! Quisquam impedit ducimus eius debitis minus quae facere maxime cupiditate, temporibus incidunt.',
      createdAt: '',
      likes: ['34234b234b342', '232333234gdasd'],
    },
    {
      _id: '2',
      user: {
        _id: '2',
        username: 'nguyen.van.b',
        avatar: 'https://github.com/shadcn.png',
        fullname: 'Trieu Huy Hoang',
        email: '',
        hasStory: true,
        createdAt: '2021-10-10',
      },
      content: '💔 So hurt moreee',
      createdAt: '',
      likes: [],
    },
    {
      _id: '1',
      user: {
        _id: '1',
        username: 'nguyen.van.c',
        avatar: 'https://github.com/shadcn.png',
        fullname: 'Tran Dinh Trung',
        email: '',
        hasStory: true,
        createdAt: '2021-10-10',
      },
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptate in incidunt magnam ex, eligendi accusantium itaque voluptatum! Quisquam impedit ducimus eius debitis minus quae facere maxime cupiditate, temporibus incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptate in incidunt magnam ex, eligendi accusantium itaque voluptatum! Quisquam impedit ducimus eius debitis minus quae facere maxime cupiditate, temporibus incidunt.',
      createdAt: '',
      likes: ['34234b234b342', '232333234gdasd'],
    },
    {
      _id: '2',
      user: {
        _id: '2',
        username: 'nguyen.van.d',
        avatar: 'https://github.com/shadcn.png',
        fullname: 'Trieu Huy Hoang',
        email: '',
        hasStory: true,
        createdAt: '2021-10-10',
      },
      content: '💔 So hurt moreee',
      createdAt: '',
      likes: [],
    },
    {
      _id: '1',
      user: {
        _id: '1',
        username: 'danganh',
        avatar: 'https://github.com/shadcn.png',
        fullname: 'Tran Dinh Trung',
        email: '',
        hasStory: true,
        createdAt: '2021-10-10',
      },
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptate in incidunt magnam ex, eligendi accusantium itaque voluptatum! Quisquam impedit ducimus eius debitis minus quae facere maxime cupiditate, temporibus incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptate in incidunt magnam ex, eligendi accusantium itaque voluptatum! Quisquam impedit ducimus eius debitis minus quae facere maxime cupiditate, temporibus incidunt.',
      createdAt: '',
      likes: ['34234b234b342', '232333234gdasd'],
    },
    {
      _id: '2',
      user: {
        _id: '2',
        username: 'nguyen.van.d',
        avatar: 'https://github.com/shadcn.png',
        fullname: 'Trieu Huy Hoang',
        email: '',
        hasStory: true,
        createdAt: '2021-10-10',
      },
      content: '💔 So hurt moreee',
      createdAt: '',
      likes: [],
    },
    {
      _id: '1',
      user: {
        _id: '1',
        username: 'nguyen.van.c',
        avatar: 'https://github.com/shadcn.png',
        fullname: 'Tran Dinh Trung',
        email: '',
        hasStory: true,
        createdAt: '2021-10-10',
      },
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptate in incidunt magnam ex, eligendi accusantium itaque voluptatum! Quisquam impedit ducimus eius debitis minus quae facere maxime cupiditate, temporibus incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptate in incidunt magnam ex, eligendi accusantium itaque voluptatum! Quisquam impedit ducimus eius debitis minus quae facere maxime cupiditate, temporibus incidunt.',
      createdAt: '',
      likes: ['34234b234b342', '232333234gdasd'],
    },
    {
      _id: '2',
      user: {
        _id: '2',
        username: 'nguyen.van.d',
        avatar: 'https://github.com/shadcn.png',
        fullname: 'Trieu Huy Hoang',
        email: '',
        hasStory: true,
        createdAt: '2021-10-10',
      },
      content: '💔 So hurt moreee',
      createdAt: '',
      likes: [],
    },
  ],
}
