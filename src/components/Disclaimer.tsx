'use client'

import React from 'react'
import Link from 'next/link'
import { Info } from 'lucide-react'

export interface DisclaimerProps {
  compact?: boolean
}

const Disclaimer = ({ compact = false }: DisclaimerProps) => {
  const fullText =
    'This ministry offers Bible-based encouragement and general spiritual guidance. It is not a substitute for professional counselling, therapy, or medical advice. If you are in crisis, please contact a professional helpline.'
  const shortText =
    'Bible-based encouragement, not professional counselling.'

  return (
    <div className="bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-lg p-4 flex gap-3 items-start">
      <Info
        className="w-5 h-5 shrink-0 text-sky-600 dark:text-sky-400 mt-0.5"
        aria-hidden
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {compact ? shortText : fullText}{' '}
          <Link
            href="/crisis-help"
            className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 underline font-medium"
          >
            View crisis resources
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Disclaimer
