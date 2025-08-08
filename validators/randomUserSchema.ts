import { z } from 'zod';

export const randomUserSchema = z.object({
  results: z.array(z.object({
    name: z.object({ first: z.string(), last: z.string() }),
    email: z.string().email(),
    picture: z.object({ thumbnail: z.string().url() }),
  })).min(1),
});

export type RandomUserSchema = z.infer<typeof randomUserSchema>;
