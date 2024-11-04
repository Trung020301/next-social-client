import React from 'react'
import { Ellipsis } from 'lucide-react'
import { Drawer } from 'vaul'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { useTranslations } from 'next-intl'
import { Separator } from '@/components/ui/separator'

export default function EllipsisToolbar() {
  const t = useTranslations()

  const listConfig = [
    {
      label: t('typography.limit'),
      value: 'limit',
    },
    {
      label: t('typography.block'),
      value: 'block',
    },
    {
      label: t('typography.report'),
      value: 'report',
    },
    {
      label: t('typography.copy_url_profile'),
      value: 'copy_url_profile',
    },
    {
      label: t('settings.qr_code'),
      value: 'qr_code',
    },
  ]
  return (
    <Drawer.Root>
      <Drawer.Trigger className=''>
        <Ellipsis />
      </Drawer.Trigger>
      <Drawer.Description />
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 bg-black/40' />
        <Drawer.Content
          className='right-2 left-2 bottom-2 mt-24 fixed z-10 outline-none flex'
          style={
            { '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties
          }
        >
          <div className='px-4 bg-white rounded-[10px] flex-1'>
            <div className='max-w-md mx-auto'>
              <VisuallyHidden.Root>
                <Drawer.Title className='font-medium mb-4 text-gray-900'>
                  Settings
                </Drawer.Title>
              </VisuallyHidden.Root>
            </div>
            {listConfig.map((item, index) => (
              <div
                key={item.value}
                className='flex flex-col justify-center items-center'
              >
                <p className='text-sm text-zinc-800 font-medium py-2'>
                  {item.label}
                </p>
                <Separator />
              </div>
            ))}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
