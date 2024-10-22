import React from 'react'
import { Input } from '../ui/input'
import { useTranslations } from 'next-intl'
import { Send } from 'lucide-react'
import { AvatarUser } from '../AvatarUser'
import { AvatarUserProps } from '@/types'

export default function CommentField() {
  const t = useTranslations()
  const [showBtn, setShowBtn] = React.useState(false)
  const [valueCmt, setValueCmt] = React.useState<string>('')
  const userProps: AvatarUserProps = {
    src: 'https://github.com/shadcn.png',
    username: 'Trung',
    hasStory: true,
    width: 30,
    height: 30,
  }

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value && value.trim().length > 0 && value[0] !== ' ') {
      setShowBtn(true)
      setValueCmt(value)
    } else {
      setShowBtn(false)
    }
  }

  const handleSendComment = () => {
    const payload = {
      user: { ...userProps },
      content: valueCmt,
    }
    setValueCmt('')
    console.log('payload', payload)
  }

  return (
    <div className='relative flex items-center gap-2'>
      <AvatarUser {...userProps} />
      <Input
        className='rounded-full pl-3 pr-10 py-4 text-sm w-full'
        type='text'
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

// TODO: Add more features like: Toast when push comment, handle error, handle like, reply, etc.
