import { z } from "zod";

export const eventSchema = z
  .object({
    // Basic event fields
    title: z
      .string()
      .min(1, "Title is required")
      .max(200, "Title must be less than 200 characters"),
    description: z.string().optional(),
    location: z
      .string()
      .min(1, "Location is required")
      .max(200, "Location must be less than 200 characters"),
    speaker: z.string().optional(),
    type: z.enum(["lecture", "sports", "masjid", "major"]),
    gender: z.enum(["all", "brothers", "sisters"]),

    // Timing fields
    datetime: z.string().min(1, "Date and time are required"),
    end_datetime: z.string().optional(),
    duration_minutes: z.coerce
      .number()
      .min(1, "Duration must be at least 1 minute")
      .default(120),

    // Recurring event fields
    is_recurring: z.boolean().default(false),
    recurrence_type: z
      .enum(["daily", "weekly", "monthly", "yearly"])
      .optional(),
    interval_value: z.coerce.number().min(1).max(365).default(1),
    days_of_week: z.array(z.number().min(1).max(7)).default([]),
    day_of_month: z.coerce.number().min(1).max(31).default(1),
    month_of_year: z.coerce.number().min(1).max(12).default(1),
    recurrence_end: z.string().optional(),

    // Status field
    status: z.enum(["active", "paused", "cancelled"]).default("active"),

    // Admin field
    created_by: z.string().min(1, "Please select who is creating this event"),

    // File upload (optional)
    pic_url: z.any().optional(),
  })
  .refine(
    (data) => {
      // If recurring, recurrence_type is required
      if (data.is_recurring && !data.recurrence_type) {
        return false;
      }
      return true;
    },
    {
      message: "Recurrence type is required for recurring events",
      path: ["recurrence_type"],
    },
  )
  .refine(
    (data) => {
      // If weekly recurring, at least one day must be selected
      if (
        data.is_recurring &&
        data.recurrence_type === "weekly" &&
        data.days_of_week.length === 0
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Please select at least one day of the week",
      path: ["days_of_week"],
    },
  );

export type EventFormValues = z.infer<typeof eventSchema>;