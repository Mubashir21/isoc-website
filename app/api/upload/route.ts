import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 5MB
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

    const result = await new Promise<cloudinary.UploadApiResponse>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "society_events" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as cloudinary.UploadApiResponse);
          },
        );

        uploadStream.end(buffer);
      },
    );

    return NextResponse.json({
      message: "Upload successful",
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "An error occurred during upload" },
      { status: 500 },
    );
  }
}

// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   const data = await request.json();
//   // Your file upload logic here, e.g., saving the file to a storage service
//   return NextResponse.json({ message: "File uploaded successfully" });
// }
