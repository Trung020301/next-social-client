'use client'

import React, { useEffect, useState } from 'react'
import { UserDetailProps } from '@/types'
import { CldImage } from 'next-cloudinary'
import { useTranslations } from 'next-intl'
import { AvatarUser } from '../AvatarUser'
import { getAllPosts } from '@/services/https/postService'

export default async function DetailProfile({ user }: { user: any }) {
  const t = useTranslations()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const colection = await getAllPosts(`/post/get-all-posts`)
        setPosts(colection.data.posts)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const detailList = [
    {
      id: 1,
      title: t('typography.posts'),
      value: posts.length,
    },
    {
      id: 2,
      title: t('typography.followers'),
      value: user.followers.length,
    },
    {
      id: 3,
      title: t('typography.following'),
      value: user.following.length,
    },
  ]

  return (
    <div className='px-2'>
      <div className=' flex items-center py-2'>
        <AvatarUser
          username={user.username}
          src={user.avatar?.url || ' '}
          hasStory={user.hasStory}
          width={64}
          height={64}
        />
        <div className='flex items-center justify-around flex-[4]'>
          {detailList.map((item) => (
            <div
              key={item.id}
              className='flex flex-col items-center justify-center'
            >
              <span className='font-semibold text-sm'>{item.value}</span>
              <p className='text-xs'>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className='font-medium text-xs'>{user.fullName}</p>
        {user.bio && (
          <span
            aria-description='biography'
            className='text-xs text-slate-500 '
          >
            {user.bio}
          </span>
        )}
      </div>
    </div>
  )
}
