'use client'

import { useState } from 'react'
import { Bell, MessageCircle } from 'lucide-react'

export default function HeaderTools() {
  const [hasNotification, setHasNotification] = useState(true)
  const [hasMessage, setHasMessage] = useState(true)

  const tools = [
    {
      icon: <Bell />,
      name: 'Notification',
      hasAlert: hasNotification,
    },
    {
      icon: <MessageCircle />,
      name: 'Messages',
      hasAlert: hasMessage,
    },
  ]
  return (
    <div className='flex-[2] flex justify-end gap-6'>
      {tools.map((tool, index) => (
        <div
          key={index}
          className='relative dark:bg-black bg-slate-100 rounded-xl p-1'
        >
          {tool.icon}
          {tool.hasAlert && (
            <span className='absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500'></span>
          )}
        </div>
      ))}
    </div>
  )
}
