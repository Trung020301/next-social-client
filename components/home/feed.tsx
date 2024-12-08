'use client'

import { useEffect, useState } from 'react'
import { ICardPost } from '@/lib/interface'
import { getNewsFeed } from '@/services/https/userService'
import CardPost from '../card-post/CardPost'
import LoadingChild from '../fallback/LoadingChild'

export default function NewsFeed() {
  const [posts, setPosts] = useState<ICardPost[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const query = {
    limit: 10,
  }
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const response = await getNewsFeed(query)
        setPosts(response.data.posts)
        setLoading(false)
      } catch (error: any) {
        setError(error.message)
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (loading) return <LoadingChild />

  if (error)
    return <div className='text-center text-red-500 font-bold'>{error}</div>

  return (
    <div className='mb-10'>
      {posts.map((post: ICardPost) => (
        <CardPost key={post._id} post={post} />
      ))}
    </div>
  )
}
