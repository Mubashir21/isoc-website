"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
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

const CreateEvent = FormSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type State = {
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

export async function createEvent(
  prevState: State,
  formData: FormData,
): Promise<State> {
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

  const malaysiaTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kuala_Lumpur",
  });
  const formattedDate = new Date(malaysiaTime).toISOString();

  let imageUrl: string | undefined;
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
    imageUrl = pic_url as string; // In case it's already a URL
  }

  try {
    await sql`
     INSERT INTO events (title, datetime, location, speaker, pic_url, description, created_by, created_at, updated_at)
    VALUES (${title}, ${datetime}, ${location}, ${speaker}, ${imageUrl}, ${description}, ${created_by}, ${formattedDate}, ${formattedDate})
    `;

    // Revalidate the cache for the events page and redirect the user.
    revalidatePath("/admin/events");

    // This line will never be reached due to the redirect, but it's necessary for TypeScript
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
const UpdateEvent = FormSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
}).extend({
  pic_url: z.any().optional(),
});

export async function updateEvent(
  id: string,
  prev_pic_url: string,
  prevState: State,
  formData: FormData,
): Promise<State> {
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
  const malaysiaTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kuala_Lumpur",
  });
  const formattedDate = new Date(malaysiaTime).toISOString();

  // Handle pic_url: if a new file is provided, upload it; otherwise, use the previous URL
  let pic_url = prev_pic_url;
  const newPicFile = formData.get("pic_url") as File;

  if (newPicFile && newPicFile.size > 0) {
    if (prev_pic_url) {
      try {
        const deleteResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/delete`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: prev_pic_url }),
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
      SET title = ${title}, datetime = ${datetime}, location = ${location}, speaker = ${speaker}, pic_url = ${pic_url}, description = ${description}, created_by = ${created_by}, updated_at = ${formattedDate}
      WHERE id = ${id}
    `;

    revalidatePath("/admin/events");

    // This line will never be reached due to the redirect, but it's necessary for TypeScript
    return { errors: {}, message: "Event updated successfully" };
  } catch (error) {
    return { errors: {}, message: "Database Error: Failed to Update Event." };
  }
}

export async function deleteEvent(id: string, pic_url: string) {
  try {
    const deleteResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/delete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: pic_url }),
      },
    );

    const deleteResult = await deleteResponse.json();
    if (!deleteResponse.ok) {
      console.error("File Deletion Error:", deleteResult.error);
      return {
        message: "File Deletion Error: Failed to delete old image.",
      };
    }
  } catch (error) {
    console.error("Network Error:", error);
    return { message: "File Deletion Error: Failed to delete old image." };
  }

  try {
    await sql`DELETE FROM events WHERE id = ${id}`;
    revalidatePath("/admin/events");
    return { message: "Deleted Event." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Event." };
  }
}
