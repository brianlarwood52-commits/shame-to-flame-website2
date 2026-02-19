import { notFound } from 'next/navigation';
import { getDevotionalBySlug, devotionals, getTodaysDevotional } from '../../../src/data/dailyFireDevotionals';
import DevotionalContent from '../../../src/components/DevotionalContent';

export async function generateStaticParams() {
  return devotionals.map((devotional) => ({
    id: devotional.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const devotional = getDevotionalBySlug(id);

  if (!devotional) {
    return {
      title: 'Devotional Not Found',
    };
  }

  return {
    title: `${devotional.title} - Daily Fire | Shame to Flame`,
    description: devotional.message[0].substring(0, 160),
    openGraph: {
      title: `${devotional.title} - Daily Fire`,
      description: devotional.message[0].substring(0, 160),
      type: 'article',
    },
  };
}

export default async function DevotionalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const devotional = getDevotionalBySlug(id);

  if (!devotional) {
    notFound();
  }

  const todaysDevotional = getTodaysDevotional();
  const isToday = todaysDevotional.id === devotional.id;

  const relatedDevotionals = devotionals
    .filter(d => d.category === devotional.category && d.id !== devotional.id)
    .slice(0, 3);

  const devotionalSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": devotional.title,
    "description": devotional.message[0].substring(0, 160),
    "author": {
      "@type": "Organization",
      "name": "Shame to Flame Ministry"
    },
    "datePublished": devotional.date,
    "publisher": {
      "@type": "Organization",
      "name": "Shame to Flame Ministry",
      "url": "https://shametoflame.faith",
      "logo": {
        "@type": "ImageObject",
        "url": "https://shametoflame.faith/flame-icon.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://shametoflame.faith/daily-fire/${devotional.slug}`
    },
    "articleSection": devotional.category,
    "keywords": `daily devotional, ${devotional.category.toLowerCase()}, christian encouragement, biblical hope`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(devotionalSchema) }}
      />
      <DevotionalContent
        devotionalId={devotional.id}
        devotional={devotional}
        isToday={isToday}
        relatedDevotionals={relatedDevotionals}
      />
    </>
  );
}
