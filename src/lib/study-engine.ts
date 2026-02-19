/**
 * Guided Study Path Engine
 * ========================
 * Manages the Bible-based devotional study experience.
 *
 * Behind-the-scenes mechanism (invisible to the user):
 *   Mirror   -> name the pain honestly
 *   Normalise -> biblical characters who faced the same
 *   Re-anchor -> identity in Christ
 *   Companion -> progress alongside the reader
 *
 * The user simply sees a thoughtful, personal Bible study.
 */

import * as storage from '@/lib/local-storage';

// ============================================================================
// Types
// ============================================================================

export interface StudySection {
  type: 'scripture' | 'reflection' | 'insight' | 'prayer' | 'action';
  title?: string;
  content: string;
  verse?: string;
  verseText?: string;
  reflectionPrompt?: string;
  source?: string;
}

export interface StudySession {
  id: string;
  title: string;
  description: string;
  sections: StudySection[];
}

export interface StudyProgress {
  pathSlug: string;
  currentSession: number;
  completedSessions: string[];
  reflections: Record<string, string>;
  startedAt: string;
  lastAccessedAt: string;
}

export interface StudyPath {
  slug: string;
  title: string;
  description: string;
  verse: string;
  sessions: StudySession[];
}

// ============================================================================
// Storage helpers
// ============================================================================

const PROGRESS_KEY = (slug: string) => `progress_${slug}`;

export function saveProgress(progress: StudyProgress): void {
  storage.set(PROGRESS_KEY(progress.pathSlug), progress);
}

export function getProgress(pathSlug: string): StudyProgress | null {
  return storage.get<StudyProgress>(PROGRESS_KEY(pathSlug));
}

export function saveReflection(
  pathSlug: string,
  sessionId: string,
  text: string,
): void {
  const progress = getProgress(pathSlug);
  if (progress) {
    progress.reflections[sessionId] = text;
    progress.lastAccessedAt = new Date().toISOString();
    saveProgress(progress);
  } else {
    const newProgress: StudyProgress = {
      pathSlug,
      currentSession: 0,
      completedSessions: [],
      reflections: { [sessionId]: text },
      startedAt: new Date().toISOString(),
      lastAccessedAt: new Date().toISOString(),
    };
    saveProgress(newProgress);
  }
}

export function clearProgress(pathSlug: string): void {
  storage.remove(PROGRESS_KEY(pathSlug));
}

// ============================================================================
// Path & session accessors
// ============================================================================

export function getStudyPath(slug: string): StudyPath | null {
  return STUDY_PATHS.find((p) => p.slug === slug) ?? null;
}

export function getSession(
  pathSlug: string,
  sessionIndex: number,
): StudySession | null {
  const path = getStudyPath(pathSlug);
  if (!path) return null;
  return path.sessions[sessionIndex] ?? null;
}

// ============================================================================
// Study Path Data
// ============================================================================

