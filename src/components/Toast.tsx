'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, X, Flame } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const icons = {
    success: <Flame className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const bgColors = {
    success: 'bg-white dark:bg-gray-800 border-l-4 border-green-500',
    error: 'bg-white dark:bg-gray-800 border-l-4 border-red-500',
    info: 'bg-white dark:bg-gray-800 border-l-4 border-blue-500',
  };

  return (
    <div
      className={`${bgColors[type]} shadow-lg rounded-lg p-4 min-w-[300px] max-w-md flex items-start gap-3 transform transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      {icons[type]}
      <p className="flex-1 text-gray-800 dark:text-gray-200 text-sm font-medium">
        {message}
      </p>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
