'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, Heart, Send, CheckCircle, AlertCircle, ExternalLink, Flame, BookOpen, Compass } from 'lucide-react';
import { submitContact } from '@/lib/supabase';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    requestType: 'general'
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitContact({
        name: formData.name,
        email: formData.email,
        request_type: formData.requestType,
        subject: formData.subject,
        message: formData.message,
      });

      if (result.success) {
        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          requestType: 'general'
        });
      } else {
        throw new Error(result.error || 'Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      const emailSubject = formData.subject || `${formData.requestType} - Contact Form Message`;
      const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Request Type: ${formData.requestType}
Subject: ${formData.subject}

Message:
${formData.message}

---
Sent from Shame to Flame Contact Form
      `.trim();
      openMailtoLink(emailSubject, emailBody);
    }

    setIsSubmitting(false);
  };

  const openMailtoLink = (subject: string, body: string) => {
    const mailtoLink = `mailto:contact@shametoflame.faith?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
    setShowSuccess(true);
  };

  const handleDirectEmail = () => {
    const emailSubject = formData.subject || `${formData.requestType} - Contact Form Message`;
    const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Request Type: ${formData.requestType}
Subject: ${formData.subject}

Message:
${formData.message}

---
Sent from Shame to Flame Contact Form
    `.trim();

    openMailtoLink(emailSubject, emailBody);
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-sky-50 to-flame-50 dark:from-sky-900/30 dark:to-flame-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-16 w-16 text-flame-500 mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            We're Here for You
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Your journey toward healing doesn't have to be walked alone. Whether you need prayer, 
            guidance, or just someone to listen, we're here to support you.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center bg-sky-50 dark:bg-sky-900/30 rounded-xl p-6">
              <Mail className="h-12 w-12 text-sky-600 dark:text-sky-400 mx-auto mb-4" />
              <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white mb-2">Email Support</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Reach out for personal support, prayer requests, or questions about healing resources.</p>
              <a href="mailto:contact@shametoflame.faith" className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium">
                contact@shametoflame.faith
              </a>
            </div>
            
            <Link href="/submit-prayer" className="text-center bg-flame-50 dark:bg-flame-900/30 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 block">
              <Flame className="h-12 w-12 text-flame-600 dark:text-flame-400 mx-auto mb-4" />
              <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white mb-2">Submit Prayer Request</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Share your prayer needs with us. We personally pray over every request and respond with encouragement.</p>
              <span className="text-flame-600 dark:text-flame-400 font-medium inline-flex items-center">
                Visit Prayer Page
                <ExternalLink className="ml-2 h-4 w-4" />
              </span>
            </Link>
            
            <Link href="/healing-pathways" className="text-center bg-sage-50 dark:bg-sage-900/30 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 block">
              <Compass className="h-12 w-12 text-sage-600 dark:text-sage-400 mx-auto mb-4" />
              <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white mb-2">Healing Resources</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Access free healing pathways, daily devotionals, and Bible study tools designed for your journey from shame to flame.</p>
              <span className="text-sage-600 dark:text-sage-400 font-medium inline-flex items-center">
                Explore Resources
                <ExternalLink className="ml-2 h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gradient-to-r from-sky-50 to-flame-50 dark:from-sky-900/30 dark:to-flame-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Send Us a Message.
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
              We read every message personally and respond with care. Your story matters to us.
            </p>
            
            {showSuccess ? (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Thank you for reaching out. We have received your message and will respond within 24-48 hours.
                  You are not alone in your journey.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="bg-flame-600 hover:bg-flame-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 mr-4"
                  >
                    Send Another Message
                  </button>
                  <a
                    href="mailto:contact@shametoflame.faith"
                    className="inline-flex items-center bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    Open Email Client
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-flame-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="How would you like us to address you?"
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
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-flame-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="requestType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    How Can We Help?
                  </label>
                  <select
                    id="requestType"
                    name="requestType"
                    value={formData.requestType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-flame-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="general">General Questions</option>
                    <option value="prayer">Prayer Request</option>
                    <option value="healing">Healing Resources</option>
                    <option value="testimony">Share Your Testimony</option>
                    <option value="crisis">Crisis Support</option>
                    <option value="ministry">Ministry Partnership</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-flame-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Brief description of your message"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-flame-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    placeholder="Share your heart with us. We're here to listen and support you."
                  ></textarea>
                </div>
                
                <div className="bg-sky-50 dark:bg-sky-900/30 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>How this works:</strong> When you click "Send Message", we'll try to send it directly.
                    If that doesn't work, your email client will open with the message pre-filled and ready to send to contact@shametoflame.faith.
                  </p>
                </div>
                
                <div className="text-center space-y-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center px-8 py-4 bg-flame-600 hover:bg-flame-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Or send directly:</p>
                    <button
                      type="button"
                      onClick={handleDirectEmail}
                      className="inline-flex items-center px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg transition-all duration-300"
                    >
                      Open Email Client
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Emergency Resources */}
      <section id="emergency" className="py-16 bg-red-50 dark:bg-red-900/20 border-t-4 border-red-200 dark:border-red-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-white mb-6 text-center">
            Crisis Support Resources
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
            <p className="text-gray-700 dark:text-gray-200 mb-2 text-center font-semibold">
              If you're having thoughts of self-harm or suicide, please reach out to the following services for immediate help:
            </p>
            <div className="bg-red-100 dark:bg-red-900/40 border-2 border-red-500 rounded-lg p-4 mb-4">
              <p className="text-red-900 dark:text-red-200 text-center font-bold text-lg">
                If you are in immediate danger call 000.
              </p>
            </div>
            <p className="text-white mb-6 text-center text-sm font-bold">
              These services are independent from Shame to Flame, and are included for public support and crisis assistance.
            </p>

            <div className="mb-8">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-4 text-center">United States</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
                  <a href="https://988lifeline.org/" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    National Suicide Prevention Lifeline
                  </a>
                  <p className="text-xl font-bold text-red-600 dark:text-red-400">988</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
                  <a href="https://www.crisistextline.org/" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    Crisis Text Line
                  </a>
                  <p className="text-xl font-bold text-red-600 dark:text-red-400">Text HOME to 741741</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-4 text-center">Australia</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
                  <a href="https://www.lifeline.org.au/" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    Lifeline Australia
                  </a>
                  <p className="text-xl font-bold text-red-600 dark:text-red-400">13 11 14</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">24/7 Crisis Support</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
                  <a href="https://www.suicidecallbackservice.org.au/" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    Suicide Call Back Service
                  </a>
                  <p className="text-xl font-bold text-red-600 dark:text-red-400">1300 659 467</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">24/7 Support</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
                  <a href="https://www.beyondblue.org.au/" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    Beyond Blue
                  </a>
                  <p className="text-xl font-bold text-red-600 dark:text-red-400">1300 22 4636</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Mental Health Support</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
                  <a href="https://mensline.org.au/" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    MensLine Australia
                  </a>
                  <p className="text-xl font-bold text-red-600 dark:text-red-400">1300 78 99 78</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">24/7 Men's Support</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
                  <a href="https://kidshelpline.com.au/" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    Kids Helpline
                  </a>
                  <p className="text-xl font-bold text-red-600 dark:text-red-400">1800 55 1800</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">For ages 5-25</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
                  <a href="https://www.braveenough.org/" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    Brave Enough Careline
                  </a>
                  <p className="text-xl font-bold text-red-600 dark:text-red-400">1800 272 838</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Freecall Support</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mt-6 text-center">
              These resources are available 24/7 and provide immediate, professional support.
            </p>
          </div>
        </div>
      </section>

      {/* Response Promise */}
      <section className="py-16 bg-gray-900 dark:bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl font-bold mb-6">
            Our Promise to You
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Every message we receive is precious to us. We typically respond within 24-48 hours, 
            and we always respond with care, respect, and confidentiality.
          </p>
          <p className="text-lg text-flame-300 dark:text-flame-400 italic">
            "You are not alone in your journey. We're honored to walk alongside you toward healing and hope."
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-600 mt-8 opacity-70">
            Page Version: 8
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;