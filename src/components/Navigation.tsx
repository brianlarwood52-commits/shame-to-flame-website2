'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Flame, Menu, X, ChevronDown, Settings, Phone } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false)
  const [studiesDropdownOpen, setStudiesDropdownOpen] = useState(false)
  const [prayerDropdownOpen, setPrayerDropdownOpen] = useState(false)
  const pathname = usePathname()
  const aboutTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const studiesTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const prayerTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (setter: React.Dispatch<React.SetStateAction<boolean>>, ref: React.MutableRefObject<NodeJS.Timeout | null>) => {
    if (ref.current) clearTimeout(ref.current)
    setter(true)
  }

  const handleMouseLeave = (setter: React.Dispatch<React.SetStateAction<boolean>>, ref: React.MutableRefObject<NodeJS.Timeout | null>) => {
    ref.current = setTimeout(() => setter(false), 150)
  }

  const aboutItems = [
    { path: '/my-story', label: 'My Story' },
    { path: '/why-this-ministry', label: 'Why This Ministry' },
    { path: '/about', label: 'About Us' },
  ]

  const studiesItems = [
    { path: '/guided-studies', label: 'All Study Paths' },
    { path: '/guided-studies/shame-and-guilt', label: 'Shame & Guilt' },
    { path: '/guided-studies/grief-and-loss', label: 'Grief & Loss' },
    { path: '/guided-studies/identity-in-christ', label: 'Identity in Christ' },
    { path: '/guided-studies/forgiveness', label: 'Forgiveness' },
    { path: '/guided-studies/hope-and-purpose', label: 'Hope & Purpose' },
  ]

  const prayerItems = [
    { path: '/prayer-rock-story', label: 'The Prayer Rock Story' },
    { path: '/submit-prayer', label: 'Submit a Prayer' },
  ]

  const linkClass = (path: string) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
      pathname === path
        ? 'bg-flame-100 dark:bg-flame-900/50 text-flame-700 dark:text-flame-300'
        : 'text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30'
    }`

  const dropdownLinkClass = (path: string) =>
    `block px-4 py-2 text-sm transition-all duration-200 ${
      pathname === path
        ? 'bg-flame-100 dark:bg-flame-900/50 text-flame-700 dark:text-flame-300'
        : 'text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30'
    }`

  const mobileLinkClass = (path: string) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
      pathname === path
        ? 'bg-flame-100 dark:bg-flame-900/50 text-flame-700 dark:text-flame-300'
        : 'text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30'
    }`

  const mobileSubLinkClass = (path: string) =>
    `block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
      pathname === path
        ? 'bg-flame-100 dark:bg-flame-900/50 text-flame-700 dark:text-flame-300'
        : 'text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30'
    }`

  const DesktopDropdown = ({
    label,
    items,
    isOpen: dropOpen,
    onMouseEnter,
    onMouseLeave,
  }: {
    label: string
    items: { path: string; label: string }[]
    isOpen: boolean
    onMouseEnter: () => void
    onMouseLeave: () => void
  }) => (
    <div className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <button
        className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
          items.some(item => pathname === item.path || pathname?.startsWith(item.path + '/'))
            ? 'bg-flame-100 dark:bg-flame-900/50 text-flame-700 dark:text-flame-300'
            : 'text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30'
        }`}
      >
        <span>{label}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`absolute top-full left-0 pt-1 transition-all duration-200 ${dropOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1">
          {items.map((item) => (
            <Link key={item.path} href={item.path} className={dropdownLinkClass(item.path)}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )

  const MobileDropdown = ({
    label,
    items,
    isOpen: dropOpen,
    toggle,
  }: {
    label: string
    items: { path: string; label: string }[]
    isOpen: boolean
    toggle: () => void
  }) => (
    <div>
      <button
        onClick={toggle}
        className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-flame-600 dark:hover:text-flame-400 hover:bg-flame-50 dark:hover:bg-flame-900/30 transition-all duration-200"
      >
        <span>{label}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`} />
      </button>
      {dropOpen && (
        <div className="pl-4 space-y-1 mt-1">
          {items.map((item) => (
            <Link key={item.path} href={item.path} onClick={() => setIsOpen(false)} className={mobileSubLinkClass(item.path)}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )

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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link href="/" className={linkClass('/')}>Home</Link>

            <DesktopDropdown
              label="About"
              items={aboutItems}
              isOpen={aboutDropdownOpen}
              onMouseEnter={() => handleMouseEnter(setAboutDropdownOpen, aboutTimeoutRef)}
              onMouseLeave={() => handleMouseLeave(setAboutDropdownOpen, aboutTimeoutRef)}
            />

            <DesktopDropdown
              label="Guided Studies"
              items={studiesItems}
              isOpen={studiesDropdownOpen}
              onMouseEnter={() => handleMouseEnter(setStudiesDropdownOpen, studiesTimeoutRef)}
              onMouseLeave={() => handleMouseLeave(setStudiesDropdownOpen, studiesTimeoutRef)}
            />

            <DesktopDropdown
              label="Prayer"
              items={prayerItems}
              isOpen={prayerDropdownOpen}
              onMouseEnter={() => handleMouseEnter(setPrayerDropdownOpen, prayerTimeoutRef)}
              onMouseLeave={() => handleMouseLeave(setPrayerDropdownOpen, prayerTimeoutRef)}
            />

            <Link href="/crisis-help" className={`${linkClass('/crisis-help')} flex items-center gap-1`}>
              <Phone className="h-3.5 w-3.5" />
              Crisis Help
            </Link>

            <Link href="/contact" className={linkClass('/contact')}>Contact</Link>

            <Link href="/settings" className={`${linkClass('/settings')} flex items-center gap-1`}>
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>

            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
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

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" onClick={() => setIsOpen(false)} className={mobileLinkClass('/')}>Home</Link>

              <MobileDropdown
                label="About"
                items={aboutItems}
                isOpen={aboutDropdownOpen}
                toggle={() => setAboutDropdownOpen(!aboutDropdownOpen)}
              />

              <MobileDropdown
                label="Guided Studies"
                items={studiesItems}
                isOpen={studiesDropdownOpen}
                toggle={() => setStudiesDropdownOpen(!studiesDropdownOpen)}
              />

              <MobileDropdown
                label="Prayer"
                items={prayerItems}
                isOpen={prayerDropdownOpen}
                toggle={() => setPrayerDropdownOpen(!prayerDropdownOpen)}
              />

              <Link href="/crisis-help" onClick={() => setIsOpen(false)} className={`${mobileLinkClass('/crisis-help')} flex items-center gap-2`}>
                <Phone className="h-4 w-4" />
                Crisis Help
              </Link>

              <Link href="/contact" onClick={() => setIsOpen(false)} className={mobileLinkClass('/contact')}>Contact</Link>

              <Link href="/settings" onClick={() => setIsOpen(false)} className={`${mobileLinkClass('/settings')} flex items-center gap-2`}>
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
