'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { UserMinus, UserPlus } from 'lucide-react'
import Link from 'next/link'

import useToggle from '@/hooks/useToggle'
import { Button } from '@/components/ui/button'
import CardUser from './CardUser'
import { pathRoute } from '@/lib/const'

const fakeUser = {
  _id: '1',
  fullname: 'Lý An Nhiên',
  username: 'ly.an.nhien',
  avatar:
    'https://res.cloudinary.com/dpqhuucyq/image/upload/v1730263036/avatars/1_s8hhrh.jpg',
  followers: ['tran.d.trung', 'nguyen.van.d'],
}

export default function ExploreUserComp({ type }: { type: string }) {
  const [isToggle, toggle] = useToggle(true)
  const [isFollowed, setIsFollowed] = useState<boolean>(false)
  const t = useTranslations()

  const handleFollow = () => {
    setIsFollowed(!isFollowed)
  }

  return (
    <>
      <div className='flex items-center px-2 gap-1'>
        {type === 'my-profile' ? (
          <button className='px-6 py-1 bg-zinc-200 rounded text-xs font-medium'>
            <Link href={`${pathRoute.SETTINGS}/edit-profile`}>
              {t('typography.edit')}
            </Link>
          </button>
        ) : (
          <button
            onClick={handleFollow}
            className='px-6 py-1 bg-sky-600 rounded text-xs text-white font-medium flex-[6]'
          >
            {isFollowed ? t('typography.unfollow') : t('button.follow')}
          </button>
        )}
        {type === 'my-profile' ? (
          <button className='px-6 py-1 bg-zinc-200 rounded text-xs font-medium flex-[6]'>
            {t('typography.share_profile')}
          </button>
        ) : (
          <button className='px-6 py-1 bg-zinc-200 rounded text-xs font-medium flex-[6]'>
            {t('button.chat')}
          </button>
        )}
        <button
          onClick={() => toggle()}
          className={`flex-[0.5] bg-zinc-200 p-1 rounded`}
        >
          {isToggle ? <UserPlus size={16} /> : <UserMinus size={16} />}
        </button>
      </div>
      {isToggle && (
        <div className='px-2 pt-4'>
          <div className='flex items-center justify-between pb-1'>
            <p className='text-xs font-semibold'>
              {t('typography.explore_user')}
            </p>
            <span className='text-xs text-blue-600'>
              {t('typography.view_all')}
            </span>
          </div>
          <div className='flex overflow-x-auto gap-2 py-2 scrollbar-hide'>
            <div className='w-36'>
              <CardUser user={fakeUser} />
            </div>
            <div className='w-36'>
              <CardUser user={fakeUser} />
            </div>
            <div className='w-36'>
              <CardUser user={fakeUser} />
            </div>
            <div className='w-36'>
              <CardUser user={fakeUser} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
