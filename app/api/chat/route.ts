import { NextRequest, NextResponse } from 'next/server';
import { GroqClient, GROQ_MODELS } from '@/lib/groq';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const SYSTEM_PROMPT =
  'You are a compassionate Bible-based spiritual companion. You offer encouragement from Scripture and general spiritual guidance. You are NOT a counsellor or therapist. If someone appears to be in crisis, direct them to professional helplines. Keep responses warm, concise, and grounded in Scripture.';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: CORS_HEADERS });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: 'Invalid request. Expected { messages: Array<{role: string, content: string}>, context?: string }' },
        { status: 400, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
      );
    }

    const messages = body.messages as Array<{ role: string; content: string }>;
    const context =
      typeof body.context === 'string' ? body.context : undefined;

    const validRoles = ['system', 'user', 'assistant'];
    const groqMessages = messages
      .filter((m) => m && typeof m.content === 'string' && m.content.trim())
      .filter((m) => m.role !== 'system')
      .map((m) => ({
        role: validRoles.includes(m.role) ? (m.role as 'system' | 'user' | 'assistant') : 'user',
        content: (m.content as string).trim(),
      }));

    if (groqMessages.length === 0) {
      return NextResponse.json(
        { error: 'At least one message with content is required' },
        { status: 400, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
      );
    }

    const fullSystemPrompt = context
      ? `${SYSTEM_PROMPT}\n\nAdditional context: ${context}`
      : SYSTEM_PROMPT;

    const allMessages = [
      { role: 'system' as const, content: fullSystemPrompt },
      ...groqMessages,
    ];

    const client = new GroqClient();
    const content = await client.chat(allMessages, { maxTokens: 500 });

    return NextResponse.json(
      { content, model: GROQ_MODELS.GPT_OSS_120B },
      { headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[chat] Error:', error);
    return NextResponse.json(
      { error: 'Chat completion failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
    );
  }
}
