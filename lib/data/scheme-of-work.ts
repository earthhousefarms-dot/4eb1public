export interface WeeklyLesson {
  week: number;
  topic: string;
  lessons: {
    day: string;
    subject: string;
    objective: string;
    activities: string[];
    resources: string[];
    duration: string;
    assessment?: string;
  }[];
}

export interface TermScheme {
  term: string;
  weeks: WeeklyLesson[];
}

export interface ChildProfile {
  id: string;
  name: string;
  yearGroup: string;
  strengths: string[];
  areasForImprovement: string[];
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
  pace: 'standard' | 'accelerated' | 'supported';
}

export interface ScheduleOptions {
  daysPerWeek: number;
  hoursPerDay: number;
  startDate: Date;
  endDate: Date;
  includeHolidays: boolean;
  terms: number;
}

export const generateSchemeOfWork = (
  child: ChildProfile,
  schedule: ScheduleOptions
): TermScheme[] => {
  const yearGroup = child.yearGroup.toLowerCase().replace('year', '').trim();
  const weeks = Math.floor(
    (schedule.endDate.getTime() - schedule.startDate.getTime()) /
    (1000 * 60 * 60 * 24 * 7)
  );
  const weeksPerTerm = Math.floor(weeks / schedule.terms);

  const schemes: TermScheme[] = [];

  for (let term = 1; term <= schedule.terms; term++) {
    const termWeeks: WeeklyLesson[] = [];

    for (let week = 1; week <= weeksPerTerm; week++) {
      const weekNumber = (term - 1) * weeksPerTerm + week;
      termWeeks.push(generateWeeklyPlan(weekNumber, yearGroup, schedule, child));
    }

    schemes.push({
      term: `Term ${term}`,
      weeks: termWeeks
    });
  }

  return schemes;
};

const generateWeeklyPlan = (
  weekNumber: number,
  yearGroup: string,
  schedule: ScheduleOptions,
  child: ChildProfile
): WeeklyLesson => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].slice(0, schedule.daysPerWeek);
  const topics = getTopicsForWeek(weekNumber, yearGroup);

  return {
    week: weekNumber,
    topic: topics.mainTopic,
    lessons: days.map(day => ({
      day,
      subject: getSubjectForDay(day),
      objective: topics.objectives[days.indexOf(day)] || topics.objectives[0],
      activities: generateActivities(child.learningStyle, child.pace),
      resources: generateResources(yearGroup, topics.mainTopic),
      duration: `${Math.floor(schedule.hoursPerDay * 60 / 3)} minutes`,
      assessment: day === 'Friday' ? 'Weekly review and assessment' : undefined
    }))
  };
};

