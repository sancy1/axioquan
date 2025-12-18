

// // /src/components/assessments/quiz-player.tsx -

// 'use client'

// import { useState, useEffect, useCallback, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Skeleton } from '@/components/ui/skeleton';
// import { toast } from 'sonner';
// import { 
//   ArrowLeft, 
//   Clock, 
//   Save, 
//   AlertTriangle,
//   CheckCircle2,
//   Loader2
// } from 'lucide-react';
// import { QuizTimer } from './quiz-timer';
// import { QuizQuestion } from './quiz-question';
// import { QuizNavigation } from './quiz-navigation';
// import { QuizSubmissionModal } from './quiz-submission-modal';
// import { useQuizTimer } from '@/hooks/use-quiz-timer';
// import { cn } from '@/lib/utils';

// interface QuizQuestionType {
//   id: string;
//   question_text: string;
//   question_type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay' | 'matching' | 'fill_blank' | 'code' | 'file_upload';
//   options: Array<{
//     text: string;
//     correct?: boolean;
//     explanation?: string;
//   }> | null;
//   points: number;
//   image_url: string | null;
//   video_url: string | null;
//   explanation: string | null;
//   hints: string[] | null;
//   order_index: number;
//   possible_answers?: string[] | null;
//   code_template?: string | null;
//   allowed_file_types?: string[] | null;
// }

// interface Assessment {
//   id: string;
//   title: string;
//   description: string | null;
//   instructions: string | null;
//   time_limit: number | null;
//   passing_score: number;
//   max_attempts: number;
//   show_correct_answers: boolean;
//   show_results_immediately: boolean;
//   total_points: number;
// }

// interface UserAnswer {
//   questionId: string;
//   answer: string | string[] | null;
//   timeSpent: number;
//   markedForReview: boolean;
// }

// interface QuizPlayerProps {
//   assessment: Assessment;
//   questions: QuizQuestionType[];
//   attemptId: string;
//   initialAnswers?: UserAnswer[];
//   initialTimeRemaining?: number | null;
//   courseId: string;
//   onExit?: () => void;
// }

// export function QuizPlayer({
//   assessment,
//   questions,
//   attemptId,
//   initialAnswers = [],
//   initialTimeRemaining = null,
//   courseId,
//   onExit
// }: QuizPlayerProps) {
//   const router = useRouter();
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [showSubmitModal, setShowSubmitModal] = useState(false);
//   const [lastSaveTime, setLastSaveTime] = useState<string>('Never');
//   const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
//   const [isInitialized, setIsInitialized] = useState(false);
//   const [hasLoadedSavedProgress, setHasLoadedSavedProgress] = useState(false);

//   // DEBUG: Log props and test API endpoint on mount
//   useEffect(() => {
//     console.log('🎯 QuizPlayer Component Mounted');
//     console.log('🎯 Props:', {
//       assessmentId: assessment?.id,
//       assessmentTitle: assessment?.title,
//       attemptId,
//       isTempAttempt: attemptId?.startsWith('temp-attempt-'),
//       courseId,
//       questionsCount: questions?.length,
//       isInitialized,
//       hasLoadedSavedProgress
//     });
    
//     if (attemptId && assessment?.id) {
//       const apiUrl = `/api/student/assessments/${assessment.id}/attempts/${attemptId}`;
//       console.log('🎯 API Endpoint will be:', apiUrl);
      
//       // Test the endpoint with a simple GET request
//       console.log('🎯 Testing API endpoint...');
//       fetch(apiUrl, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' }
//       })
//         .then(async (res) => {
//           console.log('🎯 Endpoint test GET result:', {
//             status: res.status,
//             statusText: res.statusText,
//             ok: res.ok,
//             url: res.url
//           });
          
//           const responseText = await res.text();
//           console.log('🎯 GET response text length:', responseText.length);
//           console.log('🎯 GET response text (first 500 chars):', responseText.substring(0, 500));
          
//           if (!res.ok) {
//             console.error('🎯 Endpoint returned error status');
//             if (responseText.trim()) {
//               try {
//                 const errorData = JSON.parse(responseText);
//                 console.error('🎯 Parsed error data:', errorData);
//               } catch (parseError) {
//                 console.error('🎯 Could not parse error response');
//               }
//             }
//           }
//         })
//         .catch(err => {
//           console.error('🎯 Endpoint test failed:', err);
//           console.error('🎯 Error details:', err.message);
//         });
//     }
//   }, []); // Empty dependency array = run once on mount

//   // Helper function to get default answer based on question type
//   const getDefaultAnswerForQuestionType = (questionType: string): string | string[] | null => {
//     switch (questionType) {
//       case 'multiple_choice':
//       case 'true_false':
//       case 'short_answer':
//       case 'essay':
//       case 'code':
//       case 'file_upload':
//         return '';
//       case 'matching':
//       case 'fill_blank':
//         return [];
//       default:
//         return null;
//     }
//   };

//   // Load saved progress on initial mount
//   useEffect(() => {
//     const loadSavedProgress = async () => {
//       if (!attemptId || attemptId.startsWith('temp-attempt-') || hasLoadedSavedProgress) {
//         console.log('⚠️ Skipping saved progress load:', { 
//           attemptId, 
//           isTemp: attemptId?.startsWith('temp-attempt-'),
//           hasLoaded: hasLoadedSavedProgress 
//         });
//         initializeDefaultAnswers();
//         return;
//       }

//       try {
//         console.log('📥 Loading saved progress for attempt:', attemptId);
//         // Use student-specific API
//         const response = await fetch(`/api/student/assessments/${assessment.id}/attempts/${attemptId}`);
        
//         if (response.ok) {
//           const data = await response.json();
//           console.log('✅ Loaded saved progress response:', data);
          
//           if (data.attempt && data.attempt.answers_json) {
//             // Parse the answers_json from the attempt
//             let savedAnswers: UserAnswer[] = [];
//             try {
//               savedAnswers = Array.isArray(data.attempt.answers_json) 
//                 ? data.attempt.answers_json 
//                 : JSON.parse(data.attempt.answers_json);
//               console.log('📊 Parsed saved answers:', savedAnswers);
//             } catch (e) {
//               console.error('Error parsing answers_json:', e);
//               savedAnswers = [];
//             }
            
//             // Merge loaded answers with questions
//             const loadedAnswers = questions.map((question) => {
//               const savedAnswer = savedAnswers.find((a: any) => a.questionId === question.id);
//               if (savedAnswer) {
//                 console.log(`✅ Found saved answer for question ${question.id}:`, savedAnswer);
//                 return savedAnswer;
//               }
//               console.log(`📝 Creating default for question ${question.id}`);
//               return {
//                 questionId: question.id,
//                 answer: getDefaultAnswerForQuestionType(question.question_type),
//                 timeSpent: 0,
//                 markedForReview: false
//               };
//             });
            
//             setUserAnswers(loadedAnswers);
//             // FIXED: Your database doesn't have last_activity_at, so just use current time
//             const currentTime = new Date().toLocaleTimeString();
//             setLastSaveTime(currentTime);
//             console.log('✅ Set loaded answers and save time:', loadedAnswers);
//           } else {
//             console.log('⚠️ No saved answers found, using defaults');
//             initializeDefaultAnswers();
//           }
//         } else {
//           // Try to get error details
//           let errorMessage = 'Failed to load progress';
//           try {
//             const responseText = await response.text();
//             if (responseText) {
//               const errorData = JSON.parse(responseText);
//               console.warn('⚠️ Could not load saved progress:', errorData);
//               errorMessage = errorData.message || errorData.error || errorMessage;
//             }
//           } catch (e) {
//             console.warn('⚠️ Could not parse error response:', e);
//           }
//           console.warn('⚠️', errorMessage);
//           initializeDefaultAnswers();
//         }
//       } catch (error) {
//         console.error('Error loading saved progress:', error);
//         initializeDefaultAnswers();
//       } finally {
//         setHasLoadedSavedProgress(true);
//         setIsInitialized(true);
//       }
//     };

//     const initializeDefaultAnswers = () => {
//       console.log('📝 Initializing default answers for', questions.length, 'questions');
//       const defaultAnswers = questions.map((question) => {
//         const existingAnswer = initialAnswers.find(a => a.questionId === question.id);
//         return existingAnswer || {
//           questionId: question.id,
//           answer: getDefaultAnswerForQuestionType(question.question_type),
//           timeSpent: 0,
//           markedForReview: false
//         };
//       });
//       console.log('✅ Default answers initialized:', defaultAnswers);
//       setUserAnswers(defaultAnswers);
//       setIsInitialized(true);
//     };

//     if (questions.length > 0 && !isInitialized) {
//       console.log('🔄 Initializing quiz with', questions.length, 'questions');
//       loadSavedProgress();
//     }
//   }, [questions, attemptId, assessment.id, initialAnswers, isInitialized, hasLoadedSavedProgress]);

//   const currentQuestion = questions[currentQuestionIndex];
//   const currentAnswer = userAnswers.find(a => a.questionId === currentQuestion?.id);

//   // Auto-save progress function
//   const autoSaveProgress = useCallback(async () => {
//     if (!autoSaveEnabled || isLoading || isSaving || !isInitialized) return;

//     setIsSaving(true);
//     try {
//       await saveProgress();
//       // FIXED: Your database doesn't have last_activity_at, so just use current time
//       setLastSaveTime(new Date().toLocaleTimeString());
//       console.log('💾 Auto-save completed at:', new Date().toLocaleTimeString());
//     } catch (error) {
//       console.error('Auto-save failed:', error);
//     } finally {
//       setIsSaving(false);
//     }
//   }, [autoSaveEnabled, isLoading, isSaving, isInitialized]);

//   // Manual save progress - FIXED: No longer expects last_activity_at from API
//   const saveProgress = async () => {
//     // Don't save if using temp attempt ID
//     if (!attemptId || attemptId.startsWith('temp-attempt-')) {
//       console.log('⚠️ Using temp attempt ID, progress not saved to server');
//       return { success: true, message: 'Using temporary attempt, progress not saved to server' };
//     }

//     try {
//       console.log('💾 ===== STARTING saveProgress =====');
      
//       // SECTION 1: EXISTING DEBUG TESTS (PRESERVED)
//       console.log('🔍 ===== SECTION 1: Existing debug tests =====');
      
//       // EXISTING DEBUG: Test the debug endpoint
//       console.log('🔍 Testing debug endpoint...');
//       try {
//         const debugResponse = await fetch('/api/student/debug');
//         const debugText = await debugResponse.text();
//         console.log('🔍 Debug endpoint response status:', debugResponse.status);
//         console.log('🔍 Debug endpoint response:', debugText.substring(0, 500));
//       } catch (debugError) {
//         console.error('🔍 Debug endpoint test failed:', debugError);
//       }
      
//       // EXISTING DEBUG: Test a simple PATCH endpoint
//       console.log('🔍 Testing simple PATCH endpoint...');
//       try {
//         const testResponse = await fetch('/api/student/assessments/test', {
//           method: 'PATCH',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ test: 'data' })
//         });
//         const testText = await testResponse.text();
//         console.log('🔍 Test PATCH response status:', testResponse.status);
//         console.log('🔍 Test PATCH response:', testText);
//       } catch (testError) {
//         console.error('🔍 Test PATCH failed:', testError);
//       }
      
//       // SECTION 2: NEW DEBUG - Test GET on actual endpoint first
//       console.log('🔍 ===== SECTION 2: New GET test on actual endpoint =====');
//       const testGetUrl = `/api/student/assessments/${assessment.id}/attempts/${attemptId}`;
//       console.log('🔍 GET test URL:', testGetUrl);
      
//       try {
//         const getTest = await fetch(testGetUrl, { method: 'GET' });
//         const getText = await getTest.text();
//         console.log('🔍 GET test - Status:', getTest.status);
//         console.log('🔍 GET test - OK:', getTest.ok);
//         console.log('🔍 GET test - Response length:', getText.length);
        
