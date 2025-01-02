import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '../ui/dialog'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { useTranslations } from 'next-intl'
import { Globe, Lock, UserRoundCheck } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { VisibilityType } from '@/types'

interface EditPostModalProps {
  isOpen: boolean
  onClose: () => void
  content: string
  onContentChange: (content: string) => void
  onSubmit: (e: React.FormEvent) => void
  visibility: VisibilityType
  onVisibilityChange: React.Dispatch<React.SetStateAction<VisibilityType>>
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  isOpen,
  onClose,
  content,
  onContentChange,
  onSubmit,
  visibility,
  onVisibilityChange,
}) => {
  const t = useTranslations()
  const listVisibility = [
    {
      value: 'public',
      label: t('label.public'),
      icon: <Globe size={16} />,
    },
    {
      value: 'private',
      label: t('label.private'),
      icon: <Lock size={16} />,
    },
    {
      value: 'followers',
      label: t('label.followers'),
      icon: <UserRoundCheck size={16} />,
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('modal.title.edit_post')}</DialogTitle>
          <DialogDescription hidden />
          <form onSubmit={onSubmit}>
            <Textarea
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              rows={3}
              className='mb-4'
            />
            <Select
              onValueChange={(value) =>
                onVisibilityChange(value as VisibilityType)
              }
              defaultValue={visibility}
              // disabled={}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('label.visibility')} />
              </SelectTrigger>
              <SelectContent>
                {listVisibility.map((item, index) => (
                  <SelectItem key={index} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className='flex justify-end gap-2 mt-2'>
              <DialogClose asChild>
                <Button variant='secondary'>{t('button.cancel')}</Button>
              </DialogClose>
              <Button type='submit' variant='primary'>
                {t('button.save')}
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default EditPostModal
