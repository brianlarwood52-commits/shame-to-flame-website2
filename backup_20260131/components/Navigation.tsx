'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Flame, Menu, X, ChevronDown, Settings } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false)
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false)
  const [studyLibraryDropdownOpen, setStudyLibraryDropdownOpen] = useState(false)
  const [prayerRockDropdownOpen, setPrayerRockDropdownOpen] = useState(false)
  const pathname = usePathname()
  const aboutTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const resourcesTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const studyLibraryTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const prayerRockTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleAboutMouseEnter = () => {
    if (aboutTimeoutRef.current) {
      clearTimeout(aboutTimeoutRef.current)
    }
    setAboutDropdownOpen(true)
  }

  const handleAboutMouseLeave = () => {
    aboutTimeoutRef.current = setTimeout(() => {
      setAboutDropdownOpen(false)
    }, 150)
  }

  const handleResourcesMouseEnter = () => {
    if (resourcesTimeoutRef.current) {
      clearTimeout(resourcesTimeoutRef.current)
    }
    setResourcesDropdownOpen(true)
  }

  const handleResourcesMouseLeave = () => {
    resourcesTimeoutRef.current = setTimeout(() => {
      setResourcesDropdownOpen(false)
    }, 150)
  }

  const handleStudyLibraryMouseEnter = () => {
    if (studyLibraryTimeoutRef.current) {
      clearTimeout(studyLibraryTimeoutRef.current)
    }
    setStudyLibraryDropdownOpen(true)
  }

  const handleStudyLibraryMouseLeave = () => {
    studyLibraryTimeoutRef.current = setTimeout(() => {
      setStudyLibraryDropdownOpen(false)
    }, 150)
  }

  const handlePrayerRockMouseEnter = () => {
    if (prayerRockTimeoutRef.current) {
      clearTimeout(prayerRockTimeoutRef.current)
    }
    setPrayerRockDropdownOpen(true)
  }

  const handlePrayerRockMouseLeave = () => {
    prayerRockTimeoutRef.current = setTimeout(() => {
      setPrayerRockDropdownOpen(false)
    }, 150)
  }

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/contact', label: 'Contact Us' },
  ]

  const aboutItems = [
    { path: '/my-story', label: 'My Story' },
    { path: '/why-this-ministry', label: 'Why This Ministry' },
    { path: '/about', label: 'About Us' },
  ]

  const resourceItems = [
    { path: '/crisis-help', label: 'Crisis Help' },
    { path: '/healing-pathways', label: 'Healing Pathways' },
    { path: '/daily-fire', label: 'Daily Fire' },
    { path: '/ministry-hub', label: 'Ministry Hub' },
  ]

  const studyLibraryItems = [
    { path: '/mary-magdalene-apologetic', label: 'Mary Magdalene Apologetic' },
    { path: '/bible-study', label: 'Bible Study Hub' },
    { path: '/bible-study/eliza', label: 'ELIZA Bible Study' },
    { path: '/sda-commentary-search', label: 'SDA Commentary' },
  ]

  const prayerRockItems = [
    { path: '/prayer-rock-story', label: 'The Story (What is it?)' },
    { path: '/prayer-rock', label: 'The Archive (Testimonies)' },
    { path: '/submit-prayer', label: 'Submit a Prayer' },
  ]

  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg z-50 transition-all duration-300 border-b border-white/20 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <Flame className="h-8 w-8 text-flame-500 group-hover:text-flame-600 transition-colors duration-200" />
            <span className="font-serif font-semibold text-xl text-gray-800 dark:text-white group-hover:text-flame-600 dark:group-hover:text-flame-400 transition-colors duration-200">
              Shame to Flame
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                pathname === '/'
                  ? 'bg-flame-100 dark:bg-flame-900/50 text-flame-700 dark:text-flame-300'
                  : 'text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30'
              }`}
            >
              Home
            </Link>

            <div
              className="relative"
              onMouseEnter={handleAboutMouseEnter}
              onMouseLeave={handleAboutMouseLeave}
            >
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                  aboutItems.some(item => pathname === item.path)
                    ? 'bg-flame-100 dark:bg-flame-900/50 text-flame-700 dark:text-flame-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30'
                }`}
              >
                <span>About</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-full left-0 pt-1 transition-all duration-200 ${aboutDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                  {aboutItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`block px-4 py-2 text-sm transition-all duration-200 ${
                        pathname === item.path
                          ? 'bg-flame-100 dark:bg-flame-900/50 text-flame-700 dark:text-flame-300'
                          : 'text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="relative"
              onMouseEnter={handleResourcesMouseEnter}
              onMouseLeave={handleResourcesMouseLeave}
            >
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                  resourceItems.some(item => pathname === item.path)
                    ? 'bg-flame-100 dark:bg-flame-900/50 text-flame-700 dark:text-flame-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30'
                }`}
              >
                <span>Resources</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${resourcesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-full left-0 pt-1 transition-all duration-200 ${resourcesDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                  {resourceItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`block px-4 py-2 text-sm transition-all duration-200 ${
                        pathname === item.path
                          ? 'bg-flame-100 dark:bg-flame-900/50 text-flame-700 dark:text-flame-300'
                          : 'text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="relative"
              onMouseEnter={handleStudyLibraryMouseEnter}
              onMouseLeave={handleStudyLibraryMouseLeave}
            >
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                  studyLibraryItems.some(item => pathname === item.path)
                    ? 'bg-flame-100 dark:bg-flame-900/50 text-flame-700 dark:text-flame-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30'
                }`}
              >
                <span>Study Library</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${studyLibraryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-full left-0 pt-1 transition-all duration-200 ${studyLibraryDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                  {studyLibraryItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`block px-4 py-2 text-sm transition-all duration-200 ${
                        pathname === item.path
                          ? 'bg-flame-100 dark:bg-flame-900/50 text-flame-700 dark:text-flame-300'
                          : 'text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="relative"
              onMouseEnter={handlePrayerRockMouseEnter}
              onMouseLeave={handlePrayerRockMouseLeave}
            >
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                  prayerRockItems.some(item => pathname === item.path)
                    ? 'bg-flame-100 dark:bg-flame-900/50 text-flame-700 dark:text-flame-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30'
                }`}
              >
                <span>Prayer Rock</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${prayerRockDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-full left-0 pt-1 transition-all duration-200 ${prayerRockDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                  {prayerRockItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`block px-4 py-2 text-sm transition-all duration-200 ${
                        pathname === item.path
                          ? 'bg-flame-100 dark:bg-flame-900/50 text-flame-700 dark:text-flame-300'
                          : 'text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navItems.slice(1).map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  pathname === item.path
                    ? 'bg-flame-100 dark:bg-flame-900/50 text-flame-700 dark:text-flame-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/settings"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                pathname === '/settings'
                  ? 'bg-flame-100 dark:bg-flame-900/50 text-flame-700 dark:text-flame-300'
                  : 'text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30'
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
            <ThemeToggle />
          </div>

          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30 transition-colors duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  pathname === '/'
                    ? 'bg-flame-100 dark:bg-flame-900/50 text-flame-700 dark:text-flame-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30'
                }`}
              >
                Home
              </Link>

              <div>
                <button
                  onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                  className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30 transition-all duration-200"
                >
                  <span>About</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {aboutDropdownOpen && (
                  <div className="pl-4 space-y-1 mt-1">
                    {aboutItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                          pathname === item.path
                            ? 'bg-flame-100 dark:bg-flame-900/50 text-flame-700 dark:text-flame-300'
                            : 'text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => setResourcesDropdownOpen(!resourcesDropdownOpen)}
                  className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30 transition-all duration-200"
                >
                  <span>Resources</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${resourcesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {resourcesDropdownOpen && (
                  <div className="pl-4 space-y-1 mt-1">
                    {resourceItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                          pathname === item.path
                            ? 'bg-flame-100 dark:bg-flame-900/50 text-flame-700 dark:text-flame-300'
                            : 'text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => setStudyLibraryDropdownOpen(!studyLibraryDropdownOpen)}
                  className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30 transition-all duration-200"
                >
                  <span>Study Library</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${studyLibraryDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {studyLibraryDropdownOpen && (
                  <div className="pl-4 space-y-1 mt-1">
                    {studyLibraryItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                          pathname === item.path
                            ? 'bg-flame-100 dark:bg-flame-900/50 text-flame-700 dark:text-flame-300'
                            : 'text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => setPrayerRockDropdownOpen(!prayerRockDropdownOpen)}
                  className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30 transition-all duration-200"
                >
                  <span>Prayer Rock</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${prayerRockDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {prayerRockDropdownOpen && (
                  <div className="pl-4 space-y-1 mt-1">
                    {prayerRockItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                          pathname === item.path
                            ? 'bg-flame-100 dark:bg-flame-900/50 text-flame-700 dark:text-flame-300'
                            : 'text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navItems.slice(1).map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    pathname === item.path
                      ? 'bg-flame-100 dark:bg-flame-900/50 text-flame-700 dark:text-flame-300'
                      : 'text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/settings"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  pathname === '/settings'
                    ? 'bg-flame-100 dark:bg-flame-900/50 text-flame-700 dark:text-flame-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30'
                }`}
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
