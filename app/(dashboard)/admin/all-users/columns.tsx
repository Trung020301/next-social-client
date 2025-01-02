'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef, TableMeta } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { useTranslations } from 'next-intl'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/components/hooks/use-toast'
import {
  banUserByAdmin,
  deleteUserByAdmin,
  unbanUserByAdmin,
} from '@/services/https/adminServices'

export type User = {
  _id: string
  userId: string
  name: string
  status: string
  role: string
  createdAt: Date
}

type CustomTableMeta = TableMeta<User> & {
  refreshData: () => void
}

export const columns: ColumnDef<User, CustomTableMeta>[] = [
  {
    accessorKey: '_id',
    header: 'User ID',
    cell: ({ row }) => (
      <div className='text-sm font-medium w-[150px] truncate'>
        {row.getValue('_id')}
      </div>
    ),
  },
  {
    accessorKey: 'fullName',
    header: 'Name',
    cell: ({ row }) => (
      <div className='text-sm w-[150px] truncate'>
        {row.getValue('fullName')}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge
        variant={row.getValue('status') === 'active' ? 'default' : 'secondary'}
      >
        {row.getValue('status')}
      </Badge>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => <div className='text-sm'>{row.getValue('role')}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const t = useTranslations()
      const user = row.original
      const [loading, setLoading] = useState(false)
      const [isBanDialogOpen, setIsBanDialogOpen] = useState(false)
      const [isMenuOpen, setIsMenuOpen] = useState(false)
      const menuRef = useRef<HTMLDivElement>(null)
      const refreshData = (table.options.meta as CustomTableMeta).refreshData // Access refreshData from table options

      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node)
          ) {
            setIsMenuOpen(false)
          }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
          document.removeEventListener('mousedown', handleClickOutside)
        }
      }, [menuRef])

      const banUser = async (userId: string) => {
        try {
          setLoading(true)
          const res = await banUserByAdmin(userId)
          if (res.status === 'success') {
            refreshData() // Call refreshData after successful ban
            setIsBanDialogOpen(false)
            toast({
              variant: 'success',
              description: t('success.ban_successfully'),
            })
          }
        } catch (error) {
          toast({
            variant: 'destructive',
            description: t('error.unexpected'),
          })
        } finally {
          setLoading(false)
        }
      }

      const unbanUser = async (userId: string) => {
        try {
          setLoading(true)
          const res = await unbanUserByAdmin(userId)
          if (res.status === 'success') {
            refreshData() // Call refreshData after successful ban
            setIsBanDialogOpen(false)
            toast({
              variant: 'success',
              description: t('success.unban_successfully'),
            })
          }
        } catch (error) {
          toast({
            variant: 'destructive',
            description: t('error.unexpected'),
          })
        } finally {
          setLoading(false)
        }
      }

      // const deleteUser = async (userId: string) => {
      //   try {
      //     setLoading(true)
      //     const res = await deleteUserByAdmin(userId)
      //     if (res.status === 200) {
      //       refreshData() // Call refreshData after successful delete
      //       toast({
      //         variant: 'success',
      //         description: t('success.delete_successfully'),
      //       })
      //     }
      //   } catch (error) {
      //     toast({
      //       variant: 'destructive',
      //       description: t('error.unexpected'),
      //     })
      //   } finally {
      //     setLoading(false)
      //   }
      // }

      return (
        <>
          <div className='relative z-10' ref={menuRef}>
            <Button
              variant='ghost'
              className='h-8 w-8 p-0'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MoreHorizontal className='h-4 w-4' />
            </Button>
            {isMenuOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50'>
                <button
                  className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100'
                  onClick={() => {
                    setIsBanDialogOpen(true)
                    setIsMenuOpen(false)
                  }}
                >
                  {user.status === 'active'
                    ? t('button.ban_user')
                    : t('button.unban_user')}
                </button>
                {/* <button
                  className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100'
                  onClick={() => {
                    setIsDeleteDialogOpen(true)
                    setIsMenuOpen(false)
                  }}
                >
                  {t('button.delete_user')}
                </button> */}
              </div>
            )}
          </div>

          <Dialog open={isBanDialogOpen} onOpenChange={setIsBanDialogOpen}>
            <DialogTrigger />
            <DialogContent>
              <DialogTitle>
                {user.status === 'active'
                  ? t('modal.title.ban_user')
                  : t('modal.title.unban_user')}
              </DialogTitle>
              <DialogDescription>
                {user.status === 'active'
                  ? t('modal.description.ban_user')
                  : t('modal.description.unban_user')}
              </DialogDescription>
              <DialogFooter className='flex'>
                <Button
                  variant='destructive'
                  disabled={loading}
                  onClick={() =>
                    user.status === 'active'
                      ? banUser(user._id)
                      : unbanUser(user._id)
                  }
                >
                  {t('button.confirm')}
                </Button>
                <DialogClose asChild>
                  <Button variant='secondary'>{t('button.cancel')}</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogTrigger />
            <DialogContent>
              <DialogTitle>{t('modal.title.delete_user')}</DialogTitle>
              <DialogDescription>
                {t('modal.description.delete_user')}
              </DialogDescription>
              <DialogFooter className='flex'>
                <Button
                  variant='destructive'
                  onClick={() => deleteUser(user._id)}
                >
                  {t('button.confirm')}
                </Button>
                <DialogClose asChild>
                  <Button variant='secondary'>{t('button.cancel')}</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog> */}
        </>
      )
    },
  },
]
