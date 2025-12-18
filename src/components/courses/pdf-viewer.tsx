
// /components/courses/pdf-viewer.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Download, ZoomIn, ZoomOut, RotateCw, Maximize2, Minimize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PDFViewerProps {
  pdfUrl: string;
  pdfName: string;
  onClose?: () => void;
}

export default function PDFViewer({ pdfUrl, pdfName, onClose }: PDFViewerProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setScale(s => Math.min(s + 0.1, 3));
      } else if (e.key === '-') {
        e.preventDefault();
        setScale(s => Math.max(s - 0.1, 0.5));
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        setRotation(r => (r + 90) % 360);
      } else if (e.key === 'Escape' && isFullscreen) {
        e.preventDefault();
        setIsFullscreen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);
  
  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
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
  
  return (
    <div 
      ref={containerRef}
      className={`relative bg-white rounded-xl overflow-hidden border border-gray-300 shadow-xl ${
        isFullscreen ? 'fixed inset-0 z-50' : 'w-full h-full'
      }`}
    >
      {/* PDF Viewer Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="bg-red-100 p-2 rounded-lg">
            <span className="text-red-600 font-bold text-sm">PDF</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 truncate max-w-md">{pdfName}</h3>
            <p className="text-xs text-gray-600">Viewing PDF document</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Toolbar */}
          <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-lg p-1 border border-gray-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setScale(s => Math.max(s - 0.1, 0.5))}
              className="h-8 w-8 p-0"
              title="Zoom Out"
            >
              <ZoomOut size={16} />
            </Button>
            
            <span className="text-sm font-medium text-gray-700 min-w-[45px] text-center">
              {Math.round(scale * 100)}%
            </span>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setScale(s => Math.min(s + 0.1, 3))}
              className="h-8 w-8 p-0"
              title="Zoom In"
            >
              <ZoomIn size={16} />
            </Button>
            
            <div className="h-4 w-px bg-gray-300 mx-1" />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRotation(r => (r + 90) % 360)}
              className="h-8 w-8 p-0"
              title="Rotate"
            >
              <RotateCw size={16} />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="h-8 w-8 p-0"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </Button>
          </div>
          
          {/* Download Button */}
          <a
            href={pdfUrl}
            download={pdfName}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Download size={16} />
            Download
          </a>
          
          {/* Close Button (only shown when onClose provided) */}
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
              title="Close PDF Viewer"
            >
              <X size={16} />
            </Button>
          )}
        </div>
      </div>
      
      {/* PDF Content Area */}
      <div className="relative w-full h-[calc(100%-64px)] overflow-auto bg-gray-900">
        {/* PDF Embed */}
        <div className="flex items-center justify-center min-h-full p-4">
          <div 
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            style={{
              transform: `scale(${scale}) rotate(${rotation}deg)`,
              transition: 'transform 0.2s ease',
              transformOrigin: 'center center'
            }}
          >
            <iframe
              src={`${pdfUrl}#view=FitH&toolbar=0&navpanes=0`}
              title={pdfName}
              className="w-full min-w-[800px] min-h-[600px] border-0"
              loading="lazy"
            />
          </div>
        </div>
        
        {/* PDF Loading/Error States */}
        {!pdfUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg">
              <div className="text-red-500 text-4xl mb-4">📄</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">PDF Not Available</h3>
              <p className="text-gray-600">This PDF document cannot be loaded.</p>
            </div>
          </div>
        )}
      </div>
      
      {/* PDF Navigation Help */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-sm">
        <span className="opacity-90">Use <kbd className="px-1.5 py-0.5 bg-gray-700 rounded">+</kbd>/<kbd className="px-1.5 py-0.5 bg-gray-700 rounded">-</kbd> to zoom • <kbd className="px-1.5 py-0.5 bg-gray-700 rounded">R</kbd> to rotate • <kbd className="px-1.5 py-0.5 bg-gray-700 rounded">Esc</kbd> to exit fullscreen</span>
      </div>
    </div>
  );
}