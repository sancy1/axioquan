
// /lib/services/certificate-eligibility-service.ts

'use server';

import { sql } from '@/lib/db';

export interface CertificateEligibility {
  isEligible: boolean;
  score: number;
  requiredScore: number;
  attemptsUsed: number;
  maxAttempts: number;
  completedAt: Date | null;
  certificateId: string | null;
  status: 'eligible' | 'in_progress' | 'not_eligible' | 'issued';
  progress: number; // 0-100
}

export async function checkCertificateEligibility(
  userId: string,
  courseId: string,
  assessmentId?: string
): Promise<CertificateEligibility[]> {
  try {
    // If assessmentId is provided, check eligibility for that specific assessment
    if (assessmentId) {
      const eligibility = await checkSingleAssessmentEligibility(userId, assessmentId);
      return [eligibility];
    }

    // Otherwise, check all assessments in the course
    const assessments = await sql`
      SELECT a.*
      FROM assessments a
      WHERE a.course_id = ${courseId}
        AND a.require_passing = true
    `;

    const eligibilityPromises = assessments.map((assessment: any) =>
      checkSingleAssessmentEligibility(userId, assessment.id)
    );

    return Promise.all(eligibilityPromises);
  } catch (error) {
    console.error('Error checking certificate eligibility:', error);
    return [];
  }
}

async function checkSingleAssessmentEligibility(
  userId: string,
  assessmentId: string
): Promise<CertificateEligibility> {
  const assessment = await sql`
    SELECT 
      a.*,
      c.passing_score as course_passing_score
    FROM assessments a
    JOIN courses c ON a.course_id = c.id
    WHERE a.id = ${assessmentId}
    LIMIT 1
  `;

  if (assessment.length === 0) {
    return createDefaultEligibility();
  }

  const assessmentData = assessment[0];
  const requiredScore = assessmentData.passing_score || 70;

  // Get user's attempts for this assessment
  const attempts = await sql`
    SELECT *
    FROM assessment_attempts
    WHERE user_id = ${userId}
      AND assessment_id = ${assessmentId}
      AND submitted_at IS NOT NULL
    ORDER BY submitted_at DESC
  `;

  const attemptsUsed = attempts.length;
  const maxAttempts = assessmentData.max_attempts || 1;

  // Find best score
  const bestAttempt = attempts.reduce((best: any, current: any) => {
    const bestScore = parseFloat(best?.percentage || '0');
    const currentScore = parseFloat(current?.percentage || '0');
    return currentScore > bestScore ? current : best;
  }, attempts[0]);

  const score = bestAttempt ? parseFloat(bestAttempt.percentage) : 0;
  const isEligible = score >= requiredScore;
  const hasAttemptsLeft = attemptsUsed < maxAttempts;

  // Check if certificate already issued
  const issuedCertificate = await sql`
    SELECT id
    FROM certificates
    WHERE user_id = ${userId}
      AND assessment_id = ${assessmentId}
      AND status = 'issued'
    LIMIT 1
  `;

  let status: 'eligible' | 'in_progress' | 'not_eligible' | 'issued' = 'not_eligible';
  
  if (issuedCertificate.length > 0) {
    status = 'issued';
  } else if (isEligible) {
    status = 'eligible';
  } else if (hasAttemptsLeft) {
    status = 'in_progress';
  }

  return {
    isEligible,
    score,
    requiredScore,
    attemptsUsed,
    maxAttempts,
    completedAt: bestAttempt?.submitted_at || null,
    certificateId: issuedCertificate[0]?.id || null,
    status,
    progress: Math.min((score / requiredScore) * 100, 100),
  };
}

function createDefaultEligibility(): CertificateEligibility {
  return {
    isEligible: false,
    score: 0,
    requiredScore: 70,
    attemptsUsed: 0,
    maxAttempts: 1,
    completedAt: null,
    certificateId: null,
    status: 'not_eligible',
    progress: 0,
  };
}

export async function getCertificateProgress(
  userId: string,
  courseId: string
): Promise<{
  overallProgress: number;
  assessmentsCompleted: number;
  totalAssessments: number;
  eligibleCertificates: number;
  certificatesIssued: number;
}> {
  try {
    // Get all assessments that require passing for certificate
    const assessments = await sql`
      SELECT a.*
      FROM assessments a
      WHERE a.course_id = ${courseId}
        AND a.require_passing = true
    `;

    const totalAssessments = assessments.length;
    let assessmentsCompleted = 0;
    let eligibleCertificates = 0;
    let certificatesIssued = 0;

    for (const assessment of assessments) {
      const eligibility = await checkSingleAssessmentEligibility(userId, assessment.id);
      
      if (eligibility.score >= (assessment.passing_score || 70)) {
        assessmentsCompleted++;
      }
      
      if (eligibility.status === 'eligible') {
        eligibleCertificates++;
      } else if (eligibility.status === 'issued') {
        eligibleCertificates++;
        certificatesIssued++;
      }
    }

    const overallProgress = totalAssessments > 0 
      ? (assessmentsCompleted / totalAssessments) * 100 
      : 0;

    return {
      overallProgress,
      assessmentsCompleted,
      totalAssessments,
      eligibleCertificates,
      certificatesIssued,
    };
  } catch (error) {
    console.error('Error getting certificate progress:', error);
    return {
      overallProgress: 0,
      assessmentsCompleted: 0,
      totalAssessments: 0,
      eligibleCertificates: 0,
      certificatesIssued: 0,
    };
  }
}

export async function issueCertificate(
  userId: string,
  assessmentId: string,
  issuedBy: string
): Promise<{ success: boolean; certificateId?: string; error?: string }> {
  try {
    // Check eligibility first
    const eligibility = await checkSingleAssessmentEligibility(userId, assessmentId);
    
    if (!eligibility.isEligible) {
      return { 
        success: false, 
        error: 'Student is not eligible for certificate' 
      };
    }

    if (eligibility.status === 'issued') {
      return { 
        success: false, 
        error: 'Certificate already issued' 
      };
    }

    // Create certificate record
    const certificate = await sql`
      INSERT INTO certificates (
        user_id,
        assessment_id,
        course_id,
        score,
        issued_by,
        issued_at,
        certificate_number,
        status
      ) VALUES (
        ${userId},
        ${assessmentId},
        (SELECT course_id FROM assessments WHERE id = ${assessmentId}),
        ${eligibility.score},
        ${issuedBy},
        NOW(),
        CONCAT('CERT-', EXTRACT(YEAR FROM NOW())::text, '-', LPAD(FLOOR(RANDOM() * 1000000)::text, 6, '0')),
        'issued'
      )
      RETURNING id
    `;

    return { 
      success: true, 
      certificateId: certificate[0]?.id 
    };
  } catch (error) {
    console.error('Error issuing certificate:', error);
    return { 
      success: false, 
      error: 'Failed to issue certificate' 
    };
  }
}