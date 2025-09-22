'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ActivityTracker } from '@/lib/utils/activity-tracker';
import {
  diagnosticQuestions,
  analyzeTestResults,
  type DiagnosticReport
} from '@/lib/data/diagnostic-test';

export default function DiagnosticTest() {
  const router = useRouter();
  const [childName, setChildName] = useState('');
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, string>>(new Map());
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [testComplete, setTestComplete] = useState(false);
  const [report, setReport] = useState<DiagnosticReport | null>(null);

  const currentQuestion = diagnosticQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / diagnosticQuestions.length) * 100;

  const startTest = () => {
    if (childName.trim()) {
      setTestStarted(true);
    }
  };

  const submitAnswer = () => {
    if (currentAnswer) {
      const newAnswers = new Map(answers);
      newAnswers.set(currentQuestion.id, currentAnswer);
      setAnswers(newAnswers);
      setCurrentAnswer('');

      if (currentQuestionIndex < diagnosticQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Test complete
        const testReport = analyzeTestResults(newAnswers, childName);
        setReport(testReport);
        setTestComplete(true);

        // Track test completion
        ActivityTracker.addActivity({
          type: 'test',
          title: `Diagnostic Test - ${childName}`,
          link: '/diagnostic-test',
          metadata: {
            score: testReport.overallScore,
            recommendedYear: testReport.recommendedYear
          }
        });
      }
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const previousAnswer = answers.get(diagnosticQuestions[currentQuestionIndex - 1].id);
      setCurrentAnswer(previousAnswer || '');
    }
  };

  const navigateToSOW = () => {
    if (report) {
      const childProfile = {
        name: report.childName,
        yearGroup: report.recommendedYear,
        learningStyle: report.learningStyleIndicator,
        pace: report.paceRecommendation,
        strengths: report.strengths,
        areasForImprovement: report.focusAreas,
        diagnosticScore: report.overallScore
      };

      // Store in sessionStorage to pass to SOW generator
      sessionStorage.setItem('diagnosticChild', JSON.stringify(childProfile));
      router.push('/scheme-of-work');
    }
  };

  if (!testStarted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm mb-4 inline-block">
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              English Diagnostic Test
            </h1>
            <p className="text-lg text-gray-600">
              Key Stage 2 Assessment (Years 3-6)
            </p>
          </header>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Welcome to the Diagnostic Test
              </h2>

              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">What this test does:</h3>
                  <ul className="list-disc list-inside text-blue-700 space-y-1">
                    <li>Assesses current English skills across key areas</li>
                    <li>Identifies strengths and areas for improvement</li>
                    <li>Recommends appropriate year level content</li>
                    <li>Suggests personalized learning approach</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Test includes:</h3>
                  <ul className="list-disc list-inside text-green-700 space-y-1">
                    <li>Spelling and vocabulary questions</li>
                    <li>Grammar and punctuation exercises</li>
                    <li>Reading comprehension tasks</li>
                    <li>Writing skill assessment</li>
                    <li>Takes approximately 20-30 minutes</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Child&apos;s Name
                  </label>
                  <input
                    type="text"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter child's name"
                  />
                </div>

                <button
                  onClick={startTest}
                  disabled={!childName.trim()}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
                >
                  Start Diagnostic Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (testComplete && report) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Diagnostic Test Complete
            </h1>
            <p className="text-lg text-gray-600">
              Results for {report.childName}
            </p>
          </header>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">
                    {report.overallScore}%
                  </div>
                  <p className="text-gray-600">Overall Score</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-600">
                    {report.recommendedYear}
                  </div>
                  <p className="text-gray-600">Recommended Level</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 capitalize">
                    {report.paceRecommendation}
                  </div>
                  <p className="text-gray-600">Learning Pace</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold mb-4">Performance by Category</h3>
                <div className="space-y-3">
                  {report.results.map((result) => (
                    <div key={result.category}>
                      <div className="flex justify-between mb-1">
                        <span className="capitalize font-medium">{result.category}</span>
                        <span className="text-gray-600">
                          {result.score}/{result.maxScore} ({result.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${
                            result.percentage >= 70
                              ? 'bg-green-500'
                              : result.percentage >= 50
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${result.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-green-600">Strengths</h3>
                <ul className="space-y-2">
                  {report.strengths.length > 0 ? (
                    report.strengths.map((strength, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="capitalize">{strength}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">Building foundational skills</li>
                  )}
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-orange-600">Focus Areas</h3>
                <ul className="space-y-2">
                  {report.focusAreas.length > 0 ? (
                    report.focusAreas.map((area, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-orange-500 mr-2">!</span>
                        <span className="capitalize">{area}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">Continue current learning path</li>
                  )}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Recommendations</h3>
              <div className="space-y-3">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-blue-900 font-medium mb-2">
                    Learning Style: <span className="capitalize">{report.learningStyleIndicator}</span>
                  </p>
                  <p className="text-blue-700 text-sm">
                    {report.learningStyleIndicator === 'visual' && 'Use diagrams, charts, and visual aids to support learning.'}
                    {report.learningStyleIndicator === 'auditory' && 'Include discussions, audio resources, and verbal explanations.'}
                    {report.learningStyleIndicator === 'kinesthetic' && 'Incorporate hands-on activities and movement-based learning.'}
                    {report.learningStyleIndicator === 'mixed' && 'Use a variety of teaching methods to engage different senses.'}
                  </p>
                </div>

                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {report.recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={navigateToSOW}
                className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
              >
                Generate Personalised Scheme of Work
              </button>

              <button
                onClick={() => window.print()}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                Print Report
              </button>

              <Link
                href="/"
                className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-900">
                Diagnostic Test - {childName}
              </h1>
              <span className="text-lg text-gray-700 font-medium">
                Question {currentQuestionIndex + 1} of {diagnosticQuestions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
              <div
                className="bg-gradient-to-r from-blue-500 to-red-500 h-4 rounded-full transition-all duration-300 shadow-sm"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-10">
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-base font-medium capitalize">
                {currentQuestion.category} - Year {currentQuestion.yearLevel} Level
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
              {currentQuestion.question}
            </h2>

            {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
              <div className="space-y-4">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentAnswer(option)}
                    className={`w-full text-left p-6 rounded-xl border-2 transition-all text-lg text-gray-900 ${
                      currentAnswer === option
                        ? 'border-blue-500 bg-blue-50 font-semibold shadow-md'
                        : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50 bg-white'
                    }`}
                  >
                    <span className="flex items-center">
                      <span className={`mr-4 w-10 h-10 rounded-full border-2 flex items-center justify-center text-base font-bold ${
                        currentAnswer === option
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'border-gray-400 text-gray-600 bg-white'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-gray-900">{option}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'fill-blank' && (
              <div>
                <input
                  type="text"
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  className="w-full px-6 py-4 text-lg text-gray-900 bg-white border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Type your answer here..."
                  autoFocus
                />
              </div>
            )}

            {currentQuestion.type === 'true-false' && (
              <div className="space-y-4">
                {['True', 'False'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setCurrentAnswer(option)}
                    className={`w-full text-left p-6 rounded-xl border-2 transition-all text-lg text-gray-900 ${
                      currentAnswer === option
                        ? 'border-blue-500 bg-blue-50 font-semibold shadow-md'
                        : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50 bg-white'
                    }`}
                  >
                    <span className="flex items-center justify-center">
                      <span className={`text-xl font-bold ${
                        currentAnswer === option ? 'text-blue-600' : 'text-gray-700'
                      }`}>
                        {option}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            )}

            <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
              <button
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-8 py-3 text-lg bg-gray-500 text-white rounded-xl hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition-colors"
              >
                ← Previous
              </button>

              <button
                onClick={submitAnswer}
                disabled={!currentAnswer}
                className="px-8 py-3 text-lg bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium transition-colors"
              >
                {currentQuestionIndex === diagnosticQuestions.length - 1 ? 'Finish Test 🎯' : 'Next Question →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}