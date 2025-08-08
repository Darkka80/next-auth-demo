import { z } from 'zod';

export const loginSchema = z.object({
  phone: z
    .string()
    .min(11, { message: 'شماره باید 11 رقم باشد' })
    .max(11, { message: 'شماره باید 11 رقم باشد' })
    .regex(/^09\d{9}$/, { message: 'شماره باید با 09 شروع شود' }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
