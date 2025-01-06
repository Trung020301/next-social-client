'use client'

import React, { cloneElement, useRef, useState } from 'react'
import { pathRoute } from '@/lib/const'
import Link from 'next/link'
import { AvatarUser } from '../AvatarUser'
import { formatRelativeTime } from '@/services/dayjsConfig'
import { useLocale, useTranslations } from 'next-intl'
import { CardPostProps, VisibilityType } from '@/types'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import { CldImage } from 'next-cloudinary'
import useToggle from '@/hooks/useToggle'
import {
  deletePost,
  toggleLikePost,
  updatePost,
} from '@/services/https/postService'
import { toast } from '../hooks/use-toast'
import {
  Ellipsis,
  Heart,
  MessageSquareMore,
  Send,
  SquarePen,
  Trash2,
} from 'lucide-react'
import DOMPurify from 'dompurify'
import SheetComment from '../card-post/SheetComment'
import { IPost } from '@/lib/interface'
import { useUser } from '@/hooks/useUser'
import EditPostModal from './EditPostModal'
import DeletePostModal from './DeletePostModal'

interface CardPostProfileProps extends IPost {
  onPostDelete: (postId: string) => void
  onPostUpdate: (updatedPost: IPost) => void
}

export default function CardPostProfile({
  onPostDelete,
  onPostUpdate,
  ...post
}: CardPostProfileProps) {
  const locale = useLocale()
  const { currentUser } = useUser()
  const t = useTranslations()
  const {
    _id,
    userId,
    likes,
    comments,
    mediaUrl,
    createdAt,
    MediaTypeEnum,
    content,
    shares,
  } = post

  const [showMore, setShowMore] = useState(false)
  const [isLiked, liked] = useToggle(likes.includes(currentUser?.userId ?? ''))
  const [like, setLike] = useState<number>(likes.length)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [editContent, setEditContent] = useState(content ?? '')
  const [menuOpen, setMenuOpen] = useState(false)
  const [editVisibility, setEditVisibility] = useState<VisibilityType>(
    (post.visibility as VisibilityType) ?? 'public',
  )

  const likeSound = useRef(
    typeof window !== 'undefined' ? new Audio('/sounds/likesound.mp3') : null,
  )

  const truncateText = showMore ? ' ' : 'truncate'

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

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      postId: _id,
      content: editContent,
      visibility: editVisibility,
    }
    try {
      const response = await updatePost(payload)
      if (response.status === 200) {
        toast({
          variant: 'success',
          description: t('toast.success'),
        })
        onPostUpdate({
          ...post,
          content: editContent,
          visibility: editVisibility,
        })
        setIsEditOpen(false)
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        description: t('error.unexpected'),
      })
    }
  }

  const handleDeleteConfirm = async () => {
    try {
      const response = await deletePost(_id)
      if (response.status === 200) {
        toast({
          variant: 'success',
          description: t('toast.delete_success'),
        })
        onPostDelete(_id)
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        description: t('error.unexpected'),
      })
    } finally {
      setIsDeleteOpen(false)
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

  return (
    <div className='py-4 shadow-2xl flex flex-col gap-1 md:w-[500px]'>
      <div className='flex items-center justify-between px-3'>
        <Link href={`${pathRoute.PROFILE}`}>
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
        <div className='relative '>
          <Ellipsis
            className='cursor-pointer'
            size={16}
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && (
            <div className='absolute right-0 mt-2 min-w-24 z-50 bg-white border border-gray-200 rounded shadow-lg '>
              <div
                className='px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 flex items-center gap-2'
                onClick={() => {
                  setIsEditOpen(true)
                  setMenuOpen(false)
                }}
              >
                <i>
                  <SquarePen size={16} />
                </i>
                <span className='text-sm font-medium'>{t('button.edit')}</span>
              </div>
              <div
                className='px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 flex items-center gap-2'
                onClick={() => {
                  setIsDeleteOpen(true)
                  setMenuOpen(false)
                }}
              >
                <i className='text-primary'>
                  <Trash2 size={16} />
                </i>
                <span className='text-sm font-medium text-primary'>
                  {t('button.delete')}
                </span>
              </div>
            </div>
          )}
        </div>
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
                      width='500'
                      height='500'
                      crop='fill'
                      priority
                      quality={100}
                      className='object-cover h-[720px] object-center'
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
      </div>
      <SheetComment postId={_id} />

      <EditPostModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        content={editContent}
        onContentChange={setEditContent}
        onSubmit={handleEditSubmit}
        visibility={editVisibility}
        onVisibilityChange={setEditVisibility}
      />

      <DeletePostModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
