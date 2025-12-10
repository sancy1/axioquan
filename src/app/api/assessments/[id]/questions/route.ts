

// /src/app/api/assessments/[id]/questions/route.ts

import { NextRequest } from 'next/server';
import { 
  getAssessmentQuestionsAction,
  createQuestionAction,
  reorderQuestionsAction
} from '@/lib/assessments/actions';
import { requireRole } from '@/lib/auth/utils';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // Check instructor role
    await requireRole(['instructor', 'admin']);
    
    const { id } = await params;
    const result = await getAssessmentQuestionsAction(id);
    
    if (!result.success) {
      return Response.json(
        { error: result.message },
        { status: 404 }
      );
    }

    return Response.json({
      questions: result.questions
    });
  } catch (error: any) {
    console.error('❌ API Error fetching assessment questions:', error);
    
    if (error.message?.includes('unauthorized')) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    // Check instructor role
    await requireRole(['instructor', 'admin']);
    
    const { id } = await params;
    const body = await request.json();
    
    // Validate required fields
    if (!body.question_text || !body.question_type) {
      return Response.json(
        { error: 'Question text and type are required' },
        { status: 400 }
      );
    }
    
    // Add assessment_id to the question data
    const questionData = {
      ...body,
      assessment_id: id
    };
    
    const result = await createQuestionAction(questionData);
    
    if (!result.success) {
      return Response.json(
        { 
          error: result.message,
          details: result.errors
        },
        { status: 400 }
      );
    }

    return Response.json({
      message: result.message,
      question: result.question
    });
  } catch (error: any) {
    console.error('❌ API Error creating question:', error);
    
    if (error.message?.includes('unauthorized')) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    // Check instructor role
    await requireRole(['instructor', 'admin']);
    
    const { id } = await params;
    const body = await request.json();
    
    // Handle reordering
    if (body.action === 'reorder' && Array.isArray(body.questionIds)) {
      const result = await reorderQuestionsAction(id, body.questionIds);
      
      if (!result.success) {
        return Response.json(
          { error: result.message },
          { status: 400 }
        );
      }
      
      return Response.json({
        message: result.message
      });
    }
    
    return Response.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('❌ API Error reordering questions:', error);
    
    if (error.message?.includes('unauthorized')) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}