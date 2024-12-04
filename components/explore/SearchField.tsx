'use client'

import React, { useState } from 'react'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useTranslations } from 'next-intl'
import { useDebounce } from '@uidotdev/usehooks'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'
import { AvatarUser } from '../AvatarUser'

export default function SearchField() {
  const t = useTranslations()
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<string[]>([])
  const [searchValue, setSearchValue] = useState('')

  const debouncedSearchValue = useDebounce(searchValue, 300)

  // Handlers
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const handleSubmit = () => {}

  const fakeUser = {
    src: 'https://res.cloudinary.com/dpqhuucyq/image/upload/v1730263036/avatars/1_s8hhrh.jpg',
    username: 'Trung',
    hasStory: false,
    width: 28,
    height: 28,
  }

  return (
    <div>
      <div className='flex items-center border-b-2 border-gray-300'>
        <div className='pl-2'>
          <Search />
        </div>
        <Input
          className='w-full pr-8 h-10 focus-visible:outline-none border-none border-transparent shadow-none'
          placeholder={t('placehoolder.type_username')}
          type='type'
        />
      </div>
      <ul className='mp-2 shadow-lg'>
        <li className='hover:bg-slate-100 p-1 flex items-center gap-2 cursor-pointer'>
          <AvatarUser {...fakeUser} />
          <span className='text-xs font-semibold'>{fakeUser.username}</span>
        </li>
      </ul>
    </div>
  )
}
