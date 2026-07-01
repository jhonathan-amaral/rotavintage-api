import { z } from 'zod';

// 1. Schema do Carro
export const CarSchema = z.object({
  id: z.string().optional(),                  // id?: string
  make: z.string(),
  model: z.string(),
  year: z.number().int(),                     // Garante que o ano é um número inteiro
  place: z.string(),
  owner: z.string(),
  club: z.string(),
  eventId: z.string().optional(),            // eventId?: string
  createdAt: z.date().optional(),             // createdAt?: Date
  updatedAt: z.date().optional(),             // updatedAt?: Date
});

// Inferência do tipo ICar
export type ICar = z.infer<typeof CarSchema>;


// 2. Schema da Associação entre Carro e Evento
export const CarEventAssociationSchema = z.object({
  id: z.string(),
  carId: z.string(),
  eventId: z.string(),
  createdAt: z.date(),
});

// Inferência do tipo ICarEventAssociation
export type ICarEventAssociation = z.infer<typeof CarEventAssociationSchema>;
