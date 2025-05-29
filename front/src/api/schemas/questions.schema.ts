import { z } from "zod";
export const CreateQuestionSchema = z.object({
    question:
    z.string()
    .nonempty({ message: "La pregunta es obligatoría" }),
    response: z.boolean(),
    level: z.string(),
    categories: z.array(z.object({
        id: z.number(),
    }))
});

export type CreateQuestion = z.infer<typeof CreateQuestionSchema>;