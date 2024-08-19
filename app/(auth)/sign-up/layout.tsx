import BackPageArrow from '@/components/BackPageArrow'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <BackPageArrow />
      <>{children}</>
    </section>
  )
}
