
// // /components/courses/file-viewer.tsx

// 'use client';

// import { useState, useEffect } from 'react';
// import {
//   Download,
//   Eye,
//   FileText,
//   File,
//   Image as ImageIcon,
//   Video,
//   Music,
//   Archive,
//   Code,
//   Presentation,
//   Sheet,
//   X,
//   Maximize2,
//   Minimize2,
//   ZoomIn,
//   ZoomOut,
//   RotateCw,
//   ExternalLink,
//   Printer,
//   BookOpen,
//   ChevronLeft,
//   ChevronRight,
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Progress } from '@/components/ui/progress';
// import { cn } from '@/lib/utils';

// interface FileViewerProps {
//   file: {
//     id: string;
//     name: string;
//     url: string;
//     type: string;
//     size: number | null;
//     lessonTitle: string;
//     moduleTitle: string;
//     isPdf?: boolean;
//   };
//   onClose?: () => void;
//   onNext?: () => void;
//   onPrev?: () => void;
//   showNavigation?: boolean;
// }

// export default function FileViewer({
//   file,
//   onClose,
//   onNext,
//   onPrev,
//   showNavigation = false,
// }: FileViewerProps) {
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [scale, setScale] = useState(1);
//   const [rotation, setRotation] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   // Format file size
//   const formatFileSize = (bytes: number | null) => {
//     if (!bytes) return 'Unknown size';
//     if (bytes < 1024) return `${bytes} B`;
//     const kb = bytes / 1024;
//     if (kb < 1024) return `${kb.toFixed(1)} KB`;
//     const mb = kb / 1024;
//     if (mb < 1024) return `${mb.toFixed(1)} MB`;
//     const gb = mb / 1024;
//     return `${gb.toFixed(2)} GB`;
//   };

//   // Get file icon based on type
//   const getFileIcon = () => {
//     const lowerType = file.type.toLowerCase();
    
//     if (file.isPdf || lowerType.includes('pdf')) {
//       return <FileText className="h-8 w-8 text-red-500" />;
//     }
//     if (lowerType.includes('word') || lowerType.includes('doc')) {
//       return <FileText className="h-8 w-8 text-blue-600" />;
//     }
//     if (lowerType.includes('excel') || lowerType.includes('sheet') || lowerType.includes('csv')) {
//       return <Sheet className="h-8 w-8 text-green-600" />;
//     }
//     if (lowerType.includes('powerpoint') || lowerType.includes('presentation')) {
//       return <Presentation className="h-8 w-8 text-orange-500" />;
//     }
//     if (lowerType.includes('image')) {
//       return <ImageIcon className="h-8 w-8 text-purple-500" />;
//     }
//     if (lowerType.includes('video')) {
//       return <Video className="h-8 w-8 text-blue-500" />;
//     }
//     if (lowerType.includes('audio')) {
//       return <Music className="h-8 w-8 text-pink-500" />;
//     }
//     if (lowerType.includes('zip') || lowerType.includes('archive') || lowerType.includes('rar')) {
//       return <Archive className="h-8 w-8 text-yellow-600" />;
//     }
//     if (lowerType.includes('code') || lowerType.includes('programming') || 
//         lowerType.includes('json') || lowerType.includes('xml')) {
//       return <Code className="h-8 w-8 text-gray-600" />;
//     }
//     return <File className="h-8 w-8 text-gray-400" />;
//   };

//   // Get file viewer component
//   const getFileViewerContent = () => {
//     const lowerType = file.type.toLowerCase();
//     const lowerUrl = file.url.toLowerCase();

