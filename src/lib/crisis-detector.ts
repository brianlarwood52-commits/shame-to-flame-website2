/**
 * Crisis Detection System
 * 
 * Detects crisis language and provides appropriate resources.
 * Uses keyword matching + emotional score thresholds.
 */

export type CrisisCategory = 
  | 'suicide'
  | 'self_harm'
  | 'abuse'
  | 'violence'
  | 'addiction'
  | 'eating_disorder'
  | 'severe_depression'
  | 'trauma'
  | 'general_crisis';

export type UrgencyLevel = 'low' | 'medium' | 'high' | 'immediate';

export interface CrisisResource {
  name: string;
  description: string;
  phone?: string;
  text?: string;
  website?: string;
  available: string; // e.g., "24/7", "9am-5pm"
  categories: CrisisCategory[];
}

export interface CrisisDetectionResult {
  isCrisis: boolean;
  urgency: UrgencyLevel;
  categories: CrisisCategory[];
  matchedKeywords: string[];
  resources: CrisisResource[];
  safetyMessage: string;
}

// Crisis keywords by category
const CRISIS_KEYWORDS: Record<CrisisCategory, string[]> = {
  suicide: [
    "want to die", "kill myself", "end my life", "suicide",
    "don't want to live", "better off dead", "no reason to live",
    "can't go on", "end it all", "take my own life",
    "not worth living", "wish I was dead", "want to disappear forever"
  ],
  self_harm: [
    "hurt myself", "self-harm", "cut myself", "cutting",
    "burn myself", "punish myself", "harm myself",
    "deserve to be hurt", "deserve pain"
  ],
  abuse: [
    "being abused", "abuses me", "hits me", "beats me",
    "hurts me physically", "domestic violence", "molested",
    "sexual abuse", "forced me", "violent towards me"
  ],
  violence: [
    "want to hurt someone", "want to kill", "going to hurt",
    "violent thoughts", "rage", "want to destroy"
  ],
  addiction: [
    "can't stop using", "overdose", "relapsed",
    "drinking too much", "addicted", "substance abuse",
    "can't quit", "withdrawal"
  ],
  eating_disorder: [
    "won't eat", "can't eat", "purging", "binging",
    "hate my body", "too fat", "anorexia", "bulimia",
    "starving myself"
  ],
  severe_depression: [
    "so depressed", "can't function", "can't get out of bed",
    "hopeless", "nothing matters", "completely numb",
    "empty inside", "no point", "given up"
  ],
  trauma: [
    "flashbacks", "nightmares every night", "can't escape the memories",
    "ptsd", "traumatized", "panic attacks constantly"
  ],
  general_crisis: [
    "crisis", "emergency", "desperate", "breaking down",
    "can't cope", "falling apart", "need help now"
  ]
};

// Crisis resources (international focus, Australia emphasis from user's context)
const CRISIS_RESOURCES: CrisisResource[] = [
  {
    name: "Lifeline Australia",
    description: "24/7 crisis support and suicide prevention",
    phone: "13 11 14",
    text: "0477 13 11 14",
    website: "https://www.lifeline.org.au",
    available: "24/7",
    categories: ['suicide', 'self_harm', 'severe_depression', 'general_crisis']
  },
  {
    name: "Beyond Blue",
    description: "Mental health support and resources",
    phone: "1300 22 4636",
    website: "https://www.beyondblue.org.au",
    available: "24/7",
    categories: ['severe_depression', 'trauma', 'general_crisis']
  },
  {
    name: "1800RESPECT",
    description: "National sexual assault, domestic family violence counselling",
    phone: "1800 737 732",
    website: "https://www.1800respect.org.au",
    available: "24/7",
    categories: ['abuse', 'violence', 'trauma']
  },
  {
    name: "Brave Enough",
    description: "Faith-based support for mental health and crisis",
    phone: "(US) 988",
    website: "https://www.braveenough.org",
    available: "24/7",
    categories: ['suicide', 'self_harm', 'severe_depression', 'trauma', 'general_crisis']
  },
  {
    name: "Suicide Prevention Lifeline (US)",
    description: "24/7 free and confidential support",
    phone: "988",
    text: "988",
    website: "https://988lifeline.org",
    available: "24/7",
    categories: ['suicide', 'self_harm', 'severe_depression']
  },
  {
    name: "Crisis Text Line",
    description: "Text-based crisis support",
    text: "Text HOME to 741741",
    website: "https://www.crisistextline.org",
    available: "24/7",
    categories: ['suicide', 'self_harm', 'general_crisis']
  },
  {
    name: "Kids Helpline (Australia)",
    description: "Free counselling for young people 5-25",
    phone: "1800 55 1800",
    website: "https://kidshelpline.com.au",
    available: "24/7",
    categories: ['suicide', 'self_harm', 'abuse', 'severe_depression', 'general_crisis']
  }
];

