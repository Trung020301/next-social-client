import { SquarePlus } from 'lucide-react'
import dynamic from 'next/dynamic'
import ExploreUserComp from '@/components/profile/explore-user/ExploreUserComp'
import FeatureNews from '@/components/profile/feature-news/FeatureNews'
import ProfileTabs from '@/components/profile/tabs/ProfileTabs'
import { TYPE_PROFILE } from '@/lib/const'
const Header = dynamic(() => import('@/components/profile/Header'))
const UserSetting = dynamic(() => import('@/components/settings/user-setting'))
const CreateFields = dynamic(
  () => import('@/components/settings/create-fields'),
)
const DetailProfile = dynamic(
  () => import('@/components/profile/DetailProfile'),
  { ssr: false },
)

export default async function Page() {
  return (
    <div className='pt-4 md:w-primary md:m-auto'>
      <div className='flex items-center justify-between px-2'>
        <Header />
        <div className='flex items-center gap-3'>
          <span>
            <CreateFields />
          </span>
          <span>
            <UserSetting />
          </span>
        </div>
      </div>
      <div className='py-2'>
        <DetailProfile type={TYPE_PROFILE.MY_PROFILE} />
      </div>
      <ExploreUserComp type={TYPE_PROFILE.MY_PROFILE} />
      {/* {fakeListStory.length > 0 && (
            <FeatureNews listFutureNews={fakeListStory} />
          )} */}
      <ProfileTabs />
    </div>
  )
}
