
export interface IncomeDataDto {
  id: number;
  name: string;
  nominal: string;
  transfer_date: string;
  createdBy: string;
}

export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface ApiResponse {
  data: IncomeDataDto[];
  pagination: Pagination;
}
