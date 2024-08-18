import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import React, { useTransition } from 'react'

export default function Page() {
  const t = useTranslations('button')
  return (
    <div>
      Home Page
      <Button>{t('sign_in')}</Button>
    </div>
  )
}
