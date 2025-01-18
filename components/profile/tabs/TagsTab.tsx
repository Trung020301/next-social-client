import React, { useEffect, useState } from 'react'
import NoPostUI from '../NoPostUI'
import { useParams } from 'next/navigation'
import {
  getSharedPost,
  getSharedPostByUser,
} from '@/services/https/userService'
import Link from 'next/link'
import { pathRoute } from '@/lib/const'
import { Film, Notebook } from 'lucide-react'
import { IPost } from '@/lib/interface'
import { CldImage } from 'next-cloudinary'

export default function TagsTab() {
  const params = useParams<{ username: string }>()
  const checkParams = params?.username !== undefined

  const [posts, setPosts] = useState<IPost[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const response = checkParams
          ? await getSharedPostByUser({
              username: params.username,
            })
          : await getSharedPost()
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
          {post.MediaTypeEnum === 'image' ? (
            <CldImage
              priority
              src={post.mediaUrl[0].url}
              width='200'
              height='250'
              crop='fill'
              alt='Photo'
              className='absolute inset-0 h-full md:m-auto object-cover object-center'
            />
          ) : (
            <video
              src={post.mediaUrl[0].url}
              className='absolute inset-0 w-full h-full object-cover object-center'
            />
          )}
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