//         if (!getTest.ok) {
//           console.error('🔍 GET test failed with status:', getTest.status);
//           if (getText && getText.trim()) {
//             console.log('🔍 GET test error response:', getText.substring(0, 500));
//           }
//         } else {
//           console.log('🔍 GET test succeeded!');
//           // Parse and show attempt details
//           try {
//             const attemptData = JSON.parse(getText);
//             console.log('🔍 Attempt details from GET:', {
//               success: attemptData.success,
//               attemptId: attemptData.attempt?.id,
//               submitted: attemptData.attempt?.submitted_at ? 'Yes' : 'No',
//               hasAnswersJson: attemptData.attempt?.answers_json ? 'Yes' : 'No',
//               userId: attemptData.attempt?.user_id,
//               enrollmentUserId: attemptData.attempt?.enrollment_user_id
//             });
//           } catch (parseError) {
//             console.error('🔍 Could not parse GET response as JSON:', parseError);
//             console.log('🔍 GET response raw (first 500 chars):', getText.substring(0, 500));
//           }
//         }
//       } catch (getError) {
//         console.error('🔍 GET test error:', getError);
//       }
      
//       // SECTION 3: ORIGINAL SAVE PROGRESS LOGIC (PRESERVED)
//       console.log('🔍 ===== SECTION 3: Original save progress logic =====');
      
//       console.log('💾 Current state:');
//       console.log('💾 attemptId:', attemptId);
//       console.log('💾 assessment.id:', assessment?.id);
//       console.log('💾 assessment.title:', assessment?.title);
//       console.log('💾 userAnswers count:', userAnswers.length);
//       console.log('💾 userAnswers sample (first 2):', userAnswers.slice(0, 2));
//       console.log('💾 timeRemaining:', timeRemaining);
//       console.log('💾 isInitialized:', isInitialized);
//       console.log('💾 isSaving:', isSaving);
//       console.log('💾 isLoading:', isLoading);
      
//       const apiUrl = `/api/student/assessments/${assessment.id}/attempts/${attemptId}`;
//       console.log('🌐 Final PATCH URL:', apiUrl);
      
//       const requestBody = {
//         answers: userAnswers,
//         timeRemaining: timeRemaining
//       };
//       console.log('📦 Request body size:', JSON.stringify(requestBody).length, 'bytes');
//       console.log('📦 Request body preview:', JSON.stringify(requestBody).substring(0, 200) + '...');
      
//       console.log('📤 Making PATCH request to:', apiUrl);
//       const startTime = Date.now();
//       const response = await fetch(apiUrl, {
//         method: 'PATCH',
//         headers: { 
//           'Content-Type': 'application/json',
//           'X-Debug-Timestamp': startTime.toString()
//         },
//         body: JSON.stringify(requestBody)
//       });
//       const endTime = Date.now();
//       const duration = endTime - startTime;
      
//       console.log('📥 Response received in', duration, 'ms');
//       console.log('📥 Response status:', response.status);
//       console.log('📥 Response statusText:', response.statusText);
//       console.log('📥 Response ok:', response.ok);
//       console.log('📥 Response URL:', response.url);
//       console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));

//       if (!response.ok) {
//         let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
//         let responseText = '';
        
//         try {
//           responseText = await response.text();
//           console.log('❌ Error response text length:', responseText.length);
//           console.log('❌ Error response text (raw debug):', JSON.stringify(responseText));
          
//           // Check if responseText is truly empty or just whitespace
//           if (responseText && responseText.trim().length > 0) {
//             console.log('❌ Error response has content, attempting to parse as JSON');
//             try {
//               const errorData = JSON.parse(responseText);
//               console.error('❌ Parsed error data:', errorData);
              
//               if (errorData.errors && errorData.errors.length > 0) {
//                 errorMessage = errorData.errors[0];
//               } else if (errorData.message) {
//                 errorMessage = errorData.message;
//               } else if (errorData.error) {
//                 errorMessage = errorData.error;
//               } else if (typeof errorData === 'string') {
//                 errorMessage = errorData;
//               }
//             } catch (parseError) {
//               console.error('❌ Failed to parse error JSON:', parseError);
//               // If not JSON, use the text as is (truncated)
//               errorMessage = responseText.substring(0, 200);
//             }
//           } else {
//             console.error('❌ Empty or whitespace-only error response body');
//             // Provide more specific error messages based on status code
//             switch (response.status) {
//               case 400:
//                 errorMessage = 'Bad request - the server could not understand the request';
//                 break;
//               case 401:
//                 errorMessage = 'Unauthorized - please log in again';
//                 break;
//               case 403:
//                 errorMessage = 'Forbidden - you do not have permission to update this attempt';
//                 break;
//               case 404:
//                 errorMessage = 'API endpoint not found. Please check if the API route exists.';
//                 break;
//               case 500:
//                 errorMessage = 'Internal server error - the server encountered an unexpected condition';
//                 break;
//               default:
//                 errorMessage = `HTTP ${response.status}: ${response.statusText || 'Empty response received from server'}`;
//             }
//           }
//         } catch (error) {
//           console.error('❌ Failed to read error response:', error);
//           errorMessage = `HTTP ${response.status}: Could not read response - ${error instanceof Error ? error.message : String(error)}`;
//         }
        
//         console.error('❌ Throwing error:', errorMessage);
//         throw new Error(errorMessage);
//       }

//       // Handle successful response
//       console.log('✅ Request was successful!');
//       let result;
//       let responseText = '';
      
//       try {
//         responseText = await response.text();
//         console.log('✅ Success response text length:', responseText.length);
        
//         if (responseText && responseText.trim()) {
//           console.log('✅ Success response text (first 500 chars):', responseText.substring(0, 500));
//           try {
//             result = JSON.parse(responseText);
//             console.log('✅ Parsed success result:', result);
//           } catch (parseError) {
//             console.error('❌ Failed to parse success JSON:', parseError);
//             result = { 
//               success: true, 
//               message: 'Progress saved (parse error)'
//             };
//           }
//         } else {
//           console.log('✅ Empty success response - creating default result');
//           result = { 
//             success: true, 
//             message: 'Progress saved (empty response)'
//           };
//         }
//       } catch (error) {
//         console.error('❌ Failed to read success response:', error);
//         console.error('❌ Response text that failed:', responseText);
//         result = { 
//           success: true, 
//           message: 'Progress saved (read error)'
//         };
//       }
      
//       // FIXED: Your database doesn't have last_activity_at, so just use current time
//       const currentTime = new Date().toLocaleTimeString();
//       console.log('⏰ Setting last save time to:', currentTime);
//       setLastSaveTime(currentTime);
      
//       console.log('✅ ===== saveProgress completed successfully =====');
//       return result;
      
//     } catch (error: any) {
//       console.error('❌❌❌ ===== saveProgress FAILED =====');
//       console.error('❌❌❌ Error message:', error.message);
//       console.error('❌❌❌ Error stack:', error.stack);
//       console.error('❌❌❌ ===== END ERROR =====');
//       throw error;
//     }
//   };

//   // Handle time up
//   const handleTimeUp = useCallback(() => {
//     console.log('⏰ Time is up! Auto-submitting quiz...');
//     toast.error('Time is up! Your quiz will be automatically submitted.');
//     setTimeout(() => {
//       submitQuiz();
//     }, 3000);
//   }, []);

//   // Timer setup
//   const {
//     timeRemaining,
//     formattedTime,
//     isTimeUp,
//     isWarning,
//     isCritical,
//     pauseTimer,
//     resumeTimer
//   } = useQuizTimer({
//     initialTimeRemaining,
//     onTimeUp: handleTimeUp,
//     onAutoSave: autoSaveProgress,
//     autoSaveInterval: 30000
//   });

//   // Handle answer change
//   const handleAnswerChange = (answer: string | string[] | null) => {
//     if (!currentQuestion) return;
    
//     console.log('📝 Answer changed for question:', currentQuestion.id, answer);
    
//     setUserAnswers(prev => {
//       const updatedAnswers = [...prev];
//       const answerIndex = updatedAnswers.findIndex(a => a.questionId === currentQuestion.id);
      
//       if (answerIndex >= 0) {
//         updatedAnswers[answerIndex] = {
//           ...updatedAnswers[answerIndex],
//           answer,
//           timeSpent: updatedAnswers[answerIndex].timeSpent + 1
//         };
//       }
      
//       return updatedAnswers;
//     });
//   };

//   // Handle mark for review toggle
//   const handleToggleReview = () => {
//     if (!currentQuestion) return;
    
//     setUserAnswers(prev => {
//       const updatedAnswers = [...prev];
//       const answerIndex = updatedAnswers.findIndex(a => a.questionId === currentQuestion.id);
      
//       if (answerIndex >= 0) {
//         updatedAnswers[answerIndex] = {
//           ...updatedAnswers[answerIndex],
//           markedForReview: !updatedAnswers[answerIndex].markedForReview
//         };
//       }
      
//       return updatedAnswers;
//     });
//   };

//   // Navigate to question
//   const handleQuestionSelect = (index: number) => {
//     setCurrentQuestionIndex(index);
//   };

//   // Navigate to previous question
//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   // Navigate to next question
//   const handleNext = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   // Submit quiz - FIXED: No longer expects last_activity_at from API
//   const submitQuiz = async () => {
//     console.log('🚀 ===== STARTING submitQuiz =====');
//     console.log('🚀 Current state:', {
//       attemptId,
//       isTemp: attemptId?.startsWith('temp-attempt-'),
//       userAnswersCount: userAnswers.length,
//       timeRemaining,
//       isLoading,
//       isSaving
//     });
    
//     setIsLoading(true);
//     pauseTimer();

//     try {
//       // If using temp attempt, create a real one first
//       let finalAttemptId = attemptId;
      
//       if (attemptId.startsWith('temp-attempt-')) {
//         console.log('🔄 Creating real attempt for temp ID...');
//         const createResponse = await fetch(`/api/student/assessments/${assessment.id}/attempts`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' }
//         });
        
//         if (createResponse.ok) {
//           const createResult = await createResponse.json();
//           finalAttemptId = createResult.attempt?.id || attemptId;
//           console.log('✅ Real attempt created:', finalAttemptId);
//         } else {
//           console.warn('⚠️ Could not create real attempt, using temp ID');
//           toast.warning('Could not create attempt. Please try again.');
//           resumeTimer();
//           setIsLoading(false);
//           return;
//         }
//       }

//       // Save final progress before submission
//       console.log('💾 Final save before submission...');
//       try {
//         await saveProgress();
//       } catch (saveError) {
//         console.warn('⚠️ Final save failed, continuing with submission:', saveError);
//         // Continue with submission even if save fails
//       }

//       console.log('📤 Submitting to student API...');
//       const submitUrl = `/api/student/assessments/${assessment.id}/attempts/${finalAttemptId}/submit`;
//       console.log('🌐 Submit URL:', submitUrl);
      
//       const submitBody = {
//         answers: userAnswers,
//         finalTimeRemaining: timeRemaining
//       };
//       console.log('📦 Submit body preview:', JSON.stringify(submitBody).substring(0, 200) + '...');
      
//       const response = await fetch(submitUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(submitBody)
//       });

//       console.log('📥 Submit response status:', response.status);
//       console.log('📥 Submit response ok:', response.ok);

//       if (!response.ok) {
//         let errorMessage = 'Failed to submit quiz';
        
//         try {
//           const responseText = await response.text();
//           console.log('📄 Submit raw response:', responseText);
          
//           if (responseText) {
//             const errorData = JSON.parse(responseText);
//             console.error('❌ Submit quiz error response:', errorData);
            
//             if (errorData.errors && errorData.errors.length > 0) {
//               errorMessage = errorData.errors[0];
//             } else if (errorData.message) {
//               errorMessage = errorData.message;
//             } else if (errorData.error) {
//               errorMessage = errorData.error;
//             }
//           }
//         } catch (e) {
//           console.error('❌ Could not parse submit error response:', e);
//           errorMessage = response.statusText || `HTTP ${response.status}`;
//         }
        
//         throw new Error(errorMessage);
//       }

//       const result = await response.json();
//       console.log('✅ Quiz submission result:', result);
      
//       toast.success('Quiz submitted successfully!');
      
//       // Redirect based on assessment settings
//       if (assessment.show_results_immediately) {
//         console.log('📊 Redirecting to results...');
//         router.push(`/courses/learn/${courseId}/quiz/${assessment.id}/results?attempt=${finalAttemptId}`);
//       } else {
//         console.log('🏠 Redirecting to course...');
//         router.push(`/courses/learn/${courseId}`);
//         toast.info('Your results will be available soon.');
//       }

//     } catch (error: any) {
//       console.error('❌❌❌ Error submitting quiz:', error);
//       console.error('❌❌❌ Error message:', error.message);
//       console.error('❌❌❌ Error stack:', error.stack);
      
//       if (error.message.includes('Failed to save progress')) {
//         toast.error('Could not save your progress. Please check your connection and try again.');
//       } else if (error.message.includes('Failed to submit quiz')) {
//         toast.error('Failed to submit quiz. Please try again.');
//       } else {
//         toast.error('An unexpected error occurred. Please try again.');
//       }
      
