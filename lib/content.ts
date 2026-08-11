/**
 * Single source of truth for site content.
 * Every fact here comes from Milind's CV (B2026134_Milind Gauns_CV.pdf).
 * Do not add claims that aren't in that document.
 */

export const PERSON = {
  name: "Milind Gauns",
  fullName: "Milind S. Gauns",
  tagline: "Where engineering meets data",
  /** The concept line — the knight's tour as career shape. */
  thesis:
    "A knight never moves in a straight line. It still covers the whole board.",
  now: "PGDM Big Data Analytics — Goa Institute of Management, 2026–28",
  emails: {
    student: "milind.gauns2026b@gim.ac.in",
    personal: "milindgauns66@gmail.com",
  },
  linkedin: "https://www.linkedin.com/in/milindgauns/",
  github: "https://github.com/Milind-Gauns",
} as const;

export const INTRO = [
  "I started in electrical engineering, spent a year running after-sales operations for a territory of 100+ technicians, and built a logistics model that a government department is now implementing.",
  "None of those moves were in a straight line. Together they taught me the same thing from three directions: systems fail at the seams, and the data usually knows before anyone else does.",
  "I'm now reading Big Data Analytics at Goa Institute of Management.",
];

/* ---------------- the tour: career milestones ---------------- */

export type Milestone = {
  square: string;
  year: string;
  title: string;
  detail: string;
};

export const MILESTONES: Milestone[] = [
  {
    square: "a1",
    year: "2020",
    title: "B.Tech, Electrical & Electronics",
    detail:
      "National Institute of Technology, Goa. Graduated 2024 with 7.47/10, top 3 of class in first year.",
  },
  {
    square: "c2",
    year: "2021",
    title: "Founded the Chess Community",
    detail:
      "Started NIT Goa's campus chess club, grew membership past 200 and fielded inter-college teams through 2024.",
  },
  {
    square: "e3",
    year: "2021",
    title: "Government health scheme, 20,000+ renewals",
    detail:
      "Project coordination intern at INET Computer Services. Coordinated a 15-member verification team on the Deen Dayal Swasthya Seva Yojana renewal drive; 3rd place at the National India Summit hackathon the same year.",
  },
  {
    square: "g4",
    year: "2024",
    title: "Graduate Engineer Trainee, Godrej & Boyce",
    detail:
      "After-sales service across the PCMC and Manchar territory in Pune — 4 authorised service providers, 100+ technicians, 200+ calls a day at peak.",
  },
  {
    square: "f6",
    year: "2025",
    title: "Grain logistics model, Govt. of Goa",
    detail:
      "Modelled public distribution movement across 450+ fair price shops. Awarded an official letter of commendation by the Department of Civil Supplies & Consumer Affairs; the model is in implementation.",
  },
  {
    square: "e8",
    year: "2026",
    title: "PGDM Big Data Analytics, GIM",
    detail:
      "Goa Institute of Management, 2026–28. Currently building a campus utilities platform serving 1,500 students.",
  },
];

/* ---------------- experience ---------------- */

export type Role = {
  org: string;
  role: string;
  period: string;
  place?: string;
  bullets: string[];
};

export const ROLES: Role[] = [
  {
    org: "Godrej & Boyce Mfg. Co. Ltd.",
    role: "Graduate Engineer Trainee — After Sales Service",
    period: "Aug 2024 — Aug 2025",
    place: "PCMC & Manchar territory, Pune",
    bullets: [
      "Ran after-sales service for Godrej Appliances across the territory: 4 authorised service providers and 100+ technicians, closing 200+ calls a day at peak.",
      "Cut the open service call backlog at the highest-volume partner from 9 days to 2.35 by restructuring daily call allocation and technician-wise follow-up.",
      "Achieved a ₹30L revenue target across spares, AMC and extended warranty over the three-month peak summer season.",
      "Built a daily service MIS on call closure, turnaround time and partner productivity, giving branch leadership a single view to review all four partners weekly.",
      "Recovered ₹2.6L in ageing receivables through a nine-cheque settlement negotiated with the partner and routed via Corporate Finance.",
      "Designed an incentive scheme for 100+ technicians on AMC and stabiliser attachment, turning service visits into a revenue channel beyond the repair mandate.",
      "Received written appreciation from the Director of the Maruti Suzuki Centre of Excellence for closing an urgent split-AC installation escalation within 24 hours.",
    ],
  },
  {
    org: "INET Computer Services",
    role: "Project Coordination Intern",
    period: "Aug 2021 — Oct 2021",
    bullets: [
      "Supported the state-wide renewal drive for the Deen Dayal Swasthya Seva Yojana, a Government of Goa health scheme.",
      "Coordinated a 15-member verification team and tracked daily throughput against deadline, contributing to closure of 20,000+ policy renewals within the window.",
    ],
  },
];

