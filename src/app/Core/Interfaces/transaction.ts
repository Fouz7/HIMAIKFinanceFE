export interface Transaction {
  transactionId: number;
  debit: string;
  credit: string;
  balance: string;
  notes: string;
  createdBy: string;
  createdAt: Date;
}

export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface ApiResponse {
  data: Transaction[];
  pagination: Pagination;
}

