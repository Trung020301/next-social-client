import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { useTranslations } from 'next-intl'
import { Send } from 'lucide-react'
import { AvatarUser } from '../AvatarUser'
import { AvatarUserProps } from '@/types'
import { useComment } from '@/hooks/useComment'

export default function CommentField() {
  const t = useTranslations()
  const [showBtn, setShowBtn] = useState(false)
  const { valueCmt, setValueCmt } = useComment()

  const userProps: AvatarUserProps = {
    src: 'https://github.com/shadcn.png',
    username: 'Trung',
    hasStory: true,
    width: 30,
    height: 30,
  }

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueCmt(e.target.value)
    setShowBtn(e.target.value.length > 0)
  }

  const handleSendComment = () => {
    // Xử lý gửi comment
    setValueCmt('')
    setShowBtn(false)
    console.log('payload', { comment: valueCmt })
  }

  return (
    <div className='relative flex items-center gap-2'>
      <AvatarUser {...userProps} />
      <Input
        className='rounded-full pl-3 pr-10 py-4 text-sm w-full'
        placeholder={t('placehoolder.type_comment')}
        onChange={handleChangeValue}
        value={valueCmt}
      />

      <div
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-opacity duration-500 ease-in-out ${
          showBtn ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Send onClick={handleSendComment} size={20} />
      </div>
    </div>
  )
}

// TODO: Bổ sung chức năng gửi comment, fix state khi người dùng đang nhập comment mà thoát ra ngoài thì comment vẫn giữ nguyên...
