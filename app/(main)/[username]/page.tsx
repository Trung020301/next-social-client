'use client'

import DetailProfile from '@/components/profile/DetailProfile'
import ExploreUserComp from '@/components/profile/explore-user/ExploreUserComp'
import FeatureNews from '@/components/profile/feature-news/FeatureNews'
import ProfileTabs from '@/components/profile/tabs/ProfileTabs'
import { TYPE_PROFILE } from '@/lib/const'
import { fakeListStory } from '@/services/data'
import { UserDetailProps } from '@/types'

export default function Page() {
  const fakeUser: UserDetailProps = {
    user: {
      _id: '12389123821',
      fullname: 'Lý An Nhiên',
      avatar:
        'https://res.cloudinary.com/dpqhuucyq/image/upload/v1730724111/5_lh5bnk.jpg',
      bio: 'Hello there',
      email: 'trandtrung@example.com',
      hasStory: true,
      createdAt: '2021-01-21',
      username: 'ly.an.nhien',
    },
    posts: [
      {
        author: {
          _id: '1asjkldkjashdsa',
          username: 'tran.d.t12389123821ung',
          fullname: 'Lý An Nhiên',
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
      {
        author: {
          _id: '1asjkldkjashdsaqư',
          username: 'tran.d.t12389123821ung',
          fullname: 'Lý An Nhiên',
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
        _id: '4',
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
      {
        _id: '5',
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
    <div>
      <div className='py-2'>
        <DetailProfile user={fakeUser} />
      </div>
      <ExploreUserComp type={TYPE_PROFILE.USER_PROFILE} />
      {fakeListStory.length > 0 && (
        <FeatureNews listFutureNews={fakeListStory} />
      )}
      <ProfileTabs />
    </div>
  )
}
