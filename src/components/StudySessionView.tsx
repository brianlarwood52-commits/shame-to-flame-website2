'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  BookOpen,
  PenLine,
  Lightbulb,
  HandHeart,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import Disclaimer from '@/components/Disclaimer';
import type { StudySession, StudySection } from '@/lib/study-engine';
import { saveReflection, getProgress } from '@/lib/study-engine';

// ─── Props ────────────────────────────────────────────────────────────────────

export interface StudySessionViewProps {
  session: StudySession;
  pathSlug: string;
  sessionIndex: number;
  onComplete?: () => void;
}

// ─── Debounce helper ──────────────────────────────────────────────────────────

function useDebouncedCallback<T extends (...args: never[]) => void>(
  callback: T,
  delay: number,
) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay],
  );
}

// ─── Section renderers ───────────────────────────────────────────────────────

function SectionIcon({ type }: { type: StudySection['type'] }) {
  const cls = 'w-5 h-5 shrink-0';
  switch (type) {
    case 'scripture':
      return <BookOpen className={`${cls} text-sky-400`} />;
    case 'reflection':
      return <PenLine className={`${cls} text-purple-400`} />;
    case 'insight':
      return <Lightbulb className={`${cls} text-flame-400`} />;
    case 'prayer':
      return <HandHeart className={`${cls} text-flame-300`} />;
    case 'action':
      return <CheckCircle2 className={`${cls} text-sage-400`} />;
  }
}

function ScriptureBlock({ section }: { section: StudySection }) {
  return (
    <div className="rounded-xl bg-gradient-to-br from-sky-900/40 to-sky-800/20 border border-sky-700/30 p-6 sm:p-8">
      {section.title && (
        <h3 className="flex items-center gap-2 text-sky-300 font-semibold text-sm uppercase tracking-wider mb-3">
          <SectionIcon type="scripture" />
          {section.title}
        </h3>
      )}
      <p className="text-gray-300 text-sm mb-4">{section.content}</p>
      {section.verseText && (
        <blockquote className="border-l-4 border-sky-400 pl-4 sm:pl-6 py-2">
          <p className="font-serif text-lg sm:text-xl text-white leading-relaxed italic">
            {section.verseText}
          </p>
        </blockquote>
      )}
      {section.verse && (
        <p className="mt-3 text-right text-sky-400 text-sm font-medium">
          — {section.verse}
        </p>
      )}
    </div>
  );
}

