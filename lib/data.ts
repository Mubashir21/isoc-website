import { sql } from "@vercel/postgres";
import { EventsTable, EventsForm } from "./definitions";

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
        events.pic_url
      FROM events
      WHERE events.id = ${id};
    `;

    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch event.");
  }
}
