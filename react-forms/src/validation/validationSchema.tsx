import z from 'zod';

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Enter name')
      .refine(
        (value) => value[0] === value[0]?.toUpperCase(),
        'First letter must be uppercase'
      ),
    age: z
      .number({ error: 'Age must be a number' })
      .min(0, 'No negative values'),
    email: z.string().refine((value) => {
      const valueArr = value.split('@');
      if (valueArr.length !== 2) return false;
      if (!valueArr[1].includes('.')) return false;
      if (valueArr[0].length === 0) return false;
      return true;
    }, 'Uncorrect value'),
    gender: z.enum(['male', 'female', 'other'], 'Uncorrect value'),
    agreement: z.literal(true, { message: 'Agreement is necessary' }),
    password: z.string().min(6, 'Password 6 characters minimum'),
    confirmPassword: z.string(),
    country: z.string().min(1, 'Choose a country'),
    image: z.any().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords not match',
    path: ['confirmPassword'],
  });

export type validationData = z.infer<typeof formSchema>;
