import apiClient from '@/app/api/httpRequest'

export const getMyProfile = async (endpoint: string) => {
  const response = await apiClient.get(endpoint)
  return response.data
}
