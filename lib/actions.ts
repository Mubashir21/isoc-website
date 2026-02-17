"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DateTime } from "luxon";
import { eventSchema, type EventFormValues } from "@/lib/schemas";
import { toMalaysiaTime } from "@/lib/utils";
import { auth, clerkClient } from "@clerk/nextjs/server";

async function getClerkUserName(): Promise<string> {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  return user.firstName || user.username || "Unknown";
}

const AnnouncementFormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: "Title is required." }),
  content: z.string().min(1, { message: "Content is required." }),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export type EventState = {
  errors: {
    title?: string[];
    description?: string[];
    location?: string[];
    speaker?: string[];
    pic_url?: string[];
    pic_file_id?: string[];
    type?: string[];
    gender?: string[];
    datetime?: string[];
    end_datetime?: string[];
    duration_minutes?: string[];
    is_recurring?: string[];
    recurrence_type?: string[];
    interval_value?: string[];
    days_of_week?: string[];
    day_of_month?: string[];
    month_of_year?: string[];
    recurrence_end?: string[];
    parent_event_id?: string[];
    is_exception?: string[];
    status?: string[];
  };
  message: string | null;
};

export type AnnouncementState = {
  errors: {
    title?: string[];
    content?: string[];
  };
  message: string | null;
};

const CreateAnnouncement = AnnouncementFormSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export async function createAnnouncement(
  prevState: AnnouncementState,
  formData: FormData,
): Promise<AnnouncementState> {
  // Validate form using Zod
  const validatedFields = CreateAnnouncement.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  // If form validation fails, return errors early.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Announcement.",
    };
  }
  // Prepare data for insertion into the database
  const { title, content } = validatedFields.data;
  const created_by = await getClerkUserName();

  try {
    await sql`
     INSERT INTO announcements (title, content, created_by)
    VALUES (${title}, ${content}, ${created_by})
    `;

    // Revalidate the cache for the events page and redirect the user.
    revalidatePath("/admin/announcements");

    // This line will never be reached due to the redirect, but it's necessary for TypeScript
    return { errors: {}, message: "Announcement created successfully" };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      errors: {},
      message: "Database Error: Failed to Create Announcement.",
    };
  }
}

// Use Zod to update the expected types
const UpdateAnnouncement = AnnouncementFormSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export async function updateAnnouncement(
  id: string,
  prevState: AnnouncementState,
  formData: FormData,
): Promise<AnnouncementState> {
  const validatedFields = UpdateAnnouncement.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Announcement.",
    };
  }

  const { title, content } = validatedFields.data;
  const created_by = await getClerkUserName();
  // Use Malaysia timezone for consistency across all operations
  const updatedDateTime = DateTime.now().setZone("Asia/Kuala_Lumpur");

  // Format the Malaysia datetime
  const formattedUpdatedDateTime = updatedDateTime
    .toFormat("yyyy-MM-dd HH:mm:ssZZ");

  try {
    await sql`
      UPDATE announcements
      SET title = ${title}, content = ${content}, created_by = ${created_by}, updated_at = ${formattedUpdatedDateTime}
      WHERE id = ${id}
    `;

    revalidatePath("/admin/announcements");

    // This line will never be reached due to the redirect, but it's necessary for TypeScript
    return { errors: {}, message: "Announcement updated successfully" };
  } catch (error) {
    return {
      errors: {},
      message: "Database Error: Failed to Update Announcement.",
    };
  }
}