/* ---------------- headline numbers ---------------- */

export type Metric = {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Rendered instead of the animated number when the figure isn't a plain count. */
  display?: string;
  label: string;
  source: string;
  decimals?: number;
  /** Thousands separators; off for ratings and similar bare figures. */
  grouping?: boolean;
};

export const METRICS: Metric[] = [
  {
    value: 200,
    suffix: "+",
    label: "service calls a day at peak",
    source: "Godrej & Boyce",
  },
  {
    value: 30,
    prefix: "₹",
    suffix: "L",
    label: "peak-season revenue target met",
    source: "Godrej & Boyce",
  },
  {
    value: 2.35,
    decimals: 2,
    display: "9 → 2.35",
    label: "days of service backlog, cut",
    source: "Godrej & Boyce",
  },
  {
    value: 450,
    suffix: "+",
    label: "fair price shops modelled",
    source: "Govt. of Goa",
  },
  {
    value: 20000,
    suffix: "+",
    label: "policy renewals closed",
    source: "INET / Govt. of Goa",
  },
  {
    value: 1687,
    grouping: false,
    label: "FIDE rating",
    source: "Chess",
  },
];

/* ---------------- projects ---------------- */

export type Project = {
  index: string;
  title: string;
  org: string;
  year: string;
  summary: string;
  bullets: string[];
  stack: string[];
  status?: string;
};

export const PROJECTS: Project[] = [
  {
    index: "01",
    title: "Grain Distribution Optimisation",
    org: "Dept. of Civil Supplies & Consumer Affairs, Govt. of Goa",
    year: "2025—26",
    summary:
      "A two-stage simulation of Goa's public distribution system, built after field study with officials, godown supervisors, drivers and shop operators.",
    bullets: [
      "Modelled grain movement across 1 central godown, 11 local godowns, 450+ fair price shops and 40+ vehicles, mapping gaps through on-ground study.",
      "Derived shop-level demand from AAY, PHH and APL ration-card counts under vehicle capacity, trip-limit and reorder constraints.",
      "Delivered a Streamlit dashboard with KPI tracking, at-risk stock alerts and Excel/PDF export.",
    ],
    stack: ["Python", "Streamlit", "Plotly", "Pandas"],
    status: "In implementation with the department",
  },
  {
    index: "02",
    title: "Campus Utilities Platform",
    org: "Goa Institute of Management",
    year: "2026",
    summary:
      "Replaced WhatsApp-based coordination across six campus services for a 1,500-student campus with a Telegram bot and a role-based admin panel.",
    bullets: [
      "Built on Python, FastAPI and SQLAlchemy with a role-based admin panel for service owners.",
      "Deployed on Azure with 60 automated tests.",
      "Piloted with 30+ students; bus and laundry modules cleared for first campus-wide release.",
    ],
    stack: ["Python", "FastAPI", "SQLAlchemy", "Azure"],
    status: "Piloted, first release cleared",
  },
  {
    index: "03",
    title: "State of Charge Estimation, EV Battery",
    org: "B.Tech thesis — NIT Goa",
    year: "2024",
    summary:
      "Estimating electric-vehicle battery state of charge from drive-cycle data, where the raw signal is noisy and the naive method drifts.",
    bullets: [
      "Combined Coulomb counting with artificial neural networks in MATLAB on drive-cycle data.",
      "Improved estimation stability under varying load.",
    ],
    stack: ["MATLAB", "Neural Networks"],
  },
];

