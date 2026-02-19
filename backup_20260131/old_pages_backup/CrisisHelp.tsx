'use client';

const CrisisHelp = () => {
  return (
    <div className="animate-fade-in">
      <section id="emergency" className="pt-24 pb-16 bg-red-50 dark:bg-red-900/20 border-t-4 border-red-200 dark:border-red-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
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
            <p className="text-gray-700 dark:text-gray-200 mb-6 text-center text-sm font-bold">
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
    </div>
  );
};

export default CrisisHelp;