export async function createEvent(
  prevState: EventState | null,
  formData: FormData,
): Promise<EventState> {
  // Parse FormData into proper format for validation
  const formObject = {
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || "",
    location: formData.get("location") as string,
    speaker: (formData.get("speaker") as string) || "",
    type: formData.get("type") as string,
    gender: formData.get("gender") as string,
    datetime: formData.get("datetime") as string,
    end_datetime: (formData.get("end_datetime") as string) || "",
    duration_minutes:
      parseInt(formData.get("duration_minutes") as string) || 120,
    is_recurring: formData.get("is_recurring") === "true",
    recurrence_type: (formData.get("recurrence_type") as string) || undefined,
    interval_value: parseInt(formData.get("interval_value") as string) || 1,
    days_of_week: formData.get("days_of_week")
      ? JSON.parse(formData.get("days_of_week") as string)
      : [],
    day_of_month: parseInt(formData.get("day_of_month") as string) || 1,
    month_of_year: parseInt(formData.get("month_of_year") as string) || 1,
    recurrence_end: (formData.get("recurrence_end") as string) || "",
    pic_url: formData.get("pic_url"), // Handle file upload
  };

  // Validate using the same schema as the form
  const validatedFields = eventSchema.safeParse(formObject);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your inputs.",
    };
  }

  const data = validatedFields.data;
  const created_by = await getClerkUserName();

  // Handle image upload (your existing logic is fine)
  let imageUrl: string | null = null;
  let fileId: string | null = null;

  if (typeof data.pic_url === "object" && data.pic_url instanceof File) {
    // Your existing file upload logic here...
    const imageFormData = new FormData();
    imageFormData.append("file", data.pic_url);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
      const uploadResponse = await fetch(`${baseUrl}/api/upload`, {
        method: "POST",
        body: imageFormData,
      });

      const uploadResult = await uploadResponse.json();
      if (uploadResponse.ok) {
        imageUrl = uploadResult.url;
        fileId = uploadResult.fileId;
      } else {
        return {
          errors: {},
          message: "Failed to upload image.",
        };
      }
    } catch (error) {
      return {
        errors: {},
        message: "Failed to upload image.",
      };
    }
  }

  // Treat datetime-local input as Malaysia time and store as Malaysia time
  // This ensures all events are stored in Malaysia timezone regardless of admin's location
  const malaysiaDatetime = new Date(data.datetime + ':00'); // Ensure proper format
  const datetime = toMalaysiaTime(malaysiaDatetime).toISOString();
  
  const endDatetime = data.end_datetime
    ? toMalaysiaTime(new Date(data.end_datetime + ':00')).toISOString()
    : null;
    
  const recurrenceEnd = data.recurrence_end
    ? toMalaysiaTime(new Date(data.recurrence_end + 'T00:00:00')).toISOString().split("T")[0]
    : null;

  try {
    await sql`
    INSERT INTO events (
      title, description, location, speaker, pic_url, pic_file_id, type, gender,
      datetime, end_datetime, duration_minutes, is_recurring, recurrence_type, 
      interval_value, days_of_week, day_of_month, month_of_year, recurrence_end,
      parent_event_id, is_exception, status, created_by
    )
    VALUES (
      ${data.title}, 
      ${data.description}, 
      ${data.location}, 
      ${data.speaker || null}, 
      ${imageUrl}, 
      ${fileId}, 
      ${data.type}, 
      ${data.gender},
      ${datetime}, 
      ${endDatetime}, 
      ${data.duration_minutes}, 
      ${data.is_recurring}, 
      ${data.recurrence_type || null},
      ${data.interval_value}, 
      ${data.days_of_week.length > 0 ? `{${data.days_of_week.join(",")}}` : null},
      ${data.is_recurring && (data.recurrence_type === "monthly" || data.recurrence_type === "yearly") ? data.day_of_month : null}, 
      ${data.is_recurring && data.recurrence_type === "yearly" ? data.month_of_year : null}, 
      ${recurrenceEnd},
      ${null},
      ${false},
      ${"active"},
      ${created_by}
    )
  `;

    revalidatePath("/admin/events");
    return { errors: {}, message: "Event created successfully" };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      errors: {},
      message: "Database Error: Failed to create event.",
    };
  }
}

