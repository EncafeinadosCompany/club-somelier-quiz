import { z } from 'zod';

export const eventSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  start_time: z.string().min(1, "La hora de inicio es requerida"),
  end_time: z.string().min(1, "La hora de fin es requerida"),
});
// Type inference from the schema
export type Event = z.infer<typeof eventSchema>;

export type PostEvent = z.infer<typeof eventSchema>;

// For creating a new post event
export const createPostEventSchema = eventSchema;
export type CreateEventInput = z.infer<typeof createPostEventSchema>;

// For updating an existing post event
export const updatePostEventSchema = eventSchema.partial();
export type UpdatePostEventInput = z.infer<typeof updatePostEventSchema>;