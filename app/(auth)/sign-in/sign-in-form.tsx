'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginSchema } from '@/lib/validates'
import { LoginUser } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import z from 'zod'
import setLanguageValue from './actions'
import Link from 'next/link'
import { pathRoute } from '@/lib/const'
import { useState } from 'react'
import { ButtonLoading } from '@/components/ButtonLoading'

export default function SignInForm() {
  const t = useTranslations()
  const [loading, setLoading] = useState(false)
  const defaultValues: LoginUser = {
    username: '',
    password: '',
  }

  const form = useForm<z.infer<typeof loginSchema>>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
    defaultValues,
  })

  const {
    formState: { isValid },
  } = form

  function onSubmit(values: z.infer<typeof loginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={t('placehoolder.username')} {...field} />
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
                <Input type='password' placeholder='••••••••' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className='text-sm text-slate-500 text-right'>
          {t('typography.forgot_password')}
        </p>
        {loading ? (
          <ButtonLoading title={t('button.sign_in')} />
        ) : (
          <Button
            type='submit'
            disabled={!isValid}
            className='w-full rounded-full'
            size='lg'
          >
            {t('button.sign_in')}
          </Button>
        )}
      </form>
      <p className='text-sm text-center mt-10'>
        {t('typography.no_account')}{' '}
        <Link href={pathRoute.SIGN_UP}>
          <span className='text-primary'>{t('typography.register')}</span>
        </Link>
      </p>
    </Form>
  )
}
