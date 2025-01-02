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
import { toast } from '../hooks/use-toast'
import { toggleSavePost } from '@/services/https/userService'
import { pathRoute } from '@/lib/const'
import Link from 'next/link'
import { useUser } from '@/hooks/useUser'
const SheetComment = dynamic(() => import('./SheetComment'))

export default function CardPost({
  post,
  onHidePost,
}: CardPostProps & { onHidePost: () => void }) {
  const locale = useLocale()
  const {
    _id,
    userId,
    likes,
    comments,
    mediaUrl,
    createdAt,
    MediaTypeEnum,
    content,
    isLikedPost,
    isSavedPost,
    shares,
  } = post

  const t = useTranslations()
  const { currentUser } = useUser()
  const checkIsAuthPost = currentUser?.userId === userId._id

  const [showMore, setShowMore] = useState(false)
  const [isLiked, liked] = useToggle(isLikedPost)
  const [isSaved, setIsSaved] = useToggle(isSavedPost)
  const [like, setLike] = useState<number>(likes.length)

  const likeSound = useRef(
    typeof window !== 'undefined' ? new Audio('/sounds/likesound.mp3') : null,
  )
  const truncateText = showMore ? ' ' : 'truncate'

  // Handlers
  const handlerLike = async () => {
    try {
      const newLikeStatus = !isLiked
      liked()
      setLike((prevLike) => (newLikeStatus ? prevLike + 1 : prevLike - 1))

      if (likeSound.current && newLikeStatus) {
        likeSound.current.play()
      }
      await toggleLikePost({
        postId: _id,
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        description: t('error.unexpected'),
      })
    }
  }

  const handleSave = async () => {
    try {
      setIsSaved()
      await toggleSavePost(_id)
    } catch (error) {
      toast({
        variant: 'destructive',
        description: t('error.unexpected'),
      })
    }
  }

  const actions = [
    {
      icon: <Heart size={18} />,
      count: Number(like),
      onClick: handlerLike,
      isActive: isLiked,
    },
    {
      icon: <MessageSquareMore size={18} />,
      count: Number(comments.length),
    },
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
        <Link href={`${pathRoute.ACCOUNT}/${userId.username}`}>
          <div className='flex items-center gap-2'>
            <AvatarUser src={userId.avatar?.url} username={userId.username} />
            <div className='text-xs'>
              <p className='font-semibold'>{userId.fullName}</p>
              <p className='text-xs font-semibold'>
                {formatRelativeTime(createdAt, locale)}
              </p>
            </div>
          </div>
        </Link>
        {!checkIsAuthPost && (
          <span>
            <DropDownMenu post={post} onHidePost={onHidePost} />
          </span>
        )}
      </div>
      <div>
        <Carousel className='mt-2'>
          <CarouselContent>
            {mediaUrl.map((image, index) => (
              <CarouselItem key={index}>
                <div className='relative min-h-60'>
                  {MediaTypeEnum === 'image' ? (
                    <CldImage
                      src={image.url}
                      alt='Post image'
                      fill
                      priority
                      quality={100}
                      className='object-cover w-full h-full '
                    />
                  ) : (
                    <video
                      src={image.url}
                      className='w-full h-full object-cover'
                      controls
                    />
                  )}
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
              className='flex items-center gap-1 min-w-8 font-semibold'
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
        {!checkIsAuthPost && (
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
        )}
      </div>
      <Separator />
      <SheetComment postId={_id} />
    </div>
  )
}
