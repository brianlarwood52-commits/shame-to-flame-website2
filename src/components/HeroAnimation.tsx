'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Phone, ChevronDown } from 'lucide-react'

const HeroAnimation = () => {
  const [phase, setPhase] = useState(0)
  const [mPhase, setMPhase] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    setReady(true)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (!ready) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (isMobile) {
      if (mq.matches) { setMPhase(15); return }
      const t: ReturnType<typeof setTimeout>[] = []
      t.push(setTimeout(() => setMPhase(1), 600))     // "The Journey Begins" in
      t.push(setTimeout(() => setMPhase(2), 3200))     // fade out
      t.push(setTimeout(() => setMPhase(3), 4200))     // Shame image in
      t.push(setTimeout(() => setMPhase(4), 7000))     // Shame image out
      t.push(setTimeout(() => setMPhase(5), 8000))     // "The Shame Is Real" in
      t.push(setTimeout(() => setMPhase(6), 10500))    // fade out
      t.push(setTimeout(() => setMPhase(7), 11500))    // "The Pain Is Real" in
      t.push(setTimeout(() => setMPhase(8), 14000))    // fade out to black
      t.push(setTimeout(() => setMPhase(9), 15200))    // Happy girl in
      t.push(setTimeout(() => setMPhase(10), 18500))   // Happy girl out
      t.push(setTimeout(() => setMPhase(11), 19500))   // "The Redemption Is Real"
      t.push(setTimeout(() => setMPhase(12), 22000))   // fade out
      t.push(setTimeout(() => setMPhase(13), 23000))   // "SHAME TO FLAME"
      t.push(setTimeout(() => setMPhase(14), 25500))   // fade out
      t.push(setTimeout(() => setMPhase(15), 26500))   // Final state
      return () => t.forEach(clearTimeout)
    } else {
      if (mq.matches) { setPhase(23); return }
      const t: ReturnType<typeof setTimeout>[] = []
      t.push(setTimeout(() => setPhase(1), 700))
      t.push(setTimeout(() => setPhase(2), 1900))
      t.push(setTimeout(() => setPhase(3), 2750))
      t.push(setTimeout(() => setPhase(4), 3600))
      t.push(setTimeout(() => setPhase(5), 4450))
      t.push(setTimeout(() => setPhase(6), 5500))
      t.push(setTimeout(() => setPhase(7), 7300))
      t.push(setTimeout(() => setPhase(8), 8500))
      t.push(setTimeout(() => setPhase(9), 9350))
      t.push(setTimeout(() => setPhase(10), 10200))
      t.push(setTimeout(() => setPhase(11), 11050))
      t.push(setTimeout(() => setPhase(12), 12100))
      t.push(setTimeout(() => setPhase(13), 13900))
      t.push(setTimeout(() => setPhase(14), 15100))
      t.push(setTimeout(() => setPhase(15), 15950))
      t.push(setTimeout(() => setPhase(16), 16800))
      t.push(setTimeout(() => setPhase(17), 17650))
      t.push(setTimeout(() => setPhase(18), 18700))
      t.push(setTimeout(() => setPhase(19), 20000))
      t.push(setTimeout(() => setPhase(20), 21700))
      t.push(setTimeout(() => setPhase(21), 23400))
      t.push(setTimeout(() => setPhase(22), 25900))
      t.push(setTimeout(() => setPhase(23), 27600))
      return () => t.forEach(clearTimeout)
    }
  }, [ready, isMobile])

  const handleSkip = useCallback(() => {
    if (isMobile) setMPhase(15)
    else setPhase(23)
  }, [isMobile])

  const isFinished = isMobile ? mPhase >= 15 : phase >= 23

  // ── MOBILE LAYOUT ─────────────────────────────────────────────────────────
  if (isMobile) {
    const showImage = (phases: number[]) => phases.includes(mPhase)
    const zoomActive = (startPhase: number) => mPhase >= startPhase

    return (
      <section className="relative w-full bg-black overflow-hidden" style={{ height: '85vh', maxHeight: '700px', minHeight: '400px' }}>
        {mPhase < 15 && (
          <button onClick={handleSkip} className="absolute top-3 right-4 z-50 text-white/25 hover:text-white/60 text-xs transition-colors duration-300">
            Skip
          </button>
        )}

        {/* ── Shame Image ── */}
        <div
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-out"
          style={{
            opacity: showImage([3]) ? 1 : 0,
            transform: zoomActive(3) && mPhase <= 4 ? 'scale(1.08)' : 'scale(1)',
            transition: 'opacity 1200ms ease-out, transform 2800ms ease-out',
          }}
        >
          <Image src="/hero/shame.png" alt="A woman in shame" fill className="object-cover object-[center_25%]" sizes="100vw" priority />
        </div>

        {/* ── Happy / Flame Image ── */}
        <div
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-out"
          style={{
            opacity: mPhase === 9 || mPhase >= 15 ? 1 : 0,
            transform: (mPhase >= 9 && mPhase <= 10) || mPhase >= 15 ? 'scale(1.08)' : 'scale(1)',
            transition: 'opacity 1200ms ease-out, transform 3500ms ease-out',
          }}
        >
          <Image src="/hero/flame.png" alt="A woman restored and joyful" fill className="object-cover object-[center_20%]" sizes="100vw" priority />
          {mPhase >= 15 && <div className="absolute inset-0 bg-black/50" />}
        </div>

        {/* ── Text Overlays ── */}
        <div className="absolute inset-0 flex items-center justify-center z-40">

          {/* "THE JOURNEY BEGINS" */}
          <div
            className="text-center transition-all duration-[1000ms] ease-out"
            style={{
              opacity: mPhase === 1 ? 1 : 0,
              transform: mPhase >= 1 && mPhase <= 2 ? 'scale(1.12)' : 'scale(1)',
              transition: 'opacity 1000ms ease-out, transform 2600ms ease-out',
            }}
          >
            <p className="font-serif text-4xl font-bold text-white drop-shadow-lg leading-tight tracking-wide">THE</p>
            <p className="font-serif text-4xl font-bold text-white drop-shadow-lg leading-tight tracking-wide mt-1">JOURNEY</p>
            <p className="font-serif text-4xl font-bold text-flame-400 drop-shadow-lg leading-tight tracking-wide mt-1">BEGINS</p>
          </div>

          {/* "THE SHAME IS REAL" */}
          <div
            className="absolute inset-0 flex items-center justify-center text-center transition-all"
            style={{
              opacity: mPhase === 5 ? 1 : 0,
              transform: mPhase >= 5 && mPhase <= 6 ? 'scale(1.1)' : 'scale(1)',
              transition: 'opacity 1000ms ease-out, transform 2500ms ease-out',
            }}
          >
            <div>
              <p className="font-serif text-4xl font-bold text-white drop-shadow-lg leading-tight tracking-wide">THE</p>
              <p className="font-serif text-4xl font-bold text-sky-300 drop-shadow-lg leading-tight tracking-wide mt-1">SHAME</p>
              <p className="font-serif text-4xl font-bold text-white drop-shadow-lg leading-tight tracking-wide mt-1">IS</p>
              <p className="font-serif text-4xl font-bold text-white drop-shadow-lg leading-tight tracking-wide mt-1">REAL</p>
            </div>
          </div>

          {/* "THE PAIN IS REAL" */}
          <div
            className="absolute inset-0 flex items-center justify-center text-center transition-all"
            style={{
              opacity: mPhase === 7 ? 1 : 0,
              transform: mPhase >= 7 && mPhase <= 8 ? 'scale(1.1)' : 'scale(1)',
              transition: 'opacity 1000ms ease-out, transform 2500ms ease-out',
            }}
          >
            <div>
              <p className="font-serif text-4xl font-bold text-white drop-shadow-lg leading-tight tracking-wide">THE</p>
              <p className="font-serif text-4xl font-bold text-amber-300 drop-shadow-lg leading-tight tracking-wide mt-1">PAIN</p>
              <p className="font-serif text-4xl font-bold text-white drop-shadow-lg leading-tight tracking-wide mt-1">IS</p>
              <p className="font-serif text-4xl font-bold text-white drop-shadow-lg leading-tight tracking-wide mt-1">REAL</p>
            </div>
          </div>

          {/* "THE REDEMPTION IS REAL" */}
          <div
            className="absolute inset-0 flex items-center justify-center text-center transition-all"
            style={{
              opacity: mPhase === 11 ? 1 : 0,
              transform: mPhase >= 11 && mPhase <= 12 ? 'scale(1.1)' : 'scale(1)',
              transition: 'opacity 1000ms ease-out, transform 2500ms ease-out',
            }}
          >
            <div>
              <p className="font-serif text-3xl font-bold text-white drop-shadow-lg leading-tight tracking-wide">THE</p>
              <p className="font-serif text-3xl font-bold text-flame-400 drop-shadow-lg leading-tight tracking-wide mt-1">REDEMPTION</p>
              <p className="font-serif text-3xl font-bold text-white drop-shadow-lg leading-tight tracking-wide mt-1">IS</p>
              <p className="font-serif text-3xl font-bold text-white drop-shadow-lg leading-tight tracking-wide mt-1">REAL</p>
            </div>
          </div>

          {/* "SHAME TO FLAME" */}
          <div
            className="absolute inset-0 flex items-center justify-center text-center transition-all"
            style={{
              opacity: mPhase === 13 ? 1 : 0,
              transition: 'opacity 1000ms ease-out',
            }}
          >
            <div>
              <p className="font-serif text-5xl font-bold text-white drop-shadow-lg leading-none tracking-widest">SHAME</p>
              <p className="font-serif text-5xl font-bold text-white/60 drop-shadow-lg leading-none tracking-widest mt-3">TO</p>
              <p className="font-serif text-5xl font-bold text-flame-400 drop-shadow-lg leading-none tracking-widest mt-3">FLAME</p>
            </div>
          </div>

          {/* Final State: "Your journey starts now" */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 transition-all duration-[1200ms] ease-out"
            style={{ opacity: mPhase >= 15 ? 1 : 0, background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)' }}
          >
            <h1 className="font-serif text-4xl font-bold text-white leading-tight drop-shadow-lg mb-4">
              Your journey<br />starts <span className="text-flame-400">now</span>
            </h1>
            <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-xs">
              Guided Bible studies for those carrying shame, guilt, and grief.
            </p>
            <div className="flex flex-col gap-3 w-full max-w-xs">
              <Link
                href="/guided-studies"
                className="group flex items-center justify-center px-6 py-3 bg-flame-600/90 hover:bg-flame-700 text-white text-sm font-medium rounded-full transition-all duration-300 shadow-lg border border-flame-500/50"
              >
                Start a Guided Bible Study
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/my-story"
                className="flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-full border border-white/30 hover:border-white/50 transition-all duration-300"
              >
                Read My Story
              </Link>
            </div>
            <Link
              href="/crisis-help"
              className="inline-flex items-center text-white/40 hover:text-white/70 text-[11px] mt-4 transition-colors"
            >
              <Phone className="h-3 w-3 mr-1" />
              Need support? Crisis resources
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 z-10 transition-all duration-1000 ${mPhase >= 15 ? 'opacity-50 animate-bounce' : 'opacity-0'}`}>
          <ChevronDown className="h-5 w-5 text-white/40" />
        </div>
      </section>
    )
  }

  // ── DESKTOP / TABLET LAYOUT ───────────────────────────────────────────────
  const wordClass = (showAtPhase: number) =>
    `absolute inset-0 flex items-center transition-opacity duration-700 ${
      phase === showAtPhase ? 'opacity-100' : 'opacity-0'
    }`

  return (
    <section className="relative w-full bg-black overflow-hidden" style={{ aspectRatio: '3.2 / 1' }}>
      {phase < 23 && (
        <button onClick={handleSkip} className="absolute top-3 right-4 z-50 text-white/25 hover:text-white/60 text-xs transition-colors duration-300">
          Skip
        </button>
      )}

      <div className="relative w-full h-full max-w-[1200px] mx-auto">

        {/* === SHAME IMAGE === */}
        <div
          className={`absolute bottom-0 transition-opacity ease-out duration-[1200ms] ${
            phase >= 1 && phase < 18 ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ left: '5%', width: '40%', height: '100%', zIndex: 10 }}
        >
          <Image src="/hero/shame.png" alt="A woman in shame" fill className="object-contain object-bottom" sizes="(max-width: 768px) 40vw, 480px" priority />
        </div>

        {/* === Words: "The Shame Is Real" === */}
        <div className="absolute z-40" style={{ left: '37%', top: '70%', transform: 'translateY(-50%)' }}>
          <div className="relative">
            <div className={wordClass(2)}><p className="font-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-lg">The</p></div>
            <div className={wordClass(3)}><p className="font-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl text-sky-300 drop-shadow-lg font-semibold">Shame</p></div>
            <div className={wordClass(4)}><p className="font-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-lg">Is</p></div>
            <div className={wordClass(5)}><p className="font-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-lg font-semibold">Real</p></div>
          </div>
        </div>

        {/* === SEARCHING IMAGE === */}
        <div
          className={`absolute bottom-0 transition-opacity ease-out duration-[1200ms] ${
            phase >= 7 && phase < 18 ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ left: '13%', width: '50%', height: '100%', zIndex: 20 }}
        >
          <Image src="/hero/searching.png" alt="A woman searching for identity" fill className="object-contain object-bottom" sizes="(max-width: 768px) 50vw, 600px" priority />
        </div>

        {/* === Words: "The Pain Is Real" === */}
        <div className="absolute z-40" style={{ left: '55%', top: '65%', transform: 'translateY(-50%)' }}>
          <div className="relative">
            <div className={wordClass(8)}><p className="font-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-lg">The</p></div>
            <div className={wordClass(9)}><p className="font-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl text-amber-300 drop-shadow-lg font-semibold">Pain</p></div>
            <div className={wordClass(10)}><p className="font-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-lg">Is</p></div>
            <div className={wordClass(11)}><p className="font-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-lg font-semibold">Real</p></div>
          </div>
        </div>

        {/* === FLAME IMAGE (with zoom) === */}
        <div
          className={`absolute bottom-0 ${phase >= 13 ? 'opacity-100' : 'opacity-0'}`}
          style={{
            left: '27%', width: '70%', height: '100%', zIndex: 30,
            transform: phase >= 13 ? 'scale(1.3) translateY(8%)' : 'scale(1) translateY(0%)',
            transformOrigin: 'center center',
            transition: phase >= 13 ? 'opacity 1200ms ease-out, transform 18000ms ease-in-out' : 'opacity 1200ms ease-out',
          }}
        >
          <Image src="/hero/flame.png" alt="A woman restored and joyful" fill className="object-contain object-bottom" sizes="(max-width: 768px) 70vw, 840px" priority />
        </div>

        {/* === Words: "The Redemption Is Real" === */}
        <div className="absolute z-40" style={{ right: '25%', top: '43%', transform: 'translateY(-50%)', textAlign: 'right' }}>
          <div className="relative">
            <div className={wordClass(14)}><p className="font-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-lg text-right">The</p></div>
            <div className={wordClass(15)}><p className="font-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl text-flame-400 drop-shadow-lg font-semibold text-right">Redemption</p></div>
            <div className={wordClass(16)}><p className="font-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-lg text-right">Is</p></div>
            <div className={wordClass(17)}><p className="font-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-lg font-semibold text-right">Real</p></div>
          </div>
        </div>

        {/* === "God called Mary..." line by line === */}
        <div
          className={`absolute z-40 transition-opacity ease-out duration-[1000ms] ${
            phase >= 19 && phase < 22 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ left: '7%', top: '53%', transform: 'translateY(-50%)', maxWidth: '44%' }}
        >
          <p className={`font-serif text-lg sm:text-2xl md:text-3xl lg:text-4xl text-white leading-snug drop-shadow-lg transition-opacity duration-700 ${phase >= 19 ? 'opacity-100' : 'opacity-0'}`}>
            God called Mary by name.
          </p>
          <p className={`font-serif text-lg sm:text-2xl md:text-3xl lg:text-4xl text-white leading-snug drop-shadow-lg mt-2 sm:mt-3 transition-opacity duration-700 ${phase >= 20 ? 'opacity-100' : 'opacity-0'}`}>
            God is calling <span className="text-flame-400 font-semibold">you</span> by name.
          </p>
          <p className={`text-sm sm:text-base md:text-lg lg:text-xl text-white/60 mt-3 sm:mt-5 italic transition-opacity duration-700 ${phase >= 21 ? 'opacity-100' : 'opacity-0'}`}>
            Follow the journey from shame to flame.
          </p>
        </div>

        {/* === "SHAME TO FLAME" stacked (stays permanently) === */}
        <div
          className={`absolute z-40 transition-opacity ease-out duration-[1000ms] ${
            phase >= 19 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ right: '1%', top: '55%', transform: 'translateY(-50%)' }}
        >
          <p className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg leading-none tracking-wide text-center">SHAME</p>
          <p className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white/60 drop-shadow-lg leading-none tracking-wide mt-1 sm:mt-2 text-center">TO</p>
          <p className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-flame-400 drop-shadow-lg leading-none tracking-wide mt-1 sm:mt-2 text-center">FLAME</p>
        </div>

        {/* === "Your journey starts now" === */}
        <div
          className={`absolute z-40 transition-all ease-out duration-[1200ms] ${
            phase === 23 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
          style={{ left: '1%', top: '58%', transform: 'translateY(-50%)', maxWidth: '46%' }}
        >
          <h1 className="font-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight drop-shadow-lg mb-2 sm:mb-4 md:mb-6">
            Your journey<br />starts <span className="text-flame-400">now</span>
          </h1>
          <p className="hidden sm:block text-xs sm:text-sm md:text-base lg:text-lg text-white/60 leading-relaxed mb-3 md:mb-5 max-w-md">
            Guided Bible studies for those carrying shame, guilt, and grief.
            A first step toward understanding God&apos;s plan for your life.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Link href="/guided-studies" className="group inline-flex items-center px-3 sm:px-5 md:px-7 py-1.5 sm:py-2.5 md:py-3 bg-flame-600/90 hover:bg-flame-700 text-white text-[10px] sm:text-xs md:text-sm lg:text-base font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg border border-flame-500/50">
              Start a Guided Bible Study
              <ArrowRight className="ml-1.5 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link href="/my-story" className="group inline-flex items-center px-3 sm:px-5 md:px-7 py-1.5 sm:py-2.5 md:py-3 bg-white/10 hover:bg-white/20 text-white text-[10px] sm:text-xs md:text-sm lg:text-base font-medium rounded-full border border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-105">
              Read My Story
            </Link>
          </div>
          <div className="mt-2 md:mt-4 hidden sm:block">
            <Link href="/crisis-help" className="inline-flex items-center text-white/40 hover:text-white/70 text-[10px] md:text-xs transition-colors">
              <Phone className="h-3 w-3 mr-1" />
              Need immediate support? Access crisis resources
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 z-10 transition-all duration-1000 ${phase === 23 ? 'opacity-50 animate-bounce' : 'opacity-0'}`}>
        <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-white/40" />
      </div>
    </section>
  )
}

export default HeroAnimation
