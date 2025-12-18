
// /src/app/api/student/debug/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { sql } from '@/lib/db';

export async function GET(request: NextRequest) {
  console.log('🔍 Debug endpoint called');
  
  try {
    // Test 1: Check session
    const session = await getSession();
    console.log('🔍 Session:', session ? 'Exists' : 'Missing');
    
    if (session) {
      console.log('🔍 User ID:', session.userId);
      console.log('🔍 User roles:', session.roles);
    }
    
    // Test 2: Test database connection
    console.log('🔍 Testing database connection...');
    try {
      const dbTest = await sql`SELECT 1 as test_value, NOW() as current_time`;
      console.log('✅ Database connection successful:', dbTest[0]);
    } catch (dbError: any) {
      console.error('❌ Database connection failed:', dbError.message);
    }
    
    // Test 3: Test specific tables exist
    console.log('🔍 Checking if assessment_attempts table exists...');
    try {
      const tableCheck = await sql`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_name = 'assessment_attempts'
        ) as table_exists
      `;
      console.log('✅ assessment_attempts table exists:', tableCheck[0]?.table_exists);
    } catch (tableError: any) {
      console.error('❌ Table check failed:', tableError.message);
    }
    
    return NextResponse.json({
      success: true,
      message: 'Debug endpoint working',
      session: session ? {
        userId: session.userId,
        roles: session.roles,
        primaryRole: session.primaryRole
      } : null,
      timestamp: new Date().toISOString()
    });
    
  } catch (error: any) {
    console.error('💥 Debug endpoint error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}