// Safety messages by urgency level
const SAFETY_MESSAGES: Record<UrgencyLevel, string> = {
  immediate: `I'm deeply concerned about what you've shared. Your life matters, and there are people who want to help right now. Please reach out to one of these services immediately - they're available 24/7 and ready to listen.`,
  high: `What you're feeling sounds really overwhelming. I want you to know that you don't have to face this alone. Please consider reaching out to one of these support services - they're trained to help with exactly what you're going through.`,
  medium: `It sounds like you're going through a difficult time. Please know that it's okay to ask for help, and these resources are here for you whenever you need them.`,
  low: `I hear that you're struggling. Remember, it's a sign of strength to reach out for support. These resources are available if you ever need someone to talk to.`
};

/**
 * Detect if text contains crisis indicators
 */
export function detectCrisis(
  text: string,
  emotionalScore?: number // -1 to +1, from emotion detector
): CrisisDetectionResult {
  const lowercaseText = text.toLowerCase();
  
  const matchedCategories: Set<CrisisCategory> = new Set();
  const matchedKeywords: string[] = [];

  // Check each category for keyword matches
  for (const [category, keywords] of Object.entries(CRISIS_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowercaseText.includes(keyword)) {
        matchedCategories.add(category as CrisisCategory);
        matchedKeywords.push(keyword);
      }
    }
  }

  // Determine if this is a crisis situation
  const hasKeywordMatch = matchedCategories.size > 0;
  const hasVerySevereEmotions = emotionalScore !== undefined && emotionalScore < -0.7;
  const isCrisis = hasKeywordMatch || hasVerySevereEmotions;

  // Determine urgency level
  let urgency: UrgencyLevel = 'low';
  
  if (matchedCategories.has('suicide') || matchedCategories.has('self_harm')) {
    urgency = 'immediate';
  } else if (matchedCategories.has('abuse') || matchedCategories.has('violence')) {
    urgency = 'high';
  } else if (matchedCategories.size > 0) {
    urgency = hasVerySevereEmotions ? 'high' : 'medium';
  } else if (hasVerySevereEmotions) {
    urgency = 'medium';
  }

  // Get relevant resources
  const categories = Array.from(matchedCategories);
  const resources = getResourcesForCategories(categories, urgency);

  return {
    isCrisis,
    urgency,
    categories,
    matchedKeywords,
    resources,
    safetyMessage: isCrisis ? SAFETY_MESSAGES[urgency] : ''
  };
}

/**
 * Get resources relevant to the detected crisis categories
 */
function getResourcesForCategories(
  categories: CrisisCategory[],
  urgency: UrgencyLevel
): CrisisResource[] {
  if (categories.length === 0) {
    // Return general crisis resources
    return CRISIS_RESOURCES.filter(r => 
      r.categories.includes('general_crisis') || 
      r.categories.includes('severe_depression')
    ).slice(0, 3);
  }

  // Get resources that match any of the categories
  const matchingResources = CRISIS_RESOURCES.filter(resource =>
    resource.categories.some(cat => categories.includes(cat))
  );

  // Sort by relevance (more matching categories = higher relevance)
  matchingResources.sort((a, b) => {
    const aMatches = a.categories.filter(cat => categories.includes(cat)).length;
    const bMatches = b.categories.filter(cat => categories.includes(cat)).length;
    return bMatches - aMatches;
  });

  // Return top resources (more for higher urgency)
  const count = urgency === 'immediate' ? 5 : urgency === 'high' ? 4 : 3;
  return matchingResources.slice(0, count);
}

/**
 * Get all available crisis resources
 */
export function getAllResources(): CrisisResource[] {
  return [...CRISIS_RESOURCES];
}

/**
 * Get resources by specific category
 */
export function getResourcesByCategory(category: CrisisCategory): CrisisResource[] {
  return CRISIS_RESOURCES.filter(r => r.categories.includes(category));
}

/**
 * Quick crisis check - just returns boolean and urgency
 */
export function quickCrisisCheck(text: string): { isCrisis: boolean; urgency: UrgencyLevel } {
  const result = detectCrisis(text);
  return { isCrisis: result.isCrisis, urgency: result.urgency };
}
