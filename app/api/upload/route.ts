import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";

// Configure ImageKit with environment variables
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
});

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds limit" },
        { status: 400 },
      );
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate a unique fileName using original name and timestamp
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

    const result = await imagekit.upload({
      file: buffer, // Binary file data
      fileName: fileName,
      folder: "events", // Same folder structure as in Cloudinary
      useUniqueFileName: true, // ImageKit will ensure filename uniqueness
    });

    return NextResponse.json({
      message: "Upload successful",
      url: result.url, // The full URL to the uploaded image
      fileId: result.fileId, // ImageKit's unique file identifier
      filePath: result.filePath, // Path of the file in ImageKit
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "An error occurred during upload" },
      { status: 500 },
    );
  }
}
