'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { pathRoute } from '@/lib/const'
import { zodResolver } from '@hookform/resolvers/zod'
import { HomeIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function page() {
  const t = useTranslations()
  let error = 'Invalid OTP'
  const params = useParams<{ userId: string }>()
  let { userId } = params
  if (userId && userId.includes('%40')) {
    userId = userId.replace('%40', '@')
  }
  const FormSchema = z.object({
    pin: z.string().min(6, {
      message: t('notify.otp_rule'),
    }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  return (
    <div>
      <Link href={pathRoute.HOME}>
        <div className='absolute top-8 left-8 text-primary'>
          <HomeIcon />
        </div>
      </Link>
      <section className='pt-20 px-8'>
        <h1 className='text-2xl font-semibold'>{t('title.active_account')}</h1>
        <p className='text-slate-500 text-sm py-2 '>
          {t('notify.send_email', { email: userId })}
        </p>

        {error && (
          <p className='text-red-500 text-sm py-2 '>{t('error.otp_invalid')}</p>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='pin'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full rounded-full'>
              {t('button.submit')}
            </Button>
          </form>
        </Form>
      </section>
    </div>
  )
}
