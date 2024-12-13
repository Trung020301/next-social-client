import apiClient from '@/app/api/httpRequest'

//? [GET API] ***********************************************************
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

export const findUserByQuery = async (params: { q: string }) => {
  const response = await apiClient.get('/user/find-user', {
    params,
  })
  return response.data
}

export const getFollowersByMe = async () => {
  const response = await apiClient.get(`/user/follow/get-followers`)
  return response.data
}

export const getFollowingByMe = async () => {
  const response = await apiClient.get(`/user/follow/get-following`)
  return response.data
}

export const getBlockedListUser = async () => {
  const response = await apiClient.get(`/user/blocked-list`)
  return response.data
}

//? [POST API] ***********************************************************
export const blockUser = async (targetUserId: string) => {
  return await apiClient.post('/user/interact/block-user', { targetUserId })
}

export const toggleFollowUser = async (targetUserId: string) => {
  return await apiClient.post('/user/toggle-follow-user', { targetUserId })
}

export const toggleSavePost = async (postId: string) => {
  return await apiClient.post('/user/save-post', { postId })
}

export const removeFollower = async (followerId: string) => {
  return await apiClient.post('/user/remove-follower', { followerId })
}

//? [UPDATE API] ***********************************************************
export const updateProfile = async (updateData: object) => {
  return await apiClient.patch('/user/update-profile', updateData)
}

export const changeAvatarUser = async (file: FormData) => {
  return await apiClient.put('/user/change-avatar', file)
}
