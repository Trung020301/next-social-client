'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

import { Separator } from '../ui/separator'
import EllipsisToolbar from '../profile/tools/ellipsis-toolbar'

export default function BackpageUser() {
  const router = useRouter()
  const pathname = usePathname().slice(1)

  return (
    <div className='py-3'>
      <div className='absolute' onClick={() => router.back()}>
        <ChevronLeft />
      </div>
      <p className='text-center text-sm font-medium'>{pathname}</p>
      <div className='absolute right-2 top-3'>
        <EllipsisToolbar />
      </div>
      <div className='pt-2'>
        <Separator />
      </div>
    </div>
  )
}
