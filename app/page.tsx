'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface RecentActivity {
  type: 'lesson' | 'test' | 'sow';
  title: string;
  date: string;
  link: string;
}

export default function Home() {
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);

  useEffect(() => {
    // Load recent activities from localStorage
    const stored = localStorage.getItem('recentActivities');
    if (stored) {
      setRecentActivities(JSON.parse(stored));
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">
            English Learning Hub
          </h1>
          <p className="text-2xl text-gray-600">
            Key Stage 2 Curriculum • Years 3-6
          </p>
        </header>

        {/* Main Action Buttons */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Diagnostic Test Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
                <div className="text-5xl mb-4">🎯</div>
                <h2 className="text-3xl font-bold mb-2">Student Testing</h2>
                <p className="text-blue-100">
                  Assess current skills & get recommendations
                </p>
              </div>
              <div className="p-8">
                <ul className="space-y-2 mb-6 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>20-30 minute diagnostic assessment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Covers all key English skills</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Personalized learning recommendations</span>
                  </li>
                </ul>
                <Link
                  href="/diagnostic-test"
                  className="block w-full py-4 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
                >
                  Start Diagnostic Test
                </Link>
              </div>
            </div>

            {/* Study Plan Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform">
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-white">
                <div className="text-5xl mb-4">📝</div>
                <h2 className="text-3xl font-bold mb-2">Study Plans</h2>
                <p className="text-red-100">
                  Create personalised schemes of work
                </p>
              </div>
              <div className="p-8">
                <ul className="space-y-2 mb-6 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    <span>Customizable weekly schedules</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    <span>Multiple children profiles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✓</span>
                    <span>Printable lesson plans</span>
                  </li>
                </ul>
                <Link
                  href="/scheme-of-work"
                  className="block w-full py-4 bg-red-600 text-white text-center rounded-lg hover:bg-red-700 transition-colors font-semibold text-lg"
                >
                  Create Study Plan
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Resume Learning Section */}
        {recentActivities.length > 0 && (
          <div className="max-w-5xl mx-auto mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-3xl mr-3">🔄</span>
                Resume Learning
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {recentActivities.slice(0, 3).map((activity, idx) => (
                  <Link
                    key={idx}
                    href={activity.link}
                    className="block p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-2xl mb-2">
                          {activity.type === 'lesson' && '📖'}
                          {activity.type === 'test' && '🎯'}
                          {activity.type === 'sow' && '📝'}
                        </div>
                        <p className="font-semibold text-gray-800">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                      <span className="text-blue-600">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quick Access to Lessons */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Quick Access to Lessons
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid md:grid-cols-4 gap-6">
              <Link
                href="/lessons/prefixes-1"
                className="text-center group"
              >
                <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
                  <span className="text-3xl">📚</span>
                </div>
                <h3 className="font-semibold text-gray-800">Year 3</h3>
                <p className="text-sm text-gray-600">Prefixes & Suffixes</p>
              </Link>

              <Link
                href="/lessons/sentences-1"
                className="text-center group"
              >
                <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3 group-hover:bg-red-200 transition-colors">
                  <span className="text-3xl">✏️</span>
                </div>
                <h3 className="font-semibold text-gray-800">Year 4</h3>
                <p className="text-sm text-gray-600">Sentence Types</p>
              </Link>

              <Link
                href="/lessons/prefixes-1"
                className="text-center group"
              >
                <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
                  <span className="text-3xl">📖</span>
                </div>
                <h3 className="font-semibold text-gray-800">Year 5</h3>
                <p className="text-sm text-gray-600">Advanced Grammar</p>
              </Link>

              <Link
                href="/lessons/sentences-1"
                className="text-center group"
              >
                <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3 group-hover:bg-red-200 transition-colors">
                  <span className="text-3xl">🎓</span>
                </div>
                <h3 className="font-semibold text-gray-800">Year 6</h3>
                <p className="text-sm text-gray-600">SATs Preparation</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Platform Features
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-semibold mb-1">Progress Tracking</h3>
              <p className="text-sm text-gray-600">Monitor improvement</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold mb-1">Adaptive Learning</h3>
              <p className="text-sm text-gray-600">Personalized paths</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="font-semibold mb-1">Full Curriculum</h3>
              <p className="text-sm text-gray-600">Years 3-6 coverage</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <div className="text-3xl mb-3">🖨️</div>
              <h3 className="font-semibold mb-1">Printable Resources</h3>
              <p className="text-sm text-gray-600">Offline learning</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-600">
          <p>© 2024 English Learning Hub • Key Stage 2 Curriculum</p>
        </footer>
      </div>
    </main>
  );
}