import { z } from "zod";

export const validationSchema = z.object({
  name: z.string().min(0).max(40),
  email: z.string().email(),
  password: z.string().regex(/[A-Za-z0-9!@#$%^&*()_+{}[\]:;<>,.?~\\/-]{10,18}/),
  confirm: z.string().min(10).max(18),
  termsAndConditions: z.boolean().refine((value) => value === true, {
    message: "You must accept the terms and conditions",
  }),
});
