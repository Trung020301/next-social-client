'use client'

import DetailProfile from '@/components/profile/DetailProfile'
import ExploreUserComp from '@/components/profile/explore-user/ExploreUserComp'
import FeatureNews from '@/components/profile/feature-news/FeatureNews'
import ProfileTabs from '@/components/profile/tabs/ProfileTabs'
import { TYPE_PROFILE } from '@/lib/const'
import { fakeListStory } from '@/services/data'
import { UserDetailProps } from '@/types'

export default function Page() {
  return (
    <div>
      <div className='py-2'>
        <DetailProfile type={TYPE_PROFILE.USER_PROFILE} />
      </div>
      <ExploreUserComp type={TYPE_PROFILE.USER_PROFILE} />
      {/* {fakeListStory.length > 0 && (
        <FeatureNews listFutureNews={fakeListStory} />
      )} */}
      <ProfileTabs />
    </div>
  )
}
