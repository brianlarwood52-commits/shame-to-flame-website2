import type { Metadata } from 'next'
import StudyPathContent from './StudyPathContent'

interface StudySession {
  title: string
  description: string
}

interface StudyPathConfig {
  title: string
  slug: string
  verse: string
  description: string
  intro: string
  sessions: StudySession[]
}

const studyPathConfigs: Record<string, StudyPathConfig> = {
  'shame-and-guilt': {
    title: 'Shame & Guilt',
    slug: 'shame-and-guilt',
    verse: 'Isaiah 1:18',
    description:
      "When the weight of what you've done \u2014 or what was done to you \u2014 feels unbearable. Scripture has a path through it.",
    intro:
      'Shame tells you that you are the problem \u2014 not just that you did something wrong, but that something is wrong with you. This study walks through Scripture to dismantle that lie, gently and honestly. You will meet biblical figures who carried the same weight and discover how God responded to them \u2014 not with rejection, but with restoration.',
    sessions: [
      {
        title: 'Session 1: Naming the Weight',
        description:
          'Understanding the difference between shame and guilt, and why naming what you carry is the first step toward freedom.',
      },
      {
        title: 'Session 2: What God Sees',
        description:
          "Exploring how God's perspective of you differs from the story shame has written. Isaiah 1:18 and the promise of being made clean.",
      },
      {
        title: 'Session 3: David \u2014 A Heart Laid Bare',
        description:
          "Walking through David's journey from devastating failure to honest repentance and restored relationship with God.",
      },
      {
        title: 'Session 4: Peter \u2014 After the Denial',
        description:
          "How Peter's worst moment became the doorway to his greatest purpose, and what that means for your story.",
      },
      {
        title: 'Session 5: Reclaiming Your Identity',
        description:
          'Moving from "I am what I did" to "I am who God says I am." Practical steps for rewriting the narrative.',
      },
      {
        title: 'Session 6: Walking Forward',
        description:
          'Building a daily rhythm of grace. How to respond when shame resurfaces, and anchoring yourself in truth.',
      },
    ],
  },
  'grief-and-loss': {
    title: 'Grief & Loss',
    slug: 'grief-and-loss',
    verse: 'Psalm 34:18',
    description:
      "Whether it's a person, a relationship, or a life you thought you'd have. You're not alone in this.",
    intro:
      'Grief is not a problem to be solved \u2014 it is a journey to be walked. This study does not rush you through your pain or offer empty platitudes. Instead, it sits with you in the ache, brings you Scripture that speaks into the silence, and shows you that God is near to the brokenhearted.',
    sessions: [
      {
        title: 'Session 1: Permission to Grieve',
        description:
          'Why grief is not a lack of faith. Giving yourself the space to acknowledge what you have lost.',
      },
      {
        title: 'Session 2: The Many Faces of Loss',
        description:
          'Grief is not only for death. Exploring the loss of relationships, dreams, health, innocence, and what could have been.',
      },
      {
        title: 'Session 3: Job \u2014 When Everything Is Taken',
        description:
          "Sitting with Job in the ashes. What his story teaches about suffering, honesty with God, and endurance.",
      },
      {
        title: 'Session 4: Jesus Wept',
        description:
          "Discovering a Saviour who mourns with you. Jesus at the tomb of Lazarus and what it reveals about God's heart.",
      },
      {
        title: 'Session 5: The God of All Comfort',
        description:
          'How God draws near in your darkest moments. 2 Corinthians 1:3\u20134 and the comfort that becomes a gift.',
      },
      {
        title: 'Session 6: Seeds of Hope',
        description:
          'When grief begins to soften. Finding meaning, honouring what was lost, and trusting God with what comes next.',
      },
    ],
  },
  'identity-in-christ': {
    title: 'Identity in Christ',
    slug: 'identity-in-christ',
    verse: '2 Corinthians 5:17',
    description:
      "When you've lost sight of who you are. When shame has rewritten your story. God has a different version.",
    intro:
      'The world, your past, and your pain have all tried to tell you who you are. This study returns to the only voice that matters. Through Scripture and reflection, you will uncover the identity God has always had in mind for you \u2014 not based on what you have done, but on what Christ has done.',
    sessions: [
      {
        title: 'Session 1: The Labels We Carry',
        description:
          'Identifying the false identities you have adopted \u2014 from others, from trauma, and from your own inner critic.',
      },
      {
        title: 'Session 2: Who God Says You Are',
        description:
          'A deep dive into Scripture\u2019s declarations over your life: chosen, beloved, forgiven, enough.',
      },
      {
        title: 'Session 3: Adopted Into the Family',
        description:
          'Understanding your adoption as a child of God. Romans 8:15\u201317 and what it means to belong.',
      },
      {
        title: 'Session 4: The Woman at the Well',
        description:
          'How an encounter with Jesus redefined a woman\u2019s entire story \u2014 and how He wants to do the same for you.',
      },
      {
        title: 'Session 5: New Creation, Old Battles',
        description:
          'Why the old identity keeps fighting for attention, and how to anchor yourself in the new one daily.',
      },
      {
        title: 'Session 6: Living as Who You Are',
        description:
          'Practical rhythms for walking in your God-given identity. Letting truth shape your thoughts, words, and choices.',
      },
    ],
  },
  forgiveness: {
    title: 'Forgiveness',
    slug: 'forgiveness',
    verse: 'Ephesians 4:32',
    description:
      'The hardest journey. Forgiving others, forgiving yourself, and understanding a God who already has.',
    intro:
      'Forgiveness is one of the most misunderstood and difficult teachings in Scripture. This study does not minimize your pain or demand you rush past it. Instead, it walks honestly through what forgiveness is and is not, how God models it, and how it ultimately sets you free \u2014 even when the other person never apologizes.',
    sessions: [
      {
        title: 'Session 1: What Forgiveness Is (and Isn\u2019t)',
        description:
          'Clearing the misconceptions. Forgiveness is not excusing, forgetting, or reconciling \u2014 it is releasing yourself from the weight.',
      },
      {
        title: 'Session 2: The Debt That Was Cancelled',
        description:
          'The parable of the unforgiving servant and the staggering scope of what God has forgiven in you.',
      },
      {
        title: 'Session 3: Forgiving Those Who Hurt You',
        description:
          'The hardest step. Walking through the process of releasing bitterness without minimizing the wound.',
      },
      {
        title: 'Session 4: Forgiving Yourself',
        description:
          'Why self-forgiveness can feel impossible, and what Scripture says about the condemnation you were never meant to carry.',
      },
      {
        title: 'Session 5: Joseph \u2014 From Pit to Purpose',
        description:
          'How Joseph forgave the brothers who betrayed him, and what his story reveals about God\u2019s redemptive plan.',
      },
      {
        title: 'Session 6: Living in Freedom',
        description:
          'Moving forward after forgiveness. What to do when resentment resurfaces, and building a life rooted in grace.',
      },
      {
        title: 'Session 7: The Cross \u2014 Forgiveness Made Flesh',
        description:
          'The ultimate act of forgiveness. What Jesus\u2019 words from the cross mean for every wound you carry.',
      },
    ],
  },
  'hope-and-purpose': {
    title: 'Hope & Purpose',
    slug: 'hope-and-purpose',
    verse: 'Jeremiah 29:11',
    description:
      "When life feels pointless. When you can't see the road ahead. God's plan doesn't require your clarity \u2014 just your willingness.",
    intro:
      'When pain, loss, or shame have stripped away your sense of direction, it can feel like there is nothing left to hope for. This study gently rebuilds that hope \u2014 not with hollow optimism, but with the solid promises of a God who sees the end from the beginning and who wastes nothing in your story.',
    sessions: [
      {
        title: 'Session 1: When Hope Feels Lost',
        description:
          'Acknowledging the emptiness honestly. Why it is okay to not be okay, and why God meets you there.',
      },
      {
        title: 'Session 2: Elijah \u2014 Under the Broom Tree',
        description:
          'A prophet who wanted to die. How God responded with presence, not a lecture, and what that means for your despair.',
      },
      {
        title: 'Session 3: God\u2019s Plans vs. Your Plans',
        description:
          'Jeremiah 29:11 in its full context. Understanding that God\u2019s purpose for you unfolds even in exile.',
      },
      {
        title: 'Session 4: Finding Meaning in the Mess',
        description:
          'Romans 8:28 and the radical idea that God can bring good from anything \u2014 even this.',
      },
      {
        title: 'Session 5: Small Steps, Real Faith',
        description:
          'You do not need a grand vision. Practical ways to take one faithful step at a time.',
      },
      {
        title: 'Session 6: Your Story Is Not Over',
        description:
          'Trusting God with the chapters you cannot yet read. Anchoring your hope in His faithfulness, not your feelings.',
      },
    ],
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = studyPathConfigs[slug]

  if (!study) {
    return {
      title: 'Study Not Found',
    }
  }

  return {
    title: study.title,
    description: study.description,
    openGraph: {
      title: `${study.title} \u2014 Guided Bible Study`,
      description: study.description,
      type: 'website',
    },
  }
}

export default async function StudyPathPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = studyPathConfigs[slug]

  return <StudyPathContent study={study ?? null} slug={slug} />
}