function ReflectionBlock({
  section,
  value,
  onChange,
}: {
  section: StudySection;
  value: string;
  onChange: (text: string) => void;
}) {
  return (
    <div className="rounded-xl bg-gradient-to-br from-purple-900/30 to-purple-800/10 border border-purple-700/30 p-6 sm:p-8">
      {section.title && (
        <h3 className="flex items-center gap-2 text-purple-300 font-semibold text-sm uppercase tracking-wider mb-3">
          <SectionIcon type="reflection" />
          {section.title}
        </h3>
      )}
      <p className="text-gray-300 text-sm mb-2">{section.content}</p>
      {section.reflectionPrompt && (
        <p className="text-purple-200 font-medium mb-4">
          {section.reflectionPrompt}
        </p>
      )}
      <textarea
        className="w-full min-h-[120px] rounded-lg bg-gray-900/60 border border-purple-700/40 text-white placeholder-gray-500 p-4 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-y"
        placeholder="Write your thoughts here… this stays on your device."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function InsightBlock({ section }: { section: StudySection }) {
  return (
    <div className="rounded-xl bg-gradient-to-br from-flame-900/30 to-flame-800/10 border border-flame-700/30 p-6 sm:p-8">
      {section.title && (
        <h3 className="flex items-center gap-2 text-flame-300 font-semibold text-sm uppercase tracking-wider mb-3">
          <SectionIcon type="insight" />
          {section.title}
        </h3>
      )}
      <p className="text-gray-200 leading-relaxed whitespace-pre-line">
        {section.content}
      </p>
      {section.source && (
        <p className="mt-4 text-xs text-flame-400/80 italic">
          — {section.source}
        </p>
      )}
    </div>
  );
}

function PrayerBlock({ section }: { section: StudySection }) {
  return (
    <div className="rounded-xl bg-gradient-to-br from-flame-800/20 to-amber-900/20 border border-flame-600/20 p-6 sm:p-8">
      {section.title && (
        <h3 className="flex items-center gap-2 text-flame-200 font-semibold text-sm uppercase tracking-wider mb-3">
          <SectionIcon type="prayer" />
          {section.title}
        </h3>
      )}
      <p className="font-serif text-lg text-flame-100 italic leading-relaxed">
        {section.content}
      </p>
    </div>
  );
}

function ActionBlock({
  section,
  checked,
  onToggle,
}: {
  section: StudySection;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-xl bg-gradient-to-br from-sage-900/30 to-sage-800/10 border border-sage-700/30 p-6 sm:p-8">
      {section.title && (
        <h3 className="flex items-center gap-2 text-sage-300 font-semibold text-sm uppercase tracking-wider mb-3">
          <SectionIcon type="action" />
          {section.title}
        </h3>
      )}
      <div className="flex gap-4 items-start">
        <button
          type="button"
          aria-label={checked ? 'Mark incomplete' : 'Mark complete'}
          onClick={onToggle}
          className={`mt-0.5 w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
            checked
              ? 'bg-sage-500 border-sage-500 text-white'
              : 'border-sage-600 text-transparent hover:border-sage-400'
          }`}
        >
          {checked && <CheckCircle2 className="w-4 h-4" />}
        </button>
        <p
          className={`text-gray-200 leading-relaxed transition-opacity ${
            checked ? 'opacity-60 line-through' : ''
          }`}
        >
          {section.content}
        </p>
      </div>
    </div>
  );
}

// ─── Progress dots ───────────────────────────────────────────────────────────

function ProgressIndicator({
  total,
  current,
  onDotClick,
}: {
  total: number;
  current: number;
  onDotClick: (index: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to section ${i + 1}`}
          onClick={() => onDotClick(i)}
          className={`w-2.5 h-2.5 rounded-full transition-all ${
            i === current
              ? 'bg-flame-400 scale-125'
              : i < current
                ? 'bg-flame-600'
                : 'bg-gray-600'
          }`}
        />
      ))}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function StudySessionView({
  session,
  pathSlug,
  sessionIndex,
  onComplete,
}: StudySessionViewProps) {
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [reflections, setReflections] = useState<Record<number, string>>({});
  const [actionChecked, setActionChecked] = useState<Record<number, boolean>>(
    {},
  );
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Load saved reflections on mount
  useEffect(() => {
    const progress = getProgress(pathSlug);
    if (progress?.reflections?.[session.id]) {
      try {
        const saved = JSON.parse(progress.reflections[session.id]) as Record<
          number,
          string
        >;
        if (typeof saved === 'object' && saved !== null) {
          setReflections(saved);
        }
      } catch {
        // Old format — single string — ignore gracefully
      }
    }
  }, [pathSlug, session.id]);

  // Debounced save to localStorage
  const debouncedSave = useDebouncedCallback(
    (updated: Record<number, string>) => {
      saveReflection(pathSlug, session.id, JSON.stringify(updated));
    },
    600,
  );

  const handleReflectionChange = (sectionIdx: number, text: string) => {
    setReflections((prev) => {
      const next = { ...prev, [sectionIdx]: text };
      debouncedSave(next);
      return next;
    });
  };

  const scrollToSection = (idx: number) => {
    setCurrentSectionIdx(idx);
    sectionRefs.current[idx]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const handleComplete = () => {
    onComplete?.();
  };

  const totalSections = session.sections.length;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <header className="text-center space-y-3">
        <p className="text-flame-400 text-sm font-medium uppercase tracking-wider">
          Session {sessionIndex + 1}
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-white leading-tight">
          {session.title}
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">{session.description}</p>
      </header>

      {/* Progress indicator */}
      <ProgressIndicator
        total={totalSections}
        current={currentSectionIdx}
        onDotClick={scrollToSection}
      />

      {/* Scroll hint */}
      <div className="flex justify-center text-gray-500 animate-bounce">
        <ChevronDown className="w-5 h-5" />
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {session.sections.map((section, idx) => (
          <div
            key={idx}
            ref={(el) => {
              sectionRefs.current[idx] = el;
            }}
            className="scroll-mt-24"
            onFocus={() => setCurrentSectionIdx(idx)}
            onMouseEnter={() => setCurrentSectionIdx(idx)}
          >
            {section.type === 'scripture' && (
              <ScriptureBlock section={section} />
            )}
            {section.type === 'reflection' && (
              <ReflectionBlock
                section={section}
                value={reflections[idx] ?? ''}
                onChange={(text) => handleReflectionChange(idx, text)}
              />
            )}
            {section.type === 'insight' && <InsightBlock section={section} />}
            {section.type === 'prayer' && <PrayerBlock section={section} />}
            {section.type === 'action' && (
              <ActionBlock
                section={section}
                checked={!!actionChecked[idx]}
                onToggle={() =>
                  setActionChecked((prev) => ({
                    ...prev,
                    [idx]: !prev[idx],
                  }))
                }
              />
            )}
          </div>
        ))}
      </div>

      {/* Complete button */}
      <div className="flex justify-center pt-4">
        <button
          type="button"
          onClick={handleComplete}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-flame-500 to-flame-600 hover:from-flame-600 hover:to-flame-700 text-white font-semibold shadow-lg shadow-flame-500/20 transition-all hover:shadow-flame-500/40 focus:outline-none focus:ring-2 focus:ring-flame-400/50"
        >
          Complete Session
        </button>
      </div>

      {/* Disclaimer */}
      <div className="pt-6">
        <Disclaimer compact />
      </div>
    </div>
  );
}
