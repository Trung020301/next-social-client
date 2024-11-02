import { IPost } from '@/lib/interface'
import React from 'react'
import NoPostUI from '../NoPostUI'

export default function ReefsTab() {
  const posts: IPost[] = [
    // {
    //   _id: '1',
    //   userId: 'user1',
    //   content: 'This is the first post.',
    //   image: ['http://example.com/image1.jpg'],
    //   video: [],
    //   likes: ['user2', 'user3'],
    //   shares: ['user4'],
    //   comments: ['Nice post!', 'Thanks for sharing!'],
    //   createdAt: '2024-10-31T12:00:00Z',
    //   type: 'video',
    // },
    // {
    //   _id: '2',
    //   userId: 'user2',
    //   content: 'This is the second post.',
    //   image: [],
    //   video: ['http://example.com/video1.mp4'],
    //   likes: ['user1'],
    //   shares: [],
    //   comments: ['Great video!'],
    //   createdAt: '2024-10-30T12:00:00Z',
    //   type: 'video',
    // },
  ]

  if (posts.length === 0) {
    return <NoPostUI />
  }

  return <div>ReefsTab</div>
}
