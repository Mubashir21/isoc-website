import ImageKit from "imagekit";
import { NextRequest, NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
});

export async function POST(request: NextRequest) {
  try {
    const { fileId } = await request.json();
    console.log("Received fileId:", fileId);

    if (!fileId) {
      return NextResponse.json(
        { error: "No fileId provided" },
        { status: 400 },
      );
    }

    const result = await imagekit.deleteFile(fileId);

    return NextResponse.json({ message: "Image deleted successfully", result });
  } catch (error) {
    console.error("ImageKit delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete image", details: error },
      { status: 500 },
    );
  }
}
