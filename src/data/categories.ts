import { CategoryData } from '../types';

export const categories: CategoryData[] = [
  {
    id: 'ai',
    name: 'AI/ML',
    subcategories: [
      { id: 'ai-ml',       name: 'Machine Learning' },
      { id: 'ai-nlp',      name: 'Natural Language Processing' },
      { id: 'ai-vision',   name: 'Computer Vision' },
      { id: 'ai-robotics', name: 'Robotics & Intelligent Agents' },
      { id: 'ai-kr',       name: 'Knowledge Representation & Reasoning' },
      { id: 'ai-ethics',   name: 'AI Ethics & Society' }
    ]
  },
  {
    id: 'systems',
    name: 'Systems',
    subcategories: [
      { id: 'sys-os',        name: 'Operating Systems' },
      { id: 'sys-dist',      name: 'Distributed Systems' },
      { id: 'sys-cloud',     name: 'Cloud Computing' },
      { id: 'sys-net',       name: 'Computer Networks' },
      { id: 'sys-arch',      name: 'Computer Architecture & Hardware' },
      { id: 'sys-hpc',       name: 'High-Performance & Parallel Computing' },
      { id: 'sys-storage',   name: 'Storage & File Systems' },
      { id: 'sys-cps',       name: 'Embedded & Cyber-Physical Systems' },
      { id: 'sys-realtime',  name: 'Real-Time Systems' },
      { id: 'sys-edge',      name: 'Edge & Fog Computing' }
    ]
  },
  {
    id: 'software',
    name: 'Software',
    subcategories: [
      { id: 'soft-eng',       name: 'Software Engineering' },
      { id: 'soft-pl',        name: 'Programming Languages' },
      { id: 'soft-compilers', name: 'Compilers & Toolchains' },
      { id: 'soft-testing',   name: 'Software Testing & Verification' },
      { id: 'soft-devops',    name: 'DevOps & CI/CD' }
    ]
  },
  {
    id: 'theory',
    name: 'Theory',
    subcategories: [
      { id: 'theory-algorithms', name: 'Algorithms & Data Structures' },
      { id: 'theory-complexity', name: 'Computational Complexity' },
      { id: 'theory-formal',     name: 'Formal Methods & Logic' },
      { id: 'theory-crypto',     name: 'Cryptography Theory' },
      { id: 'theory-quantum',    name: 'Quantum Computing Theory' }
    ]
  },
  {
    id: 'hci',
    name: 'HCI',
    subcategories: [
      { id: 'hci-user-interface', name: 'User Interface Design' },
      { id: 'hci-cscw',           name: 'CSCW & Social Computing' },
      { id: 'hci-uist',           name: 'Interactive Systems & Tools' },
      { id: 'hci-vr-ar',          name: 'Virtual & Augmented Reality' },
      { id: 'hci-visualization',  name: 'Information Visualization' }
    ]
  },
  {
    id: 'data',
    name: 'Data',
    subcategories: [
      { id: 'data-databases', name: 'Databases & Storage' },
      { id: 'data-ir',        name: 'Information Retrieval & Search' },
      { id: 'data-mining',    name: 'Data Mining & Knowledge Discovery' },
      { id: 'data-big',       name: 'Big Data & Analytics' },
      { id: 'data-kg',        name: 'Knowledge Graphs & Integration' }
    ]
  },
  {
    id: 'security',
    name: 'Security',
    subcategories: [
      { id: 'sec-crypto',   name: 'Applied Cryptography' },
      { id: 'sec-systems',  name: 'Systems & Application Security' },
      { id: 'sec-network',  name: 'Network & Distributed Security' },
      { id: 'sec-privacy',  name: 'Privacy & Anonymity' },
      { id: 'sec-web',      name: 'Web & Browser Security' }
    ]
  },
  {
    id: 'graphics',
    name: 'Graphics',
    subcategories: [
      { id: 'gfx-graphics',     name: 'Computer Graphics & Rendering' },
      { id: 'gfx-animation',    name: 'Animation & Simulation' },
      { id: 'gfx-visualization',name: 'Scientific & Info Visualization' },
      { id: 'gfx-vr',           name: 'Visual/Immersive Reality' },
      { id: 'gfx-multimedia',   name: 'Multimedia & Image/Video Processing' }
    ]
  },
  {
    id: 'bio',
    name: 'Bio',
    subcategories: [
      { id: 'bio-genomics',   name: 'Genomics & Sequence Analysis' },
      { id: 'bio-proteomics', name: 'Proteomics & Structural Biology' },
      { id: 'bio-systems',    name: 'Systems Biology' },
      { id: 'bio-health',     name: 'Health & Medical Informatics' },
      { id: 'bio-algorithms', name: 'Algorithms for Bio-Data' }
    ]
  },
  {
    id: 'robotics',
    name: 'Robotics',
    subcategories: [
      { id: 'robotics-core',  name: 'Robot Hardware & Control' },
      { id: 'robotics-ai',    name: 'Robot Perception & AI' },
      { id: 'robotics-swarm', name: 'Swarm & Multi-Robot Systems' }
    ]
  },
  {
    id: 'quantum',
    name: 'Quantum',
    subcategories: [
      { id: 'quantum-info', name: 'Quantum Information' },
      { id: 'quantum-hw',   name: 'Quantum Hardware & Devices' },
      { id: 'neuromorphic', name: 'Neuromorphic & Analog Computing' }
    ]
  },
  {
    id: 'interdisciplinary',
    name: 'Socio-Tech',
    subcategories: [
      { id: 'econcomp',      name: 'Economics & Computation' },
      { id: 'cse-edu',       name: 'Computing Education' },
      { id: 'sustainability',name: 'ICT for Sustainability' },
      { id: 'health-ai',     name: 'AI for Health & Medicine' }
    ]
  }
];