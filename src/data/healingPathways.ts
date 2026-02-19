export interface PathwaySession {
  id: number;
  title: string;
  description: string;
  keyVerses: string[];
  reflectionQuestions: string[];
  practicalSteps: string[];
  prayer: string;
}

export interface HealingPathway {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  sessions: PathwaySession[];
  estimatedWeeks: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const healingPathways: HealingPathway[] = [
  {
    id: 'overcoming-shame',
    title: 'Overcoming Shame',
    description: 'A biblical journey from shame to identity in Christ, addressing core wounds and building healthy self-worth.',
    icon: 'Heart',
    color: 'flame',
    estimatedWeeks: 8,
    difficulty: 'Beginner',
    sessions: [
      {
        id: 1,
        title: 'Understanding Shame vs. Guilt',
        description: 'Learn the difference between healthy conviction and destructive shame.',
        keyVerses: ['ROM.8.1', 'PSA.103.12', '1JN.1.9'],
        reflectionQuestions: [
          'How do you typically respond when you make a mistake?',
          'What messages about your worth did you receive growing up?',
          'Where do you feel shame most acutely in your life right now?'
        ],
        practicalSteps: [
          'Keep a shame vs. guilt journal for one week',
          'Practice saying "I made a mistake" instead of "I am a mistake"',
          'Identify three shame triggers in your daily life'
        ],
        prayer: 'Lord, help me to see myself through Your eyes of love and grace. Show me the difference between Your gentle conviction and the enemy\'s condemning shame.'
      },
      {
        id: 2,
        title: 'Your True Identity in Christ',
        description: 'Discover who God says you are and learn to live from that truth.',
        keyVerses: ['2CO.5.17', 'EPH.2.10', '1PE.2.9'],
        reflectionQuestions: [
          'What does it mean to be a "new creation" in Christ?',
          'How does knowing you are God\'s workmanship change your self-perception?',
          'What lies about your identity do you need to replace with God\'s truth?'
        ],
        practicalSteps: [
          'Create an identity card with verses about who you are in Christ',
          'Practice introducing yourself with your spiritual identity',
          'Replace negative self-talk with biblical affirmations'
        ],
        prayer: 'Father, thank You for making me Your beloved child. Help me to live confidently in the identity You have given me in Christ.'
      },
      {
        id: 3,
        title: 'Breaking Shame Cycles',
        description: 'Identify and interrupt the patterns that keep you trapped in shame.',
        keyVerses: ['ROM.12.2', 'PHP.4.8', '2CO.10.5'],
        reflectionQuestions: [
          'What situations or people tend to trigger shame in your life?',
          'How do you typically try to cope with or hide your shame?',
          'What would it look like to respond to shame with truth instead of hiding?'
        ],
        practicalSteps: [
          'Map your personal shame cycle',
          'Develop a "truth response" for each shame trigger',
          'Practice vulnerability with a trusted friend or counselor'
        ],
        prayer: 'God, give me courage to face my shame and wisdom to break free from destructive patterns. Transform my mind with Your truth.'
      }
    ]
  },
  {
    id: 'grief-and-loss',
    title: 'Grief and Loss',
    description: 'Processing grief, disappointment, and loss while finding hope and meaning in the midst of pain.',
    icon: 'Sunrise',
    color: 'sky',
    estimatedWeeks: 10,
    difficulty: 'Intermediate',
    sessions: [
      {
        id: 1,
        title: 'Permission to Grieve',
        description: 'Understanding that grief is a natural and necessary process that God honors.',
        keyVerses: ['ECC.3.4', 'JHN.11.35', 'PSA.34.18'],
        reflectionQuestions: [
          'What losses are you currently grieving?',
          'How comfortable are you with expressing sadness or pain?',
          'What messages did you receive about grief growing up?'
        ],
        practicalSteps: [
          'Write a letter to what or whom you have lost',
          'Allow yourself to feel emotions without judgment',
          'Create a safe space for processing grief'
        ],
        prayer: 'Lord, thank You for being close to the brokenhearted. Give me permission to grieve fully and heal completely in Your timing.'
      },
      {
        id: 2,
        title: 'The Stages of Grief',
        description: 'Understanding the natural progression of grief and where you might be in the process.',
        keyVerses: ['PSA.30.5', 'ISA.61.3', 'REV.21.4'],
        reflectionQuestions: [
          'Which stage of grief do you find yourself in most often?',
          'How has your grief changed over time?',
          'What hopes do you have for your healing journey?'
        ],
        practicalSteps: [
          'Journal about your grief journey',
          'Identify healthy coping mechanisms',
          'Connect with others who understand loss'
        ],
        prayer: 'Father, walk with me through every stage of grief. Help me trust that weeping may endure for a night, but joy comes in the morning.'
      }
    ]
  },
  {
    id: 'spiritual-abuse-recovery',
    title: 'Healing from Spiritual Abuse',
    description: 'Recovering from religious trauma and rediscovering God\'s true heart for you.',
    icon: 'Shield',
    color: 'sage',
    estimatedWeeks: 12,
    difficulty: 'Advanced',
    sessions: [
      {
        id: 1,
        title: 'Recognizing Spiritual Abuse',
        description: 'Understanding what spiritual abuse looks like and validating your experience.',
        keyVerses: ['MAT.11.28-30', 'GAL.5.1', '1JN.4.18'],
        reflectionQuestions: [
          'What religious experiences have caused you pain or confusion?',
          'How has your image of God been affected by spiritual abuse?',
          'What fears do you have about trusting God again?'
        ],
        practicalSteps: [
          'Identify specific instances of spiritual abuse',
          'Separate human failures from God\'s character',
          'Begin to distinguish between religion and relationship'
        ],
        prayer: 'God, help me to see You as You truly are, not through the lens of those who have misrepresented You. Heal my wounded faith.'
      }
    ]
  }
];

export const getPathwayById = (id: string): HealingPathway | undefined => {
  return healingPathways.find(pathway => pathway.id === id);
};

export const getSessionById = (pathwayId: string, sessionId: number): PathwaySession | undefined => {
  const pathway = getPathwayById(pathwayId);
  return pathway?.sessions.find(session => session.id === sessionId);
};