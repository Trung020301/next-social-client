'use client'

import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { Separator } from '../ui/separator'

export default function Backpage() {
  const t = useTranslations()
  const router = useRouter()
  const pathname = usePathname()
  const value = pathname.split('/settings/')[1]
  const title = value.replace(/-/g, '_')

  return (
    <div className='py-3'>
      <div className='absolute' onClick={() => router.back()}>
        <ChevronLeft />
      </div>
      <p className='text-center text-sm font-medium'>{t(`title.${title}`)}</p>
      <div className='pt-2'>
        <Separator />
      </div>
    </div>
  )
}
