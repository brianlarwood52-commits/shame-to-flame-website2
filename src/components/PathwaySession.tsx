import React, { useState } from 'react';
import { CheckCircle, Circle, ArrowRight, ArrowLeft, BookOpen, Heart, MessageCircle } from 'lucide-react';
import BibleVerseLoader from './BibleVerseLoader';
import { PathwaySession as PathwaySessionType } from '../data/healingPathways';

interface PathwaySessionProps {
  session: PathwaySessionType;
  onComplete?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const PathwaySession: React.FC<PathwaySessionProps> = ({
  session,
  onComplete,
  onNext,
  onPrevious,
  isFirst = false,
  isLast = false
}) => {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [reflectionAnswers, setReflectionAnswers] = useState<{ [key: number]: string }>({});

  const toggleStepCompletion = (stepIndex: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepIndex)) {
      newCompleted.delete(stepIndex);
    } else {
      newCompleted.add(stepIndex);
    }
    setCompletedSteps(newCompleted);
  };

  const updateReflectionAnswer = (questionIndex: number, answer: string) => {
    setReflectionAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const allStepsCompleted = completedSteps.size === session.practicalSteps.length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-flame-500 to-flame-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold mb-2">
                Session {session.id}: {session.title}
              </h1>
              <p className="text-flame-100 leading-relaxed">
                {session.description}
              </p>
            </div>
            <div className="text-right">
              <div className="text-flame-200 text-sm">Progress</div>
              <div className="text-2xl font-bold">
                {completedSteps.size}/{session.practicalSteps.length}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Key Verses */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <BookOpen className="h-6 w-6 text-flame-500 mr-2" />
              Key Verses
            </h2>
            <div className="space-y-4">
              {session.keyVerses.map((verse, index) => (
                <BibleVerseLoader
                  key={index}
                  reference={verse}
                  className="mb-4"
                />
              ))}
            </div>
          </section>

          {/* Reflection Questions */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <MessageCircle className="h-6 w-6 text-sky-500 mr-2" />
              Reflection Questions
            </h2>
            <div className="space-y-6">
              {session.reflectionQuestions.map((question, index) => (
                <div key={index} className="bg-sky-50/90 dark:bg-sky-900/30 rounded-lg p-4 border border-sky-200/50 dark:border-sky-700/50">
                  <h3 className="font-medium text-gray-800 dark:text-white mb-3">
                    {index + 1}. {question}
                  </h3>
                  <textarea
                    value={reflectionAnswers[index] || ''}
                    onChange={(e) => updateReflectionAnswer(index, e.target.value)}
                    placeholder="Take time to reflect and write your thoughts here..."
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                    rows={4}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Practical Steps */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <CheckCircle className="h-6 w-6 text-sage-500 mr-2" />
              Practical Steps
            </h2>
            <div className="space-y-3">
              {session.practicalSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                    completedSteps.has(index)
                      ? 'bg-sage-50 dark:bg-sage-900/30 border-sage-300 dark:border-sage-700'
                      : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:bg-sage-50 dark:hover:bg-sage-900/20'
                  }`}
                  onClick={() => toggleStepCompletion(index)}
                >
                  {completedSteps.has(index) ? (
                    <CheckCircle className="h-6 w-6 text-sage-600 dark:text-sage-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className={`leading-relaxed ${
                      completedSteps.has(index)
                        ? 'text-sage-800 dark:text-sage-200'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Prayer */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <Heart className="h-6 w-6 text-flame-500 mr-2" />
              Closing Prayer
            </h2>
            <div className="bg-gradient-to-r from-flame-50 to-orange-50 dark:from-flame-900/30 dark:to-orange-900/30 rounded-lg p-6 border border-flame-200/50 dark:border-flame-700/50">
              <p className="text-gray-700 dark:text-gray-200 italic leading-relaxed">
                "{session.prayer}"
              </p>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onPrevious}
              disabled={isFirst}
              className={`inline-flex items-center px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                isFirst
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Session
            </button>

            <div className="flex items-center space-x-4">
              {allStepsCompleted && (
                <button
                  onClick={onComplete}
                  className="inline-flex items-center px-6 py-3 bg-sage-600 hover:bg-sage-700 text-white font-medium rounded-full transition-all duration-200 transform hover:scale-105"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Complete
                </button>
              )}

              <button
                onClick={onNext}
                disabled={isLast}
                className={`inline-flex items-center px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  isLast
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'bg-flame-600 hover:bg-flame-700 text-white transform hover:scale-105'
                }`}
              >
                Next Session
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathwaySession;