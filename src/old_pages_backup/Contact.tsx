'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import Disclaimer from '@/components/Disclaimer'
import { Send } from 'lucide-react'

const SUBJECT_OPTIONS = [
  'General Question',
  'Prayer Request',
  'Ministry Partnership',
  'Feedback',
  'Other',
] as const

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [showThankYou, setShowThankYou] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder: no backend yet
    console.log('Contact form submitted:', formData)
    setShowThankYou(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="animate-fade-in">
      <PageHero
        title="Contact Us"
        subtitle="We&apos;d love to hear from you"
      />

      <section className="py-10 sm:py-12 lg:py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-8">
            Reach out with questions, prayer requests, or just to say hello.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            <div className="md:col-span-2">
              {showThankYou ? (
                <div className="bg-gradient-to-r from-sky-50 to-flame-50 dark:from-sky-900/30 dark:to-flame-900/30 rounded-2xl p-8 sm:p-10 text-center">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    Thank You
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200 mb-6">
                    Thank you for reaching out. We&apos;ll do our best to respond soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowThankYou(false)}
                    className="inline-flex items-center px-6 py-3 bg-flame-600 hover:bg-flame-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-flame-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-flame-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-flame-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="">Select…</option>
                      {SUBJECT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-flame-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                      placeholder="Your message"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center px-6 py-3 bg-flame-600 hover:bg-flame-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Submit
                    <Send className="ml-2 h-5 w-5" />
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-sky-50 dark:bg-sky-900/30 rounded-xl p-5">
                <h3 className="font-serif text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Email
                </h3>
                <a
                  href="mailto:contact@shametoflame.faith"
                  className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300"
                >
                  contact@shametoflame.faith
                </a>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-5">
                <h3 className="font-serif text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Crisis Support
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-200 mb-2">
                  For crisis support, please contact a professional helpline.
                </p>
                <Link
                  href="/crisis-help"
                  className="text-flame-600 dark:text-flame-400 hover:text-flame-700 dark:hover:text-flame-300 font-medium text-sm"
                >
                  View crisis resources →
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Disclaimer compact={true} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
