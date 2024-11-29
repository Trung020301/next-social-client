import { AvatarUserProps } from '@/types'
import { CldImage } from 'next-cloudinary'
import { Skeleton } from './ui/skeleton'
import { defaultAvatar } from '@/lib/const'

export function AvatarUser({
  src,
  username,
  hasStory,
  width = 40,
  height = 40,
  loading = false,
}: AvatarUserProps) {
  return (
    <>
      {loading ? (
        <Skeleton className='w-[64px] h-[64px] rounded-full' />
      ) : (
        <div
          className={`p-[2px] ${
            hasStory
              ? 'bg-gradient-to-r from-instagram-pink to-instagram-purple'
              : ''
          } rounded-full`}
        >
          <CldImage
            priority
            alt={username}
            src={src || defaultAvatar || ''}
            width={width}
            height={height}
            className={`w-[${width}] h-[${height}] rounded-full object-cover border-[2px]
              `}
          />
        </div>
      )}
    </>
  )
}
