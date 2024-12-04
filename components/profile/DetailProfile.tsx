'use client'

import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { AvatarUser } from '../AvatarUser'
import { getMyProfile } from '@/services/https/userService'
import { IPost, IUser } from '@/lib/interface'
import { defaultUser, TYPE_PROFILE } from '@/lib/const'
import { DetailProfileProps } from '@/types'

export default function DetailProfile({
  type,
  user,
}: {
  type: string
  user?: DetailProfileProps
}) {
  const t = useTranslations()
  const [userProfile, setUserProfile] = useState<IUser>(defaultUser)
  const [posts, setPosts] = useState<IPost[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (type === TYPE_PROFILE.MY_PROFILE) {
      const fetchPosts = async () => {
        try {
          setLoading(true)
          const response = await getMyProfile()
          setUserProfile(response.user)
          setPosts(response.posts)
          setLoading(false)
        } catch (error: any) {
          setLoading(false)
          setError(error.message)
        }
      }
      fetchPosts()
    } else {
      if (user) {
        setUserProfile(user.user)
      }
    }
  }, [])

  const detailList = [
    {
      id: 1,
      title: t('typography.posts'),
      value: type === TYPE_PROFILE.MY_PROFILE ? posts.length : user?.posts || 0,
    },
    {
      id: 2,
      title: t('typography.followers'),
      value: userProfile?.followers.length,
    },
    {
      id: 3,
      title: t('typography.following'),
      value: userProfile?.following.length,
    },
  ]

  if (loading) {
    return (
      <div className='px-2'>
        <div className='flex items-center py-2'>
          <AvatarUser
            username={userProfile.username}
            src={userProfile?.avatar?.url}
            hasStory={userProfile.hasStory}
            width={64}
            height={64}
            loading={loading}
          />
          <div className='flex items-center justify-around flex-[4]'>
            {detailList.map((item) => (
              <div
                key={item.id}
                className='flex flex-col items-center justify-center'
              >
                <span className='font-semibold text-sm'>
                  <div>...</div>
                </span>
                <p className='text-xs'>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='px-2'>
        <p className='text-red-500'>{error}</p>
      </div>
    )
  }

  return (
    <div className='px-2'>
      <div className='flex items-center py-2'>
        <AvatarUser
          username={userProfile.username}
          src={userProfile?.avatar?.url}
          hasStory={userProfile.hasStory}
          width={64}
          height={64}
          loading={loading}
        />
        <div className='flex items-center justify-around flex-[4]'>
          {detailList.map((item) => (
            <div
              key={item.id}
              className='flex flex-col items-center justify-center'
            >
              <span className='font-semibold text-sm'>
                <span className='text-xs text-gray-600'>{item.value}</span>
              </span>
              <p className='text-xs'>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className='font-medium text-xs'>{userProfile.fullName}</p>
        {userProfile.bio && (
          <span
            aria-description='biography'
            className='text-xs text-slate-500 '
          >
            {userProfile.bio}
          </span>
        )}
      </div>
    </div>
  )
}
