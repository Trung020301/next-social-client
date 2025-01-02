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
import { deletePostByAdmin } from '@/services/https/adminServices'
import CardPostAdmin from '@/components/admin/card-post'

export type Post = {
  _id: string
  title: string
  content: string
  status: string
  createdAt: Date
}

type CustomTableMeta = TableMeta<Post> & {
  refreshData: () => void
}

export const columns: ColumnDef<Post, CustomTableMeta>[] = [
  {
    accessorKey: '_id',
    header: 'Post ID',
    cell: ({ row }) => (
      <div className='text-sm font-medium w-[150px] truncate'>
        {row.getValue('_id')}
      </div>
    ),
  },
  {
    accessorKey: 'content',
    header: 'Content',
    cell: ({ row }) => (
      <div className='text-sm w-[150px] truncate'>
        {row.getValue('content')}
      </div>
    ),
  },
  {
    accessorKey: 'userId',
    header: 'User ID',
    cell: ({ row }) => (
      <div className='text-sm font-medium w-[150px] truncate'>
        {row.getValue('userId')}
      </div>
    ),
  },
  {
    accessorKey: 'visibility',
    header: 'Visibility',
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
      const post = row.original
      const [loading, setLoading] = useState(false)
      const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
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

      const deletePost = async (postId: string) => {
        try {
          setLoading(true)
          const res = await deletePostByAdmin(postId)
          if (res.status === 'success') {
            refreshData() // Call refreshData after successful delete
            setIsDeleteDialogOpen(false)
            toast({
              variant: 'success',
              description: t('success.delete_successfully'),
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
                    setIsViewDialogOpen(true)
                    setIsMenuOpen(false)
                  }}
                >
                  {t('button.view_post')}
                </button>
                <button
                  className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100'
                  onClick={() => {
                    setIsDeleteDialogOpen(true)
                    setIsMenuOpen(false)
                  }}
                >
                  {t('button.delete_post')}
                </button>
              </div>
            )}
          </div>

          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogTrigger />
            <DialogContent>
              <DialogTitle>{t('modal.title.post_detail')}</DialogTitle>
              <DialogDescription>
                <CardPostAdmin postId={post._id} />
              </DialogDescription>
              <DialogFooter>
                <Button onClick={() => setIsViewDialogOpen(false)}>
                  {t('button.close')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogTrigger />
            <DialogContent>
              <DialogTitle>{t('modal.title.delete_post')}</DialogTitle>
              <DialogDescription>
                {t('modal.description.delete_post')}
              </DialogDescription>
              <DialogFooter className='flex'>
                <Button
                  variant='destructive'
                  disabled={loading}
                  onClick={() => deletePost(post._id)}
                >
                  {t('button.confirm')}
                </Button>
                <DialogClose asChild>
                  <Button variant='secondary'>{t('button.cancel')}</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )
    },
  },
]
