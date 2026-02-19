export interface EmotionalProfile {
  depression: number;
  anxiety: number;
  hope: number;
  spiritual_health: number;
  overall_sentiment: number;
  dominant_emotion: 'positive' | 'neutral' | 'negative';
  confidence_level: number;
}

export interface ScoringWeights {
  positive: number;
  negative: number;
  neutral: number;
  spiritual: number;
  emotional: number;
}

export class SentimentScoringEngine {
  private positiveWords: Set<string>;
  private negativeWords: Set<string>;
  private neutralWords: Set<string>;
  private spiritualWords: Set<string>;
  private emotionalWords: Set<string>;

  constructor() {
    // Core positive emotional words
    this.positiveWords = new Set([
      'happy', 'joy', 'joyful', 'peaceful', 'hope', 'hopeful', 'love', 'loved', 'blessed',
      'grateful', 'thankful', 'content', 'satisfied', 'fulfilled', 'complete', 'whole',
      'healed', 'restored', 'renewed', 'refreshed', 'encouraged', 'uplifted', 'inspired',
      'motivated', 'excited', 'enthusiastic', 'optimistic', 'confident', 'strong', 'powerful',
      'victorious', 'triumphant', 'successful', 'accomplished', 'proud', 'worthy', 'valuable',
      'precious', 'treasured', 'cherished', 'accepted', 'welcomed', 'included', 'belonging',
      'connected', 'supported', 'understood', 'appreciated', 'respected', 'honored', 'dignified',
      'free', 'liberated', 'delivered', 'saved', 'redeemed', 'forgiven', 'clean', 'pure',
      'new', 'fresh', 'alive', 'vibrant', 'radiant', 'glowing', 'shining', 'bright'
    ]);

    // Core negative emotional words
    this.negativeWords = new Set([
      'sad', 'depressed', 'hopeless', 'despair', 'discouraged', 'defeated', 'broken', 'hurt',
      'pain', 'painful', 'aching', 'suffering', 'miserable', 'unhappy', 'sorrowful', 'grieving',
      'mourning', 'crying', 'weeping', 'tears', 'angry', 'furious', 'rage', 'bitter', 'resentful',
      'hateful', 'vengeful', 'hostile', 'aggressive', 'violent', 'destructive', 'harmful',
      'afraid', 'fearful', 'terrified', 'scared', 'anxious', 'worried', 'nervous', 'stressed',
      'overwhelmed', 'panicked', 'paranoid', 'insecure', 'uncertain', 'doubtful', 'confused',
      'lost', 'abandoned', 'rejected', 'unwanted', 'unloved', 'worthless', 'useless', 'meaningless',
      'empty', 'hollow', 'void', 'numb', 'dead', 'lifeless', 'trapped', 'stuck', 'bound',
      'enslaved', 'addicted', 'compulsive', 'obsessed', 'controlled', 'powerless', 'helpless',
      'weak', 'fragile', 'vulnerable', 'exposed', 'naked', 'ashamed', 'guilty', 'condemned'
    ]);

    // Neutral/processing words
    this.neutralWords = new Set([
      'thinking', 'considering', 'pondering', 'reflecting', 'contemplating', 'wondering',
      'questioning', 'exploring', 'searching', 'seeking', 'looking', 'trying', 'attempting',
      'working', 'processing', 'dealing', 'handling', 'managing', 'coping', 'adjusting',
      'adapting', 'learning', 'growing', 'developing', 'changing', 'transforming', 'becoming',
      'progressing', 'advancing', 'moving', 'transitioning', 'shifting', 'evolving',
      'uncertain', 'unsure', 'unclear', 'confused', 'mixed', 'complicated', 'complex',
      'difficult', 'challenging', 'hard', 'tough', 'struggling', 'fighting', 'battling',
      'waiting', 'hoping', 'praying', 'trusting', 'believing', 'faith', 'patience'
    ]);

    // Spiritual words (can be positive or negative depending on context)
    this.spiritualWords = new Set([
      'god', 'jesus', 'christ', 'lord', 'holy', 'spirit', 'father', 'prayer', 'pray',
      'worship', 'praise', 'blessing', 'blessed', 'grace', 'mercy', 'forgiveness', 'salvation',
      'redemption', 'deliverance', 'healing', 'restoration', 'renewal', 'transformation',
      'faith', 'belief', 'trust', 'hope', 'love', 'peace', 'joy', 'righteousness',
      'holiness', 'purity', 'sanctification', 'consecration', 'dedication', 'commitment',
      'surrender', 'submission', 'obedience', 'discipleship', 'ministry', 'service',
      'mission', 'calling', 'purpose', 'destiny', 'kingdom', 'heaven', 'eternal',
      'bible', 'scripture', 'word', 'truth', 'wisdom', 'understanding', 'revelation',
      'church', 'fellowship', 'community', 'family', 'brother', 'sister', 'pastor'
    ]);

    // Emotional intensity words
    this.emotionalWords = new Set([
      'deeply', 'profoundly', 'intensely', 'extremely', 'completely', 'totally', 'absolutely',
      'overwhelmingly', 'incredibly', 'amazingly', 'wonderfully', 'beautifully', 'powerfully',
      'strongly', 'greatly', 'highly', 'very', 'really', 'truly', 'genuinely', 'sincerely',
      'desperately', 'urgently', 'critically', 'seriously', 'severely', 'badly', 'terribly',
      'horribly', 'awfully', 'dreadfully', 'painfully', 'heartbreakingly', 'devastatingly'
    ]);
  }

