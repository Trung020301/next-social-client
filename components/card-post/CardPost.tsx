'use client'

import React from 'react'
import { AvatarUser } from '../AvatarUser'
import { Bookmark, Heart, MessageSquareMore, Send } from 'lucide-react'
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

  const [isLiked, setIsLiked] = React.useState(false)
  const [isSaved, setIsSaved] = React.useState(false)

  // Handlers
  const handlerLike = () => {
    setIsLiked(!isLiked)
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  const actions = [
    { icon: <Heart />, count: 16, onClick: handlerLike, isActive: isLiked },
    { icon: <MessageSquareMore />, count: 21 },
    { icon: <Send />, count: 21 },
  ]

  return (
    <div className='w-full shadow-xl rounded-xl p-3'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <AvatarUser src={src} username={fullname} hasStory={hasStory} />
          <div className='text-sm'>
            <p className='font-semibold'>{fullname}</p>
            <p className='text-xs text-slate-500'>{createdAt}</p>
          </div>
        </div>
        <span>
          {/* <EllipsisIcon /> */}
          <DropDownMenu post={content} />
        </span>
      </div>
      <div>
        {text && <p className='mt-2'>{text}</p>}
        {images && images.length > 0 && (
          <Carousel className='mt-2 rounded-xl'>
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index} className='rounded-xl'>
                  <div className='relative h-60 rounded-xl'>
                    <Image
                      src={image}
                      alt='Post image'
                      fill
                      loading='lazy'
                      quality={100}
                      className='object-cover rounded-xl'
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>

      <div className='flex items-center mt-2 justify-between'>
        <div className='flex items-center gap-3'>
          {actions.map((action, index) => (
            <div
              key={index}
              className='flex items-center gap-1 text-slate-500'
              onClick={action.onClick}
            >
              {React.cloneElement(action.icon, {
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
              fill='skyblue'
              strokeWidth={0}
              className='text-slate-500'
            />
          ) : (
            <Bookmark className='text-slate-500' />
          )}
        </div>
      </div>
    </div>
  )
}
