'use client'

import { useState } from 'react'
import { Ellipsis } from 'lucide-react'
import { Drawer } from 'vaul'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { useTranslations } from 'next-intl'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { handleBlockUser } from './actions'
import { IUser } from '@/lib/interface'
import LoadingChild from '@/components/fallback/LoadingChild'
import { blockUser } from '@/services/https/userService'

export default function EllipsisToolbar({ user }: { user: IUser }) {
  const t = useTranslations()
  const [loading, setLoading] = useState<boolean>(false)
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null)

  const listConfig = [
    {
      label: t('typography.limit'),
      value: 'limit',
      handler: () => <div>Block Content</div>,
    },
    {
      label: t('typography.block'),
      value: 'block',
      handler: () => (
        <div>
          <p className='text-gray-400'>
            {t('typography.confirm_block_user', {
              username: user.username,
            })}
          </p>
          <div className='flex justify-end gap-2 mt-2'>
            <DialogClose asChild>
              <Button variant='outline'>{t('button.cancel')}</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant='destructive'
                onClick={() => handleBlockUser(user._id)}
              >
                {t('button.confirm')}
              </Button>
            </DialogClose>
          </div>
        </div>
      ),
    },
    {
      label: t('typography.report'),
      value: 'report',
      handler: () => <div>Report Content</div>,
    },
    {
      label: t('typography.copy_url_profile'),
      value: 'copy_url_profile',
      handler: () => <div>Copy URL Profile Content</div>,
    },
    {
      label: t('settings.qr_code'),
      value: 'qr_code',
      handler: () => <div>QR Code Content</div>,
    },
  ]

  if (loading) {
    return <LoadingChild />
  }

  // Handlers
  const handleDialogOpen = (handler: () => React.ReactNode) => {
    setDialogContent(handler())
  }

  const handleBlockUser = async (targetUserId: string) => {
    try {
      setLoading(true)
      const res = await blockUser(targetUserId)
      if (res?.status === 201) {
        window.location.reload()
      }
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      throw new Error(error)
    }
  }

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
            {listConfig.map((item) => (
              <div
                key={item.value}
                className='flex flex-col justify-center items-center'
                onClick={() => handleDialogOpen(item.handler)}
              >
                <Dialog>
                  <DialogTrigger
                    className={`text-sm ${
                      item.value === 'block' ? 'text-red-500' : 'text-zinc-800'
                    } font-medium py-2`}
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
                  <Separator />
                </Dialog>
              </div>
            ))}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