  analyzeText(text: string, subjectWords: { positive: string[], negative: string[], neutral: string[] }): EmotionalProfile {
    const words = this.tokenizeText(text);
    const wordCounts = this.countWords(words);
    
    // Add subject-specific words to analysis
    const allPositive = new Set([...this.positiveWords, ...subjectWords.positive]);
    const allNegative = new Set([...this.negativeWords, ...subjectWords.negative]);
    const allNeutral = new Set([...this.neutralWords, ...subjectWords.neutral]);

    const scores = {
      positive: this.calculateScore(words, allPositive),
      negative: this.calculateScore(words, allNegative),
      neutral: this.calculateScore(words, allNeutral),
      spiritual: this.calculateScore(words, this.spiritualWords),
      emotional: this.calculateScore(words, this.emotionalWords)
    };

    // Calculate emotional dimensions
    const depression = Math.max(0, scores.negative - scores.positive) * 1.2;
    const anxiety = this.calculateAnxietyScore(words);
    const hope = Math.max(0, scores.positive + scores.spiritual - scores.negative);
    const spiritual_health = scores.spiritual + (scores.positive * 0.5) - (scores.negative * 0.3);
    
    // Overall sentiment calculation
    const overall_sentiment = this.calculateOverallSentiment(scores);
    
    // Determine dominant emotion
    const dominant_emotion = this.determineDominantEmotion(scores);
    
    // Calculate confidence level based on word count and clarity
    const confidence_level = this.calculateConfidence(wordCounts.total, scores);

    return {
      depression: Math.min(100, Math.max(0, depression)),
      anxiety: Math.min(100, Math.max(0, anxiety)),
      hope: Math.min(100, Math.max(0, hope)),
      spiritual_health: Math.min(100, Math.max(0, spiritual_health)),
      overall_sentiment: Math.min(100, Math.max(0, overall_sentiment)),
      dominant_emotion,
      confidence_level: Math.min(100, Math.max(0, confidence_level))
    };
  }

