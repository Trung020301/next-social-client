import CardPost from '@/components/card-post/CardPost'
import HeaderHome from '@/components/HeaderHome'
import { CardPostProps } from '@/types'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home Page',
  description: 'Home page description',
}

export default function Page() {
  const post: CardPostProps = {
    src: 'https://github.com/shadcn.png',
    fullname: 'Tran Dinh Trung',
    hasStory: true,
    content: {
      createdAt: '2021-10-10',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lorem sapien, tincidunt nec nunc nec, tincidunt ultricies nunc. Donec nec nunc nec, tincidunt ultricies nunc. Donec nec nunc nec, tincidunt ultricies nunc.',
      images: [
        'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?q=80&w=2843&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
    },
  }

  return (
    <div className=''>
      <HeaderHome />
      <div className='mt-4 flex flex-col gap-2 mb-10'>
        <CardPost {...post} />
        <CardPost {...post} />
        <CardPost {...post} />
        <CardPost {...post} />
      </div>
      {/* <Tiptap /> */}
    </div>
  )
}
