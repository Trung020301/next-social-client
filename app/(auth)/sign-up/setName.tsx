import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SignUpUserFormData } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function setName({
  nextStep,
  values,
  setValues,
}: {
  nextStep: () => void
  values: SignUpUserFormData
  setValues: React.Dispatch<React.SetStateAction<SignUpUserFormData>>
}) {
  const t = useTranslations()
  const schema = z.object({
    fullName: z
      .string()
      .min(2, { message: t('error.name_length') })
      .refine((value) => !value.startsWith(' '), {
        message: t('error.start_with_space'),
      }),
  })

  const form = useForm<z.infer<typeof schema>>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: values.fullName,
    },
  })

  const {
    formState: { isDirty },
  } = form

  const onSubmit = (value: z.infer<typeof schema>) => {
    setValues({ ...values, fullName: value.fullName })
    nextStep()
  }

  return (
    <div>
      <h1 className='text-2xl font-semibold'>{t('title.set_name')}</h1>
      <p className='text-sm text-slate-500 my-3'>{t('typography.real_name')}</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='fullName'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={t('placehoolder.name')}
                    {...field}
                    className='py-4 h-10 rounded-3xl text-sm focus-visible:ring-1 focus-visible:ring-ring'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='btn btn-primary mt-5 w-full rounded-full'
          >
            {t('button.next')}
          </Button>
        </form>
      </Form>
    </div>
  )
}
