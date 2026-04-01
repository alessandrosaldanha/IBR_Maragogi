// Project Types

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ProjectResponse {
  records: Project[];
  count: number;
  page: number;
  totalPages: number;
}

// Material Types

export type MaterialCategory = 
  | 'pregonos'
  | 'ebd'
  | 'materiais'
  | 'documentos';

export type MaterialType = 
  | 'pdf'
  | 'doc'
  | 'docx'
  | 'txt'
  | 'ppt'
  | 'pptx'
  | 'xls'
  | 'xlsx'
  | 'image'
  | 'other';

export interface Material {
  id: string;
  title: string;
  description?: string;
  category: MaterialCategory;
  type: MaterialType;
  fileUrl: string;
  thumbnailUrl?: string;
  fileName: string;
  fileSize: number;
  createdAt: string;
  updatedAt?: string;
}

export interface MaterialResponse {
  records: Material[];
  count: number;
  page: number;
  totalPages: number;
}

export interface MaterialFilter {
  search?: string;
  category?: MaterialCategory;
  type?: MaterialType;
  sortBy?: 'date' | 'title';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// FAQ Types

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
}

export interface FAQResponse {
  records: FAQ[];
  count: number;
}

// About Types

export interface AboutContent {
  id: string;
  history: string;
  mission: string;
  vision: string;
  values: string[];
  bannerUrl?: string;
  updatedAt?: string;
}

// API Response Types

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// Pagination

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Navigation

export type NavItem = {
  path: string;
  label: string;
  icon: string;
};