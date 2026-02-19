export interface StudySubject {
  id: string;
  name: string;
  category: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  keyVerses: string[];
  reflectionQuestions: string[];
  positiveWords: string[];
  negativeWords: string[];
  neutralWords: string[];
}

export const studyCategories = [
  { id: 'shame-rejection', name: 'Shame and Rejection', color: 'red', icon: '💔' },
  { id: 'spiritual-bondage', name: 'Spiritual Bondage and Deliverance', color: 'purple', icon: '⛓️' },
  { id: 'healing-restoration', name: 'Healing and Restoration', color: 'green', icon: '🌱' },
  { id: 'faith-transformation', name: 'Faith and Transformation', color: 'blue', icon: '✨' },
  { id: 'intimacy-jesus', name: 'Intimacy with Jesus', color: 'gold', icon: '❤️' },
  { id: 'community-belonging', name: 'Community and Belonging', color: 'orange', icon: '🤝' },
  { id: 'purpose-calling', name: 'Purpose and Calling', color: 'teal', icon: '🎯' },
  { id: 'victory-resurrection', name: 'Victory and Resurrection', color: 'yellow', icon: '👑' }
];

export const studySubjects: StudySubject[] = [
  // Shame and Rejection
  {
    id: 'overcoming-shame',
    name: 'Overcoming Shame',
    category: 'shame-rejection',
    description: 'Breaking free from the lies shame tells us about our worth',
    difficulty: 'beginner',
    keyVerses: ['ROM.8.1', 'PSA.103.12', 'ISA.61.3', '2CO.5.17'],
    reflectionQuestions: [
      'What messages about your worth did you learn growing up?',
      'How does shame affect your daily thoughts and decisions?',
      'What would it feel like to be completely free from shame?',
      'How do you think God sees you in your shame?'
    ],
    positiveWords: ['worthy', 'loved', 'accepted', 'forgiven', 'clean', 'new', 'beautiful', 'chosen', 'precious', 'redeemed'],
    negativeWords: ['worthless', 'dirty', 'rejected', 'condemned', 'broken', 'damaged', 'unlovable', 'failure', 'mistake', 'hopeless'],
    neutralWords: ['confused', 'uncertain', 'questioning', 'processing', 'learning', 'growing', 'changing', 'seeking', 'wondering', 'exploring']
  },
  {
    id: 'rejection-by-family',
    name: 'Rejection by Family',
    category: 'shame-rejection',
    description: 'Healing from the wounds of family rejection and finding your true identity',
    difficulty: 'intermediate',
    keyVerses: ['PSA.27.10', 'ISA.49.15', 'JHN.1.12', 'EPH.1.5'],
    reflectionQuestions: [
      'How has family rejection shaped your view of yourself?',
      'What do you long for most in family relationships?',
      'How might God want to be the Father you never had?',
      'What would healthy family relationships look like for you?'
    ],
    positiveWords: ['adopted', 'chosen', 'family', 'belonging', 'loved', 'accepted', 'home', 'safe', 'valued', 'treasured'],
    negativeWords: ['abandoned', 'rejected', 'unwanted', 'orphaned', 'alone', 'excluded', 'dismissed', 'ignored', 'unloved', 'cast-out'],
    neutralWords: ['distant', 'complicated', 'strained', 'difficult', 'challenging', 'complex', 'mixed', 'uncertain', 'cautious', 'guarded']
  },
  {
    id: 'social-stigma',
    name: 'Social Stigma',
    category: 'shame-rejection',
    description: 'Overcoming the weight of social judgment and finding acceptance in Christ',
    difficulty: 'intermediate',
    keyVerses: ['1SA.16.7', 'GAL.1.10', 'JHN.15.18-19', 'MAT.5.11-12'],
    reflectionQuestions: [
      'What social judgments do you fear most?',
      'How has social stigma affected your sense of belonging?',
      'Where do you find your identity - in others\' opinions or God\'s truth?',
      'How can you show compassion to others facing stigma?'
    ],
    positiveWords: ['accepted', 'valued', 'understood', 'included', 'respected', 'dignified', 'honored', 'appreciated', 'welcomed', 'embraced'],
    negativeWords: ['judged', 'outcast', 'stigmatized', 'labeled', 'discriminated', 'excluded', 'shamed', 'ridiculed', 'marginalized', 'rejected'],
    neutralWords: ['misunderstood', 'different', 'unique', 'standing-out', 'noticeable', 'visible', 'obvious', 'apparent', 'distinct', 'separate']
  },

  // Spiritual Bondage and Deliverance
  {
    id: 'spiritual-darkness',
    name: 'Spiritual Darkness',
    category: 'spiritual-bondage',
    description: 'Moving from spiritual darkness into God\'s marvelous light',
    difficulty: 'advanced',
    keyVerses: ['1PE.2.9', 'JHN.8.12', 'EPH.5.8', 'COL.1.13'],
    reflectionQuestions: [
      'What areas of spiritual darkness do you recognize in your life?',
      'How has darkness affected your relationship with God?',
      'What does walking in the light mean to you practically?',
      'How can you help others move from darkness to light?'
    ],
    positiveWords: ['light', 'illuminated', 'clear', 'bright', 'enlightened', 'awakened', 'aware', 'free', 'liberated', 'delivered'],
    negativeWords: ['dark', 'blind', 'confused', 'lost', 'trapped', 'bound', 'enslaved', 'deceived', 'oppressed', 'tormented'],
    neutralWords: ['dim', 'shadowy', 'unclear', 'foggy', 'hazy', 'murky', 'cloudy', 'obscured', 'veiled', 'hidden']
  },
  {
    id: 'addiction',
    name: 'Addiction',
    category: 'spiritual-bondage',
    description: 'Breaking free from the chains of addiction through God\'s power',
    difficulty: 'advanced',
    keyVerses: ['1CO.6.19-20', 'GAL.5.1', 'ROM.6.14', 'PHP.4.13'],
    reflectionQuestions: [
      'What substances or behaviors have power over you?',
      'How has addiction affected your relationships and faith?',
      'What triggers lead you back to addictive behaviors?',
      'What does true freedom look like for you?'
    ],
    positiveWords: ['free', 'sober', 'clean', 'delivered', 'healed', 'restored', 'strong', 'victorious', 'empowered', 'renewed'],
    negativeWords: ['addicted', 'enslaved', 'trapped', 'powerless', 'controlled', 'dependent', 'compulsive', 'destructive', 'hopeless', 'defeated'],
    neutralWords: ['struggling', 'fighting', 'resisting', 'working', 'progressing', 'recovering', 'healing', 'growing', 'learning', 'changing']
  },

  // Healing and Restoration
  {
    id: 'healing-from-trauma',
    name: 'Healing from Trauma',
    category: 'healing-restoration',
    description: 'Finding God\'s healing touch for deep emotional and spiritual wounds',
    difficulty: 'advanced',
    keyVerses: ['PSA.147.3', 'ISA.61.1', 'JER.30.17', '1PE.2.24'],
    reflectionQuestions: [
      'What traumatic experiences still affect you today?',
      'How has trauma changed your view of God and others?',
      'What does healing mean to you - forgetting or integrating?',
      'How might God want to use your healing to help others?'
    ],
    positiveWords: ['healed', 'whole', 'restored', 'renewed', 'mended', 'recovered', 'strengthened', 'resilient', 'peaceful', 'integrated'],
    negativeWords: ['traumatized', 'broken', 'shattered', 'wounded', 'damaged', 'hurt', 'scarred', 'fragmented', 'triggered', 'overwhelmed'],
    neutralWords: ['processing', 'working-through', 'healing', 'recovering', 'integrating', 'learning', 'growing', 'adapting', 'coping', 'managing']
  },
  {
    id: 'forgiving-others',
    name: 'Forgiving Others',
    category: 'healing-restoration',
    description: 'Learning to forgive those who have hurt us deeply',
    difficulty: 'intermediate',
    keyVerses: ['MAT.6.14-15', 'EPH.4.32', 'COL.3.13', 'LUK.23.34'],
    reflectionQuestions: [
      'Who do you need to forgive, and what makes it difficult?',
      'How has unforgiveness affected your heart and relationships?',
      'What fears do you have about forgiving?',
      'How has God\'s forgiveness of you changed your perspective?'
    ],
    positiveWords: ['forgiving', 'merciful', 'gracious', 'compassionate', 'understanding', 'peaceful', 'free', 'loving', 'kind', 'gentle'],
    negativeWords: ['bitter', 'resentful', 'angry', 'vengeful', 'hateful', 'unforgiving', 'hardened', 'cold', 'hostile', 'vindictive'],
    neutralWords: ['struggling', 'processing', 'working-on', 'considering', 'thinking-about', 'wrestling', 'pondering', 'reflecting', 'examining', 'exploring']
  },

  // Faith and Transformation
  {
    id: 'new-birth',
    name: 'New Birth',
    category: 'faith-transformation',
    description: 'Understanding and experiencing the miracle of being born again',
    difficulty: 'beginner',
    keyVerses: ['JHN.3.3', '2CO.5.17', '1PE.1.23', 'TIT.3.5'],
    reflectionQuestions: [
      'What does it mean to you to be "born again"?',
      'How has your life changed since accepting Christ?',
      'What old things have passed away in your life?',
      'How do you live as a new creation daily?'
    ],
    positiveWords: ['new', 'born-again', 'transformed', 'changed', 'renewed', 'fresh', 'clean', 'pure', 'alive', 'redeemed'],
    negativeWords: ['old', 'dead', 'unchanged', 'stagnant', 'stuck', 'same', 'lifeless', 'empty', 'meaningless', 'hopeless'],
    neutralWords: ['growing', 'learning', 'developing', 'maturing', 'progressing', 'evolving', 'becoming', 'emerging', 'unfolding', 'discovering']
  },

  // Intimacy with Jesus
  {
    id: 'love-of-christ',
    name: 'Love of Christ',
    category: 'intimacy-jesus',
    description: 'Experiencing and responding to the overwhelming love of Jesus',
    difficulty: 'beginner',
    keyVerses: ['ROM.8.38-39', 'EPH.3.17-19', '1JN.4.19', 'JHN.15.13'],
    reflectionQuestions: [
      'How do you experience Christ\'s love in your daily life?',
      'What makes it difficult to believe God loves you?',
      'How does knowing you\'re loved change how you treat others?',
      'What would change if you truly believed you\'re unconditionally loved?'
    ],
    positiveWords: ['loved', 'cherished', 'adored', 'treasured', 'valued', 'precious', 'beloved', 'dear', 'special', 'chosen'],
    negativeWords: ['unloved', 'rejected', 'abandoned', 'forgotten', 'worthless', 'unimportant', 'insignificant', 'dismissed', 'ignored', 'unwanted'],
    neutralWords: ['learning', 'discovering', 'experiencing', 'growing-in', 'understanding', 'receiving', 'accepting', 'embracing', 'welcoming', 'opening']
  },

  // Community and Belonging
  {
    id: 'finding-spiritual-family',
    name: 'Finding Spiritual Family',
    category: 'community-belonging',
    description: 'Discovering your place in God\'s family and healthy Christian community',
    difficulty: 'intermediate',
    keyVerses: ['EPH.2.19', '1JN.3.1', 'HEB.10.24-25', 'GAL.6.2'],
    reflectionQuestions: [
      'What does spiritual family mean to you?',
      'How have past church experiences affected your desire for community?',
      'What qualities do you look for in Christian relationships?',
      'How can you contribute to building healthy spiritual community?'
    ],
    positiveWords: ['belonging', 'family', 'connected', 'included', 'welcomed', 'accepted', 'supported', 'loved', 'valued', 'home'],
    negativeWords: ['isolated', 'alone', 'excluded', 'rejected', 'unwelcome', 'outsider', 'disconnected', 'lonely', 'abandoned', 'forgotten'],
    neutralWords: ['searching', 'looking', 'seeking', 'exploring', 'trying', 'hoping', 'waiting', 'praying', 'trusting', 'believing']
  },

  // Purpose and Calling
  {
    id: 'discovering-spiritual-gifts',
    name: 'Discovering Spiritual Gifts',
    category: 'purpose-calling',
    description: 'Identifying and developing the unique gifts God has given you',
    difficulty: 'intermediate',
    keyVerses: ['1CO.12.4-7', 'ROM.12.6-8', 'EPH.4.11-12', '1PE.4.10'],
    reflectionQuestions: [
      'What activities make you feel most alive and purposeful?',
      'How do others say you\'ve been a blessing to them?',
      'What needs in the world break your heart?',
      'How might God want to use your unique experiences and abilities?'
    ],
    positiveWords: ['gifted', 'talented', 'called', 'equipped', 'anointed', 'empowered', 'useful', 'purposeful', 'valuable', 'needed'],
    negativeWords: ['useless', 'worthless', 'untalented', 'purposeless', 'meaningless', 'unnecessary', 'unwanted', 'inadequate', 'insufficient', 'lacking'],
    neutralWords: ['discovering', 'exploring', 'developing', 'learning', 'growing', 'practicing', 'trying', 'experimenting', 'testing', 'seeking']
  },

  // Victory and Resurrection
  {
    id: 'from-shame-to-flame',
    name: 'From Shame to Flame',
    category: 'victory-resurrection',
    description: 'The ultimate transformation - turning your deepest wounds into your greatest ministry',
    difficulty: 'advanced',
    keyVerses: ['ROM.8.28', 'ISA.61.3', '2CO.1.3-4', 'GEN.50.20'],
    reflectionQuestions: [
      'How has God used your pain to help others?',
      'What would it look like for your shame to become a flame of hope?',
      'How might your story encourage someone else?',
      'What legacy do you want to leave through your transformed life?'
    ],
    positiveWords: ['transformed', 'victorious', 'triumphant', 'powerful', 'purposeful', 'meaningful', 'inspiring', 'encouraging', 'hopeful', 'glorious'],
    negativeWords: ['defeated', 'meaningless', 'wasted', 'pointless', 'hopeless', 'useless', 'forgotten', 'insignificant', 'worthless', 'empty'],
    neutralWords: ['becoming', 'transforming', 'growing', 'developing', 'emerging', 'evolving', 'progressing', 'advancing', 'moving', 'changing']
  }
];

export const getSubjectsByCategory = (categoryId: string): StudySubject[] => {
  return studySubjects.filter(subject => subject.category === categoryId);
};

export const getRandomSubjects = (count: number = 4, excludeIds: string[] = []): StudySubject[] => {
  const availableSubjects = studySubjects.filter(subject => !excludeIds.includes(subject.id));
  
  // If we don't have enough unused subjects, reset the exclusion list
  if (availableSubjects.length < count) {
    console.log('Not enough unused subjects, resetting exclusion list');
    return studySubjects.sort(() => Math.random() - 0.5).slice(0, Math.min(count, studySubjects.length));
  }
  
  const shuffled = [...availableSubjects].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

export const getSubjectById = (id: string): StudySubject | undefined => {
  return studySubjects.find(subject => subject.id === id);
};

export const getCategoryById = (id: string) => {
  return studyCategories.find(category => category.id === id);
};