
// // /lib/db/queries/trending-courses.ts

// import { sql } from '../index';
// import { Course } from '@/types/courses';

// /**
//  * Get trending courses based on engagement metrics
//  */
// export async function getTrendingCourses(limit: number = 5): Promise<Course[]> {
//   try {
//     const trendingCourses = await sql`
//       SELECT 
//         c.id,
//         c.slug,
//         c.title,
//         c.subtitle,
//         c.short_description,
//         c.description_html,
//         c.instructor_id,
//         c.category_id,
//         c.difficulty_level,
//         c.language,
//         c.content_type,
//         c.thumbnail_url,
//         c.promo_video_url,
//         c.price_cents,
//         c.currency,
//         c.discount_percent,
//         c.original_price_cents,
//         c.has_free_trial,
//         c.trial_duration_days,
//         c.is_published,
//         c.is_featured,
//         c.is_trending,
//         c.is_bestseller,
//         c.is_new,
//         c.certificate_available,
//         c.has_lifetime_access,
//         c.allow_downloads,
//         c.has_captions,
//         c.has_transcripts,
//         c.start_date,
//         c.end_date,
//         c.enrollment_capacity,
//         c.requires_approval,
//         c.approval_message,
//         c.access_type,
//         c.total_video_duration,
//         c.total_lessons,
//         c.total_quizzes,
//         c.total_assignments,
//         c.total_downloads,
//         c.total_articles,
//         c.enrolled_students_count,
//         c.active_students_count,
//         c.completed_students_count,
//         c.average_rating,
//         c.review_count,
//         c.total_views,
//         c.completion_rate,
//         c.engagement_score,
//         c.like_count,
//         c.share_count,
//         c.favorite_count,
//         c.meta_title,
//         c.meta_description,
//         c.search_keywords,
//         c.published_at,
//         c.featured_at,
//         c.trending_at,
//         c.created_at,
//         c.updated_at,
//         u.name as instructor_name,
//         u.email as instructor_email,
//         u.image as instructor_image,
//         u.bio as instructor_bio,
//         cat.name as category_name,
//         cat.slug as category_slug,
//         ARRAY_AGG(DISTINCT t.name) as tag_names,
//         -- Calculate trending score
//         (
//           (COALESCE(c.enrolled_students_count, 0) * 0.3) + 
//           (COALESCE(c.average_rating, 0) * 20) + 
//           (COALESCE(c.review_count, 0) * 0.1) + 
//           (COALESCE(c.total_views, 0) * 0.05) +
//           (COALESCE(c.like_count, 0) * 0.2) +
//           (COALESCE(c.share_count, 0) * 0.15) +
//           (CASE WHEN c.is_featured THEN 10 ELSE 0 END) +
//           (EXTRACT(EPOCH FROM (NOW() - c.created_at)) / 86400 * -0.1)
//         ) as trending_score
//       FROM courses c
//       LEFT JOIN users u ON c.instructor_id = u.id
//       LEFT JOIN categories cat ON c.category_id = cat.id
//       LEFT JOIN course_tags ct ON c.id = ct.course_id
//       LEFT JOIN tags t ON ct.tag_id = t.id
//       WHERE c.is_published = true
//       GROUP BY 
//         c.id, 
//         u.id, 
//         cat.id
//       ORDER BY trending_score DESC
//       LIMIT ${limit}
//     `;

//     // Transform the data to match Course interface
//     const courses = trendingCourses.map((course: any) => ({
//       ...course,
//       tags: course.tag_names?.filter(Boolean).map((name: string, index: number) => ({
//         id: `tag-${index}`,
//         name,
//         slug: name.toLowerCase().replace(/\s+/g, '-'),
//         color: '#3B82F6',
//         is_featured: false,
//         is_trending: true,
//         usage_count: 0
//       })) || []
//     }));

//     return courses as Course[];
//   } catch (error) {
//     console.error('❌ Error fetching trending courses:', error);
//     return [];
//   }
// }

// /**
//  * Get courses marked as trending in the database
//  */
// export async function getTrendingFlaggedCourses(limit: number = 5): Promise<Course[]> {
//   try {
//     const courses = await sql`
//       SELECT 
//         c.id,
//         c.slug,
//         c.title,
//         c.subtitle,
//         c.short_description,
//         c.instructor_id,
//         c.category_id,
//         c.thumbnail_url,
//         c.price_cents,
//         c.is_published,
//         c.is_featured,
//         c.is_trending,
//         c.enrolled_students_count,
//         c.average_rating,
//         c.review_count,
//         c.total_views,
//         c.total_video_duration,
//         c.like_count,
//         c.share_count,
//         c.favorite_count,
//         c.created_at,
//         c.trending_at,
//         u.name as instructor_name,
//         u.email as instructor_email,
//         u.image as instructor_image,
//         cat.name as category_name,
//         cat.slug as category_slug
//       FROM courses c
//       LEFT JOIN users u ON c.instructor_id = u.id
//       LEFT JOIN categories cat ON c.category_id = cat.id
//       WHERE c.is_published = true 
//         AND (c.is_trending = true OR c.is_featured = true)
//       ORDER BY 
//         COALESCE(c.trending_at, c.created_at) DESC,
//         COALESCE(c.enrolled_students_count, 0) DESC
//       LIMIT ${limit}
//     `;

//     // Get tags for each course
//     for (const course of courses) {
//       if (course.id) {
//         const tags = await sql`
//           SELECT 
//             t.id,
//             t.name,
//             t.slug,
//             t.color,
//             t.icon,
//             t.is_featured,
//             t.is_trending,
//             t.usage_count
//           FROM tags t
//           JOIN course_tags ct ON t.id = ct.tag_id
//           WHERE ct.course_id = ${course.id}
//         `;
//         course.tags = tags || [];
//       }
//     }

//     return courses as Course[];
//   } catch (error) {
//     console.error('❌ Error fetching trending flagged courses:', error);
//     return [];
//   }
// }

