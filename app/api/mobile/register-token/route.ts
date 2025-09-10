import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { token, device_type } = await request.json();

    if (!token || !device_type) {
      return NextResponse.json(
        {
          success: false,
          message: "Token and device_type required",
        },
        { status: 400 },
      );
    }

    await sql`
      INSERT INTO push_tokens (token, device_type)
      VALUES (${token}, ${device_type})
      ON CONFLICT (token) 
      DO UPDATE SET 
        device_type = EXCLUDED.device_type,
        is_active = true,
        updated_at = CURRENT_TIMESTAMP
    `;

    return NextResponse.json({
      success: true,
      message: "Token registered successfully",
    });
  } catch (error) {
    console.error("Error registering token:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
