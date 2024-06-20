import { NextResponse } from "next/server";

//file will be moved to [id]

export async function POST(request) {
  const data = await request.formData();
  const picture = data.get("picture");

  if (!picture || !picture.type) {
    return NextResponse.json({
      success: false,
      error: "Invalid picture provided",
    });
  }

  // console.log("Received picture:", picture);
  // console.log("Picture type:", picture.type);

  const pfpUrl = await handleImageUpload(picture);

  //logic to save the image to the database :

  return NextResponse.json({
    success: true,
    pfpUrl: pfpUrl,
  });
}

async function handleImageUpload(blob) {
  // console.log("Starting upload...");

  if (!blob.type.startsWith("image/")) {
    // console.error("Invalid image type:", blob.type);
    return;
  }

  const file = new File([blob], "image.jpg", { type: blob.type });

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "vtxres570000");

  try {
    const response = await fetch(process.env.CLOUDINARY_IMG_API, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      // console.error("Upload Error:", errorData);
      return;
    }

    const data = await response.json();
    // console.log("Upload successful:", data);
    return data.secure_url;
  } catch (error) {
    console.error("Upload Error:", error);
  }
}