const getTopicsForWeek = (week: number, yearGroup: string) => {
  const year3Topics = [
    {
      mainTopic: 'Prefixes and Suffixes',
      objectives: [
        'Identify common prefixes (un-, dis-, mis-)',
        'Apply suffixes to root words (-ness, -ful, -less)',
        'Create new words using prefixes and suffixes',
        'Understand how affixes change word meanings',
        'Practice spelling words with affixes'
      ]
    },
    {
      mainTopic: 'Sentence Types and Punctuation',
      objectives: [
        'Identify four types of sentences',
        'Use correct punctuation for each sentence type',
        'Write statements and questions',
        'Create commands and exclamations',
        'Review and assess sentence writing'
      ]
    },
    {
      mainTopic: 'Reading Comprehension - Fiction',
      objectives: [
        'Identify main characters and settings',
        'Sequence story events',
        'Make predictions about plot',
        'Understand character feelings',
        'Summarize stories in own words'
      ]
    },
    {
      mainTopic: 'Descriptive Writing',
      objectives: [
        'Use adjectives to describe nouns',
        'Create expanded noun phrases',
        'Write descriptive paragraphs',
        'Use senses in descriptions',
        'Edit and improve descriptive writing'
      ]
    }
  ];

  const year4Topics = [
    {
      mainTopic: 'Complex Sentences',
      objectives: [
        'Identify main and subordinate clauses',
        'Use conjunctions to join clauses',
        'Create complex sentences',
        'Punctuate complex sentences correctly',
        'Vary sentence structures in writing'
      ]
    },
    {
      mainTopic: 'Apostrophes and Possession',
      objectives: [
        'Use apostrophes for contraction',
        'Show singular possession',
        'Show plural possession',
        'Distinguish its/it\'s usage',
        'Apply apostrophes in writing'
      ]
    },
    {
      mainTopic: 'Non-Fiction Reading',
      objectives: [
        'Identify text features',
        'Find information using contents/index',
        'Distinguish fact from opinion',
        'Take notes from texts',
        'Create own information texts'
      ]
    },
    {
      mainTopic: 'Paragraph Organization',
      objectives: [
        'Understand paragraph structure',
        'Write topic sentences',
        'Add supporting details',
        'Use transitions between paragraphs',
        'Organize ideas logically'
      ]
    }
  ];

  const year5Topics = [
    {
      mainTopic: 'Advanced Punctuation',
      objectives: [
        'Use parenthesis (brackets, dashes, commas)',
        'Apply colons and semicolons',
        'Punctuate dialogue correctly',
        'Use ellipsis for effect',
        'Master complex punctuation rules'
      ]
    },
    {
      mainTopic: 'Formal and Informal Language',
      objectives: [
        'Identify formal vs informal register',
        'Write formal letters',
        'Adapt tone for audience',
        'Use modal verbs appropriately',
        'Convert between formal/informal styles'
      ]
    },
    {
      mainTopic: 'Poetry Analysis',
      objectives: [
        'Identify poetic devices',
        'Analyze rhythm and rhyme',
        'Explore figurative language',
        'Compare different poems',
        'Write original poetry'
      ]
    },
    {
      mainTopic: 'Persuasive Writing',
      objectives: [
        'Identify persuasive techniques',
        'Structure arguments effectively',
        'Use evidence to support points',
        'Write persuasive letters',
        'Debate and present arguments'
      ]
    }
  ];

  const year6Topics = [
    {
      mainTopic: 'Advanced Grammar',
      objectives: [
        'Master passive and active voice',
        'Use subjunctive mood',
        'Apply advanced verb forms',
        'Understand word classes fully',
        'Edit for grammatical accuracy'
      ]
    },
    {
      mainTopic: 'SATs Preparation - SPaG',
      objectives: [
        'Review all punctuation rules',
        'Practice grammar exercises',
        'Complete past paper questions',
        'Time management strategies',
        'Check and correct work'
      ]
    },
    {
      mainTopic: 'Critical Reading Skills',
      objectives: [
        'Make complex inferences',
        'Analyze author\'s purpose',
        'Evaluate text effectiveness',
        'Compare multiple texts',
        'Write critical responses'
      ]
    },
    {
      mainTopic: 'Extended Writing Projects',
      objectives: [
        'Plan extended narratives',
        'Develop complex characters',
        'Create detailed settings',
        'Edit and redraft work',
        'Publish final pieces'
      ]
    }
  ];

  const topicsMap: Record<string, typeof year3Topics> = {
    '3': year3Topics,
    '4': year4Topics,
    '5': year5Topics,
    '6': year6Topics
  };

  const topics = topicsMap[yearGroup] || year3Topics;
  return topics[(week - 1) % topics.length];
};

const getSubjectForDay = (day: string): string => {
  const schedule: Record<string, string> = {
    'Monday': 'Spelling & Vocabulary',
    'Tuesday': 'Grammar & Punctuation',
    'Wednesday': 'Reading Comprehension',
    'Thursday': 'Writing Skills',
    'Friday': 'Review & Assessment'
  };
  return schedule[day] || 'English';
};

const generateActivities = (
  learningStyle: string,
  pace: string
): string[] => {
  const baseActivities = [
    'Interactive lesson introduction',
    'Guided practice exercises',
    'Independent work',
    'Peer review or self-assessment'
  ];

  const styleActivities: Record<string, string[]> = {
    visual: [
      'Watch educational video',
      'Create mind maps or diagrams',
      'Use color-coding for concepts',
      'Draw illustrations for stories'
    ],
    auditory: [
      'Listen to audio stories',
      'Discuss concepts aloud',
      'Record own reading',
      'Participate in group discussions'
    ],
    kinesthetic: [
      'Act out stories or concepts',
      'Use manipulatives for learning',
      'Create physical word cards',
      'Movement-based learning games'
    ],
    mixed: [
      'Multi-sensory activities',
      'Varied presentation formats',
      'Choice of activity types',
      'Flexible learning approaches'
    ]
  };

  const paceActivities: Record<string, string[]> = {
    standard: baseActivities,
    accelerated: [
      ...baseActivities,
      'Extension challenges',
      'Advanced reading materials',
      'Independent research projects'
    ],
    supported: [
      'Pre-teaching vocabulary',
      'Scaffolded exercises',
      'Additional practice time',
      'One-on-one support sessions'
    ]
  };

  return [
    ...baseActivities,
    ...(styleActivities[learningStyle] || []),
    ...(paceActivities[pace] || [])
  ];
};

const generateResources = (yearGroup: string, topic: string): string[] => {
  return [
    'Student workbook pages',
    'Online interactive exercises',
    'Educational videos',
    'Practice worksheets',
    'Reading materials',
    'Assessment rubrics',
    `Year ${yearGroup} textbook - ${topic} chapter`,
    'Supplementary online resources'
  ];
};