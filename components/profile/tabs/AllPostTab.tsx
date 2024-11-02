'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { CldImage } from 'next-cloudinary'
import { Film, Notebook } from 'lucide-react'
import { pathRoute } from '@/lib/const'
import Link from 'next/link'
import { IPost } from '@/lib/interface'
import NoPostUI from '../NoPostUI'

export default function Gallery() {
  const posts: IPost[] = [
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
  ]

  if (posts.length === 0) {
    return <NoPostUI />
  }

  return (
    <div className='flex flex-wrap'>
      {posts.map((post) => (
        <Link
          key={post._id}
          href={pathRoute.HOME}
          className='group w-1/3 relative flex h-48 items-end overflow-hidden rounded-lg  shadow-lg'
        >
          <CldImage
            src='https://res.cloudinary.com/dpqhuucyq/image/upload/v1730280315/3_iopoi1.jpg'
            loading='lazy'
            width={100}
            height={250}
            alt='Photo'
            className=' absolute inset-0 w-full h-full object-cover object-center'
          />
          <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50'></div>
          <span className='relative ml-2 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg'>
            {post.type === 'video' ? <Film /> : <Notebook />}
          </span>
        </Link>
      ))}
    </div>
  )
}
