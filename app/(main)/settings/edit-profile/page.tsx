'use client'

import { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { useTranslations } from 'next-intl'
import { UserSettingProfileProps } from '@/types'
import { defaultEditUser } from '@/lib/const'
import {
  changeAvatarUser,
  getMyProfile,
  updateProfile,
} from '@/services/https/userService'
import { AvatarUser } from '@/components/AvatarUser'
import { Input } from '@/components/ui/input'

export default function page() {
  const t = useTranslations()

  const [user, setUser] = useState<UserSettingProfileProps>(defaultEditUser)
  const [loading, setLoading] = useState<boolean>(false)
  // Form
  const [editingField, setEditingField] = useState<string | null>(null)
  const [tempValue, setTempValue] = useState<string>('')
  // Avatar
  const [newAvatar, setNewAvatar] = useState<File | null>(null)
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const res = await getMyProfile()
        setUser(res.user)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }
    fetchUser()
  }, [])

  const listSettingFields = [
    {
      label: t('typography.name'),
      field: 'fullName',
      value: loading ? '.....' : user.fullName,
    },
    {
      label: t('typography.username'),
      field: 'username',
      value: loading ? '.....' : user.username,
    },
    {
      label: t('typography.phone'),
      field: 'phone',
      value: loading ? '.....' : user.phone,
    },
    {
      label: t('typography.bio'),
      field: 'bio',
      value: loading ? '.....' : user.bio,
    },
    {
      label: t('typography.gender'),
      field: 'gender',
      value: loading ? '.....' : user.gender,
    },
  ]

  const handleEdit = (field: string, value: string) => {
    setEditingField(field)
    setTempValue(value)
  }

  const handleSave = async (field: string) => {
    try {
      // Cập nhật giá trị mới vào user
      const updatedUser = { [field]: tempValue }
      await updateProfile(updatedUser) // Gọi API để cập nhật thông tin
      setUser({ ...user, [field]: tempValue }) // Cập nhật thông tin mới vào user
      setEditingField(null)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setNewAvatar(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveAvatar = async () => {
    try {
      if (newAvatar) {
        const formData = new FormData()
        formData.append('file', newAvatar)
        await changeAvatarUser(formData)

        if (previewAvatar) {
          setUser({ ...user, avatar: { url: previewAvatar } }) // Cập nhật thông tin mới vào user
        }
        setNewAvatar(null) // Đặt lại ảnh mới
        setPreviewAvatar(null)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancelAvatar = () => {
    setNewAvatar(null)
    setPreviewAvatar(null)
  }

  return (
    <div>
      <div className='flex flex-col items-center justify-center pb-2'>
        <AvatarUser
          src={previewAvatar || user?.avatar?.url}
          username={user.username}
          hasStory={false}
          width={80}
          height={80}
          loading={loading}
        />
        <input
          type='file'
          id='change-avatar'
          name='file'
          hidden
          accept='image/png, image/jpeg, image/jgp'
          onChange={handleAvatarChange}
        />
        <div className='flex items-center gap-2'>
          {previewAvatar && (
            <label className='text-xs font-medium text-gray-400 mt-1'>
              Cancel
            </label>
          )}
          {previewAvatar ? (
            <button
              type='submit'
              className='text-xs font-medium text-blue-400 mt-1'
              onClick={handleSaveAvatar}
            >
              {t('button.confirm')}
            </button>
          ) : (
            <label
              htmlFor='change-avatar'
              className='text-xs font-medium text-blue-400 mt-1'
              onClick={handleCancelAvatar}
            >
              {t('typography.change_avatar')}
            </label>
          )}
        </div>
      </div>
      <Separator />
      <div>
        {listSettingFields.map((field, index) => (
          <div
            key={index}
            className='px-2 flex items-center h-12 gap-4 border-b border-gray-300 text-sm '
            onClick={() => handleEdit(field.label, field.value)}
          >
            <span className='flex-[2]'>{field.label}</span>
            {editingField === field.label ? (
              <Input
                type='text'
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onBlur={() => handleSave(field.field)} // Lưu khi mất focus
                className='flex-[5]'
              />
            ) : (
              <span className='flex-[5] text-gray-600'>{field.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
