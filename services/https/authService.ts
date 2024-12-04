import apiClient from '@/app/api/httpRequest'
import { LoginUser, SignUpUserFormData } from '@/types'

export const signIn = async (signInDto: LoginUser) => {
  const response = await apiClient.post('/auth/sign-in', signInDto)
  localStorage.setItem('token', response.data.accessToken)
  return response.data
}

export const signUp = async (
  endpoint: string,
  signUpDto: SignUpUserFormData,
) => {
  const response = await apiClient.post(endpoint, signUpDto)
  return response.data
}
