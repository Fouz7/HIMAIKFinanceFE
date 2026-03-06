import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Interfaces/transaction';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getOutcomes(page: number, limit: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/transactions`, {
      params: {
        page: page.toString(),
        limit: limit.toString()
      }
    });
  }

  addTransaction(data: { nominal: number; notes: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/transactions`, data);
  }
}
