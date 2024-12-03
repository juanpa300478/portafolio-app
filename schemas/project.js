import { z } from 'zod'

const projectSchema = z.object({
  title: z.string().min(10).max(100),
  description: z.string().min(50),
  git_directory: z.string().url(),
  blog_directory: z.string().url().default('https://null.com'),
  directory: z.string().url()
})

export function validateProject (input) {
  return projectSchema.safeParse(input)
}

export function validatePartialProject (input) {
  return projectSchema.partial().safeParse(input)
}
