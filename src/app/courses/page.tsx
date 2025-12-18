
// // /app/courses/page.tsx

// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { getCoursesAction } from '@/lib/courses/actions';
// import { getCategoriesAction } from '@/lib/categories/actions';
// import { getTagsAction } from '@/lib/tags/actions';
// import { PremiumCourseCard } from '@/components/courses/premium-course-card';
// import { CategoryNavigation } from '@/components/categories/category-navigation';
// import { CourseFilters } from '@/components/courses/course-filters';
// import { useCourseSearch } from '@/hooks/use-course-search';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Search, 
//   Filter, 
//   Loader2, 
//   Sparkles, 
//   TrendingUp, 
//   Users, 
//   Star, 
//   Zap,
//   Grid3X3,
//   List,
//   Play,
//   ArrowRight,
//   Rocket,
//   Brain,
//   Code,
//   Palette
// } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Course } from '@/types/courses';
// import { Header } from '@/components/layout/header';
// import { Footer } from '@/components/layout/footer';

// interface CoursesPageProps {
//   searchParams: Promise<{
//     category?: string;
//     search?: string;
//     difficulty?: string;
//     content_type?: string;
//     price_range?: string;
//     min_rating?: string;
//     sort_by?: string;
//   }>;
// }

// // View Toggle Component
// function ViewToggle({ view, onViewChange }: { view: 'grid' | 'list'; onViewChange: (view: 'grid' | 'list') => void }) {
//   return (
//     <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
//       <Button
//         variant={view === 'grid' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('grid')}
//         className={`flex items-center gap-2 ${view === 'grid' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <Grid3X3 className="h-4 w-4" />
//         <span className="hidden sm:inline">Grid</span>
//       </Button>
//       <Button
//         variant={view === 'list' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('list')}
//         className={`flex items-center gap-2 ${view === 'list' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <List className="h-4 w-4" />
//         <span className="hidden sm:inline">List</span>
//       </Button>
//     </div>
//   );
// }

// // Animated Text Slider Component
// function TextSlider() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const slides = [
//     {
//       icon: <Code className="h-12 w-12 text-blue-400" />,
//       title: "Master Modern Tech",
//       description: "Learn cutting-edge technologies from industry experts",
//       gradient: "from-blue-500 to-cyan-500"
//     },
//     {
//       icon: <Brain className="h-12 w-12 text-purple-400" />,
//       title: "Boost Your Career",
//       description: "Gain skills that companies are hiring for right now",
//       gradient: "from-purple-500 to-pink-500"
//     },
//     {
//       icon: <Rocket className="h-12 w-12 text-orange-400" />,
//       title: "Learn at Light Speed",
//       description: "Accelerate your learning with project-based courses",
//       gradient: "from-orange-500 to-red-500"
//     },
//     {
//       icon: <Palette className="h-12 w-12 text-green-400" />,
//       title: "Unlock Creativity",
//       description: "Transform your ideas into reality with practical skills",
//       gradient: "from-green-500 to-teal-500"
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [slides.length]);

//   return (
//     <div className="relative h-48 md:h-56 lg:h-64 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm p-8 border border-white/20">
//       {/* Subtle background elements */}
//       <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-xl"></div>
      
//       <div className="relative z-10 h-full flex items-center">
//         <div className="flex-1">
//           <div className="relative h-24 overflow-hidden">
//             {slides.map((slide, index) => (
//               <div
//                 key={index}
//                 className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
//                   index === currentSlide
//                     ? 'opacity-100 translate-x-0'
//                     : index < currentSlide
//                     ? 'opacity-0 -translate-x-full'
//                     : 'opacity-0 translate-x-full'
//                 }`}
//               >
//                 <div className="flex items-center space-x-6">
//                   <div className="flex-shrink-0">
//                     {slide.icon}
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
//                       {slide.title}
//                     </h3>
//                     <p className="text-blue-100 text-lg">
//                       {slide.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Slide indicators */}
//       <div className="absolute bottom-6 left-8 flex space-x-2 z-10">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             className={`w-2 h-2 rounded-full transition-all ${
//               index === currentSlide
//                 ? 'bg-white w-6'
//                 : 'bg-white/40'
//             }`}
//             onClick={() => setCurrentSlide(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // Enhanced Stats Cards for Dark Background
// function StatsCards({ stats }: { stats: { courses: number; categories: number; featured: number; skills: number } }) {
//   return (
//     <div className="grid grid-cols-2 gap-4">
//       {/* Top Row - 2 cards */}
//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-blue-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.courses}</div>
//             <div className="text-blue-200 text-sm">Courses</div>
//           </div>
//           <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <TrendingUp className="h-6 w-6 text-blue-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-green-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.categories}</div>
//             <div className="text-green-200 text-sm">Categories</div>
//           </div>
//           <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Users className="h-6 w-6 text-green-300" />
//           </div>
//         </div>
//       </div>

//       {/* Bottom Row - 2 cards */}
//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-yellow-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.featured}</div>
//             <div className="text-yellow-200 text-sm">Featured</div>
//           </div>
//           <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Star className="h-6 w-6 text-yellow-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-purple-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.skills}</div>
//             <div className="text-purple-200 text-sm">Skills</div>
//           </div>
//           <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Zap className="h-6 w-6 text-purple-300" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Course List View
// function CourseListView({ courses }: { courses: Course[] }) {
//   const formatPrice = (priceCents: number) => {
//     if (priceCents === 0) return 'FREE';
//     return `$${(priceCents / 100).toFixed(2)}`;
//   };

//   const formatDuration = (minutes: number) => {
//     if (!minutes || minutes === 0) return '0m';
//     if (minutes < 60) return `${minutes}m`;
//     const hours = Math.floor(minutes / 60);
//     const mins = minutes % 60;
//     return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
//   };

//   const getRating = (rating: any): string => {
//     if (!rating || rating === 0 || rating === '0') return '4.8';
//     const numericRating = typeof rating === 'string' ? parseFloat(rating) : rating;
//     if (isNaN(numericRating) || !isFinite(numericRating)) return '4.8';
//     return numericRating.toFixed(1);
//   };

//   return (
//     <div className="space-y-4">
//       {courses.map((course) => (
//         <Link key={course.id} href={`/courses/${course.slug}`}>
//           <div className="flex flex-col sm:flex-row gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all group cursor-pointer">
//             {/* Course Thumbnail */}
//             <div className="relative w-full sm:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
//               <img
//                 src={course.thumbnail_url || "/placeholder-course.png"}
//                 alt={course.title}
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//               />
//               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
//                 <div className="bg-white rounded-full p-2 transform scale-0 group-hover:scale-100 transition-transform">
//                   <Play size={20} className="text-primary fill-primary" />
//                 </div>
//               </div>
//             </div>

//             {/* Course Info */}
//             <div className="flex-1 min-w-0">
//               <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-3">
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center gap-2 mb-2 flex-wrap">
//                     {course.category_name && (
//                       <Badge variant="outline" className="text-xs">
//                         {course.category_name}
//                       </Badge>
//                     )}
//                     {course.is_featured && (
//                       <Badge className="bg-purple-500 text-white border-0 text-xs">
//                         FEATURED
//                       </Badge>
//                     )}
//                   </div>
//                   <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
//                     {course.title}
//                   </h3>
//                   {course.short_description && (
//                     <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                       {course.short_description}
//                     </p>
//                   )}
//                 </div>
//                 <div className="text-left sm:text-right flex-shrink-0">
//                   <div className="text-primary font-bold text-lg mb-1">
//                     {formatPrice(course.price_cents || 0)}
//                   </div>
//                   <div className="flex items-center gap-1 sm:justify-end">
//                     <Star className="text-yellow-400 fill-yellow-400" size={14} />
//                     <span className="text-sm font-semibold text-gray-900">
//                       {getRating(course.average_rating)}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Course Meta */}
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//                 <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-600">
//                   {/* Instructor */}
//                   <div className="flex items-center gap-2">
//                     {course.instructor_image && (
//                       <img
//                         src={course.instructor_image}
//                         alt={course.instructor_name || 'Instructor'}
//                         className="w-6 h-6 rounded-full object-cover border border-gray-200"
//                       />
//                     )}
//                     <span className="text-sm">{course.instructor_name || 'Expert Instructor'}</span>
//                   </div>

//                   {/* Stats */}
//                   <div className="flex items-center gap-3 flex-wrap">
//                     {course.total_lessons && (
//                       <span className="text-sm">📚 {course.total_lessons} lessons</span>
//                     )}
//                     {course.total_video_duration && (
//                       <span className="text-sm">⏱️ {formatDuration(course.total_video_duration)}</span>
//                     )}
//                     {course.enrolled_students_count && (
//                       <span className="text-sm">👥 {course.enrolled_students_count.toLocaleString()} students</span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Difficulty */}
//                 {course.difficulty_level && (
//                   <Badge variant="outline" className="text-xs self-start sm:self-auto">
//                     {course.difficulty_level}
//                   </Badge>
//                 )}
//               </div>
//             </div>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// }

// // Animated Gradient Background Component
// function AnimatedGradientBackground({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="relative w-full overflow-hidden">
//       {/* Animated Gradient Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900">
//         {/* Animated orbs */}
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
//         <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1500"></div>
        
//         {/* Grid pattern overlay */}
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
//       </div>
      
//       {/* Content */}
//       <div className="relative z-10">
//         {children}
//       </div>
//     </div>
//   );
// }

// export default function CoursesPage({ searchParams }: CoursesPageProps) {
//   const resolvedSearchParams = React.use(searchParams);
  
//   const [initialCourses, setInitialCourses] = useState<Course[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [availableTags, setAvailableTags] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [view, setView] = useState<'grid' | 'list'>('grid');

//   const {
//     courses,
//     loading,
//     error,
//     filters,
//     pagination,
//     updateFilters,
//     resetFilters,
//     loadMore
//   } = useCourseSearch(initialCourses);

//   useEffect(() => {
//     async function fetchInitialData() {
//       try {
//         setIsLoading(true);
        
//         const [coursesResult, categoriesResult, tagsResult] = await Promise.all([
//           getCoursesAction({
//             is_published: true,
//             category_slug: resolvedSearchParams.category,
//             limit: 50
//           }),
//           getCategoriesAction(),
//           getTagsAction()
//         ]);

//         setInitialCourses(coursesResult.courses || []);
//         setCategories(categoriesResult.categories || []);
//         setAvailableTags(tagsResult.tags || []);
//       } catch (error) {
//         console.error('Error fetching initial data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchInitialData();
//   }, [resolvedSearchParams.category]);

//   useEffect(() => {
//     const urlFilters = {
//       searchQuery: resolvedSearchParams.search || '',
//       category_slug: resolvedSearchParams.category || '',
//       difficulty: resolvedSearchParams.difficulty || '',
//       content_type: resolvedSearchParams.content_type || '',
//       price_range: resolvedSearchParams.price_range || '',
//       min_rating: parseFloat(resolvedSearchParams.min_rating || '0'),
//       sort_by: resolvedSearchParams.sort_by || 'relevance'
//     };
    
//     if (Object.values(urlFilters).some(value => value !== '' && value !== 0)) {
//       updateFilters(urlFilters);
//       setSearchQuery(urlFilters.searchQuery);
//     }
//   }, [resolvedSearchParams]);

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     updateFilters({ searchQuery: searchQuery });
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       updateFilters({ searchQuery: searchQuery });
//     }
//   };

//   // Calculate stats
//   const totalCourses = pagination.total;
//   const totalCategories = categories.length;
//   const totalTags = availableTags.length;
//   const featuredCourses = courses.filter(course => course.is_featured).length;

//   const stats = {
//     courses: totalCourses,
//     categories: totalCategories,
//     featured: featuredCourses,
//     skills: totalTags
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="container mx-auto px-4 py-8">
//           <div className="max-w-7xl mx-auto text-center py-20">
//             <div className="relative inline-block">
//               <Loader2 className="h-12 w-12 animate-spin mx-auto mb-6 text-blue-600" />
//               <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
//             </div>
//             <p className="text-gray-600 text-lg font-medium">Loading amazing courses...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
      
//       {/* Hero Section with Animated Gradient Background */}
//       <AnimatedGradientBackground>
//         <div className="container mx-auto px-4 py-16">
//           <div className="max-w-7xl mx-auto">
//             {/* Enhanced Header Section */}
//             <div className="mb-12">
//               <div className="text-center mb-8">
//                 <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
//                   Explore Courses
//                 </h1>
//                 <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
//                   Discover your next learning adventure in our comprehensive learning platform
//                 </p>
//               </div>

//               {/* Hero Section with Text Slider and Stats */}
//               <div className="grid lg:grid-cols-2 gap-8">
//                 {/* Text Slider */}
//                 <div className="lg:col-span-1">
//                   <TextSlider />
//                 </div>

//                 {/* Stats Cards - Now 2x2 grid */}
//                 <div className="lg:col-span-1">
//                   <StatsCards stats={stats} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </AnimatedGradientBackground>

//       {/* Search Bar - Now outside the dark background */}
//       <div className="container mx-auto px-4 py-12 -mt-8 relative z-20">
//         <div className="max-w-4xl mx-auto">
//           <form onSubmit={handleSearchSubmit} className="relative">
//             <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
//             <Input
//               type="text"
//               placeholder="Search courses, technologies, instructors... (Press Enter to search)"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="w-full pl-16 pr-6 py-6 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition text-gray-900 placeholder-gray-500 shadow-lg"
//             />
//           </form>
//         </div>
//       </div>

//       {/* Rest of the content with normal background */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* Sidebar Filters - Mobile Toggle */}
//             <div className="lg:hidden">
//               <Button
//                 onClick={() => setShowFilters(!showFilters)}
//                 variant="outline"
//                 className="w-full flex items-center gap-2 mb-4"
//               >
//                 <Filter size={20} />
//                 Filters
//                 {hasActiveFilters(filters) && (
//                   <Badge variant="secondary" className="ml-2">
//                     {getActiveFilterCount(filters)}
//                   </Badge>
//                 )}
//               </Button>
//             </div>

//             {/* Sidebar Filters */}
//             <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-80 flex-shrink-0 space-y-6`}>
//               {/* Categories Card */}
//               <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                 <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
//                   <CardTitle className="flex items-center gap-2 text-gray-900">
//                     <Sparkles className="h-5 w-5 text-blue-600" />
//                     Categories
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-0">
//                   <div className="max-h-96 overflow-y-auto">
//                     <CategoryNavigation 
//                       showCourseCounts={true}
//                       className="p-4"
//                       currentCategory={filters.category_slug}
//                     />
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Advanced Filters */}
//               <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                 <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
//                   <CardTitle className="flex items-center gap-2 text-gray-900">
//                     <Filter className="h-5 w-5 text-purple-600" />
//                     Filters
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-4">
//                   <CourseFilters
//                     filters={filters}
//                     onFiltersChange={updateFilters}
//                     onReset={resetFilters}
//                     availableTags={availableTags}
//                   />
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Main Content */}
//             <div className="flex-1">
//               {/* Results Header */}
//               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
//                 <div className="flex-1">
//                   <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent mb-2">
//                     {filters.category_slug ? (
//                       <>
//                         <Sparkles className="h-6 w-6 text-blue-600 inline mr-2" />
//                         {categories.find(cat => cat.slug === filters.category_slug)?.name}
//                       </>
//                     ) : filters.searchQuery ? (
//                       <>Search: "{filters.searchQuery}"</>
//                     ) : (
//                       <>All Courses</>
//                     )}
//                   </h2>
//                   <p className="text-gray-600 flex items-center gap-2">
//                     {loading ? (
//                       <>
//                         <Loader2 className="h-4 w-4 animate-spin" />
//                         Discovering courses...
//                       </>
//                     ) : (
//                       <>
//                         <span className="font-semibold text-gray-900">{courses.length}</span>
//                         {courses.length === 1 ? ' course' : ' courses'} found
//                         {hasActiveFilters(filters) && (
//                           <span className="text-blue-600 ml-2">• Filtered</span>
//                         )}
//                       </>
//                     )}
//                   </p>
//                 </div>

//                 <div className="flex items-center gap-4">
//                   {/* View Toggle */}
//                   <ViewToggle view={view} onViewChange={setView} />
                  
//                   {/* Clear Filters */}
//                   {hasActiveFilters(filters) && (
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={resetFilters}
//                       className="rounded-lg border-gray-300 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
//                     >
//                       Clear All
//                     </Button>
//                   )}
//                 </div>
//               </div>

//               {/* Error State */}
//               {error && (
//                 <Card className="mb-6 border-red-200 bg-red-50 rounded-2xl overflow-hidden">
//                   <CardContent className="p-6">
//                     <div className="flex items-center gap-3">
//                       <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
//                       <p className="text-red-700 font-medium">Error: {error}</p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               )}

//               {/* Loading State */}
//               {loading && courses.length === 0 && (
//                 <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
//                   <div className="relative inline-block mb-4">
//                     <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
//                     <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
//                   </div>
//                   <p className="text-gray-600 text-lg font-medium">Loading courses...</p>
//                 </div>
//               )}

//               {/* Courses Grid/List */}
//               {courses.length > 0 ? (
//                 <>
//                   {view === 'grid' ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                       {courses.map((course) => (
//                         <PremiumCourseCard key={course.id} course={course} />
//                       ))}
//                     </div>
//                   ) : (
//                     <CourseListView courses={courses} />
//                   )}

//                   {/* Load More Button */}
//                   {pagination.hasMore && (
//                     <div className="text-center mt-12">
//                       <Button
//                         onClick={loadMore}
//                         disabled={loading}
//                         className="min-w-48 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-0 px-8 py-3 font-semibold"
//                       >
//                         {loading ? (
//                           <>
//                             <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                             Loading More...
//                           </>
//                         ) : (
//                           <>
//                             <Rocket className="h-4 w-4 mr-2" />
//                             Load More Courses
//                           </>
//                         )}
//                       </Button>
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 /* No Results */
//                 <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
//                   <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <Search className="h-10 w-10 text-gray-400" />
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
//                   <p className="text-gray-600 max-w-md mx-auto mb-6">
//                     {filters.searchQuery || hasActiveFilters(filters)
//                       ? "Try adjusting your search criteria or browse all courses."
//                       : "No courses available at the moment. Check back soon!"}
//                   </p>
//                   {(filters.searchQuery || hasActiveFilters(filters)) && (
//                     <Button
//                       onClick={resetFilters}
//                       variant="outline"
//                       className="rounded-lg"
//                     >
//                       Reset Filters
//                     </Button>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// function hasActiveFilters(filters: any): boolean {
//   return Object.keys(filters).some(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   });
// }

// function getActiveFilterCount(filters: any): number {
//   return Object.keys(filters).filter(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   }).length;
// }





























// // /app/courses/page.tsx

// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { getCoursesAction } from '@/lib/courses/actions';
// import { getCategoriesAction } from '@/lib/categories/actions';
// import { getTagsAction } from '@/lib/tags/actions';
// import { PremiumCourseCard } from '@/components/courses/premium-course-card';
// import { CategoryNavigation } from '@/components/categories/category-navigation';
// import { CourseFilters } from '@/components/courses/course-filters';
// import { useCourseSearch } from '@/hooks/use-course-search';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Search, 
//   Filter, 
//   Loader2, 
//   Sparkles, 
//   TrendingUp, 
//   Users, 
//   Star, 
//   Zap,
//   Grid3X3,
//   List,
//   Play,
//   ArrowRight,
//   Rocket,
//   Brain,
//   Code,
//   Palette,
//   Heart,
//   Share2,
//   Eye,
//   MessageCircle
// } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Course } from '@/types/courses';
// import { Header } from '@/components/layout/header';
// import { Footer } from '@/components/layout/footer';

// interface CoursesPageProps {
//   searchParams: Promise<{
//     category?: string;
//     search?: string;
//     difficulty?: string;
//     content_type?: string;
//     price_range?: string;
//     min_rating?: string;
//     sort_by?: string;
//   }>;
// }

// // View Toggle Component
// function ViewToggle({ view, onViewChange }: { view: 'grid' | 'list'; onViewChange: (view: 'grid' | 'list') => void }) {
//   return (
//     <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
//       <Button
//         variant={view === 'grid' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('grid')}
//         className={`flex items-center gap-2 ${view === 'grid' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <Grid3X3 className="h-4 w-4" />
//         <span className="hidden sm:inline">Grid</span>
//       </Button>
//       <Button
//         variant={view === 'list' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('list')}
//         className={`flex items-center gap-2 ${view === 'list' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <List className="h-4 w-4" />
//         <span className="hidden sm:inline">List</span>
//       </Button>
//     </div>
//   );
// }

// // Helper functions for formatting
// const formatRating = (rating: any): string => {
//   if (rating === null || rating === undefined || rating === '') return '0.0';
  
//   const numRating = typeof rating === 'string' ? parseFloat(rating) : Number(rating);
  
//   if (isNaN(numRating) || numRating <= 0) return '0.0';
  
//   return numRating.toFixed(1);
// };

// const formatNumber = (num: any): string => {
//   if (num === null || num === undefined || num === '') return '0';
  
//   const numValue = typeof num === 'string' ? parseInt(num) : Number(num);
  
//   return isNaN(numValue) ? '0' : numValue.toLocaleString();
// };

// const formatReviewCount = (count: number | undefined): string => {
//   const num = count || 0;
//   return `${num} review${num !== 1 ? 's' : ''}`;
// };

// const formatDuration = (minutes: number): string => {
//   if (!minutes || minutes === 0) return '0m';
//   if (minutes < 60) return `${minutes}m`;
//   const hours = Math.floor(minutes / 60);
//   const mins = minutes % 60;
//   return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
// };

// // Animated Text Slider Component
// function TextSlider() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const slides = [
//     {
//       icon: <Code className="h-12 w-12 text-blue-400" />,
//       title: "Master Modern Tech",
//       description: "Learn cutting-edge technologies from industry experts",
//       gradient: "from-blue-500 to-cyan-500"
//     },
//     {
//       icon: <Brain className="h-12 w-12 text-purple-400" />,
//       title: "Boost Your Career",
//       description: "Gain skills that companies are hiring for right now",
//       gradient: "from-purple-500 to-pink-500"
//     },
//     {
//       icon: <Rocket className="h-12 w-12 text-orange-400" />,
//       title: "Learn at Light Speed",
//       description: "Accelerate your learning with project-based courses",
//       gradient: "from-orange-500 to-red-500"
//     },
//     {
//       icon: <Palette className="h-12 w-12 text-green-400" />,
//       title: "Unlock Creativity",
//       description: "Transform your ideas into reality with practical skills",
//       gradient: "from-green-500 to-teal-500"
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [slides.length]);

//   return (
//     <div className="relative h-48 md:h-56 lg:h-64 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm p-8 border border-white/20">
//       {/* Subtle background elements */}
//       <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-xl"></div>
      
//       <div className="relative z-10 h-full flex items-center">
//         <div className="flex-1">
//           <div className="relative h-24 overflow-hidden">
//             {slides.map((slide, index) => (
//               <div
//                 key={index}
//                 className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
//                   index === currentSlide
//                     ? 'opacity-100 translate-x-0'
//                     : index < currentSlide
//                     ? 'opacity-0 -translate-x-full'
//                     : 'opacity-0 translate-x-full'
//                 }`}
//               >
//                 <div className="flex items-center space-x-6">
//                   <div className="flex-shrink-0">
//                     {slide.icon}
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
//                       {slide.title}
//                     </h3>
//                     <p className="text-blue-100 text-lg">
//                       {slide.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Slide indicators */}
//       <div className="absolute bottom-6 left-8 flex space-x-2 z-10">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             className={`w-2 h-2 rounded-full transition-all ${
//               index === currentSlide
//                 ? 'bg-white w-6'
//                 : 'bg-white/40'
//             }`}
//             onClick={() => setCurrentSlide(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // Enhanced Stats Cards for Dark Background
// function StatsCards({ stats }: { stats: { courses: number; categories: number; featured: number; skills: number } }) {
//   return (
//     <div className="grid grid-cols-2 gap-4">
//       {/* Top Row - 2 cards */}
//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-blue-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.courses}</div>
//             <div className="text-blue-200 text-sm">Courses</div>
//           </div>
//           <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <TrendingUp className="h-6 w-6 text-blue-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-green-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.categories}</div>
//             <div className="text-green-200 text-sm">Categories</div>
//           </div>
//           <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Users className="h-6 w-6 text-green-300" />
//           </div>
//         </div>
//       </div>

//       {/* Bottom Row - 2 cards */}
//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-yellow-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.featured}</div>
//             <div className="text-yellow-200 text-sm">Featured</div>
//           </div>
//           <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Star className="h-6 w-6 text-yellow-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-purple-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.skills}</div>
//             <div className="text-purple-200 text-sm">Skills</div>
//           </div>
//           <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Zap className="h-6 w-6 text-purple-300" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Enhanced Course Card Component with Full Social Metrics
// function EnhancedCourseCard({ course }: { course: Course }) {
//   const rating = formatRating(course.average_rating);
//   const reviewCount = course.review_count || 0;
//   const likeCount = course.like_count || 0;
//   const shareCount = course.share_count || 0;
//   const viewCount = course.total_views || 0;
  
//   return (
//     <Link href={`/courses/${course.slug}`}>
//       <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group cursor-pointer h-full border border-gray-100">
//         {/* Course Image with Play Button */}
//         <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
//           <img
//             src={course.thumbnail_url || "/placeholder-course.png"}
//             alt={course.title}
//             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//           />
//           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
//             <div className="bg-white rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform">
//               <Play size={32} className="text-blue-600 fill-blue-600" />
//             </div>
//           </div>
//           <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
//             course.is_featured 
//               ? 'bg-yellow-500 text-white' 
//               : course.is_trending 
//               ? 'bg-green-500 text-white'
//               : 'bg-blue-500 text-white'
//           }`}>
//             {course.is_featured ? 'FEATURED' : course.is_trending ? 'TRENDING' : 'NEW'}
//           </span>
//         </div>

//         {/* Course Info */}
//         <div className="p-5">
//           {/* Category Badge */}
//           {course.category_name && (
//             <div className="mb-2">
//               <Badge variant="outline" className="text-xs">
//                 {course.category_name}
//               </Badge>
//             </div>
//           )}
          
//           <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 leading-tight">
//             {course.title}
//           </h3>
          
//           {/* Short Description */}
//           {course.short_description && (
//             <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//               {course.short_description}
//             </p>
//           )}

//           {/* Instructor */}
//           <div className="flex items-center gap-2 mb-4">
//             <p className="text-sm text-gray-600 truncate">
//               {course.instructor_name || 'Expert Instructor'}
//             </p>
//           </div>

//           {/* Social Engagement Metrics */}
//           <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
//             <div className="flex items-center gap-3">
//               {/* Likes */}
//               {likeCount > 0 && (
//                 <div className="flex items-center gap-1 text-red-500">
//                   <Heart size={14} className="fill-red-500" />
//                   <span className="text-xs font-semibold">{formatNumber(likeCount)}</span>
//                 </div>
//               )}
              
//               {/* Shares */}
//               {shareCount > 0 && (
//                 <div className="flex items-center gap-1 text-blue-500">
//                   <Share2 size={14} />
//                   <span className="text-xs font-semibold">{formatNumber(shareCount)}</span>
//                 </div>
//               )}
              
//               {/* Views */}
//               {viewCount > 0 && (
//                 <div className="flex items-center gap-1 text-purple-500">
//                   <Eye size={14} />
//                   <span className="text-xs font-semibold">{formatNumber(viewCount)}</span>
//                 </div>
//               )}
//             </div>
            
//             {/* Rating and Reviews */}
//             {parseFloat(rating) > 0 && (
//               <div className="flex items-center gap-1">
//                 <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//                 <span className="text-xs font-semibold text-gray-900">{rating}</span>
//                 {reviewCount > 0 && (
//                   <span className="text-xs text-gray-500">({formatNumber(reviewCount)})</span>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Course Stats */}
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-4 text-sm text-gray-500">
//               {/* Rating */}
//               {parseFloat(rating) > 0 && (
//                 <div className="flex items-center gap-1">
//                   <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                   <span className="font-semibold text-gray-900">{rating}</span>
//                 </div>
//               )}
              
//               {/* Students */}
//               <div className="flex items-center gap-1">
//                 <Users className="h-4 w-4" />
//                 <span>{formatNumber(course.enrolled_students_count)}</span>
//               </div>
              
//               {/* Duration */}
//               {course.total_video_duration && (
//                 <div className="flex items-center gap-1">
//                   <span>⏱️ {formatDuration(course.total_video_duration)}</span>
//                 </div>
//               )}
//             </div>
            
//             {/* Price */}
//             <span className="text-blue-600 font-bold text-lg">
//               {course.price_cents === 0 ? 'FREE' : `$${(course.price_cents / 100).toFixed(2)}`}
//             </span>
//           </div>

//           {/* View Course Button */}
//           <Button className="w-full group/btn bg-gray-900 hover:bg-gray-800 text-white" asChild>
//             <div>
//               View Course
//               <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
//             </div>
//           </Button>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // Enhanced Course List View with Social Metrics
// function EnhancedCourseListView({ courses }: { courses: Course[] }) {
//   const formatPrice = (priceCents: number) => {
//     if (priceCents === 0) return 'FREE';
//     return `$${(priceCents / 100).toFixed(2)}`;
//   };

//   return (
//     <div className="space-y-4">
//       {courses.map((course) => {
//         const rating = formatRating(course.average_rating);
//         const reviewCount = course.review_count || 0;
//         const likeCount = course.like_count || 0;
//         const shareCount = course.share_count || 0;
//         const viewCount = course.total_views || 0;
        
//         return (
//           <Link key={course.id} href={`/courses/${course.slug}`}>
//             <div className="flex flex-col lg:flex-row gap-6 p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all group cursor-pointer">
//               {/* Course Thumbnail */}
//               <div className="relative w-full lg:w-64 h-48 rounded-lg overflow-hidden flex-shrink-0">
//                 <img
//                   src={course.thumbnail_url || "/placeholder-course.png"}
//                   alt={course.title}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                 />
//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
//                   <div className="bg-white rounded-full p-2 transform scale-0 group-hover:scale-100 transition-transform">
//                     <Play size={20} className="text-blue-600 fill-blue-600" />
//                   </div>
//                 </div>
//               </div>

//               {/* Course Info */}
//               <div className="flex-1 min-w-0">
//                 <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-3 gap-4">
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 mb-2 flex-wrap">
//                       {course.category_name && (
//                         <Badge variant="outline" className="text-xs">
//                           {course.category_name}
//                         </Badge>
//                       )}
//                       {course.is_featured && (
//                         <Badge className="bg-yellow-500 text-white border-0 text-xs">
//                           FEATURED
//                         </Badge>
//                       )}
//                       {course.is_trending && (
//                         <Badge className="bg-green-500 text-white border-0 text-xs">
//                           TRENDING
//                         </Badge>
//                       )}
//                     </div>
//                     <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
//                       {course.title}
//                     </h3>
//                     {course.short_description && (
//                       <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                         {course.short_description}
//                       </p>
//                     )}
                    
//                     {/* Social Engagement Metrics - Row 1 */}
//                     <div className="flex items-center gap-4 mb-3">
//                       {/* Rating and Reviews */}
//                       {parseFloat(rating) > 0 && (
//                         <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
//                           <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//                           <span className="text-xs font-semibold text-gray-900">{rating}</span>
//                           {reviewCount > 0 && (
//                             <span className="text-xs text-gray-600">({formatNumber(reviewCount)})</span>
//                           )}
//                         </div>
//                       )}
                      
//                       {/* Students */}
//                       {course.enrolled_students_count && (
//                         <div className="flex items-center gap-1 text-gray-600">
//                           <Users size={14} />
//                           <span className="text-xs">{formatNumber(course.enrolled_students_count)} students</span>
//                         </div>
//                       )}
                      
//                       {/* Duration */}
//                       {course.total_video_duration && (
//                         <div className="flex items-center gap-1 text-gray-600">
//                           <span className="text-xs">⏱️ {formatDuration(course.total_video_duration)}</span>
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* Social Engagement Metrics - Row 2 */}
//                     <div className="flex items-center gap-4">
//                       {/* Likes */}
//                       {likeCount > 0 && (
//                         <div className="flex items-center gap-1 text-red-500">
//                           <Heart size={12} className="fill-red-500" />
//                           <span className="text-xs">{formatNumber(likeCount)} likes</span>
//                         </div>
//                       )}
                      
//                       {/* Shares */}
//                       {shareCount > 0 && (
//                         <div className="flex items-center gap-1 text-blue-500">
//                           <Share2 size={12} />
//                           <span className="text-xs">{formatNumber(shareCount)} shares</span>
//                         </div>
//                       )}
                      
//                       {/* Views */}
//                       {viewCount > 0 && (
//                         <div className="flex items-center gap-1 text-purple-500">
//                           <Eye size={12} />
//                           <span className="text-xs">{formatNumber(viewCount)} views</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
                  
//                   {/* Price and Instructor */}
//                   <div className="flex-shrink-0 lg:text-right">
//                     <div className="text-blue-600 font-bold text-lg mb-2">
//                       {formatPrice(course.price_cents || 0)}
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       {course.instructor_name || 'Expert Instructor'}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Link>
//         );
//       })}
//     </div>
//   );
// }

// // Animated Gradient Background Component
// function AnimatedGradientBackground({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="relative w-full overflow-hidden">
//       {/* Animated Gradient Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900">
//         {/* Animated orbs */}
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
//         <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1500"></div>
        
//         {/* Grid pattern overlay */}
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
//       </div>
      
//       {/* Content */}
//       <div className="relative z-10">
//         {children}
//       </div>
//     </div>
//   );
// }

// export default function CoursesPage({ searchParams }: CoursesPageProps) {
//   const resolvedSearchParams = React.use(searchParams);
  
//   const [initialCourses, setInitialCourses] = useState<Course[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [availableTags, setAvailableTags] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [view, setView] = useState<'grid' | 'list'>('grid');

//   const {
//     courses,
//     loading,
//     error,
//     filters,
//     pagination,
//     updateFilters,
//     resetFilters,
//     loadMore
//   } = useCourseSearch(initialCourses);

//   useEffect(() => {
//     async function fetchInitialData() {
//       try {
//         setIsLoading(true);
        
//         const [coursesResult, categoriesResult, tagsResult] = await Promise.all([
//           getCoursesAction({
//             is_published: true,
//             category_slug: resolvedSearchParams.category,
//             limit: 100, // Increased limit to show more courses
//             include_reviews: true // Ensure reviews are included
//           }),
//           getCategoriesAction(),
//           getTagsAction()
//         ]);

//         setInitialCourses(coursesResult.courses || []);
//         setCategories(categoriesResult.categories || []);
//         setAvailableTags(tagsResult.tags || []);
        
//         // Log course data for debugging
//         console.log('=== COURSES PAGE DATA ===');
//         (coursesResult.courses || []).forEach((course: any, index: number) => {
//           console.log(`${index + 1}. ${course.title}`);
//           console.log(`   Rating: ${course.average_rating}`);
//           console.log(`   Reviews: ${course.review_count}`);
//           console.log(`   Likes: ${course.like_count}`);
//           console.log(`   Shares: ${course.share_count}`);
//         });
//       } catch (error) {
//         console.error('Error fetching initial data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchInitialData();
//   }, [resolvedSearchParams.category]);

//   useEffect(() => {
//     const urlFilters = {
//       searchQuery: resolvedSearchParams.search || '',
//       category_slug: resolvedSearchParams.category || '',
//       difficulty: resolvedSearchParams.difficulty || '',
//       content_type: resolvedSearchParams.content_type || '',
//       price_range: resolvedSearchParams.price_range || '',
//       min_rating: parseFloat(resolvedSearchParams.min_rating || '0'),
//       sort_by: resolvedSearchParams.sort_by || 'relevance'
//     };
    
//     if (Object.values(urlFilters).some(value => value !== '' && value !== 0)) {
//       updateFilters(urlFilters);
//       setSearchQuery(urlFilters.searchQuery);
//     }
//   }, [resolvedSearchParams]);

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     updateFilters({ searchQuery: searchQuery });
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       updateFilters({ searchQuery: searchQuery });
//     }
//   };

//   // Calculate stats
//   const totalCourses = pagination.total;
//   const totalCategories = categories.length;
//   const totalTags = availableTags.length;
//   const featuredCourses = courses.filter(course => course.is_featured).length;

//   const stats = {
//     courses: totalCourses,
//     categories: totalCategories,
//     featured: featuredCourses,
//     skills: totalTags
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="container mx-auto px-4 py-8">
//           <div className="max-w-7xl mx-auto text-center py-20">
//             <div className="relative inline-block">
//               <Loader2 className="h-12 w-12 animate-spin mx-auto mb-6 text-blue-600" />
//               <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
//             </div>
//             <p className="text-gray-600 text-lg font-medium">Loading amazing courses...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
      
//       {/* Hero Section with Animated Gradient Background */}
//       <AnimatedGradientBackground>
//         <div className="w-full px-4 py-16">
//           <div className="w-full mx-auto">
//             {/* Enhanced Header Section */}
//             <div className="mb-12">
//               <div className="text-center mb-8">
//                 <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
//                   Explore Courses
//                 </h1>
//                 <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
//                   Discover your next learning adventure in our comprehensive learning platform
//                 </p>
//               </div>

//               {/* Hero Section with Text Slider and Stats */}
//               <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
//                 {/* Text Slider */}
//                 <div className="lg:col-span-1">
//                   <TextSlider />
//                 </div>

//                 {/* Stats Cards - Now 2x2 grid */}
//                 <div className="lg:col-span-1">
//                   <StatsCards stats={stats} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </AnimatedGradientBackground>

//       {/* Search Bar - Full width and prominent */}
//       <div className="w-full bg-white border-b border-gray-200 py-8 px-4">
//         <div className="w-full max-w-7xl mx-auto">
//           <div className="text-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Course</h2>
//             <p className="text-gray-600">Search from thousands of courses with detailed ratings and reviews</p>
//           </div>
          
//           <form onSubmit={handleSearchSubmit} className="relative max-w-4xl mx-auto">
//             <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
//             <Input
//               type="text"
//               placeholder="Search courses by title, instructor, or technology... (Press Enter to search)"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="w-full pl-16 pr-6 py-6 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition text-gray-900 placeholder-gray-500 shadow-lg hover:shadow-xl"
//             />
//             <Button 
//               type="submit"
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-5 rounded-xl font-semibold"
//             >
//               Search
//             </Button>
//           </form>
//         </div>
//       </div>

//       {/* Main Content Area - Full width */}
//       <div className="w-full bg-gray-50 min-h-screen">
//         <div className="w-full px-4 py-8">
//           {/* Filters and Courses Container */}
//           <div className="w-full mx-auto">
//             {/* Mobile Filter Toggle */}
//             <div className="lg:hidden mb-6">
//               <Button
//                 onClick={() => setShowFilters(!showFilters)}
//                 variant="outline"
//                 className="w-full flex items-center justify-center gap-2 py-3 text-lg"
//               >
//                 <Filter size={20} />
//                 {showFilters ? 'Hide Filters' : 'Show Filters'}
//                 {hasActiveFilters(filters) && (
//                   <Badge variant="secondary" className="ml-2">
//                     {getActiveFilterCount(filters)}
//                   </Badge>
//                 )}
//               </Button>
//             </div>

//             {/* Full Width Grid Layout */}
//             <div className="w-full">
//               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//                 {/* Sidebar Filters - Span 3 columns on desktop, full width on mobile when toggled */}
//                 <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:col-span-3 space-y-6`}>
//                   {/* Categories Card */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Sparkles className="h-5 w-5 text-blue-600" />
//                         Categories
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-0">
//                       <div className="max-h-96 overflow-y-auto">
//                         <CategoryNavigation 
//                           showCourseCounts={true}
//                           className="p-4"
//                           currentCategory={filters.category_slug}
//                         />
//                       </div>
//                     </CardContent>
//                   </Card>

//                   {/* Advanced Filters */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Filter className="h-5 w-5 text-purple-600" />
//                         Advanced Filters
//                       </CardTitle>
//                       <CardDescription>
//                         Filter by rating, social metrics, and more
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <CourseFilters
//                         filters={filters}
//                         onFiltersChange={updateFilters}
//                         onReset={resetFilters}
//                         availableTags={availableTags}
//                       />
//                     </CardContent>
//                   </Card>

//                   {/* Social Metrics Info */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Heart className="h-5 w-5 text-green-600" />
//                         Social Engagement
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <div className="space-y-3">
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                             <span>Rating & Reviews</span>
//                           </div>
//                           <Badge variant="outline" className="text-xs">
//                             Real user feedback
//                           </Badge>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Heart className="h-4 w-4 text-red-500 fill-red-500" />
//                             <span>Likes</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Course popularity</span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Share2 className="h-4 w-4 text-blue-500" />
//                             <span>Shares</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Social sharing</span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Eye className="h-4 w-4 text-purple-500" />
//                             <span>Views</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Course visibility</span>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>

//                 {/* Main Courses Area - Span 9 columns on desktop */}
//                 <div className="lg:col-span-9">
//                   {/* Results Header - Full width */}
//                   <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
//                     <div className="flex-1">
//                       <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent mb-2">
//                         {filters.category_slug ? (
//                           <>
//                             <Sparkles className="h-6 w-6 text-blue-600 inline mr-2" />
//                             {categories.find(cat => cat.slug === filters.category_slug)?.name}
//                           </>
//                         ) : filters.searchQuery ? (
//                           <>Search: "{filters.searchQuery}"</>
//                         ) : (
//                           <>All Courses</>
//                         )}
//                       </h2>
//                       <p className="text-gray-600 flex items-center gap-2">
//                         {loading ? (
//                           <>
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                             Discovering courses...
//                           </>
//                         ) : (
//                           <>
//                             <span className="font-semibold text-gray-900">{courses.length}</span>
//                             {courses.length === 1 ? ' course' : ' courses'} found
//                             {hasActiveFilters(filters) && (
//                               <span className="text-blue-600 ml-2">• Filtered</span>
//                             )}
//                           </>
//                         )}
//                       </p>
//                     </div>

//                     <div className="flex items-center gap-4">
//                       {/* View Toggle */}
//                       <ViewToggle view={view} onViewChange={setView} />
                      
//                       {/* Clear Filters */}
//                       {hasActiveFilters(filters) && (
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={resetFilters}
//                           className="rounded-lg border-gray-300 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
//                         >
//                           Clear All
//                         </Button>
//                       )}
//                     </div>
//                   </div>

//                   {/* Error State */}
//                   {error && (
//                     <Card className="mb-6 border-red-200 bg-red-50 rounded-2xl overflow-hidden">
//                       <CardContent className="p-6">
//                         <div className="flex items-center gap-3">
//                           <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
//                           <p className="text-red-700 font-medium">Error: {error}</p>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   )}

//                   {/* Loading State */}
//                   {loading && courses.length === 0 && (
//                     <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
//                       <div className="relative inline-block mb-4">
//                         <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
//                         <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
//                       </div>
//                       <p className="text-gray-600 text-lg font-medium">Loading courses...</p>
//                     </div>
//                   )}

//                   {/* Courses Grid/List - Full width */}
//                   {courses.length > 0 ? (
//                     <>
//                       {view === 'grid' ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                           {courses.map((course) => (
//                             <EnhancedCourseCard key={course.id} course={course} />
//                           ))}
//                         </div>
//                       ) : (
//                         <EnhancedCourseListView courses={courses} />
//                       )}

//                       {/* Load More Button */}
//                       {pagination.hasMore && (
//                         <div className="text-center mt-12">
//                           <Button
//                             onClick={loadMore}
//                             disabled={loading}
//                             className="min-w-48 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-0 px-8 py-3 font-semibold"
//                           >
//                             {loading ? (
//                               <>
//                                 <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                                 Loading More...
//                               </>
//                             ) : (
//                               <>
//                                 <Rocket className="h-4 w-4 mr-2" />
//                                 Load More Courses
//                               </>
//                             )}
//                           </Button>
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     /* No Results */
//                     <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
//                       <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <Search className="h-10 w-10 text-gray-400" />
//                       </div>
//                       <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
//                       <p className="text-gray-600 max-w-md mx-auto mb-6">
//                         {filters.searchQuery || hasActiveFilters(filters)
//                           ? "Try adjusting your search criteria or browse all courses."
//                           : "No courses available at the moment. Check back soon!"}
//                       </p>
//                       {(filters.searchQuery || hasActiveFilters(filters)) && (
//                         <Button
//                           onClick={resetFilters}
//                           variant="outline"
//                           className="rounded-lg"
//                         >
//                           Reset Filters
//                         </Button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// function hasActiveFilters(filters: any): boolean {
//   return Object.keys(filters).some(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   });
// }

// function getActiveFilterCount(filters: any): number {
//   return Object.keys(filters).filter(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   }).length;
// }






















// // /app/courses/page.tsx

// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { getCoursesAction } from '@/lib/courses/actions';
// import { getCategoriesAction } from '@/lib/categories/actions';
// import { getTagsAction } from '@/lib/tags/actions';
// import { PremiumCourseCard } from '@/components/courses/premium-course-card';
// import { CategoryNavigation } from '@/components/categories/category-navigation';
// import { CourseFilters } from '@/components/courses/course-filters';
// import { useCourseSearch } from '@/hooks/use-course-search';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Search, 
//   Filter, 
//   Loader2, 
//   Sparkles, 
//   TrendingUp, 
//   Users, 
//   Star, 
//   Zap,
//   Grid3X3,
//   List,
//   Play,
//   ArrowRight,
//   Rocket,
//   Brain,
//   Code,
//   Palette,
//   Heart,
//   Share2,
//   Eye,
//   MessageCircle
// } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Course } from '@/types/courses';
// import { Header } from '@/components/layout/header';
// import { Footer } from '@/components/layout/footer';

// interface CoursesPageProps {
//   searchParams: Promise<{
//     category?: string;
//     search?: string;
//     difficulty?: string;
//     content_type?: string;
//     price_range?: string;
//     min_rating?: string;
//     sort_by?: string;
//   }>;
// }

// // View Toggle Component
// function ViewToggle({ view, onViewChange }: { view: 'grid' | 'list'; onViewChange: (view: 'grid' | 'list') => void }) {
//   return (
//     <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
//       <Button
//         variant={view === 'grid' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('grid')}
//         className={`flex items-center gap-2 ${view === 'grid' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <Grid3X3 className="h-4 w-4" />
//         <span className="hidden sm:inline">Grid</span>
//       </Button>
//       <Button
//         variant={view === 'list' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('list')}
//         className={`flex items-center gap-2 ${view === 'list' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <List className="h-4 w-4" />
//         <span className="hidden sm:inline">List</span>
//       </Button>
//     </div>
//   );
// }

// // Helper functions for formatting
// const formatRating = (rating: any): string => {
//   if (rating === null || rating === undefined || rating === '') return '0.0';
  
//   const numRating = typeof rating === 'string' ? parseFloat(rating) : Number(rating);
  
//   if (isNaN(numRating) || numRating <= 0) return '0.0';
  
//   return numRating.toFixed(1);
// };

// const formatNumber = (num: any): string => {
//   if (num === null || num === undefined || num === '') return '0';
  
//   const numValue = typeof num === 'string' ? parseInt(num) : Number(num);
  
//   return isNaN(numValue) ? '0' : numValue.toLocaleString();
// };

// const formatReviewCount = (count: number | undefined): string => {
//   const num = count || 0;
//   return `${num} review${num !== 1 ? 's' : ''}`;
// };

// const formatDuration = (minutes: number): string => {
//   if (!minutes || minutes === 0) return '0m';
//   if (minutes < 60) return `${minutes}m`;
//   const hours = Math.floor(minutes / 60);
//   const mins = minutes % 60;
//   return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
// };

// // Animated Text Slider Component
// function TextSlider() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const slides = [
//     {
//       icon: <Code className="h-12 w-12 text-blue-400" />,
//       title: "Master Modern Tech",
//       description: "Learn cutting-edge technologies from industry experts",
//       gradient: "from-blue-500 to-cyan-500"
//     },
//     {
//       icon: <Brain className="h-12 w-12 text-purple-400" />,
//       title: "Boost Your Career",
//       description: "Gain skills that companies are hiring for right now",
//       gradient: "from-purple-500 to-pink-500"
//     },
//     {
//       icon: <Rocket className="h-12 w-12 text-orange-400" />,
//       title: "Learn at Light Speed",
//       description: "Accelerate your learning with project-based courses",
//       gradient: "from-orange-500 to-red-500"
//     },
//     {
//       icon: <Palette className="h-12 w-12 text-green-400" />,
//       title: "Unlock Creativity",
//       description: "Transform your ideas into reality with practical skills",
//       gradient: "from-green-500 to-teal-500"
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [slides.length]);

//   return (
//     <div className="relative h-48 md:h-56 lg:h-64 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm p-8 border border-white/20">
//       {/* Subtle background elements */}
//       <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-xl"></div>
      
//       <div className="relative z-10 h-full flex items-center">
//         <div className="flex-1">
//           <div className="relative h-24 overflow-hidden">
//             {slides.map((slide, index) => (
//               <div
//                 key={index}
//                 className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
//                   index === currentSlide
//                     ? 'opacity-100 translate-x-0'
//                     : index < currentSlide
//                     ? 'opacity-0 -translate-x-full'
//                     : 'opacity-0 translate-x-full'
//                 }`}
//               >
//                 <div className="flex items-center space-x-6">
//                   <div className="flex-shrink-0">
//                     {slide.icon}
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
//                       {slide.title}
//                     </h3>
//                     <p className="text-blue-100 text-lg">
//                       {slide.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Slide indicators */}
//       <div className="absolute bottom-6 left-8 flex space-x-2 z-10">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             className={`w-2 h-2 rounded-full transition-all ${
//               index === currentSlide
//                 ? 'bg-white w-6'
//                 : 'bg-white/40'
//             }`}
//             onClick={() => setCurrentSlide(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // Enhanced Stats Cards for Dark Background
// function StatsCards({ stats }: { stats: { courses: number; categories: number; featured: number; skills: number } }) {
//   return (
//     <div className="grid grid-cols-2 gap-4">
//       {/* Top Row - 2 cards */}
//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-blue-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.courses}</div>
//             <div className="text-blue-200 text-sm">Courses</div>
//           </div>
//           <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <TrendingUp className="h-6 w-6 text-blue-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-green-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.categories}</div>
//             <div className="text-green-200 text-sm">Categories</div>
//           </div>
//           <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Users className="h-6 w-6 text-green-300" />
//           </div>
//         </div>
//       </div>

//       {/* Bottom Row - 2 cards */}
//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-yellow-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.featured}</div>
//             <div className="text-yellow-200 text-sm">Featured</div>
//           </div>
//           <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Star className="h-6 w-6 text-yellow-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-purple-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.skills}</div>
//             <div className="text-purple-200 text-sm">Skills</div>
//           </div>
//           <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Zap className="h-6 w-6 text-purple-300" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Enhanced Course Card Component with Full Social Metrics
// function EnhancedCourseCard({ course }: { course: Course }) {
//   const rating = formatRating(course.average_rating);
//   const reviewCount = course.review_count || 0;
//   const likeCount = course.like_count || 0;
//   const shareCount = course.share_count || 0;
//   const viewCount = course.total_views || 0;
  
//   return (
//     <Link href={`/courses/${course.slug}`}>
//       <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group cursor-pointer h-full border border-gray-100">
//         {/* Course Image with Play Button */}
//         <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
//           <img
//             src={course.thumbnail_url || "/placeholder-course.png"}
//             alt={course.title}
//             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//           />
//           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
//             <div className="bg-white rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform">
//               <Play size={32} className="text-blue-600 fill-blue-600" />
//             </div>
//           </div>
//           <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
//             course.is_featured 
//               ? 'bg-yellow-500 text-white' 
//               : course.is_trending 
//               ? 'bg-green-500 text-white'
//               : 'bg-blue-500 text-white'
//           }`}>
//             {course.is_featured ? 'FEATURED' : course.is_trending ? 'TRENDING' : 'NEW'}
//           </span>
//         </div>

//         {/* Course Info */}
//         <div className="p-5">
//           {/* Category Badge */}
//           {course.category_name && (
//             <div className="mb-2">
//               <Badge variant="outline" className="text-xs">
//                 {course.category_name}
//               </Badge>
//             </div>
//           )}
          
//           <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 leading-tight">
//             {course.title}
//           </h3>
          
//           {/* Short Description */}
//           {course.short_description && (
//             <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//               {course.short_description}
//             </p>
//           )}

//           {/* Instructor */}
//           <div className="flex items-center gap-2 mb-4">
//             <p className="text-sm text-gray-600 truncate">
//               {course.instructor_name || 'Expert Instructor'}
//             </p>
//           </div>

//           {/* Social Engagement Metrics */}
//           <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
//             <div className="flex items-center gap-3">
//               {/* Likes */}
//               {likeCount > 0 && (
//                 <div className="flex items-center gap-1 text-red-500">
//                   <Heart size={14} className="fill-red-500" />
//                   <span className="text-xs font-semibold">{formatNumber(likeCount)}</span>
//                 </div>
//               )}
              
//               {/* Shares */}
//               {shareCount > 0 && (
//                 <div className="flex items-center gap-1 text-blue-500">
//                   <Share2 size={14} />
//                   <span className="text-xs font-semibold">{formatNumber(shareCount)}</span>
//                 </div>
//               )}
              
//               {/* Views */}
//               {viewCount > 0 && (
//                 <div className="flex items-center gap-1 text-purple-500">
//                   <Eye size={14} />
//                   <span className="text-xs font-semibold">{formatNumber(viewCount)}</span>
//                 </div>
//               )}
//             </div>
            
//             {/* Rating and Reviews */}
//             {parseFloat(rating) > 0 && (
//               <div className="flex items-center gap-1">
//                 <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//                 <span className="text-xs font-semibold text-gray-900">{rating}</span>
//                 {reviewCount > 0 && (
//                   <span className="text-xs text-gray-500">({formatNumber(reviewCount)})</span>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Course Stats */}
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-4 text-sm text-gray-500">
//               {/* Rating */}
//               {parseFloat(rating) > 0 && (
//                 <div className="flex items-center gap-1">
//                   <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                   <span className="font-semibold text-gray-900">{rating}</span>
//                 </div>
//               )}
              
//               {/* Students */}
//               <div className="flex items-center gap-1">
//                 <Users className="h-4 w-4" />
//                 <span>{formatNumber(course.enrolled_students_count)}</span>
//               </div>
              
//               {/* Duration */}
//               {course.total_video_duration && (
//                 <div className="flex items-center gap-1">
//                   <span>⏱️ {formatDuration(course.total_video_duration)}</span>
//                 </div>
//               )}
//             </div>
            
//             {/* Price */}
//             <span className="text-blue-600 font-bold text-lg">
//               {course.price_cents === 0 ? 'FREE' : `$${(course.price_cents / 100).toFixed(2)}`}
//             </span>
//           </div>

//           {/* View Course Button */}
//           <Button className="w-full group/btn bg-gray-900 hover:bg-gray-800 text-white" asChild>
//             <div>
//               View Course
//               <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
//             </div>
//           </Button>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // Enhanced Course List View with Social Metrics
// function EnhancedCourseListView({ courses }: { courses: Course[] }) {
//   const formatPrice = (priceCents: number) => {
//     if (priceCents === 0) return 'FREE';
//     return `$${(priceCents / 100).toFixed(2)}`;
//   };

//   return (
//     <div className="space-y-4">
//       {courses.map((course) => {
//         const rating = formatRating(course.average_rating);
//         const reviewCount = course.review_count || 0;
//         const likeCount = course.like_count || 0;
//         const shareCount = course.share_count || 0;
//         const viewCount = course.total_views || 0;
        
//         return (
//           <Link key={course.id} href={`/courses/${course.slug}`}>
//             <div className="flex flex-col lg:flex-row gap-6 p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all group cursor-pointer">
//               {/* Course Thumbnail */}
//               <div className="relative w-full lg:w-64 h-48 rounded-lg overflow-hidden flex-shrink-0">
//                 <img
//                   src={course.thumbnail_url || "/placeholder-course.png"}
//                   alt={course.title}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                 />
//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
//                   <div className="bg-white rounded-full p-2 transform scale-0 group-hover:scale-100 transition-transform">
//                     <Play size={20} className="text-blue-600 fill-blue-600" />
//                   </div>
//                 </div>
//               </div>

//               {/* Course Info */}
//               <div className="flex-1 min-w-0">
//                 <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-3 gap-4">
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 mb-2 flex-wrap">
//                       {course.category_name && (
//                         <Badge variant="outline" className="text-xs">
//                           {course.category_name}
//                         </Badge>
//                       )}
//                       {course.is_featured && (
//                         <Badge className="bg-yellow-500 text-white border-0 text-xs">
//                           FEATURED
//                         </Badge>
//                       )}
//                       {course.is_trending && (
//                         <Badge className="bg-green-500 text-white border-0 text-xs">
//                           TRENDING
//                         </Badge>
//                       )}
//                     </div>
//                     <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
//                       {course.title}
//                     </h3>
//                     {course.short_description && (
//                       <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                         {course.short_description}
//                       </p>
//                     )}
                    
//                     {/* Social Engagement Metrics - Row 1 */}
//                     <div className="flex items-center gap-4 mb-3">
//                       {/* Rating and Reviews */}
//                       {parseFloat(rating) > 0 && (
//                         <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
//                           <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//                           <span className="text-xs font-semibold text-gray-900">{rating}</span>
//                           {reviewCount > 0 && (
//                             <span className="text-xs text-gray-600">({formatNumber(reviewCount)})</span>
//                           )}
//                         </div>
//                       )}
                      
//                       {/* Students */}
//                       {course.enrolled_students_count && (
//                         <div className="flex items-center gap-1 text-gray-600">
//                           <Users size={14} />
//                           <span className="text-xs">{formatNumber(course.enrolled_students_count)} students</span>
//                         </div>
//                       )}
                      
//                       {/* Duration */}
//                       {course.total_video_duration && (
//                         <div className="flex items-center gap-1 text-gray-600">
//                           <span className="text-xs">⏱️ {formatDuration(course.total_video_duration)}</span>
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* Social Engagement Metrics - Row 2 */}
//                     <div className="flex items-center gap-4">
//                       {/* Likes */}
//                       {likeCount > 0 && (
//                         <div className="flex items-center gap-1 text-red-500">
//                           <Heart size={12} className="fill-red-500" />
//                           <span className="text-xs">{formatNumber(likeCount)} likes</span>
//                         </div>
//                       )}
                      
//                       {/* Shares */}
//                       {shareCount > 0 && (
//                         <div className="flex items-center gap-1 text-blue-500">
//                           <Share2 size={12} />
//                           <span className="text-xs">{formatNumber(shareCount)} shares</span>
//                         </div>
//                       )}
                      
//                       {/* Views */}
//                       {viewCount > 0 && (
//                         <div className="flex items-center gap-1 text-purple-500">
//                           <Eye size={12} />
//                           <span className="text-xs">{formatNumber(viewCount)} views</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
                  
//                   {/* Price and Instructor */}
//                   <div className="flex-shrink-0 lg:text-right">
//                     <div className="text-blue-600 font-bold text-lg mb-2">
//                       {formatPrice(course.price_cents || 0)}
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       {course.instructor_name || 'Expert Instructor'}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Link>
//         );
//       })}
//     </div>
//   );
// }

// // Animated Gradient Background Component
// function AnimatedGradientBackground({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="relative w-full overflow-hidden">
//       {/* Animated Gradient Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900">
//         {/* Animated orbs */}
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
//         <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1500"></div>
        
//         {/* Grid pattern overlay */}
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
//       </div>
      
//       {/* Content */}
//       <div className="relative z-10">
//         {children}
//       </div>
//     </div>
//   );
// }

// export default function CoursesPage({ searchParams }: CoursesPageProps) {
//   const resolvedSearchParams = React.use(searchParams);
  
//   const [initialCourses, setInitialCourses] = useState<Course[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [availableTags, setAvailableTags] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [view, setView] = useState<'grid' | 'list'>('grid');

//   const {
//     courses,
//     loading,
//     error,
//     filters,
//     pagination,
//     updateFilters,
//     resetFilters,
//     loadMore
//   } = useCourseSearch(initialCourses);

//   useEffect(() => {
//     async function fetchInitialData() {
//       try {
//         setIsLoading(true);
        
//         const [coursesResult, categoriesResult, tagsResult] = await Promise.all([
//           getCoursesAction({
//             is_published: true,
//             category_slug: resolvedSearchParams.category,
//             limit: 100, // Increased limit to show more courses
//             include_reviews: true // Ensure reviews are included
//           }),
//           getCategoriesAction(),
//           getTagsAction()
//         ]);

//         setInitialCourses(coursesResult.courses || []);
//         setCategories(categoriesResult.categories || []);
//         setAvailableTags(tagsResult.tags || []);
        
//         // Log course data for debugging
//         console.log('=== COURSES PAGE DATA ===');
//         (coursesResult.courses || []).forEach((course: any, index: number) => {
//           console.log(`${index + 1}. ${course.title}`);
//           console.log(`   Rating: ${course.average_rating}`);
//           console.log(`   Reviews: ${course.review_count}`);
//           console.log(`   Likes: ${course.like_count}`);
//           console.log(`   Shares: ${course.share_count}`);
//         });
//       } catch (error) {
//         console.error('Error fetching initial data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchInitialData();
//   }, [resolvedSearchParams.category]);

//   useEffect(() => {
//     const urlFilters = {
//       searchQuery: resolvedSearchParams.search || '',
//       category_slug: resolvedSearchParams.category || '',
//       difficulty: resolvedSearchParams.difficulty || '',
//       content_type: resolvedSearchParams.content_type || '',
//       price_range: resolvedSearchParams.price_range || '',
//       min_rating: parseFloat(resolvedSearchParams.min_rating || '0'),
//       sort_by: resolvedSearchParams.sort_by || 'relevance'
//     };
    
//     if (Object.values(urlFilters).some(value => value !== '' && value !== 0)) {
//       updateFilters(urlFilters);
//       setSearchQuery(urlFilters.searchQuery);
//     }
//   }, [resolvedSearchParams]);

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     updateFilters({ searchQuery: searchQuery });
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       updateFilters({ searchQuery: searchQuery });
//     }
//   };

//   // Calculate stats
//   const totalCourses = pagination.total;
//   const totalCategories = categories.length;
//   const totalTags = availableTags.length;
//   const featuredCourses = courses.filter(course => course.is_featured).length;

//   const stats = {
//     courses: totalCourses,
//     categories: totalCategories,
//     featured: featuredCourses,
//     skills: totalTags
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="container mx-auto px-4 py-8">
//           <div className="max-w-7xl mx-auto text-center py-20">
//             <div className="relative inline-block">
//               <Loader2 className="h-12 w-12 animate-spin mx-auto mb-6 text-blue-600" />
//               <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
//             </div>
//             <p className="text-gray-600 text-lg font-medium">Loading amazing courses...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
      
//       {/* Hero Section with Animated Gradient Background */}
//       <AnimatedGradientBackground>
//         <div className="w-full px-4 py-16">
//           <div className="w-full mx-auto">
//             {/* Enhanced Header Section */}
//             <div className="mb-12">
//               <div className="text-center mb-8">
//                 <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
//                   Explore Courses
//                 </h1>
//                 <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
//                   Discover your next learning adventure in our comprehensive learning platform
//                 </p>
//               </div>

//               {/* Hero Section with Text Slider and Stats */}
//               <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
//                 {/* Text Slider */}
//                 <div className="lg:col-span-1">
//                   <TextSlider />
//                 </div>

//                 {/* Stats Cards - Now 2x2 grid */}
//                 <div className="lg:col-span-1">
//                   <StatsCards stats={stats} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </AnimatedGradientBackground>

//       {/* Search Bar - Full width and prominent */}
//       <div className="w-full bg-white border-b border-gray-200 py-8 px-4">
//         <div className="w-full max-w-7xl mx-auto">
//           <div className="text-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Course</h2>
//             <p className="text-gray-600">Search from thousands of courses with detailed ratings and reviews</p>
//           </div>
          
//           <form onSubmit={handleSearchSubmit} className="relative max-w-4xl mx-auto">
//             <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
//             <Input
//               type="text"
//               placeholder="Search courses by title, instructor, or technology... (Press Enter to search)"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="w-full pl-16 pr-6 py-6 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition text-gray-900 placeholder-gray-500 shadow-lg hover:shadow-xl"
//             />
//             <Button 
//               type="submit"
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-5 rounded-xl font-semibold"
//             >
//               Search
//             </Button>
//           </form>
//         </div>
//       </div>

//       {/* Main Content Area - Full width */}
//       <div className="w-full bg-gray-50 min-h-screen">
//         <div className="w-full px-4 py-8">
//           {/* Filters and Courses Container */}
//           <div className="w-full mx-auto">
//             {/* Mobile Filter Toggle */}
//             <div className="lg:hidden mb-6">
//               <Button
//                 onClick={() => setShowFilters(!showFilters)}
//                 variant="outline"
//                 className="w-full flex items-center justify-center gap-2 py-3 text-lg"
//               >
//                 <Filter size={20} />
//                 {showFilters ? 'Hide Filters' : 'Show Filters'}
//                 {hasActiveFilters(filters) && (
//                   <Badge variant="secondary" className="ml-2">
//                     {getActiveFilterCount(filters)}
//                   </Badge>
//                 )}
//               </Button>
//             </div>

//             {/* Full Width Grid Layout */}
//             <div className="w-full">
//               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//                 {/* Sidebar Filters - Span 3 columns on desktop, full width on mobile when toggled */}
//                 <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:col-span-3 space-y-6`}>
//                   {/* Categories Card */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Sparkles className="h-5 w-5 text-blue-600" />
//                         Categories
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-0">
//                       <div className="max-h-96 overflow-y-auto">
//                         <CategoryNavigation 
//                           showCourseCounts={true}
//                           className="p-4"
//                           currentCategory={filters.category_slug}
//                         />
//                       </div>
//                     </CardContent>
//                   </Card>

//                   {/* Advanced Filters */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Filter className="h-5 w-5 text-purple-600" />
//                         Advanced Filters
//                       </CardTitle>
//                       <CardDescription>
//                         Filter by rating, social metrics, and more
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <CourseFilters
//                         filters={filters}
//                         onFiltersChange={updateFilters}
//                         onReset={resetFilters}
//                         availableTags={availableTags}
//                       />
//                     </CardContent>
//                   </Card>

//                   {/* Social Metrics Info */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Heart className="h-5 w-5 text-green-600" />
//                         Social Engagement
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <div className="space-y-3">
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                             <span>Rating & Reviews</span>
//                           </div>
//                           <Badge variant="outline" className="text-xs">
//                             Real user feedback
//                           </Badge>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Heart className="h-4 w-4 text-red-500 fill-red-500" />
//                             <span>Likes</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Course popularity</span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Share2 className="h-4 w-4 text-blue-500" />
//                             <span>Shares</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Social sharing</span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Eye className="h-4 w-4 text-purple-500" />
//                             <span>Views</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Course visibility</span>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>

//                 {/* Main Courses Area - Span 9 columns on desktop */}
//                 <div className="lg:col-span-9">
//                   {/* Results Header - Full width */}
//                   <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
//                     <div className="flex-1">
//                       <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent mb-2">
//                         {filters.category_slug ? (
//                           <>
//                             <Sparkles className="h-6 w-6 text-blue-600 inline mr-2" />
//                             {categories.find(cat => cat.slug === filters.category_slug)?.name}
//                           </>
//                         ) : filters.searchQuery ? (
//                           <>Search: "{filters.searchQuery}"</>
//                         ) : (
//                           <>All Courses</>
//                         )}
//                       </h2>
//                       <p className="text-gray-600 flex items-center gap-2">
//                         {loading ? (
//                           <>
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                             Discovering courses...
//                           </>
//                         ) : (
//                           <>
//                             <span className="font-semibold text-gray-900">{courses.length}</span>
//                             {courses.length === 1 ? ' course' : ' courses'} found
//                             {hasActiveFilters(filters) && (
//                               <span className="text-blue-600 ml-2">• Filtered</span>
//                             )}
//                           </>
//                         )}
//                       </p>
//                     </div>

//                     <div className="flex items-center gap-4">
//                       {/* View Toggle */}
//                       <ViewToggle view={view} onViewChange={setView} />
                      
//                       {/* Clear Filters */}
//                       {hasActiveFilters(filters) && (
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={resetFilters}
//                           className="rounded-lg border-gray-300 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
//                         >
//                           Clear All
//                         </Button>
//                       )}
//                     </div>
//                   </div>

//                   {/* Error State */}
//                   {error && (
//                     <Card className="mb-6 border-red-200 bg-red-50 rounded-2xl overflow-hidden">
//                       <CardContent className="p-6">
//                         <div className="flex items-center gap-3">
//                           <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
//                           <p className="text-red-700 font-medium">Error: {error}</p>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   )}

//                   {/* Loading State */}
//                   {loading && courses.length === 0 && (
//                     <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
//                       <div className="relative inline-block mb-4">
//                         <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
//                         <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
//                       </div>
//                       <p className="text-gray-600 text-lg font-medium">Loading courses...</p>
//                     </div>
//                   )}

//                   {/* Courses Grid/List - Full width */}
//                   {courses.length > 0 ? (
//                     <>
//                       {view === 'grid' ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                           {courses.map((course) => (
//                             <EnhancedCourseCard key={course.id} course={course} />
//                           ))}
//                         </div>
//                       ) : (
//                         <EnhancedCourseListView courses={courses} />
//                       )}

//                       {/* Load More Button */}
//                       {pagination.hasMore && (
//                         <div className="text-center mt-12">
//                           <Button
//                             onClick={loadMore}
//                             disabled={loading}
//                             className="min-w-48 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-0 px-8 py-3 font-semibold"
//                           >
//                             {loading ? (
//                               <>
//                                 <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                                 Loading More...
//                               </>
//                             ) : (
//                               <>
//                                 <Rocket className="h-4 w-4 mr-2" />
//                                 Load More Courses
//                               </>
//                             )}
//                           </Button>
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     /* No Results */
//                     <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
//                       <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <Search className="h-10 w-10 text-gray-400" />
//                       </div>
//                       <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
//                       <p className="text-gray-600 max-w-md mx-auto mb-6">
//                         {filters.searchQuery || hasActiveFilters(filters)
//                           ? "Try adjusting your search criteria or browse all courses."
//                           : "No courses available at the moment. Check back soon!"}
//                       </p>
//                       {(filters.searchQuery || hasActiveFilters(filters)) && (
//                         <Button
//                           onClick={resetFilters}
//                           variant="outline"
//                           className="rounded-lg"
//                         >
//                           Reset Filters
//                         </Button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// function hasActiveFilters(filters: any): boolean {
//   return Object.keys(filters).some(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   });
// }

// function getActiveFilterCount(filters: any): number {
//   return Object.keys(filters).filter(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   }).length;
// }

























// /app/courses/page.tsx

// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { getCoursesAction } from '@/lib/courses/actions';
// import { getCategoriesAction } from '@/lib/categories/actions';
// import { getTagsAction } from '@/lib/tags/actions';
// import { PremiumCourseCard } from '@/components/courses/premium-course-card';
// import { CategoryNavigation } from '@/components/categories/category-navigation';
// import { CourseFilters } from '@/components/courses/course-filters';
// import { useCourseSearch } from '@/hooks/use-course-search';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Search, 
//   Filter, 
//   Loader2, 
//   Sparkles, 
//   TrendingUp, 
//   Users, 
//   Star, 
//   Zap,
//   Grid3X3,
//   List,
//   Play,
//   ArrowRight,
//   Rocket,
//   Brain,
//   Code,
//   Palette,
//   Heart,
//   Share2,
//   Eye,
//   MessageCircle
// } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Course } from '@/types/courses';
// import { Header } from '@/components/layout/header';
// import { Footer } from '@/components/layout/footer';

// interface CoursesPageProps {
//   searchParams: Promise<{
//     category?: string;
//     search?: string;
//     difficulty?: string;
//     content_type?: string;
//     price_range?: string;
//     min_rating?: string;
//     sort_by?: string;
//   }>;
// }

// // View Toggle Component
// function ViewToggle({ view, onViewChange }: { view: 'grid' | 'list'; onViewChange: (view: 'grid' | 'list') => void }) {
//   return (
//     <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
//       <Button
//         variant={view === 'grid' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('grid')}
//         className={`flex items-center gap-2 ${view === 'grid' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <Grid3X3 className="h-4 w-4" />
//         <span className="hidden sm:inline">Grid</span>
//       </Button>
//       <Button
//         variant={view === 'list' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('list')}
//         className={`flex items-center gap-2 ${view === 'list' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <List className="h-4 w-4" />
//         <span className="hidden sm:inline">List</span>
//       </Button>
//     </div>
//   );
// }

// // FIXED: Updated formatRating function to always return a string
// const formatRating = (rating: any): string => {
//   if (rating === null || rating === undefined || rating === '') return '0.0';
  
//   const numRating = typeof rating === 'string' ? parseFloat(rating) : Number(rating);
  
//   if (isNaN(numRating) || numRating <= 0) return '0.0';
  
//   return numRating.toFixed(1);
// };

// // FIXED: Better formatRating function that handles edge cases
// const getRatingDisplay = (rating: any, reviewCount: any): { rating: string; hasRating: boolean } => {
//   const formattedRating = formatRating(rating);
//   const numReviewCount = reviewCount || 0;
  
//   return {
//     rating: formattedRating,
//     hasRating: parseFloat(formattedRating) > 0 && numReviewCount > 0
//   };
// };

// const formatNumber = (num: any): string => {
//   if (num === null || num === undefined || num === '') return '0';
  
//   const numValue = typeof num === 'string' ? parseInt(num) : Number(num);
  
//   return isNaN(numValue) ? '0' : numValue.toLocaleString();
// };

// const formatReviewCount = (count: number | undefined): string => {
//   const num = count || 0;
//   return `${num} review${num !== 1 ? 's' : ''}`;
// };

// const formatDuration = (minutes: number): string => {
//   if (!minutes || minutes === 0) return '0m';
//   if (minutes < 60) return `${minutes}m`;
//   const hours = Math.floor(minutes / 60);
//   const mins = minutes % 60;
//   return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
// };

// // Animated Text Slider Component
// function TextSlider() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const slides = [
//     {
//       icon: <Code className="h-12 w-12 text-blue-400" />,
//       title: "Master Modern Tech",
//       description: "Learn cutting-edge technologies from industry experts",
//       gradient: "from-blue-500 to-cyan-500"
//     },
//     {
//       icon: <Brain className="h-12 w-12 text-purple-400" />,
//       title: "Boost Your Career",
//       description: "Gain skills that companies are hiring for right now",
//       gradient: "from-purple-500 to-pink-500"
//     },
//     {
//       icon: <Rocket className="h-12 w-12 text-orange-400" />,
//       title: "Learn at Light Speed",
//       description: "Accelerate your learning with project-based courses",
//       gradient: "from-orange-500 to-red-500"
//     },
//     {
//       icon: <Palette className="h-12 w-12 text-green-400" />,
//       title: "Unlock Creativity",
//       description: "Transform your ideas into reality with practical skills",
//       gradient: "from-green-500 to-teal-500"
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [slides.length]);

//   return (
//     <div className="relative h-48 md:h-56 lg:h-64 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm p-8 border border-white/20">
//       {/* Subtle background elements */}
//       <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-xl"></div>
      
//       <div className="relative z-10 h-full flex items-center">
//         <div className="flex-1">
//           <div className="relative h-24 overflow-hidden">
//             {slides.map((slide, index) => (
//               <div
//                 key={index}
//                 className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
//                   index === currentSlide
//                     ? 'opacity-100 translate-x-0'
//                     : index < currentSlide
//                     ? 'opacity-0 -translate-x-full'
//                     : 'opacity-0 translate-x-full'
//                 }`}
//               >
//                 <div className="flex items-center space-x-6">
//                   <div className="flex-shrink-0">
//                     {slide.icon}
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
//                       {slide.title}
//                     </h3>
//                     <p className="text-blue-100 text-lg">
//                       {slide.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Slide indicators */}
//       <div className="absolute bottom-6 left-8 flex space-x-2 z-10">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             className={`w-2 h-2 rounded-full transition-all ${
//               index === currentSlide
//                 ? 'bg-white w-6'
//                 : 'bg-white/40'
//             }`}
//             onClick={() => setCurrentSlide(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // Enhanced Stats Cards for Dark Background
// function StatsCards({ stats }: { stats: { courses: number; categories: number; featured: number; skills: number } }) {
//   return (
//     <div className="grid grid-cols-2 gap-4">
//       {/* Top Row - 2 cards */}
//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-blue-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.courses}</div>
//             <div className="text-blue-200 text-sm">Courses</div>
//           </div>
//           <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <TrendingUp className="h-6 w-6 text-blue-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-green-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.categories}</div>
//             <div className="text-green-200 text-sm">Categories</div>
//           </div>
//           <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Users className="h-6 w-6 text-green-300" />
//           </div>
//         </div>
//       </div>

//       {/* Bottom Row - 2 cards */}
//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-yellow-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.featured}</div>
//             <div className="text-yellow-200 text-sm">Featured</div>
//           </div>
//           <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Star className="h-6 w-6 text-yellow-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-purple-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.skills}</div>
//             <div className="text-purple-200 text-sm">Skills</div>
//           </div>
//           <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Zap className="h-6 w-6 text-purple-300" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // FIXED: Enhanced Course Card Component with working rating display
// function EnhancedCourseCard({ course }: { course: Course }) {
//   const { rating, hasRating } = getRatingDisplay(course.average_rating, course.review_count);
//   const reviewCount = course.review_count || 0;
//   const likeCount = course.like_count || 0;
//   const shareCount = course.share_count || 0;
//   const viewCount = course.total_views || 0;
  
//   return (
//     <Link href={`/courses/${course.slug}`}>
//       <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group cursor-pointer h-full border border-gray-100">
//         {/* Course Image with Play Button */}
//         <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
//           <img
//             src={course.thumbnail_url || "/placeholder-course.png"}
//             alt={course.title}
//             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//           />
//           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
//             <div className="bg-white rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform">
//               <Play size={32} className="text-blue-600 fill-blue-600" />
//             </div>
//           </div>
//           <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
//             course.is_featured 
//               ? 'bg-yellow-500 text-white' 
//               : course.is_trending 
//               ? 'bg-green-500 text-white'
//               : 'bg-blue-500 text-white'
//           }`}>
//             {course.is_featured ? 'FEATURED' : course.is_trending ? 'TRENDING' : 'NEW'}
//           </span>
//         </div>

//         {/* Course Info */}
//         <div className="p-5">
//           {/* Category Badge */}
//           {course.category_name && (
//             <div className="mb-2">
//               <Badge variant="outline" className="text-xs">
//                 {course.category_name}
//               </Badge>
//             </div>
//           )}
          
//           <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 leading-tight">
//             {course.title}
//           </h3>
          
//           {/* Short Description */}
//           {course.short_description && (
//             <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//               {course.short_description}
//             </p>
//           )}

//           {/* Instructor */}
//           <div className="flex items-center gap-2 mb-4">
//             <p className="text-sm text-gray-600 truncate">
//               {course.instructor_name || 'Expert Instructor'}
//             </p>
//           </div>

//           {/* Social Engagement Metrics */}
//           <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
//             <div className="flex items-center gap-3">
//               {/* Likes */}
//               {likeCount > 0 && (
//                 <div className="flex items-center gap-1 text-red-500">
//                   <Heart size={14} className="fill-red-500" />
//                   <span className="text-xs font-semibold">{formatNumber(likeCount)}</span>
//                 </div>
//               )}
              
//               {/* Shares */}
//               {shareCount > 0 && (
//                 <div className="flex items-center gap-1 text-blue-500">
//                   <Share2 size={14} />
//                   <span className="text-xs font-semibold">{formatNumber(shareCount)}</span>
//                 </div>
//               )}
              
//               {/* Views */}
//               {viewCount > 0 && (
//                 <div className="flex items-center gap-1 text-purple-500">
//                   <Eye size={14} />
//                   <span className="text-xs font-semibold">{formatNumber(viewCount)}</span>
//                 </div>
//               )}
//             </div>
            
//             {/* FIXED: Rating and Reviews - Always show rating, show review count if available */}
//             <div className="flex items-center gap-1">
//               <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//               <span className="text-xs font-semibold text-gray-900">{rating}</span>
//               {hasRating && reviewCount > 0 && (
//                 <span className="text-xs text-gray-500">({formatNumber(reviewCount)})</span>
//               )}
//             </div>
//           </div>

//           {/* Course Stats */}
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-4 text-sm text-gray-500">
//               {/* FIXED: Rating always visible */}
//               <div className="flex items-center gap-1">
//                 <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                 <span className="font-semibold text-gray-900">{rating}</span>
//               </div>
              
//               {/* Students */}
//               <div className="flex items-center gap-1">
//                 <Users className="h-4 w-4" />
//                 <span>{formatNumber(course.enrolled_students_count)}</span>
//               </div>
              
//               {/* Duration */}
//               {course.total_video_duration && (
//                 <div className="flex items-center gap-1">
//                   <span>⏱️ {formatDuration(course.total_video_duration)}</span>
//                 </div>
//               )}
//             </div>
            
//             {/* Price */}
//             <span className="text-blue-600 font-bold text-lg">
//               {course.price_cents === 0 ? 'FREE' : `$${(course.price_cents / 100).toFixed(2)}`}
//             </span>
//           </div>

//           {/* View Course Button */}
//           <Button className="w-full group/btn bg-gray-900 hover:bg-gray-800 text-white" asChild>
//             <div>
//               View Course
//               <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
//             </div>
//           </Button>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // FIXED: Enhanced Course List View with working rating display
// function EnhancedCourseListView({ courses }: { courses: Course[] }) {
//   const formatPrice = (priceCents: number) => {
//     if (priceCents === 0) return 'FREE';
//     return `$${(priceCents / 100).toFixed(2)}`;
//   };

//   return (
//     <div className="space-y-4">
//       {courses.map((course) => {
//         const { rating, hasRating } = getRatingDisplay(course.average_rating, course.review_count);
//         const reviewCount = course.review_count || 0;
//         const likeCount = course.like_count || 0;
//         const shareCount = course.share_count || 0;
//         const viewCount = course.total_views || 0;
        
//         return (
//           <Link key={course.id} href={`/courses/${course.slug}`}>
//             <div className="flex flex-col lg:flex-row gap-6 p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all group cursor-pointer">
//               {/* Course Thumbnail */}
//               <div className="relative w-full lg:w-64 h-48 rounded-lg overflow-hidden flex-shrink-0">
//                 <img
//                   src={course.thumbnail_url || "/placeholder-course.png"}
//                   alt={course.title}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                 />
//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
//                   <div className="bg-white rounded-full p-2 transform scale-0 group-hover:scale-100 transition-transform">
//                     <Play size={20} className="text-blue-600 fill-blue-600" />
//                   </div>
//                 </div>
//               </div>

//               {/* Course Info */}
//               <div className="flex-1 min-w-0">
//                 <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-3 gap-4">
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 mb-2 flex-wrap">
//                       {course.category_name && (
//                         <Badge variant="outline" className="text-xs">
//                           {course.category_name}
//                         </Badge>
//                       )}
//                       {course.is_featured && (
//                         <Badge className="bg-yellow-500 text-white border-0 text-xs">
//                           FEATURED
//                         </Badge>
//                       )}
//                       {course.is_trending && (
//                         <Badge className="bg-green-500 text-white border-0 text-xs">
//                           TRENDING
//                         </Badge>
//                       )}
//                     </div>
//                     <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
//                       {course.title}
//                     </h3>
//                     {course.short_description && (
//                       <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                         {course.short_description}
//                       </p>
//                     )}
                    
//                     {/* Social Engagement Metrics - Row 1 */}
//                     <div className="flex items-center gap-4 mb-3">
//                       {/* FIXED: Rating always visible */}
//                       <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
//                         <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//                         <span className="text-xs font-semibold text-gray-900">{rating}</span>
//                         {hasRating && reviewCount > 0 && (
//                           <span className="text-xs text-gray-600">({formatNumber(reviewCount)})</span>
//                         )}
//                       </div>
                      
//                       {/* Students */}
//                       {course.enrolled_students_count && (
//                         <div className="flex items-center gap-1 text-gray-600">
//                           <Users size={14} />
//                           <span className="text-xs">{formatNumber(course.enrolled_students_count)} students</span>
//                         </div>
//                       )}
                      
//                       {/* Duration */}
//                       {course.total_video_duration && (
//                         <div className="flex items-center gap-1 text-gray-600">
//                           <span className="text-xs">⏱️ {formatDuration(course.total_video_duration)}</span>
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* Social Engagement Metrics - Row 2 */}
//                     <div className="flex items-center gap-4">
//                       {/* Likes */}
//                       {likeCount > 0 && (
//                         <div className="flex items-center gap-1 text-red-500">
//                           <Heart size={12} className="fill-red-500" />
//                           <span className="text-xs">{formatNumber(likeCount)} likes</span>
//                         </div>
//                       )}
                      
//                       {/* Shares */}
//                       {shareCount > 0 && (
//                         <div className="flex items-center gap-1 text-blue-500">
//                           <Share2 size={12} />
//                           <span className="text-xs">{formatNumber(shareCount)} shares</span>
//                         </div>
//                       )}
                      
//                       {/* Views */}
//                       {viewCount > 0 && (
//                         <div className="flex items-center gap-1 text-purple-500">
//                           <Eye size={12} />
//                           <span className="text-xs">{formatNumber(viewCount)} views</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
                  
//                   {/* Price and Instructor */}
//                   <div className="flex-shrink-0 lg:text-right">
//                     <div className="text-blue-600 font-bold text-lg mb-2">
//                       {formatPrice(course.price_cents || 0)}
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       {course.instructor_name || 'Expert Instructor'}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Link>
//         );
//       })}
//     </div>
//   );
// }

// // Animated Gradient Background Component
// function AnimatedGradientBackground({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="relative w-full overflow-hidden">
//       {/* Animated Gradient Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900">
//         {/* Animated orbs */}
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
//         <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1500"></div>
        
//         {/* Grid pattern overlay */}
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
//       </div>
      
//       {/* Content */}
//       <div className="relative z-10">
//         {children}
//       </div>
//     </div>
//   );
// }

// export default function CoursesPage({ searchParams }: CoursesPageProps) {
//   const resolvedSearchParams = React.use(searchParams);
  
//   const [initialCourses, setInitialCourses] = useState<Course[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [availableTags, setAvailableTags] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [view, setView] = useState<'grid' | 'list'>('grid');

//   const {
//     courses,
//     loading,
//     error,
//     filters,
//     pagination,
//     updateFilters,
//     resetFilters,
//     loadMore
//   } = useCourseSearch(initialCourses);

//   useEffect(() => {
//     async function fetchInitialData() {
//       try {
//         setIsLoading(true);
        
//         const [coursesResult, categoriesResult, tagsResult] = await Promise.all([
//           getCoursesAction({
//             is_published: true,
//             category_slug: resolvedSearchParams.category,
//             limit: 100,
//             include_reviews: true // This is IMPORTANT for getting ratings
//           }),
//           getCategoriesAction(),
//           getTagsAction()
//         ]);

//         setInitialCourses(coursesResult.courses || []);
//         setCategories(categoriesResult.categories || []);
//         setAvailableTags(tagsResult.tags || []);
        
//         // Debug logging to check if ratings are being fetched
//         console.log('=== COURSES PAGE - DEBUG RATINGS ===');
//         console.log('Total courses:', coursesResult.courses?.length || 0);
        
//         (coursesResult.courses || []).forEach((course: any, index: number) => {
//           console.log(`${index + 1}. ${course.title}`);
//           console.log(`   Average Rating: ${course.average_rating} (type: ${typeof course.average_rating})`);
//           console.log(`   Review Count: ${course.review_count}`);
//           console.log(`   Has rating: ${!!course.average_rating}`);
//           console.log(`   Formatted rating: ${formatRating(course.average_rating)}`);
//         });
//       } catch (error) {
//         console.error('Error fetching initial data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchInitialData();
//   }, [resolvedSearchParams.category]);

//   useEffect(() => {
//     const urlFilters = {
//       searchQuery: resolvedSearchParams.search || '',
//       category_slug: resolvedSearchParams.category || '',
//       difficulty: resolvedSearchParams.difficulty || '',
//       content_type: resolvedSearchParams.content_type || '',
//       price_range: resolvedSearchParams.price_range || '',
//       min_rating: parseFloat(resolvedSearchParams.min_rating || '0'),
//       sort_by: resolvedSearchParams.sort_by || 'relevance'
//     };
    
//     if (Object.values(urlFilters).some(value => value !== '' && value !== 0)) {
//       updateFilters(urlFilters);
//       setSearchQuery(urlFilters.searchQuery);
//     }
//   }, [resolvedSearchParams]);

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     updateFilters({ searchQuery: searchQuery });
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       updateFilters({ searchQuery: searchQuery });
//     }
//   };

//   // Calculate stats
//   const totalCourses = pagination.total;
//   const totalCategories = categories.length;
//   const totalTags = availableTags.length;
//   const featuredCourses = courses.filter(course => course.is_featured).length;

//   const stats = {
//     courses: totalCourses,
//     categories: totalCategories,
//     featured: featuredCourses,
//     skills: totalTags
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="container mx-auto px-4 py-8">
//           <div className="max-w-7xl mx-auto text-center py-20">
//             <div className="relative inline-block">
//               <Loader2 className="h-12 w-12 animate-spin mx-auto mb-6 text-blue-600" />
//               <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
//             </div>
//             <p className="text-gray-600 text-lg font-medium">Loading amazing courses...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
      
//       {/* Hero Section with Animated Gradient Background */}
//       <AnimatedGradientBackground>
//         <div className="w-full px-4 py-16">
//           <div className="w-full mx-auto">
//             {/* Enhanced Header Section */}
//             <div className="mb-12">
//               <div className="text-center mb-8">
//                 <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
//                   Explore Courses
//                 </h1>
//                 <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
//                   Discover your next learning adventure in our comprehensive learning platform
//                 </p>
//               </div>

//               {/* Hero Section with Text Slider and Stats */}
//               <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
//                 {/* Text Slider */}
//                 <div className="lg:col-span-1">
//                   <TextSlider />
//                 </div>

//                 {/* Stats Cards - Now 2x2 grid */}
//                 <div className="lg:col-span-1">
//                   <StatsCards stats={stats} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </AnimatedGradientBackground>

//       {/* Search Bar - Full width and prominent */}
//       <div className="w-full bg-white border-b border-gray-200 py-8 px-4">
//         <div className="w-full max-w-7xl mx-auto">
//           <div className="text-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Course</h2>
//             <p className="text-gray-600">Search from thousands of courses with detailed ratings and reviews</p>
//           </div>
          
//           <form onSubmit={handleSearchSubmit} className="relative max-w-4xl mx-auto">
//             <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
//             <Input
//               type="text"
//               placeholder="Search courses by title, instructor, or technology... (Press Enter to search)"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="w-full pl-16 pr-6 py-6 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition text-gray-900 placeholder-gray-500 shadow-lg hover:shadow-xl"
//             />
//             <Button 
//               type="submit"
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-5 rounded-xl font-semibold"
//             >
//               Search
//             </Button>
//           </form>
//         </div>
//       </div>

//       {/* Main Content Area - Full width */}
//       <div className="w-full bg-gray-50 min-h-screen">
//         <div className="w-full px-4 py-8">
//           {/* Filters and Courses Container */}
//           <div className="w-full mx-auto">
//             {/* Mobile Filter Toggle */}
//             <div className="lg:hidden mb-6">
//               <Button
//                 onClick={() => setShowFilters(!showFilters)}
//                 variant="outline"
//                 className="w-full flex items-center justify-center gap-2 py-3 text-lg"
//               >
//                 <Filter size={20} />
//                 {showFilters ? 'Hide Filters' : 'Show Filters'}
//                 {hasActiveFilters(filters) && (
//                   <Badge variant="secondary" className="ml-2">
//                     {getActiveFilterCount(filters)}
//                   </Badge>
//                 )}
//               </Button>
//             </div>

//             {/* Full Width Grid Layout */}
//             <div className="w-full">
//               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//                 {/* Sidebar Filters - Span 3 columns on desktop, full width on mobile when toggled */}
//                 <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:col-span-3 space-y-6`}>
//                   {/* Categories Card */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Sparkles className="h-5 w-5 text-blue-600" />
//                         Categories
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-0">
//                       <div className="max-h-96 overflow-y-auto">
//                         <CategoryNavigation 
//                           showCourseCounts={true}
//                           className="p-4"
//                           currentCategory={filters.category_slug}
//                         />
//                       </div>
//                     </CardContent>
//                   </Card>

//                   {/* Advanced Filters */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Filter className="h-5 w-5 text-purple-600" />
//                         Advanced Filters
//                       </CardTitle>
//                       <CardDescription>
//                         Filter by rating, social metrics, and more
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <CourseFilters
//                         filters={filters}
//                         onFiltersChange={updateFilters}
//                         onReset={resetFilters}
//                         availableTags={availableTags}
//                       />
//                     </CardContent>
//                   </Card>

//                   {/* Social Metrics Info */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Heart className="h-5 w-5 text-green-600" />
//                         Social Engagement
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <div className="space-y-3">
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                             <span>Rating & Reviews</span>
//                           </div>
//                           <Badge variant="outline" className="text-xs">
//                             Real user feedback
//                           </Badge>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Heart className="h-4 w-4 text-red-500 fill-red-500" />
//                             <span>Likes</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Course popularity</span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Share2 className="h-4 w-4 text-blue-500" />
//                             <span>Shares</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Social sharing</span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Eye className="h-4 w-4 text-purple-500" />
//                             <span>Views</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Course visibility</span>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>

//                 {/* Main Courses Area - Span 9 columns on desktop */}
//                 <div className="lg:col-span-9">
//                   {/* Results Header - Full width */}
//                   <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
//                     <div className="flex-1">
//                       <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent mb-2">
//                         {filters.category_slug ? (
//                           <>
//                             <Sparkles className="h-6 w-6 text-blue-600 inline mr-2" />
//                             {categories.find(cat => cat.slug === filters.category_slug)?.name}
//                           </>
//                         ) : filters.searchQuery ? (
//                           <>Search: "{filters.searchQuery}"</>
//                         ) : (
//                           <>All Courses</>
//                         )}
//                       </h2>
//                       <p className="text-gray-600 flex items-center gap-2">
//                         {loading ? (
//                           <>
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                             Discovering courses...
//                           </>
//                         ) : (
//                           <>
//                             <span className="font-semibold text-gray-900">{courses.length}</span>
//                             {courses.length === 1 ? ' course' : ' courses'} found
//                             {hasActiveFilters(filters) && (
//                               <span className="text-blue-600 ml-2">• Filtered</span>
//                             )}
//                           </>
//                         )}
//                       </p>
//                     </div>

//                     <div className="flex items-center gap-4">
//                       {/* View Toggle */}
//                       <ViewToggle view={view} onViewChange={setView} />
                      
//                       {/* Clear Filters */}
//                       {hasActiveFilters(filters) && (
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={resetFilters}
//                           className="rounded-lg border-gray-300 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
//                         >
//                           Clear All
//                         </Button>
//                       )}
//                     </div>
//                   </div>

//                   {/* Error State */}
//                   {error && (
//                     <Card className="mb-6 border-red-200 bg-red-50 rounded-2xl overflow-hidden">
//                       <CardContent className="p-6">
//                         <div className="flex items-center gap-3">
//                           <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
//                           <p className="text-red-700 font-medium">Error: {error}</p>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   )}

//                   {/* Loading State */}
//                   {loading && courses.length === 0 && (
//                     <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
//                       <div className="relative inline-block mb-4">
//                         <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
//                         <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
//                       </div>
//                       <p className="text-gray-600 text-lg font-medium">Loading courses...</p>
//                     </div>
//                   )}

//                   {/* Courses Grid/List - Full width */}
//                   {courses.length > 0 ? (
//                     <>
//                       {view === 'grid' ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                           {courses.map((course) => (
//                             <EnhancedCourseCard key={course.id} course={course} />
//                           ))}
//                         </div>
//                       ) : (
//                         <EnhancedCourseListView courses={courses} />
//                       )}

//                       {/* Load More Button */}
//                       {pagination.hasMore && (
//                         <div className="text-center mt-12">
//                           <Button
//                             onClick={loadMore}
//                             disabled={loading}
//                             className="min-w-48 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-0 px-8 py-3 font-semibold"
//                           >
//                             {loading ? (
//                               <>
//                                 <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                                 Loading More...
//                               </>
//                             ) : (
//                               <>
//                                 <Rocket className="h-4 w-4 mr-2" />
//                                 Load More Courses
//                               </>
//                             )}
//                           </Button>
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     /* No Results */
//                     <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
//                       <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <Search className="h-10 w-10 text-gray-400" />
//                       </div>
//                       <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
//                       <p className="text-gray-600 max-w-md mx-auto mb-6">
//                         {filters.searchQuery || hasActiveFilters(filters)
//                           ? "Try adjusting your search criteria or browse all courses."
//                           : "No courses available at the moment. Check back soon!"}
//                       </p>
//                       {(filters.searchQuery || hasActiveFilters(filters)) && (
//                         <Button
//                           onClick={resetFilters}
//                           variant="outline"
//                           className="rounded-lg"
//                         >
//                           Reset Filters
//                         </Button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// function hasActiveFilters(filters: any): boolean {
//   return Object.keys(filters).some(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   });
// }

// function getActiveFilterCount(filters: any): number {
//   return Object.keys(filters).filter(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   }).length;
// }




















// // /app/courses/page.tsx

// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { getCoursesAction } from '@/lib/courses/actions';
// import { getCategoriesAction } from '@/lib/categories/actions';
// import { getTagsAction } from '@/lib/tags/actions';
// import { CategoryNavigation } from '@/components/categories/category-navigation';
// import { CourseFilters } from '@/components/courses/course-filters';
// import { useCourseSearch } from '@/hooks/use-course-search';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Search, 
//   Filter, 
//   Loader2, 
//   Sparkles, 
//   TrendingUp, 
//   Users, 
//   Star, 
//   Zap,
//   Grid3X3,
//   List,
//   Play,
//   ArrowRight,
//   Rocket,
//   Brain,
//   Code,
//   Palette,
//   Heart,
//   Share2,
//   Eye,
//   Clock,
//   MessageCircle,
//   BookOpen
// } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Course } from '@/types/courses';
// import { Header } from '@/components/layout/header';
// import { Footer } from '@/components/layout/footer';

// interface CoursesPageProps {
//   searchParams: Promise<{
//     category?: string;
//     search?: string;
//     difficulty?: string;
//     content_type?: string;
//     price_range?: string;
//     min_rating?: string;
//     sort_by?: string;
//   }>;
// }

// // View Toggle Component
// function ViewToggle({ view, onViewChange }: { view: 'grid' | 'list'; onViewChange: (view: 'grid' | 'list') => void }) {
//   return (
//     <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
//       <Button
//         variant={view === 'grid' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('grid')}
//         className={`flex items-center gap-2 ${view === 'grid' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <Grid3X3 className="h-4 w-4" />
//         <span className="hidden sm:inline">Grid</span>
//       </Button>
//       <Button
//         variant={view === 'list' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('list')}
//         className={`flex items-center gap-2 ${view === 'list' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <List className="h-4 w-4" />
//         <span className="hidden sm:inline">List</span>
//       </Button>
//     </div>
//   );
// }

// // Helper functions for formatting - FIXED RATING DISPLAY
// const formatRating = (rating: any, reviewCount?: number): string | null => {
//   if (rating === null || rating === undefined || rating === '') return null;
  
//   const numRating = typeof rating === 'string' ? parseFloat(rating) : Number(rating);
  
//   if (isNaN(numRating) || numRating <= 0) return null;
  
//   // If we have review count and it's 0 or negative, return null
//   if (reviewCount !== undefined && reviewCount <= 0) return null;
  
//   return numRating.toFixed(1);
// };

// const formatNumber = (num: any): string => {
//   if (num === null || num === undefined || num === '') return '0';
  
//   const numValue = typeof num === 'string' ? parseInt(num) : Number(num);
  
//   return isNaN(numValue) ? '0' : numValue.toLocaleString();
// };

// const formatReviewCount = (count: number | undefined): string => {
//   const num = count || 0;
//   if (num <= 0) return 'No reviews';
//   return `${num} review${num !== 1 ? 's' : ''}`;
// };

// const formatDuration = (minutes: number): string | null => {
//   if (!minutes || minutes === 0) return null;
//   if (minutes < 60) return `${minutes}m`;
//   const hours = Math.floor(minutes / 60);
//   const mins = minutes % 60;
//   return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
// };

// // Animated Text Slider Component
// function TextSlider() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const slides = [
//     {
//       icon: <Code className="h-12 w-12 text-blue-400" />,
//       title: "Master Modern Tech",
//       description: "Learn cutting-edge technologies from industry experts",
//       gradient: "from-blue-500 to-cyan-500"
//     },
//     {
//       icon: <Brain className="h-12 w-12 text-purple-400" />,
//       title: "Boost Your Career",
//       description: "Gain skills that companies are hiring for right now",
//       gradient: "from-purple-500 to-pink-500"
//     },
//     {
//       icon: <Rocket className="h-12 w-12 text-orange-400" />,
//       title: "Learn at Light Speed",
//       description: "Accelerate your learning with project-based courses",
//       gradient: "from-orange-500 to-red-500"
//     },
//     {
//       icon: <Palette className="h-12 w-12 text-green-400" />,
//       title: "Unlock Creativity",
//       description: "Transform your ideas into reality with practical skills",
//       gradient: "from-green-500 to-teal-500"
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [slides.length]);

//   return (
//     <div className="relative h-48 md:h-56 lg:h-64 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm p-8 border border-white/20">
//       {/* Subtle background elements */}
//       <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-xl"></div>
      
//       <div className="relative z-10 h-full flex items-center">
//         <div className="flex-1">
//           <div className="relative h-24 overflow-hidden">
//             {slides.map((slide, index) => (
//               <div
//                 key={index}
//                 className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
//                   index === currentSlide
//                     ? 'opacity-100 translate-x-0'
//                     : index < currentSlide
//                     ? 'opacity-0 -translate-x-full'
//                     : 'opacity-0 translate-x-full'
//                 }`}
//               >
//                 <div className="flex items-center space-x-6">
//                   <div className="flex-shrink-0">
//                     {slide.icon}
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
//                       {slide.title}
//                     </h3>
//                     <p className="text-blue-100 text-lg">
//                       {slide.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Slide indicators */}
//       <div className="absolute bottom-6 left-8 flex space-x-2 z-10">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             className={`w-2 h-2 rounded-full transition-all ${
//               index === currentSlide
//                 ? 'bg-white w-6'
//                 : 'bg-white/40'
//             }`}
//             onClick={() => setCurrentSlide(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // Enhanced Stats Cards for Dark Background
// function StatsCards({ stats }: { stats: { courses: number; categories: number; featured: number; skills: number } }) {
//   return (
//     <div className="grid grid-cols-2 gap-4">
//       {/* Top Row - 2 cards */}
//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-blue-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.courses}</div>
//             <div className="text-blue-200 text-sm">Courses</div>
//           </div>
//           <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <TrendingUp className="h-6 w-6 text-blue-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-green-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.categories}</div>
//             <div className="text-green-200 text-sm">Categories</div>
//           </div>
//           <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Users className="h-6 w-6 text-green-300" />
//           </div>
//         </div>
//       </div>

//       {/* Bottom Row - 2 cards */}
//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-yellow-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.featured}</div>
//             <div className="text-yellow-200 text-sm">Featured</div>
//           </div>
//           <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Star className="h-6 w-6 text-yellow-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-purple-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.skills}</div>
//             <div className="text-purple-200 text-sm">Skills</div>
//           </div>
//           <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Zap className="h-6 w-6 text-purple-300" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Enhanced Course Card Component with PROPER rating display
// function EnhancedCourseCard({ course }: { course: Course }) {
//   const rating = formatRating(course.average_rating, course.review_count);
//   const reviewCount = course.review_count || 0;
//   const likeCount = course.like_count || 0;
//   const shareCount = course.share_count || 0;
//   const viewCount = course.total_views || 0;
//   const duration = formatDuration(course.total_video_duration);
  
//   return (
//     <Link href={`/courses/${course.slug}`}>
//       <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group cursor-pointer h-full border border-gray-100">
//         {/* Course Image with Play Button */}
//         <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
//           <img
//             src={course.thumbnail_url || "/placeholder-course.png"}
//             alt={course.title}
//             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//           />
//           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
//             <div className="bg-white rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform">
//               <Play size={32} className="text-blue-600 fill-blue-600" />
//             </div>
//           </div>
//           <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
//             course.is_featured 
//               ? 'bg-yellow-500 text-white' 
//               : course.is_trending 
//               ? 'bg-green-500 text-white'
//               : 'bg-blue-500 text-white'
//           }`}>
//             {course.is_featured ? 'FEATURED' : course.is_trending ? 'TRENDING' : 'NEW'}
//           </span>
//         </div>

//         {/* Course Info */}
//         <div className="p-5">
//           {/* Category Badge */}
//           {course.category_name && (
//             <div className="mb-2">
//               <Badge variant="outline" className="text-xs">
//                 {course.category_name}
//               </Badge>
//             </div>
//           )}
          
//           <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 leading-tight">
//             {course.title}
//           </h3>
          
//           {/* Short Description */}
//           {course.short_description && (
//             <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//               {course.short_description}
//             </p>
//           )}

//           {/* Instructor */}
//           <div className="flex items-center gap-2 mb-4">
//             <p className="text-sm text-gray-600 truncate">
//               {course.instructor_name || 'Expert Instructor'}
//             </p>
//           </div>

//           {/* Social Engagement Metrics */}
//           <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
//             <div className="flex items-center gap-3">
//               {/* Likes */}
//               {likeCount > 0 && (
//                 <div className="flex items-center gap-1 text-red-500">
//                   <Heart size={14} className="fill-red-500" />
//                   <span className="text-xs font-semibold">{formatNumber(likeCount)}</span>
//                 </div>
//               )}
              
//               {/* Shares */}
//               {shareCount > 0 && (
//                 <div className="flex items-center gap-1 text-blue-500">
//                   <Share2 size={14} />
//                   <span className="text-xs font-semibold">{formatNumber(shareCount)}</span>
//                 </div>
//               )}
              
//               {/* Views */}
//               {viewCount > 0 && (
//                 <div className="flex items-center gap-1 text-purple-500">
//                   <Eye size={14} />
//                   <span className="text-xs font-semibold">{formatNumber(viewCount)}</span>
//                 </div>
//               )}
//             </div>
            
//             {/* Rating and Reviews - FIXED: Only show if rating exists */}
//             {rating && (
//               <div className="flex items-center gap-1">
//                 <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//                 <span className="text-xs font-semibold text-gray-900">{rating}</span>
//                 {reviewCount > 0 && (
//                   <span className="text-xs text-gray-500">({formatNumber(reviewCount)})</span>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Course Stats */}
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-4 text-sm text-gray-500">
//               {/* Rating - FIXED: Only show if rating exists */}
//               {rating ? (
//                 <div className="flex items-center gap-1">
//                   <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                   <span className="font-semibold text-gray-900">{rating}</span>
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-1 text-gray-400">
//                   <Star className="h-4 w-4" />
//                   <span className="text-xs">No ratings</span>
//                 </div>
//               )}
              
//               {/* Students */}
//               <div className="flex items-center gap-1">
//                 <Users className="h-4 w-4" />
//                 <span>{formatNumber(course.enrolled_students_count)}</span>
//               </div>
              
//               {/* Duration - Only show if exists */}
//               {duration && (
//                 <div className="flex items-center gap-1">
//                   <Clock className="h-4 w-4 text-gray-500" />
//                   <span>{duration}</span>
//                 </div>
//               )}
//             </div>
            
//             {/* Price */}
//             <span className="text-blue-600 font-bold text-lg">
//               {course.price_cents === 0 ? 'FREE' : `$${(course.price_cents / 100).toFixed(2)}`}
//             </span>
//           </div>

//           {/* Additional Stats - Lessons */}
//           {course.total_lessons && (
//             <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
//               <BookOpen className="h-4 w-4" />
//               <span>{course.total_lessons} lessons</span>
//             </div>
//           )}

//           {/* View Course Button */}
//           <Button className="w-full group/btn bg-gray-900 hover:bg-gray-800 text-white" asChild>
//             <div>
//               View Course
//               <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
//             </div>
//           </Button>
//         </div>
//       </div>
//     </Link>
//   );
// }

// // Enhanced Course List View with PROPER rating display
// function EnhancedCourseListView({ courses }: { courses: Course[] }) {
//   const formatPrice = (priceCents: number) => {
//     if (priceCents === 0) return 'FREE';
//     return `$${(priceCents / 100).toFixed(2)}`;
//   };

//   return (
//     <div className="space-y-4">
//       {courses.map((course) => {
//         const rating = formatRating(course.average_rating, course.review_count);
//         const reviewCount = course.review_count || 0;
//         const likeCount = course.like_count || 0;
//         const shareCount = course.share_count || 0;
//         const viewCount = course.total_views || 0;
//         const duration = formatDuration(course.total_video_duration);
        
//         return (
//           <Link key={course.id} href={`/courses/${course.slug}`}>
//             <div className="flex flex-col lg:flex-row gap-6 p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all group cursor-pointer">
//               {/* Course Thumbnail */}
//               <div className="relative w-full lg:w-64 h-48 rounded-lg overflow-hidden flex-shrink-0">
//                 <img
//                   src={course.thumbnail_url || "/placeholder-course.png"}
//                   alt={course.title}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                 />
//                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
//                   <div className="bg-white rounded-full p-2 transform scale-0 group-hover:scale-100 transition-transform">
//                     <Play size={20} className="text-blue-600 fill-blue-600" />
//                   </div>
//                 </div>
//               </div>

//               {/* Course Info */}
//               <div className="flex-1 min-w-0">
//                 <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-3 gap-4">
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 mb-2 flex-wrap">
//                       {course.category_name && (
//                         <Badge variant="outline" className="text-xs">
//                           {course.category_name}
//                         </Badge>
//                       )}
//                       {course.is_featured && (
//                         <Badge className="bg-yellow-500 text-white border-0 text-xs">
//                           FEATURED
//                         </Badge>
//                       )}
//                       {course.is_trending && (
//                         <Badge className="bg-green-500 text-white border-0 text-xs">
//                           TRENDING
//                         </Badge>
//                       )}
//                     </div>
//                     <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
//                       {course.title}
//                     </h3>
//                     {course.short_description && (
//                       <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                         {course.short_description}
//                       </p>
//                     )}
                    
//                     {/* Social Engagement Metrics - Row 1 */}
//                     <div className="flex items-center gap-4 mb-3 flex-wrap">
//                       {/* Rating and Reviews - FIXED: Only show if rating exists */}
//                       {rating ? (
//                         <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
//                           <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//                           <span className="text-xs font-semibold text-gray-900">{rating}</span>
//                           {reviewCount > 0 && (
//                             <span className="text-xs text-gray-600">({formatNumber(reviewCount)})</span>
//                           )}
//                         </div>
//                       ) : (
//                         <div className="flex items-center gap-1 text-gray-400 px-2 py-1 rounded-md bg-gray-50">
//                           <Star className="h-3 w-3" />
//                           <span className="text-xs">No ratings</span>
//                         </div>
//                       )}
                      
//                       {/* Students */}
//                       {course.enrolled_students_count && (
//                         <div className="flex items-center gap-1 text-gray-600">
//                           <Users size={14} />
//                           <span className="text-xs">{formatNumber(course.enrolled_students_count)} students</span>
//                         </div>
//                       )}
                      
//                       {/* Duration - Only show if exists */}
//                       {duration && (
//                         <div className="flex items-center gap-1 text-gray-600">
//                           <Clock size={14} className="text-gray-500" />
//                           <span className="text-xs">{duration}</span>
//                         </div>
//                       )}
                      
//                       {/* Lessons */}
//                       {course.total_lessons && (
//                         <div className="flex items-center gap-1 text-gray-600">
//                           <BookOpen size={14} className="text-gray-500" />
//                           <span className="text-xs">{course.total_lessons} lessons</span>
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* Social Engagement Metrics - Row 2 */}
//                     <div className="flex items-center gap-4 flex-wrap">
//                       {/* Likes - Only show if > 0 */}
//                       {likeCount > 0 && (
//                         <div className="flex items-center gap-1 text-red-500">
//                           <Heart size={12} className="fill-red-500" />
//                           <span className="text-xs">{formatNumber(likeCount)} likes</span>
//                         </div>
//                       )}
                      
//                       {/* Shares - Only show if > 0 */}
//                       {shareCount > 0 && (
//                         <div className="flex items-center gap-1 text-blue-500">
//                           <Share2 size={12} />
//                           <span className="text-xs">{formatNumber(shareCount)} shares</span>
//                         </div>
//                       )}
                      
//                       {/* Views - Only show if > 0 */}
//                       {viewCount > 0 && (
//                         <div className="flex items-center gap-1 text-purple-500">
//                           <Eye size={12} />
//                           <span className="text-xs">{formatNumber(viewCount)} views</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
                  
//                   {/* Price and Instructor */}
//                   <div className="flex-shrink-0 lg:text-right">
//                     <div className="text-blue-600 font-bold text-lg mb-2">
//                       {formatPrice(course.price_cents || 0)}
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       {course.instructor_name || 'Expert Instructor'}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Link>
//         );
//       })}
//     </div>
//   );
// }

// // Animated Gradient Background Component
// function AnimatedGradientBackground({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="relative w-full overflow-hidden">
//       {/* Animated Gradient Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900">
//         {/* Animated orbs */}
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
//         <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1500"></div>
        
//         {/* Grid pattern overlay */}
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
//       </div>
      
//       {/* Content */}
//       <div className="relative z-10">
//         {children}
//       </div>
//     </div>
//   );
// }

// export default function CoursesPage({ searchParams }: CoursesPageProps) {
//   const resolvedSearchParams = React.use(searchParams);
  
//   const [initialCourses, setInitialCourses] = useState<Course[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [availableTags, setAvailableTags] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [view, setView] = useState<'grid' | 'list'>('grid');

//   const {
//     courses,
//     loading,
//     error,
//     filters,
//     pagination,
//     updateFilters,
//     resetFilters,
//     loadMore
//   } = useCourseSearch(initialCourses);

//   useEffect(() => {
//     async function fetchInitialData() {
//       try {
//         setIsLoading(true);
        
//         const [coursesResult, categoriesResult, tagsResult] = await Promise.all([
//           getCoursesAction({
//             is_published: true,
//             category_slug: resolvedSearchParams.category,
//             limit: 100,
//             include_reviews: true
//           }),
//           getCategoriesAction(),
//           getTagsAction()
//         ]);

//         setInitialCourses(coursesResult.courses || []);
//         setCategories(categoriesResult.categories || []);
//         setAvailableTags(tagsResult.tags || []);
        
//         // Debug logging for ratings
//         console.log('=== COURSES PAGE DATA ===');
//         (coursesResult.courses || []).slice(0, 5).forEach((course: any, index: number) => {
//           console.log(`${index + 1}. ${course.title}`);
//           console.log(`   Raw Rating: ${course.average_rating} (type: ${typeof course.average_rating})`);
//           console.log(`   Formatted Rating: ${formatRating(course.average_rating, course.review_count)}`);
//           console.log(`   Review Count: ${course.review_count}`);
//           console.log(`   Likes: ${course.like_count}`);
//           console.log(`   Shares: ${course.share_count}`);
//         });
//       } catch (error) {
//         console.error('Error fetching initial data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchInitialData();
//   }, [resolvedSearchParams.category]);

//   useEffect(() => {
//     const urlFilters = {
//       searchQuery: resolvedSearchParams.search || '',
//       category_slug: resolvedSearchParams.category || '',
//       difficulty: resolvedSearchParams.difficulty || '',
//       content_type: resolvedSearchParams.content_type || '',
//       price_range: resolvedSearchParams.price_range || '',
//       min_rating: parseFloat(resolvedSearchParams.min_rating || '0'),
//       sort_by: resolvedSearchParams.sort_by || 'relevance'
//     };
    
//     if (Object.values(urlFilters).some(value => value !== '' && value !== 0)) {
//       updateFilters(urlFilters);
//       setSearchQuery(urlFilters.searchQuery);
//     }
//   }, [resolvedSearchParams]);

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     updateFilters({ searchQuery: searchQuery });
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       updateFilters({ searchQuery: searchQuery });
//     }
//   };

//   // Calculate stats
//   const totalCourses = pagination.total;
//   const totalCategories = categories.length;
//   const totalTags = availableTags.length;
//   const featuredCourses = courses.filter(course => course.is_featured).length;

//   const stats = {
//     courses: totalCourses,
//     categories: totalCategories,
//     featured: featuredCourses,
//     skills: totalTags
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="container mx-auto px-4 py-8">
//           <div className="max-w-7xl mx-auto text-center py-20">
//             <div className="relative inline-block">
//               <Loader2 className="h-12 w-12 animate-spin mx-auto mb-6 text-blue-600" />
//               <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
//             </div>
//             <p className="text-gray-600 text-lg font-medium">Loading amazing courses...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
      
//       {/* Hero Section with Animated Gradient Background */}
//       <AnimatedGradientBackground>
//         <div className="w-full px-4 py-16">
//           <div className="w-full mx-auto">
//             {/* Enhanced Header Section */}
//             <div className="mb-12">
//               <div className="text-center mb-8">
//                 <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
//                   Explore Courses
//                 </h1>
//                 <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
//                   Discover your next learning adventure in our comprehensive learning platform
//                 </p>
//               </div>

//               {/* Hero Section with Text Slider and Stats */}
//               <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
//                 {/* Text Slider */}
//                 <div className="lg:col-span-1">
//                   <TextSlider />
//                 </div>

//                 {/* Stats Cards - Now 2x2 grid */}
//                 <div className="lg:col-span-1">
//                   <StatsCards stats={stats} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </AnimatedGradientBackground>

//       {/* Search Bar - Full width and prominent */}
//       <div className="w-full bg-white border-b border-gray-200 py-8 px-4">
//         <div className="w-full max-w-7xl mx-auto">
//           <div className="text-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Course</h2>
//             <p className="text-gray-600">Search from thousands of courses with detailed ratings and reviews</p>
//           </div>
          
//           <form onSubmit={handleSearchSubmit} className="relative max-w-4xl mx-auto">
//             <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
//             <Input
//               type="text"
//               placeholder="Search courses by title, instructor, or technology... (Press Enter to search)"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="w-full pl-16 pr-6 py-6 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition text-gray-900 placeholder-gray-500 shadow-lg hover:shadow-xl"
//             />
//             <Button 
//               type="submit"
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-5 rounded-xl font-semibold"
//             >
//               Search
//             </Button>
//           </form>
//         </div>
//       </div>

//       {/* Main Content Area - Full width */}
//       <div className="w-full bg-gray-50 min-h-screen">
//         <div className="w-full px-4 py-8">
//           {/* Filters and Courses Container */}
//           <div className="w-full mx-auto">
//             {/* Mobile Filter Toggle */}
//             <div className="lg:hidden mb-6">
//               <Button
//                 onClick={() => setShowFilters(!showFilters)}
//                 variant="outline"
//                 className="w-full flex items-center justify-center gap-2 py-3 text-lg"
//               >
//                 <Filter size={20} />
//                 {showFilters ? 'Hide Filters' : 'Show Filters'}
//                 {hasActiveFilters(filters) && (
//                   <Badge variant="secondary" className="ml-2">
//                     {getActiveFilterCount(filters)}
//                   </Badge>
//                 )}
//               </Button>
//             </div>

//             {/* Full Width Grid Layout */}
//             <div className="w-full">
//               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//                 {/* Sidebar Filters - Span 3 columns on desktop, full width on mobile when toggled */}
//                 <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:col-span-3 space-y-6`}>
//                   {/* Categories Card */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Sparkles className="h-5 w-5 text-blue-600" />
//                         Categories
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-0">
//                       <div className="max-h-96 overflow-y-auto">
//                         <CategoryNavigation 
//                           showCourseCounts={true}
//                           className="p-4"
//                           currentCategory={filters.category_slug}
//                         />
//                       </div>
//                     </CardContent>
//                   </Card>

//                   {/* Advanced Filters */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Filter className="h-5 w-5 text-purple-600" />
//                         Advanced Filters
//                       </CardTitle>
//                       <CardDescription>
//                         Filter by rating, social metrics, and more
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <CourseFilters
//                         filters={filters}
//                         onFiltersChange={updateFilters}
//                         onReset={resetFilters}
//                         availableTags={availableTags}
//                       />
//                     </CardContent>
//                   </Card>

//                   {/* Social Metrics Info */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Heart className="h-5 w-5 text-green-600" />
//                         Social Engagement
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <div className="space-y-3">
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                             <span>Rating & Reviews</span>
//                           </div>
//                           <Badge variant="outline" className="text-xs">
//                             Real user feedback
//                           </Badge>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Heart className="h-4 w-4 text-red-500 fill-red-500" />
//                             <span>Likes</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Course popularity</span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Share2 className="h-4 w-4 text-blue-500" />
//                             <span>Shares</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Social sharing</span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Eye className="h-4 w-4 text-purple-500" />
//                             <span>Views</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Course visibility</span>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>

//                 {/* Main Courses Area - Span 9 columns on desktop */}
//                 <div className="lg:col-span-9">
//                   {/* Results Header - Full width */}
//                   <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
//                     <div className="flex-1">
//                       <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent mb-2">
//                         {filters.category_slug ? (
//                           <>
//                             <Sparkles className="h-6 w-6 text-blue-600 inline mr-2" />
//                             {categories.find(cat => cat.slug === filters.category_slug)?.name}
//                           </>
//                         ) : filters.searchQuery ? (
//                           <>Search: "{filters.searchQuery}"</>
//                         ) : (
//                           <>All Courses</>
//                         )}
//                       </h2>
//                       <p className="text-gray-600 flex items-center gap-2">
//                         {loading ? (
//                           <>
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                             Discovering courses...
//                           </>
//                         ) : (
//                           <>
//                             <span className="font-semibold text-gray-900">{courses.length}</span>
//                             {courses.length === 1 ? ' course' : ' courses'} found
//                             {hasActiveFilters(filters) && (
//                               <span className="text-blue-600 ml-2">• Filtered</span>
//                             )}
//                           </>
//                         )}
//                       </p>
//                     </div>

//                     <div className="flex items-center gap-4">
//                       {/* View Toggle */}
//                       <ViewToggle view={view} onViewChange={setView} />
                      
//                       {/* Clear Filters */}
//                       {hasActiveFilters(filters) && (
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={resetFilters}
//                           className="rounded-lg border-gray-300 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
//                         >
//                           Clear All
//                         </Button>
//                       )}
//                     </div>
//                   </div>

//                   {/* Error State */}
//                   {error && (
//                     <Card className="mb-6 border-red-200 bg-red-50 rounded-2xl overflow-hidden">
//                       <CardContent className="p-6">
//                         <div className="flex items-center gap-3">
//                           <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
//                           <p className="text-red-700 font-medium">Error: {error}</p>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   )}

//                   {/* Loading State */}
//                   {loading && courses.length === 0 && (
//                     <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
//                       <div className="relative inline-block mb-4">
//                         <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
//                         <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
//                       </div>
//                       <p className="text-gray-600 text-lg font-medium">Loading courses...</p>
//                     </div>
//                   )}

//                   {/* Courses Grid/List - Full width */}
//                   {courses.length > 0 ? (
//                     <>
//                       {view === 'grid' ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                           {courses.map((course) => (
//                             <EnhancedCourseCard key={course.id} course={course} />
//                           ))}
//                         </div>
//                       ) : (
//                         <EnhancedCourseListView courses={courses} />
//                       )}

//                       {/* Load More Button */}
//                       {pagination.hasMore && (
//                         <div className="text-center mt-12">
//                           <Button
//                             onClick={loadMore}
//                             disabled={loading}
//                             className="min-w-48 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-0 px-8 py-3 font-semibold"
//                           >
//                             {loading ? (
//                               <>
//                                 <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                                 Loading More...
//                               </>
//                             ) : (
//                               <>
//                                 <Rocket className="h-4 w-4 mr-2" />
//                                 Load More Courses
//                               </>
//                             )}
//                           </Button>
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     /* No Results */
//                     <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
//                       <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <Search className="h-10 w-10 text-gray-400" />
//                       </div>
//                       <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
//                       <p className="text-gray-600 max-w-md mx-auto mb-6">
//                         {filters.searchQuery || hasActiveFilters(filters)
//                           ? "Try adjusting your search criteria or browse all courses."
//                           : "No courses available at the moment. Check back soon!"}
//                       </p>
//                       {(filters.searchQuery || hasActiveFilters(filters)) && (
//                         <Button
//                           onClick={resetFilters}
//                           variant="outline"
//                           className="rounded-lg"
//                         >
//                           Reset Filters
//                         </Button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// function hasActiveFilters(filters: any): boolean {
//   return Object.keys(filters).some(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   });
// }

// function getActiveFilterCount(filters: any): number {
//   return Object.keys(filters).filter(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   }).length;
// }





































// // /app/courses/page.tsx

// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { getCoursesAction } from '@/lib/courses/actions';
// import { getCategoriesAction } from '@/lib/categories/actions';
// import { getTagsAction } from '@/lib/tags/actions';
// import { CategoryNavigation } from '@/components/categories/category-navigation';
// import { CourseFilters } from '@/components/courses/course-filters';
// import { useCourseSearch } from '@/hooks/use-course-search';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Search, 
//   Filter, 
//   Loader2, 
//   Sparkles, 
//   TrendingUp, 
//   Users, 
//   Star, 
//   Zap,
//   Grid3X3,
//   List,
//   Play,
//   ArrowRight,
//   Rocket,
//   Brain,
//   Code,
//   Palette,
//   Heart,
//   Share2,
//   Eye,
//   Clock,
//   MessageCircle,
//   BookOpen
// } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Course } from '@/types/courses';
// import { Header } from '@/components/layout/header';
// import { Footer } from '@/components/layout/footer';
// import { CourseCard, formatRating } from '@/components/courses/shared-course-card';

// interface CoursesPageProps {
//   searchParams: Promise<{
//     category?: string;
//     search?: string;
//     difficulty?: string;
//     content_type?: string;
//     price_range?: string;
//     min_rating?: string;
//     sort_by?: string;
//   }>;
// }

// // Helper function to convert Course type to compatible type for CourseCard
// const convertToCourseData = (course: Course) => {
//   return {
//     id: course.id,
//     slug: course.slug,
//     title: course.title,
//     thumbnail_url: course.thumbnail_url || undefined,
//     short_description: course.short_description || undefined,
//     category_name: course.category_name || undefined,
//     instructor_name: course.instructor_name || undefined,
//     instructor_image: course.instructor_image || undefined, // Convert null to undefined
//     price_cents: course.price_cents || 0,
//     average_rating: course.average_rating || undefined,
//     review_count: course.review_count || undefined,
//     like_count: course.like_count || undefined,
//     share_count: course.share_count || undefined,
//     total_views: course.total_views || undefined,
//     enrolled_students_count: course.enrolled_students_count || undefined,
//     total_video_duration: course.total_video_duration || undefined,
//     total_lessons: course.total_lessons || undefined,
//     is_featured: course.is_featured || false,
//     is_trending: course.is_trending || false
//   };
// };

// // View Toggle Component
// function ViewToggle({ view, onViewChange }: { view: 'grid' | 'list'; onViewChange: (view: 'grid' | 'list') => void }) {
//   return (
//     <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
//       <Button
//         variant={view === 'grid' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('grid')}
//         className={`flex items-center gap-2 ${view === 'grid' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <Grid3X3 className="h-4 w-4" />
//         <span className="hidden sm:inline">Grid</span>
//       </Button>
//       <Button
//         variant={view === 'list' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('list')}
//         className={`flex items-center gap-2 ${view === 'list' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <List className="h-4 w-4" />
//         <span className="hidden sm:inline">List</span>
//       </Button>
//     </div>
//   );
// }

// // Animated Text Slider Component
// function TextSlider() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const slides = [
//     {
//       icon: <Code className="h-12 w-12 text-blue-400" />,
//       title: "Master Modern Tech",
//       description: "Learn cutting-edge technologies from industry experts",
//       gradient: "from-blue-500 to-cyan-500"
//     },
//     {
//       icon: <Brain className="h-12 w-12 text-purple-400" />,
//       title: "Boost Your Career",
//       description: "Gain skills that companies are hiring for right now",
//       gradient: "from-purple-500 to-pink-500"
//     },
//     {
//       icon: <Rocket className="h-12 w-12 text-orange-400" />,
//       title: "Learn at Light Speed",
//       description: "Accelerate your learning with project-based courses",
//       gradient: "from-orange-500 to-red-500"
//     },
//     {
//       icon: <Palette className="h-12 w-12 text-green-400" />,
//       title: "Unlock Creativity",
//       description: "Transform your ideas into reality with practical skills",
//       gradient: "from-green-500 to-teal-500"
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [slides.length]);

//   return (
//     <div className="relative h-48 md:h-56 lg:h-64 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm p-8 border border-white/20">
//       {/* Subtle background elements */}
//       <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-xl"></div>
      
//       <div className="relative z-10 h-full flex items-center">
//         <div className="flex-1">
//           <div className="relative h-24 overflow-hidden">
//             {slides.map((slide, index) => (
//               <div
//                 key={index}
//                 className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
//                   index === currentSlide
//                     ? 'opacity-100 translate-x-0'
//                     : index < currentSlide
//                     ? 'opacity-0 -translate-x-full'
//                     : 'opacity-0 translate-x-full'
//                 }`}
//               >
//                 <div className="flex items-center space-x-6">
//                   <div className="flex-shrink-0">
//                     {slide.icon}
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
//                       {slide.title}
//                     </h3>
//                     <p className="text-blue-100 text-lg">
//                       {slide.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Slide indicators */}
//       <div className="absolute bottom-6 left-8 flex space-x-2 z-10">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             className={`w-2 h-2 rounded-full transition-all ${
//               index === currentSlide
//                 ? 'bg-white w-6'
//                 : 'bg-white/40'
//             }`}
//             onClick={() => setCurrentSlide(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // Enhanced Stats Cards for Dark Background
// function StatsCards({ stats }: { stats: { courses: number; categories: number; featured: number; skills: number } }) {
//   return (
//     <div className="grid grid-cols-2 gap-4">
//       {/* Top Row - 2 cards */}
//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-blue-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.courses}</div>
//             <div className="text-blue-200 text-sm">Courses</div>
//           </div>
//           <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <TrendingUp className="h-6 w-6 text-blue-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-green-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.categories}</div>
//             <div className="text-green-200 text-sm">Categories</div>
//           </div>
//           <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Users className="h-6 w-6 text-green-300" />
//           </div>
//         </div>
//       </div>

//       {/* Bottom Row - 2 cards */}
//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-yellow-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.featured}</div>
//             <div className="text-yellow-200 text-sm">Featured</div>
//           </div>
//           <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Star className="h-6 w-6 text-yellow-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-purple-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.skills}</div>
//             <div className="text-purple-200 text-sm">Skills</div>
//           </div>
//           <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Zap className="h-6 w-6 text-purple-300" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Animated Gradient Background Component
// function AnimatedGradientBackground({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="relative w-full overflow-hidden">
//       {/* Animated Gradient Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900">
//         {/* Animated orbs */}
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
//         <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1500"></div>
        
//         {/* Grid pattern overlay */}
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
//       </div>
      
//       {/* Content */}
//       <div className="relative z-10">
//         {children}
//       </div>
//     </div>
//   );
// }

// export default function CoursesPage({ searchParams }: CoursesPageProps) {
//   const resolvedSearchParams = React.use(searchParams);
  
//   const [initialCourses, setInitialCourses] = useState<Course[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [availableTags, setAvailableTags] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [view, setView] = useState<'grid' | 'list'>('grid');

//   const {
//     courses,
//     loading,
//     error,
//     filters,
//     pagination,
//     updateFilters,
//     resetFilters,
//     loadMore
//   } = useCourseSearch(initialCourses);

//   useEffect(() => {
//     async function fetchInitialData() {
//       try {
//         setIsLoading(true);
        
//         const [coursesResult, categoriesResult, tagsResult] = await Promise.all([
//           getCoursesAction({
//             is_published: true,
//             category_slug: resolvedSearchParams.category,
//             limit: 100,
//             include_reviews: true
//           }),
//           getCategoriesAction(),
//           getTagsAction()
//         ]);

//         setInitialCourses(coursesResult.courses || []);
//         setCategories(categoriesResult.categories || []);
//         setAvailableTags(tagsResult.tags || []);
        
//         // Debug logging for ratings
//         console.log('=== COURSES PAGE DATA ===');
//         (coursesResult.courses || []).slice(0, 5).forEach((course: any, index: number) => {
//           console.log(`${index + 1}. ${course.title}`);
//           console.log(`   Raw Rating: ${course.average_rating} (type: ${typeof course.average_rating})`);
//           console.log(`   Formatted Rating: ${formatRating(course.average_rating, course.review_count)}`);
//           console.log(`   Review Count: ${course.review_count}`);
//           console.log(`   Likes: ${course.like_count}`);
//           console.log(`   Shares: ${course.share_count}`);
//         });
//       } catch (error) {
//         console.error('Error fetching initial data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchInitialData();
//   }, [resolvedSearchParams.category]);

//   useEffect(() => {
//     const urlFilters = {
//       searchQuery: resolvedSearchParams.search || '',
//       category_slug: resolvedSearchParams.category || '',
//       difficulty: resolvedSearchParams.difficulty || '',
//       content_type: resolvedSearchParams.content_type || '',
//       price_range: resolvedSearchParams.price_range || '',
//       min_rating: parseFloat(resolvedSearchParams.min_rating || '0'),
//       sort_by: resolvedSearchParams.sort_by || 'relevance'
//     };
    
//     if (Object.values(urlFilters).some(value => value !== '' && value !== 0)) {
//       updateFilters(urlFilters);
//       setSearchQuery(urlFilters.searchQuery);
//     }
//   }, [resolvedSearchParams]);

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     updateFilters({ searchQuery: searchQuery });
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       updateFilters({ searchQuery: searchQuery });
//     }
//   };

//   // Calculate stats
//   const totalCourses = pagination.total;
//   const totalCategories = categories.length;
//   const totalTags = availableTags.length;
//   const featuredCourses = courses.filter(course => course.is_featured).length;

//   const stats = {
//     courses: totalCourses,
//     categories: totalCategories,
//     featured: featuredCourses,
//     skills: totalTags
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="container mx-auto px-4 py-8">
//           <div className="max-w-7xl mx-auto text-center py-20">
//             <div className="relative inline-block">
//               <Loader2 className="h-12 w-12 animate-spin mx-auto mb-6 text-blue-600" />
//               <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
//             </div>
//             <p className="text-gray-600 text-lg font-medium">Loading amazing courses...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
      
//       {/* Hero Section with Animated Gradient Background */}
//       <AnimatedGradientBackground>
//         <div className="w-full px-4 py-16">
//           <div className="w-full mx-auto">
//             {/* Enhanced Header Section */}
//             <div className="mb-12">
//               <div className="text-center mb-8">
//                 <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
//                   Explore Courses
//                 </h1>
//                 <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
//                   Discover your next learning adventure in our comprehensive learning platform
//                 </p>
//               </div>

//               {/* Hero Section with Text Slider and Stats */}
//               <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
//                 {/* Text Slider */}
//                 <div className="lg:col-span-1">
//                   <TextSlider />
//                 </div>

//                 {/* Stats Cards - Now 2x2 grid */}
//                 <div className="lg:col-span-1">
//                   <StatsCards stats={stats} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </AnimatedGradientBackground>

//       {/* Search Bar - Full width and prominent */}
//       <div className="w-full bg-white border-b border-gray-200 py-8 px-4">
//         <div className="w-full max-w-7xl mx-auto">
//           <div className="text-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Course</h2>
//             <p className="text-gray-600">Search from thousands of courses with detailed ratings and reviews</p>
//           </div>
          
//           <form onSubmit={handleSearchSubmit} className="relative max-w-4xl mx-auto">
//             <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
//             <Input
//               type="text"
//               placeholder="Search courses by title, instructor, or technology... (Press Enter to search)"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="w-full pl-16 pr-6 py-6 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition text-gray-900 placeholder-gray-500 shadow-lg hover:shadow-xl"
//             />
//             <Button 
//               type="submit"
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-5 rounded-xl font-semibold"
//             >
//               Search
//             </Button>
//           </form>
//         </div>
//       </div>

//       {/* Main Content Area - Full width */}
//       <div className="w-full bg-gray-50 min-h-screen">
//         <div className="w-full px-4 py-8">
//           {/* Filters and Courses Container */}
//           <div className="w-full mx-auto">
//             {/* Mobile Filter Toggle */}
//             <div className="lg:hidden mb-6">
//               <Button
//                 onClick={() => setShowFilters(!showFilters)}
//                 variant="outline"
//                 className="w-full flex items-center justify-center gap-2 py-3 text-lg"
//               >
//                 <Filter size={20} />
//                 {showFilters ? 'Hide Filters' : 'Show Filters'}
//                 {hasActiveFilters(filters) && (
//                   <Badge variant="secondary" className="ml-2">
//                     {getActiveFilterCount(filters)}
//                   </Badge>
//                 )}
//               </Button>
//             </div>

//             {/* Full Width Grid Layout */}
//             <div className="w-full">
//               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//                 {/* Sidebar Filters - Span 3 columns on desktop, full width on mobile when toggled */}
//                 <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:col-span-3 space-y-6`}>
//                   {/* Categories Card */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Sparkles className="h-5 w-5 text-blue-600" />
//                         Categories
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-0">
//                       <div className="max-h-96 overflow-y-auto">
//                         <CategoryNavigation 
//                           showCourseCounts={true}
//                           className="p-4"
//                           currentCategory={filters.category_slug}
//                         />
//                       </div>
//                     </CardContent>
//                   </Card>

//                   {/* Advanced Filters */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Filter className="h-5 w-5 text-purple-600" />
//                         Advanced Filters
//                       </CardTitle>
//                       <CardDescription>
//                         Filter by rating, social metrics, and more
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <CourseFilters
//                         filters={filters}
//                         onFiltersChange={updateFilters}
//                         onReset={resetFilters}
//                         availableTags={availableTags}
//                       />
//                     </CardContent>
//                   </Card>

//                   {/* Social Metrics Info */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Heart className="h-5 w-5 text-green-600" />
//                         Social Engagement
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <div className="space-y-3">
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                             <span>Rating & Reviews</span>
//                           </div>
//                           <Badge variant="outline" className="text-xs">
//                             Real user feedback
//                           </Badge>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Heart className="h-4 w-4 text-red-500 fill-red-500" />
//                             <span>Likes</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Course popularity</span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Share2 className="h-4 w-4 text-blue-500" />
//                             <span>Shares</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Social sharing</span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Eye className="h-4 w-4 text-purple-500" />
//                             <span>Views</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Course visibility</span>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>

//                 {/* Main Courses Area - Span 9 columns on desktop */}
//                 <div className="lg:col-span-9">
//                   {/* Results Header - Full width */}
//                   <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
//                     <div className="flex-1">
//                       <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent mb-2">
//                         {filters.category_slug ? (
//                           <>
//                             <Sparkles className="h-6 w-6 text-blue-600 inline mr-2" />
//                             {categories.find(cat => cat.slug === filters.category_slug)?.name}
//                           </>
//                         ) : filters.searchQuery ? (
//                           <>Search: "{filters.searchQuery}"</>
//                         ) : (
//                           <>All Courses</>
//                         )}
//                       </h2>
//                       <p className="text-gray-600 flex items-center gap-2">
//                         {loading ? (
//                           <>
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                             Discovering courses...
//                           </>
//                         ) : (
//                           <>
//                             <span className="font-semibold text-gray-900">{courses.length}</span>
//                             {courses.length === 1 ? ' course' : ' courses'} found
//                             {hasActiveFilters(filters) && (
//                               <span className="text-blue-600 ml-2">• Filtered</span>
//                             )}
//                           </>
//                         )}
//                       </p>
//                     </div>

//                     <div className="flex items-center gap-4">
//                       {/* View Toggle */}
//                       <ViewToggle view={view} onViewChange={setView} />
                      
//                       {/* Clear Filters */}
//                       {hasActiveFilters(filters) && (
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={resetFilters}
//                           className="rounded-lg border-gray-300 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
//                         >
//                           Clear All
//                         </Button>
//                       )}
//                     </div>
//                   </div>

//                   {/* Error State */}
//                   {error && (
//                     <Card className="mb-6 border-red-200 bg-red-50 rounded-2xl overflow-hidden">
//                       <CardContent className="p-6">
//                         <div className="flex items-center gap-3">
//                           <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
//                           <p className="text-red-700 font-medium">Error: {error}</p>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   )}

//                   {/* Loading State */}
//                   {loading && courses.length === 0 && (
//                     <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
//                       <div className="relative inline-block mb-4">
//                         <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
//                         <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
//                       </div>
//                       <p className="text-gray-600 text-lg font-medium">Loading courses...</p>
//                     </div>
//                   )}

//                   {/* Courses Grid/List - Full width */}
//                   {courses.length > 0 ? (
//                     <>
//                       {view === 'grid' ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                           {courses.map((course) => (
//                             <CourseCard key={course.id} course={convertToCourseData(course)} variant="grid" />
//                           ))}
//                         </div>
//                       ) : (
//                         <div className="space-y-4">
//                           {courses.map((course) => (
//                             <CourseCard key={course.id} course={convertToCourseData(course)} variant="list" />
//                           ))}
//                         </div>
//                       )}

//                       {/* Load More Button */}
//                       {pagination.hasMore && (
//                         <div className="text-center mt-12">
//                           <Button
//                             onClick={loadMore}
//                             disabled={loading}
//                             className="min-w-48 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-0 px-8 py-3 font-semibold"
//                           >
//                             {loading ? (
//                               <>
//                                 <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                                 Loading More...
//                               </>
//                             ) : (
//                               <>
//                                 <Rocket className="h-4 w-4 mr-2" />
//                                 Load More Courses
//                               </>
//                             )}
//                           </Button>
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     /* No Results */
//                     <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
//                       <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <Search className="h-10 w-10 text-gray-400" />
//                       </div>
//                       <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
//                       <p className="text-gray-600 max-w-md mx-auto mb-6">
//                         {filters.searchQuery || hasActiveFilters(filters)
//                           ? "Try adjusting your search criteria or browse all courses."
//                           : "No courses available at the moment. Check back soon!"}
//                       </p>
//                       {(filters.searchQuery || hasActiveFilters(filters)) && (
//                         <Button
//                           onClick={resetFilters}
//                           variant="outline"
//                           className="rounded-lg"
//                         >
//                           Reset Filters
//                         </Button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// function hasActiveFilters(filters: any): boolean {
//   return Object.keys(filters).some(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   });
// }

// function getActiveFilterCount(filters: any): number {
//   return Object.keys(filters).filter(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   }).length;
// }



































// // /app/courses/page.tsx

// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { getCoursesAction } from '@/lib/courses/actions';
// import { getCategoriesAction } from '@/lib/categories/actions';
// import { getTagsAction } from '@/lib/tags/actions';
// import { CategoryNavigation } from '@/components/categories/category-navigation';
// import { CourseFilters } from '@/components/courses/course-filters';
// import { useCourseSearch } from '@/hooks/use-course-search';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Search, 
//   Filter, 
//   Loader2, 
//   Sparkles, 
//   TrendingUp, 
//   Users, 
//   Star, 
//   Zap,
//   Grid3X3,
//   List,
//   Play,
//   ArrowRight,
//   Rocket,
//   Brain,
//   Code,
//   Palette,
//   Heart,
//   Share2,
//   Eye,
//   Clock,
//   MessageCircle,
//   BookOpen
// } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Course } from '@/types/courses';
// import { Header } from '@/components/layout/header';
// import { Footer } from '@/components/layout/footer';
// import { CourseCard } from '@/components/courses/shared-course-card';

// interface CoursesPageProps {
//   searchParams: Promise<{
//     category?: string;
//     search?: string;
//     difficulty?: string;
//     content_type?: string;
//     price_range?: string;
//     min_rating?: string;
//     sort_by?: string;
//   }>;
// }

// // View Toggle Component
// function ViewToggle({ view, onViewChange }: { view: 'grid' | 'list'; onViewChange: (view: 'grid' | 'list') => void }) {
//   return (
//     <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
//       <Button
//         variant={view === 'grid' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('grid')}
//         className={`flex items-center gap-2 ${view === 'grid' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <Grid3X3 className="h-4 w-4" />
//         <span className="hidden sm:inline">Grid</span>
//       </Button>
//       <Button
//         variant={view === 'list' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('list')}
//         className={`flex items-center gap-2 ${view === 'list' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <List className="h-4 w-4" />
//         <span className="hidden sm:inline">List</span>
//       </Button>
//     </div>
//   );
// }

// // Animated Text Slider Component
// function TextSlider() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const slides = [
//     {
//       icon: <Code className="h-12 w-12 text-blue-400" />,
//       title: "Master Modern Tech",
//       description: "Learn cutting-edge technologies from industry experts",
//       gradient: "from-blue-500 to-cyan-500"
//     },
//     {
//       icon: <Brain className="h-12 w-12 text-purple-400" />,
//       title: "Boost Your Career",
//       description: "Gain skills that companies are hiring for right now",
//       gradient: "from-purple-500 to-pink-500"
//     },
//     {
//       icon: <Rocket className="h-12 w-12 text-orange-400" />,
//       title: "Learn at Light Speed",
//       description: "Accelerate your learning with project-based courses",
//       gradient: "from-orange-500 to-red-500"
//     },
//     {
//       icon: <Palette className="h-12 w-12 text-green-400" />,
//       title: "Unlock Creativity",
//       description: "Transform your ideas into reality with practical skills",
//       gradient: "from-green-500 to-teal-500"
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [slides.length]);

//   return (
//     <div className="relative h-48 md:h-56 lg:h-64 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm p-8 border border-white/20">
//       <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-xl"></div>
      
//       <div className="relative z-10 h-full flex items-center">
//         <div className="flex-1">
//           <div className="relative h-24 overflow-hidden">
//             {slides.map((slide, index) => (
//               <div
//                 key={index}
//                 className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
//                   index === currentSlide
//                     ? 'opacity-100 translate-x-0'
//                     : index < currentSlide
//                     ? 'opacity-0 -translate-x-full'
//                     : 'opacity-0 translate-x-full'
//                 }`}
//               >
//                 <div className="flex items-center space-x-6">
//                   <div className="flex-shrink-0">
//                     {slide.icon}
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
//                       {slide.title}
//                     </h3>
//                     <p className="text-blue-100 text-lg">
//                       {slide.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="absolute bottom-6 left-8 flex space-x-2 z-10">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             className={`w-2 h-2 rounded-full transition-all ${
//               index === currentSlide
//                 ? 'bg-white w-6'
//                 : 'bg-white/40'
//             }`}
//             onClick={() => setCurrentSlide(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // Enhanced Stats Cards for Dark Background
// function StatsCards({ stats }: { stats: { courses: number; categories: number; featured: number; skills: number } }) {
//   return (
//     <div className="grid grid-cols-2 gap-4">
//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-blue-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.courses}</div>
//             <div className="text-blue-200 text-sm">Courses</div>
//           </div>
//           <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <TrendingUp className="h-6 w-6 text-blue-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-green-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.categories}</div>
//             <div className="text-green-200 text-sm">Categories</div>
//           </div>
//           <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Users className="h-6 w-6 text-green-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-yellow-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.featured}</div>
//             <div className="text-yellow-200 text-sm">Featured</div>
//           </div>
//           <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Star className="h-6 w-6 text-yellow-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-purple-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.skills}</div>
//             <div className="text-purple-200 text-sm">Skills</div>
//           </div>
//           <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Zap className="h-6 w-6 text-purple-300" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Animated Gradient Background Component
// function AnimatedGradientBackground({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="relative w-full overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900">
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
//         <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1500"></div>
        
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
//       </div>
      
//       <div className="relative z-10">
//         {children}
//       </div>
//     </div>
//   );
// }

// // Helper function to convert Course type to compatible type for CourseCard
// const convertToCourseData = (course: Course) => {
//   return {
//     id: course.id,
//     slug: course.slug,
//     title: course.title,
//     thumbnail_url: course.thumbnail_url || undefined,
//     short_description: course.short_description || undefined,
//     category_name: course.category_name || undefined,
//     instructor_name: course.instructor_name || undefined,
//     instructor_image: course.instructor_image || undefined,
//     price_cents: course.price_cents || 0,
//     average_rating: course.average_rating || undefined,
//     review_count: course.review_count || undefined,
//     like_count: course.like_count || undefined,
//     share_count: course.share_count || undefined,
//     total_views: course.total_views || undefined,
//     enrolled_students_count: course.enrolled_students_count || undefined,
//     total_video_duration: course.total_video_duration || undefined,
//     total_lessons: course.total_lessons || undefined,
//     is_featured: course.is_featured || false,
//     is_trending: course.is_trending || false
//   };
// };

// // Helper function to check active filters
// function hasActiveFilters(filters: any): boolean {
//   return Object.keys(filters).some(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   });
// }

// // Helper function to count active filters
// function getActiveFilterCount(filters: any): number {
//   return Object.keys(filters).filter(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   }).length;
// }

// // Main Component
// export default function CoursesPage({ searchParams }: CoursesPageProps) {
//   const resolvedSearchParams = React.use(searchParams);
  
//   const [initialCourses, setInitialCourses] = useState<Course[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [availableTags, setAvailableTags] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [view, setView] = useState<'grid' | 'list'>('grid');

//   const {
//     courses,
//     loading,
//     error,
//     filters,
//     pagination,
//     updateFilters,
//     resetFilters,
//     loadMore
//   } = useCourseSearch(initialCourses);

//   useEffect(() => {
//     async function fetchInitialData() {
//       try {
//         setIsLoading(true);
        
//         const [coursesResult, categoriesResult, tagsResult] = await Promise.all([
//           getCoursesAction({
//             is_published: true,
//             category_slug: resolvedSearchParams.category,
//             limit: 100,
//             include_reviews: true
//           }),
//           getCategoriesAction(),
//           getTagsAction()
//         ]);

//         const coursesData = coursesResult.courses || [];
//         setInitialCourses(coursesData);
//         setCategories(categoriesResult.categories || []);
//         setAvailableTags(tagsResult.tags || []);
        
//         // Debug logging
//         console.log('=== COURSES PAGE DEBUG ===');
//         coursesData.slice(0, 5).forEach((course: any, index: number) => {
//           console.log(`${index + 1}. ${course.title}`);
//           console.log(`   average_rating: ${course.average_rating} (type: ${typeof course.average_rating})`);
//           console.log(`   review_count: ${course.review_count}`);
//           console.log(`   like_count: ${course.like_count}`);
//         });
        
//       } catch (error) {
//         console.error('Error fetching initial data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchInitialData();
//   }, [resolvedSearchParams.category]);

//   useEffect(() => {
//     const urlFilters = {
//       searchQuery: resolvedSearchParams.search || '',
//       category_slug: resolvedSearchParams.category || '',
//       difficulty: resolvedSearchParams.difficulty || '',
//       content_type: resolvedSearchParams.content_type || '',
//       price_range: resolvedSearchParams.price_range || '',
//       min_rating: parseFloat(resolvedSearchParams.min_rating || '0'),
//       sort_by: resolvedSearchParams.sort_by || 'relevance'
//     };
    
//     if (Object.values(urlFilters).some(value => value !== '' && value !== 0)) {
//       updateFilters(urlFilters);
//       setSearchQuery(urlFilters.searchQuery);
//     }
//   }, [resolvedSearchParams]);

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     updateFilters({ searchQuery: searchQuery });
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       updateFilters({ searchQuery: searchQuery });
//     }
//   };

//   // Calculate stats
//   const totalCourses = pagination.total;
//   const totalCategories = categories.length;
//   const totalTags = availableTags.length;
//   const featuredCourses = courses.filter(course => course.is_featured).length;

//   const stats = {
//     courses: totalCourses,
//     categories: totalCategories,
//     featured: featuredCourses,
//     skills: totalTags
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="container mx-auto px-4 py-8">
//           <div className="max-w-7xl mx-auto text-center py-20">
//             <div className="relative inline-block">
//               <Loader2 className="h-12 w-12 animate-spin mx-auto mb-6 text-blue-600" />
//               <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
//             </div>
//             <p className="text-gray-600 text-lg font-medium">Loading amazing courses...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
      
//       {/* Hero Section */}
//       <AnimatedGradientBackground>
//         <div className="w-full px-4 py-16">
//           <div className="w-full mx-auto">
//             <div className="mb-12">
//               <div className="text-center mb-8">
//                 <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
//                   Explore Courses
//                 </h1>
//                 <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
//                   Discover your next learning adventure in our comprehensive learning platform
//                 </p>
//               </div>

//               <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
//                 <div className="lg:col-span-1">
//                   <TextSlider />
//                 </div>

//                 <div className="lg:col-span-1">
//                   <StatsCards stats={stats} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </AnimatedGradientBackground>

//       {/* Search Bar */}
//       <div className="w-full bg-white border-b border-gray-200 py-8 px-4">
//         <div className="w-full max-w-7xl mx-auto">
//           <div className="text-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Course</h2>
//             <p className="text-gray-600">Search from thousands of courses with detailed ratings and reviews</p>
//           </div>
          
//           <form onSubmit={handleSearchSubmit} className="relative max-w-4xl mx-auto">
//             <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
//             <Input
//               type="text"
//               placeholder="Search courses by title, instructor, or technology... (Press Enter to search)"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="w-full pl-16 pr-6 py-6 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition text-gray-900 placeholder-gray-500 shadow-lg hover:shadow-xl"
//             />
//             <Button 
//               type="submit"
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-5 rounded-xl font-semibold"
//             >
//               Search
//             </Button>
//           </form>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="w-full bg-gray-50 min-h-screen">
//         <div className="w-full px-4 py-8">
//           <div className="w-full mx-auto">
//             {/* Mobile Filter Toggle */}
//             <div className="lg:hidden mb-6">
//               <Button
//                 onClick={() => setShowFilters(!showFilters)}
//                 variant="outline"
//                 className="w-full flex items-center justify-center gap-2 py-3 text-lg"
//               >
//                 <Filter size={20} />
//                 {showFilters ? 'Hide Filters' : 'Show Filters'}
//                 {hasActiveFilters(filters) && (
//                   <Badge variant="secondary" className="ml-2">
//                     {getActiveFilterCount(filters)}
//                   </Badge>
//                 )}
//               </Button>
//             </div>

//             {/* Full Width Grid Layout */}
//             <div className="w-full">
//               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//                 {/* Sidebar Filters */}
//                 <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:col-span-3 space-y-6`}>
//                   {/* Categories Card */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Sparkles className="h-5 w-5 text-blue-600" />
//                         Categories
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-0">
//                       <div className="max-h-96 overflow-y-auto">
//                         <CategoryNavigation 
//                           showCourseCounts={true}
//                           className="p-4"
//                           currentCategory={filters.category_slug}
//                         />
//                       </div>
//                     </CardContent>
//                   </Card>

//                   {/* Advanced Filters */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Filter className="h-5 w-5 text-purple-600" />
//                         Advanced Filters
//                       </CardTitle>
//                       <CardDescription>
//                         Filter by rating, social metrics, and more
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <CourseFilters
//                         filters={filters}
//                         onFiltersChange={updateFilters}
//                         onReset={resetFilters}
//                         availableTags={availableTags}
//                       />
//                     </CardContent>
//                   </Card>

//                   {/* Social Metrics Info */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Heart className="h-5 w-5 text-green-600" />
//                         Social Engagement
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <div className="space-y-3">
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                             <span>Rating & Reviews</span>
//                           </div>
//                           <Badge variant="outline" className="text-xs">
//                             Real user feedback
//                           </Badge>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Heart className="h-4 w-4 text-red-500 fill-red-500" />
//                             <span>Likes</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Course popularity</span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Share2 className="h-4 w-4 text-blue-500" />
//                             <span>Shares</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Social sharing</span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Eye className="h-4 w-4 text-purple-500" />
//                             <span>Views</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Course visibility</span>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>

//                 {/* Main Courses Area */}
//                 <div className="lg:col-span-9">
//                   {/* Results Header */}
//                   <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
//                     <div className="flex-1">
//                       <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent mb-2">
//                         {filters.category_slug ? (
//                           <>
//                             <Sparkles className="h-6 w-6 text-blue-600 inline mr-2" />
//                             {categories.find(cat => cat.slug === filters.category_slug)?.name}
//                           </>
//                         ) : filters.searchQuery ? (
//                           <>Search: "{filters.searchQuery}"</>
//                         ) : (
//                           <>All Courses</>
//                         )}
//                       </h2>
//                       <p className="text-gray-600 flex items-center gap-2">
//                         {loading ? (
//                           <>
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                             Discovering courses...
//                           </>
//                         ) : (
//                           <>
//                             <span className="font-semibold text-gray-900">{courses.length}</span>
//                             {courses.length === 1 ? ' course' : ' courses'} found
//                             {hasActiveFilters(filters) && (
//                               <span className="text-blue-600 ml-2">• Filtered</span>
//                             )}
//                           </>
//                         )}
//                       </p>
//                     </div>

//                     <div className="flex items-center gap-4">
//                       <ViewToggle view={view} onViewChange={setView} />
                      
//                       {hasActiveFilters(filters) && (
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={resetFilters}
//                           className="rounded-lg border-gray-300 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
//                         >
//                           Clear All
//                         </Button>
//                       )}
//                     </div>
//                   </div>

//                   {/* Error State */}
//                   {error && (
//                     <Card className="mb-6 border-red-200 bg-red-50 rounded-2xl overflow-hidden">
//                       <CardContent className="p-6">
//                         <div className="flex items-center gap-3">
//                           <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
//                           <p className="text-red-700 font-medium">Error: {error}</p>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   )}

//                   {/* Loading State */}
//                   {loading && courses.length === 0 && (
//                     <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
//                       <div className="relative inline-block mb-4">
//                         <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
//                         <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
//                       </div>
//                       <p className="text-gray-600 text-lg font-medium">Loading courses...</p>
//                     </div>
//                   )}

//                   {/* Courses Grid/List */}
//                   {courses.length > 0 ? (
//                     <>
//                       {view === 'grid' ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                           {courses.map((course) => (
//                             <CourseCard key={course.id} course={convertToCourseData(course)} variant="grid" />
//                           ))}
//                         </div>
//                       ) : (
//                         <div className="space-y-4">
//                           {courses.map((course) => (
//                             <CourseCard key={course.id} course={convertToCourseData(course)} variant="list" />
//                           ))}
//                         </div>
//                       )}

//                       {/* Load More Button */}
//                       {pagination.hasMore && (
//                         <div className="text-center mt-12">
//                           <Button
//                             onClick={loadMore}
//                             disabled={loading}
//                             className="min-w-48 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-0 px-8 py-3 font-semibold"
//                           >
//                             {loading ? (
//                               <>
//                                 <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                                 Loading More...
//                               </>
//                             ) : (
//                               <>
//                                 <Rocket className="h-4 w-4 mr-2" />
//                                 Load More Courses
//                               </>
//                             )}
//                           </Button>
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     /* No Results */
//                     <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
//                       <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <Search className="h-10 w-10 text-gray-400" />
//                       </div>
//                       <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
//                       <p className="text-gray-600 max-w-md mx-auto mb-6">
//                         {filters.searchQuery || hasActiveFilters(filters)
//                           ? "Try adjusting your search criteria or browse all courses."
//                           : "No courses available at the moment. Check back soon!"}
//                       </p>
//                       {(filters.searchQuery || hasActiveFilters(filters)) && (
//                         <Button
//                           onClick={resetFilters}
//                           variant="outline"
//                           className="rounded-lg"
//                         >
//                           Reset Filters
//                         </Button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }























// // /app/courses/page.tsx

// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { getCoursesAction } from '@/lib/courses/actions';
// import { getCategoriesAction } from '@/lib/categories/actions';
// import { getTagsAction } from '@/lib/tags/actions';
// import { CategoryNavigation } from '@/components/categories/category-navigation';
// import { CourseFilters } from '@/components/courses/course-filters';
// import { useCourseSearch } from '@/hooks/use-course-search';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Search, 
//   Filter, 
//   Loader2, 
//   Sparkles, 
//   TrendingUp, 
//   Users, 
//   Star, 
//   Zap,
//   Grid3X3,
//   List,
//   Play,
//   ArrowRight,
//   Rocket,
//   Brain,
//   Code,
//   Palette,
//   Heart,
//   Share2,
//   Eye,
//   Clock,
//   BookOpen
// } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Course } from '@/types/courses';
// import { Header } from '@/components/layout/header';
// import { Footer } from '@/components/layout/footer';
// import { CourseCard } from '@/components/courses/shared-course-card';

// interface CoursesPageProps {
//   searchParams: Promise<{
//     category?: string;
//     search?: string;
//     difficulty?: string;
//     content_type?: string;
//     price_range?: string;
//     min_rating?: string;
//     sort_by?: string;
//   }>;
// }

// // View Toggle Component
// function ViewToggle({ view, onViewChange }: { view: 'grid' | 'list'; onViewChange: (view: 'grid' | 'list') => void }) {
//   return (
//     <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
//       <Button
//         variant={view === 'grid' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('grid')}
//         className={`flex items-center gap-2 ${view === 'grid' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <Grid3X3 className="h-4 w-4" />
//         <span className="hidden sm:inline">Grid</span>
//       </Button>
//       <Button
//         variant={view === 'list' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('list')}
//         className={`flex items-center gap-2 ${view === 'list' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <List className="h-4 w-4" />
//         <span className="hidden sm:inline">List</span>
//       </Button>
//     </div>
//   );
// }

// // Animated Text Slider Component
// function TextSlider() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const slides = [
//     {
//       icon: <Code className="h-12 w-12 text-blue-400" />,
//       title: "Master Modern Tech",
//       description: "Learn cutting-edge technologies from industry experts",
//       gradient: "from-blue-500 to-cyan-500"
//     },
//     {
//       icon: <Brain className="h-12 w-12 text-purple-400" />,
//       title: "Boost Your Career",
//       description: "Gain skills that companies are hiring for right now",
//       gradient: "from-purple-500 to-pink-500"
//     },
//     {
//       icon: <Rocket className="h-12 w-12 text-orange-400" />,
//       title: "Learn at Light Speed",
//       description: "Accelerate your learning with project-based courses",
//       gradient: "from-orange-500 to-red-500"
//     },
//     {
//       icon: <Palette className="h-12 w-12 text-green-400" />,
//       title: "Unlock Creativity",
//       description: "Transform your ideas into reality with practical skills",
//       gradient: "from-green-500 to-teal-500"
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [slides.length]);

//   return (
//     <div className="relative h-48 md:h-56 lg:h-64 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm p-8 border border-white/20">
//       <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-xl"></div>
      
//       <div className="relative z-10 h-full flex items-center">
//         <div className="flex-1">
//           <div className="relative h-24 overflow-hidden">
//             {slides.map((slide, index) => (
//               <div
//                 key={index}
//                 className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
//                   index === currentSlide
//                     ? 'opacity-100 translate-x-0'
//                     : index < currentSlide
//                     ? 'opacity-0 -translate-x-full'
//                     : 'opacity-0 translate-x-full'
//                 }`}
//               >
//                 <div className="flex items-center space-x-6">
//                   <div className="flex-shrink-0">
//                     {slide.icon}
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
//                       {slide.title}
//                     </h3>
//                     <p className="text-blue-100 text-lg">
//                       {slide.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="absolute bottom-6 left-8 flex space-x-2 z-10">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             className={`w-2 h-2 rounded-full transition-all ${
//               index === currentSlide
//                 ? 'bg-white w-6'
//                 : 'bg-white/40'
//             }`}
//             onClick={() => setCurrentSlide(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // Enhanced Stats Cards for Dark Background
// function StatsCards({ stats }: { stats: { courses: number; categories: number; featured: number; skills: number } }) {
//   return (
//     <div className="grid grid-cols-2 gap-4">
//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-blue-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.courses}</div>
//             <div className="text-blue-200 text-sm">Courses</div>
//           </div>
//           <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <TrendingUp className="h-6 w-6 text-blue-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-green-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.categories}</div>
//             <div className="text-green-200 text-sm">Categories</div>
//           </div>
//           <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Users className="h-6 w-6 text-green-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-yellow-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.featured}</div>
//             <div className="text-yellow-200 text-sm">Featured</div>
//           </div>
//           <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Star className="h-6 w-6 text-yellow-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-purple-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.skills}</div>
//             <div className="text-purple-200 text-sm">Skills</div>
//           </div>
//           <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Zap className="h-6 w-6 text-purple-300" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Animated Gradient Background Component
// function AnimatedGradientBackground({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="relative w-full overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900">
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
//         <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1500"></div>
        
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
//       </div>
      
//       <div className="relative z-10">
//         {children}
//       </div>
//     </div>
//   );
// }

// // Helper function to convert Course type to compatible type for CourseCard
// const convertToCourseData = (course: Course) => {
//   return {
//     id: course.id,
//     slug: course.slug,
//     title: course.title,
//     thumbnail_url: course.thumbnail_url || undefined,
//     short_description: course.short_description || undefined,
//     category_name: course.category_name || undefined,
//     instructor_name: course.instructor_name || undefined,
//     instructor_image: course.instructor_image || undefined,
//     price_cents: course.price_cents || 0,
//     average_rating: course.average_rating || undefined,
//     review_count: course.review_count || undefined,
//     like_count: course.like_count || undefined,
//     share_count: course.share_count || undefined,
//     total_views: course.total_views || undefined,
//     enrolled_students_count: course.enrolled_students_count || undefined,
//     total_video_duration: course.total_video_duration || undefined,
//     total_lessons: course.total_lessons || undefined,
//     is_featured: course.is_featured || false,
//     is_trending: course.is_trending || false
//   };
// };

// // Helper function to check active filters
// function hasActiveFilters(filters: any): boolean {
//   return Object.keys(filters).some(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   });
// }

// // Helper function to count active filters
// function getActiveFilterCount(filters: any): number {
//   return Object.keys(filters).filter(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   }).length;
// }

// // Import formatRating from shared component
// import { formatRating } from '@/components/courses/shared-course-card';

// // Main Component
// export default function CoursesPage({ searchParams }: CoursesPageProps) {
//   const resolvedSearchParams = React.use(searchParams);
  
//   const [initialCourses, setInitialCourses] = useState<Course[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [availableTags, setAvailableTags] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [view, setView] = useState<'grid' | 'list'>('grid');

//   const {
//     courses,
//     loading,
//     error,
//     filters,
//     pagination,
//     updateFilters,
//     resetFilters,
//     loadMore
//   } = useCourseSearch(initialCourses);

//   useEffect(() => {
//     async function fetchInitialData() {
//       try {
//         setIsLoading(true);
        
//         const [coursesResult, categoriesResult, tagsResult] = await Promise.all([
//           getCoursesAction({
//             is_published: true,
//             category_slug: resolvedSearchParams.category,
//             limit: 100,
//             include_reviews: true
//           }),
//           getCategoriesAction(),
//           getTagsAction()
//         ]);

//         const coursesData = coursesResult.courses || [];
        
//         // IMPORTANT: Debug what's coming from API
//         console.log('=== DEBUG: API Response ===');
//         console.log('Total courses:', coursesData.length);

//         coursesData.forEach((course: any, index: number) => {
//           console.log(`\n${index + 1}. ${course.title}`);
//           console.log('   average_rating:', course.average_rating);
//           console.log('   review_count:', course.review_count);
//           console.log('   Type of average_rating:', typeof course.average_rating);
          
//           // Test the formatRating function directly
//           const testRating = course.average_rating;
//           const testReviewCount = course.review_count;
//           const formatted = formatRating(testRating, testReviewCount);
//           console.log('   Formatted rating:', formatted);
//           console.log('   Has rating?', !!formatted);
          
//           // Check if rating should show
//           const shouldShow = testRating && testRating > 0 && (!testReviewCount || testReviewCount > 0);
//           console.log('   Should show rating?', shouldShow);
//         });

//         setInitialCourses(coursesData);
//         setCategories(categoriesResult.categories || []);
//         setAvailableTags(tagsResult.tags || []);
        
//       } catch (error) {
//         console.error('Error fetching initial data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchInitialData();
//   }, [resolvedSearchParams.category]);

//   useEffect(() => {
//     const urlFilters = {
//       searchQuery: resolvedSearchParams.search || '',
//       category_slug: resolvedSearchParams.category || '',
//       difficulty: resolvedSearchParams.difficulty || '',
//       content_type: resolvedSearchParams.content_type || '',
//       price_range: resolvedSearchParams.price_range || '',
//       min_rating: parseFloat(resolvedSearchParams.min_rating || '0'),
//       sort_by: resolvedSearchParams.sort_by || 'relevance'
//     };
    
//     if (Object.values(urlFilters).some(value => value !== '' && value !== 0)) {
//       updateFilters(urlFilters);
//       setSearchQuery(urlFilters.searchQuery);
//     }
//   }, [resolvedSearchParams]);

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     updateFilters({ searchQuery: searchQuery });
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       updateFilters({ searchQuery: searchQuery });
//     }
//   };

//   // Calculate stats
//   const totalCourses = pagination.total;
//   const totalCategories = categories.length;
//   const totalTags = availableTags.length;
//   const featuredCourses = courses.filter(course => course.is_featured).length;

//   const stats = {
//     courses: totalCourses,
//     categories: totalCategories,
//     featured: featuredCourses,
//     skills: totalTags
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="container mx-auto px-4 py-8">
//           <div className="max-w-7xl mx-auto text-center py-20">
//             <div className="relative inline-block">
//               <Loader2 className="h-12 w-12 animate-spin mx-auto mb-6 text-blue-600" />
//               <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
//             </div>
//             <p className="text-gray-600 text-lg font-medium">Loading amazing courses...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
      
//       {/* Hero Section */}
//       <AnimatedGradientBackground>
//         <div className="w-full px-4 py-16">
//           <div className="w-full mx-auto">
//             <div className="mb-12">
//               <div className="text-center mb-8">
//                 <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
//                   Explore Courses
//                 </h1>
//                 <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
//                   Discover your next learning adventure in our comprehensive learning platform
//                 </p>
//               </div>

//               <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
//                 <div className="lg:col-span-1">
//                   <TextSlider />
//                 </div>

//                 <div className="lg:col-span-1">
//                   <StatsCards stats={stats} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </AnimatedGradientBackground>

//       {/* Search Bar */}
//       <div className="w-full bg-white border-b border-gray-200 py-8 px-4">
//         <div className="w-full max-w-7xl mx-auto">
//           <div className="text-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Course</h2>
//             <p className="text-gray-600">Search from thousands of courses with detailed ratings and reviews</p>
//           </div>
          
//           <form onSubmit={handleSearchSubmit} className="relative max-w-4xl mx-auto">
//             <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
//             <Input
//               type="text"
//               placeholder="Search courses by title, instructor, or technology... (Press Enter to search)"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="w-full pl-16 pr-6 py-6 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition text-gray-900 placeholder-gray-500 shadow-lg hover:shadow-xl"
//             />
//             <Button 
//               type="submit"
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-5 rounded-xl font-semibold"
//             >
//               Search
//             </Button>
//           </form>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="w-full bg-gray-50 min-h-screen">
//         <div className="w-full px-4 py-8">
//           <div className="w-full mx-auto">
//             {/* Mobile Filter Toggle */}
//             <div className="lg:hidden mb-6">
//               <Button
//                 onClick={() => setShowFilters(!showFilters)}
//                 variant="outline"
//                 className="w-full flex items-center justify-center gap-2 py-3 text-lg"
//               >
//                 <Filter size={20} />
//                 {showFilters ? 'Hide Filters' : 'Show Filters'}
//                 {hasActiveFilters(filters) && (
//                   <Badge variant="secondary" className="ml-2">
//                     {getActiveFilterCount(filters)}
//                   </Badge>
//                 )}
//               </Button>
//             </div>

//             {/* Full Width Grid Layout */}
//             <div className="w-full">
//               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//                 {/* Sidebar Filters */}
//                 <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:col-span-3 space-y-6`}>
//                   {/* Categories Card */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Sparkles className="h-5 w-5 text-blue-600" />
//                         Categories
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-0">
//                       <div className="max-h-96 overflow-y-auto">
//                         <CategoryNavigation 
//                           showCourseCounts={true}
//                           className="p-4"
//                           currentCategory={filters.category_slug}
//                         />
//                       </div>
//                     </CardContent>
//                   </Card>

//                   {/* Advanced Filters */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Filter className="h-5 w-5 text-purple-600" />
//                         Advanced Filters
//                       </CardTitle>
//                       <CardDescription>
//                         Filter by rating, social metrics, and more
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <CourseFilters
//                         filters={filters}
//                         onFiltersChange={updateFilters}
//                         onReset={resetFilters}
//                         availableTags={availableTags}
//                       />
//                     </CardContent>
//                   </Card>

//                   {/* Social Metrics Info */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Heart className="h-5 w-5 text-green-600" />
//                         Social Engagement
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <div className="space-y-3">
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                             <span>Rating & Reviews</span>
//                           </div>
//                           <Badge variant="outline" className="text-xs">
//                             Real user feedback
//                           </Badge>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Heart className="h-4 w-4 text-red-500 fill-red-500" />
//                             <span>Likes</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Course popularity</span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Share2 className="h-4 w-4 text-blue-500" />
//                             <span>Shares</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Social sharing</span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Eye className="h-4 w-4 text-purple-500" />
//                             <span>Views</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Course visibility</span>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>

//                 {/* Main Courses Area */}
//                 <div className="lg:col-span-9">
//                   {/* Results Header */}
//                   <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
//                     <div className="flex-1">
//                       <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent mb-2">
//                         {filters.category_slug ? (
//                           <>
//                             <Sparkles className="h-6 w-6 text-blue-600 inline mr-2" />
//                             {categories.find(cat => cat.slug === filters.category_slug)?.name}
//                           </>
//                         ) : filters.searchQuery ? (
//                           <>Search: "{filters.searchQuery}"</>
//                         ) : (
//                           <>All Courses</>
//                         )}
//                       </h2>
//                       <p className="text-gray-600 flex items-center gap-2">
//                         {loading ? (
//                           <>
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                             Discovering courses...
//                           </>
//                         ) : (
//                           <>
//                             <span className="font-semibold text-gray-900">{courses.length}</span>
//                             {courses.length === 1 ? ' course' : ' courses'} found
//                             {hasActiveFilters(filters) && (
//                               <span className="text-blue-600 ml-2">• Filtered</span>
//                             )}
//                           </>
//                         )}
//                       </p>
//                     </div>

//                     <div className="flex items-center gap-4">
//                       <ViewToggle view={view} onViewChange={setView} />
                      
//                       {hasActiveFilters(filters) && (
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={resetFilters}
//                           className="rounded-lg border-gray-300 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
//                         >
//                           Clear All
//                         </Button>
//                       )}
//                     </div>
//                   </div>

//                   {/* Error State */}
//                   {error && (
//                     <Card className="mb-6 border-red-200 bg-red-50 rounded-2xl overflow-hidden">
//                       <CardContent className="p-6">
//                         <div className="flex items-center gap-3">
//                           <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
//                           <p className="text-red-700 font-medium">Error: {error}</p>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   )}

//                   {/* Loading State */}
//                   {loading && courses.length === 0 && (
//                     <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
//                       <div className="relative inline-block mb-4">
//                         <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
//                         <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
//                       </div>
//                       <p className="text-gray-600 text-lg font-medium">Loading courses...</p>
//                     </div>
//                   )}

//                   {/* Courses Grid/List */}
//                   {courses.length > 0 ? (
//                     <>
//                       {view === 'grid' ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                           {courses.map((course) => (
//                             <CourseCard key={course.id} course={convertToCourseData(course)} variant="grid" />
//                           ))}
//                         </div>
//                       ) : (
//                         <div className="space-y-4">
//                           {courses.map((course) => (
//                             <CourseCard key={course.id} course={convertToCourseData(course)} variant="list" />
//                           ))}
//                         </div>
//                       )}

//                       {/* Load More Button */}
//                       {pagination.hasMore && (
//                         <div className="text-center mt-12">
//                           <Button
//                             onClick={loadMore}
//                             disabled={loading}
//                             className="min-w-48 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-0 px-8 py-3 font-semibold"
//                           >
//                             {loading ? (
//                               <>
//                                 <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                                 Loading More...
//                               </>
//                             ) : (
//                               <>
//                                 <Rocket className="h-4 w-4 mr-2" />
//                                 Load More Courses
//                               </>
//                             )}
//                           </Button>
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     /* No Results */
//                     <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
//                       <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <Search className="h-10 w-10 text-gray-400" />
//                       </div>
//                       <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
//                       <p className="text-gray-600 max-w-md mx-auto mb-6">
//                         {filters.searchQuery || hasActiveFilters(filters)
//                           ? "Try adjusting your search criteria or browse all courses."
//                           : "No courses available at the moment. Check back soon!"}
//                       </p>
//                       {(filters.searchQuery || hasActiveFilters(filters)) && (
//                         <Button
//                           onClick={resetFilters}
//                           variant="outline"
//                           className="rounded-lg"
//                         >
//                           Reset Filters
//                         </Button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

























// // File: /src/components/courses/shared-course-card.tsx

// // /app/courses/page.tsx

// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { getCoursesAction } from '@/lib/courses/actions';
// import { getCategoriesAction } from '@/lib/categories/actions';
// import { getTagsAction } from '@/lib/tags/actions';
// import { CategoryNavigation } from '@/components/categories/category-navigation';
// import { CourseFilters } from '@/components/courses/course-filters';
// import { useCourseSearch } from '@/hooks/use-course-search';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Search, 
//   Filter, 
//   Loader2, 
//   Sparkles, 
//   TrendingUp, 
//   Users, 
//   Star, 
//   Zap,
//   Grid3X3,
//   List,
//   Play,
//   ArrowRight,
//   Rocket,
//   Brain,
//   Code,
//   Palette,
//   Heart,
//   Share2,
//   Eye,
//   Clock,
//   BookOpen
// } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Course } from '@/types/courses';
// import { Header } from '@/components/layout/header';
// import { Footer } from '@/components/layout/footer';
// import { CourseCard } from '@/components/courses/shared-course-card';

// interface CoursesPageProps {
//   searchParams: Promise<{
//     category?: string;
//     search?: string;
//     difficulty?: string;
//     content_type?: string;
//     price_range?: string;
//     min_rating?: string;
//     sort_by?: string;
//   }>;
// }

// // View Toggle Component
// function ViewToggle({ view, onViewChange }: { view: 'grid' | 'list'; onViewChange: (view: 'grid' | 'list') => void }) {
//   return (
//     <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
//       <Button
//         variant={view === 'grid' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('grid')}
//         className={`flex items-center gap-2 ${view === 'grid' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <Grid3X3 className="h-4 w-4" />
//         <span className="hidden sm:inline">Grid</span>
//       </Button>
//       <Button
//         variant={view === 'list' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('list')}
//         className={`flex items-center gap-2 ${view === 'list' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <List className="h-4 w-4" />
//         <span className="hidden sm:inline">List</span>
//       </Button>
//     </div>
//   );
// }

// // Animated Text Slider Component
// function TextSlider() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const slides = [
//     {
//       icon: <Code className="h-12 w-12 text-blue-400" />,
//       title: "Master Modern Tech",
//       description: "Learn cutting-edge technologies from industry experts",
//       gradient: "from-blue-500 to-cyan-500"
//     },
//     {
//       icon: <Brain className="h-12 w-12 text-purple-400" />,
//       title: "Boost Your Career",
//       description: "Gain skills that companies are hiring for right now",
//       gradient: "from-purple-500 to-pink-500"
//     },
//     {
//       icon: <Rocket className="h-12 w-12 text-orange-400" />,
//       title: "Learn at Light Speed",
//       description: "Accelerate your learning with project-based courses",
//       gradient: "from-orange-500 to-red-500"
//     },
//     {
//       icon: <Palette className="h-12 w-12 text-green-400" />,
//       title: "Unlock Creativity",
//       description: "Transform your ideas into reality with practical skills",
//       gradient: "from-green-500 to-teal-500"
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [slides.length]);

//   return (
//     <div className="relative h-48 md:h-56 lg:h-64 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm p-8 border border-white/20">
//       <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-xl"></div>
      
//       <div className="relative z-10 h-full flex items-center">
//         <div className="flex-1">
//           <div className="relative h-24 overflow-hidden">
//             {slides.map((slide, index) => (
//               <div
//                 key={index}
//                 className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
//                   index === currentSlide
//                     ? 'opacity-100 translate-x-0'
//                     : index < currentSlide
//                     ? 'opacity-0 -translate-x-full'
//                     : 'opacity-0 translate-x-full'
//                 }`}
//               >
//                 <div className="flex items-center space-x-6">
//                   <div className="flex-shrink-0">
//                     {slide.icon}
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
//                       {slide.title}
//                     </h3>
//                     <p className="text-blue-100 text-lg">
//                       {slide.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="absolute bottom-6 left-8 flex space-x-2 z-10">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             className={`w-2 h-2 rounded-full transition-all ${
//               index === currentSlide
//                 ? 'bg-white w-6'
//                 : 'bg-white/40'
//             }`}
//             onClick={() => setCurrentSlide(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // Enhanced Stats Cards for Dark Background
// function StatsCards({ stats }: { stats: { courses: number; categories: number; featured: number; skills: number } }) {
//   return (
//     <div className="grid grid-cols-2 gap-4">
//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-blue-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.courses}</div>
//             <div className="text-blue-200 text-sm">Courses</div>
//           </div>
//           <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <TrendingUp className="h-6 w-6 text-blue-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-green-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.categories}</div>
//             <div className="text-green-200 text-sm">Categories</div>
//           </div>
//           <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Users className="h-6 w-6 text-green-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-yellow-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.featured}</div>
//             <div className="text-yellow-200 text-sm">Featured</div>
//           </div>
//           <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Star className="h-6 w-6 text-yellow-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-purple-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.skills}</div>
//             <div className="text-purple-200 text-sm">Skills</div>
//           </div>
//           <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Zap className="h-6 w-6 text-purple-300" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Animated Gradient Background Component
// function AnimatedGradientBackground({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="relative w-full overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900">
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
//         <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1500"></div>
        
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
//       </div>
      
//       <div className="relative z-10">
//         {children}
//       </div>
//     </div>
//   );
// }

// // Helper function to convert Course type to compatible type for CourseCard
// const convertToCourseData = (course: Course) => {
//   return {
//     id: course.id,
//     slug: course.slug,
//     title: course.title,
//     thumbnail_url: course.thumbnail_url || undefined,
//     short_description: course.short_description || undefined,
//     category_name: course.category_name || undefined,
//     instructor_name: course.instructor_name || undefined,
//     instructor_image: course.instructor_image || undefined,
//     price_cents: course.price_cents || 0,
//     // FIX: Ensure average_rating is always a number and not undefined
//     average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
//     review_count: course.review_count || 0,
//     like_count: course.like_count || undefined,
//     share_count: course.share_count || undefined,
//     total_views: course.total_views || undefined,
//     enrolled_students_count: course.enrolled_students_count || undefined,
//     total_video_duration: course.total_video_duration || undefined,
//     total_lessons: course.total_lessons || undefined,
//     is_featured: course.is_featured || false,
//     is_trending: course.is_trending || false
//   };
// };

// // Helper function to check active filters
// function hasActiveFilters(filters: any): boolean {
//   return Object.keys(filters).some(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   });
// }

// // Helper function to count active filters
// function getActiveFilterCount(filters: any): number {
//   return Object.keys(filters).filter(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   }).length;
// }

// // Enhanced formatRating function that always returns a valid display value
// const formatRating = (rating: number | undefined | null, reviewCount: number | undefined | null) => {
//   // Ensure rating is a number, default to 0 if not
//   const numericRating = typeof rating === 'number' ? rating : 0;
  
//   // Ensure reviewCount is a number, default to 0 if not
//   const numericReviewCount = typeof reviewCount === 'number' ? reviewCount : 0;
  
//   // If rating is 0, show "No ratings" instead of hiding
//   if (numericRating === 0) {
//     return {
//       display: "No ratings yet",
//       value: 0,
//       hasReviews: false,
//       showRating: true // Always show, even if 0
//     };
//   }
  
//   // If rating exists and is > 0, format it
//   if (numericRating > 0) {
//     return {
//       display: `${numericRating.toFixed(1)}`,
//       value: numericRating,
//       hasReviews: numericReviewCount > 0,
//       showRating: true
//     };
//   }
  
//   // Fallback for any other case
//   return {
//     display: "No ratings yet",
//     value: 0,
//     hasReviews: false,
//     showRating: true
//   };
// };

// // Main Component
// export default function CoursesPage({ searchParams }: CoursesPageProps) {
//   const resolvedSearchParams = React.use(searchParams);
  
//   const [initialCourses, setInitialCourses] = useState<Course[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [availableTags, setAvailableTags] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [view, setView] = useState<'grid' | 'list'>('grid');

//   const {
//     courses,
//     loading,
//     error,
//     filters,
//     pagination,
//     updateFilters,
//     resetFilters,
//     loadMore
//   } = useCourseSearch(initialCourses);

//   useEffect(() => {
//     async function fetchInitialData() {
//       try {
//         setIsLoading(true);
        
//         const [coursesResult, categoriesResult, tagsResult] = await Promise.all([
//           getCoursesAction({
//             is_published: true,
//             category_slug: resolvedSearchParams.category,
//             limit: 100,
//             include_reviews: true
//           }),
//           getCategoriesAction(),
//           getTagsAction()
//         ]);

//         const coursesData = coursesResult.courses || [];
        
//         // IMPORTANT: Debug what's coming from API
//         console.log('=== DEBUG: API Response ===');
//         console.log('Total courses:', coursesData.length);

//         coursesData.forEach((course: any, index: number) => {
//           console.log(`\n${index + 1}. ${course.title}`);
//           console.log('   average_rating:', course.average_rating);
//           console.log('   review_count:', course.review_count);
//           console.log('   Type of average_rating:', typeof course.average_rating);
          
//           // Test the enhanced formatRating function
//           const testRating = course.average_rating;
//           const testReviewCount = course.review_count;
//           const formatted = formatRating(testRating, testReviewCount);
//           console.log('   Formatted rating display:', formatted.display);
//           console.log('   Should show rating?', formatted.showRating);
//         });

//         // FIX: Ensure all courses have valid average_rating values
//         const coursesWithValidRatings = coursesData.map((course: any) => ({
//           ...course,
//           average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
//           review_count: course.review_count || 0
//         }));

//         setInitialCourses(coursesWithValidRatings);
//         setCategories(categoriesResult.categories || []);
//         setAvailableTags(tagsResult.tags || []);
        
//       } catch (error) {
//         console.error('Error fetching initial data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchInitialData();
//   }, [resolvedSearchParams.category]);

//   useEffect(() => {
//     const urlFilters = {
//       searchQuery: resolvedSearchParams.search || '',
//       category_slug: resolvedSearchParams.category || '',
//       difficulty: resolvedSearchParams.difficulty || '',
//       content_type: resolvedSearchParams.content_type || '',
//       price_range: resolvedSearchParams.price_range || '',
//       min_rating: parseFloat(resolvedSearchParams.min_rating || '0'),
//       sort_by: resolvedSearchParams.sort_by || 'relevance'
//     };
    
//     if (Object.values(urlFilters).some(value => value !== '' && value !== 0)) {
//       updateFilters(urlFilters);
//       setSearchQuery(urlFilters.searchQuery);
//     }
//   }, [resolvedSearchParams]);

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     updateFilters({ searchQuery: searchQuery });
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       updateFilters({ searchQuery: searchQuery });
//     }
//   };

//   // Calculate stats
//   const totalCourses = pagination.total;
//   const totalCategories = categories.length;
//   const totalTags = availableTags.length;
//   const featuredCourses = courses.filter(course => course.is_featured).length;

//   const stats = {
//     courses: totalCourses,
//     categories: totalCategories,
//     featured: featuredCourses,
//     skills: totalTags
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="container mx-auto px-4 py-8">
//           <div className="max-w-7xl mx-auto text-center py-20">
//             <div className="relative inline-block">
//               <Loader2 className="h-12 w-12 animate-spin mx-auto mb-6 text-blue-600" />
//               <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
//             </div>
//             <p className="text-gray-600 text-lg font-medium">Loading amazing courses...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
      
//       {/* Hero Section */}
//       <AnimatedGradientBackground>
//         <div className="w-full px-4 py-16">
//           <div className="w-full mx-auto">
//             <div className="mb-12">
//               <div className="text-center mb-8">
//                 <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
//                   Explore Courses
//                 </h1>
//                 <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
//                   Discover your next learning adventure in our comprehensive learning platform
//                 </p>
//               </div>

//               <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
//                 <div className="lg:col-span-1">
//                   <TextSlider />
//                 </div>

//                 <div className="lg:col-span-1">
//                   <StatsCards stats={stats} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </AnimatedGradientBackground>

//       {/* Search Bar */}
//       <div className="w-full bg-white border-b border-gray-200 py-8 px-4">
//         <div className="w-full max-w-7xl mx-auto">
//           <div className="text-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Course</h2>
//             <p className="text-gray-600">Search from thousands of courses with detailed ratings and reviews</p>
//           </div>
          
//           <form onSubmit={handleSearchSubmit} className="relative max-w-4xl mx-auto">
//             <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
//             <Input
//               type="text"
//               placeholder="Search courses by title, instructor, or technology... (Press Enter to search)"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="w-full pl-16 pr-6 py-6 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition text-gray-900 placeholder-gray-500 shadow-lg hover:shadow-xl"
//             />
//             <Button 
//               type="submit"
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-5 rounded-xl font-semibold"
//             >
//               Search
//             </Button>
//           </form>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="w-full bg-gray-50 min-h-screen">
//         <div className="w-full px-4 py-8">
//           <div className="w-full mx-auto">
//             {/* Mobile Filter Toggle */}
//             <div className="lg:hidden mb-6">
//               <Button
//                 onClick={() => setShowFilters(!showFilters)}
//                 variant="outline"
//                 className="w-full flex items-center justify-center gap-2 py-3 text-lg"
//               >
//                 <Filter size={20} />
//                 {showFilters ? 'Hide Filters' : 'Show Filters'}
//                 {hasActiveFilters(filters) && (
//                   <Badge variant="secondary" className="ml-2">
//                     {getActiveFilterCount(filters)}
//                   </Badge>
//                 )}
//               </Button>
//             </div>

//             {/* Full Width Grid Layout */}
//             <div className="w-full">
//               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//                 {/* Sidebar Filters */}
//                 <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:col-span-3 space-y-6`}>
//                   {/* Categories Card */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Sparkles className="h-5 w-5 text-blue-600" />
//                         Categories
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-0">
//                       <div className="max-h-96 overflow-y-auto">
//                         <CategoryNavigation 
//                           showCourseCounts={true}
//                           className="p-4"
//                           currentCategory={filters.category_slug}
//                         />
//                       </div>
//                     </CardContent>
//                   </Card>

//                   {/* Advanced Filters */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Filter className="h-5 w-5 text-purple-600" />
//                         Advanced Filters
//                       </CardTitle>
//                       <CardDescription>
//                         Filter by rating, social metrics, and more
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <CourseFilters
//                         filters={filters}
//                         onFiltersChange={updateFilters}
//                         onReset={resetFilters}
//                         availableTags={availableTags}
//                       />
//                     </CardContent>
//                   </Card>

//                   {/* Social Metrics Info */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Heart className="h-5 w-5 text-green-600" />
//                         Social Engagement
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <div className="space-y-3">
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                             <span>Rating & Reviews</span>
//                           </div>
//                           <Badge variant="outline" className="text-xs">
//                             Real user feedback
//                           </Badge>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Heart className="h-4 w-4 text-red-500 fill-red-500" />
//                             <span>Likes</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Course popularity</span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Share2 className="h-4 w-4 text-blue-500" />
//                             <span>Shares</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Social sharing</span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Eye className="h-4 w-4 text-purple-500" />
//                             <span>Views</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Course visibility</span>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>

//                 {/* Main Courses Area */}
//                 <div className="lg:col-span-9">
//                   {/* Results Header */}
//                   <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
//                     <div className="flex-1">
//                       <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent mb-2">
//                         {filters.category_slug ? (
//                           <>
//                             <Sparkles className="h-6 w-6 text-blue-600 inline mr-2" />
//                             {categories.find(cat => cat.slug === filters.category_slug)?.name}
//                           </>
//                         ) : filters.searchQuery ? (
//                           <>Search: "{filters.searchQuery}"</>
//                         ) : (
//                           <>All Courses</>
//                         )}
//                       </h2>
//                       <p className="text-gray-600 flex items-center gap-2">
//                         {loading ? (
//                           <>
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                             Discovering courses...
//                           </>
//                         ) : (
//                           <>
//                             <span className="font-semibold text-gray-900">{courses.length}</span>
//                             {courses.length === 1 ? ' course' : ' courses'} found
//                             {hasActiveFilters(filters) && (
//                               <span className="text-blue-600 ml-2">• Filtered</span>
//                             )}
//                           </>
//                         )}
//                       </p>
//                     </div>

//                     <div className="flex items-center gap-4">
//                       <ViewToggle view={view} onViewChange={setView} />
                      
//                       {hasActiveFilters(filters) && (
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={resetFilters}
//                           className="rounded-lg border-gray-300 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
//                         >
//                           Clear All
//                         </Button>
//                       )}
//                     </div>
//                   </div>

//                   {/* Error State */}
//                   {error && (
//                     <Card className="mb-6 border-red-200 bg-red-50 rounded-2xl overflow-hidden">
//                       <CardContent className="p-6">
//                         <div className="flex items-center gap-3">
//                           <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
//                           <p className="text-red-700 font-medium">Error: {error}</p>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   )}

//                   {/* Loading State */}
//                   {loading && courses.length === 0 && (
//                     <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
//                       <div className="relative inline-block mb-4">
//                         <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
//                         <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
//                       </div>
//                       <p className="text-gray-600 text-lg font-medium">Loading courses...</p>
//                     </div>
//                   )}

//                   {/* Courses Grid/List */}
//                   {courses.length > 0 ? (
//                     <>
//                       {view === 'grid' ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                           {courses.map((course) => {
//                             // FIX: Ensure course has valid rating data before passing to CourseCard
//                             const enhancedCourse = {
//                               ...convertToCourseData(course),
//                               // Double-check that average_rating is always a valid number
//                               average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
//                               review_count: course.review_count || 0
//                             };
                            
//                             return (
//                               <CourseCard 
//                                 key={course.id} 
//                                 course={enhancedCourse} 
//                                 variant="grid" 
//                               />
//                             );
//                           })}
//                         </div>
//                       ) : (
//                         <div className="space-y-4">
//                           {courses.map((course) => {
//                             // FIX: Ensure course has valid rating data before passing to CourseCard
//                             const enhancedCourse = {
//                               ...convertToCourseData(course),
//                               // Double-check that average_rating is always a valid number
//                               average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
//                               review_count: course.review_count || 0
//                             };
                            
//                             return (
//                               <CourseCard 
//                                 key={course.id} 
//                                 course={enhancedCourse} 
//                                 variant="list" 
//                               />
//                             );
//                           })}
//                         </div>
//                       )}

//                       {/* Load More Button */}
//                       {pagination.hasMore && (
//                         <div className="text-center mt-12">
//                           <Button
//                             onClick={loadMore}
//                             disabled={loading}
//                             className="min-w-48 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-0 px-8 py-3 font-semibold"
//                           >
//                             {loading ? (
//                               <>
//                                 <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                                 Loading More...
//                               </>
//                             ) : (
//                               <>
//                                 <Rocket className="h-4 w-4 mr-2" />
//                                 Load More Courses
//                               </>
//                             )}
//                           </Button>
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     /* No Results */
//                     <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
//                       <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <Search className="h-10 w-10 text-gray-400" />
//                       </div>
//                       <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
//                       <p className="text-gray-600 max-w-md mx-auto mb-6">
//                         {filters.searchQuery || hasActiveFilters(filters)
//                           ? "Try adjusting your search criteria or browse all courses."
//                           : "No courses available at the moment. Check back soon!"}
//                       </p>
//                       {(filters.searchQuery || hasActiveFilters(filters)) && (
//                         <Button
//                           onClick={resetFilters}
//                           variant="outline"
//                           className="rounded-lg"
//                         >
//                           Reset Filters
//                         </Button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }





























// // File: /src/components/courses/shared-course-card.tsx

// // /app/courses/page.tsx

// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { getCoursesAction } from '@/lib/courses/actions';
// import { getCategoriesAction } from '@/lib/categories/actions';
// import { getTagsAction } from '@/lib/tags/actions';
// import { CategoryNavigation } from '@/components/categories/category-navigation';
// import { CourseFilters } from '@/components/courses/course-filters';
// import { useCourseSearch } from '@/hooks/use-course-search';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Search, 
//   Filter, 
//   Loader2, 
//   Sparkles, 
//   TrendingUp, 
//   Users, 
//   Star, 
//   Zap,
//   Grid3X3,
//   List,
//   Play,
//   ArrowRight,
//   Rocket,
//   Brain,
//   Code,
//   Palette,
//   Heart,
//   Share2,
//   Eye,
//   Clock,
//   BookOpen
// } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Course } from '@/types/courses';
// import { Header } from '@/components/layout/header';
// import { Footer } from '@/components/layout/footer';
// import { CourseCard } from '@/components/courses/shared-course-card';

// interface CoursesPageProps {
//   searchParams: Promise<{
//     category?: string;
//     search?: string;
//     difficulty?: string;
//     content_type?: string;
//     price_range?: string;
//     min_rating?: string;
//     sort_by?: string;
//   }>;
// }

// // View Toggle Component
// function ViewToggle({ view, onViewChange }: { view: 'grid' | 'list'; onViewChange: (view: 'grid' | 'list') => void }) {
//   return (
//     <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
//       <Button
//         variant={view === 'grid' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('grid')}
//         className={`flex items-center gap-2 ${view === 'grid' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <Grid3X3 className="h-4 w-4" />
//         <span className="hidden sm:inline">Grid</span>
//       </Button>
//       <Button
//         variant={view === 'list' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('list')}
//         className={`flex items-center gap-2 ${view === 'list' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <List className="h-4 w-4" />
//         <span className="hidden sm:inline">List</span>
//       </Button>
//     </div>
//   );
// }

// // Animated Text Slider Component
// function TextSlider() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const slides = [
//     {
//       icon: <Code className="h-12 w-12 text-blue-400" />,
//       title: "Master Modern Tech",
//       description: "Learn cutting-edge technologies from industry experts",
//       gradient: "from-blue-500 to-cyan-500"
//     },
//     {
//       icon: <Brain className="h-12 w-12 text-purple-400" />,
//       title: "Boost Your Career",
//       description: "Gain skills that companies are hiring for right now",
//       gradient: "from-purple-500 to-pink-500"
//     },
//     {
//       icon: <Rocket className="h-12 w-12 text-orange-400" />,
//       title: "Learn at Light Speed",
//       description: "Accelerate your learning with project-based courses",
//       gradient: "from-orange-500 to-red-500"
//     },
//     {
//       icon: <Palette className="h-12 w-12 text-green-400" />,
//       title: "Unlock Creativity",
//       description: "Transform your ideas into reality with practical skills",
//       gradient: "from-green-500 to-teal-500"
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [slides.length]);

//   return (
//     <div className="relative h-48 md:h-56 lg:h-64 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm p-8 border border-white/20">
//       <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-xl"></div>
      
//       <div className="relative z-10 h-full flex items-center">
//         <div className="flex-1">
//           <div className="relative h-24 overflow-hidden">
//             {slides.map((slide, index) => (
//               <div
//                 key={index}
//                 className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
//                   index === currentSlide
//                     ? 'opacity-100 translate-x-0'
//                     : index < currentSlide
//                     ? 'opacity-0 -translate-x-full'
//                     : 'opacity-0 translate-x-full'
//                 }`}
//               >
//                 <div className="flex items-center space-x-6">
//                   <div className="flex-shrink-0">
//                     {slide.icon}
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
//                       {slide.title}
//                     </h3>
//                     <p className="text-blue-100 text-lg">
//                       {slide.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="absolute bottom-6 left-8 flex space-x-2 z-10">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             className={`w-2 h-2 rounded-full transition-all ${
//               index === currentSlide
//                 ? 'bg-white w-6'
//                 : 'bg-white/40'
//             }`}
//             onClick={() => setCurrentSlide(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // Enhanced Stats Cards for Dark Background
// function StatsCards({ stats }: { stats: { courses: number; categories: number; featured: number; skills: number } }) {
//   return (
//     <div className="grid grid-cols-2 gap-4">
//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-blue-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.courses}</div>
//             <div className="text-blue-200 text-sm">Courses</div>
//           </div>
//           <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <TrendingUp className="h-6 w-6 text-blue-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-green-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.categories}</div>
//             <div className="text-green-200 text-sm">Categories</div>
//           </div>
//           <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Users className="h-6 w-6 text-green-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-yellow-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.featured}</div>
//             <div className="text-yellow-200 text-sm">Featured</div>
//           </div>
//           <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Star className="h-6 w-6 text-yellow-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-purple-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.skills}</div>
//             <div className="text-purple-200 text-sm">Skills</div>
//           </div>
//           <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Zap className="h-6 w-6 text-purple-300" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Animated Gradient Background Component
// function AnimatedGradientBackground({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="relative w-full overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900">
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
//         <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1500"></div>
        
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
//       </div>
      
//       <div className="relative z-10">
//         {children}
//       </div>
//     </div>
//   );
// }

// // Helper function to convert Course type to compatible type for CourseCard
// const convertToCourseData = (course: Course) => {
//   return {
//     id: course.id,
//     slug: course.slug,
//     title: course.title,
//     thumbnail_url: course.thumbnail_url || undefined,
//     short_description: course.short_description || undefined,
//     category_name: course.category_name || undefined,
//     instructor_name: course.instructor_name || undefined,
//     instructor_image: course.instructor_image || undefined,
//     price_cents: course.price_cents || 0,
//     // FIX: Ensure average_rating is always a number and not undefined
//     average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
//     review_count: course.review_count || 0,
//     like_count: course.like_count || undefined,
//     share_count: course.share_count || undefined,
//     total_views: course.total_views || undefined,
//     enrolled_students_count: course.enrolled_students_count || undefined,
//     total_video_duration: course.total_video_duration || undefined,
//     total_lessons: course.total_lessons || undefined,
//     is_featured: course.is_featured || false,
//     is_trending: course.is_trending || false
//   };
// };

// // Helper function to check active filters
// function hasActiveFilters(filters: any): boolean {
//   return Object.keys(filters).some(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   });
// }

// // Helper function to count active filters
// function getActiveFilterCount(filters: any): number {
//   return Object.keys(filters).filter(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   }).length;
// }

// // Enhanced formatRating function that always returns a valid display value
// const formatRating = (rating: number | undefined | null, reviewCount: number | undefined | null) => {
//   // Ensure rating is a number, default to 0 if not
//   const numericRating = typeof rating === 'number' ? rating : 0;
  
//   // Ensure reviewCount is a number, default to 0 if not
//   const numericReviewCount = typeof reviewCount === 'number' ? reviewCount : 0;
  
//   // If rating is 0, show "No ratings" instead of hiding
//   if (numericRating === 0) {
//     return {
//       display: "No ratings yet",
//       value: 0,
//       hasReviews: false,
//       showRating: true // Always show, even if 0
//     };
//   }
  
//   // If rating exists and is > 0, format it
//   if (numericRating > 0) {
//     return {
//       display: `${numericRating.toFixed(1)}`,
//       value: numericRating,
//       hasReviews: numericReviewCount > 0,
//       showRating: true
//     };
//   }
  
//   // Fallback for any other case
//   return {
//     display: "No ratings yet",
//     value: 0,
//     hasReviews: false,
//     showRating: true
//   };
// };

// // Main Component
// export default function CoursesPage({ searchParams }: CoursesPageProps) {
//   const resolvedSearchParams = React.use(searchParams);
  
//   const [initialCourses, setInitialCourses] = useState<Course[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [availableTags, setAvailableTags] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [view, setView] = useState<'grid' | 'list'>('grid');

//   const {
//     courses,
//     loading,
//     error,
//     filters,
//     pagination,
//     updateFilters,
//     resetFilters,
//     loadMore
//   } = useCourseSearch(initialCourses);

//   useEffect(() => {
//     async function fetchInitialData() {
//       try {
//         setIsLoading(true);
        
//         const [coursesResult, categoriesResult, tagsResult] = await Promise.all([
//           getCoursesAction({
//             is_published: true,
//             category_slug: resolvedSearchParams.category,
//             limit: 100,
//             include_reviews: true
//           }),
//           getCategoriesAction(),
//           getTagsAction()
//         ]);

//         const coursesData = coursesResult.courses || [];
        
//         // IMPORTANT: Debug what's coming from API
//         console.log('=== DEBUG: API Response ===');
//         console.log('Total courses:', coursesData.length);

//         coursesData.forEach((course: any, index: number) => {
//           console.log(`\n${index + 1}. ${course.title}`);
//           console.log('   average_rating:', course.average_rating);
//           console.log('   review_count:', course.review_count);
//           console.log('   Type of average_rating:', typeof course.average_rating);
          
//           // Test the enhanced formatRating function
//           const testRating = course.average_rating;
//           const testReviewCount = course.review_count;
//           const formatted = formatRating(testRating, testReviewCount);
//           console.log('   Formatted rating display:', formatted.display);
//           console.log('   Should show rating?', formatted.showRating);
//         });

//         // FIX: Ensure all courses have valid average_rating values
//         const coursesWithValidRatings = coursesData.map((course: any) => ({
//           ...course,
//           average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
//           review_count: course.review_count || 0
//         }));

//         setInitialCourses(coursesWithValidRatings);
//         setCategories(categoriesResult.categories || []);
//         setAvailableTags(tagsResult.tags || []);
        
//       } catch (error) {
//         console.error('Error fetching initial data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchInitialData();
//   }, [resolvedSearchParams.category]);

//   useEffect(() => {
//     const urlFilters = {
//       searchQuery: resolvedSearchParams.search || '',
//       category_slug: resolvedSearchParams.category || '',
//       difficulty: resolvedSearchParams.difficulty || '',
//       content_type: resolvedSearchParams.content_type || '',
//       price_range: resolvedSearchParams.price_range || '',
//       min_rating: parseFloat(resolvedSearchParams.min_rating || '0'),
//       sort_by: resolvedSearchParams.sort_by || 'relevance'
//     };
    
//     if (Object.values(urlFilters).some(value => value !== '' && value !== 0)) {
//       updateFilters(urlFilters);
//       setSearchQuery(urlFilters.searchQuery);
//     }
//   }, [resolvedSearchParams]);

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     updateFilters({ searchQuery: searchQuery });
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       updateFilters({ searchQuery: searchQuery });
//     }
//   };

//   // Calculate stats
//   const totalCourses = pagination.total;
//   const totalCategories = categories.length;
//   const totalTags = availableTags.length;
//   const featuredCourses = courses.filter(course => course.is_featured).length;

//   const stats = {
//     courses: totalCourses,
//     categories: totalCategories,
//     featured: featuredCourses,
//     skills: totalTags
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="container mx-auto px-4 py-8">
//           <div className="max-w-7xl mx-auto text-center py-20">
//             <div className="relative inline-block">
//               <Loader2 className="h-12 w-12 animate-spin mx-auto mb-6 text-blue-600" />
//               <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
//             </div>
//             <p className="text-gray-600 text-lg font-medium">Loading amazing courses...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
      
//       {/* Hero Section */}
//       <AnimatedGradientBackground>
//         <div className="w-full px-4 py-16">
//           <div className="w-full mx-auto">
//             <div className="mb-12">
//               <div className="text-center mb-8">
//                 <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
//                   Explore Courses
//                 </h1>
//                 <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
//                   Discover your next learning adventure in our comprehensive learning platform
//                 </p>
//               </div>

//               <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
//                 <div className="lg:col-span-1">
//                   <TextSlider />
//                 </div>

//                 <div className="lg:col-span-1">
//                   <StatsCards stats={stats} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </AnimatedGradientBackground>

//       {/* Search Bar */}
//       <div className="w-full bg-white border-b border-gray-200 py-8 px-4">
//         <div className="w-full max-w-7xl mx-auto">
//           <div className="text-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Course</h2>
//             <p className="text-gray-600">Search from thousands of courses with detailed ratings and reviews</p>
//           </div>
          
//           <form onSubmit={handleSearchSubmit} className="relative max-w-4xl mx-auto">
//             <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
//             <Input
//               type="text"
//               placeholder="Search courses by title, instructor, or technology... (Press Enter to search)"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="w-full pl-16 pr-6 py-6 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition text-gray-900 placeholder-gray-500 shadow-lg hover:shadow-xl"
//             />
//             <Button 
//               type="submit"
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-5 rounded-xl font-semibold"
//             >
//               Search
//             </Button>
//           </form>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="w-full bg-gray-50 min-h-screen">
//         <div className="w-full px-4 py-8">
//           <div className="w-full mx-auto">
//             {/* Mobile Filter Toggle */}
//             <div className="lg:hidden mb-6">
//               <Button
//                 onClick={() => setShowFilters(!showFilters)}
//                 variant="outline"
//                 className="w-full flex items-center justify-center gap-2 py-3 text-lg"
//               >
//                 <Filter size={20} />
//                 {showFilters ? 'Hide Filters' : 'Show Filters'}
//                 {hasActiveFilters(filters) && (
//                   <Badge variant="secondary" className="ml-2">
//                     {getActiveFilterCount(filters)}
//                   </Badge>
//                 )}
//               </Button>
//             </div>

//             {/* Full Width Grid Layout */}
//             <div className="w-full">
//               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//                 {/* Sidebar Filters */}
//                 <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:col-span-3 space-y-6`}>
//                   {/* Categories Card */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Sparkles className="h-5 w-5 text-blue-600" />
//                         Categories
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-0">
//                       <div className="max-h-96 overflow-y-auto">
//                         <CategoryNavigation 
//                           showCourseCounts={true}
//                           className="p-4"
//                           currentCategory={filters.category_slug}
//                         />
//                       </div>
//                     </CardContent>
//                   </Card>

//                   {/* Advanced Filters */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Filter className="h-5 w-5 text-purple-600" />
//                         Advanced Filters
//                       </CardTitle>
//                       <CardDescription>
//                         Filter by rating, social metrics, and more
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <CourseFilters
//                         filters={filters}
//                         onFiltersChange={updateFilters}
//                         onReset={resetFilters}
//                         availableTags={availableTags}
//                       />
//                     </CardContent>
//                   </Card>

//                   {/* Social Metrics Info */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Heart className="h-5 w-5 text-green-600" />
//                         Social Engagement
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <div className="space-y-3">
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                             <span>Rating & Reviews</span>
//                           </div>
//                           <Badge variant="outline" className="text-xs">
//                             Real user feedback
//                           </Badge>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Heart className="h-4 w-4 text-red-500 fill-red-500" />
//                             <span>Likes</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Course popularity</span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Share2 className="h-4 w-4 text-blue-500" />
//                             <span>Shares</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Social sharing</span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Eye className="h-4 w-4 text-purple-500" />
//                             <span>Views</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Course visibility</span>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>

//                 {/* Main Courses Area */}
//                 <div className="lg:col-span-9">
//                   {/* Results Header */}
//                   <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
//                     <div className="flex-1">
//                       <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent mb-2">
//                         {filters.category_slug ? (
//                           <>
//                             <Sparkles className="h-6 w-6 text-blue-600 inline mr-2" />
//                             {categories.find(cat => cat.slug === filters.category_slug)?.name}
//                           </>
//                         ) : filters.searchQuery ? (
//                           <>Search: "{filters.searchQuery}"</>
//                         ) : (
//                           <>All Courses</>
//                         )}
//                       </h2>
//                       <p className="text-gray-600 flex items-center gap-2">
//                         {loading ? (
//                           <>
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                             Discovering courses...
//                           </>
//                         ) : (
//                           <>
//                             <span className="font-semibold text-gray-900">{courses.length}</span>
//                             {courses.length === 1 ? ' course' : ' courses'} found
//                             {hasActiveFilters(filters) && (
//                               <span className="text-blue-600 ml-2">• Filtered</span>
//                             )}
//                           </>
//                         )}
//                       </p>
//                     </div>

//                     <div className="flex items-center gap-4">
//                       <ViewToggle view={view} onViewChange={setView} />
                      
//                       {hasActiveFilters(filters) && (
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={resetFilters}
//                           className="rounded-lg border-gray-300 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
//                         >
//                           Clear All
//                         </Button>
//                       )}
//                     </div>
//                   </div>

//                   {/* Error State */}
//                   {error && (
//                     <Card className="mb-6 border-red-200 bg-red-50 rounded-2xl overflow-hidden">
//                       <CardContent className="p-6">
//                         <div className="flex items-center gap-3">
//                           <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
//                           <p className="text-red-700 font-medium">Error: {error}</p>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   )}

//                   {/* Loading State */}
//                   {loading && courses.length === 0 && (
//                     <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
//                       <div className="relative inline-block mb-4">
//                         <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
//                         <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
//                       </div>
//                       <p className="text-gray-600 text-lg font-medium">Loading courses...</p>
//                     </div>
//                   )}

//                   {/* Courses Grid/List */}
//                   {courses.length > 0 ? (
//                     <>
//                       {view === 'grid' ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                           {courses.map((course) => {
//                             // FIX: Ensure course has valid rating data before passing to CourseCard
//                             const enhancedCourse = {
//                               ...convertToCourseData(course),
//                               // Double-check that average_rating is always a valid number
//                               average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
//                               review_count: course.review_count || 0
//                             };
                            
//                             return (
//                               <CourseCard 
//                                 key={course.id} 
//                                 course={enhancedCourse} 
//                                 variant="grid" 
//                               />
//                             );
//                           })}
//                         </div>
//                       ) : (
//                         <div className="space-y-4">
//                           {courses.map((course) => {
//                             // FIX: Ensure course has valid rating data before passing to CourseCard
//                             const enhancedCourse = {
//                               ...convertToCourseData(course),
//                               // Double-check that average_rating is always a valid number
//                               average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
//                               review_count: course.review_count || 0
//                             };
                            
//                             return (
//                               <CourseCard 
//                                 key={course.id} 
//                                 course={enhancedCourse} 
//                                 variant="list" 
//                               />
//                             );
//                           })}
//                         </div>
//                       )}

//                       {/* Load More Button */}
//                       {pagination.hasMore && (
//                         <div className="text-center mt-12">
//                           <Button
//                             onClick={loadMore}
//                             disabled={loading}
//                             className="min-w-48 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-0 px-8 py-3 font-semibold"
//                           >
//                             {loading ? (
//                               <>
//                                 <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                                 Loading More...
//                               </>
//                             ) : (
//                               <>
//                                 <Rocket className="h-4 w-4 mr-2" />
//                                 Load More Courses
//                               </>
//                             )}
//                           </Button>
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     /* No Results */
//                     <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
//                       <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <Search className="h-10 w-10 text-gray-400" />
//                       </div>
//                       <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
//                       <p className="text-gray-600 max-w-md mx-auto mb-6">
//                         {filters.searchQuery || hasActiveFilters(filters)
//                           ? "Try adjusting your search criteria or browse all courses."
//                           : "No courses available at the moment. Check back soon!"}
//                       </p>
//                       {(filters.searchQuery || hasActiveFilters(filters)) && (
//                         <Button
//                           onClick={resetFilters}
//                           variant="outline"
//                           className="rounded-lg"
//                         >
//                           Reset Filters
//                         </Button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }



























// // /app/courses/page.tsx

// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { getCoursesAction } from '@/lib/courses/actions';
// import { getCategoriesAction } from '@/lib/categories/actions';
// import { getTagsAction } from '@/lib/tags/actions';
// import { CategoryNavigation } from '@/components/categories/category-navigation';
// import { CourseFilters } from '@/components/courses/course-filters';
// import { useCourseSearch } from '@/hooks/use-course-search';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Search, 
//   Filter, 
//   Loader2, 
//   Sparkles, 
//   TrendingUp, 
//   Users, 
//   Star, 
//   Zap,
//   Grid3X3,
//   List,
//   Play,
//   ArrowRight,
//   Rocket,
//   Brain,
//   Code,
//   Palette,
//   Heart,
//   Share2,
//   Eye,
//   Clock,
//   BookOpen
// } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Course } from '@/types/courses';
// import { Header } from '@/components/layout/header';
// import { Footer } from '@/components/layout/footer';
// import { CourseCard } from '@/components/courses/shared-course-card';

// interface CoursesPageProps {
//   searchParams: Promise<{
//     category?: string;
//     search?: string;
//     difficulty?: string;
//     content_type?: string;
//     price_range?: string;
//     min_rating?: string;
//     sort_by?: string;
//   }>;
// }

// // View Toggle Component
// function ViewToggle({ view, onViewChange }: { view: 'grid' | 'list'; onViewChange: (view: 'grid' | 'list') => void }) {
//   return (
//     <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
//       <Button
//         variant={view === 'grid' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('grid')}
//         className={`flex items-center gap-2 ${view === 'grid' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <Grid3X3 className="h-4 w-4" />
//         <span className="hidden sm:inline">Grid</span>
//       </Button>
//       <Button
//         variant={view === 'list' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('list')}
//         className={`flex items-center gap-2 ${view === 'list' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <List className="h-4 w-4" />
//         <span className="hidden sm:inline">List</span>
//       </Button>
//     </div>
//   );
// }

// // Animated Text Slider Component
// function TextSlider() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const slides = [
//     {
//       icon: <Code className="h-12 w-12 text-blue-400" />,
//       title: "Master Modern Tech",
//       description: "Learn cutting-edge technologies from industry experts",
//       gradient: "from-blue-500 to-cyan-500"
//     },
//     {
//       icon: <Brain className="h-12 w-12 text-purple-400" />,
//       title: "Boost Your Career",
//       description: "Gain skills that companies are hiring for right now",
//       gradient: "from-purple-500 to-pink-500"
//     },
//     {
//       icon: <Rocket className="h-12 w-12 text-orange-400" />,
//       title: "Learn at Light Speed",
//       description: "Accelerate your learning with project-based courses",
//       gradient: "from-orange-500 to-red-500"
//     },
//     {
//       icon: <Palette className="h-12 w-12 text-green-400" />,
//       title: "Unlock Creativity",
//       description: "Transform your ideas into reality with practical skills",
//       gradient: "from-green-500 to-teal-500"
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [slides.length]);

//   return (
//     <div className="relative h-48 md:h-56 lg:h-64 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm p-8 border border-white/20">
//       <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-xl"></div>
      
//       <div className="relative z-10 h-full flex items-center">
//         <div className="flex-1">
//           <div className="relative h-24 overflow-hidden">
//             {slides.map((slide, index) => (
//               <div
//                 key={index}
//                 className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
//                   index === currentSlide
//                     ? 'opacity-100 translate-x-0'
//                     : index < currentSlide
//                     ? 'opacity-0 -translate-x-full'
//                     : 'opacity-0 translate-x-full'
//                 }`}
//               >
//                 <div className="flex items-center space-x-6">
//                   <div className="flex-shrink-0">
//                     {slide.icon}
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
//                       {slide.title}
//                     </h3>
//                     <p className="text-blue-100 text-lg">
//                       {slide.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="absolute bottom-6 left-8 flex space-x-2 z-10">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             className={`w-2 h-2 rounded-full transition-all ${
//               index === currentSlide
//                 ? 'bg-white w-6'
//                 : 'bg-white/40'
//             }`}
//             onClick={() => setCurrentSlide(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // Enhanced Stats Cards for Dark Background
// function StatsCards({ stats }: { stats: { courses: number; categories: number; featured: number; skills: number } }) {
//   return (
//     <div className="grid grid-cols-2 gap-4">
//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-blue-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.courses}</div>
//             <div className="text-blue-200 text-sm">Courses</div>
//           </div>
//           <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <TrendingUp className="h-6 w-6 text-blue-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-green-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.categories}</div>
//             <div className="text-green-200 text-sm">Categories</div>
//           </div>
//           <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Users className="h-6 w-6 text-green-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-yellow-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.featured}</div>
//             <div className="text-yellow-200 text-sm">Featured</div>
//           </div>
//           <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Star className="h-6 w-6 text-yellow-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-purple-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.skills}</div>
//             <div className="text-purple-200 text-sm">Skills</div>
//           </div>
//           <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Zap className="h-6 w-6 text-purple-300" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Animated Gradient Background Component
// function AnimatedGradientBackground({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="relative w-full overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900">
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
//         <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1500"></div>
        
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
//       </div>
      
//       <div className="relative z-10">
//         {children}
//       </div>
//     </div>
//   );
// }

// // Helper function to convert Course type to compatible type for CourseCard
// const convertToCourseData = (course: Course) => {
//   return {
//     id: course.id,
//     slug: course.slug,
//     title: course.title,
//     thumbnail_url: course.thumbnail_url || undefined,
//     short_description: course.short_description || undefined,
//     category_name: course.category_name || undefined,
//     instructor_name: course.instructor_name || undefined,
//     instructor_image: course.instructor_image || undefined,
//     price_cents: course.price_cents || 0,
//     // FIX: Ensure average_rating is always a number and not undefined
//     average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
//     review_count: course.review_count || 0,
//     like_count: course.like_count || undefined,
//     share_count: course.share_count || undefined,
//     total_views: course.total_views || undefined,
//     enrolled_students_count: course.enrolled_students_count || undefined,
//     total_video_duration: course.total_video_duration || undefined,
//     total_lessons: course.total_lessons || undefined,
//     is_featured: course.is_featured || false,
//     is_trending: course.is_trending || false
//   };
// };

// // Helper function to check active filters
// function hasActiveFilters(filters: any): boolean {
//   return Object.keys(filters).some(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   });
// }

// // Helper function to count active filters
// function getActiveFilterCount(filters: any): number {
//   return Object.keys(filters).filter(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   }).length;
// }

// // Enhanced formatRating function that always returns a valid display value
// const formatRating = (rating: number | undefined | null, reviewCount: number | undefined | null) => {
//   // Ensure rating is a number, default to 0 if not
//   const numericRating = typeof rating === 'number' ? rating : 0;
  
//   // Ensure reviewCount is a number, default to 0 if not
//   const numericReviewCount = typeof reviewCount === 'number' ? reviewCount : 0;
  
//   // If rating is 0, show "No ratings" instead of hiding
//   if (numericRating === 0) {
//     return {
//       display: "No ratings yet",
//       value: 0,
//       hasReviews: false,
//       showRating: true // Always show, even if 0
//     };
//   }
  
//   // If rating exists and is > 0, format it
//   if (numericRating > 0) {
//     return {
//       display: `${numericRating.toFixed(1)}`,
//       value: numericRating,
//       hasReviews: numericReviewCount > 0,
//       showRating: true
//     };
//   }
  
//   // Fallback for any other case
//   return {
//     display: "No ratings yet",
//     value: 0,
//     hasReviews: false,
//     showRating: true
//   };
// };

// // Client-side filtering function
// const filterCourses = (
//   courses: Course[],
//   filters: {
//     searchQuery: string;
//     category_slug: string;
//     difficulty: string;
//     content_type: string;
//     price_range: string;
//     min_rating: number;
//     tags: string[];
//     is_featured: boolean;
//     is_trending: boolean;
//     sort_by: string;
//   }
// ): Course[] => {
//   let filtered = [...courses];
  
//   // Search by title or description
//   if (filters.searchQuery) {
//     const query = filters.searchQuery.toLowerCase();
//     filtered = filtered.filter(course => 
//       course.title.toLowerCase().includes(query) ||
//       (course.short_description || '').toLowerCase().includes(query) ||
//       (course.category_name || '').toLowerCase().includes(query) ||
//       (course.instructor_name || '').toLowerCase().includes(query)
//     );
//   }
  
//   // Filter by category
//   if (filters.category_slug) {
//     filtered = filtered.filter(course => 
//       course.category_slug === filters.category_slug
//     );
//   }
  
//   // Filter by minimum rating
//   if (filters.min_rating > 0) {
//     filtered = filtered.filter(course => 
//       (course.average_rating || 0) >= filters.min_rating
//     );
//   }
  
//   // Filter by difficulty
//   if (filters.difficulty) {
//     filtered = filtered.filter(course => 
//       course.difficulty === filters.difficulty
//     );
//   }
  
//   // Filter by content type
//   if (filters.content_type) {
//     filtered = filtered.filter(course => 
//       course.content_type === filters.content_type
//     );
//   }
  
//   // Filter by price range
//   if (filters.price_range) {
//     const [min, max] = filters.price_range.split('-').map(Number);
//     filtered = filtered.filter(course => {
//       const price = (course.price_cents || 0) / 100;
//       if (max === 0) return price === 0; // Free
//       if (max === 100) return price > 0 && price <= 100; // $0-$100
//       if (max === 500) return price > 100 && price <= 500; // $100-$500
//       return price > 500; // $500+
//     });
//   }
  
//   // Filter by featured/trending
//   if (filters.is_featured) {
//     filtered = filtered.filter(course => course.is_featured);
//   }
  
//   if (filters.is_trending) {
//     filtered = filtered.filter(course => course.is_trending);
//   }
  
//   // Filter by tags
//   if (filters.tags.length > 0) {
//     filtered = filtered.filter(course => {
//       const courseTags = course.tags || [];
//       return filters.tags.every(tag => courseTags.includes(tag));
//     });
//   }
  
//   // Sort courses
//   if (filters.sort_by === 'rating') {
//     filtered.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));
//   } else if (filters.sort_by === 'price_low') {
//     filtered.sort((a, b) => (a.price_cents || 0) - (b.price_cents || 0));
//   } else if (filters.sort_by === 'price_high') {
//     filtered.sort((a, b) => (b.price_cents || 0) - (a.price_cents || 0));
//   } else if (filters.sort_by === 'newest') {
//     filtered.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
//   } else if (filters.sort_by === 'popular') {
//     filtered.sort((a, b) => (b.enrolled_students_count || 0) - (a.enrolled_students_count || 0));
//   }
  
//   return filtered;
// };

// // Main Component
// export default function CoursesPage({ searchParams }: CoursesPageProps) {
//   const resolvedSearchParams = React.use(searchParams);
  
//   const [initialCourses, setInitialCourses] = useState<Course[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [availableTags, setAvailableTags] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [view, setView] = useState<'grid' | 'list'>('grid');
  
//   // 🔥 EMERGENCY FIX: Use empty array and handle filtering locally
//   const {
//     courses: filteredCoursesFromHook,
//     loading,
//     error,
//     filters,
//     pagination: hookPagination,
//     updateFilters,
//     resetFilters,
//     loadMore
//   } = useCourseSearch([]); // Pass empty array to prevent API overwrite

//   // 🔥 LOCAL STATE for courses (filtered from initialCourses)
//   const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
//   const [localPagination, setLocalPagination] = useState({
//     total: 0,
//     limit: 12,
//     offset: 0,
//     hasMore: false
//   });

//   // Fetch initial data
//   useEffect(() => {
//     async function fetchInitialData() {
//       try {
//         setIsLoading(true);
        
//         const [coursesResult, categoriesResult, tagsResult] = await Promise.all([
//           getCoursesAction({
//             is_published: true,
//             category_slug: resolvedSearchParams.category,
//             limit: 100,
//             include_reviews: true
//           }),
//           getCategoriesAction(),
//           getTagsAction()
//         ]);

//         const coursesData = coursesResult.courses || [];
        
//         // IMPORTANT: Debug what's coming from API
//         console.log('=== DEBUG: Initial API Response ===');
//         console.log('Total courses:', coursesData.length);

//         coursesData.forEach((course: any, index: number) => {
//           console.log(`\n${index + 1}. ${course.title}`);
//           console.log('   average_rating:', course.average_rating);
//           console.log('   review_count:', course.review_count);
//           console.log('   Type of average_rating:', typeof course.average_rating);
//         });

//         // FIX: Ensure all courses have valid average_rating values
//         const coursesWithValidRatings = coursesData.map((course: any) => ({
//           ...course,
//           average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
//           review_count: course.review_count || 0
//         }));

//         setInitialCourses(coursesWithValidRatings);
//         setCategories(categoriesResult.categories || []);
//         setAvailableTags(tagsResult.tags || []);
        
//         // Set initial filtered courses
//         setFilteredCourses(coursesWithValidRatings);
//         setLocalPagination({
//           total: coursesWithValidRatings.length,
//           limit: 12,
//           offset: 0,
//           hasMore: coursesWithValidRatings.length > 12
//         });
        
//       } catch (error) {
//         console.error('Error fetching initial data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchInitialData();
//   }, [resolvedSearchParams.category]);

//   // 🔥 EMERGENCY FIX: Apply filters locally
//   useEffect(() => {
//     if (initialCourses.length > 0) {
//       console.log('🔍 Applying filters locally:', filters);
      
//       // Apply all filters
//       const filtered = filterCourses(initialCourses, filters);
      
//       console.log('✅ Filtered courses:', filtered.length);
//       console.log('📊 First filtered course rating:', filtered[0]?.average_rating);
      
//       // Apply pagination
//       const paginated = filtered.slice(
//         localPagination.offset,
//         localPagination.offset + localPagination.limit
//       );
      
//       setFilteredCourses(paginated);
//       setLocalPagination(prev => ({
//         ...prev,
//         total: filtered.length,
//         hasMore: filtered.length > prev.offset + prev.limit
//       }));
//     }
//   }, [filters, initialCourses, localPagination.offset]);

//   // Initialize with URL params
//   useEffect(() => {
//     const urlFilters = {
//       searchQuery: resolvedSearchParams.search || '',
//       category_slug: resolvedSearchParams.category || '',
//       difficulty: resolvedSearchParams.difficulty || '',
//       content_type: resolvedSearchParams.content_type || '',
//       price_range: resolvedSearchParams.price_range || '',
//       min_rating: parseFloat(resolvedSearchParams.min_rating || '0'),
//       language: '',
//       tags: [],
//       is_featured: false,
//       is_trending: false,
//       sort_by: resolvedSearchParams.sort_by || 'relevance'
//     };
    
//     if (Object.values(urlFilters).some(value => value !== '' && value !== 0)) {
//       updateFilters(urlFilters);
//       setSearchQuery(urlFilters.searchQuery);
//     }
//   }, [resolvedSearchParams]);

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     updateFilters({ searchQuery: searchQuery });
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       updateFilters({ searchQuery: searchQuery });
//     }
//   };

//   const handleLoadMore = () => {
//     setLocalPagination(prev => {
//       const newOffset = prev.offset + prev.limit;
//       return {
//         ...prev,
//         offset: newOffset,
//         hasMore: prev.total > newOffset
//       };
//     });
//   };

//   // Calculate stats from initial courses
//   const totalCourses = initialCourses.length;
//   const totalCategories = categories.length;
//   const totalTags = availableTags.length;
//   const featuredCourses = initialCourses.filter(course => course.is_featured).length;

//   const stats = {
//     courses: totalCourses,
//     categories: totalCategories,
//     featured: featuredCourses,
//     skills: totalTags
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="container mx-auto px-4 py-8">
//           <div className="max-w-7xl mx-auto text-center py-20">
//             <div className="relative inline-block">
//               <Loader2 className="h-12 w-12 animate-spin mx-auto mb-6 text-blue-600" />
//               <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
//             </div>
//             <p className="text-gray-600 text-lg font-medium">Loading amazing courses...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
      
//       {/* Hero Section */}
//       <AnimatedGradientBackground>
//         <div className="w-full px-4 py-16">
//           <div className="w-full mx-auto">
//             <div className="mb-12">
//               <div className="text-center mb-8">
//                 <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
//                   Explore Courses
//                 </h1>
//                 <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
//                   Discover your next learning adventure in our comprehensive learning platform
//                 </p>
//               </div>

//               <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
//                 <div className="lg:col-span-1">
//                   <TextSlider />
//                 </div>

//                 <div className="lg:col-span-1">
//                   <StatsCards stats={stats} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </AnimatedGradientBackground>

//       {/* Search Bar */}
//       <div className="w-full bg-white border-b border-gray-200 py-8 px-4">
//         <div className="w-full max-w-7xl mx-auto">
//           <div className="text-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Course</h2>
//             <p className="text-gray-600">Search from thousands of courses with detailed ratings and reviews</p>
//           </div>
          
//           <form onSubmit={handleSearchSubmit} className="relative max-w-4xl mx-auto">
//             <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
//             <Input
//               type="text"
//               placeholder="Search courses by title, instructor, or technology... (Press Enter to search)"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="w-full pl-16 pr-6 py-6 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition text-gray-900 placeholder-gray-500 shadow-lg hover:shadow-xl"
//             />
//             <Button 
//               type="submit"
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-5 rounded-xl font-semibold"
//             >
//               Search
//             </Button>
//           </form>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="w-full bg-gray-50 min-h-screen">
//         <div className="w-full px-4 py-8">
//           <div className="w-full mx-auto">
//             {/* Mobile Filter Toggle */}
//             <div className="lg:hidden mb-6">
//               <Button
//                 onClick={() => setShowFilters(!showFilters)}
//                 variant="outline"
//                 className="w-full flex items-center justify-center gap-2 py-3 text-lg"
//               >
//                 <Filter size={20} />
//                 {showFilters ? 'Hide Filters' : 'Show Filters'}
//                 {hasActiveFilters(filters) && (
//                   <Badge variant="secondary" className="ml-2">
//                     {getActiveFilterCount(filters)}
//                   </Badge>
//                 )}
//               </Button>
//             </div>

//             {/* Full Width Grid Layout */}
//             <div className="w-full">
//               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//                 {/* Sidebar Filters */}
//                 <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:col-span-3 space-y-6`}>
//                   {/* Categories Card */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Sparkles className="h-5 w-5 text-blue-600" />
//                         Categories
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-0">
//                       <div className="max-h-96 overflow-y-auto">
//                         <CategoryNavigation 
//                           showCourseCounts={true}
//                           className="p-4"
//                           currentCategory={filters.category_slug}
//                         />
//                       </div>
//                     </CardContent>
//                   </Card>

//                   {/* Advanced Filters */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Filter className="h-5 w-5 text-purple-600" />
//                         Advanced Filters
//                       </CardTitle>
//                       <CardDescription>
//                         Filter by rating, social metrics, and more
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <CourseFilters
//                         filters={filters}
//                         onFiltersChange={updateFilters}
//                         onReset={resetFilters}
//                         availableTags={availableTags}
//                       />
//                     </CardContent>
//                   </Card>

//                   {/* Social Metrics Info */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Heart className="h-5 w-5 text-green-600" />
//                         Social Engagement
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <div className="space-y-3">
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                             <span>Rating & Reviews</span>
//                           </div>
//                           <Badge variant="outline" className="text-xs">
//                             Real user feedback
//                           </Badge>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Heart className="h-4 w-4 text-red-500 fill-red-500" />
//                             <span>Likes</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Course popularity</span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Share2 className="h-4 w-4 text-blue-500" />
//                             <span>Shares</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Social sharing</span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Eye className="h-4 w-4 text-purple-500" />
//                             <span>Views</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Course visibility</span>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>

//                 {/* Main Courses Area */}
//                 <div className="lg:col-span-9">
//                   {/* Results Header */}
//                   <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
//                     <div className="flex-1">
//                       <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent mb-2">
//                         {filters.category_slug ? (
//                           <>
//                             <Sparkles className="h-6 w-6 text-blue-600 inline mr-2" />
//                             {categories.find(cat => cat.slug === filters.category_slug)?.name}
//                           </>
//                         ) : filters.searchQuery ? (
//                           <>Search: "{filters.searchQuery}"</>
//                         ) : (
//                           <>All Courses</>
//                         )}
//                       </h2>
//                       <p className="text-gray-600 flex items-center gap-2">
//                         {loading ? (
//                           <>
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                             Discovering courses...
//                           </>
//                         ) : (
//                           <>
//                             <span className="font-semibold text-gray-900">{filteredCourses.length}</span>
//                             {filteredCourses.length === 1 ? ' course' : ' courses'} found
//                             {hasActiveFilters(filters) && (
//                               <span className="text-blue-600 ml-2">• Filtered</span>
//                             )}
//                           </>
//                         )}
//                       </p>
//                     </div>

//                     <div className="flex items-center gap-4">
//                       <ViewToggle view={view} onViewChange={setView} />
                      
//                       {hasActiveFilters(filters) && (
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={resetFilters}
//                           className="rounded-lg border-gray-300 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
//                         >
//                           Clear All
//                         </Button>
//                       )}
//                     </div>
//                   </div>

//                   {/* Error State */}
//                   {error && (
//                     <Card className="mb-6 border-red-200 bg-red-50 rounded-2xl overflow-hidden">
//                       <CardContent className="p-6">
//                         <div className="flex items-center gap-3">
//                           <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
//                           <p className="text-red-700 font-medium">Error: {error}</p>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   )}

//                   {/* Loading State */}
//                   {isLoading && filteredCourses.length === 0 && (
//                     <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
//                       <div className="relative inline-block mb-4">
//                         <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
//                         <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
//                       </div>
//                       <p className="text-gray-600 text-lg font-medium">Loading courses...</p>
//                     </div>
//                   )}

//                   {/* Courses Grid/List */}
//                   {filteredCourses.length > 0 ? (
//                     <>
//                       {view === 'grid' ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                           {filteredCourses.map((course) => {
//                             // FIX: Ensure course has valid rating data before passing to CourseCard
//                             const enhancedCourse = {
//                               ...convertToCourseData(course),
//                               // Double-check that average_rating is always a valid number
//                               average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
//                               review_count: course.review_count || 0
//                             };
                            
//                             // Debug log for each course
//                             console.log(`🎯 Rendering: ${course.title}`, {
//                               rating: enhancedCourse.average_rating,
//                               reviews: enhancedCourse.review_count
//                             });
                            
//                             return (
//                               <CourseCard 
//                                 key={course.id} 
//                                 course={enhancedCourse} 
//                                 variant="grid" 
//                               />
//                             );
//                           })}
//                         </div>
//                       ) : (
//                         <div className="space-y-4">
//                           {filteredCourses.map((course) => {
//                             // FIX: Ensure course has valid rating data before passing to CourseCard
//                             const enhancedCourse = {
//                               ...convertToCourseData(course),
//                               // Double-check that average_rating is always a valid number
//                               average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
//                               review_count: course.review_count || 0
//                             };
                            
//                             return (
//                               <CourseCard 
//                                 key={course.id} 
//                                 course={enhancedCourse} 
//                                 variant="list" 
//                               />
//                             );
//                           })}
//                         </div>
//                       )}

//                       {/* Load More Button */}
//                       {localPagination.hasMore && (
//                         <div className="text-center mt-12">
//                           <Button
//                             onClick={handleLoadMore}
//                             disabled={loading}
//                             className="min-w-48 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-0 px-8 py-3 font-semibold"
//                           >
//                             {loading ? (
//                               <>
//                                 <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                                 Loading More...
//                               </>
//                             ) : (
//                               <>
//                                 <Rocket className="h-4 w-4 mr-2" />
//                                 Load More Courses
//                               </>
//                             )}
//                           </Button>
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     /* No Results */
//                     <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
//                       <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <Search className="h-10 w-10 text-gray-400" />
//                       </div>
//                       <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
//                       <p className="text-gray-600 max-w-md mx-auto mb-6">
//                         {filters.searchQuery || hasActiveFilters(filters)
//                           ? "Try adjusting your search criteria or browse all courses."
//                           : "No courses available at the moment. Check back soon!"}
//                       </p>
//                       {(filters.searchQuery || hasActiveFilters(filters)) && (
//                         <Button
//                           onClick={resetFilters}
//                           variant="outline"
//                           className="rounded-lg"
//                         >
//                           Reset Filters
//                         </Button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }


























// // /app/courses/page.tsx

// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { getCoursesAction } from '@/lib/courses/actions';
// import { getCategoriesAction } from '@/lib/categories/actions';
// import { getTagsAction } from '@/lib/tags/actions';
// import { CategoryNavigation } from '@/components/categories/category-navigation';
// import { CourseFilters } from '@/components/courses/course-filters';
// import { useCourseSearch } from '@/hooks/use-course-search';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Search, 
//   Filter, 
//   Loader2, 
//   Sparkles, 
//   TrendingUp, 
//   Users, 
//   Star, 
//   Zap,
//   Grid3X3,
//   List,
//   Play,
//   ArrowRight,
//   Rocket,
//   Brain,
//   Code,
//   Palette,
//   Heart,
//   Share2,
//   Eye,
//   Clock,
//   BookOpen
// } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Course } from '@/types/courses';
// import { Header } from '@/components/layout/header';
// import { Footer } from '@/components/layout/footer';
// import { CourseCard } from '@/components/courses/shared-course-card';

// interface CoursesPageProps {
//   searchParams: Promise<{
//     category?: string;
//     search?: string;
//     difficulty?: string;
//     content_type?: string;
//     price_range?: string;
//     min_rating?: string;
//     sort_by?: string;
//   }>;
// }

// // View Toggle Component
// function ViewToggle({ view, onViewChange }: { view: 'grid' | 'list'; onViewChange: (view: 'grid' | 'list') => void }) {
//   return (
//     <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
//       <Button
//         variant={view === 'grid' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('grid')}
//         className={`flex items-center gap-2 ${view === 'grid' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <Grid3X3 className="h-4 w-4" />
//         <span className="hidden sm:inline">Grid</span>
//       </Button>
//       <Button
//         variant={view === 'list' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('list')}
//         className={`flex items-center gap-2 ${view === 'list' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <List className="h-4 w-4" />
//         <span className="hidden sm:inline">List</span>
//       </Button>
//     </div>
//   );
// }

// // Animated Text Slider Component
// function TextSlider() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const slides = [
//     {
//       icon: <Code className="h-12 w-12 text-blue-400" />,
//       title: "Master Modern Tech",
//       description: "Learn cutting-edge technologies from industry experts",
//       gradient: "from-blue-500 to-cyan-500"
//     },
//     {
//       icon: <Brain className="h-12 w-12 text-purple-400" />,
//       title: "Boost Your Career",
//       description: "Gain skills that companies are hiring for right now",
//       gradient: "from-purple-500 to-pink-500"
//     },
//     {
//       icon: <Rocket className="h-12 w-12 text-orange-400" />,
//       title: "Learn at Light Speed",
//       description: "Accelerate your learning with project-based courses",
//       gradient: "from-orange-500 to-red-500"
//     },
//     {
//       icon: <Palette className="h-12 w-12 text-green-400" />,
//       title: "Unlock Creativity",
//       description: "Transform your ideas into reality with practical skills",
//       gradient: "from-green-500 to-teal-500"
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [slides.length]);

//   return (
//     <div className="relative h-48 md:h-56 lg:h-64 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm p-8 border border-white/20">
//       <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-xl"></div>
      
//       <div className="relative z-10 h-full flex items-center">
//         <div className="flex-1">
//           <div className="relative h-24 overflow-hidden">
//             {slides.map((slide, index) => (
//               <div
//                 key={index}
//                 className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
//                   index === currentSlide
//                     ? 'opacity-100 translate-x-0'
//                     : index < currentSlide
//                     ? 'opacity-0 -translate-x-full'
//                     : 'opacity-0 translate-x-full'
//                 }`}
//               >
//                 <div className="flex items-center space-x-6">
//                   <div className="flex-shrink-0">
//                     {slide.icon}
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
//                       {slide.title}
//                     </h3>
//                     <p className="text-blue-100 text-lg">
//                       {slide.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="absolute bottom-6 left-8 flex space-x-2 z-10">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             className={`w-2 h-2 rounded-full transition-all ${
//               index === currentSlide
//                 ? 'bg-white w-6'
//                 : 'bg-white/40'
//             }`}
//             onClick={() => setCurrentSlide(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // Enhanced Stats Cards for Dark Background
// function StatsCards({ stats }: { stats: { courses: number; categories: number; featured: number; skills: number } }) {
//   return (
//     <div className="grid grid-cols-2 gap-4">
//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-blue-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.courses}</div>
//             <div className="text-blue-200 text-sm">Courses</div>
//           </div>
//           <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <TrendingUp className="h-6 w-6 text-blue-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-green-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.categories}</div>
//             <div className="text-green-200 text-sm">Categories</div>
//           </div>
//           <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Users className="h-6 w-6 text-green-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-yellow-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.featured}</div>
//             <div className="text-yellow-200 text-sm">Featured</div>
//           </div>
//           <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Star className="h-6 w-6 text-yellow-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-purple-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.skills}</div>
//             <div className="text-purple-200 text-sm">Skills</div>
//           </div>
//           <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Zap className="h-6 w-6 text-purple-300" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Animated Gradient Background Component
// function AnimatedGradientBackground({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="relative w-full overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900">
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
//         <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1500"></div>
        
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
//       </div>
      
//       <div className="relative z-10">
//         {children}
//       </div>
//     </div>
//   );
// }

// // Helper function to convert Course type to compatible type for CourseCard
// const convertToCourseData = (course: Course) => {
//   return {
//     id: course.id,
//     slug: course.slug,
//     title: course.title,
//     thumbnail_url: course.thumbnail_url || undefined,
//     short_description: course.short_description || undefined,
//     category_name: course.category_name || undefined,
//     instructor_name: course.instructor_name || undefined,
//     instructor_image: course.instructor_image || undefined,
//     price_cents: course.price_cents || 0,
//     // FIX: Ensure average_rating is always a number and not undefined
//     average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
//     review_count: course.review_count || 0,
//     like_count: course.like_count || undefined,
//     share_count: course.share_count || undefined,
//     total_views: course.total_views || undefined,
//     enrolled_students_count: course.enrolled_students_count || undefined,
//     total_video_duration: course.total_video_duration || undefined,
//     total_lessons: course.total_lessons || undefined,
//     is_featured: course.is_featured || false,
//     is_trending: course.is_trending || false
//   };
// };

// // Helper function to check active filters
// function hasActiveFilters(filters: any): boolean {
//   return Object.keys(filters).some(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   });
// }

// // Helper function to count active filters
// function getActiveFilterCount(filters: any): number {
//   return Object.keys(filters).filter(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   }).length;
// }

// // Enhanced formatRating function that always returns a valid display value
// const formatRating = (rating: number | undefined | null, reviewCount: number | undefined | null) => {
//   // Ensure rating is a number, default to 0 if not
//   const numericRating = typeof rating === 'number' ? rating : 0;
  
//   // Ensure reviewCount is a number, default to 0 if not
//   const numericReviewCount = typeof reviewCount === 'number' ? reviewCount : 0;
  
//   // If rating is 0, show "No ratings" instead of hiding
//   if (numericRating === 0) {
//     return {
//       display: "No ratings yet",
//       value: 0,
//       hasReviews: false,
//       showRating: true // Always show, even if 0
//     };
//   }
  
//   // If rating exists and is > 0, format it
//   if (numericRating > 0) {
//     return {
//       display: `${numericRating.toFixed(1)}`,
//       value: numericRating,
//       hasReviews: numericReviewCount > 0,
//       showRating: true
//     };
//   }
  
//   // Fallback for any other case
//   return {
//     display: "No ratings yet",
//     value: 0,
//     hasReviews: false,
//     showRating: true
//   };
// };

// // Client-side filtering function
// const filterCourses = (
//   courses: Course[],
//   filters: {
//     searchQuery: string;
//     category_slug: string;
//     difficulty: string;
//     content_type: string;
//     price_range: string;
//     min_rating: number;
//     tags: string[];
//     is_featured: boolean;
//     is_trending: boolean;
//     sort_by: string;
//   }
// ): Course[] => {
//   let filtered = [...courses];
  
//   // Search by title or description
//   if (filters.searchQuery) {
//     const query = filters.searchQuery.toLowerCase();
//     filtered = filtered.filter(course => 
//       course.title.toLowerCase().includes(query) ||
//       (course.short_description || '').toLowerCase().includes(query) ||
//       (course.category_name || '').toLowerCase().includes(query) ||
//       (course.instructor_name || '').toLowerCase().includes(query)
//     );
//   }
  
//   // Filter by category
//   if (filters.category_slug) {
//     filtered = filtered.filter(course => 
//       course.category_slug === filters.category_slug
//     );
//   }
  
//   // Filter by minimum rating
//   if (filters.min_rating > 0) {
//     filtered = filtered.filter(course => 
//       (course.average_rating || 0) >= filters.min_rating
//     );
//   }
  
//   // 🔥 FIX: Check if difficulty exists on Course type before filtering
//   if (filters.difficulty && 'difficulty' in filtered[0]) {
//     filtered = filtered.filter(course => 
//       (course as any).difficulty === filters.difficulty
//     );
//   }
  
//   // 🔥 FIX: Check if content_type exists on Course type before filtering
//   if (filters.content_type && 'content_type' in filtered[0]) {
//     filtered = filtered.filter(course => 
//       (course as any).content_type === filters.content_type
//     );
//   }
  
//   // Filter by price range
//   if (filters.price_range) {
//     const priceRanges: Record<string, (price: number) => boolean> = {
//       'free': (price) => price === 0,
//       '0-100': (price) => price > 0 && price <= 10000, // 10000 cents = $100
//       '100-500': (price) => price > 10000 && price <= 50000, // 50000 cents = $500
//       '500+': (price) => price > 50000,
//     };
    
//     const priceCheck = priceRanges[filters.price_range];
//     if (priceCheck) {
//       filtered = filtered.filter(course => {
//         const priceInDollars = (course.price_cents || 0) / 100;
//         return priceCheck(priceInDollars);
//       });
//     }
//   }
  
//   // Filter by featured/trending
//   if (filters.is_featured) {
//     filtered = filtered.filter(course => course.is_featured);
//   }
  
//   if (filters.is_trending) {
//     filtered = filtered.filter(course => course.is_trending);
//   }
  
//   // 🔥 FIX: Handle tags filtering safely
//   if (filters.tags.length > 0) {
//     filtered = filtered.filter(course => {
//       // Get tags from course - handle different possible structures
//       let courseTagValues: string[] = [];
      
//       if (course.tags) {
//         if (Array.isArray(course.tags)) {
//           // Handle array of strings or array of objects
//           courseTagValues = course.tags.map((tag: any) => {
//             if (typeof tag === 'string') return tag.toLowerCase();
//             if (tag && typeof tag === 'object') {
//               return tag.name?.toLowerCase() || tag.slug?.toLowerCase() || '';
//             }
//             return '';
//           }).filter(Boolean);
//         }
//       }
      
//       // Check if any filter tag matches any course tag
//       return filters.tags.some(filterTag => 
//         courseTagValues.includes(filterTag.toLowerCase())
//       );
//     });
//   }
  
//   // Sort courses
//   if (filters.sort_by === 'rating') {
//     filtered.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));
//   } else if (filters.sort_by === 'price_low') {
//     filtered.sort((a, b) => (a.price_cents || 0) - (b.price_cents || 0));
//   } else if (filters.sort_by === 'price_high') {
//     filtered.sort((a, b) => (b.price_cents || 0) - (a.price_cents || 0));
//   } else if (filters.sort_by === 'newest') {
//     // Check if created_at exists before sorting
//     if ('created_at' in filtered[0]) {
//       filtered.sort((a, b) => {
//         const dateA = new Date((a as any).created_at || 0).getTime();
//         const dateB = new Date((b as any).created_at || 0).getTime();
//         return dateB - dateA;
//       });
//     }
//   } else if (filters.sort_by === 'popular') {
//     filtered.sort((a, b) => (b.enrolled_students_count || 0) - (a.enrolled_students_count || 0));
//   }
  
//   return filtered;
// };
// // const filterCourses = (
// //   courses: Course[],
// //   filters: {
// //     searchQuery: string;
// //     category_slug: string;
// //     difficulty: string;
// //     content_type: string;
// //     price_range: string;
// //     min_rating: number;
// //     tags: string[];
// //     is_featured: boolean;
// //     is_trending: boolean;
// //     sort_by: string;
// //   }
// // ): Course[] => {
// //   let filtered = [...courses];
  
// //   // Search by title or description
// //   if (filters.searchQuery) {
// //     const query = filters.searchQuery.toLowerCase();
// //     filtered = filtered.filter(course => 
// //       course.title.toLowerCase().includes(query) ||
// //       (course.short_description || '').toLowerCase().includes(query) ||
// //       (course.category_name || '').toLowerCase().includes(query) ||
// //       (course.instructor_name || '').toLowerCase().includes(query)
// //     );
// //   }
  
// //   // Filter by category
// //   if (filters.category_slug) {
// //     filtered = filtered.filter(course => 
// //       course.category_slug === filters.category_slug
// //     );
// //   }
  
// //   // Filter by minimum rating
// //   if (filters.min_rating > 0) {
// //     filtered = filtered.filter(course => 
// //       (course.average_rating || 0) >= filters.min_rating
// //     );
// //   }
  
// //   // Filter by difficulty
// //   if (filters.difficulty) {
// //     filtered = filtered.filter(course => 
// //       course.difficulty === filters.difficulty
// //     );
// //   }
  
// //   // Filter by content type
// //   if (filters.content_type) {
// //     filtered = filtered.filter(course => 
// //       course.content_type === filters.content_type
// //     );
// //   }
  
// //   // Filter by price range
// //   if (filters.price_range) {
// //     const [min, max] = filters.price_range.split('-').map(Number);
// //     filtered = filtered.filter(course => {
// //       const price = (course.price_cents || 0) / 100;
// //       if (max === 0) return price === 0; // Free
// //       if (max === 100) return price > 0 && price <= 100; // $0-$100
// //       if (max === 500) return price > 100 && price <= 500; // $100-$500
// //       return price > 500; // $500+
// //     });
// //   }
  
// //   // Filter by featured/trending
// //   if (filters.is_featured) {
// //     filtered = filtered.filter(course => course.is_featured);
// //   }
  
// //   if (filters.is_trending) {
// //     filtered = filtered.filter(course => course.is_trending);
// //   }
  
// //   // Filter by tags
// //   if (filters.tags.length > 0) {
// //     filtered = filtered.filter(course => {
// //       const courseTags = course.tags || [];
// //       return filters.tags.every(tag => courseTags.includes(tag));
// //     });
// //   }
  
// //   // Sort courses
// //   if (filters.sort_by === 'rating') {
// //     filtered.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));
// //   } else if (filters.sort_by === 'price_low') {
// //     filtered.sort((a, b) => (a.price_cents || 0) - (b.price_cents || 0));
// //   } else if (filters.sort_by === 'price_high') {
// //     filtered.sort((a, b) => (b.price_cents || 0) - (a.price_cents || 0));
// //   } else if (filters.sort_by === 'newest') {
// //     filtered.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
// //   } else if (filters.sort_by === 'popular') {
// //     filtered.sort((a, b) => (b.enrolled_students_count || 0) - (a.enrolled_students_count || 0));
// //   }
  
// //   return filtered;
// // };



// // Main Component
// export default function CoursesPage({ searchParams }: CoursesPageProps) {
//   const resolvedSearchParams = React.use(searchParams);
  
//   const [initialCourses, setInitialCourses] = useState<Course[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [availableTags, setAvailableTags] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [view, setView] = useState<'grid' | 'list'>('grid');
  
//   // 🔥 EMERGENCY FIX: Use empty array and handle filtering locally
//   const {
//     courses: filteredCoursesFromHook,
//     loading,
//     error,
//     filters,
//     pagination: hookPagination,
//     updateFilters,
//     resetFilters,
//     loadMore
//   } = useCourseSearch([]); // Pass empty array to prevent API overwrite

//   // 🔥 LOCAL STATE for courses (filtered from initialCourses)
//   const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
//   const [localPagination, setLocalPagination] = useState({
//     total: 0,
//     limit: 12,
//     offset: 0,
//     hasMore: false
//   });

//   // Fetch initial data
//   useEffect(() => {
//     async function fetchInitialData() {
//       try {
//         setIsLoading(true);
        
//         const [coursesResult, categoriesResult, tagsResult] = await Promise.all([
//           getCoursesAction({
//             is_published: true,
//             category_slug: resolvedSearchParams.category,
//             limit: 100,
//             include_reviews: true
//           }),
//           getCategoriesAction(),
//           getTagsAction()
//         ]);

//         const coursesData = coursesResult.courses || [];
        
//         // IMPORTANT: Debug what's coming from API
//         console.log('=== DEBUG: Initial API Response ===');
//         console.log('Total courses:', coursesData.length);

//         coursesData.forEach((course: any, index: number) => {
//           console.log(`\n${index + 1}. ${course.title}`);
//           console.log('   average_rating:', course.average_rating);
//           console.log('   review_count:', course.review_count);
//           console.log('   Type of average_rating:', typeof course.average_rating);
//         });

//         // FIX: Ensure all courses have valid average_rating values
//         const coursesWithValidRatings = coursesData.map((course: any) => ({
//           ...course,
//           average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
//           review_count: course.review_count || 0
//         }));

//         setInitialCourses(coursesWithValidRatings);
//         setCategories(categoriesResult.categories || []);
//         setAvailableTags(tagsResult.tags || []);
        
//         // Set initial filtered courses
//         setFilteredCourses(coursesWithValidRatings);
//         setLocalPagination({
//           total: coursesWithValidRatings.length,
//           limit: 12,
//           offset: 0,
//           hasMore: coursesWithValidRatings.length > 12
//         });
        
//       } catch (error) {
//         console.error('Error fetching initial data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchInitialData();
//   }, [resolvedSearchParams.category]);

//   // 🔥 EMERGENCY FIX: Apply filters locally
//   useEffect(() => {
//     if (initialCourses.length > 0) {
//       console.log('🔍 Applying filters locally:', filters);
      
//       // Apply all filters
//       const filtered = filterCourses(initialCourses, filters);
      
//       console.log('✅ Filtered courses:', filtered.length);
//       console.log('📊 First filtered course rating:', filtered[0]?.average_rating);
      
//       // Apply pagination
//       const paginated = filtered.slice(
//         localPagination.offset,
//         localPagination.offset + localPagination.limit
//       );
      
//       setFilteredCourses(paginated);
//       setLocalPagination(prev => ({
//         ...prev,
//         total: filtered.length,
//         hasMore: filtered.length > prev.offset + prev.limit
//       }));
//     }
//   }, [filters, initialCourses, localPagination.offset]);

//   // Initialize with URL params
//   useEffect(() => {
//     const urlFilters = {
//       searchQuery: resolvedSearchParams.search || '',
//       category_slug: resolvedSearchParams.category || '',
//       difficulty: resolvedSearchParams.difficulty || '',
//       content_type: resolvedSearchParams.content_type || '',
//       price_range: resolvedSearchParams.price_range || '',
//       min_rating: parseFloat(resolvedSearchParams.min_rating || '0'),
//       language: '',
//       tags: [],
//       is_featured: false,
//       is_trending: false,
//       sort_by: resolvedSearchParams.sort_by || 'relevance'
//     };
    
//     if (Object.values(urlFilters).some(value => value !== '' && value !== 0)) {
//       updateFilters(urlFilters);
//       setSearchQuery(urlFilters.searchQuery);
//     }
//   }, [resolvedSearchParams]);

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     updateFilters({ searchQuery: searchQuery });
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       updateFilters({ searchQuery: searchQuery });
//     }
//   };

//   const handleLoadMore = () => {
//     setLocalPagination(prev => {
//       const newOffset = prev.offset + prev.limit;
//       return {
//         ...prev,
//         offset: newOffset,
//         hasMore: prev.total > newOffset
//       };
//     });
//   };

//   // Calculate stats from initial courses
//   const totalCourses = initialCourses.length;
//   const totalCategories = categories.length;
//   const totalTags = availableTags.length;
//   const featuredCourses = initialCourses.filter(course => course.is_featured).length;

//   const stats = {
//     courses: totalCourses,
//     categories: totalCategories,
//     featured: featuredCourses,
//     skills: totalTags
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="container mx-auto px-4 py-8">
//           <div className="max-w-7xl mx-auto text-center py-20">
//             <div className="relative inline-block">
//               <Loader2 className="h-12 w-12 animate-spin mx-auto mb-6 text-blue-600" />
//               <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
//             </div>
//             <p className="text-gray-600 text-lg font-medium">Loading amazing courses...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
      
//       {/* Hero Section */}
//       <AnimatedGradientBackground>
//         <div className="w-full px-4 py-16">
//           <div className="w-full mx-auto">
//             <div className="mb-12">
//               <div className="text-center mb-8">
//                 <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
//                   Explore Courses
//                 </h1>
//                 <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
//                   Discover your next learning adventure in our comprehensive learning platform
//                 </p>
//               </div>

//               <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
//                 <div className="lg:col-span-1">
//                   <TextSlider />
//                 </div>

//                 <div className="lg:col-span-1">
//                   <StatsCards stats={stats} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </AnimatedGradientBackground>

//       {/* Search Bar */}
//       <div className="w-full bg-white border-b border-gray-200 py-8 px-4">
//         <div className="w-full max-w-7xl mx-auto">
//           <div className="text-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Course</h2>
//             <p className="text-gray-600">Search from thousands of courses with detailed ratings and reviews</p>
//           </div>
          
//           <form onSubmit={handleSearchSubmit} className="relative max-w-4xl mx-auto">
//             <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
//             <Input
//               type="text"
//               placeholder="Search courses by title, instructor, or technology... (Press Enter to search)"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="w-full pl-16 pr-6 py-6 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition text-gray-900 placeholder-gray-500 shadow-lg hover:shadow-xl"
//             />
//             <Button 
//               type="submit"
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-5 rounded-xl font-semibold"
//             >
//               Search
//             </Button>
//           </form>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="w-full bg-gray-50 min-h-screen">
//         <div className="w-full px-4 py-8">
//           <div className="w-full mx-auto">
//             {/* Mobile Filter Toggle */}
//             <div className="lg:hidden mb-6">
//               <Button
//                 onClick={() => setShowFilters(!showFilters)}
//                 variant="outline"
//                 className="w-full flex items-center justify-center gap-2 py-3 text-lg"
//               >
//                 <Filter size={20} />
//                 {showFilters ? 'Hide Filters' : 'Show Filters'}
//                 {hasActiveFilters(filters) && (
//                   <Badge variant="secondary" className="ml-2">
//                     {getActiveFilterCount(filters)}
//                   </Badge>
//                 )}
//               </Button>
//             </div>

//             {/* Full Width Grid Layout */}
//             <div className="w-full">
//               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//                 {/* Sidebar Filters */}
//                 <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:col-span-3 space-y-6`}>
//                   {/* Categories Card */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Sparkles className="h-5 w-5 text-blue-600" />
//                         Categories
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-0">
//                       <div className="max-h-96 overflow-y-auto">
//                         <CategoryNavigation 
//                           showCourseCounts={true}
//                           className="p-4"
//                           currentCategory={filters.category_slug}
//                         />
//                       </div>
//                     </CardContent>
//                   </Card>

//                   {/* Advanced Filters */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Filter className="h-5 w-5 text-purple-600" />
//                         Advanced Filters
//                       </CardTitle>
//                       <CardDescription>
//                         Filter by rating, social metrics, and more
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <CourseFilters
//                         filters={filters}
//                         onFiltersChange={updateFilters}
//                         onReset={resetFilters}
//                         availableTags={availableTags}
//                       />
//                     </CardContent>
//                   </Card>

//                   {/* Social Metrics Info */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Heart className="h-5 w-5 text-green-600" />
//                         Social Engagement
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <div className="space-y-3">
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                             <span>Rating & Reviews</span>
//                           </div>
//                           <Badge variant="outline" className="text-xs">
//                             Real user feedback
//                           </Badge>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Heart className="h-4 w-4 text-red-500 fill-red-500" />
//                             <span>Likes</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Course popularity</span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Share2 className="h-4 w-4 text-blue-500" />
//                             <span>Shares</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Social sharing</span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Eye className="h-4 w-4 text-purple-500" />
//                             <span>Views</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Course visibility</span>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>

//                 {/* Main Courses Area */}
//                 <div className="lg:col-span-9">
//                   {/* Results Header */}
//                   <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
//                     <div className="flex-1">
//                       <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent mb-2">
//                         {filters.category_slug ? (
//                           <>
//                             <Sparkles className="h-6 w-6 text-blue-600 inline mr-2" />
//                             {categories.find(cat => cat.slug === filters.category_slug)?.name}
//                           </>
//                         ) : filters.searchQuery ? (
//                           <>Search: "{filters.searchQuery}"</>
//                         ) : (
//                           <>All Courses</>
//                         )}
//                       </h2>
//                       <p className="text-gray-600 flex items-center gap-2">
//                         {loading ? (
//                           <>
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                             Discovering courses...
//                           </>
//                         ) : (
//                           <>
//                             <span className="font-semibold text-gray-900">{filteredCourses.length}</span>
//                             {filteredCourses.length === 1 ? ' course' : ' courses'} found
//                             {hasActiveFilters(filters) && (
//                               <span className="text-blue-600 ml-2">• Filtered</span>
//                             )}
//                           </>
//                         )}
//                       </p>
//                     </div>

//                     <div className="flex items-center gap-4">
//                       <ViewToggle view={view} onViewChange={setView} />
                      
//                       {hasActiveFilters(filters) && (
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={resetFilters}
//                           className="rounded-lg border-gray-300 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
//                         >
//                           Clear All
//                         </Button>
//                       )}
//                     </div>
//                   </div>

//                   {/* Error State */}
//                   {error && (
//                     <Card className="mb-6 border-red-200 bg-red-50 rounded-2xl overflow-hidden">
//                       <CardContent className="p-6">
//                         <div className="flex items-center gap-3">
//                           <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
//                           <p className="text-red-700 font-medium">Error: {error}</p>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   )}

//                   {/* Loading State */}
//                   {isLoading && filteredCourses.length === 0 && (
//                     <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
//                       <div className="relative inline-block mb-4">
//                         <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
//                         <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
//                       </div>
//                       <p className="text-gray-600 text-lg font-medium">Loading courses...</p>
//                     </div>
//                   )}

//                   {/* Courses Grid/List */}
//                   {filteredCourses.length > 0 ? (
//                     <>
//                       {view === 'grid' ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                           {filteredCourses.map((course) => {
//                             // FIX: Ensure course has valid rating data before passing to CourseCard
//                             const enhancedCourse = {
//                               ...convertToCourseData(course),
//                               // Double-check that average_rating is always a valid number
//                               average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
//                               review_count: course.review_count || 0
//                             };
                            
//                             // Debug log for each course
//                             console.log(`🎯 Rendering: ${course.title}`, {
//                               rating: enhancedCourse.average_rating,
//                               reviews: enhancedCourse.review_count
//                             });
                            
//                             return (
//                               <CourseCard 
//                                 key={course.id} 
//                                 course={enhancedCourse} 
//                                 variant="grid" 
//                               />
//                             );
//                           })}
//                         </div>
//                       ) : (
//                         <div className="space-y-4">
//                           {filteredCourses.map((course) => {
//                             // FIX: Ensure course has valid rating data before passing to CourseCard
//                             const enhancedCourse = {
//                               ...convertToCourseData(course),
//                               // Double-check that average_rating is always a valid number
//                               average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
//                               review_count: course.review_count || 0
//                             };
                            
//                             return (
//                               <CourseCard 
//                                 key={course.id} 
//                                 course={enhancedCourse} 
//                                 variant="list" 
//                               />
//                             );
//                           })}
//                         </div>
//                       )}

//                       {/* Load More Button */}
//                       {localPagination.hasMore && (
//                         <div className="text-center mt-12">
//                           <Button
//                             onClick={handleLoadMore}
//                             disabled={loading}
//                             className="min-w-48 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-0 px-8 py-3 font-semibold"
//                           >
//                             {loading ? (
//                               <>
//                                 <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                                 Loading More...
//                               </>
//                             ) : (
//                               <>
//                                 <Rocket className="h-4 w-4 mr-2" />
//                                 Load More Courses
//                               </>
//                             )}
//                           </Button>
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     /* No Results */
//                     <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
//                       <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <Search className="h-10 w-10 text-gray-400" />
//                       </div>
//                       <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
//                       <p className="text-gray-600 max-w-md mx-auto mb-6">
//                         {filters.searchQuery || hasActiveFilters(filters)
//                           ? "Try adjusting your search criteria or browse all courses."
//                           : "No courses available at the moment. Check back soon!"}
//                       </p>
//                       {(filters.searchQuery || hasActiveFilters(filters)) && (
//                         <Button
//                           onClick={resetFilters}
//                           variant="outline"
//                           className="rounded-lg"
//                         >
//                           Reset Filters
//                         </Button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }




























// // /app/courses/page.tsx

// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { getCoursesAction } from '@/lib/courses/actions';
// import { getCategoriesAction } from '@/lib/categories/actions';
// import { getTagsAction } from '@/lib/tags/actions';
// import { CategoryNavigation } from '@/components/categories/category-navigation';
// import { CourseFilters } from '@/components/courses/course-filters';
// import { useCourseSearch } from '@/hooks/use-course-search';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Search, 
//   Filter, 
//   Loader2, 
//   Sparkles, 
//   TrendingUp, 
//   Users, 
//   Star, 
//   Zap,
//   Grid3X3,
//   List,
//   Play,
//   ArrowRight,
//   Rocket,
//   Brain,
//   Code,
//   Palette,
//   Heart,
//   Share2,
//   Eye,
//   Clock,
//   BookOpen
// } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Course } from '@/types/courses';
// import { Header } from '@/components/layout/header';
// import { Footer } from '@/components/layout/footer';
// import { CourseCard } from '@/components/courses/shared-course-card';

// interface CoursesPageProps {
//   searchParams: Promise<{
//     category?: string;
//     search?: string;
//     difficulty?: string;
//     content_type?: string;
//     price_range?: string;
//     min_rating?: string;
//     sort_by?: string;
//   }>;
// }

// // View Toggle Component
// function ViewToggle({ view, onViewChange }: { view: 'grid' | 'list'; onViewChange: (view: 'grid' | 'list') => void }) {
//   return (
//     <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
//       <Button
//         variant={view === 'grid' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('grid')}
//         className={`flex items-center gap-2 ${view === 'grid' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <Grid3X3 className="h-4 w-4" />
//         <span className="hidden sm:inline">Grid</span>
//       </Button>
//       <Button
//         variant={view === 'list' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('list')}
//         className={`flex items-center gap-2 ${view === 'list' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <List className="h-4 w-4" />
//         <span className="hidden sm:inline">List</span>
//       </Button>
//     </div>
//   );
// }

// // Animated Text Slider Component
// function TextSlider() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const slides = [
//     {
//       icon: <Code className="h-12 w-12 text-blue-400" />,
//       title: "Master Modern Tech",
//       description: "Learn cutting-edge technologies from industry experts",
//       gradient: "from-blue-500 to-cyan-500"
//     },
//     {
//       icon: <Brain className="h-12 w-12 text-purple-400" />,
//       title: "Boost Your Career",
//       description: "Gain skills that companies are hiring for right now",
//       gradient: "from-purple-500 to-pink-500"
//     },
//     {
//       icon: <Rocket className="h-12 w-12 text-orange-400" />,
//       title: "Learn at Light Speed",
//       description: "Accelerate your learning with project-based courses",
//       gradient: "from-orange-500 to-red-500"
//     },
//     {
//       icon: <Palette className="h-12 w-12 text-green-400" />,
//       title: "Unlock Creativity",
//       description: "Transform your ideas into reality with practical skills",
//       gradient: "from-green-500 to-teal-500"
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [slides.length]);

//   return (
//     <div className="relative h-48 md:h-56 lg:h-64 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm p-8 border border-white/20">
//       <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-xl"></div>
      
//       <div className="relative z-10 h-full flex items-center">
//         <div className="flex-1">
//           <div className="relative h-24 overflow-hidden">
//             {slides.map((slide, index) => (
//               <div
//                 key={index}
//                 className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
//                   index === currentSlide
//                     ? 'opacity-100 translate-x-0'
//                     : index < currentSlide
//                     ? 'opacity-0 -translate-x-full'
//                     : 'opacity-0 translate-x-full'
//                 }`}
//               >
//                 <div className="flex items-center space-x-6">
//                   <div className="flex-shrink-0">
//                     {slide.icon}
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
//                       {slide.title}
//                     </h3>
//                     <p className="text-blue-100 text-lg">
//                       {slide.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="absolute bottom-6 left-8 flex space-x-2 z-10">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             className={`w-2 h-2 rounded-full transition-all ${
//               index === currentSlide
//                 ? 'bg-white w-6'
//                 : 'bg-white/40'
//             }`}
//             onClick={() => setCurrentSlide(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // Enhanced Stats Cards for Dark Background
// function StatsCards({ stats }: { stats: { courses: number; categories: number; featured: number; skills: number } }) {
//   return (
//     <div className="grid grid-cols-2 gap-4">
//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-blue-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.courses}</div>
//             <div className="text-blue-200 text-sm">Courses</div>
//           </div>
//           <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <TrendingUp className="h-6 w-6 text-blue-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-green-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.categories}</div>
//             <div className="text-green-200 text-sm">Categories</div>
//           </div>
//           <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Users className="h-6 w-6 text-green-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-yellow-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.featured}</div>
//             <div className="text-yellow-200 text-sm">Featured</div>
//           </div>
//           <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Star className="h-6 w-6 text-yellow-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-purple-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.skills}</div>
//             <div className="text-purple-200 text-sm">Skills</div>
//           </div>
//           <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Zap className="h-6 w-6 text-purple-300" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Animated Gradient Background Component
// function AnimatedGradientBackground({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="relative w-full overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900">
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
//         <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1500"></div>
        
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
//       </div>
      
//       <div className="relative z-10">
//         {children}
//       </div>
//     </div>
//   );
// }

// // Helper function to convert Course type to compatible type for CourseCard
// const convertToCourseData = (course: Course) => {
//   return {
//     id: course.id,
//     slug: course.slug,
//     title: course.title,
//     thumbnail_url: course.thumbnail_url || undefined,
//     short_description: course.short_description || undefined,
//     category_name: course.category_name || undefined,
//     instructor_name: course.instructor_name || undefined,
//     instructor_image: course.instructor_image || undefined,
//     price_cents: course.price_cents || 0,
//     // FIX: Ensure average_rating is always a number and not undefined
//     average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
//     review_count: course.review_count || 0,
//     like_count: course.like_count || undefined,
//     share_count: course.share_count || undefined,
//     total_views: course.total_views || undefined,
//     enrolled_students_count: course.enrolled_students_count || undefined,
//     total_video_duration: course.total_video_duration || undefined,
//     total_lessons: course.total_lessons || undefined,
//     is_featured: course.is_featured || false,
//     is_trending: course.is_trending || false
//   };
// };

// // Helper function to check active filters
// function hasActiveFilters(filters: any): boolean {
//   return Object.keys(filters).some(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   });
// }

// // Helper function to count active filters
// function getActiveFilterCount(filters: any): number {
//   return Object.keys(filters).filter(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   }).length;
// }

// // Enhanced formatRating function that always returns a valid display value
// const formatRating = (rating: number | undefined | null, reviewCount: number | undefined | null) => {
//   // Ensure rating is a number, default to 0 if not
//   const numericRating = typeof rating === 'number' ? rating : 0;
  
//   // Ensure reviewCount is a number, default to 0 if not
//   const numericReviewCount = typeof reviewCount === 'number' ? reviewCount : 0;
  
//   // If rating is 0, show "No ratings" instead of hiding
//   if (numericRating === 0) {
//     return {
//       display: "No ratings yet",
//       value: 0,
//       hasReviews: false,
//       showRating: true // Always show, even if 0
//     };
//   }
  
//   // If rating exists and is > 0, format it
//   if (numericRating > 0) {
//     return {
//       display: `${numericRating.toFixed(1)}`,
//       value: numericRating,
//       hasReviews: numericReviewCount > 0,
//       showRating: true
//     };
//   }
  
//   // Fallback for any other case
//   return {
//     display: "No ratings yet",
//     value: 0,
//     hasReviews: false,
//     showRating: true
//   };
// };

// // 🔥 FIXED CLIENT-SIDE FILTERING FUNCTION WITH SAFETY CHECKS
// const filterCourses = (
//   courses: Course[],
//   filters: {
//     searchQuery: string;
//     category_slug: string;
//     difficulty: string;
//     content_type: string;
//     price_range: string;
//     min_rating: number;
//     tags: string[];
//     is_featured: boolean;
//     is_trending: boolean;
//     sort_by: string;
//   }
// ): Course[] => {
//   let filtered = [...courses];
  
//   // Search by title or description
//   if (filters.searchQuery) {
//     const query = filters.searchQuery.toLowerCase();
//     filtered = filtered.filter(course => 
//       course.title.toLowerCase().includes(query) ||
//       (course.short_description || '').toLowerCase().includes(query) ||
//       (course.category_name || '').toLowerCase().includes(query) ||
//       (course.instructor_name || '').toLowerCase().includes(query)
//     );
//   }
  
//   // Filter by category
//   if (filters.category_slug) {
//     filtered = filtered.filter(course => 
//       course.category_slug === filters.category_slug
//     );
//   }
  
//   // Filter by minimum rating
//   if (filters.min_rating > 0) {
//     filtered = filtered.filter(course => 
//       (course.average_rating || 0) >= filters.min_rating
//     );
//   }
  
//   // 🔥 FIX: Check if difficulty exists on Course type before filtering
//   if (filters.difficulty && filtered.length > 0 && 'difficulty' in filtered[0]) {
//     filtered = filtered.filter(course => 
//       (course as any).difficulty === filters.difficulty
//     );
//   }
  
//   // 🔥 FIX: Check if content_type exists on Course type before filtering
//   if (filters.content_type && filtered.length > 0 && 'content_type' in filtered[0]) {
//     filtered = filtered.filter(course => 
//       (course as any).content_type === filters.content_type
//     );
//   }
  
//   // Filter by price range
//   if (filters.price_range) {
//     const priceRanges: Record<string, (price: number) => boolean> = {
//       'free': (price) => price === 0,
//       '0-100': (price) => price > 0 && price <= 10000, // 10000 cents = $100
//       '100-500': (price) => price > 10000 && price <= 50000, // 50000 cents = $500
//       '500+': (price) => price > 50000,
//     };
    
//     const priceCheck = priceRanges[filters.price_range];
//     if (priceCheck) {
//       filtered = filtered.filter(course => {
//         const priceInDollars = (course.price_cents || 0) / 100;
//         return priceCheck(priceInDollars);
//       });
//     }
//   }
  
//   // Filter by featured/trending
//   if (filters.is_featured) {
//     filtered = filtered.filter(course => course.is_featured);
//   }
  
//   if (filters.is_trending) {
//     filtered = filtered.filter(course => course.is_trending);
//   }
  
//   // 🔥 FIX: Handle tags filtering safely
//   if (filters.tags.length > 0) {
//     filtered = filtered.filter(course => {
//       // Get tags from course - handle different possible structures
//       let courseTagValues: string[] = [];
      
//       if (course.tags) {
//         if (Array.isArray(course.tags)) {
//           // Handle array of strings or array of objects
//           courseTagValues = course.tags.map((tag: any) => {
//             if (typeof tag === 'string') return tag.toLowerCase();
//             if (tag && typeof tag === 'object') {
//               return tag.name?.toLowerCase() || tag.slug?.toLowerCase() || '';
//             }
//             return '';
//           }).filter(Boolean);
//         }
//       }
      
//       // Check if any filter tag matches any course tag
//       return filters.tags.some(filterTag => 
//         courseTagValues.includes(filterTag.toLowerCase())
//       );
//     });
//   }
  
//   // 🔥 FIXED: Sort courses with safety checks for empty arrays
//   if (filtered.length > 0) {
//     if (filters.sort_by === 'rating') {
//       filtered.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));
//     } else if (filters.sort_by === 'price_low') {
//       filtered.sort((a, b) => (a.price_cents || 0) - (b.price_cents || 0));
//     } else if (filters.sort_by === 'price_high') {
//       filtered.sort((a, b) => (b.price_cents || 0) - (a.price_cents || 0));
//     } else if (filters.sort_by === 'newest') {
//       // Check if created_at exists on the first course before sorting
//       const firstCourse = filtered[0];
//       if (firstCourse && 'created_at' in firstCourse) {
//         filtered.sort((a, b) => {
//           const dateA = new Date((a as any).created_at || 0).getTime();
//           const dateB = new Date((b as any).created_at || 0).getTime();
//           return dateB - dateA;
//         });
//       }
//     } else if (filters.sort_by === 'popular') {
//       filtered.sort((a, b) => (b.enrolled_students_count || 0) - (a.enrolled_students_count || 0));
//     }
//   }
  
//   return filtered;
// };

// // Main Component
// export default function CoursesPage({ searchParams }: CoursesPageProps) {
//   const resolvedSearchParams = React.use(searchParams);
  
//   const [initialCourses, setInitialCourses] = useState<Course[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [availableTags, setAvailableTags] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [view, setView] = useState<'grid' | 'list'>('grid');
  
//   // 🔥 EMERGENCY FIX: Use empty array and handle filtering locally
//   const {
//     courses: filteredCoursesFromHook,
//     loading,
//     error,
//     filters,
//     pagination: hookPagination,
//     updateFilters,
//     resetFilters,
//     loadMore
//   } = useCourseSearch([]); // Pass empty array to prevent API overwrite

//   // 🔥 LOCAL STATE for courses (filtered from initialCourses)
//   const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
//   const [localPagination, setLocalPagination] = useState({
//     total: 0,
//     limit: 12,
//     offset: 0,
//     hasMore: false
//   });

//   // Fetch initial data
//   useEffect(() => {
//     async function fetchInitialData() {
//       try {
//         setIsLoading(true);
        
//         const [coursesResult, categoriesResult, tagsResult] = await Promise.all([
//           getCoursesAction({
//             is_published: true,
//             category_slug: resolvedSearchParams.category,
//             limit: 100,
//             include_reviews: true
//           }),
//           getCategoriesAction(),
//           getTagsAction()
//         ]);

//         const coursesData = coursesResult.courses || [];
        
//         // IMPORTANT: Debug what's coming from API
//         console.log('=== DEBUG: Initial API Response ===');
//         console.log('Total courses:', coursesData.length);

//         coursesData.forEach((course: any, index: number) => {
//           console.log(`\n${index + 1}. ${course.title}`);
//           console.log('   average_rating:', course.average_rating);
//           console.log('   review_count:', course.review_count);
//           console.log('   Type of average_rating:', typeof course.average_rating);
//         });

//         // FIX: Ensure all courses have valid average_rating values
//         const coursesWithValidRatings = coursesData.map((course: any) => ({
//           ...course,
//           average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
//           review_count: course.review_count || 0
//         }));

//         setInitialCourses(coursesWithValidRatings);
//         setCategories(categoriesResult.categories || []);
//         setAvailableTags(tagsResult.tags || []);
        
//         // Set initial filtered courses
//         setFilteredCourses(coursesWithValidRatings);
//         setLocalPagination({
//           total: coursesWithValidRatings.length,
//           limit: 12,
//           offset: 0,
//           hasMore: coursesWithValidRatings.length > 12
//         });
        
//       } catch (error) {
//         console.error('Error fetching initial data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchInitialData();
//   }, [resolvedSearchParams.category]);

//   // 🔥 EMERGENCY FIX: Apply filters locally with error handling
//   useEffect(() => {
//     if (initialCourses.length > 0) {
//       console.log('🔍 Applying filters locally:', filters);
      
//       try {
//         // Apply all filters
//         const filtered = filterCourses(initialCourses, filters);
        
//         console.log('✅ Filtered courses:', filtered.length);
//         if (filtered.length > 0) {
//           console.log('📊 First filtered course rating:', filtered[0]?.average_rating);
//         }
        
//         // Apply pagination
//         const paginated = filtered.slice(
//           localPagination.offset,
//           localPagination.offset + localPagination.limit
//         );
        
//         setFilteredCourses(paginated);
//         setLocalPagination(prev => ({
//           ...prev,
//           total: filtered.length,
//           hasMore: filtered.length > prev.offset + prev.limit
//         }));
//       } catch (error) {
//         console.error('❌ Error filtering courses:', error);
//         // Fallback to showing all courses if filtering fails
//         const fallbackCourses = initialCourses.slice(
//           localPagination.offset,
//           localPagination.offset + localPagination.limit
//         );
//         setFilteredCourses(fallbackCourses);
//         setLocalPagination(prev => ({
//           ...prev,
//           total: initialCourses.length,
//           hasMore: initialCourses.length > prev.offset + prev.limit
//         }));
//       }
//     }
//   }, [filters, initialCourses, localPagination.offset]);

//   // Initialize with URL params
//   useEffect(() => {
//     const urlFilters = {
//       searchQuery: resolvedSearchParams.search || '',
//       category_slug: resolvedSearchParams.category || '',
//       difficulty: resolvedSearchParams.difficulty || '',
//       content_type: resolvedSearchParams.content_type || '',
//       price_range: resolvedSearchParams.price_range || '',
//       min_rating: parseFloat(resolvedSearchParams.min_rating || '0'),
//       language: '',
//       tags: [],
//       is_featured: false,
//       is_trending: false,
//       sort_by: resolvedSearchParams.sort_by || 'relevance'
//     };
    
//     if (Object.values(urlFilters).some(value => value !== '' && value !== 0)) {
//       updateFilters(urlFilters);
//       setSearchQuery(urlFilters.searchQuery);
//     }
//   }, [resolvedSearchParams]);

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     updateFilters({ searchQuery: searchQuery });
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       updateFilters({ searchQuery: searchQuery });
//     }
//   };

//   const handleLoadMore = () => {
//     setLocalPagination(prev => {
//       const newOffset = prev.offset + prev.limit;
//       return {
//         ...prev,
//         offset: newOffset,
//         hasMore: prev.total > newOffset
//       };
//     });
//   };

//   // Calculate stats from initial courses
//   const totalCourses = initialCourses.length;
//   const totalCategories = categories.length;
//   const totalTags = availableTags.length;
//   const featuredCourses = initialCourses.filter(course => course.is_featured).length;

//   const stats = {
//     courses: totalCourses,
//     categories: totalCategories,
//     featured: featuredCourses,
//     skills: totalTags
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="container mx-auto px-4 py-8">
//           <div className="max-w-7xl mx-auto text-center py-20">
//             <div className="relative inline-block">
//               <Loader2 className="h-12 w-12 animate-spin mx-auto mb-6 text-blue-600" />
//               <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
//             </div>
//             <p className="text-gray-600 text-lg font-medium">Loading amazing courses...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
      
//       {/* Hero Section */}
//       <AnimatedGradientBackground>
//         <div className="w-full px-4 py-16">
//           <div className="w-full mx-auto">
//             <div className="mb-12">
//               <div className="text-center mb-8">
//                 <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
//                   Explore Courses
//                 </h1>
//                 <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
//                   Discover your next learning adventure in our comprehensive learning platform
//                 </p>
//               </div>

//               <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
//                 <div className="lg:col-span-1">
//                   <TextSlider />
//                 </div>

//                 <div className="lg:col-span-1">
//                   <StatsCards stats={stats} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </AnimatedGradientBackground>

//       {/* Search Bar */}
//       <div className="w-full bg-white border-b border-gray-200 py-8 px-4">
//         <div className="w-full max-w-7xl mx-auto">
//           <div className="text-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Course</h2>
//             <p className="text-gray-600">Search from thousands of courses with detailed ratings and reviews</p>
//           </div>
          
//           <form onSubmit={handleSearchSubmit} className="relative max-w-4xl mx-auto">
//             <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
//             <Input
//               type="text"
//               placeholder="Search courses by title, instructor, or technology... (Press Enter to search)"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="w-full pl-16 pr-6 py-6 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition text-gray-900 placeholder-gray-500 shadow-lg hover:shadow-xl"
//             />
//             <Button 
//               type="submit"
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-5 rounded-xl font-semibold"
//             >
//               Search
//             </Button>
//           </form>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="w-full bg-gray-50 min-h-screen">
//         <div className="w-full px-4 py-8">
//           <div className="w-full mx-auto">
//             {/* Mobile Filter Toggle */}
//             <div className="lg:hidden mb-6">
//               <Button
//                 onClick={() => setShowFilters(!showFilters)}
//                 variant="outline"
//                 className="w-full flex items-center justify-center gap-2 py-3 text-lg"
//               >
//                 <Filter size={20} />
//                 {showFilters ? 'Hide Filters' : 'Show Filters'}
//                 {hasActiveFilters(filters) && (
//                   <Badge variant="secondary" className="ml-2">
//                     {getActiveFilterCount(filters)}
//                   </Badge>
//                 )}
//               </Button>
//             </div>

//             {/* Full Width Grid Layout */}
//             <div className="w-full">
//               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//                 {/* Sidebar Filters */}
//                 <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:col-span-3 space-y-6`}>
//                   {/* Categories Card */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Sparkles className="h-5 w-5 text-blue-600" />
//                         Categories
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-0">
//                       <div className="max-h-96 overflow-y-auto">
//                         <CategoryNavigation 
//                           showCourseCounts={true}
//                           className="p-4"
//                           currentCategory={filters.category_slug}
//                         />
//                       </div>
//                     </CardContent>
//                   </Card>

//                   {/* Advanced Filters */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Filter className="h-5 w-5 text-purple-600" />
//                         Advanced Filters
//                       </CardTitle>
//                       <CardDescription>
//                         Filter by rating, social metrics, and more
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <CourseFilters
//                         filters={filters}
//                         onFiltersChange={updateFilters}
//                         onReset={resetFilters}
//                         availableTags={availableTags}
//                       />
//                     </CardContent>
//                   </Card>

//                   {/* Social Metrics Info */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Heart className="h-5 w-5 text-green-600" />
//                         Social Engagement
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <div className="space-y-3">
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                             <span>Rating & Reviews</span>
//                           </div>
//                           <Badge variant="outline" className="text-xs">
//                             Real user feedback
//                           </Badge>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Heart className="h-4 w-4 text-red-500 fill-red-500" />
//                             <span>Likes</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Course popularity</span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Share2 className="h-4 w-4 text-blue-500" />
//                             <span>Shares</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Social sharing</span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Eye className="h-4 w-4 text-purple-500" />
//                             <span>Views</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Course visibility</span>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>

//                 {/* Main Courses Area */}
//                 <div className="lg:col-span-9">
//                   {/* Results Header */}
//                   <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
//                     <div className="flex-1">
//                       <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent mb-2">
//                         {filters.category_slug ? (
//                           <>
//                             <Sparkles className="h-6 w-6 text-blue-600 inline mr-2" />
//                             {categories.find(cat => cat.slug === filters.category_slug)?.name}
//                           </>
//                         ) : filters.searchQuery ? (
//                           <>Search: "{filters.searchQuery}"</>
//                         ) : (
//                           <>All Courses</>
//                         )}
//                       </h2>
//                       <p className="text-gray-600 flex items-center gap-2">
//                         {loading ? (
//                           <>
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                             Discovering courses...
//                           </>
//                         ) : (
//                           <>
//                             <span className="font-semibold text-gray-900">{filteredCourses.length}</span>
//                             {filteredCourses.length === 1 ? ' course' : ' courses'} found
//                             {hasActiveFilters(filters) && (
//                               <span className="text-blue-600 ml-2">• Filtered</span>
//                             )}
//                           </>
//                         )}
//                       </p>
//                     </div>

//                     <div className="flex items-center gap-4">
//                       <ViewToggle view={view} onViewChange={setView} />
                      
//                       {hasActiveFilters(filters) && (
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={resetFilters}
//                           className="rounded-lg border-gray-300 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
//                         >
//                           Clear All
//                         </Button>
//                       )}
//                     </div>
//                   </div>

//                   {/* Error State */}
//                   {error && (
//                     <Card className="mb-6 border-red-200 bg-red-50 rounded-2xl overflow-hidden">
//                       <CardContent className="p-6">
//                         <div className="flex items-center gap-3">
//                           <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
//                           <p className="text-red-700 font-medium">Error: {error}</p>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   )}

//                   {/* Loading State */}
//                   {isLoading && filteredCourses.length === 0 && (
//                     <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
//                       <div className="relative inline-block mb-4">
//                         <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
//                         <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
//                       </div>
//                       <p className="text-gray-600 text-lg font-medium">Loading courses...</p>
//                     </div>
//                   )}

//                   {/* Courses Grid/List */}
//                   {filteredCourses.length > 0 ? (
//                     <>
//                       {view === 'grid' ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                           {filteredCourses.map((course) => {
//                             // FIX: Ensure course has valid rating data before passing to CourseCard
//                             const enhancedCourse = {
//                               ...convertToCourseData(course),
//                               // Double-check that average_rating is always a valid number
//                               average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
//                               review_count: course.review_count || 0
//                             };
                            
//                             // Debug log for each course
//                             console.log(`🎯 Rendering: ${course.title}`, {
//                               rating: enhancedCourse.average_rating,
//                               reviews: enhancedCourse.review_count
//                             });
                            
//                             return (
//                               <CourseCard 
//                                 key={course.id} 
//                                 course={enhancedCourse} 
//                                 variant="grid" 
//                               />
//                             );
//                           })}
//                         </div>
//                       ) : (
//                         <div className="space-y-4">
//                           {filteredCourses.map((course) => {
//                             // FIX: Ensure course has valid rating data before passing to CourseCard
//                             const enhancedCourse = {
//                               ...convertToCourseData(course),
//                               // Double-check that average_rating is always a valid number
//                               average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
//                               review_count: course.review_count || 0
//                             };
                            
//                             return (
//                               <CourseCard 
//                                 key={course.id} 
//                                 course={enhancedCourse} 
//                                 variant="list" 
//                               />
//                             );
//                           })}
//                         </div>
//                       )}

//                       {/* Load More Button */}
//                       {localPagination.hasMore && (
//                         <div className="text-center mt-12">
//                           <Button
//                             onClick={handleLoadMore}
//                             disabled={loading}
//                             className="min-w-48 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-0 px-8 py-3 font-semibold"
//                           >
//                             {loading ? (
//                               <>
//                                 <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                                 Loading More...
//                               </>
//                             ) : (
//                               <>
//                                 <Rocket className="h-4 w-4 mr-2" />
//                                 Load More Courses
//                               </>
//                             )}
//                           </Button>
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     /* No Results */
//                     <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
//                       <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <Search className="h-10 w-10 text-gray-400" />
//                       </div>
//                       <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
//                       <p className="text-gray-600 max-w-md mx-auto mb-6">
//                         {filters.searchQuery || hasActiveFilters(filters)
//                           ? "Try adjusting your search criteria or browse all courses."
//                           : "No courses available at the moment. Check back soon!"}
//                       </p>
//                       {(filters.searchQuery || hasActiveFilters(filters)) && (
//                         <Button
//                           onClick={resetFilters}
//                           variant="outline"
//                           className="rounded-lg"
//                         >
//                           Reset Filters
//                         </Button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }





































// 'use client';

// import React, { useEffect, useState, useCallback } from 'react';
// import Link from 'next/link';
// import { getCoursesAction } from '@/lib/courses/actions';
// import { getCategoriesAction } from '@/lib/categories/actions';
// import { getTagsAction } from '@/lib/tags/actions';
// import { CategoryNavigation } from '@/components/categories/category-navigation';
// import { CourseFilters } from '@/components/courses/course-filters';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Search, 
//   Filter, 
//   Loader2, 
//   Sparkles, 
//   TrendingUp, 
//   Users, 
//   Star, 
//   Zap,
//   Grid3X3,
//   List,
//   Play,
//   ArrowRight,
//   Rocket,
//   Brain,
//   Code,
//   Palette,
//   Heart,
//   Share2,
//   Eye,
//   Clock,
//   BookOpen
// } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Course } from '@/types/courses';
// import { Header } from '@/components/layout/header';
// import { Footer } from '@/components/layout/footer';
// import { CourseCard } from '@/components/courses/shared-course-card';

// interface CoursesPageProps {
//   searchParams: Promise<{
//     category?: string;
//     search?: string;
//     difficulty?: string;
//     content_type?: string;
//     price_range?: string;
//     min_rating?: string;
//     sort_by?: string;
//   }>;
// }

// // View Toggle Component
// function ViewToggle({ view, onViewChange }: { view: 'grid' | 'list'; onViewChange: (view: 'grid' | 'list') => void }) {
//   return (
//     <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
//       <Button
//         variant={view === 'grid' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('grid')}
//         className={`flex items-center gap-2 ${view === 'grid' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <Grid3X3 className="h-4 w-4" />
//         <span className="hidden sm:inline">Grid</span>
//       </Button>
//       <Button
//         variant={view === 'list' ? 'default' : 'ghost'}
//         size="sm"
//         onClick={() => onViewChange('list')}
//         className={`flex items-center gap-2 ${view === 'list' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
//       >
//         <List className="h-4 w-4" />
//         <span className="hidden sm:inline">List</span>
//       </Button>
//     </div>
//   );
// }

// // Animated Text Slider Component
// function TextSlider() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const slides = [
//     {
//       icon: <Code className="h-12 w-12 text-blue-400" />,
//       title: "Master Modern Tech",
//       description: "Learn cutting-edge technologies from industry experts",
//       gradient: "from-blue-500 to-cyan-500"
//     },
//     {
//       icon: <Brain className="h-12 w-12 text-purple-400" />,
//       title: "Boost Your Career",
//       description: "Gain skills that companies are hiring for right now",
//       gradient: "from-purple-500 to-pink-500"
//     },
//     {
//       icon: <Rocket className="h-12 w-12 text-orange-400" />,
//       title: "Learn at Light Speed",
//       description: "Accelerate your learning with project-based courses",
//       gradient: "from-orange-500 to-red-500"
//     },
//     {
//       icon: <Palette className="h-12 w-12 text-green-400" />,
//       title: "Unlock Creativity",
//       description: "Transform your ideas into reality with practical skills",
//       gradient: "from-green-500 to-teal-500"
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [slides.length]);

//   return (
//     <div className="relative h-48 md:h-56 lg:h-64 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm p-8 border border-white/20">
//       <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
//       <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-xl"></div>
      
//       <div className="relative z-10 h-full flex items-center">
//         <div className="flex-1">
//           <div className="relative h-24 overflow-hidden">
//             {slides.map((slide, index) => (
//               <div
//                 key={index}
//                 className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
//                   index === currentSlide
//                     ? 'opacity-100 translate-x-0'
//                     : index < currentSlide
//                     ? 'opacity-0 -translate-x-full'
//                     : 'opacity-0 translate-x-full'
//                 }`}
//               >
//                 <div className="flex items-center space-x-6">
//                   <div className="flex-shrink-0">
//                     {slide.icon}
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
//                       {slide.title}
//                     </h3>
//                     <p className="text-blue-100 text-lg">
//                       {slide.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="absolute bottom-6 left-8 flex space-x-2 z-10">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             className={`w-2 h-2 rounded-full transition-all ${
//               index === currentSlide
//                 ? 'bg-white w-6'
//                 : 'bg-white/40'
//             }`}
//             onClick={() => setCurrentSlide(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // Enhanced Stats Cards for Dark Background
// function StatsCards({ stats }: { stats: { courses: number; categories: number; featured: number; skills: number } }) {
//   return (
//     <div className="grid grid-cols-2 gap-4">
//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-blue-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.courses}</div>
//             <div className="text-blue-200 text-sm">Courses</div>
//           </div>
//           <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <TrendingUp className="h-6 w-6 text-blue-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-green-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.categories}</div>
//             <div className="text-green-200 text-sm">Categories</div>
//           </div>
//           <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Users className="h-6 w-6 text-green-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-yellow-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.featured}</div>
//             <div className="text-yellow-200 text-sm">Featured</div>
//           </div>
//           <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Star className="h-6 w-6 text-yellow-300" />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-purple-400/40 transition-all group hover:scale-105">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="text-3xl font-bold text-white mb-1">{stats.skills}</div>
//             <div className="text-purple-200 text-sm">Skills</div>
//           </div>
//           <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//             <Zap className="h-6 w-6 text-purple-300" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Animated Gradient Background Component
// function AnimatedGradientBackground({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="relative w-full overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900">
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
//         <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1500"></div>
        
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
//       </div>
      
//       <div className="relative z-10">
//         {children}
//       </div>
//     </div>
//   );
// }

// // Helper function to convert Course type to compatible type for CourseCard
// const convertToCourseData = (course: Course) => {
//   return {
//     id: course.id,
//     slug: course.slug,
//     title: course.title,
//     thumbnail_url: course.thumbnail_url || undefined,
//     short_description: course.short_description || undefined,
//     category_name: course.category_name || undefined,
//     instructor_name: course.instructor_name || undefined,
//     instructor_image: course.instructor_image || undefined,
//     price_cents: course.price_cents || 0,
//     average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
//     review_count: course.review_count || 0,
//     like_count: course.like_count || undefined,
//     share_count: course.share_count || undefined,
//     total_views: course.total_views || undefined,
//     enrolled_students_count: course.enrolled_students_count || undefined,
//     total_video_duration: course.total_video_duration || undefined,
//     total_lessons: course.total_lessons || undefined,
//     is_featured: course.is_featured || false,
//     is_trending: course.is_trending || false
//   };
// };

// // Helper function to check active filters
// function hasActiveFilters(filters: any): boolean {
//   return Object.keys(filters).some(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   });
// }

// // Helper function to count active filters
// function getActiveFilterCount(filters: any): number {
//   return Object.keys(filters).filter(key => {
//     if (key === 'searchQuery') return filters[key] !== '';
//     if (key === 'min_rating') return filters[key] > 0;
//     if (key === 'tags') return filters[key].length > 0;
//     if (key === 'is_featured' || key === 'is_trending') return filters[key];
//     return filters[key] !== '';
//   }).length;
// }

// // Interface for filter state - COMPATIBLE with SearchFilters
// interface FilterState {
//   searchQuery: string;
//   category_slug: string;
//   difficulty: string;
//   content_type: string;
//   price_range: string;
//   min_rating: number;
//   language: string;  // Added missing property
//   tags: string[];
//   is_featured: boolean;
//   is_trending: boolean;
//   sort_by: string;
// }

// // Default filters - COMPATIBLE with SearchFilters
// const defaultFilters: FilterState = {
//   searchQuery: '',
//   category_slug: '',
//   difficulty: '',
//   content_type: '',
//   price_range: '',
//   min_rating: 0,
//   language: '',  // Added missing property
//   tags: [],
//   is_featured: false,
//   is_trending: false,
//   sort_by: 'relevance'
// };

// // Enhanced formatRating function
// const formatRating = (rating: number | undefined | null, reviewCount: number | undefined | null) => {
//   const numericRating = typeof rating === 'number' ? rating : 0;
//   const numericReviewCount = typeof reviewCount === 'number' ? reviewCount : 0;
  
//   if (numericRating === 0) {
//     return {
//       display: "No ratings yet",
//       value: 0,
//       hasReviews: false,
//       showRating: true
//     };
//   }
  
//   if (numericRating > 0) {
//     return {
//       display: `${numericRating.toFixed(1)}`,
//       value: numericRating,
//       hasReviews: numericReviewCount > 0,
//       showRating: true
//     };
//   }
  
//   return {
//     display: "No ratings yet",
//     value: 0,
//     hasReviews: false,
//     showRating: true
//   };
// };

// // Enhanced filterCourses function with proper typing
// const filterCourses = (
//   courses: Course[],
//   filters: FilterState
// ): Course[] => {
//   let filtered = [...courses];
  
//   // Search by title, description, category, or instructor
//   if (filters.searchQuery) {
//     const query = filters.searchQuery.toLowerCase().trim();
//     filtered = filtered.filter(course => 
//       course.title.toLowerCase().includes(query) ||
//       (course.short_description || '').toLowerCase().includes(query) ||
//       (course.category_name || '').toLowerCase().includes(query) ||
//       (course.instructor_name || '').toLowerCase().includes(query)
//     );
//   }
  
//   // Filter by category
//   if (filters.category_slug) {
//     filtered = filtered.filter(course => 
//       course.category_slug === filters.category_slug
//     );
//   }
  
//   // Filter by minimum rating
//   if (filters.min_rating > 0) {
//     filtered = filtered.filter(course => 
//       (course.average_rating || 0) >= filters.min_rating
//     );
//   }
  
//   // Filter by difficulty if the field exists
//   if (filters.difficulty) {
//     filtered = filtered.filter(course => 
//       (course as any).difficulty === filters.difficulty
//     );
//   }
  
//   // Filter by content type if the field exists
//   if (filters.content_type) {
//     filtered = filtered.filter(course => 
//       (course as any).content_type === filters.content_type
//     );
//   }
  
//   // Filter by language if the field exists
//   if (filters.language) {
//     filtered = filtered.filter(course => 
//       (course as any).language === filters.language
//     );
//   }
  
//   // Filter by price range
//   if (filters.price_range) {
//     const priceRanges: Record<string, (price: number) => boolean> = {
//       'free': (price) => price === 0,
//       '0-100': (price) => price > 0 && price <= 10000, // 10000 cents = $100
//       '100-500': (price) => price > 10000 && price <= 50000, // 50000 cents = $500
//       '500+': (price) => price > 50000,
//     };
    
//     const priceCheck = priceRanges[filters.price_range];
//     if (priceCheck) {
//       filtered = filtered.filter(course => {
//         const priceInDollars = (course.price_cents || 0) / 100;
//         return priceCheck(priceInDollars);
//       });
//     }
//   }
  
//   // Filter by featured/trending
//   if (filters.is_featured) {
//     filtered = filtered.filter(course => course.is_featured);
//   }
  
//   if (filters.is_trending) {
//     filtered = filtered.filter(course => course.is_trending);
//   }
  
//   // Filter by tags
//   if (filters.tags.length > 0) {
//     filtered = filtered.filter(course => {
//       if (!course.tags) return false;
      
//       let courseTagValues: string[] = [];
      
//       if (Array.isArray(course.tags)) {
//         courseTagValues = course.tags.map((tag: any) => {
//           if (typeof tag === 'string') return tag.toLowerCase();
//           if (tag && typeof tag === 'object') {
//             return tag.name?.toLowerCase() || tag.slug?.toLowerCase() || '';
//           }
//           return '';
//         }).filter(Boolean);
//       }
      
//       return filters.tags.some(filterTag => 
//         courseTagValues.includes(filterTag.toLowerCase())
//       );
//     });
//   }
  
//   // Sort courses
//   if (filtered.length > 0) {
//     switch (filters.sort_by) {
//       case 'rating':
//         filtered.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));
//         break;
//       case 'price_low':
//         filtered.sort((a, b) => (a.price_cents || 0) - (b.price_cents || 0));
//         break;
//       case 'price_high':
//         filtered.sort((a, b) => (b.price_cents || 0) - (a.price_cents || 0));
//         break;
//       case 'newest':
//         filtered.sort((a, b) => {
//           const dateA = new Date((a as any).created_at || 0).getTime();
//           const dateB = new Date((b as any).created_at || 0).getTime();
//           return dateB - dateA;
//         });
//         break;
//       case 'popular':
//         filtered.sort((a, b) => (b.enrolled_students_count || 0) - (a.enrolled_students_count || 0));
//         break;
//       default:
//         // Default relevance sorting (by featured, then rating)
//         filtered.sort((a, b) => {
//           if (a.is_featured && !b.is_featured) return -1;
//           if (!a.is_featured && b.is_featured) return 1;
//           return (b.average_rating || 0) - (a.average_rating || 0);
//         });
//         break;
//     }
//   }
  
//   return filtered;
// };

// // Main Component
// export default function CoursesPage({ searchParams }: CoursesPageProps) {
//   const resolvedSearchParams = React.use(searchParams);
  
//   const [initialCourses, setInitialCourses] = useState<Course[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [availableTags, setAvailableTags] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [view, setView] = useState<'grid' | 'list'>('grid');
  
//   // Local filter state - COMPATIBLE with SearchFilters
//   const [filters, setFilters] = useState<FilterState>(defaultFilters);
//   const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
//   const [pagination, setPagination] = useState({
//     total: 0,
//     limit: 12,
//     offset: 0,
//     hasMore: false
//   });

//   // Update filters function
//   const updateFilters = useCallback((newFilters: Partial<FilterState>) => {
//     setFilters(prev => ({ ...prev, ...newFilters }));
//     // Reset pagination when filters change
//     setPagination(prev => ({ ...prev, offset: 0 }));
//   }, []);

//   // Reset filters function
//   const resetFilters = useCallback(() => {
//     setFilters(defaultFilters);
//     setSearchQuery('');
//     setPagination(prev => ({ ...prev, offset: 0 }));
//   }, []);

//   // Fetch initial data
//   useEffect(() => {
//     async function fetchInitialData() {
//       try {
//         setIsLoading(true);
        
//         const [coursesResult, categoriesResult, tagsResult] = await Promise.all([
//           getCoursesAction({
//             is_published: true,
//             category_slug: resolvedSearchParams.category,
//             limit: 100,
//             include_reviews: true
//           }),
//           getCategoriesAction(),
//           getTagsAction()
//         ]);

//         const coursesData = coursesResult.courses || [];
        
//         // Ensure all courses have valid rating data
//         const coursesWithValidRatings = coursesData.map((course: any) => ({
//           ...course,
//           average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
//           review_count: course.review_count || 0
//         }));

//         setInitialCourses(coursesWithValidRatings);
//         setCategories(categoriesResult.categories || []);
//         setAvailableTags(tagsResult.tags || []);
        
//       } catch (error) {
//         console.error('Error fetching initial data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchInitialData();
//   }, [resolvedSearchParams.category]);

//   // Apply filters to courses whenever filters or initialCourses change
//   useEffect(() => {
//     if (initialCourses.length > 0) {
//       console.log('🔍 Applying filters:', filters);
      
//       try {
//         // Apply filters
//         const filtered = filterCourses(initialCourses, filters);
        
//         console.log('✅ Filtered courses count:', filtered.length);
        
//         // Apply pagination
//         const paginated = filtered.slice(
//           pagination.offset,
//           pagination.offset + pagination.limit
//         );
        
//         setFilteredCourses(paginated);
//         setPagination(prev => ({
//           ...prev,
//           total: filtered.length,
//           hasMore: filtered.length > prev.offset + prev.limit
//         }));
//       } catch (error) {
//         console.error('❌ Error filtering courses:', error);
//         // Fallback to showing all courses if filtering fails
//         const fallbackCourses = initialCourses.slice(
//           pagination.offset,
//           pagination.offset + pagination.limit
//         );
//         setFilteredCourses(fallbackCourses);
//         setPagination(prev => ({
//           ...prev,
//           total: initialCourses.length,
//           hasMore: initialCourses.length > prev.offset + prev.limit
//         }));
//       }
//     }
//   }, [filters, initialCourses, pagination.offset]);

//   // Initialize with URL params
//   useEffect(() => {
//     const urlFilters: Partial<FilterState> = {
//       searchQuery: resolvedSearchParams.search || '',
//       category_slug: resolvedSearchParams.category || '',
//       difficulty: resolvedSearchParams.difficulty || '',
//       content_type: resolvedSearchParams.content_type || '',
//       price_range: resolvedSearchParams.price_range || '',
//       min_rating: parseFloat(resolvedSearchParams.min_rating || '0'),
//       language: '', // Initialize language from URL if available
//       sort_by: resolvedSearchParams.sort_by || 'relevance'
//     };
    
//     if (Object.values(urlFilters).some(value => 
//       value !== '' && value !== 0 && value !== 'relevance'
//     )) {
//       updateFilters(urlFilters);
//       if (urlFilters.searchQuery) {
//         setSearchQuery(urlFilters.searchQuery);
//       }
//     }
//   }, [resolvedSearchParams, updateFilters]);

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     updateFilters({ searchQuery: searchQuery });
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       updateFilters({ searchQuery: searchQuery });
//     }
//   };

//   const handleLoadMore = () => {
//     setPagination(prev => {
//       const newOffset = prev.offset + prev.limit;
//       return {
//         ...prev,
//         offset: newOffset,
//         hasMore: prev.total > newOffset
//       };
//     });
//   };

//   // Calculate stats from initial courses
//   const totalCourses = initialCourses.length;
//   const totalCategories = categories.length;
//   const totalTags = availableTags.length;
//   const featuredCourses = initialCourses.filter(course => course.is_featured).length;

//   const stats = {
//     courses: totalCourses,
//     categories: totalCategories,
//     featured: featuredCourses,
//     skills: totalTags
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />
//         <div className="container mx-auto px-4 py-8">
//           <div className="max-w-7xl mx-auto text-center py-20">
//             <div className="relative inline-block">
//               <Loader2 className="h-12 w-12 animate-spin mx-auto mb-6 text-blue-600" />
//               <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
//             </div>
//             <p className="text-gray-600 text-lg font-medium">Loading amazing courses...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
      
//       {/* Hero Section */}
//       <AnimatedGradientBackground>
//         <div className="w-full px-4 py-16">
//           <div className="w-full mx-auto">
//             <div className="mb-12">
//               <div className="text-center mb-8">
//                 <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
//                   Explore Courses
//                 </h1>
//                 <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
//                   Discover your next learning adventure in our comprehensive learning platform
//                 </p>
//               </div>

//               <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
//                 <div className="lg:col-span-1">
//                   <TextSlider />
//                 </div>

//                 <div className="lg:col-span-1">
//                   <StatsCards stats={stats} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </AnimatedGradientBackground>

//       {/* Search Bar */}
//       <div className="w-full bg-white border-b border-gray-200 py-8 px-4">
//         <div className="w-full max-w-7xl mx-auto">
//           <div className="text-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Course</h2>
//             <p className="text-gray-600">Search from thousands of courses with detailed ratings and reviews</p>
//           </div>
          
//           <form onSubmit={handleSearchSubmit} className="relative max-w-4xl mx-auto">
//             <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
//             <Input
//               type="text"
//               placeholder="Search courses by title, instructor, or technology... (Press Enter to search)"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="w-full pl-16 pr-6 py-6 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition text-gray-900 placeholder-gray-500 shadow-lg hover:shadow-xl"
//             />
//             <Button 
//               type="submit"
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-5 rounded-xl font-semibold"
//             >
//               Search
//             </Button>
//           </form>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="w-full bg-gray-50 min-h-screen">
//         <div className="w-full px-4 py-8">
//           <div className="w-full mx-auto">
//             {/* Mobile Filter Toggle */}
//             <div className="lg:hidden mb-6">
//               <Button
//                 onClick={() => setShowFilters(!showFilters)}
//                 variant="outline"
//                 className="w-full flex items-center justify-center gap-2 py-3 text-lg"
//               >
//                 <Filter size={20} />
//                 {showFilters ? 'Hide Filters' : 'Show Filters'}
//                 {hasActiveFilters(filters) && (
//                   <Badge variant="secondary" className="ml-2">
//                     {getActiveFilterCount(filters)}
//                   </Badge>
//                 )}
//               </Button>
//             </div>

//             {/* Full Width Grid Layout */}
//             <div className="w-full">
//               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//                 {/* Sidebar Filters */}
//                 <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:col-span-3 space-y-6`}>
//                   {/* Categories Card */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Sparkles className="h-5 w-5 text-blue-600" />
//                         Categories
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-0">
//                       <div className="max-h-96 overflow-y-auto">
//                         <CategoryNavigation 
//                           showCourseCounts={true}
//                           className="p-4"
//                           currentCategory={filters.category_slug}
//                         />
//                       </div>
//                     </CardContent>
//                   </Card>

//                   {/* Advanced Filters */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Filter className="h-5 w-5 text-purple-600" />
//                         Advanced Filters
//                       </CardTitle>
//                       <CardDescription>
//                         Filter by rating, social metrics, and more
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       {/* Cast filters to SearchFilters type to satisfy TypeScript */}
//                       <CourseFilters
//                         filters={filters as any} // Type assertion to bypass TypeScript check
//                         onFiltersChange={updateFilters}
//                         onReset={resetFilters}
//                         availableTags={availableTags}
//                       />
//                     </CardContent>
//                   </Card>

//                   {/* Social Metrics Info */}
//                   <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
//                     <CardHeader className="pb-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
//                       <CardTitle className="flex items-center gap-2 text-gray-900">
//                         <Heart className="h-5 w-5 text-green-600" />
//                         Social Engagement
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-4">
//                       <div className="space-y-3">
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                             <span>Rating & Reviews</span>
//                           </div>
//                           <Badge variant="outline" className="text-xs">
//                             Real user feedback
//                           </Badge>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Heart className="h-4 w-4 text-red-500 fill-red-500" />
//                             <span>Likes</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Course popularity</span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Share2 className="h-4 w-4 text-blue-500" />
//                             <span>Shares</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Social sharing</span>
//                         </div>
//                         <div className="flex items-center justify-between text-sm">
//                           <div className="flex items-center gap-2">
//                             <Eye className="h-4 w-4 text-purple-500" />
//                             <span>Views</span>
//                           </div>
//                           <span className="text-xs text-gray-500">Course visibility</span>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>

//                 {/* Main Courses Area */}
//                 <div className="lg:col-span-9">
//                   {/* Results Header */}
//                   <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
//                     <div className="flex-1">
//                       <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent mb-2">
//                         {filters.category_slug ? (
//                           <>
//                             <Sparkles className="h-6 w-6 text-blue-600 inline mr-2" />
//                             {categories.find(cat => cat.slug === filters.category_slug)?.name}
//                           </>
//                         ) : filters.searchQuery ? (
//                           <>Search: "{filters.searchQuery}"</>
//                         ) : (
//                           <>All Courses</>
//                         )}
//                       </h2>
//                       <p className="text-gray-600 flex items-center gap-2">
//                         <span className="font-semibold text-gray-900">{filteredCourses.length}</span>
//                         {filteredCourses.length === 1 ? ' course' : ' courses'} found
//                         {hasActiveFilters(filters) && (
//                           <span className="text-blue-600 ml-2">• Filtered</span>
//                         )}
//                       </p>
//                     </div>

//                     <div className="flex items-center gap-4">
//                       <ViewToggle view={view} onViewChange={setView} />
                      
//                       {hasActiveFilters(filters) && (
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={resetFilters}
//                           className="rounded-lg border-gray-300 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
//                         >
//                           Clear All
//                         </Button>
//                       )}
//                     </div>
//                   </div>

//                   {/* Courses Grid/List */}
//                   {filteredCourses.length > 0 ? (
//                     <>
//                       {view === 'grid' ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                           {filteredCourses.map((course) => {
//                             const enhancedCourse = {
//                               ...convertToCourseData(course),
//                               average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
//                               review_count: course.review_count || 0
//                             };
                            
//                             return (
//                               <CourseCard 
//                                 key={course.id} 
//                                 course={enhancedCourse} 
//                                 variant="grid" 
//                               />
//                             );
//                           })}
//                         </div>
//                       ) : (
//                         <div className="space-y-4">
//                           {filteredCourses.map((course) => {
//                             const enhancedCourse = {
//                               ...convertToCourseData(course),
//                               average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
//                               review_count: course.review_count || 0
//                             };
                            
//                             return (
//                               <CourseCard 
//                                 key={course.id} 
//                                 course={enhancedCourse} 
//                                 variant="list" 
//                               />
//                             );
//                           })}
//                         </div>
//                       )}

//                       {/* Load More Button */}
//                       {pagination.hasMore && (
//                         <div className="text-center mt-12">
//                           <Button
//                             onClick={handleLoadMore}
//                             className="min-w-48 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-0 px-8 py-3 font-semibold"
//                           >
//                             <Rocket className="h-4 w-4 mr-2" />
//                             Load More Courses
//                           </Button>
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     /* No Results */
//                     <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
//                       <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <Search className="h-10 w-10 text-gray-400" />
//                       </div>
//                       <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
//                       <p className="text-gray-600 max-w-md mx-auto mb-6">
//                         {filters.searchQuery || hasActiveFilters(filters)
//                           ? "Try adjusting your search criteria or browse all courses."
//                           : "No courses available at the moment. Check back soon!"}
//                       </p>
//                       {(filters.searchQuery || hasActiveFilters(filters)) && (
//                         <Button
//                           onClick={resetFilters}
//                           variant="outline"
//                           className="rounded-lg"
//                         >
//                           Reset Filters
//                         </Button>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }



























// // /app/courses/page.tsx

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { getCoursesAction } from '@/lib/courses/actions';
import { getCategoriesAction } from '@/lib/categories/actions';
import { getTagsAction } from '@/lib/tags/actions';
import { CategoryNavigation } from '@/components/categories/category-navigation';
import { CourseFilters } from '@/components/courses/course-filters';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Loader2, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Star, 
  Zap,
  Grid3X3,
  List,
  Play,
  ArrowRight,
  Rocket,
  Brain,
  Code,
  Palette,
  Heart,
  Share2,
  Eye,
  Clock,
  BookOpen
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Course } from '@/types/courses';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CourseCard } from '@/components/courses/shared-course-card';

interface CoursesPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    difficulty?: string;
    content_type?: string;
    price_range?: string;
    min_rating?: string;
    sort_by?: string;
  }>;
}

// View Toggle Component
function ViewToggle({ view, onViewChange }: { view: 'grid' | 'list'; onViewChange: (view: 'grid' | 'list') => void }) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
      <Button
        variant={view === 'grid' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('grid')}
        className={`flex items-center gap-2 ${view === 'grid' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
      >
        <Grid3X3 className="h-4 w-4" />
        <span className="hidden sm:inline">Grid</span>
      </Button>
      <Button
        variant={view === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('list')}
        className={`flex items-center gap-2 ${view === 'list' ? 'bg-gray-900 text-white shadow-sm hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900'}`}
      >
        <List className="h-4 w-4" />
        <span className="hidden sm:inline">List</span>
      </Button>
    </div>
  );
}

// Animated Text Slider Component
function TextSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: <Code className="h-12 w-12 text-blue-400" />,
      title: "Master Modern Tech",
      description: "Learn cutting-edge technologies from industry experts",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Brain className="h-12 w-12 text-purple-400" />,
      title: "Boost Your Career",
      description: "Gain skills that companies are hiring for right now",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Rocket className="h-12 w-12 text-orange-400" />,
      title: "Learn at Light Speed",
      description: "Accelerate your learning with project-based courses",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Palette className="h-12 w-12 text-green-400" />,
      title: "Unlock Creativity",
      description: "Transform your ideas into reality with practical skills",
      gradient: "from-green-500 to-teal-500"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-48 md:h-56 lg:h-64 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm p-8 border border-white/20">
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-xl"></div>
      
      <div className="relative z-10 h-full flex items-center">
        <div className="flex-1">
          <div className="relative h-24 overflow-hidden">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentSlide
                    ? 'opacity-100 translate-x-0'
                    : index < currentSlide
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    {slide.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {slide.title}
                    </h3>
                    <p className="text-blue-100 text-lg">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-8 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-6'
                : 'bg-white/40'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

// Enhanced Stats Cards for Dark Background
function StatsCards({ stats }: { stats: { courses: number; categories: number; featured: number; skills: number } }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-blue-400/40 transition-all group hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-white mb-1">{stats.courses}</div>
            <div className="text-blue-200 text-sm">Courses</div>
          </div>
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <TrendingUp className="h-6 w-6 text-blue-300" />
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-green-400/40 transition-all group hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-white mb-1">{stats.categories}</div>
            <div className="text-green-200 text-sm">Categories</div>
          </div>
          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Users className="h-6 w-6 text-green-300" />
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-yellow-400/40 transition-all group hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-white mb-1">{stats.featured}</div>
            <div className="text-yellow-200 text-sm">Featured</div>
          </div>
          <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Star className="h-6 w-6 text-yellow-300" />
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-purple-400/40 transition-all group hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-white mb-1">{stats.skills}</div>
            <div className="text-purple-200 text-sm">Skills</div>
          </div>
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Zap className="h-6 w-6 text-purple-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Animated Gradient Background Component
function AnimatedGradientBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1500"></div>
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Helper function to convert Course type to compatible type for CourseCard
const convertToCourseData = (course: Course) => {
  return {
    id: course.id,
    slug: course.slug,
    title: course.title,
    thumbnail_url: course.thumbnail_url || undefined,
    short_description: course.short_description || undefined,
    category_name: course.category_name || undefined,
    instructor_name: course.instructor_name || undefined,
    instructor_image: course.instructor_image || undefined,
    price_cents: course.price_cents || 0,
    average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
    review_count: course.review_count || 0,
    like_count: course.like_count || undefined,
    share_count: course.share_count || undefined,
    total_views: course.total_views || undefined,
    enrolled_students_count: course.enrolled_students_count || undefined,
    total_video_duration: course.total_video_duration || undefined,
    total_lessons: course.total_lessons || undefined,
    is_featured: course.is_featured || false,
    is_trending: course.is_trending || false
  };
};

// Helper function to check active filters
function hasActiveFilters(filters: any): boolean {
  return Object.keys(filters).some(key => {
    if (key === 'searchQuery') return filters[key] !== '';
    if (key === 'min_rating') return filters[key] > 0;
    if (key === 'tags') return filters[key].length > 0;
    if (key === 'is_featured' || key === 'is_trending') return filters[key];
    return filters[key] !== '';
  });
}

// Helper function to count active filters
function getActiveFilterCount(filters: any): number {
  return Object.keys(filters).filter(key => {
    if (key === 'searchQuery') return filters[key] !== '';
    if (key === 'min_rating') return filters[key] > 0;
    if (key === 'tags') return filters[key].length > 0;
    if (key === 'is_featured' || key === 'is_trending') return filters[key];
    return filters[key] !== '';
  }).length;
}

// Interface for filter state - COMPATIBLE with SearchFilters
interface FilterState {
  searchQuery: string;
  category_slug: string;
  difficulty: string;
  content_type: string;
  price_range: string;
  min_rating: number;
  language: string;  // Added missing property
  tags: string[];
  is_featured: boolean;
  is_trending: boolean;
  sort_by: string;
}

// Default filters - COMPATIBLE with SearchFilters
const defaultFilters: FilterState = {
  searchQuery: '',
  category_slug: '',
  difficulty: '',
  content_type: '',
  price_range: '',
  min_rating: 0,
  language: '',  // Added missing property
  tags: [],
  is_featured: false,
  is_trending: false,
  sort_by: 'relevance'
};

// Enhanced formatRating function
const formatRating = (rating: number | undefined | null, reviewCount: number | undefined | null) => {
  const numericRating = typeof rating === 'number' ? rating : 0;
  const numericReviewCount = typeof reviewCount === 'number' ? reviewCount : 0;
  
  if (numericRating === 0) {
    return {
      display: "No ratings yet",
      value: 0,
      hasReviews: false,
      showRating: true
    };
  }
  
  if (numericRating > 0) {
    return {
      display: `${numericRating.toFixed(1)}`,
      value: numericRating,
      hasReviews: numericReviewCount > 0,
      showRating: true
    };
  }
  
  return {
    display: "No ratings yet",
    value: 0,
    hasReviews: false,
    showRating: true
  };
};

// Enhanced filterCourses function with proper typing
const filterCourses = (
  courses: Course[],
  filters: FilterState
): Course[] => {
  let filtered = [...courses];
  
  // Search by title, description, category, or instructor
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase().trim();
    filtered = filtered.filter(course => 
      course.title.toLowerCase().includes(query) ||
      (course.short_description || '').toLowerCase().includes(query) ||
      (course.category_name || '').toLowerCase().includes(query) ||
      (course.instructor_name || '').toLowerCase().includes(query)
    );
  }
  
  // Filter by category
  if (filters.category_slug) {
    filtered = filtered.filter(course => 
      course.category_slug === filters.category_slug
    );
  }
  
  // Filter by minimum rating
  if (filters.min_rating > 0) {
    filtered = filtered.filter(course => 
      (course.average_rating || 0) >= filters.min_rating
    );
  }
  
  // Filter by difficulty if the field exists
  if (filters.difficulty) {
    filtered = filtered.filter(course => 
      (course as any).difficulty === filters.difficulty
    );
  }
  
  // Filter by content type if the field exists
  if (filters.content_type) {
    filtered = filtered.filter(course => 
      (course as any).content_type === filters.content_type
    );
  }
  
  // Filter by language if the field exists
  if (filters.language) {
    filtered = filtered.filter(course => 
      (course as any).language === filters.language
    );
  }
  
  // Filter by price range
  if (filters.price_range) {
    const priceRanges: Record<string, (price: number) => boolean> = {
      'free': (price) => price === 0,
      '0-100': (price) => price > 0 && price <= 10000, // 10000 cents = $100
      '100-500': (price) => price > 10000 && price <= 50000, // 50000 cents = $500
      '500+': (price) => price > 50000,
    };
    
    const priceCheck = priceRanges[filters.price_range];
    if (priceCheck) {
      filtered = filtered.filter(course => {
        const priceInDollars = (course.price_cents || 0) / 100;
        return priceCheck(priceInDollars);
      });
    }
  }
  
  // Filter by featured/trending
  if (filters.is_featured) {
    filtered = filtered.filter(course => course.is_featured);
  }
  
  if (filters.is_trending) {
    filtered = filtered.filter(course => course.is_trending);
  }
  
  // Filter by tags
  if (filters.tags.length > 0) {
    filtered = filtered.filter(course => {
      if (!course.tags) return false;
      
      let courseTagValues: string[] = [];
      
      if (Array.isArray(course.tags)) {
        courseTagValues = course.tags.map((tag: any) => {
          if (typeof tag === 'string') return tag.toLowerCase();
          if (tag && typeof tag === 'object') {
            return tag.name?.toLowerCase() || tag.slug?.toLowerCase() || '';
          }
          return '';
        }).filter(Boolean);
      }
      
      return filters.tags.some(filterTag => 
        courseTagValues.includes(filterTag.toLowerCase())
      );
    });
  }
  
  // Sort courses
  if (filtered.length > 0) {
    switch (filters.sort_by) {
      case 'rating':
        filtered.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));
        break;
      case 'price_low':
        filtered.sort((a, b) => (a.price_cents || 0) - (b.price_cents || 0));
        break;
      case 'price_high':
        filtered.sort((a, b) => (b.price_cents || 0) - (a.price_cents || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => {
          const dateA = new Date((a as any).created_at || 0).getTime();
          const dateB = new Date((b as any).created_at || 0).getTime();
          return dateB - dateA;
        });
        break;
      case 'popular':
        filtered.sort((a, b) => (b.enrolled_students_count || 0) - (a.enrolled_students_count || 0));
        break;
      default:
        // Default relevance sorting (by featured, then rating)
        filtered.sort((a, b) => {
          if (a.is_featured && !b.is_featured) return -1;
          if (!a.is_featured && b.is_featured) return 1;
          return (b.average_rating || 0) - (a.average_rating || 0);
        });
        break;
    }
  }
  
  return filtered;
};

// Main Component
export default function CoursesPage({ searchParams }: CoursesPageProps) {
  const resolvedSearchParams = React.use(searchParams);
  
  const [initialCourses, setInitialCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [availableTags, setAvailableTags] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  
  // Local filter state - COMPATIBLE with SearchFilters
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 12,
    offset: 0,
    hasMore: false
  });

  // Update filters function
  const updateFilters = useCallback((newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    // Reset pagination when filters change
    setPagination(prev => ({ ...prev, offset: 0 }));
  }, []);

  // Reset filters function
  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
    setSearchQuery('');
    setPagination(prev => ({ ...prev, offset: 0 }));
  }, []);



  // Fetch initial data
  useEffect(() => {
  async function fetchInitialData() {
    try {
      setIsLoading(true);
      
      console.log('🚀 Fetching initial data for homepage...');
      
      const [coursesResult, categoriesResult, tagsResult] = await Promise.all([
        getCoursesAction({
          is_published: true,
          category_slug: resolvedSearchParams.category,
          limit: 100,
          include_reviews: true
        }),
        getCategoriesAction(),
        getTagsAction()
      ]);

      console.log('📦 Courses result:', {
        success: coursesResult.success,
        count: coursesResult.courses?.length,
        firstCourse: coursesResult.courses?.[0]
      });

      const coursesData = coursesResult.courses || [];
      
      // DEBUG: Log what we're getting
      console.log('🔍 Raw course data check:');
      coursesData.slice(0, 3).forEach((course, index) => {
        console.log(`Course ${index + 1}:`, {
          title: course.title,
          enrolled_students_count: course.enrolled_students_count,
          type: typeof course.enrolled_students_count,
          allKeys: Object.keys(course).filter(k => k.includes('enroll') || k.includes('student'))
        });
      });

      // Ensure all courses have valid rating data
      const coursesWithValidRatings = coursesData.map((course: any) => {
        const enhancedCourse = {
          ...course,
          average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
          review_count: course.review_count || 0,
          // Force check enrollment count
          enrolled_students_count: course.enrolled_students_count || 0
        };
        
        console.log(`📊 Course "${course.title}" enrollment:`, enhancedCourse.enrolled_students_count);
        return enhancedCourse;
      });

      setInitialCourses(coursesWithValidRatings);
      setCategories(categoriesResult.categories || []);
      setAvailableTags(tagsResult.tags || []);
      
      console.log('✅ Data loaded successfully');
      
    } catch (error) {
      console.error('❌ Error fetching initial data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  fetchInitialData();
}, [resolvedSearchParams.category]);
//   useEffect(() => {
//     async function fetchInitialData() {
//       try {
//         setIsLoading(true);
        
//         const [coursesResult, categoriesResult, tagsResult] = await Promise.all([
//           getCoursesAction({
//             is_published: true,
//             category_slug: resolvedSearchParams.category,
//             limit: 100,
//             include_reviews: true
//           }),
//           getCategoriesAction(),
//           getTagsAction()
//         ]);

//         const coursesData = coursesResult.courses || [];
        
//         // Ensure all courses have valid rating data
//         const coursesWithValidRatings = coursesData.map((course: any) => ({
//           ...course,
//           average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
//           review_count: course.review_count || 0
//         }));

//         setInitialCourses(coursesWithValidRatings);
//         setCategories(categoriesResult.categories || []);
//         setAvailableTags(tagsResult.tags || []);
        
//       } catch (error) {
//         console.error('Error fetching initial data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchInitialData();
//   }, [resolvedSearchParams.category]);



  // Apply filters to courses whenever filters or initialCourses change
  useEffect(() => {
    if (initialCourses.length > 0) {
      console.log('🔍 Applying filters:', filters);
      
      try {
        // Apply filters
        const filtered = filterCourses(initialCourses, filters);
        
        console.log('✅ Filtered courses count:', filtered.length);
        
        // Apply pagination
        const paginated = filtered.slice(
          pagination.offset,
          pagination.offset + pagination.limit
        );
        
        setFilteredCourses(paginated);
        setPagination(prev => ({
          ...prev,
          total: filtered.length,
          hasMore: filtered.length > prev.offset + prev.limit
        }));
      } catch (error) {
        console.error('❌ Error filtering courses:', error);
        // Fallback to showing all courses if filtering fails
        const fallbackCourses = initialCourses.slice(
          pagination.offset,
          pagination.offset + pagination.limit
        );
        setFilteredCourses(fallbackCourses);
        setPagination(prev => ({
          ...prev,
          total: initialCourses.length,
          hasMore: initialCourses.length > prev.offset + prev.limit
        }));
      }
    }
  }, [filters, initialCourses, pagination.offset]);

  // Initialize with URL params
  useEffect(() => {
    const urlFilters: Partial<FilterState> = {
      searchQuery: resolvedSearchParams.search || '',
      category_slug: resolvedSearchParams.category || '',
      difficulty: resolvedSearchParams.difficulty || '',
      content_type: resolvedSearchParams.content_type || '',
      price_range: resolvedSearchParams.price_range || '',
      min_rating: parseFloat(resolvedSearchParams.min_rating || '0'),
      language: '', // Initialize language from URL if available
      sort_by: resolvedSearchParams.sort_by || 'relevance'
    };
    
    if (Object.values(urlFilters).some(value => 
      value !== '' && value !== 0 && value !== 'relevance'
    )) {
      updateFilters(urlFilters);
      if (urlFilters.searchQuery) {
        setSearchQuery(urlFilters.searchQuery);
      }
    }
  }, [resolvedSearchParams, updateFilters]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ searchQuery: searchQuery });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      updateFilters({ searchQuery: searchQuery });
    }
  };

  const handleLoadMore = () => {
    setPagination(prev => {
      const newOffset = prev.offset + prev.limit;
      return {
        ...prev,
        offset: newOffset,
        hasMore: prev.total > newOffset
      };
    });
  };

  // Calculate stats from initial courses
  const totalCourses = initialCourses.length;
  const totalCategories = categories.length;
  const totalTags = availableTags.length;
  const featuredCourses = initialCourses.filter(course => course.is_featured).length;

  const stats = {
    courses: totalCourses,
    categories: totalCategories,
    featured: featuredCourses,
    skills: totalTags
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto text-center py-20">
            <div className="relative inline-block">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-6 text-blue-600" />
              <Sparkles className="h-6 w-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <p className="text-gray-600 text-lg font-medium">Loading amazing courses...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <AnimatedGradientBackground>
        <div className="w-full px-4 py-16">
          <div className="w-full mx-auto">
            <div className="mb-12">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Explore Courses
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                  Discover your next learning adventure in our comprehensive learning platform
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                <div className="lg:col-span-1">
                  <TextSlider />
                </div>

                <div className="lg:col-span-1">
                  <StatsCards stats={stats} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedGradientBackground>

      {/* Search Bar */}
      <div className="w-full bg-white border-b border-gray-200 py-8 px-4">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Course</h2>
            <p className="text-gray-600">Search from thousands of courses with detailed ratings and reviews</p>
          </div>
          
          <form onSubmit={handleSearchSubmit} className="relative max-w-4xl mx-auto">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            <Input
              type="text"
              placeholder="Search courses by title, instructor, or technology... (Press Enter to search)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-16 pr-6 py-6 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition text-gray-900 placeholder-gray-500 shadow-lg hover:shadow-xl"
            />
            <Button 
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-5 rounded-xl font-semibold"
            >
              Search
            </Button>
          </form>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full bg-gray-50 min-h-screen">
        <div className="w-full px-4 py-8">
          <div className="w-full mx-auto">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-3 text-lg"
              >
                <Filter size={20} />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
                {hasActiveFilters(filters) && (
                  <Badge variant="secondary" className="ml-2">
                    {getActiveFilterCount(filters)}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Full Width Grid Layout */}
            <div className="w-full">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar Filters */}
                <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:col-span-3 space-y-6`}>
                  {/* Categories Card */}
                  <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
                    <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                      <CardTitle className="flex items-center gap-2 text-gray-900">
                        <Sparkles className="h-5 w-5 text-blue-600" />
                        Categories
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="max-h-96 overflow-y-auto">
                        <CategoryNavigation 
                          showCourseCounts={true}
                          className="p-4"
                          currentCategory={filters.category_slug}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Advanced Filters */}
                  <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
                    <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                      <CardTitle className="flex items-center gap-2 text-gray-900">
                        <Filter className="h-5 w-5 text-purple-600" />
                        Advanced Filters
                      </CardTitle>
                      <CardDescription>
                        Filter by rating, social metrics, and more
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4">
                      {/* Cast filters to SearchFilters type to satisfy TypeScript */}
                      <CourseFilters
                        filters={filters as any} // Type assertion to bypass TypeScript check
                        onFiltersChange={updateFilters}
                        onReset={resetFilters}
                        availableTags={availableTags}
                      />
                    </CardContent>
                  </Card>

                  {/* Social Metrics Info */}
                  <Card className="border-0 shadow-lg rounded-2xl bg-white overflow-hidden border border-gray-200">
                    <CardHeader className="pb-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                      <CardTitle className="flex items-center gap-2 text-gray-900">
                        <Heart className="h-5 w-5 text-green-600" />
                        Social Engagement
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>Rating & Reviews</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            Real user feedback
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                            <span>Likes</span>
                          </div>
                          <span className="text-xs text-gray-500">Course popularity</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Share2 className="h-4 w-4 text-blue-500" />
                            <span>Shares</span>
                          </div>
                          <span className="text-xs text-gray-500">Social sharing</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4 text-purple-500" />
                            <span>Views</span>
                          </div>
                          <span className="text-xs text-gray-500">Course visibility</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Main Courses Area */}
                <div className="lg:col-span-9">
                  {/* Results Header */}
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent mb-2">
                        {filters.category_slug ? (
                          <>
                            <Sparkles className="h-6 w-6 text-blue-600 inline mr-2" />
                            {categories.find(cat => cat.slug === filters.category_slug)?.name}
                          </>
                        ) : filters.searchQuery ? (
                          <>Search: "{filters.searchQuery}"</>
                        ) : (
                          <>All Courses</>
                        )}
                      </h2>
                      <p className="text-gray-600 flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{filteredCourses.length}</span>
                        {filteredCourses.length === 1 ? ' course' : ' courses'} found
                        {hasActiveFilters(filters) && (
                          <span className="text-blue-600 ml-2">• Filtered</span>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <ViewToggle view={view} onViewChange={setView} />
                      
                      {hasActiveFilters(filters) && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={resetFilters}
                          className="rounded-lg border-gray-300 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                        >
                          Clear All
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Courses Grid/List */}
                  {filteredCourses.length > 0 ? (
                    <>
                      {view === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                          {filteredCourses.map((course) => {
                            const enhancedCourse = {
                              ...convertToCourseData(course),
                              average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
                              review_count: course.review_count || 0
                            };
                            
                            return (
                              <CourseCard 
                                key={course.id} 
                                course={enhancedCourse} 
                                variant="grid" 
                              />
                            );
                          })}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {filteredCourses.map((course) => {
                            const enhancedCourse = {
                              ...convertToCourseData(course),
                              average_rating: typeof course.average_rating === 'number' ? course.average_rating : 0,
                              review_count: course.review_count || 0
                            };
                            
                            return (
                              <CourseCard 
                                key={course.id} 
                                course={enhancedCourse} 
                                variant="list" 
                              />
                            );
                          })}
                        </div>
                      )}

                      {/* Load More Button */}
                      {pagination.hasMore && (
                        <div className="text-center mt-12">
                          <Button
                            onClick={handleLoadMore}
                            className="min-w-48 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-0 px-8 py-3 font-semibold"
                          >
                            <Rocket className="h-4 w-4 mr-2" />
                            Load More Courses
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    /* No Results */
                    <div className="text-center py-16 rounded-2xl bg-gray-50 border border-gray-200">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="h-10 w-10 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
                      <p className="text-gray-600 max-w-md mx-auto mb-6">
                        {filters.searchQuery || hasActiveFilters(filters)
                          ? "Try adjusting your search criteria or browse all courses."
                          : "No courses available at the moment. Check back soon!"}
                      </p>
                      {(filters.searchQuery || hasActiveFilters(filters)) && (
                        <Button
                          onClick={resetFilters}
                          variant="outline"
                          className="rounded-lg"
                        >
                          Reset Filters
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}




