  private tokenizeText(text: string): string[] {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2);
  }

  private countWords(words: string[]): { total: number, unique: number } {
    return {
      total: words.length,
      unique: new Set(words).size
    };
  }

  private calculateScore(words: string[], wordSet: Set<string>): number {
    let score = 0;
    let matches = 0;
    
    words.forEach(word => {
      if (wordSet.has(word)) {
        matches++;
        // Give higher weight to emotional intensity words
        if (this.emotionalWords.has(word)) {
          score += 2;
        } else {
          score += 1;
        }
      }
    });

    // Normalize by text length but give minimum weight to presence
    return words.length > 0 ? (score / words.length) * 100 + (matches > 0 ? 10 : 0) : 0;
  }

  private calculateAnxietyScore(words: string[]): number {
    const anxietyWords = new Set([
      'worried', 'anxious', 'nervous', 'scared', 'afraid', 'fearful', 'terrified',
      'panic', 'stress', 'overwhelmed', 'uncertain', 'insecure', 'doubtful'
    ]);
    
    return this.calculateScore(words, anxietyWords);
  }

  private calculateOverallSentiment(scores: any): number {
    const positiveWeight = scores.positive * 1.2 + scores.spiritual * 0.8;
    const negativeWeight = scores.negative * 1.5 + scores.neutral * 0.3;
    
    return Math.max(0, positiveWeight - negativeWeight + 50);
  }

  private determineDominantEmotion(scores: any): 'positive' | 'neutral' | 'negative' {
    if (scores.positive > scores.negative + 10) return 'positive';
    if (scores.negative > scores.positive + 10) return 'negative';
    return 'neutral';
  }

  private calculateConfidence(wordCount: number, scores: any): number {
    // More words generally mean more confidence, but diminishing returns
    const lengthFactor = Math.min(100, (wordCount / 50) * 100);
    
    // Clear emotional signals increase confidence
    const clarityFactor = Math.abs(scores.positive - scores.negative);
    
    return (lengthFactor * 0.7) + (clarityFactor * 0.3);
  }

  determineStudyPath(profile: EmotionalProfile): 'crisis' | 'struggling' | 'neutral' | 'growing' | 'thriving' {
    // Crisis intervention needed
    if (profile.depression > 70 || profile.anxiety > 80 || profile.overall_sentiment < 20) {
      return 'crisis';
    }
    
    // Struggling but not in crisis
    if (profile.depression > 50 || profile.anxiety > 60 || profile.overall_sentiment < 40) {
      return 'struggling';
    }
    
    // Neutral/lukewarm state
    if (profile.overall_sentiment >= 40 && profile.overall_sentiment <= 60) {
      return 'neutral';
    }
    
    // Growing in faith
    if (profile.hope > 60 && profile.spiritual_health > 50) {
      return 'growing';
    }
    
    // Thriving spiritually
    return 'thriving';
  }

  generatePersonalizedContent(profile: EmotionalProfile, subject: string): {
    affirmation: string;
    nextSteps: string[];
    resources: string[];
  } {
    const path = this.determineStudyPath(profile);
    
    switch (path) {
      case 'crisis':
        return {
          affirmation: `You are incredibly brave for reaching out and sharing your heart. God sees your pain and He is with you in this dark valley. You are not alone, and this is not the end of your story.`,
          nextSteps: [
            'Please consider reaching out to a crisis helpline or counselor immediately',
            'Connect with a trusted friend, pastor, or family member today',
            'Remember that seeking help is a sign of strength, not weakness',
            'Focus on just getting through today - healing is a journey, not a destination'
          ],
          resources: [
            'National Suicide Prevention Lifeline: 988',
            'Crisis Text Line: Text HOME to 741741',
            'Local emergency services: 911',
            'Find a Christian counselor in your area'
          ]
        };
        
      case 'struggling':
        return {
          affirmation: `Your honesty about your struggles shows incredible courage. God is not surprised by your pain, and He has not abandoned you. Even in this difficult season, you are deeply loved and valued.`,
          nextSteps: [
            'Consider professional counseling to work through these challenges',
            'Connect with a supportive Christian community or small group',
            'Establish daily spiritual practices like prayer and Bible reading',
            'Practice self-compassion and patience with your healing process'
          ],
          resources: [
            'Christian counseling services',
            'Support groups for your specific struggles',
            'Healing-focused Bible studies and devotionals',
            'Prayer and pastoral care at local churches'
          ]
        };
        
      case 'neutral':
        return {
          affirmation: `You're in a season of seeking and questioning, which shows a heart that desires growth. God honors your honest search for meaning and deeper connection with Him.`,
          nextSteps: [
            'Explore what might be keeping you from deeper spiritual engagement',
            'Try new spiritual practices like worship, service, or Bible study',
            'Connect with others who are passionate about their faith',
            'Ask God to reveal areas where He wants to work in your life'
          ],
          resources: [
            'Spiritual growth books and studies',
            'Christian mentorship opportunities',
            'Service and ministry involvement',
            'Retreats and spiritual formation programs'
          ]
        };
        
      case 'growing':
        return {
          affirmation: `Your heart for growth and your increasing hope are beautiful to see. God is clearly working in your life, and you're responding well to His leading.`,
          nextSteps: [
            'Continue building on the spiritual foundation you\'re developing',
            'Look for opportunities to share your growing faith with others',
            'Deepen your Bible study and prayer life',
            'Consider how God might want to use your experiences to help others'
          ],
          resources: [
            'Advanced Bible study materials',
            'Leadership development opportunities',
            'Mentoring relationships (both receiving and giving)',
            'Ministry and service opportunities'
          ]
        };
        
      case 'thriving':
        return {
          affirmation: `Your vibrant faith and spiritual health are inspiring! You're living as the new creation God has made you to be, and your life is bearing beautiful fruit.`,
          nextSteps: [
            'Look for ways to mentor and encourage others in their faith journey',
            'Consider how God might be calling you to deeper ministry or service',
            'Continue growing in areas where you feel God leading',
            'Share your testimony and story of transformation with others'
          ],
          resources: [
            'Leadership training and development',
            'Ministry opportunities and callings',
            'Advanced theological and spiritual formation studies',
            'Platforms for sharing your testimony and encouraging others'
          ]
        };
        
      default:
        return {
          affirmation: 'You are loved and valued by God exactly as you are.',
          nextSteps: ['Continue seeking God and growing in faith'],
          resources: ['Bible study and prayer']
        };
    }
  }
}

export const scoringEngine = new SentimentScoringEngine();