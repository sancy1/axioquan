
// // /components/dashboard/trending-courses.tsx

// 'use client'

// export default function TrendingCourses() {
//   const courses = [
//     {
//       id: 1,
//       title: 'Machine Learning Fundamentals',
//       icon: '🤖',
//       category: 'Trending',
//     },
//     {
//       id: 2,
//       title: 'Digital Marketing Essentials',
//       icon: '📱',
//       category: 'Popular',
//     },
//     {
//       id: 3,
//       title: 'Spoken for Beginners',
//       icon: '🗣️',
//       category: 'New',
//     },
//   ]

//   return (
//     <div className="bg-white rounded-lg p-6 border border-gray-200">
//       <h2 className="text-xl font-bold text-gray-900 mb-6">Trending Courses</h2>
      
//       <div className="space-y-2">
//         {courses.map((course) => (
//           <div
//             key={course.id}
//             className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
//           >
//             <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
//             <span className="text-2xl">{course.icon}</span>
//             <div className="flex-1">
//               <p className="font-medium text-gray-900">{course.title}</p>
//             </div>
//             <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
//               {course.category}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }






















// /components/dashboard/trending-courses.tsx

// import { getTrendingCoursesAction } from '@/lib/courses/actions';
// import { TrendingCoursesList } from '@/components/courses/trending-courses-list';

// export default async function TrendingCourses() {
//   const result = await getTrendingCoursesAction({
//     limit: 5,
//     useAlgorithm: true
//   });

//   return (
//     <TrendingCoursesList
//       courses={result.courses || []}
//       title="Trending Courses"
//       description="Courses gaining popularity based on student engagement"
//       variant="compact"
//       showViewAll={true}
//     />
//   );
// }



















// // /components/dashboard/trending-courses.tsx

// import { getTrendingCoursesAction } from '@/lib/courses/actions';
// import { TrendingCoursesList } from '@/components/courses/trending-courses-list';

// export default async function TrendingCourses() {
//   try {
//     const result = await getTrendingCoursesAction({
//       limit: 5,
//     });

//     console.log('Trending courses data:', {
//       success: result.success,
//       courseCount: result.courses?.length,
//       courses: result.courses?.map(c => ({
//         id: c.id,
//         title: c.title,
//         thumbnail_url: c.thumbnail_url,
//         hasThumbnail: !!c.thumbnail_url,
//         slug: c.slug
//       }))
//     });

//     if (!result.success) {
//       console.error('Failed to fetch trending courses:', result.errors);
//       return (
//         <div className="bg-white rounded-lg p-6 border border-gray-200">
//           <h2 className="text-xl font-bold text-gray-900 mb-6">Trending Courses</h2>
//           <div className="text-center py-8 text-gray-500">
//             Unable to load trending courses at the moment.
//           </div>
//         </div>
//       );
//     }

//     return (
//       <TrendingCoursesList
//         courses={result.courses || []}
//         title="Trending Courses"
//         description="Most popular courses right now"
//         variant="compact"
//         showViewAll={true}
//       />
//     );
//   } catch (error) {
//     console.error('Error in TrendingCourses component:', error);
//     return (
//       <div className="bg-white rounded-lg p-6 border border-gray-200">
//         <h2 className="text-xl font-bold text-gray-900 mb-6">Trending Courses</h2>
//         <div className="text-center py-8 text-gray-500">
//           Error loading trending courses. Please try again later.
//         </div>
//       </div>
//     );
//   }
// }






















import { getTrendingCoursesAction } from '@/lib/courses/actions';
import { TrendingCoursesList } from '@/components/courses/trending-courses-list';

export default async function TrendingCourses() {
  try {
    const result = await getTrendingCoursesAction({
      limit: 5,
    });

    console.log('Trending courses data:', {
      success: result.success,
      courseCount: result.courses?.length,
      courses: result.courses?.map(c => ({
        id: c.id,
        title: c.title,
        average_rating: c.average_rating,
        review_count: c.review_count,
        like_count: c.like_count,
        share_count: c.share_count,
        enrolled_students_count: c.enrolled_students_count,
        total_views: c.total_views
      }))
    });

    if (!result.success) {
      console.error('Failed to fetch trending courses:', result.errors);
      return (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Trending Courses</h2>
          <div className="text-center py-8 text-gray-500">
            Unable to load trending courses at the moment.
          </div>
        </div>
      );
    }

    // Ensure we have proper ratings
    const coursesWithRatings = await Promise.all(
      (result.courses || []).map(async (course) => {
        // If rating is 0 or null, try to calculate from reviews
        if (!course.average_rating || course.average_rating === 0) {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${course.id}/reviews/stats`, {
              next: { revalidate: 60 } // Cache for 60 seconds
            });
            if (response.ok) {
              const stats = await response.json();
              if (stats.success && stats.average_rating > 0) {
                return {
                  ...course,
                  average_rating: stats.average_rating,
                  review_count: stats.total_reviews || course.review_count
                };
              }
            }
          } catch (error) {
            console.error(`Error fetching reviews for course ${course.id}:`, error);
          }
        }
        return course;
      })
    );

    return (
      <TrendingCoursesList
        courses={coursesWithRatings}
        title="Trending Courses"
        description="Most popular courses based on student engagement and reviews"
        variant="compact"
        showViewAll={true}
      />
    );
  } catch (error) {
    console.error('Error in TrendingCourses component:', error);
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Trending Courses</h2>
        <div className="text-center py-8 text-gray-500">
          Error loading trending courses. Please try again later.
        </div>
      </div>
    );
  }
}