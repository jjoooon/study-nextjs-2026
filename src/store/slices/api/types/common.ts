export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BulkOperationResult {
  success: number;
  failed: number;
  errors?: Array<{
    id: string | number;
    error: string;
  }>;
}

export interface ApiError {
  status: number;
  data?: {
    message?: string;
    errors?: Record<string, string[]>;
  };
}
