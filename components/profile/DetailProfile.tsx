'use client'

import React from 'react'
import { UserDetailProps } from '@/types'
import { CldImage } from 'next-cloudinary'
import { useTranslations } from 'next-intl'
import { AvatarUser } from '../AvatarUser'

export default function DetailProfile({ user }: { user: UserDetailProps }) {
  const t = useTranslations()
  const { posts, followers, following } = user
  const detailList = [
    {
      id: 1,
      title: t('typography.posts'),
      value: posts.length,
    },
    {
      id: 2,
      title: t('typography.followers'),
      value: followers.length,
    },
    {
      id: 3,
      title: t('typography.following'),
      value: following.length,
    },
  ]

  return (
    <div className='px-2'>
      <div className=' flex items-center py-2'>
        <AvatarUser
          src={user.user.avatar}
          {...user.user}
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
        <p className='font-medium text-xs'>{user.user.fullname}</p>
        {user.user.bio && (
          <span
            aria-description='biography'
            className='text-xs text-slate-500 '
          >
            {user.user.bio}
          </span>
        )}
      </div>
    </div>
  )
}
