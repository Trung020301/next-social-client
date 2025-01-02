import apiClient from '@/app/api/httpRequest'

export const getReportedPosts = async (options: {
  page: number
  limit: number
}) => {
  const response = await apiClient.get('/admin/posts/reported', {
    params: options,
  })
  return response.data
}

export const getDetailPost = async (postId: string) => {
  const response = await apiClient.get(`/admin/posts/detail/${postId}`)
  return response.data
}

export const getAllUsers = async (options: { page: number; limit: number }) => {
  const response = await apiClient.get('/admin/users', {
    params: options,
  })
  return response.data
}

export const deletePostByAdmin = async (postId: string) => {
  const response = await apiClient.delete(`/admin/posts/delete/${postId}`)
  return response.data
}

export const changeStatusResolved = async (updateData: {
  reportedPostId: string
  resolve: boolean
}) => {
  return await apiClient.patch('/admin/posts/resovle-report', updateData)
}

export const banUserByAdmin = async (userId: string) => {
  const response = await apiClient.post('/admin/banned-user', { userId })
  return response.data
}

export const unbanUserByAdmin = async (userId: string) => {
  const response = await apiClient.post('/admin/unban-user', { userId })
  return response.data
}

export const deleteUserByAdmin = async (userId: string) => {
  const response = await apiClient.delete(`/admin/banned-user`, {
    data: { userId },
  })
  return response.data
}
