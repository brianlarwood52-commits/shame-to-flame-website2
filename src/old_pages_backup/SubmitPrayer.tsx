'use client'

import React, { useState } from 'react'
import { Send } from 'lucide-react'
import PageHero from '@/components/PageHero'
import Disclaimer from '@/components/Disclaimer'

const SubmitPrayer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    prayerRequest: '',
    wouldLikeToPrayWithSomeone: false,
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value =
      e.target.type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder: no backend yet
    console.log('Prayer request submitted:', formData)
    setShowSuccess(true)
    setFormData({
      name: '',
      email: '',
      prayerRequest: '',
      wouldLikeToPrayWithSomeone: false,
    })
  }

  return (
    <div className="animate-fade-in">
      <PageHero
        title="Submit a Prayer"
        subtitle="You don&rsquo;t have to carry this alone"
      />

      <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            Share what&rsquo;s on your heart. Your prayer request will be held in
            confidence.
          </p>

          {showSuccess && (
            <div className="mb-8 p-6 bg-sky-50 dark:bg-sky-900/30 border border-sky-200 dark:border-sky-700 rounded-xl text-center animate-fade-in">
              <p className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                Thank you.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Your prayer request has been received. We&rsquo;re lifting you
                up.
              </p>
            </div>
          )}

          {!showSuccess && (
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Name <span className="text-gray-400 font-normal">(optional &mdash; can be anonymous)</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-flame-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Your name or leave blank"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email <span className="text-gray-400 font-normal">(optional &mdash; only if you want a response)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-flame-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="prayerRequest"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Prayer request <span className="text-flame-500">*</span>
                </label>
                <textarea
                  id="prayerRequest"
                  name="prayerRequest"
                  value={formData.prayerRequest}
                  onChange={handleChange}
                  required
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-flame-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-y"
                  placeholder="Share your prayer request here..."
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="wouldLikeToPrayWithSomeone"
                  name="wouldLikeToPrayWithSomeone"
                  checked={formData.wouldLikeToPrayWithSomeone}
                  onChange={handleChange}
                  className="h-4 w-4 mt-1 text-flame-600 focus:ring-flame-500 border-gray-300 dark:border-gray-600 rounded"
                />
                <label
                  htmlFor="wouldLikeToPrayWithSomeone"
                  className="text-sm text-gray-700 dark:text-gray-300"
                >
                  I&rsquo;d like someone to pray with me
                </label>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                Your prayer request is treated with the utmost respect and
                confidentiality.
              </p>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-flame-500 to-orange-500 hover:from-flame-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send className="h-5 w-5" />
                Submit
              </button>
            </form>
          )}

          {/* Disclaimer */}
          <div className="mt-12">
            <Disclaimer compact={true} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default SubmitPrayer
