import Link from 'next/link';
import { keyStage2Curriculum } from '@/lib/data/curriculum';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            English Learning Hub
          </h1>
          <p className="text-xl text-gray-600">
            Key Stage 2 English Curriculum (Years 3-6)
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {Object.entries(keyStage2Curriculum).map(([yearKey, yearData]) => (
            <div
              key={yearKey}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <h2 className="text-3xl font-bold mb-6 text-indigo-600">
                {yearData.title}
              </h2>

              <div className="space-y-4">
                {yearData.topics.map((topic) => (
                  <div
                    key={topic.id}
                    className="border-l-4 border-indigo-400 pl-4"
                  >
                    <h3 className="text-xl font-semibold text-gray-800">
                      {topic.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{topic.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {topic.lessons.map((lesson) => (
                        <Link
                          key={lesson.id}
                          href={`/lessons/${lesson.id}`}
                          className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm hover:bg-indigo-200 transition-colors"
                        >
                          {lesson.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href={`/year/${yearKey}`}
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Explore {yearData.title} →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center space-y-6">
          <div>
            <Link
              href="/diagnostic-test"
              className="inline-flex items-center px-8 py-4 bg-purple-600 text-white text-lg rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
            >
              <span className="text-2xl mr-3">🎯</span>
              Take Diagnostic Test
            </Link>
            <p className="mt-3 text-gray-600">
              Assess current English skills and get personalised recommendations
            </p>
          </div>

          <div className="text-gray-400">— OR —</div>

          <div>
            <Link
              href="/scheme-of-work"
              className="inline-flex items-center px-8 py-4 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              <span className="text-2xl mr-3">📝</span>
              Generate Scheme of Work
            </Link>
            <p className="mt-3 text-gray-600">
              Create customised learning plans directly
            </p>
          </div>
        </div>

        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Learning Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="font-semibold text-lg mb-2">Interactive Lessons</h3>
              <p className="text-gray-600">
                Engaging content aligned with UK curriculum standards
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-4xl mb-3">✏️</div>
              <h3 className="font-semibold text-lg mb-2">Practice Activities</h3>
              <p className="text-gray-600">
                Exercises to reinforce learning with instant feedback
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-semibold text-lg mb-2">Progress Tracking</h3>
              <p className="text-gray-600">
                Monitor student progress and identify areas for improvement
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
