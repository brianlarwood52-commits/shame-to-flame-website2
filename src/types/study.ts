/**
 * ELIZA Bible Study System Types
 * Core type definitions for the adaptive Bible study experience
 */

// ============================================================================
// Emotional State Types
// ============================================================================

/**
 * Emotional tier based on cumulative score
 * - happy: +15 and above - User is thriving spiritually
 * - good: +5 to +14 - User is doing well
 * - neutral: -4 to +4 - User is stable/processing
 * - bad: -5 to -14 - User is struggling
 * - depressed: -15 and below - User needs intervention
 */
export type EmotionalTier = 'happy' | 'good' | 'neutral' | 'bad' | 'depressed';

/**
 * Sentiment classification for user responses
 */
export type Sentiment = 'positive' | 'neutral' | 'negative';

/**
 * Emotional score state with tracking data
 */
export interface EmotionalScoreState {
  /** Current cumulative emotional score */
  score: number;
  /** Current emotional tier based on score */
  tier: EmotionalTier;
  /** History of recent score changes for trend detection */
  recentChanges: number[];
  /** Flag indicating rapid negative decline */
  rapidDecline: boolean;
  /** Timestamp of last update */
  lastUpdated: Date;
}

// ============================================================================
// Subject and Question Types
// ============================================================================

/**
 * Study subject category
 */
export interface SubjectCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
}

/**
 * A Bible verse reference with text
 */
export interface Verse {
  /** Verse reference key (e.g., "ROM.8.1") */
  reference: string;
  /** Full verse text */
  text: string;
  /** Book name for display */
  bookName?: string;
  /** Chapter number */
  chapter?: number;
  /** Verse number */
  verse?: number;
}

/**
 * A study question with scoring metadata
 */
export interface Question {
  /** Unique question identifier */
  id: string;
  /** The question text */
  text: string;
  /** Subject this question belongs to */
  subjectId: string;
  /** Base emotional value of this question (-5 to +5) */
  emotionalValue: number;
  /** Difficulty level */
  difficulty: 'easy' | 'medium' | 'hard';
  /** Related Bible verses */
  relatedVerses: Verse[];
  /** Follow-up questions if user shows distress */
  followUpQuestions?: string[];
  /** Affirmation to show after answering */
  affirmation?: string;
  /** Whether this question has been completed */
  completed?: boolean;
  /** Order within subject (lower = earlier) */
  order: number;
}

/**
 * A study subject containing multiple questions
 */
export interface Subject {
  /** Unique subject identifier */
  id: string;
  /** Subject display name */
  name: string;
  /** Subject category */
  category: string;
  /** Description of the subject */
  description: string;
  /** Difficulty level */
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  /** Questions within this subject */
  questions: Question[];
  /** Key verses for this subject */
  keyVerses: string[];
  /** Words indicating positive response */
  positiveWords: string[];
  /** Words indicating negative response */
  negativeWords: string[];
  /** Words indicating neutral response */
  neutralWords: string[];
  /** Emotional tier this subject is best suited for */
  targetTier?: EmotionalTier;
  /** Priority for selection (higher = more likely) */
  priority?: number;
}

// ============================================================================
// Answer and Response Types
// ============================================================================

/**
 * User's answer to a question
 */
export interface Answer {
  /** Question ID this answer is for */
  questionId: string;
  /** Subject ID the question belongs to */
  subjectId: string;
  /** User's text response */
  text: string;
  /** Detected sentiment of the response */
  sentiment: Sentiment;
  /** Emotional score contribution from this answer */
  scoreContribution: number;
  /** Timestamp when answered */
  timestamp: Date;
  /** Keywords detected in the response */
  detectedKeywords: string[];
}

/**
 * Analysis result of a user's text response
 */
export interface SentimentAnalysis {
  /** Overall sentiment classification */
  sentiment: Sentiment;
  /** Confidence level (0-1) */
  confidence: number;
  /** Score contribution (-10 to +10) */
  scoreContribution: number;
  /** Detected positive keywords */
  positiveKeywords: string[];
  /** Detected negative keywords */
  negativeKeywords: string[];
  /** Detected neutral keywords */
  neutralKeywords: string[];
  /** Flag for crisis indicators */
  crisisIndicators: boolean;
}

// ============================================================================
// Session Types
// ============================================================================

/**
 * Current state of a study session
 */
export interface SessionState {
  /** Unique session identifier */
  id: string;
  /** User ID if authenticated */
  userId?: string;
  /** Current subject being studied */
  currentSubject: Subject | null;
  /** Index of current question within subject */
  currentQuestionIndex: number;
  /** List of selected subjects for this session */
  selectedSubjects: Subject[];
  /** IDs of completed questions */
  completedQuestions: string[];
  /** IDs of completed subjects */
  completedSubjects: string[];
  /** All answers given in this session */
  answers: Answer[];
  /** Current emotional score state */
  emotionalScore: EmotionalScoreState;
  /** Current emotional tier */
  tier: EmotionalTier;
  /** Current round number (1-based) */
  round: number;
  /** Number of questions answered in current round */
  questionsInRound: number;
  /** Session start time */
  startedAt: Date;
  /** Last activity time */
  lastActivityAt: Date;
  /** Whether session is paused */
  isPaused: boolean;
  /** Session completion status */
  status: 'active' | 'completed' | 'crisis' | 'abandoned';
  /** End game result if completed */
  endGameResult?: EndGameResult;
}

