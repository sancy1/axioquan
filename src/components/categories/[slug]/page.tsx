// // /app/categories/[slug]/page.tsx

// import { getCategoryBySlugAction } from '@/lib/categories/actions';
// import { getCoursesAction } from '@/lib/courses/actions';
// import { getTagsAction } from '@/lib/tags/actions';
// import { CategoryCoursesClient } from '@/components/categories/category-courses-client';
// import { notFound } from 'next/navigation';

// interface CategoryPageProps {
//   params: Promise<{
//     slug: string;
//   }>;
//   searchParams: Promise<{
//     search?: string;
//     difficulty?: string;
//     content_type?: string;
//     price_range?: string;
//     min_rating?: string;
//     sort_by?: string;
//   }>;
// }

// export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
//   const { slug } = await params;
//   const resolvedSearchParams = await searchParams;
  
//   // Fetch category data
//   const categoryResult = await getCategoryBySlugAction(slug);
  
//   if (!categoryResult.success || !categoryResult.category) {
//     notFound();
//   }

//   const category = categoryResult.category;

//   // Fetch initial courses for this category
//   const coursesResult = await getCoursesAction({
//     is_published: true,
//     category_slug: slug,
//     limit: 50
//   });

//   const tagsResult = await getTagsAction();

//   const initialCourses = coursesResult.courses || [];
//   const availableTags = tagsResult.tags || [];

//   return (
//     <CategoryCoursesClient 
//       category={category}
//       initialCourses={initialCourses}
//       availableTags={availableTags}
//       searchParams={resolvedSearchParams}
//     />
//   );
// }


























// // /app/categories/[slug]/page.tsx

// import { getCategoryBySlugAction } from '@/lib/categories/actions';
// import { getCoursesAction } from '@/lib/courses/actions';
// import { getTagsAction } from '@/lib/tags/actions';
// import { CategoryCoursesClient } from '@/components/categories/category-courses-client';
// import { Header } from '@/components/layout/header';
// import { Footer } from '@/components/layout/footer';
// import { notFound } from 'next/navigation';

// interface CategoryPageProps {
//   params: Promise<{
//     slug: string;
//   }>;
//   searchParams: Promise<{
//     search?: string;
//     difficulty?: string;
//     content_type?: string;
//     price_range?: string;
//     min_rating?: string;
//     sort_by?: string;
//   }>;
// }

// export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
//   const { slug } = await params;
//   const resolvedSearchParams = await searchParams;
  
//   // Fetch category data
//   const categoryResult = await getCategoryBySlugAction(slug);
  
//   if (!categoryResult.success || !categoryResult.category) {
//     notFound();
//   }

//   const category = categoryResult.category;

//   // IMPORTANT: Fetch initial courses for this category WITH reviews
//   const coursesResult = await getCoursesAction({
//     is_published: true,
//     category_slug: slug,
//     limit: 50,
//     include_reviews: true  // THIS IS THE KEY DIFFERENCE
//   });

//   const tagsResult = await getTagsAction();

//   const initialCourses = coursesResult.courses || [];
//   const availableTags = tagsResult.tags || [];

//   // Debug logging on server side
//   console.log('🚀 SERVER DEBUG - Category:', category.name);
//   console.log('🚀 SERVER DEBUG - Number of courses:', initialCourses.length);
//   if (initialCourses.length > 0) {
//     console.log('🚀 SERVER DEBUG - First course structure:', {
//       id: initialCourses[0].id,
//       title: initialCourses[0].title,
//       average_rating: initialCourses[0].average_rating,
//       review_count: initialCourses[0].review_count,
//       has_rating_object: !!initialCourses[0].rating,
//       has_reviews_object: !!initialCourses[0].reviews
//     });
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <CategoryCoursesClient 
//         category={category}
//         initialCourses={initialCourses}
//         availableTags={availableTags}
//         searchParams={resolvedSearchParams}
//       />
//       <Footer />
//     </div>
//   );
// }



























// /app/categories/[slug]/page.tsx

import { getCategoryBySlugAction } from '@/lib/categories/actions';
import { getCoursesAction } from '@/lib/courses/actions';
import { getTagsAction } from '@/lib/tags/actions';
import { CategoryCoursesClient } from '@/components/categories/category-courses-client';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    search?: string;
    difficulty?: string;
    content_type?: string;
    price_range?: string;
    min_rating?: string;
    sort_by?: string;
  }>;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  
  // Fetch category data
  const categoryResult = await getCategoryBySlugAction(slug);
  
  if (!categoryResult.success || !categoryResult.category) {
    notFound();
  }

  const category = categoryResult.category;

  // IMPORTANT: Fetch initial courses for this category WITH reviews
  const coursesResult = await getCoursesAction({
    is_published: true,
    category_slug: slug,
    limit: 50,
    include_reviews: true  // THIS IS THE KEY DIFFERENCE
  });

  const tagsResult = await getTagsAction();

  const initialCourses = coursesResult.courses || [];
  const availableTags = tagsResult.tags || [];

  // Debug logging on server side
  console.log('🚀 SERVER DEBUG - Category:', category.name);
  console.log('🚀 SERVER DEBUG - Number of courses:', initialCourses.length);
  if (initialCourses.length > 0) {
    console.log('🚀 SERVER DEBUG - First course structure:', {
      id: initialCourses[0].id,
      title: initialCourses[0].title,
      average_rating: initialCourses[0].average_rating,
      review_count: initialCourses[0].review_count,
      has_rating_object: !!initialCourses[0].rating,
      has_reviews_object: !!initialCourses[0].reviews
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryCoursesClient 
        category={category}
        initialCourses={initialCourses}
        availableTags={availableTags}
        searchParams={resolvedSearchParams}
      />
      <Footer />
    </div>
  );
}