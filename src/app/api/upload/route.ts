
// // /src/app/api/upload/route.ts

// import { NextRequest } from 'next/server';
// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//   api_key: process.env.CLOUDINARY_API_KEY!,
//   api_secret: process.env.CLOUDINARY_API_SECRET!,
// });

// // IMPORTANT: Cloudinary supports huge files ONLY when using upload_stream()
// // Direct buffer upload has a hidden 10MB limit.

// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.formData();
//     const file = formData.get("file") as File;
//     const type = formData.get("type") as string;

//     if (!file) {
//       return Response.json({ error: "No file provided" }, { status: 400 });
//     }

//     // Convert file → stream (Needed for LARGE FILE uploads)
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     // Correct Cloudinary resource types
//     const resourceType =
//       type === "video"
//         ? "video"
//         : type === "document"
//         ? "raw"
//         : "image";

//     // Correct folder mapping
//     const folder =
//       type === "video"
//         ? "axioquan/videos"
//         : type === "document"
//         ? "axioquan/documents"
//         : "axioquan/courses";

//     // WRAP STREAM IN A PROMISE — REQUIRED
//     const uploadResult: any = await new Promise((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         {
//           folder,
//           resource_type: resourceType,
//           use_filename: true,
//           unique_filename: true,
//           chunk_size: 20_000_000, // 20MB chunks for huge files
//         },
//         (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         }
//       );

//       uploadStream.end(buffer);
//     });

//     return Response.json({
//       url: uploadResult.secure_url,
//       publicId: uploadResult.public_id,
//       duration: uploadResult.duration || 0,  // ADDED
//       message: "File uploaded successfully",
//       bytes: uploadResult.bytes,
//     });

//   } catch (error: any) {
//     console.error("❌ Upload API error:", error);

//     return Response.json(
//       { error: error.message || "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

























// // /src/app/api/upload/route.ts

import { NextRequest } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string;

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    // Get original filename and extension
    const originalFilename = file.name;
    const fileExtension = originalFilename.split('.').pop()?.toLowerCase();
    const baseName = originalFilename.replace(/\.[^/.]+$/, ""); // Remove extension
    
    // Sanitize filename for Cloudinary (remove special chars)
    const sanitizedFilename = baseName.replace(/[^a-zA-Z0-9-_]/g, '_');
    
    // Convert file → stream
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Correct Cloudinary resource types
    const resourceType =
      type === "video"
        ? "video"
        : type === "document"
        ? "raw"
        : "image";

    // Correct folder mapping
    const folder =
      type === "video"
        ? "axioquan/videos"
        : type === "document"
        ? "axioquan/documents"
        : "axioquan/images";

    // IMPORTANT: Set public_id to preserve original filename
    const publicId = `${folder}/${sanitizedFilename}`;

    // WRAP STREAM IN A PROMISE
    const uploadResult: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: resourceType,
          public_id: publicId, // Use original filename as public_id
          overwrite: false, // Don't overwrite existing files
          use_filename: true,
          unique_filename: false, // ← CRITICAL: Don't add random suffixes
          filename_override: originalFilename, // Force original filename
          context: `filename=${originalFilename}|type=${file.type}`, // Store original metadata
          chunk_size: 20_000_000, // 20MB chunks for huge files
          // For documents, preserve format
          ...(resourceType === 'raw' && { 
            format: fileExtension,
            resource_type: 'raw'
          }),
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(buffer);
    });

    console.log('✅ File uploaded:', {
      originalName: originalFilename,
      cloudinaryName: uploadResult.public_id,
      url: uploadResult.secure_url,
      type: file.type,
    });

    return Response.json({
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      duration: uploadResult.duration || 0,
      bytes: uploadResult.bytes,
      original_filename: originalFilename, // Return original filename
      file_type: file.type, // Return MIME type
      resource_type: resourceType,
      // Include additional metadata for client
      metadata: {
        originalName: originalFilename,
        size: file.size,
        type: file.type,
        extension: fileExtension,
      }
    });

  } catch (error: any) {
    console.error("❌ Upload API error:", error);

    return Response.json(
      { 
        error: error.message || "Internal server error",
        details: "Check Cloudinary configuration and file permissions"
      },
      { status: 500 }
    );
  }
}