'use client'

import React from 'react'
import { UserDetailProps } from '@/types'
import { CldImage } from 'next-cloudinary'
import { useTranslations } from 'next-intl'

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
        <div className='flex-[1]'>
          <CldImage
            alt='avatar'
            src={user.user.avatar}
            width={64}
            height={64}
            className='w-[64px] h-[64px] rounded-full'
          />
        </div>
        <div className='flex items-center justify-around flex-[4]'>
          {detailList.map((item) => (
            <div
              key={item.id}
              className='flex flex-col items-center justify-center'
            >
              <span className='font-semibold'>{item.value}</span>
              <p className='text-sm'>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className='font-medium text-sm'>{user.user.fullname}</p>
        {user.user.bio && (
          <span
            aria-description='biography'
            className='text-sm text-slate-500 '
          >
            {user.user.bio}
          </span>
        )}
      </div>
    </div>
  )
}
