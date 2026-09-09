export type ToyStandardStatus = 'Current' | 'Withdrawn';

export type ToySafetyScope =
  | 'Mechanical'
  | 'Chemical'
  | 'Electrical'
  | 'Age'
  | 'Activity'
  | 'General'
  | 'Other';

export interface ToyStandard {
  id: string;
  standard_number: string;
  series: string;
  title: string;
  year: number;
  status: ToyStandardStatus;
  revision?: string;
  category: string;
  safety_scope: ToySafetyScope;
  description: string;
  source: string;
  clauses?: string[];
  pages?: string[];
}

export interface ToyCategoryInfo {
  id: string;
  name: string;
  icon: string;
  standardsCount: number;
  sampleStandard: string;
  description: string;
}

export const TOY_STANDARDS_DATA: ToyStandard[] = [
  {
    id: 'is-9849-1981',
    standard_number: 'IS 9849:1981',
    series: 'IS 9849',
    title: 'Guide for selection of toys for different age groups of children',
    year: 1981,
    status: 'Withdrawn',
    category: 'Age Determination',
    safety_scope: 'Age',
    description: 'Guide for selection of toys for different age groups of children (Withdrawn reference).',
    source: 'Bureau of Indian Standards (BIS Knowledge Base)'
  },
  {
    id: 'is-9873-p1-2012',
    standard_number: 'IS 9873 (Part 1):2012',
    series: 'IS 9873 (Part 1)',
    title: 'Safety Requirements for Toys - Part 1: Safety Aspects related to Mechanical and Physical Properties',
    year: 2012,
    status: 'Withdrawn',
    category: 'Mechanical & Physical Safety',
    safety_scope: 'Mechanical',
    description: 'Safety Requirements for Toys - Part 1: Safety Aspects related to Mechanical and Physical Properties (Historical edition, Withdrawn).',
    source: 'Bureau of Indian Standards (BIS Knowledge Base)'
  },
  {
    id: 'is-9873-p1-2019',
    standard_number: 'IS 9873 (Part 1):2019',
    series: 'IS 9873 (Part 1)',
    title: 'SAFETY OF TOYS PART 1: SAFETY ASPECTS RELATED TO MECHANICAL AND PHYSICAL PROPERTIES',
    year: 2019,
    status: 'Current',
    revision: 'Fifth Revision',
    category: 'Mechanical & Physical Safety',
    safety_scope: 'Mechanical',
    description: 'Safety of toys Part 1 covering mechanical and physical properties safety aspects (Fifth Revision).',
    source: 'Bureau of Indian Standards (BIS Knowledge Base)'
  },
  {
    id: 'is-9873-p1-2025',
    standard_number: 'IS 9873 (Part 1):2025',
    series: 'IS 9873 (Part 1)',
    title: 'SAFETY OF TOYS PART 1: SAFETY ASPECTS RELATED TO MECHANICAL AND PHYSICAL PROPERTIES',
    year: 2025,
    status: 'Current',
    revision: 'Fifth Revision',
    category: 'Mechanical & Physical Safety',
    safety_scope: 'Mechanical',
    description: 'Safety of toys Part 1 covering mechanical and physical properties safety aspects (Fifth Revision, 2025).',
    source: 'Bureau of Indian Standards (BIS Knowledge Base)'
  },
  {
    id: 'is-9873-p2-2012',
    standard_number: 'IS 9873 (Part 2):2012',
    series: 'IS 9873 (Part 2)',
    title: 'Safety Of Toys Part 2 Flammability',
    year: 2012,
    status: 'Withdrawn',
    category: 'Flammability',
    safety_scope: 'Chemical',
    description: 'Safety Of Toys Part 2 Flammability requirements and test methods (Withdrawn edition).',
    source: 'Bureau of Indian Standards (BIS Knowledge Base)'
  },
  {
    id: 'is-9873-p2-2017',
    standard_number: 'IS 9873 (Part 2):2017',
    series: 'IS 9873 (Part 2)',
    title: 'SAFETY OF TOYS PART 2 FLAMMABILITY',
    year: 2017,
    status: 'Withdrawn',
    revision: 'Fourth Revision',
    category: 'Flammability',
    safety_scope: 'Chemical',
    description: 'Safety of toys Part 2 flammability requirements (Fourth Revision, Withdrawn).',
    source: 'Bureau of Indian Standards (BIS Knowledge Base)'
  },
  {
    id: 'is-9873-p2-2025',
    standard_number: 'IS 9873 (Part 2):2025',
    series: 'IS 9873 (Part 2)',
    title: 'SAFETY OF TOYS PART 2 FLAMMABILITY',
    year: 2025,
    status: 'Current',
    revision: 'Fourth Revision',
    category: 'Flammability',
    safety_scope: 'Chemical',
    description: 'Safety of toys Part 2 flammability requirements (Fourth Revision, 2025).',
    source: 'Bureau of Indian Standards (BIS Knowledge Base)'
  },
  {
    id: 'is-9873-p3-1999',
    standard_number: 'IS 9873 (Part 3):1999',
    series: 'IS 9873 (Part 3)',
    title: 'Safety Requirements for Toys - Part 3: Migration of Certain Elements',
    year: 1999,
    status: 'Withdrawn',
    category: 'Migration of Certain Elements',
    safety_scope: 'Chemical',
    description: 'Safety requirements for toys - Part 3: Migration of certain elements (Historical edition, Withdrawn).',
    source: 'Bureau of Indian Standards (BIS Knowledge Base)'
  },
  {
    id: 'is-9873-p3-2017',
    standard_number: 'IS 9873 (Part 3):2017',
    series: 'IS 9873 (Part 3)',
    title: 'Safety of toys: Part 3 migration of certain elements',
    year: 2017,
    status: 'Withdrawn',
    revision: 'Second Revision',
    category: 'Migration of Certain Elements',
    safety_scope: 'Chemical',
    description: 'Safety of toys: Part 3 migration of certain elements (Second Revision, Withdrawn).',
    source: 'Bureau of Indian Standards (BIS Knowledge Base)'
  },
  {
    id: 'is-9873-p3-2020',
    standard_number: 'IS 9873 (Part 3):2020',
    series: 'IS 9873 (Part 3)',
    title: 'Safety of Toys Part 3 Migration of Certain Elements',
    year: 2020,
    status: 'Current',
    revision: 'Third Revision',
    category: 'Migration of Certain Elements',
    safety_scope: 'Chemical',
    description: 'Safety of Toys Part 3 Migration of Certain Elements (Third Revision).',
    source: 'Bureau of Indian Standards (BIS Knowledge Base)'
  },
  {
    id: 'is-9873-p4-2017',
    standard_number: 'IS 9873 (Part 4):2017',
    series: 'IS 9873 (Part 4)',
    title: 'Safety of toys: Part 4 swings, slides and similar activity toys for indoor and outdoor family domestic use',
    year: 2017,
    status: 'Withdrawn',
    category: 'Activity Toys',
    safety_scope: 'Activity',
    description: 'Safety of toys: Part 4 swings, slides and similar activity toys for indoor and outdoor family domestic use (Withdrawn).',
    source: 'Bureau of Indian Standards (BIS Knowledge Base)'
  },
  {
    id: 'is-9873-p4-2026',
    standard_number: 'IS 9873 (Part 4):2026',
    series: 'IS 9873 (Part 4)',
    title: 'Safety of toys Part 4: Activity toys for domestic use',
    year: 2026,
    status: 'Current',
    category: 'Activity Toys',
    safety_scope: 'Activity',
    description: 'Safety of toys Part 4: Activity toys for domestic use.',
    source: 'Bureau of Indian Standards (BIS Knowledge Base)'
  },
  {
    id: 'is-9873-p5-2017',
    standard_number: 'IS 9873 (Part 5):2017',
    series: 'IS 9873 (Part 5)',
    title: 'Safety of toys: Part 5 determination of total concentration of certain elements in toys',
    year: 2017,
    status: 'Current',
    category: 'Chemical / Element Requirements',
    safety_scope: 'Chemical',
    description: 'Safety of toys: Part 5 determination of total concentration of certain elements in toys.',
    source: 'Bureau of Indian Standards (BIS Knowledge Base)'
  },
  {
    id: 'is-9873-p6-2017',
    standard_number: 'IS 9873 (Part 6):2017',
    series: 'IS 9873 (Part 6)',
    title: "Safety of Toys Part 6 Determination of Certain Phthalate Esters in Toys and Children's Products",
    year: 2017,
    status: 'Withdrawn',
    category: 'Phthalate Esters',
    safety_scope: 'Chemical',
    description: "Safety of Toys Part 6 Determination of Certain Phthalate Esters in Toys and Children's Products (Withdrawn).",
    source: 'Bureau of Indian Standards (BIS Knowledge Base)'
  },
  {
    id: 'is-9873-p6-2021',
    standard_number: 'IS 9873 (Part 6):2021',
    series: 'IS 9873 (Part 6)',
    title: 'SAFETY OF TOYS PART 6 CERTAIN PHTHALATE ESTERS',
    year: 2021,
    status: 'Current',
    revision: 'Second Revision',
    category: 'Phthalate Esters',
    safety_scope: 'Chemical',
    description: 'Safety of toys Part 6 covering certain phthalate esters (Second Revision).',
    source: 'Bureau of Indian Standards (BIS Knowledge Base)'
  },
  {
    id: 'is-9873-p6-2025',
    standard_number: 'IS 9873 (Part 6):2025',
    series: 'IS 9873 (Part 6)',
    title: 'SAFETY OF TOYS PART 6 CERTAIN PHTHALATE ESTERS',
    year: 2025,
    status: 'Current',
    revision: 'Second Revision',
    category: 'Phthalate Esters',
    safety_scope: 'Chemical',
    description: 'Safety of toys Part 6 covering certain phthalate esters (Second Revision, 2025).',
    source: 'Bureau of Indian Standards (BIS Knowledge Base)'
  },
  {
    id: 'is-9873-p7-2017',
    standard_number: 'IS 9873 (Part 7):2017',
    series: 'IS 9873 (Part 7)',
    title: 'Safety of toys: Part 7 requirements and test methods for finger paints',
    year: 2017,
    status: 'Current',
    category: 'Finger Paints',
    safety_scope: 'Chemical',
    description: 'Safety of toys: Part 7 requirements and test methods for finger paints.',
    source: 'Bureau of Indian Standards (BIS Knowledge Base)'
  },
  {
    id: 'is-9873-p8-2019',
    standard_number: 'IS 9873 (Part 8):2019',
    series: 'IS 9873 (Part 8)',
    title: 'Safety of toys: Part 8 age determination guidelines',
    year: 2019,
    status: 'Withdrawn',
    category: 'Age Determination',
    safety_scope: 'Age',
    description: 'Safety of toys: Part 8 age determination guidelines (Withdrawn).',
    source: 'Bureau of Indian Standards (BIS Knowledge Base)'
  },
  {
    id: 'is-9873-p8-2026',
    standard_number: 'IS 9873 (Part 8):2026',
    series: 'IS 9873 (Part 8)',
    title: 'Safety of toys Part 8: Age determination First age grade for the appropriate play of toys First Revision',
    year: 2026,
    status: 'Current',
    revision: 'First Revision',
    category: 'Age Determination',
    safety_scope: 'Age',
    description: 'Safety of toys Part 8: Age determination First age grade for the appropriate play of toys (First Revision).',
    source: 'Bureau of Indian Standards (BIS Knowledge Base)'
  },
  {
    id: 'is-9873-p9-2017',
    standard_number: 'IS 9873 (Part 9):2017',
    series: 'IS 9873 (Part 9)',
    title: "Safety of Toys Part 9 Certain Phthalates Esters in Toys and Children's Products",
    year: 2017,
    status: 'Current',
    category: 'Phthalate Esters',
    safety_scope: 'Chemical',
    description: "Safety of Toys Part 9 Certain Phthalates Esters in Toys and Children's Products.",
    source: 'Bureau of Indian Standards (BIS Knowledge Base)'
  },
  {
    id: 'is-9873-p10-2024',
    standard_number: 'IS 9873 (Part 10):2024',
    series: 'IS 9873 (Part 10)',
    title: 'SAFETY OF TOYS PART 10: EXPERIMENTAL SETS FOR CHEMISTRY AND RELATED ACTIVITIES',
    year: 2024,
    status: 'Current',
    category: 'Chemistry & Chemical Toy Sets',
    safety_scope: 'Chemical',
    description: 'Safety of toys Part 10: Experimental sets for chemistry and related activities.',
    source: 'Bureau of Indian Standards (BIS Knowledge Base)'
  },
  {
    id: 'is-9873-p11-2024',
    standard_number: 'IS 9873 (Part 11):2024',
    series: 'IS 9873 (Part 11)',
    title: 'SAFETY OF TOYS PART 11: CHEMICAL TOYS SETS OTHER THAN EXPERIMENTAL SETS',
    year: 2024,
    status: 'Current',
    category: 'Chemistry & Chemical Toy Sets',
    safety_scope: 'Chemical',
    description: 'Safety of toys Part 11: Chemical toys sets other than experimental sets.',
    source: 'Bureau of Indian Standards (BIS Knowledge Base)'
  },
  {
    id: 'is-9873-p12-2025',
    standard_number: 'IS 9873 (Part 12):2025',
    series: 'IS 9873 (Part 12)',
    title: 'SAFETY OF TOYS PART 12: SAFETY ASPECTS RELATED TO MECHANICAL AND PHYSICAL PROPERTIES COMPARISON OF ISO 8124-1 EN 71-1 AND ASTM F963',
    year: 2025,
    status: 'Current',
    category: 'Mechanical & Physical Safety',
    safety_scope: 'Mechanical',
    description: 'Safety of toys Part 12: Safety aspects related to mechanical and physical properties comparison of ISO 8124-1, EN 71-1, and ASTM F963.',
    source: 'Bureau of Indian Standards (BIS Knowledge Base)'
  },
  {
    id: 'is-11483-1985',
    standard_number: 'IS 11483:1985',
    series: 'IS 11483',
    title: 'Specification for amorces (Paper Caps For Toy Piston)',
    year: 1985,
    status: 'Current',
    category: 'Toy Piston / Amorces',
    safety_scope: 'General',
    description: 'Specification for amorces (Paper Caps For Toy Piston).',
    source: 'Bureau of Indian Standards (BIS Knowledge Base)'
  },
  {
    id: 'is-15644-2006',
    standard_number: 'IS 15644:2006',
    series: 'IS 15644',
    title: 'Safety of electric toys',
    year: 2006,
    status: 'Current',
    category: 'Electric Toys',
    safety_scope: 'Electrical',
    description: 'Safety of electric toys requirements.',
    source: 'Bureau of Indian Standards (BIS Knowledge Base)'
  },
  {
    id: 'is-17874-p1-2022',
    standard_number: 'IS 17874 (Part 1):2022',
    series: 'IS 17874 (Part 1)',
    title: 'Glossary of Yoga Terminology Part 1 Standardized Terminology for Commonly used Terms related to Yoga',
    year: 2022,
    status: 'Current',
    category: 'Related Standards',
    safety_scope: 'Other',
    description: 'Glossary of Yoga Terminology Part 1 Standardized Terminology for Commonly used Terms related to Yoga (Standard included in dataset).',
    source: 'Bureau of Indian Standards (BIS Knowledge Base)'
  },
  {
    id: 'is-iec-61558-p2-s7-2007',
    standard_number: 'IS/IEC 61558 (Part 2/Sec 7):2007',
    series: 'IS/IEC 61558 (Part 2/Sec 7)',
    title: 'Safety of power transformers, power supplies reactors and similar products: Part 2 - 7 particular requirements and tests for transformers and power supplies for toys',
    year: 2007,
    status: 'Current',
    category: 'Transformers / Power Supplies for Toys',
    safety_scope: 'Electrical',
    description: 'Safety of power transformers, power supplies reactors and similar products: Part 2 - 7 particular requirements and tests for transformers and power supplies for toys.',
    source: 'Bureau of Indian Standards (BIS Knowledge Base)'
  }
];