//     // PDF Viewer
//     if (file.isPdf || lowerType.includes('pdf') || lowerUrl.includes('.pdf')) {
//       return (
//         <div className="w-full h-full flex flex-col">
//           <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden">
//             <iframe
//               src={`${file.url}#view=FitH&toolbar=0&navpanes=0`}
//               title={file.name}
//               className="w-full h-full border-0"
//               onLoad={() => setIsLoading(false)}
//               onError={() => setError('Failed to load PDF')}
//             />
//           </div>
//           <div className="mt-4 flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <Button
//                 size="sm"
//                 variant="outline"
//                 onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                 disabled={currentPage <= 1}
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </Button>
//               <span className="text-sm text-gray-600">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <Button
//                 size="sm"
//                 variant="outline"
//                 onClick={() => setCurrentPage(p => p + 1)}
//                 disabled={currentPage >= totalPages}
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </Button>
//             </div>
//             <div className="flex items-center gap-2">
//               <Button
//                 size="sm"
//                 variant="outline"
//                 onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
//               >
//                 <ZoomOut className="h-4 w-4" />
//               </Button>
//               <span className="text-sm font-medium">{Math.round(scale * 100)}%</span>
//               <Button
//                 size="sm"
//                 variant="outline"
//                 onClick={() => setScale(s => Math.min(3, s + 0.1))}
//               >
//                 <ZoomIn className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     // Image Viewer
//     if (lowerType.includes('image') || 
//         lowerUrl.match(/\.(jpg|jpeg|png|gif|webp|svg|bmp)$/)) {
//       return (
//         <div className="w-full h-full flex items-center justify-center bg-gray-900">
//           <img
//             src={file.url}
//             alt={file.name}
//             className="max-w-full max-h-full object-contain"
//             style={{
//               transform: `scale(${scale}) rotate(${rotation}deg)`,
//               transition: 'transform 0.2s ease',
//             }}
//             onLoad={() => setIsLoading(false)}
//             onError={() => setError('Failed to load image')}
//           />
//         </div>
//       );
//     }

//     // Video Viewer
//     if (lowerType.includes('video') || 
//         lowerUrl.match(/\.(mp4|mov|avi|wmv|flv|webm|mkv|m4v)$/)) {
//       return (
//         <div className="w-full h-full bg-black rounded-lg overflow-hidden">
//           <video
//             src={file.url}
//             controls
//             className="w-full h-full"
//             onLoadedData={() => setIsLoading(false)}
//             onError={() => setError('Failed to load video')}
//           />
//         </div>
//       );
//     }

//     // Audio Viewer
//     if (lowerType.includes('audio') || 
//         lowerUrl.match(/\.(mp3|wav|ogg|m4a|flac|aac)$/)) {
//       return (
//         <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-lg">
//           <Music className="h-24 w-24 text-purple-500 mb-6" />
//           <h3 className="text-xl font-semibold mb-2">{file.name}</h3>
//           <p className="text-gray-600 mb-6">Audio File</p>
//           <audio
//             src={file.url}
//             controls
//             className="w-full max-w-md"
//             onCanPlay={() => setIsLoading(false)}
//             onError={() => setError('Failed to load audio')}
//           />
//         </div>
//       );
//     }

//     // Text/Code Viewer
//     if (lowerType.includes('text') || lowerType.includes('code') ||
//         lowerUrl.match(/\.(txt|md|json|xml|yaml|yml|ts|js|jsx|tsx|py|java|cpp|c|cs|php|rb|go|rs|sql|sh)$/)) {
//       return (
//         <div className="w-full h-full flex flex-col">
//           <div className="flex-1 bg-gray-900 text-gray-100 font-mono text-sm overflow-auto p-4 rounded-lg">
//             <pre className="whitespace-pre-wrap">
//               {isLoading ? 'Loading content...' : 'Content preview not available. Please download the file.'}
//             </pre>
//           </div>
//         </div>
//       );
//     }

//     // Default/Unsupported File Viewer
//     return (
//       <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-lg">
//         {getFileIcon()}
//         <h3 className="text-xl font-semibold mt-4 mb-2">{file.name}</h3>
//         <p className="text-gray-600 mb-2">{file.type}</p>
//         <p className="text-sm text-gray-500 mb-6">
//           {formatFileSize(file.size)} • {file.lessonTitle}
//         </p>
//         <p className="text-gray-500 text-center mb-6">
//           This file type cannot be previewed directly. Please download it to view.
//         </p>
//       </div>
//     );
//   };

