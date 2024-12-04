'use client'

import dynamic from 'next/dynamic'
import { useState, useRef, cloneElement } from 'react'
import { Bookmark, Heart, MessageSquareMore, Send } from 'lucide-react'
import DOMPurify from 'isomorphic-dompurify'

import { AvatarUser } from '../AvatarUser'
import { Carousel, CarouselItem, CarouselContent } from '../ui/carousel'
import { Separator } from '../ui/separator'
import { useLocale, useTranslations } from 'next-intl'
import DropDownMenu from './DropDownMenu'
import { formatRelativeTime } from '@/services/dayjsConfig'
import { CldImage } from 'next-cloudinary'
import { CardPostProps } from '@/types'
import { toggleLikePost } from '@/services/https/postService'
import useToggle from '@/hooks/useToggle'
import { toast } from '@/components/hooks/use-toast'
const SheetComment = dynamic(() => import('./SheetComment'))

export default function CardPost({ post }: CardPostProps) {
  const locale = useLocale()
  const myUserId = localStorage.getItem('userId')
  const {
    _id,
    userId,
    likes,
    comments,
    mediaUrl,
    visibility,
    createdAt,
    content,
    isLikedPost,
    isSavedPost,
    shares,
  } = post

  const firstComment = comments.length > 0 ? comments[0] : null
  const t = useTranslations()

  const [showMore, setShowMore] = useState(false)
  const [isLiked, liked] = useToggle(isLikedPost)
  const [isSaved, setIsSaved] = useState<boolean>(isSavedPost)
  const likeSound = useRef(
    typeof window !== 'undefined' ? new Audio('/sounds/likesound.mp3') : null,
  )

  const truncateText = showMore ? ' ' : 'truncate'

  // Handlers
  const handlerLike = async () => {
    try {
      liked()
      if (likeSound.current && !isLiked) {
        likeSound.current.play()
      }
      await toggleLikePost({
        postId: _id,
      })
    } catch (error) {
      toast({
        description: t('error.unexpected'),
      })
    }
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  const actions = [
    {
      icon: <Heart size={18} />,
      count: Number(likes.length),
      onClick: handlerLike,
      isActive: isLiked,
    },
    { icon: <MessageSquareMore size={18} />, count: Number(comments.length) },
    { icon: <Send size={18} />, count: Number(shares.length) },
  ]

  const formatText = (text: string) => {
    const regex = /#(\w+)/g
    return text.split(' ').map((part, index) =>
      regex.test(part) ? (
        <span key={index} className='text-blue-500'>
          {part}{' '}
        </span>
      ) : (
        part + ' '
      ),
    )
  }

  return (
    <div className='py-4 shadow-2xl flex flex-col gap-1'>
      <div className='flex items-center justify-between px-3'>
        <div className='flex items-center gap-2'>
          <AvatarUser src={userId.avatar?.url} username={userId.username} />
          <div className='text-xs'>
            <p className='font-semibold'>{userId.fullName}</p>
            <p className='text-xs font-semibold'>
              {formatRelativeTime(createdAt, locale)}
            </p>
          </div>
        </div>
        <span>
          <DropDownMenu />
        </span>
      </div>
      <div>
        <Carousel className='mt-2'>
          <CarouselContent>
            {mediaUrl.map((image, index) => (
              <CarouselItem key={index}>
                <div className='relative h-60 min-h-60'>
                  <CldImage
                    src={image.url}
                    alt='Post image'
                    fill
                    priority
                    quality={100}
                    className='object-cover object-center'
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {content && (
          <div
            className={`mt-2 px-3 ${truncateText} text-sm`}
            onClick={() => setShowMore(!showMore)}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(content),
            }}
          />
        )}
      </div>

      <div className='flex items-center mt-2 justify-between px-3 pb-2'>
        <div className='flex items-center gap-3'>
          {actions.map((action, index) => (
            <div
              key={index}
              className='flex items-center gap-1 font-semibold'
              onClick={action.onClick}
            >
              {cloneElement(action.icon, {
                fill: action.isActive ? 'red' : 'none',
                strokeWidth: action.isActive ? 0 : 1,
              })}
              <span className='text-sm'>{action.count}</span>
            </div>
          ))}
        </div>
        <div onClick={handleSave}>
          {isSaved ? (
            <Bookmark
              fill='primary'
              strokeWidth={0}
              className='font-semibold'
              size={18}
            />
          ) : (
            <Bookmark className='font-semibold' size={18} />
          )}
        </div>
      </div>
      <Separator />
      {/* {firstComment && (
        <div className='px-3 py-2'>
          <p className='text-sm font-semibold truncate'>
            {firstComment.user.fullname}
            <span className='font-normal'>{firstComment.content}</span>
          </p>
          {comments.length > 1 && <SheetComment comment={comments} />}
        </div>
      )} */}
    </div>
  )
}
