'use client'

import { useState, useRef, cloneElement } from 'react'
import { Bookmark, Heart, MessageSquareMore, Send } from 'lucide-react'
import DOMPurify from 'isomorphic-dompurify'

import { AvatarUser } from '../AvatarUser'
import { CardPostProps } from '@/types'
import Image from 'next/image'
import { Carousel, CarouselItem, CarouselContent } from '../ui/carousel'
import DropDownMenu from './DropDownMenu'

export default function CardPost({
  src,
  fullname,
  hasStory,
  content,
}: CardPostProps) {
  const { images, text, createdAt } = content
  const sanitizedHtmlContent = DOMPurify.sanitize(text)
  const [showMore, setShowMore] = useState(false)

  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // Tạo đối tượng Audio
  const likeSound = useRef(
    typeof window !== 'undefined' ? new Audio('/sounds/likesound.mp3') : null,
  )

  const truncateText = showMore ? ' ' : 'truncate'

  // Handlers
  const handlerLike = () => {
    setIsLiked(!isLiked)
    if (likeSound.current) {
      likeSound.current.play()
    }
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  const actions = [
    { icon: <Heart />, count: 16, onClick: handlerLike, isActive: isLiked },
    { icon: <MessageSquareMore />, count: 21 },
    { icon: <Send />, count: 21 },
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
          <AvatarUser src={src} username={fullname} hasStory={hasStory} />
          <div className='text-sm'>
            <p className='font-semibold'>{fullname}</p>
            <p className='text-xs font-semibold'>{createdAt}</p>
          </div>
        </div>
        <span>
          <DropDownMenu post={content} />
        </span>
      </div>
      <div>
        {images && images.length > 0 && (
          <Carousel className='mt-2'>
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className='relative h-60 min-h-60'>
                    <Image
                      src={image}
                      alt='Post image'
                      fill
                      loading='lazy'
                      quality={100}
                      className='object-cover'
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}

        <div
          className={`mt-2 px-3 ${truncateText}`}
          onClick={() => setShowMore(!showMore)}
          dangerouslySetInnerHTML={{
            __html: sanitizedHtmlContent,
          }}
        />
      </div>

      <div className='flex items-center mt-2 justify-between px-3 pb-4'>
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
              <span>{action.count}</span>
            </div>
          ))}
        </div>
        <div onClick={handleSave}>
          {isSaved ? (
            <Bookmark
              fill='primary'
              strokeWidth={0}
              className='font-semibold'
            />
          ) : (
            <Bookmark className='font-semibold' />
          )}
        </div>
      </div>
    </div>
  )
}
