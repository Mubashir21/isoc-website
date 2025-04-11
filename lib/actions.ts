"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DateTime } from "luxon";

const EventFormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: "Title is required." }),
  datetime: z.string().min(1, { message: "Date and time are required." }),
  location: z.string().min(1, { message: "Location is required." }),
  speaker: z.string().min(1, { message: "Speaker is required." }),
  pic_url: z.any().refine((file) => file instanceof File && file.size > 0, {
    message: "Please upload a valid image file.",
  }),
  description: z.string(),
  created_by: z.string().min(1, { message: "Admin is required." }),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

const AnnouncementFormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: "Title is required." }),
  content: z.string().min(1, { message: "Content is required." }),
  created_by: z.string().min(1, { message: "Admin is required." }),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

const CreateEvent = EventFormSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type EventState = {
  errors: {
    title?: string[];
    datetime?: string[];
    location?: string[];
    speaker?: string[];
    pic_url?: string[];
    description?: string[];
    created_by?: string[];
  };
  message: string | null;
};

export type AnnouncementState = {
  errors: {
    title?: string[];
    content?: string[];
    created_by?: string[];
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
    created_by: formData.get("created_by"),
  });

  // If form validation fails, return errors early.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Announcement.",
    };
  }
  // Prepare data for insertion into the database
  const { title, content, created_by } = validatedFields.data;

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
    created_by: formData.get("created_by"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Announcement.",
    };
  }

  const { title, content, created_by } = validatedFields.data;
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const updatedDateTime = DateTime.now().setZone(userTimezone).toUTC();

  // Format the UTC datetime
  const formattedUpdatedDateTime = updatedDateTime
    .toFormat("yyyy-MM-dd HH:mm:ssZZ")
    .replace("+00:00", "+00");

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
  prevState: EventState,
  formData: FormData,
): Promise<EventState> {
  // Validate form using Zod
  const validatedFields = CreateEvent.safeParse({
    title: formData.get("title"),
    datetime: formData.get("datetime"),
    location: formData.get("location"),
    speaker: formData.get("speaker"),
    pic_url: formData.get("pic_url"),
    description: formData.get("description"),
    created_by: formData.get("created_by"),
  });

  // If form validation fails, return errors early.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Event.",
    };
  }

  // Prepare data for insertion into the database
  const {
    title,
    datetime,
    location,
    speaker,
    pic_url,
    description,
    created_by,
  } = validatedFields.data;

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Parse the existing datetime string into Luxon's DateTime object
  const dateTime = DateTime.fromISO(datetime, { zone: userTimezone }).toUTC();

  // Format the UTC datetime for insertion into the database
  const formattedUtcDateTime = dateTime
    .toFormat("yyyy-MM-dd HH:mm:ssZZ")
    .replace("+00:00", "+00");

  let imageUrl: string | undefined;
  let fileId: string | undefined;

  if (typeof pic_url === "object" && pic_url instanceof File) {
    // Handle file upload
    const imageFormData = new FormData();
    imageFormData.append("file", pic_url);
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
  } else {
    imageUrl = pic_url as string;
  }

  try {
    await sql`
      INSERT INTO events (
        title, datetime, location, speaker, pic_url, pic_file_id, description, created_by
      )
      VALUES (
        ${title}, ${formattedUtcDateTime}, ${location}, ${speaker}, ${imageUrl}, ${fileId}, ${description}, ${created_by}
      )
    `;

    revalidatePath("/admin/events");

    return { errors: {}, message: "Event created successfully" };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      errors: {},
      message: "Database Error: Failed to Create Event.",
    };
  }
}

// Use Zod to update the expected types
const UpdateEvent = EventFormSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
}).extend({
  pic_url: z.any().optional(),
});

export async function updateEvent(
  id: string,
  prev_pic_url: string,
  prev_pic_file_id: string,
  prevState: EventState,
  formData: FormData,
): Promise<EventState> {
  const validatedFields = UpdateEvent.safeParse({
    title: formData.get("title"),
    datetime: formData.get("datetime"),
    location: formData.get("location"),
    speaker: formData.get("speaker"),
    pic_url: formData.get("pic_url"),
    description: formData.get("description"),
    created_by: formData.get("created_by"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Event.",
    };
  }

  const { title, datetime, location, speaker, description, created_by } =
    validatedFields.data;
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Parse the existing datetime string into Luxon's DateTime object
  const dateTime = DateTime.fromISO(datetime, { zone: userTimezone }).toUTC();

  // Format the UTC datetime for insertion into the database
  const formattedUtcDateTime = dateTime
    .toFormat("yyyy-MM-dd HH:mm:ssZZ")
    .replace("+00:00", "+00");

  const updatedDateTime = DateTime.now().setZone(userTimezone).toUTC();

  // Format the UTC datetime
  const formattedUpdatedDateTime = dateTime
    .toFormat("yyyy-MM-dd HH:mm:ssZZ")
    .replace("+00:00", "+00");

  // Handle pic_url: if a new file is provided, upload it; otherwise, use the previous URL
  let pic_url = prev_pic_url;
  let pic_file_id = prev_pic_file_id;
  const newPicFile = formData.get("pic_url") as File;

  if (newPicFile && newPicFile.size > 0) {
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
    imageFormData.append("file", newPicFile);
    try {
      const uploadResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
        {
          method: "POST",
          body: imageFormData,
        },
      );

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

  try {
    await sql`
      UPDATE events
      SET 
        title = ${title},
        datetime = ${formattedUtcDateTime},
        location = ${location},
        speaker = ${speaker},
        pic_url = ${pic_url},
        pic_file_id = ${pic_file_id},
        description = ${description},
        created_by = ${created_by},
        updated_at = ${formattedUpdatedDateTime}
      WHERE id = ${id}
    `;

    revalidatePath("/admin/events");
    return { errors: {}, message: "Event updated successfully" };
  } catch (error) {
    console.error("Update Error:", error);
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
