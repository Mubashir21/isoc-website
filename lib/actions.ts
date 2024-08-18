"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { signIn } from "@/auth";
// import { AuthError } from "next-auth";

const FormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: "Title is required." }),
  datetime: z.string().min(1, { message: "Date and time are required." }),
  location: z.string().min(1, { message: "Location is required." }),
  speaker: z.string().min(1, { message: "Speaker is required." }),
  pic_url: z.string().url({ message: "Please enter a valid URL." }),
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
  errors?: {
    title?: string[];
    datetime?: string[];
    location?: string[];
    speaker?: string[];
    pic_url?: string[];
    description?: string[];
    created_by?: string[];
  };
  message?: string | null;
};

export async function createEvent(prevState: State, formData: FormData) {
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

  // If form validation fails, return errors early. Otherwise, continue.
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

  // Insert data into the database
  try {
    await sql`
     INSERT INTO events (title, datetime, location, speaker, pic_url, description, created_by, created_at, updated_at)
    VALUES (${title}, ${datetime}, ${location}, ${speaker}, ${pic_url}, ${description}, ${created_by}, ${formattedDate}, ${formattedDate})
  `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create Event.",
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath("/admin/events");
  redirect("/admin/events");
}

// Use Zod to update the expected types
const UpdateEvent = FormSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export async function updateEvent(
  id: string,
  prevState: State,
  formData: FormData,
) {
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

  try {
    await sql`
      UPDATE events
      SET title = ${title}, datetime = ${datetime}, location = ${location}, speaker = ${speaker}, pic_url = ${pic_url}, description = ${description}, created_by = ${created_by}, updated_at = ${formattedDate}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Event." };
  }

  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function deleteEvent(id: string) {
  try {
    await sql`DELETE FROM events WHERE id = ${id}`;
    revalidatePath("/admin/events");
    return { message: "Deleted Event." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Event." };
  }
}

// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData,
// ) {
//   try {
//     await signIn('credentials', formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.';
//         default:
//           return 'Something went wrong.';
//       }
//     }
//     throw error;
//   }
// }
