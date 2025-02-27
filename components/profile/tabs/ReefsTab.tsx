'use client'

import { useEffect, useState } from 'react'
import { CldImage } from 'next-cloudinary'
import { Film, Notebook } from 'lucide-react'
import { pathRoute } from '@/lib/const'
import Link from 'next/link'
import NoPostUI from '../NoPostUI'
import { getAllPosts, getAllPostsUser } from '@/services/https/postService'
import { IPost } from '@/lib/interface'
import { useParams } from 'next/navigation'

export default function ReefsTab() {
  const params = useParams<{ username: string }>()
  const checkParams = params?.username !== undefined

  const [posts, setPosts] = useState<IPost[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const response = checkParams
          ? await getAllPostsUser(
              {
                username: params.username,
              },
              {
                MediaTypeEnum: 'video',
              },
            )
          : await getAllPosts({
              MediaTypeEnum: 'video',
            })
        setPosts(response.data.posts)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (posts.length === 0 && !loading) {
    return <NoPostUI />
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center h-[300px]'>
        <span className='loader'></span>
      </div>
    )
  }

  return (
    <div className='flex flex-wrap gap-1'>
      {posts.map((post) => (
        <Link
          key={post._id}
          href={
            checkParams
              ? `${pathRoute.ACCOUNT}/${params.username}/posts`
              : `${pathRoute.PROFILE}/posts`
          }
          className='w-[32%] md:w-[33%] relative flex h-48 md:h-96 items-end overflow-hidden rounded-lg shadow-lg'
        >
          <video
            src={post.mediaUrl[0].url}
            className='absolute inset-0 md:m-auto w-full h-full object-cover object-center'
          />
          <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50'></div>
          <span className='relative ml-2 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg'>
            {post.MediaTypeEnum === 'video' ? (
              <Film size={16} />
            ) : (
              <Notebook size={16} />
            )}
          </span>
        </Link>
      ))}
    </div>
  )
}
