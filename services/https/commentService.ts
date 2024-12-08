import apiClient from '@/app/api/httpRequest'

export const getCommentsByPost = async (postId: string) => {
  const response = await apiClient.post('/comment', {
    postId,
  })
  return response.data
}
