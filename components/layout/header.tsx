'use client'

import { pathRoute } from '@/lib/const'
import { Home, MessageCircle, Search, User, VideoIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const listItemNav = [
    {
      icon: <Home />,
      href: pathRoute.HOME,
    },
    {
      icon: <Search />,
      href: pathRoute.EXPLORE,
    },
    {
      icon: <VideoIcon />,
      href: pathRoute.UPLOAD,
    },
    {
      icon: <MessageCircle />,
      href: pathRoute.MESSAGES,
    },
    {
      icon: <User />,
      href: pathRoute.PROFILE,
    },
  ]

  return (
    <nav className='w-full fixed left-0 right-0 bg-slate-100 z-50 bottom-0 h-14 flex items-center'>
      <div className='w-full flex items-center justify-around'>
        {listItemNav.map((item, index) => {
          const isActive = pathname === item.href
          return (
            <div
              key={index}
              className={`cursor-pointer p-2 rounded-full ${
                isActive && 'bg-primary text-white'
              }`}
            >
              <Link href={item.href}>{item.icon}</Link>
            </div>
          )
        })}
      </div>
    </nav>
  )
}
