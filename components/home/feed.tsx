'use client'

import { useEffect, useState } from 'react'
import { ICardPost } from '@/lib/interface'
import { getNewsFeed } from '@/services/https/userService'
import CardPost from '../card-post/CardPost'

export default function NewsFeed() {
  const [posts, setPosts] = useState<ICardPost[]>([])
  const [loading, setLoading] = useState<boolean>(false)
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
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className='mt-4 flex flex-col gap-2 mb-10'>
      {posts.map((post: ICardPost) => (
        <CardPost key={post._id} post={post} />
      ))}
    </div>
  )
}
