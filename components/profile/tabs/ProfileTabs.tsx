'use client'

import React, { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { Clapperboard, Grid3X3, SquareUserRound } from 'lucide-react'
const DynamicAllPostTab = dynamic(() => import('./AllPostTab'))
const DynamicReefsTab = dynamic(() => import('./ReefsTab'))
const DynamicTagsTab = dynamic(() => import('./TagsTab'))

import { DEFAULT_TAB, REEF_TAB, TAG_TAB } from '@/lib/const'

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState<string>(DEFAULT_TAB)
  const tabComponents: { [key: string]: React.ComponentType<any> } = {
    [DEFAULT_TAB]: DynamicAllPostTab,
    [REEF_TAB]: DynamicReefsTab,
    [TAG_TAB]: DynamicTagsTab,
  }

  const tabs = useMemo(
    () => [
      { icon: <Grid3X3 />, value: DEFAULT_TAB },
      { icon: <Clapperboard />, value: REEF_TAB },
      { icon: <SquareUserRound />, value: TAG_TAB },
    ],
    [],
  )

  // Tìm vị trí của tab đang active
  const tabCount = tabs.length
  const activeIndex = tabs.findIndex((tab) => tab.value === activeTab)
  return (
    <div className='relative mt-4 mb-20'>
      <div className='flex items-center justify-between border-b border-gray-300'>
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(tab.value)}
            className={`cursor-pointer flex-[1] flex items-center justify-center py-2 px-4 transition-colors duration-300 
              ${
                activeTab === tab.value
                  ? 'text-primary font-bold'
                  : 'text-gray-600 hover:text-primary'
              }`}
          >
            {tab.icon}
          </div>
        ))}
      </div>
      {/* Dấu gạch chân */}
      <div
        className='h-0.5 bg-primary transition-all duration-300'
        style={
          {
            '--tab-count': tabCount,
            '--active-index': activeIndex,
            width: `calc(100% / var(--tab-count))`,
            transform: `translateX(calc(var(--active-index) * 100%))`,
          } as React.CSSProperties
        }
      />
      {tabComponents[activeTab] &&
        React.createElement(tabComponents[activeTab])}
    </div>
  )
}