//       resumeTimer();
//       setIsLoading(false);
//     }
//   };

//   // Handle exit
//   const handleExit = () => {
//     if (answeredCount > 0) {
//       if (window.confirm('You have unsaved progress. Are you sure you want to exit?')) {
//         console.log('🚪 Exiting quiz...');
//         if (onExit) {
//           onExit();
//         } else {
//           router.push(`/courses/learn/${courseId}`);
//         }
//       }
//     } else {
//       console.log('🚪 Exiting quiz...');
//       if (onExit) {
//         onExit();
//       } else {
//         router.push(`/courses/learn/${courseId}`);
//       }
//     }
//   };

//   // Prepare question status for navigation
//   const questionStatus = questions.map((question, index) => {
//     const answer = userAnswers.find(a => a.questionId === question.id);
    
//     let hasAnswer = false;
//     if (answer?.answer) {
//       if (typeof answer.answer === 'string') {
//         hasAnswer = answer.answer.trim().length > 0;
//       } else if (Array.isArray(answer.answer)) {
//         hasAnswer = answer.answer.some(item => item && item.toString().trim().length > 0);
//       }
//     }
    
//     return {
//       id: question.id,
//       order: index,
//       answered: hasAnswer,
//       markedForReview: answer?.markedForReview || false,
//       current: index === currentQuestionIndex
//     };
//   });

//   const answeredCount = questionStatus.filter(q => q.answered).length;
//   const markedCount = questionStatus.filter(q => q.markedForReview).length;

//   // Auto-save effect
//   useEffect(() => {
//     if (!isInitialized) return;
    
//     const saveInterval = setInterval(() => {
//       if (autoSaveEnabled && !isLoading && !isSaving) {
//         autoSaveProgress();
//       }
//     }, 60000); // Auto-save every minute

//     return () => clearInterval(saveInterval);
//   }, [autoSaveEnabled, autoSaveProgress, isLoading, isSaving, isInitialized]);

//   // Warn before leaving
//   useEffect(() => {
//     if (!isInitialized) return;
    
//     const handleBeforeUnload = (e: BeforeUnloadEvent) => {
//       if (answeredCount > 0) {
//         e.preventDefault();
//         e.returnValue = 'You have unsaved quiz progress. Are you sure you want to leave?';
//       }
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);
//     return () => window.removeEventListener('beforeunload', handleBeforeUnload);
//   }, [answeredCount, isInitialized]);

//   // Debug logging
//   useEffect(() => {
//     console.log('🔍 QuizPlayer State Update:', {
//       currentQuestionIndex,
//       userAnswersCount: userAnswers.length,
//       currentQuestionId: currentQuestion?.id,
//       currentAnswer: currentAnswer,
//       isInitialized,
//       isLoading,
//       isSaving,
//       answeredCount,
//       markedCount
//     });
//   }, [currentQuestionIndex, userAnswers, currentQuestion, currentAnswer, isInitialized, isLoading, isSaving, answeredCount, markedCount]);

//   if (!currentQuestion || !isInitialized) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-center space-y-4">
//           <Loader2 className="h-8 w-8 animate-spin mx-auto" />
//           <p>Loading quiz...</p>
//           <p className="text-sm text-muted-foreground">Initializing questions...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <Card>
//         <CardHeader className="pb-3">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div className="flex items-center gap-3">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={handleExit}
//                 disabled={isLoading}
//                 className="gap-2"
//               >
//                 <ArrowLeft className="h-4 w-4" />
//                 Exit
//               </Button>
              
//               <div>
//                 <CardTitle className="text-xl">{assessment.title}</CardTitle>
//                 <p className="text-sm text-muted-foreground">
//                   Question {currentQuestionIndex + 1} of {questions.length}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               {/* Timer */}
//               <div className="min-w-[140px]">
//                 <QuizTimer
//                   timeLimit={assessment.time_limit}
//                   initialTimeRemaining={initialTimeRemaining}
//                   onTimeUp={handleTimeUp}
//                   onAutoSave={autoSaveProgress}
//                   showIcon={true}
//                   showWarning={true}
//                 />
//               </div>

//               {/* Save Status */}
//               <div className="flex items-center gap-2 text-sm">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={autoSaveProgress}
//                   disabled={isSaving || isLoading}
//                   className="h-8 gap-1"
//                 >
//                   {isSaving ? (
//                     <Loader2 className="h-3 w-3 animate-spin" />
//                   ) : (
//                     <Save className="h-3 w-3" />
//                   )}
//                   {isSaving ? 'Saving...' : 'Save'}
//                 </Button>
//                 <span className="text-xs text-muted-foreground hidden md:inline">
//                   Last save: {lastSaveTime}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Instructions */}
//           {assessment.instructions && (
//             <Alert className="mt-4">
//               <AlertTriangle className="h-4 w-4" />
//               <AlertDescription className="text-sm">
//                 {assessment.instructions}
//               </AlertDescription>
//             </Alert>
//           )}
//         </CardHeader>
//       </Card>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Question Area */}
//         <div className="lg:col-span-2">
//           <QuizQuestion
//             question={currentQuestion}
//             currentAnswer={currentAnswer?.answer || null}
//             onAnswerChange={handleAnswerChange}
//             disabled={isLoading || isTimeUp}
//             markedForReview={currentAnswer?.markedForReview || false}
//             onToggleReview={handleToggleReview}
//           />
//         </div>

//         {/* Navigation Sidebar */}
//         <div className="lg:col-span-1">
//           <Card className="sticky top-6">
//             <CardContent className="p-4">
//               <QuizNavigation
//                 questions={questionStatus}
//                 currentQuestionIndex={currentQuestionIndex}
//                 onQuestionSelect={handleQuestionSelect}
//                 onPrevious={handlePrevious}
//                 onNext={handleNext}
//                 onSubmit={() => setShowSubmitModal(true)}
//                 showSubmit={currentQuestionIndex === questions.length - 1}
//                 disabled={isLoading || isTimeUp}
//               />
//             </CardContent>
//           </Card>

//           {/* Progress Stats */}
//           <div className="mt-4 p-4 bg-card border rounded-lg space-y-2">
//             <div className="flex justify-between items-center">
//               <span className="text-sm font-medium">Progress</span>
//               <span className="text-sm text-muted-foreground">
//                 {answeredCount}/{questions.length}
//               </span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div 
//                 className="bg-primary h-2 rounded-full transition-all duration-300"
//                 style={{ width: `${(answeredCount / questions.length) * 100}%` }}
//               />
//             </div>
//             <div className="flex justify-between text-xs text-muted-foreground pt-1">
//               <span>Answered: {answeredCount}</span>
//               <span>Marked: {markedCount}</span>
//             </div>
//           </div>

//           {/* Auto-save Toggle */}
//           <div className="mt-4 p-3 bg-card border rounded-lg">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 {isSaving ? (
//                   <Loader2 className="h-4 w-4 animate-spin text-primary" />
//                 ) : (
//                   <CheckCircle2 className="h-4 w-4 text-green-500" />
//                 )}
//                 <span className="text-sm font-medium">Auto-save</span>
//               </div>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={autoSaveEnabled}
//                   onChange={(e) => setAutoSaveEnabled(e.target.checked)}
//                   className="sr-only peer"
//                   disabled={isSaving}
//                 />
//                 <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
//               </label>
//             </div>
//             <p className="text-xs text-muted-foreground mt-2">
//               {autoSaveEnabled 
//                 ? 'Progress is saved automatically every minute' 
//                 : 'Auto-save is disabled. Remember to save manually.'
//               }
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Time Warning */}
//       {isCritical && !isTimeUp && (
//         <Alert variant="destructive" className="animate-pulse">
//           <AlertTriangle className="h-4 w-4" />
//           <AlertDescription>
//             Time is almost up! Please submit your quiz soon.
//           </AlertDescription>
//         </Alert>
//       )}

//       {/* Submission Modal */}
//       <QuizSubmissionModal
//         isOpen={showSubmitModal}
//         onClose={() => setShowSubmitModal(false)}
//         onSubmit={submitQuiz}
//         totalQuestions={questions.length}
//         answeredQuestions={answeredCount}
//         markedQuestions={markedCount}
//         timeRemaining={timeRemaining}
//         isLoading={isLoading}
//       />
//     </div>
//   );
// }





































// // /src/components/assessments/quiz-player.tsx -

// 'use client'

// import { useState, useEffect, useCallback, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Skeleton } from '@/components/ui/skeleton';
// import { toast } from 'sonner';
// import { 
//   ArrowLeft, 
//   Clock, 
//   Save, 
//   AlertTriangle,
//   CheckCircle2,
//   Loader2
// } from 'lucide-react';
// import { QuizTimer } from './quiz-timer';
// import { QuizQuestion } from './quiz-question';
// import { QuizNavigation } from './quiz-navigation';
// import { QuizSubmissionModal } from './quiz-submission-modal';
// import { useQuizTimer } from '@/hooks/use-quiz-timer';
// import { cn } from '@/lib/utils';

// interface QuizQuestionType {
//   id: string;
//   question_text: string;
//   question_type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay' | 'matching' | 'fill_blank' | 'code' | 'file_upload';
//   options: Array<{
//     text: string;
//     correct?: boolean;
//     explanation?: string;
//   }> | null;
//   points: number;
//   image_url: string | null;
//   video_url: string | null;
//   explanation: string | null;
//   hints: string[] | null;
//   order_index: number;
//   possible_answers?: string[] | null;
//   code_template?: string | null;
//   allowed_file_types?: string[] | null;
// }

// interface Assessment {
//   id: string;
//   title: string;
//   description: string | null;
//   instructions: string | null;
//   time_limit: number | null;
//   passing_score: number;
//   max_attempts: number;
//   show_correct_answers: boolean;
//   show_results_immediately: boolean;
//   total_points: number;
// }

// interface UserAnswer {
//   questionId: string;
//   answer: string | string[] | null;
//   timeSpent: number;
//   markedForReview: boolean;
// }

// interface QuizPlayerProps {
//   assessment: Assessment;
//   questions: QuizQuestionType[];
//   attemptId: string;
//   initialAnswers?: UserAnswer[];
//   initialTimeRemaining?: number | null;
//   courseId: string;
//   onExit?: () => void;
// }

// export function QuizPlayer({
//   assessment,
//   questions,
//   attemptId,
//   initialAnswers = [],
//   initialTimeRemaining = null,
//   courseId,
//   onExit
// }: QuizPlayerProps) {
//   const router = useRouter();
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [showSubmitModal, setShowSubmitModal] = useState(false);
//   const [lastSaveTime, setLastSaveTime] = useState<string>('Never');
//   const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
//   const [isInitialized, setIsInitialized] = useState(false);
//   const [hasLoadedSavedProgress, setHasLoadedSavedProgress] = useState(false);

//   // DEBUG: Log props and test API endpoint on mount
//   useEffect(() => {
//     console.log('🎯 QuizPlayer Component Mounted');
//     console.log('🎯 Props:', {
//       assessmentId: assessment?.id,
//       assessmentTitle: assessment?.title,
//       attemptId,
//       isTempAttempt: attemptId?.startsWith('temp-attempt-'),
//       courseId,
//       questionsCount: questions?.length,
//       isInitialized,
//       hasLoadedSavedProgress
//     });
    
//     if (attemptId && assessment?.id) {
//       const apiUrl = `/api/student/assessments/${assessment.id}/attempts/${attemptId}`;
//       console.log('🎯 API Endpoint will be:', apiUrl);
      
//       // Test the endpoint with a simple GET request
//       console.log('🎯 Testing API endpoint...');
//       fetch(apiUrl, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' }
//       })
//         .then(async (res) => {
//           console.log('🎯 Endpoint test GET result:', {
//             status: res.status,
//             statusText: res.statusText,
//             ok: res.ok,
//             url: res.url
//           });
          
//           const responseText = await res.text();
//           console.log('🎯 GET response text length:', responseText.length);
//           console.log('🎯 GET response text (first 500 chars):', responseText.substring(0, 500));
          
//           if (!res.ok) {
//             console.error('🎯 Endpoint returned error status');
//             if (responseText.trim()) {
//               try {
//                 const errorData = JSON.parse(responseText);
//                 console.error('🎯 Parsed error data:', errorData);
//               } catch (parseError) {
//                 console.error('🎯 Could not parse error response');
//               }
//             }
//           }
//         })
//         .catch(err => {
//           console.error('🎯 Endpoint test failed:', err);
//           console.error('🎯 Error details:', err.message);
//         });
//     }
//   }, []); // Empty dependency array = run once on mount

