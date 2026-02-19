export interface Devotional {
  id: number;
  slug: string;
  title: string;
  date: string;
  scripture: {
    reference: string;
    text: string;
  };
  message: string[];
  reflection: string;
  prayer: string;
  category: string;
  readTime: string;
}

export const devotionals: Devotional[] = [
  {
    id: 1,
    slug: "your-scars-tell-a-story-of-survival",
    title: "Your Scars Tell a Story of Survival",
    date: "Day 1",
    scripture: {
      reference: "Isaiah 61:3",
      text: "To all who mourn in Israel, he will give a crown of beauty for ashes, a joyous blessing instead of mourning, festive praise instead of despair. In their righteousness, they will be like great oaks that the Lord has planted for his own glory."
    },
    message: [
      "Every scar you carry is evidence that you survived something that tried to destroy you. Today, let those scars remind you not of your pain, but of your strength.",
      "In Japanese culture, there's an art form called Kintsugi, where broken pottery is repaired with gold. The cracks aren't hidden—they're highlighted, making the piece more beautiful and valuable than before it was broken. This is what God does with our wounds.",
      "Your scars are not signs of weakness. They're badges of honor. Each one tells a story of a battle you fought and won. Each one is a place where God's healing power has worked or is working in your life.",
      "Don't let anyone make you feel ashamed of your journey. The very things that wounded you have also shaped you into someone with depth, compassion, and resilience. God wastes nothing—not even our pain."
    ],
    reflection: "What story does your greatest scar tell? How has God been present in that wound, even when you couldn't see Him?",
    prayer: "Lord, help me see my scars the way You see them—not as shame, but as survival. Not as weakness, but as evidence of Your sustaining power. Fill the cracks in my life with Your golden glory. Amen.",
    category: "Overcoming Shame",
    readTime: "3 min"
  },
  {
    id: 2,
    slug: "when-god-feels-silent",
    title: "When God Feels Silent",
    date: "Day 2",
    scripture: {
      reference: "1 Kings 19:12",
      text: "After the earthquake there was a fire, but the Lord was not in the fire. And after the fire there was the sound of a gentle whisper."
    },
    message: [
      "God's silence doesn't mean His absence. Sometimes He speaks in whispers that can only be heard by a heart that has learned to be still.",
      "Elijah expected God in the earthquake, the wind, the fire—in the dramatic and unmistakable. But God came in a whisper. Why? Because whispers require us to draw near, to lean in, to become quiet ourselves.",
      "When God feels silent, it may not be that He's stopped speaking. It may be that He's inviting you into a deeper kind of listening. The kind that happens not in your mind, but in your heart. Not in words, but in His presence.",
      "In the silence, God is often doing His deepest work. Seeds germinate in darkness. Babies grow in the quiet of the womb. And sometimes, your greatest spiritual growth happens in the seasons when you can't hear Him clearly but choose to trust Him anyway."
    ],
    reflection: "Have you been listening for God in the earthquake when He's actually speaking in the whisper? What might He be saying in the silence?",
    prayer: "Father, when I cannot hear Your voice, help me trust Your heart. Teach me to be still enough to hear Your whisper. Even in the silence, I choose to believe You are near. Amen.",
    category: "Spiritual Healing",
    readTime: "4 min"
  },
  {
    id: 3,
    slug: "the-courage-to-begin-again",
    title: "The Courage to Begin Again",
    date: "Day 3",
    scripture: {
      reference: "Lamentations 3:22-23",
      text: "The faithful love of the Lord never ends! His mercies never cease. Great is his faithfulness; his mercies begin afresh each morning."
    },
    message: [
      "Every sunrise is God's invitation to begin again. No matter how many times you've fallen, His mercies are new this morning.",
      "You don't have to carry yesterday's failures into today. You don't have to let last week's mistakes define this week's possibilities. God's mercy is not rationed or limited. It's fresh every single morning.",
      "Beginning again doesn't mean you've failed. It means you're human. It means you're brave enough to try once more. It means you haven't given up, and neither has God.",
      "Today is a blank page. What you wrote yesterday is done. The pen is in your hand again, and God is whispering, 'Let's try this together.' Take a deep breath. This is a new day."
    ],
    reflection: "What area of your life needs a fresh start? What would it look like to receive God's new mercy in that area today?",
    prayer: "Lord, thank You that Your mercies never run out. Today, I choose to believe in new beginnings. Help me release yesterday and embrace the fresh start You're offering me right now. Amen.",
    category: "Spiritual Healing",
    readTime: "3 min"
  },
  {
    id: 4,
    slug: "healing-isnt-linear",
    title: "Healing Isn't Linear",
    date: "Day 4",
    scripture: {
      reference: "Philippians 1:6",
      text: "And I am certain that God, who began the good work within you, will continue his work until it is finally finished on the day when Christ Jesus returns."
    },
    message: [
      "Some days you'll feel like you're moving backward. This is normal. Healing spirals upward, not straight up. Trust the process.",
      "If you've ever climbed a mountain, you know that the path doesn't go straight to the top. It zigzags. Sometimes you're walking parallel to where you were an hour ago, just at a higher elevation. From where you stand, it feels like you're not making progress. But you are.",
      "Bad days don't erase good progress. A setback isn't the same as starting over. You're not back at the beginning—you're in a new place with more tools, more wisdom, and more of God's strength than you had before.",
      "God isn't surprised by your spiral. He's not disappointed. He sees the whole mountain, and He knows exactly where you are on the path. Keep climbing. You're closer to the top than you think."
    ],
    reflection: "Looking back over the past year, can you see growth even in the spiral? What have you learned in the valleys that you couldn't have learned on the peaks?",
    prayer: "Father, on the days when healing feels impossible, remind me that You're still working. Help me trust Your timeline and celebrate small victories. You who began this work will complete it. Amen.",
    category: "Grief & Loss",
    readTime: "5 min"
  },
  {
    id: 5,
    slug: "the-weight-youre-carrying-isnt-yours",
    title: "The Weight You're Carrying Isn't Yours",
    date: "Day 5",
    scripture: {
      reference: "Matthew 11:28-30",
      text: "Come to me, all of you who are weary and carry heavy burdens, and I will give you rest. Take my yoke upon you. Let me teach you, because I am humble and gentle at heart, and you will find rest for your souls. For my yoke is easy to bear, and the burden I give you is light."
    },
    message: [
      "You've been carrying shame that doesn't belong to you. Guilt for things you didn't do. Responsibility for others' choices. It's time to put it down.",
      "Jesus didn't say, 'Just try harder to carry your burden.' He said, 'Give it to Me.' There's a difference between bearing responsibility and bearing what's not yours to carry. Wisdom knows the difference.",
      "That shame from the abuse? Not yours. The guilt from someone else's addiction? Not yours. The weight of making everyone happy? Not yours. The burden of perfection? Not yours. What's yours is to receive God's grace and walk in freedom.",
      "When you lay down what isn't yours, you make room to pick up what is: God's light burden of walking in truth, giving and receiving love, and becoming who He created you to be."
    ],
    reflection: "What are you carrying that God never asked you to carry? Can you name it? Can you lay it down today?",
    prayer: "Jesus, I'm tired of carrying what's not mine. I give You this shame, this guilt, this false responsibility. Teach me to walk in Your easy yoke and find rest for my weary soul. Amen.",
    category: "Overcoming Shame",
    readTime: "4 min"
  },
  {
    id: 6,
    slug: "god-sees-you-in-your-hiding",
    title: "God Sees You in Your Hiding",
    date: "Day 6",
    scripture: {
      reference: "Genesis 16:13",
      text: "Thereafter, Hagar used another name to refer to the Lord, who had spoken to her. She said, 'You are the God who sees me.' She also said, 'Have I truly seen the One who sees me?'"
    },
    message: [
      "Hagar was alone, pregnant, running from abuse, and feeling utterly invisible. But God met her in the wilderness and she discovered something that changed everything: He sees.",
      "You may feel forgotten. Overlooked. Like your pain doesn't matter because no one notices. But God sees. He saw Hagar when everyone else had used and discarded her. He sees you when everyone else walks past.",
      "El Roi—the God Who Sees. He doesn't just glance. He truly sees. He sees the tears you cry in private. The struggle you hide with a smile. The courage it takes just to get out of bed. The way you keep showing up even when you're barely hanging on.",
      "Being seen by God means you are never truly alone, never truly forgotten, never without witness to your pain. Your suffering is not invisible. You are not invisible. El Roi sees you."
    ],
    reflection: "In what area of your life do you feel most unseen? Can you believe that God sees you there?",
    prayer: "El Roi, God Who Sees Me, thank You for Your eyes that never leave me. When I feel invisible to everyone else, help me remember that I am fully seen and known by You. Amen.",
    category: "Spiritual Healing",
    readTime: "4 min"
  },
  {
    id: 7,
    slug: "anxiety-is-not-a-sin",
    title: "Anxiety Is Not a Sin",
    date: "Day 7",
    scripture: {
      reference: "Psalm 34:17-18",
      text: "The Lord hears his people when they call to him for help. He rescues them from all their troubles. The Lord is close to the brokenhearted; he rescues those whose spirits are crushed."
    },
    message: [
      "Let's settle this right now: feeling anxious doesn't mean you lack faith. It means you're human. Jesus Himself experienced deep distress in the Garden of Gethsemane.",
      "Anxiety is not a moral failure. It's not a spiritual deficiency. It's a signal that something needs attention—maybe in your body, your circumstances, your thought patterns, or your need for support.",
      "God doesn't condemn you for your anxiety. He draws near to you in it. He doesn't say, 'Stop feeling that way.' He says, 'I'm here. Let's walk through this together.'",
      "Bringing your anxiety to God isn't admitting defeat. It's admitting you're human and He's God. That's exactly where healing begins. In the honest acknowledgment that you need Him, He meets you with grace, not judgment."
    ],
    reflection: "What would change if you stopped fighting your anxiety and instead brought it to God as an honest offering?",
    prayer: "Lord, I bring You my anxious thoughts, my racing heart, my worried mind. I'm not asking You to condemn me for feeling this way. I'm asking You to meet me here and walk with me through it. Amen.",
    category: "Anxiety & Fear",
    readTime: "3 min"
  },
  {
    id: 8,
    slug: "your-testimony-is-your-weapon",
    title: "Your Testimony Is Your Weapon",
    date: "Day 8",
    scripture: {
      reference: "Revelation 12:11",
      text: "And they have defeated him by the blood of the Lamb and by their testimony. And they did not love their lives so much that they were afraid to die."
    },
    message: [
      "The enemy wants you silent about what God has done. Why? Because your testimony has power. It's not just your story—it's proof of God's faithfulness.",
      "Every time you speak about how God brought you through, you're wielding a weapon against darkness. You're declaring that shame doesn't win, addiction doesn't win, abuse doesn't win, depression doesn't win. Jesus wins.",
      "Your story doesn't have to be finished to be powerful. You don't have to have it all together. You just have to be honest about where you've been and where God is taking you. That's enough to set someone else free.",
      "Don't let shame keep you silent. Your voice matters. Your journey matters. Someone is waiting to hear that they're not alone, and your testimony might be exactly what they need to keep going."
    ],
    reflection: "What part of your story have you been too ashamed to share? What if that's exactly the part that could set someone else free?",
    prayer: "God, give me courage to share my story. Help me see my testimony not as shame, but as a weapon against the darkness. Use my voice to bring hope to others. Amen.",
    category: "Overcoming Shame",
    readTime: "4 min"
  },
  {
    id: 9,
    slug: "depression-doesnt-disqualify-you",
    title: "Depression Doesn't Disqualify You",
    date: "Day 9",
    scripture: {
      reference: "2 Corinthians 4:8-9",
      text: "We are pressed on every side by troubles, but we are not crushed. We are perplexed, but not driven to despair. We are hunted down, but never abandoned by God. We get knocked down, but we are not destroyed."
    },
    message: [
      "Some of God's greatest servants battled depression: Elijah, David, Jeremiah, Job. Depression didn't disqualify them, and it doesn't disqualify you.",
      "You can love God and still struggle to get out of bed. You can have faith and still feel hopeless some days. You can be chosen by God and still wrestle with darkness. These things are not contradictions—they're the human experience.",
      "God doesn't need you to be okay to use you. He doesn't need you to have it all together. He specializes in working through broken vessels. Your struggle doesn't diminish your worth or your calling.",
      "Keep showing up, even on the days when everything in you wants to give up. Keep reaching out, even when it feels pointless. Keep believing, even in the dark. You are still here. That is not nothing. That is everything."
    ],
    reflection: "What small act of faithfulness can you do today, even in the midst of depression?",
    prayer: "Father, when depression tells me I'm disqualified, remind me of Your servants who struggled too. Help me believe that You can use me even in my brokenness. Give me strength for just this day. Amen.",
    category: "Depression",
    readTime: "4 min"
  },
  {
    id: 10,
    slug: "the-power-of-lament",
    title: "The Power of Lament",
    date: "Day 10",
    scripture: {
      reference: "Psalm 13:1-2",
      text: "O Lord, how long will you forget me? Forever? How long will you look the other way? How long must I struggle with anguish in my soul, with sorrow in my heart every day?"
    },
    message: [
      "Lament is not lack of faith. It's faith crying out in pain. The Psalms are filled with raw, honest cries to God. He can handle your questions. He can handle your pain.",
      "Too often, we think we have to clean up our emotions before bringing them to God. We think we have to have pretty prayers and positive attitudes. But God gave us an entire book of laments in Scripture. He's inviting you to be real.",
      "When you cry out 'How long, O Lord?'—you're in good company. David asked it. Jesus asked it from the cross. Honest lament doesn't push God away; it pulls you closer to Him because you're finally bringing Him your whole heart.",
      "Don't skip over your grief to get to gratitude. Don't bypass your anger to appear spiritual. God is big enough for all of it. Bring Him your lament. He's listening."
    ],
    reflection: "What honest lament do you need to bring before God today? What have you been holding back?",
    prayer: "God, I don't understand why this is happening. I don't understand why You feel far away. But I'm bringing You my pain anyway because I have nowhere else to go. Hear my cry. Amen.",
    category: "Grief & Loss",
    readTime: "3 min"
  },
  {
    id: 11,
    slug: "youre-not-too-much",
    title: "You're Not Too Much",
    date: "Day 11",
    scripture: {
      reference: "Psalm 139:1-3",
      text: "O Lord, you have examined my heart and know everything about me. You know when I sit down or stand up. You know my thoughts even when I'm far away. You see me when I travel and when I rest at home. You know everything I do."
    },
    message: [
      "If you've been told you're too sensitive, too emotional, too intense, too much—hear this: you're not. You're exactly the right amount of you, and God made you this way on purpose.",
      "The world tries to put you in a box. Tone it down. Be less. Take up less space. Feel less deeply. But God says, 'No. I made you with that big heart for a reason. I gave you that intensity because I have work for you that requires it.'",
      "Your sensitivity is not weakness—it's perception. Your emotions are not a flaw—they're connection. Your intensity is not too much—it's passion. These are gifts, even when the world treats them as burdens.",
      "God doesn't want you to be less. He wants you to be fully you, healed and whole and walking in freedom. You don't have to shrink to make others comfortable. You have permission to take up space."
    ],
    reflection: "In what ways have you been making yourself smaller to fit others' expectations? What would it feel like to take up the space God designed for you?",
    prayer: "Lord, help me see myself the way You see me. Not as too much, but as exactly enough. Give me courage to be fully who You created me to be, without apology. Amen.",
    category: "Overcoming Shame",
    readTime: "4 min"
  },
  {
    id: 12,
    slug: "small-steps-still-count",
    title: "Small Steps Still Count",
    date: "Day 12",
    scripture: {
      reference: "Zechariah 4:10",
      text: "Do not despise these small beginnings, for the Lord rejoices to see the work begin."
    },
    message: [
      "You don't have to take giant leaps. Small steps still move you forward. Getting out of bed counts. Taking a shower counts. Asking for help counts. Reading this devotional counts.",
      "We live in a culture that celebrates the dramatic transformation, the overnight success, the quantum leap. But God celebrates the faithful step. The small obedience. The showing up even when you don't feel like it.",
      "Don't compare your step one to someone else's step one hundred. Don't measure your progress by how far you still have to go. Measure it by how far you've come. And if you only came one small step today, that's still forward.",
      "God doesn't despise small beginnings. He rejoices in them. Because He knows that the miracle isn't always in the big moment—it's in the thousand tiny choices to keep going."
    ],
    reflection: "What is one small step you can take today? Just one. What would that be?",
    prayer: "Father, thank You that small steps matter to You. Help me celebrate progress instead of perfection. Give me grace for today's small beginning. Amen.",
    category: "Spiritual Healing",
    readTime: "3 min"
  },
  {
    id: 13,
    slug: "the-gift-of-anger",
    title: "The Gift of Anger",
    date: "Day 13",
    scripture: {
      reference: "Ephesians 4:26",
      text: "And don't sin by letting anger control you. Don't let the sun go down while you are still angry."
    },
    message: [
      "Anger is not a sin. It's an emotion, and emotions are morally neutral. What you do with anger matters, but feeling it? That's human. That's normal. Even Jesus got angry.",
      "If you've been taught that anger is ungodly, especially for women, you've been taught wrong. Anger is often the first sign that something unjust has happened. It's your soul's alarm system saying, 'This is not okay.'",
      "The problem isn't anger. The problem is when we let anger control us, or when we suppress it so deeply that it turns into bitterness, depression, or shame. Healthy anger says, 'This matters. This boundary matters. This person matters.'",
      "Give yourself permission to feel angry about what was done to you. You don't have to rush to forgiveness. You don't have to spiritualize it away. You can sit with the anger, bring it to God, and let it inform your healing without letting it consume you."
    ],
    reflection: "What have you been told is wrong to be angry about? What would happen if you gave yourself permission to feel that anger?",
    prayer: "God, I've been taught to suppress my anger, but I bring it to You now. Help me feel it without shame, process it with wisdom, and let it lead me toward healing, not harm. Amen.",
    category: "Grief & Loss",
    readTime: "4 min"
  },
  {
    id: 14,
    slug: "you-dont-owe-anyone-your-story",
    title: "You Don't Owe Anyone Your Story",
    date: "Day 14",
    scripture: {
      reference: "Proverbs 4:23",
      text: "Guard your heart above all else, for it determines the course of your life."
    },
    message: [
      "Your story is sacred. You don't have to share it with everyone who asks. You don't owe explanations to people who haven't earned your trust. Boundaries are holy.",
      "Some people ask questions not because they care, but because they're curious. Some people want details not to support you, but to satisfy themselves. You have permission to discern who is safe and who is not.",
      "Sharing your story is powerful, but it should never be coerced. You share when you're ready, with people who have proven themselves trustworthy, in environments that feel safe. Not a moment before.",
      "Guarding your heart isn't the same as hiding. It's wisdom. It's self-care. It's recognizing that your journey is valuable and not everyone deserves access to your vulnerable places. Trust God to guide you in when and with whom to share."
    ],
    reflection: "Who are the safe people in your life? How can you tell the difference between someone who is safe and someone who is just curious?",
    prayer: "Lord, give me discernment about who to share my story with. Help me guard my heart with wisdom while staying open to healing relationships. Show me who is safe. Amen.",
    category: "Relationships",
    readTime: "4 min"
  },
  {
    id: 15,
    slug: "when-you-cant-feel-gods-love",
    title: "When You Can't Feel God's Love",
    date: "Day 15",
    scripture: {
      reference: "Romans 8:38-39",
      text: "And I am convinced that nothing can ever separate us from God's love. Neither death nor life, neither angels nor demons, neither our fears for today nor our worries about tomorrow—not even the powers of hell can separate us from God's love."
    },
    message: [
      "Some days you won't feel God's love. That's okay. Love is not a feeling—it's a fact. The sun doesn't stop shining just because clouds block your view.",
      "Your feelings are real and valid, but they're not always reliable narrators of truth. Depression lies. Trauma lies. Shame lies. They tell you God has abandoned you, but Romans 8 says nothing can separate you from His love. Nothing.",
      "When you can't feel God's love, stand on what you know. You know Jesus died for you. You know Scripture says you are chosen, loved, redeemed. You know God has brought you through before. Stand on truth when feelings fail you.",
      "And it's okay to tell God, 'I can't feel You, but I'm choosing to trust You anyway.' That's not weak faith—that's the strongest faith there is. It's believing in the dark what you learned in the light."
    ],
    reflection: "What truth about God's love can you stand on today, even if you can't feel it?",
    prayer: "Father, I can't feel Your love right now, but I choose to believe it's still true. Help my unbelief. Anchor me in truth when my feelings fail me. Amen.",
    category: "Spiritual Healing",
    readTime: "4 min"
  },
  {
    id: 16,
    slug: "the-comparison-trap",
    title: "The Comparison Trap",
    date: "Day 16",
    scripture: {
      reference: "2 Corinthians 10:12",
      text: "Oh, don't worry; we wouldn't dare say that we are as wonderful as these other men who tell you how important they are! But they are only comparing themselves with each other, using themselves as the standard of measurement. How ignorant!"
    },
    message: [
      "Comparison is the thief of joy, and in healing, it's also the thief of progress. Stop measuring your chapter 3 against someone else's chapter 20. You're not behind. You're exactly where you are.",
      "That person who seems to have it all together? You're seeing their highlight reel, not their whole story. That person who healed faster? They had a different wound, different resources, different circumstances. Your journey is yours alone.",
      "God is not comparing you to anyone else. He's not wishing you were more like them or less like you. He made you on purpose, with your specific story, your specific timeline, your specific gifts. Comparison says, 'Why aren't you like them?' God says, 'Why aren't you like you?'",
      "Run your own race. Walk your own path. Celebrate others without diminishing yourself. There's enough grace for everyone's journey, including yours."
    ],
    reflection: "Who have you been comparing yourself to? What would change if you focused on your own growth instead?",
    prayer: "Lord, forgive me for comparing my journey to others. Help me celebrate my own progress and trust Your unique plan for my life. Free me from the trap of comparison. Amen.",
    category: "Overcoming Shame",
    readTime: "4 min"
  },
  {
    id: 17,
    slug: "rest-is-not-earned",
    title: "Rest Is Not Earned",
    date: "Day 17",
    scripture: {
      reference: "Matthew 11:28",
      text: "Come to me, all of you who are weary and carry heavy burdens, and I will give you rest."
    },
    message: [
      "Rest is not a reward for productivity. It's a gift for being human. You don't have to earn the right to be tired. You don't have to justify taking a break. Rest is holy.",
      "God rested on the seventh day, not because He was tired, but to set an example. If the Creator of the universe built rest into the rhythm of life, what makes you think you can skip it?",
      "Hustle culture tells you rest is lazy. Capitalism tells you rest is wasteful. But God says rest is essential. It's when your body heals, your mind resets, and your soul reconnects with what matters.",
      "Give yourself permission to rest without guilt. Take the nap. Skip the event. Say no to the commitment. Rest is not weakness. It's wisdom. And you are worthy of it, not because of what you've done, but because you are."
    ],
    reflection: "Where in your life do you need to give yourself permission to rest? What's keeping you from it?",
    prayer: "Father, thank You for the gift of rest. Help me receive it without guilt. Teach me that my worth is not in my productivity but in being Your beloved child. Amen.",
    category: "Spiritual Healing",
    readTime: "3 min"
  },
  {
    id: 18,
    slug: "forgiving-yourself",
    title: "Forgiving Yourself",
    date: "Day 18",
    scripture: {
      reference: "1 John 1:9",
      text: "But if we confess our sins to him, he is faithful and just to forgive us our sins and to cleanse us from all wickedness."
    },
    message: [
      "Forgiving yourself is often harder than forgiving others. You hold yourself to standards you'd never hold anyone else to. You replay your mistakes in brutal detail. But God says if He's forgiven you, who are you to withhold it from yourself?",
      "Self-forgiveness doesn't mean you didn't do wrong. It means you're releasing yourself from the prison of endless self-punishment. God doesn't want you there. He already paid the price for your freedom.",
      "You are not your worst moment. You are not your biggest mistake. You are a beloved child of God who stumbled, and God is holding out His hand to help you back up. Will you take it?",
      "Stop rehearsing your guilt. Start rehearsing God's grace. You've confessed. He's forgiven. Now it's time to walk forward in freedom, not backward in shame. The past is gone. Mercy is here."
    ],
    reflection: "What do you need to forgive yourself for? Can you hear God saying, 'I already have'?",
    prayer: "God, I've held onto guilt You've already released. Help me forgive myself the way You've forgiven me. Teach me to walk in the freedom of Your grace. Amen.",
    category: "Overcoming Shame",
    readTime: "4 min"
  },
  {
    id: 19,
    slug: "the-sacredness-of-friendship",
    title: "The Sacredness of Friendship",
    date: "Day 19",
    scripture: {
      reference: "Ecclesiastes 4:9-10",
      text: "Two people are better off than one, for they can help each other succeed. If one person falls, the other can reach out and help. But someone who falls alone is in real trouble."
    },
    message: [
      "You were not meant to walk this journey alone. God designed us for community, for friendship, for being known. Isolation is a tool of the enemy. Connection is a gift from God.",
      "Real friendship isn't about having lots of people around. It's about having a few who see you, truly see you, and love you anyway. The ones who show up when it's messy. The ones who stay when it's hard.",
      "If you don't have that kind of friendship right now, ask God for it. Pray for someone safe. And while you wait, be the friend you're looking for. Vulnerability attracts vulnerability. Authenticity attracts authenticity.",
      "Don't let shame convince you that you're too broken for friendship. Don't let fear tell you no one would want to walk with you. God brings people into our lives precisely because we need each other. Let yourself be found."
    ],
    reflection: "Who is one safe person you can reach out to today? What keeps you from being vulnerable with them?",
    prayer: "Lord, I need people who see me and love me anyway. Bring me safe friendships and help me be brave enough to let myself be known. Protect me from isolation. Amen.",
    category: "Relationships",
    readTime: "4 min"
  },
  {
    id: 20,
    slug: "when-prayer-feels-empty",
    title: "When Prayer Feels Empty",
    date: "Day 20",
    scripture: {
      reference: "Romans 8:26",
      text: "And the Holy Spirit helps us in our weakness. For example, we don't know what God wants us to pray for. But the Holy Spirit prays for us with groanings that cannot be expressed in words."
    },
    message: [
      "Some days, you won't have words for prayer. That's when the Spirit prays for you. Your silence is not failure. God hears the prayers of your heart even when your mouth can't form them.",
      "You don't have to pray pretty prayers. You don't have to sound spiritual. Sometimes prayer is just showing up. Sometimes it's just sitting in God's presence with nothing to say. Sometimes it's just the word 'help.'",
      "The Spirit is interceding for you with groans too deep for words. That means even when you feel disconnected, even when prayer feels empty, there's a conversation happening between the Spirit and the Father on your behalf.",
      "Don't give up on prayer just because it feels hard right now. God is not grading your performance. He's just glad you're there. Your presence is the prayer."
    ],
    reflection: "What has kept you from praying lately? Can you bring even that to God?",
    prayer: "Holy Spirit, when I don't know what to pray, pray for me. When I have no words, translate my heart to the Father. Help me show up even when it's hard. Amen.",
    category: "Spiritual Healing",
    readTime: "3 min"
  },
  {
    id: 21,
    slug: "the-courage-to-set-boundaries",
    title: "The Courage to Set Boundaries",
    date: "Day 21",
    scripture: {
      reference: "Galatians 1:10",
      text: "Obviously, I'm not trying to win the approval of people, but of God. If pleasing people were my goal, I would not be Christ's servant."
    },
    message: [
      "Boundaries are not walls. They're gates. They let in what's good and keep out what's harmful. Setting boundaries doesn't make you unkind—it makes you wise.",
      "You've been taught that saying no is selfish. That putting yourself first is sinful. But Jesus set boundaries. He withdrew from crowds. He said no to demands. He prioritized what mattered. You can too.",
      "A boundary is simply honoring what God says is true about you: that you matter, that your needs are valid, that you're not responsible for everyone else's happiness. It's stewarding the life God gave you with intention.",
      "Some people won't like your boundaries. That's okay. Their discomfort doesn't make your boundary wrong. Keep your gate. Guard what's sacred. You're not being mean—you're being healthy."
    ],
    reflection: "Where in your life do you need to set a boundary? What fear is keeping you from setting it?",
    prayer: "Lord, give me courage to set boundaries that honor the life You've given me. Help me discern what to let in and what to keep out. Free me from people-pleasing. Amen.",
    category: "Relationships",
    readTime: "4 min"
  },
  {
    id: 22,
    slug: "god-wastes-nothing",
    title: "God Wastes Nothing",
    date: "Day 22",
    scripture: {
      reference: "Romans 8:28",
      text: "And we know that God causes everything to work together for the good of those who love God and are called according to his purpose for them."
    },
    message: [
      "God doesn't waste pain. He doesn't waste struggle. He doesn't waste the years you feel you lost. He's a redemptive God, and redemption means He takes what was meant for harm and uses it for good.",
      "This doesn't mean your pain was God's plan. It doesn't mean abuse or trauma was 'meant to be.' It means God is so powerful, so creative, so relentlessly loving that He can take even the worst things and weave them into your testimony, your strength, your calling.",
      "You are not starting over. Every hard thing you walked through taught you something. Made you stronger. Gave you compassion. Built your faith. None of it was wasted. God is using all of it.",
      "Trust that God sees the full tapestry when all you see is tangled threads. He's working it all together. Nothing is lost. Nothing is wasted. He makes all things new."
    ],
    reflection: "Looking back, where can you already see God working something for good? What are you still waiting to see redeemed?",
    prayer: "Father, I trust You to redeem every hard thing I've walked through. Help me believe that nothing is wasted in Your hands. Work it all together for good. Amen.",
    category: "Spiritual Healing",
    readTime: "4 min"
  },
  {
    id: 23,
    slug: "the-power-of-yet",
    title: "The Power of Yet",
    date: "Day 23",
    scripture: {
      reference: "Philippians 3:12",
      text: "I don't mean to say that I have already achieved these things or that I have already reached perfection. But I press on to possess that perfection for which Christ Jesus first possessed me."
    },
    message: [
      "I'm not healed...yet. I don't understand...yet. I can't forgive...yet. That one word—yet—changes everything. It transforms a statement of defeat into a declaration of hope.",
      "Yet means you're not there, but you're on the way. Yet means this isn't the end of your story. Yet means God's still working. Yet is faith in action.",
      "Paul, the great apostle, didn't say, 'I've arrived.' He said, 'I press on.' He was honest about where he was, but he refused to camp there. He kept moving toward where God was calling him.",
      "Whatever you're struggling with today, add the word yet. 'I don't feel God's presence...yet.' 'I don't have peace...yet.' 'I'm not free...yet.' Let that word carry you forward."
    ],
    reflection: "What area of your life needs the power of 'yet' today? How does adding that word change your perspective?",
    prayer: "God, thank You that 'not yet' doesn't mean 'never.' Thank You that You're still working in my life. Help me press on toward what You're calling me to. Amen.",
    category: "Spiritual Healing",
    readTime: "3 min"
  },
  {
    id: 24,
    slug: "triggers-are-invitations",
    title: "Triggers Are Invitations",
    date: "Day 24",
    scripture: {
      reference: "Psalm 139:23-24",
      text: "Search me, O God, and know my heart; test me and know my anxious thoughts. Point out anything in me that offends you, and lead me along the path of everlasting life."
    },
    message: [
      "A trigger isn't a setback. It's information. It's your body or heart saying, 'There's still a wound here that needs attention.' Instead of being angry at yourself for being triggered, thank your body for telling you the truth.",
      "Triggers are invitations to go deeper into healing. They show us what we're still afraid of, still protecting, still grieving. They're not signs of failure—they're signs of places that need more of God's light.",
      "When you're triggered, pause. Don't react immediately. Ask yourself: What is this reminding me of? What am I afraid of? What do I need right now? Then bring that need to God and to safe people.",
      "Healing doesn't mean you'll never be triggered again. It means triggers will lose their power over you. What once knocked you down for days might only slow you down for an hour. That's progress."
    ],
    reflection: "What has been triggering you lately? What wound might it be pointing to?",
    prayer: "Lord, when I'm triggered, help me see it as an invitation to deeper healing. Give me patience with myself and wisdom to know what I need. Heal the wounds that still hurt. Amen.",
    category: "Grief & Loss",
    readTime: "4 min"
  },
  {
    id: 25,
    slug: "you-are-not-your-diagnosis",
    title: "You Are Not Your Diagnosis",
    date: "Day 25",
    scripture: {
      reference: "2 Corinthians 5:17",
      text: "This means that anyone who belongs to Christ has become a new person. The old life is gone; a new life has begun!"
    },
    message: [
      "Depression, anxiety, PTSD, addiction—these may describe part of your experience, but they don't define your identity. You are more than what you're struggling with. You are a child of God.",
      "A diagnosis can be helpful. It gives language to what you're experiencing, opens doors to treatment, connects you with others who understand. But it's not your name. Your name is Beloved, Chosen, Redeemed, Called.",
      "Mental illness is not a moral failing. It's not a spiritual deficiency. It's a health condition that affects your brain the way diabetes affects your pancreas. You wouldn't be ashamed of diabetes. Don't be ashamed of depression.",
      "Getting help is brave. Taking medication is not weak faith. Going to therapy is not admitting defeat. You take care of your body because it's the temple God gave you. That includes your brain."
    ],
    reflection: "Have you been letting a diagnosis define you? What is your true identity in Christ?",
    prayer: "Father, thank You that my identity is found in You, not in my struggles. Help me take care of my mental health with the same grace I'd extend to any other health need. I am Yours. Amen.",
    category: "Depression",
    readTime: "4 min"
  },
  {
    id: 26,
    slug: "the-ministry-of-presence",
    title: "The Ministry of Presence",
    date: "Day 26",
    scripture: {
      reference: "Romans 12:15",
      text: "Be happy with those who are happy, and weep with those who weep."
    },
    message: [
      "Sometimes the greatest gift you can give or receive is simply presence. Not advice. Not fixing. Not answers. Just sitting with someone in their pain and saying, 'I'm here. You're not alone.'",
      "We're so uncomfortable with pain that we try to rush people through it. We offer solutions when what they need is solidarity. We give platitudes when what they need is presence.",
      "Jesus wept with Mary and Martha at Lazarus's tomb, even though He was about to raise Lazarus from the dead. He knew the miracle was coming, but He still sat in the grief. He honored their pain by entering into it.",
      "If you're hurting, give yourself permission to need presence. If someone you love is hurting, give them the gift of simply being there. No words needed. Just 'I'm here.'"
    ],
    reflection: "Who in your life needs your presence right now? Who could you simply sit with?",
    prayer: "Lord, teach me the ministry of presence. Help me resist the urge to fix and simply learn to be with people in their pain. And when I'm hurting, send me people who will just be with me. Amen.",
    category: "Relationships",
    readTime: "3 min"
  },
  {
    id: 27,
    slug: "breaking-generational-cycles",
    title: "Breaking Generational Cycles",
    date: "Day 27",
    scripture: {
      reference: "Exodus 34:6-7",
      text: "The Lord passed in front of Moses, calling out, 'Yahweh! The Lord! The God of compassion and mercy! I am slow to anger and filled with unfailing love and faithfulness. I lavish unfailing love to a thousand generations.'"
    },
    message: [
      "The trauma may have been passed down, but it stops with you. The dysfunction may have been normalized, but you're choosing different. The silence may have been the family rule, but you're finding your voice. You are a cycle-breaker.",
      "Breaking generational cycles is holy work. It's choosing to face what your parents couldn't face. It's going to therapy for wounds you didn't cause. It's learning new patterns when the old ones are all you know. It's hard, lonely, sacred work.",
      "You may never get their approval. They may never understand why you won't just 'get over it.' But you're not doing this for them. You're doing it for yourself, for your future, for the generations coming after you.",
      "God's love extends to a thousand generations. When you break a cycle, you're not just healing yourself—you're healing forward. The work you're doing today is blessing people who haven't even been born yet."
    ],
    reflection: "What cycle are you breaking? How is your healing impacting the generations after you?",
    prayer: "God, give me courage to break the cycles that were passed down to me. Give me strength to walk a different path. Use my healing to bless generations to come. Amen.",
    category: "Relationships",
    readTime: "4 min"
  },
  {
    id: 28,
    slug: "sacred-ordinary-days",
    title: "Sacred Ordinary Days",
    date: "Day 28",
    scripture: {
      reference: "1 Thessalonians 4:11",
      text: "Make it your goal to live a quiet life, minding your own business and working with your hands, just as we instructed you before."
    },
    message: [
      "Not every day will be dramatic. Most days are ordinary—wake up, work, eat, sleep, repeat. But ordinary doesn't mean meaningless. God is in the mundane as much as He's in the miraculous.",
      "Healing doesn't always look like breakthrough moments. Sometimes it looks like doing the dishes. Showing up to work. Having a normal conversation. Making it through a regular Tuesday without falling apart. That's victory too.",
      "The ordinary days are where transformation actually happens. It's not the mountaintop experiences that change you—it's what you do in the valley, day after day after day, when no one's watching and nothing feels significant.",
      "Embrace the sacred ordinary. Find God in the small moments. Celebrate the boring victories. You got out of bed. You fed yourself. You were kind to a stranger. These are not nothing. These are everything."
    ],
    reflection: "What ordinary thing did you do today that deserves to be celebrated?",
    prayer: "Father, help me see You in the ordinary moments. Teach me that faithfulness in the mundane is just as holy as faithfulness in the extraordinary. Thank You for being with me in every moment. Amen.",
    category: "Spiritual Healing",
    readTime: "3 min"
  },
  {
    id: 29,
    slug: "the-long-obedience",
    title: "The Long Obedience",
    date: "Day 29",
    scripture: {
      reference: "Galatians 6:9",
      text: "So let's not get tired of doing what is good. At just the right time we will reap a harvest of blessing if we don't give up."
    },
    message: [
      "Healing is a long obedience in the same direction. It's choosing truth over and over when lies feel more familiar. It's showing up to therapy week after week. It's taking medication daily even when you feel fine. It's doing the work when you can't yet see the results.",
      "We want instant transformation. Microwave healing. But real change is slow. It's a thousand small choices that compound over time. It's faithfulness when you feel like you're getting nowhere.",
      "Don't despise the slow growth. A tree doesn't become mighty overnight. It grows ring by ring, year by year, through seasons of plenty and seasons of drought. You're growing too, even when you can't see it.",
      "Keep going. Don't give up. The harvest is coming. God sees every faithful step, every hard choice, every day you kept showing up. None of it is wasted. You will reap if you don't give up."
    ],
    reflection: "What does 'long obedience' look like in your healing journey? Where do you need to keep going even when it's hard?",
    prayer: "Lord, give me endurance for the long obedience. When I want to quit, remind me that You're faithful to complete what You started. Help me keep going. Amen.",
    category: "Spiritual Healing",
    readTime: "4 min"
  },
  {
    id: 30,
    slug: "permission-to-celebrate",
    title: "Permission to Celebrate",
    date: "Day 30",
    scripture: {
      reference: "Psalm 126:3",
      text: "Yes, the Lord has done amazing things for us! What joy!"
    },
    message: [
      "You have permission to celebrate your progress. You don't have to wait until you're 'fully healed' to acknowledge how far you've come. Celebrate the small wins. They matter.",
      "In healing, we're often so focused on what's still broken that we forget to celebrate what's been restored. But God wants you to notice. He wants you to pause and say, 'Look what He's done. Look how far I've come.'",
      "Celebration isn't arrogance. It's gratitude. It's saying, 'I see You, God. I see what You've been doing in my life, and I'm not taking it for granted.' It's marking the moment so you remember it when things get hard again.",
      "So celebrate. Tell someone about your victory. Write it down. Thank God for it. Dance. Sing. Acknowledge that you're not where you were, and that's worth celebrating."
    ],
    reflection: "What victory in your healing journey have you not yet celebrated? How can you celebrate it today?",
    prayer: "God, thank You for how far I've come. Help me celebrate my progress instead of only focusing on what's left. You've done amazing things in my life. What joy! Amen.",
    category: "Spiritual Healing",
    readTime: "3 min"
  },
  {
    id: 31,
    slug: "youre-going-to-make-it",
    title: "You're Going to Make It",
    date: "Day 31",
    scripture: {
      reference: "Psalm 23:4",
      text: "Even when I walk through the darkest valley, I will not be afraid, for you are close beside me. Your rod and your staff protect and comfort me."
    },
    message: [
      "On the days when you're not sure you can keep going, hear this: you're going to make it. Not because you're strong enough, but because God is faithful. Not because it's easy, but because you're not alone.",
      "You've survived 100% of your worst days. Every single one. Every day you thought would break you, every night you thought would never end, every moment you were certain you couldn't go on—you survived them all. You're still here.",
      "The valley is dark, but it's not endless. You're walking through, not staying in. And even in the darkest part, God is with you. His rod protects you from danger. His staff guides you forward. You are not abandoned.",
      "You're going to make it. Maybe not today. Maybe not tomorrow. But eventually, you're going to look back and realize you made it through. And you'll be stronger, wiser, more compassionate because of what you walked through. Keep going. You're going to make it."
    ],
    reflection: "What hard thing have you already survived? How does that give you hope for what you're facing now?",
    prayer: "Father, on the days I'm not sure I can keep going, remind me that You've never failed me. You've brought me through before. You'll bring me through again. I'm going to make it. Amen.",
    category: "Spiritual Healing",
    readTime: "4 min"
  }
];

