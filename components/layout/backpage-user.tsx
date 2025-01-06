'use client'

import { useEffect, useState } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

import EllipsisToolbar from '../profile/tools/ellipsis-toolbar'
import { IUser } from '@/lib/interface'
import { defaultUser } from '@/lib/const'
import { getUserProfile } from '@/services/https/userService'

export default function BackpageUser() {
  const router = useRouter()
  const pathName = usePathname()
  const params = useParams<{ username: string }>()

  const [errorStatus, setErrorStatus] = useState<number>(0)
  const [user, setUser] = useState<IUser>(defaultUser)

  const conditionRender =
    params &&
    (pathName === `/account/${params.username}` || errorStatus === 404)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (params) {
          const response = await getUserProfile({
            username: params.username,
          })
          setUser(response.user)
        }
      } catch (error: any) {
        setErrorStatus(error.status)
        // window.location.replace('/')
      }
    }
    fetchUser()
  }, [])

  return (
    <div className='fixed w-full md:w-primary top-0 z-50 bg-white py-3 border-b-2 border-gray-200'>
      <div className='absolute' onClick={() => router.back()}>
        <ChevronLeft />
      </div>
      {params && (
        <p className='text-center text-sm font-medium'>{params.username}</p>
      )}
      {conditionRender && (
        <div className='absolute right-2 top-3'>
          <EllipsisToolbar user={user} />
        </div>
      )}
    </div>
  )
}
