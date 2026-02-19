'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Settings, HardDrive, Trash2, Download, Calendar, BookOpen, Heart, AlertTriangle, CheckCircle, Smartphone } from 'lucide-react';
import { offlineStorage, OfflineContent } from '@/services/offlineStorage';
import { useToast } from '@/contexts/ToastContext';
import { usePWAInstall } from '@/hooks/usePWAInstall';

export default function SettingsContent() {
  const { showToast } = useToast();
  const { isInstalled, isInstallable, installApp } = usePWAInstall();
  const [offlineContent, setOfflineContent] = useState<OfflineContent[]>([]);
  const [storageSize, setStorageSize] = useState<string>('0');
  const [isLoading, setIsLoading] = useState(true);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    loadOfflineContent();
  }, []);

  const loadOfflineContent = async () => {
    try {
      setIsLoading(true);
      const content = await offlineStorage.getAllContent();
      setOfflineContent(content);

      const size = await offlineStorage.getStorageSize();
      const sizeInMB = (size / (1024 * 1024)).toFixed(2);
      setStorageSize(sizeInMB);
    } catch (error) {
      console.error('Error loading offline content:', error);
      showToast('Failed to load offline content', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteItem = async (id: string, title: string) => {
    try {
      await offlineStorage.deleteContent(id);
      showToast(`Removed "${title}" from offline storage`, 'info');
      await loadOfflineContent();
    } catch (error) {
      console.error('Error deleting content:', error);
      showToast('Failed to remove content', 'error');
    }
  };

  const handleClearAll = async () => {
    try {
      setIsLoading(true);
      const allContent = await offlineStorage.getAllContent();

      for (const item of allContent) {
        await offlineStorage.deleteContent(item.id);
      }

      showToast('All offline content has been cleared', 'success');
      setShowClearConfirm(false);
      await loadOfflineContent();
    } catch (error) {
      console.error('Error clearing all content:', error);
      showToast('Failed to clear all content', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInstallApp = async () => {
    const accepted = await installApp();
    if (accepted) {
      showToast('App installed successfully', 'success');
      localStorage.removeItem('pwa-install-dismissed');
    } else {
      showToast('App installation cancelled', 'info');
    }
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'devotional':
        return <Heart className="w-5 h-5 text-flame-500" />;
      case 'pathway':
        return <BookOpen className="w-5 h-5 text-sky-500" />;
      case 'blog':
        return <Calendar className="w-5 h-5 text-green-500" />;
      case 'crisis':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Download className="w-5 h-5 text-gray-500" />;
    }
  };

  const getContentTypeLabel = (type: string) => {
    switch (type) {
      case 'devotional':
        return 'Daily Fire';
      case 'pathway':
        return 'Healing Pathway';
      case 'blog':
        return 'Blog Post';
      case 'crisis':
        return 'Crisis Resource';
      default:
        return type;
    }
  };

  const getContentUrl = (type: string, id: string) => {
    if (id === 'all-devotionals') {
      return '/daily-fire?showAll=true';
    }

    switch (type) {
      case 'devotional':
        return `/daily-fire/${id}`;
      case 'pathway':
        return `/healing-pathways/${id}`;
      case 'blog':
        return `/prayer-rock/blog/${id}`;
      case 'crisis':
        return '/crisis-help';
      default:
        return '#';
    }
  };

  const filteredContent = filterType === 'all'
    ? offlineContent
    : offlineContent.filter(item => item.type === filterType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-flame-500 rounded-full flex items-center justify-center">
            <Settings className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
              Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Manage your offline content and preferences
            </p>
          </div>
        </div>

        {!isInstalled && isInstallable && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-sky-500 to-blue-500 p-6">
              <h2 className="font-serif text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <Smartphone className="h-6 w-6" />
                Install as App
              </h2>
              <p className="text-white/90">
                Access Shame to Flame from your home screen
              </p>
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 dark:text-white text-lg mb-2">
                    Get the Full App Experience
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Install Shame to Flame on your device for quick access to healing resources,
                    Daily Fire devotionals, and offline content. The app works just like a native
                    app with a dedicated icon on your home screen.
                  </p>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Access from your home screen</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Works offline with saved content</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Fast, native-like experience</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>No app store required</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={handleInstallApp}
                    className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-medium py-4 px-8 rounded-xl transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-xl"
                  >
                    <Smartphone className="h-5 w-5" />
                    Install App
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isInstalled && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex items-center gap-4 text-green-600 dark:text-green-400">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
                    App Installed
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Shame to Flame is installed and ready to use
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-flame-500 to-orange-500 p-6">
            <h2 className="font-serif text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <HardDrive className="h-6 w-6" />
              Offline Content Storage
            </h2>
            <p className="text-white/90">
              Content saved for offline viewing
            </p>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-flame-50 dark:bg-flame-900/20 rounded-lg p-4">
                  <div className="text-3xl font-bold text-flame-600 dark:text-flame-400">
                    {filteredContent.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Items Saved
                  </div>
                </div>

                <div className="bg-sky-50 dark:bg-sky-900/20 rounded-lg p-4">
                  <div className="text-3xl font-bold text-sky-600 dark:text-sky-400">
                    {storageSize} MB
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Storage Used
                  </div>
                </div>
              </div>

              {offlineContent.length > 0 && (
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All Content
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterType === 'all'
                    ? 'bg-flame-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                All ({offlineContent.length})
              </button>
              <button
                onClick={() => setFilterType('devotional')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterType === 'devotional'
                    ? 'bg-flame-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Daily Fire ({offlineContent.filter(c => c.type === 'devotional').length})
              </button>
              <button
                onClick={() => setFilterType('pathway')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterType === 'pathway'
                    ? 'bg-flame-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Pathways ({offlineContent.filter(c => c.type === 'pathway').length})
              </button>
              <button
                onClick={() => setFilterType('blog')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterType === 'blog'
                    ? 'bg-flame-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Blog Posts ({offlineContent.filter(c => c.type === 'blog').length})
              </button>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-flame-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-300">Loading offline content...</p>
              </div>
            ) : filteredContent.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                <Download className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-800 dark:text-white text-lg mb-2">
                  No Offline Content Yet
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                  Visit pages and click "Download for Offline" to save content for viewing without an internet connection.
                </p>
                <Link
                  href="/daily-fire"
                  className="inline-flex items-center gap-2 bg-flame-600 hover:bg-flame-700 text-white font-medium py-3 px-6 rounded-full transition-colors duration-200"
                >
                  <Heart className="h-4 w-4" />
                  Browse Daily Fire
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredContent.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group"
                  >
                    <Link
                      href={getContentUrl(item.type, item.id)}
                      className="flex items-center gap-3 flex-1 min-w-0"
                    >
                      {getContentIcon(item.type)}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 dark:text-white truncate group-hover:text-flame-600 dark:group-hover:text-flame-400 transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                          <span>{getContentTypeLabel(item.type)}</span>
                          <span>•</span>
                          <span>Saved {new Date(item.cachedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </Link>
                    <button
                      onClick={() => handleDeleteItem(item.id, item.title)}
                      className="ml-4 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      aria-label="Remove from offline storage"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {showClearConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-800 dark:text-white">
                  Clear All Content?
                </h3>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This will remove all {offlineContent.length} saved items from offline storage.
                You'll need to download them again to access them offline. This action cannot be undone.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearAll}
                  disabled={isLoading}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Clearing...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Clear All
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
