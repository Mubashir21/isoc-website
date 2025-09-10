import { sql } from "@vercel/postgres";
import {
  Event,
  EventForm,
  AdminField,
  EventCard,
  AnnouncementInfo,
  AnnouncementsTable,
  AnnouncementsForm,
  // Legacy imports for backward compatibility
  EventsTable,
} from "./definitions";
import { unstable_noStore as noStore } from "next/cache";

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredEvents(
  query: string, 
  currentPage: number, 
  eventType?: string, 
  category?: string
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const searchPattern = `%${query}%`;

  try {
    if (eventType === "regular") {
      if (category && category !== "all") {
        const { rows } = await sql<Event>`
          SELECT
            events.id,
            events.title,
            events.description,
            events.location,
            events.speaker,
            events.pic_url,
            events.pic_file_id,
            events.type,
            events.gender,
            events.datetime,
            events.end_datetime,
            events.duration_minutes,
            events.is_recurring,
            events.recurrence_type,
            events.interval_value,
            events.days_of_week,
            events.day_of_month,
            events.month_of_year,
            events.recurrence_end,
            events.parent_event_id,
            events.is_exception,
            events.status,
            events.created_at,
            events.updated_at,
            users.name AS created_by
          FROM events
          JOIN users ON events.created_by = users.id
          WHERE (
            users.name ILIKE ${searchPattern} OR
            events.title ILIKE ${searchPattern} OR
            events.location ILIKE ${searchPattern} OR
            events.speaker ILIKE ${searchPattern} OR
            events.description ILIKE ${searchPattern} OR
            events.datetime::text ILIKE ${searchPattern}
          ) AND events.is_recurring = false AND events.type = ${category}
          ORDER BY events.datetime DESC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;
        return rows;
      } else {
        const { rows } = await sql<Event>`
          SELECT
            events.id,
            events.title,
            events.description,
            events.location,
            events.speaker,
            events.pic_url,
            events.pic_file_id,
            events.type,
            events.gender,
            events.datetime,
            events.end_datetime,
            events.duration_minutes,
            events.is_recurring,
            events.recurrence_type,
            events.interval_value,
            events.days_of_week,
            events.day_of_month,
            events.month_of_year,
            events.recurrence_end,
            events.parent_event_id,
            events.is_exception,
            events.status,
            events.created_at,
            events.updated_at,
            users.name AS created_by
          FROM events
          JOIN users ON events.created_by = users.id
          WHERE (
            users.name ILIKE ${searchPattern} OR
            events.title ILIKE ${searchPattern} OR
            events.location ILIKE ${searchPattern} OR
            events.speaker ILIKE ${searchPattern} OR
            events.description ILIKE ${searchPattern} OR
            events.datetime::text ILIKE ${searchPattern}
          ) AND events.is_recurring = false
          ORDER BY events.datetime DESC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;
        return rows;
      }
    } else if (eventType === "recurring") {
      if (category && category !== "all") {
        const { rows } = await sql<Event>`
          SELECT
            events.id,
            events.title,
            events.description,
            events.location,
            events.speaker,
            events.pic_url,
            events.pic_file_id,
            events.type,
            events.gender,
            events.datetime,
            events.end_datetime,
            events.duration_minutes,
            events.is_recurring,
            events.recurrence_type,
            events.interval_value,
            events.days_of_week,
            events.day_of_month,
            events.month_of_year,
            events.recurrence_end,
            events.parent_event_id,
            events.is_exception,
            events.status,
            events.created_at,
            events.updated_at,
            users.name AS created_by
          FROM events
          JOIN users ON events.created_by = users.id
          WHERE (
            users.name ILIKE ${searchPattern} OR
            events.title ILIKE ${searchPattern} OR
            events.location ILIKE ${searchPattern} OR
            events.speaker ILIKE ${searchPattern} OR
            events.description ILIKE ${searchPattern} OR
            events.datetime::text ILIKE ${searchPattern}
          ) AND events.is_recurring = true AND events.type = ${category}
          ORDER BY events.datetime DESC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;
        return rows;
      } else {
        const { rows } = await sql<Event>`
          SELECT
            events.id,
            events.title,
            events.description,
            events.location,
            events.speaker,
            events.pic_url,
            events.pic_file_id,
            events.type,
            events.gender,
            events.datetime,
            events.end_datetime,
            events.duration_minutes,
            events.is_recurring,
            events.recurrence_type,
            events.interval_value,
            events.days_of_week,
            events.day_of_month,
            events.month_of_year,
            events.recurrence_end,
            events.parent_event_id,
            events.is_exception,
            events.status,
            events.created_at,
            events.updated_at,
            users.name AS created_by
          FROM events
          JOIN users ON events.created_by = users.id
          WHERE (
            users.name ILIKE ${searchPattern} OR
            events.title ILIKE ${searchPattern} OR
            events.location ILIKE ${searchPattern} OR
            events.speaker ILIKE ${searchPattern} OR
            events.description ILIKE ${searchPattern} OR
            events.datetime::text ILIKE ${searchPattern}
          ) AND events.is_recurring = true
          ORDER BY events.datetime DESC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;
        return rows;
      }
    } else {
      // All events
      if (category && category !== "all") {
        const { rows } = await sql<Event>`
          SELECT
            events.id,
            events.title,
            events.description,
            events.location,
            events.speaker,
            events.pic_url,
            events.pic_file_id,
            events.type,
            events.gender,
            events.datetime,
            events.end_datetime,
            events.duration_minutes,
            events.is_recurring,
            events.recurrence_type,
            events.interval_value,
            events.days_of_week,
            events.day_of_month,
            events.month_of_year,
            events.recurrence_end,
            events.parent_event_id,
            events.is_exception,
            events.status,
            events.created_at,
            events.updated_at,
            users.name AS created_by
          FROM events
          JOIN users ON events.created_by = users.id
          WHERE (
            users.name ILIKE ${searchPattern} OR
            events.title ILIKE ${searchPattern} OR
            events.location ILIKE ${searchPattern} OR
            events.speaker ILIKE ${searchPattern} OR
            events.description ILIKE ${searchPattern} OR
            events.datetime::text ILIKE ${searchPattern}
          ) AND events.type = ${category}
          ORDER BY events.datetime DESC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;
        return rows;
      } else {
        const { rows } = await sql<Event>`
          SELECT
            events.id,
            events.title,
            events.description,
            events.location,
            events.speaker,
            events.pic_url,
            events.pic_file_id,
            events.type,
            events.gender,
            events.datetime,
            events.end_datetime,
            events.duration_minutes,
            events.is_recurring,
            events.recurrence_type,
            events.interval_value,
            events.days_of_week,
            events.day_of_month,
            events.month_of_year,
            events.recurrence_end,
            events.parent_event_id,
            events.is_exception,
            events.status,
            events.created_at,
            events.updated_at,
            users.name AS created_by
          FROM events
          JOIN users ON events.created_by = users.id
          WHERE (
            users.name ILIKE ${searchPattern} OR
            events.title ILIKE ${searchPattern} OR
            events.location ILIKE ${searchPattern} OR
            events.speaker ILIKE ${searchPattern} OR
            events.description ILIKE ${searchPattern} OR
            events.datetime::text ILIKE ${searchPattern}
          )
          ORDER BY events.datetime DESC
          LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;
        return rows;
      }
    }
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

export async function fetchEventsPages(
  query: string,
  eventType: string = "all", // "all" | "recurring" | "one-time" 
  category: string = "all",
) {
  try {
    const searchPattern = `%${query}%`;
    
    // Build conditions based on parameters
    const hasCategory = category && category !== "all";
    
    if (eventType === "recurring") {
      if (hasCategory) {
        const count = await sql`
          SELECT COUNT(*)
          FROM events
          JOIN users ON events.created_by = users.id
          WHERE (
            users.name ILIKE ${searchPattern} OR
            events.title ILIKE ${searchPattern} OR
            events.location ILIKE ${searchPattern} OR
            events.speaker ILIKE ${searchPattern} OR
            events.description ILIKE ${searchPattern} OR
            events.datetime::text ILIKE ${searchPattern}
          ) AND events.is_recurring = true AND events.type = ${category}
        `;
        return Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
      } else {
        const count = await sql`
          SELECT COUNT(*)
          FROM events
          JOIN users ON events.created_by = users.id
          WHERE (
            users.name ILIKE ${searchPattern} OR
            events.title ILIKE ${searchPattern} OR
            events.location ILIKE ${searchPattern} OR
            events.speaker ILIKE ${searchPattern} OR
            events.description ILIKE ${searchPattern} OR
            events.datetime::text ILIKE ${searchPattern}
          ) AND events.is_recurring = true
        `;
        return Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
      }
    } else if (eventType === "one-time") {
      if (hasCategory) {
        const count = await sql`
          SELECT COUNT(*)
          FROM events
          JOIN users ON events.created_by = users.id
          WHERE (
            users.name ILIKE ${searchPattern} OR
            events.title ILIKE ${searchPattern} OR
            events.location ILIKE ${searchPattern} OR
            events.speaker ILIKE ${searchPattern} OR
            events.description ILIKE ${searchPattern} OR
            events.datetime::text ILIKE ${searchPattern}
          ) AND events.is_recurring = false AND events.type = ${category}
        `;
        return Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
      } else {
        const count = await sql`
          SELECT COUNT(*)
          FROM events
          JOIN users ON events.created_by = users.id
          WHERE (
            users.name ILIKE ${searchPattern} OR
            events.title ILIKE ${searchPattern} OR
            events.location ILIKE ${searchPattern} OR
            events.speaker ILIKE ${searchPattern} OR
            events.description ILIKE ${searchPattern} OR
            events.datetime::text ILIKE ${searchPattern}
          ) AND events.is_recurring = false
        `;
        return Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
      }
    } else {
      // All events (eventType === "all")
      if (hasCategory) {
        const count = await sql`
          SELECT COUNT(*)
          FROM events
          JOIN users ON events.created_by = users.id
          WHERE (
            users.name ILIKE ${searchPattern} OR
            events.title ILIKE ${searchPattern} OR
            events.location ILIKE ${searchPattern} OR
            events.speaker ILIKE ${searchPattern} OR
            events.description ILIKE ${searchPattern} OR
            events.datetime::text ILIKE ${searchPattern}
          ) AND events.type = ${category}
        `;
        return Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
      } else {
        const count = await sql`
          SELECT COUNT(*)
          FROM events
          JOIN users ON events.created_by = users.id
          WHERE (
            users.name ILIKE ${searchPattern} OR
            events.title ILIKE ${searchPattern} OR
            events.location ILIKE ${searchPattern} OR
            events.speaker ILIKE ${searchPattern} OR
            events.description ILIKE ${searchPattern} OR
            events.datetime::text ILIKE ${searchPattern}
          )
        `;
        return Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
      }
    }
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
    console.log(totalPages);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of announcements.");
  }
}

export async function fetchPastAnnouncementsPages(query: string) {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  noStore();

  try {
    const count = await sql`SELECT COUNT(*)
    FROM announcements
    JOIN users ON announcements.created_by = users.id
    WHERE
      DATE(announcements.updated_at AT TIME ZONE ${userTimezone}) < CURRENT_DATE
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
    const data = await sql<EventForm>`
      SELECT
        events.id,
        events.title,
        events.description,
        events.location,
        events.speaker,
        events.pic_url,
        events.pic_file_id,
        events.type,
        events.gender,
        events.datetime,
        events.end_datetime,
        events.duration_minutes,
        events.is_recurring,
        events.recurrence_type,
        events.interval_value,
        events.days_of_week,
        events.day_of_month,
        events.month_of_year,
        events.recurrence_end,
        events.parent_event_id,
        events.is_exception,
        events.status,
        events.created_by
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
        DATE(announcements.updated_at AT TIME ZONE 'Asia/Kuala_Lumpur') = 
        DATE(CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kuala_Lumpur')
        ORDER BY announcements.updated_at DESC;
    `;

    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch today's announcements.");
  }
}

export async function fetchPastAnnouncements(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
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
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
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
        events.end_datetime,
        events.duration_minutes,
        events.pic_url,
        events.speaker,
        events.description,
        events.type,
        events.gender,
        events.is_recurring,
        events.status,
        users.name AS created_by
      FROM events
      JOIN users ON events.created_by = users.id
      WHERE
        events.datetime >= ${currentDateTime}
        AND events.is_recurring = false
        AND events.status = 'active'
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
    const { rows } = await sql<EventCard>`
      SELECT
        events.id,
        events.title,
        events.location,
        events.datetime,
        events.end_datetime,
        events.duration_minutes,
        events.pic_url,
        events.speaker,
        events.description,
        events.type,
        events.gender,
        events.is_recurring,
        events.status,
        users.name AS created_by
      FROM events
      JOIN users ON events.created_by = users.id
      WHERE
        events.datetime < ${currentDateTime}
        AND events.is_recurring = false
        ORDER BY events.datetime DESC
    `;

    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch past events.");
  }
}

export async function fetchAdmins() {
  try {
    const { rows } = await sql<AdminField>`
      SELECT 
        id,
        name
      FROM users
      ORDER BY name ASC
    `;

    return rows;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch admins.");
  }
}

export async function fetchRecurringEvents() {
  try {
    const { rows } = await sql<Event>`
      SELECT
        events.id,
        events.title,
        events.description,
        events.location,
        events.speaker,
        events.pic_url,
        events.pic_file_id,
        events.type,
        events.gender,
        events.datetime,
        events.end_datetime,
        events.duration_minutes,
        events.is_recurring,
        events.recurrence_type,
        events.interval_value,
        events.days_of_week,
        events.day_of_month,
        events.month_of_year,
        events.recurrence_end,
        events.parent_event_id,
        events.is_exception,
        events.status,
        events.created_by,
        events.created_at,
        events.updated_at
      FROM events
      WHERE 
        events.is_recurring = true
        AND events.is_exception = false
        AND (events.recurrence_end IS NULL OR events.recurrence_end >= CURRENT_DATE)
      ORDER BY EXTRACT(hour FROM events.datetime) ASC, EXTRACT(minute FROM events.datetime) ASC
    `;
    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch recurring events.");
  }
}

export async function fetchFilteredRecurringEvents(
  query: string, 
  currentPage: number, 
  category?: string
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const searchPattern = `%${query}%`;

  try {
    if (category && category !== "all") {
      const { rows } = await sql<Event>`
        SELECT
          events.id,
          events.title,
          events.description,
          events.location,
          events.speaker,
          events.pic_url,
          events.pic_file_id,
          events.type,
          events.gender,
          events.datetime,
          events.end_datetime,
          events.duration_minutes,
          events.is_recurring,
          events.recurrence_type,
          events.interval_value,
          events.days_of_week,
          events.day_of_month,
          events.month_of_year,
          events.recurrence_end,
          events.parent_event_id,
          events.is_exception,
          events.status,
          events.created_at,
          events.updated_at,
          users.name AS created_by
        FROM events
        JOIN users ON events.created_by = users.id
        WHERE (
          users.name ILIKE ${searchPattern} OR
          events.title ILIKE ${searchPattern} OR
          events.location ILIKE ${searchPattern} OR
          events.speaker ILIKE ${searchPattern} OR
          events.description ILIKE ${searchPattern} OR
          events.datetime::text ILIKE ${searchPattern}
        ) AND events.is_recurring = true AND events.type = ${category}
        ORDER BY events.status ASC, events.created_at DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
      return rows;
    } else {
      const { rows } = await sql<Event>`
        SELECT
          events.id,
          events.title,
          events.description,
          events.location,
          events.speaker,
          events.pic_url,
          events.pic_file_id,
          events.type,
          events.gender,
          events.datetime,
          events.end_datetime,
          events.duration_minutes,
          events.is_recurring,
          events.recurrence_type,
          events.interval_value,
          events.days_of_week,
          events.day_of_month,
          events.month_of_year,
          events.recurrence_end,
          events.parent_event_id,
          events.is_exception,
          events.status,
          events.created_at,
          events.updated_at,
          users.name AS created_by
        FROM events
        JOIN users ON events.created_by = users.id
        WHERE (
          users.name ILIKE ${searchPattern} OR
          events.title ILIKE ${searchPattern} OR
          events.location ILIKE ${searchPattern} OR
          events.speaker ILIKE ${searchPattern} OR
          events.description ILIKE ${searchPattern} OR
          events.datetime::text ILIKE ${searchPattern}
        ) AND events.is_recurring = true
        ORDER BY events.status ASC, events.created_at DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
    
      return rows;
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch filtered recurring events.");
  }
}

export async function fetchRecurringEventsByGender(gender: string) {
  try {
    const { rows } = await sql<Event>`
      SELECT
        events.id,
        events.title,
        events.description,
        events.location,
        events.speaker,
        events.pic_url,
        events.pic_file_id,
        events.type,
        events.gender,
        events.datetime,
        events.end_datetime,
        events.duration_minutes,
        events.is_recurring,
        events.recurrence_type,
        events.interval_value,
        events.days_of_week,
        events.day_of_month,
        events.month_of_year,
        events.recurrence_end,
        events.parent_event_id,
        events.is_exception,
        events.status,
        events.created_by,
        events.created_at,
        events.updated_at
      FROM events
      WHERE 
        events.is_recurring = true 
        AND events.is_exception = false
        AND events.status = 'active'
        AND events.gender = ${gender}
        AND (events.recurrence_end IS NULL OR events.recurrence_end >= CURRENT_DATE)
      ORDER BY events.created_at ASC
    `;
    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch recurring events by gender.");
  }
}


export async function fetchRecurringEventsPages(query: string) {
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM events
      WHERE 
        events.is_recurring = true
        AND events.is_exception = false
        AND (
          events.title ILIKE ${`%${query}%`} OR
          events.description ILIKE ${`%${query}%`} OR
          events.location ILIKE ${`%${query}%`} OR
          events.speaker ILIKE ${`%${query}%`}
        )
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch recurring events pages.");
  }
}

export async function fetchRecurringEventById(id: string) {
  try {
    const data = await sql<Event>`
      SELECT
        events.id,
        events.title,
        events.description,
        events.location,
        events.speaker,
        events.pic_url,
        events.pic_file_id,
        events.type,
        events.gender,
        events.datetime,
        events.end_datetime,
        events.duration_minutes,
        events.is_recurring,
        events.recurrence_type,
        events.interval_value,
        events.days_of_week,
        events.day_of_month,
        events.month_of_year,
        events.recurrence_end,
        events.parent_event_id,
        events.is_exception,
        events.status,
        events.created_by,
        events.created_at,
        events.updated_at
      FROM events 
      WHERE events.id = ${id} AND events.is_recurring = true
    `;

    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch recurring event.");
  }
}
