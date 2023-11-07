import { z } from "zod";

export const schema = z.object({
    title: z
        .string()
        .min(1, 'Title is requried and it should have min one character')
        .max(255),
    description: z
        .string()
        .min(5)
        .max(65535)
});

export const patchIssueSchema = z.object({
    title: z
        .string()
        .min(1, 'Title is requried and it should have min one character')
        .max(255)
        .optional(),
    description: z
        .string()
        .min(5)
        .max(65535)
        .optional(),
    assignedToUserId: z
        .string()
        .min(1, 'AssignedUserId is required')
        .max(255)
        .optional()
        .nullable()
        
});