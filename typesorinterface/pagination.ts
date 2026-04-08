export interface Pagination {
  count: number;
  next: string | null;
  previous: string | null;
}

export interface PaginatedApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  pagination: Pagination;
  error: null;
}
