import { NextRequest, NextResponse } from 'next/server';
import { detectEmotion } from '@/lib/emotion-detector';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: CORS_HEADERS });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || typeof body.text !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request. Expected { text: string }' },
        { status: 400, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
      );
    }

    const text = (body.text as string).trim();

    if (!text || text.length < 3) {
      return NextResponse.json(
        { error: 'Text must be at least 3 characters long' },
        { status: 400, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
      );
    }

    const result = await detectEmotion(text);

    return NextResponse.json(result, {
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[emotion] Error:', error);
    return NextResponse.json(
      { error: 'Emotion detection failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
    );
  }
}
