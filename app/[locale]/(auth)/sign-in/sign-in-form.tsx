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
import { useForm } from 'react-hook-form'
import z from 'zod'

export default function SignInForm() {
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
                <Input placeholder='username' {...field} />
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
                <Input placeholder='password' {...field} className='p-' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          disabled={!isValid}
          className='w-full rounded-full'
          size='lg'
        >
          Đăng nhập
        </Button>
      </form>
    </Form>
  )
}
