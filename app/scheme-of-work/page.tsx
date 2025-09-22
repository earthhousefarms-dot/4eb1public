'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  generateSchemeOfWork,
  type ChildProfile,
  type ScheduleOptions,
  type TermScheme
} from '@/lib/data/scheme-of-work';

export default function SchemeOfWorkGenerator() {
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [currentChild, setCurrentChild] = useState<Partial<ChildProfile>>({
    name: '',
    yearGroup: 'Year 3',
    strengths: [],
    areasForImprovement: [],
    learningStyle: 'mixed',
    pace: 'standard'
  });
  const [schedule, setSchedule] = useState<ScheduleOptions>({
    daysPerWeek: 5,
    hoursPerDay: 1,
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 9)),
    includeHolidays: true,
    terms: 3
  });
  const [generatedSchemes, setGeneratedSchemes] = useState<Record<string, TermScheme[]>>({});
  const [activeTab, setActiveTab] = useState<'setup' | 'children' | 'schedule' | 'generate'>('setup');

  const addChild = () => {
    if (currentChild.name) {
      const newChild: ChildProfile = {
        id: Date.now().toString(),
        name: currentChild.name,
        yearGroup: currentChild.yearGroup || 'Year 3',
        strengths: currentChild.strengths || [],
        areasForImprovement: currentChild.areasForImprovement || [],
        learningStyle: currentChild.learningStyle || 'mixed',
        pace: currentChild.pace || 'standard'
      };
      setChildren([...children, newChild]);
      setCurrentChild({
        name: '',
        yearGroup: 'Year 3',
        strengths: [],
        areasForImprovement: [],
        learningStyle: 'mixed',
        pace: 'standard'
      });
    }
  };

  const removeChild = (id: string) => {
    setChildren(children.filter(c => c.id !== id));
    const newSchemes = { ...generatedSchemes };
    delete newSchemes[id];
    setGeneratedSchemes(newSchemes);
  };

  const generateAllSchemes = () => {
    const newSchemes: Record<string, TermScheme[]> = {};
    children.forEach(child => {
      newSchemes[child.id] = generateSchemeOfWork(child, schedule);
    });
    setGeneratedSchemes(newSchemes);
    setActiveTab('generate');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 text-sm mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Scheme of Work Generator
          </h1>
          <p className="text-lg text-gray-600">
            Create personalized learning plans for your children
          </p>
        </header>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('setup')}
                className={`flex-1 py-4 px-6 font-semibold ${
                  activeTab === 'setup'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                1. Setup
              </button>
              <button
                onClick={() => setActiveTab('children')}
                className={`flex-1 py-4 px-6 font-semibold ${
                  activeTab === 'children'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                2. Children
              </button>
              <button
                onClick={() => setActiveTab('schedule')}
                className={`flex-1 py-4 px-6 font-semibold ${
                  activeTab === 'schedule'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                3. Schedule
              </button>
              <button
                onClick={() => setActiveTab('generate')}
                className={`flex-1 py-4 px-6 font-semibold ${
                  activeTab === 'generate'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                4. Generate
              </button>
            </div>

            <div className="p-8">
              {activeTab === 'setup' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Welcome to the Scheme of Work Generator
                  </h2>
                  <div className="bg-indigo-50 rounded-lg p-6">
                    <h3 className="font-semibold text-indigo-900 mb-3">How it works:</h3>
                    <ol className="list-decimal list-inside space-y-2 text-indigo-700">
                      <li>Add your children&apos;s profiles with their year groups and learning preferences</li>
                      <li>Set your homeschool schedule (days per week, hours per day, term dates)</li>
                      <li>Generate personalized schemes of work for each child</li>
                      <li>Print or save the generated plans for your records</li>
                    </ol>
                  </div>
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="font-semibold text-green-900 mb-3">Features:</h3>
                    <ul className="list-disc list-inside space-y-2 text-green-700">
                      <li>Aligned with UK Key Stage 2 curriculum</li>
                      <li>Customizable to each child&apos;s pace and learning style</li>
                      <li>Weekly lesson plans with objectives and activities</li>
                      <li>Resources and assessment suggestions</li>
                      <li>Printable format for easy reference</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => setActiveTab('children')}
                    className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold"
                  >
                    Get Started →
                  </button>
                </div>
              )}

              {activeTab === 'children' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Add Your Children
                  </h2>

                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Child&apos;s Name
                        </label>
                        <input
                          type="text"
                          value={currentChild.name}
                          onChange={(e) => setCurrentChild({...currentChild, name: e.target.value})}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                          placeholder="Enter name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Year Group
                        </label>
                        <select
                          value={currentChild.yearGroup}
                          onChange={(e) => setCurrentChild({...currentChild, yearGroup: e.target.value})}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="Year 3">Year 3 (Age 7-8)</option>
                          <option value="Year 4">Year 4 (Age 8-9)</option>
                          <option value="Year 5">Year 5 (Age 9-10)</option>
                          <option value="Year 6">Year 6 (Age 10-11)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Learning Style
                        </label>
                        <select
                          value={currentChild.learningStyle}
                          onChange={(e) => setCurrentChild({...currentChild, learningStyle: e.target.value as 'visual' | 'auditory' | 'kinesthetic' | 'mixed'})}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="visual">Visual Learner</option>
                          <option value="auditory">Auditory Learner</option>
                          <option value="kinesthetic">Kinesthetic Learner</option>
                          <option value="mixed">Mixed/Balanced</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Learning Pace
                        </label>
                        <select
                          value={currentChild.pace}
                          onChange={(e) => setCurrentChild({...currentChild, pace: e.target.value as 'standard' | 'accelerated' | 'supported'})}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="supported">Needs Support</option>
                          <option value="standard">Standard Pace</option>
                          <option value="accelerated">Accelerated</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={addChild}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      Add Child
                    </button>
                  </div>

                  {children.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-800">Added Children:</h3>
                      {children.map(child => (
                        <div key={child.id} className="flex items-center justify-between bg-white border rounded-lg p-4">
                          <div>
                            <p className="font-semibold">{child.name}</p>
                            <p className="text-sm text-gray-600">
                              {child.yearGroup} | {child.learningStyle} learner | {child.pace} pace
                            </p>
                          </div>
                          <button
                            onClick={() => removeChild(child.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {children.length > 0 && (
                    <button
                      onClick={() => setActiveTab('schedule')}
                      className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold"
                    >
                      Next: Set Schedule →
                    </button>
                  )}
                </div>
              )}

              {activeTab === 'schedule' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Set Your Schedule
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Days Per Week
                      </label>
                      <select
                        value={schedule.daysPerWeek}
                        onChange={(e) => setSchedule({...schedule, daysPerWeek: Number(e.target.value)})}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value={3}>3 days</option>
                        <option value={4}>4 days</option>
                        <option value={5}>5 days</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hours Per Day (English)
                      </label>
                      <select
                        value={schedule.hoursPerDay}
                        onChange={(e) => setSchedule({...schedule, hoursPerDay: Number(e.target.value)})}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value={0.5}>30 minutes</option>
                        <option value={1}>1 hour</option>
                        <option value={1.5}>1.5 hours</option>
                        <option value={2}>2 hours</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={schedule.startDate.toISOString().split('T')[0]}
                        onChange={(e) => setSchedule({...schedule, startDate: new Date(e.target.value)})}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={schedule.endDate.toISOString().split('T')[0]}
                        onChange={(e) => setSchedule({...schedule, endDate: new Date(e.target.value)})}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Terms
                      </label>
                      <select
                        value={schedule.terms}
                        onChange={(e) => setSchedule({...schedule, terms: Number(e.target.value)})}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value={1}>1 term</option>
                        <option value={2}>2 terms</option>
                        <option value={3}>3 terms</option>
                        <option value={6}>6 half-terms</option>
                      </select>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="holidays"
                        checked={schedule.includeHolidays}
                        onChange={(e) => setSchedule({...schedule, includeHolidays: e.target.checked})}
                        className="mr-2"
                      />
                      <label htmlFor="holidays" className="text-sm font-medium text-gray-700">
                        Include holiday breaks
                      </label>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-blue-800">
                      <strong>Schedule Summary:</strong> {schedule.daysPerWeek} days/week,
                      {' '}{schedule.hoursPerDay} hour(s)/day, {schedule.terms} term(s)
                    </p>
                  </div>

                  {children.length > 0 && (
                    <button
                      onClick={generateAllSchemes}
                      className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                    >
                      Generate Schemes of Work
                    </button>
                  )}
                </div>
              )}

              {activeTab === 'generate' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Generated Schemes of Work
                  </h2>

                  {Object.keys(generatedSchemes).length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">No schemes generated yet.</p>
                      <button
                        onClick={() => setActiveTab('children')}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                      >
                        Add Children First
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {children.map(child => (
                        generatedSchemes[child.id] && (
                          <div key={child.id} className="border rounded-lg overflow-hidden">
                            <div className="bg-indigo-600 text-white p-4">
                              <h3 className="text-xl font-bold">{child.name} - {child.yearGroup}</h3>
                              <p className="text-indigo-100">
                                {child.learningStyle} learner | {child.pace} pace
                              </p>
                            </div>

                            {generatedSchemes[child.id].map((term, termIndex) => (
                              <div key={termIndex} className="border-t">
                                <div className="bg-gray-50 p-4">
                                  <h4 className="font-semibold text-lg">{term.term}</h4>
                                </div>

                                <div className="p-4 space-y-4">
                                  {term.weeks.slice(0, 2).map((week, weekIndex) => (
                                    <div key={weekIndex} className="bg-white border rounded-lg p-4">
                                      <h5 className="font-semibold mb-2">
                                        Week {week.week}: {week.topic}
                                      </h5>
                                      <div className="grid md:grid-cols-2 gap-2 text-sm">
                                        {week.lessons.slice(0, 3).map((lesson, lessonIndex) => (
                                          <div key={lessonIndex} className="bg-gray-50 rounded p-2">
                                            <p className="font-medium">{lesson.day}: {lesson.subject}</p>
                                            <p className="text-gray-600 text-xs">{lesson.objective}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}

                                  {term.weeks.length > 2 && (
                                    <p className="text-gray-500 text-sm italic">
                                      ... and {term.weeks.length - 2} more weeks
                                    </p>
                                  )}
                                </div>

                                <div className="p-4 bg-gray-50 flex gap-3">
                                  <button
                                    onClick={() => {
                                      const printData = {
                                        childName: child.name,
                                        yearGroup: child.yearGroup,
                                        term: term.term,
                                        weeks: term.weeks
                                      };
                                      const url = `/scheme-of-work/print?data=${encodeURIComponent(JSON.stringify(printData))}`;
                                      window.open(url, '_blank');
                                    }}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                  >
                                    Print {term.term}
                                  </button>

                                  <button
                                    onClick={() => {
                                      const data = {
                                        childName: child.name,
                                        yearGroup: child.yearGroup,
                                        term: term.term,
                                        weeks: term.weeks
                                      };
                                      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                                      const url = URL.createObjectURL(blob);
                                      const a = document.createElement('a');
                                      a.href = url;
                                      a.download = `${child.name}-${term.term}.json`;
                                      a.click();
                                    }}
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                  >
                                    Download JSON
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}