// /**
//  * Simplified trending courses query (alternative)
//  */
// export async function getSimpleTrendingCourses(limit: number = 5): Promise<Course[]> {
//   try {
//     const courses = await sql`
//       SELECT 
//         c.id,
//         c.slug,
//         c.title,
//         c.subtitle,
//         c.short_description,
//         c.thumbnail_url,
//         c.instructor_id,
//         c.category_id,
//         c.price_cents,
//         c.is_published,
//         c.is_featured,
//         c.is_trending,
//         c.enrolled_students_count,
//         c.average_rating,
//         c.review_count,
//         c.total_views,
//         c.total_video_duration,
//         c.like_count,
//         c.share_count,
//         c.created_at,
//         u.name as instructor_name,
//         u.image as instructor_image,
//         cat.name as category_name,
//         -- Simple trending score calculation
//         (
//           COALESCE(c.enrolled_students_count, 0) * 2 +
//           COALESCE(c.average_rating, 0) * 10 +
//           COALESCE(c.review_count, 0) * 0.5 +
//           COALESCE(c.like_count, 0)
//         ) as trending_score
//       FROM courses c
//       LEFT JOIN users u ON c.instructor_id = u.id
//       LEFT JOIN categories cat ON c.category_id = cat.id
//       WHERE c.is_published = true
//       ORDER BY trending_score DESC, c.created_at DESC
//       LIMIT ${limit}
//     `;

//     // Get tags for each course
//     const coursesWithTags = await Promise.all(
//       courses.map(async (course: any) => {
//         const tags = await sql`
//           SELECT 
//             t.name,
//             t.slug,
//             t.color
//           FROM tags t
//           JOIN course_tags ct ON t.id = ct.tag_id
//           WHERE ct.course_id = ${course.id}
//           LIMIT 3
//         `;
        
//         return {
//           ...course,
//           tags: tags.map((tag: any, index: number) => ({
//             id: `tag-${index}`,
//             name: tag.name,
//             slug: tag.slug,
//             color: tag.color || '#3B82F6'
//           }))
//         };
//       })
//     );

//     return coursesWithTags as Course[];
//   } catch (error) {
//     console.error('❌ Error fetching simple trending courses:', error);
//     return [];
//   }
// }

























// // /lib/db/queries/trending-courses.ts

// import { sql } from '../index';
// import { Course } from '@/types/courses';

// /**
//  * Get trending courses based on engagement metrics
//  */
// export async function getTrendingCourses(limit: number = 5): Promise<Course[]> {
//   try {
//     const trendingCourses = await sql`
//       SELECT 
//         c.id,
//         c.slug,
//         c.title,
//         c.subtitle,
//         c.short_description,
//         c.description_html,
//         c.instructor_id,
//         c.category_id,
//         c.difficulty_level,
//         c.language,
//         c.content_type,
//         c.thumbnail_url,
//         c.promo_video_url,
//         c.price_cents,
//         c.currency,
//         c.discount_percent,
//         c.original_price_cents,
//         c.has_free_trial,
//         c.trial_duration_days,
//         c.is_published,
//         c.is_featured,
//         c.is_trending,
//         c.is_bestseller,
//         c.is_new,
//         c.certificate_available,
//         c.has_lifetime_access,
//         c.allow_downloads,
//         c.has_captions,
//         c.has_transcripts,
//         c.start_date,
//         c.end_date,
//         c.enrollment_capacity,
//         c.requires_approval,
//         c.approval_message,
//         c.access_type,
//         c.total_video_duration,
//         c.total_lessons,
//         c.total_quizzes,
//         c.total_assignments,
//         c.total_downloads,
//         c.total_articles,
//         c.enrolled_students_count,
//         c.active_students_count,
//         c.completed_students_count,
//         -- Use calculated rating from reviews
//         COALESCE(
//           (SELECT AVG(rating) 
//            FROM course_reviews cr 
//            WHERE cr.course_id = c.id 
//            AND cr.status = 'approved'
//            AND cr.rating > 0),
//           c.average_rating,
//           0
//         ) as average_rating,
//         -- Get review count from reviews table
//         (SELECT COUNT(*) 
//          FROM course_reviews cr 
//          WHERE cr.course_id = c.id 
//          AND cr.status = 'approved') as review_count,
//         c.total_views,
//         c.completion_rate,
//         c.engagement_score,
//         c.like_count,
//         c.share_count,
//         c.favorite_count,
//         c.meta_title,
//         c.meta_description,
//         c.search_keywords,
//         c.published_at,
//         c.featured_at,
//         c.trending_at,
//         c.created_at,
//         c.updated_at,
//         u.name as instructor_name,
//         u.email as instructor_email,
//         u.image as instructor_image,
//         u.bio as instructor_bio,
//         cat.name as category_name,
//         cat.slug as category_slug,
//         ARRAY_AGG(DISTINCT t.name) as tag_names,
//         -- Calculate trending score with proper rating
//         (
//           (COALESCE(c.enrolled_students_count, 0) * 0.3) + 
//           (COALESCE(
//             (SELECT AVG(rating) 
//              FROM course_reviews cr 
//              WHERE cr.course_id = c.id 
//              AND cr.status = 'approved'
//              AND cr.rating > 0),
//             c.average_rating,
//             0
//           ) * 20) + 
//           (COALESCE(
//             (SELECT COUNT(*) 
//              FROM course_reviews cr 
//              WHERE cr.course_id = c.id 
//              AND cr.status = 'approved')
//             , 0) * 0.1) + 
//           (COALESCE(c.total_views, 0) * 0.05) +
//           (COALESCE(c.like_count, 0) * 0.2) +
//           (COALESCE(c.share_count, 0) * 0.15) +
//           (CASE WHEN c.is_featured THEN 10 ELSE 0 END) +
//           (EXTRACT(EPOCH FROM (NOW() - c.created_at)) / 86400 * -0.1)
//         ) as trending_score
//       FROM courses c
//       LEFT JOIN users u ON c.instructor_id = u.id
//       LEFT JOIN categories cat ON c.category_id = cat.id
//       LEFT JOIN course_tags ct ON c.id = ct.course_id
//       LEFT JOIN tags t ON ct.tag_id = t.id
//       WHERE c.is_published = true
//       GROUP BY 
//         c.id, 
//         u.id, 
//         cat.id
//       ORDER BY trending_score DESC
//       LIMIT ${limit}
//     `;

//     // Transform the data to match Course interface
//     const courses = trendingCourses.map((course: any) => ({
//       ...course,
//       tags: course.tag_names?.filter(Boolean).map((name: string, index: number) => ({
//         id: `tag-${index}`,
//         name,
//         slug: name.toLowerCase().replace(/\s+/g, '-'),
//         color: '#3B82F6',
//         is_featured: false,
//         is_trending: true,
//         usage_count: 0
//       })) || []
//     }));

//     return courses as Course[];
//   } catch (error) {
//     console.error('❌ Error fetching trending courses:', error);
//     return [];
//   }
// }