const STUDY_PATHS: StudyPath[] = [
  // ====================================================================
  // PATH 1 — Shame & Guilt  (5 full sessions)
  // ====================================================================
  {
    slug: 'shame-and-guilt',
    title: 'From Shame to Grace',
    description:
      'A five-session journey through Scripture exploring how God meets us in our shame and replaces it with His grace. Walk with biblical characters who carried the same weight — and discovered freedom.',
    verse: 'Isaiah 1:18',
    sessions: [
      // ── Session 1 ──────────────────────────────────────────────
      {
        id: 'sg-1',
        title: 'The Weight You Carry',
        description:
          'Acknowledging the burden of shame and discovering that God already sees — and still invites you closer.',
        sections: [
          {
            type: 'scripture',
            title: 'Opening Scripture',
            content: 'Let this verse settle over you before we begin.',
            verse: 'Isaiah 1:18',
            verseText:
              '"Come now, and let us reason together, saith the Lord: though your sins be as scarlet, they shall be as white as snow; though they be red like crimson, they shall be as wool."',
          },
          {
            type: 'insight',
            title: 'Naming What We Feel',
            content:
              'Shame whispers that we are too broken, too stained, too far gone. It is not just guilt over what we have done — it is a crushing belief about who we are. But notice: God does not start with a lecture. He starts with an invitation. "Come now," He says. He is not repelled by the scarlet. He already sees it — and He still calls you closer.',
          },
          {
            type: 'scripture',
            title: 'David Knew This Weight',
            content:
              'King David — a man after God\'s own heart — knew the suffocating heaviness of unconfessed shame.',
            verse: 'Psalm 32:3-5',
            verseText:
              '"When I kept silence, my bones waxed old through my roaring all the day long. For day and night thy hand was heavy upon me… I acknowledged my sin unto thee, and mine iniquity have I not hid. I said, I will confess my transgressions unto the Lord; and thou forgavest the iniquity of my sin."',
          },
          {
            type: 'reflection',
            title: 'A Moment to Be Honest',
            content: 'There is no wrong answer here. This is between you and God.',
            reflectionPrompt:
              'If you could name the shame you carry in one honest sentence — without editing or softening it — what would you say?',
          },
          {
            type: 'insight',
            title: 'What God Says About You',
            content:
              'The enemy says you are your worst moment. God says you are His workmanship, created in Christ Jesus for good works (Ephesians 2:10). Ellen White wrote: "The soul that has given itself to Christ is more precious in His sight than the whole world. The Saviour would have passed through the agony of Calvary that one might be saved in His kingdom." Your shame tells you that you are worthless. The cross tells you that you are worth everything.',
            source: 'Ellen White, The Desire of Ages, p. 483',
          },
          {
            type: 'prayer',
            title: 'A Prayer for This Moment',
            content:
              'Lord, I am tired of carrying this. I do not fully understand Your grace yet, but I hear Your invitation — "Come now." So here I am, scarlet and all. Begin the work of making me white as snow. I choose to believe Your voice over my shame. Amen.',
          },
          {
            type: 'action',
            title: 'One Step Forward',
            content:
              'Write down the heaviest thing shame says about you. Then, underneath it, write Isaiah 1:18. Leave the paper somewhere you will see it this week — a reminder that God already sees, and He still says "Come."',
          },
        ],
      },
      // ── Session 2 ──────────────────────────────────────────────
      {
        id: 'sg-2',
        title: 'Hidden in Plain Sight',
        description:
          'Exploring the instinct to hide, and how God has been seeking you all along.',
        sections: [
          {
            type: 'scripture',
            title: 'Opening Scripture',
            content: 'Sit with these words for a moment.',
            verse: 'Genesis 3:8-9',
            verseText:
              '"And they heard the voice of the Lord God walking in the garden in the cool of the day: and Adam and his wife hid themselves from the presence of the Lord God amongst the trees of the garden. And the Lord God called unto Adam, and said unto him, Where art thou?"',
          },
          {
            type: 'insight',
            title: 'The Impulse to Hide',
            content:
              'The very first thing shame produced in human history was hiding. Adam and Eve sewed fig leaves and crouched behind trees. We do the same — behind smiles, busyness, performance, isolation. We hide because we believe that if anyone truly saw us, they would walk away. But look at God\'s response: He did not wait for them to come out. He walked toward them. And He asked a question He already knew the answer to — not to condemn, but to reconnect. "Where are you?" is not a question of geography. It is a question of relationship.',
          },
          {
            type: 'scripture',
            title: 'The Woman at the Well',
            content:
              'She came to the well at noon — the hottest hour — to avoid everyone. She was hiding in plain sight.',
            verse: 'John 4:16-18, 28-29',
            verseText:
              '"Jesus saith unto her, Go, call thy husband… The woman answered and said, I have no husband. Jesus said unto her, Thou hast well said… for thou hast had five husbands; and he whom thou now hast is not thy husband… The woman then left her waterpot, and went her way into the city, and saith to the men, Come, see a man, which told me all things that ever I did: is not this the Christ?"',
          },
          {
            type: 'reflection',
            title: 'Your Hiding Places',
            content: 'Think honestly — no one else will see this.',
            reflectionPrompt:
              'What are the "fig leaves" you use to hide your shame? Busyness, humour, isolation, people-pleasing — what does your hiding look like?',
          },
          {
            type: 'insight',
            title: 'Known and Still Loved',
            content:
              'Jesus told the Samaritan woman everything she had ever done — and she did not run. She ran to tell others. Being fully known by Someone who fully loves you is the antidote to shame. Ellen White explains: "Christ knows the circumstances of every soul. The greater the sinner\'s guilt, the more he needs the Saviour. His heart of divine love and sympathy is drawn out most of all to the one who is the most hopelessly entangled in the snares of the enemy."',
            source: 'Ellen White, Steps to Christ, p. 53',
          },
          {
            type: 'prayer',
            title: 'A Prayer for This Moment',
            content:
              'Father, I have been hiding. Behind achievement, behind excuses, behind walls I built to keep the pain in and others out. But You walk toward me anyway. You ask "Where are you?" not to shame me, but to find me. Here I am. I am stepping out from behind the trees. Amen.',
          },
          {
            type: 'action',
            title: 'One Step Forward',
            content:
              'Choose one small act of vulnerability this week. It does not need to be dramatic — maybe it is telling a trusted friend "I am not doing great" instead of "I am fine." Practise stepping out from behind the leaves.',
          },
        ],
      },
      // ── Session 3 ──────────────────────────────────────────────
      {
        id: 'sg-3',
        title: 'The Verdict Has Changed',
        description:
          'Discovering that the courtroom of shame has already been overruled by the cross.',
        sections: [
          {
            type: 'scripture',
            title: 'Opening Scripture',
            content: 'Read this slowly — let every word land.',
            verse: 'Romans 8:1-2',
            verseText:
              '"There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit. For the law of the Spirit of life in Christ Jesus hath made me free from the law of sin and death."',
          },
          {
            type: 'insight',
            title: 'The Courtroom in Your Mind',
            content:
              'Shame operates like a relentless prosecutor, replaying your worst moments on a loop and demanding a guilty verdict every time. You may have heard "no condemnation" before and thought, "That sounds nice, but you don\'t know what I\'ve done." Paul did. He wrote those words as a man who had murdered Christians. He held the coats at Stephen\'s stoning. He dragged families from their homes. And yet — "no condemnation." Not because the past did not happen, but because the verdict has been overruled by a higher court.',
          },
          {
            type: 'scripture',
            title: 'Peter\'s Three Denials',
            content:
              'Peter swore he would never leave Jesus. Then, on the worst night of his life, he denied Him three times.',
            verse: 'John 21:15-17',
            verseText:
              '"So when they had dined, Jesus saith to Simon Peter, Simon, son of Jonas, lovest thou me more than these? He saith unto him, Yea, Lord; thou knowest that I love thee. He saith unto him, Feed my lambs."',
          },
          {
            type: 'reflection',
            title: 'The Verdict You Replay',
            content: 'Be gentle with yourself here.',
            reflectionPrompt:
              'What "guilty verdict" do you replay most often? What moment or failure does your mind return to when it wants to remind you who you "really" are?',
          },
          {
            type: 'insight',
            title: 'Restored, Not Rejected',
            content:
              'Jesus did not bring up Peter\'s denial to punish him. He asked "Do you love me?" three times — once for each denial — to replace every wound with restoration. Ellen White wrote: "Before his fall, Peter was always speaking unadvisedly, from the impulse of the moment… But the converted Peter was very different. He retained his former fervour, but the grace of Christ regulated his zeal. Instead of being impetuous, he was calm and self-possessed." God does not just forgive. He rebuilds.',
            source: 'Ellen White, The Acts of the Apostles, p. 557',
          },
          {
            type: 'prayer',
            title: 'A Prayer for This Moment',
            content:
              'Jesus, I have been sitting in a courtroom of my own making, sentencing myself over and over again. But You say "no condemnation." You restored Peter after his worst failure. You used Paul after his worst sins. I dare to believe You can do the same with me. Overrule the verdict. Amen.',
          },
          {
            type: 'action',
            title: 'One Step Forward',
            content:
              'Every time the "guilty verdict" replays this week, practise saying Romans 8:1 out loud: "There is therefore now no condemnation." Say it as many times as it takes. You are retraining your mind to hear the true verdict.',
          },
        ],
      },
      // ── Session 4 ──────────────────────────────────────────────
      {
        id: 'sg-4',
        title: 'New Clothes, New Name',
        description:
          'Exchanging the rags of shame for the robe of Christ\'s righteousness.',
        sections: [
          {
            type: 'scripture',
            title: 'Opening Scripture',
            content: 'Picture this scene in your mind.',
            verse: 'Zechariah 3:3-5',
            verseText:
              '"Now Joshua was clothed with filthy garments, and stood before the angel. And he answered and spake unto those that stood before him, saying, Take away the filthy garments from him. And unto him he said, Behold, I have caused thine iniquity to pass from thee, and I will clothe thee with change of raiment. And I said, Let them set a fair mitre upon his head."',
          },
          {
            type: 'insight',
            title: 'Standing in Filthy Clothes',
            content:
              'Joshua the high priest stood before God in filthy garments — and Satan stood right beside him, accusing. This is the perfect picture of shame: standing exposed, with the accuser pointing at every stain. But notice who acts. Joshua does not clean himself. He cannot. God commands the filthy clothes removed and replaces them with clean robes. This is not self-improvement. This is divine exchange. Your shame says "look at what you are wearing." God says "let Me dress you in something new."',
          },
          {
            type: 'scripture',
            title: 'Rahab\'s Scarlet Cord',
            content:
              'Rahab was a prostitute in Jericho — an outsider in every way. Yet she appears in the genealogy of Jesus.',
            verse: 'Joshua 2:18-21',
            verseText:
              '"Behold, when we come into the land, thou shalt bind this line of scarlet thread in the window… And she said, According unto your words, so be it. And she sent them away, and they departed: and she bound the scarlet line in the window."',
          },
          {
            type: 'reflection',
            title: 'The Identity Shame Gave You',
            content: 'This is a safe space. Let yourself be honest.',
            reflectionPrompt:
              'Shame often gives us a false identity — "I am damaged," "I am the mistake," "I am unlovable." What name has shame given you? And what might God want to call you instead?',
          },
          {
            type: 'insight',
            title: 'Clothed in Christ',
            content:
              'Rahab\'s past did not define her future. She is listed in Hebrews 11 among the heroes of faith and in Matthew 1 in the lineage of the Messiah. Her scarlet cord — the very colour of her shame — became the symbol of her salvation. Ellen White wrote: "When the sinner has found the Saviour, nothing should be permitted to stand between the soul and God… The soul, surrendered to Christ, becomes His own fortress, which He holds in a revolted world." You are not what shame named you. You are what grace renamed you.',
            source: 'Ellen White, The Desire of Ages, p. 324',
          },
          {
            type: 'prayer',
            title: 'A Prayer for This Moment',
            content:
              'Lord, I have worn these filthy garments for so long that they feel like my real skin. I have answered to the name shame gave me. But today I stand before You like Joshua — exposed, accused, and unable to clean myself. Take these rags. Give me Your robe. Rename me. I receive the identity You have written for me. Amen.',
          },
          {
            type: 'action',
            title: 'One Step Forward',
            content:
              'Write two columns on a piece of paper. On the left, write the name shame calls you. On the right, write the name Scripture gives you (chosen, forgiven, beloved, redeemed). Read the right column every morning this week.',
          },
        ],
      },
      // ── Session 5 ──────────────────────────────────────────────
      {
        id: 'sg-5',
        title: 'Walking Forward in the Light',
        description:
          'Moving from surviving shame to living freely — one step at a time, with the Companion who never leaves.',
        sections: [
          {
            type: 'scripture',
            title: 'Opening Scripture',
            content: 'This is your sending verse.',
            verse: '2 Corinthians 5:17',
            verseText:
              '"Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new."',
          },
          {
            type: 'insight',
            title: 'The Road Ahead Is Not Straight',
            content:
              'Healing from shame is not a single dramatic moment. It is a daily practice of choosing the true voice over the lying one. Some days you will feel free; other days the old script will play again. That is normal. Even Paul spoke of an ongoing struggle: "For the good that I would I do not: but the evil which I would not, that I do" (Romans 7:19). Freedom is not the absence of struggle — it is the presence of Someone walking with you through it.',
          },
          {
            type: 'scripture',
            title: 'The Prodigal Came Home',
            content:
              'He rehearsed his shame speech the entire walk home. But the father never let him finish.',
            verse: 'Luke 15:20-24',
            verseText:
              '"And he arose, and came to his father. But when he was yet a great way off, his father saw him, and had compassion, and ran, and fell on his neck, and kissed him… But the father said to his servants, Bring forth the best robe, and put it on him; and put a ring on his hand, and shoes on his feet… for this my son was dead, and is alive again; he was lost, and is found."',
          },
          {
            type: 'reflection',
            title: 'Looking Back to See Forward',
            content: 'Take your time with this one.',
            reflectionPrompt:
              'As you reflect on this study, what is one thing that has shifted in how you see yourself, your shame, or God? What truth do you want to carry with you from here?',
          },
          {
            type: 'insight',
            title: 'The Companion Who Stays',
            content:
              'The prodigal\'s father did not wait inside. He was watching the road. He ran. He embraced before the son could finish his apology. This is the God who walks with you from this point on — not behind you pushing, not ahead of you rushing, but beside you. Ellen White beautifully captures this: "Every soul is as fully known to Jesus as if he were the only one for whom the Saviour died. The distress of every one touches His heart. The cry for aid reaches His ear." You are not alone on this road. You never were.',
            source: 'Ellen White, The Desire of Ages, p. 480',
          },
          {
            type: 'prayer',
            title: 'A Prayer for the Journey',
            content:
              'Father, thank You. Thank You for walking toward me when I hid. Thank You for overruling the verdict. Thank You for new clothes and a new name. I do not have this all figured out, and some days I will forget what You have said. On those days, remind me. Walk with me. I choose to step into the light — not because I am perfect, but because You are faithful. This is not the end. It is the beginning. Amen.',
          },
          {
            type: 'action',
            title: 'One Step Forward',
            content:
              'Choose one verse from this study path that spoke to you most deeply. Write it on a card, set it as your phone wallpaper, or memorise it. When shame knocks, answer the door with Scripture. And consider: is there someone you trust enough to share even a small part of this journey with? You were not made to carry this alone.',
          },
        ],
      },
    ],
  },

  // ====================================================================
  // PATH 2 — Grief & Loss (session 1 only)
  // ====================================================================
  {
    slug: 'grief-and-loss',
    title: 'Through the Valley',
    description:
      'A gentle journey through Scripture for those carrying grief and loss. Discover that sorrow is not the opposite of faith — and that the Shepherd walks the darkest valley with you.',
    verse: 'Psalm 23:4',
    sessions: [
      {
        id: 'gl-1',
        title: 'Permission to Grieve',
        description:
          'Discovering that God does not rush your grief — He enters it with you.',
        sections: [
          {
            type: 'scripture',
            title: 'Opening Scripture',
            content: 'The shortest verse in the Bible carries the deepest weight.',
            verse: 'John 11:35',
            verseText: '"Jesus wept."',
          },
          {
            type: 'insight',
            title: 'God Does Not Rush Your Tears',
            content:
              'Jesus stood at the grave of His friend Lazarus and wept — even though He was about to raise him from the dead. He did not skip past the sorrow to get to the miracle. He sat in the pain first. If the Son of God made space for grief, you have permission to grieve too. Your tears are not weakness. They are love with nowhere to go.',
          },
          {
            type: 'scripture',
            title: 'David\'s Honest Sorrow',
            content: 'David did not hide his anguish from God — he poured it out.',
            verse: 'Psalm 42:3, 5',
            verseText:
              '"My tears have been my meat day and night, while they continually say unto me, Where is thy God?… Why art thou cast down, O my soul? and why art thou disquieted in me? hope thou in God: for I shall yet praise him for the help of his countenance."',
          },
          {
            type: 'reflection',
            title: 'What You Are Carrying',
            content: 'You do not need to explain or justify your grief.',
            reflectionPrompt:
              'What loss are you carrying right now? It may be a person, a relationship, a season, a hope, or something no one else fully understands. Name it here — you are safe.',
          },
          {
            type: 'insight',
            title: 'Held in the Darkness',
            content:
              'Grief can make God feel distant, but His promise is the opposite. "The Lord is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit" (Psalm 34:18). Ellen White wrote: "In every trial He is near. He is touched with the feeling of our infirmities, and He loves us, and cares for us; we cannot bear to think of it. He hath never failed us, and He never will fail us." He is closest when you feel most alone.',
            source: 'Ellen White, Selected Messages, Book 2, p. 242',
          },
          {
            type: 'prayer',
            title: 'A Prayer for This Moment',
            content:
              'Lord, I hurt. I do not need answers right now — I need Your presence. Sit with me in this. Do not explain it away. Just be here. You wept at the grave of Your friend; weep with me now. I trust that You are close even when I cannot feel You. Amen.',
          },
          {
            type: 'action',
            title: 'One Step Forward',
            content:
              'Give yourself permission to grieve this week without apologising for it. If you journal, write an honest letter to God about your loss. If you do not journal, simply sit for five minutes in silence and let yourself feel what you feel. He is present in the stillness.',
          },
        ],
      },
    ],
  },

  // ====================================================================
  // PATH 3 — Identity in Christ (session 1 only)
  // ====================================================================
  {
    slug: 'identity-in-christ',
    title: 'Who He Says You Are',
    description:
      'A study exploring what happens when the world\'s labels fall away and the only voice that remains is your Creator\'s. Discover the identity that cannot be shaken.',
    verse: 'Ephesians 2:10',
    sessions: [
      {
        id: 'ic-1',
        title: 'The Labels That Stuck',
        description:
          'Examining the names the world gave you — and the name God wrote first.',
        sections: [
          {
            type: 'scripture',
            title: 'Opening Scripture',
            content: 'You were not an afterthought.',
            verse: 'Ephesians 2:10',
            verseText:
              '"For we are his workmanship, created in Christ Jesus unto good works, which God hath before ordained that we should walk in them."',
          },
          {
            type: 'insight',
            title: 'The Names That Were Not Yours',
            content:
              'From childhood, labels stick — stupid, too much, not enough, broken, unwanted. Over time they stop feeling like opinions and start feeling like facts. But a label given by a broken world cannot overwrite a name given by the Creator. The Greek word for "workmanship" in Ephesians 2:10 is poiema — from which we get "poem." You are God\'s poem. Not a rough draft. Not a typo. A masterpiece still being written.',
          },
          {
            type: 'scripture',
            title: 'Gideon\'s False Label',
            content:
              'When the angel found Gideon, he was hiding in a winepress, threshing wheat in secret because he was afraid.',
            verse: 'Judges 6:12, 15',
            verseText:
              '"And the angel of the Lord appeared unto him, and said unto him, The Lord is with thee, thou mighty man of valour… And he said unto him, Oh my Lord, wherewith shall I save Israel? behold, my family is the least in Manasseh, and I am the least of my father\'s house."',
          },
          {
            type: 'reflection',
            title: 'The Labels You Carry',
            content: 'Think about the names that have defined you — spoken or unspoken.',
            reflectionPrompt:
              'What labels have you believed about yourself for so long that they feel like your identity? Where did they come from — and what if they were wrong?',
          },
          {
            type: 'insight',
            title: 'God Calls You What You Are Becoming',
            content:
              'God called Gideon "mighty man of valour" while he was hiding in fear. He calls things that are not as though they were (Romans 4:17). He does not name you based on your worst day — He names you based on what He is building. Ellen White wrote: "God takes men as they are, and educates them for His service, if they will yield themselves to Him. The Spirit of God, received into the soul, will quicken all its faculties." You are not defined by your past. You are defined by His purpose.',
            source: 'Ellen White, The Desire of Ages, p. 250',
          },
          {
            type: 'prayer',
            title: 'A Prayer for This Moment',
            content:
              'God, I have been answering to names that were never mine. Today I ask You to speak my true name — the one You wrote before the world knew me. Help me hear Your voice above the noise. I am Your workmanship. Teach me to believe that. Amen.',
          },
          {
            type: 'action',
            title: 'One Step Forward',
            content:
              'Make a list of three labels the world has given you. Beside each one, find a Bible verse that speaks a different name. Start replacing the script — one truth at a time.',
          },
        ],
      },
    ],
  },

  // ====================================================================
  // PATH 4 — Forgiveness (session 1 only)
  // ====================================================================
  {
    slug: 'forgiveness',
    title: 'Unlocking the Chain',
    description:
      'A study on the hardest and most liberating command in Scripture: forgive. Whether you need to receive forgiveness or extend it, this path walks you through what it actually means — and what it does not.',
    verse: 'Colossians 3:13',
    sessions: [
      {
        id: 'fg-1',
        title: 'The Prison of Unforgiveness',
        description:
          'Understanding that unforgiveness is a chain — and you may be the one it binds most.',
        sections: [
          {
            type: 'scripture',
            title: 'Opening Scripture',
            content: 'A command wrapped in compassion.',
            verse: 'Colossians 3:13',
            verseText:
              '"Forbearing one another, and forgiving one another, if any man have a quarrel against any: even as Christ forgave you, so also do ye."',
          },
          {
            type: 'insight',
            title: 'The Weight of Holding On',
            content:
              'Unforgiveness feels like justice — like holding onto the debt someone owes you. But over time, it becomes a prison cell you lock yourself inside. The person who hurt you may have moved on, while you remain shackled to the memory. Forgiveness is not saying what happened was acceptable. It is not pretending the wound did not cut deep. It is releasing your grip on the debt so that the wound can finally begin to close.',
          },
          {
            type: 'scripture',
            title: 'Joseph\'s Long Road',
            content:
              'Sold into slavery by his own brothers, falsely accused, imprisoned for years. Joseph had every right to bitterness.',
            verse: 'Genesis 50:20',
            verseText:
              '"But as for you, ye thought evil against me; but God meant it unto good, to bring to pass, as it is this day, to save much people alive."',
          },
          {
            type: 'reflection',
            title: 'The Debt You Are Holding',
            content: 'This is hard. Take your time.',
            reflectionPrompt:
              'Is there someone — or something — you have not been able to forgive? You do not need to force forgiveness today. Simply name who or what comes to mind, and how holding on has affected you.',
          },
          {
            type: 'insight',
            title: 'Forgiveness Is a Process',
            content:
              'Forgiveness is rarely a single decision. It is often a daily choice — sometimes hourly — to release the debt again. Joseph did not minimise what his brothers did. He wept when he saw them. But he chose to see God\'s hand even in the betrayal. Ellen White wrote: "Nothing can justify an unforgiving spirit. He who is unmerciful toward others shows that he himself is not a partaker of God\'s pardoning grace. In God\'s forgiveness the heart of the erring one is drawn close to the great Heart of love." You do not have to do this in your own strength.',
            source: 'Ellen White, Christ\'s Object Lessons, p. 251',
          },
          {
            type: 'prayer',
            title: 'A Prayer for This Moment',
            content:
              'Lord, You know who comes to mind when I think of forgiveness. I am not ready to say it does not hurt anymore — because it does. But I do not want to carry this chain any longer. Begin the work of forgiveness in me. I cannot do it alone. Give me Your strength to release what I have been gripping so tightly. Amen.',
          },
          {
            type: 'action',
            title: 'One Step Forward',
            content:
              'Write the name of the person or situation on a piece of paper. Beneath it, write Colossians 3:13. You are not forgiving them yet if you are not ready — you are simply acknowledging the chain. Bring it to God in prayer each day this week and ask Him to begin loosening your grip.',
          },
        ],
      },
    ],
  },

  // ====================================================================
  // PATH 5 — Hope & Purpose (session 1 only)
  // ====================================================================
  {
    slug: 'hope-and-purpose',
    title: 'Embers to Flame',
    description:
      'A study for those who feel purposeless, stuck, or unsure that God can still use them. Discover that the ember is not dead — it just needs the right breath to become a flame again.',
    verse: 'Jeremiah 29:11',
    sessions: [
      {
        id: 'hp-1',
        title: 'When the Fire Goes Out',
        description:
          'Exploring the emptiness of lost purpose — and the God who specialises in dead embers.',
        sections: [
          {
            type: 'scripture',
            title: 'Opening Scripture',
            content: 'These words were written to exiles who had lost everything.',
            verse: 'Jeremiah 29:11',
            verseText:
              '"For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end."',
          },
          {
            type: 'insight',
            title: 'When Purpose Feels Gone',
            content:
              'Some seasons strip everything away — your role, your plans, your sense of why you are here. It is not always a dramatic crisis. Sometimes purpose fades slowly, like a fire burning down to ash. You go through the motions, but the flame that once drove you feels extinguished. Jeremiah 29:11 was not spoken to people on mountaintops. It was spoken to prisoners of war, displaced and disoriented. God speaks His biggest promises into the emptiest rooms.',
          },
          {
            type: 'scripture',
            title: 'Moses in the Desert',
            content:
              'Moses fled Egypt as a failed deliverer. For forty years he herded sheep in a desert, believing his purpose had died. Then a bush caught fire.',
            verse: 'Exodus 3:3-4',
            verseText:
              '"And Moses said, I will now turn aside, and see this great sight, why the bush is not burnt. And when the Lord saw that he turned aside to see, God called unto him out of the midst of the bush, and said, Moses, Moses. And he said, Here am I."',
          },
          {
            type: 'reflection',
            title: 'The Ember Within',
            content: 'Sit with this quietly for a moment.',
            reflectionPrompt:
              'Where are you right now — in what "desert"? What purpose or dream feels like it has died? And is there an ember, however faint, that still glows when you are honest with yourself?',
          },
          {
            type: 'insight',
            title: 'God Uses the Wait',
            content:
              'Moses needed forty years in the desert before he was ready for the burning bush. The wait was not wasted — it was preparation. Joseph needed the pit and the prison before the palace. David needed the wilderness before the throne. Your desert is not a detour. It may be the training ground for what comes next. Ellen White wrote: "God never leads His children otherwise than they would choose to be led, if they could see the end from the beginning and discern the glory of the purpose which they are fulfilling as co-workers with Him." The ember is not dead. It just needs the Breath of God.',
            source: 'Ellen White, The Desire of Ages, p. 224',
          },
          {
            type: 'prayer',
            title: 'A Prayer for This Moment',
            content:
              'God, I feel like a burned-out fire. I am going through the motions, but the flame feels gone. I do not know what You are doing, and I cannot see the plan from here. But You spoke purpose over exiles, and You lit a bush in the desert for a man who thought his calling had died. Breathe on my ember. I am turning aside to see. Amen.',
          },
          {
            type: 'action',
            title: 'One Step Forward',
            content:
              'Write down three things that once made you feel alive, purposeful, or close to God. Circle the one that still carries a spark — even a small one. Do one tiny thing this week to fan that ember: read about it, pray about it, or take one step toward it. The flame does not need to roar today. It just needs to glow.',
          },
        ],
      },
    ],
  },
];
