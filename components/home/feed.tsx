'use client'

import { useEffect, useState } from 'react'
import { ICardPost } from '@/lib/interface'
import { getNewsFeed } from '@/services/https/userService'
import CardPost from '../card-post/CardPost'
import LoadingChild from '../fallback/LoadingChild'
import { useTranslations } from 'next-intl'

export default function NewsFeed() {
  const t = useTranslations()
  const [posts, setPosts] = useState<ICardPost[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getNewsFeed()
        setPosts(response.data.posts)
        setLoading(false)
      } catch (error: any) {
        setError(error.message)
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const handleHidePost = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId))
  }

  if (loading) return <LoadingChild />

  if (error)
    return <div className='text-center text-red-500 font-bold'>{error}</div>

  if (posts.length === 0 && !loading)
    return (
      <div className='text-center text-gray-500 font-bold'>
        {t('notify.no_post_found')}
      </div>
    )

  return (
    <div className='mb-10'>
      {posts.map((post: ICardPost) => (
        <CardPost
          key={post._id}
          post={post}
          onHidePost={() => handleHidePost(post._id)}
        />
      ))}
    </div>
  )
}
