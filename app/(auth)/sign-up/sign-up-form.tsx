'use client'

import { ButtonLoading } from '@/components/ButtonLoading'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { registerSchema } from '@/lib/validates'
import { SignUpUserFormData } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function SignUpForm({ values }: { values: SignUpUserFormData }) {
  const [loading, setLoading] = React.useState(false)
  const t = useTranslations()
  const form = useForm<z.infer<typeof registerSchema>>({
    mode: 'onChange',
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const {
    formState: { isValid },
  } = form

  const onSubmit = (value: z.infer<typeof registerSchema>) => {
    const payload = {
      fullname: values.fullname,
      email: value.email,
      password: value.password,
    }
    console.log('Payload----->', payload)
  }

  return (
    <section>
      <h1 className='text-2xl font-semibold mb-4'>
        {t('title.create_account')}
      </h1>
      <p className='text-red-400 font-semibold text-sm my-4'>
        Username has already
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={t('placehoolder.email')}
                    {...field}
                    className='py-4 h-10 rounded-3xl text-sm'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='••••••••'
                    {...field}
                    className='py-4 h-10 rounded-3xl text-sm'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {loading ? (
            <ButtonLoading title={t('button.sign_up')} />
          ) : (
            <Button
              type='submit'
              disabled={!isValid}
              className='w-full rounded-full'
              size='lg'
            >
              {t('button.sign_up')}
            </Button>
          )}
        </form>
      </Form>
    </section>
  )
}