// /**
//  * Get courses marked as trending in the database
//  */
// export async function getTrendingFlaggedCourses(limit: number = 5): Promise<Course[]> {
//   try {
//     const courses = await sql`
//       SELECT 
//         c.id,
//         c.slug,
//         c.title,
//         c.subtitle,
//         c.short_description,
//         c.instructor_id,
//         c.category_id,
//         c.thumbnail_url,
//         c.price_cents,
//         c.is_published,
//         c.is_featured,
//         c.is_trending,
//         c.enrolled_students_count,
//         -- Use calculated rating from reviews
//         COALESCE(
//           (SELECT AVG(rating) 
//            FROM course_reviews cr 
//            WHERE cr.course_id = c.id 
//            AND cr.status = 'approved'
//            AND cr.rating > 0),
//           c.average_rating,
//           0
//         ) as average_rating,
//         -- Get review count from reviews table
//         (SELECT COUNT(*) 
//          FROM course_reviews cr 
//          WHERE cr.course_id = c.id 
//          AND cr.status = 'approved') as review_count,
//         c.total_views,
//         c.total_video_duration,
//         c.like_count,
//         c.share_count,
//         c.favorite_count,
//         c.created_at,
//         c.trending_at,
//         u.name as instructor_name,
//         u.email as instructor_email,
//         u.image as instructor_image,
//         cat.name as category_name,
//         cat.slug as category_slug
//       FROM courses c
//       LEFT JOIN users u ON c.instructor_id = u.id
//       LEFT JOIN categories cat ON c.category_id = cat.id
//       WHERE c.is_published = true 
//         AND (c.is_trending = true OR c.is_featured = true)
//       ORDER BY 
//         COALESCE(c.trending_at, c.created_at) DESC,
//         COALESCE(c.enrolled_students_count, 0) DESC
//       LIMIT ${limit}
//     `;

//     // Get tags for each course
//     for (const course of courses) {
//       if (course.id) {
//         const tags = await sql`
//           SELECT 
//             t.id,
//             t.name,
//             t.slug,
//             t.color,
//             t.icon,
//             t.is_featured,
//             t.is_trending,
//             t.usage_count
//           FROM tags t
//           JOIN course_tags ct ON t.id = ct.tag_id
//           WHERE ct.course_id = ${course.id}
//         `;
//         course.tags = tags || [];
//       }
//     }

//     return courses as Course[];
//   } catch (error) {
//     console.error('❌ Error fetching trending flagged courses:', error);
//     return [];
//   }
// }

// /**
//  * Simplified trending courses query (alternative)
//  */
// export async function getSimpleTrendingCourses(limit: number = 5): Promise<Course[]> {
//   try {
//     const courses = await sql`
//       SELECT 
//         c.id,
//         c.slug,
//         c.title,
//         c.subtitle,
//         c.short_description,
//         c.thumbnail_url,
//         c.instructor_id,
//         c.category_id,
//         c.price_cents,
//         c.is_published,
//         c.is_featured,
//         c.is_trending,
//         c.enrolled_students_count,
//         -- Get rating from course_reviews table, fallback to course.average_rating
//         COALESCE(
//           (SELECT AVG(rating) 
//            FROM course_reviews cr 
//            WHERE cr.course_id = c.id 
//            AND cr.status = 'approved'
//            AND cr.rating > 0),
//           c.average_rating,
//           0
//         ) as average_rating,
//         -- Get review count
//         (SELECT COUNT(*) 
//          FROM course_reviews cr 
//          WHERE cr.course_id = c.id 
//          AND cr.status = 'approved') as review_count,
//         c.total_views,
//         c.total_video_duration,
//         c.like_count,
//         c.share_count,
//         c.created_at,
//         u.name as instructor_name,
//         u.image as instructor_image,
//         cat.name as category_name,
//         -- Simple trending score calculation with proper rating
//         (
//           COALESCE(c.enrolled_students_count, 0) * 2 +
//           COALESCE(
//             (SELECT AVG(rating) 
//              FROM course_reviews cr 
//              WHERE cr.course_id = c.id 
//              AND cr.status = 'approved'
//              AND cr.rating > 0),
//             c.average_rating,
//             0
//           ) * 10 +
//           COALESCE(
//             (SELECT COUNT(*) 
//              FROM course_reviews cr 
//              WHERE cr.course_id = c.id 
//              AND cr.status = 'approved')
//             , 0) * 0.5 +
//           COALESCE(c.like_count, 0)
//         ) as trending_score
//       FROM courses c
//       LEFT JOIN users u ON c.instructor_id = u.id
//       LEFT JOIN categories cat ON c.category_id = cat.id
//       WHERE c.is_published = true
//       ORDER BY trending_score DESC, c.created_at DESC
//       LIMIT ${limit}
//     `;

//     // Get tags for each course
//     const coursesWithTags = await Promise.all(
//       courses.map(async (course: any) => {
//         const tags = await sql`
//           SELECT 
//             t.name,
//             t.slug,
//             t.color
//           FROM tags t
//           JOIN course_tags ct ON t.id = ct.tag_id
//           WHERE ct.course_id = ${course.id}
//           LIMIT 3
//         `;
        
//         return {
//           ...course,
//           tags: tags.map((tag: any, index: number) => ({
//             id: `tag-${index}`,
//             name: tag.name,
//             slug: tag.slug,
//             color: tag.color || '#3B82F6'
//           }))
//         };
//       })
//     );

//     return coursesWithTags as Course[];
//   } catch (error) {
//     console.error('❌ Error fetching simple trending courses:', error);
//     return [];
//   }
// }





// // Add this to your trending-courses.ts or create a new helper file
// export async function calculateCourseRatingFromReviews(courseId: string): Promise<number> {
//   try {
//     const result = await sql`
//       SELECT 
//         AVG(rating) as average_rating,
//         COUNT(*) as review_count
//       FROM course_reviews 
//       WHERE course_id = ${courseId} 
//         AND status = 'approved'
//         AND rating > 0
//     `;
    
//     const rating = result[0]?.average_rating || 0;
//     return rating;
//   } catch (error) {
//     console.error('Error calculating rating from reviews:', error);
//     return 0;
//   }
// }

// export async function getCourseLikesAndShares(courseId: string): Promise<{like_count: number, share_count: number}> {
//   try {
//     const result = await sql`
//       SELECT 
//         COALESCE(like_count, 0) as like_count,
//         COALESCE(share_count, 0) as share_count
//       FROM courses 
//       WHERE id = ${courseId}
//     `;
    
