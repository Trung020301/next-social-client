import React from 'react'
import { defaultImage } from '@/lib/const'
import SearchField from '@/components/explore/SearchField'

export default function page() {
  return (
    <div className='scrollbar-hide'>
      <SearchField />
    </div>
  )
}
