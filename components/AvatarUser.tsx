import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'

export function AvatarUser({
  src,
  username,
  hasStory, // Thêm thuộc tính hasStory
}: {
  src: string
  username: string
  hasStory?: boolean // Thêm thuộc tính hasStory
}) {
  return (
    <div>
      <Image
        src={src}
        alt={username}
        width={42}
        height={42}
        className={`w-[42px] h-[42px] rounded-full object-cover ${
          hasStory ? 'ring-2 ring-green-500' : '' // Thêm lớp CSS ring-2 ring-green-500 nếu hasStory là true
        }`}
      />
    </div>
  )
}
