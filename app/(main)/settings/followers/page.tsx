'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { toast } from '@/components/hooks/use-toast'
import { getFollowersByMe, removeFollower } from '@/services/https/userService'
import { IUserId } from '@/lib/interface'
import { AvatarUser } from '@/components/AvatarUser'
import Link from 'next/link'
import { pathRoute } from '@/lib/const'
import LoadingChild from '@/components/fallback/LoadingChild'

export default function Page() {
  const t = useTranslations()

  const [results, setResults] = useState<IUserId[] | null>([])
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(true)
  const [loadingState, setLoadingState] = useState(false)

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await getFollowersByMe()
        setResults(response.data.followers)
        setLoading(false)
      } catch (error: any) {
        toast({
          variant: 'destructive',
          description: t('error.unexpected'),
        })
        setError(error?.message)
        setLoading(false)
      }
    }
    fetchFollowers()
  }, [])

  // Handler
  const handleRemoveFollower = async (followerId: string) => {
    try {
      setLoadingState(true)
      const response = await removeFollower(followerId)
      if (response.status === 201)
        setResults(results?.filter((user) => user._id !== followerId) || null)
      setLoadingState(false)
    } catch (error: any) {
      toast({
        variant: 'destructive',
        description: t('error.unexpected'),
      })
      setError(error?.message)
      setLoadingState(false)
    }
  }

  if (results?.length === 0 && !loading) {
    return (
      <div className='text-center text-gray-500 py-2 text-sm'>
        {t('notify.no_user_found')}
      </div>
    )
  }

  if (error) return <div>{error}</div>

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
              className='bg-red-500 rounded-md py-1 px-2 text-xs text-white font-medium'
              onClick={() => handleRemoveFollower(user._id)}
              disabled={loadingState}
            >
              {t('button.delete')}
            </button>
          </li>
        </div>
      ))}
    </ul>
  )
}
