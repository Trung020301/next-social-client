import CardPost from '@/components/card-post/CardPost'
import HeaderHome from '@/components/HeaderHome'
import { posts } from '@/services/data'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home Page',
  description: 'Home page description',
}

export default function Page() {
  return (
    <div className=''>
      <HeaderHome />
      <div className='mt-4 flex flex-col gap-2 mb-10'>
        <CardPost {...posts} />
        <CardPost {...posts} />
        {/* <CardPost {...post} /> */}
        {/* <CardPost {...post} /> */}
      </div>
      {/* <Tiptap /> */}
    </div>
  )
}
