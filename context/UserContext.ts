import { createContext } from 'react'

// Định nghĩa kiểu dữ liệu cho người dùng
export interface IUserContext {
  token: string
  userId: string
  refreshToken: string
}

// Định nghĩa kiểu dữ liệu cho context
interface UserContextType {
  currentUser: IUserContext | null
  setUser: React.Dispatch<React.SetStateAction<IUserContext | null>>
}

export const UserContext = createContext<UserContextType | undefined>(undefined)
