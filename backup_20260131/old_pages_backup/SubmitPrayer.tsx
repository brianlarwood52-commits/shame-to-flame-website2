'use client'

import React, { useState } from 'react';
import { Heart, Send, CheckCircle, HandHeart, Sparkles } from 'lucide-react';
import { submitPrayer } from '@/lib/supabase';

const SubmitPrayer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    prayerRequest: '',
    isAnonymous: false,
    allowSharing: false
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitPrayer({
        name: formData.isAnonymous ? null : formData.name,
        email: formData.isAnonymous ? null : formData.email,
        is_anonymous: formData.isAnonymous,
        prayer_request: formData.prayerRequest,
        allow_sharing: formData.allowSharing,
      });

      if (result.success) {
        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          prayerRequest: '',
          isAnonymous: false,
          allowSharing: false
        });
        setTimeout(() => setShowSuccess(false), 8000);
      } else {
        throw new Error(result.error || 'Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      const emailSubject = `Prayer Request from ${formData.isAnonymous ? 'Anonymous' : formData.name}`;
      const emailBody = `
Prayer Request Submission

Name: ${formData.isAnonymous ? 'Anonymous' : formData.name}
Email: ${formData.isAnonymous ? 'Anonymous' : formData.email}
Allow Sharing as Testimony: ${formData.allowSharing ? 'Yes' : 'No'}

Prayer Request:
${formData.prayerRequest}

---
Sent from Shame to Flame Prayer Rock
      `.trim();
      const mailtoLink = `mailto:contact@shametoflame.faith?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoLink, '_blank');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 8000);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="animate-fade-in">
      <section className="py-20 bg-gradient-to-br from-sky-50 via-purple-50 to-flame-50 dark:from-sky-900/30 dark:via-purple-900/30 dark:to-flame-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-float mb-6">
            <HandHeart className="h-16 w-16 text-flame-500 mx-auto" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Submit a Prayer Request
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            You are not alone in your struggles. Share your prayer request with us, and we will lift
            you up in prayer. Your request is confidential and will be treated with care and respect.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-sky-50 to-flame-50 dark:from-sky-900/30 dark:to-flame-900/30 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-flame-500 mr-3" />
              <h2 className="font-serif text-2xl font-semibold text-gray-800 dark:text-white">
                Prayer Rock Ministry
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-center">
              The Prayer Rock is a symbol of God's faithfulness and a reminder that He hears every prayer.
              When you submit your request, know that you are placing it in the hands of a loving God
              who cares deeply about every detail of your life.
            </p>
          </div>

          {showSuccess && (
            <div className="mb-8 bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 p-4 rounded-r-lg animate-fade-in">
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                <div>
                  <p className="text-green-800 dark:text-green-200 font-medium">
                    Your prayer request has been received!
                  </p>
                  <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                    We are lifting you up in prayer. God hears you and loves you deeply.
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isAnonymous"
                  name="isAnonymous"
                  checked={formData.isAnonymous}
                  onChange={handleChange}
                  className="h-4 w-4 text-flame-600 focus:ring-flame-500 border-gray-300 rounded"
                />
                <label htmlFor="isAnonymous" className="ml-2 text-gray-700 dark:text-gray-300">
                  Submit anonymously
                </label>
              </div>

              {!formData.isAnonymous && (
                <>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required={!formData.isAnonymous}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-flame-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required={!formData.isAnonymous}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-flame-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </>
              )}

              <div>
                <label htmlFor="prayerRequest" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Prayer Request <span className="text-flame-500">*</span>
                </label>
                <textarea
                  id="prayerRequest"
                  name="prayerRequest"
                  value={formData.prayerRequest}
                  onChange={handleChange}
                  required
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-flame-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 resize-none"
                  placeholder="Share your prayer request here. We will hold this in confidence and lift you up in prayer..."
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="allowSharing"
                  name="allowSharing"
                  checked={formData.allowSharing}
                  onChange={handleChange}
                  className="h-4 w-4 mt-1 text-flame-600 focus:ring-flame-500 border-gray-300 rounded"
                />
                <label htmlFor="allowSharing" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  I give permission for my answered prayer to be shared as a testimony in the Prayer Rock Archive
                  (your contact information will never be shared)
                </label>
              </div>
            </div>

            <div className="bg-sky-50 dark:bg-sky-900/30 rounded-lg p-4">
              <div className="flex items-start">
                <Sparkles className="h-5 w-5 text-sky-500 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-gray-700 dark:text-gray-200">
                  <strong>Privacy Promise:</strong> Your prayer request is confidential. We will never share
                  your information or request publicly without your explicit permission.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-flame-500 to-orange-500 hover:from-flame-600 hover:to-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Submit Prayer Request
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-sky-50 to-flame-50 dark:from-sky-900/30 dark:to-flame-900/30 rounded-xl p-6">
              <Heart className="h-10 w-10 text-flame-500 mx-auto mb-4" />
              <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white mb-3">
                God Hears Your Prayers
              </h3>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
                "Cast all your anxiety on him because he cares for you." - 1 Peter 5:7
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm italic">
                Your prayer matters. You matter. And God is listening.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubmitPrayer;
