import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Transaction} from '../Interfaces/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private url = 'https://himaikfinance.azurewebsites.net/Transaction';

  constructor(private http: HttpClient) {
  }

  getAllTransaction(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.url}/GetAllTransactions`);
  }

  getAllTransactionPaginated(pageNumber: number, pageSize: number): Observable<Transaction[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<Transaction[]>(`${this.url}/GetAllTransactionsPaginated`, {params});
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.url}/AddTransaction`, transaction);
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/DeleteTransaction/${id}`);
  }
}
