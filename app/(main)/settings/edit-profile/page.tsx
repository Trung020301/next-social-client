'use client'

import React from 'react'
import { Separator } from '@/components/ui/separator'
import { CldImage } from 'next-cloudinary'
import { useTranslations } from 'next-intl'

export default function page() {
  const t = useTranslations()
  const fakeUser = {
    name: 'John Doe',
    avatar:
      'https://res.cloudinary.com/your-cloud-name/image/upload/v166123456',
    username: 'johndoe',
    phone: '0123456789',
    bio: '',
    gender: 'Male',
  }
  const listSettingFields = [
    {
      label: t('typography.name'),
      value: fakeUser.name,
    },
    {
      label: t('typography.username'),
      value: fakeUser.username,
    },
    {
      label: t('typography.phone'),
      value: fakeUser.phone || '',
    },
    {
      label: t('typography.bio'),
      value: fakeUser.bio || '',
    },
    {
      label: t('typography.gender'),
      value: fakeUser.gender || '',
    },
  ]
  return (
    <div>
      <div className='flex flex-col items-center justify-center pb-2'>
        <CldImage
          alt='avatar'
          priority
          src='https://res.cloudinary.com/dpqhuucyq/image/upload/v1730266896/avatars/2_oreucm.jpg'
          width={80}
          height={80}
          className='w-20 h-20 rounded-full'
        />
        <span className='text-xs font-medium text-blue-400 mt-1'>
          {t('typography.change_avatar')}
        </span>
      </div>
      <Separator />
      <div>
        {listSettingFields.map((field, index) => (
          <div
            key={index}
            className='px-2 flex items-center py-2 gap-4 border-b border-gray-300 text-sm'
          >
            <span className='flex-[2]'>{field.label}</span>
            <span className='flex-[5] text-gray-600'>{field.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
