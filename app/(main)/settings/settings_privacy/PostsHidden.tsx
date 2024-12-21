'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { getPostsHidden, unhidePost } from '@/services/https/userService'
import LoadingChild from '@/components/fallback/LoadingChild'
import { Film, Loader2, Notebook, Pencil, X } from 'lucide-react'
import { IPost } from '@/lib/interface'
import { CldImage } from 'next-cloudinary'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/hooks/use-toast'

export default function PostsHidden() {
  const t = useTranslations()

  const [results, setResults] = useState<IPost[] | []>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingState, setLoadingState] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [listItemChecked, setListItemChecked] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPostsHidden()
        setResults(response.data.posts)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(t('error.unexpected'))
      }
    }
    fetchPosts()
  }, [])

  if (loading) return <LoadingChild />

  if (error)
    return <div className='text-center text-sm text-red-500'>{error}</div>

  if (results.length === 0 && !loading)
    return (
      <div className='text-center text-gray-500'>
        {t('error.no_posts_hidden')}
      </div>
    )

  const handeCheck = (id: string) => {
    if (listItemChecked.includes(id)) {
      setListItemChecked(listItemChecked.filter((item) => item !== id))
    } else {
      setListItemChecked([...listItemChecked, id])
    }
  }

  const handleSubmit = async () => {
    try {
      setLoadingState(true)
      const res = await unhidePost(listItemChecked)
      if (res.status === 201) {
        setListItemChecked([])
        setEditMode(false)
        setResults(
          results.filter((post) => !listItemChecked.includes(post._id)),
        )
        toast({
          variant: 'success',
          description: t('toast.unhide_post_success'),
        })
      }
      setLoadingState(false)
    } catch (error) {
      toast({
        variant: 'destructive',
        description: t('error.unexpected'),
      })
      setLoadingState(false)
    }
  }

  return (
    <div>
      <div className='p-2 flex items-center justify-between h-9'>
        <p className='text-sm font-medium'>{t('settings.posts_hidden')}</p>
        <i>
          {editMode ? (
            <div className='flex items-center gap-1'>
              <Button
                className='text-xs h-9'
                variant='ghost'
                disabled={!listItemChecked.length || loadingState}
                onClick={handleSubmit}
              >
                {loadingState && <Loader2 className='animate-spin' />}
                {t('button.unhide_post')} ({listItemChecked.length})
              </Button>
              <X size={16} color='red' onClick={() => setEditMode(!editMode)} />
            </div>
          ) : (
            <Pencil size={16} onClick={() => setEditMode(!editMode)} />
          )}
        </i>
      </div>
      <div className='flex flex-wrap gap-1'>
        {results.map((post) => (
          <div
            key={post._id}
            className='w-[32%] relative flex h-48 items-end overflow-hidden rounded-lg shadow-lg'
            onClick={() => editMode && handeCheck(post._id)}
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
            {editMode ? (
              <div className='relative ml-2 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg'>
                <Checkbox
                  checked={listItemChecked.includes(post._id)}
                  onChange={() => handeCheck(post._id)}
                />
              </div>
            ) : (
              <span className='relative ml-2 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg'>
                {post.MediaTypeEnum === 'video' ? (
                  <Film size={16} />
                ) : (
                  <Notebook size={16} />
                )}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