export interface ToyEvolutionGroup {
  series: string;
  category: string;
  versions: ToyStandard[];
}

export const TOY_EVOLUTION_GROUPS: ToyEvolutionGroup[] = [
  {
    series: 'IS 9873 (Part 1)',
    category: 'Mechanical & Physical Safety',
    versions: [
      TOY_STANDARDS_DATA.find((s) => s.id === 'is-9873-p1-2012')!,
      TOY_STANDARDS_DATA.find((s) => s.id === 'is-9873-p1-2019')!,
      TOY_STANDARDS_DATA.find((s) => s.id === 'is-9873-p1-2025')!,
    ]
  },
  {
    series: 'IS 9873 (Part 2)',
    category: 'Flammability',
    versions: [
      TOY_STANDARDS_DATA.find((s) => s.id === 'is-9873-p2-2012')!,
      TOY_STANDARDS_DATA.find((s) => s.id === 'is-9873-p2-2017')!,
      TOY_STANDARDS_DATA.find((s) => s.id === 'is-9873-p2-2025')!,
    ]
  },
  {
    series: 'IS 9873 (Part 3)',
    category: 'Migration of Certain Elements',
    versions: [
      TOY_STANDARDS_DATA.find((s) => s.id === 'is-9873-p3-1999')!,
      TOY_STANDARDS_DATA.find((s) => s.id === 'is-9873-p3-2017')!,
      TOY_STANDARDS_DATA.find((s) => s.id === 'is-9873-p3-2020')!,
    ]
  },
  {
    series: 'IS 9873 (Part 4)',
    category: 'Activity Toys',
    versions: [
      TOY_STANDARDS_DATA.find((s) => s.id === 'is-9873-p4-2017')!,
      TOY_STANDARDS_DATA.find((s) => s.id === 'is-9873-p4-2026')!,
    ]
  },
  {
    series: 'IS 9873 (Part 6)',
    category: 'Phthalate Esters',
    versions: [
      TOY_STANDARDS_DATA.find((s) => s.id === 'is-9873-p6-2017')!,
      TOY_STANDARDS_DATA.find((s) => s.id === 'is-9873-p6-2021')!,
      TOY_STANDARDS_DATA.find((s) => s.id === 'is-9873-p6-2025')!,
    ]
  },
  {
    series: 'IS 9873 (Part 8)',
    category: 'Age Determination',
    versions: [
      TOY_STANDARDS_DATA.find((s) => s.id === 'is-9873-p8-2019')!,
      TOY_STANDARDS_DATA.find((s) => s.id === 'is-9873-p8-2026')!,
    ]
  }
];

