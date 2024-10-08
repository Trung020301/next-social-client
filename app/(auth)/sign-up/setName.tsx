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
}: {
  nextStep: () => void
  values: SignUpUserFormData
}) {
  const t = useTranslations()
  const schema = z.object({
    fullname: z
      .string()
      .min(3, { message: t('error.name_length') })
      .refine((value) => !value.startsWith(' '), {
        message: t('error.start_with_space'),
      }),
  })

  const form = useForm<z.infer<typeof schema>>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      fullname: values.fullname,
    },
  })

  const {
    formState: { isDirty },
  } = form

  const onSubmit = (value: z.infer<typeof schema>) => {
    const updatedValues = {
      ...values,
      fullname: value.fullname,
    }
    console.log(updatedValues)
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
            name='fullname'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={t('placehoolder.name')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='btn btn-primary mt-5 w-full rounded-full'
            // onClick={nextStep}
            disabled={!isDirty}
          >
            {t('button.next')}
          </Button>
        </form>
      </Form>
    </div>
  )
}
