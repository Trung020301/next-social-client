import React, { useState } from 'react'
import { Input } from '../ui/input'
import { useTranslations } from 'next-intl'
import { Send } from 'lucide-react'
import { useComment } from '@/hooks/useComment'
import { CommentProps } from '@/types'
import { createComment } from '@/services/https/postService'
import { toast } from '../hooks/use-toast'

export default function CommentField({
  postId,
  onCommentCreated,
}: {
  postId: string
  onCommentCreated: () => void
}) {
  const t = useTranslations()
  const [showBtn, setShowBtn] = useState(false)
  const { valueCmt, setValueCmt } = useComment()

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueCmt(e.target.value)
    setShowBtn(e.target.value.length > 0)
  }

  const handleSendComment = async () => {
    try {
      const response = await createComment({ postId, content: valueCmt })
      if (response.status === 201) {
        onCommentCreated()
        setShowBtn(false)
        setValueCmt('')
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        description: t('error.unexpected'),
      })
    }
  }

  return (
    <div className='relative flex items-center gap-2 md:max-w-lg md:m-auto'>
      <Input
        className='rounded-full bg-white pl-3 pr-10 text-sm h-10 w-full'
        placeholder={t('placehoolder.type_comment')}
        onChange={handleChangeValue}
        value={valueCmt}
        size={14}
      />

      <div
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-opacity cursor-pointer duration-500  ease-in-out ${
          showBtn ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Send onClick={handleSendComment} size={20} />
      </div>
    </div>
  )
}
