'use client'

import { CldImage } from 'next-cloudinary'
import React from 'react'

export default function FeatureNews({
  listFutureNews,
}: {
  listFutureNews: { title: string; image: string }[]
}) {
  return (
    <div className='flex overflow-x-auto py-2 scrollbar-hide'>
      {listFutureNews.map((item, index) => (
        <div key={index}>
          <div className='flex items-center flex-col w-16'>
            <div className='p-[2px] bg-green-400 rounded-full'>
              <CldImage
                alt='story'
                src={item.image}
                width={40}
                priority
                height={40}
                className='w-[40px] h-[40px] rounded-full'
              />
            </div>
            <p className='text-xs text-zinc-900 truncate max-w-16'>
              {item.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
