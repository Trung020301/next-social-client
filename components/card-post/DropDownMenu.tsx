import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Ellipsis } from 'lucide-react'
import { CardPostProps } from '@/types'
import { useTranslations } from 'next-intl'

export default function DropDownMenu({
  post,
}: {
  post: CardPostProps['content']
}) {
  const t = useTranslations('typography')
  console.log(post)
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
