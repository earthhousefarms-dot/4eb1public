'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Lesson {
  title: string;
  year: string;
  objectives: string[];
  content: {
    introduction: string;
    examples: Array<{
      prefix?: string;
      base?: string;
      new?: string;
      meaning?: string;
      type?: string;
      example?: string;
      punctuation?: string;
      purpose?: string;
    }>;
    practice: Array<{
      question: string;
      answer: string;
    }>;
  };
}

const sampleLessons: Record<string, Lesson> = {
  'prefixes-1': {
    title: 'Common Prefixes: un-, dis-, mis-',
    year: 'Year 3',
    objectives: [
      'Understand how prefixes change word meanings',
      'Identify common prefixes in words',
      'Use prefixes to create new words'
    ],
    content: {
      introduction: 'Prefixes are letters we add to the beginning of words to change their meaning. Today we will learn about three common prefixes: un-, dis-, and mis-.',
      examples: [
        { prefix: 'un-', base: 'happy', new: 'unhappy', meaning: 'not happy' },
        { prefix: 'dis-', base: 'like', new: 'dislike', meaning: 'not like' },
        { prefix: 'mis-', base: 'understand', new: 'misunderstand', meaning: 'understand wrongly' }
      ],
      practice: [
        { question: 'What does "unkind" mean?', answer: 'not kind' },
        { question: 'Add a prefix to "agree" to mean the opposite', answer: 'disagree' },
        { question: 'What prefix means "wrongly" or "badly"?', answer: 'mis-' }
      ]
    }
  },
  'sentences-1': {
    title: 'Types of Sentences',
    year: 'Year 3',
    objectives: [
      'Identify different sentence types',
      'Use appropriate punctuation for each sentence type',
      'Write different types of sentences'
    ],
    content: {
      introduction: 'There are four main types of sentences in English. Each type has a different purpose and uses different punctuation.',
      examples: [
        { type: 'Statement', example: 'The cat is sleeping.', punctuation: 'Full stop (.)', purpose: 'Tells us something' },
        { type: 'Question', example: 'Where is the cat?', punctuation: 'Question mark (?)', purpose: 'Asks something' },
        { type: 'Command', example: 'Feed the cat.', punctuation: 'Full stop (.)', purpose: 'Tells someone to do something' },
        { type: 'Exclamation', example: 'What a cute cat!', punctuation: 'Exclamation mark (!)', purpose: 'Shows strong feeling' }
      ],
      practice: [
        { question: 'Is this a question or statement: "The dog barked"', answer: 'statement' },
        { question: 'What punctuation goes at the end of: "How are you"', answer: '?' },
        { question: 'Write a command sentence', answer: 'Various answers possible' }
      ]
    }
  }
};

export default function LessonPage({ params }: { params: { id: string } }) {
  const [showAnswers, setShowAnswers] = useState(false);
  const lesson = sampleLessons[params.id] || sampleLessons['prefixes-1'];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <nav className="mb-6">
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
          >
            ← Back to Home
          </Link>
        </nav>

        <header className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-sm text-gray-500 mb-2">{lesson.year}</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {lesson.title}
          </h1>

          <div className="bg-indigo-50 rounded-lg p-4">
            <h2 className="font-semibold text-indigo-900 mb-2">Learning Objectives:</h2>
            <ul className="list-disc list-inside text-indigo-700 space-y-1">
              {lesson.objectives.map((obj, idx) => (
                <li key={idx}>{obj}</li>
              ))}
            </ul>
          </div>
        </header>

        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {lesson.content.introduction}
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">Examples</h3>
          <div className="space-y-4">
            {lesson.content.examples.map((example, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4">
                {example.prefix ? (
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-lg bg-indigo-100 px-3 py-1 rounded">
                      {example.prefix}
                    </span>
                    <span className="text-gray-600">+</span>
                    <span className="font-mono text-lg">{example.base}</span>
                    <span className="text-gray-600">=</span>
                    <span className="font-mono text-lg font-semibold text-indigo-600">
                      {example.new}
                    </span>
                    <span className="text-gray-600 italic ml-4">({example.meaning})</span>
                  </div>
                ) : (
                  <div>
                    <div className="font-semibold text-indigo-600 mb-2">{example.type}</div>
                    <div className="font-mono text-lg mb-1">&quot;{example.example}&quot;</div>
                    <div className="text-sm text-gray-600">
                      Punctuation: {example.punctuation} | Purpose: {example.purpose}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Practice Questions</h2>

          <div className="space-y-6">
            {lesson.content.practice.map((item, idx) => (
              <div key={idx} className="border-l-4 border-indigo-400 pl-6">
                <p className="text-lg font-medium text-gray-800 mb-3">
                  {idx + 1}. {item.question}
                </p>

                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Type your answer here..."
                  />

                  {showAnswers && (
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                      Answer: {item.answer}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {showAnswers ? 'Hide Answers' : 'Show Answers'}
            </button>

            <button
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Submit Practice
            </button>
          </div>
        </section>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to All Lessons
          </Link>
        </div>
      </div>
    </main>
  );
}