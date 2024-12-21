'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import { Bell, BookX, Languages, SunMoon, UserRoundX } from 'lucide-react'

// This component is used in Settings page.
const BlockedUserComp = dynamic(() => import('./BlockedUserComp'))
const NotifyComp = dynamic(() => import('./NotifyComp'))
const ThemeComp = dynamic(() => import('./ThemeComp'))
const LanguageComp = dynamic(() => import('./LanguageComp'))
const PostsHidden = dynamic(() => import('./PostsHidden'))

export default function page() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const t = useTranslations()

  const [activeTab, setActiveTab] = useState(searchParams.get('tab'))

  useEffect(() => {
    setActiveTab(searchParams.get('tab'))
  }, [searchParams])

  const listSettings = [
    {
      label: t('settings.blocked_users'),
      href: '?tab=blocked-users',
      icon: <UserRoundX size={20} />,
      component: <BlockedUserComp />,
    },
    {
      label: t('settings.posts_hidden'),
      href: '?tab=posts-hidden',
      icon: <BookX size={20} />,
      component: <PostsHidden />,
    },
    {
      label: t('settings.notifications'),
      href: '?tab=notifications',
      icon: <Bell size={20} />,
      component: <NotifyComp />,
    },
    {
      label: t('settings.language'),
      href: '?tab=language',
      icon: <Languages size={20} />,
      component: <LanguageComp />,
    },
    {
      label: t('settings.theme'),
      href: '?tab=theme',
      icon: <SunMoon size={20} />,
      component: <ThemeComp />,
    },
  ]

  const activeComponent = listSettings.find(
    (item) => item.href === `?tab=${activeTab}`,
  )?.component

  const handleChangeTab = (href: string) => {
    router.push(href)
  }

  return (
    <div>
      {!activeComponent ? (
        <ul>
          {listSettings.map((item) => (
            <li
              key={item.href}
              className='border-b-[1px] hover:bg-slate-200 last:border-b-0 px-3'
              onClick={() => handleChangeTab(item.href)}
            >
              <div className='flex items-center gap-2 text-sm h-10 cursor-pointer'>
                {item.icon}
                <span>{item.label}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>{activeComponent}</div>
      )}
    </div>
  )
}
