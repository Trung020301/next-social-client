'use client'
import { useTranslations } from 'next-intl'
import useToggle from '@/hooks/useToggle'
import { UserMinus, UserPlus } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'

export default function ExploreUserComp() {
  const [isToggle, toggle] = useToggle(true)
  const t = useTranslations()
  return (
    <>
      <div className='flex items-center px-2 gap-1'>
        <Button variant='secondary' className=' flex-[4]'>
          {t('typography.edit')}
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
          <div className='flex items-center justify-between'>
            <p className='text-sm font-semibold'>
              {t('typography.explore_user')}
            </p>
            <span className='text-sm text-blue-600'>
              {t('typography.view_all')}
            </span>
          </div>
        </div>
      )}
    </>
  )
}
