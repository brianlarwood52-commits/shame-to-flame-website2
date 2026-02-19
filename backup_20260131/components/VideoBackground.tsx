'use client'

import React, { useState, useEffect, useRef } from 'react';

const VideoBackground = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setVideoLoaded(true);
      setVideoError(false);
      video.play().catch(() => {
        // Autoplay might be blocked, that's okay
      });
    };

    const handleError = () => {
      setVideoError(true);
      setVideoLoaded(false);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    // Explicitly trigger video loading
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
      {/* Fallback gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br from-sky-900 via-purple-900 to-orange-900 transition-opacity duration-1000 ${
        videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'
      }`}></div>
      
      {/* Video Background */}
      {!videoError && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src="/shame-to-flame.mp4" type="video/mp4" />
        </video>
      )}
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
    </div>
  );
};

export default VideoBackground;