//   // Helper function to get default answer based on question type
//   const getDefaultAnswerForQuestionType = (questionType: string): string | string[] | null => {
//     switch (questionType) {
//       case 'multiple_choice':
//       case 'true_false':
//       case 'short_answer':
//       case 'essay':
//       case 'code':
//       case 'file_upload':
//         return '';
//       case 'matching':
//       case 'fill_blank':
//         return [];
//       default:
//         return null;
//     }
//   };

//   // Load saved progress on initial mount
//   useEffect(() => {
//     const loadSavedProgress = async () => {
//       if (!attemptId || attemptId.startsWith('temp-attempt-') || hasLoadedSavedProgress) {
//         console.log('⚠️ Skipping saved progress load:', { 
//           attemptId, 
//           isTemp: attemptId?.startsWith('temp-attempt-'),
//           hasLoaded: hasLoadedSavedProgress 
//         });
//         initializeDefaultAnswers();
//         return;
//       }

//       try {
//         console.log('📥 Loading saved progress for attempt:', attemptId);
//         // Use student-specific API
//         const response = await fetch(`/api/student/assessments/${assessment.id}/attempts/${attemptId}`);
        
//         if (response.ok) {
//           const data = await response.json();
//           console.log('✅ Loaded saved progress response:', data);
          
//           if (data.attempt && data.attempt.answers_json) {
//             // Parse the answers_json from the attempt
//             let savedAnswers: UserAnswer[] = [];
//             try {
//               savedAnswers = Array.isArray(data.attempt.answers_json) 
//                 ? data.attempt.answers_json 
//                 : JSON.parse(data.attempt.answers_json);
//               console.log('📊 Parsed saved answers:', savedAnswers);
//             } catch (e) {
//               console.error('Error parsing answers_json:', e);
//               savedAnswers = [];
//             }
            
//             // Merge loaded answers with questions
//             const loadedAnswers = questions.map((question) => {
//               const savedAnswer = savedAnswers.find((a: any) => a.questionId === question.id);
//               if (savedAnswer) {
//                 console.log(`✅ Found saved answer for question ${question.id}:`, savedAnswer);
//                 return savedAnswer;
//               }
//               console.log(`📝 Creating default for question ${question.id}`);
//               return {
//                 questionId: question.id,
//                 answer: getDefaultAnswerForQuestionType(question.question_type),
//                 timeSpent: 0,
//                 markedForReview: false
//               };
//             });
            
//             setUserAnswers(loadedAnswers);
//             // FIXED: Your database doesn't have last_activity_at, so just use current time
//             const currentTime = new Date().toLocaleTimeString();
//             setLastSaveTime(currentTime);
//             console.log('✅ Set loaded answers and save time:', loadedAnswers);
//           } else {
//             console.log('⚠️ No saved answers found, using defaults');
//             initializeDefaultAnswers();
//           }
//         } else {
//           // Try to get error details
//           let errorMessage = 'Failed to load progress';
//           try {
//             const responseText = await response.text();
//             if (responseText) {
//               const errorData = JSON.parse(responseText);
//               console.warn('⚠️ Could not load saved progress:', errorData);
//               errorMessage = errorData.message || errorData.error || errorMessage;
//             }
//           } catch (e) {
//             console.warn('⚠️ Could not parse error response:', e);
//           }
//           console.warn('⚠️', errorMessage);
//           initializeDefaultAnswers();
//         }
//       } catch (error) {
//         console.error('Error loading saved progress:', error);
//         initializeDefaultAnswers();
//       } finally {
//         setHasLoadedSavedProgress(true);
//         setIsInitialized(true);
//       }
//     };

//     const initializeDefaultAnswers = () => {
//       console.log('📝 Initializing default answers for', questions.length, 'questions');
//       const defaultAnswers = questions.map((question) => {
//         const existingAnswer = initialAnswers.find(a => a.questionId === question.id);
//         return existingAnswer || {
//           questionId: question.id,
//           answer: getDefaultAnswerForQuestionType(question.question_type),
//           timeSpent: 0,
//           markedForReview: false
//         };
//       });
//       console.log('✅ Default answers initialized:', defaultAnswers);
//       setUserAnswers(defaultAnswers);
//       setIsInitialized(true);
//     };

//     if (questions.length > 0 && !isInitialized) {
//       console.log('🔄 Initializing quiz with', questions.length, 'questions');
//       loadSavedProgress();
//     }
//   }, [questions, attemptId, assessment.id, initialAnswers, isInitialized, hasLoadedSavedProgress]);

//   const currentQuestion = questions[currentQuestionIndex];
//   const currentAnswer = userAnswers.find(a => a.questionId === currentQuestion?.id);

//   // Auto-save progress function
//   const autoSaveProgress = useCallback(async () => {
//     if (!autoSaveEnabled || isLoading || isSaving || !isInitialized) return;

//     setIsSaving(true);
//     try {
//       await saveProgress();
//       // FIXED: Your database doesn't have last_activity_at, so just use current time
//       setLastSaveTime(new Date().toLocaleTimeString());
//       console.log('💾 Auto-save completed at:', new Date().toLocaleTimeString());
//     } catch (error) {
//       console.error('Auto-save failed:', error);
//     } finally {
//       setIsSaving(false);
//     }
//   }, [autoSaveEnabled, isLoading, isSaving, isInitialized]);

//   // Manual save progress - FIXED: No longer expects last_activity_at from API
//   const saveProgress = async () => {
//     // Don't save if using temp attempt ID
//     if (!attemptId || attemptId.startsWith('temp-attempt-')) {
//       console.log('⚠️ Using temp attempt ID, progress not saved to server');
//       return { success: true, message: 'Using temporary attempt, progress not saved to server' };
//     }

//     try {
//       console.log('💾 ===== STARTING saveProgress =====');
      
//       // SECTION 1: EXISTING DEBUG TESTS (PRESERVED)
//       console.log('🔍 ===== SECTION 1: Existing debug tests =====');
      
//       // EXISTING DEBUG: Test the debug endpoint
//       console.log('🔍 Testing debug endpoint...');
//       try {
//         const debugResponse = await fetch('/api/student/debug');
//         const debugText = await debugResponse.text();
//         console.log('🔍 Debug endpoint response status:', debugResponse.status);
//         console.log('🔍 Debug endpoint response:', debugText.substring(0, 500));
//       } catch (debugError) {
//         console.error('🔍 Debug endpoint test failed:', debugError);
//       }
      
//       // EXISTING DEBUG: Test a simple PATCH endpoint
//       console.log('🔍 Testing simple PATCH endpoint...');
//       try {
//         const testResponse = await fetch('/api/student/assessments/test', {
//           method: 'PATCH',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ test: 'data' })
//         });
//         const testText = await testResponse.text();
//         console.log('🔍 Test PATCH response status:', testResponse.status);
//         console.log('🔍 Test PATCH response:', testText);
//       } catch (testError) {
//         console.error('🔍 Test PATCH failed:', testError);
//       }
      
//       // SECTION 2: NEW DEBUG - Test GET on actual endpoint first
//       console.log('🔍 ===== SECTION 2: New GET test on actual endpoint =====');
//       const testGetUrl = `/api/student/assessments/${assessment.id}/attempts/${attemptId}`;
//       console.log('🔍 GET test URL:', testGetUrl);
      
//       try {
//         const getTest = await fetch(testGetUrl, { method: 'GET' });
//         const getText = await getTest.text();
//         console.log('🔍 GET test - Status:', getTest.status);
//         console.log('🔍 GET test - OK:', getTest.ok);
//         console.log('🔍 GET test - Response length:', getText.length);
        
//         if (!getTest.ok) {
//           console.error('🔍 GET test failed with status:', getTest.status);
//           if (getText && getText.trim()) {
//             console.log('🔍 GET test error response:', getText.substring(0, 500));
//           }
//         } else {
//           console.log('🔍 GET test succeeded!');
//           // Parse and show attempt details
//           try {
//             const attemptData = JSON.parse(getText);
//             console.log('🔍 Attempt details from GET:', {
//               success: attemptData.success,
//               attemptId: attemptData.attempt?.id,
//               submitted: attemptData.attempt?.submitted_at ? 'Yes' : 'No',
//               hasAnswersJson: attemptData.attempt?.answers_json ? 'Yes' : 'No',
//               userId: attemptData.attempt?.user_id,
//               enrollmentUserId: attemptData.attempt?.enrollment_user_id
//             });
//           } catch (parseError) {
//             console.error('🔍 Could not parse GET response as JSON:', parseError);
//             console.log('🔍 GET response raw (first 500 chars):', getText.substring(0, 500));
//           }
//         }
//       } catch (getError) {
//         console.error('🔍 GET test error:', getError);
//       }
      
//       // SECTION 3: ORIGINAL SAVE PROGRESS LOGIC (PRESERVED)
//       console.log('🔍 ===== SECTION 3: Original save progress logic =====');
      
//       console.log('💾 Current state:');
//       console.log('💾 attemptId:', attemptId);
//       console.log('💾 assessment.id:', assessment?.id);
//       console.log('💾 assessment.title:', assessment?.title);
//       console.log('💾 userAnswers count:', userAnswers.length);
//       console.log('💾 userAnswers sample (first 2):', userAnswers.slice(0, 2));
//       console.log('💾 timeRemaining:', timeRemaining);
//       console.log('💾 isInitialized:', isInitialized);
//       console.log('💾 isSaving:', isSaving);
//       console.log('💾 isLoading:', isLoading);
      
//       const apiUrl = `/api/student/assessments/${assessment.id}/attempts/${attemptId}`;
//       console.log('🌐 Final PATCH URL:', apiUrl);
      
//       const requestBody = {
//         answers: userAnswers,
//         timeRemaining: timeRemaining
//       };
//       console.log('📦 Request body size:', JSON.stringify(requestBody).length, 'bytes');
//       console.log('📦 Request body preview:', JSON.stringify(requestBody).substring(0, 200) + '...');
      
//       console.log('📤 Making PATCH request to:', apiUrl);
//       const startTime = Date.now();
//       const response = await fetch(apiUrl, {
//         method: 'PATCH',
//         headers: { 
//           'Content-Type': 'application/json',
//           'X-Debug-Timestamp': startTime.toString()
//         },
//         body: JSON.stringify(requestBody)
//       });
//       const endTime = Date.now();
//       const duration = endTime - startTime;
      
//       console.log('📥 Response received in', duration, 'ms');
//       console.log('📥 Response status:', response.status);
//       console.log('📥 Response statusText:', response.statusText);
//       console.log('📥 Response ok:', response.ok);
//       console.log('📥 Response URL:', response.url);
//       console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));

//       if (!response.ok) {
//         let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
//         let responseText = '';
        
//         try {
//           responseText = await response.text();
//           console.log('❌ Error response text length:', responseText.length);
//           console.log('❌ Error response text (raw debug):', JSON.stringify(responseText));
          
//           // Check if responseText is truly empty or just whitespace
//           if (responseText && responseText.trim().length > 0) {
//             console.log('❌ Error response has content, attempting to parse as JSON');
//             try {
//               const errorData = JSON.parse(responseText);
//               console.error('❌ Parsed error data:', errorData);
              
//               if (errorData.errors && errorData.errors.length > 0) {
//                 errorMessage = errorData.errors[0];
//               } else if (errorData.message) {
//                 errorMessage = errorData.message;
//               } else if (errorData.error) {
//                 errorMessage = errorData.error;
//               } else if (typeof errorData === 'string') {
//                 errorMessage = errorData;
//               }
//             } catch (parseError) {
//               console.error('❌ Failed to parse error JSON:', parseError);
//               // If not JSON, use the text as is (truncated)
//               errorMessage = responseText.substring(0, 200);
//             }
//           } else {
//             console.error('❌ Empty or whitespace-only error response body');
//             // Provide more specific error messages based on status code
//             switch (response.status) {
//               case 400:
//                 errorMessage = 'Bad request - the server could not understand the request';
//                 break;
//               case 401:
//                 errorMessage = 'Unauthorized - please log in again';
//                 break;
//               case 403:
//                 errorMessage = 'Forbidden - you do not have permission to update this attempt';
//                 break;
//               case 404:
//                 errorMessage = 'API endpoint not found. Please check if the API route exists.';
//                 break;
//               case 500:
//                 errorMessage = 'Internal server error - the server encountered an unexpected condition';
//                 break;
//               default:
//                 errorMessage = `HTTP ${response.status}: ${response.statusText || 'Empty response received from server'}`;
//             }
//           }
//         } catch (error) {
//           console.error('❌ Failed to read error response:', error);
//           errorMessage = `HTTP ${response.status}: Could not read response - ${error instanceof Error ? error.message : String(error)}`;
//         }
        
