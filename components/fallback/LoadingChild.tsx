'use client'

import Lottie from 'lottie-react'
import loadingImage from '@/public/images/loading-child.json'

export default function LoadingChild() {
  const style = {
    height: 200,
    width: 160,
  }

  return (
    <div className='flex items-center justify-center h-screen bg-background'>
      <Lottie animationData={loadingImage} style={style} />
    </div>
  )
}
