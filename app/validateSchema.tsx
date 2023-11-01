import { z } from "zod";

export const schema = z.object({
    title: z.string().min(1, 'Title is requried and it should have min one character').max(255),
    description: z.string().min(5)
});
