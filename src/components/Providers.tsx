'use client';

import { ReactNode } from 'react';
import { ToastProvider } from '@/contexts/ToastContext';
import { BibleStudyProvider } from '@/contexts/BibleStudyContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <BibleStudyProvider>
        {children}
      </BibleStudyProvider>
    </ToastProvider>
  );
}
