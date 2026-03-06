import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeDataService } from '../../Services/income-data.service';

@Component({
  selector: 'app-income-table',
  templateUrl: './income-table.component.html',
  styleUrls: ['./income-table.component.css']
})
export class IncomeTableComponent implements OnInit {
  incomeData: any[] = [];
  incomeForm: FormGroup;
  pageNumber: number = 1;
  pageSize: number = 10;
  isDataLoaded: boolean = false;
  hasMoreData: boolean = true;

  constructor(
    private incomeDataService: IncomeDataService,
    private formBuilder: FormBuilder
  ) {
    this.incomeForm = this.formBuilder.group({
      name: ['', Validators.required],
      nominal: ['', Validators.required],
      transfer_date: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadIncomeData();
  }

  loadIncomeData() {
    this.incomeDataService.getIncomes(this.pageNumber, this.pageSize)
      .subscribe(response => {
        console.log('DataIncome:', response);
        this.incomeData = response.data;
        this.isDataLoaded = true;
        this.hasMoreData = response.pagination
          ? this.pageNumber < response.pagination.totalPages
          : response.data.length === this.pageSize;
      }, error => {
        console.error('Error:', error);
      });
  }

  addIncome() {
    if (this.incomeForm.valid) {
      this.incomeDataService.addIncome(this.incomeForm.value)
        .subscribe(response => {
          console.log('Income added:', response);
          this.loadIncomeData();
          this.incomeForm.reset();
          this.closeModal();
        }, error => {
          console.error('Error:', error);
        });
    }
  }

  deleteIncome(id: number) {
    console.warn('Delete income is not yet supported by the service');
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
      this.loadIncomeData();
    }
  }

  nextPage() {
    if (this.hasMoreData) {
      this.pageNumber++;
      this.loadIncomeData();
    }
  }
}
