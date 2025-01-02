'use client'

import React, { useEffect } from 'react'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { checkUserIsAdmin } from '@/services/https/userService'
import { useUser } from '@/hooks/useUser'

export default function HeaderAdmin() {
  const t = useTranslations()
  const router = useRouter()
  const { currentUser } = useUser()
  const userId = currentUser?.userId

  useEffect(() => {
    if (userId) {
      checkUserIsAdmin(userId)
        .then((res) => {
          if (res.isAdmin === false) {
            router.push('/')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  return (
    <div className='p-3 h-10  border-b-[1px] flex items-center '>
      <div className='' onClick={() => router.back()}>
        <ChevronLeft />
      </div>
      <p className=' text-sm text-center w-full font-medium'>
        {t(`title.admin_dashboard`)}
      </p>
    </div>
  )
}
