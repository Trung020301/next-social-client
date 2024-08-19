'use client'

import { STEP_ONE } from '@/lib/const'
import React, { useState } from 'react'
import SetName from './setName'

export default function Page() {
  const [step, setStep] = useState(STEP_ONE)

  const renderStep = (step: number): React.ReactElement => {
    switch (step) {
      case STEP_ONE:
        return <div>Hello</div>
      default:
        return <div>Unknow Step</div>
    }
  }

  return <div className='py-20 px-8'>{renderStep(step)}</div>
}
