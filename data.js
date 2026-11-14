
/*
 * data.js - small static data used by several pages.
 * (Majors, fields, courses and quiz questions come from MySQL via PHP.)
 */

// Interest dimensions
var DIMS = {
  ai:   'AI',
  prog: 'Programming',
  web:  'Web',
  sec:  'Security',
  robo: 'Robotics',
  hw:   'Hardware',
  data: 'Data',
  net:  'Networks'
};

// The three majors offered in MajorMatch
var MAJORS = {
  cs: { name: 'Computer Science',       ar: 'علوم الحاسب',     icon: '🧠', color: '#5b5bf0' },
  it: { name: 'Information Technology', ar: 'تقنية المعلومات', icon: '🌐', color: '#2f7bff' },
  ce: { name: 'Computer Engineering',   ar: 'هندسة الحاسب',    icon: '🦾', color: '#18a8f0' }
};

// Home page interest cards
var INTERESTS = [
  {
    key: 'ai',
    icon: '🤖',
    label: 'AI',
    majors: { cs: 3, ce: 1 },
    dims: { ai: 1 },
    note: 'AI appears in the field lists of Computer Science and Computer Engineering.'
  },
  {
    key: 'games',
    icon: '🎮',
    label: 'Games',
    majors: { cs: 2 },
    dims: { prog: 1 },
    note: 'Games are not a listed field, but game building relies on programming and algorithms - closest to Computer Science.'
  },
  {
    key: 'web',
    icon: '🌐',
    label: 'Web',
    majors: { it: 3, cs: 2 },
    dims: { web: 1 },
    note: 'Web Technologies are listed for both Information Technology and Computer Science.'
  },
  {
    key: 'robotics',
    icon: '🦾',
    label: 'Robotics',
    majors: { ce: 3 },
    dims: { robo: 1 },
    note: 'Robotics and Control is a Computer Engineering field.'
  },
  {
    key: 'design',
    icon: '🎨',
    label: 'UI & Design',
    majors: { it: 2, cs: 1 },
    dims: { web: 0.6 },
    note: 'UI & Design connects to Web Technologies.'
  },
  {
    key: 'vision',
    icon: '👁️',
    label: 'Computer Vision',
    majors: { ce: 3 },
    dims: { ai: 0.5, robo: 0.5 },
    note: 'Computer Vision and Image Processing are Computer Engineering fields.'
  },
  {
    key: 'cloud',
    icon: '☁️',
    label: 'Cloud',
    majors: { it: 3 },
    dims: { net: 1 },
    note: 'Cloud Computing is an Information Technology field.'
  },
  {
    key: 'data',
    icon: '📊',
    label: 'Data',
    majors: { it: 3, cs: 1 },
    dims: { data: 1 },
    note: 'Data Mining and Data Analysis are Information Technology fields; Machine Learning sits in Computer Science.'
  }
];

// Mini experiences
var EXPERIENCE_META = {
  classify:     { major: 'cs', dims: { ai: 1, prog: 0.4 } },
  button:       { major: 'cs', dims: { web: 1, prog: 0.3 } },
  sort:         { major: 'cs', dims: { prog: 1 } },
  logic_puzzle: { major: 'cs', dims: { prog: 1 } },
  db_sort:      { major: 'it', dims: { data: 1 } },
  network:      { major: 'it', dims: { net: 1 } },
  webpage:      { major: 'it', dims: { web: 1 } },
  cloud:        { major: 'it', dims: { net: 1, data: 0.3 } },
  robot:        { major: 'ce', dims: { robo: 1 } },
  leds:         { major: 'ce', dims: { hw: 1 } },
  gates:        { major: 'ce', dims: { hw: 1 } },
  vision:       { major: 'ce', dims: { ai: 0.6, robo: 0.4 } },
  image:        { major: 'ce', dims: { ai: 0.5, hw: 0.3 } }
};

// Compare page: rough estimates based on field lists (0-5).
var COMPARE_ROWS = [
  { topic: 'Programming', cs: 5, it: 3, ce: 3 },
  { topic: 'AI',          cs: 4, it: 2, ce: 3 },
  { topic: 'Web',         cs: 3, it: 5, ce: 1 },
  { topic: 'Networks',    cs: 1, it: 4, ce: 3 },
  { topic: 'Security',    cs: 2, it: 2, ce: 1 },
  { topic: 'Hardware',    cs: 1, it: 1, ce: 5 },
  { topic: 'Robotics',    cs: 1, it: 0, ce: 5 },
  { topic: 'Databases',   cs: 2, it: 5, ce: 1 },
  { topic: 'Mathematics', cs: 4, it: 2, ce: 4 },
  { topic: 'Systems',     cs: 3, it: 3, ce: 4 }
];
