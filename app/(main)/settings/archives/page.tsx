'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function page() {
  const t = useTranslations()

  const [results, setResults] = useState([])
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(true)

  return <div>page</div>
}
