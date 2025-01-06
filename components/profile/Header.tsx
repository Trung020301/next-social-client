'use client'

import { useEffect, useState } from 'react'
import { getMyProfile } from '@/services/https/userService'
import { ChevronDown, FolderCog, Lock } from 'lucide-react'
import { IUser } from '@/lib/interface'
import { defaultUser, pathRoute, ROLE_TYPE } from '@/lib/const'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [user, setUser] = useState<IUser>(defaultUser)
  const router = useRouter()
  useEffect(() => {
    async function fetchUser() {
      const response = await getMyProfile()
      setUser(response.user)
    }
    fetchUser()
  }, [])

  return (
    <p className='font-bold text-xl flex items-center gap-1'>
      <span>
        <Lock size={16} color='gray' />
      </span>
      <span>{user.username}</span>
      <span className='cursor-pointer'>
        {user.role === ROLE_TYPE.ADMIN ? (
          <FolderCog
            onClick={() => router.push(`${pathRoute.ADMIN}`)}
            className='ml-2'
            size={16}
          />
        ) : (
          <ChevronDown size={16} />
        )}
      </span>
    </p>
  )
}
