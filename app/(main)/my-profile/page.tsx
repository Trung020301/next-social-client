'use client'

import { ChevronDown, Lock, SquarePlus } from 'lucide-react'
import dynamic from 'next/dynamic'
import DetailProfile from '@/components/profile/DetailProfile'
import ExploreUserComp from '@/components/profile/explore-user/ExploreUserComp'
import FeatureNews from '@/components/profile/feature-news/FeatureNews'
import ProfileTabs from '@/components/profile/tabs/ProfileTabs'
import { TYPE_PROFILE } from '@/lib/const'
import { fakeListStory, fakeUser } from '@/services/data'
import { useParams, usePathname } from 'next/navigation'
import { getMyProfile } from '@/services/https/userService'
import { useEffect, useState } from 'react'
const UserSetting = dynamic(() => import('@/components/settings/user-setting'))

export default async function Page() {
  const [user, setUser] = useState<any>(null)
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getMyProfile('/user/get-my-profile')
      setUser(user)
    }
    fetchUser()
  }, [])

  return (
    <>
      {user && (
        <div className='pt-4'>
          <div className='flex items-center justify-between px-2'>
            <p className='font-bold text-xl flex items-center gap-1'>
              <span>
                <Lock size={16} color='gray' />
              </span>
              {user.username}
              <span>
                <ChevronDown size={16} />
              </span>
            </p>

            <div className='flex items-center gap-3'>
              <span>
                <SquarePlus size={24} />
              </span>
              <span>
                <UserSetting />
              </span>
            </div>
          </div>
          <div className='py-2'>
            <DetailProfile user={user} />
          </div>
          <ExploreUserComp type={TYPE_PROFILE.MY_PROFILE} />
          {fakeListStory.length > 0 && (
            <FeatureNews listFutureNews={fakeListStory} />
          )}
          <ProfileTabs />
        </div>
      )}
    </>
  )
}
