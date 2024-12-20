'use client'

import React, { useState, useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Ellipsis } from 'lucide-react'
import { CardPostProps } from '@/types'
import { useTranslations } from 'next-intl'
import { Dialog } from '@radix-ui/react-dialog'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import ReportForm from './report-form'

export default function DropDownMenu({
  post,
  onHidePost,
}: CardPostProps & { onHidePost: () => void }) {
  const t = useTranslations()
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null)

  // Handlers
  const handleDialogOpen = (handler: () => React.ReactNode) => {
    setDialogContent(handler())
  }

  const DropDownMenuItemList = [
    {
      label: t('typography.hide_post'),
      value: 'hide_post',
      handler: () => <div>Hide Post</div>,
    },
    {
      label: t('typography.report_post'),
      value: 'report_post',
      handler: () => <ReportForm post={post} onReportSuccess={onHidePost} />,
    },
  ]

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' sideOffset={5}>
          {DropDownMenuItemList.map((item) => (
            <div
              key={item.value}
              className='flex flex-col justify-center items-center'
              onClick={() => handleDialogOpen(item.handler)}
            >
              <DialogTrigger
                className={`text-sm  ${
                  item.value === 'report_post'
                    ? 'text-red-500'
                    : 'text-zinc-800'
                } font-medium py-1`}
              >
                {item.label}
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{item.label}</DialogTitle>
                  <DialogDescription />
                  {dialogContent}
                </DialogHeader>
              </DialogContent>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  )
}
