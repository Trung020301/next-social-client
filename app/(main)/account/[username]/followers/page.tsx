'use client'

import { AvatarUser } from '@/components/AvatarUser'
import LoadingChild from '@/components/fallback/LoadingChild'
import { pathRoute } from '@/lib/const'
import { IUserId } from '@/lib/interface'
import { getFollowersOfUser } from '@/services/https/userService'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {
  const t = useTranslations()
  const params = useParams<{ username: string }>()

  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>('')
  const [users, setUsers] = useState<IUserId[] | null>([])
  const [loadingState, setLoadingState] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      if (!params) {
        setLoading(false)
        setError('Params is null')
        return
      }
      try {
        const response = await getFollowersOfUser({ username: params.username })
        setUsers(response.data.users)
        setLoading(false)
      } catch (error: any) {
        setLoading(false)
        setError(error.message)
      }
    }
    fetchUsers()
  }, [])

  // const handleUnblockUser = async (userId: string) => {
  //   try {
  //     setLoadingState(true)
  //     const response = await unBlockUser(userId)
  //     if (response.status === 201) {
  //       toast({
  //         variant: 'success',
  //         description: t('toast.unblock_success'),
  //       })
  //       setUsers((users || []).filter((u) => u._id !== userId))
  //     }
  //   } catch (error: any) {
  //     toast({
  //       variant: 'destructive',
  //       description: t('error.unexpected'),
  //     })
  //   } finally {
  //     setLoadingState(false)
  //   }
  // }

  if (loading) {
    return <LoadingChild />
  }

  if (error) {
    return <p className='text-red-500 text-sm'>{error}</p>
  }

  if (!users || (users.length === 0 && !loading)) {
    return (
      <div className='text-center text-gray-500 py-2 text-sm'>
        {t('notify.no_user_found')}
      </div>
    )
  }

  return (
    <ul>
      {users?.map((user, index) => (
        <div key={user._id}>
          <li
            className={`p-1 flex items-center justify-between gap-2 cursor-pointer ${
              index % 2 === 0 ? 'bg-white' : 'bg-slate-100'
            }`}
          >
            <Link
              href={`${pathRoute.ACCOUNT}/${user.username}`}
              className='flex items-center gap-2 hover:bg-slate-100 w-full'
            >
              <AvatarUser src={user?.avatar?.url} username={user.username} />
              <span className='text-xs font-semibold'>{user.username}</span>
            </Link>
            {/* <button
              className='bg-red-400 rounded-md py-1 px-2 text-xs text-white font-medium'
              // onClick={() => handleUnblockUser(user._id)}
              disabled={loadingState}
            >
              {t('typography.unblock')}
            </button> */}
          </li>
        </div>
      ))}
    </ul>
  )
}
