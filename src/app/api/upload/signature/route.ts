
// // src/app/api/upload/signature/route.ts

// import { NextRequest, NextResponse } from 'next/server';
// import { v2 as cloudinary } from 'cloudinary';

// // IMPORTANT: Configure Cloudinary CORRECTLY
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//   api_key: process.env.CLOUDINARY_API_KEY!,
//   api_secret: process.env.CLOUDINARY_API_SECRET!,
//   secure: true
// });

// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const folder = searchParams.get('folder') || 'axioquan/videos';
//     const resource_type = searchParams.get('resource_type') || 'video';
    
//     console.log('🔑 Generating signature for:', {
//       folder,
//       resource_type,
//       cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//       api_key: process.env.CLOUDINARY_API_KEY?.substring(0, 8) + '...'
//     });
    
//     // CRITICAL: Generate timestamp in seconds
//     const timestamp = Math.round(Date.now() / 1000);
    
//     // CORRECT parameters for signature
//     const paramsToSign = {
//       timestamp: timestamp,
//       folder: folder,
//     };
    
//     console.log('📝 Parameters to sign:', paramsToSign);
    
//     // Generate signature
//     const signature = cloudinary.utils.api_sign_request(
//       paramsToSign,
//       process.env.CLOUDINARY_API_SECRET!
//     );
    
//     console.log('✅ Signature generated:', signature.substring(0, 20) + '...');
    
//     return NextResponse.json({
//       signature,
//       timestamp,
//       api_key: process.env.CLOUDINARY_API_KEY!,
//       cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//       folder,
//       resource_type,
//     });
    
//   } catch (error: any) {
//     console.error('❌ Signature generation failed:', error);
    
//     return NextResponse.json(
//       { 
//         error: error.message,
//         details: 'Check Cloudinary environment variables',
//         env_check: {
//           has_cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
//           has_api_key: !!process.env.CLOUDINARY_API_KEY,
//           has_api_secret: !!process.env.CLOUDINARY_API_SECRET
//         }
//       },
//       { status: 500 }
//     );
//   }
// }


// // Add OPTIONS for CORS
// export async function OPTIONS() {
//   return new NextResponse(null, {
//     status: 200,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'GET, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type',
//     },
//   });
// }


























// src/app/api/upload/signature/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || 'axioquan/videos';
    const resource_type = searchParams.get('resource_type') || 'video';
    const filename = searchParams.get('filename') || ''; // Get original filename
    
    console.log('🔑 Generating signature for:', {
      folder,
      resource_type,
      filename,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY?.substring(0, 8) + '...'
    });
    
    // Generate timestamp in seconds
    const timestamp = Math.round(Date.now() / 1000);
    
    // Prepare parameters - include ALL parameters that will be sent to Cloudinary
    const paramsToSign: any = {
      timestamp: timestamp,
      folder: folder,
    };
    
    // If filename is provided, use it as public_id to preserve original name
    if (filename) {
      // Sanitize filename for Cloudinary
      const baseName = filename.replace(/\.[^/.]+$/, ""); // Remove extension
      const sanitized = baseName.replace(/[^a-zA-Z0-9-_]/g, '_');
      const publicId = `${folder}/${sanitized}`;
      
      paramsToSign.public_id = publicId;
      paramsToSign.use_filename = true;
      paramsToSign.unique_filename = false; // Don't add random suffixes
      paramsToSign.overwrite = false; // Don't overwrite existing
      
      console.log('📁 Using public_id for original filename:', publicId);
    }
    
    console.log('📝 Parameters to sign:', paramsToSign);
    
    // Generate signature
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!
    );
    
    console.log('✅ Signature generated:', signature.substring(0, 20) + '...');
    
    return NextResponse.json({
      signature,
      timestamp,
      api_key: process.env.CLOUDINARY_API_KEY!,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
      folder,
      resource_type,
      ...(filename && { 
        suggested_public_id: paramsToSign.public_id,
        use_original_filename: true 
      }),
    });
    
  } catch (error: any) {
    console.error('❌ Signature generation failed:', error);
    
    return NextResponse.json(
      { 
        error: error.message,
        details: 'Check Cloudinary environment variables',
        env_check: {
          has_cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
          has_api_key: !!process.env.CLOUDINARY_API_KEY,
          has_api_secret: !!process.env.CLOUDINARY_API_SECRET
        }
      },
      { status: 500 }
    );
  }
}

// Add OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}