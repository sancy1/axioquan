

// /src/app/api/assessments/[id]/route.ts

import { NextRequest } from 'next/server';
import { 
  getAssessmentByIdAction,
  updateAssessmentAction,
  deleteAssessmentAction 
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
    const result = await getAssessmentByIdAction(id);
    
    if (!result.success) {
      return Response.json(
        { error: result.message },
        { status: 404 }
      );
    }

    return Response.json({
      assessment: result.assessment
    });
  } catch (error: any) {
    console.error('❌ API Error fetching assessment:', error);
    
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

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    // Check instructor role
    await requireRole(['instructor', 'admin']);
    
    const { id } = await params;
    const body = await request.json();
    
    const result = await updateAssessmentAction(id, body);
    
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
      assessment: result.assessment
    });
  } catch (error: any) {
    console.error('❌ API Error updating assessment:', error);
    
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
    const result = await deleteAssessmentAction(id);
    
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
    console.error('❌ API Error deleting assessment:', error);
    
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