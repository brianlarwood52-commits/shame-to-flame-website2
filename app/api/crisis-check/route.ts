import { NextRequest, NextResponse } from 'next/server';
import { detectCrisis } from '@/lib/crisis-detector';

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
        { error: 'Invalid request. Expected { text: string, emotionalScore?: number }' },
        { status: 400, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
      );
    }

    const text = (body.text as string).trim();
    const emotionalScore =
      typeof body.emotionalScore === 'number' ? body.emotionalScore : undefined;

    const result = detectCrisis(text, emotionalScore);

    return NextResponse.json(result, {
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[crisis-check] CRITICAL ERROR - must not fail silently:', error);
    return NextResponse.json(
      {
        error: 'Crisis detection service unavailable',
        isCrisis: true,
        urgency: 'immediate',
        categories: ['general_crisis'],
        matchedKeywords: [],
        resources: [
          {
            name: 'Lifeline Australia',
            description: '24/7 crisis support and suicide prevention',
            phone: '13 11 14',
            text: '0477 13 11 14',
            website: 'https://www.lifeline.org.au',
            available: '24/7',
            categories: ['general_crisis'],
          },
          {
            name: 'Beyond Blue',
            description: 'Mental health support and resources',
            phone: '1300 22 4636',
            website: 'https://www.beyondblue.org.au',
            available: '24/7',
            categories: ['general_crisis'],
          },
          {
            name: 'Suicide Prevention Lifeline (US)',
            description: '24/7 free and confidential support',
            phone: '988',
            text: '988',
            website: 'https://988lifeline.org',
            available: '24/7',
            categories: ['general_crisis'],
          },
        ],
        safetyMessage:
          "I'm having trouble processing your message, but I want you to know that help is available. Please reach out to one of these services immediately - they're available 24/7 and ready to listen.",
      },
      { status: 500, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
    );
  }
}