//         console.error('❌ Throwing error:', errorMessage);
//         throw new Error(errorMessage);
//       }

//       // Handle successful response
//       console.log('✅ Request was successful!');
//       let result;
//       let responseText = '';
      
//       try {
//         responseText = await response.text();
//         console.log('✅ Success response text length:', responseText.length);
        
//         if (responseText && responseText.trim()) {
//           console.log('✅ Success response text (first 500 chars):', responseText.substring(0, 500));
//           try {
//             result = JSON.parse(responseText);
//             console.log('✅ Parsed success result:', result);
//           } catch (parseError) {
//             console.error('❌ Failed to parse success JSON:', parseError);
//             result = { 
//               success: true, 
//               message: 'Progress saved (parse error)'
//             };
//           }
//         } else {
//           console.log('✅ Empty success response - creating default result');
//           result = { 
//             success: true, 
//             message: 'Progress saved (empty response)'
//           };
//         }
//       } catch (error) {
//         console.error('❌ Failed to read success response:', error);
//         console.error('❌ Response text that failed:', responseText);
//         result = { 
//           success: true, 
//           message: 'Progress saved (read error)'
//         };
//       }
      
//       // FIXED: Your database doesn't have last_activity_at, so just use current time
//       const currentTime = new Date().toLocaleTimeString();
//       console.log('⏰ Setting last save time to:', currentTime);
//       setLastSaveTime(currentTime);
      
//       console.log('✅ ===== saveProgress completed successfully =====');
//       return result;
      
//     } catch (error: any) {
//       console.error('❌❌❌ ===== saveProgress FAILED =====');
//       console.error('❌❌❌ Error message:', error.message);
//       console.error('❌❌❌ Error stack:', error.stack);
//       console.error('❌❌❌ ===== END ERROR =====');
//       throw error;
//     }
//   };

//   // Handle time up
//   const handleTimeUp = useCallback(() => {
//     console.log('⏰ Time is up! Auto-submitting quiz...');
//     toast.error('Time is up! Your quiz will be automatically submitted.');
//     setTimeout(() => {
//       submitQuiz();
//     }, 3000);
//   }, []);

//   // Timer setup
//   const {
//     timeRemaining,
//     formattedTime,
//     isTimeUp,
//     isWarning,
//     isCritical,
//     pauseTimer,
//     resumeTimer
//   } = useQuizTimer({
//     initialTimeRemaining,
//     onTimeUp: handleTimeUp,
//     onAutoSave: autoSaveProgress,
//     autoSaveInterval: 30000
//   });

//   // Handle answer change
//   const handleAnswerChange = (answer: string | string[] | null) => {
//     if (!currentQuestion) return;
    
//     console.log('📝 Answer changed for question:', currentQuestion.id, answer);
    
//     setUserAnswers(prev => {
//       const updatedAnswers = [...prev];
//       const answerIndex = updatedAnswers.findIndex(a => a.questionId === currentQuestion.id);
      
//       if (answerIndex >= 0) {
//         updatedAnswers[answerIndex] = {
//           ...updatedAnswers[answerIndex],
//           answer,
//           timeSpent: updatedAnswers[answerIndex].timeSpent + 1
//         };
//       }
      
//       return updatedAnswers;
//     });
//   };

//   // Handle mark for review toggle
//   const handleToggleReview = () => {
//     if (!currentQuestion) return;
    
//     setUserAnswers(prev => {
//       const updatedAnswers = [...prev];
//       const answerIndex = updatedAnswers.findIndex(a => a.questionId === currentQuestion.id);
      
//       if (answerIndex >= 0) {
//         updatedAnswers[answerIndex] = {
//           ...updatedAnswers[answerIndex],
//           markedForReview: !updatedAnswers[answerIndex].markedForReview
//         };
//       }
      
//       return updatedAnswers;
//     });
//   };

//   // Navigate to question
//   const handleQuestionSelect = (index: number) => {
//     setCurrentQuestionIndex(index);
//   };

//   // Navigate to previous question
//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   // Navigate to next question
//   const handleNext = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };



//   // Submit quiz - FIXED: No longer expects last_activity_at from API
// // In /src/components/assessments/quiz-player.tsx - FIXED submitQuiz function
// // Look for the submitQuiz function (around line 1100-1250 in your code)

// const submitQuiz = async () => {
//   console.log('🚀 ===== STARTING submitQuiz =====');
//   console.log('🚀 Current state:', {
//     attemptId,
//     isTemp: attemptId?.startsWith('temp-attempt-'),
//     userAnswersCount: userAnswers.length,
//     timeRemaining,
//     isLoading,
//     isSaving,
//     courseId, // Check if courseId is defined here
//     assessmentId: assessment?.id
//   });
  
//   // CRITICAL FIX: Check if courseId is available
//   if (!courseId) {
//     console.error('❌ courseId is undefined! Cannot redirect to results page.');
//     toast.error('Error: Course information missing. Please contact support.');
//     return;
//   }
  
//   setIsLoading(true);
//   pauseTimer();

//   try {
//     // If using temp attempt, create a real one first
//     let finalAttemptId = attemptId;
    
//     if (attemptId.startsWith('temp-attempt-')) {
//       console.log('🔄 Creating real attempt for temp ID...');
//       const createResponse = await fetch(`/api/student/assessments/${assessment.id}/attempts`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' }
//       });
      
//       if (createResponse.ok) {
//         const createResult = await createResponse.json();
//         finalAttemptId = createResult.attempt?.id || attemptId;
//         console.log('✅ Real attempt created:', finalAttemptId);
//       } else {
//         console.warn('⚠️ Could not create real attempt, using temp ID');
//         toast.warning('Could not create attempt. Please try again.');
//         resumeTimer();
//         setIsLoading(false);
//         return;
//       }
//     }

//     // Save final progress before submission
//     console.log('💾 Final save before submission...');
//     try {
//       await saveProgress();
//     } catch (saveError) {
//       console.warn('⚠️ Final save failed, continuing with submission:', saveError);
//       // Continue with submission even if save fails
//     }

//     console.log('📤 Submitting to student API...');
//     const submitUrl = `/api/student/assessments/${assessment.id}/attempts/${finalAttemptId}/submit`;
//     console.log('🌐 Submit URL:', submitUrl);
    
//     const submitBody = {
//       answers: userAnswers,
//       finalTimeRemaining: timeRemaining
//     };
//     console.log('📦 Submit body preview:', JSON.stringify(submitBody).substring(0, 200) + '...');
    
//     const response = await fetch(submitUrl, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(submitBody)
//     });

//     console.log('📥 Submit response status:', response.status);
//     console.log('📥 Submit response ok:', response.ok);

//     if (!response.ok) {
//       let errorMessage = 'Failed to submit quiz';
      
//       try {
//         const responseText = await response.text();
//         console.log('📄 Submit raw response:', responseText);
        
//         if (responseText) {
//           const errorData = JSON.parse(responseText);
//           console.error('❌ Submit quiz error response:', errorData);
          
//           if (errorData.errors && errorData.errors.length > 0) {
//             errorMessage = errorData.errors[0];
//           } else if (errorData.message) {
//             errorMessage = errorData.message;
//           } else if (errorData.error) {
//             errorMessage = errorData.error;
//           }
//         }
//       } catch (e) {
//         console.error('❌ Could not parse submit error response:', e);
//         errorMessage = response.statusText || `HTTP ${response.status}`;
//       }
      
//       throw new Error(errorMessage);
//     }

//     const result = await response.json();
//     console.log('✅ Quiz submission result:', result);
    
//     if (result.success) {
//       toast.success('Quiz submitted successfully!');
      
//       // CRITICAL FIX: Ensure courseId is used and not undefined
//       console.log('📍 Redirecting to results page with:', {
//         courseId,
//         assessmentId: assessment.id,
//         attemptId: finalAttemptId
//       });
      
//       // Redirect based on assessment settings
//       if (assessment.show_results_immediately) {
//         console.log('📊 Redirecting to results...');
//         router.push(`/courses/learn/${courseId}/quiz/${assessment.id}/results?attempt=${finalAttemptId}`);
//       } else {
//         console.log('🏠 Redirecting to course...');
//         router.push(`/courses/learn/${courseId}`);
//         toast.info('Your results will be available soon.');
//       }
//     } else {
//       toast.error(result.message || 'Failed to submit quiz');
//       resumeTimer();
//       setIsLoading(false);
//     }

//   } catch (error: any) {
//     console.error('❌❌❌ Error submitting quiz:', error);
//     console.error('❌❌❌ Error message:', error.message);
//     console.error('❌❌❌ Error stack:', error.stack);
    
//     if (error.message.includes('Failed to save progress')) {
//       toast.error('Could not save your progress. Please check your connection and try again.');
//     } else if (error.message.includes('Failed to submit quiz')) {
//       toast.error('Failed to submit quiz. Please try again.');
//     } else {
//       toast.error('An unexpected error occurred. Please try again.');
//     }
    
//     resumeTimer();
//     setIsLoading(false);
//   }
// };


//   // Handle exit
//   const handleExit = () => {
//     if (answeredCount > 0) {
//       if (window.confirm('You have unsaved progress. Are you sure you want to exit?')) {
//         console.log('🚪 Exiting quiz...');
//         if (onExit) {
//           onExit();
//         } else {
//           router.push(`/courses/learn/${courseId}`);
//         }
//       }
//     } else {
//       console.log('🚪 Exiting quiz...');
//       if (onExit) {
//         onExit();
//       } else {
//         router.push(`/courses/learn/${courseId}`);
//       }
//     }
//   };

//   // Prepare question status for navigation
//   const questionStatus = questions.map((question, index) => {
//     const answer = userAnswers.find(a => a.questionId === question.id);
    
//     let hasAnswer = false;
//     if (answer?.answer) {
//       if (typeof answer.answer === 'string') {
//         hasAnswer = answer.answer.trim().length > 0;
//       } else if (Array.isArray(answer.answer)) {
//         hasAnswer = answer.answer.some(item => item && item.toString().trim().length > 0);
//       }
//     }
    
//     return {
//       id: question.id,
//       order: index,
//       answered: hasAnswer,
//       markedForReview: answer?.markedForReview || false,
//       current: index === currentQuestionIndex
//     };
//   });

//   const answeredCount = questionStatus.filter(q => q.answered).length;
//   const markedCount = questionStatus.filter(q => q.markedForReview).length;

//   // Auto-save effect
//   useEffect(() => {
//     if (!isInitialized) return;
    
//     const saveInterval = setInterval(() => {
//       if (autoSaveEnabled && !isLoading && !isSaving) {
//         autoSaveProgress();
//       }
//     }, 60000); // Auto-save every minute

//     return () => clearInterval(saveInterval);
//   }, [autoSaveEnabled, autoSaveProgress, isLoading, isSaving, isInitialized]);

//   // Warn before leaving
//   useEffect(() => {
//     if (!isInitialized) return;
    
//     const handleBeforeUnload = (e: BeforeUnloadEvent) => {
//       if (answeredCount > 0) {
//         e.preventDefault();
//         e.returnValue = 'You have unsaved quiz progress. Are you sure you want to leave?';
//       }
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);
//     return () => window.removeEventListener('beforeunload', handleBeforeUnload);
//   }, [answeredCount, isInitialized]);

//   // Debug logging
//   useEffect(() => {
//     console.log('🔍 QuizPlayer State Update:', {
//       currentQuestionIndex,
//       userAnswersCount: userAnswers.length,
//       currentQuestionId: currentQuestion?.id,
//       currentAnswer: currentAnswer,
//       isInitialized,
//       isLoading,
//       isSaving,
//       answeredCount,
//       markedCount
//     });
//   }, [currentQuestionIndex, userAnswers, currentQuestion, currentAnswer, isInitialized, isLoading, isSaving, answeredCount, markedCount]);