//   // Toggle fullscreen
//   const toggleFullscreen = () => {
//     if (!document.fullscreenElement) {
//       document.documentElement.requestFullscreen();
//       setIsFullscreen(true);
//     } else {
//       document.exitFullscreen();
//       setIsFullscreen(false);
//     }
//   };

//   // Handle fullscreen change
//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       setIsFullscreen(!!document.fullscreenElement);
//     };

//     document.addEventListener('fullscreenchange', handleFullscreenChange);
//     return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
//   }, []);

//   // Keyboard shortcuts
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       // Close on Escape
//       if (e.key === 'Escape' && onClose) {
//         onClose();
//       }
//       // Fullscreen toggle on F
//       if (e.key === 'f' || e.key === 'F') {
//         e.preventDefault();
//         toggleFullscreen();
//       }
//       // Zoom in/out
//       if (e.key === '+' || e.key === '=') {
//         e.preventDefault();
//         setScale(s => Math.min(s + 0.1, 3));
//       }
//       if (e.key === '-') {
//         e.preventDefault();
//         setScale(s => Math.max(s - 0.1, 0.5));
//       }
//       // Rotate
//       if (e.key === 'r' || e.key === 'R') {
//         e.preventDefault();
//         setRotation(r => (r + 90) % 360);
//       }
//       // Navigation
//       if (e.key === 'ArrowLeft' && onPrev) {
//         e.preventDefault();
//         onPrev();
//       }
//       if (e.key === 'ArrowRight' && onNext) {
//         e.preventDefault();
//         onNext();
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [onClose, onPrev, onNext]);

//   return (
//     <Card className={cn(
//       "w-full h-full flex flex-col border-0 shadow-2xl bg-white",
//       isFullscreen ? "fixed inset-0 z-50 rounded-none" : "rounded-xl"
//     )}>
//       {/* Header */}
//       <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-gray-50 to-white">
//         <div className="flex items-center gap-3 flex-1 min-w-0">
//           {getFileIcon()}
//           <div className="flex-1 min-w-0">
//             <h3 className="font-semibold text-gray-900 truncate">{file.name}</h3>
//             <div className="flex items-center gap-2 mt-1">
//               <Badge variant="secondary" className="text-xs">
//                 {file.type}
//               </Badge>
//               <span className="text-xs text-gray-500">
//                 {formatFileSize(file.size)}
//               </span>
//               <span className="text-xs text-gray-500 truncate">
//                 • {file.lessonTitle}
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center gap-2 flex-shrink-0">
//           {/* Navigation buttons */}
//           {showNavigation && onPrev && (
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={onPrev}
//               className="h-8 w-8 p-0"
//               title="Previous file"
//             >
//               <ChevronLeft className="h-4 w-4" />
//             </Button>
//           )}
          
//           {showNavigation && onNext && (
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={onNext}
//               className="h-8 w-8 p-0"
//               title="Next file"
//             >
//               <ChevronRight className="h-4 w-4" />
//             </Button>
//           )}

//           {/* Toolbar buttons */}
//           <div className="flex items-center gap-1 border rounded-lg p-1 bg-white">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
//               className="h-8 w-8 p-0"
//               title="Zoom Out"
//             >
//               <ZoomOut className="h-4 w-4" />
//             </Button>
            
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => setScale(1)}
//               className="h-8 w-8 p-0 text-xs"
//               title="Reset Zoom"
//             >
//               {Math.round(scale * 100)}%
//             </Button>
            
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => setScale(s => Math.min(3, s + 0.1))}
//               className="h-8 w-8 p-0"
//               title="Zoom In"
//             >
//               <ZoomIn className="h-4 w-4" />
//             </Button>
            
