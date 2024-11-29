import apiClient from '@/app/api/httpRequest'
import { ToggleLikePost } from '@/lib/interface'

export const getAllPosts = async () => {
  const response = await apiClient.get('/post/get-all-posts')
  return response.data
}

export const getPostVideo = async () => {
  const response = await apiClient.get('/post/get-post-video')
  return response.data
}

export const toggleLikePost = async (toggleLikePost: ToggleLikePost) => {
  return await apiClient.post('/post/interact-post', toggleLikePost)
}
