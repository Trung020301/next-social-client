'use client'

import React, { useState, useEffect } from 'react'
import HeaderTools from './HeaderTools'

export default function HeaderHome() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const controlHeader = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        // Scroll down
        setIsVisible(false)
      } else {
        // Scroll up
        setIsVisible(true)
      }
      setLastScrollY(window.scrollY)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlHeader)

      return () => {
        window.removeEventListener('scroll', controlHeader)
      }
    }
  }, [lastScrollY])

  return (
    <div>
      <header
        className={`flex items-center gap-4 px-3 sticky top-0 py-4 z-50 bg-white transition-transform duration-300 ${
          isVisible ? 'transform translate-y-0 ' : 'transform -translate-y-full'
        }`}
      >
        <h6 className='flex-[1.5] font-bold font-mono'>Coffee Sweet</h6>
        <HeaderTools />
      </header>
    </div>
  )
}
