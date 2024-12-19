'use client'

import React, { useState } from 'react'
import { PostType } from '@/types'

import { useForm } from 'react-hook-form'

import 'react-quill/dist/quill.snow.css'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createPostSchema } from '@/lib/validates'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { createPostFileImage } from '@/lib/const'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Globe, Loader2, Lock, UserRoundCheck } from 'lucide-react'
import { createPost } from '@/services/https/postService'
import { toast } from '@/components/hooks/use-toast'
export default function page() {
  const t = useTranslations()
  const [multipleImages, setMultipleImages] = useState<File[]>([])
  const [resourceType, setResourceType] = useState<PostType>('image')
  const [loading, setLoading] = useState<boolean>(false)

  const listVisibility = [
    {
      value: 'public',
      label: t('label.public'),
      icon: <Globe size={16} />,
    },
    {
      value: 'private',
      label: t('label.private'),
      icon: <Lock size={16} />,
    },
    {
      value: 'followers',
      label: t('label.followers'),
      icon: <UserRoundCheck size={16} />,
    },
  ]

  const defaultValues = {
    files: [] as (string | undefined)[],
    content: '',
    resourceType: resourceType,
    visibility: 'public',
  }

  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues,
    mode: 'onChange',
  })

  const onSubmit = async (values: z.infer<typeof createPostSchema>) => {
    const formData = new FormData()
    formData.append('content', values.content || '')
    formData.append('resourceType', resourceType)
    formData.append('visibility', values.visibility || 'public')

    multipleImages.forEach((image) => {
      formData.append('files', image)
    })

    try {
      setLoading(true)
      const response = await createPost(formData)
      if (response.status === 201) {
        toast({
          variant: 'success',
          description: t('success.upload_successfully'),
        })
        form.reset()
        setMultipleImages([])
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        description: t('error.unexpected'),
      })
    } finally {
      setLoading(false)
    }
  }

  // Handlers
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files)

      setMultipleImages((prevFiles) => prevFiles.concat(files))

      const firstFileType = event.target.files[0].type
      if (firstFileType.startsWith('image/')) {
        setResourceType('image')
      } else if (firstFileType.startsWith('video/')) {
        setResourceType('video')
      }
    }
  }

  const handleRemoveFileItem = (index: number) => {
    setMultipleImages((prevImages) => prevImages.filter((_, i) => i !== index))
  }

  return (
    <div className='p-2'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='files'
            render={({ field }) => (
              <FormItem>
                <p className='text-sm font-semibold'>
                  {t('label.choose_files')}
                </p>
                <FormLabel className='text-sm text-gray-500'>
                  <Image
                    src={createPostFileImage}
                    width={80}
                    height={80}
                    alt='upload'
                    className='w-6 h-6 '
                  />
                </FormLabel>
                <FormControl>
                  <Input
                    className='hidden'
                    type='file'
                    disabled={loading}
                    multiple
                    accept='image/*, video/*'
                    {...field}
                    onChange={handleFileChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex flex-wrap gap-2'>
            {multipleImages.map((file, index) => (
              <div key={index} className='relative'>
                {file.type.startsWith('image/') ? (
                  <Image
                    src={URL.createObjectURL(file)}
                    width={144}
                    height={160}
                    alt={`selected-file-${index}`}
                    className='w-36 h-40 object-cover rounded-sm'
                    onClick={() => handleRemoveFileItem(index)}
                  />
                ) : (
                  <video
                    width={144}
                    height={160}
                    controls
                    className='w-full h-auto object-cover rounded-sm'
                  >
                    <source src={URL.createObjectURL(file)} type={file.type} />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            ))}
          </div>

          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} disabled={loading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='visibility'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm text-gray-500'>
                  {t('label.visibility')}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={loading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('label.visibility')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {listVisibility.map((item, index) => (
                      <SelectItem key={index} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' disabled={!form.formState.isValid || loading}>
            {loading ? (
              <Loader2 className='animate-spin' />
            ) : (
              t('button.upload')
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
