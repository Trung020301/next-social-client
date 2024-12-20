'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

export default function page() {
  const t = useTranslations()

  const [results, setResults] = useState([])
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/todos/1',
        )
        const data = await response.json()
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return <div>page</div>
}