//   if (!currentQuestion || !isInitialized) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-center space-y-4">
//           <Loader2 className="h-8 w-8 animate-spin mx-auto" />
//           <p>Loading quiz...</p>
//           <p className="text-sm text-muted-foreground">Initializing questions...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <Card>
//         <CardHeader className="pb-3">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div className="flex items-center gap-3">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={handleExit}
//                 disabled={isLoading}
//                 className="gap-2"
//               >
//                 <ArrowLeft className="h-4 w-4" />
//                 Exit
//               </Button>
              
//               <div>
//                 <CardTitle className="text-xl">{assessment.title}</CardTitle>
//                 <p className="text-sm text-muted-foreground">
//                   Question {currentQuestionIndex + 1} of {questions.length}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               {/* Timer */}
//               <div className="min-w-[140px]">
//                 <QuizTimer
//                   timeLimit={assessment.time_limit}
//                   initialTimeRemaining={initialTimeRemaining}
//                   onTimeUp={handleTimeUp}
//                   onAutoSave={autoSaveProgress}
//                   showIcon={true}
//                   showWarning={true}
//                 />
//               </div>

//               {/* Save Status */}
//               <div className="flex items-center gap-2 text-sm">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={autoSaveProgress}
//                   disabled={isSaving || isLoading}
//                   className="h-8 gap-1"
//                 >
//                   {isSaving ? (
//                     <Loader2 className="h-3 w-3 animate-spin" />
//                   ) : (
//                     <Save className="h-3 w-3" />
//                   )}
//                   {isSaving ? 'Saving...' : 'Save'}
//                 </Button>
//                 <span className="text-xs text-muted-foreground hidden md:inline">
//                   Last save: {lastSaveTime}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Instructions */}
//           {assessment.instructions && (
//             <Alert className="mt-4">
//               <AlertTriangle className="h-4 w-4" />
//               <AlertDescription className="text-sm">
//                 {assessment.instructions}
//               </AlertDescription>
//             </Alert>
//           )}
//         </CardHeader>
//       </Card>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Question Area */}
//         <div className="lg:col-span-2">
//           <QuizQuestion
//             question={currentQuestion}
//             currentAnswer={currentAnswer?.answer || null}
//             onAnswerChange={handleAnswerChange}
//             disabled={isLoading || isTimeUp}
//             markedForReview={currentAnswer?.markedForReview || false}
//             onToggleReview={handleToggleReview}
//           />
//         </div>

//         {/* Navigation Sidebar */}
//         <div className="lg:col-span-1">
//           <Card className="sticky top-6">
//             <CardContent className="p-4">
//               <QuizNavigation
//                 questions={questionStatus}
//                 currentQuestionIndex={currentQuestionIndex}
//                 onQuestionSelect={handleQuestionSelect}
//                 onPrevious={handlePrevious}
//                 onNext={handleNext}
//                 onSubmit={() => setShowSubmitModal(true)}
//                 showSubmit={currentQuestionIndex === questions.length - 1}
//                 disabled={isLoading || isTimeUp}
//               />
//             </CardContent>
//           </Card>

//           {/* Progress Stats */}
//           <div className="mt-4 p-4 bg-card border rounded-lg space-y-2">
//             <div className="flex justify-between items-center">
//               <span className="text-sm font-medium">Progress</span>
//               <span className="text-sm text-muted-foreground">
//                 {answeredCount}/{questions.length}
//               </span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div 
//                 className="bg-primary h-2 rounded-full transition-all duration-300"
//                 style={{ width: `${(answeredCount / questions.length) * 100}%` }}
//               />
//             </div>
//             <div className="flex justify-between text-xs text-muted-foreground pt-1">
//               <span>Answered: {answeredCount}</span>
//               <span>Marked: {markedCount}</span>
//             </div>
//           </div>

//           {/* Auto-save Toggle */}
//           <div className="mt-4 p-3 bg-card border rounded-lg">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 {isSaving ? (
//                   <Loader2 className="h-4 w-4 animate-spin text-primary" />
//                 ) : (
//                   <CheckCircle2 className="h-4 w-4 text-green-500" />
//                 )}
//                 <span className="text-sm font-medium">Auto-save</span>
//               </div>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={autoSaveEnabled}
//                   onChange={(e) => setAutoSaveEnabled(e.target.checked)}
//                   className="sr-only peer"
//                   disabled={isSaving}
//                 />
//                 <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
//               </label>
//             </div>
//             <p className="text-xs text-muted-foreground mt-2">
//               {autoSaveEnabled 
//                 ? 'Progress is saved automatically every minute' 
//                 : 'Auto-save is disabled. Remember to save manually.'
//               }
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Time Warning */}
//       {isCritical && !isTimeUp && (
//         <Alert variant="destructive" className="animate-pulse">
//           <AlertTriangle className="h-4 w-4" />
//           <AlertDescription>
//             Time is almost up! Please submit your quiz soon.
//           </AlertDescription>
//         </Alert>
//       )}

//       {/* Submission Modal */}
//       <QuizSubmissionModal
//         isOpen={showSubmitModal}
//         onClose={() => setShowSubmitModal(false)}
//         onSubmit={submitQuiz}
//         totalQuestions={questions.length}
//         answeredQuestions={answeredCount}
//         markedQuestions={markedCount}
//         timeRemaining={timeRemaining}
//         isLoading={isLoading}
//       />
//     </div>
//   );
// }



























// /src/components/assessments/quiz-player.tsx -

'use client'

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Clock, 
  Save, 
  AlertTriangle,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { QuizTimer } from './quiz-timer';
import { QuizQuestion } from './quiz-question';
import { QuizNavigation } from './quiz-navigation';
import { QuizSubmissionModal } from './quiz-submission-modal';
import { useQuizTimer } from '@/hooks/use-quiz-timer';
import { cn } from '@/lib/utils';

interface QuizQuestionType {
  id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay' | 'matching' | 'fill_blank' | 'code' | 'file_upload';
  options: Array<{
    text: string;
    correct?: boolean;
    explanation?: string;
  }> | null;
  points: number;
  image_url: string | null;
  video_url: string | null;
  explanation: string | null;
  hints: string[] | null;
  order_index: number;
  possible_answers?: string[] | null;
  code_template?: string | null;
  allowed_file_types?: string[] | null;
}

interface Assessment {
  id: string;
  title: string;
  description: string | null;
  instructions: string | null;
  time_limit: number | null;
  passing_score: number;
  max_attempts: number;
  show_correct_answers: boolean;
  show_results_immediately: boolean;
  total_points: number;
}

interface UserAnswer {
  questionId: string;
  answer: string | string[] | null;
  timeSpent: number;
  markedForReview: boolean;
}

interface QuizPlayerProps {
  assessment: Assessment;
  questions: QuizQuestionType[];
  attemptId: string;
  initialAnswers?: UserAnswer[];
  initialTimeRemaining?: number | null;
  courseId: string;
  onExit?: () => void;
}

