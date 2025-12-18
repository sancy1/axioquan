
// // // lib/auth/utils.ts

// 'use server';

// import { redirect } from 'next/navigation';
// import { getSession, shouldRefreshSession, refreshSession } from './session';

// export async function requireAuth() {
//   'use server';
  
//   const session = await getSession();
//   if (!session) {
//     redirect('/login');
//   }
//   return session;
// }

// /**
//  * Utility to automatically refresh session if needed
//  * Use this in dashboard pages to keep users logged in while active
//  */
// export async function withSessionRefresh() {
//   'use server';
  
//   const session = await getSession();
//   if (!session) {
//     redirect('/login');
//   }

//   // Check if session needs refresh, but don't actually refresh here
//   // to avoid cookie modification errors in layouts/pages
//   const needsRefresh = await shouldRefreshSession();
//   if (needsRefresh) {
//     console.log('ℹ️ Session needs refresh, but refreshing will happen in server action');
//   }

//   return session;
// }

// /**
//  * Server action to refresh session - call this from client components
//  */
// export async function refreshSessionAction() {
//   'use server';
  
//   return await refreshSession();
// }



// /**
//  * Require specific role(s) - check if user has at least one of the required roles
//  */
// export async function requireRole(requiredRoles: string | string[]): Promise<any> {
//   const session = await getSession();
  
//   if (!session) {
//     throw new Error('Unauthorized: Please log in');
//   }

//   // Convert single role to array for consistent handling
//   const rolesArray = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
  
//   // Check if user has at least one of the required roles
//   const hasRequiredRole = rolesArray.some(role => 
//     session.roles?.includes(role)
//   );

//   if (!hasRequiredRole) {
//     throw new Error(`Unauthorized: Requires one of these roles: ${rolesArray.join(', ')}`);
//   }

//   return session;
// }

// /**
//  * Require specific role(s) with session refresh
//  */
// export async function requireRoleWithRefresh(requiredRoles: string | string[]): Promise<any> {
//   const session = await withSessionRefresh();
//   return requireRole(requiredRoles);
// }

// /**
//  * Check if user has specific role
//  */
// // export async function requireRole(role: string) {
// //   'use server';
  
// //   const session = await requireAuth();
  
// //   if (!session.roles.includes(role)) {
// //     redirect('/dashboard?error=unauthorized');
// //   }
  
// //   return session;
// // }




// /**
//  * Check if user has any of the specified roles
//  */
// export async function requireAnyRole(roles: string[]) {
//   'use server';
  
//   const session = await requireAuth();
  
//   const hasRole = roles.some(role => session.roles.includes(role));
//   if (!hasRole) {
//     redirect('/dashboard?error=unauthorized');
//   }
  
//   return session;
// }


























// // lib/auth/utils.ts

'use server';

import { redirect } from 'next/navigation';
import { getSession, shouldRefreshSession, refreshSession } from './session';

export async function requireAuth() {
  'use server';
  
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  return session;
}

/**
 * Utility to automatically refresh session if needed
 * Use this in dashboard pages to keep users logged in while active
 */
export async function withSessionRefresh() {
  'use server';
  
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  // Check if session needs refresh, but don't actually refresh here
  // to avoid cookie modification errors in layouts/pages
  const needsRefresh = await shouldRefreshSession();
  if (needsRefresh) {
    console.log('ℹ️ Session needs refresh, but refreshing will happen in server action');
  }

  return session;
}

/**
 * Server action to refresh session - call this from client components
 */
export async function refreshSessionAction() {
  'use server';
  
  return await refreshSession();
}



/**
 * Require specific role(s) - check if user has at least one of the required roles
 */
export async function requireRole(requiredRoles: string | string[]): Promise<any> {
  const session = await getSession();
  
  if (!session) {
    throw new Error('Unauthorized: Please log in');
  }

  // Convert single role to array for consistent handling
  const rolesArray = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
  
  // Check if user has at least one of the required roles
  const hasRequiredRole = rolesArray.some(role => 
    session.roles?.includes(role)
  );

  if (!hasRequiredRole) {
    throw new Error(`Unauthorized: Requires one of these roles: ${rolesArray.join(', ')}`);
  }

  return session;
}

/**
 * Require specific role(s) with session refresh
 */
export async function requireRoleWithRefresh(requiredRoles: string | string[]): Promise<any> {
  const session = await withSessionRefresh();
  return requireRole(requiredRoles);
}

/**
 * Check if user has any of the specified roles
 */
export async function requireAnyRole(roles: string[]) {
  'use server';
  
  const session = await requireAuth();
  
  const hasRole = roles.some(role => session.roles.includes(role));
  if (!hasRole) {
    redirect('/dashboard?error=unauthorized');
  }
  
  return session;
}




/**
 * Check if a user has instructor access to a course
 */
export async function checkInstructorAccess(userId: string, courseId: string): Promise<boolean> {
  'use server';
  
  try {
    const { sql } = await import('@/lib/db');
    
    const result = await sql`
      SELECT 1
      FROM courses
      WHERE id = ${courseId} 
        AND instructor_id = ${userId}
      LIMIT 1
    `;
    
    return result.length > 0;
  } catch (error) {
    console.error('Error checking instructor access:', error);
    return false;
  }
}

/**
 * Check if a user has instructor or admin access to a course
 */
export async function checkInstructorOrAdminAccess(
  userId: string, 
  courseId: string, 
  userRole?: string
): Promise<boolean> {
  'use server';
  
  try {
    const { sql } = await import('@/lib/db');

    // Admins have access to everything
    if (userRole === 'admin') {
      return true;
    }

    // Check if user is instructor of this course
    const result = await sql`
      SELECT 1
      FROM courses
      WHERE id = ${courseId} 
        AND instructor_id = ${userId}
      LIMIT 1
    `;
    
    return result.length > 0;
  } catch (error) {
    console.error('Error checking instructor/admin access:', error);
    return false;
  }
}

/**
 * Require instructor access to a course
 */
export async function requireInstructorAccess(courseId: string) {
  'use server';
  
  const session = await getSession();
  if (!session || !session.userId) {
    redirect('/login');
  }

  const hasAccess = await checkInstructorAccess(session.userId, courseId);
  if (!hasAccess && session.primaryRole !== 'admin') {
    redirect('/dashboard?error=unauthorized');
  }

  return session;
}

