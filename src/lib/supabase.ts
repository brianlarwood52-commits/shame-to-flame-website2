// Backend service placeholder
// TODO: Replace with new backend solution (not Supabase)

export const backendConfig = {
  // Backend not configured yet
  configured: false,
};

export async function submitContact(data: {
  name: string;
  email: string;
  request_type: string;
  subject?: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  // TODO: Implement with new backend
  console.log('Contact submission (backend not configured):', data);
  
  // For now, just log and return success
  // In production, this would send to a real backend
  return { 
    success: true, 
    message: 'Thank you for your message. We will get back to you soon.' 
  };
}

export async function submitPrayer(data: {
  name?: string | null;
  email?: string | null;
  is_anonymous: boolean;
  prayer_request: string;
  allow_sharing: boolean;
}): Promise<{ success: boolean; message: string }> {
  // TODO: Implement with new backend
  console.log('Prayer submission (backend not configured):', data);
  
  // For now, just log and return success
  // In production, this would send to a real backend
  return { 
    success: true, 
    message: 'Your prayer request has been received. We are praying with you.' 
  };
}
