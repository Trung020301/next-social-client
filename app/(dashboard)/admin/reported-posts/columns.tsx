'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
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
import CardPostAdmin from '@/components/admin/card-post'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/components/hooks/use-toast'
import {
  changeStatusResolved,
  deletePostByAdmin,
} from '@/services/https/adminServices'

export type ReportedPost = {
  _id: string
  requestUserId: string
  reportedPostId: string
  reason: string
  resolved: boolean
  createdAt: Date
}

export const columns: ColumnDef<ReportedPost>[] = [
  {
    accessorKey: 'resolved',
    header: 'Resolved',
    cell: ({ row }) => (
      <Badge variant={row.original.resolved ? 'default' : 'secondary'}>
        {row.getValue('resolved') ? 'Resolved' : 'Unresolved'}
      </Badge>
    ),
  },
  {
    accessorKey: 'reportedPostId',
    header: 'Reported Post ID',
    cell: ({ row }) => (
      <div className='text-sm font-medium w-[150px] truncate'>
        {row.getValue('reportedPostId')}
      </div>
    ),
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
    cell: ({ row }) => (
      <div>
        <div className='text-sm w-[150px] truncate'>
          {row.getValue('reason')}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Time Reported',
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const t = useTranslations()
      const post = row.original
      const [loading, setLoading] = useState(false)
      const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
      const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
      const [isMenuOpen, setIsMenuOpen] = useState(false)
      const [resolvedStatus, setResolvedStatus] = useState(post.resolved)
      const menuRef = useRef<HTMLDivElement>(null)

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
      const updateStatus = async () => {
        try {
          setLoading(true)
          const response = await changeStatusResolved({
            reportedPostId: post._id,
            resolve: resolvedStatus,
          })
          if (response.status === 200) {
            setResolvedStatus(!resolvedStatus)
            toast({
              variant: 'success',
              description: t('success.update_successfully'),
            })
            setIsUpdateDialogOpen(false)
          } else {
            toast({
              variant: 'destructive',
              description: t('error.unexpected'),
            })
          }
          setLoading(false)
        } catch (error) {
          setLoading(false)
          toast({
            variant: 'destructive',
            description: t('error.unexpected'),
          })
        }
      }

      const deletePost = async (postId: string) => {
        try {
          setLoading(true)
          const res = await deletePostByAdmin(postId)
          if (res.status === 'success') {
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
                <button
                  className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100'
                  onClick={() => {
                    setIsUpdateDialogOpen(true)
                    setIsMenuOpen(false)
                  }}
                >
                  {t('modal.button.update_status')}
                </button>
              </div>
            )}
          </div>

          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogTrigger />
            <DialogContent>
              <DialogTitle>{t('modal.title.post_detail')}</DialogTitle>
              <DialogDescription>
                <CardPostAdmin postId={post.reportedPostId} />
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
                  onClick={() => deletePost(post.reportedPostId)}
                >
                  {t('button.confirm')}
                </Button>
                <DialogClose asChild>
                  <Button variant='secondary'>{t('button.cancel')}</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog
            open={isUpdateDialogOpen}
            onOpenChange={setIsUpdateDialogOpen}
          >
            <DialogTrigger />
            <DialogContent>
              <DialogTitle>{t('modal.button.update_status')}</DialogTitle>
              <DialogDescription>
                <Select
                  value={resolvedStatus.toString()}
                  onValueChange={(value) => setResolvedStatus(value === 'true')}
                >
                  <SelectTrigger>
                    {resolvedStatus
                      ? t('modal.select.resolved')
                      : t('modal.select.unresolved')}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='true'>
                      {t('modal.select.resolved')}
                    </SelectItem>
                    <SelectItem value='false'>
                      {t('modal.select.unresolved')}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </DialogDescription>
              <DialogFooter className='flex'>
                <Button onClick={updateStatus}>{t('button.update')}</Button>
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
