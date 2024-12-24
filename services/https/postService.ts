import apiClient from '@/app/api/httpRequest'
import { ToggleLikePost } from '@/lib/interface'
import { VisibilityType } from '@/types'

// Types
type updatePostType = {
  postId: string
  content: string
  visibility: VisibilityType
  files: File[]
}

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

// ? [POST METHOD] ***********************************************************
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

// ? [UPDATE METHOD] ***********************************************************
export const updatePost = async (payload: Partial<updatePostType>) => {
  return await apiClient.patch('/post/update-post', payload)
}

//? [DELETE POST] ***********************************************************
export const deletePost = async (postId: string) => {
  return await apiClient.delete(`/post`, { data: { postId } })
}
