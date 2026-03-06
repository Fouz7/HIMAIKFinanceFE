import { Component, ViewEncapsulation } from '@angular/core';
import { IncomeDataService } from '../../Services/income-data.service';
import { TransactionService } from '../../Services/transaction.service';

@Component({
  selector: 'app-tab-view',
  templateUrl: './tab-view.component.html',
  styleUrls: ['./tab-view.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TabViewComponent {
  incomeData: any[] = [];
  transactionData: any[] = [];
  selectedTab = 0;

  incomePage: number = 1;
  transactionPage: number = 1;
  pageSize: number = 10;

  hasMoreIncome: boolean = true;
  hasMoreTransaction: boolean = true;

  constructor(
    private incomeDataService: IncomeDataService,
    private transactionService: TransactionService
  ) {
  }

  ngOnInit() {
    this.loadIncomeData();
    this.loadTransactions();
  }

  loadIncomeData() {
    this.incomeDataService.getIncomes(this.incomePage, this.pageSize)
      .subscribe(response => {
        this.incomeData = response.data;
        this.hasMoreIncome = this.incomePage < response.pagination.totalPages;
      }, error => {
        console.error('Error:', error);
      });
  }

  loadTransactions() {
    this.transactionService.getOutcomes(this.transactionPage, this.pageSize)
      .subscribe(response => {
        this.transactionData = response.data;
        this.hasMoreTransaction = this.transactionPage < response.pagination.totalPages;
      }, error => {
        console.error('Error:', error);
      });
  }

  selectTab(index: number) {
    this.selectedTab = index;
  }

  nextPage() {
    if (this.selectedTab === 0 && this.hasMoreIncome) {
      this.incomePage++;
      this.loadIncomeData();
    } else if (this.selectedTab === 1 && this.hasMoreTransaction) {
      this.transactionPage++;
      this.loadTransactions();
    }
  }

  prevPage() {
    if (this.selectedTab === 0 && this.incomePage > 1) {
      this.incomePage--;
      this.loadIncomeData();
    } else if (this.selectedTab === 1 && this.transactionPage > 1) {
      this.transactionPage--;
      this.loadTransactions();
    }
  }
}