export function QuizPlayer({
  assessment,
  questions,
  attemptId,
  initialAnswers = [],
  initialTimeRemaining = null,
  courseId,
  onExit
}: QuizPlayerProps) {
  const router = useRouter();
  
  // ========== DEBUG 1: Check props on mount ==========
  console.log('🎯 [QuizPlayer-DEBUG-1] Props received:', {
    courseId, // THIS IS CRITICAL - check if undefined
    assessmentTitle: assessment?.title,
    assessmentId: assessment?.id,
    questionsCount: questions?.length,
    attemptId,
    isTempAttempt: attemptId?.startsWith('temp-attempt-'),
    hasCourseId: !!courseId,
    courseIdType: typeof courseId,
    courseIdValue: courseId
  });
  
  // ========== DEBUG 2: Check window location ==========
  useEffect(() => {
    console.log('🎯 [QuizPlayer-DEBUG-2] Window location:', {
      pathname: window.location.pathname,
      fullURL: window.location.href,
      pathParts: window.location.pathname.split('/')
    });
    
    // Extract courseId from URL as backup
    const pathParts = window.location.pathname.split('/');
    const learnIndex = pathParts.indexOf('learn');
    const urlCourseId = learnIndex !== -1 && learnIndex + 1 < pathParts.length 
      ? pathParts[learnIndex + 1] 
      : null;
    
    console.log('🎯 [QuizPlayer-DEBUG-2] Extracted from URL:', {
      learnIndex,
      urlCourseId,
      isValidCourseId: urlCourseId && urlCourseId !== 'undefined' && urlCourseId.length > 10
    });
  }, []);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState<string>('Never');
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasLoadedSavedProgress, setHasLoadedSavedProgress] = useState(false);

  // DEBUG: Log props and test API endpoint on mount
  useEffect(() => {
    console.log('🎯 QuizPlayer Component Mounted');
    console.log('🎯 Props:', {
      assessmentId: assessment?.id,
      assessmentTitle: assessment?.title,
      attemptId,
      isTempAttempt: attemptId?.startsWith('temp-attempt-'),
      courseId,
      questionsCount: questions?.length,
      isInitialized,
      hasLoadedSavedProgress
    });
    
    if (attemptId && assessment?.id) {
      const apiUrl = `/api/student/assessments/${assessment.id}/attempts/${attemptId}`;
      console.log('🎯 API Endpoint will be:', apiUrl);
      
      // Test the endpoint with a simple GET request
      console.log('🎯 Testing API endpoint...');
      fetch(apiUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(async (res) => {
          console.log('🎯 Endpoint test GET result:', {
            status: res.status,
            statusText: res.statusText,
            ok: res.ok,
            url: res.url
          });
          
          const responseText = await res.text();
          console.log('🎯 GET response text length:', responseText.length);
          console.log('🎯 GET response text (first 500 chars):', responseText.substring(0, 500));
          
          if (!res.ok) {
            console.error('🎯 Endpoint returned error status');
            if (responseText.trim()) {
              try {
                const errorData = JSON.parse(responseText);
                console.error('🎯 Parsed error data:', errorData);
              } catch (parseError) {
                console.error('🎯 Could not parse error response');
              }
            }
          }
        })
        .catch(err => {
          console.error('🎯 Endpoint test failed:', err);
          console.error('🎯 Error details:', err.message);
        });
    }
  }, []); // Empty dependency array = run once on mount

  // Helper function to get default answer based on question type
  const getDefaultAnswerForQuestionType = (questionType: string): string | string[] | null => {
    switch (questionType) {
      case 'multiple_choice':
      case 'true_false':
      case 'short_answer':
      case 'essay':
      case 'code':
      case 'file_upload':
        return '';
      case 'matching':
      case 'fill_blank':
        return [];
      default:
        return null;
    }
  };

  // Load saved progress on initial mount
  useEffect(() => {
    const loadSavedProgress = async () => {
      if (!attemptId || attemptId.startsWith('temp-attempt-') || hasLoadedSavedProgress) {
        console.log('⚠️ Skipping saved progress load:', { 
          attemptId, 
          isTemp: attemptId?.startsWith('temp-attempt-'),
          hasLoaded: hasLoadedSavedProgress 
        });
        initializeDefaultAnswers();
        return;
      }

      try {
        console.log('📥 Loading saved progress for attempt:', attemptId);
        // Use student-specific API
        const response = await fetch(`/api/student/assessments/${assessment.id}/attempts/${attemptId}`);
        
        if (response.ok) {
          const data = await response.json();
          console.log('✅ Loaded saved progress response:', data);
          
          if (data.attempt && data.attempt.answers_json) {
            // Parse the answers_json from the attempt
            let savedAnswers: UserAnswer[] = [];
            try {
              savedAnswers = Array.isArray(data.attempt.answers_json) 
                ? data.attempt.answers_json 
                : JSON.parse(data.attempt.answers_json);
              console.log('📊 Parsed saved answers:', savedAnswers);
            } catch (e) {
              console.error('Error parsing answers_json:', e);
              savedAnswers = [];
            }
            
            // Merge loaded answers with questions
            const loadedAnswers = questions.map((question) => {
              const savedAnswer = savedAnswers.find((a: any) => a.questionId === question.id);
              if (savedAnswer) {
                console.log(`✅ Found saved answer for question ${question.id}:`, savedAnswer);
                return savedAnswer;
              }
              console.log(`📝 Creating default for question ${question.id}`);
              return {
                questionId: question.id,
                answer: getDefaultAnswerForQuestionType(question.question_type),
                timeSpent: 0,
                markedForReview: false
              };
            });
            
            setUserAnswers(loadedAnswers);
            // FIXED: Your database doesn't have last_activity_at, so just use current time
            const currentTime = new Date().toLocaleTimeString();
            setLastSaveTime(currentTime);
            console.log('✅ Set loaded answers and save time:', loadedAnswers);
          } else {
            console.log('⚠️ No saved answers found, using defaults');
            initializeDefaultAnswers();
          }
        } else {
          // Try to get error details
          let errorMessage = 'Failed to load progress';
          try {
            const responseText = await response.text();
            if (responseText) {
              const errorData = JSON.parse(responseText);
              console.warn('⚠️ Could not load saved progress:', errorData);
              errorMessage = errorData.message || errorData.error || errorMessage;
            }
          } catch (e) {
            console.warn('⚠️ Could not parse error response:', e);
          }
          console.warn('⚠️', errorMessage);
          initializeDefaultAnswers();
        }
      } catch (error) {
        console.error('Error loading saved progress:', error);
        initializeDefaultAnswers();
      } finally {
        setHasLoadedSavedProgress(true);
        setIsInitialized(true);
      }
    };

    const initializeDefaultAnswers = () => {
      console.log('📝 Initializing default answers for', questions.length, 'questions');
      const defaultAnswers = questions.map((question) => {
        const existingAnswer = initialAnswers.find(a => a.questionId === question.id);
        return existingAnswer || {
          questionId: question.id,
          answer: getDefaultAnswerForQuestionType(question.question_type),
          timeSpent: 0,
          markedForReview: false
        };
      });
      console.log('✅ Default answers initialized:', defaultAnswers);
      setUserAnswers(defaultAnswers);
      setIsInitialized(true);
    };

    if (questions.length > 0 && !isInitialized) {
      console.log('🔄 Initializing quiz with', questions.length, 'questions');
      loadSavedProgress();
    }
  }, [questions, attemptId, assessment.id, initialAnswers, isInitialized, hasLoadedSavedProgress]);

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = userAnswers.find(a => a.questionId === currentQuestion?.id);

  // Auto-save progress function
  const autoSaveProgress = useCallback(async () => {
    if (!autoSaveEnabled || isLoading || isSaving || !isInitialized) return;

    setIsSaving(true);
    try {
      await saveProgress();
      // FIXED: Your database doesn't have last_activity_at, so just use current time
      setLastSaveTime(new Date().toLocaleTimeString());
      console.log('💾 Auto-save completed at:', new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setIsSaving(false);
    }
  }, [autoSaveEnabled, isLoading, isSaving, isInitialized]);

  // Manual save progress - FIXED: No longer expects last_activity_at from API
  const saveProgress = async () => {
    // Don't save if using temp attempt ID
    if (!attemptId || attemptId.startsWith('temp-attempt-')) {
      console.log('⚠️ Using temp attempt ID, progress not saved to server');
      return { success: true, message: 'Using temporary attempt, progress not saved to server' };
    }

    try {
      console.log('💾 ===== STARTING saveProgress =====');
      
      // SECTION 1: EXISTING DEBUG TESTS (PRESERVED)
      console.log('🔍 ===== SECTION 1: Existing debug tests =====');
      
      // EXISTING DEBUG: Test the debug endpoint
      console.log('🔍 Testing debug endpoint...');
      try {
        const debugResponse = await fetch('/api/student/debug');
        const debugText = await debugResponse.text();
        console.log('🔍 Debug endpoint response status:', debugResponse.status);
        console.log('🔍 Debug endpoint response:', debugText.substring(0, 500));
      } catch (debugError) {
        console.error('🔍 Debug endpoint test failed:', debugError);
      }
      
      // EXISTING DEBUG: Test a simple PATCH endpoint
      console.log('🔍 Testing simple PATCH endpoint...');
      try {
        const testResponse = await fetch('/api/student/assessments/test', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ test: 'data' })
        });
        const testText = await testResponse.text();
        console.log('🔍 Test PATCH response status:', testResponse.status);
        console.log('🔍 Test PATCH response:', testText);
      } catch (testError) {
        console.error('🔍 Test PATCH failed:', testError);
      }
      
      // SECTION 2: NEW DEBUG - Test GET on actual endpoint first
      console.log('🔍 ===== SECTION 2: New GET test on actual endpoint =====');
      const testGetUrl = `/api/student/assessments/${assessment.id}/attempts/${attemptId}`;
      console.log('🔍 GET test URL:', testGetUrl);
      
      try {
        const getTest = await fetch(testGetUrl, { method: 'GET' });
        const getText = await getTest.text();
        console.log('🔍 GET test - Status:', getTest.status);
        console.log('🔍 GET test - OK:', getTest.ok);
        console.log('🔍 GET test - Response length:', getText.length);
        
        if (!getTest.ok) {
          console.error('🔍 GET test failed with status:', getTest.status);
          if (getText && getText.trim()) {
            console.log('🔍 GET test error response:', getText.substring(0, 500));
          }
        } else {
          console.log('🔍 GET test succeeded!');
          // Parse and show attempt details
          try {
            const attemptData = JSON.parse(getText);
            console.log('🔍 Attempt details from GET:', {
              success: attemptData.success,
              attemptId: attemptData.attempt?.id,
              submitted: attemptData.attempt?.submitted_at ? 'Yes' : 'No',
              hasAnswersJson: attemptData.attempt?.answers_json ? 'Yes' : 'No',
              userId: attemptData.attempt?.user_id,
              enrollmentUserId: attemptData.attempt?.enrollment_user_id
            });
          } catch (parseError) {
            console.error('🔍 Could not parse GET response as JSON:', parseError);
            console.log('🔍 GET response raw (first 500 chars):', getText.substring(0, 500));
          }
        }
      } catch (getError) {
        console.error('🔍 GET test error:', getError);
      }
      
      // SECTION 3: ORIGINAL SAVE PROGRESS LOGIC (PRESERVED)
      console.log('🔍 ===== SECTION 3: Original save progress logic =====');
      
      console.log('💾 Current state:');
      console.log('💾 attemptId:', attemptId);
      console.log('💾 assessment.id:', assessment?.id);
      console.log('💾 assessment.title:', assessment?.title);
      console.log('💾 userAnswers count:', userAnswers.length);
      console.log('💾 userAnswers sample (first 2):', userAnswers.slice(0, 2));
      console.log('💾 timeRemaining:', timeRemaining);
      console.log('💾 isInitialized:', isInitialized);
      console.log('💾 isSaving:', isSaving);
      console.log('💾 isLoading:', isLoading);
      
      const apiUrl = `/api/student/assessments/${assessment.id}/attempts/${attemptId}`;
      console.log('🌐 Final PATCH URL:', apiUrl);
      
      const requestBody = {
        answers: userAnswers,
        timeRemaining: timeRemaining
      };
      console.log('📦 Request body size:', JSON.stringify(requestBody).length, 'bytes');
      console.log('📦 Request body preview:', JSON.stringify(requestBody).substring(0, 200) + '...');
      
      console.log('📤 Making PATCH request to:', apiUrl);
      const startTime = Date.now();
      const response = await fetch(apiUrl, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'X-Debug-Timestamp': startTime.toString()
        },
        body: JSON.stringify(requestBody)
      });
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      console.log('📥 Response received in', duration, 'ms');
      console.log('📥 Response status:', response.status);
      console.log('📥 Response statusText:', response.statusText);
      console.log('📥 Response ok:', response.ok);
      console.log('📥 Response URL:', response.url);
      console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        let responseText = '';
        
        try {
          responseText = await response.text();
          console.log('❌ Error response text length:', responseText.length);
          console.log('❌ Error response text (raw debug):', JSON.stringify(responseText));
          
          // Check if responseText is truly empty or just whitespace
          if (responseText && responseText.trim().length > 0) {
            console.log('❌ Error response has content, attempting to parse as JSON');
            try {
              const errorData = JSON.parse(responseText);
              console.error('❌ Parsed error data:', errorData);
              
              if (errorData.errors && errorData.errors.length > 0) {
                errorMessage = errorData.errors[0];
              } else if (errorData.message) {
                errorMessage = errorData.message;
              } else if (errorData.error) {
                errorMessage = errorData.error;
              } else if (typeof errorData === 'string') {
                errorMessage = errorData;
              }
            } catch (parseError) {
              console.error('❌ Failed to parse error JSON:', parseError);
              // If not JSON, use the text as is (truncated)
              errorMessage = responseText.substring(0, 200);
            }
          } else {
            console.error('❌ Empty or whitespace-only error response body');
            // Provide more specific error messages based on status code
            switch (response.status) {
              case 400:
                errorMessage = 'Bad request - the server could not understand the request';
                break;
              case 401:
                errorMessage = 'Unauthorized - please log in again';
                break;
              case 403:
                errorMessage = 'Forbidden - you do not have permission to update this attempt';
                break;
              case 404:
                errorMessage = 'API endpoint not found. Please check if the API route exists.';
                break;
              case 500:
                errorMessage = 'Internal server error - the server encountered an unexpected condition';
                break;
              default:
                errorMessage = `HTTP ${response.status}: ${response.statusText || 'Empty response received from server'}`;
            }
          }
        } catch (error) {
          console.error('❌ Failed to read error response:', error);
          errorMessage = `HTTP ${response.status}: Could not read response - ${error instanceof Error ? error.message : String(error)}`;
        }
        
        console.error('❌ Throwing error:', errorMessage);
        throw new Error(errorMessage);
      }

      // Handle successful response
      console.log('✅ Request was successful!');
      let result;
      let responseText = '';
      
      try {
        responseText = await response.text();
        console.log('✅ Success response text length:', responseText.length);
        
        if (responseText && responseText.trim()) {
          console.log('✅ Success response text (first 500 chars):', responseText.substring(0, 500));
          try {
            result = JSON.parse(responseText);
            console.log('✅ Parsed success result:', result);
          } catch (parseError) {
            console.error('❌ Failed to parse success JSON:', parseError);
            result = { 
              success: true, 
              message: 'Progress saved (parse error)'
            };
          }
        } else {
          console.log('✅ Empty success response - creating default result');
          result = { 
            success: true, 
            message: 'Progress saved (empty response)'
          };
        }
      } catch (error) {
        console.error('❌ Failed to read success response:', error);
        console.error('❌ Response text that failed:', responseText);
        result = { 
          success: true, 
          message: 'Progress saved (read error)'
        };
      }
      
      // FIXED: Your database doesn't have last_activity_at, so just use current time
      const currentTime = new Date().toLocaleTimeString();
      console.log('⏰ Setting last save time to:', currentTime);
      setLastSaveTime(currentTime);
      
      console.log('✅ ===== saveProgress completed successfully =====');
      return result;
      
    } catch (error: any) {
      console.error('❌❌❌ ===== saveProgress FAILED =====');
      console.error('❌❌❌ Error message:', error.message);
      console.error('❌❌❌ Error stack:', error.stack);
      console.error('❌❌❌ ===== END ERROR =====');
      throw error;
    }
  };

  // Handle time up
  const handleTimeUp = useCallback(() => {
    console.log('⏰ Time is up! Auto-submitting quiz...');
    toast.error('Time is up! Your quiz will be automatically submitted.');
    setTimeout(() => {
      submitQuiz();
    }, 3000);
  }, []);

  // Timer setup
  const {
    timeRemaining,
    formattedTime,
    isTimeUp,
    isWarning,
    isCritical,
    pauseTimer,
    resumeTimer
  } = useQuizTimer({
    initialTimeRemaining,
    onTimeUp: handleTimeUp,
    onAutoSave: autoSaveProgress,
    autoSaveInterval: 30000
  });

  // Handle answer change
  const handleAnswerChange = (answer: string | string[] | null) => {
    if (!currentQuestion) return;
    
    console.log('📝 Answer changed for question:', currentQuestion.id, answer);
    
    setUserAnswers(prev => {
      const updatedAnswers = [...prev];
      const answerIndex = updatedAnswers.findIndex(a => a.questionId === currentQuestion.id);
      
      if (answerIndex >= 0) {
        updatedAnswers[answerIndex] = {
          ...updatedAnswers[answerIndex],
          answer,
          timeSpent: updatedAnswers[answerIndex].timeSpent + 1
        };
      }
      
      return updatedAnswers;
    });
  };

  // Handle mark for review toggle
  const handleToggleReview = () => {
    if (!currentQuestion) return;
    
    setUserAnswers(prev => {
      const updatedAnswers = [...prev];
      const answerIndex = updatedAnswers.findIndex(a => a.questionId === currentQuestion.id);
      
      if (answerIndex >= 0) {
        updatedAnswers[answerIndex] = {
          ...updatedAnswers[answerIndex],
          markedForReview: !updatedAnswers[answerIndex].markedForReview
        };
      }
      
      return updatedAnswers;
    });
  };

  // Navigate to question
  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  // Navigate to previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Navigate to next question
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // ========== DEBUG 3: Add debug to submitQuiz function ==========
  const submitQuiz = async () => {
    console.log('🚀 [QuizPlayer-DEBUG-3] Starting submitQuiz');
    
    // Check all possible courseId sources
    console.log('🔍 [QuizPlayer-DEBUG-3] CourseId sources:', {
      // 1. From props (main source)
      propsCourseId: courseId,
      propsCourseIdValid: !!courseId && courseId !== 'undefined',
      
      // 2. From URL (last resort)
      urlCourseId: (() => {
        if (typeof window === 'undefined') return 'no-window';
        const parts = window.location.pathname.split('/');
        const learnIdx = parts.indexOf('learn');
        return learnIdx !== -1 && learnIdx + 1 < parts.length ? parts[learnIdx + 1] : 'not-found';
      })(),
    });
    
    // CRITICAL: Determine which courseId to use
    let effectiveCourseId = courseId;
    
    if (!effectiveCourseId || effectiveCourseId === 'undefined') {
      console.warn('⚠️ [QuizPlayer-DEBUG-3] Props courseId invalid, trying alternatives');
      
      // Try from URL
      if (typeof window !== 'undefined') {
        const pathParts = window.location.pathname.split('/');
        const learnIndex = pathParts.indexOf('learn');
        if (learnIndex !== -1 && learnIndex + 1 < pathParts.length) {
          effectiveCourseId = pathParts[learnIndex + 1];
          console.log('🔍 [QuizPlayer-DEBUG-3] Using URL courseId:', effectiveCourseId);
        }
      }
      
      // If still invalid, show error
      if (!effectiveCourseId || effectiveCourseId === 'undefined') {
        console.error('❌ [QuizPlayer-DEBUG-3] ALL courseId sources failed!', {
          propsCourseId: courseId,
          windowPath: window?.location?.pathname
        });
        
        toast.error('Error: Course information missing. Please contact support.', {
          description: `Debug: props.courseId=${courseId}`
        });
        return;
      }
    }
    
    console.log('✅ [QuizPlayer-DEBUG-3] Using courseId:', effectiveCourseId);
    
    console.log('🚀 ===== STARTING submitQuiz =====');
    console.log('🚀 Current state:', {
      attemptId,
      isTemp: attemptId?.startsWith('temp-attempt-'),
      userAnswersCount: userAnswers.length,
      timeRemaining,
      isLoading,
      isSaving,
      courseId: effectiveCourseId, // Use effectiveCourseId
      assessmentId: assessment?.id
    });
    
    // CRITICAL FIX: Check if courseId is available
    if (!effectiveCourseId) {
      console.error('❌ courseId is undefined! Cannot redirect to results page.');
      toast.error('Error: Course information missing. Please contact support.');
      return;
    }
    
    setIsLoading(true);
    pauseTimer();

    try {
      // If using temp attempt, create a real one first
      let finalAttemptId = attemptId;
      
      if (attemptId.startsWith('temp-attempt-')) {
        console.log('🔄 Creating real attempt for temp ID...');
        const createResponse = await fetch(`/api/student/assessments/${assessment.id}/attempts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (createResponse.ok) {
          const createResult = await createResponse.json();
          finalAttemptId = createResult.attempt?.id || attemptId;
          console.log('✅ Real attempt created:', finalAttemptId);
        } else {
          console.warn('⚠️ Could not create real attempt, using temp ID');
          toast.warning('Could not create attempt. Please try again.');
          resumeTimer();
          setIsLoading(false);
          return;
        }
      }

      // Save final progress before submission
      console.log('💾 Final save before submission...');
      try {
        await saveProgress();
      } catch (saveError) {
        console.warn('⚠️ Final save failed, continuing with submission:', saveError);
        // Continue with submission even if save fails
      }

      console.log('📤 Submitting to student API...');
      const submitUrl = `/api/student/assessments/${assessment.id}/attempts/${finalAttemptId}/submit`;
      console.log('🌐 Submit URL:', submitUrl);
      
      const submitBody = {
        answers: userAnswers,
        finalTimeRemaining: timeRemaining
      };
      console.log('📦 Submit body preview:', JSON.stringify(submitBody).substring(0, 200) + '...');
      
      const response = await fetch(submitUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitBody)
      });

      console.log('📥 Submit response status:', response.status);
      console.log('📥 Submit response ok:', response.ok);

      if (!response.ok) {
        let errorMessage = 'Failed to submit quiz';
        
        try {
          const responseText = await response.text();
          console.log('📄 Submit raw response:', responseText);
          
          if (responseText) {
            const errorData = JSON.parse(responseText);
            console.error('❌ Submit quiz error response:', errorData);
            
            if (errorData.errors && errorData.errors.length > 0) {
              errorMessage = errorData.errors[0];
            } else if (errorData.message) {
              errorMessage = errorData.message;
            } else if (errorData.error) {
              errorMessage = errorData.error;
            }
          }
        } catch (e) {
          console.error('❌ Could not parse submit error response:', e);
          errorMessage = response.statusText || `HTTP ${response.status}`;
        }
        
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('✅ Quiz submission result:', result);
      
      if (result.success) {
        toast.success('Quiz submitted successfully!');
        
        // CRITICAL FIX: Ensure courseId is used and not undefined
        console.log('📍 [QuizPlayer-DEBUG-3] Redirecting to results page with:', {
          courseId: effectiveCourseId,
          assessmentId: assessment.id,
          attemptId: finalAttemptId
        });
        
        // Redirect based on assessment settings
        if (assessment.show_results_immediately) {
          console.log('📊 Redirecting to results...');
          router.push(`/courses/learn/${effectiveCourseId}/quiz/${assessment.id}/results?attempt=${finalAttemptId}`);
        } else {
          console.log('🏠 Redirecting to course...');
          router.push(`/courses/learn/${effectiveCourseId}`);
          toast.info('Your results will be available soon.');
        }
      } else {
        toast.error(result.message || 'Failed to submit quiz');
        resumeTimer();
        setIsLoading(false);
      }

    } catch (error: any) {
      console.error('❌❌❌ Error submitting quiz:', error);
      console.error('❌❌❌ Error message:', error.message);
      console.error('❌❌❌ Error stack:', error.stack);
      
      if (error.message.includes('Failed to save progress')) {
        toast.error('Could not save your progress. Please check your connection and try again.');
      } else if (error.message.includes('Failed to submit quiz')) {
        toast.error('Failed to submit quiz. Please try again.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
      
      resumeTimer();
      setIsLoading(false);
    }
  };

  // Handle exit
  const handleExit = () => {
    if (answeredCount > 0) {
      if (window.confirm('You have unsaved progress. Are you sure you want to exit?')) {
        console.log('🚪 Exiting quiz...');
        if (onExit) {
          onExit();
        } else {
          router.push(`/courses/learn/${courseId}`);
        }
      }
    } else {
      console.log('🚪 Exiting quiz...');
      if (onExit) {
        onExit();
      } else {
        router.push(`/courses/learn/${courseId}`);
      }
    }
  };

  // Prepare question status for navigation
  const questionStatus = questions.map((question, index) => {
    const answer = userAnswers.find(a => a.questionId === question.id);
    
    let hasAnswer = false;
    if (answer?.answer) {
      if (typeof answer.answer === 'string') {
        hasAnswer = answer.answer.trim().length > 0;
      } else if (Array.isArray(answer.answer)) {
        hasAnswer = answer.answer.some(item => item && item.toString().trim().length > 0);
      }
    }
    
    return {
      id: question.id,
      order: index,
      answered: hasAnswer,
      markedForReview: answer?.markedForReview || false,
      current: index === currentQuestionIndex
    };
  });

  const answeredCount = questionStatus.filter(q => q.answered).length;
  const markedCount = questionStatus.filter(q => q.markedForReview).length;

  // Auto-save effect
  useEffect(() => {
    if (!isInitialized) return;
    
    const saveInterval = setInterval(() => {
      if (autoSaveEnabled && !isLoading && !isSaving) {
        autoSaveProgress();
      }
    }, 60000); // Auto-save every minute

    return () => clearInterval(saveInterval);
  }, [autoSaveEnabled, autoSaveProgress, isLoading, isSaving, isInitialized]);

  // Warn before leaving
  useEffect(() => {
    if (!isInitialized) return;
    
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (answeredCount > 0) {
        e.preventDefault();
        e.returnValue = 'You have unsaved quiz progress. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [answeredCount, isInitialized]);

  // ========== DEBUG 4: Add to useEffect for state changes ==========
  useEffect(() => {
    console.log('🎯 [QuizPlayer-DEBUG-4] State updated:', {
      currentQuestionIndex,
      userAnswersCount: userAnswers.length,
      courseId, // Track if courseId changes (it shouldn't)
      isInitialized
    });
  }, [currentQuestionIndex, userAnswers, courseId, isInitialized]);

  // Debug logging
  useEffect(() => {
    console.log('🔍 QuizPlayer State Update:', {
      currentQuestionIndex,
      userAnswersCount: userAnswers.length,
      currentQuestionId: currentQuestion?.id,
      currentAnswer: currentAnswer,
      isInitialized,
      isLoading,
      isSaving,
      answeredCount,
      markedCount
    });
  }, [currentQuestionIndex, userAnswers, currentQuestion, currentAnswer, isInitialized, isLoading, isSaving, answeredCount, markedCount]);

  if (!currentQuestion || !isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p>Loading quiz...</p>
          <p className="text-sm text-muted-foreground">Initializing questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExit}
                disabled={isLoading}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Exit
              </Button>
              
              <div>
                <CardTitle className="text-xl">{assessment.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Timer */}
              <div className="min-w-[140px]">
                <QuizTimer
                  timeLimit={assessment.time_limit}
                  initialTimeRemaining={initialTimeRemaining}
                  onTimeUp={handleTimeUp}
                  onAutoSave={autoSaveProgress}
                  showIcon={true}
                  showWarning={true}
                />
              </div>

              {/* Save Status */}
              <div className="flex items-center gap-2 text-sm">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={autoSaveProgress}
                  disabled={isSaving || isLoading}
                  className="h-8 gap-1"
                >
                  {isSaving ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Save className="h-3 w-3" />
                  )}
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
                <span className="text-xs text-muted-foreground hidden md:inline">
                  Last save: {lastSaveTime}
                </span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          {assessment.instructions && (
            <Alert className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                {assessment.instructions}
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Question Area */}
        <div className="lg:col-span-2">
          <QuizQuestion
            question={currentQuestion}
            currentAnswer={currentAnswer?.answer || null}
            onAnswerChange={handleAnswerChange}
            disabled={isLoading || isTimeUp}
            markedForReview={currentAnswer?.markedForReview || false}
            onToggleReview={handleToggleReview}
          />
        </div>

        {/* Navigation Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardContent className="p-4">
              <QuizNavigation
                questions={questionStatus}
                currentQuestionIndex={currentQuestionIndex}
                onQuestionSelect={handleQuestionSelect}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSubmit={() => setShowSubmitModal(true)}
                showSubmit={currentQuestionIndex === questions.length - 1}
                disabled={isLoading || isTimeUp}
              />
            </CardContent>
          </Card>

          {/* Progress Stats */}
          <div className="mt-4 p-4 bg-card border rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                {answeredCount}/{questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(answeredCount / questions.length) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground pt-1">
              <span>Answered: {answeredCount}</span>
              <span>Marked: {markedCount}</span>
            </div>
          </div>

          {/* Auto-save Toggle */}
          <div className="mt-4 p-3 bg-card border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                )}
                <span className="text-sm font-medium">Auto-save</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoSaveEnabled}
                  onChange={(e) => setAutoSaveEnabled(e.target.checked)}
                  className="sr-only peer"
                  disabled={isSaving}
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {autoSaveEnabled 
                ? 'Progress is saved automatically every minute' 
                : 'Auto-save is disabled. Remember to save manually.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Time Warning */}
      {isCritical && !isTimeUp && (
        <Alert variant="destructive" className="animate-pulse">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Time is almost up! Please submit your quiz soon.
          </AlertDescription>
        </Alert>
      )}

      {/* Submission Modal */}
      <QuizSubmissionModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        onSubmit={submitQuiz}
        totalQuestions={questions.length}
        answeredQuestions={answeredCount}
        markedQuestions={markedCount}
        timeRemaining={timeRemaining}
        isLoading={isLoading}
      />
    </div>
  );
}