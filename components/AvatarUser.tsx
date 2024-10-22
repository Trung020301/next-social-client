import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AvatarUserProps } from '@/types'
import Image from 'next/image'

export function AvatarUser({
  src,
  username,
  hasStory,
  width = 42,
  height = 42,
}: AvatarUserProps) {
  return (
    <div>
      <Image
        src={src}
        alt={username}
        width={width}
        height={height}
        className={`w-[${width}] h-[${height}] rounded-full object-cover ${
          hasStory ? 'ring-2 ring-green-500' : '' // Thêm lớp CSS ring-2 ring-green-500 nếu hasStory là true
        }`}
      />
    </div>
  )
}
