'use client'

import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'
import { AvatarUser } from '../AvatarUser'
import { Carousel, CarouselItem, CarouselContent } from '../ui/carousel'
import { Separator } from '../ui/separator'
import { useLocale } from 'next-intl'
import { formatRelativeTime } from '@/services/dayjsConfig'
import { CldImage } from 'next-cloudinary'
import { IPost } from '@/lib/interface'
import { getDetailPost } from '@/services/https/adminServices'

export default function CardPostAdmin({ postId }: { postId: string }) {
  const locale = useLocale()
  const [post, setPost] = useState<IPost | null>(null)
  const [showMore, setShowMore] = useState(false)
  const truncateText = showMore ? ' ' : 'truncate'

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getDetailPost(postId)
        setPost(res)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPost()
  }, [])

  if (!post) return <div>Loading...</div>

  return (
    <>
      {post && (
        <div className='py-4 shadow-2xl flex flex-col gap-1'>
          <div className='flex items-center justify-between px-3'>
            <div className='flex items-center gap-2'>
              <AvatarUser
                src={post.userId.avatar?.url}
                username={post.userId.username}
              />
              <div className='text-xs'>
                <p className='font-semibold'>{post.userId.fullName}</p>
                <p className='text-xs font-semibold'>
                  {formatRelativeTime(post.createdAt, locale)}
                </p>
              </div>
            </div>
          </div>
          <div>
            <Carousel className='mt-2'>
              <CarouselContent>
                {post.mediaUrl.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className='relative min-h-60'>
                      {post.MediaTypeEnum === 'image' ? (
                        <CldImage
                          src={image.url}
                          alt='Post image'
                          fill
                          priority
                          quality={100}
                          className='object-cover h-auto object-center'
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

            {post.content && (
              <div
                className={`mt-2 px-3 ${truncateText} text-sm`}
                onClick={() => setShowMore(!showMore)}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.content),
                }}
              />
            )}
          </div>

          <Separator />
        </div>
      )}
    </>
  )
}
