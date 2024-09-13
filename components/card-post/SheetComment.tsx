import { useState } from 'react'
import { CommentProps } from '@/types'
import { useTranslations } from 'next-intl'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet'
import Image from 'next/image'
import { Heart } from 'lucide-react'

export default function SheetComment({ comment }: { comment: CommentProps[] }) {
  const t = useTranslations()
  const [showMore, setShowMore] = useState(false)

  return (
    <Sheet>
      <SheetTrigger className='w-full text-left'>
        <p className='text-xs text-gray-500 py-1'>
          {t('typography.view_more_comment')}
        </p>
      </SheetTrigger>

      <SheetContent side='bottom' aria-describedby='content-comment'>
        <SheetTitle>
          <p className='text-lg font-bold mb-2'>{t('title.comment')}</p>
        </SheetTitle>
        <div className='h-[80vh]'>
          {comment.map((item, index) => (
            <div key={index} className='py-2'>
              <div className='flex gap-2'>
                <Image
                  src={item.user.avatar}
                  width={32}
                  height={32}
                  alt={item.user.fullname || ''}
                  className='w-8 h-8 rounded-full'
                />
                <div>
                  <p className='text-sm font-semibold'>
                    {item.user.fullname}
                    <span className='font-normal text-slate-500 ml-2'>
                      2 days ago
                    </span>
                  </p>
                  <p className='text-sm leading-6 line-clamp-5'>
                    {item.content}
                  </p>
                  <div>
                    <Heart />
                    <p className='text-sm font-semibold'>{ t('typography')}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