//             <div className="h-4 w-px bg-gray-300 mx-1" />
            
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => setRotation(r => (r + 90) % 360)}
//               className="h-8 w-8 p-0"
//               title="Rotate"
//             >
//               <RotateCw className="h-4 w-4" />
//             </Button>
            
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={toggleFullscreen}
//               className="h-8 w-8 p-0"
//               title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
//             >
//               {isFullscreen ? (
//                 <Minimize2 className="h-4 w-4" />
//               ) : (
//                 <Maximize2 className="h-4 w-4" />
//               )}
//             </Button>
//           </div>

//           {/* Action buttons */}
//           <div className="flex items-center gap-2 ml-2">
//             <a
//               href={file.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors"
//               title="Open in new tab"
//             >
//               <ExternalLink className="h-4 w-4" />
//               Open
//             </a>
            
//             <a
//               href={file.url}
//               download={file.name}
//               className="inline-flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
//               title="Download file"
//             >
//               <Download className="h-4 w-4" />
//               Download
//             </a>
            
//             {onClose && (
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={onClose}
//                 className="h-8 w-8 p-0"
//                 title="Close viewer"
//               >
//                 <X className="h-4 w-4" />
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Loading state */}
//       {isLoading && (
//         <div className="flex-1 flex items-center justify-center bg-gray-50">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading file...</p>
//           </div>
//         </div>
//       )}

//       {/* Error state */}
//       {error && (
//         <div className="flex-1 flex items-center justify-center bg-gray-50">
//           <div className="text-center p-8 max-w-md">
//             <div className="text-red-500 text-4xl mb-4">⚠️</div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2">Unable to Load File</h3>
//             <p className="text-gray-600 mb-6">{error}</p>
//             <div className="flex gap-3 justify-center">
//               <a
//                 href={file.url}
//                 download={file.name}
//                 className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
//               >
//                 <Download className="h-4 w-4" />
//                 Download Instead
//               </a>
//               {onClose && (
//                 <Button
//                   variant="outline"
//                   onClick={onClose}
//                 >
//                   Go Back
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Main content - Only show when not loading and no error */}
//       {!isLoading && !error && (
//         <div className="flex-1 p-4 md:p-6 overflow-auto bg-gray-50">
//           <div className="h-full rounded-lg overflow-hidden">
//             {getFileViewerContent()}
//           </div>
//         </div>
//       )}

//       {/* Footer with info and shortcuts */}
//       <div className="p-3 border-t bg-gray-50">
//         <div className="flex items-center justify-between text-xs text-gray-600">
//           <div className="flex items-center gap-4">
//             <span className="flex items-center gap-1">
//               <BookOpen className="h-3 w-3" />
//               Module: {file.moduleTitle}
//             </span>
//             <span className="hidden md:inline">
//               Lesson: {file.lessonTitle}
//             </span>
//           </div>
//           <div className="flex items-center gap-4">
//             <span className="hidden md:inline">
//               Press <kbd className="px-1.5 py-0.5 bg-gray-200 rounded">F</kbd> for fullscreen
//             </span>
//             <span>
//               Press <kbd className="px-1.5 py-0.5 bg-gray-200 rounded">Esc</kbd> to close
//             </span>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// }
























'use client';

