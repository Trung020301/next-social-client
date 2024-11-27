'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'
import { pathRoute } from '@/lib/const'

type CardUserProps = {
  _id: string
  fullname: string
  username: string
  avatar: string
  followers: string[]
}

export default function CardUser({ user }: { user: CardUserProps }) {
  const [isFollowed, setIsFollowed] = useState<boolean>(false)
  const t = useTranslations()
  const handleFollow = () => {
    setIsFollowed(!isFollowed)
  }

  return (
    <div className='shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded w-36 flex flex-col items-center justify-center p-2'>
      <div className='flex flex-col items-center justify-center'>
        <Link href={`${pathRoute.ACCOUNT}/${user.username}`}>
          <CldImage
            src={user.avatar}
            alt='avatar'
            width={64}
            height={64}
            className='rounded-full'
          />
        </Link>
        <div className='text-center py-2'>
          <p className='text-xs font-semibold'>{user.fullname}</p>
          <p className='text-xs font-medium text-gray-600 '>
            Có tran.d.trung và 1 người khác theo dõi
          </p>
        </div>
      </div>
      <button
        onClick={handleFollow}
        className='px-6 py-1 bg-sky-600 rounded text-xs text-white font-medium'
      >
        {isFollowed ? t('typography.unfollow') : t('button.follow')}
      </button>
    </div>
  )
}
