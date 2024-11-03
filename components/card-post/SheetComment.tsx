'use client'

import { Drawer } from 'vaul'
import { useState } from 'react'
import { CommentProps } from '@/types'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import CommentField from '../comment/comment-field'
import { CommentProvider } from '@/provider/CommentProvider'
import { Separator } from '../ui/separator'

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
    <Drawer.Root>
      <Drawer.Trigger className='w-full font-medium text-left dark:text-white text-gray-500'>
        <p className='text-xs py-1 '>{t('typography.view_more_comment')}</p>
      </Drawer.Trigger>
      <Drawer.Description />
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 bg-black/40' />
        <Drawer.Content className='bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-[80%] lg:h-[320px] fixed bottom-0 left-0 right-0 outline-none'>
          <div className='p-4 bg-white rounded-t-[10px] flex-1 overflow-y-auto scrollbar-hide'>
            <div className='max-w-md mx-auto space-y-4'>
              <div
                aria-hidden
                className='mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-2'
              />
              <Drawer.Title className='text-gray-900 text-center font-semibold'>
                {t('title.comment')}
              </Drawer.Title>
              <Separator />

              <div className='pb-4 '>
                {comment.map((item, index) => (
                  <div key={index} className='py-2 '>
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
            </div>
            <div className='p-2 bg-white fixed bottom-0 left-0 right-0'>
              <CommentProvider>
                <CommentField />
              </CommentProvider>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