/**
 * Configuration for a study session
 */
export interface SessionConfig {
  /** Number of subjects to select per round */
  subjectsPerRound: number;
  /** Number of questions per subject */
  questionsPerSubject: number;
  /** Maximum rounds before forcing end */
  maxRounds: number;
  /** Enable crisis detection */
  enableCrisisDetection: boolean;
  /** Score threshold for happy ending */
  happyThreshold: number;
  /** Score threshold for struggling path */
  strugglingThreshold: number;
  /** Number of recent changes to track for rapid decline */
  rapidDeclineWindow: number;
  /** Threshold for detecting rapid decline */
  rapidDeclineThreshold: number;
}

// ============================================================================
// End Game Types
// ============================================================================

/**
 * Type of ending the session reached
 */
export type EndGameType = 'happy' | 'struggling' | 'crisis' | 'completed';

/**
 * Result when session ends
 */
export interface EndGameResult {
  /** Type of ending */
  type: EndGameType;
  /** Final emotional score */
  finalScore: number;
  /** Final emotional tier */
  finalTier: EmotionalTier;
  /** Personalized message for the user */
  message: string;
  /** Affirmations to display */
  affirmations: string[];
  /** Recommended next steps */
  nextSteps: string[];
  /** Resources to provide */
  resources: Resource[];
  /** Whether to unlock members content */
  unlockMembersContent: boolean;
  /** Whether to show crisis helplines */
  showHelplines: boolean;
  /** Celebration elements for happy ending */
  celebration?: CelebrationData;
  /** Session statistics */
  statistics: SessionStatistics;
}

/**
 * A resource to provide to the user
 */
export interface Resource {
  /** Resource title */
  title: string;
  /** Resource description */
  description: string;
  /** Resource URL if applicable */
  url?: string;
  /** Resource type */
  type: 'helpline' | 'article' | 'video' | 'book' | 'counseling' | 'community';
  /** Whether this is urgent/priority */
  priority: boolean;
}

/**
 * Celebration data for happy ending
 */
export interface CelebrationData {
  /** Celebration title */
  title: string;
  /** Celebration message */
  message: string;
  /** Animation type to play */
  animationType: 'confetti' | 'fireworks' | 'sparkle' | 'flame';
  /** Badge or achievement earned */
  badge?: {
    id: string;
    name: string;
    description: string;
    icon: string;
  };
  /** Unlocked content preview */
  unlockedContent?: {
    title: string;
    description: string;
    url: string;
  }[];
}

/**
 * Statistics for a completed session
 */
export interface SessionStatistics {
  /** Total questions answered */
  questionsAnswered: number;
  /** Total subjects completed */
  subjectsCompleted: number;
  /** Total rounds completed */
  roundsCompleted: number;
  /** Session duration in minutes */
  durationMinutes: number;
  /** Average sentiment of responses */
  averageSentiment: number;
  /** Score journey (array of score changes) */
  scoreJourney: number[];
  /** Most used positive words */
  topPositiveWords: string[];
  /** Most used negative words */
  topNegativeWords: string[];
  /** Verses that resonated most */
  impactfulVerses: string[];
}

// ============================================================================
// Event Types (for state machine / hooks)
// ============================================================================

/**
 * Events that can occur during a session
 */
export type SessionEvent =
  | { type: 'START_SESSION'; config?: Partial<SessionConfig> }
  | { type: 'SELECT_SUBJECT'; subjectId: string }
  | { type: 'ANSWER_QUESTION'; answer: string }
  | { type: 'SKIP_QUESTION' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'COMPLETE_SUBJECT' }
  | { type: 'START_NEXT_ROUND' }
  | { type: 'PAUSE_SESSION' }
  | { type: 'RESUME_SESSION' }
  | { type: 'END_SESSION' }
  | { type: 'CRISIS_DETECTED' }
  | { type: 'ACKNOWLEDGE_CRISIS' };

/**
 * Transition result from state machine
 */
export interface SessionTransition {
  /** Previous state */
  previousState: SessionState;
  /** New state */
  newState: SessionState;
  /** Event that caused transition */
  event: SessionEvent;
  /** Side effects to execute */
  sideEffects: SideEffect[];
}

/**
 * Side effect to execute after state transition
 */
export interface SideEffect {
  type: 'SHOW_AFFIRMATION' | 'PLAY_ANIMATION' | 'SAVE_PROGRESS' | 'SHOW_RESOURCES' | 'TRIGGER_CRISIS';
  payload: Record<string, unknown>;
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Question selection criteria
 */
export interface QuestionSelectionCriteria {
  /** Current emotional tier */
  tier: EmotionalTier;
  /** Subjects to exclude */
  excludeSubjects: string[];
  /** Questions to exclude */
  excludeQuestions: string[];
  /** Preferred difficulty */
  preferredDifficulty?: 'easy' | 'medium' | 'hard';
  /** Whether to prioritize healing subjects */
  prioritizeHealing: boolean;
}

/**
 * Subject adaptation result
 */
export interface SubjectAdaptation {
  /** Recommended subjects */
  subjects: Subject[];
  /** Reason for recommendation */
  reason: string;
  /** Adaptation strategy used */
  strategy: 'comfort' | 'challenge' | 'maintain' | 'crisis';
}
