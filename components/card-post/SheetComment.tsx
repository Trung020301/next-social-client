'use client'

import { Drawer } from 'vaul'
import { useEffect, useState } from 'react'
import { CommentProps } from '@/types'
import { useLocale, useTranslations } from 'next-intl'
import { Heart } from 'lucide-react'
import CommentField from '../comment/comment-field'
import { CommentProvider } from '@/provider/CommentProvider'
import { Separator } from '../ui/separator'
import { AvatarUser } from '../AvatarUser'
import { getCommentsByPost } from '@/services/https/commentService'
import { formatRelativeTime } from '@/services/dayjsConfig'

export default function SheetComment({ postId }: { postId: string }) {
  const [results, setResults] = useState<CommentProps[]>([])
  const [showMoreMap, setShowMoreMap] = useState<{ [key: string]: boolean }>({})
  const [newCommentCreated, setNewCommentCreated] = useState(false)

  const locale = useLocale()
  const t = useTranslations()

  const fetchComments = async () => {
    try {
      const response = await getCommentsByPost(postId)
      setResults(response.data.comments)
    } catch (error: any) {
      console.error(error?.message)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  useEffect(() => {
    if (newCommentCreated) {
      fetchComments()
      setNewCommentCreated(false)
    }
  }, [newCommentCreated])

  // Handlers
  const handleCommentCreated = () => {
    setNewCommentCreated(true)
  }

  const handleShowMore = (commentId: string) => {
    setShowMoreMap((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
  }

  return (
    <Drawer.Root>
      <Drawer.Trigger className='font-medium text-xs text-left ml-2 dark:text-white text-gray-500'>
        {t('typography.view_more_comment')}
      </Drawer.Trigger>
      <Drawer.Description />
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 bg-black/40' />
        <Drawer.Content className='bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-[80%] fixed bottom-0 left-0 right-0 outline-none'>
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

              <div className='pb-8'>
                {results.map((item, index) => {
                  const showMore = showMoreMap[item._id] || false
                  const truncateText = showMore
                    ? 'line-clamp-none'
                    : 'line-clamp-5'
                  return (
                    <div key={index} className='py-2 '>
                      <div className='flex gap-2'>
                        <div className='flex-[1]'>
                          <AvatarUser
                            username={item.userId?.username}
                            src={item.userId?.avatar.url}
                            width={32}
                            height={32}
                          />
                        </div>
                        <div className='flex-[9]'>
                          <p className='text-sm font-semibold'>
                            {item.userId.fullName}
                            <span className='font-normal text-xs text-gray-400 ml-2'>
                              {formatRelativeTime(item.createdAt, locale)}
                            </span>
                          </p>
                          <p
                            onClick={() => handleShowMore(item._id)}
                            className={`text-sm leading-6 ${truncateText} flex-[8]`}
                          >
                            {item.content}
                          </p>
                          <div className='flex gap-1 mt-1'>
                            <div className='flex gap-1 items-center'>
                              <Heart
                                size={18}
                                // className={`${
                                //   checkUserHasLiked > -1
                                //     ? 'text-red-500'
                                //     : 'text-gray-400'
                                // }`}
                                // onClick={}
                              />
                              <span className='text-sm font-semibold text-slate-600'>
                                {item.likes?.length || ''}
                              </span>
                            </div>
                            <p className='text-xs text-gray-500'>
                              {t('typography.reply')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className='p-2 bg-white fixed bottom-0 left-0 right-0'>
              <CommentProvider>
                <CommentField
                  postId={postId}
                  onCommentCreated={handleCommentCreated}
                />
              </CommentProvider>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
