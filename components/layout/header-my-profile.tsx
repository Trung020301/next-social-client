'use client'

import React from 'react'
import { ChevronLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

export default function HeaderMyProfileLayout() {
  const t = useTranslations()
  const router = useRouter()
  const pathName = usePathname()
  const title = pathName.split('/')[2]

  const renderTitle = (title: string) => {
    switch (title) {
      case 'posts':
        return t('title.my_posts')
      case 'reels':
        return t('title.my_reels')
      case 'shared':
        return t('title.shared_posts')
      default:
        return ''
    }
  }

  return (
    <div className='fixed w-full top-0 z-50 bg-white py-2 h-9 border-b-2 border-gray-200'>
      <div className='absolute' onClick={() => router.back()}>
        <ChevronLeft />
      </div>
      <p className='text-center text-sm font-medium'>{renderTitle(title)}</p>
    </div>
  )
}
