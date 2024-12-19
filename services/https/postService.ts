import apiClient from '@/app/api/httpRequest'
import { ToggleLikePost } from '@/lib/interface'
import { DefaultValuesPostProps } from '@/types'
import { string } from 'zod'

export const getAllPosts = async () => {
  const response = await apiClient.get('/post/get-all-posts')
  return response.data
}

export const getAllPostsUser = async (params: { username: string }) => {
  const response = await apiClient.get(`/post/collection/${params.username}`)
  return response.data
}

export const getPostVideo = async () => {
  const response = await apiClient.get('/post/get-post-video')
  return response.data
}

export const toggleLikePost = async (toggleLikePost: ToggleLikePost) => {
  return await apiClient.post('/post/interact-post', toggleLikePost)
}

export const createComment = async (payload: {
  postId: string
  content: string
}) => {
  return await apiClient.post('/comment/create', payload)
}

export const createPost = async (payload: FormData) => {
  return await apiClient.post('/post/create-post', payload)
}
