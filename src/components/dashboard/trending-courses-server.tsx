
// /components/dashboard/trending-courses-server.tsx

import { getTrendingCoursesAction } from '@/lib/courses/actions';
import { TrendingCoursesList } from '@/components/courses/trending-courses-list';

interface TrendingCoursesServerProps {
  limit?: number;
  variant?: 'default' | 'compact' | 'grid';
  title?: string;
  description?: string;
}

export async function TrendingCoursesServer({
  limit = 5,
  variant = 'compact',
  title = "Trending Courses",
  description = "Courses gaining popularity based on student engagement"
}: TrendingCoursesServerProps) {
  const result = await getTrendingCoursesAction({
    limit,
    useAlgorithm: true
  });

  return (
    <TrendingCoursesList
      courses={result.courses || []}
      title={title}
      description={description}
      variant={variant}
      showViewAll={true}
    />
  );
}