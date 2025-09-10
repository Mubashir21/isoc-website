import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

interface Event {
  id: string;
  title: string;
  datetime: string;
  location: string | null;
  speaker: string | null;
  description: string | null;
  type: string | null;
  pic_url: string | null;
}

export async function GET() {
  try {
    const result = await sql`
      SELECT 
        id,
        title,
        datetime,
        location,
        speaker,
        description,
        type,
        pic_url
      FROM events 
      ORDER BY datetime ASC
      LIMIT 20
    `;

    const events = result.rows as Event[];

    return NextResponse.json({
      success: true,
      events: events,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
