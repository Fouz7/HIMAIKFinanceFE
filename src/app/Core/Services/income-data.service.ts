import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Interfaces/income-data-dto';
import { environment } from '@env/environment';



@Injectable({
  providedIn: 'root'
})
export class IncomeDataService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getIncomes(page: number, limit: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/incomes`, {
      params: {
        page: page.toString(),
        limit: limit.toString()
      }
    });
  }

  addIncome(data: { name: string; nominal: number; transfer_date: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/incomes`, data);
  }
}
