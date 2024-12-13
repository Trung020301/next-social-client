import LoadingChild from '@/components/fallback/LoadingChild'
import { toast } from '@/components/hooks/use-toast'
import { getBlockedListUser } from '@/services/https/userService'
import { useState, useEffect } from 'react'

export default function BlockedUserComp() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getBlockedListUser()
        setUsers(response.data.blockedUsers)
        setLoading(false)
      } catch (error: any) {
        setLoading(false)
        setError(error.message)
      }
    }
    fetchUsers()
  }, [])

  if (loading) {
    return <LoadingChild />
  }

  if (error) {
    return <p className='text-red-500 text-sm'>{error}</p>
  }

  return <div>BlockedUser</div>
}
