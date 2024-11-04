'use client'

import React from 'react'
import { CldImage } from 'next-cloudinary'
import { Film, Notebook } from 'lucide-react'
import { pathRoute } from '@/lib/const'
import Link from 'next/link'
import NoPostUI from '../NoPostUI'
import { allPostTabs } from '@/services/data'

export default function Gallery() {
  if (allPostTabs.length === 0) {
    return <NoPostUI />
  }

  return (
    <div className='flex flex-wrap gap-1'>
      {allPostTabs.map((post) => (
        <Link
          key={post._id}
          href={pathRoute.HOME}
          className='w-[32%] relative flex h-48 items-end overflow-hidden rounded-lg shadow-lg'
        >
          <CldImage
            src='https://res.cloudinary.com/dpqhuucyq/image/upload/v1730280315/3_iopoi1.jpg'
            loading='lazy'
            width={100}
            height={250}
            alt='Photo'
            className=' absolute inset-0 w-full h-full object-cover object-center'
          />
          <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50'></div>
          <span className='relative ml-2 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg'>
            {post.type === 'video' ? (
              <Film size={16} />
            ) : (
              <Notebook size={16} />
            )}
          </span>
        </Link>
      ))}
    </div>
  )
}