import { useState, useEffect } from 'react';
import {
  Download,
  Eye,
  FileText,
  File,
  Image as ImageIcon,
  Video,
  Music,
  Archive,
  Code,
  Presentation,
  Sheet,
  X,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  ExternalLink,
  Printer,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface FileViewerProps {
  file: {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number | null;
    lessonTitle: string;
    moduleTitle: string;
    isPdf?: boolean;
  };
  onClose?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  showNavigation?: boolean;
}

export default function FileViewer({
  file,
  onClose,
  onNext,
  onPrev,
  showNavigation = false,
}: FileViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Format file size
  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown size';
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    if (mb < 1024) return `${mb.toFixed(1)} MB`;
    const gb = mb / 1024;
    return `${gb.toFixed(2)} GB`;
  };

  // Get file icon based on type
  const getFileIcon = () => {
    const lowerType = file.type.toLowerCase();
    
    if (file.isPdf || lowerType.includes('pdf') || file.name.toLowerCase().endsWith('.pdf')) {
      return <FileText className="h-8 w-8 text-red-500" />;
    }
    if (lowerType.includes('word') || lowerType.includes('doc') || file.name.toLowerCase().endsWith('.doc')) {
      return <FileText className="h-8 w-8 text-blue-600" />;
    }
    if (lowerType.includes('excel') || lowerType.includes('sheet') || lowerType.includes('csv') || file.name.toLowerCase().endsWith('.xls')) {
      return <Sheet className="h-8 w-8 text-green-600" />;
    }
    if (lowerType.includes('powerpoint') || lowerType.includes('presentation') || file.name.toLowerCase().endsWith('.ppt')) {
      return <Presentation className="h-8 w-8 text-orange-500" />;
    }
    if (lowerType.includes('image') || /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(file.name)) {
      return <ImageIcon className="h-8 w-8 text-purple-500" />;
    }
    if (lowerType.includes('video') || /\.(mp4|mov|avi|wmv|flv|webm|mkv)$/i.test(file.name)) {
      return <Video className="h-8 w-8 text-blue-500" />;
    }
    if (lowerType.includes('audio') || /\.(mp3|wav|ogg|m4a|flac)$/i.test(file.name)) {
      return <Music className="h-8 w-8 text-pink-500" />;
    }
    if (lowerType.includes('zip') || lowerType.includes('archive') || lowerType.includes('rar') || /\.(zip|rar|7z|tar|gz)$/i.test(file.name)) {
      return <Archive className="h-8 w-8 text-yellow-600" />;
    }
    if (lowerType.includes('code') || /\.(js|ts|py|java|cpp|c|cs|php|html|css|json|xml)$/i.test(file.name)) {
      return <Code className="h-8 w-8 text-gray-600" />;
    }
    return <File className="h-8 w-8 text-gray-400" />;
  };

  // Check if file is PDF based on name or type
  const isFilePdf = () => {
    return file.isPdf || 
           file.type.toLowerCase().includes('pdf') || 
           file.name.toLowerCase().endsWith('.pdf');
  };

  // Check if file is image
  const isFileImage = () => {
    return file.type.toLowerCase().includes('image') || 
           /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(file.name);
  };

  // Check if file is video
  const isFileVideo = () => {
    return file.type.toLowerCase().includes('video') || 
           /\.(mp4|mov|avi|wmv|flv|webm|mkv|m4v)$/i.test(file.name);
  };

  // Get file viewer content
  const getFileViewerContent = () => {
    // PDF Viewer
    if (isFilePdf()) {
      return (
        <div className="w-full h-full flex flex-col">
          <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden">
            <iframe
              src={`${file.url}#view=FitH&toolbar=0&navpanes=0`}
              title={file.name}
              className="w-full h-full border-0"
              onLoad={() => setIsLoading(false)}
              onError={() => setError('Failed to load PDF')}
            />
          </div>
        </div>
      );
    }

    // Image Viewer
    if (isFileImage()) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-900">
          <img
            src={file.url}
            alt={file.name}
            className="max-w-full max-h-full object-contain"
            style={{
              transform: `scale(${scale}) rotate(${rotation}deg)`,
              transition: 'transform 0.2s ease',
            }}
            onLoad={() => setIsLoading(false)}
            onError={() => setError('Failed to load image')}
          />
        </div>
      );
    }

    // Video Viewer
    if (isFileVideo()) {
      return (
        <div className="w-full h-full bg-black rounded-lg overflow-hidden">
          <video
            src={file.url}
            controls
            className="w-full h-full"
            onLoadedData={() => setIsLoading(false)}
            onError={() => setError('Failed to load video')}
          />
        </div>
      );
    }

    // Default/Unsupported File Viewer - Show download prompt
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-lg">
        {getFileIcon()}
        <h3 className="text-xl font-semibold mt-4 mb-2">{file.name}</h3>
        <p className="text-gray-600 mb-2">{file.type}</p>
        <p className="text-sm text-gray-500 mb-6">
          {formatFileSize(file.size)} • {file.lessonTitle}
        </p>
        <p className="text-gray-500 text-center mb-6">
          Preview not available for this file type. Please download to view.
        </p>
        <a
          href={file.url}
          download={file.name}
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          <Download className="h-5 w-5" />
          Download {file.name.split('.').pop()?.toUpperCase()} File
        </a>
      </div>
    );
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close on Escape
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
      // Fullscreen toggle on F
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
      // Zoom in/out
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setScale(s => Math.min(s + 0.1, 3));
      }
      if (e.key === '-') {
        e.preventDefault();
        setScale(s => Math.max(s - 0.1, 0.5));
      }
      // Rotate
      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        setRotation(r => (r + 90) % 360);
      }
      // Navigation
      if (e.key === 'ArrowLeft' && onPrev) {
        e.preventDefault();
        onPrev();
      }
      if (e.key === 'ArrowRight' && onNext) {
        e.preventDefault();
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <Card className={cn(
      "w-full h-full flex flex-col border-0 shadow-2xl bg-white",
      isFullscreen ? "fixed inset-0 z-50 rounded-none" : "rounded-xl"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {getFileIcon()}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{file.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                {file.type}
              </Badge>
              <span className="text-xs text-gray-500">
                {formatFileSize(file.size)}
              </span>
              <span className="text-xs text-gray-500 truncate">
                • {file.lessonTitle}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Navigation buttons */}
          {showNavigation && onPrev && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onPrev}
              className="h-8 w-8 p-0"
              title="Previous file"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
          
          {showNavigation && onNext && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onNext}
              className="h-8 w-8 p-0"
              title="Next file"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}

          {/* Toolbar buttons - only show for PDF and Images */}
          {(isFilePdf() || isFileImage()) && (
            <div className="flex items-center gap-1 border rounded-lg p-1 bg-white">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
                className="h-8 w-8 p-0"
                title="Zoom Out"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setScale(1)}
                className="h-8 w-8 p-0 text-xs"
                title="Reset Zoom"
              >
                {Math.round(scale * 100)}%
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setScale(s => Math.min(3, s + 0.1))}
                className="h-8 w-8 p-0"
                title="Zoom In"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              
              <div className="h-4 w-px bg-gray-300 mx-1" />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setRotation(r => (r + 90) % 360)}
                className="h-8 w-8 p-0"
                title="Rotate"
              >
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            className="h-8 w-8 p-0 ml-2"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>

          {/* Action buttons */}
          <div className="flex items-center gap-2 ml-2">
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="h-4 w-4" />
              Open
            </a>
            
            <a
              href={file.url}
              download={file.name}
              className="inline-flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
              title="Download file"
            >
              <Download className="h-4 w-4" />
              Download
            </a>
            
            {onClose && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
                title="Close viewer"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading file...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 max-w-md">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Unable to Load File</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex gap-3 justify-center">
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Open in New Tab
              </a>
              <a
                href={file.url}
                download={file.name}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                <Download className="h-4 w-4" />
                Download
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main content - Only show when not loading and no error */}
      {!isLoading && !error && (
        <div className="flex-1 p-4 md:p-6 overflow-auto bg-gray-50">
          <div className="h-full rounded-lg overflow-hidden">
            {getFileViewerContent()}
          </div>
        </div>
      )}

      {/* Footer with info and shortcuts */}
      <div className="p-3 border-t bg-gray-50">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              Module: {file.moduleTitle}
            </span>
            <span className="hidden md:inline">
              Lesson: {file.lessonTitle}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">
              Press <kbd className="px-1.5 py-0.5 bg-gray-200 rounded">F</kbd> for fullscreen
            </span>
            <span>
              Press <kbd className="px-1.5 py-0.5 bg-gray-200 rounded">Esc</kbd> to close
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}