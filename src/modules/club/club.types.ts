import { z } from "zod";
export const SponsorSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    website: z.string(),
    createdAt: z.date,
    updatedAt: z.date,
})

export const ClubSchema= z.object( {
    id: z.string(),
    name: z.string(),
    description: z.string(),
    slogan: z.string(),
    city: z.string(),
    state: z.string(),
    members: z.array(z.string()),
    sponsors: z.array(SponsorSchema),
    createdAt: z.date,
    updatedAt: z.date
})



export type IClub = z.infer<typeof ClubSchema>
export type ISponsor = z.infer<typeof SponsorSchema>