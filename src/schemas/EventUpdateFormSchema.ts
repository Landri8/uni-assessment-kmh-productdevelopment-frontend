import {z} from 'zod'

export const EventUpdateFormSchema = z.object({
    id: z.string(),
    title: z.string().min(3, "Name must be at least 3 characters").max(200, "Name must be at most 50 characters"),
    type: z.string(),
    location: z.string().max(50, "Location must be at most 50 characters"),
    presenter: z.string().max(50, "Presenter must be at most 50 characters"),
    timeRange: z.string().max(50, "Time range must be at most 50 characters"),
    date: z.string().max(50, "Date must be at most 50 characters"),
    eventDesc: z.string().max(500, "Event description must be at most 50 characters"),
})

export type EventUpdateFormData = z.infer<typeof EventUpdateFormSchema>;