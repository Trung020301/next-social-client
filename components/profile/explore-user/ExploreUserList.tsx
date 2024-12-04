'use client'

import { useState, useEffect } from 'react'
import { UserExploreProps } from '@/types'
import {
  getUserExplore,
  getUserExploreUserProfile,
} from '@/services/https/userService'
import { TYPE_PROFILE } from '@/lib/const'
import { useParams } from 'next/navigation'
import CardUser from './CardUser'
export default function ExploreUserList({ type }: { type: string }) {
  const [listUser, setListUser] = useState<UserExploreProps[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const params = useParams<{ username: string }>()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response =
          type === TYPE_PROFILE.MY_PROFILE
            ? await getUserExplore()
            : await getUserExploreUserProfile({
                username: params.username,
              })
        setLoading(false)
        setListUser(response.data.users)
      } catch (error) {
        setLoading(false)
        throw new Error()
      }
    }
    fetchUsers()
  }, [])

  return (
    <>
      {listUser.map((user) => (
        <div className='w-36' key={user._id}>
          <CardUser user={user} loading={loading} />
        </div>
      ))}
    </>
  )
}
