export interface TestQuestion {
  id: string;
  category: 'spelling' | 'grammar' | 'reading' | 'writing' | 'vocabulary';
  yearLevel: number;
  question: string;
  type: 'multiple-choice' | 'fill-blank' | 'true-false' | 'written';
  options?: string[];
  correctAnswer: string | string[];
  points: number;
  skill: string;
  image?: string;
}

export interface TestResult {
  category: string;
  score: number;
  maxScore: number;
  percentage: number;
  strengths: string[];
  weaknesses: string[];
  yearLevelEquivalent: number;
}

export interface DiagnosticReport {
  childName: string;
  testDate: Date;
  overallScore: number;
  recommendedYear: string;
  results: TestResult[];
  learningStyleIndicator: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
  paceRecommendation: 'supported' | 'standard' | 'accelerated';
  focusAreas: string[];
  strengths: string[];
  recommendations: string[];
}

// Diagnostic test questions organized by year and difficulty
export const diagnosticQuestions: TestQuestion[] = [
  // Year 3 Level Questions
  {
    id: 'sp3-1',
    category: 'spelling',
    yearLevel: 3,
    question: 'Which word is spelled correctly?',
    type: 'multiple-choice',
    options: ['happyness', 'happiness', 'hapiness', 'happines'],
    correctAnswer: 'happiness',
    points: 1,
    skill: 'suffix-spelling'
  },
  {
    id: 'sp3-2',
    category: 'spelling',
    yearLevel: 3,
    question: 'Add the prefix "un" to make the opposite of "kind":',
    type: 'fill-blank',
    correctAnswer: 'unkind',
    points: 1,
    skill: 'prefixes'
  },
  {
    id: 'gr3-1',
    category: 'grammar',
    yearLevel: 3,
    question: 'What type of sentence is this? "What a beautiful day!"',
    type: 'multiple-choice',
    options: ['Statement', 'Question', 'Command', 'Exclamation'],
    correctAnswer: 'Exclamation',
    points: 2,
    skill: 'sentence-types'
  },
  {
    id: 'gr3-2',
    category: 'grammar',
    yearLevel: 3,
    question: 'Choose the correct conjunction: "I wanted to play ___ it was raining."',
    type: 'multiple-choice',
    options: ['but', 'and', 'so', 'or'],
    correctAnswer: 'but',
    points: 2,
    skill: 'conjunctions'
  },
  {
    id: 'rd3-1',
    category: 'reading',
    yearLevel: 3,
    question: 'Read this sentence: "The cat crept quietly through the garden." What does "crept" mean?',
    type: 'multiple-choice',
    options: ['ran quickly', 'moved slowly and carefully', 'jumped high', 'sat still'],
    correctAnswer: 'moved slowly and carefully',
    points: 2,
    skill: 'vocabulary-context'
  },
  {
    id: 'vo3-1',
    category: 'vocabulary',
    yearLevel: 3,
    question: 'Which word means the same as "big"?',
    type: 'multiple-choice',
    options: ['tiny', 'large', 'thin', 'short'],
    correctAnswer: 'large',
    points: 1,
    skill: 'synonyms'
  },

  // Year 4 Level Questions
  {
    id: 'sp4-1',
    category: 'spelling',
    yearLevel: 4,
    question: 'Complete the word: "dis______ (to not like)"',
    type: 'fill-blank',
    correctAnswer: 'dislike',
    points: 2,
    skill: 'prefixes'
  },
  {
    id: 'sp4-2',
    category: 'spelling',
    yearLevel: 4,
    question: 'Which plural is correct for "baby"?',
    type: 'multiple-choice',
    options: ['babys', 'babies', 'babyes', 'babyies'],
    correctAnswer: 'babies',
    points: 2,
    skill: 'plurals'
  },
  {
    id: 'gr4-1',
    category: 'grammar',
    yearLevel: 4,
    question: 'Where should the apostrophe go? "The dogs bowl"',
    type: 'multiple-choice',
    options: ["dog's bowl", "dogs' bowl", "do'gs bowl", "dogs bowl'"],
    correctAnswer: "dog's bowl",
    points: 2,
    skill: 'apostrophes-possession'
  },
  {
    id: 'gr4-2',
    category: 'grammar',
    yearLevel: 4,
    question: 'Identify the main clause: "When the bell rang, the children ran outside."',
    type: 'multiple-choice',
    options: ['When the bell rang', 'the children ran outside', 'the bell rang', 'ran outside'],
    correctAnswer: 'the children ran outside',
    points: 3,
    skill: 'clauses'
  },
  {
    id: 'rd4-1',
    category: 'reading',
    yearLevel: 4,
    question: 'What is the purpose of a heading in a non-fiction text?',
    type: 'multiple-choice',
    options: [
      'To make the text look nice',
      'To tell you what that section is about',
      'To confuse the reader',
      'To end the text'
    ],
    correctAnswer: 'To tell you what that section is about',
    points: 2,
    skill: 'text-features'
  },
  {
    id: 'wr4-1',
    category: 'writing',
    yearLevel: 4,
    question: 'What should every paragraph have at the beginning?',
    type: 'multiple-choice',
    options: ['A question', 'A topic sentence', 'A quote', 'A number'],
    correctAnswer: 'A topic sentence',
    points: 2,
    skill: 'paragraph-structure'
  },

  // Year 5 Level Questions
  {
    id: 'sp5-1',
    category: 'spelling',
    yearLevel: 5,
    question: 'Which word has a silent letter?',
    type: 'multiple-choice',
    options: ['cat', 'knock', 'jump', 'green'],
    correctAnswer: 'knock',
    points: 2,
    skill: 'silent-letters'
  },
  {
    id: 'sp5-2',
    category: 'spelling',
    yearLevel: 5,
    question: 'Complete: "ambi_____ (having two possible meanings)"',
    type: 'fill-blank',
    correctAnswer: 'ambiguous',
    points: 3,
    skill: 'advanced-vocabulary'
  },
  {
    id: 'gr5-1',
    category: 'grammar',
    yearLevel: 5,
    question: 'Which modal verb shows possibility? "You ___ be right."',
    type: 'multiple-choice',
    options: ['must', 'might', 'will', 'shall'],
    correctAnswer: 'might',
    points: 3,
    skill: 'modal-verbs'
  },
  {
    id: 'gr5-2',
    category: 'grammar',
    yearLevel: 5,
    question: 'Which sentence uses parenthesis correctly?',
    type: 'multiple-choice',
    options: [
      'My friend (who lives nearby) is coming.',
      'My friend who lives (nearby) is coming.',
      'My (friend) who lives nearby is coming.',
      '(My friend who lives) nearby is coming.'
    ],
    correctAnswer: 'My friend (who lives nearby) is coming.',
    points: 3,
    skill: 'parenthesis'
  },
  {
    id: 'rd5-1',
    category: 'reading',
    yearLevel: 5,
    question: 'What literary device is used in "The stars danced in the sky"?',
    type: 'multiple-choice',
    options: ['Simile', 'Metaphor', 'Personification', 'Alliteration'],
    correctAnswer: 'Personification',
    points: 3,
    skill: 'figurative-language'
  },
  {
    id: 'vo5-1',
    category: 'vocabulary',
    yearLevel: 5,
    question: 'What does "benevolent" mean?',
    type: 'multiple-choice',
    options: ['evil', 'kind and helpful', 'angry', 'confused'],
    correctAnswer: 'kind and helpful',
    points: 3,
    skill: 'advanced-vocabulary'
  },

  // Year 6 Level Questions
  {
    id: 'sp6-1',
    category: 'spelling',
    yearLevel: 6,
    question: 'Which word uses a hyphen correctly?',
    type: 'multiple-choice',
    options: ['re-cover (to cover again)', 'hap-py', 'beauti-ful', 'run-ning'],
    correctAnswer: 're-cover (to cover again)',
    points: 3,
    skill: 'hyphens'
  },
  {
    id: 'gr6-1',
    category: 'grammar',
    yearLevel: 6,
    question: 'Which sentence is in the passive voice?',
    type: 'multiple-choice',
    options: [
      'The boy kicked the ball.',
      'The ball was kicked by the boy.',
      'The boy will kick the ball.',
      'Kick the ball!'
    ],
    correctAnswer: 'The ball was kicked by the boy.',
    points: 4,
    skill: 'passive-voice'
  },
  {
    id: 'gr6-2',
    category: 'grammar',
    yearLevel: 6,
    question: 'Which sentence uses the subjunctive mood?',
    type: 'multiple-choice',
    options: [
      'If I was rich, I would travel.',
      'If I were rich, I would travel.',
      'I am rich and I travel.',
      'I will be rich and travel.'
    ],
    correctAnswer: 'If I were rich, I would travel.',
    points: 4,
    skill: 'subjunctive'
  },
  {
    id: 'rd6-1',
    category: 'reading',
    yearLevel: 6,
    question: 'What is the author\'s purpose in a persuasive text?',
    type: 'multiple-choice',
    options: [
      'To entertain the reader',
      'To convince the reader of something',
      'To provide information',
      'To describe a scene'
    ],
    correctAnswer: 'To convince the reader of something',
    points: 3,
    skill: 'author-purpose'
  },
  {
    id: 'wr6-1',
    category: 'writing',
    yearLevel: 6,
    question: 'What technique creates cohesion between paragraphs?',
    type: 'multiple-choice',
    options: [
      'Using random words',
      'Starting every sentence the same',
      'Using linking phrases and pronouns',
      'Making paragraphs very short'
    ],
    correctAnswer: 'Using linking phrases and pronouns',
    points: 3,
    skill: 'cohesion'
  },
  {
    id: 'vo6-1',
    category: 'vocabulary',
    yearLevel: 6,
    question: 'Choose the formal version: "The results were really bad"',
    type: 'multiple-choice',
    options: [
      'The results were super terrible',
      'The results were disappointing',
      'The results were rubbish',
      'The results were not good'
    ],
    correctAnswer: 'The results were disappointing',
    points: 3,
    skill: 'formal-language'
  }
];

