'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import GlobalFallback from '@/components/fallback/GlobalFallback'
import DetailProfile from '@/components/profile/DetailProfile'
import ExploreUserComp from '@/components/profile/explore-user/ExploreUserComp'
import FeatureNews from '@/components/profile/feature-news/FeatureNews'
import ProfileTabs from '@/components/profile/tabs/ProfileTabs'
import { defaultUser, TYPE_PROFILE, userNotFound } from '@/lib/const'
import { fakeListStory } from '@/services/data'
import { getUserProfile } from '@/services/https/userService'
import { DetailProfileProps, UserDetailProps } from '@/types'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function Page() {
  const t = useTranslations()
  const { username } = useParams<{ username: string }>()
  const [user, setUser] = useState<DetailProfileProps>({
    user: defaultUser,
    posts: 0,
  })

  const [statusCode, setStatusCode] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserProfile({ username })
        setUser(res)
        setLoading(false)
      } catch (error: any) {
        setLoading(false)
        setStatusCode(error?.status)
      }
    }
    fetchUser()
  }, [])

  if (statusCode === 404) {
    return (
      <div className='h-screen flex flex-col items-center justify-center'>
        <Image
          src={userNotFound}
          alt={t('error.user_not_exist')}
          width={200}
          height={200}
          className=''
        />
        <p className='text-center'>{t('error.user_not_exist')}</p>
      </div>
    )
  }

  if (loading) {
    return <GlobalFallback />
  }

  return (
    <div>
      <div className='py-2'>
        <DetailProfile type={TYPE_PROFILE.USER_PROFILE} user={user} />
      </div>
      <ExploreUserComp type={TYPE_PROFILE.USER_PROFILE} user={user} />
      {/* {fakeListStory.length > 0 && (
        <FeatureNews listFutureNews={fakeListStory} />
      )} */}
      <ProfileTabs />
    </div>
  )
}
