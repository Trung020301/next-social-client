import { createContext } from 'react'

interface CommentContextType {
  valueCmt: string
  setValueCmt: React.Dispatch<React.SetStateAction<string>>
}

const CommentContext = createContext<CommentContextType | undefined>(undefined)

export default CommentContext
