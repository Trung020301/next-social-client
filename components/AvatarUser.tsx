import { AvatarUserProps } from '@/types'
import { CldImage } from 'next-cloudinary'

export function AvatarUser({
  src,
  username,
  hasStory,
  width = 40,
  height = 40,
}: AvatarUserProps) {
  return (
    <>
      <div
        className={`p-[2px] ${
          hasStory
            ? 'bg-gradient-to-r from-instagram-pink to-instagram-purple'
            : ''
        } rounded-full`}
      >
        <CldImage
          alt={username}
          src={src}
          width={width}
          priority
          height={height}
          className={`w-[${width}] h-[${height}] rounded-full object-cover border-[2px]
          `}
        />
      </div>
    </>
  )
}
