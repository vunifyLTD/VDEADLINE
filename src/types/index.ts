export interface Conference {
  id: string;
  name: string;
  acronym: string;
  deadline: string;
  date: string;
  location: string;
  website: string;
  areas: string[];
  description?: string;
  paperSubmission?: string;
  notificationDate?: string;
  finalVersion?: string;
  ranking?: 'A*' | 'A' | 'B' | 'C';
  categories: string[];  // Array of category IDs
  subcategories: string[];  // Array of subcategory IDs
  type: 'conference' | 'workshop' | 'journal';
  coreRank?: string;
  cycle?: string;
  year?: number;
  proceedings?: string;
}

export interface AreaData {
  name: string;
  conferences: Conference[];
  color: string;
  subcategories: SubCategory[];
}

export interface SubCategory {
  name: string;
  id: string;
}

export interface CategoryData {
  id: string;
  name: string;
  subcategories: SubCategory[];
}

export type FilterState = {
  categories: string[];
  subcategories: string[];
  locations: string[];
  upcoming: boolean;
  searchQuery: string;
  types: string[];
  rankings: string[];
  page: number;
  perPage: number;
};