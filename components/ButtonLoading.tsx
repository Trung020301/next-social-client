import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function ButtonLoading({ title }: { title: string }) {
  return (
    <Button disabled className='w-full rounded-full'>
      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
      {title}
    </Button>
  )
}
