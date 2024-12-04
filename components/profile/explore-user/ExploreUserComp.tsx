'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { UserMinus, UserPlus } from 'lucide-react'
import Link from 'next/link'
import useToggle from '@/hooks/useToggle'
import { pathRoute, TYPE_PROFILE } from '@/lib/const'
import { useUser } from '@/hooks/useUser'
import ExploreUserList from './ExploreUserList'
import { DetailProfileProps } from '@/types'
import { toggleFollowUser } from '@/services/https/userService'

export default function ExploreUserComp({
  type,
  user,
}: {
  type: string
  user?: DetailProfileProps
}) {
  const { currentUser } = useUser()

  const isFollowing = user?.user.followers.includes(currentUser?.userId ?? '')

  const [isToggle, toggle] = useToggle(true)
  const [isFollowed, setIsFollowed] = useToggle(isFollowing)
  const [error, setError] = useState(false)

  const t = useTranslations()
  // Handlers
  const handleFollow = async () => {
    try {
      if (user?.user._id) {
        await toggleFollowUser(user.user._id)
        setIsFollowed()
      }
    } catch (error: any) {
      setError(error)
    }
  }

  if (error) {
    return <p className='text-red-500'>{error}</p>
  }

  return (
    <>
      <div className='flex items-center px-2 gap-1'>
        {type === TYPE_PROFILE.MY_PROFILE ? (
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
        {type === TYPE_PROFILE.MY_PROFILE ? (
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
            <ExploreUserList type={type} />
          </div>
        </div>
      )}
    </>
  )
}