export function getTodaysDevotional(): Devotional {
  const today = new Date();
  const dayOfMonth = today.getDate();

  if (dayOfMonth <= 31) {
    return devotionals[dayOfMonth - 1];
  }

  const year = today.getFullYear();
  const month = today.getMonth();
  const seed = year * 10000 + month * 100 + dayOfMonth;
  const index = seed % devotionals.length;

  return devotionals[index];
}

export function getDevotionalById(id: number): Devotional | undefined {
  return devotionals.find(d => d.id === id);
}

export function getDevotionalBySlug(slug: string): Devotional | undefined {
  return devotionals.find(d => d.slug === slug);
}

export function getRecentDevotionals(count: number = 4): Devotional[] {
  const today = new Date();
  const dayOfMonth = today.getDate();
  const recent: Devotional[] = [];

  for (let i = 0; i < count; i++) {
    let dayIndex = dayOfMonth - 1 - i;

    if (dayIndex < 0) {
      dayIndex = devotionals.length + dayIndex;
    }

    if (dayIndex >= 0 && dayIndex < devotionals.length) {
      recent.push(devotionals[dayIndex]);
    }
  }

  return recent;
}

export function getDevotionalsByCategory(category: string): Devotional[] {
  return devotionals.filter(d => d.category === category);
}

export function getAllCategories(): { name: string; count: number }[] {
  const categories = new Map<string, number>();

  devotionals.forEach(d => {
    const count = categories.get(d.category) || 0;
    categories.set(d.category, count + 1);
  });

  return Array.from(categories.entries()).map(([name, count]) => ({
    name,
    count
  }));
}
