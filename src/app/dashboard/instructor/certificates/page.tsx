
// // /app/dashboard/instructor/certificates/page.tsx

// import { getSession } from '@/lib/auth/session'
// import Sidebar from '@/components/dashboard/sidebar'
// import InstructorCertificatesPage from '@/components/dashboard/instructor-certificates-page'

// export default async function InstructorCertificates() {
//   const session = await getSession()
  
//   if (!session || !session.userId) {
//     return (
//       <div className="flex min-h-screen bg-gray-50 items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-900 mb-4">Unauthorized</h1>
//           <p className="text-gray-600">Please log in to access this page.</p>
//         </div>
//       </div>
//     )
//   }

//   const user = {
//     id: session.userId,
//     name: 'Instructor User',
//     email: 'instructor@example.com',
//     primaryRole: session.primaryRole || 'instructor',
//     image: undefined
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar user={user} />
//       <main className="flex-1 overflow-auto">
//         <InstructorCertificatesPage />
//       </main>
//     </div>
//   )
// }





















// /app/dashboard/instructor/certificates/page.tsx

// import { getSession } from '@/lib/auth/session'
// import Sidebar from '@/components/dashboard/sidebar'
// import InstructorCertificatesPage from '@/components/dashboard/instructor-certificates-page'

// export default async function InstructorCertificates() {
//   const session = await getSession()
  
//   if (!session || !session.userId) {
//     return (
//       <div className="flex min-h-screen bg-gray-50 items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-900 mb-4">Unauthorized</h1>
//           <p className="text-gray-600">Please log in to access this page.</p>
//         </div>
//       </div>
//     )
//   }

//   // FIXED: Create user object from actual session data
//   const user = {
//     id: session.userId,
//     name: session.name || 'User', // Use session.name instead of hardcoded
//     email: session.email || 'user@example.com', // Use session.email
//     primaryRole: session.primaryRole || 'instructor',
//     roles: session.roles || [], // Added roles array
//     image: session.image || undefined
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar user={user} />
//       <main className="flex-1 overflow-auto">
//         <InstructorCertificatesPage />
//       </main>
//     </div>
//   )
// }

























// /app/dashboard/instructor/certificates/page.tsx

import { getSession } from '@/lib/auth/session'
import InstructorCertificatesPage from '@/components/dashboard/instructor-certificates-page'

export default async function InstructorCertificates() {
  const session = await getSession()
  
  if (!session || !session.userId) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Unauthorized</h1>
          <p className="text-gray-600">Please log in to access this page.</p>
        </div>
      </div>
    )
  }

  // REMOVED: User object creation (handled by layout)
  // REMOVED: Sidebar import and usage

  return (
    // REMOVED: Outer div with Sidebar
    <InstructorCertificatesPage />
  )
}