export const TOY_CATEGORIES: ToyCategoryInfo[] = [
  {
    id: 'mechanical',
    name: 'Mechanical & Physical Safety',
    icon: '🧸',
    standardsCount: 4,
    sampleStandard: 'IS 9873 (Part 1)',
    description: 'Covers physical properties, sharp edges, small parts, and mechanical integrity.'
  },
  {
    id: 'flammability',
    name: 'Flammability',
    icon: '🔥',
    standardsCount: 3,
    sampleStandard: 'IS 9873 (Part 2)',
    description: 'Flammability requirements and flame spread resistance for toys.'
  },
  {
    id: 'migration',
    name: 'Migration of Certain Elements',
    icon: '🧪',
    standardsCount: 3,
    sampleStandard: 'IS 9873 (Part 3)',
    description: 'Bio-availability and migration of heavy metals from toy materials.'
  },
  {
    id: 'activity',
    name: 'Activity Toys',
    icon: '🎠',
    standardsCount: 2,
    sampleStandard: 'IS 9873 (Part 4)',
    description: 'Swings, slides, and similar activity toys for domestic play.'
  },
  {
    id: 'chemical-elements',
    name: 'Chemical / Element Requirements',
    icon: '🔬',
    standardsCount: 1,
    sampleStandard: 'IS 9873 (Part 5)',
    description: 'Determination of total element concentration in toy substrates.'
  },
  {
    id: 'phthalate',
    name: 'Phthalate Esters',
    icon: '🧴',
    standardsCount: 4,
    sampleStandard: 'IS 9873 (Part 6), (Part 9)',
    description: 'Testing and restrictions of phthalate plasticizers in toy materials.'
  },
  {
    id: 'finger-paints',
    name: 'Finger Paints',
    icon: '🎨',
    standardsCount: 1,
    sampleStandard: 'IS 9873 (Part 7)',
    description: 'Requirements, colorants, and test methods for children’s finger paints.'
  },
  {
    id: 'age-determination',
    name: 'Age Determination',
    icon: '👶',
    standardsCount: 3,
    sampleStandard: 'IS 9849, IS 9873 (Part 8)',
    description: 'Guidelines for age determination and age grading appropriate play.'
  },
  {
    id: 'electric-toys',
    name: 'Electric Toys',
    icon: '⚡',
    standardsCount: 1,
    sampleStandard: 'IS 15644',
    description: 'Safety provisions for battery, powered, and electrical toys.'
  },
  {
    id: 'chemistry-sets',
    name: 'Chemistry & Chemical Toy Sets',
    icon: '⚗️',
    standardsCount: 2,
    sampleStandard: 'IS 9873 (Part 10), (Part 11)',
    description: 'Experimental sets and chemical toys for educational and hobby use.'
  },
  {
    id: 'transformers',
    name: 'Transformers / Power Supplies for Toys',
    icon: '🔌',
    standardsCount: 1,
    sampleStandard: 'IS/IEC 61558 (Part 2/Sec 7)',
    description: 'Safety of power transformers and power supply units powering toys.'
  }
];
