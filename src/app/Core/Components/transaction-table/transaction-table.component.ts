import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../../Services/transaction.service';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})
export class TransactionTableComponent implements OnInit {
  transactionData: any[] = [];
  transactionForm: FormGroup;
  pageNumber: number = 1;
  pageSize: number = 10;
  isDataLoaded: boolean = false;
  hasMoreData: boolean = true;

  constructor(
    private transactionService: TransactionService,
    private formBuilder: FormBuilder
  ) {
    this.transactionForm = this.formBuilder.group({
      debit: ['', Validators.required],
      notes: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getAllTransactionPaginated();
  }

  getAllTransactionPaginated() {
    this.transactionService.getAllTransactionPaginated(this.pageNumber, this.pageSize)
      .subscribe(data => {
        this.transactionData = data;
        this.isDataLoaded = true;
        this.hasMoreData = data.length === this.pageSize;
      }, error => {
        console.error('Error:', error);
      });
  }

  addTransaction() {
    if (this.transactionForm.valid) {
      this.transactionService.addTransaction(this.transactionForm.value)
        .subscribe(response => {
          this.getAllTransactionPaginated();
          this.transactionForm.reset();
          this.closeModal();
        }, error => {
          console.error('Error:', error);
        });
    }
  }

  deleteTransaction(id: number) {
    this.transactionService.deleteTransaction(id).subscribe(() => {
      this.getAllTransactionPaginated();
    }, error => {
      console.error('Error:', error);
    });
  }

  openModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'block';
      document.addEventListener('click', (event) => {
        if (event.target === modal) {
          this.closeModal();
        }
      });
    }
  }

  closeModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  prevPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getAllTransactionPaginated();
    }
  }

  nextPage() {
    if (this.hasMoreData) {
      this.pageNumber++;
      this.getAllTransactionPaginated();
    }
  }
}
