import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(6, {
    message: 'Username must be at least 6 characters.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
})

export const registerSchema = z.object({
  username: z.string().min(6, {
    message: 'Username must be at least 6 characters.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
})

export const createPostSchema = z.object({
  content: z.string().optional(),
  resourceType: z.string(),
  visibility: z.string(),
  files: z.array(z.string()),
})
