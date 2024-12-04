'use client'

import { useEffect, useState } from 'react'
import { IUserContext, UserContext } from '@/context/UserContext'

interface UserProviderProps {
  children: React.ReactNode
}

export default function UserProvider({ children }: UserProviderProps) {
  const [currentUser, setUser] = useState<IUserContext | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser))
    } else {
      localStorage.removeItem('user')
    }
  }, [currentUser])

  return (
    <UserContext.Provider value={{ currentUser, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
