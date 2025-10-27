export interface PastPaper {
  id: number;
  year: number;
  subject: 'physics' | 'maths';
  title: string;
  topics: string[];
  url: string;
}

export const pastPapers: PastPaper[] = [
  {
    id: 1,
    year: 2023,
    subject: 'physics',
    title: 'A/L Physics 2023 - Paper I (MCQ)',
    topics: ['Mechanics', 'Current Electricity', 'Waves'],
    url: '#',
  },
  {
    id: 2,
    year: 2023,
    subject: 'physics',
    title: 'A/L Physics 2023 - Paper II (Structured Essay)',
    topics: ['Gravitational Fields', 'Thermal Physics', 'Properties of Matter'],
    url: '#',
  },
  {
    id: 3,
    year: 2023,
    subject: 'maths',
    title: 'A/L Combined Maths 2023 - Paper I',
    topics: ['Calculus (Differentiation & Integration)', 'Trigonometry', 'Algebra'],
    url: '#',
  },
  {
    id: 4,
    year: 2022,
    subject: 'physics',
    title: 'A/L Physics 2022 - Paper I (MCQ)',
    topics: ['Magnetic Fields', 'Electronics', 'Modern Physics'],
    url: '#',
  },
  {
    id: 5,
    year: 2022,
    subject: 'maths',
    title: 'A/L Combined Maths 2022 - Paper I',
    topics: ['Vectors', 'Complex Numbers', 'Geometry (Coordinate Geometry, Conic Sections)'],
    url: '#',
  },
  {
    id: 6,
    year: 2022,
    subject: 'maths',
    title: 'A/L Combined Maths 2022 - Paper II',
    topics: ['Probability and Statistics', 'Series and Sequences', 'Calculus (Differentiation & Integration)'],
    url: '#',
  },
  {
    id: 7,
    year: 2021,
    subject: 'physics',
    title: 'A/L Physics 2021 - Paper II (Essay)',
    topics: ['Electric Fields', 'Thermal Physics', 'Oscillations and Waves'],
    url: '#',
  },
  {
    id: 8,
    year: 2021,
    subject: 'maths',
    title: 'A/L Combined Maths 2021 - Paper I',
    topics: ['Trigonometry', 'Matrices and Determinants', 'Algebra'],
    url: '#',
  },
   {
    id: 9,
    year: 2020,
    subject: 'physics',
    title: 'A/L Physics 2020 - Paper I & II',
    topics: ['Units and Dimensions', 'Mechanics', 'Current Electricity'],
    url: '#',
  },
  {
    id: 10,
    year: 2020,
    subject: 'maths',
    title: 'A/L Combined Maths 2020 - Full Paper',
    topics: ['Calculus (Differentiation & Integration)', 'Geometry (Coordinate Geometry, Conic Sections)', 'Vectors'],
    url: '#',
  },
  {
    id: 11,
    year: 2019,
    subject: 'physics',
    title: 'A/L Physics 2019 - Paper II',
    topics: ['Properties of Matter', 'Gravitational Fields', 'Electronics'],
    url: '#',
  },
  {
    id: 12,
    year: 2019,
    subject: 'maths',
    title: 'A/L Combined Maths 2019 - Paper I',
    topics: ['Probability and Statistics', 'Trigonometry', 'Algebra'],
    url: '#',
  },
];

export const uniqueYears = [...new Set(pastPapers.map(p => p.year))].sort((a, b) => b - a);