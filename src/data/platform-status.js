/** Platform engineering status snapshot for the GDF communications site. */

export const PLATFORM_STATUS = {
  title: 'Platform System Work',
  subtitle: 'Completed / Underway',
  intro:
    'Status from the platform engineering team building Antares and related systems.',
  components: {
    title: 'Component library',
    note: 'Migrating to Antares',
    items: [
      {
        name: 'Avatar',
        status: 'done',
        detail: 'Released and in good shape.',
      },
      {
        name: 'Tag',
        status: 'done',
        detail: 'Complete.',
      },
      {
        name: 'Tabs',
        status: 'finishing',
        detail: 'Mostly finished.',
      },
      {
        name: 'Chip',
        status: 'building',
        detail: 'Currently being built.',
      },
      {
        name: 'Card, Telephone, Text lockup',
        status: 'building',
        detail: 'In development.',
      },
      {
        name: 'Collapsible',
        status: 'finishing',
        detail: 'Almost done.',
      },
      {
        name: 'Pagination',
        status: 'refining',
        detail: 'Needs more refinement.',
      },
      {
        name: 'Table',
        status: 'paused',
        detail:
          'Intentionally saved for later. Still using TanStack; the team wants a clean, systematic approach.',
      },
      {
        name: 'Growl (notifications)',
        status: 'paused',
        detail:
          'Saved for last. Complex because of backward compatibility with the legacy notification system.',
      },
      {
        name: 'Date field',
        status: 'local',
        detail: 'Working example built locally; not yet in a pull request.',
      },
      {
        name: 'File upload pattern',
        status: 'follow_up',
        detail: 'Needs follow-up. Owner: Jake Smith.',
      },
      {
        name: 'New date picker',
        status: 'follow_up',
        detail: 'Needs follow-up.',
      },
    ],
  },
  themes: [
    {
      id: 'platform-theme-focus',
      title: 'Shift in focus',
      body:
        'The team is deliberately slowing new component output to build full experiences instead—for example file upload flows and drawer patterns—so gaps in the system surface before more components ship.',
    },
    {
      id: 'platform-theme-dashboard',
      title: 'Dashboard exploration',
      body:
        'Building a full mock GoDaddy dashboard (referencing GoDash) to identify missing components and patterns needed for real product experiences.',
    },
    {
      id: 'platform-theme-antares',
      title: 'Antares real-world testing',
      body:
        'The Commerce team is adopting Antares fully. Headers are being pushed onto Antares on purpose to surface and fix integration issues early.',
    },
    {
      id: 'platform-theme-theming',
      title: 'Theming',
      body: 'Ongoing blocker for full light and dark support.',
      points: [
        'New design tokens are still needed before theming can work as intended.',
        'Donnie is contributing part-time; the team wants full-time theming focus but lacks leadership prioritization.',
        'Plan: fold theming needs into Airo and design-system core work so progress continues without formal roadmap support.',
        'A small working group kicked off on the Airo Library and App Builder Library; theming is already a dependency there.',
      ],
    },
    {
      id: 'platform-theme-illustrations',
      title: 'Illustrations',
      body:
        'Spot Illustration app and library (built by Tom) is live. Teams can self-serve on-brand, code-ready vector illustrations instead of queuing custom empty-state design requests.',
      points: [
        'Not yet themeable for light and dark. Flagged as important before wider adoption, and tied to the broader theming conversation.',
      ],
    },
    {
      id: 'platform-theme-goat',
      title: 'Goat translation service',
      body:
        'Airo App Builder is fully running on Goat, the translation service. Other teams are joining the pilot.',
      points: [
        'Elliott is building an Excel add-in for the brand team to run translations through the Goat API. It is working well and validating an API-first approach for future integrations.',
      ],
    },
    {
      id: 'platform-theme-other',
      title: 'Other status checks',
      body:
        'Tesla upgrade progress is going well and is currently waiting on pull request approval. More detail expected after Lee’s 1:1.',
    },
  ],
  upcoming: {
    title: 'What’s coming up',
    items: [
      'Beta release (target: end of September) — Date Picker and File Upload components, with a plan to invite 1 team to early-adopt.',
      'Roadshow starts next week: visiting teams to share what has shipped and what is next, including Fulcrum (design system guidance and guardrails) with designers.',
      'Continued dedicated resourcing for theming.',
      'Growing internal demand for theming and dark mode in Airo; the team will watch for repeated signals to justify prioritization.',
    ],
  },
};

/** Tag labels: ≤2 words. Tag applies uppercase via design-system text-transform. */
export const STATUS_LABELS = {
  done: { label: 'Done', emphasis: 'success' },
  finishing: { label: 'Finishing', emphasis: 'info' },
  building: { label: 'Building', emphasis: 'info' },
  refining: { label: 'Refining', emphasis: 'warning' },
  paused: { label: 'Paused', emphasis: 'passive' },
  local: { label: 'Local', emphasis: 'neutral' },
  follow_up: { label: 'Follow up', emphasis: 'warning' },
};
