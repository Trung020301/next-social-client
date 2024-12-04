'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

import EllipsisToolbar from '../profile/tools/ellipsis-toolbar'
import { IUser } from '@/lib/interface'
import { defaultUser } from '@/lib/const'
import { getUserProfile } from '@/services/https/userService'

export default function BackpageUser() {
  const router = useRouter()
  const params = useParams<{ username: string }>()

  const [user, setUser] = useState<IUser>(defaultUser)
  const [errorStatus, setErrorStatus] = useState<number>(0)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserProfile({
          username: params.username,
        })
        setUser(response.user)
      } catch (error: any) {
        console.error(error)
        setErrorStatus(error.status)
      }
    }
    fetchUser()
  }, [])

  return (
    <div className='sticky top-0 z-50 bg-white py-3 border-b-2 border-gray-200'>
      <div className='absolute' onClick={() => router.back()}>
        <ChevronLeft />
      </div>
      <p className='text-center text-sm font-medium'>{params.username}</p>
      {errorStatus !== 404 && (
        <div className='absolute right-2 top-3'>
          <EllipsisToolbar user={user} />
        </div>
      )}
    </div>
  )
}
