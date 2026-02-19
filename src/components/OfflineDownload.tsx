'use client';

import { useState, useEffect } from 'react';
import { Download, Check, Trash2, Loader2, HardDrive } from 'lucide-react';
import { offlineStorage } from '@/services/offlineStorage';
import { useToast } from '@/contexts/ToastContext';

interface OfflineDownloadProps {
  contentId: string;
  contentType: 'devotional' | 'pathway' | 'blog' | 'crisis';
  contentTitle: string;
  contentData: any;
  onDownload?: () => void;
  onDelete?: () => void;
}

export default function OfflineDownload({
  contentId,
  contentType,
  contentTitle,
  contentData,
  onDownload,
  onDelete,
}: OfflineDownloadProps) {
  const { showToast } = useToast();
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [storageSize, setStorageSize] = useState<string>('');
  const [isPartOfBulk, setIsPartOfBulk] = useState(false);

  useEffect(() => {
    checkDownloadStatus();
    updateStorageSize();
  }, [contentId]);

  const checkDownloadStatus = async () => {
    try {
      const content = await offlineStorage.getContent(contentId);
      if (content) {
        setIsDownloaded(true);
        setIsPartOfBulk(false);
        return;
      }

      const isBulkId = contentId.startsWith('all-');
      if (!isBulkId) {
        const bulkContent = await offlineStorage.getContent(`all-${contentType}s`);
        if (bulkContent) {
          setIsDownloaded(true);
          setIsPartOfBulk(true);
          return;
        }
      }

      setIsDownloaded(false);
      setIsPartOfBulk(false);
    } catch (error) {
      console.error('Error checking download status:', error);
    }
  };

  const updateStorageSize = async () => {
    try {
      const size = await offlineStorage.getStorageSize();
      const sizeInMB = (size / (1024 * 1024)).toFixed(2);
      setStorageSize(sizeInMB);
    } catch (error) {
      console.error('Error getting storage size:', error);
    }
  };

  const handleDownload = async () => {
    if (!('indexedDB' in window)) {
      showToast('Your browser does not support offline storage', 'error');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Starting download for:', contentId, contentTitle);

      const isBulkDownload = contentId.startsWith('all-');
      if (isBulkDownload) {
        const deletedCount = await offlineStorage.deleteContentByPattern(contentType, [contentId]);
        if (deletedCount > 0) {
          console.log(`Removed ${deletedCount} individual ${contentType}(s) before bulk download`);
        }
      }

      await offlineStorage.saveContent({
        id: contentId,
        type: contentType,
        title: contentTitle,
        content: contentData,
        cachedAt: Date.now(),
      });

      console.log('Download complete for:', contentId);
      setIsDownloaded(true);
      setIsPartOfBulk(false);
      await updateStorageSize();

      const itemCount = Array.isArray(contentData) ? contentData.length : 1;
      showToast(`${itemCount} ${contentType}${itemCount > 1 ? 's' : ''} saved for offline viewing!`, 'success');

      if (onDownload) onDownload();
    } catch (error) {
      console.error('Error downloading content:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      showToast(`Failed to download: ${errorMessage}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (isPartOfBulk) {
      showToast(`This is part of "All ${contentType}s" download. Delete that to remove this.`, 'info');
      return;
    }

    setIsLoading(true);
    try {
      await offlineStorage.deleteContent(contentId);
      setIsDownloaded(false);
      setIsPartOfBulk(false);
      await updateStorageSize();
      showToast('Offline content removed', 'info');

      if (onDelete) onDelete();
    } catch (error) {
      console.error('Error deleting content:', error);
      showToast('Failed to remove offline content', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {isDownloaded ? (
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          title={isPartOfBulk ? `Part of "All ${contentType}s" download` : 'Click to remove'}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Check className="w-4 h-4" />
              <span>{isPartOfBulk ? 'Downloaded (All)' : 'Downloaded'}</span>
              <Trash2 className="w-4 h-4 ml-2 opacity-70" />
            </>
          )}
        </button>
      ) : (
        <button
          onClick={handleDownload}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Download for Offline</span>
            </>
          )}
        </button>
      )}

      {storageSize && (
        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
          <HardDrive className="w-4 h-4" />
          <span>{storageSize} MB</span>
        </div>
      )}
    </div>
  );
}
