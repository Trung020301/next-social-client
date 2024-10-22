import { useState } from 'react'
import { CommentProps } from '@/types'
import { useTranslations } from 'next-intl'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import CommentField from '../comment/comment-field'

export default function SheetComment({ comment }: { comment: CommentProps[] }) {
  const USER_ID: string = '213123321'
  const t = useTranslations()
  const checkUserHasLiked = comment.findIndex(
    (item) => item.likes.indexOf(USER_ID) > -1,
  )

  const [showMore, setShowMore] = useState(true)
  const truncateText = showMore ? 'line-clamp-5' : 'line-clamp-none'

  // Handlers
  const handleShowMore = () => setShowMore(!showMore)

  const handleLikeComment = () => {}

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
        <div className='h-[80vh] overflow-y-scroll scrollbar-hide'>
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
                    <span className='font-normal text-gray-400 ml-2'>
                      2 days ago
                    </span>
                  </p>
                  <p
                    onClick={handleShowMore}
                    className={`text-sm leading-6 ${truncateText} flex-[8]`}
                  >
                    {item.content}
                  </p>
                  <div className='flex gap-1 mt-1'>
                    <div className='flex gap-1 items-center'>
                      <Heart
                        size={18}
                        className={`${
                          checkUserHasLiked > -1
                            ? 'text-red-500'
                            : 'text-gray-400'
                        }`}
                        onClick={handleLikeComment}
                      />
                      <span className='text-sm font-semibold text-slate-600'>
                        {item.likes?.length || ''}
                      </span>
                    </div>
                    <p className='text-sm text-gray-500'>
                      {t('typography.reply')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <CommentField />
      </SheetContent>
    </Sheet>
  )
}
