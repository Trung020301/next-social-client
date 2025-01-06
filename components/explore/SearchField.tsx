'use client'

import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useDebounce } from '@uidotdev/usehooks'
import { Search } from 'lucide-react'

import { Input } from '../ui/input'
import { AvatarUser } from '../AvatarUser'
import { findUserByQuery } from '@/services/https/userService'
import { IUser } from '@/lib/interface'
import { pathRoute } from '@/lib/const'

export default function SearchField() {
  const t = useTranslations()
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<IUser[]>([])
  const [searchValue, setSearchValue] = useState('')

  const debouncedSearchValue = useDebounce(searchValue, 300)
  const conditionRenderResults = results.length > 0 && !isSearching
  const conditionNoResults = results.length === 0 && !isSearching && searchValue

  // Handlers
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  useEffect(() => {
    const fetchResults = async () => {
      let results = []
      setIsSearching(true)
      if (debouncedSearchValue) {
        const data = await findUserByQuery({
          q: debouncedSearchValue,
        })
        results = data.data.users || []
      }
      setIsSearching(false)
      setResults(results)
    }
    fetchResults()
  }, [debouncedSearchValue])

  return (
    <div className='md:flex md:items-center md:justify-center'>
      <div className='flex items-center px-2 border-b-2 border-gray-300 fixed top-0 w-full dark:bg-blend-darken bg-white md:w-primary'>
        <div>
          <Search />
        </div>
        <Input
          className='w-full pr-6 h-10 focus-visible:outline-none border-none border-transparent shadow-none'
          placeholder={t('placehoolder.type_username')}
          type='text'
          onChange={handleChange}
          value={searchValue}
        />
        <>{isSearching && <div className='loader-search'></div>}</>
      </div>
      <ul className='md:w-primary shadow-lg pt-10'>
        {conditionRenderResults &&
          results.map((user: IUser) => (
            <Link key={user._id} href={`${pathRoute.ACCOUNT}/${user.username}`}>
              <li className='hover:bg-slate-100 p-1 flex items-center gap-2 cursor-pointer'>
                <AvatarUser src={user?.avatar?.url} username={user.username} />
                <span className='text-xs font-semibold'>{user.username}</span>
              </li>
            </Link>
          ))}
      </ul>
      {conditionNoResults && (
        <div className='text-center text-sm text-gray-500 py-2'>
          {t('typography.search_no_result')}
        </div>
      )}
    </div>
  )
}
