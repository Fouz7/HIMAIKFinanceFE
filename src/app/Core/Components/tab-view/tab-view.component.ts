import {Component, ViewEncapsulation} from '@angular/core';
import {IncomeDataService} from '../../Services/income-data.service';
import {TransactionService} from '../../Services/transaction.service';

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
  pageNumber: number = 1;
  pageSize: number = 10;

  constructor(
    private incomeDataService: IncomeDataService,
    private transactionService: TransactionService
  ) {
  }

  ngOnInit() {
    this.getAllIncomeData();
    this.getAllTransactionPaginated();
  }

  getAllIncomeData() {
    this.incomeDataService.getAllIncomeData('asc', this.pageNumber, this.pageSize)
      .subscribe(data => {
        console.log('DataIncome:', data);
        this.incomeData = data;
      }, error => {
        console.error('Error:', error);
      });
  }

  getAllTransactionPaginated() {
    this.transactionService.getAllTransactionPaginated(this.pageNumber, this.pageSize)
      .subscribe(data => {
        console.log('DataTransaction:', data);
        this.transactionData = data;
      }, error => {
        console.error('Error:', error);
      });
  }

  selectTab(index: number) {
    this.selectedTab = index;
  }

  nextPage() {
    this.pageNumber++;
    if (this.selectedTab === 0) {
      this.getAllIncomeData();
    } else if (this.selectedTab === 1) {
      this.getAllTransactionPaginated();
    }
  }

  prevPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      if (this.selectedTab === 0) {
        this.getAllIncomeData();
      } else if (this.selectedTab === 1) {
        this.getAllTransactionPaginated();
      }
    }
  }
}
