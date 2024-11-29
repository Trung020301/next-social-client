import * as jwt from 'jsonwebtoken'

const decodeToken = (token: string) => {
  try {
    if (!process.env.NEXT_PUBLIC_JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined')
    }
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET)
    console.log('Decoded >>>', decoded)
  } catch (error) {
    throw new Error('Invalid token')
  }
}

export default decodeToken
