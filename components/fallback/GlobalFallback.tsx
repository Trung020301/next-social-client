'use client'

import Lottie from 'lottie-react'
import loadingImage from '@/public/images/loading.json'

export default function GlobalFallback() {
  const style = {
    height: 200,
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <Lottie animationData={loadingImage} style={style} />
    </div>
  )
}