/* ---------------- leadership ---------------- */

export const LEADERSHIP = [
  {
    role: "Co-Founder & President, Chess Community",
    org: "NIT Goa",
    period: "2021—24",
    detail:
      "Founded the campus chess club, grew membership past 200 and fielded inter-college teams.",
  },
  {
    role: "Finance & Sponsorship Head, Saavyas Fest",
    org: "NIT Goa",
    period: "2022—24",
    detail:
      "Headed two departments within a 150+ member core team and closed corporate sponsorships.",
  },
  {
    role: "Treasurer, TESLA Club",
    org: "NIT Goa",
    period: "2022—24",
    detail:
      "Managed club accounting and event budgets; organised a national technical event drawing 600+ participants.",
  },
  {
    role: "Admin Team Member, 'I Am an NITian'",
    org: "National student community",
    period: "2021—24",
    detail:
      "Coordinated student chapters across all 31 NITs within a 200K+ member community.",
  },
];

export const HONOURS = [
  {
    year: "2026",
    text: "Official letter of commendation, Dept. of Civil Supplies & Consumer Affairs, Govt. of Goa, for the state grain logistics model.",
  },
  {
    year: "2021",
    text: "3rd place, national-level open hackathon at the National India Summit, for a Goa-focused problem statement.",
  },
  {
    year: "2021",
    text: "Ranked in the top 3 of class in the first year of B.Tech, NIT Goa.",
  },
  {
    year: "2021",
    text: "Certified in Programming for Everybody (Python), University of Michigan via Coursera.",
  },
];

/* ---------------- skills ---------------- */

export const SKILLS = {
  programming: [
    "Python",
    "Pandas",
    "NumPy",
    "SQL",
    "PostgreSQL",
    "FastAPI",
    "C",
    "C++",
  ],
  tools: [
    "Power BI",
    "Streamlit",
    "Plotly",
    "MS Excel",
    "MATLAB",
    "Git & GitHub",
    "Azure",
  ],
};

export const SKILL_MARQUEE = [...SKILLS.programming, ...SKILLS.tools];

/* ---------------- off the clock ---------------- */

export const OFF_THE_CLOCK = [
  {
    title: "Chess",
    detail:
      "Represented Goa at national championships. FIDE rated 1687; captained school and college teams to first place at state level.",
  },
  {
    title: "Racquet sports",
    detail:
      "First place in men's doubles at intra-college badminton. Played higher secondary table tennis for a team ranked third at district level. Pickleball, currently.",
  },
  {
    title: "Strays",
    detail:
      "Founded and self-funded a stray animal feeding initiative on the NIT Goa campus, coordinating student volunteers on a weekly roster.",
  },
  {
    title: "Sarthak Foundation",
    detail:
      "Ground coordination for community education programmes for underprivileged children.",
  },
];

/* ---------------- photos ---------------- */

export const PHOTOS = {
  portrait: {
    src: "/photos/portrait.png",
    width: 1200,
    height: 3226,
    alt: "Milind Gauns standing by a lakeside railing in Goa",
  },
  palace: {
    src: "/photos/palace.webp",
    width: 1400,
    height: 2487,
    alt: "Milind Gauns laughing beneath the arches of Thirumalai Nayakkar Mahal",
  },
  strays: {
    src: "/photos/strays.webp",
    width: 1400,
    height: 2487,
    alt: "Milind Gauns walking three dogs along a Goa beach at dawn",
  },
  pickleball: {
    src: "/photos/pickleball.png",
    width: 1200,
    height: 2195,
    alt: "Milind Gauns mid-serve on a pickleball court",
  },
  gim: {
    src: "/photos/gim.webp",
    width: 1600,
    height: 871,
    alt: "Milind Gauns beside the Goa Institute of Management campus sign",
  },
} as const;
