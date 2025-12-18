
// /src/components/assessments/certificate-indicator.tsx

'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock, XCircle, FileText, Loader2 } from 'lucide-react';

interface CertificateIndicatorProps {
  status: 'eligible' | 'in_progress' | 'not_eligible' | 'issued' | 'pending';
  score?: number;
  requiredScore?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CertificateIndicator({
  status,
  score,
  requiredScore = 70,
  showLabel = true,
  size = 'md',
  className,
}: CertificateIndicatorProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'eligible':
        return {
          icon: CheckCircle,
          label: 'Eligible',
          color: 'bg-green-100 text-green-800 border-green-200',
          iconColor: 'text-green-600',
        };
      case 'in_progress':
        return {
          icon: Clock,
          label: 'In Progress',
          color: 'bg-amber-100 text-amber-800 border-amber-200',
          iconColor: 'text-amber-600',
        };
      case 'not_eligible':
        return {
          icon: XCircle,
          label: 'Not Eligible',
          color: 'bg-red-100 text-red-800 border-red-200',
          iconColor: 'text-red-600',
        };
      case 'issued':
        return {
          icon: FileText,
          label: 'Issued',
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          iconColor: 'text-blue-600',
        };
      case 'pending':
        return {
          icon: Loader2,
          label: 'Pending',
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          iconColor: 'text-gray-600',
          animate: true,
        };
      default:
        return {
          icon: XCircle,
          label: 'Unknown',
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          iconColor: 'text-gray-600',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        'inline-flex items-center gap-1.5 font-medium',
        config.color,
        sizeClasses[size],
        className
      )}
    >
      <Icon
        className={cn(
          'h-3 w-3',
          config.iconColor,
          config.animate && 'animate-spin'
        )}
      />
      {showLabel && <span>{config.label}</span>}
      {score !== undefined && (
        <>
          {showLabel && ' • '}
          <span className="font-semibold">{score.toFixed(1)}%</span>
          {status === 'in_progress' && score < requiredScore && (
            <span className="text-xs opacity-75">
              (need {requiredScore}%)
            </span>
          )}
        </>
      )}
    </Badge>
  );
}

// Progress indicator for certificate eligibility
interface CertificateProgressProps {
  currentScore: number;
  requiredScore: number;
  attemptsUsed: number;
  maxAttempts: number;
  className?: string;
}

export function CertificateProgress({
  currentScore,
  requiredScore,
  attemptsUsed,
  maxAttempts,
  className,
}: CertificateProgressProps) {
  const progress = (currentScore / requiredScore) * 100;
  const isEligible = currentScore >= requiredScore;
  const attemptsRemaining = maxAttempts - attemptsUsed;
  const canRetake = attemptsRemaining > 0;

  return (
    <div className={cn('space-y-3', className)}>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Certificate Progress</span>
          <span className="font-bold">{currentScore.toFixed(1)}%</span>
        </div>
        <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className={cn(
              'absolute left-0 top-0 h-full rounded-full transition-all duration-500',
              isEligible
                ? 'bg-green-500'
                : progress >= 50
                ? 'bg-amber-500'
                : 'bg-red-500'
            )}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0%</span>
          <span>Required: {requiredScore}%</span>
          <span>100%</span>
        </div>
      </div>

      {!isEligible && canRetake && (
        <div className="text-sm bg-amber-50 border border-amber-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-600" />
            <span className="font-medium text-amber-800">Keep going!</span>
          </div>
          <p className="text-amber-700 mt-1 text-sm">
            You need {requiredScore - currentScore}% more to qualify for a certificate.
            {attemptsRemaining > 0 && (
              <> You have {attemptsRemaining} more attempt{attemptsRemaining !== 1 ? 's' : ''} remaining.</>
            )}
          </p>
        </div>
      )}

      {!isEligible && !canRetake && (
        <div className="text-sm bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4 text-red-600" />
            <span className="font-medium text-red-800">Maximum attempts reached</span>
          </div>
          <p className="text-red-700 mt-1 text-sm">
            You've used all {maxAttempts} attempts. Certificate not eligible.
          </p>
        </div>
      )}

      {isEligible && (
        <div className="text-sm bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="font-medium text-green-800">Congratulations!</span>
          </div>
          <p className="text-green-700 mt-1 text-sm">
            You've qualified for a certificate with a score of {currentScore}%.
            The instructor will issue your certificate soon.
          </p>
        </div>
      )}
    </div>
  );
}