//     return {
//       like_count: result[0]?.like_count || 0,
//       share_count: result[0]?.share_count || 0
//     };
//   } catch (error) {
//     console.error('Error fetching likes and shares:', error);
//     return { like_count: 0, share_count: 0 };
//   }
// }




















// import { sql } from '../index';
// import { Course } from '@/types/courses';

// /**
//  * Get trending courses based on engagement metrics
//  */
// export async function getTrendingCourses(limit: number = 5): Promise<Course[]> {
//   try {
//     console.log('=== FETCHING TRENDING COURSES ===');
    
//     const trendingCourses = await sql`
//       SELECT 
//         c.id,
//         c.slug,
//         c.title,
//         c.subtitle,
//         c.short_description,
//         c.description_html,
//         c.instructor_id,
//         c.category_id,
//         c.difficulty_level,
//         c.language,
//         c.content_type,
//         c.thumbnail_url,
//         c.promo_video_url,
//         c.price_cents,
//         c.currency,
//         c.discount_percent,
//         c.original_price_cents,
//         c.has_free_trial,
//         c.trial_duration_days,
//         c.is_published,
//         c.is_featured,
//         c.is_trending,
//         c.is_bestseller,
//         c.is_new,
//         c.certificate_available,
//         c.has_lifetime_access,
//         c.allow_downloads,
//         c.has_captions,
//         c.has_transcripts,
//         c.start_date,
//         c.end_date,
//         c.enrollment_capacity,
//         c.requires_approval,
//         c.approval_message,
//         c.access_type,
//         c.total_video_duration,
//         c.total_lessons,
//         c.total_quizzes,
//         c.total_assignments,
//         c.total_downloads,
//         c.total_articles,
//         c.enrolled_students_count,
//         c.active_students_count,
//         c.completed_students_count,
        
//         -- Use calculated rating from reviews - FIXED with proper COALESCE
//         COALESCE(
//           (SELECT AVG(rating) 
//            FROM course_reviews cr 
//            WHERE cr.course_id = c.id 
//            AND cr.status = 'approved'
//            AND cr.rating > 0),
//           c.average_rating,
//           0
//         ) as average_rating,
        
//         -- Get review count from reviews table - FIXED with COALESCE
//         COALESCE(
//           (SELECT COUNT(*) 
//            FROM course_reviews cr 
//            WHERE cr.course_id = c.id 
//            AND cr.status = 'approved'),
//           0
//         ) as review_count,
        
//         c.total_views,
//         c.completion_rate,
//         c.engagement_score,
//         COALESCE(c.like_count, 0) as like_count,
//         COALESCE(c.share_count, 0) as share_count,
//         c.favorite_count,
//         c.meta_title,
//         c.meta_description,
//         c.search_keywords,
//         c.published_at,
//         c.featured_at,
//         c.trending_at,
//         c.created_at,
//         c.updated_at,
//         u.name as instructor_name,
//         u.email as instructor_email,
//         u.image as instructor_image,
//         u.bio as instructor_bio,
//         cat.name as category_name,
//         cat.slug as category_slug,
//         ARRAY_AGG(DISTINCT t.name) as tag_names,
        
//         -- Calculate trending score with proper rating
//         (
//           (COALESCE(c.enrolled_students_count, 0) * 0.3) + 
//           (COALESCE(
//             (SELECT AVG(rating) 
//              FROM course_reviews cr 
//              WHERE cr.course_id = c.id 
//              AND cr.status = 'approved'
//              AND cr.rating > 0),
//             c.average_rating,
//             0
//           ) * 20) + 
//           (COALESCE(
//             (SELECT COUNT(*) 
//              FROM course_reviews cr 
//              WHERE cr.course_id = c.id 
//              AND cr.status = 'approved')
//             , 0) * 0.1) + 
//           (COALESCE(c.total_views, 0) * 0.05) +
//           (COALESCE(c.like_count, 0) * 0.2) +
//           (COALESCE(c.share_count, 0) * 0.15) +
//           (CASE WHEN c.is_featured THEN 10 ELSE 0 END) +
//           (EXTRACT(EPOCH FROM (NOW() - c.created_at)) / 86400 * -0.1)
//         ) as trending_score
//       FROM courses c
//       LEFT JOIN users u ON c.instructor_id = u.id
//       LEFT JOIN categories cat ON c.category_id = cat.id
//       LEFT JOIN course_tags ct ON c.id = ct.course_id
//       LEFT JOIN tags t ON ct.tag_id = t.id
//       WHERE c.is_published = true
//       GROUP BY 
//         c.id, 
//         u.id, 
//         cat.id
//       ORDER BY trending_score DESC
//       LIMIT ${limit}
//     `;

//     // Log the data for debugging
//     console.log('=== TRENDING COURSES DATA ===');
//     trendingCourses.forEach((course: any, index: number) => {
//       console.log(`${index + 1}. ${course.title}`);
//       console.log(`   Rating: ${course.average_rating} (type: ${typeof course.average_rating})`);
//       console.log(`   Review count: ${course.review_count}`);
//       console.log(`   Likes: ${course.like_count}`);
//       console.log(`   Shares: ${course.share_count}`);
//     });

//     // Transform the data to match Course interface with proper number parsing
//     const courses = trendingCourses.map((course: any) => ({
//       ...course,
//       average_rating: parseFloat(course.average_rating),
//       review_count: parseInt(course.review_count),
//       like_count: parseInt(course.like_count),
//       share_count: parseInt(course.share_count),
//       enrolled_students_count: parseInt(course.enrolled_students_count),
//       total_views: parseInt(course.total_views),
//       tags: course.tag_names?.filter(Boolean).map((name: string, index: number) => ({
//         id: `tag-${index}`,
//         name,
//         slug: name.toLowerCase().replace(/\s+/g, '-'),
//         color: '#3B82F6',
//         is_featured: false,
//         is_trending: true,
//         usage_count: 0
//       })) || []
//     }));

//     return courses as Course[];
//   } catch (error) {
//     console.error('❌ Error fetching trending courses:', 
//       error instanceof Error ? error.message : String(error)
//     );
//     return [];
//   }
// }

// /**
//  * Get courses marked as trending in the database
//  */
// export async function getTrendingFlaggedCourses(limit: number = 5): Promise<Course[]> {
//   try {
//     console.log('=== FETCHING TRENDING FLAGGED COURSES ===');
    
