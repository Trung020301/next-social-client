'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { ICardPost, IPost } from '@/lib/interface'
import CardPost from '@/components/card-post/CardPost'
import { getAllPostsUser } from '@/services/https/postService'
import { useUser } from '@/hooks/useUser'
import LoadingChild from '@/components/fallback/LoadingChild'

export default function page() {
  const t = useTranslations()
  const params = useParams<{ username: string }>()
  const { currentUser } = useUser()

  const [results, setResults] = useState<ICardPost[] | []>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPostsUser({
          username: params.username,
        })
        setResults(response.data.posts)
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

  if (results.length === 0 && !loading)
    return (
      <div className='text-center text-gray-500 font-bold'>
        {t('notify.no_post_found')}
      </div>
    )

  return (
    <div className='mb-10'>
      {results.map((post: ICardPost) => (
        <CardPost
          key={post._id}
          post={post}
          onHidePost={() => {
            /* handle hide post */
          }}
        />
      ))}
    </div>
  )
}
