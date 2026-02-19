export interface VoiceQuality {
  voice: SpeechSynthesisVoice;
  score: number;
  quality: 'premium' | 'enhanced' | 'standard' | 'basic';
  isPlatformOptimal: boolean;
}

export type Platform = 'ios' | 'macos' | 'windows' | 'android' | 'chromeos' | 'linux' | 'unknown';

export const detectPlatform = (): Platform => {
  const userAgent = navigator.userAgent.toLowerCase();
  const platform = navigator.platform?.toLowerCase() || '';

  if (/iphone|ipad|ipod/.test(userAgent)) return 'ios';
  if (/mac/.test(platform) && !/iphone|ipad|ipod/.test(userAgent)) return 'macos';
  if (/win/.test(platform)) return 'windows';
  if (/android/.test(userAgent)) return 'android';
  if (/cros/.test(userAgent)) return 'chromeos';
  if (/linux/.test(platform)) return 'linux';

  return 'unknown';
};

export const getPlatformName = (platform: Platform): string => {
  const names: Record<Platform, string> = {
    ios: 'iOS',
    macos: 'macOS',
    windows: 'Windows',
    android: 'Android',
    chromeos: 'Chrome OS',
    linux: 'Linux',
    unknown: 'Your Device'
  };
  return names[platform];
};

const premiumVoiceKeywords = [
  'premium', 'enhanced', 'neural', 'natural', 'improved', 'high-quality'
];

const qualityVoiceNames: Record<Platform, string[]> = {
  ios: [
    'samantha (enhanced)', 'ava (premium)', 'nicky (enhanced)',
    'allison (premium)', 'karen', 'samantha', 'ava'
  ],
  macos: [
    'alex', 'samantha (enhanced)', 'victoria', 'allison (premium)',
    'samantha', 'karen', 'susan', 'vicki'
  ],
  windows: [
    'microsoft zira desktop', 'microsoft david desktop',
    'microsoft mark', 'microsoft zira', 'microsoft david'
  ],
  android: [
    'google us english', 'english united states',
    'en-us-language', 'english (united states)'
  ],
  chromeos: [
    'google us english', 'chrome os us english',
    'english united states'
  ],
  linux: [
    'english (america)', 'english (united states)',
    'en-us', 'american english'
  ],
  unknown: []
};

const calculateVoiceScore = (
  voice: SpeechSynthesisVoice,
  platform: Platform
): number => {
  let score = 0;
  const lowerName = voice.name.toLowerCase();
  const lowerLang = voice.lang.toLowerCase();

  if (lowerLang.startsWith('en-us')) score += 50;
  else if (lowerLang.startsWith('en-gb')) score += 45;
  else if (lowerLang.startsWith('en')) score += 40;
  else return 0;

  if (voice.localService) score += 20;

  const platformVoices = qualityVoiceNames[platform] || [];
  const matchIndex = platformVoices.findIndex(pv =>
    lowerName.includes(pv.toLowerCase())
  );
  if (matchIndex !== -1) {
    score += (50 - matchIndex * 5);
  }

  for (const keyword of premiumVoiceKeywords) {
    if (lowerName.includes(keyword)) {
      score += 30;
      break;
    }
  }

  const femaleKeywords = ['female', 'woman', 'samantha', 'victoria',
    'karen', 'susan', 'allison', 'zira', 'ava', 'nicky'];
  const hasFemaleKeyword = femaleKeywords.some(k => lowerName.includes(k));
  if (hasFemaleKeyword) score += 10;

  if (lowerName.includes('default')) score += 15;

  return score;
};

const determineQuality = (
  voice: SpeechSynthesisVoice,
  score: number
): VoiceQuality['quality'] => {
  const lowerName = voice.name.toLowerCase();

  if (premiumVoiceKeywords.some(k => lowerName.includes(k))) {
    if (lowerName.includes('premium') || lowerName.includes('neural')) {
      return 'premium';
    }
    return 'enhanced';
  }

  if (score >= 80) return 'premium';
  if (score >= 60) return 'enhanced';
  if (score >= 40) return 'standard';
  return 'basic';
};

export const rankVoices = (
  voices: SpeechSynthesisVoice[],
  platform: Platform
): VoiceQuality[] => {
  const rankedVoices = voices
    .filter(voice => voice.lang.toLowerCase().startsWith('en'))
    .map(voice => {
      const score = calculateVoiceScore(voice, platform);
      const quality = determineQuality(voice, score);
      const isPlatformOptimal = qualityVoiceNames[platform]?.some(
        pv => voice.name.toLowerCase().includes(pv.toLowerCase())
      ) || false;

      return {
        voice,
        score,
        quality,
        isPlatformOptimal
      };
    })
    .sort((a, b) => b.score - a.score);

  return rankedVoices;
};

