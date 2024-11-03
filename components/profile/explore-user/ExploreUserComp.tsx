'use client'
import { useTranslations } from 'next-intl'
import useToggle from '@/hooks/useToggle'
import { UserMinus, UserPlus } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import CardUser from './CardUser'
import Link from 'next/link'
import { pathRoute } from '@/lib/const'

const fakeUser = {
  _id: '1',
  fullname: 'Lý An Nhiên',
  username: 'ly.an.nhien',
  avatar:
    'https://res.cloudinary.com/dpqhuucyq/image/upload/v1730263036/avatars/1_s8hhrh.jpg',
  followers: ['tran.d.trung', 'nguyen.van.d'],
}

export default function ExploreUserComp() {
  const [isToggle, toggle] = useToggle(true)
  const t = useTranslations()
  return (
    <>
      <div className='flex items-center px-2 gap-1'>
        <Button variant='secondary' className=' flex-[4]' asChild>
          <Link href={`${pathRoute.SETTINGS}/edit-profile`}>
            {t('typography.edit')}
          </Link>
        </Button>
        <Button variant='secondary' className='flex-[6]'>
          {t('typography.share_profile')}
        </Button>
        <Button
          onClick={() => toggle()}
          className={`flex-[1] `}
          variant='secondary'
          size='icon'
        >
          {isToggle ? <UserPlus /> : <UserMinus />}
        </Button>
      </div>
      {isToggle && (
        <div className='px-2 pt-4'>
          <div className='flex items-center justify-between pb-1'>
            <p className='text-sm font-semibold'>
              {t('typography.explore_user')}
            </p>
            <span className='text-sm text-blue-600'>
              {t('typography.view_all')}
            </span>
          </div>
          <div className='flex overflow-x-auto gap-2 py-2 scrollbar-hide'>
            <div className='w-36'>
              <CardUser user={fakeUser} />
            </div>
            <div className='w-36'>
              <CardUser user={fakeUser} />
            </div>
            <div className='w-36'>
              <CardUser user={fakeUser} />
            </div>
            <div className='w-36'>
              <CardUser user={fakeUser} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
