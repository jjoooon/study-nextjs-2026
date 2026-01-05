export interface User {
  id: string | number;
  email: string;
  name: string;
  role?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
  role?: string;
}

export interface UpdateUserInput {
  email?: string;
  name?: string;
  role?: string;
}

export interface UserFilters {
  search?: string;
  role?: string;
  status?: string;
}

export interface UserListParams {
  page?: number;
  pageSize?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: UserFilters;
}
