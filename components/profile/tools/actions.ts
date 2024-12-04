import { blockUser } from '@/services/https/userService'

export const handleBlockUser = async (targetUserId: string) => {
  try {
    return await blockUser(targetUserId)
  } catch (error) {
    console.error('Failed to block user', error)
  }
}
