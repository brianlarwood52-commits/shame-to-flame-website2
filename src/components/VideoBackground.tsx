'use client'

import React from 'react';

const VideoBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
      <div className="absolute inset-0 bg-gradient-to-br from-sky-900/15 via-purple-900/10 to-flame-900/15" />
    </div>
  );
};

export default VideoBackground;
