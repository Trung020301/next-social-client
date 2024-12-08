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
import Link from 'next/link'
import { pathRoute, STEP_ONE } from '@/lib/const'
import { useState } from 'react'
import { ButtonLoading } from '@/components/ButtonLoading'
import { signIn } from '@/services/https/authService'
import { useUser } from '@/hooks/useUser'

export default function SignInForm() {
  const t = useTranslations()
  const { setUser } = useUser()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>()
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

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      setLoading(true)
      const res = await signIn(values)
      setUser(res)
      localStorage.setItem('user', JSON.stringify(res))
      window.location.href = pathRoute.HOME
    } catch (error: any) {
      setError(error.response?.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 px-2'>
        {error && (
          <FormMessage className='text-center'>
            {t(`error.${error}`)}
          </FormMessage>
        )}
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={t('placehoolder.username')}
                  {...field}
                  className='py-4 h-10 rounded-3xl text-sm focus-visible:ring-1 focus-visible:ring-ring'
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
                  className='py-4 h-10 rounded-3xl text-sm focus-visible:ring-1 focus-visible:ring-ring'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className='text-xs text-slate-500 text-right'>
          {t('typography.forgot_password')}
        </p>
        {loading ? (
          <ButtonLoading title={t('button.sign_in')} />
        ) : (
          <Button
            type='submit'
            disabled={!isValid || loading}
            className='w-full rounded-full'
          >
            {t('button.sign_in')}
          </Button>
        )}
      </form>
      <p className='text-sm text-center mt-10'>
        {t('typography.no_account')}{' '}
        <Link href={`${pathRoute.SIGN_UP}?type=${STEP_ONE}`}>
          <span className='text-primary'>{t('typography.register')}</span>
        </Link>
      </p>
    </Form>
  )
}
