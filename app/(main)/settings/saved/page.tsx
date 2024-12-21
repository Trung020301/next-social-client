'use client'

import LoadingChild from '@/components/fallback/LoadingChild'
import { pathRoute } from '@/lib/const'
import { IPost } from '@/lib/interface'
import { getSavedPosts } from '@/services/https/userService'
import { Film, Notebook } from 'lucide-react'
import { CldImage } from 'next-cloudinary'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function page() {
  const t = useTranslations()

  const [results, setResults] = useState<IPost[] | []>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSavedPosts()
        setResults(response.data.posts)
      } catch (error) {
        setError(t('error.fetching_data'))
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return <LoadingChild />
  }

  if (error) {
    return <div className='text-center text-red-500 font-bold'>{error}</div>
  }

  if (results.length === 0 && !loading)
    return (
      <div className='text-center text-gray-500'>
        {t('error.no_saved_posts')}
      </div>
    )

  return (
    <div>
      <div className='flex flex-wrap gap-1'>
        {results.map((post) => (
          <Link
            key={post._id}
            href={`${pathRoute.ACCOUNT}/posts`}
            className='w-[32%] relative flex h-48 items-end overflow-hidden rounded-lg shadow-lg'
          >
            {post.MediaTypeEnum === 'image' ? (
              <CldImage
                priority
                src={post.mediaUrl[0].url}
                width={100}
                height={250}
                alt='Photo'
                className='absolute inset-0 w-full h-full object-cover object-center'
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
              <span className='text-xs'>{post.userId.username}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
