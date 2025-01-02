import { pathRoute } from '@/lib/const'
import { BookLock, Contact } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'

export default function Page() {
  const t = useTranslations()

  const listManager = [
    {
      label: t('label.admin.reported_posts'),
      value: 'reported_posts',
      path: `${pathRoute.ADMIN}/reported-posts`,
      icon: <BookLock size={16} />,
    },
    {
      label: t('label.admin.all_users'),
      value: 'all_users',
      path: `${pathRoute.ADMIN}/all-users`,
      icon: <Contact size={16} />,
    },
    {
      label: t('label.admin.all_posts'),
      value: 'all_posts',
      path: `${pathRoute.ADMIN}/all-posts`,
      icon: <BookLock size={16} />,
    },
  ]

  return (
    <div className='px-2'>
      {listManager.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          className='flex items-center py-2 gap-2 border-b-[1px] border-gray-200'
        >
          <span>{item.icon}</span>
          <p className='text-sm font-medium'>{item.label}</p>
        </Link>
      ))}
    </div>
  )
}