export const getVoiceQualityBadge = (quality: VoiceQuality['quality']): {
  text: string;
  color: string;
  bgColor: string;
} => {
  const badges = {
    premium: {
      text: 'Premium',
      color: 'text-purple-700 dark:text-purple-300',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
    enhanced: {
      text: 'Enhanced',
      color: 'text-blue-700 dark:text-blue-300',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    standard: {
      text: 'Standard',
      color: 'text-green-700 dark:text-green-300',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    basic: {
      text: 'Basic',
      color: 'text-gray-700 dark:text-gray-300',
      bgColor: 'bg-gray-100 dark:bg-gray-900/30'
    }
  };
  return badges[quality];
};

export const getDownloadInstructions = (platform: Platform): {
  title: string;
  steps: string[];
  note?: string;
} => {
  const instructions: Record<Platform, ReturnType<typeof getDownloadInstructions>> = {
    ios: {
      title: 'Download Premium Voices on iOS',
      steps: [
        'Open the Settings app on your iPhone or iPad',
        'Go to Accessibility',
        'Tap on Spoken Content',
        'Tap on Voices',
        'Select "English" and then your region (e.g., United States)',
        'Download "Enhanced Quality" voices like "Samantha (Enhanced)" or "Ava (Premium)"',
        'Restart this app after downloading'
      ],
      note: 'Enhanced voices provide much better quality and sound more natural. They require additional storage space (typically 100-300 MB per voice).'
    },
    macos: {
      title: 'Download Premium Voices on macOS',
      steps: [
        'Open System Settings (or System Preferences on older macOS)',
        'Go to Accessibility',
        'Select Spoken Content',
        'Click on System Voice dropdown',
        'Select "Customize..." at the bottom',
        'Find English voices and download ones marked as "Premium" or "Enhanced"',
        'Recommended: Alex, Samantha (Enhanced), Victoria',
        'Restart your browser after downloading'
      ],
      note: 'Premium voices offer significantly better quality. Alex is considered one of the best free voices on macOS.'
    },
    windows: {
      title: 'Download Better Voices on Windows',
      steps: [
        'Open Settings',
        'Go to Time & Language',
        'Select Speech',
        'Under "Manage voices", click "Add voices"',
        'Download "Microsoft Zira Desktop" or "Microsoft David Desktop"',
        'Desktop versions sound much better than mobile versions',
        'Restart your browser after installation'
      ],
      note: 'Windows voices with "Desktop" in the name are higher quality. You can also install third-party voices from the Microsoft Store.'
    },
    android: {
      title: 'Improve Voice Quality on Android',
      steps: [
        'Open the Google Play Store',
        'Search for "Google Text-to-Speech"',
        'Make sure it\'s updated to the latest version',
        'Open the app',
        'Go to Settings',
        'Tap "Install voice data"',
        'Download "English (United States)" with highest quality',
        'Select the voice in Language preferences',
        'Restart this app'
      ],
      note: 'Newer Android versions include neural voices that sound very natural. Make sure Google Text-to-Speech is your default engine.'
    },
    chromeos: {
      title: 'Voice Quality on Chrome OS',
      steps: [
        'Open Chrome Settings',
        'Go to Accessibility',
        'Select Text-to-Speech',
        'Chrome OS includes Google\'s voices by default',
        'Try different "English" voices to find the best quality',
        'Google voices are generally high quality on Chrome OS'
      ],
      note: 'Chrome OS typically includes good quality voices by default. If quality is poor, check for Chrome OS updates.'
    },
    linux: {
      title: 'Install Better Voices on Linux',
      steps: [
        'Install espeak-ng or festival TTS engine',
        'For better quality, install SVOX Pico or MaryTTS',
        'Ubuntu/Debian: sudo apt-get install espeak-ng',
        'Install voice packages: sudo apt-get install espeak-ng-data',
        'For premium voices, consider installing MaryTTS',
        'Restart your browser after installation'
      ],
      note: 'Linux TTS quality varies by distribution. MaryTTS offers the best quality but requires more setup.'
    },
    unknown: {
      title: 'Improve Voice Quality',
      steps: [
        'Check your system settings for Text-to-Speech or Speech options',
        'Look for options to download additional voices',
        'Search for "premium" or "enhanced" voices',
        'Download voices specifically for your region (e.g., US English)',
        'Restart your browser after downloading new voices'
      ],
      note: 'The exact steps depend on your device and operating system. Check your device documentation for text-to-speech settings.'
    }
  };

  return instructions[platform];
};
