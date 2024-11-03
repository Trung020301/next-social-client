'use client'

import { CldImage } from 'next-cloudinary'
import React from 'react'

export default function FeatureNews() {
  const fakeListStory = [
    {
      title: '😝 Hehe',
      image:
        'https://res.cloudinary.com/dpqhuucyq/image/upload/v1730263036/avatars/1_s8hhrh.jpg',
    },
    {
      title: '🍀 Featured',
      image:
        'https://res.cloudinary.com/dpqhuucyq/image/upload/v1730266896/avatars/2_oreucm.jpg',
    },
    {
      title: 'Sky',
      image:
        'https://res.cloudinary.com/dpqhuucyq/image/upload/v1730280315/3_iopoi1.jpg',
    },
  ]

  return (
    <div className='flex overflow-x-auto gap-2 py-2 scrollbar-hide'>
      {fakeListStory.map((item, index) => (
        <div className='w-20' key={item.title}>
          <div key={index} className='flex items-center flex-col w-16'>
            <div className='p-[2px] border-[1px] bg-white rounded-full'>
              <CldImage
                alt='story'
                src={item.image}
                width={40}
                priority
                height={40}
                className='w-[40px] h-[40px] rounded-full'
              />
            </div>
            <p className='text-xs text-gray-500 truncate'>{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
