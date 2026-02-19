import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface PrayerSubmission {
  name?: string;
  email?: string;
  is_anonymous: boolean;
  prayer_request: string;
  allow_sharing: boolean;
}

async function sendEmailNotification(data: PrayerSubmission) {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');

  if (!resendApiKey) {
    console.warn('RESEND_API_KEY not configured, skipping email notification');
    return;
  }

  const displayName = data.is_anonymous ? 'Anonymous' : data.name || 'Anonymous';
  const displayEmail = data.is_anonymous ? 'Not provided' : data.email || 'Not provided';

  const emailBody = `
New Prayer Request Received

From: ${displayName}
Email: ${displayEmail}
Type: ${data.is_anonymous ? 'Anonymous' : 'Public'}
Allow Sharing: ${data.allow_sharing ? 'Yes' : 'No'}

Prayer Request:
${data.prayer_request}

---
Submitted on ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST
`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Prayer Requests <noreply@shametoflame.faith>',
        to: ['prayer-request@shametoflame.faith'],
        subject: `New Prayer Request from ${displayName}`,
        text: emailBody,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Failed to send email:', error);
    } else {
      console.log('Email notification sent successfully');
    }
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const data: PrayerSubmission = await req.json();

    if (!data.prayer_request) {
      return new Response(
        JSON.stringify({ error: 'Prayer request is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (!data.is_anonymous && (!data.name || !data.email)) {
      return new Response(
        JSON.stringify({ error: 'Name and email are required for non-anonymous requests' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (data.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        return new Response(
          JSON.stringify({ error: 'Invalid email address' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    }

    const { error: insertError } = await supabase
      .from('prayer_requests')
      .insert({
        name: data.is_anonymous ? null : data.name?.trim(),
        email: data.is_anonymous ? null : data.email?.trim().toLowerCase(),
        is_anonymous: data.is_anonymous,
        prayer_request: data.prayer_request.trim(),
        allow_sharing: data.allow_sharing || false,
        status: 'new'
      });

    if (insertError) {
      console.error('Database insert error:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to submit prayer request' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    await sendEmailNotification(data);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Your prayer request has been received. We will lift you up in prayer and respond within 24-48 hours.'
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});