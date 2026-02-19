import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';

const PWAInstallPrompt: React.FC = () => {
  const { isInstalled, isInstallable, installApp } = usePWAInstall();
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (isInstallable && !isInstalled && !localStorage.getItem('pwa-install-dismissed')) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isInstallable, isInstalled]);

  const handleInstallClick = async () => {
    const accepted = await installApp();
    setShowPrompt(false);

    if (accepted) {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (isInstalled || !showPrompt || !isInstallable) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 animate-slide-up">
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl shadow-xl border border-white/20 dark:border-gray-700/50 p-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-flame-400 to-flame-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Smartphone className="h-5 w-5 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800 dark:text-white text-sm">
              Install Shame to Flame
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-xs mt-1 leading-relaxed">
              Add our ministry app to your home screen for quick access to healing resources, even offline.
            </p>
            
            <div className="flex items-center space-x-2 mt-3">
              <button
                onClick={handleInstallClick}
                className="inline-flex items-center px-3 py-1.5 bg-flame-600 hover:bg-flame-700 text-white text-xs font-medium rounded-lg transition-colors duration-200"
              >
                <Download className="h-3 w-3 mr-1" />
                Install
              </button>
              <button
                onClick={handleDismiss}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xs"
              >
                Not now
              </button>
            </div>
          </div>
          
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;