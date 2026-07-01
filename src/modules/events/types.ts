import { z } from 'zod';

export const EventSchema = z.object({
  id: z.string().optional(),          // id?: string
  name: z.string(),
  description: z.string(),
  date: z.date().optional(),          // date?: Date
  location: z.string(),
  slug: z.string().optional(),        // slug?: string
});

// Inferência do tipo IEvent
export type IEvent = z.infer<typeof EventSchema>;
