import { z } from 'zod';

// Schema with separate date and time inputs
export const eventFormSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  start_date: z.string().min(1, "La fecha de inicio es requerida"),
  start_time: z.string().min(1, "La hora de inicio es requerida"),
  end_date: z.string().min(1, "La fecha de fin es requerida"),
  end_time: z.string().min(1, "La hora de fin es requerida"),
}).refine(data => {
  const startDateTime = new Date(`${data.start_date}T${data.start_time}`);
  const endDateTime = new Date(`${data.end_date}T${data.end_time}`);
  return endDateTime > startDateTime;
}, {
  message: "La fecha de finalización debe ser posterior a la fecha de inicio",
  path: ["end_date"] // Shows the error on the end_date field
});

// Original event schema (for API/database)
// export const eventSchema = z.object({
//   name: z.string().min(1, "El nombre es requerido"),
//   start_time: z.string().min(1, "La hora de inicio es requerida"),
//   end_time: z.string().min(1, "La hora de fin es requerida"),
// });

// Type inference from the schema
// export type Event = z.infer<typeof eventSchema>;
export type EventFormData = z.infer<typeof eventFormSchema>;

// export type PostEvent = z.infer<typeof eventSchema>;

// // For creating a new post event
// export const createPostEventSchema = eventSchema;
// export type CreateEventInput = z.infer<typeof createPostEventSchema>;

// // For updating an existing post event
// export const updatePostEventSchema = eventSchema.partial();
// export type UpdatePostEventInput = z.infer<typeof updatePostEventSchema>;

// Helper functions for working with ISO dates
export const formatToDateInput = (isoString?: string): string => {
  if (!isoString) return '';
  return isoString.split('T')[0]; // Returns YYYY-MM-DD
};

export const formatToTimeInput = (isoString?: string): string => {
  if (!isoString) return '';
  return isoString.split('T')[1].substring(0, 5); // Returns HH:MM
};