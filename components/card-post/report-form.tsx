import React, { useState } from 'react'
import { Textarea } from '../ui/textarea'
import { useTranslations } from 'next-intl'
import { DialogClose } from '../ui/dialog'
import { Button } from '../ui/button'
import { CardPostProps } from '@/types'
import { reportPost } from '@/services/https/userService'
import { toast } from '../hooks/use-toast'

export default function ReportForm({
  post,
  onReportSuccess,
}: CardPostProps & { onReportSuccess: () => void }) {
  const t = useTranslations()

  const [reason, setReason] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    if (value.length <= 500 && !value.startsWith(' ')) {
      setReason(value)
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const response = await reportPost({
        reportedPostId: post._id,
        reason,
      })
      if (response.status === 201) {
        toast({
          variant: 'success',
          description: t('toast.report_success'),
        })
        onReportSuccess()
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
    <form>
      <div className='flex flex-col justify-end gap-2 mt-2'>
        <Textarea
          placeholder={t('placehoolder.report_reason')}
          value={reason}
          onChange={handleChange}
          rows={3}
          maxLength={500}
          className=' pl-3 pr-10 text-sm h-10 w-full'
          disabled={loading}
        />
        <div className='flex self-end gap-2'>
          <DialogClose disabled={loading} asChild>
            <Button variant='secondary'>{t('button.cancel')}</Button>
          </DialogClose>
          <DialogClose disabled={loading} asChild>
            <Button variant='destructive' onClick={handleSubmit}>
              {t('button.confirm')}
            </Button>
          </DialogClose>
        </div>
      </div>
    </form>
  )
}
