'use client'

import { STEP_ONE } from '@/lib/const'
import React, { useCallback, useState } from 'react'
import SetName from './setName'
import { SignUpUserFormData } from '@/types'
import SignUpForm from './sign-up-form'

export default function Page() {
  const [step, setStep] = useState(STEP_ONE)
  const formValues: SignUpUserFormData = {
    fullname: '',
    email: '',
    password: '',
  }

  // Handlers
  const nextStep = useCallback(() => {
    setStep(step + 1)
  }, [step])

  const renderStep = (step: number): React.JSX.Element => {
    switch (step) {
      case (step = 1):
        return <SetName nextStep={nextStep} values={formValues} />
      case (step = 2):
        return <SignUpForm />
      default:
        return <div>Unknow Step</div>
    }
  }

  return (
    <div className='py-20 px-8 sm:flex sm:items-center sm:justify-center'>
      {renderStep(step)}
    </div>
  )
}