//     const courses = await sql`
//       SELECT 
//         c.id,
//         c.slug,
//         c.title,
//         c.subtitle,
//         c.short_description,
//         c.instructor_id,
//         c.category_id,
//         c.thumbnail_url,
//         c.price_cents,
//         c.is_published,
//         c.is_featured,
//         c.is_trending,
//         c.enrolled_students_count,
        
//         -- Use calculated rating from reviews
//         COALESCE(
//           (SELECT AVG(rating) 
//            FROM course_reviews cr 
//            WHERE cr.course_id = c.id 
//            AND cr.status = 'approved'
//            AND cr.rating > 0),
//           c.average_rating,
//           0
//         ) as average_rating,
        
//         -- Get review count from reviews table
//         COALESCE(
//           (SELECT COUNT(*) 
//            FROM course_reviews cr 
//            WHERE cr.course_id = c.id 
//            AND cr.status = 'approved'),
//           0
//         ) as review_count,
        
//         c.total_views,
//         c.total_video_duration,
//         COALESCE(c.like_count, 0) as like_count,
//         COALESCE(c.share_count, 0) as share_count,
//         c.favorite_count,
//         c.created_at,
//         c.trending_at,
//         u.name as instructor_name,
//         u.email as instructor_email,
//         u.image as instructor_image,
//         cat.name as category_name,
//         cat.slug as category_slug
//       FROM courses c
//       LEFT JOIN users u ON c.instructor_id = u.id
//       LEFT JOIN categories cat ON c.category_id = cat.id
//       WHERE c.is_published = true 
//         AND (c.is_trending = true OR c.is_featured = true)
//       ORDER BY 
//         COALESCE(c.trending_at, c.created_at) DESC,
//         COALESCE(c.enrolled_students_count, 0) DESC
//       LIMIT ${limit}
//     `;

//     // Log the data for debugging
//     console.log('=== TRENDING FLAGGED COURSES DATA ===');
//     courses.forEach((course: any, index: number) => {
//       console.log(`${index + 1}. ${course.title}`);
//       console.log(`   Rating: ${course.average_rating}`);
//       console.log(`   Review count: ${course.review_count}`);
//       console.log(`   Likes: ${course.like_count}`);
//       console.log(`   Shares: ${course.share_count}`);
//     });

//     // Get tags for each course
//     for (const course of courses) {
//       if (course.id) {
//         const tags = await sql`
//           SELECT 
//             t.id,
//             t.name,
//             t.slug,
//             t.color,
//             t.icon,
//             t.is_featured,
//             t.is_trending,
//             t.usage_count
//           FROM tags t
//           JOIN course_tags ct ON t.id = ct.tag_id
//           WHERE ct.course_id = ${course.id}
//         `;
//         course.tags = tags || [];
//       }
//     }

//     // Convert numbers to proper types
//     const typedCourses = courses.map((course: any) => ({
//       ...course,
//       average_rating: parseFloat(course.average_rating),
//       review_count: parseInt(course.review_count),
//       like_count: parseInt(course.like_count),
//       share_count: parseInt(course.share_count),
//       enrolled_students_count: parseInt(course.enrolled_students_count),
//       total_views: parseInt(course.total_views),
//     }));

//     return typedCourses as Course[];
//   } catch (error) {
//     console.error('❌ Error fetching trending flagged courses:', 
//       error instanceof Error ? error.message : String(error)
//     );
//     return [];
//   }
// }

// /**
//  * Simplified trending courses query (alternative) - UPDATED WITH FIXES
//  */
// export async function getSimpleTrendingCourses(limit: number = 5): Promise<Course[]> {
//   try {
//     console.log('=== FETCHING SIMPLE TRENDING COURSES ===');
    
//     const courses = await sql`
//       SELECT 
//         c.id,
//         c.slug,
//         c.title,
//         c.subtitle,
//         c.short_description,
//         c.thumbnail_url,
//         c.instructor_id,
//         c.category_id,
//         c.price_cents,
//         c.is_published,
//         c.is_featured,
//         c.is_trending,
//         c.enrolled_students_count,
        
//         -- Get rating from course_reviews table, fallback to course.average_rating
//         COALESCE(
//           (SELECT AVG(rating) 
//            FROM course_reviews cr 
//            WHERE cr.course_id = c.id 
//            AND cr.status = 'approved'
//            AND cr.rating > 0),
//           c.average_rating,
//           0
//         ) as average_rating,
        
//         -- Get review count
//         COALESCE(
//           (SELECT COUNT(*) 
//            FROM course_reviews cr 
//            WHERE cr.course_id = c.id 
//            AND cr.status = 'approved'),
//           0
//         ) as review_count,
        
//         c.total_views,
//         c.total_video_duration,
//         COALESCE(c.like_count, 0) as like_count,
//         COALESCE(c.share_count, 0) as share_count,
//         c.created_at,
//         u.name as instructor_name,
//         u.image as instructor_image,
//         cat.name as category_name,
        
//         -- Simple trending score calculation with proper rating
//         (
//           COALESCE(c.enrolled_students_count, 0) * 2 +
//           COALESCE(
//             (SELECT AVG(rating) 
//              FROM course_reviews cr 
//              WHERE cr.course_id = c.id 
//              AND cr.status = 'approved'
//              AND cr.rating > 0),
//             c.average_rating,
//             0
//           ) * 10 +
//           COALESCE(
//             (SELECT COUNT(*) 
//              FROM course_reviews cr 
//              WHERE cr.course_id = c.id 
//              AND cr.status = 'approved')
//             , 0) * 0.5 +
//           COALESCE(c.like_count, 0)
//         ) as trending_score
//       FROM courses c
//       LEFT JOIN users u ON c.instructor_id = u.id
//       LEFT JOIN categories cat ON c.category_id = cat.id
//       WHERE c.is_published = true
//       ORDER BY trending_score DESC, c.created_at DESC
//       LIMIT ${limit}
//     `;

//     // Log the raw data for debugging
//     console.log('=== RAW SIMPLE TRENDING COURSES DATA ===');
//     courses.forEach((course: any, index: number) => {
//       console.log(`${index + 1}. ${course.title}`);
//       console.log(`   Raw Rating: ${course.average_rating} (type: ${typeof course.average_rating})`);
//       console.log(`   Raw Review count: ${course.review_count}`);
//       console.log(`   Raw Likes: ${course.like_count}`);
//       console.log(`   Raw Shares: ${course.share_count}`);
//       console.log(`   Raw Students: ${course.enrolled_students_count}`);
//     });

