import React, { Suspense } from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className='h-screen '>
      <Suspense>{children}</Suspense>
    </section>
  )
}
