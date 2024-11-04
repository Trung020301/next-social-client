'use client'

import React from 'react'
import {
  BookMarked,
  Clock,
  Menu,
  ScanQrCode,
  Settings,
  SquareActivity,
  Star,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { SettingsProps } from '@/types'
import { Drawer } from 'vaul'
import Link from 'next/link'

export default function UserSetting() {
  const t = useTranslations()
  const [open, setOpen] = React.useState(false)
  const listSetting: SettingsProps[] = [
    {
      icon: <Settings />,
      title: t('settings.setting_privacy'),
      value: 'settings_privacy',
    },
    {
      icon: <SquareActivity />,
      title: t('settings.your_activity'),
      value: 'your_activity',
    },
    {
      icon: <Clock />,
      title: t('settings.archives'),
      value: 'archives',
    },
    {
      icon: <ScanQrCode />,
      title: t('settings.qr_code'),
      value: 'qr_code',
    },
    {
      icon: <BookMarked />,
      title: t('settings.saved'),
      value: 'saved',
    },
    {
      icon: <Star />,
      title: t('settings.favorite'),
      value: 'favorite',
    },
  ]

  // Handlers
  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger className='relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden '>
        <Menu size={24} />
      </Drawer.Trigger>
      <Drawer.Description />
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 bg-black/40' />
        <Drawer.Content className='bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none'>
          <div className='p-4 bg-white rounded-t-[10px] flex-1'>
            <div className='mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-2' />
            <div className='max-w-md mx-auto'>
              <Drawer.Title className='font-medium mb-4 text-gray-900' />
              {listSetting.map((setting, index) => (
                <Link
                  href={`/settings/${setting.value}`}
                  key={index}
                  className='flex items-center gap-4 py-2 border-b-[1px]'
                  onClick={() => setOpen(false)}
                >
                  <div>{setting.icon}</div>
                  <p className='text-sm'>{setting.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
