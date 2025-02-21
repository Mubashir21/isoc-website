import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    // Extract the public_id from the URL
    const publicIdMatch = url.match(/\/v\d+\/(.+)\.[a-zA-Z]+$/);

    if (!publicIdMatch) {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 },
      );
    }

    const public_id = publicIdMatch[1];

    console.log("Attempting to delete image with public_id:", public_id);

    // Delete the image from Cloudinary
    const result = await cloudinary.uploader.destroy(public_id);

    console.log("Cloudinary deletion result:", result);

    if (result.result !== "ok") {
      return NextResponse.json(
        { error: "Failed to delete image", details: result },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "An error occurred during deletion", details: error },
      { status: 500 },
    );
  }
}