//     // Get tags for each course
//     const coursesWithTags = await Promise.all(
//       courses.map(async (course: any) => {
//         const tags = await sql`
//           SELECT 
//             t.name,
//             t.slug,
//             t.color
//           FROM tags t
//           JOIN course_tags ct ON t.id = ct.tag_id
//           WHERE ct.course_id = ${course.id}
//           LIMIT 3
//         `;
        
//         // Parse all numbers to ensure they're proper types
//         const parsedCourse = {
//           ...course,
//           average_rating: parseFloat(course.average_rating) || 0,
//           review_count: parseInt(course.review_count) || 0,
//           like_count: parseInt(course.like_count) || 0,
//           share_count: parseInt(course.share_count) || 0,
//           enrolled_students_count: parseInt(course.enrolled_students_count) || 0,
//           total_views: parseInt(course.total_views) || 0,
//           price_cents: parseInt(course.price_cents) || 0,
//           total_video_duration: parseInt(course.total_video_duration) || 0,
//           tags: tags.map((tag: any, index: number) => ({
//             id: `tag-${index}`,
//             name: tag.name,
//             slug: tag.slug,
//             color: tag.color || '#3B82F6'
//           }))
//         };
        
//         return parsedCourse;
//       })
//     );

//     // Log the final parsed data
//     console.log('=== PARSED SIMPLE TRENDING COURSES DATA ===');
//     coursesWithTags.forEach((course: any, index: number) => {
//       console.log(`${index + 1}. ${course.title}`);
//       console.log(`   Parsed Rating: ${course.average_rating} (type: ${typeof course.average_rating})`);
//       console.log(`   Parsed Review count: ${course.review_count} (type: ${typeof course.review_count})`);
//       console.log(`   Parsed Likes: ${course.like_count} (type: ${typeof course.like_count})`);
//       console.log(`   Parsed Shares: ${course.share_count} (type: ${typeof course.share_count})`);
//     });

//     return coursesWithTags as Course[];
//   } catch (error) {
//     console.error('❌ Error fetching simple trending courses:', 
//       error instanceof Error ? error.message : String(error)
//     );
//     return [];
//   }
// }

// /**
//  * Calculate course rating from reviews (helper function)
//  */
// export async function calculateCourseRatingFromReviews(courseId: string): Promise<{ average_rating: number; review_count: number }> {
//   try {
//     console.log(`Calculating rating for course: ${courseId}`);
    
//     const result = await sql`
//       SELECT 
//         COALESCE(AVG(rating), 0) as average_rating,
//         COALESCE(COUNT(*), 0) as review_count
//       FROM course_reviews 
//       WHERE course_id = ${courseId} 
//         AND status = 'approved'
//         AND rating > 0
//     `;
    
//     const rating = parseFloat(result[0]?.average_rating) || 0;
//     const count = parseInt(result[0]?.review_count) || 0;
    
//     console.log(`Course ${courseId}: Rating = ${rating}, Reviews = ${count}`);
    
//     return {
//       average_rating: rating,
//       review_count: count
//     };
//   } catch (error) {
//     console.error('Error calculating rating from reviews:', 
//       error instanceof Error ? error.message : String(error)
//     );
//     return { average_rating: 0, review_count: 0 };
//   }
// }

// /**
//  * Get course likes and shares (helper function)
//  */
// export async function getCourseLikesAndShares(courseId: string): Promise<{like_count: number, share_count: number}> {
//   try {
//     const result = await sql`
//       SELECT 
//         COALESCE(like_count, 0) as like_count,
//         COALESCE(share_count, 0) as share_count
//       FROM courses 
//       WHERE id = ${courseId}
//     `;
    
//     return {
//       like_count: parseInt(result[0]?.like_count) || 0,
//       share_count: parseInt(result[0]?.share_count) || 0
//     };
//   } catch (error) {
//     console.error('Error fetching likes and shares:', 
//       error instanceof Error ? error.message : String(error)
//     );
//     return { like_count: 0, share_count: 0 };
//   }
// }

// /**
//  * Get trending courses with detailed analytics - NEW FUNCTION
//  */
// export async function getTrendingCoursesWithAnalytics(limit: number = 5): Promise<Course[]> {
//   try {
//     // First get the trending courses
//     const courses = await getSimpleTrendingCourses(limit);
    
//     // Enhance each course with additional analytics
//     const enhancedCourses = await Promise.all(
//       courses.map(async (course) => {
//         // Get additional review stats if needed
//         if (!course.average_rating || course.average_rating === 0) {
//           const reviewStats = await calculateCourseRatingFromReviews(course.id);
//           return {
//             ...course,
//             average_rating: reviewStats.average_rating,
//             review_count: reviewStats.review_count
//           };
//         }
//         return course;
//       })
//     );
    
//     return enhancedCourses;
//   } catch (error) {
//     console.error('Error fetching trending courses with analytics:', 
//       error instanceof Error ? error.message : String(error)
//     );
//     return [];
//   }
// }

// /**
//  * Debug function to check course reviews data
//  */
// export async function debugCourseReviews(courseId: string): Promise<any> {
//   try {
//     console.log(`=== DEBUG COURSE REVIEWS FOR ${courseId} ===`);
    
//     // Check if course exists
//     const courseExists = await sql`
//       SELECT id, title, average_rating FROM courses WHERE id = ${courseId}
//     `;
//     console.log('Course exists:', courseExists[0]);
    
//     // Check reviews in course_reviews table
//     const reviews = await sql`
//       SELECT 
//         id, 
//         rating, 
//         status, 
//         created_at 
//       FROM course_reviews 
//       WHERE course_id = ${courseId}
//       ORDER BY created_at DESC
//       LIMIT 10
//     `;
//     console.log('Reviews in course_reviews table:', reviews);
    
//     // Check approved reviews with rating > 0
//     const approvedReviews = await sql`
//       SELECT 
//         COUNT(*) as total_approved,
//         AVG(rating) as avg_rating
//       FROM course_reviews 
//       WHERE course_id = ${courseId}
//         AND status = 'approved'
//         AND rating > 0
//     `;
//     console.log('Approved reviews stats:', approvedReviews[0]);
    
//     return {
//       course: courseExists[0],
//       reviews: reviews,
//       approvedStats: approvedReviews[0]
//     };
//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : String(error);
//     console.error('Debug error:', errorMessage);
//     return { error: errorMessage };
//   }
// }
































import { sql } from '../index';
import { Course } from '@/types/courses';

/**
 * Simplified trending courses query - FINAL FIXED VERSION
 * Now handles NULL status reviews
 */
