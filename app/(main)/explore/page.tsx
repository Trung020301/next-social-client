import React from 'react'
import { defaultImage } from '@/lib/const'

export default function page() {
  return (
    <div className='scrollbar-hide'>
      <img src={defaultImage} alt='default image' />
    </div>
  )
}
