import BackPageArrow from '@/components/BackPageArrow'
import { pathRoute } from '@/lib/const'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  const t = useTranslations()

  return (
    <section>
      <BackPageArrow />
      <>{children}</>
      <p className='text-sm text-center absolute bottom-8 left-0 right-0'>
        {t('typography.have_account')}{' '}
        <Link href={pathRoute.SIGN_IN}>
          <span className='text-primary'>{t('typography.login')}</span>
        </Link>
      </p>
    </section>
  )
}
