export interface PrismType {
  id: string;
  name: string;
  description: string;
  faces: number;
  edges: number;
  vertices: number;
}

export interface PrismViewerState {
  selectedPrism: string;
  wireframe: boolean;
  autoRotate: boolean;
  showStats: boolean;
}

export const PRISM_TYPES: PrismType[] = [
  {
    id: 'triangular',
    name: 'Triangular Prism',
    description: 'A prism with triangular cross-section',
    faces: 5,
    edges: 9,
    vertices: 6,
  },
  {
    id: 'rectangular',
    name: 'Rectangular Prism',
    description: 'A prism with rectangular cross-section (cuboid)',
    faces: 6,
    edges: 12,
    vertices: 8,
  },
  {
    id: 'pentagonal',
    name: 'Pentagonal Prism',
    description: 'A prism with pentagonal cross-section',
    faces: 7,
    edges: 15,
    vertices: 10,
  },
  {
    id: 'hexagonal',
    name: 'Hexagonal Prism',
    description: 'A prism with hexagonal cross-section',
    faces: 8,
    edges: 18,
    vertices: 12,
  },
  {
    id: 'octagonal',
    name: 'Octagonal Prism',
    description: 'A prism with octagonal cross-section',
    faces: 10,
    edges: 24,
    vertices: 16,
  },
];