'use client'

import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export default function Backpage() {
  const t = useTranslations()
  const router = useRouter()
  const pathname = usePathname()
  const value = pathname.split('/settings/')[1]
  const title = value.replace(/-/g, '_')

  return (
    <div className='p-3 h-10  border-b-[1px] flex items-center '>
      <div className='' onClick={() => router.back()}>
        <ChevronLeft />
      </div>
      <p className=' text-sm text-center w-full font-medium'>
        {t(`title.${title}`)}
      </p>
    </div>
  )
}
