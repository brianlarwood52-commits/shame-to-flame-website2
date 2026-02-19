/**
 * ARCHIVED SECTION - Join Our Ministry Network
 * Archived on: 2025-12-06
 * Reason: Not needed currently but may be used in the future
 *
 * This section can be re-integrated into MinistryHub.tsx when needed.
 * Dependencies: lucide-react icons (Globe, ArrowRight)
 */

{/* Join Our Network */}
<section className="py-16 bg-gradient-to-br from-sky-50 to-flame-50 dark:from-sky-900/30 dark:to-flame-900/30">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <Globe className="h-12 w-12 text-flame-500 mx-auto mb-4" />
        <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Join Our Ministry Network
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Are you leading a ministry focused on healing, restoration, or spiritual growth?
          We'd love to explore how we might work together to serve those in need.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white mb-4">Partnership Criteria</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-flame-400 rounded-full mr-3"></span>
              Biblical foundation and Christ-centered approach
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-flame-400 rounded-full mr-3"></span>
              Trauma-informed care practices
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-flame-400 rounded-full mr-3"></span>
              Commitment to safety and confidentiality
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-flame-400 rounded-full mr-3"></span>
              Professional accountability and oversight
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-xl font-semibold text-gray-800 dark:text-white mb-4">Partnership Benefits</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-sky-400 rounded-full mr-3"></span>
              Shared resources and training materials
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-sky-400 rounded-full mr-3"></span>
              Cross-referral opportunities
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-sky-400 rounded-full mr-3"></span>
              Collaborative training programs
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-sky-400 rounded-full mr-3"></span>
              Increased reach and impact
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-8">
        <button className="inline-flex items-center px-8 py-4 bg-flame-600 hover:bg-flame-700 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105">
          Apply for Partnership
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
</section>

{/* Impact Together */}
<section className="py-16 bg-gray-900 dark:bg-black text-white">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">
      Our Collective Impact
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center mb-12">
      <div>
        <div className="text-4xl font-bold text-flame-400 mb-2">2,500+</div>
        <p className="text-gray-300">Lives Touched</p>
      </div>
      <div>
        <div className="text-4xl font-bold text-sky-400 mb-2">150+</div>
        <p className="text-gray-300">Healing Programs</p>
      </div>
      <div>
        <div className="text-4xl font-bold text-sage-400 mb-2">50+</div>
        <p className="text-gray-300">Trained Counselors</p>
      </div>
      <div>
        <div className="text-4xl font-bold text-yellow-400 mb-2">24/7</div>
        <p className="text-gray-300">Support Available</p>
      </div>
    </div>

    <div className="text-center">
      <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
        When ministries unite with a common purpose, the impact multiplies exponentially.
        Together, we're creating a comprehensive network of hope, healing, and restoration
        that reaches into every corner of human brokenness with God's transformative love.
      </p>
    </div>
  </div>
</section>
