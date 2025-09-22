'use client';

import { Suspense } from 'react';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PrintScheme {
  childName: string;
  yearGroup: string;
  term: string;
  weeks: Array<{
    week: number;
    topic: string;
    lessons: Array<{
      day: string;
      subject: string;
      objective: string;
      duration: string;
      activities: string[];
      resources: string[];
      assessment?: string;
    }>;
  }>;
}

function PrintSchemeContent() {
  const searchParams = useSearchParams();
  const [scheme, setScheme] = useState<PrintScheme | null>(null);

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      try {
        setScheme(JSON.parse(decodeURIComponent(data)));
      } catch {
        console.error('Failed to parse scheme data');
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (scheme) {
      setTimeout(() => window.print(), 500);
    }
  }, [scheme]);

  if (!scheme) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto print:p-0">
      <style jsx global>{`
        @media print {
          @page {
            margin: 1cm;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
          .page-break {
            page-break-after: always;
          }
        }
      `}</style>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Scheme of Work</h1>
        <div className="text-lg">
          <p><strong>Student:</strong> {scheme.childName}</p>
          <p><strong>Year Group:</strong> {scheme.yearGroup}</p>
          <p><strong>Term:</strong> {scheme.term}</p>
          <p><strong>Generated:</strong> {new Date().toLocaleDateString('en-GB')}</p>
        </div>
      </div>

      {scheme.weeks.map((week, weekIndex) => (
        <div key={weekIndex} className={weekIndex > 0 ? 'page-break' : ''}>
          <div className="border-2 border-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">
              Week {week.week}: {week.topic}
            </h2>

            <div className="space-y-4">
              {week.lessons.map((lesson, lessonIndex) => (
                <div key={lessonIndex} className="border-l-4 border-indigo-600 pl-4">
                  <h3 className="font-bold text-lg mb-2">
                    {lesson.day} - {lesson.subject}
                  </h3>

                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div>
                      <strong>Objective:</strong> {lesson.objective}
                    </div>

                    <div>
                      <strong>Duration:</strong> {lesson.duration}
                    </div>

                    <div>
                      <strong>Activities:</strong>
                      <ul className="list-disc list-inside ml-2">
                        {lesson.activities.slice(0, 4).map((activity, i) => (
                          <li key={i}>{activity}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <strong>Resources:</strong>
                      <ul className="list-disc list-inside ml-2">
                        {lesson.resources.slice(0, 3).map((resource, i) => (
                          <li key={i}>{resource}</li>
                        ))}
                      </ul>
                    </div>

                    {lesson.assessment && (
                      <div>
                        <strong>Assessment:</strong> {lesson.assessment}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-semibold mb-2">Notes for Week {week.week}:</h3>
            <div className="h-20 border-b border-gray-300"></div>
          </div>
        </div>
      ))}

      <button
        onClick={() => window.print()}
        className="no-print fixed bottom-4 right-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-lg"
      >
        Print Scheme
      </button>
    </div>
  );
}

export default function PrintSchemeOfWork() {
  return (
    <Suspense fallback={<div className="p-8">Loading...</div>}>
      <PrintSchemeContent />
    </Suspense>
  );
}