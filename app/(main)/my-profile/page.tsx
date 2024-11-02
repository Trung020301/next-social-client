import { ChevronDown, Lock, Menu, SquarePlus } from 'lucide-react'
import DetailProfile from '@/components/profile/DetailProfile'
import { UserDetailProps } from '@/types'
import ExploreUserComp from '@/components/profile/explore-user/ExploreUserComp'
import FeatureNews from '@/components/profile/feature-news/FeatureNews'
import ProfileTabs from '@/components/profile/tabs/ProfileTabs'

export default function Page() {
  const fakeUser: UserDetailProps = {
    user: {
      _id: '1',
      fullname: 'Trần Đình Trung',
      avatar:
        'https://res.cloudinary.com/dpqhuucyq/image/upload/v1730266896/avatars/2_oreucm.jpg',
      bio: '"Everything will be okay?"',
      email: 'trandtrung@example.com',
      hasStory: true,
      createdAt: '2021-01-01',
      username: 'tran.d.trung',
    },
    posts: [
      {
        author: {
          _id: '1asjkldkjashdsa',
          username: 'tran.d.trung',
          fullname: 'Trần Đình Trung',
          avatar: 'https://example.com/avatar.jpg',
          email: '',
          hasStory: true,
          createdAt: '2021-01-01',
        },

        content: {
          text: 'This is a fake post',
          createdAt: '2021-01-01',
        },
        likes: [],
        shares: [],
        comments: [],
      },
    ],
    followers: [
      {
        _id: '2',
        fullname: 'Follower 1',
        username: 'follower1',
        avatar: 'https://example.com/follower1.jpg',
        email: 'follower1@example.com',
        hasStory: false,
        createdAt: '2021-01-01',
      },
      {
        _id: '3',
        username: 'follower2',
        fullname: 'Follower 2',
        avatar: 'https://example.com/follower1.jpg',
        email: 'follower1@example.com',
        hasStory: false,
        createdAt: '2021-01-01',
      },
    ],
    following: [
      {
        _id: '3',
        username: 'following1',
        fullname: 'Following 1',
        avatar: 'https://example.com/following1.jpg',
        email: 'following1@example.com',
        hasStory: false,
        createdAt: '2021-01-01',
      },
    ],
    isFollowed: true,
    isFollowing: true,
    isMe: true,
  }

  return (
    <div className='pt-4'>
      <div className='flex items-center justify-between px-2'>
        <p className='font-bold text-xl flex items-center gap-1'>
          <span>
            <Lock size={16} color='gray' />
          </span>
          {fakeUser.user.username}
          <span>
            <ChevronDown size={16} />
          </span>
        </p>

        <div className='flex items-center gap-3'>
          <span>
            <SquarePlus size={24} />
          </span>
          <span>
            <Menu size={24} />
          </span>
        </div>
      </div>
      <div className='py-2'>
        <DetailProfile user={fakeUser} />
      </div>
      <ExploreUserComp />
      <FeatureNews />
      <ProfileTabs />
    </div>
  )
}
