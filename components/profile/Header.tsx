'use client'

import { useEffect, useState } from 'react'
import { getMyProfile } from '@/services/https/userService'
import { ChevronDown, Lock } from 'lucide-react'
import { IUser } from '@/lib/interface'

export default function Header() {
  const [user, setUser] = useState<IUser>()
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
      <span>{user?.username}</span>
      <span>
        <ChevronDown size={16} />
      </span>
    </p>
  )
}