export function analyzeTestResults(
  answers: Map<string, string>,
  childName: string
): DiagnosticReport {
  const results: Map<string, TestResult> = new Map();
  const categories = ['spelling', 'grammar', 'reading', 'writing', 'vocabulary'];

  // Initialize result categories
  categories.forEach(cat => {
    results.set(cat, {
      category: cat,
      score: 0,
      maxScore: 0,
      percentage: 0,
      strengths: [],
      weaknesses: [],
      yearLevelEquivalent: 3
    });
  });

  // Score answers
  let totalScore = 0;
  let totalMaxScore = 0;
  const skillScores: Map<string, { correct: number; total: number }> = new Map();

  diagnosticQuestions.forEach(question => {
    const result = results.get(question.category)!;
    result.maxScore += question.points;
    totalMaxScore += question.points;

    const userAnswer = answers.get(question.id);
    const isCorrect = userAnswer === question.correctAnswer ||
      (Array.isArray(question.correctAnswer) && question.correctAnswer.includes(userAnswer || ''));

    if (isCorrect) {
      result.score += question.points;
      totalScore += question.points;
    }

    // Track skill performance
    if (!skillScores.has(question.skill)) {
      skillScores.set(question.skill, { correct: 0, total: 0 });
    }
    const skillScore = skillScores.get(question.skill)!;
    skillScore.total += 1;
    if (isCorrect) skillScore.correct += 1;
  });

  // Calculate percentages and year level equivalents
  const yearLevelScores: Map<number, number> = new Map();
  results.forEach((result, category) => {
    result.percentage = result.maxScore > 0 ? Math.round((result.score / result.maxScore) * 100) : 0;

    // Estimate year level based on performance
    if (result.percentage >= 80) result.yearLevelEquivalent = 6;
    else if (result.percentage >= 70) result.yearLevelEquivalent = 5;
    else if (result.percentage >= 60) result.yearLevelEquivalent = 4;
    else result.yearLevelEquivalent = 3;

    yearLevelScores.set(result.yearLevelEquivalent,
      (yearLevelScores.get(result.yearLevelEquivalent) || 0) + 1);
  });

  // Identify strengths and weaknesses by skill
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const focusAreas: string[] = [];

  skillScores.forEach((score, skill) => {
    const percentage = (score.correct / score.total) * 100;
    if (percentage >= 80) {
      strengths.push(skill.replace(/-/g, ' '));
    } else if (percentage < 50) {
      weaknesses.push(skill.replace(/-/g, ' '));
      focusAreas.push(skill.replace(/-/g, ' '));
    }
  });

  // Determine recommended year level
  let recommendedYear = 3;
  let maxCount = 0;
  yearLevelScores.forEach((count, year) => {
    if (count > maxCount) {
      maxCount = count;
      recommendedYear = year;
    }
  });

  // Determine learning style based on question performance patterns
  const overallPercentage = (totalScore / totalMaxScore) * 100;
  let learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed' = 'mixed';

  // This is simplified - in a real app, you'd have questions designed to assess learning style
  const readingResult = results.get('reading')!;
  const writingResult = results.get('writing')!;

  if (readingResult.percentage > writingResult.percentage + 20) {
    learningStyle = 'visual';
  } else if (writingResult.percentage > readingResult.percentage + 20) {
    learningStyle = 'kinesthetic';
  }

  // Determine pace recommendation
  let paceRecommendation: 'supported' | 'standard' | 'accelerated' = 'standard';
  if (overallPercentage >= 85) {
    paceRecommendation = 'accelerated';
  } else if (overallPercentage < 60) {
    paceRecommendation = 'supported';
  }

  // Generate recommendations
  const recommendations: string[] = [];

  if (paceRecommendation === 'supported') {
    recommendations.push('Start with foundational skills and provide extra practice time');
    recommendations.push('Use multi-sensory learning approaches');
    recommendations.push('Break lessons into smaller, manageable chunks');
  } else if (paceRecommendation === 'accelerated') {
    recommendations.push('Include extension activities and challenges');
    recommendations.push('Introduce Year ' + (recommendedYear + 1) + ' concepts gradually');
    recommendations.push('Encourage independent research projects');
  }

  results.forEach(result => {
    if (result.percentage < 60) {
      recommendations.push(`Focus on ${result.category} with additional exercises`);
    }
  });

  if (focusAreas.length > 0) {
    recommendations.push(`Priority areas for improvement: ${focusAreas.join(', ')}`);
  }

  return {
    childName,
    testDate: new Date(),
    overallScore: Math.round(overallPercentage),
    recommendedYear: `Year ${recommendedYear}`,
    results: Array.from(results.values()),
    learningStyleIndicator: learningStyle,
    paceRecommendation,
    focusAreas,
    strengths,
    recommendations
  };
}