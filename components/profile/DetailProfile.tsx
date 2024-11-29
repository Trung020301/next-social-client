'use client'

import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { AvatarUser } from '../AvatarUser'
import { getMyProfile, getUserProfile } from '@/services/https/userService'
import { IPost, IUser } from '@/lib/interface'
import { defaultUser, TYPE_PROFILE } from '@/lib/const'
import { useParams } from 'next/navigation'

export default function DetailProfile({ type }: { type: string }) {
  const t = useTranslations()
  const [user, setUser] = useState<IUser>(defaultUser)
  const [posts, setPosts] = useState<IPost[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const params = useParams<{ username: string }>()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const response =
          type === TYPE_PROFILE.MY_PROFILE
            ? await getMyProfile()
            : await getUserProfile(params)
        setUser(response.user)
        setPosts(response.posts)
        setLoading(false)
      } catch (error: any) {
        setLoading(false)
        setError(error.message)
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
      value: user?.followers.length,
    },
    {
      id: 3,
      title: t('typography.following'),
      value: user?.following.length,
    },
  ]

  if (loading) {
    return (
      <div className='px-2'>
        <div className='flex items-center py-2'>
          <AvatarUser
            username={user.username}
            src={user?.avatar?.url}
            hasStory={user.hasStory}
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
          username={user.username}
          src={user?.avatar?.url}
          hasStory={user.hasStory}
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
