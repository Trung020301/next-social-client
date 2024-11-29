'use client'

import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { UserMinus, UserPlus } from 'lucide-react'
import Link from 'next/link'

import useToggle from '@/hooks/useToggle'
import CardUser from './CardUser'
import { pathRoute, TYPE_PROFILE } from '@/lib/const'
import {
  getUserExplore,
  getUserExploreUserProfile,
} from '@/services/https/userService'
import { UserExploreProps } from '@/types'
import { useParams } from 'next/navigation'

export default function ExploreUserComp({ type }: { type: string }) {
  const params = useParams<{ username: string }>()

  const [isToggle, toggle] = useToggle(true)
  const [isFollowed, setIsFollowed] = useToggle(false)
  const [listUser, setListUser] = useState<UserExploreProps[]>([])
  const [loading, setLoading] = useState(false)

  const t = useTranslations()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response =
          type === TYPE_PROFILE.MY_PROFILE
            ? await getUserExplore()
            : await getUserExploreUserProfile({
                username: params.username,
              })
        setListUser(response.data.users)
      } catch (error) {
        throw new Error()
      }
    }
    fetchUsers()
  }, [])

  // Handlers
  const handleFollow = () => {
    setIsFollowed()
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
            {listUser.map((user) => (
              <div className='w-36' key={user._id}>
                <CardUser user={user} loading={loading} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
