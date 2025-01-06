import HeaderHome from '@/components/HeaderHome'
import NewsFeed from '@/components/home/feed'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home Page',
  description: 'Home page description',
}

export default async function Page() {
  return (
    <div className='md:flex md:items-center md:justify-center md:flex-col'>
      <HeaderHome />
      <NewsFeed />
    </div>
  )
}
