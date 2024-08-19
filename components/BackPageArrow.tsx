'use client'

import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import React from 'react'
import { TooltipProvider } from './ui/tooltip'

export default function BackPageArrow() {
  const router = useRouter()

  return (
    <TooltipProvider>
      <div className='absolute top-8 left-8'>
        <ArrowLeftIcon
          className='size-6 text-primary cursor-pointer'
          onClick={() => router.back()}
        />
      </div>
    </TooltipProvider>
  )
}
