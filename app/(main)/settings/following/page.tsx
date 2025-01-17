'use client'

import React, { useEffect, useState } from 'react'
import { IUserId } from '@/lib/interface'
import { toast } from '@/components/hooks/use-toast'
import { useTranslations } from 'next-intl'
import {
  getFollowingByMe,
  toggleFollowUser,
} from '@/services/https/userService'
import { pathRoute } from '@/lib/const'
import { AvatarUser } from '@/components/AvatarUser'
import Link from 'next/link'
import LoadingChild from '@/components/fallback/LoadingChild'

export default function page() {
  const t = useTranslations()

  const [results, setResults] = useState<IUserId[] | null>([])
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(true)
  const [loadingState, setLoadingState] = useState(false)

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await getFollowingByMe()
        const usersWithFollowStatus = response.data.users.map(
          (user: IUserId) => ({
            ...user,
            isFollowed: true,
          }),
        )
        setResults(usersWithFollowStatus)
        setLoading(false)
      } catch (error: any) {
        setLoading(false)
        setError(error?.message)
        toast({
          variant: 'destructive',
          description: t('error.unexpected'),
        })
      }
    }
    fetchFollowing()
  }, [])

  // Handlers
  const handleChangeFollowStatus = async (userId: string) => {
    try {
      setLoadingState(true)
      await toggleFollowUser(userId)
      setResults((prevResults) =>
        prevResults
          ? prevResults.map((user) =>
              user._id === userId
                ? { ...user, isFollowed: !user.isFollowed }
                : user,
            )
          : prevResults,
      )
      setLoadingState(false)
    } catch (error) {
      setLoadingState(false)
      toast({
        variant: 'destructive',
        description: t('error.unexpected'),
      })
    }
  }

  if (error) return <div>{error}</div>

  if (results?.length === 0 && !loading) {
    return (
      <div className='text-center text-gray-500 py-2 text-sm'>
        {t('notify.no_user_found')}
      </div>
    )
  }

  if (loading) return <LoadingChild />

  return (
    <ul>
      {results?.map((user, index) => (
        <div key={user._id}>
          <li
            className={`p-1 flex items-center justify-between gap-2 cursor-pointer ${
              index % 2 === 0 ? 'bg-white' : 'bg-slate-100'
            }`}
          >
            <Link
              href={`${pathRoute.ACCOUNT}/${user.username}`}
              className='flex items-center gap-2 hover:bg-slate-100 '
            >
              <AvatarUser src={user?.avatar?.url} username={user.username} />
              <span className='text-xs font-semibold'>{user.username}</span>
            </Link>
            <button
              className='bg-sky-500 rounded-md py-1 px-2 text-xs text-white font-medium'
              onClick={() => handleChangeFollowStatus(user._id)}
              disabled={loadingState}
            >
              {user.isFollowed ? t('button.unfollow') : t('button.follow')}
            </button>
          </li>
        </div>
      ))}
    </ul>
  )
}