export async function getSimpleTrendingCourses(limit: number = 5): Promise<Course[]> {
  try {
    console.log('=== FETCHING SIMPLE TRENDING COURSES (FIXED) ===');
    
    const courses = await sql`
      SELECT 
        c.id,
        c.slug,
        c.title,
        c.subtitle,
        c.short_description,
        c.thumbnail_url,
        c.instructor_id,
        c.category_id,
        c.price_cents,
        c.is_published,
        c.is_featured,
        c.is_trending,
        c.enrolled_students_count,
        
        -- Get rating from course_reviews table - FIXED: Include NULL status reviews
        COALESCE(
          (SELECT AVG(rating) 
           FROM course_reviews cr 
           WHERE cr.course_id = c.id 
           AND cr.rating > 0),  -- Removed status check entirely
          c.average_rating,
          0
        ) as average_rating,
        
        -- Get review count - FIXED: Include NULL status reviews
        COALESCE(
          (SELECT COUNT(*) 
           FROM course_reviews cr 
           WHERE cr.course_id = c.id 
           AND cr.rating > 0),  -- Removed status check entirely
          0
        ) as review_count,
        
        c.total_views,
        c.total_video_duration,
        COALESCE(c.like_count, 0) as like_count,
        COALESCE(c.share_count, 0) as share_count,
        c.created_at,
        u.name as instructor_name,
        u.image as instructor_image,
        cat.name as category_name,
        
        -- Simple trending score calculation
        (
          COALESCE(c.enrolled_students_count, 0) * 2 +
          COALESCE(
            (SELECT AVG(rating) 
             FROM course_reviews cr 
             WHERE cr.course_id = c.id 
             AND cr.rating > 0),  -- Removed status check
            c.average_rating,
            0
          ) * 10 +
          COALESCE(
            (SELECT COUNT(*) 
             FROM course_reviews cr 
             WHERE cr.course_id = c.id 
             AND cr.rating > 0)  -- Removed status check
            , 0) * 0.5 +
          COALESCE(c.like_count, 0)
        ) as trending_score
      FROM courses c
      LEFT JOIN users u ON c.instructor_id = u.id
      LEFT JOIN categories cat ON c.category_id = cat.id
      WHERE c.is_published = true
      ORDER BY trending_score DESC, c.created_at DESC
      LIMIT ${limit}
    `;

    // Log the raw data for debugging
    console.log('=== RAW TRENDING COURSES DATA (WITH REVIEWS) ===');
    courses.forEach((course: any, index: number) => {
      console.log(`${index + 1}. ${course.title}`);
      console.log(`   Raw Rating: ${course.average_rating}`);
      console.log(`   Raw Review count: ${course.review_count}`);
      console.log(`   Raw Likes: ${course.like_count}`);
      console.log(`   Raw Shares: ${course.share_count}`);
      console.log(`   Raw Students: ${course.enrolled_students_count}`);
      
      // Debug: Check reviews for this specific course
      checkCourseReviews(course.id).then(reviewData => {
        console.log(`   Reviews for ${course.title}:`, reviewData);
      });
    });

    // Get tags for each course
    const coursesWithTags = await Promise.all(
      courses.map(async (course: any) => {
        const tags = await sql`
          SELECT 
            t.name,
            t.slug,
            t.color
          FROM tags t
          JOIN course_tags ct ON t.id = ct.tag_id
          WHERE ct.course_id = ${course.id}
          LIMIT 3
        `;
        
        // Parse all numbers to ensure they're proper types
        const parsedCourse = {
          ...course,
          average_rating: parseFloat(course.average_rating) || 0,
          review_count: parseInt(course.review_count) || 0,
          like_count: parseInt(course.like_count) || 0,
          share_count: parseInt(course.share_count) || 0,
          enrolled_students_count: parseInt(course.enrolled_students_count) || 0,
          total_views: parseInt(course.total_views) || 0,
          price_cents: parseInt(course.price_cents) || 0,
          total_video_duration: parseInt(course.total_video_duration) || 0,
          tags: tags.map((tag: any, index: number) => ({
            id: `tag-${index}`,
            name: tag.name,
            slug: tag.slug,
            color: tag.color || '#3B82F6'
          }))
        };
        
        return parsedCourse;
      })
    );

    // Log the final parsed data
    console.log('=== FINAL PARSED TRENDING COURSES ===');
    coursesWithTags.forEach((course: any, index: number) => {
      console.log(`${index + 1}. ${course.title}`);
      console.log(`   Final Rating: ${course.average_rating} (type: ${typeof course.average_rating})`);
      console.log(`   Final Review count: ${course.review_count} (type: ${typeof course.review_count})`);
      console.log(`   Final Likes: ${course.like_count}`);
      console.log(`   Final Shares: ${course.share_count}`);
    });

    return coursesWithTags as Course[];
  } catch (error) {
    console.error('❌ Error fetching simple trending courses:', 
      error instanceof Error ? error.message : String(error)
    );
    return [];
  }
}

/**
 * Helper function to check reviews for a specific course
 */
async function checkCourseReviews(courseId: string): Promise<any> {
  try {
    const reviews = await sql`
      SELECT 
        id, 
        rating, 
        status,
        title
      FROM course_reviews 
      WHERE course_id = ${courseId}
      AND rating > 0
    `;
    
    return {
      count: reviews.length,
      reviews: reviews,
      average: reviews.length > 0 ? 
        reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length : 0
    };
  } catch (error) {
    console.error(`Error checking reviews for course ${courseId}:`, 
      error instanceof Error ? error.message : String(error)
    );
    return { count: 0, reviews: [], average: 0 };
  }
}

/**
 * Get trending courses based on engagement metrics - FIXED VERSION
 */
