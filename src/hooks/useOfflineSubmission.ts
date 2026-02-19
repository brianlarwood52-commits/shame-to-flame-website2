import { useState, useEffect } from 'react';
import { offlineStorage, OfflineSubmission } from '@/services/offlineStorage';

export function useOfflineSubmission() {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    updateOnlineStatus();
    updatePendingCount();

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const updatePendingCount = async () => {
    try {
      const pending = await offlineStorage.getPendingSubmissions();
      setPendingCount(pending.length);
    } catch (error) {
      console.error('Error getting pending submissions:', error);
    }
  };

  const handleOnline = async () => {
    setIsOnline(true);
    await syncPendingSubmissions();
  };

  const syncPendingSubmissions = async () => {
    try {
      const pending = await offlineStorage.getPendingSubmissions();

      for (const submission of pending) {
        try {
          await submitToServer(submission);
          await offlineStorage.deleteSubmission(submission.id);
        } catch (error) {
          console.error('Failed to sync submission:', submission.id, error);
        }
      }

      await updatePendingCount();
    } catch (error) {
      console.error('Error syncing submissions:', error);
    }
  };

  const submitToServer = async (submission: OfflineSubmission) => {
    const endpoint = submission.type === 'prayer'
      ? '/api/submit-prayer'
      : '/api/submit-contact';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission.data),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    return response.json();
  };

  const queueSubmission = async (
    type: 'prayer' | 'contact',
    data: any
  ): Promise<boolean> => {
    if (isOnline) {
      try {
        await submitToServer({
          id: Date.now().toString(),
          type,
          data,
          timestamp: Date.now(),
        });
        return true;
      } catch (error) {
        console.error('Submission failed, queueing for later:', error);
      }
    }

    try {
      await offlineStorage.queueSubmission({
        id: Date.now().toString(),
        type,
        data,
        timestamp: Date.now(),
      });
      await updatePendingCount();
      return true;
    } catch (error) {
      console.error('Failed to queue submission:', error);
      return false;
    }
  };

  return {
    isOnline,
    pendingCount,
    queueSubmission,
    syncPendingSubmissions,
  };
}
