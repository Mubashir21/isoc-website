import { sql } from "@vercel/postgres";
import {
  EventsTable,
  EventsForm,
  AdminField,
  EventCard,
  AnnouncementInfo,
  AnnouncementsTable,
  AnnouncementsForm,
} from "./definitions";
import { unstable_noStore as noStore } from "next/cache";

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredEvents(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const { rows } = await sql<EventsTable>`
      SELECT
        events.id,
        events.title,
        events.location,
        events.datetime,
        events.pic_url,
        events.speaker,
        events.updated_at,
        users.name AS created_by
      FROM events
      JOIN users ON events.created_by = users.id
      WHERE
        users.name ILIKE ${`%${query}%`} OR
        events.title ILIKE ${`%${query}%`} OR
        events.location ILIKE ${`%${query}%`} OR
        events.speaker ILIKE ${`%${query}%`} OR
        events.datetime::text ILIKE ${`%${query}%`}
      ORDER BY events.datetime DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch events.");
  }
}

export async function fetchFilteredAnnouncements(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const { rows } = await sql<AnnouncementsTable>`
      SELECT
        announcements.id,
        announcements.title,
        announcements.content,
        announcements.created_at,
        announcements.updated_at,
        users.name AS created_by
      FROM announcements
      JOIN users ON announcements.created_by = users.id
      WHERE
        users.name ILIKE ${`%${query}%`} OR
        announcements.title ILIKE ${`%${query}%`} OR
        announcements.content ILIKE ${`%${query}%`} OR
        announcements.created_at::text ILIKE ${`%${query}%`} OR
        announcements.updated_at::text ILIKE ${`%${query}%`}
      ORDER BY announcements.updated_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch announcements.");
  }
}

export async function fetchEventsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM events
    JOIN users ON events.created_by = users.id
    WHERE
        users.name ILIKE ${`%${query}%`} OR
        events.title ILIKE ${`%${query}%`} OR
        events.location ILIKE ${`%${query}%`} OR
        events.speaker ILIKE ${`%${query}%`} OR
        events.datetime::text ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of events.");
  }
}

export async function fetchAnnouncementsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM announcements
    JOIN users ON announcements.created_by = users.id
    WHERE
        users.name ILIKE ${`%${query}%`} OR
        announcements.title ILIKE ${`%${query}%`} OR
        announcements.content ILIKE ${`%${query}%`} OR
        announcements.updated_at::text ILIKE ${`%${query}%`} OR
        announcements.created_at::text ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of announcements.");
  }
}

export async function fetchEventById(id: string) {
  try {
    const data = await sql<EventsForm>`
      SELECT
        events.id,
        events.created_by,
        events.title,
        events.datetime,
        events.location,
        events.speaker,
        events.pic_url,
        events.description
      FROM events
      WHERE events.id = ${id};
    `;

    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch event.");
  }
}

export async function fetchAnnouncementById(id: string) {
  try {
    const data = await sql<AnnouncementsForm>`
      SELECT
        announcements.id,
        announcements.created_by,
        announcements.title,
        announcements.content
      FROM announcements
      WHERE announcements.id = ${id};
    `;

    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch announcement.");
  }
}

export async function fetchTodayAnnouncements() {
  // const today = new Date().toISOString().split("T")[0];
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  noStore();

  try {
    const { rows } = await sql<AnnouncementInfo>`
      SELECT
        announcements.id,
        announcements.title,
        announcements.content,
        announcements.updated_at
      FROM announcements
      WHERE 
        DATE(announcements.updated_at AT TIME ZONE ${userTimezone}) = CURRENT_DATE
        ORDER BY announcements.updated_at DESC;
    `;

    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch today's announcements.");
  }
}

export async function fetchPastAnnouncements() {
  // const today = new Date().toISOString().split("T")[0];
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  noStore();

  try {
    const { rows } = await sql<AnnouncementInfo>`
      SELECT
        announcements.id,
        announcements.title,
        announcements.content,
        announcements.updated_at
      FROM announcements
      WHERE 
        DATE(announcements.updated_at AT TIME ZONE ${userTimezone}) < CURRENT_DATE
        ORDER BY announcements.updated_at DESC  -- Order by upcoming events
    `;

    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch past announcements.");
  }
}

export async function fetchFutureEvents() {
  const currentDateTime = new Date().toISOString(); // Get current datetime in ISO format

  try {
    const { rows } = await sql<EventCard>`
      SELECT
        events.id,
        events.title,
        events.location,
        events.datetime,
        events.pic_url,
        events.speaker,
        events.updated_at,
        events.description,
        users.name AS created_by
      FROM events
      JOIN users ON events.created_by = users.id
      WHERE
        events.datetime >= ${currentDateTime}
        ORDER BY events.datetime ASC  -- Order by upcoming events
    `;

    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch future events.");
  }
}

export async function fetchPastEvents() {
  const currentDateTime = new Date().toISOString(); // Get current datetime in ISO format

  try {
    const { rows } = await sql<EventsTable>`
      SELECT
        events.id,
        events.title,
        events.location,
        events.datetime,
        events.pic_url,
        events.speaker,
        events.updated_at,
        users.name AS created_by
      FROM events
      JOIN users ON events.created_by = users.id
      WHERE
        events.datetime < ${currentDateTime}
        ORDER BY events.datetime ASC
    `;

    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch past events.");
  }
}

export async function fetchAdmins() {
  try {
    const data = await sql<AdminField>`
      SELECT
        id,
        name
      FROM users
      ORDER BY name ASC
    `;

    const admins = data.rows;
    return admins;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all customers.");
  }
}
