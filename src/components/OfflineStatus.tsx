'use client';

import { useEffect, useState } from 'react';
import { WifiOff, Wifi, CloudUpload } from 'lucide-react';
import { useOfflineSubmission } from '@/hooks/useOfflineSubmission';

export default function OfflineStatus() {
  const { isOnline, pendingCount, syncPendingSubmissions } = useOfflineSubmission();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    setShowBanner(!isOnline || pendingCount > 0);
  }, [isOnline, pendingCount]);

  if (!showBanner) return null;

  return (
    <div className={`fixed top-16 left-0 right-0 z-40 ${isOnline ? 'bg-green-600' : 'bg-orange-600'} text-white py-2 px-4 shadow-lg transition-all duration-300`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isOnline ? (
            <>
              <Wifi className="w-5 h-5" />
              <span className="text-sm font-medium">
                Back online! {pendingCount > 0 && `Syncing ${pendingCount} pending submission${pendingCount > 1 ? 's' : ''}...`}
              </span>
            </>
          ) : (
            <>
              <WifiOff className="w-5 h-5" />
              <span className="text-sm font-medium">
                You're offline. Your submissions will be saved and synced when you reconnect.
              </span>
            </>
          )}
        </div>

        {isOnline && pendingCount > 0 && (
          <button
            onClick={syncPendingSubmissions}
            className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm font-medium transition-colors"
          >
            <CloudUpload className="w-4 h-4" />
            Sync Now
          </button>
        )}
      </div>
    </div>
  );
}
