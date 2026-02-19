import { NextRequest, NextResponse } from 'next/server';
import { generateFollowUp } from '@/lib/paraphraser';

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
        { error: 'Invalid request. Expected { text: string, emotionalContext?: string }' },
        { status: 400, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
      );
    }

    const text = (body.text as string).trim();
    const emotionalContext =
      typeof body.emotionalContext === 'string' ? body.emotionalContext : undefined;

    const result = await generateFollowUp(text, { emotionalContext });

    return NextResponse.json(result, {
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[paraphrase] Error:', error);
    return NextResponse.json(
      { error: 'Paraphrase generation failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
    );
  }
}
