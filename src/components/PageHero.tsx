'use client'

import React, { ReactNode } from 'react'

export interface PageHeroProps {
  title: string
  subtitle?: string
  children?: ReactNode
}

const PageHero = ({ title, subtitle, children }: PageHeroProps) => {
  return (
    <section className="relative bg-gradient-to-b from-gray-900 to-flame-900/20 pt-24 sm:pt-28 pb-10 sm:pb-14 md:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-300">
            {subtitle}
          </p>
        )}
        {children && (
          <div className="mt-6">
            {children}
          </div>
        )}
      </div>
    </section>
  )
}

export default PageHero
