

// /src/app/api/questions/[id]/route.ts

import { NextRequest } from 'next/server';
import { 
  updateQuestionAction,
  deleteQuestionAction 
} from '@/lib/assessments/actions';
import { requireRole } from '@/lib/auth/utils';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    // Check instructor role
    await requireRole(['instructor', 'admin']);
    
    const { id } = await params;
    const body = await request.json();
    
    const result = await updateQuestionAction(id, body);
    
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
    console.error('❌ API Error updating question:', error);
    
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

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // Check instructor role
    await requireRole(['instructor', 'admin']);
    
    const { id } = await params;
    const result = await deleteQuestionAction(id);
    
    if (!result.success) {
      return Response.json(
        { error: result.message },
        { status: 400 }
      );
    }

    return Response.json({
      message: result.message
    });
  } catch (error: any) {
    console.error('❌ API Error deleting question:', error);
    
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