export async function getTrendingCourses(limit: number = 5): Promise<Course[]> {
  try {
    console.log('=== FETCHING TRENDING COURSES (FIXED) ===');
    
    const trendingCourses = await sql`
      SELECT 
        c.id,
        c.slug,
        c.title,
        c.subtitle,
        c.short_description,
        c.description_html,
        c.instructor_id,
        c.category_id,
        c.difficulty_level,
        c.language,
        c.content_type,
        c.thumbnail_url,
        c.promo_video_url,
        c.price_cents,
        c.currency,
        c.discount_percent,
        c.original_price_cents,
        c.has_free_trial,
        c.trial_duration_days,
        c.is_published,
        c.is_featured,
        c.is_trending,
        c.is_bestseller,
        c.is_new,
        c.certificate_available,
        c.has_lifetime_access,
        c.allow_downloads,
        c.has_captions,
        c.has_transcripts,
        c.start_date,
        c.end_date,
        c.enrollment_capacity,
        c.requires_approval,
        c.approval_message,
        c.access_type,
        c.total_video_duration,
        c.total_lessons,
        c.total_quizzes,
        c.total_assignments,
        c.total_downloads,
        c.total_articles,
        c.enrolled_students_count,
        c.active_students_count,
        c.completed_students_count,
        
        -- FIXED: Use ALL reviews (including NULL status)
        COALESCE(
          (SELECT AVG(rating) 
           FROM course_reviews cr 
           WHERE cr.course_id = c.id 
           AND cr.rating > 0),  -- Only check rating > 0, not status
          c.average_rating,
          0
        ) as average_rating,
        
        -- FIXED: Count ALL reviews
        COALESCE(
          (SELECT COUNT(*) 
           FROM course_reviews cr 
           WHERE cr.course_id = c.id 
           AND cr.rating > 0),  -- Only check rating > 0, not status
          0
        ) as review_count,
        
        c.total_views,
        c.completion_rate,
        c.engagement_score,
        COALESCE(c.like_count, 0) as like_count,
        COALESCE(c.share_count, 0) as share_count,
        c.favorite_count,
        c.meta_title,
        c.meta_description,
        c.search_keywords,
        c.published_at,
        c.featured_at,
        c.trending_at,
        c.created_at,
        c.updated_at,
        u.name as instructor_name,
        u.email as instructor_email,
        u.image as instructor_image,
        u.bio as instructor_bio,
        cat.name as category_name,
        cat.slug as category_slug,
        ARRAY_AGG(DISTINCT t.name) as tag_names,
        
        -- Calculate trending score with proper rating
        (
          (COALESCE(c.enrolled_students_count, 0) * 0.3) + 
          (COALESCE(
            (SELECT AVG(rating) 
             FROM course_reviews cr 
             WHERE cr.course_id = c.id 
             AND cr.rating > 0),  -- No status check
            c.average_rating,
            0
          ) * 20) + 
          (COALESCE(
            (SELECT COUNT(*) 
             FROM course_reviews cr 
             WHERE cr.course_id = c.id 
             AND cr.rating > 0)  -- No status check
            , 0) * 0.1) + 
          (COALESCE(c.total_views, 0) * 0.05) +
          (COALESCE(c.like_count, 0) * 0.2) +
          (COALESCE(c.share_count, 0) * 0.15) +
          (CASE WHEN c.is_featured THEN 10 ELSE 0 END) +
          (EXTRACT(EPOCH FROM (NOW() - c.created_at)) / 86400 * -0.1)
        ) as trending_score
      FROM courses c
      LEFT JOIN users u ON c.instructor_id = u.id
      LEFT JOIN categories cat ON c.category_id = cat.id
      LEFT JOIN course_tags ct ON c.id = ct.course_id
      LEFT JOIN tags t ON ct.tag_id = t.id
      WHERE c.is_published = true
      GROUP BY 
        c.id, 
        u.id, 
        cat.id
      ORDER BY trending_score DESC
      LIMIT ${limit}
    `;

    // Log the data for debugging
    console.log('=== TRENDING COURSES WITH REVIEWS ===');
    trendingCourses.forEach((course: any, index: number) => {
      console.log(`${index + 1}. ${course.title}`);
      console.log(`   Rating from reviews: ${course.average_rating}`);
      console.log(`   Review count: ${course.review_count}`);
      console.log(`   Likes: ${course.like_count}`);
      console.log(`   Shares: ${course.share_count}`);
    });

    // Transform the data to match Course interface with proper number parsing
    const courses = trendingCourses.map((course: any) => ({
      ...course,
      average_rating: parseFloat(course.average_rating),
      review_count: parseInt(course.review_count),
      like_count: parseInt(course.like_count),
      share_count: parseInt(course.share_count),
      enrolled_students_count: parseInt(course.enrolled_students_count),
      total_views: parseInt(course.total_views),
      tags: course.tag_names?.filter(Boolean).map((name: string, index: number) => ({
        id: `tag-${index}`,
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        color: '#3B82F6',
        is_featured: false,
        is_trending: true,
        usage_count: 0
      })) || []
    }));

    return courses as Course[];
  } catch (error) {
    console.error('❌ Error fetching trending courses:', 
      error instanceof Error ? error.message : String(error)
    );
    return [];
  }
}

/**
 * Calculate course rating from reviews - SIMPLIFIED VERSION
 */
export async function calculateCourseRatingFromReviews(courseId: string): Promise<{ average_rating: number; review_count: number }> {
  try {
    console.log(`Calculating rating for course: ${courseId}`);
    
    // Simple query: get ALL reviews with rating > 0
    const result = await sql`
      SELECT 
        COALESCE(AVG(rating), 0) as average_rating,
        COALESCE(COUNT(*), 0) as review_count
      FROM course_reviews 
      WHERE course_id = ${courseId} 
        AND rating > 0  -- Only check rating, not status
    `;
    
    const rating = parseFloat(result[0]?.average_rating) || 0;
    const count = parseInt(result[0]?.review_count) || 0;
    
    console.log(`Course ${courseId}: Rating = ${rating}, Reviews = ${count}`);
    
    return {
      average_rating: rating,
      review_count: count
    };
  } catch (error) {
    console.error('Error calculating rating from reviews:', 
      error instanceof Error ? error.message : String(error)
    );
    return { average_rating: 0, review_count: 0 };
  }
}

/**
 * Get trending courses with guaranteed data - MAIN FUNCTION TO USE
 */
export async function getTrendingCoursesWithReviews(limit: number = 5): Promise<Course[]> {
  try {
    // Use the fixed simple trending courses query
    const courses = await getSimpleTrendingCourses(limit);
    
    // Log what we got
    console.log('=== FINAL TRENDING COURSES FOR DISPLAY ===');
    courses.forEach((course, index) => {
      console.log(`${index + 1}. ${course.title}`);
      console.log(`   Display Rating: ${course.average_rating}`);
      console.log(`   Display Review count: ${course.review_count}`);
      console.log(`   Display Likes: ${course.like_count}`);
      console.log(`   Display Shares: ${course.share_count}`);
    });
    
    return courses;
  } catch (error) {
    console.error('Error in getTrendingCoursesWithReviews:', 
      error instanceof Error ? error.message : String(error)
    );
    return [];
  }
}