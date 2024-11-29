import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Ellipsis } from 'lucide-react'
import { CardPostProps } from '@/types'
import { useTranslations } from 'next-intl'

export default function DropDownMenu() {
  const t = useTranslations('typography')
  const DropDownMenuItemList = [
    {
      label: t('hide_post'),
    },
    {
      label: t('report_post'),
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {DropDownMenuItemList.map((item, index) => (
          <DropdownMenuItem key={index}>{item.label}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
