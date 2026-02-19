import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Clock, Tag } from 'lucide-react'
import { getBlogPostById, blogPosts } from '../../../../src/data/blogPosts'
import Navigation from '../../../../src/components/Navigation'
import Footer from '../../../../src/components/Footer'

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = getBlogPostById(id)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Prayer Rock Archive`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author],
      tags: post.tags,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = getBlogPostById(id)

  if (!post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      personal: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
      reflection: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
      teaching: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      testimony: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
      prayer: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
    }
    return colorMap[category] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
  }

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "datePublished": post.publishDate,
    "publisher": {
      "@type": "Organization",
      "name": "Shame to Flame Ministry",
      "url": "https://shametoflame.faith"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://shametoflame.faith/prayer-rock/blog/${post.id}`
    },
    "keywords": post.tags.join(', ')
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
        <Navigation />

        <article className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/prayer-rock"
              className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Prayer Rock Archive
            </Link>

            <div className="mb-8">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${getCategoryColor(post.category)}`}>
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </span>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-serif">
                {post.title}
              </h1>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{formatDate(post.publishDate)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>

              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-serif prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-orange-600 dark:prose-a:text-orange-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-ul:text-gray-700 dark:prose-ul:text-gray-300 prose-ol:text-gray-700 dark:prose-ol:text-gray-300">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  Tags:
                </span>
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif">
                Share Your Story
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Has this reflection resonated with you? We'd love to hear how God is working in your life.
              </p>
              <Link
                href="/submit-prayer"
                className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Share Your Prayer Request
              </Link>
            </div>
          </div>
        </article>

        <Footer />
      </div>
    </>
  )
}
