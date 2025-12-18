
// /hooks/use-quiz-timer.ts

import { useState, useEffect, useCallback, useRef } from 'react';

interface UseQuizTimerProps {
  initialTimeRemaining: number | null; // seconds
  onTimeUp?: () => void;
  autoSaveInterval?: number; // milliseconds
  onAutoSave?: () => void;
}

export function useQuizTimer({
  initialTimeRemaining,
  onTimeUp,
  autoSaveInterval = 30000, // 30 seconds
  onAutoSave
}: UseQuizTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<number | null>(initialTimeRemaining);
  const [isRunning, setIsRunning] = useState(true);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [formattedTime, setFormattedTime] = useState<string>('00:00');
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const autoSaveRef = useRef<NodeJS.Timeout | null>(null);
  const lastSaveRef = useRef<number>(Date.now());

  const formatTime = useCallback((seconds: number | null): string => {
    if (seconds === null || seconds < 0) return '∞';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current || !isRunning || timeRemaining === null || timeRemaining <= 0) {
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev === null || prev <= 1) {
          setIsTimeUp(true);
          setIsRunning(false);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Auto-save interval
    autoSaveRef.current = setInterval(() => {
      if (onAutoSave && Date.now() - lastSaveRef.current > autoSaveInterval) {
        onAutoSave();
        lastSaveRef.current = Date.now();
      }
    }, 10000); // Check every 10 seconds
  }, [isRunning, timeRemaining, onTimeUp, onAutoSave, autoSaveInterval]);

  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (autoSaveRef.current) {
      clearInterval(autoSaveRef.current);
      autoSaveRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const resumeTimer = useCallback(() => {
    setIsRunning(true);
  }, []);

  const resetTimer = useCallback((newTimeRemaining: number | null) => {
    pauseTimer();
    setTimeRemaining(newTimeRemaining);
    setIsTimeUp(false);
    setIsRunning(true);
  }, [pauseTimer]);

  const addTime = useCallback((seconds: number) => {
    if (timeRemaining !== null) {
      setTimeRemaining(prev => prev !== null ? prev + seconds : seconds);
    }
  }, [timeRemaining]);

  // Update formatted time whenever timeRemaining changes
  useEffect(() => {
    setFormattedTime(formatTime(timeRemaining));
  }, [timeRemaining, formatTime]);

  // Start/stop timer based on isRunning state
  useEffect(() => {
    if (isRunning && timeRemaining !== null && timeRemaining > 0) {
      startTimer();
    } else {
      pauseTimer();
    }

    return () => {
      pauseTimer();
    };
  }, [isRunning, timeRemaining, startTimer, pauseTimer]);

  // Auto-save when time changes significantly
  useEffect(() => {
    if (timeRemaining !== null && timeRemaining % 30 === 0) { // Every 30 seconds
      onAutoSave?.();
    }
  }, [timeRemaining, onAutoSave]);

  // Warning states
  const isWarning = timeRemaining !== null && timeRemaining < 300; // 5 minutes
  const isCritical = timeRemaining !== null && timeRemaining < 60; // 1 minute

  return {
    timeRemaining,
    formattedTime,
    isRunning,
    isTimeUp,
    isWarning,
    isCritical,
    pauseTimer,
    resumeTimer,
    resetTimer,
    addTime,
    setIsRunning
  };
}