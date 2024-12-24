import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { useTranslations } from 'next-intl'

interface DeletePostModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const DeletePostModal: React.FC<DeletePostModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const t = useTranslations()
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title.confirm_delete')}</DialogTitle>
          <DialogDescription>
            {t('modal.description.delete_post')}
          </DialogDescription>
          <div className='flex justify-end gap-2'>
            <DialogClose asChild>
              <Button variant='secondary'>{t('button.cancel')}</Button>
            </DialogClose>
            <Button variant='destructive' onClick={onConfirm}>
              {t('button.confirm')}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default DeletePostModal
