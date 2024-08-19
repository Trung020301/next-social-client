import LocaleSwitcher from '@/components/LocaleSwitcher'
import React, { Suspense } from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className='h-screen bg-sky-50'>
      <LocaleSwitcher />
      <Suspense>{children}</Suspense>
    </section>
  )
}
