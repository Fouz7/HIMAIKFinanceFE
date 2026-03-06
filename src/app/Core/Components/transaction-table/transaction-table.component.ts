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
      nominal: ['', Validators.required],
      notes: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getOutcomes(this.pageNumber, this.pageSize)
      .subscribe(response => {
        this.transactionData = response.data;
        this.isDataLoaded = true;
        this.hasMoreData = response.pagination
          ? this.pageNumber < response.pagination.totalPages
          : response.data.length === this.pageSize;
      }, error => {
        console.error('Error:', error);
      });
  }

  addTransaction() {
    if (this.transactionForm.valid) {
      this.transactionService.addTransaction(this.transactionForm.value)
        .subscribe(response => {
          this.loadTransactions();
          this.transactionForm.reset();
          this.closeModal();
        }, error => {
          console.error('Error:', error);
        });
    }
  }

  deleteTransaction(id: number) {
    console.warn('Delete transaction is not yet supported by the service');
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
      this.loadTransactions();
    }
  }

  nextPage() {
    if (this.hasMoreData) {
      this.pageNumber++;
      this.loadTransactions();
    }
  }
}
