'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'
import { defaultAvatar, pathRoute } from '@/lib/const'
import { UserExploreProps } from '@/types'
import { Skeleton } from '@/components/ui/skeleton'
import { toggleFollowUser } from '@/services/https/userService'
import { toast } from '@/components/hooks/use-toast'

export default function CardUser({
  user,
  loading = false,
}: {
  user: UserExploreProps
  loading?: boolean
}) {
  const t = useTranslations()

  const [isFollowed, setIsFollowed] = useState<boolean>(false)
  const [loadingState, setLoadingState] = useState(false)

  const handleFollow = async (userId: string) => {
    try {
      setLoadingState(true)
      const response = await toggleFollowUser(userId)
      if (response.status === 201) {
        setIsFollowed((prev) => !prev)
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        description: t('error.unexpected'),
      })
    } finally {
      setLoadingState(false)
    }
  }

  if (loading) {
    return (
      <div className='shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-36 rounded w-36 flex flex-col items-center justify-center p-2'>
        <Skeleton className='w-16 h-16 rounded-full bg-gray-300' />
        <div className='text-center py-2'>
          <Skeleton className='h-2 bg-gray-300' />
          <p className='text-xs font-medium text-gray-600 '>
            {t('typography.recommend_for_you')}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded w-36 flex flex-col items-center justify-center p-2'>
      <div className='flex flex-col items-center justify-center'>
        <Link href={`${pathRoute.ACCOUNT}/${user.username}`}>
          <CldImage
            src={user.avatar?.url || defaultAvatar}
            alt='avatar'
            width={64}
            height={64}
            className='w-[64px] h-[64px] rounded-full'
          />
        </Link>
        <div className='text-center py-2'>
          <p className='text-xs font-semibold'>{user.fullName}</p>
          <p className='text-xs font-medium text-gray-600 '>
            {t('typography.recommend_for_you')}
          </p>
        </div>
      </div>
      <button
        onClick={() => handleFollow(user._id)}
        className='px-6 py-1 bg-sky-600 rounded text-xs text-white font-medium'
        disabled={loadingState}
      >
        {isFollowed ? t('typography.unfollow') : t('button.follow')}
      </button>
    </div>
  )
}
