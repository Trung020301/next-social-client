import { IPost } from '@/lib/interface'
import React from 'react'
import NoPostUI from '../NoPostUI'
import { allPostTabs } from '@/services/data'

export default function ReefsTab() {
  if (allPostTabs.length === 0) {
    return <NoPostUI />
  }

  return <div>ReefsTab</div>
}
