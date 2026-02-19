'use client'

import React from 'react';
import Link from 'next/link';
import { Shield, Lock, Eye, UserCheck, Mail, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen pt-16">
      <section className="py-20 bg-gradient-to-br from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="h-16 w-16 text-flame-500 mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Your privacy and trust are sacred to us. Learn how we protect your personal information.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Last Updated: December 7, 2024
          </p>
        </div>
      </section>

      <section className="py-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">

            <div className="bg-sky-50/50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-700 rounded-lg p-6 mb-8">
              <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-white mt-0 mb-4">
                Our Commitment to You
              </h2>
              <p className="text-gray-700 dark:text-gray-200 mb-0">
                At Shame to Flame Ministry, we are committed to protecting your privacy and handling your personal information with the utmost care and respect. This Privacy Policy explains how we collect, use, protect, and share information about you when you use our website and services.
              </p>
            </div>

            <div className="space-y-12">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-flame-100 dark:bg-flame-900/50 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-flame-600 dark:text-flame-400" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-white m-0">
                    1. Information We Collect
                  </h2>
                </div>

                <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                  Information You Provide
                </h3>
                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  We collect information you voluntarily provide when you:
                </p>
                <ul className="text-gray-700 dark:text-gray-200 space-y-2 mb-4">
                  <li>Submit a prayer request</li>
                  <li>Contact us through our contact form</li>
                  <li>Subscribe to our newsletters or updates</li>
                  <li>Participate in online support groups or community features</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  This information may include:
                </p>
                <ul className="text-gray-700 dark:text-gray-200 space-y-2">
                  <li>Name and email address</li>
                  <li>Prayer requests and personal testimonies</li>
                  <li>Messages and correspondence with our ministry team</li>
                  <li>Any other information you choose to share with us</li>
                </ul>

                <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                  Automatically Collected Information
                </h3>
                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  When you visit our website, we automatically collect certain information about your device and usage:
                </p>
                <ul className="text-gray-700 dark:text-gray-200 space-y-2">
                  <li>Browser type and version</li>
                  <li>Device information (operating system, device type)</li>
                  <li>IP address and general location information</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referring website or source</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-sky-100 dark:bg-sky-900/50 rounded-lg flex items-center justify-center">
                    <UserCheck className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-white m-0">
                    2. How We Use Your Information
                  </h2>
                </div>

                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="text-gray-700 dark:text-gray-200 space-y-2">
                  <li><strong>Provide Ministry Services:</strong> Respond to prayer requests, offer spiritual support, and provide requested resources</li>
                  <li><strong>Communicate:</strong> Send updates, devotionals, and ministry announcements you've subscribed to</li>
                  <li><strong>Improve Our Services:</strong> Understand how visitors use our website and improve user experience</li>
                  <li><strong>Safety and Security:</strong> Protect against fraud, abuse, and security threats</li>
                  <li><strong>Legal Compliance:</strong> Comply with applicable laws and regulations</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-sage-100 dark:bg-sage-900/50 rounded-lg flex items-center justify-center">
                    <Lock className="h-5 w-5 text-sage-600 dark:text-sage-400" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-white m-0">
                    3. How We Protect Your Information
                  </h2>
                </div>

                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal information, including:
                </p>
                <ul className="text-gray-700 dark:text-gray-200 space-y-2">
                  <li>Secure SSL/TLS encryption for data transmission</li>
                  <li>Secure hosting infrastructure with regular security updates</li>
                  <li>Limited access to personal information (ministry team only)</li>
                  <li>Regular security assessments and monitoring</li>
                  <li>Confidential handling of all prayer requests and personal communications</li>
                </ul>

                <div className="bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4 mt-4">
                  <p className="text-gray-700 dark:text-gray-200 mb-0 text-sm">
                    <strong>Important:</strong> While we take reasonable measures to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your data.
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-flame-100 dark:bg-flame-900/50 rounded-lg flex items-center justify-center">
                    <Eye className="h-5 w-5 text-flame-600 dark:text-flame-400" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-white m-0">
                    4. Information Sharing and Disclosure
                  </h2>
                </div>

                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  We do not sell, rent, or trade your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="text-gray-700 dark:text-gray-200 space-y-2">
                  <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
                  <li><strong>Service Providers:</strong> With trusted third-party service providers who assist in operating our website and ministry (e.g., email service providers, hosting services)</li>
                  <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental authority</li>
                  <li><strong>Safety:</strong> To protect the rights, property, or safety of our ministry, users, or others</li>
                </ul>

                <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white mt-6 mb-3">
                  Prayer Request Confidentiality
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  All prayer requests are treated as confidential. We do not publicly share prayer requests without explicit permission. Our ministry team members who have access to prayer requests are committed to maintaining confidentiality.
                </p>
              </div>

              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-sky-100 dark:bg-sky-900/50 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-white m-0">
                    5. Cookies and Tracking Technologies
                  </h2>
                </div>

                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  We use cookies and similar tracking technologies to improve your experience on our website. Cookies are small data files stored on your device that help us:
                </p>
                <ul className="text-gray-700 dark:text-gray-200 space-y-2 mb-4">
                  <li>Remember your preferences and settings</li>
                  <li>Understand how you use our website</li>
                  <li>Improve website functionality and performance</li>
                  <li>Enable certain features (e.g., service worker for offline access)</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-200">
                  You can control cookies through your browser settings. However, disabling cookies may limit some website functionality.
                </p>
              </div>

              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-sage-100 dark:bg-sage-900/50 rounded-lg flex items-center justify-center">
                    <UserCheck className="h-5 w-5 text-sage-600 dark:text-sage-400" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-white m-0">
                    6. Your Privacy Rights
                  </h2>
                </div>

                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  You have the right to:
                </p>
                <ul className="text-gray-700 dark:text-gray-200 space-y-2">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
                  <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
                  <li><strong>Data Portability:</strong> Request your data in a portable format</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-200 mt-4">
                  To exercise these rights, please contact us at{' '}
                  <a href="mailto:privacy@shametoflame.faith" className="text-flame-600 dark:text-flame-400 hover:text-flame-700 dark:hover:text-flame-300">
                    privacy@shametoflame.faith
                  </a>
                </p>
              </div>

              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-flame-100 dark:bg-flame-900/50 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-flame-600 dark:text-flame-400" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-white m-0">
                    7. Children's Privacy
                  </h2>
                </div>

                <p className="text-gray-700 dark:text-gray-200">
                  Our website and services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately so we can delete such information.
                </p>
              </div>

              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-sky-100 dark:bg-sky-900/50 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-white m-0">
                    8. Third-Party Links
                  </h2>
                </div>

                <p className="text-gray-700 dark:text-gray-200">
                  Our website may contain links to third-party websites and services. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </div>

              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-sage-100 dark:bg-sage-900/50 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-sage-600 dark:text-sage-400" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-white m-0">
                    9. Data Retention
                  </h2>
                </div>

                <p className="text-gray-700 dark:text-gray-200">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Prayer requests and related communications are retained to maintain a record of our ministry services and may be kept indefinitely unless you request deletion.
                </p>
              </div>

              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-flame-100 dark:bg-flame-900/50 rounded-lg flex items-center justify-center">
                    <Lock className="h-5 w-5 text-flame-600 dark:text-flame-400" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-white m-0">
                    10. Changes to This Privacy Policy
                  </h2>
                </div>

                <p className="text-gray-700 dark:text-gray-200">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
                </p>
              </div>

              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-sky-100 dark:bg-sky-900/50 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-white m-0">
                    11. Contact Us
                  </h2>
                </div>

                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="bg-gradient-to-r from-sky-50/90 to-flame-50/90 dark:from-sky-900/30 dark:to-flame-900/30 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-gray-700/50">
                  <p className="text-gray-700 dark:text-gray-200 mb-2">
                    <strong>Shame to Flame Ministry</strong>
                  </p>
                  <p className="text-gray-700 dark:text-gray-200 mb-2">
                    <strong>Email:</strong>{' '}
                    <a href="mailto:privacy@shametoflame.faith" className="text-flame-600 dark:text-flame-400 hover:text-flame-700 dark:hover:text-flame-300">
                      privacy@shametoflame.faith
                    </a>
                  </p>
                  <p className="text-gray-700 dark:text-gray-200 mb-2">
                    <strong>General Contact:</strong>{' '}
                    <a href="mailto:contact@shametoflame.faith" className="text-flame-600 dark:text-flame-400 hover:text-flame-700 dark:hover:text-flame-300">
                      contact@shametoflame.faith
                    </a>
                  </p>
                  <p className="text-gray-700 dark:text-gray-200 mb-0">
                    <strong>Website:</strong>{' '}
                    <a href="https://shametoflame.faith" className="text-flame-600 dark:text-flame-400 hover:text-flame-700 dark:hover:text-flame-300">
                      shametoflame.faith
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-flame-50/50 dark:bg-flame-900/20 border border-flame-200 dark:border-flame-700 rounded-lg p-6 mt-12">
              <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-white mt-0 mb-4">
                Our Sacred Trust
              </h2>
              <p className="text-gray-700 dark:text-gray-200 mb-0">
                As a Christian ministry, we take seriously our responsibility to handle your information with integrity, respect, and care. Your trust in sharing your struggles, prayer requests, and personal journey with us is a sacred gift. We are committed to honoring that trust by protecting your privacy and using your information only to serve you and further our ministry mission.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-900/90 dark:bg-black/90 backdrop-blur-md text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Questions About Privacy?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            We're here to address any privacy concerns you may have. Don't hesitate to reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-flame-600/90 hover:bg-flame-700 backdrop-blur-sm text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 border border-flame-500/50"
            >
              Contact Us
            </Link>
            <Link
              href="/"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white/30 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm text-white font-medium rounded-full transition-all duration-300"
            >
              Return Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