export async function updateEvent(
  id: string,
  prev_pic_url: string,
  prev_pic_file_id: string,
  prevState: EventState,
  formData: FormData,
): Promise<EventState> {
  // Parse FormData into proper format for validation (matching createEvent)
  const formObject = {
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || "",
    location: formData.get("location") as string,
    speaker: (formData.get("speaker") as string) || "",
    type: formData.get("type") as string,
    gender: formData.get("gender") as string,
    datetime: formData.get("datetime") as string,
    end_datetime: (formData.get("end_datetime") as string) || "",
    duration_minutes:
      parseInt(formData.get("duration_minutes") as string) || 120,
    is_recurring: formData.get("is_recurring") === "on",
    recurrence_type: (formData.get("recurrence_type") as string) || undefined,
    interval_value: parseInt(formData.get("interval_value") as string) || 1,
    days_of_week: formData.get("days_of_week")
      ? JSON.parse(formData.get("days_of_week") as string)
      : [],
    day_of_month: parseInt(formData.get("day_of_month") as string) || 1,
    month_of_year: parseInt(formData.get("month_of_year") as string) || 1,
    recurrence_end: (formData.get("recurrence_end") as string) || "",
    status: (formData.get("status") as string) || "active",
    pic_url: formData.get("pic_url"), // Handle file upload
  };

  // Validate using the same schema as the create function
  const validatedFields = eventSchema.safeParse(formObject);

  if (!validatedFields.success) {
    console.error("Validation errors:", validatedFields.error.flatten().fieldErrors);
    console.error("Form data received:", formObject);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your inputs.",
    };
  }

  const data = validatedFields.data;
  const created_by = await getClerkUserName();

  // Handle pic_url: if a new file is provided, upload it; otherwise, use the previous URL
  let pic_url = prev_pic_url;
  let pic_file_id = prev_pic_file_id;
  
  if (typeof data.pic_url === "object" && data.pic_url instanceof File && data.pic_url.size > 0) {
    // Step 1: Delete the previous image using fileId
    if (prev_pic_file_id) {
      try {
        const deleteResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/delete`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ fileId: prev_pic_file_id }),
          },
        );

        const deleteResult = await deleteResponse.json();
        if (!deleteResponse.ok) {
          console.error("File Deletion Error:", deleteResult.error);
          return {
            errors: {},
            message: "File Deletion Error: Failed to delete old image.",
          };
        }
      } catch (error) {
        console.error("Network Error:", error);
        return {
          errors: {},
          message: "File Deletion Error: Failed to delete old image.",
        };
      }
    }

    // Step 2: Upload the new image
    const imageFormData = new FormData();
    imageFormData.append("file", data.pic_url);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
      const uploadResponse = await fetch(`${baseUrl}/api/upload`, {
        method: "POST",
        body: imageFormData,
      });

      const uploadResult = await uploadResponse.json();
      if (uploadResponse.ok) {
        pic_url = uploadResult.url;
        pic_file_id = uploadResult.fileId;
      } else {
        console.error("File Upload Error:", uploadResult.error);
        return {
          errors: {},
          message: "File Upload Error: Failed to upload image.",
        };
      }
    } catch (error) {
      console.error("Network Error:", error);
      return {
        errors: {},
        message: "File Upload Error: Failed to upload image.",
      };
    }
  }

  // Treat datetime-local input as Malaysia time and store as Malaysia time (matching createEvent)
  // This ensures all events are stored in Malaysia timezone regardless of admin's location
  const malaysiaDatetime = new Date(data.datetime + ':00'); // Ensure proper format
  const datetime = toMalaysiaTime(malaysiaDatetime).toISOString();
  
  const endDatetime = data.end_datetime
    ? toMalaysiaTime(new Date(data.end_datetime + ':00')).toISOString()
    : null;
    
  const recurrenceEnd = data.recurrence_end
    ? toMalaysiaTime(new Date(data.recurrence_end + 'T00:00:00')).toISOString().split("T")[0]
    : null;

  try {
    await sql`
      UPDATE events
      SET 
        title = ${data.title},
        description = ${data.description},
        location = ${data.location},
        speaker = ${data.speaker || null},
        pic_url = ${pic_url},
        pic_file_id = ${pic_file_id},
        type = ${data.type},
        gender = ${data.gender},
        datetime = ${datetime},
        end_datetime = ${endDatetime},
        duration_minutes = ${data.duration_minutes},
        is_recurring = ${data.is_recurring},
        recurrence_type = ${data.recurrence_type || null},
        interval_value = ${data.interval_value},
        days_of_week = ${data.days_of_week.length > 0 ? `{${data.days_of_week.join(",")}}` : null},
        day_of_month = ${data.is_recurring && (data.recurrence_type === "monthly" || data.recurrence_type === "yearly") ? data.day_of_month : null},
        month_of_year = ${data.is_recurring && data.recurrence_type === "yearly" ? data.month_of_year : null},
        recurrence_end = ${recurrenceEnd},
        status = ${data.status},
        created_by = ${created_by},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
    `;

    revalidatePath("/admin/events");
    return { errors: {}, message: "Event updated successfully" };
  } catch (error) {
    console.error("Database Error:", error);
    return { errors: {}, message: "Database Error: Failed to Update Event." };
  }
}

export async function deleteEvent(id: string, pic_file_id: string) {
  // Delete image from ImageKit
  if (pic_file_id) {
    try {
      const deleteResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/delete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileId: pic_file_id }),
        },
      );

      const deleteResult = await deleteResponse.json();
      if (!deleteResponse.ok) {
        console.error("File Deletion Error:", deleteResult.error);
        return {
          message: "File Deletion Error: Failed to delete image.",
        };
      }
    } catch (error) {
      console.error("Network Error:", error);
      return { message: "File Deletion Error: Failed to delete image." };
    }
  }

  // Delete event from DB
  try {
    await sql`DELETE FROM events WHERE id = ${id}`;
    revalidatePath("/admin/events");
    return { message: "Deleted Event." };
  } catch (error) {
    console.error("Database Deletion Error:", error);
    return { message: "Database Error: Failed to Delete Event." };
  }
}

export async function deleteAnnouncement(id: string) {
  try {
    await sql`DELETE FROM announcements WHERE id = ${id}`;
    revalidatePath("/admin/announcements");
    return { message: "Deleted Announcement." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Announcement." };
  }
}

// Recurring Event Types and Functions
export type RecurringEventState = EventState;

export async function createRecurringEvent(
  prevState: RecurringEventState,
  formData: FormData,
): Promise<RecurringEventState> {
  // Convert the recurring event form data to the standard event format
  const startDate = formData.get("start_date") as string;
  const startTime = formData.get("start_time") as string;
  const endDate = formData.get("end_date") as string;
  
  // Combine start date and time into datetime format
  const datetime = startDate && startTime ? `${startDate}T${startTime}` : "";
  
  // Convert end date to recurrence_end format
  const recurrenceEnd = endDate || "";
  
  const eventFormData = new FormData();
  
  // Copy all form fields to new FormData
  for (const [key, value] of formData.entries()) {
    if (key === "start_date" || key === "start_time" || key === "end_date") {
      // Skip these, we'll handle them specially
      continue;
    }
    eventFormData.append(key, value);
  }
  
  // Add the processed datetime fields
  eventFormData.append("datetime", datetime);
  eventFormData.append("recurrence_end", recurrenceEnd);
  eventFormData.append("is_recurring", "true");
  eventFormData.append("end_datetime", ""); // Not used for recurring events
  
  // Use the standard createEvent function with Malaysia timezone handling
  return await createEvent(prevState, eventFormData);
}

// Note: Recurring events are now handled through the unified events table
// with is_recurring = true. The createRecurringEvent function above
// converts recurring event form data to the standard event format.
