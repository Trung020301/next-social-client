import apiClient from '@/app/api/httpRequest'

export const getMyProfile = async () => {
  const response = await apiClient.get('/user/get-my-profile')
  return response.data
}

export const getUserProfile = async (params: { username: string }) => {
  const response = await apiClient.get(`/user/${params.username}`)
  return response.data
}

export const getNewsFeed = async (query?: object) => {
  const response = await apiClient.get('/user/feed/news-feed', {
    params: query,
  })
  return response.data
}

export const getUserExplore = async () => {
  const response = await apiClient.get('/user/explore-user')
  return response.data
}

export const getUserExploreUserProfile = async (params: {
  username: string
}) => {
  const response = await apiClient.get(`/user/explore-user/${params.username}`)
  return response.data
}
