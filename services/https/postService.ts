import apiClient from '@/app/api/httpRequest'

export const getAllPosts = async (endpoint: string) => {
  const response = await apiClient.get(endpoint)
  return response.data
}
