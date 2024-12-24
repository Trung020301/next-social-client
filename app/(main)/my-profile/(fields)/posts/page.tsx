'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { IPost } from '@/lib/interface'
import { getAllPosts } from '@/services/https/postService'
import LoadingChild from '@/components/fallback/LoadingChild'
import NoPostUI from '@/components/profile/NoPostUI'
import CardPostProfile from '@/components/profile/CardPostProfile'

export default function Page() {
  const router = useRouter()
  const t = useTranslations()

  const [results, setResults] = useState<IPost[] | []>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts()
        setResults(response.data.posts)
        setLoading(false)
      } catch (err: any) {
        setError(err.message)
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const handlePostDelete = (postId: string) => {
    setResults((prevResults) =>
      prevResults.filter((post) => post._id !== postId),
    )
  }

  const handlePostUpdate = (updatedPost: IPost) => {
    setResults((prevResults) =>
      prevResults.map((post) =>
        post._id === updatedPost._id ? updatedPost : post,
      ),
    )
  }

  if (loading) return <LoadingChild />

  if (error) return <p className='text-red-500'>{error}</p>

  if (results.length === 0 && !loading) return <NoPostUI />

  return (
    <div>
      {results.map((post) => (
        <div key={post._id} className='my-4'>
          <CardPostProfile
            {...post}
            onPostDelete={handlePostDelete}
            onPostUpdate={handlePostUpdate}
          />
        </div>
      ))}
    </div>
  )
}
