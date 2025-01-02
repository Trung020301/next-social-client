'use client'

import { STEP_ONE, STEP_TWO } from '@/lib/const'
import React, { useCallback, useState } from 'react'
import SetName from './setName'
import { SignUpUserFormData } from '@/types'
import SignUpForm from './sign-up-form'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function Page() {
  const [step, setStep] = useState<string>(STEP_ONE)
  const router = useRouter()
  const searchParams = useSearchParams()?.get('type') || STEP_ONE
  const [formValues, setFormValues] = useState<SignUpUserFormData>({
    fullName: '',
    username: '',
    password: '',
  })

  // Handlers
  const nextStep = useCallback(
    (type: string) => {
      setStep(type)
      router.push(`?type=${type}`)
    },
    [step],
  )

  const renderStep = (step: string): React.JSX.Element => {
    switch (searchParams) {
      case STEP_ONE:
        return (
          <SetName
            nextStep={() => nextStep(STEP_TWO)}
            values={formValues}
            setValues={setFormValues}
          />
        )
      case STEP_TWO:
        return <SignUpForm values={formValues} />
      default:
        return (
          <SetName
            nextStep={() => nextStep(STEP_TWO)}
            values={formValues}
            setValues={setFormValues}
          />
        )
    }
  }

  return (
    <div className='py-20 px-8 sm:flex sm:items-center sm:justify-center'>
      {renderStep(step)}
    </div>
  )
}
