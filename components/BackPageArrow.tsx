'use client'

import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import React from 'react'
import { TooltipProvider } from './ui/tooltip'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@radix-ui/react-tooltip'
import { useTranslations } from 'next-intl'

export default function BackPageArrow() {
  const router = useRouter()
  const t = useTranslations()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className='absolute top-8 left-8'>
            <ArrowLeftIcon
              className='size-6 text-primary cursor-pointer'
              onClick={() => router.back()}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>{t('button.back')}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
