'use client'

import { useEffect, useState } from 'react'
import { getReportedPosts } from '@/services/https/adminServices'
import { ReportedPost, columns } from './columns'
import { DataTable } from './data-table'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

export default function DemoPage() {
  const t = useTranslations()

  const [data, setData] = useState<ReportedPost[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [limit] = useState(5)

  useEffect(() => {
    setLoading(true)
    getReportedPosts({ page, limit })
      .then((res) => {
        setData(res.data.posts)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [page, limit])

  return (
    <>
      <DataTable columns={columns} data={data} />
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 1}
        >
          {t('button.back')}
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => setPage((prev) => prev + 1)}
          disabled={data.length < limit}
        >
          {t('button.next')}
        </Button>
      </div>
    </>
  )
}
