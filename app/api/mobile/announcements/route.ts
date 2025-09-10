import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

interface Announcement {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string | null;
}

export async function GET() {
  try {
    const result = await sql`
      SELECT 
        id,
        title,
        content,
        created_at,
        updated_at
      FROM announcements 
      ORDER BY created_at DESC
      LIMIT 20
    `;

    const announcements = result.rows as Announcement[];

    return NextResponse.json({
      success: true,
      announcements: announcements,
    });
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
