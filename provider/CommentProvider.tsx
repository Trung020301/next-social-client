import CommentContext from '@/context/CommentContext'
import React, { useState } from 'react'

interface CommentProviderProps {
  children: React.ReactNode
}

export const CommentProvider: React.FC<CommentProviderProps> = ({
  children,
}) => {
  const [valueCmt, setValueCmt] = useState<string>('')

  return (
    <CommentContext.Provider value={{ valueCmt, setValueCmt }}>
      {children}
    </CommentContext.Provider>
  )
}
