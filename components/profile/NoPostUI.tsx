import React from 'react'
import Image from 'next/image'
import noPostImage from '@/public/images/no-post.png'
import { useTranslations } from 'next-intl'

export default function NoPostUI() {
  const t = useTranslations()
  return (
    <div className='flex items-center justify-center flex-col'>
      <Image
        width={100}
        height={100}
        src={noPostImage}
        alt='No post image'
        priority
        className='w-[100px] h-[100px] object-cover object-center'
      />
      <p className='text-lg text-gray-500'>{t('typography.no_post')}</p>
    </div>
  )
}
