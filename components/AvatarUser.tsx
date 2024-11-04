import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AvatarUserProps } from '@/types'
import { CldImage } from 'next-cloudinary'
import Image from 'next/image'

export function AvatarUser({
  src,
  username,
  hasStory,
  width = 42,
  height = 42,
}: AvatarUserProps) {
  return (
    <>
      <div className='p-[2px] bg-gradient-to-r from-instagram-pink to-instagram-purple  rounded-full'>
        <CldImage
          alt='avatar'
          src={src}
          width={width}
          priority
          height={height}
          className={`w-[${width}] h-[${height}] rounded-full object-cover border
          `}
        />
      </div>
    </>
  )
}
